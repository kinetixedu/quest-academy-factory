// MBA - Principles of Management, Ep 15: Planning and Goal Setting
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  bookOpen: ['M12 7v14', 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'],
  sparkle: ['M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tSecond = wt('H1', 'second'), tMonth = wt('H1', 'month'), tNo = wt('H2', 'no'), tSell = wt('H2', 'sell');
const tBad = [wt('C1', 'milk'), wt('C2', 'Nobody'), wt('C3', 'night')], tMore = wt('C3', 'more');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tAdv = wt('D2', 'advance'), tQw = [wt('D2', 'what'), wt('D2', 'how'), wt('D2', 'when'), wt('D2', 'who')];
const tD3 = T0('D3'), tAns = [wt('D3', 'Serve'), wt('D3', 'recipe'), wt('D3', 'seven'), wt('D3', 'Meena')], tDout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5, 6, 7].map(i => T0('F' + i)), tFout = T0('K0') - 0.32;
const tAch = wt('F1', 'achieve'), tPrem = [wt('F2', 'forecasts'), wt('F2', 'guesses'), wt('F2', 'walk')], tAlt = [wt('F3', 'college'), wt('F3', 'bus'), wt('F3', 'market')];
const tEv = [wt('F4', 'rent'), wt('F4', 'crowd'), wt('F4', 'stalls')], tBus = wt('F5', 'bus'), tWins = wt('F5', 'wins');
const tSup = [wt('F6', 'hiring'), wt('F6', 'ordering')], tOpen = wt('F7', 'Open'), tWeek = wt('F7', 'week'), tWork = wt('F7', 'working');
const tK0 = T0('K0'), tK = [T0('K1'), T0('K2'), T0('K3')], tKout = T0('G0') - 0.32;
const tG0 = T0('G0'), tVague = wt('G0', 'vague'), tG1 = T0('G1'), tDoran = wt('G1', 'George'), tMagz = wt('G1', 'Management'), tSmart = wt('G1', 'SMART');
const tG2 = T0('G2'), tLet = wt('G2', 'letters'), tL = [wt('G2', 'Specific'), T0('G3'), T0('G4'), T0('G5'), wt('G6', 'time')], tG7 = T0('G7'), tBecomes = wt('G7', 'becomes');
const tSeg = [0, wt('G3', 'Five'), wt('G2', 'Cups'), wt('G3', 'day'), wt('G2', 'outlet'), wt('G6', 'March')];
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAnsQ = T0('A1') - 0.02, tTakeQ = wt('A1', 'There');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['what', 'how', 'when', 'who'].map(w => wt('S2', w)), ['objectives', 'premises', 'alternatives', 'choice', 'follow'].map(w => wt('S3', w)), ['specific', 'measurable', 'achievable', 'relevant', 'time'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#wDI').innerHTML = M.icon('calendar', 22, C.ink, 2.2); $('#wNI').innerHTML = M.icon('x', 22, C.red, 2.6); $('#wQ').innerHTML = M.icon('help', 36, C.red, 2.2);
const BAD = [['droplet', 'Milk gone', 'by 10 am'], ['help', 'Who opens', 'the shop?'], ['chart', 'Sold more?', 'No idea']];
$('#jobRow').innerHTML = BAD.map(([ic, a, b], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 26, C.red, 2.2)}</div><div class="jt" style="top:90px">${a}</div><div class="jt" style="top:124px">${b}</div></div>`).join('');
// definition: what, how, when, who
$('#defI').innerHTML = M.icon('clipboard', 36, C.gold, 2.2);
const QW = [['cup', 'What?', 'to do', 'Serve chai'], ['bookOpen', 'How?', 'to do it', 'Same recipe'], ['clock', 'When?', 'to do it', 'From 7 am'], ['user', 'Who?', 'will do it', 'Meena runs it']];
$('#qRow').innerHTML = QW.map(([ic, q, s, a], i) => `<div class="qw" id="qw${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="qi"></div><div class="serif qt">${q}</div><div class="qs">${s}</div><div class="hr"></div><div class="qx">AT OUTLET 2</div><div class="qa">${a}</div>${i === 3 ? '<div class="qav">M</div>' : ''}</div>`).join('');
// staircase (svg 624 x 580): 7 columns rising to a flag
const SX = i => 38 + i * 78, SH = i => (i + 1) * 48, BASE = 548, STOP = i => BASE - SH(i);
$('#coverI').innerHTML = M.icon('flag', 30, C.gold2, 2.2);
$('#stG').innerHTML = `<line x1="24" y1="${BASE}" x2="600" y2="${BASE}" stroke="#E2DACB" stroke-width="4" stroke-linecap="round"/>` +
  Array.from({ length: 7 }, (_, i) => `<g id="sc${i}"><rect x="${SX(i) + 3}" y="${STOP(i)}" width="72" height="${SH(i)}" rx="10" fill="#EEE8DB"/><text x="${SX(i) + 39}" y="${STOP(i) + 32}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" letter-spacing=".04em" fill="#B9B1A3">0${i + 1}</text></g>`).join('') +
  `<line id="pole" x1="${SX(6) + 39}" y1="${STOP(6)}" x2="${SX(6) + 39}" y2="112" stroke="#3A4560" stroke-width="4" stroke-linecap="round"/>` +
  `<g id="flagG"><path d="M${SX(6) + 41} 0 h-0 l-112 0 l18 20 l-18 20 h112 z" fill="#B8862F"/><text x="${SX(6) - 20}" y="26" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="15" letter-spacing=".14em" fill="#fff">OPEN</text></g>` +
  `<g id="rv"><circle r="26" fill="#B8862F"/><text y="9" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="24" fill="#fff">R</text></g>`;
// step panels
const tile3 = (pre, rows, body) => rows.map((r, i) => `<div class="tl3" id="${pre}${i}" style="left:${i * 292}px"><div class="bg"></div>${body(r, i)}</div>`).join('');
const LOCS = ['College', 'Bus stand', 'Market'], SCORE = [6, 9, 5];
const VIS = [
  `<div class="ob" id="ob1"><i>${M.icon('target', 40, C.gold, 2.2)}</i><div class="ol">THE OBJECTIVE</div><div class="ot2">A busy second outlet that pays its way</div></div>`,
  tile3('pr', [['users', 'CROWD', '2,000 a day'], ['coin', 'MILK PRICE', 'Steady'], ['clock', 'BUSY HOURS', '7 to 10 am']], ([ic, k, v]) => `<i>${M.icon(ic, 26, C.gold, 2.2)}</i><div class="tk">${k}</div><div class="tv">${v}</div>`),
  tile3('al', LOCS, (n, i) => `<i>${M.icon('pin', 26, C.gold, 2.2)}</i><div class="tn">${n}</div><div class="tv" style="color:#8A8274;font-size:24px;top:100px">Option ${'ABC'[i]}</div>`),
  tile3('ev', LOCS, (n) => `<i>${M.icon('pin', 26, C.gold, 2.2)}</i><div class="tn">${n}</div><div class="sb"></div><div class="sf"></div><div class="serif sv"></div>`),
  tile3('ch', LOCS, (n, i) => `<i>${M.icon('pin', 26, C.gold, 2.2)}</i><div class="tn">${n}</div><div class="serif sv" style="top:92px">${SCORE[i]}/10</div>${i === 1 ? `<div class="ck">${M.icon('check', 24, '#fff', 3)}</div>` : ''}`),
  ['Hire 2 helpers', 'Order milk', 'Buy a stove'].map((s, k) => `<div class="stp" id="sp${k}"><span class="spi"></span>${s}</div>`).join('') +
    `<div class="stp" id="spS" style="top:92px;background:#14213D;color:#fff"><span id="spSI"></span>Small plans that support the big one</div>`,
  `<div class="stp" id="opn" style="background:#B8862F;color:#fff"><span id="opnI"></span>Open the shop</div>` +
    [1, 2, 3, 4].map(k => `<div class="wk" id="wk${k - 1}" style="left:${(k - 1) * 218}px"><b></b>Week ${k}</div>`).join(''),
];
const STEPS = [['Set objectives', 'Decide what to achieve'], ['Develop premises', 'Forecasts about the future'], ['Find alternatives', 'List the possible ways'], ['Evaluate', 'Compare every option'],
  ['Choose the best', 'Pick the winner'], ['Supporting plans', 'Smaller plans that help'], ['Implement', 'Do it, then follow up']];
const FP = [['THE PLANNING PROCESS', 'Seven steps', 'From a wish to a working plan', null]].concat(STEPS.map(([a, b], i) => [`STEP 0${i + 1} / 07`, a, b, VIS[i]]));
$('#fPans').innerHTML = FP.map(([s, t, m, v], i) => `<div class="pn" id="fn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('flag', 34, C.gold, 2.2)}</i><span>Plan outlet 2, one step at a time</span></div>`}</div>`).join('');
$('#spSI').innerHTML = M.icon('trendUp', 26, C.gold2, 2.2); $('#opnI').innerHTML = M.icon('check', 26, '#fff', 2.6);
// three sizes of plan
const KS = [['map', 'Strategic', 'Top managers', 'Years', 1, 'Five outlets', 'in five years'], ['calendar', 'Tactical', 'Middle managers', 'One year', 0.5, 'Open outlet two', 'this year'],
  ['clipboard', 'Operational', 'Front-line managers', 'Days', 0.14, "Tomorrow's", 'shift chart']];
$('#kRow').innerHTML = KS.map(([ic, t, s, h, f, e1, e2], i) => `<div class="ak" id="ak${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="ui"><span class="ico"></span></div><div class="serif ut">${t}</div><div class="us">${s}</div>` +
  `<div class="hr" style="top:176px"></div><div class="lbl" style="top:210px">PLANS AHEAD</div><div class="hb"><div class="hf"></div><div class="hv">${h}</div></div>` +
  `<div class="hr" style="top:352px"></div><div class="lbl" style="top:386px">AT CHAI CORNER</div><div class="serif ex" style="top:424px">${e1}</div><div class="serif ex" style="top:474px">${e2}</div></div>`).join('');
// SMART goal
const SEG = [['Sell', -1], ['500', 1], ['cups', 0], ['a day', 1], ['at the new outlet', 0], ['by March', 4]];
$('#gNew').innerHTML = SEG.map(([s], i) => `${i ? `<div class="ph" id="ph${i}"></div>` : ''}<div class="serif sg" id="sg${i}">${s}</div>`).join('');
$('#goal').insertAdjacentHTML('beforeend', ['How much?', 'Where?', 'By when?'].map((s, k) => `<div class="pill" id="vq${k}" style="top:420px;background:#F6E3DC;color:#B5482F"><span>${M.icon('help', 22, C.red, 2.4)}</span>${s}</div>`).join(''));
$('#srcPI').innerHTML = M.icon('check', 24, '#fff', 2.6);
const LT = [['S', 'Specific', 'Chai, at', 'outlet 2'], ['M', 'Measurable', '500 cups', 'a day'], ['A', 'Achievable', 'Busy bus', 'stand'], ['R', 'Relevant', 'Pays for', 'outlet 2'], ['T', 'Time-bound', 'By', 'March']];
$('#lRow').innerHTML = LT.map(([l, w, a, b], i) => `<div class="lt5" id="lt${i}" style="left:${(160 + i * 326.5).toFixed(1)}px"><div class="bg"></div><div class="serif L">${l}</div><div class="W">${w}</div><div class="hr"></div><div class="c1">${a}</div><div class="c2">${b}</div><div class="ok">${M.icon('check', 26, '#fff', 3)}</div></div>`).join('');
// quiz
const OPTS = ['Specific', 'Measurable', 'Relevant', 'Time-bound'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('calendar', 44, C.gold2, 2.4);
// recap
const ROWS = [['clipboard', 'Planning', ['What', 'How', 'When', 'Who']], ['flag', 'Seven steps', ['Objectives', 'Premises', 'Alternatives', 'Choice', 'Follow up']], ['target', 'SMART goals', ['Specific', 'Measurable', 'Achievable', 'Relevant', 'Time-bound']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.3) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.35));
const rvTrack = M.track(0, tF.slice(1).map((tt, i) => [tt + 0.1, i + 1]), [11, 0.9]);
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  $('#wQ').style.left = (36 + $('#wT').offsetWidth + 28) + 'px';
  document.querySelectorAll('#fPans .pt').forEach(p => { if (p.offsetWidth > 848) p.style.fontSize = Math.floor(84 * 848 / p.offsetWidth) + 'px'; });
  // supporting-plan pills in a row
  let x = 0; for (let k = 0; k < 3; k++) { const s = $('#sp' + k); s.style.left = x + 'px'; x += s.offsetWidth + 24; }
  // SMART sentence: segments + placeholders laid out left to right
  x = 0; SEG.forEach((_, i) => { const s = $('#sg' + i); s.style.left = x + 'px'; if (i) { const p = $('#ph' + i); p.style.left = x + 'px'; p.style.width = s.offsetWidth + 'px'; } x += s.offsetWidth + 18; });
  let vx = 40; for (let k = 0; k < 3; k++) { const v = $('#vq' + k); v.style.left = vx + 'px'; vx += v.offsetWidth + 16; }
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let px = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = px + 'px'; px += p.offsetWidth + 16; }); });
}
const swap = (pn, t, tin, tout) => {   // standard panel pane in/out
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
  const exOn = t < tF[3] ? [tF[1] + 0.6, tF[2] - 0.14] : [tF[3] + 0.6, tF[5] - 0.14];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: a wish, not a plan ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    const sg = $('#sign'); M.vis(sg, t, tMorph + 0.7, 1e9, { dy: 10 });
    M.setT(sg, 'CHAI CORNER · OUTLET 2'); sg.style.color = C.gold;
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // the plan card: just a wish
    M.vis($('#wish'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.vis($('#wDay'), t, tMorph + 0.55, 1e9, { dy: 16 });
    M.vis($('#wNo'), t, tNo - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#wT'), t, tSell - 0.05, { st: 0.08, sp: M.HEAVY });
    $('#wT').style.color = mix(C.ink, C.red, M.io((t - tMore) / 0.4));
    M.vis($('#wQ'), t, tMore + 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    // what goes wrong on day one
    M.vis($('#wrong'), t, tBad[0] - 0.4, 1e9, { dy: 36 });
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

  /* ===== D: what is planning? ===== */
  const dOn = t >= tTu - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.15, tDout, { dy: 24, ...o });
    QW.forEach(([ic], i) => {
      const el = $('#qw' + i), ta = tQw[i], td = i < 3 ? tQw[i + 1] : tD3 - 0.1;
      M.vis(el, t, tD2 + 0.3 + i * 0.08, tDout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.qt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.qs').style.color = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.qi').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.qi'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 40, 2.2);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      M.vis(el.querySelector('.qx'), t, tAns[i] - 0.1, 1e9, { dy: 10 });
      const qa = el.querySelector('.qa'); M.rise(qa, t, tAns[i], { st: 0.05 });
      const fl = on01(t, tAns[i], tAns[i] + 0.9); qa.style.color = mix(C.ink, C.gold, fl);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tD2 + 1 && t < tDout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#qw3 .qav'), t, tAns[3] + 0.15, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
  }

  /* ===== F: the seven steps ===== */
  const fOn = t >= tF0 - 0.1 && t < tK0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#stairs'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...fo });
    M.vis($('#fp'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...fo });
    for (let i = 0; i < 7; i++) {
      const g = $('#sc' + i), tin = tF0 + 0.35 + i * 0.07, p = M.spring(t - tin, M.SOFT);
      M.hide(g, p <= 0); g.setAttribute('transform', p >= 1 ? '' : `translate(0 ${((1 - p) * 30).toFixed(2)})`); g.style.opacity = M.clamp((t - tin) / 0.15).toFixed(3);
      const ta = tF[i], td = i < 6 ? tF[i + 1] : tWork, act = M.io((t - ta) / 0.3), done = M.io((t - td) / 0.35);
      g.querySelector('rect').setAttribute('fill', mix(mix(C.paper2, C.ink, act), C.gold, done));
      g.querySelector('text').setAttribute('fill', t < ta ? C.dim : (done > 0.5 ? '#fff' : C.gold2));
    }
    M.vis($('#pole'), t, tF0 + 0.9, 1e9, { dy: 0, fade: 0.2 });
    const fr = M.spring(t - tWork, M.SOFT), fy = M.lerp(STOP(6) - 44, 112, fr);
    $('#flagG').setAttribute('transform', `translate(0 ${fy.toFixed(2)})`); M.hide($('#flagG'), t < tF0 + 0.9);
    $('#flagG').style.opacity = M.clamp((t - tF0 - 0.9) / 0.2).toFixed(3);
    // Ravi climbs one step per line
    const rv = $('#rv'), k = rvTrack(t), kf = Math.floor(k), u = k - kf;
    const xa = SX(kf) + 39, ya = STOP(kf) - 30, xb = SX(Math.min(6, kf + 1)) + 39, yb = STOP(Math.min(6, kf + 1)) - 30;
    const hop = u > 0.001 && u < 0.999 ? Math.sin(Math.PI * u) * 22 : 0;
    const rp = M.spring(t - tF[0] - 0.1, M.POP);
    M.hide(rv, rp <= 0);
    rv.setAttribute('transform', `translate(${M.lerp(xa, xb, u).toFixed(2)} ${(M.lerp(ya, yb, u) - hop).toFixed(2)}) scale(${rp >= 1 ? 1 : (0.3 + 0.7 * rp).toFixed(4)})`);
    FP.forEach((_, k2) => {
      const tin = k2 ? tF[k2 - 1] : tF0 + 0.5, tout = k2 < 7 ? (k2 ? tF[k2] : tF[0]) - 0.14 : 1e9;
      const pn = $('#fn' + k2); if (!swap(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k2 === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k2 === 1) {
        const ob = $('#ob1'); M.vis(ob, t, tin + 0.6, 1e9, { dy: 14 });
        M.rise(ob.querySelector('.ot2'), t, tAch - 0.1, { st: 0.04 });
      } else if (k2 === 2) {
        for (let i = 0; i < 3; i++) {
          const el = $('#pr' + i); M.vis(el, t, tPrem[i] - 0.05, 1e9, { dy: 14 });
        }
      } else if (k2 === 3) {
        for (let i = 0; i < 3; i++) M.vis($('#al' + i), t, tAlt[i] - 0.08, 1e9, { dy: 14, sc: 0.94, sp: M.POP });
      } else if (k2 === 4) {
        for (let i = 0; i < 3; i++) {
          const el = $('#ev' + i); M.vis(el, t, tin + 0.65 + i * 0.08, 1e9, { dy: 14 });
          let sc = 0; for (let j = 0; j < 3; j++) sc += (SCORE[i] / 3) * M.o3((t - tEv[j] - i * 0.06) / 0.5);
          el.querySelector('.sf').style.width = (150 * sc / 10).toFixed(1) + 'px';
          const sv = el.querySelector('.sv'); M.setT(sv, `${Math.round(sc)}/10`); sv.style.opacity = M.clamp((t - tEv[0]) / 0.2).toFixed(3);
        }
      } else if (k2 === 5) {
        for (let i = 0; i < 3; i++) {
          const el = $('#ch' + i); M.vis(el, t, tin + 0.65 + i * 0.08, 1e9, { dy: 14 });
          const win = i === 1 ? M.io((t - tBus) / 0.3) : 0, dimC = i !== 1 ? M.io((t - tWins) / 0.3) : 0;
          el.querySelector('.bg').style.background = mix(mix(C.paper, C.ink, win), '#F0EBE1', dimC);
          el.querySelector('.tn').style.color = mix(mix(C.ink, '#fff', win), C.dim, dimC);
          el.querySelector('.sv').style.color = mix(mix(C.ink, C.gold2, win), C.dim, dimC);
          el.querySelector('i').style.background = mix('#fff', C.navy2, win);
          setIco(el.querySelector('i'), 'pin', win > 0.5 ? C.gold2 : (dimC > 0.5 ? C.dim : C.gold), 26, 2.2);
          if (i === 1) M.vis(el.querySelector('.ck'), t, tWins, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
        }
      } else if (k2 === 6) {
        const ts = [tSup[0] - 0.05, tSup[1] - 0.05, tSup[1] + 0.5];
        for (let s = 0; s < 3; s++) { const el = $('#sp' + s); M.vis(el, t, ts[s], 1e9, { dy: 12 }); setIco(el.querySelector('.spi'), ['users', 'droplet', 'zap'][s], C.gold, 26, 2.2); }
        M.vis($('#spS'), t, tin + 0.7, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k2 === 7) {
        M.vis($('#opn'), t, tOpen - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        for (let s = 0; s < 4; s++) {
          const el = $('#wk' + s), tw = tWeek - 0.1 + s * 0.22; M.vis(el, t, tin + 0.7 + s * 0.06, 1e9, { dy: 12 });
          const g = M.io((t - tw) / 0.25), b = el.querySelector('b'); b.style.background = mix('#E4DCCD', C.gold, g);
          if (g > 0.5 && !b._c) { b._c = 1; b.innerHTML = M.icon('check', 20, '#fff', 3); } else if (g <= 0.5 && b._c) { b._c = 0; b.innerHTML = ''; }
        }
      }
    });
  }

  /* ===== K: three sizes of plan ===== */
  const kOn = t >= tK0 - 0.1 && t < tG0 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const ko = { outDur: 0.3, ody: -16 };
    KS.forEach(([ic, , , , f], i) => {
      const el = $('#ak' + i), ta = tK[i], td = i < 2 ? tK[i + 1] : 1e9;
      M.vis(el, t, tK0 + 0.2 + i * 0.12, tKout, { dy: 36, ...ko });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.ut').style.color = !seen ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.us').style.color = !seen ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.ui').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), ic, !seen ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 44, 2);
      el.querySelectorAll('.hr').forEach(h => h.style.background = mix(C.line, C.navy3, act));
      el.querySelectorAll('.lbl').forEach(l => l.style.color = mix(C.muted, '#8C96AE', act));
      el.querySelector('.hb').style.background = mix(C.paper, C.navy2, act);
      const fw = 432 * f * M.o3((t - ta - 0.25) / 0.7); el.querySelector('.hf').style.width = fw.toFixed(1) + 'px';
      const hv = el.querySelector('.hv'); hv.style.left = (Math.max(fw, 0) + 18).toFixed(1) + 'px'; if (f === 1) hv.style.left = '20px';
      hv.style.color = f === 1 ? (seen && fw > 120 ? '#fff' : (seen ? C.ink : C.dim)) : (!seen ? C.dim : mix('#fff', C.ink, off));
      el.querySelectorAll('.ex').forEach((e, j) => { M.rise(e, t, ta + 0.5 + j * 0.15, { st: 0.05 }); e.style.color = mix('#fff', C.ink, off); });
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tK0 + 1.2 && t < tKout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== G: SMART goals ===== */
  const gOn = t >= tG0 - 0.1 && t < tQ + 0.05; M.hide($('#sG'), !gOn);
  if (gOn) {
    const go = $('#goal'); M.vis(go, t, tG0 + 0.05, 1e9, { dy: 36 });
    const sh = M.spring(t - tG1 + 0.1, M.HEAVY);                       // tall card shrinks when the source card arrives
    go.style.height = M.lerp(580, 200, sh).toFixed(2) + 'px';
    const fin = M.io((t - tBecomes) / 0.4);
    $('#goalBg').style.background = mix(C.card, C.ink, fin);
    $('#gl').style.color = mix(C.muted, C.gold2, fin);
    const gOld = $('#gOld'); M.rise(gOld, t, tG0 + 0.25, { st: 0.07, sp: M.HEAVY, out: tLet - 0.1, outDur: 0.25 });
    gOld.style.transform = sh >= 1 ? 'none' : `translate(0px,${(M.lerp(100, 0, sh)).toFixed(2)}px) scale(${M.lerp(1.6, 1, sh).toFixed(4)})`;
    gOld.style.transformOrigin = '0 0';
    gOld.style.color = mix(C.ink, C.red, M.io((t - tVague) / 0.4));
    for (let k = 0; k < 3; k++) M.vis($('#vq' + k), t, tVague + 0.2 + k * 0.14, tG1 - 0.25, { dy: 14, outDur: 0.2 });
    const tag = $('#gTag'), vg = M.io((t - tVague) / 0.3);
    M.vis(tag, t, tVague - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const smartT = t >= tBecomes + 0.2;
    M.setT($('#gTt'), smartT ? 'SMART goal' : 'Too vague'); setIco($('#gTI'), smartT ? 'check' : 'x', smartT ? '#fff' : C.red, 22, 2.6);
    tag.style.background = smartT ? C.gold : C.redBg; tag.style.color = smartT ? '#fff' : C.red; tag.style.right = '40px';
    if (smartT && t < tBecomes + 0.6) tag.style.transform = `scale(${(1 + 0.08 * Math.sin(Math.PI * (t - tBecomes - 0.2) / 0.4)).toFixed(4)})`;
    // the new goal, built piece by piece
    M.vis($('#gNew'), t, tLet - 0.05, 1e9, { dy: 16 });
    SEG.forEach(([, li], i) => {
      const s = $('#sg' + i);
      if (!i) { M.hide(s, false); s.style.color = mix(C.ink, '#fff', fin); return; }
      const tr = tSeg[i]; M.vis(s, t, tr, 1e9, { dy: 22, sp: M.SOFT });
      s.style.color = mix(C.gold, C.gold2, fin);
      const ph = $('#ph' + i); M.vis(ph, t, tLet, tr + 0.05, { dy: 0, outDur: 0.2, ody: 0 }); ph.style.background = mix(C.paper2, C.navy3, fin);
    });
    // where SMART comes from
    const src = $('#src'), so = { outDur: 0.3, ody: -16 };
    M.vis(src, t, tG1 + 0.1, tLet - 0.15, { dy: 36, ...so });
    M.vis($('#mag'), t, tMagz - 0.1, 1e9, { dy: 20, sc: 0.92, sp: M.POP });
    M.vis($('#srcL'), t, tG1 + 0.3, 1e9, { dy: 10 });
    M.rise($('#srcN'), t, tDoran - 0.05, { st: 0.07, sp: M.HEAVY });
    M.rise($('#srcM'), t, tMagz, { st: 0.04 });
    M.vis($('#srcP'), t, tSmart - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // five letters
    LT.forEach((_, i) => {
      const el = $('#lt' + i), ta = tL[i], td = i < 4 ? tL[i + 1] : tG7;
      M.vis(el, t, tLet + 0.1 + i * 0.08, 1e9, { dy: 36 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.L').style.color = !seen ? C.dim : C.gold;
      el.querySelector('.W').style.color = !seen ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      ['.c1', '.c2'].forEach((c, j) => { const e = el.querySelector(c); M.rise(e, t, ta + 0.35 + j * 0.12, { st: 0.05 }); e.style.color = mix('#fff', C.ink, off); });
      M.vis(el.querySelector('.ok'), t, td, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tLet + 1 && t < tQ) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
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
      const right = i === RIGHT, r = M.io((t - tAnsQ) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.card, C.ink, r) : mix(C.card, '#F0EBE1', r);
      bg.style.borderColor = right ? mix(C.line, C.ink, r) : mix(C.line, '#EAE3D6', r);
      el.querySelector('.ot').style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.paper, C.gold, r) : C.paper; lt.style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAnsQ + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAnsQ && t < tAnsQ + 0.45) el.style.transform = `scale(${(1 + 0.05 * Math.sin(Math.PI * (t - tAnsQ) / 0.45)).toFixed(4)})`;
      else if (right && t >= tAnsQ + 0.45 && el.style.transform !== 'none') el.style.transform = 'none';
    });
    const cd = tAnsQ - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAnsQ, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAnsQ, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAnsQ + 0.3);
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
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAnsQ - tCount) / 3, 'tick', 0.28));
M.sfx(tAnsQ + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
