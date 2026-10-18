// MBA - Principles of Management, Ep 20: Management by Objectives (MBO)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E', off: '#F0EBE1' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  hash: ['M4 9h16', 'M4 15h16', 'M10 3 8 21', 'M16 3l-2 18'],
  listChecks: ['m3 17 2 2 4-4', 'm3 7 2 2 4-4', 'M13 6h8', 'M13 12h8', 'M13 18h8'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tNew = wt('H2', 'new');
const tDay = [wt('C1', 'Monday'), wt('C1', 'Tuesday'), wt('C1', 'Wednesday')], tOrd = [wt('C1', 'sell'), wt('C1', 'save'), wt('C1', 'open')];
const tSay = wt('C2', 'say'), tStops = wt('C2', 'stops'), tNobody = wt('C3', 'nobody');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tPeter = wt('D2', 'Peter'), tFamous = wt('D2', 'famous'), tBook = wt('D2', 'book');
const tD3 = T0('D3'), tKey = [wt('D3', 'agree'), wt('D3', 'clear'), wt('D3', 'judge')], tD4 = T0('D4');
const tStopsD = wt('D4', 'stops'), tHe = wt('D4', 'He'), tMeenaD = wt('D4', 'Meena'), tAgreeD = wt('D4', 'agree'), tTargets = wt('D4', 'targets'), tDout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tFout = T0('B0') - 0.32;
const tSmartF = wt('F1', 'SMART'), tFive = wt('F1', 'five');
const tSugg = wt('F2', 'Meena'), tTwo = wt('F2', 'two'), tRaviF = wt('F2', 'Ravi'), tAgrees = wt('F2', 'agrees');
const tDecides = wt('F3', 'decides'), tHelper = wt('F3', 'extra'), tCupsF = wt('F3', 'cups');
const tFri = wt('F4', 'Friday'), tCheck = wt('F4', 'check'), tEarly = wt('F4', 'early');
const tHits = wt('F5', 'hits'), tBonus = wt('F5', 'bonus');
const tB0 = T0('B0'), tB = [T0('B1'), T0('B2'), T0('B3')], tL0 = T0('L0'), tL = [T0('L1'), T0('L2')], tChase = wt('L2', 'cups'), tTaste = wt('L2', 'taste');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAnsQ = T0('A1') - 0.02, tTakeQ = wt('A1', 'In');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['clear', 'together', 'results'].map(w => wt('S2', w)), ['objectives', 'individual', 'action', 'review', 'reward'].map(w => wt('S3', w)), ['clarity', 'motivation', 'time', 'numbers'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// orders, one per day
const ORD = [['MONDAY', 'Sell more'], ['TUESDAY', 'Save milk'], ['WEDNESDAY', 'Open earlier']];
$('#jobRow').innerHTML = ORD.map(([d, o], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="jd">${d}</div><div class="av">R</div><div class="jt">${o}</div></div>`).join('');
$('#pNoI').innerHTML = M.icon('x', 22, C.red, 2.6); $('#pIdkI').innerHTML = M.icon('help', 22, C.red, 2.4);
// definition: three key words
$('#defI').innerHTML = M.icon('target', 36, C.gold, 2.2);
const QW = [['users', 'Agree', 'manager and worker', 'Ravi and Meena'], ['target', 'Clear goals', 'targets you can count', 'Cups and minutes'], ['chart', 'Results', 'judge what got done', 'Not orders, results']];
$('#qRow').innerHTML = QW.map(([ic, q, s, a], i) => `<div class="qw" id="qw${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="qi"></div><div class="serif qt">${q}</div><div class="qs">${s}</div><div class="hr"></div><div class="qx">AT OUTLET 2</div><div class="qa">${a}</div></div>`).join('');
// orders vs together
const arrowHead = (x, y, a) => `<path d="M-9 -11 L3 0 L-9 11" transform="translate(${x} ${y}) rotate(${a})" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
$('#oRow').innerHTML =
  `<div class="ow" id="ow0" style="left:160px"><div class="bg"></div><div class="lbl">BEFORE</div><div class="serif ot">Orders</div>` +
  `<svg width="784" height="580"><g id="oA" stroke="#D9CFBC" fill="none"><path id="oL" d="M392 278 V340" stroke-width="5" stroke-linecap="round"/><g id="oAH">${arrowHead(392, 344, 90)}</g></g></svg>` +
  `<div class="bav" id="oR" style="left:344px;top:170px">R</div><div class="an" id="oRn" style="left:460px;top:202px;text-align:left">Ravi</div>` +
  `<div class="bav" id="oM" style="left:344px;top:356px;background:#3A4560">M</div><div class="an" id="oMn" style="left:460px;top:388px;text-align:left">Meena</div>` +
  `<div class="pill" id="oP" style="background:#F6E3DC;color:#B5482F"><span>${M.icon('x', 22, C.red, 2.6)}</span><span>One way, no say</span></div></div>` +
  `<div class="ow" id="ow1" style="left:976px"><div class="bg"></div><div class="lbl">NOW</div><div class="serif ot">Agreed <span class="acc">together</span></div>` +
  `<svg width="784" height="580"><g stroke="#B8862F" fill="none"><path id="nL0" d="M222 304 L322 392" stroke-width="5" stroke-linecap="round"/><path id="nL1" d="M562 304 L462 392" stroke-width="5" stroke-linecap="round"/></g></svg>` +
  `<div class="bav" id="nR" style="left:126px;top:196px">R</div><div class="an" id="nRn" style="left:94px;top:300px">Ravi</div>` +
  `<div class="bav" id="nM" style="left:562px;top:196px">M</div><div class="an" id="nMn" style="left:530px;top:300px">Meena</div>` +
  `<div class="bav" id="nT" style="left:344px;top:364px;background:#14213D"><span id="nTI"></span></div>` +
  `<div class="pill" id="nP" style="background:#B8862F;color:#fff"><span>${M.icon('check', 22, '#fff', 2.6)}</span><span>Targets they both agree on</span></div></div>`;
$('#nTI').innerHTML = M.icon('target', 48, C.gold2, 2.2);
// cascade: five steps, big goal down to the reward
$('#coverI').innerHTML = M.icon('flag', 30, C.gold2, 2.2);
const CR = [['Chai Corner: 500 cups a day', ['R']], ['Meena: 200 cups before 10', ['M', 'R']], ['Extra helper, cups ready', ['M']], ['Check together every Friday', ['M', 'R']], ['Target hit, bonus earned', ['M']]];
const RY = i => 112 + i * 92;
$('#cRows').innerHTML = CR.map(([tx, avs], i) => `<div class="cr" id="cr${i}" style="top:${RY(i)}px"><div class="bg"></div><div class="cn">0${i + 1}</div><div class="ct">${tx}</div>${avs.map((a, k) => `<div class="ca" style="right:${16 + k * 48}px;${a === 'R' ? '' : 'background:#3A4560'}">${a}</div>`).join('')}</div>`).join('');
$('#cLG').innerHTML = [0, 1, 2, 3].map(i => `<path id="cl${i}" d="M68 ${RY(i) + 72} V${RY(i) + 92}" stroke="#B8862F" stroke-width="4" stroke-linecap="round" fill="none"/>`).join('');
// step panels
const VIS = [
  `<div class="ob" id="ob1"><i>${M.icon('target', 40, C.gold, 2.2)}</i><div class="ol">RAVI'S SMART GOAL · FROM EP 15</div><div class="ot2">500 cups a day by March</div></div>`,
  `<div class="t2" id="ta0" style="left:0"><div class="bg"></div><div class="tav" style="background:#3A4560">M</div><div class="tk">MEENA SUGGESTS</div><div class="tv">200 cups before 10</div></div>` +
  `<div class="t2" id="ta1" style="left:436px"><div class="bg"></div><div class="tav">R</div><div class="tk">RAVI</div><div class="tv">Agrees</div><div class="ck">${M.icon('check', 24, '#fff', 3)}</div></div>`,
  `<div class="stp" id="spS" style="background:#14213D;color:#fff"><span id="spSI"></span>Meena chooses how</div>` +
  [['users', 'Extra helper at 7'], ['droplet', 'Cups washed at night']].map(([ic, s], k) => `<div class="stp" id="sp${k}" style="top:92px"><span>${M.icon(ic, 26, '#B8862F', 2.2)}</span>${s}</div>`).join(''),
  [150, 170, 185, 200].map((v, k) => `<div class="wk" id="wk${k}" style="left:${k * 218}px"><div class="wl">FRIDAY ${k + 1}</div><div class="serif wv">${v}</div><div class="wb"><div class="wf"></div></div>${k === 3 ? `<div class="ck">${M.icon('check', 22, '#fff', 3)}</div>` : ''}</div>`).join(''),
  `<div class="ob" id="ob5"><i>${M.icon('trophy', 40, C.gold, 2.2)}</i><div class="ol">MARCH APPRAISAL</div><div class="ot2">Target hit: 200 cups</div><div class="obp" id="obp"><span>${M.icon('check', 22, '#fff', 2.6)}</span>Bonus</div></div>`,
];
const STEPS = [['Set objectives', "The organization's big goal"], ['Individual goals', 'Agreed together, not ordered'], ['Action plans', 'Decide how to hit the goal'], ['Review progress', 'Check the numbers often'], ['Appraise, reward', 'Judge by results, then reward']];
const FP = [['MBO IN ACTION', 'Five steps', 'From orders to agreed goals', null]].concat(STEPS.map(([a, b], i) => [`STEP 0${i + 1} / 05`, a, b, VIS[i]]));
$('#fPans').innerHTML = FP.map(([s, t, m, v], i) => `<div class="pn" id="fn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT OUTLET 2</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('flag', 34, C.gold, 2.2)}</i><span>Ravi and Meena run outlet 2 by goals</span></div>`}</div>`).join('');
$('#spSI').innerHTML = M.icon('listChecks', 26, C.gold2, 2.2);
// benefits and limits
const BEN = [['eye', 'Clarity', 'Meena knows exactly what counts'], ['flame', 'Motivation', 'She chose it, so she wants to hit it'], ['users', 'Participation', 'The worker gets a real say']];
const LIM = [['clock', 'Takes time', 'Many goal and review meetings'], ['hash', 'Numbers only', 'Count only cups, and taste slips']];
const rowB = (pre, rows) => rows.map(([ic, t, s], i) => `<div class="br" id="${pre}${i}" style="top:${88 + i * 156}px"><div class="bg"></div><div class="bi"></div><div class="serif bt">${t}</div><div class="bs">${s}</div></div>`).join('');
$('#bRow').innerHTML = `<div class="bl" id="ben" style="left:160px;width:1600px"><div class="bg"></div><div class="lbl">WHY MBO WORKS</div>${rowB('bb', BEN)}</div>` +
  `<div class="bl" id="lim" style="left:976px;width:784px"><div class="bg"></div><div class="lbl">ITS LIMITS</div>${rowB('ll', LIM)}` +
  `<div class="br" id="llx" style="top:400px"><div class="bg" style="background:#F5F1E8"></div><div class="lbl" style="left:28px;top:16px;font-size:16px">IF MEENA ONLY COUNTS CUPS</div>` +
  `<div class="cp" id="cpA" style="left:28px;top:62px;background:#B8862F;color:#fff"><span>${M.icon('arrowU', 22, '#fff', 2.6)}</span>Cups up</div>` +
  `<div class="cp" id="cpB" style="top:62px;background:#F6E3DC;color:#B5482F"><span>${M.icon('arrowD', 22, C.red, 2.6)}</span>Taste down</div></div></div>`;
// quiz
const OPTS = ['Deadlines', 'Rewards', 'Numbers', 'Participation'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'MBO', ['Clear goals', 'Together', 'Results']], ['flag', 'Five steps', ['Objectives', 'Goals', 'Plans', 'Review', 'Reward']], ['eye', 'Benefits and limits', ['Clarity', 'Motivation', 'Time', 'Numbers']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.3) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.35));
const lift = (el, t, ta, td, amt, from, to) => { const l = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT); if (t > from && t < to) el.style.transform = Math.abs(l) > 0.001 ? `scale(${(1 + amt * l).toFixed(4)})` : 'none'; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  $('#pIdk').style.left = (36 + $('#pNo').offsetWidth + 16) + 'px';
  ['#oP', '#nP'].forEach(s => { const p = $(s); p.style.left = ((784 - p.offsetWidth) / 2) + 'px'; });
  document.querySelectorAll('#fPans .pt').forEach(p => { if (p.offsetWidth > 848) p.style.fontSize = Math.floor(84 * 848 / p.offsetWidth) + 'px'; });
  let x = 0; for (let k = 0; k < 2; k++) { const s = $('#sp' + k); s.style.left = x + 'px'; x += s.offsetWidth + 24; }
  $('#cpB').style.left = (28 + $('#cpA').offsetWidth + 16) + 'px';
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
// row of a benefits / limits card: dim before, navy while spoken, settled after
const bRow = (el, ic, t, ta, td, icCol) => {
  const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
  el.querySelector('.bg').style.background = mix(C.paper2, C.ink, act);
  el.querySelector('.bt').style.color = !seen ? C.dim : mix('#fff', C.ink, off);
  const bs = el.querySelector('.bs'); M.rise(bs, t, ta + 0.4, { st: 0.035 }); bs.style.color = mix(C.gold2, C.ink2, off);
  el.querySelector('.bi').style.background = mix('#fff', C.navy2, act);
  setIco(el.querySelector('.bi'), ic, !seen ? C.dim : (act > 0.5 ? C.gold2 : icCol), 38, 2.2);
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
  M.vis($('#exChip'), t, tF[1] + 0.6, tFout, { dy: 10, outDur: 0.3 });

  /* ===== A: orders, not goals ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // a new order every day
    M.vis($('#ord'), t, tMorph + 0.3, 1e9, { dy: 36 });
    ORD.forEach((_, i) => {
      const el = $('#job' + i), tin = i ? tDay[i] - 0.1 : tMorph + 0.6, nxt = i < 2 ? tDay[i + 1] : 1e9;
      M.vis(el, t, tin, 1e9, { dy: 24, sc: 0.94, sp: M.POP });
      const act = on01(t, tDay[i], nxt), old = M.io((t - nxt) / 0.35);
      el.style.background = mix(mix(C.paper, C.ink, act), C.off, old);
      el.querySelector('.jd').style.color = mix(mix(C.muted, C.gold2, act), C.dim, old);
      el.querySelector('.jt').style.color = mix(mix(C.ink, '#fff', act), C.dim, old);
      el.querySelector('.av').style.background = mix(C.gold, C.dim, old);
      M.rise(el.querySelector('.jt'), t, i ? tOrd[i] - 0.1 : tMorph + 0.8, { st: 0.05 });
    });
    // Meena: no say, motivation drains
    M.vis($('#say'), t, tMorph + 0.42, 1e9, { dy: 36 });
    M.vis($('#mAv'), t, tMorph + 0.6, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.vis($('#mtl'), t, tMorph + 0.7, 1e9, { dy: 10 }); M.vis($('#mbar'), t, tMorph + 0.75, 1e9, { dy: 10 });
    const mv = 80 * M.o3((t - tMorph - 0.9) / 0.8) - 55 * M.io((t - tStops + 0.2) / 1.1);
    $('#mfill').style.width = (600 * Math.max(0, mv) / 100).toFixed(1) + 'px';
    const drop = M.io((t - tStops) / 0.5);
    $('#mfill').style.background = mix(C.gold, C.red, drop);
    const mval = $('#mval'); M.vis(mval, t, tMorph + 0.9, 1e9, { dy: 10 }); M.setT(mval, Math.round(Math.max(0, mv)) + '%'); mval.style.color = mix(C.ink, C.red, drop);
    M.vis($('#pNo'), t, tSay - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#pIdk'), t, tNobody - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: what is MBO? ===== */
  const dOn = t >= tTu - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#dqs'), t, wt('D1', 'management') - 0.05, tD2 - 0.1, { dy: 12, outDur: 0.25 });
    // Drucker and his book
    const tSrcOut = tD3 - 0.3;
    M.vis($('#src'), t, tD2 + 0.1, tSrcOut, { dy: 36, ...o });
    M.vis($('#book'), t, tD2 + 0.3, 1e9, { dy: 20, sc: 0.92, sp: M.POP });
    M.vis($('#srcL'), t, tD2 + 0.45, 1e9, { dy: 10 });
    M.rise($('#srcN'), t, tPeter - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#srcHr'), t, tFamous - 0.1, 1e9, { dy: 0 }); M.vis($('#srcL2'), t, tFamous, 1e9, { dy: 10 });
    M.rise($('#srcF'), t, tFamous + 0.1, { st: 0.06 });
    M.rise($('#srcM'), t, tBook - 0.05, { st: 0.04 });
    const bk = on01(t, tBook, tSrcOut, 0.3); $('#srcM').style.color = mix(C.ink2, C.gold, bk);
    // definition and three key words
    const tQout = tD4 - 0.3;
    M.vis($('#defbar'), t, tD3 + 0.1, tQout, { dy: 24, ...o });
    QW.forEach(([ic], i) => {
      const el = $('#qw' + i), ta = tKey[i], td = i < 2 ? tKey[i + 1] : T1('D3') - 0.15;
      M.vis(el, t, tD3 + 0.25 + i * 0.08, tQout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.qt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.qs').style.color = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.qi').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.qi'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 40, 2.2);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      const qx = el.querySelector('.qx'); M.vis(qx, t, ta + 0.35, 1e9, { dy: 10 }); qx.style.color = mix(C.muted, '#8C96AE', act);
      const qa = el.querySelector('.qa'); M.rise(qa, t, ta + 0.45, { st: 0.05 }); qa.style.color = mix(C.ink, '#fff', act);
      lift(el, t, ta, td, 0.02, tD3 + 1, tQout);
    });
    // orders vs agreed together
    const ow0 = $('#ow0'), dimO = M.io((t - tHe + 0.25) / 0.4);
    M.vis(ow0, t, tD4 + 0.05, tDout, { dy: 36, ...o });
    ow0.querySelector('.bg').style.background = mix(C.card, C.off, dimO);
    ow0.querySelector('.ot').style.color = mix(C.ink, C.dim, dimO);
    M.vis($('#oR'), t, tD4 + 0.2, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); M.vis($('#oRn'), t, tD4 + 0.3, 1e9, { dy: 10 });
    M.draw($('#oL'), t, tD4 + 0.4, 0.35, M.o3); $('#oAH').style.opacity = M.clamp((t - tD4 - 0.7) / 0.1).toFixed(3);
    M.vis($('#oM'), t, tD4 + 0.55, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); M.vis($('#oMn'), t, tD4 + 0.65, 1e9, { dy: 10 });
    M.vis($('#oP'), t, tStopsD, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    $('#oR').style.background = mix(C.gold, C.dim, dimO); $('#oM').style.background = mix(C.ink2, C.dim, dimO);
    ['#oRn', '#oMn'].forEach(s => $(s).style.color = mix(C.ink, C.dim, dimO));
    $('#oA').setAttribute('stroke', mix('#D9CFBC', '#E4DCCD', dimO));
    M.vis($('#ow1'), t, tHe - 0.15, tDout, { dy: 36, ...o });
    M.vis($('#nR'), t, tHe, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); M.vis($('#nRn'), t, tHe + 0.1, 1e9, { dy: 10 });
    M.vis($('#nM'), t, tMeenaD - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); M.vis($('#nMn'), t, tMeenaD + 0.05, 1e9, { dy: 10 });
    M.draw($('#nL0'), t, tAgreeD - 0.25, 0.4, M.o3); M.draw($('#nL1'), t, tAgreeD - 0.15, 0.4, M.o3);
    M.vis($('#nT'), t, tAgreeD + 0.2, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.vis($('#nP'), t, tTargets - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== F: the five steps ===== */
  const fOn = t >= tF0 - 0.1 && t < tB0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#casc'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...fo });
    M.vis($('#fp'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...fo });
    CR.forEach((_, i) => {
      const el = $('#cr' + i); M.vis(el, t, tF0 + 0.35 + i * 0.07, 1e9, { dy: 20, sp: M.SOFT });
      const ta = tF[i], td = i < 4 ? tF[i + 1] : T1('F5') + 0.1, act = M.io((t - ta) / 0.3), done = M.io((t - td) / 0.35), seen = t >= ta;
      el.querySelector('.bg').style.background = mix(mix(C.paper2, C.ink, act), C.paper, done);
      el.querySelector('.ct').style.color = !seen ? C.dim : mix('#fff', C.ink, done);
      const cn = el.querySelector('.cn');
      cn.style.background = mix(mix('#fff', C.gold, act), C.gold, done); cn.style.color = !seen ? C.dim : '#fff';
      if (done > 0.5 && !cn._c) { cn._c = 1; cn.innerHTML = M.icon('check', 22, '#fff', 3); } else if (done <= 0.5 && cn._c) { cn._c = 0; cn.textContent = '0' + (i + 1); }
      el.querySelectorAll('.ca').forEach((a, k) => M.vis(a, t, ta + 0.5 + k * 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }));
      if (i < 4) M.draw($('#cl' + i), t, tF[i + 1] - 0.05, 0.3, M.o3);
      lift(el, t, ta, td, 0.02, tF0 + 1.2, tFout);
    });
    FP.forEach((_, k) => {
      const tin = k ? tF[k - 1] : tF0 + 0.5, tout = k < 5 ? (k ? tF[k] : tF[0]) - 0.14 : 1e9;
      const pn = $('#fn' + k); if (!swap(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        const ob = $('#ob1'); M.vis(ob, t, tin + 0.6, 1e9, { dy: 14 });
        const sm = on01(t, tSmartF, 1e9); ob.style.background = mix(C.paper, C.gold3, sm);
        M.rise(ob.querySelector('.ot2'), t, tFive - 0.1, { st: 0.05 });
      } else if (k === 2) {
        M.vis($('#ta0'), t, tSugg - 0.1, 1e9, { dy: 14, sc: 0.94, sp: M.POP });
        M.rise($('#ta0 .tv'), t, tTwo - 0.05, { st: 0.05 });
        M.vis($('#ta1'), t, tRaviF - 0.1, 1e9, { dy: 14, sc: 0.94, sp: M.POP });
        M.rise($('#ta1 .tv'), t, tAgrees - 0.05, { st: 0.05 });
        M.vis($('#ta1 .ck'), t, tAgrees + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
        const ag = M.io((t - tAgrees) / 0.3); $('#ta1 .bg').style.background = mix(C.paper, C.gold3, ag); $('#ta0 .bg').style.background = mix(C.paper, C.gold3, ag);
      } else if (k === 3) {
        M.vis($('#spS'), t, tDecides - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        M.vis($('#sp0'), t, tHelper - 0.05, 1e9, { dy: 12 }); M.vis($('#sp1'), t, tCupsF - 0.05, 1e9, { dy: 12 });
      } else if (k === 4) {
        for (let s = 0; s < 4; s++) {
          const el = $('#wk' + s); M.vis(el, t, tFri - 0.1 + s * 0.16, 1e9, { dy: 14 });
          const v = [150, 170, 185, 200][s], g = M.o3((t - tCheck - s * 0.3) / 0.6);
          el.querySelector('.wf').style.width = (150 * v / 200 * g).toFixed(1) + 'px';
          if (s === 3) { M.vis(el.querySelector('.ck'), t, tEarly - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); el.style.background = mix(C.paper, C.gold3, M.io((t - tEarly + 0.1) / 0.3)); }
        }
      } else if (k === 5) {
        const ob = $('#ob5'); M.vis(ob, t, tin + 0.6, 1e9, { dy: 14 });
        M.rise(ob.querySelector('.ot2'), t, tHits - 0.1, { st: 0.05 });
        M.vis($('#obp'), t, tBonus - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        ob.style.background = mix(C.paper, C.gold3, M.io((t - tBonus) / 0.3));
      }
    });
  }

  /* ===== B: benefits, then limits ===== */
  const bOn = t >= tB0 - 0.1 && t < tQ + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    const ben = $('#ben'); M.vis(ben, t, tB0 + 0.1, 1e9, { dy: 36 });
    const sh = M.spring(t - tL0 + 0.35, M.HEAVY);              // lone card shrinks when its sibling arrives
    ben.style.width = M.lerp(1600, 784, sh).toFixed(2) + 'px';
    BEN.forEach(([ic], i) => { const el = $('#bb' + i); M.vis(el, t, tB0 + 0.3 + i * 0.08, 1e9, { dy: 20 }); bRow(el, ic, t, tB[i], i < 2 ? tB[i + 1] : tL0 - 0.4, C.gold); });
    M.vis($('#lim'), t, tL0 + 0.3, 1e9, { dx: 60, dy: 0 });
    LIM.forEach(([ic], i) => { const el = $('#ll' + i); M.vis(el, t, tL0 + 0.4 + i * 0.08, 1e9, { dy: 20 }); bRow(el, ic, t, tL[i], i < 1 ? tL[i + 1] : T1('L2') + 0.15, C.red); });
    M.vis($('#llx'), t, tL0 + 0.56, 1e9, { dy: 20 });
    [['#cpA', tChase, C.gold, '#fff', 'arrowU'], ['#cpB', tTaste, C.redBg, C.red, 'arrowD']].forEach(([s, tw, bg, fg, ic], k) => {
      const el = $(s), g = M.io((t - tw + 0.05) / 0.3); M.vis(el, t, tL0 + 0.75 + k * 0.08, 1e9, { dy: 12 });
      el.style.background = mix('#E9E3D7', bg, g); el.style.color = mix(C.dim, fg, g);
      setIco(el.querySelector('span'), ic, g > 0.5 ? fg : C.dim, 22, 2.6);
      if (t > tw && t < tw + 0.45) el.style.transform = `scale(${(1 + 0.06 * Math.sin(Math.PI * (t - tw) / 0.45)).toFixed(4)})`; else if (t >= tw + 0.45 && el.style.transform !== 'none') el.style.transform = 'none';
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
      bg.style.background = right ? mix(C.card, C.ink, r) : mix(C.card, C.off, r);
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
