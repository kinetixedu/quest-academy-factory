// MBA - Principles of Management, Ep 19: Controlling
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
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  bookOpen: ['M12 7v14', 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFive = wt('H2', 'five'), tWork = wt('H2', 'working');
const tBad = [T0('C1'), T0('C2'), wt('C3', 'nobody')], tCounted = wt('C3', 'counted');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tLit = [wt('D2', 'plan'), wt('D2', 'actual'), wt('D2', 'fixing')];
const tD3 = T0('D3'), tAct = [wt('D3', 'plan'), wt('D3', 'really'), wt('D3', 'close')], tDout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tFout = T0('L1') - 0.32;
const tStd = wt('F1', 'standards'), tStdV = [wt('F1', 'hundred'), wt('F1', 'ninety'), wt('F1', 'taste')];
const tKabir = wt('F2', 'Kabir'), tCounts = wt('F2', 'counts'), tFour = wt('F2', 'four');
const tGoal = wt('F3', 'goal'), tShort = wt('F3', 'short');
const tTwenty = wt('F4', 'Twenty'), tWhy = wt('F4', 'Why'), tRush = wt('F4', 'morning');
const tAdds = wt('F5', 'adds'), tClimb = wt('F5', 'climb');
const tL1 = T0('L1'), tL2 = T0('L2'), tLk = [tL2 + 0.3, wt('L2', 'feedback'), wt('L2', 'check'), wt('L2', 'fix'), wt('L2', 'again', 1)], tLout = T0('P1') - 0.32;
const tP1 = T0('P1'), tP2 = T0('P2'), tPa = [wt('P2', 'Planning'), wt('P2', 'Controlling')], tP3 = T0('P3'), tWo = [wt('P3', 'Without'), wt('P3', 'Without', 1)], tP4 = T0('P4'), tPout = T0('X1') - 0.32;
const tX1 = T0('X1'), tEvery = wt('X1', 'every'), tX2 = T0('X2'), tMbe = wt('X2', 'management'), tX3 = T0('X3'), tTeam = wt('X3', 'team');
const tX4 = T0('X4'), tBig = wt('X4', 'big'), tReach = wt('X4', 'reach'), tX5 = T0('X5'), tTaylor = wt('X5', 'Frederick');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAnsQ = T0('A1') - 0.02, tTakeQ = wt('A1', 'Only');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['checks', 'fixes'].map(w => wt('S2', w)), ['standards', 'measure', 'compare', 'analyse', 'correct'].map(w => wt('S3', w)), ['twins', 'exceptions'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#pDI').innerHTML = M.icon('calendar', 22, C.ink, 2.2); $('#pNI').innerHTML = M.icon('x', 22, C.red, 2.6); $('#pQ').innerHTML = M.icon('help', 36, C.red, 2.2);
const BAD = [['cup', 'Some cups', 'half empty'], ['timer', 'Waits of 1', 'to 5 minutes'], ['help', 'Cups sold?', 'Not counted']];
$('#jobRow').innerHTML = BAD.map(([ic, a, b], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 26, C.red, 2.2)}</div><div class="jt" style="top:90px">${a}</div><div class="jt" style="top:124px">${b}</div></div>`).join('');
// definition: plan, actual, fix
$('#defI').innerHTML = M.icon('gauge', 36, C.gold, 2.2);
const QW = [['clipboard', 'Plan', 'What should happen', '500 cups a day'], ['chart', 'Actual', 'What really happened', 'Count the cups'], ['wrench', 'Fix', 'Close the gap', 'Change what is wrong']];
$('#qRow').innerHTML = QW.map(([ic, q, s, a], i) => `<div class="qw" id="qw${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="qi"></div><div class="qn">0${i + 1}</div><div class="serif qt">${q}</div><div class="qs">${s}</div><div class="hr"></div><div class="qx">AT OUTLET 2</div><div class="qa">${a}</div></div>`).join('');
// gauge (svg 624 x 580): dial 0..600 cups, target 500
const GX = 312, GY = 352, GR = 200, GMAX = 600;
const gp = (v, r = GR) => { const a = Math.PI + Math.PI * v / GMAX; return [GX + r * Math.cos(a), GY + r * Math.sin(a)]; };
const garc = (v0, v1, r = GR) => { const [x0, y0] = gp(v0, r), [x1, y1] = gp(v1, r); return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
let ticks = ''; for (let v = 100; v < 600; v += 100) { if (v === 500) continue; const [a, b] = gp(v, GR - 30), [c, d] = gp(v, GR - 44); ticks += `<line x1="${a.toFixed(1)}" y1="${b.toFixed(1)}" x2="${c.toFixed(1)}" y2="${d.toFixed(1)}" stroke="#D9CFBC" stroke-width="4" stroke-linecap="round"/>`; }
const [tg1x, tg1y] = gp(500, GR - 24), [tg2x, tg2y] = gp(500, GR + 24), [tlx, tly] = gp(500, GR + 58);
$('#gG').innerHTML = `<path id="gTrack" d="${garc(0, 600)}" fill="none" stroke="#EEE8DB" stroke-width="28" stroke-linecap="round"/>` + ticks +
  `<path id="gProg" fill="none" stroke="#14213D" stroke-width="28" stroke-linecap="round"/>` +
  `<path id="gGap" d="${garc(400, 500)}" fill="none" stroke="#B5482F" stroke-width="28"/>` +
  `<g id="gTgt"><line x1="${tg1x.toFixed(1)}" y1="${tg1y.toFixed(1)}" x2="${tg2x.toFixed(1)}" y2="${tg2y.toFixed(1)}" stroke="#B8862F" stroke-width="8" stroke-linecap="round"/>` +
  `<text x="${tlx.toFixed(1)}" y="${(tly - 14).toFixed(1)}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing=".14em" fill="#8A8274">TARGET</text>` +
  `<text x="${tlx.toFixed(1)}" y="${(tly + 12).toFixed(1)}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="26" fill="#B8862F">500</text></g>` +
  `<text x="${GX - GR}" y="${GY + 44}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="20" fill="#8A8274">0</text>` +
  `<text x="${GX + GR}" y="${GY + 44}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="20" fill="#8A8274">600</text>` +
  `<g id="gNd"><line x1="0" y1="0" x2="${-(GR - 50)}" y2="0" stroke="#14213D" stroke-width="8" stroke-linecap="round"/><circle r="18" fill="#14213D"/><circle id="gHub" r="7" fill="#B8862F"/></g>`;
$('#coverI').innerHTML = M.icon('gauge', 30, C.gold2, 2.2);
// step panels
const tile3 = (pre, rows, body) => rows.map((r, i) => `<div class="tl3" id="${pre}${i}" style="left:${i * 292}px"><div class="bg"></div>${body(r, i)}</div>`).join('');
const VIS = [
  tile3('sd', [['cup', 'PER CUP', '150 ml'], ['timer', 'WAIT', 'Under 90 sec'], ['smile', 'TASTE', 'Always same']], ([ic, k, v]) => `<i>${M.icon(ic, 26, C.gold, 2.2)}</i><div class="tk">${k}</div><div class="tv">${v}</div>`),
  `<div class="ob" id="ob2"><div class="av">K</div><div class="ol">KABIR COUNTS EVERY EVENING</div><div class="ot2">Outlet 2 sells <span class="acc">400 cups</span> a day</div></div>`,
  [['PLAN', 560, '500'], ['ACTUAL', 448, '400']].map(([l, w, v], k) => `<div class="cb" id="cb${k}" style="top:${8 + k * 84}px"><div class="cl">${l}</div><div class="ct" data-w="${w}"></div>${k ? '<div class="cg"></div>' : ''}<div class="serif cv" style="left:736px">${v}</div></div>`).join(''),
  `<div class="stp" id="an0" style="background:#F6E3DC;color:#B5482F"><span>${M.icon('trendDown', 26, C.red, 2.2)}</span>20% fewer cups</div><div class="stp" id="an1"><span>${M.icon('help', 26, C.gold, 2.2)}</span>Why?</div>` +
    `<div class="stp" id="an2" style="top:92px;background:#14213D;color:#fff"><span>${M.icon('flame', 26, C.gold2, 2.2)}</span>Morning rush: one stove is not enough</div>`,
  `<div class="stp" id="co0" style="background:#B8862F;color:#fff"><span>${M.icon('plus', 26, '#fff', 2.6)}</span>Add a second stove</div>` +
    `<div class="stp" id="co1" style="top:92px;background:#14213D;color:#fff"><span>${M.icon('trendUp', 26, C.gold2, 2.2)}</span>Back to 500 cups a day</div>`,
];
const STEPS = [['Set standards', 'Clear targets to aim for'], ['Measure', 'Count the actual performance'], ['Compare', 'Put actual next to the standard'], ['Analyse', 'Find the gap, and the reason'], ['Correct', 'Take corrective action']];
const FP = [['THE CONTROL PROCESS', 'Five steps', 'From plan to fix', null]].concat(STEPS.map(([a, b], i) => [`STEP 0${i + 1} / 05`, a, b, VIS[i]]));
$('#fPans').innerHTML = FP.map(([s, t, m, v], i) => `<div class="pn" id="fn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('gauge', 34, C.gold, 2.2)}</i><span>Keep outlet 2 on track, one step at a time</span></div>`}</div>`).join('');
// feedback loop ring
const FN = [['STANDARDS', 'target'], ['MEASURE', 'chart'], ['COMPARE', 'scale'], ['ANALYSE', 'search'], ['CORRECT', 'wrench']];
const CX = 536, CY = 565, RR = 220, ang = i => (-90 + i * 72) * Math.PI / 180;
$('#nodes').innerHTML = FN.map(([l], i) => `<div class="nd" id="nd${i}" style="left:${(CX + RR * Math.cos(ang(i)) - 68).toFixed(1)}px;top:${(CY + RR * Math.sin(ang(i)) - 68).toFixed(1)}px"><div class="bg"></div><div class="ni"></div><div class="nl">${l}</div></div>`).join('');
$('#arrows').innerHTML = FN.map((_, i) => { const a = -90 + i * 72 + 36, r = a * Math.PI / 180; return `<path id="ar${i}" d="M-7 -9 L5 0 L-7 9" fill="none" stroke="#D9CFBC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(${(CX + RR * Math.cos(r)).toFixed(1)} ${(CY + RR * Math.sin(r)).toFixed(1)}) rotate(${a + 90})"/>`; }).join('');
$('#hubI').innerHTML = M.icon('refresh', 64, C.gold, 2); $('#lpI').innerHTML = M.icon('calendar', 34, C.gold, 2.2);
// twins
const EE = [['Planning', 'Sets the target', 'clipboard', '500 cups a day', 'Without it: nothing to check'], ['Controlling', 'Checks if you hit it', 'gauge', 'Count, compare, fix', 'Without it: just a wish']];
$('#eRow').innerHTML = EE.map(([t, m, ic, v, w], i) => `<div class="ee" id="ee${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">AT CHAI CORNER</div><div class="ev">${v}</div><div class="pill"><span>${M.icon('x', 22, C.red, 2.6)}</span>${w}</div></div>`).join('');
// exception report
const XR = [['cup', 'Cup 5 ml short', 0], ['timer', 'Wait of 95 seconds', 0], ['trendDown', 'Sales down 20%', 1], ['droplet', 'Milk bill up 2%', 0]];
$('#xRows').innerHTML = XR.map(([ic, tx, big], i) => `<div class="xr" id="xr${i}" style="top:${84 + i * 120}px"><i></i><div class="xt">${tx}</div><div class="xg"><span class="xgi"></span><span>${big ? 'TO RAVI' : 'TEAM FIXES'}</span></div></div>`).join('');
// quiz
const OPTS = ['Planning', 'Measuring', 'Coordinating', 'By exception'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('alert', 44, C.gold2, 2.4);
// recap
const ROWS = [['gauge', 'Controlling', ['Check', 'Fix']], ['refresh', 'Five steps', ['Standards', 'Measure', 'Compare', 'Analyse', 'Correct']], ['target', 'Two big ideas', ['Siamese twins', 'By exception']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.3) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.35));
const gVal = M.track(0, [[tCounts + 0.1, 400], [tClimb, 500]], [11, 0.9]);
const arcD = (deg) => { const a0 = -Math.PI / 2, a1 = a0 + deg * Math.PI / 180; const x0 = CX + RR * Math.cos(a0), y0 = CY + RR * Math.sin(a0), x1 = CX + RR * Math.cos(a1), y1 = CY + RR * Math.sin(a1); return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${RR} ${RR} 0 ${deg > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
const ringDeg = M.track(0, [[tLk[1], 72], [tLk[2], 144], [tLk[3], 216], [tLk[3] + 0.45, 288], [tLk[4], 359.9]], M.SOFT);
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  $('#pQ').style.left = (36 + $('#pT').offsetWidth + 28) + 'px';
  document.querySelectorAll('#fPans .pt').forEach(p => { if (p.offsetWidth > 848) p.style.fontSize = Math.floor(84 * 848 / p.offsetWidth) + 'px'; });
  { const p = $('#lpn .pt'); if (p.offsetWidth > 688) p.style.fontSize = Math.floor(84 * 688 / p.offsetWidth) + 'px'; }
  let x = 0; for (let k = 0; k < 2; k++) { const s = $('#an' + k); s.style.left = x + 'px'; x += s.offsetWidth + 24; }
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
  const exOn = t < tL1 ? [tF[1] + 0.6, tFout] : [tEvery + 0.3, tX5 - 0.1];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: a plan nobody checks ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // the plan card
    M.vis($('#plan'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.vis($('#pDay'), t, tMorph + 0.55, 1e9, { dy: 16 });
    M.rise($('#pT'), t, tFive - 0.05, { st: 0.08, sp: M.HEAVY });
    M.vis($('#pQ'), t, tWork - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#pNo'), t, tCounted - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // what really happens
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

  /* ===== D: what is controlling? ===== */
  const dOn = t >= tTu - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.15, tDout, { dy: 24, ...o });
    QW.forEach(([ic], i) => {
      const el = $('#qw' + i), tl = tLit[i], ta = tAct[i], td = i < 2 ? tAct[i + 1] : tDout + 1;
      M.vis(el, t, tD2 + 0.3 + i * 0.08, tDout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), lit = t >= tl;
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.qt').style.color = !lit ? C.dim : mix(C.ink, '#fff', act);
      el.querySelector('.qs').style.color = !lit ? C.dim : mix(C.ink2, C.gold2, act);
      el.querySelector('.qi').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.qi'), ic, !lit ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 40, 2.2);
      el.querySelector('.qn').style.color = !lit ? C.dim : C.gold;
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      const qx = el.querySelector('.qx'); M.vis(qx, t, ta - 0.1, 1e9, { dy: 10 }); qx.style.color = mix(C.muted, '#8C96AE', act);
      const qa = el.querySelector('.qa'); M.rise(qa, t, ta, { st: 0.05 }); qa.style.color = mix(C.ink, '#fff', act);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tD2 + 1 && t < tDout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== F: the five steps, read on the gauge ===== */
  const fOn = t >= tF0 - 0.1 && t < tL1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#gcard'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...fo });
    M.vis($('#fp'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...fo });
    // dial
    M.draw($('#gTrack'), t, tF0 + 0.35, 0.8, M.io);
    const v = gVal(t), fixed = M.io((t - tClimb - 0.3) / 0.4);
    const nd = $('#gNd'), np = M.spring(t - tF0 - 0.6, M.POP);
    M.hide(nd, np <= 0);
    nd.setAttribute('transform', `translate(${GX} ${GY}) rotate(${(180 * v / GMAX).toFixed(3)}) scale(${np >= 1 ? 1 : (0.3 + 0.7 * np).toFixed(4)})`);
    const pr = $('#gProg'); M.hide(pr, v < 2); if (v >= 2) pr.setAttribute('d', garc(0, Math.min(v, 599)));
    pr.setAttribute('stroke', mix(C.ink, C.gold, fixed));
    nd.querySelector('line').setAttribute('stroke', mix(C.ink, C.gold, fixed));
    const tg = $('#gTgt'), tgp = M.spring(t - tStd - 0.1, M.POP); M.hide(tg, tgp <= 0); tg.style.opacity = M.clamp((t - tStd - 0.1) / 0.15).toFixed(3);
    const gap = $('#gGap'); M.hide(gap, t < tShort - 0.1 || t > tClimb + 0.6); M.draw(gap, t, tShort - 0.1, 0.5, M.o3);
    gap.style.opacity = (1 - M.io((t - tClimb) / 0.4)).toFixed(3);
    const gv = $('#gVal'); M.setT(gv, t < tCounts + 0.1 ? '?' : String(Math.round(v)));
    gv.style.color = t < tCounts + 0.1 ? C.dim : mix(mix(C.ink, C.red, on01(t, tShort, tClimb, 0.35)), C.gold, fixed);
    M.vis($('#gVal'), t, tF0 + 0.7, 1e9, { dy: 14 });
    // status pill under the dial
    const st = t < tStd ? ['help', 'Not measured yet', 0] : t < tCounts + 0.1 ? ['target', 'Target set: 500', 0] : t < tShort ? ['chart', 'Measured: 400', 0] : t < tTwenty ? ['minus', '100 short', 1] : t < tClimb + 0.3 ? ['trendDown', '20% fewer cups', 1] : ['check', 'On target', 2];
    const gpl = $('#gPill'); M.vis(gpl, t, tF0 + 0.9, 1e9, { dy: 12 });
    M.setT($('#gPT'), st[1]);
    gpl.style.background = [C.paper, C.redBg, C.gold][st[2]]; gpl.style.color = [C.ink, C.red, '#fff'][st[2]];
    setIco($('#gPI'), st[0], [C.gold, C.red, '#fff'][st[2]], 22, st[2] === 2 ? 2.8 : 2.2);
    const kicks = [tStd, tCounts + 0.1, tShort, tTwenty, tClimb + 0.3]; let kk = -1; for (const k of kicks) if (t >= k && t < k + 0.45) kk = k;
    gpl.style.transform = kk > 0 ? `scale(${(1 + 0.06 * Math.sin(Math.PI * (t - kk) / 0.45)).toFixed(4)})` : 'none';
    // step panels
    FP.forEach((_, k) => {
      const tin = k ? tF[k - 1] : tF0 + 0.5, tout = k < 5 ? (k ? tF[k] : tF[0]) - 0.14 : 1e9;
      const pn = $('#fn' + k); if (!swap(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        for (let i = 0; i < 3; i++) {
          const el = $('#sd' + i); M.vis(el, t, tStdV[i] - 0.1, 1e9, { dy: 14, sc: 0.94, sp: M.POP });
          const fl = on01(t, tStdV[i], i < 2 ? tStdV[i + 1] : tF[1] - 0.3);
          el.querySelector('.bg').style.background = mix(C.paper, C.ink, fl);
          el.querySelector('.tv').style.color = mix(C.ink, '#fff', fl);
          el.querySelector('.tk').style.color = mix(C.muted, C.gold2, fl);
          el.querySelector('i').style.background = mix('#fff', C.navy2, fl);
          setIco(el.querySelector('i'), ['cup', 'timer', 'smile'][i], fl > 0.5 ? C.gold2 : C.gold, 26, 2.2);
        }
      } else if (k === 2) {
        const ob = $('#ob2'); M.vis(ob, t, tKabir - 0.1, 1e9, { dy: 14 });
        M.vis(ob.querySelector('.av'), t, tKabir, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
        M.vis(ob.querySelector('.ol'), t, tKabir + 0.1, 1e9, { dy: 10 });
        M.rise(ob.querySelector('.ot2'), t, tFour - 0.5, { st: 0.05 });
      } else if (k === 3) {
        [0, 1].forEach(r => {
          const el = $('#cb' + r), tb = r ? tGoal + 0.9 : tGoal - 0.1; M.vis(el, t, tF[2] + 0.6 + r * 0.1, 1e9, { dy: 12 });
          const ct = el.querySelector('.ct'), w = +ct.dataset.w * M.o3((t - tb) / 0.6); ct.style.width = Math.max(0, w).toFixed(1) + 'px';
          ct.style.background = r ? C.ink : C.gold;
          el.querySelector('.cv').style.opacity = M.clamp((t - tb - 0.3) / 0.2).toFixed(3);
          if (r) {
            const cg = el.querySelector('.cg'); cg.style.left = (150 + 448).toFixed(0) + 'px'; cg.style.width = (112 * M.o3((t - tShort + 0.1) / 0.4)).toFixed(1) + 'px';
            M.hide(cg, t < tShort - 0.1); el.querySelector('.cv').style.color = mix(C.ink, C.red, M.io((t - tShort) / 0.3));
          }
        });
      } else if (k === 4) {
        M.vis($('#an0'), t, tTwenty - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        M.vis($('#an1'), t, tWhy - 0.05, 1e9, { dy: 12 });
        M.vis($('#an2'), t, tRush - 0.05, 1e9, { dy: 12 });
      } else if (k === 5) {
        M.vis($('#co0'), t, tAdds - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        M.vis($('#co1'), t, tClimb - 0.05, 1e9, { dy: 12 });
      }
    });
  }

  /* ===== L: the feedback loop ===== */
  const lOn = t >= tL1 - 0.1 && t < tP1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const lo = { outDur: 0.3, ody: -16 };
    $('#cyc').style.opacity = (1 - M.io((t - tLout) / 0.3)).toFixed(3);
    M.draw($('#ringC'), t, tL1 + 0.05, 0.9, M.io);
    for (let i = 0; i < 5; i++) M.vis($('#ar' + i), t, tL1 + 0.5 + i * 0.08, 1e9, { dy: 0, fade: 0.15 });
    const deg = ringDeg(t); M.hide($('#ringG'), deg < 0.5); if (deg >= 0.5) $('#ringG').setAttribute('d', arcD(Math.min(deg, 359.9)));
    M.vis($('#hub'), t, tL1 + 0.15, tLout, { dy: 0, sc: 0.7, sp: M.POP, ...lo });
    const kn = [tLk[0], tLk[1], tLk[2], tLk[3], tLk[3] + 0.45, tLk[4]];
    let cur = -1; kn.forEach((k, j) => { if (t >= k) cur = j % 5; });
    FN.forEach((f, i) => {
      const el = $('#nd' + i);
      M.vis(el, t, tL1 + 0.2 + i * 0.08, tLout, { dy: 0, sc: 0.6, sp: M.POP, ...lo });
      const seen = t >= kn[i], act = cur === i ? 1 : 0;
      const bg = el.querySelector('.bg'); bg.style.background = act ? C.gold : C.card; bg.style.borderColor = seen ? C.gold : C.line;
      setIco(el.querySelector('.ni'), f[1], act ? '#fff' : (seen ? C.gold : C.dim), 44, 2);
      el.querySelector('.nl').style.color = act ? '#fff' : (seen ? C.ink : C.muted);
    });
    M.vis($('#panel'), t, tL1 + 0.3, tLout, { dx: 60, dy: 0, ...lo });
    const pn = $('#lpn'), oo = { outDur: 0.18, ody: -12 };
    swap(pn, t, tL1 + 0.45, 1e9);
    M.vis(pn.querySelector('.pe'), t, wt('L2', 'Kabir') - 0.1, 1e9, { dy: 18, ...oo });
  }

  /* ===== P: planning and controlling are twins ===== */
  const pOn = t >= tP1 - 0.1 && t < tX1 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    EE.forEach((e, i) => {
      const el = $('#ee' + i), ta = tPa[i], td = i ? tP3 : tPa[1];
      M.vis(el, t, tP1 + 0.15 + i * 0.1, tPout, { dy: 36, outDur: 0.3, ody: -16 });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const em = el.querySelector('.em'); M.rise(em, t, ta + 0.1, { st: 0.04 }); em.style.color = mix(C.gold2, C.gold, off);
      el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), e[2], t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.45, 1e9, { dy: 10 }); ex.style.color = mix('#8C96AE', C.muted, off);
      const ev = el.querySelector('.ev'); M.rise(ev, t, ta + 0.55, { st: 0.04 }); ev.style.color = mix('#fff', C.ink, off);
      M.vis(el.querySelector('.pill'), t, tWo[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tP1 + 1 && t < tPout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#both'), t, tP1 + 0.5, tPout, { dy: 40, outDur: 0.3, ody: -16 });
    M.rise($('#bothA'), t, tP1 + 0.7, { st: 0.05, out: tP4 - 0.05, outDur: 0.25 });
    M.rise($('#bothB'), t, tP4 + 0.15, { st: 0.06, sp: M.HEAVY });
  }

  /* ===== X: management by exception ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#rep'), t, tX1 + 0.1, 1e9, { dx: -60, dy: 0 });
    XR.forEach(([ic, , big], i) => {
      const el = $('#xr' + i); M.vis(el, t, tEvery - 0.1 + i * 0.14, 1e9, { dy: 20 });
      const tf = big ? tBig : tX3 + 0.3 + i * 0.12, f = M.io((t - tf) / 0.35);
      el.style.background = big ? mix(C.paper, C.redBg, f) : C.paper;
      el.querySelector('.xt').style.color = big ? mix(C.ink, C.red, f) : mix(C.ink, C.muted, f);
      const ii = el.querySelector('i'); setIco(ii, ic, big ? (f > 0.5 ? C.red : C.gold) : (f > 0.5 ? C.dim : C.gold), 28, 2.2);
      const g = el.querySelector('.xg'); M.vis(g, t, tf + 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      g.style.background = big ? C.red : C.paper2; g.style.color = big ? '#fff' : C.ink2;
      setIco(g.querySelector('.xgi'), big ? 'alert' : 'users', big ? '#fff' : C.ink2, 20, 2.4);
    });
    M.vis($('#desk'), t, tX2 + 0.05, 1e9, { dx: 60, dy: 0 });
    M.vis($('#dkAv'), t, tX2 + 0.3, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.rise($('#dkT'), t, tMbe + 0.1, { st: 0.07, sp: M.HEAVY });
    M.vis($('#desk .hr'), t, tMbe + 0.6, 1e9, { dy: 0 });
    M.rise($('#dkS'), t, tMbe + 0.5, { st: 0.04, out: tTaylor - 0.1, outDur: 0.25 });
    M.rise($('#dkS2'), t, tTaylor + 0.1, { st: 0.05 });
    [['dtA', 'a', tTeam, 'users', C.gold3, C.ink], ['dtB', 'b', tReach, 'alert', C.redBg, C.red]].forEach(([id, p, tf, ic, bgc, fc], j) => {
      const el = $('#' + id); M.vis(el, t, tMbe + 0.7 + j * 0.1, 1e9, { dy: 16 });
      const r = M.io((t - tf) / 0.35); el.style.background = mix(C.paper, bgc, r);
      $('#' + p + '0').style.color = C.dim; M.hide($('#' + p + '0'), t >= tf);
      M.rise($('#' + p + '1'), t, tf + 0.02, { st: 0.05 }); $('#' + p + '1').style.color = fc;
      setIco(el.querySelector('i'), t < tf ? 'clock' : ic, t < tf ? C.dim : (j ? C.red : C.gold), 32, 2.2);
      if (t >= tf && t < tf + 0.45) el.style.transform = `scale(${(1 + 0.03 * Math.sin(Math.PI * (t - tf) / 0.45)).toFixed(4)})`; else if (el.style.transform !== 'none' && t > tf) el.style.transform = 'none';
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
