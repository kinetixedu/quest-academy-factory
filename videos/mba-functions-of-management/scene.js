// MBA - Principles of Management, Ep 14: Functions of Management
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', link: '#D9CFBC', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  userPlus: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M19 8v6', 'M22 11h-6'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 22a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  refresh: ['M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8', 'M21 3v5h-5'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  alert: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 8v4', 'M12 16h.01'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  checkCircle: ['M21.801 10A10 10 0 1 1 17 3.335', 'm9 11 3 3L22 4'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = wt('H1', 'near') - 0.1, tSecond = wt('H1', 'second');
const tBroke = wt('H2', 'broke'), tTwo = wt('H2', 'two');
const tC1 = T0('C1'), tJob = [wt('C1', 'Rent'), wt('C1', 'Hire'), wt('C1', 'Buy')];
const tJump = [wt('C2', 'jumps'), wt('C2', 'job'), wt('C2', 'job', 1)], tNoth = wt('C2', 'nothing'), tWeeks = wt('C3', 'two');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;          // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tD2 = T0('D2'), tDc = [wt('D2', 'core'), wt('D2', 'every', 1), wt('D2', 'again')], tDout = T0('G1') - 0.32;
const tG1 = T0('G1'), tGul = wt('G1', 'Luther'), tSeven = wt('G1', 'seven');
const tG2 = T0('G2'), tW7 = ['Planning', 'organizing', 'staffing', 'directing', 'coordinating', 'reporting', 'budgeting'].map(w => wt('G2', w));
const tG3 = T0('G3'), tFirst = wt('G3', 'first'), tG4 = T0('G4'), tFive = wt('G4', 'five');
const tRep = wt('G5', 'Reporting'), tBud = wt('G5', 'budgeting'), tCtl = wt('G5', 'controlling'), tCoo = wt('G5', 'Coordinating'), tRuns = wt('G5', 'runs'), tGout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tAsk = [1, 2, 3, 4, 5].map(i => wt('F' + i, 'asks'));
const tGoal = wt('F1', 'goal'), tTwoH = wt('F1', 'Two'), tParts = [wt('F2', 'kitchen'), wt('F2', 'counter'), wt('F2', 'cleaning')];
const tMeena = wt('F3', 'Meena'), tHelp2 = wt('F3', 'two', 0), tAsha = wt('F4', 'Asha'), tTrain = wt('F4', 'helpers');
const tKabir = wt('F5', 'Kabir'), tOnly = wt('F5', 'Only');
const tX1 = T0('X1'), tBack = wt('X1', 'back'), tPlanAgain = wt('X1', 'planning'), tX2 = T0('X2'), tSevenAm = wt('X2', 'seven'), tX3 = T0('X3'), tCycle = wt('X3', 'cycle'), tFout = T0('K1') - 0.32;
const tK1 = T0('K1'), tCoord = wt('K1', 'Coordination'), tK2 = T0('K2'), tEvery = wt('K2', 'every'), tRight = wt('K2', 'right');
const tK3 = T0('K3'), tHelpers = wt('K3', 'helpers'), tStoves = wt('K3', 'stoves'), tNothing = wt('K3', 'nothing');
const tK4 = T0('K4'), tLines = wt('K4', 'lines'), tNine = wt('K4', 'nine'), tTen = wt('K4', 'ten');
const tK5 = T0('K5'), tEss = wt('K5', 'essence'), tKout = T0('R1') - 0.32;
const tR1 = T0('R1'), tTwoR = wt('R1', 'two'), tBeaten = wt('R1', 'Goal'), tE1 = T0('E1'), tFiveE = wt('E1', 'five'), tOneE = wt('E1', 'one');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['planning', 'organizing', 'staffing', 'directing', 'controlling'].map(w => wt('S2', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning + cups (same stall as Ep 01)
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = []; [[4, 0], [3, 1], [2, 2]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([430 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#os0').innerHTML = M.icon('store', 44, C.ink, 2); $('#os1').innerHTML = M.icon('store', 44, C.gold, 2);
$('#oPi').innerHTML = M.icon('alert', 24, C.red, 2.2); $('#dPi').innerHTML = M.icon('calendar', 24, C.ink, 2.2); $('#finI').innerHTML = M.icon('alert', 24, C.red, 2.2);
const JOBS = [['Rent shop', 'key', 0.18], ['Hire people', 'users', 0.12], ['Buy stoves', 'flame', 0.2]];
const JUMP = [[0, 0.42], [1, 0.36], [2, 0.44]];   // which job Ravi jumps to, and how far it gets (never finished)
$('#jobRow').innerHTML = JOBS.map(([t, ic], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 28, C.ink, 2.2)}</div><div class="jt">${t}</div><div class="jb"><i></i></div></div>`).join('');
// definition cards
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const DC = [['briefcase', 'Core jobs', 'The main work of a manager', 'Running the stall'], ['store', 'Every business', 'Big or small, any kind', 'A chai stall or a bank'], ['refresh', 'Again and again', 'They never really stop', 'Every week, every outlet']];
$('#dRow').innerHTML = DC.map(([ic, t, s, e], i) => `<div class="card dc" id="dc${i}" style="left:${160 + i * 544}px"><div class="di">${M.icon(ic, 52, C.gold, 2)}</div><div class="serif dt">${t}</div><div class="ds">${s}</div><div class="hr"></div><div class="dx">AT CHAI CORNER</div><div class="de">${e}</div></div>`).join('');
// Gulick's seven tiles
const G7 = [['P', 'PLANNING'], ['O', 'ORGANIZING'], ['S', 'STAFFING'], ['D', 'DIRECTING'], ['CO', 'COORDINATING'], ['R', 'REPORTING'], ['B', 'BUDGETING']];
$('#tiles').innerHTML = G7.map(([l], i) => `<div class="lt7" id="lt${i}" style="left:${(40 + i * 220.667).toFixed(2)}px;width:196.67px"><div class="serif lg">${l}</div><div class="lw">0${i + 1}</div></div>`).join('');
$('#gav').innerHTML = M.icon('book', 52, C.gold, 2); $('#gpaI').innerHTML = M.icon('calendar', 24, C.gold, 2.2); $('#gpbI').innerHTML = M.icon('clipboard', 24, C.gold, 2.2);
$('#gword').innerHTML = G7.map(([l], i) => `<span id="gw${i}">${l}</span>`).join('');
const F5N = [['P', 'Planning'], ['O', 'Organizing'], ['S', 'Staffing'], ['D', 'Directing'], ['C', 'Controlling']];
$('#f5row').innerHTML = F5N.map(([l, n], i) => `<div class="f5" id="f5${i}" style="left:${40 + i * 308}px"><b>${l}</b>${n}</div>`).join('');
$('#gsI').innerHTML = M.icon('link', 28, C.gold2, 2.2);
// five question cards + the loop
const FQ = [['Plan', 'clipboard', 'What to do?'], ['Organize', 'network', 'Who does what?'], ['Staff', 'userPlus', 'Who exactly?'], ['Direct', 'compass', 'How to guide?'], ['Control', 'gauge', 'On track?']];
$('#fRow').innerHTML = FQ.map(([v, ic, q], i) => `<div class="fc" id="fc${i}" style="left:${(160 + i * 326.4).toFixed(1)}px"><div class="bg"></div><div class="fn">0${i + 1}</div><div class="fi"></div><div class="serif ft">${v}</div><div class="hr"></div><div class="fa">ASKS</div><div class="fq">${q}</div></div>`).join('');
$('#chev').innerHTML = [0, 1, 2, 3].map(i => `<path id="cv${i}" d="M-5 -10 L5 0 L-5 10" stroke="${C.link}" stroke-width="4" transform="translate(${(470.4 + i * 326.4).toFixed(1)} 420)"/>`).join('');
const PERSON = `<svg width="40" height="48" viewBox="0 0 40 48" fill="currentColor"><circle cx="20" cy="11" r="10"/><path d="M2 47c0-11 8-19 18-19s18 8 18 19z"/></svg>`;
const helper = (id) => `<div class="avc" id="${id}" style="background:${C.paper};color:${C.ink2}"><span style="display:block;width:28px;height:34px">${PERSON.replace('width="40" height="48"', 'width="28" height="34"')}</span></div>`;
const XP = [
  ['OUTLET 2 · THE PLAN', 'store', 'Ravi runs every step through five questions', ''],
  ['STEP 01 · PLAN', 'target', 'Ravi sets a goal for the new outlet', `<span class="serif big" id="xv1a">200</span><span class="unit" id="xv1b">cups a day</span>`],
  ['STEP 02 · ORGANIZE', 'network', 'He splits the work into three parts', ['Kitchen', 'Counter', 'Cleaning'].map((p, k) => `<span class="pill pl" id="xv2${k}">${p}</span>`).join('')],
  ['STEP 03 · STAFF', 'userPlus', 'Meena runs it, and two helpers join', `<div class="avc" id="xv3m" style="background:${C.gold}">M</div><span class="unit" id="xv3t">+</span>${helper('xv3a')}${helper('xv3b')}`],
  ['STEP 04 · DIRECT', 'compass', 'Asha trains the helpers on her recipe', `<div class="avc" id="xv4a" style="background:${C.gold}">A</div><span id="xv4r">${M.icon('arrowR', 36, C.gold, 2.4)}</span>${helper('xv4b')}${helper('xv4c')}`],
  ['STEP 05 · CONTROL', 'gauge', 'Kabir counts the cups every evening', `<div id="cbar"><div class="tk"></div><div class="fl"></div><div class="gl"></div><div class="gt">GOAL 200</div><div class="cv">150 cups</div></div><span class="pill pl" id="xv5p" style="background:${C.redBg};color:${C.red}">Not yet</span>`],
  ['STEP 01 AGAIN · PLAN', 'target', 'New plan: open early for the college rush', `<span id="xv6i">${M.icon('clock', 64, C.gold, 2)}</span><span class="serif big" id="xv6a">7:00 AM</span>`],
  ['THE BIG IDEA', 'refresh', 'Controlling feeds the next plan', ['Round 1', 'Round 2', 'Round 3'].map((p, k) => `<span class="pill pl" id="xv7${k}">${p}</span>`).join('')],
];
$('#xps').innerHTML = XP.map(([l, ic, s, v], i) => `<div class="xp" id="xp${i}"><div class="xl">${l}</div><div class="xi">${M.icon(ic, 36, C.gold, 2.2)}</div><div class="xs">${s}</div><div class="xv" id="xv${i}">${v}</div></div>`).join('');
// coordination timeline (14 days)
const DX = d => 400 + (d - 1) * (1160 / 14);      // card x where day d starts
$('#axis').innerHTML = [[1, 'DAY 1'], [7, 'DAY 7'], [14, 'DAY 14']].map(([d, l]) => `<div class="ax" id="ax${d}" style="left:${DX(d).toFixed(1)}px">${l}</div>`).join('');
const TROWS = [['Shop ready', 'key'], ['Stoves arrive', 'flame'], ['Helpers start', 'users']];
$('#trows').innerHTML = TROWS.map(([n], i) => `<div class="trow" id="tr${i}" style="top:${128 + i * 108}px"><div class="tn">${n}</div><div class="tt"></div><div class="tb"></div>${i === 2 ? '<div class="tr" id="idle">Nothing to do</div>' : ''}</div>`).join('');
$('#kdI').innerHTML = M.icon('link', 36, C.gold, 2.2); $('#syI').innerHTML = M.icon('check', 24, '#fff', 2.6); $('#essI').innerHTML = M.icon('link', 44, C.gold2, 2.4);
$('#vline').style.left = (DX(10) - 2).toFixed(1) + 'px';
// results + coming up
const RX = v => 704 * v / 250;      // bar width for v cups (track 704 = 250 cups)
$('#rgl').style.left = (40 + RX(200) - 2).toFixed(1) + 'px'; $('#rgt').style.left = (40 + RX(200) - 50).toFixed(1) + 'px';
$('#beatI').innerHTML = M.icon('trophy', 24, '#fff', 2.2);
const CR = [['P', 'Plan', 'A goal of 200 a day'], ['O', 'Organize', 'Three clear parts'], ['S', 'Staff', 'Meena and two helpers'], ['D', 'Direct', "Asha's recipe"], ['C', 'Control', 'Checked, then re-planned']];
$('#crows').innerHTML = CR.map(([l, n, d], i) => `<div class="cr" id="cr${i}" style="top:${96 + i * 92}px"><b>${l}</b><div class="serif cn">${n}</div><div class="cd">${d}</div><div class="ck">${M.icon('check', 24, '#fff', 3)}</div></div>`).join('');
$('#epRow').innerHTML = FQ.map(([v, ic], i) => `<div class="ep" id="ep${i}" style="left:${(160 + i * 326.4).toFixed(1)}px"><div class="bg"></div><div class="en">EP ${15 + i}</div><div class="ei">${M.icon(ic, 44, C.gold, 2)}</div><div class="serif et">${v}</div><div class="hr"></div><div class="ex2">${i ? 'COMING UP' : 'NEXT'}</div></div>`).join('');
// quiz
const OPTS = ['Planning', 'Organizing', 'Staffing', 'Controlling'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('userPlus', 44, C.gold2, 2.4);
// recap
const ROWS = [['clipboard', 'Five functions'], ['refresh', 'A cycle: controlling leads back to <span class="acc">planning</span>'], ['link', 'Coordination <span class="acc">ties them all together</span>']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
$('#rw0').insertAdjacentHTML('beforeend', ['Plan', 'Organize', 'Staff', 'Direct', 'Control'].map((p, k) => `<div class="fp" id="fp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const raviX = M.track(0, [[tJump[0], -44], [tJump[1], 0], [tJump[2], 30], [tNoth, 0]], M.SOFT);
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const rt = $('#rw0 .rt'); let x = 216 + rt.offsetWidth + 40;
  for (let k = 0; k < 5; k++) { const p = $('#fp' + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  $('#dU').style.left = (496 + 8 + 2 * 66) + 'px';
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header (one element travels, never cut) */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });

  /* ===== A: a second outlet, one messy list ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    $('#ravi').setAttribute('transform', `translate(${raviX(t).toFixed(2)} 0)`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    M.vis($('#badge'), t, tMorph + 1.0, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    // outlets card: 1 becomes 2
    M.vis($('#outc'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.vis($('#os0'), t, tMorph + 0.5, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#os1'), t, tTwo - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    const two = M.io((t - tTwo) / 0.2); M.setT($('#oN'), two > 0.5 ? '2' : '1'); $('#oN').style.color = mix(C.ink, C.gold, two);
    M.vis($('#oP'), t, tBroke, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // opening day: "Soon" becomes 14 days, and turns red
    const wk = M.io((t - tWeeks) / 0.3);
    M.setT($('#dN'), wk > 0.5 ? '14' : 'Soon'); $('#dN').style.color = wk > 0.5 ? mix(C.ink, C.red, M.io((t - tWeeks - 0.3) / 0.4)) : C.ink;
    if (wk > 0) M.vis($('#dN'), t, tWeeks + 0.12, 1e9, { dy: 20, sp: M.POP, fade: 0.08 }); else M.vis($('#dN'), t, tMorph + 0.6, tWeeks, { dy: 20, outDur: 0.12, ody: -20 });
    M.vis($('#dU'), t, tWeeks + 0.3, 1e9, { dy: 14 });
    M.vis($('#dP'), t, tMorph + 0.75, 1e9, { dy: 16 });
    const hot = M.io((t - tWeeks - 0.4) / 0.4); $('#dP').style.background = mix(C.paper, C.redBg, hot); $('#dP').style.color = mix(C.ink, C.red, hot);
    M.setT($('#dPt'), hot > 0.5 ? 'Two weeks away' : 'Date fixed'); setIco($('#dPi'), 'calendar', hot > 0.5 ? C.red : C.ink, 24);
    // to-do list: three half-done jobs
    M.vis($('#todo'), t, tC1 - 0.05, 1e9, { dy: 36 });
    JOBS.forEach(([, , p0], i) => {
      const el = $('#job' + i); M.vis(el, t, tJob[i] - 0.05, 1e9, { dy: 24, sp: M.SOFT });
      let p = p0 * M.o3((t - tJob[i] - 0.3) / 0.6);
      JUMP.forEach(([j, to], k) => { if (j === i) p += (to - p0) * M.o3((t - tJump[k] - 0.1) / 0.5); });
      el.querySelector('.jb i').style.width = (218 * p).toFixed(1) + 'px';
      const act = JUMP.reduce((a, [j], k) => a + (j === i ? on01(t, tJump[k] - 0.05, k < 2 ? tJump[k + 1] - 0.05 : tNoth, 0.2) : 0), 0);
      el.style.background = mix(C.paper, C.gold2, act);
    });
    M.vis($('#fin'), t, tNoth + 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: what are the functions? ===== */
  const dOn = t >= tTu - 0.05 && t < tG1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.15, tDout, { dy: 24, ...o });
    DC.forEach((_, i) => {
      const el = $('#dc' + i); M.vis(el, t, tDc[i] - 0.1, tDout, { dy: 36, ...o });
      M.vis(el.querySelector('.dx'), t, tDc[i] + 0.35, 1e9, { dy: 10 });
      M.rise(el.querySelector('.de'), t, tDc[i] + 0.45, { st: 0.04 });
      el.querySelector('.di').style.background = mix(C.paper, C.gold2, on01(t, tDc[i], i < 2 ? tDc[i + 1] : tDout - 0.4));
    });
  }

  /* ===== G: Gulick's seven, today's five ===== */
  const gOn = t >= tG1 - 0.1 && t < tF0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#gk'), t, tG1 + 0.1, tGout, { dy: 36, ...o });
    M.vis($('#gb'), t, tG1 + 0.25, tGout, { dy: 36, ...o });
    const k2 = $('#gk2'); M.setT(k2, t >= tFive ? '7 BECOME 5' : t >= tFirst ? '= POSDCORB' : '7 FUNCTIONS');
    M.vis(k2, t, t >= tFive ? tFive : t >= tFirst ? tFirst : tSeven, 1e9, { dy: 10 }); k2.style.color = t >= tFirst ? C.gold : C.muted;
    G7.forEach(([l, w], i) => {
      const el = $('#lt' + i), lg = el.querySelector('.lg'), lw = el.querySelector('.lw');
      M.vis(el, t, tG1 + 0.35 + i * 0.06, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const said = t >= tW7[i] - 0.05, act = on01(t, tW7[i] - 0.05, i < 6 ? tW7[i + 1] - 0.05 : tG3, 0.2);
      const fl = on01(t, tFirst + i * 0.08, tFirst + i * 0.08 + 0.35, 0.18);   // letters flash in order on "first letters"
      const kept = i < 4, dimU = kept ? 0 : M.io((t - tFive) / 0.35);
      const coo = i === 4 ? M.io((t - tCoo) / 0.3) : 0;
      let bg = mix(C.paper, C.ink, act); bg = mix(bg, C.gold, fl); bg = mix(bg, C.paper2, dimU); bg = mix(bg, C.gold, coo);
      if (kept) bg = mix(bg, C.ink, M.io((t - tFive) / 0.35));
      el.style.background = bg;
      M.vis(lg, t, tW7[i] - 0.05, 1e9, { dy: 30, sp: M.POP, fade: 0.08 });
      const white = act > 0.5 || fl > 0.5 || coo > 0.5 || (kept && t >= tFive + 0.15);
      lg.style.color = white ? '#fff' : mix(C.ink, C.dim, dimU);
      let wtx = said ? w : `0${i + 1}`;
      if (i === 5 && t >= tRep) wtx = 'INTO CONTROL'; if (i === 6 && t >= tBud) wtx = 'INTO CONTROL'; if (i === 4 && t >= tCoo) wtx = 'IN ALL FIVE';
      M.setT(lw, wtx);
      lw.style.color = white ? (kept && t >= tFive ? C.gold2 : '#fff') : (said ? (dimU > 0.5 ? C.muted : C.ink) : C.dim);
      if ((i === 5 && t >= tRep) || (i === 6 && t >= tBud)) lw.style.color = C.gold;
    });
    // bottom card panes
    const pO = { outDur: 0.22, ody: -12 };
    const p0on = t < tG3 + 0.3; M.hide($('#gp0'), !p0on);
    if (p0on) {
      M.vis($('#gav'), t, tG1 + 0.45, tG3 - 0.1, { dy: 0, sc: 0.7, sp: M.POP, ...pO });
      M.rise($('#gnm'), t, tGul - 0.05, { st: 0.06, sp: M.HEAVY, out: tG3 - 0.1, outDur: 0.22 });
      M.rise($('#gds'), t, tGul + 0.35, { st: 0.035, out: tG3 - 0.1, outDur: 0.22 });
      M.vis($('#gpa'), t, tGul + 0.7, tG3 - 0.1, { dy: 14, ...pO });
      M.vis($('#gpb'), t, tSeven, tG3 - 0.1, { dy: 14, ...pO });
    }
    const p1on = t >= tG3 - 0.1 && t < tG4 + 0.3; M.hide($('#gp1'), !p1on);
    if (p1on) {
      M.vis($('#gp1 .lbl'), t, tG3 + 0.1, tG4 - 0.1, { dy: 10, ...pO });
      G7.forEach((_, i) => {
        const s = $('#gw' + i); M.vis(s, t, tG3 + 0.2 + i * 0.08, tG4 - 0.1, { dy: 40, sp: M.POP, fade: 0.08, ...pO });
        s.style.display = 'inline-block';
        s.style.color = mix(C.ink, C.gold, on01(t, tFirst + i * 0.08, tFirst + i * 0.08 + 0.35, 0.18));
      });
    }
    const p2on = t >= tG4 - 0.1; M.hide($('#gp2'), !p2on);
    if (p2on) {
      M.vis($('#gp2 .lbl'), t, tG4 + 0.1, 1e9, { dy: 10 });
      F5N.forEach((_, i) => {
        const el = $('#f5' + i); M.vis(el, t, tG4 + 0.25 + i * 0.08, 1e9, { dy: 24, sp: M.SOFT });
        if (i === 4) { const c = on01(t, tCtl - 0.05, tCoo, 0.25); el.style.background = mix(C.paper, C.ink, c); el.style.color = c > 0.5 ? '#fff' : C.ink; }
      });
      M.vis($('#gstrip'), t, tRuns - 0.1, 1e9, { dy: 24 });
    }
  }

  /* ===== F: five questions, one cycle ===== */
  const fOn = t >= tF0 - 0.1 && t < tK1 + 0.2; M.hide($('#sF'), !fOn);
  M.vis($('#exChip'), t, tGoal + 0.2, tE1 - 0.3, { dy: 10, outDur: 0.3 });
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    const flowOut = M.io((t - tFout) / 0.3); $('#flow').style.opacity = (1 - flowOut).toFixed(3);
    // which card is lit: one per step, card 1 again on "back to planning", then a quick lap on "cycle"
    const lap = k => on01(t, tCycle + k * 0.22, tCycle + k * 0.22 + 0.3, 0.16);
    FQ.forEach(([, ic], i) => {
      const el = $('#fc' + i), ta = tF[i], td = i < 4 ? tF[i + 1] : tX1;
      M.vis(el, t, tF0 + 0.1 + i * 0.08, tFout, { dy: 36, ...fo });
      let act = on01(t, ta, td);
      if (i === 0) act = Math.max(act, on01(t, tPlanAgain, tX3, 0.3));
      act = Math.max(act, lap(i));
      const done = t >= ta;
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.fn').style.color = mix(done ? C.gold : C.dim, C.gold2, act);
      el.querySelector('.ft').style.color = mix(C.ink, '#fff', act);
      el.querySelector('.fi').style.background = mix(C.paper, '#24345A', act);
      setIco(el.querySelector('.fi'), ic, act > 0.5 ? C.gold2 : C.gold, 32, 2.2);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      const fa = el.querySelector('.fa'); M.vis(fa, t, tAsk[i] - 0.1, 1e9, { dy: 10 }); fa.style.color = mix(C.muted, '#8C96AE', act);
      const fq = el.querySelector('.fq'); M.rise(fq, t, tAsk[i] + 0.25, { st: 0.05 }); fq.style.color = mix(C.ink2, C.gold2, act);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tF0 + 1.5 && t < tFout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
    [0, 1, 2, 3].forEach(i => { const c = $('#cv' + i); M.vis(c, t, tF0 + 0.6 + i * 0.08, 1e9, { dy: 0, fade: 0.15 }); c.setAttribute('stroke', t >= tF[i + 1] ? C.gold : C.link); });
    // the loop back: control -> plan
    M.draw($('#ret'), t, tBack - 0.1, 0.9, M.io);
    M.vis($('#retH'), t, tBack + 0.75, 1e9, { dy: 0, fade: 0.12 });
    const rg = M.io((t - tBack) / 0.4); $('#ret').setAttribute('stroke', mix(C.link, C.gold, rg)); $('#retH').setAttribute('stroke', mix(C.link, C.gold, rg));
    // example card
    M.vis($('#ex'), t, tF0 + 0.3, tFout, { dy: 36, ...fo });
    const rd = $('#round'); M.setT(rd, t >= tPlanAgain ? 'ROUND 2' : 'ROUND 1'); rd.style.background = t >= tPlanAgain ? C.gold : C.ink;
    M.vis(rd, t, tPlanAgain >= t ? tF0 + 0.8 : tPlanAgain, 1e9, { dy: 0, sc: t >= tPlanAgain ? 0.7 : 1, sp: M.POP, fade: 0.1 });
    const PIN = [tF0 + 0.45, tF[0], tF[1], tF[2], tF[3], tF[4], tX2, tX3];
    XP.forEach((_, k) => {
      const tin = PIN[k], tout = k < 7 ? PIN[k + 1] - 0.14 : 1e9;
      const pn = $('#xp' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.xl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.xi'), t, tin + 0.08, tout, { dy: 0, sc: 0.7, sp: M.POP, ...oo });
      M.rise(pn.querySelector('.xs'), t, tin + 0.15, { st: 0.04, out: tout, outDur: 0.2 });
      const xv = pn.querySelector('.xv'); const q = M.io((t - tout) / 0.2); xv.style.opacity = (1 - q).toFixed(3);
    });
    // per-step visuals, each landing on its word
    const pop = (id, ti0) => M.vis($(id), t, ti0, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    pop('#xv1a', tTwoH - 0.05); M.vis($('#xv1b'), t, tTwoH + 0.2, 1e9, { dy: 12 });
    [0, 1, 2].forEach(k => pop('#xv2' + k, tParts[k] - 0.05));
    pop('#xv3m', tMeena - 0.05); M.vis($('#xv3t'), t, tHelp2 - 0.1, 1e9, { dy: 0, fade: 0.1 }); pop('#xv3a', tHelp2); pop('#xv3b', tHelp2 + 0.12);
    pop('#xv4a', tAsha - 0.05); M.vis($('#xv4r'), t, tTrain - 0.2, 1e9, { dx: -16, dy: 0 }); pop('#xv4b', tTrain); pop('#xv4c', tTrain + 0.12);
    M.vis($('#cbar'), t, tKabir, 1e9, { dy: 16 });
    const cf = M.o5((t - tOnly) / 0.9); $('#cbar .fl').style.width = (360 * 0.6 * cf).toFixed(1) + 'px';
    M.vis($('#cbar .cv'), t, tOnly + 0.6, 1e9, { dy: 8 }); pop('#xv5p', tOnly + 0.8);
    pop('#xv6i', tSevenAm - 0.2); pop('#xv6a', tSevenAm);
    [0, 1, 2].forEach(k => { const p = $('#xv7' + k); pop('#xv7' + k, tX3 + 0.3 + k * 0.15); const a = k === 1 ? 1 : 0; p.style.background = k === 0 ? C.gold2 : k === 1 ? C.gold : C.paper; p.style.color = a ? '#fff' : (k === 2 ? C.muted : C.ink); });
  }

  /* ===== K: coordination ===== */
  const kOn = t >= tK1 - 0.1 && t < tR1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#kq'), t, tK1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tCoord - 0.15, outDur: 0.3 });
    M.vis($('#kdef'), t, tCoord + 0.05, tK5 - 0.1, { dy: 24, outDur: 0.25, ody: -12 });
    M.vis($('#tl'), t, tCoord + 0.25, tKout, { dy: 36, ...o });
    M.vis($('#tl .lbl'), t, tCoord + 0.45, 1e9, { dy: 10 });
    [1, 7, 14].forEach((d, k) => M.vis($('#ax' + d), t, tK2 + 0.2 + k * 0.08, 1e9, { dy: 8 }));
    const W = 1160 / 14, fix = M.io((t - tTen) / 0.6);
    const ROWT = [tEvery, tStoves, tHelpers];
    TROWS.forEach((_, i) => {
      const r = $('#tr' + i); M.vis(r, t, (i === 0 ? tEvery : tK3 + 0.1 * i) - 0.25, 1e9, { dy: 16 });
      const tb = r.querySelector('.tb'); let a, b, g = M.o3((t - ROWT[i]) / 0.6);
      if (i === 0) { a = 1; b = 9; } else if (i === 1) { a = 9; b = 10; } else { a = M.lerp(3, 10, fix); b = 15; }
      const x0 = 360 + (a - 1) * W, w = (b - a) * W * g;
      tb.style.left = x0.toFixed(1) + 'px'; tb.style.width = Math.max(0, w).toFixed(1) + 'px';
      if (i === 1) tb.style.background = mix(C.gold, C.ink, on01(t, tNine - 0.05, tTen + 0.6, 0.2));
    });
    const idle = $('#idle'), iw = 7 * W * M.o3((t - tNothing) / 0.5) * (1 - fix);
    idle.style.left = (360 + 2 * W).toFixed(1) + 'px'; idle.style.width = Math.max(0, iw).toFixed(1) + 'px'; M.hide(idle, iw < 1);
    $('#tr2 .tb').style.zIndex = 0; idle.style.zIndex = 1;
    M.vis($('#vline'), t, tLines + 0.1, 1e9, { dy: 0, sc: 1, fade: 0.25 });
    M.vis($('#sync'), t, tTen + 0.5, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ess'), t, tK5 + 0.05, tKout, { dy: 24, ...o });
    M.rise($('#essT'), t, tK5 + 0.1, { st: 0.045 });
  }

  /* ===== R: four weeks later, and what comes next ===== */
  const rOn = t >= tR1 - 0.1 && t < tQ + 0.05; M.hide($('#sR'), !rOn);
  if (rOn) {
    const ro = { outDur: 0.3, ody: -16 }, tRo = tE1 - 0.3;
    M.vis($('#res'), t, tR1 + 0.1, tRo, { dy: 36, ...ro });
    M.vis($('#cyc5'), t, tR1 + 0.22, tRo, { dy: 36, ...ro });
    const g1 = M.o5((t - tTwoR) / 1.0);
    M.setT($('#rN'), String(Math.round(150 + 60 * g1))); $('#rN').style.color = mix(C.ink, C.gold, g1);
    M.vis($('#rN'), t, tR1 + 0.5, 1e9, { dy: 16 }); M.vis($('#rU'), t, tR1 + 0.6, 1e9, { dy: 10 });
    [[0, 150, tR1 + 0.6], [1, 210, tTwoR]].forEach(([k, v, ta]) => {
      const el = $('#br' + k), bt = el.querySelector('.bt'), bv = el.querySelector('.bv');
      M.vis(el, t, tR1 + 0.5 + k * 0.12, 1e9, { dy: 16 });
      const g = k ? g1 : M.o3((t - ta) / 0.6), ww = RX(v) * g;
      bt.style.width = ww.toFixed(1) + 'px'; bt.style.background = k ? C.gold : '#E7E0D2';
      bv.style.left = (ww + 20).toFixed(1) + 'px'; M.setT(bv, String(Math.round(v * g))); bv.style.opacity = M.clamp(ww / 40).toFixed(3); bv.style.color = k ? C.ink : C.muted;
    });
    M.vis($('#rgl'), t, tR1 + 0.7, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#rgt'), t, tR1 + 0.8, 1e9, { dy: 8 });
    M.vis($('#beat'), t, tBeaten, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    CR.forEach((_, i) => {
      M.vis($('#cr' + i), t, tR1 + 0.4 + i * 0.08, 1e9, { dy: 20 });
      M.vis($('#cr' + i + ' .ck'), t, tR1 + 0.9 + i * 0.35, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    });
    M.rise($('#eh'), t, tE1 + 0.05, { st: 0.06, sp: M.HEAVY });
    FQ.forEach((_, i) => {
      const el = $('#ep' + i); M.vis(el, t, tE1 + 0.25 + i * 0.1, 1e9, { dy: 36 });
      const a = i === 0 ? M.io((t - tOneE) / 0.35) : 0, bg = el.querySelector('.bg');
      bg.style.background = mix(C.card, C.ink, a); bg.style.borderColor = mix(C.line, C.ink, a);
      el.querySelector('.et').style.color = mix(C.ink, '#fff', a); el.querySelector('.ei').style.background = mix(C.paper, '#24345A', a);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', a); el.querySelector('.ex2').style.color = mix(C.muted, C.gold2, a);
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, wt('Q1', 'Ravi') - 0.05, { st: 0.05, sp: M.HEAVY });
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
    for (let k = 0; k < 5; k++) {
      const el = $('#fp' + k); M.vis(el, t, tPill[k] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const a = tPill[k] - 0.05, b = k < 4 ? tPill[k + 1] - 0.05 : tRow[1] - 0.2;
      const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
      el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
      el.style.color = g > 0.5 ? '#fff' : C.ink;
    }
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on big scene changes, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.2);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
