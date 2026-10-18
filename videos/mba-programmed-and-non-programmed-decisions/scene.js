// MBA - Principles of Management, Ep 22: Programmed and Non-Programmed Decisions
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E', ndim: '#5C6A8A' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  sparkles: ['M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z', 'M20 3v4', 'M22 5h-4'],
  listChecks: ['m3 17 2 2 4-4', 'm3 7 2 2 4-4', 'M13 6h8', 'M13 12h8', 'M13 18h8'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  xCircle: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm15 9-6 6', 'm9 9 6 6'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tForty = wt('H2', 'forty');
const tMilk = wt('C1', 'Milk'), tAsk = wt('C1', 'Ask'), tRefA = wt('C2', 'refund'), tShopA = wt('C3', 'shop'), tTime = wt('C3', 'time');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;          // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tD2 = T0('D2'), tTwo = wt('D2', 'two'), tYr = wt('D2', '1960'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('P0') - 0.32;
const tP0 = T0('P0'), tP1 = T0('P1'), tAgain = wt('P1', 'again'), tAgain2 = wt('P1', 'again', 1), tRule = wt('P1', 'rule');
const tP2 = T0('P2'), tReorder = wt('P2', 'reorder'), tP3 = T0('P3'), tWrong = wt('P3', 'wrong'), tRefund = wt('P3', 'refund');
const tProc = wt('P4', 'procedure'), tFixed = wt('P4', 'Fixed'), tP5 = T0('P5'), tLower = wt('P5', 'lower'), tQuick = wt('P5', 'Quick'), tCheap = wt('P5', 'cheap'), tPout = T0('X0') - 0.32;
const tX0 = T0('X0'), tX1 = T0('X1'), tNew = wt('X1', 'new'), tNo = wt('X1', 'No'), tX2 = T0('X2'), tCity = wt('X2', 'city');
const tX3 = T0('X3'), tShop = wt('X3', 'shop'), tX4 = T0('X4'), tJudg = wt('X4', 'judgment'), tCreat = wt('X4', 'creativity'), tFresh = wt('X4', 'fresh'), tIdeas = wt('X4', 'ideas');
const tX5 = T0('X5'), tTop = wt('X5', 'top'), tMatter = wt('X5', 'matter'), tXout = T0('G0') - 0.32;
const tG0 = T0('G0'), tSort = wt('G0', 'sorting'), tGl = [1, 2, 3, 4].map(i => T0('G' + i));
const tFly = [wt('G1', 'Programmed'), wt('G2', 'Programmed'), wt('G3', 'Non'), wt('G4', 'Non')].map(x => x - 0.1);
const tThirty = wt('G5', 'Thirty'), tRoutineG = wt('G5', 'routine'), tRaviG = wt('G5', 'Ravi'), tFour = wt('G5', 'four'), tGout = T0('K0') - 0.32;
const tK0 = T0('K0'), tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3');
const tCell = [[wt('K1', 'routine'), wt('K1', 'rules'), wt('K1', 'lower')], [wt('K2', 'new'), wt('K2', 'judgment'), wt('K2', 'top')]];
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'routine'), wt('S2', 'rules')], [wt('S3', 'new'), wt('S3', 'judgment'), wt('S3', 'creativity')], [wt('S4', 'Routine'), wt('S4', 'New')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// questions for Ravi
const QS = [['droplet', 'Milk low at outlet 3?', tMilk - 0.05, 0], ['coin', 'Refund?', tRefA - 0.1, 0], ['alert', 'New shop next door!', tShopA - 0.05, 1]];
$('#qps').innerHTML = QS.map(([ic, q, , r], i) => `<div class="pill" id="qp${i}" style="top:${r ? 136 : 72}px;${i === 2 ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 22, i === 2 ? C.red : C.gold, 2.2)}<span>${q}</span></div>`).join('');
$('#allRI').innerHTML = M.icon('user', 22, C.ink, 2.2); $('#noTI').innerHTML = M.icon('timer', 22, C.red, 2.2);
$('#blks').innerHTML = Array.from({ length: 40 }, (_, i) => `<div class="blk" id="bl${i}" style="left:${(8 + i * 20.9).toFixed(1)}px"></div>`).join('');
// two types
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const EE = [['repeat', 'Programmed', 'Repetitive and routine', 'cup', 'Reorder milk, every day', 'TYPE 01'], ['sparkles', 'Non-programmed', 'New and unstructured', 'pin', 'Open in a new city?', 'TYPE 02']];
$('#eRow').innerHTML = EE.map(([ic, t, m, ei, ev, n], i) => `<div class="ee" id="ee${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="num">${n}</div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">AT CHAI CORNER</div><div class="ev"><i>${M.icon(ei, 28, C.gold, 2.2)}</i><span>${ev}</span></div></div>`).join('');
// programmed: days, gauge, refund rule, profile rows
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
$('#days').innerHTML = DAYS.map((d, i) => `<div class="dy" id="dy${i}" style="left:${28 + i * 96}px"><div class="dn">${d}</div><div class="di"></div></div>`).join('');
$('#reoI').innerHTML = M.icon('check', 24, '#fff', 2.6);
$('#r2aI').innerHTML = M.icon('alert', 26, C.red, 2.2); $('#r2bI').innerHTML = M.icon('coin', 26, C.gold2, 2.2);
const PR = [['repeat', 'Comes up again and again', tAgain], ['book', 'Write the rule once', tRule], ['listChecks', 'A procedure: fixed steps', tProc], ['M', 'Lower level: Meena, outlet 2', tLower]];
const XR = [['sparkles', 'New, and comes up rarely', tNew], ['xCircle', 'No rule fits', tNo], ['scale', 'Needs judgment and creativity', tJudg], ['R', 'Top level: Ravi decides', tTop]];
const rowsHTML = (R, p) => R.map(([ic, tx], i) => `<div class="kr" id="${p}${i}" style="top:${222 + i * 84}px"><div class="bg"></div><div class="ki">${ic.length === 1 ? ic : ''}</div><div class="kt">${tx}</div></div>`).join('');
$('#pRows').innerHTML = rowsHTML(PR, 'pr'); $('#xRows').innerHTML = rowsHTML(XR, 'xw');
// non-programmed: rulebook check, city, the shop next door
$('#xr1I').innerHTML = M.icon('book', 22, C.dim, 2.2); $('#xr2I').innerHTML = M.icon('book', 22, C.dim, 2.2); $('#xnoI').innerHTML = M.icon('x', 22, '#fff', 2.6);
$('#xc1I').innerHTML = M.icon('store', 26, C.gold, 2.2); $('#xc2I').innerHTML = M.icon('pin', 26, C.gold, 2.2);
$('#xs1I').innerHTML = M.icon('cup', 26, C.gold, 2.2); $('#xs2I').innerHTML = M.icon('store', 26, C.red, 2.2);
const IDEAS = [['Lower prices?', tCreat], ['New flavour?', tFresh], ['Faster service?', tIdeas]];
$('#xB2').innerHTML = IDEAS.map(([s], i) => `<div class="mp" id="id${i}" style="top:120px;font-size:22px">${M.icon('bulb', 22, C.gold, 2.2)}${s}</div>`).join('');
// sorting game
$('#dkTI').innerHTML = M.icon('help', 32, C.dim, 2.2);
const BINS = [['repeat', 'Programmed', 'ROUTINE · RULES · LOWER LEVELS', 'M', 'Decided by outlet managers', 36], ['sparkles', 'Non-programmed', 'NEW · JUDGMENT · THE TOP', 'R', 'Decided by Ravi', 4]];
$('#bins').innerHTML = BINS.map(([ic, t, s, a, f, n], b) => `<div class="bin" id="bin${b}" style="left:${160 + b * 816}px"><div class="bg"></div><div class="bi">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="serif bt">${t}</div><div class="bs">${s}</div><div class="serif bn">0</div><div class="sl" style="left:40px"></div><div class="sl" style="left:408px"></div><div class="tl">${Array.from({ length: n }, (_, j) => `<div class="tile" id="ti${b}_${j}" style="left:${15 + (j % 14) * 50}px;top:${10 + Math.floor(j / 14) * 38}px"></div>`).join('')}</div><div class="bf"><b>${a}</b><span>${f}</span></div></div>`).join('');
const CARDS = [['cup', 'Reorder milk', 0, 0], ['coin', 'Customer refund', 0, 1], ['pin', 'Open in a new city', 1, 0], ['store', 'New shop next door', 1, 1]];
$('#flys').innerHTML = CARDS.map(([ic, tx], k) => `<div class="dk fly" id="fc${k}"><div class="bg"></div><div class="ci">${M.icon(ic, 32, C.gold, 2.2)}</div><div class="ct">${tx}</div></div>`).join('');
// comparison table
const TR = [['NATURE', 'help'], ['MADE WITH', 'book'], ['WHO DECIDES', 'users']];
const TC = [[['Routine, repeats', 'Reorder milk'], ['Rules and procedures', 'Fixed steps'], ['Lower levels', 'Meena, outlet 2']],
  [['New, unique', 'Open in a new city'], ['Judgment and creativity', 'Weigh facts, fresh ideas'], ['Top managers', 'Ravi, the owner']]];
$('#ch1').style.background = '';
$('#tIn').innerHTML = `<div class="lbl" id="thL" style="left:40px;top:40px">AT A GLANCE</div>` +
  [['repeat', 'Programmed'], ['sparkles', 'Non-programmed']].map(([ic, t], c) => `<div class="thd" id="th${c}" style="left:${440 + c * 600}px"><i>${M.icon(ic, 28, C.gold, 2.2)}</i><span class="serif">${t}</span></div>`).join('') +
  [96, 216, 336].map((y, r) => `<div class="tsep" id="ts${r}" style="top:${y}px"></div>`).join('') +
  TR.map(([l, ic], r) => `<div class="trl" id="tr${r}" style="top:${96 + r * 120 + 46}px">${M.icon(ic, 24, C.gold, 2.2)}${l}</div>`).join('') +
  TC.map((col, c) => col.map(([m, s], r) => `<div class="cell" id="tc${c}${r}" style="left:${440 + c * 600}px;top:${96 + r * 120 + 18}px"><div class="m">${m}</div><div class="s">${s}</div></div>`).join('')).join('');
$('#kstI').innerHTML = M.icon('scale', 40, C.gold2, 2.4);
// quiz
const OPTS = ['Programmed', 'Repetitive', 'Non-programmed', 'Routine'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('sparkles', 44, C.gold2, 2.4);
// recap
const ROWS = [['repeat', 'Programmed', ['Routine', 'Rules']], ['sparkles', 'Non-programmed', ['New', 'Judgment', 'Creativity']], ['network', 'Who decides', ['Routine: lower levels', 'New: the top']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const on01 = (t, a, b, d = 0.3) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.35));
const POPV = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 300; QS.forEach(([, , , r], i) => { if (i === 2) x = 300; const p = $('#qp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; });
  const nt = $('#noT'); nt.style.left = (884 - nt.offsetWidth) + 'px';
  $('#h1').style.left = (460 - $('#h1').offsetWidth / 2) + 'px'; $('#h2').style.left = (884 - $('#h2').offsetWidth) + 'px';
  // gauge: 0..60 L across 664 px, reorder line at 20 L
  const gx = 28 + 664 * 20 / 60; $('#gL').style.left = (gx - 2) + 'px'; $('#gLl').textContent = 'REORDER LINE'; $('#gLl').style.left = (gx - 14 - $('#gLl').offsetWidth) + 'px';
  $('#reo').style.left = (692 - $('#reo').offsetWidth) + 'px';
  const a = $('#r2a'), v = $('#r2v'), b = $('#r2b'); const xa = 28 + a.offsetWidth + 22; v.style.left = xa + 'px'; b.style.left = (xa + 60 + 22) + 'px';
  $('#pc').style.left = (736 - $('#pc').offsetWidth) + 'px'; $('#pq').style.left = (736 - $('#pc').offsetWidth - 12 - $('#pq').offsetWidth) + 'px';
  $('#xm').style.left = (736 - $('#xm').offsetWidth) + 'px';
  x = 28 + $('#xr1').offsetWidth + 16; $('#xr2').style.left = x + 'px'; x += $('#xr2').offsetWidth + 16; $('#xno').style.left = x + 'px';
  const c1 = $('#xc1'), c2 = $('#xc2'); c2.style.left = (692 - c2.offsetWidth) + 'px'; geo.m0 = 28 + c1.offsetWidth + 20; geo.m1 = 692 - c2.offsetWidth - 20;
  const s1 = $('#xs1'), vs = $('#xvs'), s2 = $('#xs2'); x = 28 + s1.offsetWidth + 28; vs.style.left = x + 'px'; s2.style.left = (x + vs.offsetWidth + 28) + 'px';
  x = 28; IDEAS.forEach((_, i) => { const p = $('#id' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
// profile rows (P light card, X navy card)
function rows(R, p, t, tEnd, navy) {
  R.forEach(([ic], i) => {
    const el = $('#' + p + i), ta = R[i][2], td = i < R.length - 1 ? R[i + 1][2] : tEnd;
    const act = on01(t, ta - 0.05, td - 0.05), seen = t >= ta - 0.05;
    const base = navy ? C.navy2 : C.paper, on = navy ? C.gold : C.ink;
    el.querySelector('.bg').style.background = mix(base, on, act);
    el.querySelector('.kt').style.color = !seen ? (navy ? C.ndim : C.dim) : (act > 0.5 || navy ? '#fff' : C.ink);
    const ki = el.querySelector('.ki');
    if (ic.length === 1) { ki.style.background = seen ? C.gold : (navy ? C.navy3 : '#fff'); ki.style.color = seen ? '#fff' : (navy ? C.ndim : C.dim); if (act > 0.5) ki.style.background = navy ? '#fff' : C.gold; if (act > 0.5 && navy) ki.style.color = C.gold; }
    else { ki.style.background = navy ? mix(C.navy3, '#fff', act) : mix('#fff', C.navy2, act); setIco(ki, ic, !seen ? (navy ? C.ndim : C.dim) : (navy ? C.gold : (act > 0.5 ? C.gold2 : C.gold)), 28, 2.2); }
  });
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
  const exA = t < tT ? [tMorph + 1.0, tT - 0.3] : [tG0 + 0.3, tGout];
  M.vis($('#exChip'), t, exA[0], exA[1], { dy: 10, outDur: 0.3 });

  /* ===== A: forty questions, all for Ravi ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // questions
    M.vis($('#ask'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const n = Math.round(40 * M.o5((t - tForty) / 1.8));
    M.setT($('#qN'), String(n));
    const hot = M.io((t - tTime) / 0.4);
    $('#qN').style.color = mix(C.ink, C.red, hot);
    QS.forEach(([, , tq], i) => M.vis($('#qp' + i), t, tq, 1e9, POPV));
    M.vis($('#allR'), t, tAsk - 0.05, 1e9, POPV);
    // Ravi's day fills up
    M.vis($('#day'), t, tMorph + 0.42, 1e9, { dy: 36 });
    $('#track').style.background = mix(C.paper, C.redBg, hot);
    for (let i = 0; i < 40; i++) {
      const el = $('#bl' + i); M.hide(el, i >= n);
      el.style.background = mix(C.ink2, C.red, hot);
    }
    M.vis($('#noT'), t, tTime - 0.05, 1e9, POPV);
    ['#h0', '#h1', '#h2'].forEach((s, i) => M.vis($(s), t, tMorph + 0.7 + i * 0.06, 1e9, { dy: 8 }));
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

  /* ===== D: Simon's two types ===== */
  const dOn = t >= tTu - 0.05 && t < tP0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.12, tDout, { dy: 24, ...o });
    M.vis($('#yr'), t, tYr, 1e9, POPV);
    $('#dwT').style.color = mix(C.ink, C.gold, M.io((t - tTwo) / 0.3));
    EE.forEach(([ic], i) => {
      const el = $('#ee' + i), ta = i ? tD4 : tD3, td = i ? tDout + 1 : tD4;
      M.vis(el, t, tTwo + i * 0.12, tDout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      el.querySelector('.num').style.color = mix(mix(C.dim, C.gold2, on), C.gold, off);
      const em = el.querySelector('.em'); M.rise(em, t, ta + 0.1, { st: 0.04 }); em.style.color = mix(C.gold2, C.gold, off);
      el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), ic, t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.45, 1e9, { dy: 10 }); ex.style.color = mix('#8C96AE', C.muted, off);
      const ev = el.querySelector('.ev'); M.vis(ev, t, ta + 0.55, 1e9, { dy: 16 }); ev.querySelector('span').style.color = mix('#fff', C.ink, off);
      ev.querySelector('i').style.background = mix(C.paper, C.navy2, act);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tTwo + 1) el.style.transform = Math.abs(lift) > 0.001 && t < tDout ? `scale(${(1 + 0.015 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== P: programmed decisions ===== */
  const pOn = t >= tP0 - 0.1 && t < tX0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pv'), t, tP0 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#pk'), t, tP0 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    M.rise($('#pk .pt'), t, tP0 + 0.4, { st: 0.06, sp: M.HEAVY });
    M.vis($('#pk .ps'), t, tP0 + 0.35, 1e9, { dy: 12 });
    PR.forEach((_, i) => M.vis($('#pr' + i), t, tP0 + 0.6 + i * 0.07, 1e9, { dy: 14 }));
    rows(PR, 'pr', t, tPout + 1, false);
    M.vis($('#pq'), t, tQuick - 0.05, 1e9, POPV); M.vis($('#pc'), t, tCheap - 0.05, 1e9, POPV);
    // left label turns into "procedure"
    const pl = $('#pvL'); M.setT(pl, t < tProc ? 'THE RULEBOOK · CHAI CORNER' : 'A PROCEDURE · FIXED STEPS'); pl.style.color = t < tProc ? C.muted : C.gold;
    M.vis(pl, t, tP0 + 0.4, 1e9, { dy: 10 });
    if (t >= tProc && t < tProc + 0.4) pl.style.opacity = M.clamp((t - tProc) / 0.25).toFixed(3);
    // panel A: same question every day -> rule 01 gauge
    M.vis($('#pa0'), t, tP0 + 0.35, 1e9, { dy: 20 });
    M.vis($('#pA1'), t, tP1 - 0.05, tP2 - 0.15, { dy: 12, outDur: 0.2, ody: -10 });
    if (t < tP2 + 0.1) DAYS.forEach((_, i) => {
      const el = $('#dy' + i); M.vis(el, t, tP1 + 0.1 + i * 0.05, 1e9, { dy: 12 });
      const tl = tAgain + i * (tAgain2 + 0.5 - tAgain) / 6, lit = M.io((t - tl) / 0.2);
      el.style.background = mix('#fff', C.ink, lit); el.querySelector('.dn').style.color = mix(C.muted, C.gold2, lit);
      setIco(el.querySelector('.di'), 'repeat', lit > 0.5 ? C.gold2 : C.dim, 24, 2.2);
    });
    const a2 = M.vis($('#pA2'), t, tP2, 1e9, { dy: 12 });
    if (t >= tP2) {
      M.vis($('#gT'), t, tP2 + 0.15, 1e9, { dy: 0, fade: 0.2 });
      const drain = M.io((t - tP2 - 0.3) / Math.max(0.5, tReorder - tP2 - 0.3)), refill = M.o3((t - tReorder - 0.7) / 0.9);
      const lv = 45 - 27 * drain + 32 * refill;
      const gf = $('#gF'); M.vis(gf, t, tP2 + 0.15, 1e9, { dy: 0, fade: 0.2 });
      gf.style.width = (664 * lv / 60).toFixed(1) + 'px';
      const low = lv < 20 ? 1 : 0; gf.style.background = mix(C.ink2, C.red, M.io((t - tReorder + 0.4) / 0.3) * (1 - refill));
      M.setT($('#mL'), Math.round(lv) + ' L'); $('#mL').style.color = mix(C.ink, C.red, M.io((t - tReorder + 0.4) / 0.3) * (1 - refill));
      M.vis($('#mL'), t, tP2 + 0.25, 1e9, { dy: 10 });
      M.vis($('#gL'), t, wt('P2', 'twenty') - 0.1, 1e9, { dy: 0, fade: 0.15 }); M.vis($('#gLl'), t, wt('P2', 'twenty'), 1e9, { dy: 8 });
      M.vis($('#reo'), t, tReorder, 1e9, POPV);
    }
    // panel B: rule 02
    M.vis($('#pa1'), t, tP0 + 0.45, 1e9, { dy: 20 });
    M.vis($('#r2L'), t, tP0 + 0.6, 1e9, { dy: 10 }); $('#r2L').style.color = mix(C.dim, C.gold, M.io((t - tP3) / 0.3));
    M.rise($('#r2T'), t, tP3 + 0.1, { st: 0.04 });
    M.vis($('#r2a'), t, tWrong - 0.05, 1e9, POPV);
    M.vis($('#r2v'), t, tRefund - 0.3, 1e9, { dx: -16, dy: 0 });
    M.vis($('#r2b'), t, tRefund - 0.05, 1e9, POPV);
    // procedure: both rules light up as fixed steps
    [0, 1].forEach(k => { $('#pa' + k + ' .bd').style.opacity = on01(t, tFixed - 0.1 + k * 0.15, tP5).toFixed(3); });
  }

  /* ===== X: non-programmed decisions ===== */
  const xOn = t >= tX0 - 0.1 && t < tG0 + 0.2; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#xv'), t, tX0 + 0.1, tXout, { dx: -60, dy: 0, ...o });
    M.vis($('#xk'), t, tX0 + 0.25, tXout, { dx: 60, dy: 0, ...o });
    M.rise($('#xk .pt'), t, tX0 + 0.4, { st: 0.06, sp: M.HEAVY });
    M.vis($('#xk .ps'), t, tX0 + 0.35, 1e9, { dy: 12 });
    XR.forEach((_, i) => M.vis($('#xw' + i), t, tX0 + 0.6 + i * 0.07, 1e9, { dy: 14 }));
    rows(XR, 'xw', t, tXout + 1, true);
    M.vis($('#xm'), t, tMatter - 0.05, 1e9, POPV);
    M.vis($('#xv > .lbl'), t, tX0 + 0.4, 1e9, { dy: 10 });
    // panel A: rulebook check -> new city
    M.vis($('#xa0'), t, tX0 + 0.35, 1e9, { dy: 20 });
    M.vis($('#xA1'), t, tX1 - 0.05, tX2 - 0.15, { dy: 12, outDur: 0.2, ody: -10 });
    if (t < tX2 + 0.1) {
      M.vis($('#xr1'), t, tX1 + 0.3, 1e9, POPV); M.vis($('#xr2'), t, tX1 + 0.45, 1e9, POPV);
      M.vis($('#xno'), t, tNo - 0.05, 1e9, POPV);
    }
    M.vis($('#xA2'), t, tX2, 1e9, { dy: 12 });
    if (t >= tX2) {
      M.vis($('#xc1'), t, tX2 + 0.2, 1e9, POPV);
      const u = M.io((t - tCity + 0.5) / 0.5), y = 168;
      M.hide($('#xmap'), u <= 0); if (u > 0) $('#xmap').setAttribute('d', `M${geo.m0} ${y} L${M.lerp(geo.m0, geo.m1, u).toFixed(1)} ${y}`);
      M.vis($('#xc2'), t, tCity - 0.05, 1e9, POPV);
    }
    // panel B: the shop next door, then fresh ideas
    M.vis($('#xa1'), t, tX0 + 0.45, 1e9, { dy: 20 });
    M.vis($('#q2L'), t, tX0 + 0.6, 1e9, { dy: 10 }); $('#q2L').style.color = mix(C.dim, C.gold, M.io((t - tX3) / 0.3));
    M.rise($('#q2T'), t, tX3 + 0.1, { st: 0.04 });
    M.vis($('#xB1'), t, tShop - 0.3, tCreat - 0.15, { dy: 0, outDur: 0.2, ody: -10 });
    if (t < tCreat + 0.1) { M.vis($('#xs1'), t, tShop - 0.3, 1e9, POPV); M.vis($('#xvs'), t, tShop - 0.15, 1e9, { dy: 6 }); M.vis($('#xs2'), t, tShop, 1e9, POPV); }
    IDEAS.forEach(([, ti], i) => M.vis($('#id' + i), t, ti - 0.05, 1e9, POPV));
    // judgment weighs the city, creativity finds ideas
    $('#xa0 .bd').style.opacity = on01(t, tJudg - 0.1, tCreat - 0.1).toFixed(3);
    $('#xa1 .bd').style.opacity = on01(t, tCreat - 0.1, tX5 + 0.3).toFixed(3);
  }

  /* ===== G: the sorting game ===== */
  const gOn = t >= tG0 - 0.1 && t < tK0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    const land = tFly.map(x => x + 0.45);
    let nL = (t >= land[0]) + (t >= land[1]) + Math.round(34 * M.o5((t - tThirty) / 1.4));
    let nR = (t >= land[2]) + (t >= land[3]) + Math.round(2 * M.o5((t - tFour) / 0.4));
    const left = 40 - nL - nR;
    M.vis($('#dLbl'), t, tG0 + 0.2, tGout, { dy: 10, ...o });
    M.vis($('#dN'), t, tG0 + 0.25, tGout, { dy: 12, ...o }); M.setT($('#dN'), String(left));
    $('#dN').style.color = left === 0 ? C.gold : C.ink;
    M.vis($('#bk2'), t, tG0 + 0.1, tGout, { dy: 20, ...o }); M.vis($('#bk1'), t, tG0 + 0.16, tGout, { dy: 20, ...o });
    M.vis($('#dkTop'), t, tG0 + 0.22, tGout, { dy: 20, ...o });
    const done = left === 0; const dt = $('#dkTop .ct'); M.setT(dt, done ? 'All sorted' : 'Next question'); dt.style.color = done ? C.ink : C.dim;
    setIco($('#dkTI'), done ? 'check' : 'help', done ? C.gold : C.dim, 32, done ? 2.6 : 2.2);
    BINS.forEach((_, b) => {
      const el = $('#bin' + b); M.vis(el, t, tSort - 0.1 + b * 0.12, tGout, { dy: 36, ...o });
      M.setT(el.querySelector('.bn'), String(b ? nR : nL));
      let g = 0; [0, 1, 2, 3].forEach(k => { if (CARDS[k][2] === b) g = Math.max(g, on01(t, land[k] - 0.1, land[k] + 0.7, 0.2)); });
      g = Math.max(g, b ? on01(t, tRaviG - 0.1, 1e9) : on01(t, tRoutineG - 0.1, tRaviG - 0.1));
      el.querySelector('.bg').style.borderColor = mix(C.card, C.gold, g);
      el.querySelector('.bf b').style.background = b ? C.gold : C.ink2;
      const n = BINS[b][5], t0 = b ? tFour - 0.1 : tThirty;
      for (let j = 0; j < n; j++) M.vis($(`#ti${b}_${j}`), t, t0 + j * (b ? 0.1 : 0.032), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.06 });
    });
    // cards: appear on the deck, then fly into a bin
    CARDS.forEach(([, , b, sl], k) => {
      const el = $('#fc' + k), tin = tGl[k] - 0.05;
      const s = M.spring(t - tFly[k], M.SOFT), u = M.clamp((t - tFly[k]) / 0.55);
      const x0 = 680, y0 = 270, x1 = 160 + b * 816 + 40 + sl * 368, y1 = 442 + 124;
      M.hide(el, t < tin || t > tGout + 0.35);
      if (t < tin) return;
      const st = t > tFly[k] && s >= 1;
      const x = t < tFly[k] ? x0 : M.lerp(x0, x1, s), y = t < tFly[k] ? y0 : M.lerp(y0, y1, s) - 70 * Math.sin(Math.PI * u);
      const sc = t < tFly[k] ? 1 : M.lerp(1, 0.6, s);
      const pin = M.spring(t - tin, M.SOFT), dy = (1 - pin) * 24, fo = 1 - M.io((t - tGout) / 0.3);
      el.style.opacity = Math.min(M.clamp((t - tin) / 0.15), fo).toFixed(3);
      snap(el, st && fo >= 1 ? `translate(${x1}px,${y1}px) scale(0.6)` : `translate(${x.toFixed(1)}px,${(y + dy - (1 - fo) * 16).toFixed(1)}px) scale(${sc.toFixed(4)})`);
      el.querySelector('.bg').style.borderColor = mix(C.line, C.gold, on01(t, tin + 0.1, tFly[k] + 0.3, 0.2));
    });
  }

  /* ===== K: side by side ===== */
  const kOn = t >= tK0 - 0.1 && t < tQ + 0.05; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#tbl'), t, tK0 + 0.05, 1e9, { dy: 36 });
    M.vis($('#thL'), t, tK0 + 0.3, 1e9, { dy: 10 });
    [0, 1].forEach(c => M.vis($('#th' + c), t, tK0 + 0.35 + c * 0.12, 1e9, { dy: 14 }));
    [0, 1, 2].forEach(r => { M.vis($('#ts' + r), t, tK0 + 0.4 + r * 0.06, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#tr' + r), t, tK0 + 0.6 + r * 0.1, 1e9, { dy: 10 }); });
    $('#ch0').style.background = mix(C.card, C.gold3, on01(t, tK1 - 0.1, tK2 - 0.1));
    $('#ch1').style.background = mix(C.card, C.gold3, on01(t, tK2 - 0.1, tK3 - 0.1));
    TC.forEach((col, c) => col.forEach((_, r) => {
      const el = $('#tc' + c + r), tc = tCell[c][r];
      M.rise(el.querySelector('.m'), t, tc - 0.05, { st: 0.04 });
      M.vis(el.querySelector('.s'), t, tc + 0.25, 1e9, { dy: 10 });
    }));
    M.vis($('#kst'), t, tK3 - 0.05, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'nothing') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Which') + i * 0.08, 1e9, { dy: 40 });
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
