// MBA - Principles of Management, Ep 25: Delegation of Authority
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E', off: '#F0EBE1' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 21a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  fileCheck: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'm9 15 2 2 4-4'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tRefund = wt('C1', 'refund'), tCall1 = wt('C1', 'call'), tMilk = wt('C2', 'milk'), tCall2 = wt('C2', 'calls');
const tForty = wt('C3', 'forty'), tWait = wt('C3', 'wait');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tAuthD = wt('D2', 'authority'), tTask = wt('D2', 'task');
const tD3 = T0('D3'), tToday = wt('D3', 'today'), tApprove = wt('D3', 'approve'), tOrder = wt('D3', 'order'), tDout = T0('E0') - 0.32;
const tE0 = T0('E0'), tE = [T0('E1'), T0('E2'), T0('E3')], tDuty = wt('E1', 'duty'), tPower = wt('E2', 'power'), tAnsw = wt('E3', 'answerable'), tFri = wt('E3', 'Friday'), tEout = T0('M0') - 0.32;
const tM0 = T0('M0'), tMoves = wt('M0', 'moves'), tPasses = wt('M1', 'passes'), tAssigned = wt('M2', 'assigned'), tAccepts = wt('M2', 'accepts');
const tCannot = wt('M3', 'cannot'), tMeenaM = wt('M4', 'Meena'), tStill = wt('M4', 'still'), tMout = T0('P0') - 0.32;
const tP0 = T0('P0'), tParity = wt('P0', 'parity'), tP1 = T0('P1'), tKeep = wt('P2', 'keep'), tCantP = wt('P2', 'cannot'), tFail = wt('P2', 'fail');
const tSpend = wt('P3', 'spend'), tEnough = wt('P3', 'Enough'), tPout = T0('B0') - 0.32;
const tB0 = T0('B0'), tB = [T0('B1'), T0('B2'), T0('B3')], tFive = wt('B1', 'five'), tReal = wt('B2', 'real'), tOneMin = wt('B3', 'one');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAnsQ = T0('A1') - 0.02, tTakeQ = wt('A1', 'Accountability');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['team', 'authority', 'task'].map(w => wt('S2', w)), ['responsibility', 'authority', 'accountability', 'match'].map(w => wt('S3', w)), ['Authority', 'accountability'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#phP').setAttribute('d', M.IC.phone[0]);
// Meena's questions
const ASK = [['DECISION 1', 'Customer refund?'], ['DECISION 2', 'Milk running low']];
$('#jobRow').innerHTML = ASK.map(([d, o], i) => `<div class="job" id="job${i}" style="left:${36 + i * 436}px"><div class="jd">${d}</div><div class="av">M</div><div class="jt">${o}</div><div class="jp"><span>${M.icon('phone', 20, C.red, 2.4)}</span><span>Calls Ravi</span></div></div>`).join('');
$('#dots').innerHTML = Array.from({ length: 40 }, (_, k) => `<i id="dt${k}" style="left:${(k % 20) * 29}px;top:${14 + Math.floor(k / 20) * 40}px"></i>`).join('');
$('#pWI').innerHTML = M.icon('clock', 22, C.red, 2.4);
// definition + hand over
$('#defI').innerHTML = M.icon('key', 36, C.gold, 2.2);
const TASKS = [['coin', 'Approve refunds'], ['package', 'Order supplies']];
const TX0 = 264, TX1 = 816;
$('#hTasks').innerHTML = TASKS.map(([ic, s], k) => `<div class="tk" id="tk${k}" style="left:${TX0}px;top:${48 + k * 152}px"><div class="bg"></div><div class="ti">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="tl">RAVI DECIDES</div><div class="tt">${s}</div></div>`).join('');
$('#hPI').innerHTML = M.icon('check', 22, '#fff', 2.6);
// triangle: three linked parts
const ND = [['clipboard', 'Responsibility', 392, 176, 'up'], ['key', 'Authority', 190, 404, 'dn'], ['fileCheck', 'Accountability', 594, 404, 'dn']];
$('#nodes').innerHTML = ND.map(([, l, x, y, p], i) => `<div class="nd" id="nd${i}" style="left:${x - 70}px;top:${y - 70}px"><div class="bg"></div><div class="ni"></div></div><div class="serif ndl" id="ndl${i}" style="left:${x - 150}px;top:${p === 'up' ? y - 128 : y + 84}px">${l}</div>`).join('');
const EDG = [[0, 1], [1, 2], [2, 0]];
$('#triE').innerHTML = EDG.map(([a, b], k) => `<path id="eg${k}" d="M${ND[a][2]} ${ND[a][3]} L${ND[b][2]} ${ND[b][3]}" stroke="#E2DACB"/><path id="eG${k}" d="M${ND[a][2]} ${ND[a][3]} L${ND[b][2]} ${ND[b][3]}" stroke="#B8862F"/>`).join('');
const PANES = [['THE BIG IDEA', 'Three parts', 'Every delegation has all three', 'link', 'A duty, the power, and', 'a report back'],
  ['PART 01 / 03', 'Responsibility', 'The duty given to someone', 'clipboard', 'Keep outlet 2', 'running well'],
  ['PART 02 / 03', 'Authority', 'The power to act and decide', 'key', 'Approve refunds and order', 'milk, without calling Ravi'],
  ['PART 03 / 03', 'Accountability', 'Answerable for the results', 'fileCheck', 'Every Friday, Meena', 'reports to Ravi']];
$('#pans').innerHTML = PANES.map(([s, t, m, ic, e1, e2], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT OUTLET 2</div><div class="pe"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><span><b>${e1}</b><b>${e2}</b></span></div></div>`).join('');
// what moves down: tokens, slots, arrows
const TOK = [['key', 'Authority'], ['clipboard', 'Responsibility'], ['fileCheck', 'Accountability']];
const TOKX = k => 584 + k * 392, YUP = 318, YDN = 698;
$('#slots').innerHTML = TOK.map((_, k) => `<div class="slot" id="slU${k}" style="left:${TOKX(k)}px;top:${YUP}px"></div><div class="slot" id="slD${k}" style="left:${TOKX(k)}px;top:${YDN}px"></div>`).join('') +
  `<div class="tok" id="rep" style="left:${TOKX(2)}px;top:${YDN}px"><div class="bg" style="background:#F3EAD6"></div><div class="oi"></div><div class="ol">MEENA</div><div class="ot">Answers to Ravi</div></div>`;
$('#toks').innerHTML = TOK.map(([ic, n], k) => `<div class="tok" id="to${k}" style="left:${TOKX(k)}px;top:${YUP}px"><div class="bg"></div><div class="oi"></div><div class="ol">RAVI HOLDS</div><div class="ot">${n}</div><div class="ok">${M.icon('check', 20, '#fff', 3)}</div></div>`).join('');
const AX = k => TOKX(k) - 160 + 52;   // arrow x inside #mid (lines up with the token icon)
const head = (x, y, a, id, col) => `<path id="${id}" d="M-10 -12 L3 0 L-10 12" transform="translate(${x} ${y}) rotate(${a})" stroke="${col}"/>`;
$('#mArr').innerHTML = [0, 1].map(k => `<path id="ma${k}" d="M${AX(k)} 10 V160" stroke="#B8862F"/>${head(AX(k), 164, 90, 'mh' + k, '#B8862F')}`).join('') +
  `<path id="ma2" d="M${AX(2)} 10 V74" stroke="#B5482F" stroke-dasharray="2 12"/><g id="mx" transform="translate(${AX(2)} 96)" stroke="#B5482F"><path d="M-12 -12 L12 12"/><path d="M12 -12 L-12 12"/></g>`;
const MP = [['Delegated', 'arrowD', C.gold, '#fff'], ['Accepted', 'check', C.gold, '#fff'], ['Stays with Ravi', 'lock', C.ink, '#fff']];
$('#mPills').innerHTML = MP.map(([s, ic, bg, fg], k) => `<div class="mp" id="mp${k}" style="left:${AX(k) + 40}px;top:68px;background:${bg};color:${fg}"><span>${M.icon(ic, 20, k === 2 ? C.gold2 : fg, 2.6)}</span>${s}</div>`).join('');
$('#midI').innerHTML = M.icon('arrowD', 24, C.muted, 2.4);
// parity
const BAR = 1100;
// benefits
const BEN = [['clock', 'Frees Ravi', 'More time to run the chain', 'bars', [['Calls before', 280, '40'], ['Calls after', 35, '5']]],
  ['cap', 'Grows the team', 'Meena learns to decide', 'chips', ['Approves refunds', 'Orders supplies']],
  ['zap', 'Faster decisions', 'No waiting for Ravi', 'bars', [['Refund before', 280, '20 min'], ['Refund after', 14, '1 min']]]];
$('#bRow').innerHTML = BEN.map(([ic, t, s, kind, items], i) => `<div class="bc" id="bc${i}" style="left:${160 + i * 544}px"><div class="bg" style="position:absolute;inset:0;border-radius:28px;background:#fff;box-shadow:0 18px 40px -12px rgba(20,33,61,.14)"></div><div class="bi"></div><div class="bt">${t}</div><div class="bs">${s}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div>` +
  (kind === 'bars' ? items.map(([l], k) => `<div class="mb" id="mb${i}${k}" style="top:${370 + k * 96}px"><div class="ml">${l}</div><div class="mt"></div><div class="mv"></div></div>`).join('')
    : items.map((l, k) => `<div class="dc" id="dc${k}" style="top:${374 + k * 92}px"><div class="di">${M.icon('check', 22, '#fff', 3)}</div><div class="dt">${l}</div></div>`).join('')) + `</div>`).join('');
// quiz
const OPTS = ['Meena', 'Kabir', 'The customer', 'Ravi'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('lock', 44, C.gold2, 2.4);
// recap
const ROWS = [['key', 'Delegation', ['Team member', 'Authority', 'Task']], ['link', 'Three parts', ['Responsibility', 'Authority', 'Accountability', 'Parity']], ['arrowD', 'The key rule', ['Authority moves down', 'Accountability stays up']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.3) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.35));
const lift = (el, t, ta, td, amt, from, to) => { const l = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT); if (t > from && t < to) el.style.transform = Math.abs(l) > 0.001 ? `scale(${(1 + amt * l).toFixed(4)})` : 'none'; };
const pulse = (el, t, tw, amt = 0.05) => { if (t > tw && t < tw + 0.45) el.style.transform = `scale(${(1 + amt * Math.sin(Math.PI * (t - tw) / 0.45)).toFixed(4)})`; else if (t >= tw + 0.45 && el.style.transform !== 'none') el.style.transform = 'none'; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const hp = $('#hPill'); hp.style.left = ((1600 - hp.offsetWidth) / 2) + 'px';
  document.querySelectorAll('#pans .pt').forEach(p => { if (p.offsetWidth > 688) p.style.fontSize = Math.floor(76 * 688 / p.offsetWidth) + 'px'; });
  document.querySelectorAll('.bc .bt').forEach(p => { if (p.offsetWidth > 432) p.style.fontSize = Math.floor(44 * 432 / p.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let px = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = px + 'px'; px += p.offsetWidth + 16; }); });
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
  if (t < tP0) M.vis($('#exChip'), t, tForty + 0.2, tT - 0.1, { dy: 10, outDur: 0.3 });
  else M.vis($('#exChip'), t, tSpend, tQ - 0.3, { dy: 10, outDur: 0.3 });

  /* ===== A: every small decision waits for Ravi ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // phone pops in at Ravi's ear on the first call
    const ph = M.spring(t - tCall1, M.POP), pg = $('#phone'); M.hide(pg, t < tCall1);
    pg.setAttribute('transform', `translate(392 70) scale(${(0.4 + 0.6 * ph).toFixed(4)})`); pg.style.opacity = M.clamp((t - tCall1) / 0.1);
    // Meena's two questions
    M.vis($('#ask'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const tq = [tRefund, tMilk], tc = [tCall1, tCall2];
    ASK.forEach((_, i) => {
      const el = $('#job' + i); M.vis(el, t, tMorph + 0.55 + i * 0.1, 1e9, { dy: 24, sc: 0.94, sp: M.POP });
      const seen = t >= tq[i] - 0.1, act = on01(t, tq[i] - 0.1, i ? tForty : tq[1] - 0.1);
      el.style.background = mix(C.paper, C.ink, act);
      el.querySelector('.jd').style.color = mix(C.muted, C.gold2, act);
      const jt = el.querySelector('.jt'); jt.style.color = !seen ? C.dim : mix(C.ink, '#fff', act);
      M.rise(jt, t, tMorph + 0.75 + i * 0.1, { st: 0.05 });
      M.vis(el.querySelector('.jp'), t, tc[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    });
    // calls counter
    M.vis($('#calls'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const n = (t >= tCall1 ? 1 : 0) + (t >= tCall2 ? 1 : 0) + 38 * M.o5((t - tForty) / 1.3);
    const cn = $('#cN'); M.vis(cn, t, tMorph + 0.6, 1e9, { dy: 10 }); M.setT(cn, String(Math.round(n)));
    const hot = M.io((t - tForty) / 0.4); cn.style.color = mix(C.ink, C.red, hot);
    M.vis($('#cU'), t, tMorph + 0.7, 1e9, { dy: 8 });
    M.vis($('#dots'), t, tMorph + 0.7, 1e9, { dy: 10 });
    for (let k = 0; k < 40; k++) { const d = $('#dt' + k); const c = k < Math.round(n) ? (k < 2 ? C.gold : C.red) : C.paper2; if (d._c !== c) { d._c = c; d.style.background = c; } }
    M.vis($('#pWait'), t, tWait - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: what is delegation? ===== */
  const dOn = t >= tTu - 0.05 && t < tE0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#dqs'), t, wt('D1', 'authority') - 0.05, tD2 - 0.1, { dy: 12, outDur: 0.25 });
    M.vis($('#dlbl'), t, tD2 + 0.1, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    M.rise($('#quote1'), t, tD2 + 0.15, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, tAuthD - 0.35, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    // definition bar + the hand over
    M.vis($('#defbar'), t, tD3 + 0.12, tDout, { dy: 24, ...o });
    M.vis($('#hand'), t, tD3 + 0.25, tDout, { dy: 36, ...o });
    M.vis($('#hR'), t, tD3 + 0.4, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.rise($('#hRn'), t, tD3 + 0.5, { st: 0.05 }); M.vis($('#hRt'), t, tD3 + 0.6, 1e9, { dy: 8 });
    M.vis($('#hM'), t, wt('D3', 'Meena') - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.rise($('#hMn'), t, wt('D3', 'Meena') + 0.05, { st: 0.05 }); M.vis($('#hMt'), t, wt('D3', 'Meena') + 0.15, 1e9, { dy: 8 });
    M.draw($('#hLine'), t, tD3 + 0.6, 0.6, M.o3);
    const tm = [tApprove, tOrder];
    TASKS.forEach((_, k) => {
      const el = $('#tk' + k); M.vis(el, t, tD3 + 0.7 + k * 0.1, 1e9, { dy: 20, sp: M.SOFT });
      const mv = M.spring(t - tm[k] + 0.05, M.HEAVY), arr = M.io((t - tm[k] - 0.35) / 0.3);
      el.style.left = M.lerp(TX0, TX1, mv).toFixed(2) + 'px';
      el.querySelector('.bg').style.background = mix(C.paper2, C.gold3, arr);
      M.setT(el.querySelector('.tl'), arr > 0.5 ? 'MEENA DECIDES' : 'RAVI DECIDES');
      el.querySelector('.tl').style.color = mix(C.muted, C.gold, arr);
    });
    M.vis($('#hPill'), t, tToday - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== E: three linked parts ===== */
  const eOn = t >= tE0 - 0.1 && t < tM0 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#tri'), t, tE0 + 0.1, tEout, { dx: -60, dy: 0, ...fo });
    M.vis($('#panel'), t, tE0 + 0.25, tEout, { dx: 60, dy: 0, ...fo });
    EDG.forEach((_, k) => M.draw($('#eg' + k), t, tE0 + 0.4 + k * 0.15, 0.5, M.o3));
    M.draw($('#eG0'), t, tPower - 0.1, 0.5, M.o3); M.draw($('#eG1'), t, tAnsw - 0.1, 0.5, M.o3); M.draw($('#eG2'), t, tFri - 0.1, 0.5, M.o3);
    M.vis($('#hubT'), t, tE0 + 0.5, 1e9, { dy: 0, sc: 0.7, sp: M.POP });
    ND.forEach(([ic], i) => {
      const el = $('#nd' + i), ta = tE[i], td = i < 2 ? tE[i + 1] : T1('E3') + 0.1;
      M.vis(el, t, tE0 + 0.35 + i * 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.gold, act); bg.style.borderColor = seen ? C.gold : C.line;
      setIco(el.querySelector('.ni'), ic, act > 0.5 ? '#fff' : (seen ? C.gold : C.dim), 52, 2);
      const lb = $('#ndl' + i); M.vis(lb, t, tE0 + 0.45 + i * 0.1, 1e9, { dy: 10 }); lb.style.color = seen ? C.ink : C.dim;
      lift(el, t, ta, td, 0.08, tE0 + 1.2, tEout);
    });
    PANES.forEach((_, k) => {
      const tin = k ? tE[k - 1] : tE0 + 0.5, tout = k < 3 ? (k ? tE[k] : tE[0]) - 0.14 : 1e9;
      const pn = $('#pn' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      const te = tin + 0.62;
      M.vis(pn.querySelector('.pe'), t, te, tout, { dy: 18, ...oo });
    });
  }

  /* ===== M: what moves down, what stays up ===== */
  const mOn = t >= tM0 - 0.1 && t < tP0 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#lvR'), t, tM0 + 0.1, tMout, { dy: 36, ...o });
    M.vis($('#lvM'), t, tM0 + 0.25, tMout, { dy: 36, ...o });
    M.vis($('#mid'), t, tM0, tMout, { dy: 0, fade: 0.01, ...o });
    M.vis($('#midL'), t, tMoves - 0.05, 1e9, { dy: 10 });
    TOK.forEach((_, k) => {
      M.vis($('#slU' + k), t, tM0 + 0.3 + k * 0.06, tMout, { dy: 0, ...o });
      M.vis($('#slD' + k), t, tM0 + 0.45 + k * 0.06, tMout, { dy: 0, ...o });
    });
    const tMv = [tPasses - 0.1, tAssigned - 0.1];
    TOK.forEach(([ic], k) => {
      const el = $('#to' + k); M.vis(el, t, tM0 + 0.4 + k * 0.1, tMout, { dy: 20, ...o });
      let y = YUP, ol = 'RAVI HOLDS', bg = C.paper2, icc = C.gold, icn = ic, tc = C.ink, lc = C.muted, ib = '#fff';
      if (k < 2) {
        const mv = M.spring(t - tMv[k], M.HEAVY), land = M.io((t - tMv[k] - 0.55) / 0.3);
        y = M.lerp(YUP, YDN, mv); if (land > 0.5) ol = 'MEENA HOLDS';
        bg = mix(C.paper2, C.gold3, land);
        M.vis(el.querySelector('.ok'), t, k ? tAccepts : tMv[0] + 0.7, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      } else {
        M.hide(el.querySelector('.ok'), true);
        const lk = M.io((t - tCannot) / 0.3);
        bg = mix(C.paper2, C.ink, lk); tc = mix(C.ink, '#fff', lk); lc = mix(C.muted, C.gold2, lk); ib = mix('#fff', C.navy2, lk);
        if (lk > 0.5) { icn = 'lock'; icc = C.gold2; }
        if (t >= tStill) ol = 'FOR ALL OF CHAI CORNER';
        pulse(el, t, tCannot, 0.04);
      }
      if (k < 2) el.style.top = y.toFixed(2) + 'px';
      el.querySelector('.bg').style.background = bg; el.querySelector('.ot').style.color = tc;
      const lb = el.querySelector('.ol'); M.setT(lb, ol); lb.style.color = lc;
      const oi = el.querySelector('.oi'); oi.style.background = ib; setIco(oi, icn, icc, 32, 2.2);
    });
    // arrows and labels in the middle band
    M.draw($('#ma0'), t, tPasses - 0.05, 0.5, M.o3); $('#mh0').style.opacity = M.clamp((t - tPasses - 0.4) / 0.1).toFixed(3);
    M.draw($('#ma1'), t, tAssigned - 0.05, 0.5, M.o3); $('#mh1').style.opacity = M.clamp((t - tAssigned - 0.4) / 0.1).toFixed(3);
    M.draw($('#ma2'), t, tCannot - 0.1, 0.35, M.o3);
    const mx = $('#mx'), xp = M.spring(t - tCannot - 0.2, M.POP); M.hide(mx, t < tCannot + 0.2);
    mx.setAttribute('transform', `translate(${AX(2)} 96) scale(${(0.3 + 0.7 * xp).toFixed(4)})`);
    M.vis($('#mp0'), t, wt('M1', 'down') - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mp1'), t, tAccepts + 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mp2'), t, wt('M3', 'delegated') - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // Meena answers to Ravi
    const rep = $('#rep'); M.vis(rep, t, tMeenaM - 0.05, tMout, { dy: 20, sc: 0.94, sp: M.POP, ...o });
    setIco(rep.querySelector('.oi'), 'arrowU', C.gold, 32, 2.4);
  }

  /* ===== P: principle of parity ===== */
  const pOn = t >= tP0 - 0.1 && t < tB0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#par'), t, tP0 + 0.1, tPout, { dy: 36, outDur: 0.3, ody: -16 });
    M.rise($('#parT'), t, tP0 + 0.35, { st: 0.06, sp: M.HEAVY });
    M.vis($('#parHr'), t, tP0 + 0.6, 1e9, { dy: 0 });
    // responsibility: the whole job
    const b0 = $('#pb0'); M.vis(b0, t, tP0 + 0.75, 1e9, { dy: 16 });
    const w0 = BAR * M.o3((t - tKeep) / 0.7);
    b0.querySelector('.bf').style.width = w0.toFixed(1) + 'px'; b0.querySelector('.bf').style.background = C.ink;
    const v0 = b0.querySelector('.bv'); v0.style.left = (BAR + 24) + 'px'; M.setT(v0, '₹5,000 a day'); v0.style.opacity = M.clamp((t - tKeep - 0.4) / 0.3).toFixed(3); v0.style.color = C.ink;
    // authority: nothing, then matched
    const b1 = $('#pb1'); M.vis(b1, t, tP0 + 0.85, 1e9, { dy: 16 });
    const g = M.o5((t - tSpend) / 0.9), w1 = 24 + (BAR - 24) * g;
    const bf1 = b1.querySelector('.bf'); bf1.style.width = (t < tCantP ? 0 : w1).toFixed(1) + 'px'; bf1.style.background = mix(C.red, C.gold, M.io((t - tSpend) / 0.4));
    const v1 = b1.querySelector('.bv'); v1.style.left = ((t < tSpend ? 24 : w1) + 24).toFixed(1) + 'px'; v1.style.opacity = M.clamp((t - tCantP) / 0.2).toFixed(3);
    M.setT(v1, t < tSpend ? '₹0' : '₹' + (Math.round(5000 * g / 50) * 50).toLocaleString('en-IN') + (g > 0.995 ? ' a day' : ''));
    v1.style.color = mix(C.red, C.ink, M.io((t - tSpend) / 0.4));
    // verdict pill
    const pp = $('#parP'), ok = t >= tEnough - 0.05;
    M.vis(pp, t, tFail - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.setT($('#parPT'), ok ? 'Enough power for the job, and no more' : 'No money for milk: sure to fail');
    pp.style.background = ok ? C.gold : C.redBg; pp.style.color = ok ? '#fff' : C.red;
    setIco($('#parPI'), ok ? 'check' : 'alert', ok ? '#fff' : C.red, 22, 2.4);
    pulse(pp, t, tEnough - 0.05, 0.05);
  }

  /* ===== B: why delegate ===== */
  const bOn = t >= tB0 - 0.1 && t < tQ + 0.05; M.hide($('#sB'), !bOn);
  if (bOn) {
    BEN.forEach(([ic, , , kind, items], i) => {
      const el = $('#bc' + i), ta = tB[i], td = i < 2 ? tB[i + 1] : T1('B3') + 0.3;
      M.vis(el, t, tB0 + 0.15 + i * 0.1, 1e9, { dy: 36 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelector('.bt').style.color = !seen ? C.dim : mix('#fff', C.ink, off);
      const bs = el.querySelector('.bs'); bs.style.color = !seen ? C.dim : mix(C.gold2, C.ink2, off);
      const bi = el.querySelector('.bi'); bi.style.background = mix(C.paper, C.navy2, act); setIco(bi, ic, !seen ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 44, 2.2);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      const px = el.querySelector('.px'); M.vis(px, t, ta + 0.3, 1e9, { dy: 10 }); px.style.color = mix(C.muted, '#8C96AE', act);
      if (kind === 'bars') {
        const tg = i === 0 ? tFive : tOneMin;
        items.forEach(([, w, v], k) => {
          const mb = $('#mb' + i + k); M.vis(mb, t, ta + 0.4 + k * 0.1, 1e9, { dy: 12 });
          const mt = mb.querySelector('.mt'), mv = mb.querySelector('.mv');
          const ww = k === 0 ? w * M.o3((t - ta - 0.5) / 0.6) : w * M.o5((t - tg) / 0.7);
          mt.style.width = ww.toFixed(1) + 'px';
          mt.style.background = k === 1 ? C.gold : mix('#E7E0D2', C.navy3, act);
          mv.style.left = (ww + 16).toFixed(1) + 'px'; M.setT(mv, v + (i === 0 ? ' calls' : ''));
          mv.style.opacity = M.clamp(ww / 12).toFixed(3);
          mv.style.color = mix(k === 1 ? C.ink : C.muted, k === 1 ? '#fff' : '#8C96AE', act);
          mb.querySelector('.ml').style.color = mix(C.muted, '#8C96AE', act);
        });
        if (i === 0) M.setT($('#mb00 .mv'), '40 calls');
      } else {
        items.forEach((_, k) => {
          const dc = $('#dc' + k); M.vis(dc, t, ta + 0.45 + k * 0.12, 1e9, { dy: 14, sc: 0.94, sp: M.POP });
          dc.style.background = mix(C.paper, C.navy2, act); dc.querySelector('.dt').style.color = mix(C.ink, '#fff', act);
        });
      }
      lift(el, t, ta, td, 0.02, tB0 + 1, tQ);
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Who') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Who') + 0.2 + i * 0.08, 1e9, { dy: 40 });
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
