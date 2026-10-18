// MBA - Principles of Management, Ep 09: Administrative Management - Henri Fayol
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  puzzle: ['M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z'],
  pick: ['M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912', 'M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393', 'M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z', 'M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  userCheck: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm16 11 2 2 4-4'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  plank: ['M3 10h18', 'M3 14h18', 'M5 10v4', 'M12 10v4', 'M19 10v4'],
  alert: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 8v4', 'M12 16h.01'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tOne = wt('H2', 'one'), tKab = wt('H2', 'Kabir'), tOpp = wt('H2', 'opposite');
const tTwo = wt('C1', 'Two'), tNobody = wt('C1', 'nobody'), tCash = wt('C2', 'cash'), tArg = wt('C2', 'arguing');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tFrench = wt('D1', 'French'), tHenri = wt('D2', 'Henri'), tFr = [wt('D2', 'ran'), wt('D3', '1916'), wt('D4', 'father')], tDout = T0('M1') - 0.32;
const tM1 = T0('M1'), tM2 = T0('M2'), tFrom = wt('M2', 'from'), tFunc = wt('M2', 'functions'), tM3 = T0('M3'), tTay = wt('M3', 'Taylor'), tFay = wt('M3', 'Fayol'), tMout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tFix = wt('F5', 'Checking'), tFout = T0('P0') - 0.32;
const tP0 = T0('P0'), t14 = wt('P0', 'fourteen'), tSimple = wt('P0', 'simple'), tAll = wt('P1', 'all'), tFour = wt('P1', 'four', 1), tPout = T0('K1') - 0.32;
const tK = [T0('K1'), T0('K3'), T0('K5'), T0('K8')];
const tJobIn = wt('K1', 'one'), tNm = [wt('K2', 'Asha'), wt('K2', 'Kabir'), wt('K2', 'Meena')];
const tOnly = wt('K3', 'only'), tOnlyR = wt('K4', 'only');
const tLine = wt('K5', 'line'), tTop = wt('K5', 'top'), tSlow = wt('K6', 'slow'), tOk = wt('K7', 'okay'), tGang = wt('K7', 'gang');
const tSpirit = wt('K8', 'team'), tPraise = wt('K9', 'praises'), tChai = wt('K9', 'Chai');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'A');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = ['plan', 'organize', 'command', 'coordinate', 'control'].map(w => wt('S2', w));
const tKey = ['division', 'unity', 'scalar', 'team'].map(w => wt('S4', w));
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = []; [[4, 0], [3, 1]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([430 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#aBadI').innerHTML = M.icon('alert', 22, C.red, 2.2); $('#jBadI').innerHTML = M.icon('coin', 22, C.red, 2.2);
// who does what (hook)
const HJ = [['Make tea', 'cup', ['A']], ['Wash cups', 'droplet', ['M', '+']], ['Count money', 'coin', ['?']]];
const HELP = M.icon('user', 24, '#fff', 2.4);
$('#jobRow').innerHTML = HJ.map(([t, ic, avs], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji"></div><div class="jt">${t}</div>${avs.map((a, k) => `<div class="av" id="jav${i}${k}" style="right:${20 + (avs.length - 1 - k) * 56}px">${a === '+' ? HELP : a}</div>`).join('')}</div>`).join('');
// Fayol fact rows
const FR = [['pick', 'THE JOB', 'Ran a big mining company', 'Managing director for 30 years'],
  ['book', 'THE BOOK · 1916', 'A guide to running a company', 'Administration Industrielle et Générale'],
  ['cap', 'HIS TITLE', 'Father of modern management', 'Still taught to students today']];
$('#fRows').innerHTML = FR.map(([ic, l, t, s], i) => `<div class="card fr" id="fr${i}" style="top:${270 + i * 204}px"><div class="fi"></div><div class="lbl">${l}</div><div class="serif ft">${t}</div><div class="fs">${s}</div></div>`).join('');
// definition bar + Taylor vs Fayol
$('#mbarI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const EE = [['Taylor', 'One worker\'s task', 'timer', 'The shop floor, task by task', [['timer', 'Stopwatch'], ['check', 'One best way']]],
  ['Fayol', 'The whole company', 'network', 'Every manager, from the top', [['clipboard', '5 functions'], ['grid', '14 principles']]]];
$('#eRow').innerHTML = EE.map(([t, m, ic, v, cs], i) => `<div class="ee" id="ee${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">LOOKS AT</div><div class="ev">${v}</div>${cs.map((c, k) => `<div class="ec" id="ec${i}${k}"><span class="eci"></span>${c[1]}</div>`).join('')}</div>`).join('');
// five functions: nodes on a ring
const FN = [['PLAN', 'clipboard', 'Planning', 'Looking ahead', 'Buy extra milk for the weekend'],
  ['ORGANIZE', 'network', 'Organizing', 'Arranging people and things', 'Asha at the stove, Kabir at the cash box'],
  ['COMMAND', 'megaphone', 'Commanding', 'Giving clear instructions', 'Ravi tells each person their task for the day'],
  ['COORDINATE', 'puzzle', 'Coordinating', 'Making work fit together', 'Tea, cash and cups all move at the same pace'],
  ['CONTROL', 'gauge', 'Controlling', 'Checking it goes to plan', 'Ravi checks the cash box every night']];
const CX = 536, CY = 565, RR = 220, ang = i => (-90 + i * 72) * Math.PI / 180;
$('#nodes').innerHTML = FN.map(([l], i) => `<div class="nd" id="nd${i}" style="left:${(CX + RR * Math.cos(ang(i)) - 68).toFixed(1)}px;top:${(CY + RR * Math.sin(ang(i)) - 68).toFixed(1)}px"><div class="bg"></div><div class="ni"></div><div class="nl">${l}</div></div>`).join('');
$('#arrows').innerHTML = FN.map((_, i) => { const a = -90 + i * 72 + 36, r = a * Math.PI / 180; return `<path id="ar${i}" d="M-7 -9 L5 0 L-7 9" fill="none" stroke="#D9CFBC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(${(CX + RR * Math.cos(r)).toFixed(1)} ${(CY + RR * Math.sin(r)).toFixed(1)}) rotate(${a + 90})"/>`; }).join('');
const PANES = [['THE BIG IDEA', '5 Functions', 'What every manager does', 'store', 'Fayol called them the elements of management']]
  .concat(FN.map((f, i) => [`STEP 0${i + 1} / 05`, f[2], f[3], f[1], f[4]]));
$('#pans').innerHTML = PANES.map(([s, t, m, ic, e], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div><div class="pe"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><span>${e}</span></div></div>`).join('');
// fourteen principles: 5 x 3 grid, the 15th cell is the navy "14" tile
const P14 = [['Division', 'of work'], ['Authority and', 'responsibility'], ['Discipline'], ['Unity of', 'command'], ['Unity of', 'direction'],
  ['General interest', 'comes first'], ['Remuneration', '(fair pay)'], ['Centralization'], ['Scalar chain'], ['Order'],
  ['Equity'], ['Stability', 'of tenure'], ['Initiative'], ['Esprit', 'de corps']];
const KEYS = [0, 3, 8, 13];
const tileX = c => 161 + c * 326, tileY = r => 264 + r * 208;
$('#tiles').innerHTML = P14.map((ls, i) => `<div class="tl" id="tl${i}" style="left:${tileX(i % 5)}px;top:${tileY(Math.floor(i / 5))}px"><div class="bg"></div><div class="tn">${String(i + 1).padStart(2, '0')}</div>${ls.map((l, k) => `<div class="tx" style="top:${(ls.length === 1 ? 86 : 68) + k * 38}px">${l}</div>`).join('')}</div>`).join('');
// four key principles: list rows
const KP = [['01', 'split', 'Division of work', 'One person, one job'], ['04', 'userCheck', 'Unity of command', 'Only one boss for each worker'],
  ['09', 'link', 'Scalar chain', 'One clear line, top to bottom'], ['14', 'heart', 'Esprit de corps', 'Team spirit, in French']];
$('#vRows').innerHTML = KP.map(([n, ic, t], i) => `<div class="vr" id="vr${i}" style="top:${92 + i * 120}px"><div class="bg"></div><div class="rn">${n}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const HELPI = (s, c) => M.icon('user', s, c, 2.4);
const VIS = [
  // division of work: one person, one job
  [['A', 'Makes tea', 'cup'], ['K', 'Handles money', 'coin'], ['M', 'Cleans cups', 'droplet']].map(([l, t, ic], i) => `<div class="dj" id="dj${i}" style="left:${i * 292}px"><div class="av">${l}</div><div class="di"></div><div class="dt">${t}</div></div>`).join(''),
  // unity of command: two bosses -> one boss
  `<svg class="abs" style="left:0;top:0" width="848" height="156" fill="none" stroke-linecap="round"><path id="uL0" d="M372 32 C480 32 500 66 592 74" stroke="#B8862F" stroke-width="4"/><path id="uL1" d="M372 124 C480 124 500 90 592 82" stroke="#B5482F" stroke-width="4"/><g id="uX" transform="translate(486 104)"><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#B5482F" stroke-width="5"/></g></svg>
   <div class="abs" id="uR0" style="left:0;top:0;width:360px;height:64px"><div class="avc" style="left:0;top:0;background:#B8862F">R</div><div class="pill" style="left:88px;top:8px">Make it sweeter</div></div>
   <div class="abs" id="uR1" style="left:0;top:92px;width:360px;height:64px"><div class="avc" id="uK" style="left:0;top:0">K</div><div class="pill" id="uKp" style="left:88px;top:8px">No sugar today</div></div>
   <div class="av" id="uA" style="left:604px;top:42px">A</div><div class="abs" id="uAn" style="left:696px;top:58px;font:600 26px Poppins;white-space:nowrap">Asha</div>
   <div class="abs" id="uOk" style="left:654px;top:34px;width:30px;height:30px;border-radius:15px;background:#B8862F;display:flex;align-items:center;justify-content:center">${M.icon('check', 18, '#fff', 3)}</div>`,
  null,
  // esprit de corps: the whole team on one line
  `<svg class="abs" style="left:0;top:0" width="848" height="80"><line id="eLine" x1="36" y1="36" x2="811" y2="36" stroke="#E2DACB" stroke-width="4" stroke-linecap="round"/></svg>` +
  ['A', 'K', 'M', '+', '+', '+'].map((l, i) => `<div class="av" id="eav${i}" style="left:${i * 155}px;top:0">${l === '+' ? HELPI(30, '#fff') : l}</div>`).join('') +
  `<div class="stp" id="eP0" style="left:0;top:100px;background:#B8862F;color:#fff"><span id="eP0I"></span>Praise for the whole team</div><div class="stp" id="eP1" style="top:100px;background:#14213D;color:#fff"><span id="eP1I"></span>One goal: Chai Corner</div>`,
];
// scalar chain chart (pane coordinates)
const CH = { R: [436, 286], A: [228, 384], K: [644, 384], S: [228, 482], H: [644, 482] };
const chartHTML = `<svg class="abs" style="left:0;top:0" width="944" height="580" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path id="cL" d="M472 358 V371 H264 V384 M472 371 H680 V384 M264 456 V482 M680 456 V482" stroke="#D9CFBC" stroke-width="4"/>
  <path id="cG" d="M472 358 V371 H264 V384 M264 456 V482" stroke="#B8862F" stroke-width="6"/>
  <path id="cRt" d="M264 518 V371 H472 V322 V371 H680 V518" stroke="#B5482F" stroke-width="6" stroke-dasharray="2 14"/>
  <path id="cGp" d="M300 518 H644" stroke="#B8862F" stroke-width="10"/></svg>
  <div class="av" id="chR" style="left:${CH.R[0]}px;top:${CH.R[1]}px;background:#B8862F">R</div><div class="chn" id="chRn" style="left:524px;top:306px">Ravi</div>
  <div class="av" id="chA" style="left:${CH.A[0]}px;top:${CH.A[1]}px">A</div><div class="chn" id="chAn" style="left:136px;top:404px">Asha</div>
  <div class="av" id="chK" style="left:${CH.K[0]}px;top:${CH.K[1]}px">K</div><div class="chn" id="chKn" style="left:732px;top:404px">Kabir</div>
  <div class="av" id="chS" style="left:${CH.S[0]}px;top:${CH.S[1]}px">${HELPI(30, '#fff')}</div><div class="chn" id="chSn" style="left:48px;top:502px">Stove helper</div>
  <div class="av" id="chH" style="left:${CH.H[0]}px;top:${CH.H[1]}px">${HELPI(30, '#fff')}</div><div class="chn" id="chHn" style="left:732px;top:502px">Cash helper</div>
  <div class="abs" id="chOk" style="left:488px;top:278px;width:30px;height:30px;border-radius:15px;background:#14213D;display:flex;align-items:center;justify-content:center">${M.icon('check', 18, '#fff', 3)}</div>
  <div id="gpL" style="top:480px">GANG PLANK</div>
  <div class="stp" id="cSlow" style="left:664px;top:294px;background:#F6E3DC;color:#B5482F">4 steps: slow</div>
  <div class="stp" id="cFast" style="left:664px;top:294px;background:#B8862F;color:#fff">1 step: fast</div>`;
$('#vPans').innerHTML = KP.map(([n, ic, t, m], i) => `<div class="pn" id="vn${i}"><div class="ps">PRINCIPLE ${n} OF 14</div><div class="serif pt">${t}</div><div class="pm">${m}</div>${i === 2 ? chartHTML : `<div class="hr"></div><div class="px">AT CHAI CORNER</div><div class="pv" id="pv${i}">${VIS[i]}</div>`}</div>`).join('');
$('#eP0I').innerHTML = M.icon('star', 24, '#fff', 2.2); $('#eP1I').innerHTML = M.icon('heart', 24, C.gold2, 2.2);
// quiz
const OPTS = ['Scalar chain', 'Equity', 'Gang plank', 'Initiative'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('plank', 44, C.gold2, 2.4);
// recap
const ROWS = [['clipboard', 'Five functions'], ['grid', '<span class="acc">14 principles</span> for running the whole company'], ['star', 'Key ones']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
const FPL = ['Plan', 'Organize', 'Command', 'Coordinate', 'Control'], KPL = ['Division of work', 'Unity of command', 'Scalar chain', 'Team spirit'];
$('#rw0').insertAdjacentHTML('beforeend', FPL.map((p, k) => `<div class="fp" id="fp${k}">${p}</div>`).join(''));
$('#rw2').insertAdjacentHTML('beforeend', KPL.map((p, k) => `<div class="fp" id="kp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const arcD = (deg) => { const a0 = -Math.PI / 2, a1 = a0 + deg * Math.PI / 180; const x0 = CX + RR * Math.cos(a0), y0 = CY + RR * Math.sin(a0), x1 = CX + RR * Math.cos(a1), y1 = CY + RR * Math.sin(a1); return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${RR} ${RR} 0 ${deg > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
const ringDeg = M.track(0, [[tF[1], 72], [tF[2], 144], [tF[3], 216], [tF[4], 288], [tFix, 359.9]], M.SOFT);
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const pop = (el, t, t0) => { if (t > t0 && t < t0 + 0.45) el.style.transform = `scale(${(1 + 0.05 * Math.sin(Math.PI * (t - t0) / 0.45)).toFixed(4)})`; else if (el.style.transform !== 'none') el.style.transform = 'none'; };
const gTr = (g, x, y, s) => g.setAttribute('transform', s >= 0.9995 ? `translate(${x} ${y})` : `translate(${x} ${y}) scale(${s.toFixed(4)})`);
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const fc = $('#fChip'); fc.style.left = (1760 - fc.offsetWidth) + 'px'; fc.style.top = '170px';
  for (const [r, pre] of [['#rw0', 'fp'], ['#rw2', 'kp']]) {
    const rt = $(r + ' .rt'); let x = 216 + rt.offsetWidth + 40;
    for (let k = 0; k < 5; k++) { const p = $('#' + pre + k); if (!p) break; p.style.left = x + 'px'; x += p.offsetWidth + 16; }
    if (x > 1600 - 24) console.warn('recap pills overflow', r, x);
  }
  const gp = $('#gpL'); gp.style.left = (472 - gp.offsetWidth / 2) + 'px';
  $('#eP1').style.left = ($('#eP0').offsetWidth + 24) + 'px';
  M.$$('.tl .tx').forEach(el => { if (el.offsetWidth > 294 - 56) console.warn('tile text too wide', el.textContent, el.offsetWidth); });
  M.$$('.fr .ft, .fr .fs').forEach(el => { if (el.offsetLeft + el.offsetWidth > 920 - 36) console.warn('fact row overflow', el.textContent); });
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
  M.vis($('#fChip'), t, tMorph + 0.7, tQ - 0.05, { dy: 10, outDur: 0.01 });

  /* ===== A: six people, no clear boss ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // orders card: two bosses, opposite orders
    M.vis($('#orders'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.vis($('#asha'), t, tMorph + 0.6, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis($('#ashaN'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ord0'), t, tOne - 0.25, 1e9, { dx: -24, dy: 0 }); M.draw($('#oL0'), t, tOne + 0.05, 0.5, M.o3);
    M.vis($('#ord1'), t, tKab - 0.1, 1e9, { dx: -24, dy: 0 }); M.draw($('#oL1'), t, tKab + 0.2, 0.5, M.o3);
    const clash = M.io((t - tOpp) / 0.35);
    $('#oP1').style.background = mix(C.paper, C.redBg, clash); $('#oP1').style.color = mix(C.ink, C.red, clash);
    M.vis($('#ashaQ'), t, tOpp + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    $('#asha').style.background = mix(C.ink, C.red, M.io((t - tArg) / 0.35));
    M.vis($('#aBad'), t, tArg - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // jobs card: one job doubled, one job empty
    M.vis($('#jobs'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const jOn = [tMorph + 1.0, tTwo, tNobody];
    HJ.forEach(([, ic, avs], i) => {
      const el = $('#job' + i); M.vis(el, t, tMorph + 0.6 + i * 0.08, 1e9, { dy: 24, sp: M.SOFT });
      const on = t >= jOn[i], bad = i > 0 ? M.io((t - jOn[i] - 0.2) / 0.3) : 0;
      el.querySelector('.jt').style.color = on ? C.ink : C.dim;
      setIco(el.querySelector('.ji'), ic, on ? (bad > 0.5 ? C.red : C.ink) : C.dim, 28);
      el.style.background = mix(C.paper, C.redBg, bad);
      avs.forEach((_, k) => { const av = $('#jav' + i + k); M.vis(av, t, jOn[i] + 0.1 + k * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); av.style.background = i ? mix(C.gold, C.red, bad) : C.gold; });
    });
    M.vis($('#jBad'), t, tCash - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: Henri Fayol ===== */
  const dOn = t >= tTu - 0.05 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fay'), t, tD1 + 0.1, tDout, { dx: -60, dy: 0, ...o });
    const pb = M.spring(t - tD1 - 0.3, M.POP); M.hide($('#pBg'), t < tD1 + 0.3); $('#pBg').setAttribute('r', (160 * pb).toFixed(2));
    M.vis($('#pBody'), t, tD1 + 0.45, 1e9, { dy: 40, fade: 0.12 });
    M.vis($('#pHead'), t, tD1 + 0.6, 1e9, { dy: 30, fade: 0.12 });
    const bk = M.spring(t - tFr[1] + 0.1, M.POP), bkE = $('#pBook'); M.hide(bkE, t < tFr[1] - 0.1); gTr(bkE, 452, 312, 0.4 + 0.6 * bk); bkE.style.opacity = M.clamp((t - tFr[1] + 0.1) / 0.1);
    M.vis($('#ftag'), t, tFrench - 0.05, 1e9, { dy: 10 });
    M.rise($('#fname'), t, tHenri - 0.05, { st: 0.07, sp: M.HEAVY });
    FR.forEach(([ic], i) => {
      const el = $('#fr' + i), ta = tFr[i];
      M.vis(el, t, tD1 + 0.3 + i * 0.1, tDout, { dx: 60, dy: 0, ...o });
      const on = M.io((t - ta) / 0.3);
      el.querySelector('.ft').style.color = mix(C.dim, C.ink, on);
      el.querySelector('.fs').style.color = mix(C.dim, C.ink2, on);
      el.querySelector('.lbl').style.color = mix(C.dim, C.gold, on);
      el.querySelector('.fi').style.background = mix(C.paper, C.ink, on);
      setIco(el.querySelector('.fi'), ic, on > 0.5 ? C.gold2 : C.dim, 44, 2);
      if (t < tDout) pop(el, t, ta);
    });
  }

  /* ===== M: definition, Taylor vs Fayol ===== */
  const mOn = t >= tM1 - 0.1 && t < tF0 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.rise($('#mq'), t, tM1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tM2 - 0.1, outDur: 0.3 });
    M.vis($('#mdl'), t, tM2 + 0.05, tM3 - 0.12, { dy: 12, outDur: 0.25 });
    M.rise($('#md1'), t, tM2 + 0.12, { st: 0.05, out: tM3 - 0.12, outDur: 0.3 });
    M.rise($('#md2'), t, tFrom - 0.05, { st: 0.05, out: tM3 - 0.1, outDur: 0.3 });
    M.rise($('#md3'), t, tFunc - 0.05, { st: 0.06, out: tM3 - 0.08, outDur: 0.3 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mbar'), t, tM3 + 0.12, tMout, { dy: 24, ...o });
    EE.forEach((e, i) => {
      const el = $('#ee' + i), ta = i ? tFay : tTay + 0.35, td = i ? 1e9 : tFay;
      M.vis(el, t, tM3 + 0.2 + i * 0.1, tMout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const em = el.querySelector('.em'); M.rise(em, t, ta + 0.1, { st: 0.04 }); em.style.color = mix(C.gold2, C.gold, off);
      el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), e[2], t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.4, 1e9, { dy: 10 }); ex.style.color = mix('#8C96AE', C.muted, off);
      const ev = el.querySelector('.ev'); M.rise(ev, t, ta + 0.5, { st: 0.04 }); ev.style.color = mix('#fff', C.ink, off);
      e[4].forEach((c, k) => {
        const ec = $('#ec' + i + k); M.vis(ec, t, ta + 0.8 + k * 0.12, 1e9, { dy: 12 });
        ec.style.background = mix(C.paper, C.navy2, act); ec.style.color = mix(C.ink, C.gold2, act);
        setIco(ec.querySelector('.eci'), c[0], act > 0.5 ? C.gold2 : C.gold, 24, 2.2);
      });
      if (t < tMout) pop(el, t, ta);
    });
    // position chips once (after layout)
    if (!geo.ec) { geo.ec = 1; EE.forEach((e, i) => { let x = 44; e[4].forEach((_, k) => { const ec = $('#ec' + i + k); ec.style.left = x + 'px'; x += ec.offsetWidth + 16; }); }); }
  }

  /* ===== F: the five functions ===== */
  const fOn = t >= tF0 - 0.1 && t < tP0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    const ringOut = M.io((t - tFout) / 0.3);
    $('#cyc').style.opacity = (1 - ringOut).toFixed(3);
    M.draw($('#ringC'), t, tF0 + 0.1, 1.0, M.io);
    for (let i = 0; i < 5; i++) M.vis($('#ar' + i), t, tF0 + 0.6 + i * 0.1, 1e9, { dy: 0, fade: 0.15 });
    const deg = ringDeg(t); M.hide($('#ringG'), t < tF[1] || deg < 0.5); if (deg >= 0.5) $('#ringG').setAttribute('d', arcD(deg));
    M.vis($('#hub'), t, tF0 + 0.2, tFout, { dy: 0, sc: 0.7, sp: M.POP, ...fo });
    FN.forEach((f, i) => {
      const el = $('#nd' + i), ta = tF[i], td = i < 4 ? tF[i + 1] : tFout + 1;
      M.vis(el, t, tF0 + 0.3 + i * 0.1, tFout, { dy: 0, sc: 0.6, sp: M.POP, ...fo });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.gold, act); bg.style.borderColor = mix(t >= ta ? C.gold : C.line, C.gold, act);
      setIco(el.querySelector('.ni'), f[1], act > 0.5 ? '#fff' : (t >= ta ? C.gold : C.dim), 44, 2);
      el.querySelector('.nl').style.color = act > 0.5 ? '#fff' : (t >= ta ? C.ink : C.muted);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tF0 + 2 && t < tFout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.08 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#panel'), t, tF0 + 0.35, tFout, { dx: 60, dy: 0, ...fo });
    PANES.forEach((_, k) => {
      const tin = k ? tF[k - 1] : tF0 + 0.5, tout = k < 5 ? (k ? tF[k] : tF[0]) - 0.14 : 1e9;
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

  /* ===== P: fourteen principles, filled in fast ===== */
  const pOn = t >= tP0 - 0.1 && t < tK[0] + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#t14'), t, tP0 + 0.1, tPout, { dy: 0, sc: 0.8, sp: M.POP, ...o });
    M.rise($('#t14s'), t, tSimple - 0.1, { st: 0.05 });
    const key = M.io((t - tFour + 0.05) / 0.35);
    P14.forEach((_, i) => {
      const el = $('#tl' + i), isK = KEYS.includes(i);
      M.vis(el, t, t14 + i * 0.09, tPout, { dy: 24, sc: 0.92, sp: M.POP, ...o });
      const wv = M.io((t - tAll - i * 0.05) / 0.2) * (1 - M.io((t - tAll - i * 0.05 - 0.25) / 0.3));
      const bg = el.querySelector('.bg');
      if (isK) { bg.style.background = mix(mix(C.card, C.gold2, wv), C.ink, key); bg.style.borderColor = mix(mix(C.line, C.gold2, wv), C.ink, key); }
      else { bg.style.background = mix(C.card, C.gold2, wv); bg.style.borderColor = mix(C.line, C.gold2, wv); }
      el.querySelector('.tn').style.color = isK ? mix(C.gold, '#E9B95C', key) : mix(C.gold, C.dim, key);
      el.querySelectorAll('.tx').forEach(x => { x.style.color = isK ? mix(C.ink, '#fff', key) : mix(C.ink, C.dim, key); });
      if (isK && t < tPout) pop(el, t, tFour + 0.05 + KEYS.indexOf(i) * 0.08);
    });
  }

  /* ===== K: four key principles ===== */
  const kOn = t >= tK[0] - 0.1 && t < tQ + 0.05; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#vl'), t, tK[0] + 0.1, 1e9, { dx: -60, dy: 0 });
    M.vis($('#vp'), t, tK[0] + 0.25, 1e9, { dx: 60, dy: 0 });
    KP.forEach(([, ic], i) => {
      const el = $('#vr' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : 1e9;
      M.vis(el, t, tK[0] + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k] : tK[0] + 0.35, tout = k < 3 ? tK[k + 1] - 0.14 : 1e9;
      const pn = $('#vn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      if (k !== 2) {
        M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
        M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
        M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      }
      if (k === 0) {
        [['cup'], ['coin'], ['droplet']].forEach(([ic], i) => {
          const el = $('#dj' + i); M.vis(el, t, Math.max(tin + 0.6, tJobIn) + i * 0.08, 1e9, { dy: 14 });
          const on = M.io((t - tNm[i] + 0.05) / 0.3);
          const av = el.querySelector('.av'); av.style.background = mix(C.paper2, i ? C.ink : C.ink, on); av.style.color = mix(C.dim, '#fff', on);
          el.querySelector('.dt').style.color = mix(C.dim, C.ink, on);
          setIco(el.querySelector('.di'), ic, on > 0.5 ? C.gold : C.dim, 26);
          pop(el, t, tNm[i]);
        });
      } else if (k === 1) {
        M.vis($('#uR0'), t, tin + 0.65, 1e9, { dx: -20, dy: 0 }); M.vis($('#uR1'), t, tin + 0.75, 1e9, { dx: -20, dy: 0 });
        M.vis($('#uA'), t, tin + 0.7, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis($('#uAn'), t, tin + 0.8, 1e9, { dy: 10 });
        M.draw($('#uL0'), t, tin + 0.9, 0.5, M.o3); M.draw($('#uL1'), t, tin + 1.0, 0.5, M.o3);
        const cut = M.io((t - tOnly) / 0.35);
        $('#uK').style.background = mix(C.ink, C.paper2, cut); $('#uK').style.color = mix('#fff', C.dim, cut);
        $('#uKp').style.color = mix(C.ink, C.dim, cut);
        $('#uL1').style.opacity = (1 - 0.75 * cut).toFixed(3);
        const xs = M.spring(t - tOnly - 0.15, M.POP), ux = $('#uX'); M.hide(ux, t < tOnly + 0.15); gTr(ux, 486, 104, 0.3 + 0.7 * xs);
        $('#uL0').style.strokeWidth = (4 + 3 * M.io((t - tOnlyR) / 0.3)).toFixed(2);
        M.vis($('#uOk'), t, tOnlyR + 0.15, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
        $('#uA').style.background = mix(C.ink, C.gold, M.io((t - tOnlyR - 0.15) / 0.3));
      } else if (k === 2) {
        const nodes = ['R', 'A', 'K', 'S', 'H'];
        nodes.forEach((n, i) => { M.vis($('#ch' + n), t, tin + 0.5 + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis($('#ch' + n + 'n'), t, tin + 0.6 + i * 0.08, 1e9, { dy: 10 }); });
        M.draw($('#cL'), t, tLine - 0.3, 0.7, M.o3);
        const cGo = M.io((t - tGang) / 0.4);
        M.draw($('#cG'), t, tTop - 0.1, 0.8, M.io); $('#cG').style.opacity = (1 - M.io((t - tSlow + 0.3) / 0.3)).toFixed(3);
        M.draw($('#cRt'), t, tSlow - 0.1, 1.1, M.io); $('#cRt').style.opacity = (1 - 0.8 * cGo).toFixed(3);
        // the long route lights each person in turn
        ['S', 'A', 'R', 'K', 'H'].forEach((n, i) => {
          const a = tSlow + i * 0.22, hot = M.io((t - a) / 0.15) * (1 - M.io((t - a - 0.3) / 0.3));
          $('#ch' + n).style.boxShadow = hot > 0.01 ? `0 0 0 ${(6 * hot).toFixed(2)}px ${M.rgba(C.red, 0.35)}` : 'none';
        });
        M.vis($('#cSlow'), t, tSlow + 0.6, tGang + 0.1, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.25, osc: 0.8, ody: 0 });
        M.vis($('#chOk'), t, tOk - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
        M.draw($('#cGp'), t, tGang - 0.05, 0.5, M.o3);
        M.vis($('#gpL'), t, tGang + 0.3, 1e9, { dy: 10 });
        M.vis($('#cFast'), t, tGang + 0.35, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        ['S', 'H'].forEach(n => { $('#ch' + n).style.background = mix(C.ink, C.gold, cGo); });
      } else if (k === 3) {
        M.draw($('#eLine'), t, tin + 0.7, 0.8, M.o3);
        $('#eLine').style.stroke = mix(C.line, C.gold, M.io((t - tSpirit) / 0.5));
        for (let i = 0; i < 6; i++) {
          const el = $('#eav' + i); M.vis(el, t, tin + 0.6 + i * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
          el.style.background = mix(C.ink, C.gold, M.io((t - tSpirit - i * 0.07) / 0.3));
        }
        M.vis($('#eP0'), t, tPraise, 1e9, { dy: 14 });
        M.vis($('#eP1'), t, tChai - 0.05, 1e9, { dy: 14 });
      }
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12, tWh = wt('Q1', 'What');
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, tWh - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tWh + 0.2 + i * 0.08, 1e9, { dy: 40 });
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
    const pills = (pre, ts, end) => ts.forEach((tp, k) => {
      const el = $('#' + pre + k); M.vis(el, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const a = tp - 0.05, b = k < ts.length - 1 ? ts[k + 1] - 0.05 : end;
      const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
      el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
      el.style.color = g > 0.5 ? '#fff' : C.ink;
    });
    pills('fp', tPill, T1('S2') + 0.1); pills('kp', tKey, tN - 0.4);
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
