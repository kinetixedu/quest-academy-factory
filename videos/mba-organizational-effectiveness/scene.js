// MBA - Principles of Management, Ep 28: Organizational Effectiveness (series finale)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  cart: ['M8 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  bed: ['M2 4v16', 'M2 8h18a2 2 0 0 1 2 2v10', 'M2 17h20', 'M6 8v9'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 21a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  play: ['M6 3l14 9-14 9z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFive = wt('H2', 'five'), tWell = wt('H2', 'well');
const tC1 = T0('C1'), tSales = wt('C1', 'sales'), tAsha = wt('C2', 'Asha'), tMeena = wt('C2', 'Meena'), tC3 = T0('C3'), tAout = T0('I1') - 0.32;
// I
const tI1 = T0('I1'), tI2 = T0('I2'), tFair = wt('I2', 'fair'), tWhole = wt('I2', 'whole'), tIout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tHow = wt('D2', 'how'), tGoals = wt('D2', 'goals'), tD3 = T0('D3'), tRep = wt('D3', 'report'), tNot = wt('D3', 'not'), tDout = T0('E1') - 0.32;
// E
const tE1 = T0('E1'), tEff = wt('E1', 'Effective'), tRight = wt('E1', 'right'), tE2 = T0('E2'), tEffi = wt('E2', 'Efficient'), tWaste = wt('E2', 'waste'), tE3 = T0('E3'), tBoth = wt('E3', 'both'), tWrong = wt('E3', 'wrong'), tEout = T0('F0') - 0.32;
// F: the four checks
const tF0 = T0('F0'), tF = [1, 2, 3, 4].map(i => T0('F' + i)), tFout = T0('T1') - 0.32;
const tPass = [wt('F1', 'there'), wt('F2', 'staff'), wt('F3', 'conflict'), wt('F4', 'town')];
const tGoalW = [wt('F1', 'aimed'), wt('F1', 'five')], tRes = [wt('F2', 'milk'), wt('F2', 'money'), wt('F2', 'skilled')];
const tSmooth = wt('F3', 'smoothly'), tConf = wt('F3', 'conflict'), tStk = ['Customers', 'staff', 'owners', 'suppliers', 'town'].map(w => wt('F4', w));
const tT = T0('T1'), tSt2 = wt('T1', 'better'), tTu = T0('J0') - 0.32;
// J: the journey
const tJ0 = T0('J0'), tJn = [wt('J1', 'alone'), wt('J2', 'team'), wt('J3', 'bus'), wt('J3', 'five'), wt('J4', 'decide')], tSpan = wt('J4', 'span'), tJout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bakery'), wt('K2', 'factory'), wt('K3', 'hotel'), wt('K4', 'company'), wt('K5', 'shop')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tCups = wt('X2', 'cups'), tRush = wt('X2', 'rush'), tWorse = wt('X2', 'worse'), tX3 = T0('X3'), tGood = wt('X3', 'Goodhart'), tOnce = wt('X3', 'Once'), tStops = wt('X3', 'stops');
const tX4 = T0('X4'), tLow = wt('X4', 'low'), tPay = wt('X4', 'pay'), tX5 = T0('X5'), tXout = tX5 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'He');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'goals')], ['Goals', 'resources', 'internal', 'stakeholders'].map(w => wt('S3', w)), [wt('S4', 'right'), wt('S4', 'right', 1)]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const TL = ['MAIN', 'BUS STAND', 'COLLEGE', 'MARKET', 'STATION'];
$('#tileRow').innerHTML = TL.map((n, i) => `<div class="tile" id="tl${i}" style="left:${36 + i * 172}px"><div class="cn">${n}</div><div class="ci"></div><div class="ct">Open</div></div>`).join('');
const OPN = [['kabir', 'Sales are up', tSales], ['asha', 'Staff happy?', tAsha], ['meena', 'Customers happy?', tMeena]];
$('#meth').innerHTML = OPN.map(([f, m], i) => `<div class="op" id="mt${i}"><div class="fa" style="${FACE(f)}"></div><span>${m}</span></div>`).join('');
// I
const S3 = [['kabir', "KABIR'S SCORECARD", 'Sales'], ['asha', "ASHA'S SCORECARD", 'Happy staff'], ['meena', "MEENA'S SCORECARD", 'Happy customers']];
$('#sc3r').innerHTML = S3.map(([f, a, b], i) => `<div class="s3r" id="s3${i}" style="top:${96 + i * 120}px"><div class="fa" style="${FACE(f)}"></div><div class="t">${a}</div><div class="v">${b}</div></div>`).join('');
$('#sc3pI').innerHTML = M.icon('clipboard', 28, C.gold2, 2.2);
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#dAkaI').innerHTML = M.icon('clipboard', 24, C.gold, 2.4); $('#dAcI').innerHTML = M.icon('x', 24, C.red, 2.6);
const DB = [['target', 'Goals'], ['milk', 'Resources'], ['gauge', 'Process'], ['users', 'People']];
$('#dBc').innerHTML = DB.map(([ic, t], i) => `<div class="dch" id="db${i}" style="background:#F3EAD6;color:#14213D">${M.icon(ic, 22, C.gold, 2.4)}${t}</div>`).join('');
// E: the matrix
const QD = [[0, 0, 'EFFICIENT ONLY', 'Wrong drink,<br>made fast', 'r'], [0, 1, 'EFFECTIVE AND EFFICIENT', 'Right chai,<br>no waste', 'g'], [1, 0, 'NEITHER', 'Wrong drink,<br>milk wasted', 'n'], [1, 1, 'EFFECTIVE ONLY', 'Right chai,<br>milk wasted', 'n']];
$('#qds').innerHTML = QD.map(([r, c, a, b], i) => `<div class="qd" id="qd${i}" style="left:${136 + c * 316}px;top:${120 + r * 200}px"><div class="qt">${a}</div><div class="qs">${b}</div></div>`).join('');
$('#mdEi').innerHTML = M.icon('target', 36, C.gold, 2.2); $('#mdFi').innerHTML = M.icon('gauge', 36, C.ink, 2.2); $('#b2I').innerHTML = M.icon('check', 30, C.gold, 2.8);
// F: report card + panes
const FR = [['target', 'Goals'], ['milk', 'Resources'], ['gauge', 'Internal process'], ['users', 'Stakeholders']];
$('#fRows').innerHTML = FR.map(([ic, t], i) => `<div class="fr" id="fr${i}" style="top:${96 + i * 112}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div><div class="gr"><span class="gi"></span><span class="gt"></span></div></div>`).join('');
$('#fFoot').remove();
const RES = [['milk', 'Milk'], ['coin', 'Money'], ['users', 'Skilled staff']];
const STK = ['Customers', 'Staff', 'Owners', 'Suppliers', 'The town'];
const PV = [
  TL.map((n, i) => `<div class="abs" id="gs${i}" style="left:${i * 96}px;top:0;width:72px;height:72px;border-radius:36px;background:#F5F1E8;display:flex;align-items:center;justify-content:center"></div><div class="abs" style="left:${i * 96 - 14}px;top:84px;width:100px;text-align:center;font:600 13px Poppins;letter-spacing:.1em;color:#8A8274;white-space:nowrap">${n}</div>`).join('') +
   `<div class="stp" id="gok" style="left:510px;top:4px;background:#B8862F;color:#fff">${M.icon('check', 26, '#fff', 2.8)}Goal reached</div>`,
  RES.map(([ic, t], i) => `<div class="stp" id="rs${i}" style="left:0;top:${i * 60}px;height:48px;font-size:22px;padding:0 18px">${M.icon(ic, 22, C.gold, 2.4)}${t}</div>`).join('') +
   `<svg class="abs" style="left:0;top:0" width="848" height="176">${RES.map((_, i) => `<path id="rp${i}" d="M250 ${24 + i * 60} C420 ${24 + i * 60} 440 72 560 72" fill="none" stroke="#B8862F" stroke-width="4" stroke-dasharray="4 14" stroke-linecap="round"/>`).join('')}</svg>
   <div class="abs" id="rbox" style="left:560px;top:24px;width:288px;height:96px;border-radius:20px;background:#14213D;color:#fff;display:flex;align-items:center;justify-content:center;gap:12px;font:600 26px Poppins;white-space:nowrap">${M.icon('store', 30, C.gold2, 2.2)}Chai Corner</div>`,
  ['Order', 'Brew', 'Serve', 'Pay'].map((n, i) => `<div class="abs" id="ps${i}" style="left:${i * 196}px;top:0;width:160px;height:72px;border-radius:18px;background:#F5F1E8;display:flex;align-items:center;justify-content:center;font:600 24px Poppins">${n}</div>`).join('') +
   `<svg class="abs" style="left:0;top:0" width="848" height="176"><line x1="80" y1="96" x2="668" y2="96" stroke="#E2DACB" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/><g id="pcup"><circle r="18" fill="#B8862F"/><g transform="translate(-11 -11)">${M.icon('cup', 22, '#fff', 2.4)}</g></g></svg>
   <div class="stp" id="pk0" style="left:0;top:116px;height:52px;font-size:24px;background:#F3EAD6">${M.icon('check', 24, C.gold, 2.6)}No jams</div><div class="stp" id="pk1" style="top:116px;height:52px;font-size:24px;background:#F3EAD6">${M.icon('check', 24, C.gold, 2.6)}Little conflict</div>`,
  STK.map((n, i) => `<div class="abs" id="sk${i}" style="left:${i * 168}px;top:0;width:152px;height:120px;border-radius:18px;background:#F5F1E8"><div class="abs sic" style="left:56px;top:16px"></div><div class="abs" style="left:0;width:152px;top:58px;text-align:center;font:600 20px Poppins;white-space:nowrap">${n}</div><div class="abs" style="left:20px;top:96px;width:112px;height:10px;border-radius:5px;background:#E2DACB;overflow:hidden"><i id="skb${i}" style="position:absolute;left:0;top:0;height:10px;background:#B8862F"></i></div></div>`).join(''),
];
const PP = [['THE CHECK', '4 Approaches', 'Four ways to judge one business', 'IN SHORT', null]].concat([
  ['APPROACH 01 / 04', 'Goal approach', 'Did we reach our goals?'], ['APPROACH 02 / 04', 'Resource approach', 'Can we get what we need from outside?'],
  ['APPROACH 03 / 04', 'Internal process', 'Does work inside run smoothly?'], ['APPROACH 04 / 04', 'Stakeholder approach', 'Are the groups we affect happy?']].map((p, i) => [...p, 'AT CHAI CORNER', PV[i]]));
$('#fPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('clipboard', 34, C.gold, 2.2)}</i><span>Ravi runs every check, one by one</span></div>`}</div>`).join('');
// J: the journey
const JX = i => 110 + i * 270;
const JN = [['store', 'THE START', 'One stall', 'Ravi does it all'], ['users', 'THE TEAM', 'A real team', 'Plan, organize, staff, direct, control'], ['pin', 'GROWTH', 'Outlet two', 'Meena runs the bus stand'], ['network', 'SCALE', 'Five outlets', 'A small head office'], ['key', 'LEADING', 'A leader', 'Decide, delegate, the right span']];
$('#jNodes').innerHTML = JN.map(([ic], i) => `<g id="jn${i}"><circle cx="${JX(i)}" cy="300" r="32" fill="#F5F1E8" stroke="#E2DACB" stroke-width="4"/><g transform="translate(${JX(i) - 15} 285)" class="ji"></g></g>`).join('');
$('#jTxt').innerHTML = JN.map(([, l, t, s], i) => `<div class="jn" id="jt${i}" style="left:${JX(i) - 130}px;top:362px;width:260px"><div class="l">${l}</div><div class="t">${t}</div><div class="s">${s}</div></div>`).join('');
$('#jRavi').style.cssText += ';' + FACE('ravi');
$('#jEndI').innerHTML = M.icon('flag', 28, '#fff', 2.4);
// K
const KA = [
  ['coin', 'Profit', 'The money left after costs', 'Kabir checks each outlet\'s profit', 'store', 'A bakery checks its profit every month'],
  ['gauge', 'Productivity', 'Output for each hour of work', 'Cups served per hour, per outlet', 'gear', 'A factory counts units per shift'],
  ['smile', 'Customer satisfaction', 'Do customers come back?', 'A rating card at every counter', 'bed', 'A hotel asks every guest to rate their stay'],
  ['heart', 'Employee satisfaction', 'Do staff want to stay?', 'Asha asks the team how they feel', 'clipboard', 'A company runs a yearly staff survey'],
  ['refresh', 'Adaptability', 'Changing with the times', 'Hot snacks added when evenings slowed', 'cart', 'A shop starts selling online'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['KEEPING SCORE', 'Five signs', 'Managers watch more than one number', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOTEL</div><div class="pe"><i>${M.icon('grid', 34, C.gold, 2.2)}</i><span>A full report card, not one grade</span></div>`) + `</div>`).join('');
// X
$('#tgCi').innerHTML = M.icon('users', 36, C.gold, 2.2); $('#tgSi').innerHTML = M.icon('users', 36, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('grid', 48, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Goal approach', 'Resource approach', 'Process approach', 'Stakeholder approach'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Effectiveness = reaching goals', ['A report card']], ['grid', 'Judge it four ways', ['Goals', 'Resources', 'Process', 'Stakeholders']], ['scale', 'Effective and efficient', ['Right things', 'Done right']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('play', 34, C.gold2, 2.4);

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
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; OPN.forEach((_, i) => { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; });
  x = 48; DB.forEach((_, i) => { const c = $('#db' + i); c.style.left = x + 'px'; x += c.offsetWidth + 14; });
  const tg = $('#xsTag'); tg.style.left = '712px'; tg.style.top = '212px';
  const p0 = $('#pk0'); $('#pk1').style.left = (p0.offsetWidth + 16) + 'px';
  for (const s of ['#dq']) { const dq = $(s); dq.style.width = 'auto'; dq.style.display = 'inline-block'; const dqw = dq.offsetWidth; dq.style.display = ''; dq.style.width = '1920px'; if (dqw > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dqw) + 'px'; }
  document.querySelectorAll('#fPans .pt, #kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.fr .rt').forEach(el => { if (el.offsetWidth > 270) el.style.fontSize = Math.floor(30 * 270 / el.offsetWidth) + 'px'; });
  const bo = $('#both'); let bw = 0; [...bo.children].forEach(c => bw += c.offsetWidth + 22); if (bw > 1520) bo.querySelectorAll('.tx').forEach(c => c.style.fontSize = Math.floor(52 * 1520 / bw) + 'px');
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  const q1 = $('#qq1'); if (q1.offsetWidth > 1400) q1.style.fontSize = Math.floor(68 * 1400 / q1.offsetWidth) + 'px';
  const je = $('#jEnd'); je.style.left = (JX(4) + 60) + 'px'; je.style.top = '268px';
  const nt = $('#next .nt'); if (nt.scrollWidth > nt.offsetWidth) nt.style.fontSize = Math.floor(34 * nt.offsetWidth / nt.scrollWidth) + 'px';
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}

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

  /* ===== A: is it doing well? ===== */
  const aOn = t < tAout + 0.45; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT }); M.vis($('#kettleV'), t, tMorph + 0.75, 1e9, { dy: 16, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tFive - 0.3, tAout, { dy: 36, ...o });
    TL.forEach((_, i) => {
      const el = $('#tl' + i); M.vis(el, t, tFive - 0.1 + i * 0.08, 1e9, { dy: 16 });
      const g = M.io((t - tWell - i * 0.08) / 0.3), ct = el.querySelector('.ct');
      M.setT(ct, g > 0.5 ? '?' : 'Open'); ct.style.color = g > 0.5 ? C.gold : C.muted;
      el.style.background = mix(C.paper, C.gold3, g);
      setIco(el.querySelector('.ci'), 'store', g > 0.5 ? C.gold : C.ink, 40, 2.2);
    });
    M.vis($('#ask'), t, tSales - 0.35, tAout, { dy: 36, ...o });
    OPN.forEach(([, , tm], i) => M.vis($('#mt' + i), t, tm - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.rise($('#askT'), t, tC3 + 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== I: the team at one table ===== */
  const iOn = t >= tI1 - 0.1 && t < tD1 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tI1 + 0.1, tIout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tI1 + 1.4);
    M.vis($('#illImg'), t, tI1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#sc3'), t, tI1 + 1.5, tIout, { dx: 60, dy: 0, ...o });
    S3.forEach((_, i) => M.vis($('#s3' + i), t, tI1 + 1.75 + i * 0.3, 1e9, { dy: 14 }));
    M.vis($('#sc3p'), t, tFair - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: definition ===== */
  const dOn = t >= tD1 - 0.05 && t < tE1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#def'), t, tD2 + 0.1, tDout, { dy: 36, ...o });
    M.rise($('#dl1'), t, tHow - 0.05, { st: 0.05 }); M.rise($('#dl2'), t, tGoals - 0.45, { st: 0.06 });
    M.vis($('#dAka'), t, tRep - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#dA'), t, tNot - 0.2, tDout, { dy: 36, ...o }); M.vis($('#dAc'), t, tNot, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#dB'), t, tNot + 0.1, tDout, { dy: 36, ...o });
    DB.forEach((_, i) => M.vis($('#db' + i), t, tNot + 0.35 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
  }

  /* ===== E: effective vs efficient ===== */
  const eOn = t >= tE1 - 0.1 && t < tF0 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mx'), t, tE1 + 0.1, tEout, { dx: -60, dy: 0, ...o });
    M.vis($('#md'), t, tE1 + 0.25, tEout, { dx: 60, dy: 0, ...o });
    ['axW', 'axR', 'axG', 'axB'].forEach((id, i) => { const el = $('#' + id), a = M.clamp((t - tE1 - 0.5 - i * 0.06) / 0.2); el.style.opacity = a.toFixed(3); M.hide(el, a < 0.01); });
    const colOn = M.io((t - tRight + 0.1) / 0.3), rowOn = M.io((t - wt('E2', 'right') + 0.1) / 0.3);
    QD.forEach(([r, c, , , k], i) => {
      const el = $('#qd' + i); M.vis(el, t, tE1 + 0.6 + i * 0.07, 1e9, { dy: 14 });
      const inCol = c === 1 ? colOn : 0, inRow = r === 0 ? rowOn : 0;
      let bg = mix(C.paper, C.gold3, Math.max(inCol, inRow) * (t < tE3 ? 1 : 0));
      const fin = M.io((t - (k === 'g' ? tBoth : tWrong) + 0.1) / 0.3);
      if (t >= tE3 - 0.1) bg = k === 'g' ? mix(C.gold3, C.gold, M.io((t - tBoth + 0.1) / 0.3)) : k === 'r' ? mix(C.paper, C.redBg, M.io((t - tWrong + 0.1) / 0.3)) : C.paper;
      el.style.background = bg;
      const gold = k === 'g' && t > tBoth;
      el.querySelector('.qt').style.color = gold ? '#fff' : (k === 'r' && t > tWrong ? C.red : C.muted);
      el.querySelector('.qs').style.color = gold ? '#fff' : C.ink;
    });
    M.vis($('#mdE'), t, tEff - 0.1, 1e9, { dy: 16 }); M.vis($('#mdF'), t, tEffi - 0.1, 1e9, { dy: 16 });
    M.vis($('#both2'), t, tBoth - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* ===== F: the four checks ===== */
  const fOn = t >= tF0 - 0.1 && t < tT + 0.1; M.hide($('#sF'), !fOn);
  if (fOn) {
    M.vis($('#fl'), t, tF0 + 0.1, 1e9, { dx: -60, dy: 0 });
    M.vis($('#fp'), t, tF0 + 0.25, 1e9, { dx: 60, dy: 0 });
    FR.forEach(([ic], i) => {
      const el = $('#fr' + i), ta = tF[i], td = i < 3 ? tF[i + 1] : 1e9;
      M.vis(el, t, tF0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
      const gr = el.querySelector('.gr'), pass = t >= tPass[i];
      M.vis(gr, t, ta + 0.2, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      M.setT(gr.querySelector('.gt'), pass ? 'Pass' : 'Now');
      setIco(gr.querySelector('.gi'), pass ? 'check' : 'clock', pass ? '#fff' : (act > 0.5 ? C.gold2 : C.muted), 20, 2.6);
      const gb = pass ? C.gold : (act > 0.5 ? C.navy3 : C.paper2); if (gr._b !== gb) { gr._b = gb; gr.style.background = gb; gr.style.color = pass ? '#fff' : (act > 0.5 ? C.gold2 : C.muted); }
      if (!pass && gr._c2 !== act > 0.5) { gr._c2 = act > 0.5; gr.style.color = act > 0.5 ? C.gold2 : C.muted; }
      const pp = pulse(t, tPass[i], 0.45); if (pp > 0.001) gr.style.transform = `scale(${(1 + 0.08 * pp).toFixed(4)})`;
    });
    PP.forEach((_, k) => {
      const tin = k ? tF[k - 1] : tF0 + 0.5, tout = k < 4 ? tF[k] - 0.14 : 1e9;
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
        TL.forEach((_, i) => { const g = $('#gs' + i), ta = tGoalW[0] + i * ((tGoalW[1] - tGoalW[0] + 0.6) / 4); const f = M.io((t - ta) / 0.25); g.style.background = mix(C.paper, C.gold, f); setIco(g, 'store', f > 0.5 ? '#fff' : C.ink, 32, 2.2); });
        M.vis($('#gok'), t, tPass[0] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k === 2) {
        RES.forEach((_, i) => { M.vis($('#rs' + i), t, tRes[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); const p = $('#rp' + i); const on = t > tRes[i]; M.hide(p, !on); p.style.strokeDashoffset = (-(t - tRes[i]) * 60).toFixed(1); });
        M.vis($('#rbox'), t, tin + 0.7, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      } else if (k === 3) {
        ['0', '1', '2', '3'].forEach((_, i) => M.vis($('#ps' + i), t, tin + 0.6 + i * 0.08, 1e9, { dy: 12 }));
        const u = ((t - tin - 0.9) / 2.4) % 1, uu = t < tin + 0.9 ? 0 : u, x = 80 + 588 * M.io(uu);
        $('#pcup').setAttribute('transform', `translate(${x.toFixed(1)} 96)`); M.hide($('#pcup'), t < tin + 0.9);
        const st = Math.min(3, Math.floor((x - 40) / 196)); ['0', '1', '2', '3'].forEach((_, i) => { const e = $('#ps' + i); const c = i === st && t > tin + 0.9 ? C.gold3 : C.paper; if (e._c !== c) { e._c = c; e.style.background = c; } });
        M.vis($('#pk0'), t, tSmooth - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#pk1'), t, tConf - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k === 4) {
        STK.forEach((_, i) => { M.vis($('#sk' + i), t, tStk[i] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); setIco($('#sk' + i).querySelector('.sic'), 'smile', C.gold, 40, 2.2); $('#skb' + i).style.width = (112 * M.o3((t - tStk[i]) / 0.8) * (0.75 + 0.05 * i)).toFixed(1) + 'px'; });
      }
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

  /* ===== J: the journey ===== */
  const jOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sJ'), !jOn);
  if (jOn) {
    M.vis($('#jr'), t, tJ0 + 0.05, tJout, { dy: 36, outDur: 0.3, ody: -16 });
    let reach = -1; tJn.forEach((tj, i) => { if (t >= tj - 0.1) reach = i; });
    const xr = M.track(110, tJn.map((tj, i) => [tj - 0.1, JX(i)]), M.HEAVY)(t);
    const xs = Math.abs(xr - Math.round(xr)) < 0.05 ? Math.round(xr) : xr;
    $('#jLine').setAttribute('x2', xs.toFixed(1)); M.hide($('#jLine'), t < tJn[0]);
    snap($('#jRavi'), (xs - 36).toFixed(1) + 'px', 'left'); M.vis($('#jRavi'), t, tJ0 + 0.4, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    JN.forEach(([ic], i) => {
      const g = $('#jn' + i), on = M.io((t - tJn[i] + 0.1) / 0.3);
      M.vis(g, t, tJ0 + 0.5 + i * 0.08, 1e9, { dy: 0, fade: 0.15 });
      const c = g.querySelector('circle'); c.setAttribute('fill', mix(C.paper, i === 4 ? C.ink : C.gold, on)); c.setAttribute('stroke', on > 0.5 ? (i === 4 ? C.ink : C.gold) : C.line);
      setIco(g.querySelector('.ji'), ic, on > 0.5 ? '#fff' : C.dim, 30, 2.2);
      M.vis($('#jt' + i), t, tJn[i] + 0.05, 1e9, { dy: 16 });
    });
    M.vis($('#jEnd'), t, tSpan + 0.2, 1e9, { dx: -20, dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
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
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X: the human side ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tX4 - 0.1, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tCups - 0.1);
    M.vis($('#xsImg'), t, tX1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#xsTag'), t, tX1 + 0.6, tCups - 0.4, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#xm'), t, tCups, tXout, { dx: 60, dy: 0, ...o });
    const up = M.o3((t - tRush + 0.2) / 1.0), dn = M.o3((t - tWorse + 0.2) / 1.0);
    $('#mb0').style.width = (420 * (0.45 + 0.47 * up)).toFixed(1) + 'px'; $('#mb1').style.width = (420 * (0.8 - 0.58 * dn)).toFixed(1) + 'px';
    M.vis($('#mv0'), t, tRush, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#mv1'), t, tWorse, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#xgd'), t, tX3 + 0.1, tXout, { dy: 36, ...o });
    M.vis($('#xgdS'), t, tGood - 0.1, 1e9, { dy: 8 });
    M.rise($('#xgd1'), t, tOnce - 0.05, { st: 0.05 }); M.rise($('#xgd2'), t, tStops - 0.1, { st: 0.06 });
    M.vis($('#xt'), t, tX4 + 0.05, tXout, { dx: -60, dy: 0, ...o });
    M.vis($('#tgC'), t, tLow - 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis($('#tgS'), t, tPay - 0.4, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#tgA'), t, tPay, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis($('#tgL'), t, tPay + 0.3, 1e9, { dy: 10 });
    M.vis($('#lesson'), t, tX5 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX5 + 0.15, 1e9, { dy: 40 });
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

  /* ===== recap + series complete ===== */
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
        const g = M.io((t - a) / 0.2), d = M.io((t - Math.max(b, a + 0.4)) / 0.3);
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
