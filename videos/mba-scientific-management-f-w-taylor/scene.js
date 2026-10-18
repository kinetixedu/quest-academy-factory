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

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tEvery = wt('H2', 'every'), tDiff = wt('H2', 'different'), tWay = wt('H2', 'way');
const tTwo = wt('C1', 'two'), tFive = wt('C1', 'five'), tC2 = T0('C2'), tOne = wt('C2', 'one');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;          // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tD2 = T0('D2'), tFred = wt('D2', 'Frederick'), tAmer = wt('D2', 'American'), tFather = wt('D3', 'father');
const tD4 = T0('D4'), t1911 = wt('D4', '1911'), tPrin = wt('D4', 'Principles'), tD5 = T0('D5'), tFind = wt('D5', 'find'), tDout = T0('B1') - 0.32;
const tB1 = T0('B1'), tCoal = wt('B2', 'coal'), tOre = wt('B2', 'ore'), tOwn = wt('B2', 'own'), tTest = wt('B3', 'tested'), tTwenty = wt('B3', 'twenty');
const tMat = wt('B4', 'material'), tSized = wt('B4', 'sized'), tCarry = wt('B4', 'carry'), tFifty = wt('B5', 'fifty'), tSixteen = wt('B5', 'sixteen'), tBout = T0('M1') - 0.32;
const tM1 = T0('M1'), tTimes = wt('M2', 'times'), tTMS = wt('M2', 'time', 1), tMilk = wt('M3', 'milk'), tSugar = wt('M3', 'sugar'), tNo = wt('M3', 'No');
const tNow = wt('M4', 'now'), tThree = wt('M4', 'three'), tMout = T0('P0') - 0.32;
const tP0 = T0('P0'), tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
const tRule = wt('P1', 'Rule', 1), tDiscord = wt('P2', 'discord'), tTrust = wt('P2', 'trust');
const tNm = [wt('P3', 'Everyone'), wt('P3', 'works'), wt('P3', 'together') - 0.2, wt('P3', 'together')], tTog = wt('P3', 'together');
const tDev = wt('P4', 'develop'), tReach = wt('P4', 'reaches'), tBest = wt('P4', 'best');
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKe = [wt('K1', 'same'), wt('K2', 'Pick'), wt('K3', 'Hit'), wt('K4', 'Eight')], tKout = T0('X1') - 0.32;
const tX1 = T0('X1'), tUp = wt('X1', 'up'), tCrit = wt('X1', 'critics'), tMach = wt('X1', 'machines'), tX2 = T0('X2'), tDull = wt('X2', 'dull'), tTiring = wt('X2', 'tiring'), tX3 = T0('X3');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'measuring')], ['time', 'standard', 'piece'].map(w => wt('S3', w)), [wt('S4', 'Care')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning + cups
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// six cups, six times
const CT = ['2:00', '3:30', '4:10', '5:00', '2:40', '3:20'];
$('#cupRow').innerHTML = CT.map((c, i) => `<div class="cupt" id="ct${i}" style="left:${36 + i * 144}px"><div class="cn">CUP ${i + 1}</div><div class="ci"></div><div class="ct">${c}</div></div>`).join('');
const METH = ['Milk first', 'Tea first', 'Boil twice'];
$('#meth').innerHTML = METH.map((m, i) => `<div class="stp" id="mt${i}" style="top:76px">${M.icon('help', 26, C.muted, 2.2)}<span>${m}</span></div>`).join('');
// Taylor + book (cards that start large and shrink when a sibling arrives)
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
// stopwatch ticks
let tk = ''; for (let k = 0; k < 12; k++) { const a = k * 30 * Math.PI / 180; tk += `<line x1="${(140 + 78 * Math.sin(a)).toFixed(1)}" y1="${(170 - 78 * Math.cos(a)).toFixed(1)}" x2="${(140 + 70 * Math.sin(a)).toFixed(1)}" y2="${(170 - 70 * Math.cos(a)).toFixed(1)}" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round"/>`; }
$('#swTicks').innerHTML = tk;
$('#savedI').innerHTML = M.icon('timer', 24, '#fff', 2.2);
// steps of one cup (seconds), two of them are wasted moves
const STEPS = [['droplet', 'Boil water and tea', 80, 0], ['milk', 'Walk to fetch the milk', 70, 1], ['search', 'Search for the sugar', 50, 1], ['flame', 'Add milk and simmer', 70, 0], ['cup', 'Strain and serve', 30, 0]];
const mmss = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
$('#sRows').innerHTML = STEPS.map(([ic, tx, s], i) => `<div class="sr" id="sr${i}" style="top:${90 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${tx}</div><div class="sx"></div><div class="st">${mmss(s)}</div></div>`).join('');
const tStep = STEPS.map((_, i) => tTimes + i * 0.5);
// four principles: list + panes
const PR = [['bulb', 'Science'], ['smile', 'Harmony'], ['users', 'Cooperation'], ['trendUp', 'Development']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const PV = [
  `<div class="stp bad" id="g0" style="top:0;background:#F6E3DC;color:#B5482F">${M.icon('x', 26, C.red, 2.4)}Guess</div>
   <svg id="gA" class="abs" width="60" height="30" style="top:17px"><path d="M4 15 H48 M38 5 L50 15 L38 25" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
   <div class="stp" id="g1" style="top:0;background:#14213D;color:#fff">${M.icon('timer', 26, C.gold2, 2.2)}Measure</div>
   <div class="abs" id="g2" style="left:0;top:104px;font:600 30px Poppins;white-space:nowrap">Rule of thumb = <span class="acc">guesswork</span></div>`,
  `<svg class="abs" style="left:0;top:0" width="848" height="80" fill="none" stroke-linecap="round" stroke-linejoin="round"><path id="hz" d="M80 36 l40 -18 l40 36 l40 -36 l40 36 l40 -36 l40 36 l40 -36 l40 36 l40 -18" stroke="#B5482F" stroke-width="4"/><path id="hs" d="M80 36 H512" stroke="#B8862F" stroke-width="6"/></svg>
   <div class="av" id="hav0" style="left:0;top:0;background:#B8862F">R</div><div class="avn" id="han0" style="left:-44px;top:92px">Manager</div>
   <div class="av" id="hav1" style="left:520px;top:0">A</div><div class="avn" id="han1" style="left:476px;top:92px">Worker</div>
   <div class="stp" id="htr" style="top:4px;background:#B8862F;color:#fff">${M.icon('smile', 26, '#fff', 2.2)}Trust</div>`,
  `<svg class="abs" style="left:0;top:0" width="848" height="80"><line id="cline" x1="36" y1="36" x2="624" y2="36" stroke="#B8862F" stroke-width="5" stroke-linecap="round"/></svg>` +
   [['R', 'Ravi'], ['A', 'Asha'], ['K', 'Kabir'], ['M', 'Meena']].map(([l, n], i) => `<div class="av" id="cav${i}" style="left:${i * 196}px;top:0">${l}</div><div class="avn" id="can${i}" style="left:${i * 196 - 44}px;top:92px">${n}</div>`).join(''),
  [['Learn', 40], ['Practise', 80], ['Best', 120]].map(([n, h], i) => `<div class="stair" id="sti${i}" style="left:${i * 170}px;top:${176 - h}px;height:${h}px"><span>${n}</span></div>`).join('') +
   `<div class="av" id="dav" style="left:39px;top:56px;background:#B8862F">A</div>`,
];
const PP = [['THE FOUNDATION', '4 Principles', 'The base of scientific management', 'IN SHORT', null]].concat([
  ['PRINCIPLE 01 / 04', 'Science', 'not rule of thumb'], ['PRINCIPLE 02 / 04', 'Harmony', 'not discord'],
  ['PRINCIPLE 03 / 04', 'Cooperation', 'not individualism'], ['PRINCIPLE 04 / 04', 'Development', 'of every worker, to their best']].map((p, i) => [...p, 'AT CHAI CORNER', PV[i]]));
$('#pPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('book', 34, C.gold, 2.2)}</i><span>Rules any manager can use</span></div>`}</div>`).join('');
// more tools: 2 x 2
const TL = [['copy', 'Standardisation', 'Same tools, same method', 'One pot, one cup size, one recipe'],
  ['cap', 'Selection and training', 'The right person, trained well', 'Asha trains every new helper'],
  ['coin', 'Differential piece rate', 'Hit the target, earn a higher rate', 'More cups made, more pay per cup'],
  ['network', 'Functional foremanship', '8 expert bosses, not 1', null]];
$('#tGrid').innerHTML = TL.map(([ic, t, s, e], i) => `<div class="tc" id="tc${i}" style="left:${160 + (i % 2) * 816}px;top:${280 + Math.floor(i / 2) * 302}px"><div class="bg"></div><div class="ti"><span class="ico"></span></div><div class="serif tt">${t}</div><div class="ts">${s}</div><div class="th"></div><div class="tx2">${i === 3 ? 'THE 8 FOREMEN' : 'AT CHAI CORNER'}</div>${e ? `<div class="te">${e}</div>` : Array.from({ length: 8 }, (_, k) => `<div class="fm" id="fm${k}" style="left:${36 + k * 54}px"></div>`).join('') + `<div class="te" id="fmT" style="left:484px">4 plan, 4 supervise</div>`}</div>`).join('');
// criticism
const EE = [['trendUp', 'Output up', 'Faster work, lower cost', 'AT BETHLEHEM STEEL', '16 to 59 tons a day', ['Faster', 'Cheaper']],
  ['gear', 'Like machines', 'The big criticism', 'FOR THE WORKERS', 'One small task, all day', ['Dull', 'Tiring']]];
$('#eRow').innerHTML = EE.map(([ic, t, m, x, v, ps], i) => `<div class="ee" id="ee${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">${x}</div><div class="ev">${v}</div>${ps.map((p, k) => `<div class="stp" id="ep${i}${k}" style="top:380px">${p}</div>`).join('')}</div>`).join('');
// quiz
const OPTS = ['Time study', 'Standardisation', 'Piece rate', 'Foremanship'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('copy', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Find the one best way', ['By measuring']], ['timer', 'Taylor\'s tools', ['Time study', 'Standard methods', 'Piece rates']], ['users', 'People, not machines', ['Care for them']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const blScale = [M.track(1, [[tMat - 0.05, MAT[0][3]]], M.SOFT), M.track(1, [[tMat + 0.25, MAT[1][3]]], M.SOFT)];
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // hook: method pills in a row
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  // definition
  const fa = $('#father'); fa.style.left = (308 - fa.offsetWidth / 2) + 'px';
  x = 36; const i0 = $('#id0'); i0.style.left = x + 'px'; x += i0.offsetWidth + 16; $('#idA').style.left = x + 'px'; x += 76; $('#id1').style.left = x + 'px';
  // shovel test
  const be = $('#best'); be.style.left = (392 - be.offsetWidth / 2) + 'px';
  for (let i = 0; i < 2; i++) { const l = $('#ld' + i); l.style.left = (48 + i * 352 + 168 - l.offsetWidth / 2) + 'px'; }
  const sv = $('#saved'); sv.style.left = (308 - sv.offsetWidth / 2) + 'px';
  // principle 1: guess -> measure
  x = 0; const g0 = $('#g0'); g0.style.left = '0px'; x = g0.offsetWidth + 16; $('#gA').style.left = x + 'px'; x += 76; $('#g1').style.left = x + 'px';
  const tr = $('#htr'); tr.style.left = (296 - tr.offsetWidth / 2) + 'px';
  // tool titles auto-fit
  TL.forEach((_, i) => { const tt = $('#tc' + i + ' .tt'); if (tt.offsetWidth > 612) tt.style.fontSize = Math.floor(44 * 612 / tt.offsetWidth) + 'px'; });
  // criticism pills
  EE.forEach(([, , , , , ps], i) => { let x = 44; ps.forEach((_, k) => { const p = $('#ep' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
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
  const exOn = t < tTu ? [tDiff + 0.3, tT - 0.3] : [tM1 + 0.4, tMout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: six people, six ways ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
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
    // Taylor: full width alone, shrinks to its column when the book arrives
    const tay = $('#tay'), sh = M.spring(t - tD4 + 0.1, M.HEAVY), tw = M.lerp(1600, 616, sh);
    M.vis(tay, t, tD2 + 0.05, tDout, { dy: 36, ...o });
    snap(tay, (sh >= 1 ? 616 : tw.toFixed(1)) + 'px', 'width');
    snap($('#tayIn'), (sh >= 1 ? 0 : ((tw - 616) / 2).toFixed(1)) + 'px', 'left');
    M.vis($('#port'), t, tD2 + 0.25, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tFred, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, tAmer - 0.05, 1e9, { dy: 10 });
    M.vis($('#father'), t, tFather - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // the book: full height alone, shrinks when the big idea arrives
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

  /* ===== B: the shovel test ===== */
  const bOn = t >= tB1 - 0.1 && t < tM1 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#shv'), t, tB1 + 0.1, tBout, { dy: 36, ...o });
    M.vis($('#ton'), t, tB1 + 0.22, tBout, { dy: 36, ...o });
    MAT.forEach((mt, i) => {
      const g = $('#bl' + i), s = blScale[i](t);
      g.setAttribute('transform', Math.abs(s - 1) < 1e-4 ? 'translate(0 0)' : `translate(168 116) scale(${s.toFixed(4)}) translate(-168 -116)`);
      const pile = $('#pile' + i), tp = i ? tOre : tCoal, p = M.spring(t - tp, M.POP);
      M.hide(pile, t < tp); pile.setAttribute('transform', p >= 1 ? 'translate(0 0)' : `translate(0 ${(-30 * (1 - p)).toFixed(2)})`); pile.style.opacity = M.clamp((t - tp) / 0.1);
      M.vis($('#mat' + i), t, tB1 + 0.5 + i * 0.1, 1e9, { dy: 10 });
      const ld = $('#ld' + i); M.vis(ld, t, tOwn + i * 0.15, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const ok = M.io((t - tCarry - i * 0.12) / 0.25);
      ld.style.background = mix(C.redBg, C.gold, ok); ld.style.color = mix(C.red, '#fff', ok);
      M.setT($('#ldT' + i), ok > 0.5 ? '21 lb' : mt[2]);
      if (ok > 0 && ok < 1) ld.style.left = (48 + i * 352 + 168 - ld.offsetWidth / 2) + 'px';
      else if (ok >= 1 && !ld._c) { ld._c = 1; ld.style.left = (48 + i * 352 + 168 - ld.offsetWidth / 2) + 'px'; }
    });
    M.vis($('#best'), t, tTwenty - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // tons bars (Taylor's own figures)
    const W59 = 470, W16 = Math.round(470 * 16 / 59);
    [[0, tB1 + 0.7, 16, W16], [1, tFifty - 0.1, 59, W59]].forEach(([k, ta, v, w]) => {
      const el = $('#br' + k), bt = el.querySelector('.bt'), bv = el.querySelector('.bv');
      M.vis(el, t, tB1 + 0.5 + k * 0.12, 1e9, { dy: 16 });
      const u = M.o5((t - ta) / 0.9), ww = w * u;
      bt.style.width = ww.toFixed(1) + 'px'; bt.style.background = k ? C.gold : '#E7E0D2';
      bv.style.left = (ww + 20).toFixed(1) + 'px'; M.setT(bv, `${Math.round(v * u)} tons`);
      bv.style.opacity = M.clamp(ww / 40).toFixed(3); bv.style.color = k ? C.ink : C.muted;
    });
    M.vis($('#tonBig'), t, tSixteen + 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#tonHr'), t, tB1 + 0.9, 1e9, { dy: 0 }); M.vis($('#tonSrc'), t, tB1 + 1.0, 1e9, { dy: 8 });
  }

  /* ===== M: time and motion study ===== */
  const mOn = t >= tM1 - 0.1 && t < tP0 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#watch'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#steps'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    M.vis($('#watchL'), t, tM1 + 0.4, 1e9, { dy: 10 }); $('#watchL').style.color = mix(C.muted, C.gold, M.io((t - tTMS) / 0.3));
    let tot = 0;
    STEPS.forEach(([ic, , s, waste], i) => {
      const el = $('#sr' + i), ta = tStep[i], td = i < 4 ? tStep[i + 1] : tStep[4] + 0.5;
      M.vis(el, t, tM1 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const pr = M.io((t - ta) / 0.45); tot += s * pr;
      const on = M.io((t - ta) / 0.2), off = M.io((t - td) / 0.25), act = on * (1 - off);
      const wr = waste ? M.io((t - (i === 1 ? tMilk : tSugar)) / 0.3) : 0, cut = waste ? M.io((t - tNo) / 0.3) : 0;
      el.querySelector('.bg').style.background = mix(mix(C.paper, C.ink, act), C.redBg, wr);
      const txc = t < ta ? C.dim : mix(mix('#fff', C.ink, off), C.red, wr);
      el.querySelector('.rt').style.color = txc; el.querySelector('.rn').style.color = t < ta ? C.dim : mix(mix(C.gold2, C.gold, off), C.red, wr);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : (wr > 0.5 ? C.red : C.gold)), 28, 2.2);
      const st = el.querySelector('.st'); M.vis(st, t, ta + 0.1, 1e9, { dy: 8 }); st.style.color = mix(mix('#fff', C.ink, off), C.red, wr);
      M.setT(st, cut > 0.5 ? 'cut' : mmss(s));
      const sxl = el.querySelector('.sx'); sxl.style.width = (waste ? (el.querySelector('.rt').offsetWidth + 12) * M.o3((t - tNo) / 0.4) : 0).toFixed(1) + 'px';
    });
    const save = M.io((t - tNow) / 0.7); tot -= 120 * save;
    M.vis($('#swv'), t, tM1 + 0.3, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.drawU($('#swArc'), M.clamp(tot / 300)); M.hide($('#swArc'), tot < 0.5);
    $('#swHand').setAttribute('transform', `rotate(${((tot % 60) * 6).toFixed(2)} 140 170)`);
    M.vis($('#rd'), t, tM1 + 0.45, 1e9, { dy: 12 }); M.setT($('#rd'), mmss(Math.round(tot)));
    $('#rd').style.color = mix(C.ink, C.gold, save);
    M.vis($('#saved'), t, tThree - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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
          av.style.background = mix(C.ink, C.gold, M.io((t - tTog - i * 0.08) / 0.25));
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

  /* ===== K: more tools (2 x 2) ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    TL.forEach(([ic], i) => {
      const el = $('#tc' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.15 + i * 0.09, tKout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.tt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.ts').style.color = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.th').style.background = mix(C.line, C.navy3, act);
      el.querySelector('.ti').style.background = mix(C.paper, C.navy2, act);
      const tE = tK0 + 0.45 + i * 0.09, lb = el.querySelector('.tx2'); M.vis(lb, t, tE, 1e9, { dy: 8 }); lb.style.color = t < ta ? C.dim : mix(C.muted, '#8C96AE', act);
      setIco(el.querySelector('.ico'), ic, t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 34, 2.2);
      if (i < 3) { const te = el.querySelector('.te'); M.rise(te, t, tE + 0.05, { st: 0.04 }); te.style.color = t < ta ? C.dim : mix('#fff', C.ink, off); }
      else {
        for (let k = 0; k < 8; k++) { const f = $('#fm' + k); M.vis(f, t, tE + 0.05 + k * 0.03, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); f.style.background = mix(C.paper2, k < 4 ? C.gold2 : C.gold, M.io((t - tKe[3] - k * 0.08) / 0.2)); }
        const fT = $('#fmT'); M.rise(fT, t, tE + 0.1, { st: 0.04 }); fT.style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      }
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tK0 + 1 && t < tKout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.015 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== X: the criticism ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const sh = M.spring(t - tX3 + 0.15, M.HEAVY);
    EE.forEach(([ic, , , , , ps], i) => {
      const el = $('#ee' + i), ta = i ? tCrit : tX1, td = i ? tX3 : tCrit;
      M.vis(el, t, tX1 + 0.12 + i * 0.12, 1e9, { dy: 36 });
      snap(el, (sh >= 1 ? 392 : M.lerp(570, 392, sh).toFixed(1)) + 'px', 'height');
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const em = el.querySelector('.em'); M.rise(em, t, ta + 0.1, { st: 0.04 }); em.style.color = mix(C.gold2, i ? C.red : C.gold, off);
      el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), ic, t < ta ? C.dim : (t < td ? C.gold2 : (i ? C.red : C.gold)), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.45, 1e9, { dy: 10 }); ex.style.color = mix('#8C96AE', C.muted, off);
      const ev = el.querySelector('.ev'); M.rise(ev, t, i ? tX2 : ta + 0.55, { st: 0.04 }); ev.style.color = mix('#fff', C.ink, off);
      ps.forEach((_, k) => {
        const p = $('#ep' + i + k), tp = i ? (k ? tTiring : tDull) : tUp + 0.3 + k * 0.25;
        M.vis(p, t, tp - 0.05, tX3 - 0.2, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
        p.style.background = i ? mix(C.redBg, C.navy2, act) : mix(C.paper, C.navy2, act);
        p.style.color = i ? mix(C.red, C.gold2, act) : mix(C.ink, C.gold2, act);
      });
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tX1 + 1.5) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.015 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#both'), t, tX3 + 0.05, 1e9, { dy: 40 });
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
