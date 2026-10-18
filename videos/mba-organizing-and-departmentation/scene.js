// MBA - Principles of Management, Ep 16: Organizing and Departmentation
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  bike: ['M22 17.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z', 'M9 17.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z', 'M16 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  cookie: ['M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5', 'M8.5 8.5v.01', 'M16 15.5v.01', 'M12 12v.01', 'M11 17v.01', 'M7 14v.01'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  userCheck: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm16 11 2 2 4-4'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 21a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  userX: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm17 8 5 5', 'm22 8-5 5'],
  idCard: ['M16 10h2', 'M16 14h2', 'M6.17 15a3 3 0 0 1 5.66 0', 'M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tWho = wt('H2', 'who');
const tTwo = wt('C1', 'Two'), tNoC = wt('C1', 'nobody'), tOff = wt('C2', 'Office'), tOwns = wt('C2', 'nobody'), tEvery = wt('C3', 'every'), tRaviC = wt('C3', 'Ravi');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;          // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tD2 = T0('D2'), tPeople = wt('D2', 'people'), tRes = wt('D2', 'resources'), tDc = [T0('D3'), T0('D4'), T0('D5')], tDout = T0('F0') - 0.32;
const tDe = [wt('D3', 'what'), wt('D4', 'power'), wt('D5', 'who')];
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i));
const tAct = ['Boil', 'serve', 'take', 'wash', 'deliver'].map(w => wt('F1', w)), tGrpF = wt('F2', 'Group'), tSim = wt('F2', 'Similar');
const tAsha = wt('F3', 'Asha'), tKab = wt('F3', 'Kabir'), tHand = wt('F4', 'handing'), tOrder = wt('F4', 'order'), tLink = wt('F5', 'Link'), tOneTeam = wt('F5', 'team');
const tG0 = T0('G0'), tDep = wt('G0', 'Departmentation'), tG1 = T0('G1'), tRight = wt('G1', 'Right'), tG2 = T0('G2'), tFive = wt('G2', 'five'), tFout = tG2 - 0.32;
const tP = [1, 2, 3, 4, 5].map(i => T0('P' + i)), tGrp = [1, 2, 3, 4, 5].map(i => wt('P' + i, 'Group')), tGeo = wt('P2', 'geographical');
const tW1 = T0('W1'), tMix = wt('W1', 'mixes'), tOutl = wt('W2', 'Outlets'), tJobs = wt('W2', 'jobs'), tW3 = T0('W3'), tEvery3 = wt('W3', 'everyone'), tBoss = wt('W3', 'boss'), tSmall = wt('W3', 'small'), tMeena = wt('W3', 'Meena');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['role', 'authority', 'boss'].map(w => wt('S2', w)), ['identify', 'group', 'assign', 'delegate', 'coordinate'].map(w => wt('S3', w)), ['function', 'territory', 'product', 'customer', 'process'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning + cups
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// who does what: [title, icon, avatars] ('?' = nobody, 'h' = helper)
const JOBS = [['Make tea', 'cup', ['A', 'h']], ['Wash cups', 'droplet', ['?']], ['Cash', 'coin', ['K']], ['Orders', 'bike', ['?']]];
$('#jobRow').innerHTML = JOBS.map(([t, ic, avs], i) => `<div class="job" id="job${i}" style="left:${36 + i * 216}px"><div class="ji"></div><div class="jt">${t}</div>${avs.map((a, k) => `<div class="ja${a === '?' ? ' no' : ''}" id="ja${i}_${k}" style="right:${18 + (avs.length - 1 - k) * 34}px">${a === 'h' ? M.icon('user', 22, '#fff', 2.4) : a}</div>`).join('')}</div>`).join('');
const QS = [['Who does what?', tWho + 0.1], ['Who washes cups?', tNoC + 0.25], ['Where is my order?', tOwns + 0.1], ['Out of milk?', tEvery - 0.05]];
$('#qps').innerHTML = QS.map(([q], i) => `<div class="pill" id="qp${i}" style="top:${i < 2 ? 72 : 136}px">${M.icon('help', 22, C.muted, 2.2)}<span>${q}</span></div>`).join('');
$('#noPlanI').innerHTML = M.icon('timer', 24, C.red, 2.2);
// definition: three things every person gets
$('#defI').innerHTML = M.icon('network', 36, C.gold, 2.2);
const DC = [['idCard', 'Role', 'What each person does', 'Makes the tea'], ['key', 'Authority', 'The power to decide', 'Picks the recipe'], ['network', 'Relationships', 'Who reports to whom', 'Reports to Ravi']];
$('#dRow').innerHTML = DC.map(([ic, t, m, e], i) => `<div class="dc" id="dc${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="di"><span class="ico"></span></div><div class="serif dt">${t}</div><div class="dm">${m}</div><div class="hr"></div><div class="dx">ASHA AT CHAI CORNER</div><div class="de"><b>A</b><span>${e}</span></div></div>`).join('');
// five steps: list + panes
const FR = [['search', 'Identify'], ['layers', 'Group'], ['userCheck', 'Assign'], ['key', 'Delegate'], ['link', 'Coordinate']];
$('#fRows').innerHTML = FR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${90 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const ACTS = [['cup', 'Boil tea'], ['cup', 'Serve'], ['coin', 'Take cash'], ['droplet', 'Wash cups'], ['bike', 'Deliver']];
const GB = [['KITCHEN', ['Boil tea', 'Serve']], ['COUNTER', ['Take cash', 'Deliver']], ['CLEANING', ['Wash cups']]];
const AS = [['KITCHEN', 'A', 'Asha'], ['CASH', 'K', 'Kabir'], ['CLEANING', 'h', 'Helper']];
const PV = [
  ACTS.map(([ic, t], i) => `<div class="stp" id="ac${i}" style="top:${i < 3 ? 0 : 88}px">${M.icon(ic, 26, C.gold, 2.2)}${t}</div>`).join(''),
  GB.map(([l, ps], i) => `<div class="gb" id="gb${i}" style="left:${i * 293.5}px"><div class="lbl">${l}</div>${ps.map((p, k) => `<div class="mp" id="gp${i}_${k}" style="top:${60 + k * 56}px">${p}</div>`).join('')}</div>`).join(''),
  AS.map(([l, a, n], i) => `<div class="gb" id="as${i}" style="left:${i * 293.5}px"><div class="lbl">${l}</div><div class="ga" id="asA${i}" style="${a === 'h' ? 'background:#14213D' : ''}">${a === 'h' ? M.icon('user', 30, '#fff', 2.2) : a}</div><div class="gn" id="asN${i}">${n}</div></div>`).join(''),
  `<svg class="abs" style="left:0;top:0" width="848" height="100"><line id="dlL" x1="96" y1="40" x2="752" y2="40" stroke="#E2DACB" stroke-width="5" stroke-linecap="round"/></svg>
   <div class="av" id="dlR" style="left:16px;top:4px;background:#B8862F">R</div><div class="avn" id="dlRn" style="left:-28px;top:92px">Ravi</div>
   <div class="av" id="dlA" style="left:760px;top:4px">A</div><div class="avn" id="dlAn" style="left:716px;top:92px">Asha</div>
   <div class="stp" id="dlK" style="top:8px;background:#14213D;color:#fff">${M.icon('key', 26, C.gold2, 2.2)}Authority</div>
   <div class="stp" id="dlO" style="top:112px;background:#B8862F;color:#fff">${M.icon('check', 26, '#fff', 2.6)}Asha orders the milk herself</div>`,
  `<svg class="abs" style="left:0;top:0" width="848" height="80"><line id="coL" x1="140" y1="32" x2="708" y2="32" stroke="#B8862F" stroke-width="5" stroke-linecap="round"/></svg>` +
   [['cup', 'Kitchen'], ['coin', 'Counter'], ['droplet', 'Cleaning']].map(([ic, t], i) => `<div class="stp" id="co${i}" style="top:0">${M.icon(ic, 26, C.gold, 2.2)}${t}</div>`).join('') +
   `<div class="stp" id="coT" style="top:104px;background:#14213D;color:#fff">${M.icon('users', 26, C.gold2, 2.2)}One team</div>`,
];
const PP = [['THE PROCESS', '5 Steps', 'How Ravi organizes his team', 'AT CHAI CORNER', 'From a messy list to a clear team', 'clipboard'],
  ['STEP 01 / 05', 'Identify', 'every activity'], ['STEP 02 / 05', 'Group', 'similar jobs together'], ['STEP 03 / 05', 'Assign', 'duties to people'],
  ['STEP 04 / 05', 'Delegate', 'hand some power down'], ['STEP 05 / 05', 'Coordinate', 'link every group'],
  ['STEP 02 HAS A NAME', 'Departmentation', 'Grouping activities into departments', 'AT CHAI CORNER, RIGHT NOW', 'Everyone is in one big group', 'users']];
M.IC.clipboard = ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'];
$('#fPans').innerHTML = PP.map(([s, t, m, x, e, ic], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x || 'AT CHAI CORNER'}</div>${PV[i - 1] && i < 6 ? `<div class="pv" id="pv${i}">${PV[i - 1]}</div>` : `<div class="pe"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><span>${e}</span></div>`}</div>`).join('');
// departmentation: tabs, layouts, tokens
const TYPES = ['Functional', 'Territorial', 'Product', 'Customer', 'Process'];
$('#tabs').innerHTML = TYPES.map((n, i) => `<div class="tb" id="tb${i}" style="left:${(160 + i * 326.4).toFixed(1)}px"><div class="bg"></div><div class="tn">0${i + 1}</div><div class="tt">${n}</div></div>`).join('');
$('#wsI').innerHTML = M.icon('check', 40, C.gold2, 2.6);
const JP = '<span class="mp">Kitchen</span><span class="mp">Cash</span><span class="mp">Cleaning</span>';
const LAY = [
  { by: 'Not yet', b: [['users', 'Everyone', 'All jobs, one big group']], m: [[0, 1, 2, 3, 4, 5, 6, 7, 8]] },
  { by: 'Job', b: [['cup', 'Kitchen', 'Makes the chai'], ['coin', 'Cash', 'Takes the money'], ['droplet', 'Cleaning', 'Cups and floor'], ['bike', 'Delivery', 'Takes orders out']], m: [[0, 3, 4], [1, 5], [2, 6], [7, 8]] },
  { by: 'Place', b: [['store', 'Outlet 1', 'The main stall'], ['pin', 'Outlet 2', 'The bus stand']], m: [[0, 1, 3, 5, 7, 8], [2, 4, 6]] },
  { by: 'What you sell', b: [['cup', 'Chai', 'Every kind of tea'], ['cookie', 'Snacks', 'Samosas and biscuits']], m: [[0, 2, 3, 4, 6], [1, 5, 7, 8]] },
  { by: 'Who you serve', b: [['user', 'Walk-in', 'Buy at the counter'], ['briefcase', 'Office orders', 'Big orders, delivered']], m: [[0, 1, 3, 5, 7], [2, 4, 6, 8]] },
  { by: 'Steps of the work', b: [['flame', 'Boiling', 'Water, milk and tea'], ['leaf', 'Brewing', 'Spice and simmer'], ['cup', 'Serving', 'Pour and hand over']], m: [[3, 4, 7], [0, 5], [1, 2, 6, 8]] },
  { by: 'Place, then job', b: [['store', 'Outlet 1', JP], ['pin', 'Outlet 2', JP]], m: [[0, 1, 3, 5, 7, 8], [2, 4, 6]] },
];
const LS = [[tG2 + 0.1, 0], [tP[0] + 0.15, 1], [tP[1] + 0.15, 2], [tP[2] + 0.15, 3], [tP[3] + 0.15, 4], [tP[4] + 0.15, 5], [tOutl - 0.05, 6]];
const TOK = ['A', 'K', 'M', 'h', 'h', 'h', 'h', 'h', 'h'];
$('#bxs').innerHTML = [0, 1, 2, 3].map(i => `<div class="bx" id="bx${i}"><div class="bg"></div><div class="cn"><div class="bi"></div><div class="serif bn"></div><div class="bd"></div><div class="bh"></div></div></div>`).join('');
$('#tks').innerHTML = TOK.map((l, j) => `<div class="tk${l === 'h' ? ' h' : ''}" id="tk${j}">${l === 'h' ? M.icon('user', 22, C.ink2, 2.2) : l}</div>`).join('');
$('#clines').innerHTML = [0, 1, 2, 3].map(i => `<path id="cl${i}"/>`).join('');
const HL = [];   // [start, end, layout, box] keyword highlights
const hl = (L, words, line) => words.forEach((w, k) => HL.push([w, k < words.length - 1 ? words[k + 1] : T1(line) + 0.3, L, k]));
hl(1, ['Kitchen', 'cash', 'cleaning', 'delivery'].map(w => wt('P1', w)), 'P1');
hl(2, [wt('P2', 'one'), wt('P2', 'two')], 'P2');
hl(3, [wt('P3', 'Chai'), wt('P3', 'snacks')], 'P3');
hl(4, [wt('P4', 'Walk-in'), wt('P4', 'office')], 'P4');
hl(5, ['Boiling', 'brewing', 'serving'].map(w => wt('P5', w)), 'P5');
HL.push([tMeena - 0.1, 1e9, 6, 1]);
// quiz
const OPTS = ['Functional', 'Territorial', 'Customer', 'Product'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['idCard', 'Everyone gets a clear', ['Role', 'Authority', 'Boss']], ['layers', 'Five steps', ['Identify', 'Group', 'Assign', 'Delegate', 'Coordinate']], ['network', 'Departments by', ['Function', 'Territory', 'Product', 'Customer', 'Process']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const setH = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const on01 = (t, a, b, d = 0.3) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.35));
const BX = n => { const w = (1520 - (n - 1) * 32) / n; return Array.from({ length: n }, (_, i) => ({ x: 40 + i * (w + 32), w })); };
const tokPos = (L, j) => { const lay = LAY[L], g = BX(lay.b.length); for (let b = 0; b < lay.m.length; b++) { const s = lay.m[b].indexOf(j); if (s >= 0) return { x: g[b].x + 28 + s * 56, y: 196 + 146 }; } return { x: 0, y: 0 }; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 300; for (let i = 0; i < 4; i++) { if (i === 2) x = 300; const p = $('#qp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  DC.forEach((_, i) => { const d = $('#dc' + i + ' .dt'); if (d.offsetWidth > 432) d.style.fontSize = Math.floor(52 * 432 / d.offsetWidth) + 'px'; });
  // identify pills: two rows
  x = 0; for (let i = 0; i < 5; i++) { if (i === 3) x = 0; const p = $('#ac' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const dk = $('#dlK'); dk._w = dk.offsetWidth;
  const dO = $('#dlO'); dO.style.left = (424 - dO.offsetWidth / 2) + 'px';
  [0, 1, 2].forEach(i => { const p = $('#co' + i); p.style.left = (140 + i * 284 - p.offsetWidth / 2) + 'px'; });
  const cT = $('#coT'); cT.style.left = (424 - cT.offsetWidth / 2) + 'px';
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
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
  M.vis($('#exChip'), t, tMorph + 1.0, tT - 0.3, { dy: 10, outDur: 0.3 });

  /* ===== A: two outlets, nobody knows who does what ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // who does what
    M.vis($('#jobs'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const bad = [M.io((t - tTwo) / 0.3), M.io((t - tNoC) / 0.3), 0, M.io((t - tOwns) / 0.3)];
    JOBS.forEach(([, ic, avs], i) => {
      const el = $('#job' + i); M.vis(el, t, tMorph + 0.5 + i * 0.07, 1e9, { dy: 20 });
      el.style.background = mix(C.paper, C.redBg, bad[i]);
      el.querySelector('.jt').style.color = mix(C.ink, C.red, bad[i]);
      setIco(el.querySelector('.ji'), ic, bad[i] > 0.5 ? C.red : C.gold, 28, 2.2);
      avs.forEach((a, k) => {
        const av = $(`#ja${i}_${k}`), tin = i === 0 && k === 1 ? tTwo - 0.05 : tWho + i * 0.1;
        M.vis(av, t, tin, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
        if (a === '?') { av.style.borderColor = mix('#C9BFAE', C.red, bad[i]); av.style.color = mix(C.dim, C.red, bad[i]); setH(av, '?'); }
        else { av.style.background = i === 0 ? mix(a === 'A' ? C.gold : C.ink, C.red, bad[0]) : C.gold; av.style.boxShadow = `0 0 0 3px ${mix(C.paper, C.redBg, bad[i])}`; }
      });
    });
    // questions for Ravi
    M.vis($('#ask'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const n = 9 * M.o3((t - tMorph - 0.6) / 8) + 28 * M.o5((t - tEvery) / 1.6);
    M.setT($('#qN'), String(Math.round(n)));
    $('#qN').style.color = mix(C.ink, C.red, M.io((t - tEvery) / 0.4));
    QS.forEach(([, tq], i) => M.vis($('#qp' + i), t, tq, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#noPlan'), t, tRaviC, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: what is organizing? ===== */
  const dOn = t >= tTu - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.12, tDout, { dy: 24, ...o });
    $('#dwP').style.color = mix(C.ink, C.gold, M.io((t - tPeople) / 0.3));
    $('#dwR').style.color = mix(C.ink, C.gold, M.io((t - tRes) / 0.3));
    DC.forEach(([ic], i) => {
      const el = $('#dc' + i), ta = tDc[i], td = i < 2 ? tDc[i + 1] : tDout + 1;
      M.vis(el, t, tD2 + 1.2 + i * 0.1, tDout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.dt').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const dm = el.querySelector('.dm'); M.vis(dm, t, tD2 + 1.45 + i * 0.1, 1e9, { dy: 10 }); dm.style.color = t < ta ? C.dim : mix(mix(C.dim, C.gold2, on), C.ink2, off);
      el.querySelector('.di').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), ic, t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      const dx = el.querySelector('.dx'); M.vis(dx, t, tDe[i] - 0.1, 1e9, { dy: 10 }); dx.style.color = mix('#8C96AE', C.muted, off);
      const de = el.querySelector('.de'); M.vis(de, t, tDe[i], 1e9, { dy: 16 }); de.querySelector('span').style.color = mix('#fff', C.ink, off);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tD2 + 2) el.style.transform = Math.abs(lift) > 0.001 && t < tDout ? `scale(${(1 + 0.015 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== F: five steps (and step 2's name) ===== */
  const fOn = t >= tF0 - 0.1 && t < tG2 + 0.1; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fl'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#fp'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...o });
    FR.forEach(([ic], i) => {
      const el = $('#pr' + i), ta = tF[i], td = i < 4 ? tF[i + 1] : tG0;
      M.vis(el, t, tF0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      let act = on01(t, ta, td);
      if (i === 1) act = Math.max(act, on01(t, tG0, 1e9));
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix(C.ink, '#fff', act);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold, C.gold2, act);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    PP.forEach((_, k) => {
      const tin = k === 0 ? tF0 + 0.5 : (k < 6 ? tF[k - 1] : tDep - 0.15), tout = k < 5 ? (k === 0 ? tF[0] : tF[k]) - 0.14 : (k === 5 ? tDep - 0.3 : 1e9);
      const pn = $('#pn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, k === 6 ? tDep + 0.6 : tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0 || k === 6) {
        const tx = k === 6 ? tRight - 0.15 : tin + 0.5;
        M.vis(pn.querySelector('.px'), t, tx, tout, { dy: 10, ...oo });
        M.vis(pn.querySelector('.pe'), t, tx + 0.12, tout, { dy: 18, ...oo }); return;
      }
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pv'), t, tin + 0.5, tout, { dy: 18, ...oo });
      if (k === 1) ACTS.forEach((_, i) => M.vis($('#ac' + i), t, tAct[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
      else if (k === 2) GB.forEach(([, ps], i) => {
        M.vis($('#gb' + i), t, tGrpF + 0.1 + i * 0.1, 1e9, { dy: 16 });
        ps.forEach((_, j) => M.vis($(`#gp${i}_${j}`), t, tSim + i * 0.18 + j * 0.08, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
      });
      else if (k === 3) AS.forEach((_, i) => {
        const ta = [tAsha, tKab, tKab + 0.5][i];
        M.vis($('#as' + i), t, tin + 0.6 + i * 0.1, 1e9, { dy: 16 });
        M.vis($('#asA' + i), t, ta - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
        M.vis($('#asN' + i), t, ta + 0.05, 1e9, { dx: -12, dy: 0 });
      });
      else if (k === 4) {
        M.vis($('#dlR'), t, tin + 0.6, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#dlRn'), t, tin + 0.7, 1e9, { dy: 10 });
        M.vis($('#dlA'), t, tin + 0.75, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#dlAn'), t, tin + 0.85, 1e9, { dy: 10 });
        M.draw($('#dlL'), t, tin + 0.7, 0.5, M.o3);
        const dk = $('#dlK'), s = M.spring(t - tHand + 0.1, M.HEAVY), x0 = 112, x1 = 744 - dk._w;
        M.vis(dk, t, wt('F4', 'authority') - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        snap(dk, (s >= 1 ? x1 : M.lerp(x0, x1, s).toFixed(1)) + 'px', 'left');
        $('#dlA').style.background = mix(C.ink, C.gold, M.io((t - tHand - 0.5) / 0.3));
        M.vis($('#dlO'), t, tOrder - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k === 5) {
        [0, 1, 2].forEach(i => M.vis($('#co' + i), t, tin + 0.6 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
        M.draw($('#coL'), t, tLink - 0.05, 0.6, M.o3);
        M.vis($('#coT'), t, tOneTeam - 0.15, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      }
    });
  }

  /* ===== G: departmentation, the chart that re-arranges itself ===== */
  const gOn = t >= tG2 - 0.1 && t < tQ + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    // which layout, and the one before it
    let k = 0; for (let i = 0; i < LS.length; i++) if (t >= LS[i][0]) k = i;
    const tk = LS[k][0], L = LS[k][1], L0 = LS[Math.max(0, k - 1)][1];
    const cardIn = M.vis($('#chart'), t, tG2 + 0.05, 1e9, { dy: 36 });
    M.vis($('#gbL'), t, tG2 + 0.3, 1e9, { dy: 10 });
    const u = M.clamp((t - tk) / 0.4), dip = k === 0 ? 1 : (u < 0.5 ? 1 - 2 * u : 2 * u - 1), Lc = k > 0 && u < 0.5 ? L0 : L;
    const gv = $('#gbV'); M.vis(gv, t, tG2 + 0.4, 1e9, { dy: 12 }); M.setT(gv, LAY[Lc].by);
    if (t > tG2 + 1) gv.style.opacity = dip.toFixed(3);
    gv.style.color = Lc === 0 ? C.dim : C.ink;
    M.vis($('#gbN'), t, tGeo - 0.05, tP[2] - 0.05, { dy: 8, outDur: 0.2 });
    M.vis($('#rv'), t, tG2 + 0.35, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    // department boxes: slide and resize between layouts
    const g1 = BX(LAY[L].b.length), g0 = BX(LAY[L0].b.length);
    for (let i = 0; i < 4; i++) {
      const el = $('#bx' + i), inNew = i < g1.length, inOld = k > 0 && i < g0.length;
      const s = M.spring(t - tk - i * 0.04, M.SOFT);
      let x, w, op = 1, sc = 1;
      if (inNew && inOld) { x = M.lerp(g0[i].x, g1[i].x, s); w = M.lerp(g0[i].w, g1[i].w, s); }
      else if (inNew) { x = g1[i].x; w = g1[i].w; const p = M.spring(t - tk - 0.12 - i * 0.05, M.SOFT); op = M.clamp((t - tk - 0.12 - i * 0.05) / 0.2); sc = 0.92 + 0.08 * p; }
      else if (inOld) { x = g0[i].x; w = g0[i].w; op = 1 - M.clamp((t - tk) / 0.2); }
      else op = 0;
      if (k === 0) op = Math.min(op, M.clamp((t - tG2 - 0.5) / 0.2));
      M.hide(el, op <= 0.001);
      const cl = $('#cl' + i); M.hide(cl, op <= 0.001);
      if (op <= 0.001) continue;
      el.style.opacity = op >= 1 ? '' : op.toFixed(3);
      const settled = s >= 1 && sc >= 0.9999;
      snap(el, (settled ? Math.round(x) : x.toFixed(1)) + 'px', 'left'); snap(el, (settled ? Math.round(w) : w.toFixed(1)) + 'px', 'width');
      snap(el, sc >= 0.9999 ? 'none' : `scale(${sc.toFixed(4)})`);
      const lay = LAY[i < LAY[Lc].b.length ? Lc : L], bd = lay.b[Math.min(i, lay.b.length - 1)];
      const cn = el.querySelector('.cn'); cn.style.opacity = (inNew && inOld) ? dip.toFixed(3) : '';
      M.setT(el.querySelector('.bn'), bd[1]); setH(el.querySelector('.bd'), bd[2]);
      // keyword highlight
      let a = 0; HL.forEach(([h0, h1, hL, hb]) => { if (hL === L && hb === i) a = Math.max(a, on01(t, h0, h1, 0.25)); });
      el.querySelector('.bg').style.background = mix(C.paper, C.gold, a);
      el.querySelector('.bn').style.color = mix(C.ink, '#fff', a);
      el.querySelector('.bd').style.color = mix(C.ink2, '#fff', a);
      el.querySelector('.bh').style.background = mix(C.line, '#CFA65C', a);
      setIco(el.querySelector('.bi'), bd[0], C.gold, 30, 2.2);
      // connector from Ravi to this box
      const cx = x + w / 2;
      cl.setAttribute('d', `M800 124 V160 H${cx.toFixed(1)} V196`);
      cl.style.opacity = op >= 1 ? '' : op.toFixed(3);
      cl.setAttribute('stroke', mix('#D9CFBC', C.gold, on01(t, tBoss - 0.1, tSmall - 0.2)));
    }
    // people tokens fly to their new group
    TOK.forEach((l, j) => {
      const el = $('#tk' + j), tin = tG2 + 0.8 + j * 0.05;
      const p1 = tokPos(L, j), p0 = tokPos(L0, j), s = k === 0 ? 1 : M.spring(t - tk - 0.1 - j * 0.035, M.SOFT);
      const x = M.lerp(p0.x, p1.x, s), y = M.lerp(p0.y, p1.y, s) - 26 * Math.sin(Math.PI * M.clamp(s));
      const st = s >= 1;
      snap(el, (st ? Math.round(x) : x.toFixed(1)) + 'px', 'left'); snap(el, (st ? Math.round(y) : y.toFixed(1)) + 'px', 'top');
      M.vis(el, t, tin, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      const head = (j === 0 || j === 2) ? on01(t, tBoss - 0.1, 1e9) : 0, all = on01(t, tEvery3 - 0.05, tBoss - 0.1, 0.25);
      if (l === 'h') { el.style.borderColor = mix(C.line, C.gold, all); el.style.background = mix('#fff', C.gold3, all); }
      else el.style.background = mix(mix(C.ink, C.gold, Math.max(head, all)), C.gold, j === 2 ? on01(t, tMeena - 0.1, 1e9) : 0);
      if (j === 2 && t > tMeena - 0.1 && t < tMeena + 0.5) el.style.transform = `scale(${(1 + 0.15 * Math.sin(Math.PI * (t - tMeena + 0.1) / 0.6)).toFixed(4)})`;
    });
    // tabs: one per way, then the mix
    TYPES.forEach((_, i) => {
      const el = $('#tb' + i), ta = tP[i], td = i < 4 ? tP[i + 1] : tW1;
      M.vis(el, t, tFive - 0.05 + i * 0.08, tSmall - 0.3, { dy: 24, outDur: 0.3, ody: -16 });
      const act = on01(t, ta, td), seen = t >= ta, mx = i < 2 ? on01(t, tMix - 0.05, 1e9) : 0;
      el.querySelector('.bg').style.background = mix(mix(C.card, C.ink, act), C.gold, mx);
      el.querySelector('.tt').style.color = mx > 0.5 || act > 0.5 ? '#fff' : (seen ? C.ink : C.dim);
      el.querySelector('.tn').style.color = mx > 0.5 ? '#fff' : (act > 0.5 ? C.gold2 : (seen ? C.gold : C.dim));
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tFive + 1 && t < tSmall - 0.3) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.03 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#wstrip'), t, tSmall - 0.1, 1e9, { dy: 24 });
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
