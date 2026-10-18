// MBA - Principles of Management, Ep 10: Bureaucratic Management (Max Weber)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  crown: ['M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z', 'M5 21h14'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  landmark: ['M10 18v-7', 'M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z', 'M14 18v-7', 'M18 18v-7', 'M3 22h18', 'M6 18v-7'],
  list: ['M3 5h.01', 'M3 12h.01', 'M3 19h.01', 'M8 5h13', 'M8 12h13', 'M8 19h13'],
  fileText: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 9H8', 'M16 13H8', 'M16 17H8'],
  pen: ['M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  doorOut: ['m16 17 5-5-5-5', 'M21 12H9', 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tSteps = wt('H2', 'steps'), tOwn = wt('H2', 'own');
const tBad = [wt('C1', 'free'), wt('C2', 'forgets'), wt('C3', 'cousin')];
const tT = T0('T1'), tSt2 = wt('T1', 'They'), tTu = T0('D1') - 0.32;          // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tMax = wt('D2', 'Max'), tY1 = wt('D2', '1864'), tY2 = wt('D2', '1920');
const tD3 = T0('D3'), tLike = [wt('D3', 'studies'), wt('D3', 'people'), wt('D3', 'groups')];
const tD4 = T0('D4'), tRulesW = wt('D5', 'written'), tChain = wt('D5', 'chain'), tDout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5, 6, 7].map(i => T0('F' + i)), tFout = T0('K0') - 0.32;
const tWr = [wt('F1', 'Division'), wt('F2', 'hierarchy'), wt('F3', 'Formal'), wt('F4', 'Impersonality'), wt('F5', 'Merit'), wt('F6', 'Career'), wt('F7', 'Written')];
const tJob = wt('F1', 'Each'), tLadder = wt('F2', 'ladder'), tReports = wt('F2', 'bosses'), tRecipe = wt('F3', 'Every'), tSame = wt('F3', 'same');
const tEqual = wt('F4', 'equally'), tNoFree = wt('F4', 'No'), tSkill = wt('F5', 'skill'), tFamily = wt('F5', 'family');
const tSalary = wt('F6', 'salary'), tGrow = [wt('F6', 'grow'), wt('F6', 'step', 0), wt('F6', 'step', 1)], tLed = [wt('F7', 'sale'), wt('F7', 'sale') + 0.35, wt('F7', 'decision')];
const tA0 = T0('K0'), tThree = wt('K0', 'three'), tK = [T0('K1'), T0('K2'), T0('K3')], tBuilt = wt('K3', 'Bureaucracy'), tKout = T0('P1') - 0.32;
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4');
const tGood = [wt('P1', 'fair'), wt('P1', 'orderly'), wt('P1', 'predictable')], tBadR = [wt('P2', 'red'), wt('P2', 'rigid'), wt('P2', 'slow')];
const tLess = wt('P3', 'less'), tNot = wt('P3', 'not'), tTrust = wt('P4', 'trusts'), tGBout = tP3 - 0.32;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['rules', 'chain'].map(w => wt('S2', w)), ['division', 'hierarchy', 'rules', 'impersonality', 'merit'].map(w => wt('S3', w)), ['fairness', 'order', 'red'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#awayI').innerHTML = M.icon('doorOut', 22, C.gold2, 2.2);
// six people, six directions
const TW = [['A', 0], ['K', 0], ['M', 0], ['', 1], ['', 1], ['', 1]], ANG = [-70, 35, 160, -125, 95, -20];
$('#twRow').innerHTML = TW.map(([l, h], i) => `<div class="tw${h ? ' h' : ''}" id="tw${i}" style="left:${300 + i * 96}px">${h ? M.icon('user', 30, '#fff', 2.2) : l}</div><div class="ta" id="ta${i}" style="left:${300 + i * 96}px"><span class="tai">${M.icon('arrowR', 36, C.ink2, 2.4)}</span></div>`).join('');
$('#rules').insertAdjacentHTML('beforeend', `<div class="pill" id="rNo" style="background:#F6E3DC;color:#B5482F">${M.icon('x', 22, C.red, 2.6)}<span>No rulebook</span></div>`);
// what goes wrong
const BAD = [['cup', 'Free chai', 'for friends'], ['pen', 'Sales not', 'written down'], ['user', 'Cousin gets', 'the best shift']];
$('#jobRow').innerHTML = BAD.map(([ic, a, b], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 26, C.red, 2.2)}</div><div class="jt" style="top:90px">${a}</div><div class="jt" style="top:124px">${b}</div></div>`).join('');
// weber: what a sociologist looks at
$('#dv0').style.width = '856px';
$('#dv0').innerHTML = [['home', 'Families'], ['briefcase', 'Offices'], ['landmark', 'Governments']].map(([ic, n], i) => `<div class="ut4" id="ut${i}" style="left:${i * 296}px"><i>${M.icon(ic, 32, C.gold, 2.2)}</i><span>${n}</span></div>`).join('');
$('#dr0 i').innerHTML = M.icon('book', 26, C.gold, 2.2); $('#dr1 i').innerHTML = M.icon('network', 26, C.gold, 2.2);
// rulebook rows
const FE = [['users', 'Division of labour', 'Each person has one clear job', 220], ['network', 'Hierarchy', 'A ladder of bosses', 150], ['book', 'Written rules', 'Formal rules, written down', 180],
  ['scale', 'Impersonality', 'The same rules for everyone', 200], ['award', 'Merit', 'Hired and promoted for skill', 110], ['trendUp', 'Career', 'A fixed salary, and room to grow', 120], ['fileText', 'Written records', 'Everything is written down', 210]];
$('#coverI').innerHTML = M.icon('book', 32, C.gold2, 2.2);
$('#vRows').innerHTML = FE.map(([ic, t, , w], i) => `<div class="vr" id="vr${i}" style="top:${112 + i * 64}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="ph" style="width:${w}px"></div><div class="rt">${t}</div><div class="rk">${M.icon('check', 28, C.gold, 2.8)}</div></div>`).join('');
// feature visuals (848 x 156)
const VIS = [
  // 1 division of labour
  [['A', 'Asha', 'Makes tea'], ['K', 'Kabir', 'Handles cash'], ['M', 'Meena', 'Washes cups']].map(([l, n, d], i) => `<div class="dt" id="dt${i}" style="left:${i * 293}px"><div class="avc">${l}</div><div class="dn">${n}</div><div class="dd">${d}</div></div>`).join(''),
  // 2 hierarchy: a ladder of bosses
  [[0, 104, 52, 'TEAM', [['M', 0], ['', 1], ['', 1]]], [290, 52, 104, 'LEADS', [['A', 0], ['K', 0]]], [580, 0, 156, 'OWNER', [['R', 2]]]].map(([x, y, h, l, av], i) =>
    `<div class="stair" id="sr${i}" style="left:${x}px;top:${y}px;height:${h}px"><div class="sl">${l}</div>${i ? `<div class="snm" style="top:${h - 46}px">${i === 2 ? 'Ravi' : 'Asha, Kabir'}</div>` : ''}${av.map(([a, k], j) => `<div class="sa" style="left:${16 + j * 44}px;${k === 2 ? 'background:#B8862F' : k ? 'background:#3A4560' : ''}">${k === 1 ? M.icon('user', 20, '#fff', 2.4) : a}</div>`).join('')}</div>`).join(''),
  // 3 written rules: one recipe
  ['Boil milk', 'Add tea', 'Add sugar'].map((s, k) => `<div class="stp" id="rc${k}">${s}</div>`).join('') + `<svg class="abs" style="left:0;top:0" width="848" height="64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g id="rcA"></g></svg>` +
  `<div class="stp" id="rcS" style="top:92px;background:#B8862F;color:#fff"><span id="rcSI"></span>Same recipe, every cup</div>`,
  // 4 impersonality: friend = stranger
  `<div class="cu" id="cu0" style="left:0"><i>${M.icon('heart', 28, C.gold, 2.2)}</i><div class="cn">Kabir's friend</div><div class="serif cp" id="cp0">Free</div></div>` +
  `<div id="eqC">${M.icon('equal', 32, '#fff', 2.8)}</div>` +
  `<div class="cu" id="cu1" style="left:488px"><i>${M.icon('user', 28, C.gold, 2.2)}</i><div class="cn">A stranger</div><div class="serif cp">₹15</div></div>`,
  // 5 merit
  [['user', 'Cousin', 0.3], ['award', 'Best worker', 0.92]].map(([ic, n], i) => `<div class="mt" id="mt${i}" style="left:${i * 440}px"><div class="bg"></div><i></i><div class="mn">${n}</div><div class="ml">SKILL</div><div class="mb"></div><div class="mf"></div></div>`).join(''),
  // 6 career
  ['Helper', 'Senior helper', 'Outlet manager'].map((s, k) => `<div class="stp" id="cr${k}">${s}</div>`).join('') + `<svg class="abs" style="left:0;top:0" width="848" height="64" fill="none" stroke-linecap="round" stroke-linejoin="round"><g id="crA"></g></svg>` +
  `<div class="stp" id="crS" style="top:92px;background:#14213D;color:#fff"><span id="crSI"></span>Fixed salary, every month</div>`,
  // 7 written records
  `<div class="lg">` + [['7:05 am', '2 cups of chai', '₹30'], ['7:12 am', '1 cup of chai', '₹15'], ['7:30 am', 'Order more milk', 'Decision']].map(([a, b, c], k) =>
    `<div class="lr" id="lr${k}" style="top:${12 + k * 46}px"><span style="left:0;color:#8A8274">${a}</span><span style="left:170px${k === 2 ? ';color:#B8862F' : ''}">${b}</span><span class="lv">${c}</span>${k < 2 ? '<div class="ls"></div>' : ''}</div>`).join('') + `</div>`,
];
const FP = [['MAX WEBER\'S IDEA', 'Ideal bureaucracy', 'Seven features, all written down', 'AT CHAI CORNER', null]].concat(FE.map((f, i) => [`RULE 0${i + 1} / 07`, f[1], f[2], 'AT CHAI CORNER', VIS[i]]));
$('#fPans').innerHTML = FP.map(([s, t, m, x, v], i) => `<div class="pn" id="fn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('book', 34, C.gold, 2.2)}</i><span>Old habits become one rulebook</span></div>`}</div>`).join('');
$('#rcSI').innerHTML = M.icon('check', 26, '#fff', 2.6); $('#crSI').innerHTML = M.icon('coin', 26, C.gold2, 2.2);
// three kinds of authority
const AK = [['crown', 'Traditional', 'Always done this way'], ['star', 'Charismatic', 'A leader we admire'], ['scale', 'Rational-legal', 'The rules and the position']];
$('#kRow').innerHTML = AK.map(([ic, t, s], i) => `<div class="ak" id="ak${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="lbl">TYPE ${i + 1}</div><div class="ui"><span class="ico"></span></div><div class="serif ut">${t}</div><div class="us">${s}</div></div>`).join('');
$('#kI').innerHTML = M.icon('scale', 40, C.gold2, 2.2);
// good and bad
const GB = [['check', 'The good', C.gold, [['Fair', 'Same rules for all'], ['Orderly', 'Everyone knows their job'], ['Predictable', 'Same chai at every outlet']]],
  ['x', 'The bad', C.red, [['Red tape', 'Too much paperwork'], ['Rigid', 'Rules never bend'], ['Slow', 'Every step needs a form']]]];
$('#gbRow').innerHTML = GB.map(([ic, t, col, rows], i) => `<div class="card gb" id="gb${i}" style="left:${160 + i * 816}px"><div class="gi" style="background:${col}">${M.icon(ic, 48, '#fff', 2.8)}</div><div class="serif gt">${t}</div><div class="hr"></div>` +
  rows.map(([a, b], k) => `<div class="gr" id="gr${i}${k}" style="top:${216 + k * 120}px"><i>${M.icon(ic, 32, col, 2.6)}</i><span>${a}</span><em>${b}</em></div>`).join('') + `</div>`).join('');
const BK = `<svg class="bk" width="40" height="20"><path d="M0 20 L20 0 L40 20 Z" fill="currentColor"/></svg>`;
$('#spRow').innerHTML = [['smile', 'Customer', 'ASKS', 'Less sugar, please?', C.gold], ['user', 'Helper', 'REPLIES', 'Sorry, not in the rules.', C.ink2]].map(([ic, n, l, b, col], i) =>
  `<div class="card sp" id="sp${i}" style="left:${160 + i * 816}px"><div class="avc" style="background:${col}">${M.icon(ic, 44, '#fff', 2.2)}</div><div class="serif sn">${n}</div><div class="lbl">${l}</div><div class="bub" id="bub${i}" style="color:#F5F1E8">${BK}<div class="bt" id="bt${i}" style="color:#14213D">${b}</div>${i ? '<div class="bt" id="bt2" style="color:#B8862F">Sure, less sugar!</div>' : ''}</div></div>`).join('');
$('#pI').innerHTML = M.icon('book', 40, C.gold2, 2.2);
// quiz
const OPTS = ['Hierarchy', 'Impersonality', 'Merit', 'Written records'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('scale', 44, C.gold2, 2.4);
// recap
const ROWS = [['book', 'Bureaucracy', ['Written rules', 'Chain of command']], ['list', 'Features', ['Division of labour', 'Hierarchy', 'Rules', 'Impersonality', 'Merit']], ['scale', 'Good and bad', ['Fairness', 'Order', 'Red tape']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const pillRow = (ids, gap, arrowsG) => {   // lay out pills in a row with arrows between them
  let x = 0; const cx = [];
  ids.forEach(id => { const s = $(id); s.style.left = x + 'px'; cx.push([x, x + s.offsetWidth]); x += s.offsetWidth + gap; });
  let ar = ''; for (let k = 0; k < cx.length - 1; k++) { const m = (cx[k][1] + cx[k + 1][0]) / 2; ar += `<path id="${arrowsG.id}${k}" d="M${m - 16} 32 H${m + 12} M${m + 2} 22 L${m + 12} 32 L${m + 2} 42" stroke="#B9B1A3" stroke-width="4"/>`; }
  arrowsG.innerHTML = ar;
};
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const ap = $('#away'); ap.style.left = (308 - ap.offsetWidth / 2) + 'px';
  // timeline years centred under the dots
  $('#yA').style.left = (96 - $('#yA').offsetWidth / 2) + 'px'; $('#yB').style.left = (520 - $('#yB').offsetWidth / 2) + 'px';
  // pane titles auto-fit
  document.querySelectorAll('#fPans .pt, #dp .pt').forEach(p => { if (p.offsetWidth > 848) p.style.fontSize = Math.floor(84 * 848 / p.offsetWidth) + 'px'; });
  pillRow(['#rc0', '#rc1', '#rc2'], 72, $('#rcA'));
  pillRow(['#cr0', '#cr1', '#cr2'], 72, $('#crA'));
  // quiz options auto-fit
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  // recap pills after each row title
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const swap = (pn, t, tin, tout, extra) => {   // standard panel pane in/out
  const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return false;
  const oo = { outDur: 0.18, ody: -12 };
  M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
  M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
  M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
  M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
  M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
  return true;
};

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
  const exOn = t < tF[5] ? [tF[3] + 0.6, tF[4] - 0.14] : [tF[6] + 0.6, tFout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: six people, six ways ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    const gone = M.io((t - tSteps) / 0.55);
    if (gone >= 1) M.hide($('#ravi'), true); else { M.hide($('#ravi'), false); $('#ravi').setAttribute('transform', `translate(0 ${(150 * gone).toFixed(2)})`); $('#ravi').style.opacity = (1 - M.io((t - tSteps - 0.15) / 0.4)).toFixed(3); }
    M.vis($('#away'), t, tSteps + 0.45, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // rules card: zero rules, six people pulling six ways
    M.vis($('#rules'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.vis($('#rN'), t, tMorph + 0.5, 1e9, { dy: 16 });
    $('#rN').style.color = mix(C.ink, C.red, M.io((t - tOwn) / 0.4));
    M.vis($('#rNo'), t, tOwn + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    TW.forEach((_, i) => {
      M.vis($('#tw' + i), t, tMorph + 0.6 + i * 0.06, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#ta' + i), t, tMorph + 0.9 + i * 0.06, 1e9, { dy: 10 });
      const p = M.spring(t - tOwn - i * 0.07, M.SOFT), a = ANG[i] * p, ai = $('#ta' + i + ' .tai');
      ai.style.display = 'block'; ai.style.transform = Math.abs(a) < 0.01 ? 'none' : `rotate(${a.toFixed(2)}deg)`;
      if (t > tOwn) setIco(ai, 'arrowR', mix(C.ink2, C.red, M.io((t - tOwn) / 0.4)) , 36, 2.4);
    });
    // what goes wrong
    M.vis($('#wrong'), t, tBad[0] - 0.35, 1e9, { dy: 36 });
    BAD.forEach((_, i) => {
      const el = $('#job' + i); M.vis(el, t, tBad[i] - 0.05, 1e9, { dy: 24, sp: M.SOFT });
      el.style.background = mix(C.paper, C.redBg, M.io((t - tBad[i]) / 0.35));
      el.querySelectorAll('.jt').forEach((j, k) => M.rise(j, t, tBad[i] + 0.08 + k * 0.1, { st: 0.04 }));
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

  /* ===== D: Max Weber ===== */
  const dOn = t >= tTu - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    const wb = $('#wb'), pw = M.vis(wb, t, tD1 + 0.1, tDout, { dy: 36, ...o });
    const disc = M.spring(t - tD1 - 0.3, M.SOFT); $('#pDisc').setAttribute('r', (118 * disc).toFixed(2));
    M.vis($('#pBust'), t, tD1 + 0.45, 1e9, { dy: 30, fade: 0.2 });
    M.rise($('#wn'), t, tMax - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#wtag'), t, tMax + 0.4, 1e9, { dy: 10 });
    M.vis($('#tlA'), t, tY1 - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.rise($('#yA'), t, tY1, { st: 0.04 });
    M.draw($('#tlL'), t, tY1 + 0.2, Math.max(0.4, tY2 - tY1 - 0.2), M.io);
    M.vis($('#tlB'), t, tY2 - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.rise($('#yB'), t, tY2, { st: 0.04 });
    M.vis($('#dp'), t, tD1 + 0.25, tDout, { dx: 60, dy: 0, ...o });
    if (swap($('#dn0'), t, tD1 + 0.45, tD4 - 0.14)) {
      M.vis($('#dv0'), t, tD1 + 1.0, tD4 - 0.14, { dy: 18, outDur: 0.18, ody: -12 });
      for (let i = 0; i < 3; i++) {
        const u = $('#ut' + i); M.vis(u, t, tD1 + 1.1 + i * 0.08, 1e9, { dy: 14 });
        const g = M.io((t - tLike[i]) / 0.25); u.style.background = mix(C.paper, C.ink, g); u.querySelector('span').style.color = mix(C.ink, '#fff', g);
        u.querySelector('i').style.background = mix('#fff', C.navy2, g);
        setIco(u.querySelector('i'), ['home', 'briefcase', 'landmark'][i], g > 0.5 ? C.gold2 : C.gold, 32, 2.2);
      }
    }
    if (swap($('#dn1'), t, tD4, 1e9)) {
      M.vis($('#dr0'), t, tRulesW - 0.15, 1e9, { dy: 18 });
      M.vis($('#dr1'), t, tChain - 0.15, 1e9, { dy: 18 });
    }
  }

  /* ===== F: the rulebook ===== */
  const fOn = t >= tF0 - 0.1 && t < tA0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#book'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...fo });
    M.vis($('#fp'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...fo });
    FE.forEach(([ic], i) => {
      const el = $('#vr' + i), ta = tF[i], td = i < 6 ? tF[i + 1] : 1e9, tw = tWr[i];
      M.vis(el, t, tF0 + 0.4 + i * 0.06, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      const rt = el.querySelector('.rt'); M.rise(rt, t, tw - 0.05, { st: 0.05 }); rt.style.color = mix('#fff', C.ink, off);
      const ph = el.querySelector('.ph'); ph.style.opacity = (1 - M.io((t - tw + 0.1) / 0.2)).toFixed(3); ph.style.background = mix('#E4DCCD', C.navy2, act);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 22, 2.2);
      M.vis(el.querySelector('.rk'), t, td, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    });
    FP.forEach((_, k) => {
      const tin = k ? tF[k - 1] : tF0 + 0.5, tout = k < 7 ? (k ? tF[k] : tF[0]) - 0.14 : 1e9;
      const pn = $('#fn' + k); if (!swap(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        for (let i = 0; i < 3; i++) M.vis($('#dt' + i), t, tJob + i * 0.12, 1e9, { dy: 20, sc: 0.94, sp: M.POP });
      } else if (k === 2) {
        for (let i = 0; i < 3; i++) {
          const s = $('#sr' + i), p = M.spring(t - tLadder - i * 0.14, M.SOFT); M.hide(s, p <= 0);
          s.style.transform = p >= 1 ? 'none' : `translateY(${((1 - p) * 40).toFixed(2)}px)`; s.style.opacity = M.clamp((t - tLadder - i * 0.14) / 0.15).toFixed(3);
          const g = i === 2 ? M.io((t - tReports) / 0.3) : 0; s.style.background = mix(C.paper2, C.ink, g);
          s.querySelector('.sl').style.color = mix(C.muted, C.gold2, g);
          const sn = s.querySelector('.snm'); if (sn) sn.style.color = mix(C.ink, '#fff', g);
        }
      } else if (k === 3) {
        for (let s = 0; s < 3; s++) M.vis($('#rc' + s), t, tRecipe + s * 0.12, 1e9, { dy: 12 });
        for (let s = 0; s < 2; s++) M.vis($('#rcA' + s), t, tRecipe + 0.1 + s * 0.12, 1e9, { dy: 0, fade: 0.15 });
        M.vis($('#rcS'), t, tSame - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k === 4) {
        M.vis($('#cu0'), t, tin + 0.7, 1e9, { dy: 14 }); M.vis($('#cu1'), t, tin + 0.82, 1e9, { dy: 14 });
        const cp = $('#cp0'), f = M.io((t - tEqual) / 0.3); M.setT(cp, t < tEqual + 0.15 ? 'Free' : '₹15');
        cp.style.color = t < tEqual + 0.15 ? C.red : C.ink; cp.style.transform = Math.abs(f - 0.5) < 0.5 ? `translateY(${(Math.sin(Math.PI * f) * -8).toFixed(2)}px)` : 'none';
        M.vis($('#eqC'), t, tEqual + 0.25, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      } else if (k === 5) {
        [0.3, 0.92].forEach((lv, i) => {
          const el = $('#mt' + i); M.vis(el, t, tin + 0.7 + i * 0.12, 1e9, { dy: 14 });
          el.querySelector('.mf').style.width = (280 * lv * M.o3((t - tSkill - i * 0.12) / 0.6)).toFixed(1) + 'px';
          const hire = i === 1 ? M.io((t - tSkill - 0.6) / 0.3) : 0, dimC = i === 0 ? M.io((t - tFamily) / 0.3) : 0;
          el.querySelector('.bg').style.background = mix(mix(C.paper, C.ink, hire), '#F0EBE1', dimC);
          el.querySelector('.mn').style.color = mix(mix(C.ink, '#fff', hire), C.dim, dimC);
          el.querySelector('.ml').style.color = mix(mix(C.muted, '#8C96AE', hire), C.dim, dimC);
          el.querySelector('.mb').style.background = mix(C.line, C.navy3, hire);
          el.querySelector('.mf').style.background = mix(C.gold, C.dim, dimC);
          const ic = el.querySelector('i'); ic.style.background = mix('#fff', C.gold, hire);
          setIco(ic, i === 1 ? (hire > 0.5 ? 'check' : 'award') : 'user', hire > 0.5 ? '#fff' : (dimC > 0.5 ? C.dim : C.gold), 28, hire > 0.5 ? 2.8 : 2.2);
        });
      } else if (k === 6) {
        M.vis($('#crS'), t, tSalary - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        for (let s = 0; s < 3; s++) {
          const el = $('#cr' + s); M.vis(el, t, tin + 0.7 + s * 0.1, 1e9, { dy: 12 });
          const g = M.io((t - tGrow[s]) / 0.25); el.style.background = mix(C.paper, C.gold, g); el.style.color = mix(C.ink, '#fff', g);
        }
        for (let s = 0; s < 2; s++) M.vis($('#crA' + s), t, tin + 0.8 + s * 0.1, 1e9, { dy: 0, fade: 0.15 });
      } else if (k === 7) {
        for (let r = 0; r < 3; r++) { const el = $('#lr' + r); M.vis(el, t, tLed[r] - 0.05, 1e9, { dx: -20, dy: 0 }); }
      }
    });
  }

  /* ===== K: three kinds of authority ===== */
  const kOn = t >= tA0 - 0.1 && t < tP1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const ko = { outDur: 0.3, ody: -16 };
    M.rise($('#kh'), t, tA0 + 0.08, { st: 0.06, sp: M.HEAVY, out: tKout, outDur: 0.3 });
    AK.forEach(([ic], i) => {
      const el = $('#ak' + i), ta = tK[i], td = i < 2 ? tK[i + 1] : 1e9;
      M.vis(el, t, tA0 + 0.5 + i * 0.1, tKout, { dy: 36, ...ko });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.ut').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.us').style.color = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.lbl').style.color = mix(C.muted, C.gold2, act);
      el.querySelector('.ui').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), ic, t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 52, 2);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tA0 + 1.5 && t < tKout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#kstrip'), t, tBuilt - 0.05, tKout, { dy: 40, ...ko });
  }

  /* ===== P: good, bad, and common sense ===== */
  const pOn = t >= tP1 - 0.1 && t < tQ + 0.05; M.hide($('#sP'), !pOn);
  if (pOn) {
    const po = { outDur: 0.3, ody: -16 };
    GB.forEach(([, , , rows], i) => {
      M.vis($('#gb' + i), t, (i ? tP2 : tP1) + 0.05, tGBout, { dy: 36, ...po });
      rows.forEach((_, k) => M.vis($('#gr' + i + k), t, (i ? tBadR : tGood)[k] - 0.08, 1e9, { dy: 14 }));
    });
    [0, 1].forEach(i => {
      M.vis($('#sp' + i), t, tP3 + 0.1 + i * 0.12, 1e9, { dy: 36 });
      const tb = i ? tNot - 0.1 : tLess - 0.2;
      M.vis($('#bub' + i), t, tb, 1e9, { dy: 16, sc: 0.94, sp: M.POP });
      M.rise($('#bt' + i), t, tb + 0.1, { st: 0.05, out: i ? tTrust - 0.1 : 1e9, outDur: 0.25 });
    });
    M.rise($('#bt2'), t, tTrust + 0.3, { st: 0.06 });
    $('#bub1').style.background = mix(mix(C.paper, C.redBg, M.io((t - tNot) / 0.3)), C.gold3, M.io((t - tTrust) / 0.3));
    $('#bub1').style.color = mix(mix(C.paper, C.redBg, M.io((t - tNot) / 0.3)), C.gold3, M.io((t - tTrust) / 0.3));
    $('#bt1').style.color = mix(C.ink, C.red, M.io((t - tNot) / 0.3));
    M.vis($('#pstrip'), t, tP4 + 0.1, 1e9, { dy: 40 });
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
