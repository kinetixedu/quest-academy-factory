// MBA - Principles of Management, Ep 25: Delegation of Authority
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 21a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  fileText: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 9H8', 'M16 13H8', 'M16 17H8'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  bed: ['M2 4v16', 'M2 8h18a2 2 0 0 1 2 2v10', 'M2 17h20', 'M6 8v9'],
  cart: ['M8 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  notEqual: ['M5 9h14', 'M5 15h14', 'M19 5 5 19'],
  chartBar: ['M3 3v16a2 2 0 0 0 2 2h16', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tSmall = wt('H2', 'small'), tWaits = wt('H2', 'waits');
const tRef = wt('C1', 'refund'), tCall1 = wt('C1', 'calls'), tMilk = wt('C2', 'milk'), tCall2 = wt('C2', 'calls');
const tForty = wt('C3', 'forty'), tWaitA = wt('C3', 'customers'), tAout = T0('I1') - 0.32;
// I: the clipboard and the key
const tI1 = T0('I1'), tMeenaI = wt('I2', 'Meena'), tClip = wt('I2', 'clipboard'), tKey = wt('I2', 'key');
const tI3 = T0('I3'), tJobC = [wt('I3', 'job'), wt('I3', 'running'), wt('I3', 'well')];
const tI4 = T0('I4'), tPower = wt('I4', 'power'), tRefunds = wt('I4', 'refunds'), tSupplies = wt('I4', 'supplies'), tIout = T0('D1') - 0.32;
// D: definition
const tD1 = T0('D1'), tD2 = T0('D2'), tMgr = wt('D2', 'manager'), tDo = wt('D2', 'do'), tDecide = wt('D2', 'decide');
const tShares = wt('D3', 'shares'), tWalk = wt('D3', 'walk'), tDout = T0('M1') - 0.32;
// M: one refund, before and after
const tM1 = T0('M1'), tM4 = T0('M4'), tMout = T0('E0') - 0.32;
const ML = [wt('M2', 'customer'), wt('M2', 'Meena'), wt('M2', 'waits'), T0('M3'), wt('M3', 'refund'), wt('M3', 'Twenty') + 0.1];
const MR = [wt('M4', 'customer'), wt('M4', 'Meena'), T0('M5'), wt('M5', 'one') - 0.1];
// E: three linked parts
const tE0 = T0('E0'), tE = [1, 2, 3].map(i => T0('E' + i)), tEout = T0('R0') - 0.32;
const tE1c = [wt('E1', 'job'), wt('E1', 'keep'), wt('E1', 'running')];
const tE2d = wt('E2', 'decide'), tE2a = wt('E2', 'approve'), tE3a = wt('E3', 'answering'), tE3f = wt('E3', 'Friday');
// R: what moves down
const tR0 = T0('R0'), tR1m = wt('R1', 'moves'), tR2a = wt('R2', 'assigned'), tR2c = wt('R2', 'accepts'), tR3c = wt('R3', 'cannot');
const tR4 = T0('R4'), tBad = wt('R4', 'bad'), tR4m = wt('R4', 'Meena'), tStill = wt('R4', 'still'), tAll = wt('R4', 'all');
const tT = T0('T1'), tSt2 = wt('T1', 'But'), tTu = T0('P1') - 0.32;
// P: parity
const tP1 = T0('P1'), tPar = wt('P1', 'parity'), tPmatch = wt('P1', 'match'), tPauth = wt('P1', 'Authority'), tPresp = wt('P1', 'responsibility');
const tP2 = T0('P2'), tP2c = wt('P2', 'cannot'), tP3 = T0('P3'), tP3a = wt('P3', 'any'), tP4 = T0('P4'), tP4l = wt('P4', 'limit'), tPout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'shift'), wt('K2', 'hotel'), wt('K3', 'project'), wt('K4', 'buyer')];
// X: the human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX7 = T0('X7');
const tXg = [wt('X2', 'frees'), wt('X2', 'grows'), wt('X2', 'speeds')], tXh = [wt('X4', 'risky'), wt('X4', 'mistakes'), wt('X5', 'creep')];
const tGal = wt('X3', '143'), tStrong = wt('X3', 'strong'), tMonkey = wt('X5', 'monkey'), tProb = wt('X6', 'problem'), tThink = wt('X6', 'think'), tCarry = wt('X6', 'carries');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Accountability');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'task'), wt('S2', 'decide')], ['responsibility', 'authority', 'accountability'].map(w => wt('S3', w)), [wt('S4', 'manager')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];
const EXW = [[tRef - 0.2, tAout], [tM1 + 0.4, tMout], [tP2 - 0.1, tPout], [tK0 + 0.3, tKout]];

/* ---------- build ---------- */
const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A: outlets on the phone
const TL = ['MAIN', 'BUS STAND', 'COLLEGE', 'MARKET', 'STATION'];
$('#tileRow').innerHTML = TL.map((n, i) => `<div class="tile" id="tl${i}" style="left:${36 + i * 172}px"><div class="cn">${n}</div><div class="ci"></div><div class="ct">Open</div></div>`).join('');
const METH = [['Refund?', tRef], ['Milk order?', tMilk], ['Extra helper?', tForty]];
$('#meth').innerHTML = METH.map(([m], i) => `<div class="stp" id="mt${i}" style="top:76px">${M.icon('help', 26, C.muted, 2.2)}<span>${m}</span></div>`).join('');
// I: clipboard + key cards
$('#iJi').innerHTML = M.icon('clipboard', 44, C.gold, 2.2); $('#iKi').innerHTML = M.icon('key', 44, C.gold, 2.2);
const JC = ['Open on time', 'Clean cups', 'Stock milk'], KC = [['Approve refunds', tRefunds], ['Order supplies', tSupplies]];
$('#iJc').innerHTML = JC.map((c, i) => `<div class="ich" id="jc${i}" style="top:172px">${M.icon('check', 22, C.gold, 2.6)}${c}</div>`).join('');
$('#iKc').innerHTML = KC.map(([c], i) => `<div class="ich" id="kc${i}" style="top:172px">${M.icon('key', 22, C.gold, 2.4)}${c}</div>`).join('');
for (const id of ['iJ', 'iK']) { const ic = $('#' + id + 'i'); ic.style.cssText += ';width:72px;height:72px;border-radius:36px;top:84px'; ic.innerHTML = M.icon(id === 'iJ' ? 'clipboard' : 'key', 36, C.gold, 2.2); $('#' + id + 't').style.cssText += ';left:144px;top:84px'; }
wrap($('#ill'), 'illOut', 784, 580);
// D: definition
$('#dfR').style.cssText = FACE('ravi'); $('#dfM').style.cssText = FACE('meena');
$('#dfK').innerHTML = `<span style="display:flex;align-items:center;gap:8px">${M.icon('arrowR', 26, C.dim, 2.4)}${M.icon('key', 30, C.gold, 2.4)}${M.icon('arrowR', 26, C.dim, 2.4)}</span>`;
$('#dAi').innerHTML = M.icon('check', 36, '#fff', 3); $('#dBi').innerHTML = M.icon('x', 36, C.red, 3);

/* M: one refund, before and after. Plan coords are inside a 688 x 250 svg. */
const BOX = { cust: [24, 144], meena: [24, 22], hq: [534, 22] };
const STAND = { cust: [190, 186], meena: [190, 64], q: [242, 64], hq: [502, 64] };
const QX = s => 502 - 52 * s;
const WAYS = {
  L: { who: 'meena', name: 'BEFORE · MEENA CALLS RAVI', T: ML, steps: [['user', 'Customer asks for a refund', 60, 0, 'meena'], ['phone', 'Meena phones head office', 120, 1, 'q'], ['clock', 'Waits behind four calls', 780, 1, 'hq'], ['check', 'Ravi says yes', 120, 1, 'meena'], ['coin', 'Refund given', 120, 0, 'cust']] },
  R: { who: 'meena', name: 'AFTER · MEENA DECIDES', T: MR, steps: [['user', 'Customer asks for a refund', 20, 0, 'meena'], ['key', 'Meena checks her limit', 20, 0, 'meena'], ['coin', 'Refund given', 20, 0, 'cust']] },
};
const TOTAL = 1200;
for (const k of ['L', 'R']) {
  const W = WAYS[k];
  const box = (n, [x, y]) => {
    const off = k === 'R' && n === 'hq';
    const fill = off ? '#EEE8DB' : '#FFFFFF';
    const inner = n === 'cust' ? `<g transform="translate(51 12)">${M.icon('user', 28, C.ink, 2.2)}</g>`
      : `<clipPath id="bc${k}${n}"><circle cx="65" cy="31" r="20"/></clipPath><image href="${IMG}${n === 'hq' ? 'ravi' : 'meena'}-face.jpg" x="45" y="11" width="40" height="40" clip-path="url(#bc${k}${n})" ${off ? 'opacity="0.45"' : ''}/>`;
    const lab = n === 'cust' ? 'CUSTOMER' : n === 'meena' ? 'MEENA' : (off ? 'NOT CALLED' : 'HEAD OFFICE');
    return `<g id="sb${k}${n}" transform="translate(${x} ${y})"><rect width="130" height="84" rx="16" fill="${fill}" stroke="#E2DACB" stroke-width="2"/>${inner}<text x="65" y="72" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.5" fill="#8A8274">${lab}</text></g>`;
  };
  const queue = k === 'L' ? `<text id="qlab" x="372" y="18" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.5" fill="#8A8274">OTHER OUTLETS CALLING</text>` + ['MAIN', 'COLLEGE', 'MARKET', 'STATION'].map((o, i) => `<g id="qc${i}" transform="translate(${QX(i + 1)} 64)"><circle r="20" fill="#3A4560"/><g transform="translate(-10 -10)">${M.icon('phone', 20, '#fff', 2.2)}</g></g>`).join('') : '';
  const [sx, sy] = STAND.cust;
  $('#m' + k + 'In').innerHTML = `<div class="mav" style="${FACE(W.who)}"></div><div class="lbl mlb">${W.name}</div><div class="serif mrd" id="rd${k}">0:00</div>
    <svg class="mplan" id="plan${k}" width="688" height="250">
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>${Object.entries(BOX).map(([n, p]) => box(n, p)).join('')}
      <path id="trail${k}" d="" fill="none" stroke="${k === 'L' ? '#B5482F' : '#B8862F'}" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
      ${queue}
      <g id="av${k}" transform="translate(${sx} ${sy})"><circle r="24" fill="#B8862F"/><g transform="translate(-13 -13)">${M.icon('coin', 26, '#fff', 2.4)}</g></g>
    </svg>
    <div class="mbar" id="bar${k}">${W.steps.map((_, i) => `<i id="sg${k}${i}"></i>`).join('')}</div>
    <div class="mtk" id="tk0${k}" style="left:48px">0:00</div><div class="mtk" id="tk1${k}" style="right:48px">20:00</div>
    <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
  let cum = 0; W.cum = W.steps.map(s => { const c = cum; cum += s[2]; return c; }); W.total = cum;
}
let tk = ''; for (let k = 0; k < 12; k++) { const a = k * 30 * Math.PI / 180; tk += `<line x1="${(140 + 78 * Math.sin(a)).toFixed(1)}" y1="${(170 - 78 * Math.cos(a)).toFixed(1)}" x2="${(140 + 70 * Math.sin(a)).toFixed(1)}" y2="${(170 - 70 * Math.cos(a)).toFixed(1)}" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round"/>`; }
$('#swTicks').innerHTML = tk;
wrap($('#mL'), 'mLOut', 784, 580);

// E: three linked parts (list + panes)
const PR = [['clipboard', 'Responsibility'], ['key', 'Authority'], ['fileText', 'Accountability']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${96 + i * 124}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('') +
  `<div class="rhd" id="pFoot" style="left:48px;top:478px"><div class="fa" style="${FACE('meena')}"></div><span class="fx" style="font-size:26px">Meena holds all three</span></div>`;
const PV = [
  `<div class="av face" id="rav" style="left:0;top:0;${FACE('meena')}">M</div><div class="avn" id="ran" style="left:-44px;top:92px">Meena</div>` +
   [['clock', 'Open on time', 120, 0], ['droplet', 'Cups clean', 0, 0], ['milk', 'Milk stocked', 120, 88]].map(([ic, t, x, y], i) => `<div class="stp" id="rc${i}" style="left:${x}px;top:${y}px">${M.icon(ic, 26, C.gold, 2.2)}${t}</div>`).join(''),
  `<div class="stp" id="g0" style="top:0;background:#F6E3DC;color:#B5482F">${M.icon('phone', 26, C.red, 2.2)}Call Ravi</div>
   <svg id="gA" class="abs" width="60" height="30" style="top:17px"><path d="M4 15 H48 M38 5 L50 15 L38 25" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
   <div class="stp" id="g1" style="top:0;background:#14213D;color:#fff">${M.icon('key', 26, C.gold2, 2.2)}Decide herself</div>
   <div class="abs" id="g2" style="left:0;top:104px;font:600 30px Poppins;white-space:nowrap">Refunds approved <span class="acc">at the outlet</span></div>`,
  `<svg class="abs" style="left:0;top:0" width="848" height="80" fill="none" stroke-linecap="round" stroke-linejoin="round"><path id="hs" d="M80 36 H508" stroke="#B8862F" stroke-width="6"/><path id="hh" d="M494 24 L510 36 L494 48" stroke="#B8862F" stroke-width="6"/></svg>
   <div class="av face" id="hav0" style="left:0;top:0;${FACE('meena')}">M</div><div class="avn" id="han0" style="left:-44px;top:92px">Meena</div>
   <div class="av face" id="hav1" style="left:520px;top:0;${FACE('ravi')}">R</div><div class="avn" id="han1" style="left:476px;top:92px">Ravi</div>
   <div class="stp" id="htr" style="top:4px;background:#B8862F;color:#fff">${M.icon('fileText', 26, '#fff', 2.2)}Friday report</div>`,
];
const PP = [['THE PARTS', '3 Parts', 'All three must fit together', 'IN SHORT', null]].concat([
  ['PART 01 / 03', 'Responsibility', 'the job to be done'], ['PART 02 / 03', 'Authority', 'the power to act and decide'],
  ['PART 03 / 03', 'Accountability', 'answering for the results']].map((p, i) => [...p, 'AT CHAI CORNER', PV[i]]));
$('#pPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('link', 34, C.gold, 2.2)}</i><span>Each one needs the other two</span></div>`}</div>`).join('');

// R: what moves down
$('#rfR').style.cssText = FACE('ravi'); $('#rfM').style.cssText = FACE('meena');
const LX = [163, 392, 621], CH = [['key', 'Authority'], ['clipboard', 'Responsibility'], ['fileText', 'Accountability']];
$('#rChips').innerHTML = CH.map(([ic, t], i) => `<div class="mc" id="ch${i}"><span class="ci"></span><span>${t}</span></div>`).join('');
$('#rlanes').innerHTML = LX.map((x, i) => `<path id="ln${i}" d="M${x} 216 V${i < 2 ? 380 : 268}" stroke="${i < 2 ? '#B8862F' : '#B5482F'}" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" fill="none"/>` +
  (i < 2 ? `<path id="la${i}" d="M${x - 12} 368 L${x} 382 L${x + 12} 368" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` : `<g id="lx"><g transform="translate(${x} 300)"><circle r="26" fill="#F6E3DC"/><path d="M-9 -9 L9 9 M9 -9 L-9 9" stroke="#B5482F" stroke-width="4" stroke-linecap="round"/></g></g>`)).join('');
$('#rRow1').innerHTML = `<div class="av face" id="w1M" style="left:0;top:20px;${FACE('meena')}">M</div>
  <svg class="abs" id="w1A" style="left:88px;top:44px" width="208" height="24"><path d="M4 12 H196 M184 2 L198 12 L184 22" fill="none" stroke="#B5482F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="rmk" id="w1L" style="left:120px;top:0;background:#F6E3DC;color:#B5482F">ANSWERS TO</div>
  <div class="av face" id="w1R" style="left:312px;top:20px;${FACE('ravi')}">R</div>
  <div class="abs" id="w1T" style="left:412px;top:36px;font:600 28px Poppins;white-space:nowrap">for the bus stand</div>`;
$('#rRow2').innerHTML = `<div class="av face" id="w2R" style="left:0;top:16px;${FACE('ravi')};box-shadow:0 0 0 4px #B8862F">R</div>` +
  TL.map((n, i) => `<div class="ot5" id="o5${i}" style="left:${112 + i * 116}px"><div class="oi">${M.icon('store', 36, C.ink, 2.2)}</div><div class="on">${n}</div></div>`).join('') +
  `<svg class="abs" id="w2B" style="left:112px;top:118px" width="568" height="30"><path d="M2 2 V14 H566 V2" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
   <div class="lbl" id="w2L" style="left:112px;width:568px;text-align:center;top:156px;color:#B8862F">RAVI ANSWERS FOR ALL OF CHAI CORNER</div>`;
wrap($('#rL'), 'rLOut', 784, 580);

// P: parity
const SR = [['x', 'Too little power', 'Cannot spend a rupee, so she fails', 'r'], ['alert', 'Too much power', 'Any amount, so money gets wasted', 'r'], ['check', 'Power matches the job', 'Up to ₹5,000 a day for supplies', 'g']];
$('#sRows').innerHTML = SR.map(([ic, a, b], i) => `<div class="sr3" id="sr${i}" style="top:${96 + i * 156}px"><div class="bg"></div><div class="si"></div><div class="st1">${a}</div><div class="st2">${b}</div></div>`).join('');
wrap($('#pa'), 'paOut', 784, 580);
const aH = M.track(0, [[tPauth, 220], [tP2c, 10], [tP3a, 330], [tP4l, 220]], M.SOFT);
const rH = M.track(0, [[tPar + 0.2, 220]], M.SOFT);

// K: at work today
const KA = [
  ['clipboard', 'Responsibility', 'A clear job for one person', 'Meena keeps the bus stand outlet running', 'clock', 'A shift supervisor opens the store on time'],
  ['key', 'Authority', 'The power to decide, within limits', 'Meena approves refunds at the outlet', 'bed', 'A receptionist can waive a late checkout fee'],
  ['fileText', 'Accountability', 'Answering for the results', 'Meena reports to Ravi every Friday', 'chartBar', 'A project lead presents results each month'],
  ['scale', 'Parity', 'Power that fits the job', 'A daily limit of ₹5,000 for supplies', 'cart', 'A buyer gets a limit that matches the orders'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('') +
  `<div class="rhd" id="kFoot" style="left:48px;top:478px"><div class="fa" style="${FACE('ravi')}"></div><span class="fx" style="font-size:26px">Same rules, any size of team</span></div>`;
const KP = [['DELEGATION TODAY', 'Four ideas', 'You will see them in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOTEL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Give the job, the power, and a check-in</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['clock', 'Frees the manager'], ['trendUp', 'Grows the team'], ['zap', 'Faster decisions']];
const XH = [['alert', 'Feels risky'], ['x', 'Early mistakes'], ['arrowU', 'Work creeps back']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#xgi').innerHTML = M.icon('users', 44, C.gold, 2.2); $('#xgi').style.cssText += ';width:96px;height:96px';
$('#mkM').style.cssText += ';' + FACE('meena'); $('#mkR').style.cssText += ';' + FACE('ravi');
$('#mkyI').innerHTML = M.icon('arrowR', 22, '#fff', 2.6);
$('#xbanI').innerHTML = M.icon('bulb', 24, C.gold2, 2.4); $('#bothI').innerHTML = M.icon('eye', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Meena', 'Ravi', 'The customer', 'Kabir'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('lock', 44, C.gold2, 2.4);
// recap
const ROWS = [['key', 'Delegation shares authority', ['The task', 'The decision']], ['link', 'Three linked parts', ['Responsibility', 'Authority', 'Accountability']], ['lock', 'Accountability stays up', ['With the manager']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const pulse = (t, a, d = 0.9) => (t > a && t < a + d) ? Math.sin(Math.PI * (t - a) / d) : 0;
// one way of handling a refund: clock, path, trail, bar and step pill at time t
const runWay = (k, t) => {
  const W = WAYS[k], T = W.T, n = W.steps.length;
  let sim = 0, pos = STAND.cust, trail = [pos], cur = -1, served = 0;
  for (let i = 0; i < n; i++) {
    const a = T[i], b = T[i + 1], u = M.clamp((t - a) / (b - a));
    if (t >= a) cur = i;
    sim += W.steps[i][2] * u;
    const seg = $('#sg' + k + i), wpx = 688 * W.steps[i][2] / TOTAL;
    seg.style.left = (688 * W.cum[i] / TOTAL).toFixed(1) + 'px'; seg.style.width = (wpx * u).toFixed(1) + 'px';
    seg.style.background = W.steps[i][3] ? '#D98F7B' : (i % 2 ? '#24345A' : C.ink);
    if (t < a) continue;
    const prev = i ? W.steps[i - 1][4] : 'cust', dest = W.steps[i][4];
    if (prev === 'q' && dest === 'hq') { // wait in the queue: calls ahead are served one by one
      const e = u * 4; served = 0;
      for (let j = 0; j < 4; j++) served += M.io(M.clamp((e - j - 0.25) / 0.55));
      const p = [QX(5 - served - Math.max(0, served - 3)), 64]; trail.push(p); pos = p;
    } else if (prev !== dest) {
      const p0 = STAND[prev], p1 = STAND[dest], mv = M.io((t - a) / Math.min(0.9, (b - a) * 0.6));
      const p = [M.lerp(p0[0], p1[0], mv), M.lerp(p0[1], p1[1], mv)]; trail.push(p); pos = p;
    }
  }
  if (k === 'L') {
    if (cur >= 3) served = 4;
    for (let j = 0; j < 4; j++) {
      const g = $('#qc' + j), slot = j + 1 - served, op = 1 - M.clamp((served - j - 0.55) / 0.4);
      g.setAttribute('transform', `translate(${QX(Math.max(0, slot)).toFixed(1)} 64)`); g.style.opacity = op.toFixed(3); M.hide(g, op <= 0.01);
    }
  }
  const done = t >= T[n];
  $('#av' + k).setAttribute('transform', `translate(${pos[0].toFixed(1)} ${pos[1].toFixed(1)})`);
  const d = trail.length > 1 ? 'M' + trail.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') : '';
  if ($('#trail' + k)._d !== d) { $('#trail' + k)._d = d; $('#trail' + k).setAttribute('d', d); }
  M.setT($('#rd' + k), mmss(Math.floor(sim)));
  Object.keys(BOX).forEach(nm => {
    const st = cur >= 0 && !done ? W.steps[cur][4] : null;
    const on = st === nm || (st === 'q' && nm === 'hq');
    const r = $('#sb' + k + nm).querySelector('rect'); const c = on ? (W.steps[cur][3] ? C.red : C.gold) : C.line;
    if (r._c !== c) { r._c = c; r.setAttribute('stroke', c); r.setAttribute('stroke-width', on ? 4 : 2); }
  });
  const ms = $('#ms' + k);
  let ic, tx, tm, bad = 0, fin = 0;
  if (done) { fin = 1; ic = k === 'L' ? 'timer' : 'check'; tx = k === 'L' ? 'Customer waited' : '19 minutes saved'; tm = k === 'L' ? '20:00' : ''; bad = k === 'L'; }
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
  x = 48; JC.forEach((_, i) => { const c = $('#jc' + i); c.style.left = x + 'px'; x += c.offsetWidth + 16; });
  x = 48; KC.forEach((_, i) => { const c = $('#kc' + i); c.style.left = x + 'px'; x += c.offsetWidth + 16; });
  const tr = $('#tgR'); tr.style.left = (196 - tr.offsetWidth) + 'px'; $('#tgM').style.left = '600px';
  ['#dl1', '#dl2'].forEach(s => { const el = $(s); if (el.offsetWidth > 1504) el.style.fontSize = Math.floor(58 * 1504 / el.offsetWidth) + 'px'; });
  x = 0; const g0 = $('#g0'); g0.style.left = '0px'; x = g0.offsetWidth + 16; $('#gA').style.left = x + 'px'; x += 76; $('#g1').style.left = x + 'px';
  const r0 = $('#rc0'); $('#rc1').style.left = (120 + r0.offsetWidth + 16) + 'px';
  const htr = $('#htr'); htr.style.left = (296 - htr.offsetWidth / 2) + 'px';
  CH.forEach((_, i) => { const c = $('#ch' + i); c.style.left = (LX[i] - c.offsetWidth / 2) + 'px'; });
  const w1 = $('#w1L'); w1.style.left = (192 - w1.offsetWidth / 2) + 'px';
  document.querySelectorAll('#kPans .pt, #pPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const s2 = $('#st2'); s2.style.width = 'auto'; s2.style.display = 'inline-block'; const sw2 = s2.offsetWidth; s2.style.display = ''; s2.style.width = '1920px'; if (sw2 > 1600) s2.style.fontSize = Math.floor(112 * 1600 / sw2) + 'px';
  const xt = $('#xgT'); if (xt.offsetWidth > 688) xt.style.fontSize = Math.floor(30 * 688 / xt.offsetWidth) + 'px';
  const ms = $('#mkMs'), rs = $('#mkRs'); ms.style.left = Math.max(48, 200 - ms.offsetWidth / 2) + 'px'; rs.style.left = Math.min(736 - rs.offsetWidth, 584 - rs.offsetWidth / 2) + 'px'; ms.style.top = rs.style.top = '392px';
  const xb = $('#xban'); xb.style.left = (392 - xb.offsetWidth / 2) + 'px'; xb.style.top = '476px';
  const mk = $('#mky'); mk._w = mk.offsetWidth;
  const bo = $('#both'); let bw = 0; [...bo.children].forEach(c => bw += c.offsetWidth + 22); if (bw > 1520) bo.querySelectorAll('.tx').forEach(c => c.style.fontSize = Math.floor(52 * 1520 / bw) + 'px');
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 4]), ...tXh.map((th, i) => [th + 0.1, -12 + (i + 1) * 4])], M.SOFT);
const callN = t => t < tCall1 ? 0 : t < tCall2 ? 1 : t < tForty ? 2 : Math.round(2 + 38 * M.o3((t - tForty) / 1.2));

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
  const exW = EXW.find(([a, b]) => t >= a - 0.5 && t < b + 0.5) || EXW[0];
  M.vis($('#exChip'), t, exW[0], exW[1], { dy: 10, outDur: 0.3 });

  /* ===== A: every decision waits for Ravi ===== */
  const aOn = t < tAout + 0.45; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#sign'), t, tMorph + 0.45, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#phoneV'), t, tMorph + 0.85, 1e9, { dy: 16, sp: M.SOFT }); M.vis($('#notesV'), t, tMorph + 0.95, 1e9, { dy: 16, sp: M.SOFT });
    const ring = Math.max(pulse(t, tCall1 - 0.1), pulse(t, tCall2 - 0.1), t > tForty - 0.1 ? Math.abs(Math.sin((t - tForty) * Math.PI / 0.9)) : 0);
    ['rw1', 'rw2', 'rw3', 'rw4'].forEach((id, i) => { const el = $('#' + id); const op = M.clamp(ring * 1.4 - (i > 1 ? 0.35 : 0)); el.style.opacity = op.toFixed(3); M.hide(el, op < 0.02); });
    const sh = ring > 0.05 ? 4 * Math.sin(t * 40) * ring : 0;
    $('#phone').setAttribute('transform', Math.abs(sh) < 0.01 ? 'translate(132 196)' : `translate(132 196) rotate(${sh.toFixed(2)} 0 -20)`);
    M.vis($('#callT'), t, tMorph + 1.0, 1e9, { dy: 0, fade: 0.2 });
    M.setT($('#callT'), `Calls today: ${callN(t)}`); $('#callT').setAttribute('fill', t > tForty + 0.6 ? C.red : C.ink);
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    TL.forEach((_, i) => {
      const el = $('#tl' + i); M.vis(el, t, tMorph + 0.5 + i * 0.05, 1e9, { dy: 16 });
      const r = i === 1 ? M.io((t - tCall1 + 0.2) / 0.25) : M.io((t - tForty - i * 0.08) / 0.25);
      el.style.background = mix(C.paper, C.redBg, r);
      const ct = el.querySelector('.ct');
      M.setT(ct, r < 0.5 ? 'Open' : (i === 1 ? (t < tMilk ? 'Refund?' : t < tForty ? 'Milk?' : 'On hold') : 'On hold'));
      ct.style.color = r > 0.5 ? C.red : C.muted;
      el.querySelector('.cn').style.color = r > 0.5 ? C.red : C.muted;
      setIco(el.querySelector('.ci'), 'phone', r > 0.5 ? C.red : (t < tSmall + i * 0.06 ? C.dim : C.ink), 40, 2.2);
      const s = i === 1 ? Math.max(pulse(t, tCall1, 0.3), pulse(t, tCall2, 0.3)) : 0;
      if (s > 0.001) el.style.transform = `scale(${(1 + 0.05 * s).toFixed(4)})`;
    });
    M.vis($('#ask'), t, tRef - 0.3, tAout, { dy: 36, ...o });
    METH.forEach(([, tm], i) => M.vis($('#mt' + i), t, tm - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.rise($('#askT'), t, tWaitA - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== I: the clipboard and the key ===== */
  const iOn = t >= tI1 - 0.1 && t < tD1 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tI1 + 0.1, tIout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tI3);
    M.vis($('#illImg'), t, tI1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgR'), t, tI1 + 0.6, tI3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgM'), t, tMeenaI - 0.05, tI3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#iJ'), t, tI3 + 0.05, tIout, { dx: 60, dy: 0, ...o });
    M.vis($('#iJi'), t, tI3 + 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.rise($('#iJt'), t, tI3 + 0.35, { st: 0.06 });
    JC.forEach((_, i) => M.vis($('#jc' + i), t, tJobC[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#iK'), t, tI4 + 0.05, tIout, { dy: 36, ...o });
    M.vis($('#iKi'), t, tI4 + 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.rise($('#iKt'), t, tPower - 0.05, { st: 0.06 });
    KC.forEach(([, tm], i) => M.vis($('#kc' + i), t, tm - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
  }

  /* ===== D: definition ===== */
  const dOn = t >= tD1 - 0.05 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#def'), t, tD2 + 0.1, tDout, { dy: 36, ...o });
    M.rise($('#dl1'), t, tMgr - 0.05, { st: 0.05 }); M.rise($('#dl2'), t, tDo - 0.1, { st: 0.05 });
    M.vis($('#dfR'), t, tDecide - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#dfK'), t, tDecide + 0.05, 1e9, { dx: -16, dy: 0, fade: 0.15 });
    M.vis($('#dfM'), t, tDecide + 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#dfX'), t, tDecide + 0.35, 1e9, { dy: 10 });
    M.vis($('#dA'), t, tShares - 0.15, tDout, { dy: 36, ...o }); M.vis($('#dAi'), t, tShares, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#dB'), t, tWalk - 0.15, tDout, { dy: 36, ...o }); M.vis($('#dBi'), t, tWalk, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
  }

  /* ===== M: one refund, before and after ===== */
  const mOn = t >= tM1 - 0.1 && t < T0('E0') + 0.2; M.hide($('#sM'), !mOn);
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
      Object.keys(BOX).forEach((nm, i) => { $('#sb' + k + nm).style.opacity = M.clamp((t - base - 0.25 - i * 0.07) / 0.1); });
      M.vis($('#bar' + k), t, base + 0.35, 1e9, { dy: 10 });
      M.vis($('#tk0' + k), t, base + 0.4, 1e9, { dy: 8 }); M.vis($('#tk1' + k), t, base + 0.4, 1e9, { dy: 8 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const r = runWay(k, t);
      if (k === 'L') {
        for (let j = 0; j < 4; j++) if (t < base + 0.5 + j * 0.06) M.hide($('#qc' + j), true);
        M.vis($('#swv'), t, tM1 + 0.45, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
        M.drawU($('#swArc'), M.clamp(r.sim / 3600)); M.hide($('#swArc'), r.sim < 0.5);
        $('#swHand').setAttribute('transform', `rotate(${(r.sim / 10).toFixed(2)} 140 170)`);
        M.vis($('#rdW'), t, tM1 + 0.55, 1e9, { dy: 12 }); M.setT($('#rdW'), mmss(Math.floor(r.sim)));
        $('#rdW').style.color = r.done ? C.red : C.ink;
        M.vis($('#mwL'), t, tM1 + 0.65, 1e9, { dy: 8 });
      }
    }
  }

  /* ===== E: three linked parts ===== */
  const eOn = t >= tE0 - 0.1 && t < tR0 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pl'), t, tE0 + 0.1, tEout, { dx: -60, dy: 0, ...o });
    M.vis($('#pp'), t, tE0 + 0.25, tEout, { dx: 60, dy: 0, ...o });
    PR.forEach(([ic], i) => {
      const el = $('#pr' + i), ta = tE[i], td = i < 2 ? tE[i + 1] : tEout + 1;
      M.vis(el, t, tE0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    M.vis($('#pFoot'), t, tE0 + 0.8, 1e9, { dy: 12 });
    PP.forEach((_, k) => {
      const tin = k ? tE[k - 1] : tE0 + 0.5, tout = k < 3 ? tE[k] - 0.14 : 1e9;
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
        M.vis($('#rav'), t, tin + 0.6, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#ran'), t, tin + 0.7, 1e9, { dy: 10 });
        for (let i = 0; i < 3; i++) M.vis($('#rc' + i), t, tE1c[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k === 2) {
        M.vis($('#g0'), t, tin + 0.6, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        M.vis($('#gA'), t, tE2d - 0.2, 1e9, { dx: -12, dy: 0, fade: 0.15 });
        M.vis($('#g1'), t, tE2d - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        M.rise($('#g2'), t, tE2a - 0.05, { st: 0.05 });
      } else if (k === 3) {
        for (let i = 0; i < 2; i++) { M.vis($('#hav' + i), t, tin + 0.6 + i * 0.12, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#han' + i), t, tin + 0.7 + i * 0.12, 1e9, { dy: 10 }); }
        M.draw($('#hs'), t, tE3a - 0.1, 0.6, M.o3); M.vis($('#hh'), t, tE3a + 0.4, 1e9, { dy: 0, fade: 0.12 });
        M.vis($('#htr'), t, tE3f - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      }
    });
  }

  /* ===== R: what moves down, what stays ===== */
  const rOn = t >= tR0 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const rL = $('#rL'); M.vis(rL, t, tR0 + 0.1, 1e9, { dy: 36 }); grow(rL, $('#rLOut'), t, tR4);
    M.vis($('#rhR'), t, tR0 + 0.3, 1e9, { dy: 12 }); M.vis($('#rhM'), t, tR0 + 0.4, 1e9, { dy: 12 });
    const mv = [M.spring(t - tR1m + 0.05, M.HEAVY), M.spring(t - tR2a + 0.05, M.HEAVY), 0];
    CH.forEach(([ic], i) => {
      const el = $('#ch' + i); M.vis(el, t, tR0 + 0.6 + i * 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const y = M.lerp(156, 396, mv[i]); snap(el, (mv[i] >= 1 ? 396 : mv[i] <= 0 ? 156 : y.toFixed(1)) + 'px', 'top');
      const lock = i === 2 && t >= tR3c - 0.05, acc = i === 1 && t >= tR2c - 0.05;
      const bg = i === 0 ? (t > tR1m - 0.1 ? C.gold : C.paper) : i === 1 ? (t > tR2a - 0.1 ? C.ink : C.paper) : (lock ? C.red : C.paper);
      const fg = bg === C.paper ? C.ink : '#fff';
      if (el._bg !== bg) { el._bg = bg; el.style.background = bg; el.style.color = fg; }
      setIco(el.querySelector('.ci'), lock ? 'lock' : acc ? 'check' : ic, bg === C.paper ? C.gold : '#fff', 22, 2.4);
      const sh = lock ? pulse(t, tR3c - 0.05, 0.5) : 0;
      if (i === 2 && sh > 0.001) el.style.transform = `translateX(${(8 * Math.sin((t - tR3c) * 40) * sh).toFixed(2)}px)`;
      if (i < 2) { M.draw($('#ln' + i), t, (i ? tR2a : tR1m) - 0.1, 0.5, M.o3); M.vis($('#la' + i), t, (i ? tR2a : tR1m) + 0.35, 1e9, { dy: -8, fade: 0.1 }); }
    });
    M.draw($('#ln2'), t, tR3c - 0.3, 0.35, M.o3);
    M.vis($('#lx'), t, tR3c, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#rR'), t, tR4 + 0.1, 1e9, { dx: 60, dy: 0 });
    TL.forEach((_, i) => {
      const el = $('#o5' + i); M.vis(el, t, tR4 + 0.3 + i * 0.05, 1e9, { dy: 14 });
      const r = i === 1 ? M.io((t - tBad) / 0.25) : 0, g = M.io((t - tAll - i * 0.06) / 0.3);
      el.style.background = mix(mix(C.paper, C.redBg, r), C.gold3, g * (i === 1 ? 0 : 1));
      el.querySelector('.on').style.color = r > 0.5 ? C.red : C.muted;
      setIco(el.querySelector('.oi'), 'store', r > 0.5 ? C.red : (g > 0.5 ? C.gold : C.ink), 36, 2.2);
    });
    M.vis($('#w1M'), t, tR4m - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#w1A'), t, tR4m + 0.1, 1e9, { dx: -16, dy: 0, fade: 0.15 });
    M.vis($('#w1L'), t, tR4m + 0.2, 1e9, { dy: 8 });
    M.vis($('#w1R'), t, tR4m + 0.35, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#w1T'), t, tR4m + 0.5, 1e9, { dy: 10 });
    M.vis($('#w2R'), t, tStill - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#w2B'), t, tAll - 0.05, 1e9, { dy: -8, fade: 0.15 }); M.vis($('#w2L'), t, tAll + 0.1, 1e9, { dy: 10 });
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

  /* ===== P: parity ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    const pa = $('#pa'); M.vis(pa, t, tP1 + 0.05, tPout, { dy: 36, ...o }); grow(pa, $('#paOut'), t, tP2);
    const hR = rH(t), hA = aH(t);
    const sR = Math.abs(hR - 220) < 0.05 ? 220 : hR, sA = [0, 10, 220, 330].find(v => Math.abs(hA - v) < 0.05) ?? hA;
    snap($('#pbR'), Math.max(0, sR).toFixed(1) + 'px', 'height'); snap($('#pbA'), Math.max(0, sA).toFixed(1) + 'px', 'height');
    M.hide($('#pbR'), sR < 0.5); M.hide($('#pbA'), sA < 0.5);
    const pvR = $('#pvR'), pvA = $('#pvA');
    M.vis(pvR, t, tPar + 0.4, 1e9, { dy: 10 }); M.setT(pvR, 'The job'); snap(pvR, (330 - sR - 48).toFixed(1) + 'px', 'top');
    M.vis(pvA, t, tPauth + 0.2, 1e9, { dy: 10 });
    M.setT(pvA, t < tP2c ? 'The power' : t < tP3a ? '₹0' : t < tP4l ? 'No limit' : '₹5,000 a day');
    pvA.style.color = t >= tP2c && t < tP4l ? C.red : (t >= tP4l ? C.gold : C.ink); snap(pvA, (330 - sA - 48).toFixed(1) + 'px', 'top');
    const ok = (t >= tPmatch && t < tP2c) || t >= tP4l;
    const ps = $('#psign'); M.vis(ps, t, tPmatch - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    const pb = ok ? C.gold : C.redBg; if (ps._bg !== pb) { ps._bg = pb; ps.style.background = pb; }
    setIco(ps, ok ? 'equal' : 'notEqual', ok ? '#fff' : C.red, 44, 2.8);
    M.vis($('#paM'), t, tPar + 0.1, 1e9, { dy: 10 });
    M.vis($('#pb'), t, tP2 + 0.1, tPout, { dx: 60, dy: 0, ...o });
    const tS3 = [tP2c, tP3a, tP4l];
    SR.forEach(([ic, , , k], i) => {
      const el = $('#sr' + i); M.vis(el, t, tS3[i] - 0.15, 1e9, { dy: 16 });
      const on = M.io((t - tS3[i] + 0.1) / 0.3), off = i < 2 ? M.io((t - tS3[i + 1] + 0.1) / 0.3) : 0, act = on * (1 - off);
      const hot = k === 'r' ? C.redBg : C.gold;
      el.querySelector('.bg').style.background = mix(C.paper, hot, act);
      el.querySelector('.st1').style.color = k === 'g' && act > 0.5 ? '#fff' : C.ink;
      el.querySelector('.st2').style.color = k === 'g' && act > 0.5 ? '#fff' : (k === 'r' && act > 0.5 ? C.red : C.ink2);
      setIco(el.querySelector('.si'), ic, k === 'r' ? C.red : C.gold, 34, 2.6);
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
    M.vis($('#kFoot'), t, tK0 + 0.8, 1e9, { dy: 12 });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
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
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX3);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    $('#beam').setAttribute('transform', `rotate(${a.toFixed(3)} 344 40)`);
    $('#panL').setAttribute('transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    $('#panR').setAttribute('transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX4 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    // Gallup study
    M.vis($('#gal'), t, tX3 + 0.12, tX5 - 0.1, { dx: 60, dy: 0, ...o });
    M.vis($('#xgi'), t, tGal - 0.15, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.rise($('#xgN'), t, tGal - 0.05, { st: 0.06 }); M.vis($('#xgS'), t, tGal + 0.3, 1e9, { dy: 10 });
    M.vis($('#xgB'), t, tStrong - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#xgT'), t, tStrong + 0.3, 1e9, { dy: 12 }); M.vis($('#xgSrc'), t, tStrong + 0.5, 1e9, { dy: 8 });
    // the monkey
    M.vis($('#xw'), t, tX5 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xwS'), t, tX5 + 0.3, 1e9, { dy: 8 });
    M.vis($('#mkM'), t, tX5 + 0.4, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#mkMn'), t, tX5 + 0.5, 1e9, { dy: 10 });
    M.vis($('#mkR'), t, tX5 + 0.55, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#mkRn'), t, tX5 + 0.65, 1e9, { dy: 10 });
    const land = M.io((t - tThink - 0.1) / 0.8);
    $('#mkR').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.red, M.io((t - tThink - 0.8) / 0.25));
    const mk = $('#mky'); M.vis(mk, t, tMonkey - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    const qx = (1 - land) * (1 - land) * 200 + 2 * (1 - land) * land * 392 + land * land * 584;
    const qy = (1 - land) * (1 - land) * 214 + 2 * (1 - land) * land * 120 + land * land * 214;
    snap(mk, (qx - mk._w / 2).toFixed(1) + 'px', 'left'); snap(mk, (qy - 66).toFixed(1) + 'px', 'top');
    M.draw($('#mkArc'), t, tThink - 0.2, 0.5, M.o3);
    M.vis($('#mkMs'), t, tProb - 0.4, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mkRs'), t, tThink - 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#xban'), t, tCarry - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Who') - 0.05, { st: 0.06, sp: M.HEAVY });
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
