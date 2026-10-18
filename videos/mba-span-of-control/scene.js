// MBA - Principles of Management, Ep 27: Span of Control
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'],
  userPlus: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M19 8v6', 'M22 11h-6'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  phone: ['M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z', 'M12 18h.01'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  sliders: ['M21 4h-7', 'M10 4H3', 'M21 12h-9', 'M8 12H3', 'M21 20h-5', 'M12 20H3', 'M14 2v4', 'M8 10v4', 'M16 18v4'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tAll = wt('H2', 'thirty'), tStraight = wt('H2', 'straight');
const tJob = [wt('C1', 'helper'), wt('C2', 'cash'), wt('C3', 'Ravi')], tBadge = [wt('C1', 'two'), wt('C2', 'week'), wt('C3', 'late')], tBehind = wt('C3', 'behind');
const tT = T0('T1'), tSt2 = wt('T1', 'His'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tAka = wt('D2', 'or'), tOne = wt('D2', 'one'), tSup = wt('D2', 'supervise'), tChart = wt('D2', 'how') - 0.1;
const tD4 = T0('D4'), tThirty = wt('D4', 'thirty'), tTwoLv = wt('D4', 'two');
const tO0 = T0('O0'), tMgr = wt('O0', 'manager'), tMeena = wt('O0', 'Meena');
const tFlat1 = wt('O1', 'guides') - 0.05, tFive1 = wt('O1', 'five'), tFive2 = wt('O1', 'five', 1), tO2 = T0('O2'), tClose = wt('O2', 'boss');
const tTall = wt('W1', 'narrow') - 0.05, tTwo = wt('W1', 'two'), tFifteen = wt('W2', 'fifteen'), tFiveLv = wt('W2', 'five'), tGrows = wt('W2', 'grows');
const tFlat2 = wt('W3', 'Wide') - 0.05, tFiveW = wt('W3', 'five'), tSix = wt('W4', 'six'), tThree = wt('W4', 'three'), tFlatW = wt('W4', 'flat');
const tCout = T0('P1') - 0.32;
const tP1 = T0('P1'), tP2 = T0('P2'), tPr = [[wt('P1', 'close'), wt('P1', 'slowly'), wt('P1', 'cost')], [wt('P2', 'freedom'), wt('P2', 'fast'), wt('P2', 'skilled')]], tPout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tFout = T0('R1') - 0.32;
const tFr = [[wt('F1', 'Routine'), wt('F1', 'Complex')], [wt('F2', 'Skilled'), wt('F2', 'Skilled') + 0.7], [T0('F3') + 1.2, wt('F3', 'New')], [wt('F4', 'phone'), wt('F4', 'many')], [T0('F5') + 1.4, wt('F5', 'faraway')]];
const tR1 = T0('R1'), tWs = [wt('R1', 'routine'), wt('R1', 'trained'), wt('R1', 'flat')], tR2 = T0('R2'), tHour = wt('R2', 'one'), tDays = wt('R2', 'two'), tFiveR = wt('R2', 'five'), tThirtyR = wt('R2', 'thirty');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Fewer');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[], [wt('S3', 'narrow'), wt('S3', 'wide')], ['work', 'people', 'supervision', 'technology', 'distance'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// thirty people, 3 rows x 10
const PERSON = `<svg width="32" height="38" viewBox="0 0 40 48" fill="currentColor"><circle cx="20" cy="11" r="10"/><path d="M2 47c0-11 8-19 18-19s18 8 18 19z"/></svg>`;
$('#ppl').innerHTML = Array.from({ length: 30 }, (_, i) => `<div class="pp" id="pp${i}" style="left:${(i % 10) * 58}px;top:${Math.floor(i / 10) * 42}px">${PERSON}</div>`).join('');
$('#hrsI').innerHTML = M.icon('timer', 24, C.ink, 2.2);
const JOBS = [['New helper', 'userPlus', '2 days'], ['Cash mistake', 'coin', '1 week'], ['Ravi', 'moon', 'Late nights']];
$('#jobRow').innerHTML = JOBS.map(([t, ic, b], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="jt">${t}</div><div class="jb">${b}</div></div>`).join('');
// definition
$('#defI').innerHTML = M.icon('eye', 36, C.gold, 2.2);
$('#spanI').innerHTML = M.icon('users', 24, C.gold2, 2.2);
// tiles
const TL = [['SPAN', [30, 5, 2, 5]], ['LEVELS', [2, 3, 5, 3]], ['MANAGERS', [1, 6, 15, 6]], ['MESSAGE STEPS', [1, 2, 4, 2]]];
$('#tiles').innerHTML = TL.map(([l], i) => `<div class="tl" id="tl${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lbl">${l}</div><div class="serif tv"></div></div>`).join('');
// the chart: 30 people, three shapes. rows (card coords): y centres
const ROWY = [60, 150, 240, 330, 420];
$('#bands').innerHTML = ROWY.map((y, r) => `<div class="band" id="bd${r}" style="top:${y - 32}px"></div>`).join('');
// flat layout: 5 managers (ids 0..4), 25 staff (ids 5..29) in groups of 5
const FLAT = [], GX = m => 40 + m * 313;
for (let m = 0; m < 5; m++) FLAT[m] = { x: GX(m) + 134, y: 240, p: -1, mgr: true };
for (let m = 0; m < 5; m++) for (let k = 0; k < 5; k++) FLAT[5 + m * 5 + k] = { x: GX(m) + 22 + 56 * k, y: 420, p: m, mgr: false };
// rank by x (manager first on ties) -> fan order
const rank = [...Array(30).keys()].sort((a, b) => FLAT[a].x - FLAT[b].x || (FLAT[b].mgr - FLAT[a].mgr));
const FAN = []; rank.forEach((id, r) => { FAN[id] = { x: 62 + r * 1476 / 29, y: 420, p: -1, mgr: false }; });
// tall layout: binary tree, span 2, levels of 2/4/8/16
const TN = [];
for (let i = 0; i < 16; i++) TN.push({ x: 110 + 92 * i, y: 420, lv: 4, i });
for (let i = 0; i < 8; i++) TN.push({ x: 156 + 184 * i, y: 330, lv: 3, i });
for (let i = 0; i < 4; i++) TN.push({ x: 248 + 368 * i, y: 240, lv: 2, i });
for (let i = 0; i < 2; i++) TN.push({ x: 432 + 736 * i, y: 150, lv: 1, i });
const tnSorted = TN.slice().sort((a, b) => a.x - b.x || a.lv - b.lv);
const TALL = []; rank.forEach((id, r) => { TALL[id] = tnSorted[r]; });
// Meena (id 0) keeps a manager seat in the tall chart too
if (TALL[0].lv === 4) { const sw = rank.find(id => TALL[id].lv < 4 && Math.abs(TALL[id].x - TALL[0].x) < 160); const tmp = TALL[0]; TALL[0] = TALL[sw]; TALL[sw] = tmp; }
const findTall = (lv, i) => TALL.findIndex(n => n.lv === lv && n.i === i);
const TALLP = TALL.map(n => ({ x: n.x, y: n.y, mgr: n.lv < 4, p: n.lv === 1 ? -1 : findTall(n.lv - 1, Math.floor(n.i / 2)) }));
const LAY = [FAN, FLAT, TALLP, FLAT];
const LBANDS = [[0, 4], [0, 2, 4], [0, 1, 2, 3, 4], [0, 2, 4]];
const LS = [tChart, tFlat1, tTall, tFlat2];
$('#tks').innerHTML = Array.from({ length: 30 }, (_, j) => `<div class="tk" id="tk${j}"></div>`).join('');
// connectors per layout (elbows)
const elbow = (px, py, pr, cx, cy) => { const y0 = py + pr, y1 = cy - 22, my = (y0 + y1) / 2; return `M${px.toFixed(1)} ${y0} V${my.toFixed(1)} H${cx.toFixed(1)} V${y1}`; };
const linesFor = L => L.map(n => n.p < 0 ? elbow(800, 60, 32, n.x, n.y) : elbow(L[n.p].x, L[n.p].y, 22, n.x, n.y));
// unique paths only (shared trunks would double-draw); draw each as its own path
[FAN, FLAT, TALLP].forEach((L, g) => { $('#gl' + g).innerHTML = linesFor(L).map((d, j) => `<path id="ln${g}_${j}" d="${d}"/>`).join(''); });
// tall vs flat cards
const mini = (tall) => {
  const s = [], nodes = [];
  if (tall) { const xs = [[100], [60, 140], [40, 80, 120, 160], [30, 50, 70, 90, 110, 130, 150, 170]]; xs.forEach((r, lv) => r.forEach((x, i) => { nodes.push([x, 12 + lv * 32]); if (lv) { const px = xs[lv - 1][Math.floor(i / 2)]; s.push(`M${px} ${12 + (lv - 1) * 32 + 6} V${lv * 32 - 2} H${x} V${12 + lv * 32 - 6}`); } })); }
  else { nodes.push([100, 12]); const g = [24, 62, 100, 138, 176]; g.forEach(x => { nodes.push([x, 56]); s.push(`M100 18 V34 H${x} V50`); [-12, 0, 12].forEach(d => { nodes.push([x + d, 104]); s.push(`M${x} 62 V80 H${x + d} V98`); }); }); }
  return `<svg class="mini" viewBox="0 0 200 120"><g fill="none" stroke="#D9CFBC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${s.map(d => `<path d="${d}"/>`).join('')}</g>${nodes.map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${k ? 6 : 8}" fill="${k ? '#14213D' : '#B8862F'}"/>`).join('')}</svg>`;
};
const PC = [['NARROW SPAN', 'Tall structure', true, [['plus', 'Close supervision', 1], ['minus', 'Slow messages', 0], ['minus', 'More managers, more cost', 0]]],
  ['WIDE SPAN', 'Flat structure', false, [['plus', 'More freedom', 1], ['plus', 'Fast messages', 1], ['minus', 'Needs skilled staff', 0]]]];
$('#pRow').innerHTML = PC.map(([s, t, tall, rows], i) => `<div class="ee" id="ee${i}" style="left:${160 + i * 816}px"><div class="bg"></div>${mini(tall)}<div class="es">${s}</div><div class="serif et">${t}</div><div class="hr"></div>${rows.map(([ic, tx, good], k) => `<div class="prow" id="pw${i}${k}" style="top:${238 + k * 108}px"><div class="pb"></div><div class="pi" style="background:${good ? '#B8862F' : '#F6E3DC'}">${M.icon(ic, 28, good ? '#fff' : C.red, 2.6)}</div><div class="pt2">${tx}</div></div>`).join('')}</div>`).join('');
// five factors
const FR = [['repeat', 'Nature of work'], ['award', 'Skill of people'], ['eye', 'Supervision'], ['phone', 'Technology'], ['map', 'Distance']];
$('#fRows').innerHTML = FR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${90 + i * 96}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const FX = [[['Routine work', 'repeat', 1], ['Complex work', 'layers', 0]], [['Skilled team', 'award', 1], ['Beginners', 'userPlus', 0]], [['Old hands', 'users', 1], ['New staff', 'userPlus', 0]],
  [['Phone group', 'phone', 1], ['Hard to reach', 'alert', 0]], [['One street', 'pin', 1], ['Faraway places', 'map', 0]]];
const frow = (rows) => rows.map(([c, ic, wide], k) => `<div class="fr" id="FR${k}" style="top:${k * 96}px"><div class="stp cnd">${M.icon(ic, 26, C.gold, 2.2)}${c}</div><div class="ar">${M.icon('arrowR', 28, C.dim, 2.4)}</div><div class="res" style="background:${wide ? '#B8862F' : '#14213D'}">${wide ? 'Wide span' : 'Narrow span'}</div></div>`).join('');
const PP = [['THE BIG QUESTION', '5 Factors', 'What sets the right span', 'sliders', 'Wide or narrow? It depends.'],
  ['FACTOR 01 / 05', 'Nature of work', 'Routine, or complex?'], ['FACTOR 02 / 05', 'Skill of people', 'The manager and the staff'], ['FACTOR 03 / 05', 'Supervision', 'How much help is needed?'],
  ['FACTOR 04 / 05', 'Technology', 'Phones and group chats'], ['FACTOR 05 / 05', 'Distance', 'How far apart people work']];
$('#fPans').innerHTML = PP.map(([s, t, m, ic, e], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div>${i ? `<div class="pv" id="pv${i}">${frow(FX[i - 1]).replace(/id="FR(\d)"/g, `id="fr${i}_$1"`)}</div>` : `<div class="pe"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><span>${e}</span></div>`}</div>`).join('');
// results
$('#wsI').innerHTML = M.icon('check', 40, C.gold2, 2.6);
const RES = [['WAIT FOR AN ANSWER', '48x faster', [['Before', 560, '2 days'], ['After', 40, '1 hour']]], ['PEOPLE REPORTING TO RAVI', '6x fewer', [['Before', 560, '30'], ['After', 94, '5']]]];
$('#rRow').innerHTML = RES.map(([l, b, bars], i) => `<div class="card rc" id="rc${i}" style="left:${160 + i * 816}px"><div class="lbl">${l}</div><div class="serif big">${b}</div>${bars.map(([n], k) => `<div class="bar" id="br${i}${k}" style="top:${170 + k * 140}px"><div class="bl">${n}</div><div class="bt"></div><div class="serif bv"></div></div>`).join('')}</div>`).join('');
// quiz
const OPTS = ['Narrow span', 'Wide span', 'More levels', 'Tall chart'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('zap', 44, C.gold2, 2.4);
// recap
const ROWS = [['eye', 'Span of control = how many people <span class="acc">one manager</span> supervises well', []], ['network', 'The span shapes the chart', ['Narrow = Tall', 'Wide = Flat']], ['sliders', 'It depends on', ['Work', 'People', 'Supervision', 'Technology', 'Distance']]];
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
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // factor rows: condition pill, arrow, result pill
  for (let i = 1; i <= 5; i++) for (let k = 0; k < 2; k++) { const r = $(`#fr${i}_${k}`); const cw = Math.max($(`#fr${i}_0 .cnd`).offsetWidth, $(`#fr${i}_1 .cnd`).offsetWidth); r.querySelector('.ar').style.left = (cw + 24) + 'px'; r.querySelector('.res').style.left = (cw + 76) + 'px'; }
  // Meena label sits right of her flat manager seat
  const mp = $('#meP'); mp.style.left = (FLAT[0].x + 22 + 14) + 'px'; mp.style.top = (240 - 22) + 'px';
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
  const exOn = t < tR1 ? [tMorph + 1.0, tT - 0.3] : [tR2 + 0.2, tQ - 0.3];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: thirty people, one boss ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // reporting card
    M.vis($('#rep'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const tc = tMorph + 0.55;
    M.count($('#rN'), t, tc, 1.6, 0, 30);
    const hot = M.io((t - tBehind) / 0.4);
    $('#rN').style.color = mix(C.ink, C.red, hot);
    for (let k = 0; k < 30; k++) { const el = $('#pp' + k); M.vis(el, t, tc + k * 0.045, 1e9, { dy: 12, sc: 0.7, sp: M.POP, fade: 0.1 }); el.style.color = mix(C.ink2, C.red, M.io((t - tBehind - k * 0.01) / 0.3)); }
    M.vis($('#hrs'), t, tStraight, 1e9, { dy: 16 });
    const hrs = 9 + 5 * M.io((t - tBadge[2]) / 1.0);
    M.setT($('#hrsT'), `Ravi's day: ${Math.round(hrs)} hrs`);
    const hh = M.io((t - tBadge[2]) / 0.5); $('#hrs').style.background = mix(C.paper, C.redBg, hh); $('#hrs').style.color = mix(C.ink, C.red, hh);
    setIco($('#hrsI'), 'timer', hh > 0.5 ? C.red : C.ink, 24);
    // waiting card
    M.vis($('#jobs'), t, tJob[0] - 0.4, 1e9, { dy: 36 });
    JOBS.forEach((_, i) => {
      const el = $('#job' + i); M.vis(el, t, tJob[i] - 0.1, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.jb'), t, tBadge[i] - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
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

  /* ===== D/O/W: one chart, three shapes ===== */
  const dOn = t >= tTu - 0.05 && t < tP1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.12, tO0 - 0.1, { dy: 24, ...o });
    M.vis($('#aka'), t, tAka, 1e9, { dy: 0, dx: 16 });
    $('#dwO').style.color = mix(C.ink, C.gold, M.io((t - tOne) / 0.3));
    $('#dwS').style.color = mix(C.ink, C.gold, M.io((t - tSup) / 0.3));
    // tiles replace the definition bar
    let k = 0; for (let i = 0; i < LS.length; i++) if (t >= LS[i]) k = i;
    const HLT = [[[tFive1 - 0.05, tO2]], [[tFiveLv - 0.05, tGrows - 0.1], [tThree - 0.05, tFlatW]], [[tFifteen - 0.05, tFiveLv - 0.1], [tSix - 0.05, tThree - 0.1]], [[tO2 - 0.05, tClose + 0.6]]];
    HLT[0].push([tTwo - 0.05, tFifteen - 0.1], [tFiveW - 0.05, tSix - 0.1]);
    TL.forEach(([, vals], i) => {
      const el = $('#tl' + i); M.vis(el, t, tO0 + 0.1 + i * 0.08, tCout, { dy: 24, ...o });
      const tv = el.querySelector('.tv');
      const kk = k, u = M.clamp((t - LS[kk]) / 0.36), shown = kk > 0 && u < 0.5 ? vals[kk - 1] : vals[kk];
      M.setT(tv, String(shown));
      const dip = kk === 0 || t < tO0 + 0.5 ? 1 : (u < 0.5 ? 1 - 2 * u : 2 * u - 1);
      tv.style.opacity = dip >= 0.999 ? '' : dip.toFixed(3);
      let a = 0; HLT[i].forEach(([h0, h1]) => { a = Math.max(a, on01(t, h0, h1, 0.25)); });
      el.querySelector('.bg').style.background = mix(C.card, C.ink, a);
      el.querySelector('.lbl').style.color = mix(C.muted, C.gold2, a);
      tv.style.color = mix(C.ink, '#fff', a);
    });
    // chart card
    M.vis($('#chart'), t, tChart, tCout, { dy: 36, ...o });
    M.vis($('#rv'), t, tChart + 0.25, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#spanP'), t, tThirty - 0.05, tO0 + 0.2, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.25, ody: 0 });
    const L = LAY[k], L0 = LAY[Math.max(0, k - 1)], tk = LS[k];
    // level bands
    ROWY.forEach((_, r) => {
      const el = $('#bd' + r), inN = LBANDS[k].includes(r), inO = k > 0 && LBANDS[k - 1].includes(r);
      let v; if (k === 0) v = M.clamp((t - tChart - 0.3 - r * 0.04) / 0.3) * (inN ? 1 : 0);
      else { const s = M.spring(t - tk - 0.15 - r * 0.05, M.SOFT); v = inN && inO ? 1 : inN ? s : inO ? 1 - M.io((t - tk) / 0.3) : 0; }
      const pulse = r < 5 && (k === 0 ? on01(t, tTwoLv - 0.05, tO0, 0.25) : 0) + (k === 2 ? on01(t, tFiveLv - 0.05, tGrows + 0.6, 0.25) : 0) + (k === 3 ? on01(t, tThree - 0.05, tFlatW + 0.6, 0.25) : 0);
      M.hide(el, v <= 0.001); if (v <= 0.001) return;
      el.style.opacity = v >= 0.999 ? '' : v.toFixed(3);
      snap(el, v >= 0.999 ? 'none' : `scaleY(${(0.4 + 0.6 * v).toFixed(4)})`);
      el.style.background = mix(C.paper, C.gold3, inN ? pulse : 0);
    });
    // connectors: out at each change, draw back once tokens settle
    const lineAt = (g) => { // progress of group g
      let u = 0;
      LS.forEach((ts, i) => { const gi = i === 3 ? 1 : i; if (gi !== g) return; const tend = i < LS.length - 1 ? LS[i + 1] : 1e9; const din = i === 0 ? tChart + 0.6 : ts + 0.75; u = Math.max(u, M.o3((t - din) / 0.55) * (1 - M.io((t - tend) / 0.18))); });
      return u;
    };
    [0, 1, 2].forEach(g => {
      const u = lineAt(g), gl = $('#gl' + g); M.hide(gl, u <= 0.001);
      if (u <= 0.001) return;
      gl.querySelectorAll('path').forEach(p => M.drawU(p, u));
      const hiG = g === 1 ? on01(t, tO2 - 0.05, tClose + 0.6, 0.25) : 0;
      gl.setAttribute('stroke', mix('#D9CFBC', C.gold, hiG));
    });
    // people tokens
    for (let j = 0; j < 30; j++) {
      const el = $('#tk' + j), tin = tChart + 0.45 + FAN[j].x / 1600 * 0.7;
      const s = k === 0 ? 1 : M.spring(t - tk - 0.05 - (L[j].x / 1600) * 0.25, M.SOFT);
      const x = M.lerp(L0[j].x, L[j].x, s), y = M.lerp(L0[j].y, L[j].y, s);
      const st = s >= 1;
      snap(el, (st ? Math.round(x - 22) : (x - 22).toFixed(1)) + 'px', 'left'); snap(el, (st ? Math.round(y - 22) : (y - 22).toFixed(1)) + 'px', 'top');
      M.vis(el, t, tin, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      // role: manager navy, staff white. In the fan, the 5 future managers turn navy on "manager"
      let mg = k === 0 ? (j < 5 ? M.io((t - tMgr - j * 0.08) / 0.3) : 0) : M.lerp(L0[j].mgr ? 1 : 0, L[j].mgr ? 1 : 0, M.clamp((t - tk - 0.3) / 0.3));
      if (k === 1 && j < 5) mg = 1;
      const me = j === 0 ? on01(t, tMeena - 0.1, 1e9) : 0;
      el.style.background = mix(mix('#fff', C.ink, mg), C.gold, me);
      el.style.borderColor = mix(mix(C.line, C.ink, mg), C.gold, me);
      if (j === 0) setH(el, `<span style="color:${mg > 0.5 || me > 0.5 ? '#fff' : C.ink}">M</span>`);
      else setIco(el, 'user', mg > 0.5 ? '#fff' : C.ink2, 22, 2.2);
      if (j === 0 && t > tMeena - 0.1 && t < tMeena + 0.5) el.style.transform = `scale(${(1 + 0.15 * Math.sin(Math.PI * (t - tMeena + 0.1) / 0.6)).toFixed(4)})`;
    }
    M.vis($('#meP'), t, tFive2 + 0.3, tTall, { dx: -12, dy: 0, outDur: 0.2, ody: 0 });
  }

  /* ===== P: tall vs flat ===== */
  const pOn = t >= tP1 - 0.1 && t < tF0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    PC.forEach((_, i) => {
      const el = $('#ee' + i), ta = i ? tP2 : tP1, td = i ? tPout + 1 : tP2;
      M.vis(el, t, tP1 + 0.1 + i * 0.1, tPout, { dy: 36, outDur: 0.3, ody: -16 });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      el.querySelector('.es').style.color = mix(mix(C.dim, C.gold2, on), C.gold, off);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      el.querySelector('.mini').style.opacity = (0.35 + 0.65 * on).toFixed(3);
      for (let r = 0; r < 3; r++) {
        const pw = $('#pw' + i + r); M.vis(pw, t, tPr[i][r] - 0.1, 1e9, { dy: 18, sp: M.SOFT });
        pw.querySelector('.pb').style.background = mix(C.paper, C.navy2, act);
        pw.querySelector('.pt2').style.color = mix(C.ink, '#fff', act);
      }
    });
  }

  /* ===== F: five factors ===== */
  const fOn = t >= tF0 - 0.1 && t < tR1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fl'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#fp'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...o });
    FR.forEach(([ic], i) => {
      const el = $('#pr' + i), ta = tF[i], td = i < 4 ? tF[i + 1] : tFout + 1;
      M.vis(el, t, tF0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const act = on01(t, ta, td);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix(C.ink, '#fff', act);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold, C.gold2, act);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    PP.forEach((_, k) => {
      const tin = k === 0 ? tF0 + 0.5 : tF[k - 1], tout = k < 5 ? tF[k] - 0.14 : 1e9;
      const pn = $('#pn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.5, tout, { dy: 0, ...oo });
      for (let r = 0; r < 2; r++) {
        const fr = $(`#fr${k}_${r}`), tr = tFr[k - 1][r];
        M.vis(fr.querySelector('.cnd'), t, tr - 0.1, 1e9, { dy: 0, dx: -16, fade: 0.12 });
        M.vis(fr.querySelector('.ar'), t, tr + 0.1, 1e9, { dy: 0, dx: -10, fade: 0.12 });
        M.vis(fr.querySelector('.res'), t, tr + 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      }
    });
  }

  /* ===== R: Ravi keeps the flat chart ===== */
  const rOn = t >= tR1 - 0.1 && t < tQ + 0.05; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#wstrip'), t, tR1 + 0.05, 1e9, { dy: 24 });
    M.rise($('#wsT'), t, tR1 + 0.15, { st: 0.04 });
    ['#ws1', '#ws2', '#ws3'].forEach((s, i) => { $(s).style.color = mix('#fff', '#E9D9B5', M.io((t - tWs[i]) / 0.3)); });
    RES.forEach((r, i) => {
      M.vis($('#rc' + i), t, tWs[1] - 0.1 + i * 0.12, 1e9, { dy: 36 });
      M.vis($('#rc' + i + ' .big'), t, i ? tThirtyR + 0.2 : tDays + 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      r[2].forEach(([n, w, v], k) => {
        const el = $('#br' + i + k), bt = el.querySelector('.bt'), bv = el.querySelector('.bv');
        M.vis(el, t, tWs[1] + 0.2 + k * 0.12 + i * 0.1, 1e9, { dy: 16 });
        const tg = k === 0 ? tWs[1] + 0.3 + i * 0.1 : (i ? tFiveR : tHour);
        const ww = w * M.o5((t - tg) / 0.9);
        bt.style.width = Math.max(0, ww).toFixed(1) + 'px'; bt.style.background = k === 1 ? C.gold : '#E7E0D2';
        bv.style.left = (Math.max(0, ww) + 20).toFixed(1) + 'px'; M.setT(bv, v);
        bv.style.opacity = M.clamp((t - tg) / 0.3).toFixed(3); bv.style.color = k === 1 ? C.ink : C.muted;
      });
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
