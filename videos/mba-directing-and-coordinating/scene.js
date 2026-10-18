// MBA - Principles of Management, Ep 18: Directing and Coordinating
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  userX: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm17 8 5 5', 'm22 8-5 5'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  snow: ['M2 12h20', 'M12 2v20', 'm20 16-4-4 4-4', 'm4 8 4 4-4 4', 'm16 4-4 4-4-4', 'm8 20 4-4 4 4'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  flag: ['M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528'],
  msg: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  music: ['M9 18V5l12-2v13', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  drum: ['m2 2 8 8', 'm22 2-8 8', 'M12 13c5.523 0 10-1.79 10-4s-4.477-4-10-4S2 6.79 2 9s4.477 4 10 4Z', 'M2 9v6c0 2.21 4.477 4 10 4s10-1.79 10-4V9'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  sync: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  userPlus: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M19 8v6', 'M22 11h-6'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tTeam = tMorph + 0.45, tNobody = wt('H2', 'nobody');
const tWaits = wt('C1', 'waits'), tOrders = wt('C1', 'orders'), tReady = wt('C2', 'ready'), tLate = wt('C2', 'late'), tCold = wt('C3', 'Cold'), tWalk = wt('C3', 'walk');
const tT = T0('T1'), tSt2 = wt('T1', 'direction'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tMot = wt('D2', 'motivating'), tD3 = T0('D3'), tDc = [wt('D3', 'Planning'), wt('D3', 'Directing')], tE0 = T0('E0'), tDout = tE0 - 0.32;
const tEl = [T0('E1'), T0('E2'), T0('E3'), T0('E4')], tHuddle = wt('E4', 'huddle'), tK1 = T0('K1'), tEout = tK1 - 0.32;
const tK2 = T0('K2'), tK3 = T0('K3'), tTog = wt('K3', 'together'), tK4 = T0('K4'), tOrch = wt('K4', 'orchestra');
const tMus = wt('K5', 'musician'), tAlone = wt('K5', 'alone'), tCond = wt('K6', 'conductor'), tSame = wt('K6', 'same');
const tL1c = wt('L1', 'conductor'), tL2 = T0('L2'), tKout = tL2 - 0.32;
const tSix = wt('L2', 'six'), tSam = wt('L2', 'samosas'), tTen = wt('L2', 'ten'), tFour = wt('L3', 'four'), tMin10 = wt('L4', 'ten'), tReady2 = wt('L4', 'ready'), tMeena = wt('L5', 'Meena'), tClears = wt('L5', 'clears');
const tX1 = T0('X1'), tLout = tX1 - 0.32, tCoord = wt('X1', 'coordination'), tEss = wt('X1', 'essence'), tX2 = T0('X2'), tRuns = wt('X2', 'runs'), tY1 = T0('Y1'), tXout = tY1 - 0.32;
const tYd = wt('Y1', 'directing'), tYc = wt('Y1', 'Coordinating');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning + cups (same stall as Ep 01)
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = []; [[4, 0], [3, 1]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([430 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// the outlet team: Ravi (owner), Meena (runs the outlet) and two new helpers
const CREW = [['R', 0], ['M', 0], ['', 1], ['', 1]];
$('#crewRow').innerHTML = CREW.map(([l, nw], i) => `<div class="avc" id="cr${i}" style="left:${248 + i * 106}px;background:${nw ? C.gold2 : C.gold}">${nw ? '<span class="ico"></span>' : l}</div>`).join('');
$('#pDayI').innerHTML = M.icon('users', 24, C.gold, 2.2); $('#pWhoI').innerHTML = M.icon('help', 24, C.red, 2.2); $('#pLostI').innerHTML = M.icon('userX', 24, C.red, 2.2);
// order 01: chai and samosa
const SRV = [['Chai', 'cup'], ['Samosa', 'flame']];
$('#srvRow').innerHTML = SRV.map(([t, ic], i) => `<div class="job" id="sv${i}" style="left:${36 + i * 436}px"><div class="ji">${M.icon(ic, 28, C.ink, 2.2)}</div><div class="jt">${t}</div><div class="av"></div><div class="jr"></div></div>`).join('');
// definition cards
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const DC = [['target', 'Planning', 'Sets the goal', [['ANSWERS', 'Where are we going?'], ['AT CHAI CORNER', 'Serve every order hot']]],
  ['compass', 'Directing', 'Gets people moving toward it', [['ANSWERS', 'Who does what, and how?'], ['AT CHAI CORNER', 'Ravi guides the new team']]]];
$('#dRow').innerHTML = DC.map(([ic, t, s, fx], i) => `<div class="card dc" id="dc${i}" style="left:${160 + i * 816}px"><div class="di">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="dn">0${i + 1}</div><div class="serif dt">${t}</div><div class="ds">${s}</div><div class="hr"></div>${fx.map(([a, b], k) => `<div class="fx" style="top:${292 + k * 84}px">${a}</div><div class="fv" style="top:${320 + k * 84}px">${b}</div>`).join('')}</div>`).join('');
// four elements on a compass ring
const EL = [['SUPERVISION', 'eye', 'Supervision', 'Watching and helping on the spot', 'Ravi shows the new helper how to strain the tea'],
  ['MOTIVATION', 'star', 'Motivation', 'Giving people a reason to try', 'Praise for good work, and a bonus on busy days'],
  ['LEADERSHIP', 'flag', 'Leadership', 'Setting the example', 'Ravi comes in first, and stays calm in the rush'],
  ['COMMUNICATION', 'msg', 'Communication', 'Clear talk, both ways', 'A short huddle before opening, where anyone can ask']];
const CX = 392, CY = 290, RR = 180, ang = i => (-90 + i * 90) * Math.PI / 180;
$('#nodes').innerHTML = EL.map(([l], i) => `<div class="nd" id="nd${i}" style="left:${Math.round(CX + RR * Math.cos(ang(i)) - 76)}px;top:${Math.round(CY + RR * Math.sin(ang(i)) - 76)}px"><div class="bg"></div><div class="ni"></div><div class="nl">${l}</div></div>`).join('');
const PANES = [['THE FOUR ELEMENTS', 'Directing', 'How a manager moves people', 'users', 'Ravi uses all four with his new team']]
  .concat(EL.map((e, i) => [`ELEMENT 0${i + 1} / 04`, e[2], e[3], e[1], e[4]]));
$('#pans').innerHTML = PANES.map(([s, t, m, ic, e], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div><div class="pe"><i>${M.icon(ic, 38, C.gold, 2.2)}</i><span>${e}</span></div></div>`).join('');
// orchestra: four instruments, five beats each
const INS = [['music', 'Violin'], ['music', 'Cello'], ['wind', 'Flute'], ['drum', 'Drums']];
const BX = k => 340 + k * 144;                   // aligned beat centres (row coordinates)
const rnd = M.rng(18), OFF = INS.map(() => Array.from({ length: 5 }, () => Math.round((rnd() - 0.5) * 96)));
$('#irRows').innerHTML = [0, 1, 2, 3, 4].map(k => `<div class="abs" id="bl${k}" style="left:${576 + BX(k) - 1}px;top:136px;width:2px;height:392px;background:#E9D9B5"></div>`).join('') +
  INS.map(([ic, n], i) => `<div class="ir" id="ir${i}" style="top:${136 + i * 104}px"><div class="ii">${M.icon(ic, 30, C.gold, 2.2)}</div><div class="in">${n}</div><div class="tr"></div>${[0, 1, 2, 3, 4].map(k => `<div class="bt" id="bt${i}${k}"></div>`).join('')}</div>`).join('');
$('#cond').insertAdjacentHTML('beforeend', `<div class="serif" id="condN2" style="position:absolute;left:0;width:520px;top:424px;text-align:center;font-size:44px;white-space:nowrap">Ravi</div><div id="condT2" style="position:absolute;left:0;width:520px;top:488px;text-align:center;font:600 16px Poppins;letter-spacing:.14em;color:var(--muted);white-space:nowrap">CONDUCTOR OF CHAI CORNER</div>`);
$('#syncI').innerHTML = M.icon('x', 22, C.red, 2.6);
// service timeline: 0-12 minutes
const X0 = 480, PX = 88, xm = m => X0 + m * PX;
$('#ticks').innerHTML = [0, 2, 4, 6, 8, 10, 12].map(m => `<div class="tk" id="tk${m}" style="left:${xm(m)}px">${m === 12 ? '12 min' : m}</div><div class="tg" id="tg${m}" style="left:${xm(m) - 1}px"></div>`).join('');
const TR = [['user', 'Brew chai', 150, C.gold], ['user', 'Fry samosas', 262, C.ink2], ['M', 'Clear tables', 374, C.ink]];
$('#tRows').innerHTML = TR.map(([a, n, y], i) => `<div class="tr2" id="trw${i}" style="top:${y}px">${a.length > 1 ? `<div class="avc" style="background:${C.gold2}">${M.icon('user', 30, C.gold, 2.2)}</div>` : `<div class="avc" style="background:${C.gold}">${a}</div>`}<div class="tn">${n}</div></div>`).join('') +
  `<div id="gap" style="top:170px"></div><div id="gapP"><span id="gapI"></span><span>Cold for 4 min</span></div>` +
  TR.map(([, , y, col], i) => `<div class="tb" id="tb${i}" style="top:${y + 20}px;background:${col}"><span class="tv"></span></div>`).join('');
$('#gapI').innerHTML = M.icon('snow', 20, '#fff', 2.4);
$('#nowI').innerHTML = M.icon('check', 24, '#fff', 2.8); $('#headI').innerHTML = M.icon('flame', 24, C.gold2, 2.2);
// essence: five functions on one thread
const FN = [['clipboard', 'Planning'], ['network', 'Organizing'], ['userPlus', 'Staffing'], ['compass', 'Directing'], ['gauge', 'Controlling']];
$('#xRow').innerHTML = FN.map(([ic, n], i) => `<div class="card xf" id="xf${i}" style="left:${160 + i * 326.5}px;height:260px"><div class="xi">${M.icon(ic, 38, C.gold, 2.2)}</div><div class="serif xt">${n}</div></div>`).join('');
const TY = 800;
$('#thrL').setAttribute('d', `M196 ${TY} H1724`);
$('#thrD').innerHTML = FN.map((_, i) => `<circle id="td${i}" cx="${(160 + i * 326.5 + 147).toFixed(1)}" cy="${TY}" r="11" fill="#B8862F" stroke="#fff" stroke-width="4"/>`).join('');
// directing vs coordinating
const TEAM4 = ['A', 'K', 'M', ''];
const YY = [['compass', 'Directing', 'Moves each person', 'One by one'], ['sync', 'Coordinating', 'Makes them move as one', 'All on one beat']];
$('#yRow').innerHTML = YY.map(([ic, t, m, p], i) => `<div class="yc" id="yc${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="yi"><span class="ico"></span></div><div class="serif yt">${t}</div><div class="ym">${m}</div><div class="hr"></div><div class="ys">
  ${i ? `<svg class="abs yl" width="688" height="300" style="left:0;top:0"><path d="M62 52 H626" stroke="#B8862F" stroke-width="4" stroke-linecap="round"/><path class="ya" d="M32 156 H640 M620 140 L640 156 L620 172" fill="none" stroke="#B8862F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
  ${TEAM4.map((l, k) => `<div class="avc ya${k}" style="left:${k * 208}px;top:20px;background:${l ? C.gold : C.gold2}">${l || M.icon('user', 30, C.gold, 2.2)}</div>${i ? '' : `<div class="abs yr${k}" style="left:${k * 208 + 8}px;top:132px">${M.icon('arrowR', 48, C.gold, 2.6)}</div>`}`).join('')}
  <div class="pill yp" style="left:0;top:224px">${p}</div></div></div>`).join('');
// quiz
const OPTS = ['Supervision', 'Motivation', 'Coordinating', 'Controlling'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('sync', 44, C.gold2, 2.4);
// recap
const ROWS = [['compass', 'Directing = <span class="acc">guiding people</span>', ['Instruct', 'Motivate'], [wt('S2', 'instructing'), wt('S2', 'motivating')]],
  ['users', 'Four <span class="acc">elements</span>', ['Supervision', 'Motivation', 'Leadership', 'Communication'], [wt('S3', 'supervision'), wt('S3', 'motivation'), wt('S3', 'leadership'), wt('S3', 'communication')]],
  ['sync', 'Coordinating = <span class="acc">one beat</span>', ['Essence of management'], [wt('S4', 'essence')]]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const arcD = (deg) => { const a0 = -Math.PI / 2, a1 = a0 + deg * Math.PI / 180; const x0 = CX + RR * Math.cos(a0), y0 = CY + RR * Math.sin(a0), x1 = CX + RR * Math.cos(a1), y1 = CY + RR * Math.sin(a1); return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${RR} ${RR} 0 ${deg > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
const ringDeg = M.track(0, [[tEl[1], 90], [tEl[2], 180], [tEl[3], 270], [tHuddle, 359.9]], M.SOFT);
const chaiStart = M.track(0, [[tFour, 4, M.HEAVY]]);
const pulse = (el, t, a, amp = 0.08, d = 0.45, after = 1e9) => { if (t > a && t < a + d) el.style.transform = `scale(${(1 + amp * Math.sin(Math.PI * (t - a) / d)).toFixed(4)})`; else if (t >= a + d && t < after && el.style.transform !== 'none') el.style.transform = 'none'; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // team pills in one row
  const pw = $('#pWho'), pl = $('#pLost');
  pw.style.left = (36 + $('#pDay').offsetWidth + 16) + 'px'; pw.style.top = '196px';
  M.setT($('#pLostT'), '0 customers left'); pl.style.boxSizing = 'border-box'; pl.style.width = pl.offsetWidth + 'px';
  pl.style.left = (pw.offsetLeft + pw.offsetWidth + 16) + 'px'; pl.style.top = '196px';
  const sp = $('#syncP'); M.setT($('#syncT'), 'Same beat'); const w1 = sp.offsetWidth; M.setT($('#syncT'), 'Out of sync'); const w2 = sp.offsetWidth;
  sp.style.boxSizing = 'border-box'; sp.style.width = Math.max(w1, w2) + 'px'; sp.style.left = (1552 - Math.max(w1, w2)) + 'px';
  $('#nowP').style.left = (1552 - $('#nowP').offsetWidth) + 'px'; $('#headP').style.left = '48px';
  ROWS.forEach((r, i) => { const rt = $('#rw' + i + ' .rt'); let x2 = 216 + rt.offsetWidth + 40; r[2].forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x2 + 'px'; x2 += p.offsetWidth + 16; }); });
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

  /* ===== A: opening day, nobody in sync ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    const cold = M.io((t - tCold) / 0.6);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    $('#steam').style.opacity = (1 - cold).toFixed(3);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // the new team
    M.vis($('#crew'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.setT($('#cN'), String(Math.round(4 * M.o5((t - tTeam) / 0.8))));
    CREW.forEach(([, nw], i) => {
      const el = $('#cr' + i); M.vis(el, t, tTeam + 0.1 + i * 0.09, 1e9, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1 });
      if (nw) {
        const lost = i === 2 ? M.io((t - tWaits) / 0.3) : 0;
        el.style.background = mix(C.gold2, C.red, lost);
        setIco(el.querySelector('.ico'), lost > 0.5 ? 'help' : 'user', lost > 0.5 ? '#fff' : C.gold, 30);
        if (i === 2) pulse(el, t, tWaits, 0.12, 0.45, tT);
      }
    });
    M.vis($('#pDay'), t, tMorph + 0.7, 1e9, { dy: 16 });
    M.vis($('#pWho'), t, tNobody - 0.05, 1e9, { dy: 16 });
    M.vis($('#pLost'), t, tWalk - 0.1, 1e9, { dy: 16 });
    M.setT($('#pLostT'), `${Math.round(3 * M.o5((t - tWalk) / 0.9))} customers left`);
    // order 01
    M.vis($('#serve'), t, tOrders - 0.3, 1e9, { dy: 36 });
    SRV.forEach((_, i) => {
      const el = $('#sv' + i); M.vis(el, t, tOrders - 0.1 + i * 0.1, 1e9, { dy: 24 });
      const av = el.querySelector('.av'), jr = el.querySelector('.jr');
      let st;   // state: wait / ready / late / cold
      if (i === 0) st = t >= tCold ? 'cold' : t >= tReady ? 'ready' : 'wait'; else st = t >= tLate ? 'late' : 'wait';
      const S = { wait: [C.paper2, 'clock', C.muted, 'NO ORDER YET', C.muted], ready: [C.gold, 'check', '#fff', 'READY', C.gold], late: [C.red, 'timer', '#fff', '10 MIN LATE', C.red], cold: [C.red, 'snow', '#fff', 'GONE COLD', C.red] }[st];
      av.style.background = S[0]; setIco(av, S[1], S[2], 26, 2.6); M.setT(jr, S[3]); jr.style.color = S[4];
      M.vis(av, t, tOrders + 0.2 + i * 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      M.vis(jr, t, tOrders + 0.3 + i * 0.1, 1e9, { dy: 10 });
      pulse(av, t, i === 0 ? (t >= tCold ? tCold : tReady) : tLate, 0.16, 0.45, tT);
    });
  }

  /* ===== statement on navy ===== */
  const sx = sweepX(t);
  const swp = $('#sweep'); M.hide(swp, sx === null); if (sx !== null) swp.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== D: what is directing? ===== */
  const dOn = t >= tTu - 0.05 && t < tE0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.rise($('#quote1'), t, tD2 + 0.1, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, wt('D2', 'and') - 0.05, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    M.vis($('#qby'), t, tMot + 0.6, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tD3 + 0.05, tDout, { dy: 24, ...o });
    DC.forEach((d, i) => {
      const el = $('#dc' + i); M.vis(el, t, tDc[i] - 0.08, tDout, { dy: 30, ...o });
      if (i === 0) { const sh = M.spring(t - (tDc[1] - 0.3), M.HEAVY); el.style.width = (sh > 0.999 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'; }
      el.querySelectorAll('.hr,.fx,.fv').forEach((c, j) => M.vis(c, t, tDc[i] + 0.35 + j * 0.1, 1e9, { dy: 12 }));
      el.querySelector('.di').style.background = mix(C.paper, C.ink, i ? M.io((t - tDc[1]) / 0.3) : 0);
      if (i) setIco(el.querySelector('.di'), 'compass', t >= tDc[1] + 0.15 ? C.gold2 : C.gold, 40);
      el.querySelector('.dn').style.color = i ? mix(C.line, C.gold, M.io((t - tDc[1]) / 0.3)) : C.line;
    });
  }

  /* ===== E: four elements of directing ===== */
  const eOn = t >= tE0 - 0.1 && t < tK1 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#cmp'), t, tE0 + 0.05, tEout, { dy: 36, ...fo });
    M.draw($('#ringC'), t, tE0 + 0.2, 1.0, M.io);
    const deg = ringDeg(t); M.hide($('#ringG'), t < tEl[1] || deg < 0.5); if (deg >= 0.5) $('#ringG').setAttribute('d', arcD(deg));
    M.vis($('#hub'), t, tE0 + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP });
    EL.forEach((e, i) => {
      const el = $('#nd' + i), ta = tEl[i], td = i < 3 ? tEl[i + 1] : tEout + 1;
      M.vis(el, t, tE0 + 0.4 + i * 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.gold, act); bg.style.borderColor = mix(t >= ta ? C.gold : C.line, C.gold, act);
      setIco(el.querySelector('.ni'), e[1], act > 0.5 ? '#fff' : (t >= ta ? C.gold : C.dim), 44, 2);
      el.querySelector('.nl').style.color = act > 0.5 ? '#fff' : (t >= ta ? C.ink : C.muted);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tE0 + 2 && t < tEout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.08 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#panel'), t, tE0 + 0.2, tEout, { dx: 60, dy: 0, ...fo });
    PANES.forEach((_, k) => {
      const tin = k ? tEl[k - 1] : tE0 + 0.35, tout = k < 4 ? tEl[k] - 0.14 : 1e9;
      const pn = $('#pn' + k); M.hide(pn, t < tin - 0.01 || t > tout + 0.3);
      if (t < tin - 0.01 || t > tout + 0.3) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo });
    });
  }

  /* ===== K: what is coordinating? the orchestra ===== */
  const kOn = t >= tK1 - 0.1 && t < tL2 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.rise($('#kq0'), t, tK1 + 0.05, { st: 0.06, sp: M.HEAVY, out: tK2 - 0.12, outDur: 0.3 });
    M.rise($('#kq'), t, tK2 + 0.05, { st: 0.07, sp: M.HEAVY, out: tK3 - 0.1, outDur: 0.3 });
    M.rise($('#kquote1'), t, tK3 + 0.1, { st: 0.05, out: tK4 - 0.12, outDur: 0.3 });
    M.rise($('#kquote2'), t, wt('K3', 'so') - 0.05, { st: 0.06, out: tK4 - 0.1, outDur: 0.3 });
    M.vis($('#kby'), t, tTog + 0.6, tK4 - 0.12, { dy: 12, outDur: 0.25 });
    const ko = { outDur: 0.3, ody: -16 };
    M.vis($('#orc'), t, tOrch - 0.15, tKout, { dy: 36, ...ko });
    M.vis($('#condB'), t, tOrch + 0.05, 1e9, { dy: 30, sp: M.SOFT });
    M.draw($('#mn1'), t, tOrch + 0.5, 0.6, M.o3);
    M.vis($('#mc1'), t, tOrch + 0.9, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#mc2'), t, tOrch + 1.0, 1e9, { dy: 0, fade: 0.2 });
    $('#music').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    // baton: rests, then conducts on "conductor", then settles
    const bo = M.clamp((t - tOrch - 0.25) / 0.2); M.hide($('#baton'), bo <= 0); $('#baton').style.opacity = bo.toFixed(3);
    const cu = t - tCond, ba = cu > 0 && cu < 2.4 ? 22 * Math.sin(cu * Math.PI * 2 / 0.8) * (1 - cu / 2.4) : 0;
    $('#baton').setAttribute('transform', `translate(352 300) rotate(${ba.toFixed(2)})`);
    M.rise($('#condN'), t, tOrch + 0.3, { st: 0.06, out: tL1c - 0.1, outDur: 0.25 });
    M.vis($('#condT'), t, tOrch + 0.5, tL1c - 0.1, { dy: 10, outDur: 0.25 });
    M.rise($('#condN2'), t, tL1c + 0.15, { st: 0.06, sp: M.HEAVY });
    M.vis($('#condT2'), t, tL1c + 0.35, 1e9, { dy: 10 });
    M.vis($('#orcL'), t, tOrch + 0.2, 1e9, { dy: 10 });
    const syn = M.io((t - tSame) / 0.3), sp = $('#syncP');
    M.vis(sp, t, tAlone - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    sp.style.background = mix(C.redBg, C.ink, syn); sp.style.color = mix(C.red, '#fff', syn);
    M.setT($('#syncT'), syn > 0.5 ? 'Same beat' : 'Out of sync'); setIco($('#syncI'), syn > 0.5 ? 'check' : 'x', syn > 0.5 ? C.gold2 : C.red, 22, 2.6);
    pulse(sp, t, tSame, 0.08, 0.45, tKout);
    for (let k = 0; k < 5; k++) { const b = $('#bl' + k); M.vis(b, t, tSame - 0.1 + k * 0.05, 1e9, { dy: 0, fade: 0.25 }); }
    INS.forEach((_, i) => {
      const r = $('#ir' + i); M.vis(r, t, tOrch + 0.35 + i * 0.1, 1e9, { dy: 16 });
      const snap = M.spring(t - (tCond + 0.2 + i * 0.12), M.SOFT);
      for (let k = 0; k < 5; k++) {
        const d = $('#bt' + i + k), x = BX(k) + OFF[i][k] * (1 - snap);
        d.style.left = (Math.abs(x - BX(k)) < 0.05 ? BX(k) - 16 : x - 16).toFixed(2) + 'px';
        M.vis(d, t, tMus + i * 0.12 + k * 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
        d.style.background = mix(C.ink2, C.gold, M.io((t - tSame - k * 0.08) / 0.25));
      }
    });
  }

  /* ===== L: Ravi's service timeline ===== */
  const lOn = t >= tL2 - 0.1 && t < tX1 + 0.2; M.hide($('#sL'), !lOn);
  M.vis($('#exChip'), t, tL2 + 0.3, tLout, { dy: 10, outDur: 0.3 });
  if (lOn) {
    M.vis($('#tl'), t, tL2 - 0.05, tLout, { dy: 36, outDur: 0.3, ody: -16 });
    M.vis($('#tlL'), t, tL2 + 0.1, 1e9, { dy: 10 });
    [0, 2, 4, 6, 8, 10, 12].forEach((mm, j) => { M.vis($('#tk' + mm), t, tL2 + 0.2 + j * 0.05, 1e9, { dy: 10 }); M.vis($('#tg' + mm), t, tL2 + 0.25 + j * 0.05, 1e9, { dy: 0, fade: 0.25 }); });
    const rin = [tL2 + 0.1, tSam - 0.15, tMeena - 0.1];
    TR.forEach((_, i) => M.vis($('#trw' + i), t, rin[i], 1e9, { dy: 16 }));
    // bars: [start, length, grow time]
    const cs = chaiStart(t), BARS = [[cs, 6, tSix - 0.05], [0, 10, tTen - 0.6], [10, 2, tClears - 0.05]];
    BARS.forEach(([s, len, tg], i) => {
      const el = $('#tb' + i), g = M.o3((t - tg) / (i === 1 ? 1.0 : 0.6)), w = len * PX * g;
      M.hide(el, g <= 0.001);
      el.style.left = (xm(s) + 0).toFixed(2) + 'px'; el.style.width = Math.max(0, w).toFixed(2) + 'px';
      const tv = el.querySelector('.tv'); M.setT(tv, `${Math.round(len * g)} min`); tv.style.opacity = M.clamp((w - 90) / 40).toFixed(3);
      if (i < 2) el.style.boxShadow = M.io((t - tMin10) / 0.3) > 0 ? `0 0 0 ${(4 * M.io((t - tMin10) / 0.3)).toFixed(2)}px ${C.gold2}` : 'none';
    });
    // the 4-minute gap: chai waits and goes cold, until the start moves
    const gapIn = M.io((t - (tTen + 0.4)) / 0.3), cEnd = cs + 6, gw = (10 - cEnd) * PX;
    const gp = $('#gap'), gpp = $('#gapP');
    const gOn = gapIn > 0 && gw > 2; M.hide(gp, !gOn); M.hide(gpp, !gOn || gw < 150);
    if (gOn) {
      gp.style.left = xm(cEnd).toFixed(2) + 'px'; gp.style.width = gw.toFixed(2) + 'px'; gp.style.opacity = gapIn.toFixed(3);
      gpp.style.left = (xm(cEnd) + gw / 2 - gpp.offsetWidth / 2).toFixed(2) + 'px'; gpp.style.top = '180px';
      gpp.style.opacity = (gapIn * M.clamp((gw - 150) / 60)).toFixed(3);
    }
    M.vis($('#headP'), t, tFour + 0.1, 1e9, { dy: 16 });
    const nw = $('#now'); nw.style.left = xm(10) + 'px';
    M.vis(nw, t, tMin10 - 0.05, 1e9, { dy: 0, fade: 0.2 });
    nw.style.transformOrigin = '50% 0'; if (t > tMin10 - 0.05 && t < tMin10 + 0.6) nw.style.transform = `scaleY(${M.o3((t - tMin10 + 0.05) / 0.6).toFixed(4)})`; else if (t >= tMin10 + 0.6 && nw.style.transform !== 'none') nw.style.transform = 'none';
    M.vis($('#nowP'), t, tReady2 - 0.1, 1e9, { dy: 16 });
  }

  /* ===== X: the essence of management ===== */
  const xOn = t >= tX1 - 0.1 && t < tY1 + 0.2; M.hide($('#sX'), !xOn);
  if (xOn) {
    const xo = { outDur: 0.3, ody: -16 };
    M.rise($('#xq1'), t, tX1 + 0.1, { st: 0.06, out: tXout, outDur: 0.3 });
    M.rise($('#xq2'), t, tEss - 0.05, { st: 0.07, sp: M.HEAVY, out: tXout, outDur: 0.3 });
    M.vis($('#xby'), t, tX1 + 0.4, tXout, { dy: 12, ...xo });
    FN.forEach((_, i) => M.vis($('#xf' + i), t, tCoord + i * 0.1, tXout, { dy: 30, ...xo }));
    M.draw($('#thrL'), t, tRuns - 0.05, 1.3, M.io);
    $('#thread').style.opacity = (1 - M.io((t - tXout) / 0.3)).toFixed(3);
    FN.forEach((_, i) => { const cx = 160 + i * 326.5 + 147, u = (cx - 196) / 1528; M.vis($('#td' + i), t, tRuns - 0.05 + 1.3 * u * 0.9, 1e9, { dy: 0, fade: 0.1 }); });
  }

  /* ===== Y: directing vs coordinating ===== */
  const yOn = t >= tY1 - 0.1 && t < tQ + 0.05; M.hide($('#sY'), !yOn);
  if (yOn) {
    YY.forEach((y, i) => {
      const el = $('#yc' + i), ta = i ? tYc : tYd, td = i ? 1e9 : tYc;
      M.vis(el, t, tY1 + 0.05 + i * 0.1, 1e9, { dy: 36 });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.yt').style.color = mix(C.ink, '#fff', act);
      el.querySelector('.ym').style.color = mix(C.ink2, C.gold2, act);
      el.querySelector('.yi').style.background = mix(C.paper, '#24345A', act);
      setIco(el.querySelector('.ico'), y[0], act > 0.5 ? C.gold2 : C.gold, 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      const yp = el.querySelector('.yp'); yp.style.background = mix(C.paper, '#24345A', act); yp.style.color = mix(C.ink, '#fff', act);
      M.vis(yp, t, ta + 0.5, 1e9, { dy: 12 });
      for (let k = 0; k < 4; k++) {
        M.vis(el.querySelector('.ya' + k), t, tY1 + 0.3 + i * 0.1 + k * 0.06, 1e9, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1 });
        if (!i) M.vis(el.querySelector('.yr' + k), t, ta + 0.1 + k * 0.12, 1e9, { dx: -24, dy: 0 });
      }
      if (i) { M.draw(el.querySelector('.yl path'), t, tY1 + 0.6, 0.5, M.o3); M.draw(el.querySelector('.ya'), t, ta + 0.1, 0.7, M.o3); }
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tY1 + 0.6 && t < tQ) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'What') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'What') + 0.2 + i * 0.08, 1e9, { dy: 40 });
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
    ROWS.forEach((r, i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04 });
      r[3].forEach((tp, k) => {
        const el = $('#fp' + i + k); M.vis(el, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const a = tp - 0.05, b = k < r[3].length - 1 ? r[3][k + 1] - 0.05 : (i < 2 ? tRow[i + 1] - 0.05 : tN - 0.4);
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
        el.style.color = g > 0.5 ? '#fff' : C.ink;
      });
    });
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on the 3 sweeps, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
