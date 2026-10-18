// MBA - Principles of Management, Ep 21: Decision-Making Process
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E', off: '#F0EBE1' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  alert: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 8v4', 'M12 16h.01'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  play: ['M6 4.5a1.5 1.5 0 0 1 2.3-1.27l11 7.5a1.5 1.5 0 0 1 0 2.54l-11 7.5A1.5 1.5 0 0 1 6 19.5z'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  cart: ['M8 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  userPlus: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M19 8v6', 'M22 11h-6'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tWinter = wt('H2', 'winter'), tDrop = wt('H2', 'drop'), tFive = wt('H2', 'five');
const tIdea = [wt('C1', 'sell'), wt('C1', 'stay'), wt('C2', 'new')], tThreeI = T0('C3'), tNobody = wt('C3', 'nobody');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tTwo = wt('D2', 'two'), tAltD = wt('D2', 'alternatives'), tD3 = T0('D3'), tOne = wt('D3', 'one'), tNothing = wt('D3', 'nothing');
const tD4 = T0('D4'), tDec = [wt('D4', 'buy'), wt('D4', 'hire'), wt('D4', 'open')], tDout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5, 6, 7].map(i => T0('F' + i)), tFout = T0('R1') - 0.32;
const tThird = wt('F1', 'third'), tInfo = [wt('F2', 'checks'), wt('F2', 'sales') + 0.3, wt('F2', 'asks')];
const tAlt = [wt('F3', 'snacks'), wt('F3', 'longer'), wt('F3', 'flavour')], tEv = [wt('F4', 'Snacks'), wt('F4', 'Longer'), wt('F4', 'flavour')];
const tHot = wt('F5', 'Hot'), tCost = wt('F5', 'cost'), tMost = wt('F5', 'most');
const tMenu = wt('F6', 'menu'), tAll5 = wt('F6', 'five'), tAfter = wt('F7', 'After'), tRes = wt('F7', 'results');
const tR1 = T0('R1'), tBack = wt('R2', 'back'), tR3 = T0('R3'), tCollege = wt('R3', 'college'), tLater = wt('R3', 'later');
const tR4 = T0('R4'), tStarts = wt('R4', 'starts'), tFeeds = wt('R4', 'feeds'), tRout = T0('Q1') - 0.42;
const tQ = T0('Q1'), tWhat = wt('Q1', 'What'), tCount = T1('Q1') + 0.05, tAnsQ = T0('A1') - 0.02, tTakeQ = wt('A1', 'Check');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[], ['problem', 'facts', 'options', 'evaluate'].map(w => wt('S3', w)), ['choose', 'implement', 'follow'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// evening sales: five bars
const OUT = ['Outlet 1', 'Outlet 2', 'Outlet 3', 'Outlet 4', 'College'];
$('#sBars').innerHTML = OUT.map((n, i) => `<div class="sb5" style="left:${36 + i * 176}px"><div class="tr"></div><div class="fl" id="sf${i}"></div><div class="nm">${i < 4 ? 'Outlet ' + (i + 1) : 'College'}</div></div>`).join('');
$('#sDI').innerHTML = M.icon('trendDown', 22, C.red, 2.4); $('#iWI').innerHTML = M.icon('help', 22, C.red, 2.4);
// three ideas
const IDEAS = [['K', 'Hot snacks', 'flame'], ['A', 'Open later', 'clock'], ['M', 'New flavour', 'leaf']];
$('#jobRow').innerHTML = IDEAS.map(([l, t, ic], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="jt">${t}</div><div class="av">${l}</div></div>`).join('');
// definition: two ways vs one way
$('#defI').innerHTML = M.icon('split', 36, C.gold, 2.2);
const ROAD = (fork) => `<svg width="784" height="300" viewBox="0 0 784 300">
  <circle cx="96" cy="176" r="18" fill="#14213D"/>
  ${fork ? `<path class="rd" d="M114 176 H330" /><path class="rd" d="M330 176 C420 176 440 104 560 104"/><path class="rd" d="M330 176 H560"/><path class="rd" d="M330 176 C420 176 440 248 560 248"/>`
    : `<path class="rd" d="M114 176 H560"/>`}
  ${(fork ? [104, 176, 248] : [176]).map((y, k) => `<g class="pinG"><circle cx="600" cy="${y}" r="${fork ? 28 : 30}" fill="#EEE8DB"/><text x="600" y="${y + 8}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#8A8274">${fork ? 'ABC'[k] : 'A'}</text></g>`).join('')}
</svg>`;
const WAYS = [['TWO OR MORE WAYS', 'A decision', 'You must choose the best', true], ['ONLY ONE WAY', 'Nothing to decide', 'There is no choice to make', false]];
$('#wRow').innerHTML = WAYS.map(([l, t, s, f], i) => `<div class="way" id="way${i}" style="left:${160 + i * 816}px"><div class="bg"></div>${ROAD(f)}<div class="lbl">${l}</div><div class="wk"></div><div class="hr"></div><div class="serif wt">${t}</div><div class="ws">${s}</div></div>`).join('');
document.querySelectorAll('.way .rd').forEach(p => { p.setAttribute('fill', 'none'); p.setAttribute('stroke', '#E2DACB'); p.setAttribute('stroke-width', '8'); p.setAttribute('stroke-linecap', 'round'); });
const UU = [['cart', 'What to buy', 'Milk for five outlets'], ['userPlus', 'Who to hire', 'A cook for the college'], ['clock', 'When to open', '6 am or 7 am?']];
$('#uRow').innerHTML = UU.map(([ic, t, s], i) => `<div class="card uc" id="uc${i}" style="left:${160 + i * 544}px"><div class="lbl">DECISION 0${i + 1}</div><div class="ui"></div><div class="hr"></div><div class="serif ut">${t}</div><div class="us">${s}</div></div>`).join('');
// the decision path (card coords, 1600 x 300)
const CY = 124, NX = [140, 370, null, null, 1000, 1230, 1460], PY = [60, 124, 188], PX0 = 540, PX1 = 820;
const NIC = ['alert', 'search', null, null, 'target', 'play', 'refresh'];
const SL = [['01 PROBLEM', 140], ['02 INFORMATION', 370], ['03 OPTIONS · 04 EVALUATE', 680], ['05 CHOOSE', 1000], ['06 IMPLEMENT', 1230], ['07 FOLLOW UP', 1460]];
const OPT = [['flame', 'Hot snacks'], ['clock', 'Longer hours'], ['leaf', 'New flavour']];
const fork = y => `M406 ${CY} C476 ${CY} 470 ${y} ${PX0} ${y}`, merge = y => `M${PX1} ${y} C890 ${y} 894 ${CY} 964 ${CY}`;
const SEGS = [['l12', `M176 ${CY} H334`], ['f0', fork(PY[0])], ['f1', fork(PY[1])], ['f2', fork(PY[2])], ['m0', merge(PY[0])], ['m1', merge(PY[1])], ['m2', merge(PY[2])], ['l56', `M1036 ${CY} H1194`], ['l67', `M1266 ${CY} H1424`]];
$('#pBase').innerHTML = SEGS.map(([id, d]) => `<path id="b_${id}" d="${d}"/>`).join('');
$('#pGold').innerHTML = SEGS.filter(([id]) => !/m[12]/.test(id)).map(([id, d]) => `<path id="g_${id}" d="${d}"/>`).join('');
$('#pNodes').innerHTML = NX.map((x, i) => x == null ? '' : `<div class="nd" id="nd${i}" style="left:${x - 36}px;top:${CY - 36}px"><div class="bg"></div><div class="ni"></div></div>`).join('') +
  OPT.map(([ic, n], k) => `<div class="opl" id="op${k}" style="left:${PX0}px;top:${PY[k] - 26}px"><div class="bg"></div><div class="oi"></div><div class="on">Option ${'ABC'[k]}</div>${k === 0 ? `<div class="oc">${M.icon('check', 20, '#fff', 3)}</div>` : ''}</div>`).join('') +
  SL.map(([s], k) => `<div class="sl" id="sl${k}">${s}</div>`).join('');
// step panels
const tile3 = (pre, rows, body) => rows.map((r, i) => `<div class="tl3" id="${pre}${i}" style="left:${i * 268}px"><div class="bg"></div>${body(r, i)}</div>`).join('');
const outTiles = (pre) => OUT.map((n, i) => `<div class="ot5" id="${pre}${i}" style="left:${i * 160}px"><div class="bg"></div><i></i><div class="tv">${n}</div><div class="td">-33%</div></div>`).join('');
const EVAL = [[0.25, 0.9], [0.85, 0.55], [0.45, 0.25]];
const evTile = (n) => `<div class="tn">${n}</div><div class="rl" style="top:66px">COST</div><div class="rb" style="top:68px"><div class="rf" style="background:#3A4560"></div></div><div class="rl" style="top:98px">GAIN</div><div class="rb" style="top:100px"><div class="rf" style="background:#B8862F"></div></div>`;
const VIS = [
  outTiles('pa'),
  tile3('pi', [['chart', 'SALES', 'Low after 6 pm'], ['store', 'OUTLETS', 'All five, same'], ['message', 'CUSTOMERS', 'Want hot food']], ([ic, k, v]) => `<i>${M.icon(ic, 26, C.gold, 2.2)}</i><div class="tk">${k}</div><div class="tv">${v}</div>`),
  tile3('pl', [['K', 'KABIR', 'Hot snacks'], ['A', 'ASHA', 'Longer hours'], ['M', 'MEENA', 'New flavour']], ([l, k, v]) => `<div class="av">${l}</div><div class="tk">${k}</div><div class="tv">${v}</div>`),
  tile3('pe', OPT.map(o => o[1]), evTile),
  tile3('pc', OPT.map(o => o[1]), (n, i) => evTile(n) + (i === 0 ? `<div class="ck">${M.icon('check', 22, '#fff', 3)}</div>` : '')),
  outTiles('pm'),
  `<div class="ob" id="obF"><i>${M.icon('calendar', 38, C.gold, 2.2)}</i><div class="ol">REVIEW DATE</div><div class="ot2">After one month, check the results</div></div>`,
];
const STEPS = [['Identify the problem', 'What exactly is wrong?'], ['Gather information', 'Get the facts first'], ['Find alternatives', 'List the possible options'], ['Evaluate', 'Cost against benefit'],
  ['Choose the best', 'Pick the strongest option'], ['Implement', 'Put the choice into action'], ['Follow up', 'Did it really work?']];
const FP = [['THE DECISION PATH', 'Seven steps', 'From a problem to a result', null]].concat(STEPS.map(([a, b], i) => [`STEP 0${i + 1} / 07`, a, b, VIS[i]]));
$('#fPans').innerHTML = FP.map(([s, t, m, v], i) => `<div class="pn" id="fn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="vr"></div><div class="px">AT CHAI CORNER</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('split', 34, C.gold, 2.2)}</i><span>Fix the winter evening slump</span></div>`}</div>`).join('');
// one month later
$('#roRows').innerHTML = OUT.map((n, i) => `<div class="ro" id="ro${i}" style="top:${96 + i * 92}px"><i></i><div class="rn2">${n}</div><div class="bt"><div class="bf"></div></div><div class="rk"></div></div>`).join('');
// decision loop
const LX = 392, LY = 326, LR = 190, LIC = ['alert', 'search', 'split', 'scale', 'target', 'play', 'refresh'], la = i => (-90 + i * 360 / 7) * Math.PI / 180;
$('#lNodes').innerHTML = LIC.map((_, i) => `<div class="ln" id="ln${i}" style="left:${(LX + LR * Math.cos(la(i)) - 34).toFixed(1)}px;top:${(LY + LR * Math.sin(la(i)) - 34).toFixed(1)}px"><div class="bg"></div><div class="ni"></div></div>`).join('');
const arcPath = (a0, a1) => { const r0 = a0 * Math.PI / 180, r1 = a1 * Math.PI / 180; return `M${(LX + LR * Math.cos(r0)).toFixed(2)} ${(LY + LR * Math.sin(r0)).toFixed(2)} A${LR} ${LR} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${(LX + LR * Math.cos(r1)).toFixed(2)} ${(LY + LR * Math.sin(r1)).toFixed(2)}`; };
$('#lArc').setAttribute('d', arcPath(-90, 269.9));
$('#lBack').setAttribute('d', arcPath(-90 + 6 * 360 / 7 + 10, 270 - 10));
// quiz
const OPTS = ['Evaluate', 'Choose', 'Gather facts', 'Follow up'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('refresh', 44, C.gold2, 2.4);
// recap
const ROWS = [['split', 'Decision making = choosing the <span class="acc">best option</span>', []], ['search', 'Think it through', ['Problem', 'Facts', 'Options', 'Evaluate']], ['play', 'Then act', ['Choose', 'Implement', 'Follow up']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.3) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.35));
const lift = (el, t, ta, td, amt, gate) => { const l = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT); if (gate) el.style.transform = Math.abs(l) > 0.001 ? `scale(${(1 + amt * l).toFixed(4)})` : 'none'; };
// node state: 0 pending, 1 active (navy), 2 done (gold)
const nodeState = (el, ic, t, ta, td, s = 34) => {
  const act = M.io((t - ta) / 0.3), done = M.io((t - td) / 0.35);
  el.querySelector('.bg').style.background = mix(mix(C.paper2, C.ink, act), C.gold, done);
  setIco(el.querySelector('.ni'), ic, t < ta ? C.dim : (done > 0.5 ? '#fff' : C.gold2), s, 2.2);
};
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  SL.forEach(([, x], k) => { const s = $('#sl' + k); s.style.left = (x - s.offsetWidth / 2).toFixed(0) + 'px'; });
  document.querySelectorAll('#fPans .pt').forEach(p => { if (p.offsetWidth > 624) p.style.fontSize = Math.floor(56 * 624 / p.offsetWidth) + 'px'; });
  document.querySelectorAll('.tl3 .tv, .tl3 .tn').forEach(p => { if (p.offsetWidth > 200) p.style.fontSize = Math.floor(26 * 200 / p.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(44 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let px = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = px + 'px'; px += p.offsetWidth + 16; }); });
}
const swap = (pn, t, tin, tout) => {   // standard panel pane in/out
  const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return false;
  const oo = { outDur: 0.18, ody: -12 };
  M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
  M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
  M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
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
  const exOn = t < tF[2] ? [tF[0] + 0.6, tF[1] - 0.14] : t < tR1 - 1 ? [tF[3] + 0.6, tF[5] - 0.14] : [tR1 + 0.3, tRout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: five outlets, one problem ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // evening sales fall at every outlet
    M.vis($('#sales'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const dr = M.o3((t - tDrop) / 0.8);
    for (let i = 0; i < 5; i++) {
      const g = M.o3((t - tMorph - 0.6 - i * 0.07) / 0.6), hh = 112 * g * (1 - 0.45 * M.o3((t - tDrop - i * 0.06) / 0.7)), f = $('#sf' + i);
      f.style.height = hh.toFixed(1) + 'px'; f.style.top = (196 - hh).toFixed(1) + 'px';
      f.style.background = mix(C.gold, C.red, M.io((t - tDrop - i * 0.06) / 0.4));
    }
    M.vis($('#sDrop'), t, tFive - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // three ideas, no way to pick
    M.vis($('#ideas'), t, tIdea[0] - 0.5, 1e9, { dy: 36 });
    IDEAS.forEach((_, i) => {
      const el = $('#job' + i); M.vis(el, t, tIdea[i] - 0.05, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.av'), t, tIdea[i] + 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      el.style.background = mix(C.paper, C.gold3, on01(t, tThreeI + i * 0.25, tThreeI + i * 0.25 + 0.5));
    });
    M.vis($('#iWhich'), t, tNobody - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: what is decision making? ===== */
  const dOn = t >= tTu - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.15, tDout, { dy: 24, ...o });
    const wOut = tD4 + 0.05;
    WAYS.forEach(([, , , f], i) => {
      const el = $('#way' + i), ta = i ? tOne : tTwo, tr = i ? tNothing : tAltD;
      const off = t > wOut + 0.4; M.hide(el, off); if (off) return;
      M.vis(el, t, tD2 + 0.35 + i * 0.1, wOut, { dy: 36, ...o });
      const seen = t >= ta;
      el.querySelectorAll('.rd').forEach((p, k) => { p.setAttribute('stroke', seen ? (f ? C.gold : C.ink2) : C.line); if (seen) M.draw(p, t, ta + (k ? 0.35 + (k - 1) * 0.12 : 0), 0.45, M.o3); else M.drawU(p, 1); });
      el.querySelectorAll('.pinG').forEach((g, k) => {
        const tp = ta + (f ? 0.75 + k * 0.12 : 0.45), on = M.io((t - tp) / 0.25);
        g.querySelector('circle').setAttribute('fill', mix(C.paper2, f ? C.gold : C.ink2, on)); g.querySelector('text').setAttribute('fill', on > 0.5 ? '#fff' : C.muted);
      });
      el.querySelector('.wt').style.color = !seen ? C.dim : (f ? C.ink : C.ink2);
      el.querySelector('.lbl').style.color = seen ? C.gold : C.muted;
      const ws = el.querySelector('.ws'); M.rise(ws, t, tr, { st: 0.04 });
      const wk = el.querySelector('.wk'); M.vis(wk, t, tr + 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      wk.style.background = f ? C.gold : C.redBg; setIco(wk, f ? 'check' : 'x', f ? '#fff' : C.red, 26, 3);
      lift(el, t, ta, ta + 1.2, 0.02, t > tD2 + 1.2 && t < wOut);
    });
    UU.forEach(([ic], i) => {
      const el = $('#uc' + i), ta = tDec[i], seen = t >= ta - 0.05;
      M.vis(el, t, wOut + 0.3 + i * 0.08, tDout, { dy: 36, ...o });
      const ui = el.querySelector('.ui'); setIco(ui, ic, seen ? C.gold : C.dim, 52, 2);
      ui.style.background = mix(C.paper, C.gold3, on01(t, ta, ta + 0.8));
      el.querySelector('.ut').style.color = seen ? C.ink : C.dim;
      el.querySelector('.lbl').style.color = seen ? C.gold : C.muted;
      M.rise(el.querySelector('.us'), t, ta + 0.15, { st: 0.04 });
      lift(el, t, ta, ta + 0.9, 0.02, t > wOut + 1.2 && t < tDout);
    });
  }

  /* ===== F: the decision path ===== */
  const fOn = t >= tF0 - 0.1 && t < tR1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#path'), t, tF0 + 0.1, tFout, { dy: 36, ...fo });
    M.vis($('#fp'), t, tF0 + 0.25, tFout, { dy: 36, ...fo });
    const baseOp = M.clamp((t - tF0 - 0.5) / 0.3); $('#pBase').style.opacity = baseOp.toFixed(3);
    // nodes: pending -> active (navy) -> done (gold)
    const ND = { 0: [tF[0], tF[1]], 1: [tF[1], tF[2]], 4: [tF[4], tF[5]], 5: [tF[5], tF[6]], 6: [tF[6], tRes + 0.3] };
    Object.keys(ND).forEach((k, j) => {
      const el = $('#nd' + k); M.vis(el, t, tF0 + 0.35 + j * 0.07, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      nodeState(el, NIC[k], t, ND[k][0], ND[k][1]);
      lift(el, t, ND[k][0], ND[k][1], 0.1, t > tF0 + 1.5);
    });
    // option pills: placeholder -> named (F3) -> weighed (F4) -> chosen / dropped (F5)
    OPT.forEach(([ic, n], k) => {
      const el = $('#op' + k); M.vis(el, t, tF0 + 0.5 + k * 0.07, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const named = t >= tAlt[k], ev = on01(t, tEv[k], k < 2 ? tEv[k + 1] : tF[4]), win = k === 0 ? M.io((t - tHot) / 0.3) : 0, drop = k ? M.io((t - tCost) / 0.35) : 0;
      M.setT(el.querySelector('.on'), named ? n : `Option ${'ABC'[k]}`);
      const bg = el.querySelector('.bg'); bg.style.background = mix(mix(mix(named ? C.gold3 : C.paper2, C.ink, ev), C.gold, win), C.off, drop);
      el.querySelector('.on').style.color = !named ? C.dim : (win > 0.5 || ev > 0.5 ? '#fff' : (drop > 0.5 ? C.dim : C.ink));
      setIco(el.querySelector('.oi'), named ? ic : 'help', !named ? C.dim : (drop > 0.5 ? C.dim : C.gold), 20, 2.2);
      if (k === 0) M.vis(el.querySelector('.oc'), t, tMost, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      const pop = M.spring(t - tAlt[k], M.POP);
      if (t > tF0 + 1.5) el.style.transform = t > tAlt[k] && pop < 0.999 ? `scale(${(1 + 0.06 * Math.sin(Math.PI * pop)).toFixed(4)})` : 'none';
    });
    // gold path drawn as Ravi moves along it
    M.draw($('#g_l12'), t, tF[1], 0.5, M.o3);
    [0, 1, 2].forEach(k => M.draw($('#g_f' + k), t, tAlt[k] - 0.25, 0.45, M.o3));
    $('#pGold').querySelectorAll('#g_f1,#g_f2').forEach(p => p.style.opacity = (1 - M.io((t - tCost) / 0.35)).toFixed(3));
    M.draw($('#g_m0'), t, tHot + 0.1, 0.5, M.o3);
    M.draw($('#g_l56'), t, tF[5], 0.5, M.o3); M.draw($('#g_l67'), t, tF[6], 0.5, M.o3);
    // step labels
    const slT = [tF[0], tF[1], tF[2], tF[4], tF[5], tF[6]], slE = [tF[1], tF[2], tF[4], tF[5], tF[6], 1e9];
    SL.forEach((_, k) => { const s = $('#sl' + k); M.vis(s, t, tF0 + 0.6 + k * 0.05, 1e9, { dy: 8 }); s.style.color = t < slT[k] ? C.dim : mix(C.gold, C.ink, M.io((t - slE[k]) / 0.3)); });
    // panel panes
    FP.forEach((_, k2) => {
      const tin = k2 ? tF[k2 - 1] : tF0 + 0.5, tout = k2 < 7 ? (k2 ? tF[k2] : tF[0]) - 0.14 : 1e9;
      const pn = $('#fn' + k2); if (!swap(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.vr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k2 === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k2 === 1 || k2 === 6) {
        const pre = k2 === 1 ? 'pa' : 'pm';
        for (let i = 0; i < 5; i++) {
          const el = $('#' + pre + i); M.vis(el, t, tin + 0.6 + i * 0.06, 1e9, { dy: 14 });
          const i0 = el.querySelector('i'), td = el.querySelector('.td');
          if (k2 === 1) {
            const r = M.io((t - tThird - i * 0.08) / 0.3);
            el.querySelector('.bg').style.background = mix(C.paper, C.redBg, r);
            setIco(i0, r > 0.5 ? 'trendDown' : 'store', r > 0.5 ? C.red : C.gold, 26, 2.2);
            M.vis(td, t, tThird + i * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
          } else {
            const g = M.io((t - (tMenu + (tAll5 - tMenu) * i / 4)) / 0.3);
            el.querySelector('.bg').style.background = mix(C.paper, C.gold, g);
            i0.style.background = mix('#fff', '#C99A48', g);
            setIco(i0, g > 0.5 ? 'flame' : 'store', g > 0.5 ? '#fff' : C.gold, 26, 2.2);
            el.querySelector('.tv').style.color = g > 0.5 ? '#fff' : C.ink; M.hide(td, true);
          }
        }
      } else if (k2 === 2) {
        for (let i = 0; i < 3; i++) { const el = $('#pi' + i); M.vis(el, t, tInfo[i] - 0.05, 1e9, { dy: 14 }); M.rise(el.querySelector('.tv'), t, tInfo[i] + 0.1, { st: 0.04 }); }
      } else if (k2 === 3) {
        for (let i = 0; i < 3; i++) { const el = $('#pl' + i); M.vis(el, t, tAlt[i] - 0.08, 1e9, { dy: 14, sc: 0.94, sp: M.POP }); }
      } else if (k2 === 4 || k2 === 5) {
        const pre = k2 === 4 ? 'pe' : 'pc';
        for (let i = 0; i < 3; i++) {
          const el = $('#' + pre + i); M.vis(el, t, tin + 0.65 + i * 0.08, 1e9, { dy: 14 });
          const rf = el.querySelectorAll('.rf'), g = k2 === 4 ? M.o3((t - tEv[i] - 0.1) / 0.6) : 1;
          rf[0].style.width = (128 * EVAL[i][0] * g).toFixed(1) + 'px'; rf[1].style.width = (128 * EVAL[i][1] * M.o3((t - (k2 === 4 ? tEv[i] + 0.35 : 0)) / 0.6) * (k2 === 4 ? 1 : 1)).toFixed(1) + 'px';
          if (k2 === 4) { el.querySelector('.bg').style.background = mix(C.paper, C.gold3, on01(t, tEv[i], i < 2 ? tEv[i + 1] : tF[4])); continue; }
          const win = i === 0 ? M.io((t - tHot) / 0.3) : 0, dimC = i ? M.io((t - tCost) / 0.3) : 0;
          el.querySelector('.bg').style.background = mix(mix(C.paper, C.ink, win), C.off, dimC);
          el.querySelector('.tn').style.color = mix(mix(C.ink, '#fff', win), C.dim, dimC);
          el.querySelectorAll('.rl').forEach(l => l.style.color = mix(mix(C.muted, '#8C96AE', win), C.dim, dimC));
          el.querySelectorAll('.rb').forEach(b => b.style.background = mix(mix('#E4DCCD', C.navy3, win), '#E8E1D4', dimC));
          rf[0].style.background = mix(mix(C.ink2, C.gold2, win), C.dim, dimC); rf[1].style.background = mix(C.gold, C.dim, dimC);
          if (i === 0) M.vis(el.querySelector('.ck'), t, tMost, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
        }
      } else if (k2 === 7) {
        const ob = $('#obF'); M.vis(ob, t, tin + 0.6, 1e9, { dy: 14 });
        M.rise(ob.querySelector('.ot2'), t, tAfter - 0.05, { st: 0.04 });
        ob.style.background = mix(C.paper, C.gold3, on01(t, tRes, tRes + 0.8));
      }
    });
  }

  /* ===== R: one month later, and the loop ===== */
  const rOn = t >= tR1 - 0.1 && t < tQ + 0.05; M.hide($('#sR'), !rOn);
  if (rOn) {
    const ro = { outDur: 0.3, ody: -16 };
    M.vis($('#rv'), t, tR1 + 0.1, 1e9, { dx: -60, dy: 0 });
    M.vis($('#loop'), t, tR1 + 0.22, 1e9, { dx: 60, dy: 0 });
    OUT.forEach((_, i) => {
      const el = $('#ro' + i); M.vis(el, t, tR1 + 0.5 + i * 0.08, 1e9, { dy: 16 });
      const up = i < 4 ? M.o3((t - tBack - i * 0.12) / 0.6) : 0, bad = i === 4 ? M.io((t - tCollege) / 0.35) : 0;
      const bf = el.querySelector('.bf'); bf.style.width = (340 * (0.55 + 0.45 * up) * M.o3((t - tR1 - 0.6 - i * 0.08) / 0.6)).toFixed(1) + 'px';
      bf.style.background = i < 4 ? mix(C.red, C.gold, up) : C.red;
      el.style.background = mix(C.paper, C.redBg, bad);
      setIco(el.querySelector('i'), 'store', i < 4 ? C.gold : mix(C.gold, C.red, bad), 24, 2.2);
      const rk = el.querySelector('.rk'), tk = i < 4 ? tBack + 0.3 + i * 0.12 : tCollege + 0.2;
      M.vis(rk, t, tk, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      rk.style.background = i < 4 ? C.gold : C.red; setIco(rk, i < 4 ? 'check' : 'x', '#fff', 24, 3);
    });
    // the loop: round one complete, then follow up starts round two
    M.draw($('#lRing'), t, tR1 + 0.45, 0.9, M.io);
    const reset = M.io((t - tStarts) / 0.4);
    M.draw($('#lArc'), t, tR1 + 0.9, 1.4, M.io);
    $('#lArc').style.opacity = (1 - reset).toFixed(3);
    M.draw($('#lBack'), t, tStarts + 0.1, 0.6, M.o3); M.hide($('#lBack'), t < tStarts + 0.1);
    LIC.forEach((ic, i) => {
      const el = $('#ln' + i); M.vis(el, t, tR1 + 0.6 + i * 0.07, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      const done = M.io((t - (tR1 + 1.0 + i * 0.2)) / 0.3) * (1 - reset);
      const act = i === 6 ? on01(t, tCollege, tStarts + 0.3) : (i === 0 ? M.io((t - tStarts - 0.6) / 0.3) : 0);
      el.querySelector('.bg').style.background = mix(mix(C.paper2, C.gold, done), C.ink, act);
      setIco(el.querySelector('.ni'), ic, act > 0.5 ? C.gold2 : (done > 0.5 ? '#fff' : C.dim), 28, 2.2);
      if (t > tR1 + 2) el.style.transform = (i === 0 || i === 6) ? (() => { const ta = i ? tCollege : tStarts + 0.6, l = M.spring(t - ta, M.POP) - M.spring(t - ta - 0.6, M.SOFT); return Math.abs(l) > 0.001 && t > ta ? `scale(${(1 + 0.1 * l).toFixed(4)})` : 'none'; })() : 'none';
    });
    const r2 = t >= tStarts + 0.15;
    const c1 = $('#lc1'), c2 = $('#lc2');
    M.vis(c1, t, tR1 + 0.8, r2 ? 1e9 : tStarts - 0.05, { dy: 10, outDur: 0.18 }); M.vis(c2, t, tR1 + 0.9, r2 ? 1e9 : tStarts - 0.05, { dy: 14, outDur: 0.18 });
    if (r2) { M.setT(c1, 'ROUND 2'); M.setT(c2, 'College outlet'); M.vis(c1, t, tStarts + 0.2, 1e9, { dy: 10 }); M.vis(c2, t, tStarts + 0.3, 1e9, { dy: 14 }); }
    else { M.setT(c1, 'ROUND 1'); M.setT(c2, 'Winter evenings'); }
    c1.style.color = r2 ? C.gold : C.muted;
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, tWhat - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tWhat + 0.2 + i * 0.08, 1e9, { dy: 40 });
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
