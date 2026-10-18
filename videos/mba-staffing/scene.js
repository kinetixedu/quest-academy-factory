// MBA - Principles of Management, Ep 17: Staffing
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', off: '#DCD3C3', navy2: '#24345A' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  userPlus: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M19 8v6', 'M22 11h-6'],
  userCheck: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm16 11 2 2 4-4'],
  userX: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm17 8 5 5', 'm22 8-5 5'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  trendUp: ['M22 7 13.5 15.5 8.5 10.5 2 17', 'M16 7h6v6'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  chat: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  flag: ['M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tRdy = [wt('H2', 'stoves'), wt('H2', 'cups'), wt('H2', 'nobody')];
const tC1 = T0('C1'), tHire = [wt('C2', 'late'), wt('C2', 'burnt'), wt('C2', 'quit')], tThree = wt('C3', 'three'), tMist = wt('C3', 'mistakes');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tQ2 = wt('D2', 'and'), tD3 = T0('D3'), tMat = wt('D3', 'matters'), tKeep = [wt('D3', 'leave'), wt('D3', 'grow'), wt('D3', 'move')];
const tP0 = T0('P0'), tDout = tP0 - 0.32;
const tP = [1, 2, 3, 4, 5, 6, 7, 8].map(i => T0('P' + i));
const tR1 = T0('R1'), tR2 = T0('R2'), tR3 = T0('R3'), tR4 = T0('R4'), tMeena = wt('R2', 'Meena'), tNotice = wt('R3', 'notice'), tTip = wt('R3', 'tip');
const tIns = wt('R4', 'Insiders'), tOuts = wt('R4', 'Outsiders');
const tF1 = T0('F1'), tForty = wt('F1', 'forty'), tRecr = wt('F1', 'recruitment'), tChai = wt('F2', 'chai'), tBest = wt('F2', 'best'), tOnly = wt('F3', 'Only'), tTwo = wt('F3', 'two'), tSel = wt('F3', 'selection');
const tF4 = T0('F4'), tPos = wt('F4', 'positive'), tNegS = wt('F4', 'Selection'), tNeg = wt('F4', 'negative');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['plan', 'recruit', 'select', 'place', 'train', 'appraise', 'promote', 'pay'].map(w => wt('S3', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];
const trkGaps = [[tF1 - 0.3, tP[3]]], pnlGaps = [[tR1 - 0.3, tP[2]], [tF1 - 0.3, tP[3]]];

/* ---------- build ---------- */
const PERSON = `<svg width="100%" height="100%" viewBox="0 0 40 48" fill="currentColor" style="display:block"><circle cx="20" cy="11" r="10"/><path d="M2 47c0-11 8-19 18-19s18 8 18 19z"/></svg>`;
// awning + cups (same stall as Ep 01)
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = []; [[4, 0], [3, 1], [2, 2]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([430 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// outlet 2 checklist
const RDY = [['Stoves', 'flame', 1], ['Cups', 'cup', 1], ['Staff', 'users', 0]];
$('#rdyRow').innerHTML = RDY.map(([t, ic, ok], i) => `<div class="job" id="rd${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 28, ok ? C.ink : C.red, 2.2)}</div><div class="jt"${ok ? '' : ' style="color:#B5482F"'}>${t}</div><div class="av" style="background:${ok ? C.gold : C.red}">${M.icon(ok ? 'check' : 'x', 26, '#fff', 3)}</div></div>`).join('');
$('#hireAv').innerHTML = M.icon('user', 44, C.ink2, 2.2);
const HIRE = [['timer', 'Came late'], ['flame', 'Burnt the milk'], ['userX', 'Quit in a week']];
$('#hirePills').innerHTML = HIRE.map(([ic, t], i) => `<div class="pill bad" id="hp${i}" style="top:196px">${M.icon(ic, 24, C.red, 2.2)}${t}</div>`).join('');
const ROLES = [['Manager', 'store'], ['Tea maker', 'cup'], ['Cashier', 'coin']];
$('#roleRow').innerHTML = ROLES.map(([t, ic], i) => `<div class="job" id="ro${i}" style="left:${36 + i * 291}px"><div class="ring"></div><div class="ji">${M.icon(ic, 28, C.ink, 2.2)}</div><div class="jt">${t}</div><div class="qm">?</div></div>`).join('');
$('#jobsNi').innerHTML = M.icon('userPlus', 24, C.red, 2.2);
// definition cards
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const DD = [['Fill', 'The right person in every job', 'userCheck', 'AT CHAI CORNER', 'Three new jobs at outlet 2', ['Manager', 'Tea maker', 'Cashier']],
  ['Keep filled', 'Jobs open up again', 'refresh', 'BECAUSE PEOPLE', 'Staffing never really stops', ['Leave', 'Grow', 'Move up']]];
$('#dRow').innerHTML = DD.map(([t, m, ic, x, v, ps], i) => `<div class="ee" id="dd${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">${x}</div><div class="ev">${v}</div>${ps.map((p, k) => `<div class="ec" id="dc${i}${k}">${p}</div>`).join('')}</div>`).join('');
// process track
const STEPS = [['PLAN', 'clipboard'], ['RECRUIT', 'megaphone'], ['SELECT', 'filter'], ['PLACE', 'pin'], ['TRAIN', 'cap'], ['APPRAISE', 'star'], ['PROMOTE', 'trendUp'], ['PAY', 'coin']];
$('#trkN').innerHTML = STEPS.map(([l], i) => `<div class="tn" id="tn${i}" style="left:${i * 200}px"><div class="c"></div><div class="l">0${i + 1} ${l}</div></div>`).join('');
// step panes: [step label, title, meaning, [key pills], box html]
const tile = (id, x, w, ic, tx, sub) => `<div class="mt" id="${id}" style="left:${x}px;top:70px;width:${w}px;height:164px"><div class="mi" style="left:${w / 2 - 32}px;top:22px;width:64px;height:64px;border-radius:32px;background:var(--paper)">${ic}</div><div class="mx" style="top:${sub ? 96 : 106}px">${tx}</div>${sub ? `<div class="mx" style="top:128px;font:500 22px Poppins;color:var(--muted)">${sub}</div>` : ''}</div>`;
const note = (id, ic, tx) => `<div class="cnote" id="${id}">${M.icon(ic, 22, C.gold2, 2.4)}${tx}</div>`;
const qmk = `<div class="qm" style="position:static;width:56px;height:56px">?</div>`;
const avc = (l, bg) => `<div class="avc" style="position:static;width:56px;height:56px;border-radius:28px;font-size:24px;background:${bg}">${l}</div>`;
const avU = `<div style="width:56px;height:56px;border-radius:28px;background:var(--ink);display:flex;align-items:center;justify-content:center">${M.icon('user', 28, '#fff', 2.2)}</div>`;
const arrow = (x, y) => `<div class="abs" style="left:${x}px;top:${y}px">${M.icon('arrowR', 32, C.gold, 2.4)}</div>`;
const PANES = [
  ['THE BIG IDEA', '8 steps', 'From an empty job to a team that stays', [['users', 'Find people'], ['refresh', 'Keep people']],
    tile('b0a', 32, 152, M.icon('store', 30, C.gold, 2.2), 'Outlet 2') + tile('b0b', 208, 152, M.icon('users', 30, C.gold, 2.2), '3 jobs') + tile('b0c', 384, 152, M.icon('calendar', 30, C.gold, 2.2), '14 days') + note('b0n', 'flag', 'Every job needs the right person')],
  ['STEP 01 / 08', 'Manpower planning', 'How many people, and what kind?', [['users', 'How many?'], ['help', 'What kind?']],
    ROLES.map(([r], k) => tile('b1' + k, 32 + k * 176, 152, qmk, r)).join('') + note('b1n', 'users', 'Ravi needs 3 people')],
  ['STEP 02 / 08', 'Recruitment', 'Finding people, and getting them to apply', [['megaphone', 'Find them'], ['userPlus', 'Get them to apply']],
    `<div class="mt" id="b2a" style="left:32px;top:70px;width:240px;height:164px"><div class="abs" style="left:104px;top:18px">${M.icon('pin', 32, C.red, 2.2)}</div><div class="lbl" style="left:0;width:240px;text-align:center;top:60px">WANTED</div><div class="mx" style="top:88px">Tea maker</div><div class="mx" style="top:122px">Cashier</div></div>` +
    `<div id="b2p" class="abs" style="left:304px;top:70px;width:232px;height:164px">${Array.from({ length: 8 }, (_, k) => `<div class="abs" id="b2p${k}" style="left:${(k % 4) * 60 + 6}px;top:${Math.floor(k / 4) * 84 + 14}px;width:40px;height:48px;color:${C.ink2}">${PERSON}</div>`).join('')}</div>` + note('b2n', 'userPlus', 'People start to apply')],
  ['STEP 03 / 08', 'Selection', 'Choosing the best people', [['cup', 'A test'], ['chat', 'An interview']],
    tile('b3a', 32, 240, M.icon('cup', 30, C.gold, 2.2), 'Test', 'Make one cup') + tile('b3b', 296, 240, M.icon('chat', 30, C.gold, 2.2), 'Interview', 'Talk with Ravi') + note('b3n', 'check', 'Pick the best')],
  ['STEP 04 / 08', 'Placement and orientation', 'The right job, and a proper welcome', [['pin', 'Right job'], ['smile', 'Day 1 welcome']],
    [['flame', 'Stove'], ['coin', 'Cash box']].map(([ic, s], k) => `<div class="mt" id="b4${k}" style="left:32px;top:${70 + k * 90}px;width:504px;height:74px"><div class="abs" style="left:24px;top:9px">${avU}</div>${arrow(108, 21)}<div class="abs" style="left:168px;top:9px;width:56px;height:56px;border-radius:28px;background:var(--paper);display:flex;align-items:center;justify-content:center">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="mtl" style="left:244px;top:22px">${k ? 'New cashier' : 'New tea maker'} · ${s}</div></div>`).join('') + note('b4n', 'smile', 'Ravi shows them around')],
  ['STEP 05 / 08', 'Training and development', 'Building skills that grow over time', [['cap', 'Skills'], ['trendUp', 'Growth']],
    `<div class="mt" id="b5a" style="left:32px;top:70px;width:504px;height:164px"><div class="abs" style="left:56px;top:28px">${avc('A', C.gold)}</div><div class="mtl" style="left:0;width:168px;text-align:center;top:100px">Asha</div><div class="abs" id="b5r" style="left:168px;top:34px;width:168px;height:44px;border-radius:22px;background:var(--paper);display:flex;align-items:center;justify-content:center;gap:8px;font:600 22px Poppins">${M.icon('book', 22, C.gold, 2.2)}Recipe</div><div class="abs" style="left:392px;top:28px">${avU}</div><div class="mtl" style="left:336px;width:168px;text-align:center;top:100px">New hire</div></div>` + note('b5n', 'cup', 'Every cup tastes the same')],
  ['STEP 06 / 08', 'Performance appraisal', 'A regular review of how well each person works', [['clipboard', 'Regular review'], ['star', 'How well?']],
    ['Speed', 'Taste', 'On time'].map((s, k) => `<div class="sbar" id="b6${k}" style="top:${74 + k * 62}px"><div class="sl">${s}</div><div class="st"><div class="sf"></div></div></div>`).join('') + note('b6n', 'star', 'Reviewed every month')],
  ['STEP 07 / 08', 'Promotion and transfer', 'Moving people up, or across', [['arrowU', 'Move up'], ['arrowR', 'Move across']],
    tile('b7a', 32, 240, M.icon('arrowU', 30, C.gold, 2.4), 'Promotion', 'A bigger job') + tile('b7b', 296, 240, M.icon('arrowR', 30, C.gold, 2.4), 'Transfer', 'A busier outlet') + note('b7n', 'star', 'A star grows with Chai Corner')],
  ['STEP 08 / 08', 'Compensation', 'Fair pay and rewards', [['coin', 'Fair pay'], ['trophy', 'Rewards']],
    tile('b8a', 32, 240, M.icon('coin', 30, C.gold, 2.2), 'Fair pay', 'On time, every month') + tile('b8b', 296, 240, M.icon('trophy', 30, C.gold, 2.2), 'Rewards', 'For great work') + note('b8n', 'smile', 'So good people stay')],
];
$('#sps').innerHTML = PANES.map(([s, t, m, kw, bx], i) => `<div class="sp" id="sp${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>${kw.map(([ic, k], j) => `<div class="kw" id="kw${i}${j}">${M.icon(ic, 24, C.gold, 2.2)}${k}</div>`).join('')}<div class="bx"><div class="lbl">AT CHAI CORNER</div>${bx}</div></div>`).join('');
// internal vs external
const SRC = [['Internal', 'People already inside', 'home', `<div class="avc">M</div><span class="tx">Meena moves up to manager</span>`, ['check', 'Already knows the work']],
  ['External', 'People from outside', 'megaphone', `<div class="ep" id="ep0">${M.icon('pin', 24, C.gold, 2.2)}Notice on the stall</div><div class="ep" id="ep1">${M.icon('users', 24, C.gold, 2.2)}Tip from a regular</div>`, ['zap', 'Brings fresh skills']]];
$('#srcRow').innerHTML = SRC.map(([t, m, ic, row, [pi, pt]], i) => `<div class="src" id="sc${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">AT CHAI CORNER</div><div class="erow">${row}</div><div class="ec" id="scp${i}"><span class="pi"></span>${pt}</div></div>`).join('');
// funnel
const FX = 392, hw = y => 352 - (y - 84) * 0.487;
const band = (y0, y1) => `M${(FX - hw(y0)).toFixed(1)} ${y0} H${(FX + hw(y0)).toFixed(1)} L${(FX + hw(y1)).toFixed(1)} ${y1} H${(FX - hw(y1)).toFixed(1)} Z`;
[[84, 300], [316, 446], [462, 560]].forEach(([a, b], i) => { const p = $('#band' + i); p.setAttribute('d', band(a + 8, b - 8)); p.setAttribute('stroke', C.paper); p.setAttribute('stroke-width', '16'); p.setAttribute('stroke-linejoin', 'round'); });
const PPL = [];
for (let k = 0; k < 40; k++) PPL.push([0, 168 + (k % 10) * 46, 103 + Math.floor(k / 10) * 48]);
for (let k = 0; k < 10; k++) PPL.push([1, 283 + (k % 5) * 46, 333 + Math.floor(k / 5) * 52]);
for (let k = 0; k < 2; k++) PPL.push([2, 352 + k * 46, 491]);
$('#fpp').innerHTML = PPL.map(([, x, y], i) => `<div class="fp2" id="fp${i}" style="left:${x}px;top:${y}px">${PERSON}</div>`).join('');
const KEEP0 = new Set([2, 5, 9, 13, 16, 21, 24, 28, 33, 37]), KEEP1 = new Set([41, 47]);
const SR = [['40', 'Applied', 'One notice on the stall', 'RECRUITMENT'], ['10', 'Interviewed', 'The best cups of chai', ''], ['2', 'Hired', 'A tea maker and a cashier', 'SELECTION']];
$('#srRows').innerHTML = SR.map(([n, t, s, g], i) => `<div class="sr" id="sr${i}" style="top:${32 + i * 180}px"><div class="bg"></div><div class="serif sn">${n}</div><div class="serif stt">${t}</div><div class="sst">${s}</div>${g ? `<div class="tg">${g}</div>` : ''}</div>`).join('');
const CV = [['plus', 'RECRUITMENT', 'Positive', 'It attracts many people'], ['minus', 'SELECTION', 'Negative', 'It rejects many people']];
$('#cvRows').innerHTML = CV.map(([ic, k, t, s], i) => `<div class="cv" id="cv${i}" style="top:${32 + i * 271}px"><div class="bg"></div><div class="ci"><span class="ico"></span></div><div class="ck">${k}</div><div class="serif ct">${t}</div><div class="cs">${s}</div></div>`).join('');
// quiz
const OPTS = ['Recruitment', 'Selection', 'Placement', 'Appraisal'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('filter', 40, C.gold2, 2.4);
// recap
const ROWS = [['users', 'Fill jobs with the right people, <span class="acc">and keep them filled</span>'], ['clipboard', 'Eight steps'], ['filter', 'Recruitment <span class="acc">attracts many.</span> Selection <span class="acc">picks the few.</span>']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
const RP = ['Plan', 'Recruit', 'Select', 'Place', 'Train', 'Appraise', 'Promote', 'Pay'];
$('#rw1').insertAdjacentHTML('beforeend', RP.map((p, k) => `<div class="fp" id="rp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
// entrance at tin, then step away during each gap [a, b] and come back at b
const gv = (el, t, tin, gaps) => {
  let op = t < tin ? 0 : M.clamp((t - tin) / 0.18), y = 36 * (1 - M.spring(t - tin, M.SOFT));
  for (const [a, b] of gaps) {
    if (t < a) continue;
    if (t < b) { const o = M.io((t - a) / 0.3); op *= 1 - o; y = -16 * o; }
    else { op = M.clamp((t - b) / 0.18); y = 36 * (1 - M.spring(t - b, M.SOFT)); }
  }
  if (op <= 0.001) { M.hide(el, true); return false; }
  M.hide(el, false); el.style.opacity = op >= 0.999 ? '' : op.toFixed(3);
  el.style.transform = Math.abs(y) < 0.01 ? 'none' : `translateY(${y.toFixed(2)}px)`;
  return true;
};
const paneIn = [tP0 + 0.45, ...tP];
const paneOut = paneIn.map((v, k) => k === 2 ? tR1 + 0.05 : k === 3 ? tF1 + 0.05 : k < 8 ? paneIn[k + 1] - 0.14 : 1e9);
const trkX = M.track(100, tP.slice(1).map((v, k) => [v, 300 + k * 200]), M.SOFT);
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let k = 0; k < 3; k++) { const p = $('#hp' + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  [0, 1].forEach(i => { let xx = 44; for (let k = 0; k < 3; k++) { const p = $('#dc' + i + k); p.style.left = xx + 'px'; xx += p.offsetWidth + 16; } });
  PANES.forEach((_, i) => {
    const pt = $('#sp' + i + ' .pt'); if (pt.offsetWidth > 896) pt.style.transform = `scale(${(896 / pt.offsetWidth).toFixed(4)})`;
    let xx = 48; for (let j = 0; j < 2; j++) { const k = $('#kw' + i + j); k.style.left = xx + 'px'; xx += k.offsetWidth + 16; }
  });
  const rt = $('#rw1 .rt'); let px = 216 + rt.offsetWidth + 40;
  for (let k = 0; k < 8; k++) { const p = $('#rp' + k); p.style.left = px + 'px'; px += p.offsetWidth + 14; }
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

  /* ===== A: outlet 2, nobody to run it ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tRdy[1] + i * 0.05; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // checklist -> last year's hire
    M.vis($('#ready'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.vis($('#rdy1'), t, null, tC1 - 0.1, { outDur: 0.25, ody: -14 });
    RDY.forEach((_, i) => {
      const el = $('#rd' + i); M.vis(el, t, tRdy[i] - 0.08, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.av'), t, tRdy[i] + 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      if (i === 2) el.style.background = mix(C.paper, C.redBg, M.io((t - tRdy[2] - 0.2) / 0.3));
    });
    M.vis($('#rdy2'), t, tC1 + 0.05, 1e9, { dy: 16 });
    M.vis($('#hireAv'), t, tC1 + 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#hireT'), t, wt('C1', 'first') - 0.1, { st: 0.05 });
    HIRE.forEach((_, i) => M.vis($('#hp' + i), t, tHire[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }));
    // roles to fill
    M.vis($('#roles'), t, tMorph + 0.42, 1e9, { dy: 36 });
    ROLES.forEach((_, i) => {
      const el = $('#ro' + i); M.vis(el, t, tMorph + 0.7 + i * 0.12, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.qm'), t, tRdy[2] + 0.1 + i * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      M.vis(el.querySelector('.ring'), t, tThree + 0.1 + i * 0.1, 1e9, { dy: 0, sc: 1.04, sp: M.SOFT, fade: 0.15 });
    });
    M.vis($('#jobsN'), t, wt('C3', 'jobs') + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
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

  /* ===== D: what is staffing? ===== */
  const dOn = t >= tTu - 0.05 && t < tP0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#mdl'), t, tD2 + 0.05, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    M.rise($('#quote1'), t, tD2 + 0.1, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, tQ2 - 0.05, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tD3 + 0.12, tDout, { dy: 24, ...o });
    DD.forEach((d, i) => {
      const el = $('#dd' + i); M.vis(el, t, tD3 + 0.3 + i * 0.12, tDout, { dy: 36, ...o });
      const act = i === 1 ? M.io((t - tMat) / 0.32) : 0;
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(C.ink, '#fff', act);
      el.querySelector('.em').style.color = mix(C.gold, C.gold2, act);
      el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), d[2], act > 0.5 ? C.gold2 : C.gold, 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      el.querySelector('.ex').style.color = mix(C.muted, '#8C96AE', act);
      el.querySelector('.ev').style.color = mix(C.ink, '#fff', act);
      for (let k = 0; k < 3; k++) {
        const p = $('#dc' + i + k), tin = i ? tKeep[k] - 0.05 : tD3 + 0.7 + k * 0.1;
        M.vis(p, t, tin, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
        p.style.background = i ? C.gold : mix(C.paper, C.paper, 0); p.style.color = i ? '#fff' : C.ink;
      }
    });
  }

  /* ===== P: the staffing process (track + step panel + sources) ===== */
  const pOn = t >= tP0 - 0.1 && t < tQ + 0.05; M.hide($('#sP'), !pOn);
  if (pOn) {
    gv($('#trk'), t, tP0 + 0.05, trkGaps);
    M.draw($('#trkL'), t, tP0 + 0.2, 1.0, M.io);
    const gx = trkX(t); $('#trkG').setAttribute('x2', gx.toFixed(1)); M.hide($('#trkG'), t < tP[1] || gx < 101);
    STEPS.forEach((s, k) => {
      const el = $('#tn' + k), ta = tP[k], td = k < 7 ? tP[k + 1] : 1e9;
      M.vis(el, t, tP0 + 0.3 + k * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const c = el.querySelector('.c'); c.style.background = mix(C.card, C.gold, act); c.style.borderColor = t >= ta ? C.gold : C.line;
      setIco(c, s[1], act > 0.5 ? '#fff' : (t >= ta ? C.gold : C.dim), 30, 2.2);
      el.querySelector('.l').style.color = t >= ta ? (act > 0.5 ? C.gold : C.ink) : C.muted;
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tP0 + 2) c.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.1 * lift).toFixed(4)})` : 'none';
    });
    const pnlOn = gv($('#pnl'), t, tP0 + 0.3, pnlGaps);
    if (pnlOn) PANES.forEach((_, k) => {
      const tin = paneIn[k], tout = paneOut[k], pn = $('#sp' + k);
      const hid = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, hid); if (hid) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.035, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.bx'), t, tin + 0.15, tout, { dy: 20, ...oo });
      const kwT = [[tin + 1.0, tin + 1.3], [wt('P1', 'How'), wt('P1', 'what')], [wt('P2', 'Finding'), wt('P2', 'apply')], [wt('P3', 'test'), wt('P3', 'interview')],
        [wt('P4', 'right'), wt('P4', 'welcome')], [wt('P5', 'Training'), wt('P5', 'development')], [wt('P6', 'regular'), wt('P6', 'how')], [wt('P7', 'up'), wt('P7', 'across')], [wt('P8', 'Fair'), wt('P8', 'rewards')]][k];
      kwT.forEach((tk, j) => M.vis($('#kw' + k + j), t, Math.max(tk, tin + 0.5) - 0.05, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08, ...oo }));
      const pop = (id, tt) => M.vis($(id), t, Math.max(tt, tin + 0.35), tout, { dy: 18, ...oo });
      const hl = (id, tt) => { const e = $(id), g = M.io((t - tt + 0.05) / 0.25); e.style.boxShadow = g > 0.001 ? `inset 0 0 0 3px ${M.rgba(C.gold, g)}` : ''; };
      const nt = (id, tt) => M.vis($(id), t, Math.max(tt, tin + 0.5), tout, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, ...oo });
      if (k === 0) { ['a', 'b', 'c'].forEach((s, j) => pop('#b0' + s, tin + 0.5 + j * 0.15)); nt('#b0n', tin + 1.2); }
      if (k === 1) { [wt('P1', 'manager'), wt('P1', 'tea'), wt('P1', 'cashier')].forEach((tt, j) => { pop('#b1' + j, tin + 0.6 + j * 0.12); const e = $('#b1' + j), g = M.io((t - tt + 0.05) / 0.25); e.style.boxShadow = g > 0.001 ? `inset 0 0 0 3px ${M.rgba(C.gold, g)}` : ''; const q = e.querySelector('.qm'); q.style.borderColor = mix('#CFC5B3', C.gold, g); q.style.color = mix(C.muted, C.gold, g); }); nt('#b1n', wt('P1', 'cashier') + 0.35); }
      if (k === 2) { pop('#b2a', tin + 0.4); for (let j = 0; j < 8; j++) M.vis($('#b2p' + j), t, wt('P2', 'getting') + j * 0.09, tout, { dy: 10, sc: 0.7, sp: M.POP, fade: 0.1, ...oo }); nt('#b2n', wt('P2', 'apply')); }
      if (k === 3) { pop('#b3a', tin + 0.5); pop('#b3b', tin + 0.62); hl('#b3a', wt('P3', 'test')); hl('#b3b', wt('P3', 'interview')); nt('#b3n', wt('P3', 'interview') + 0.4); }
      if (k === 4) { pop('#b40', wt('P4', 'Each')); pop('#b41', wt('P4', 'person') + 0.2); nt('#b4n', wt('P4', 'welcome')); }
      if (k === 5) { pop('#b5a', wt('P5', 'Asha') - 0.1); M.vis($('#b5r'), t, wt('P5', 'recipe') - 0.05, tout, { dx: -20, dy: 0, ...oo }); nt('#b5n', wt('P5', 'same') - 0.2); }
      if (k === 6) {
        ['regular', 'how', 'well'].forEach((w, j) => {
          const tt = wt('P6', w) - 0.05; pop('#b6' + j, tt);
          $('#b6' + j + ' .sf').style.width = (354 * [0.78, 0.94, 0.66][j] * M.o3((t - tt - 0.15) / 0.7)).toFixed(1) + 'px';
        });
        nt('#b6n', wt('P6', 'works'));
      }
      if (k === 7) { pop('#b7a', tin + 0.5); pop('#b7b', tin + 0.62); hl('#b7a', wt('P7', 'up')); hl('#b7b', wt('P7', 'across')); nt('#b7n', wt('P7', 'outlet')); }
      if (k === 8) { pop('#b8a', tin + 0.5); pop('#b8b', tin + 0.62); hl('#b8a', wt('P8', 'Fair')); hl('#b8b', wt('P8', 'rewards')); nt('#b8n', wt('P8', 'stay') - 0.2); }
    });
    // internal vs external sources
    const srcOn = t >= tR1 - 0.1 && t < tP[2] + 0.3;
    M.hide($('#srcRow'), !srcOn);
    if (srcOn) {
      const so = { outDur: 0.3, ody: -16 }, tOut = tP[2] - 0.32;
      SRC.forEach((s, i) => {
        const el = $('#sc' + i), ta = i ? tR3 : tR2, td = i ? tR4 : tR3;
        M.vis(el, t, tR1 + 0.1 + i * 0.12, tOut, { dy: 36, ...so });
        const act = on01(t, ta, td);
        const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
        el.querySelector('.et').style.color = mix(t < ta ? C.dim : C.ink, '#fff', act);
        el.querySelector('.em').style.color = mix(t < ta ? C.dim : C.gold, C.gold2, act);
        el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
        setIco(el.querySelector('.ico'), s[2], act > 0.5 ? C.gold2 : (t < ta ? C.dim : C.gold), 48, 2);
        el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
        const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.4, 1e9, { dy: 10 }); ex.style.color = mix(C.muted, '#8C96AE', act);
        const row = el.querySelector('.erow');
        if (i === 0) {
          M.vis(row, t, tR2 + 0.5, 1e9, { dy: 16 });
          row.querySelector('.avc').style.background = mix(C.ink, C.gold, M.io((t - tMeena) / 0.3));
          row.querySelector('.tx').style.color = mix(C.ink, '#fff', act);
        } else {
          [tNotice, tTip].forEach((tt, j) => { const p = $('#ep' + j); M.vis(p, t, Math.min(tt - 0.1, tR3 + 0.5 + j * 0.15), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }); p.style.background = mix(C.paper, C.navy2, act); p.style.color = mix(C.ink, '#fff', act); });
        }
        const pc = $('#scp' + i); M.vis(pc, t, (i ? tOuts : tIns) - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
        pc.style.background = C.gold; pc.style.color = '#fff'; setIco(pc.querySelector('.pi'), s[4][0], '#fff', 24, 2.4);
      });
    }
  }

  /* ===== F: the hiring funnel ===== */
  const fOn = t >= tF1 - 0.1 && t < tP[3] + 0.2; M.hide($('#sF'), !fOn);
  M.vis($('#exChip'), t, tF1 + 0.3, tP[3] - 0.32, { dy: 10, outDur: 0.3 });
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 }, tOut = tP[3] - 0.32;
    M.vis($('#fun'), t, tF1 + 0.05, tOut, { dy: 36, ...fo });
    M.vis($('#stg'), t, tF1 + 0.17, tOut, { dy: 36, ...fo });
    [0, 1, 2].forEach(i => {
      const tin = tF1 + 0.3 + i * 0.1;
      const b = $('#band' + i); M.vis(b, t, tin, 1e9, { dy: 0, fade: 0.3 });
      const tint = i === 0 ? M.io((t - tPos) / 0.35) : M.io((t - tNeg) / 0.35);
      const c = mix(C.paper, i === 0 ? '#F3E8CF' : C.redBg, tint); b.setAttribute('fill', c); b.setAttribute('stroke', c);
    });
    PPL.forEach(([g], i) => {
      const el = $('#fp' + i);
      const tin = g === 0 ? tForty - 0.1 + i * 0.022 : g === 1 ? tBest + (i - 40) * 0.05 : tTwo + (i - 50) * 0.12;
      M.vis(el, t, tin, 1e9, { dy: 12, sc: 0.7, sp: M.POP, fade: 0.1 });
      const cut = g === 0 ? (!KEEP0.has(i) ? M.io((t - tChai - (i % 10) * 0.02) / 0.35) : 0) : g === 1 ? (!KEEP1.has(i) ? M.io((t - tOnly - (i - 40) * 0.03) / 0.35) : 0) : 0;
      const kept = g === 0 ? (KEEP0.has(i) ? M.io((t - tChai) / 0.3) : 0) : g === 1 ? (KEEP1.has(i) ? M.io((t - tOnly) / 0.3) : 0) : 1;
      el.style.color = mix(mix(C.ink2, C.ink, kept), C.off, cut);
      if (g === 2) el.style.color = C.gold;
    });
    // stage rows, then the positive / negative contrast
    const tRowIn = [tF1 + 0.4, tF1 + 0.52, tF1 + 0.64], tRowOn = [tForty - 0.1, tBest - 0.15, tTwo - 0.1];
    SR.forEach((r, i) => {
      const el = $('#sr' + i); M.vis(el, t, tRowIn[i], tF4 - 0.05, { dy: 24, outDur: 0.25, ody: -14 });
      M.count(el.querySelector('.sn'), t, tRowOn[i], [1.0, 0.6, 0.4][i], 0, [40, 10, 2][i]);
      const on = M.io((t - tRowOn[i]) / 0.3);
      el.querySelector('.sn').style.color = mix(C.dim, C.gold, on); el.querySelector('.stt').style.color = mix(C.dim, C.ink, on); el.querySelector('.sst').style.color = mix(C.dim, C.ink2, on);
      const tg = el.querySelector('.tg'); if (tg) M.vis(tg, t, (i ? tSel : tRecr) - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
    });
    CV.forEach((c, i) => {
      const el = $('#cv' + i), ta = i ? tNegS : tPos;
      M.vis(el, t, tF4 + 0.15 + i * 0.12, 1e9, { dy: 24, outDur: 0.25 });
      const on = M.io((t - ta) / 0.32), act = i ? on : on * (1 - M.io((t - tNegS) / 0.4));
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.paper, C.ink, act);
      el.querySelector('.ci').style.background = mix('#fff', i ? C.red : C.gold, on);
      setIco(el.querySelector('.ico'), c[0], on > 0.5 ? '#fff' : C.dim, 44, 2.6);
      el.querySelector('.ck').style.color = mix(C.muted, act > 0.5 ? '#8C96AE' : C.muted, act);
      el.querySelector('.ct').style.color = mix(t < ta ? C.dim : C.ink, i ? '#F0B49F' : '#E9B95C', act);
      el.querySelector('.cs').style.color = mix(t < ta ? C.dim : C.ink, '#fff', act);
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Which') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Which') + 0.2 + i * 0.08, 1e9, { dy: 40 });
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
    ROWS.forEach((_, i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04 });
    });
    for (let k = 0; k < 8; k++) {
      const el = $('#rp' + k); M.vis(el, t, tPill[k] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const a = tPill[k] - 0.05, b = k < 7 ? tPill[k + 1] - 0.05 : tRow[2] - 0.3;
      const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
      el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
      el.style.color = g > 0.5 ? '#fff' : C.ink;
    }
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist only) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.2);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
