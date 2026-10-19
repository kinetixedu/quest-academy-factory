// MBA - Principles of Management, Ep 26: Centralization and Decentralization
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  copy: ['M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z', 'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 21a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  bed: ['M2 4v16', 'M2 8h18a2 2 0 0 1 2 2v10', 'M2 17h20', 'M6 8v9'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  user1: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
  sliders: ['M21 4h-7', 'M10 4H3', 'M21 12h-9', 'M8 12H3', 'M21 20h-5', 'M12 20H3', 'M14 2v4', 'M8 10v4', 'M16 18v4'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tBig = wt('H2', 'bigger');
const tOffer = wt('C1', 'offer'), tAsk1 = wt('C1', 'Ask'), tHelp = wt('C2', 'helper'), tAsk2 = wt('C2', 'Ask'), tThree = wt('C3', 'three'), tCust = wt('C3', 'customers'), tAout = T0('I1') - 0.32;
// I
const tI1 = T0('I1'), tMap = wt('I1', 'map'), tWho = wt('I2', 'Who'), tI3 = T0('I3'), tPush = wt('I3', 'push'), tIout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tTop = wt('D2', 'top'), tD3 = T0('D3'), tSpread = wt('D3', 'spread'), tD4 = T0('D4'), tTask = wt('D4', 'One'), tD5 = T0('D5'), tWhole = wt('D5', 'whole'), tDout = T0('L0') - 0.32;
// L: the slider
const tL0 = T0('L0'), tSlider = wt('L0', 'slider'), tL1 = T0('L1'), tLeft = wt('L1', 'left'), tL2 = T0('L2'), tRight = wt('L2', 'right'), tEvery2 = wt('L2', 'everything'), tL3 = T0('L3'), tEither = wt('L3', 'either');
const tL4 = T0('L4'), tFayol = wt('L4', 'Fayol'), tProp = wt('L4', 'proportion'), tOwn = wt('L4', 'own');
const tT = T0('T1'), tSt2 = wt('T1', 'It'), tTu = T0('W0') - 0.32;
// W
const tW0 = T0('W0'), tWc = [wt('W1', 'small'), wt('W1', 'same'), wt('W1', 'crisis')], tWl = [wt('W2', 'large'), wt('W2', 'spread'), wt('W2', 'fast')], tWout = T0('M0') - 0.32;
// M: Ravi's split
const tM0 = T0('M0'), tMs = wt('M0', 'slider'), tM1 = T0('M1'), tMenu = wt('M1', 'menu'), tSame1 = wt('M1', 'Every'), tM2 = T0('M2'), tOffers = wt('M2', 'offers'), tMgrs = wt('M2', 'managers');
const tM3 = T0('M3'), tMeena = wt('M3', 'Meena'), tShifts = wt('M3', 'shifts'), tM4 = T0('M4'), tStudent = wt('M4', 'student'), tSameDay = wt('M4', 'same'), tMout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'nurse'), wt('K3', 'recall'), wt('K4', 'sales')];
// X
const tX1 = T0('X1'), tX6 = T0('X6');
const tXc = [[wt('X2', 'tight'), wt('X2', 'standard')], [wt('X3', 'overloaded'), wt('X3', 'slow'), wt('X3', 'messengers')]];
const tXd = [[wt('X4', 'fast'), wt('X4', 'trains'), wt('X4', 'trusted')], [wt('X5', 'drift'), wt('X5', 'mistakes')]];
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'A');
const tS = T0('S1'), tRow = [T0('S2'), wt('S2', 'Decentralization'), T0('S3')], tN = T0('N1');
const tPill = [[wt('S2', 'top')], [wt('S2', 'spreads')], [wt('S4', 'central'), wt('S4', 'local')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];
const EXW = [[tOffer - 0.2, tAout], [tM4 - 0.3, tMout]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A
const TL = ['OUTLET 1', 'BUS STAND', 'COLLEGE', 'OUTLET 4', 'OUTLET 5'];
$('#tileRow').innerHTML = TL.map((n, i) => `<div class="tile" id="tl${i}" style="left:${36 + i * 172}px"><div class="cn">${n}</div><div class="ci"></div><div class="ct">Open</div></div>`).join('');
const METH = [['Student offer?', tOffer], ['Extra helper?', tHelp]];
$('#meth').innerHTML = METH.map(([m], i) => `<div class="stp" id="mt${i}" style="top:76px">${M.icon('help', 26, C.muted, 2.2)}<span>${m}</span></div>`).join('');
$('#pile').innerHTML = Array.from({ length: 8 }, (_, i) => `<rect id="sh${i}" x="${-38 + (i % 2 ? 4 : 0)}" y="${-12 - i * 10}" width="76" height="10" rx="3" fill="#fff" stroke="#3A4560" stroke-width="3"/>`).join('');
// I
$('#qpI').innerHTML = M.icon('help', 24, '#fff', 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// D: pyramids
const PN = [[344, 22, 18], [200, 88, 16], [488, 88, 16], [88, 154, 14], [216, 154, 14], [344, 154, 14], [472, 154, 14], [600, 154, 14]];
const PL = [[0, 1], [0, 2], [1, 3], [1, 4], [1, 5], [2, 5], [2, 6], [2, 7]];
for (const k of ['C', 'D']) $('#py' + k).innerHTML = PL.map(([a, b], i) => `<line id="pl${k}${i}" x1="${PN[a][0]}" y1="${PN[a][1]}" x2="${PN[b][0]}" y2="${PN[b][1]}" stroke="#E2DACB" stroke-width="4"/>`).join('') +
  PN.map(([x, y, r], i) => `<circle id="pn${k}${i}" cx="${x}" cy="${y}" r="${r}" fill="#EEE8DB" stroke="#FFFFFF" stroke-width="4"/>`).join('');
$('#sDelI').innerHTML = M.icon('user1', 34, C.ink, 2.2); $('#sDecI').innerHTML = M.icon('network', 34, C.gold2, 2.2);
// H: the hub
$('#hubF').style.cssText = FACE('ravi');
const DEC = ['Menu', 'Prices', 'Quality', 'Shifts', 'Stock', 'Offers'];
$('#hubC').innerHTML = DEC.map((d, i) => `<div class="dc" id="dc${i}">${d}</div>`).join('');
const NX = [112, 252, 392, 532, 672], NY = 330, HUB = [392, 206];
$('#hubS').innerHTML = NX.map((x, i) => `<path id="sp${i}" d="M${HUB[0]} ${HUB[1]} L${x} ${NY - 32}" stroke="#E2DACB" stroke-width="4" stroke-linecap="round" fill="none"/>`).join('') +
  `<circle cx="${HUB[0]}" cy="${HUB[1]}" r="8" fill="#14213D"/>` +
  NX.map((x, i) => `<g id="nd${i}"><circle cx="${x}" cy="${NY}" r="30" fill="#F5F1E8" stroke="#E2DACB" stroke-width="3"/><g transform="translate(${x - 14} ${NY - 14})">${M.icon('store', 28, C.ink, 2.2)}</g></g>`).join('') +
  `<defs><clipPath id="mc"><circle cx="${NX[1]}" cy="${NY}" r="27"/></clipPath></defs><image id="ndM" href="${IMG}meena-face.jpg" x="${NX[1] - 27}" y="${NY - 27}" width="54" height="54" clip-path="url(#mc)"/>`;
$('#hubN').innerHTML = TL.map((n, i) => `<div class="onm" id="nn${i}" style="left:${NX[i] - 70}px;top:370px">${n}</div>`).join('');
// slider ticks
$('#ticks').innerHTML = [0, 0.25, 0.5, 0.75, 1].map((u, i) => `<div class="abs" style="left:${48 + 688 * u - 1}px;top:160px;width:2px;height:12px;background:#E2DACB"></div>`).join('');
wrap($('#sld'), 'sldOut', 784, 274);
// W rows
const WC = [['store', 'The firm is small'], ['copy', 'Rules must be the same everywhere'], ['alert', 'There is a crisis']];
const WL = [['network', 'The firm is large'], ['pin', 'It is spread over many places'], ['zap', 'Things change fast']];
const wrow = (k, A) => A.map(([ic, t], i) => `<div class="wr" id="w${k}${i}" style="top:${204 + i * 104}px"><div class="bg"></div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
$('#wCr').innerHTML = wrow('C', WC); $('#wLr').innerHTML = wrow('L', WL);
const mini = (u) => `<line x1="8" y1="15" x2="680" y2="15" stroke="#EEE8DB" stroke-width="10" stroke-linecap="round"/><line x1="8" y1="15" x2="${8 + 672 * u}" y2="15" stroke="#14213D" stroke-width="10" stroke-linecap="round"/><circle cx="${8 + 672 * u}" cy="15" r="13" fill="#fff" stroke="#14213D" stroke-width="5"/>`;
$('#wCs').innerHTML = mini(0.12); $('#wLs').innerHTML = mini(0.88);

// K: at work today
const KA = [
  ['lock', 'Central decisions', 'Set once, for everyone', 'Menu and prices are set at head office', 'coin', 'A bank sets its loan rates at head office'],
  ['pin', 'Local decisions', 'Made close to the work', 'Meena plans the bus stand shifts', 'bed', 'A head nurse plans her own ward roster'],
  ['alert', 'Crisis: lean central', 'One voice when it matters most', 'In a milk shortage, head office shares out milk', 'package', 'In a recall, head office runs every store'],
  ['zap', 'Fast change: lean local', 'Decide where things happen', 'The college outlet runs its own offers', 'users', 'Each city sales team sets its own deals'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('') +
  `<div class="rhd" id="kFoot" style="left:48px;top:478px"><div class="fa" style="${FACE('ravi')}"></div><span class="fx" style="font-size:26px">Every firm picks its own mix</span></div>`;
const KP = [['THE SLIDER TODAY', 'Four ideas', 'You will see them in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('sliders', 34, C.gold, 2.2)}</i><span>Some decisions up, some down</span></div>`) + `</div>`).join('');

// X: the human side
const XC = [[['lock', 'Tight control'], ['copy', 'One standard']], [['alert', 'Overloaded top'], ['clock', 'Slow decisions'], ['x', 'Unheard managers']]];
const XD = [[['zap', 'Fast decisions'], ['trendUp', 'Trains managers'], ['smile', 'People feel trusted']], [['split', 'Outlets drift apart'], ['search', 'Harder to check']]];
Object.assign(M.IC, { search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'] });
const chips = (k, X) => X.map((col, c) => col.map(([ic, t], i) => `<div class="xc" id="x${k}${c}${i}" style="left:${c ? 400 : 48}px;top:${184 + i * 60}px">${M.icon(ic, 22, c ? C.red : C.gold, 2.4)}<span>${t}</span></div>`).join('')).join('');
$('#xCc').innerHTML = chips('C', XC); $('#xDc').innerHTML = chips('D', XD);
$('#xCi').innerHTML = M.icon('home', 36, C.ink, 2.2); $('#xDi').innerHTML = M.icon('network', 36, C.gold, 2.2);
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);

// quiz
const OPTS = ['Centralization', 'Decentralization', 'Span of control', 'Planning'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('pin', 44, C.gold2, 2.4);
// recap
const ROWS = [['home', 'Centralization keeps power up', ['Head office']], ['pin', 'Decentralization spreads it out', ['The outlets']], ['gauge', 'A slider, not a switch', ['Lean central', 'Lean local']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const pulse = (t, a, d = 0.9) => (t > a && t < a + d) ? Math.sin(Math.PI * (t - a) / d) : 0;
// chip position per decision: 0 = head office, 1 = each outlet
const down = [
  M.track(0, [[tEvery2 + 0.00, 1], [tEither, 0], [tMs + 0.4, 0]], M.HEAVY),
  M.track(0, [[tEvery2 + 0.08, 1], [tEither + 0.06, 0]], M.HEAVY),
  M.track(0, [[tEvery2 + 0.16, 1], [tEither + 0.12, 0]], M.HEAVY),
  M.track(0, [[tEvery2 + 0.24, 1]], M.HEAVY),
  M.track(0, [[tEvery2 + 0.32, 1]], M.HEAVY),
  M.track(0, [[tEvery2 + 0.40, 1], [tEither + 0.18, 0], [tOffers - 0.05, 1]], M.HEAVY),
];
const knobU = M.track(0, [[tRight - 0.1, 1], [tEither - 0.2, 0.35], [tMs - 0.05, 0.5]], M.HEAVY);
let geo = null, slotX = [];
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; METH.forEach((_, i) => { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; });
  const tr = $('#tgR'); tr.style.left = (76 - tr.offsetWidth) + 'px'; tr.style.top = '300px';
  const qp = $('#qpill'); qp.style.left = '732px'; qp.style.top = '150px';
  let tot = 0; DEC.forEach((_, i) => tot += $('#dc' + i).offsetWidth); const gap = (688 - tot) / 5; x = 48; slotX = DEC.map((_, i) => { const v = x; x += $('#dc' + i).offsetWidth + gap; return v; });
  DEC.forEach((_, i) => { $('#dc' + i).style.left = slotX[i].toFixed(1) + 'px'; });
  document.querySelectorAll('#kPans .pt, #pPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.wr .rt').forEach(el => { if (el.offsetWidth > 568) el.style.fontSize = Math.floor(30 * 568 / el.offsetWidth) + 'px'; });
  const dq = $('#dq'); dq.style.width = 'auto'; dq.style.display = 'inline-block'; const dqw = dq.offsetWidth; dq.style.display = ''; dq.style.width = '1920px'; if (dqw > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dqw) + 'px';
  const fq = $('#fayQ'); if (fq.offsetWidth > 496) fq.style.fontSize = Math.floor(34 * 496 / fq.offsetWidth) + 'px';
  const bo = $('#both'); let bw = 0; [...bo.children].forEach(c => bw += c.offsetWidth + 22); if (bw > 1520) bo.querySelectorAll('.tx').forEach(c => c.style.fontSize = Math.floor(52 * 1520 / bw) + 'px');
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  const q1 = $('#qq1'); if (q1.offsetWidth > 1400) q1.style.fontSize = Math.floor(68 * 1400 / q1.offsetWidth) + 'px';
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const sheets = t => t < tAsk1 ? 0 : t < tAsk2 ? 1 : t < tThree ? 2 : Math.round(2 + 6 * M.o3((t - tThree) / 1.2));

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  const exW = EXW.find(([a, b]) => t >= a - 0.5 && t < b + 0.5) || EXW[0];
  M.vis($('#exChip'), t, exW[0], exW[1], { dy: 10, outDur: 0.3 });

  /* ===== A: every bigger decision waits for Ravi ===== */
  const aOn = t < tAout + 0.45; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#sign'), t, tMorph + 0.45, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    const n = sheets(t);
    for (let i = 0; i < 8; i++) { const s = $('#sh' + i), ta = i === 0 ? tAsk1 : i === 1 ? tAsk2 : tThree + (i - 2) * 0.2; M.vis(s, t, ta, 1e9, { dy: -30, sp: M.POP, fade: 0.08 }); }
    M.vis($('#callT'), t, tMorph + 1.0, 1e9, { dy: 0, fade: 0.2 });
    M.setT($('#callT'), `Waiting: ${n} ${n === 1 ? 'request' : 'requests'}`); $('#callT').setAttribute('fill', t > tThree + 0.6 ? C.red : C.ink);
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    TL.forEach((_, i) => {
      const el = $('#tl' + i); M.vis(el, t, tMorph + 0.5 + i * 0.05, 1e9, { dy: 16 });
      const ta = i === 2 ? tOffer : i === 1 ? tHelp : 1e9, r = M.io((t - ta + 0.1) / 0.25);
      el.style.background = mix(C.paper, C.redBg, r);
      const ct = el.querySelector('.ct');
      const day = t < tThree ? 1 : Math.min(3, 1 + Math.floor((t - tThree) / 0.5) + 1);
      M.setT(ct, r < 0.5 ? 'Open' : (t < tThree ? (i === 2 ? 'Offer?' : 'Helper?') : `Day ${day}`));
      ct.style.color = r > 0.5 ? C.red : C.muted;
      el.querySelector('.cn').style.color = r > 0.5 ? C.red : C.muted;
      setIco(el.querySelector('.ci'), r > 0.5 ? 'clock' : 'store', r > 0.5 ? C.red : (t < tBig + i * 0.06 ? C.dim : C.ink), 40, 2.2);
    });
    M.vis($('#ask'), t, tOffer - 0.3, tAout, { dy: 36, ...o });
    METH.forEach(([, tm], i) => M.vis($('#mt' + i), t, tm - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.rise($('#askT'), t, tThree - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== I: head office and the outlets ===== */
  const iOn = t >= tI1 - 0.1 && t < tD1 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tI1 + 0.1, tIout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tPush - 0.1);
    M.vis($('#illImg'), t, tI1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgR'), t, tI1 + 0.6, tPush - 0.4, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#qpill'), t, tWho - 0.05, tPush - 0.4, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#ill2'), t, tPush + 0.05, tIout, { dx: 60, dy: 0, ...o });
    M.vis($('#ill2Img'), t, tPush + 0.25, 1e9, { dy: 24, sp: M.SOFT });
  }

  /* ===== D: definitions ===== */
  const dOn = t >= tD1 - 0.05 && t < tL0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#dC'), t, tD2 + 0.1, tDout, { dy: 36, ...o }); M.vis($('#dD'), t, tD3 + 0.05, tDout, { dy: 36, ...o });
    for (const k of ['C', 'D']) {
      const base = k === 'C' ? tD2 : tD3, rr = $('#d' + k);
      M.rise(rr.querySelector('.dt'), t, base + 0.25, { st: 0.06 }); M.vis(rr.querySelector('.ds'), t, base + 0.45, 1e9, { dy: 10 });
      M.vis($('#py' + k), t, base + 0.4, 1e9, { dy: 16, sp: M.SOFT });
      PN.forEach((_, i) => {
        const lvl = i === 0 ? 0 : i < 3 ? 1 : 2;
        const ta = k === 'C' ? (i === 0 ? tTop : 1e9) : tSpread + lvl * 0.3;
        const g = M.io((t - ta) / 0.3);
        $('#pn' + k + i).setAttribute('fill', mix(C.paper2, i === 0 && k === 'C' ? C.ink : C.gold, g));
      });
      PL.forEach(([a, b], i) => { const lvl = b < 3 ? 1 : 2; const g = k === 'D' ? M.io((t - tSpread - lvl * 0.3 + 0.15) / 0.3) : 0; $('#pl' + k + i).setAttribute('stroke', mix(C.line, C.gold2, g)); });
    }
    M.vis($('#sDel'), t, tD4 + 0.05, tDout, { dy: 36, ...o }); M.vis($('#sDelI'), t, tTask, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#sDec'), t, tD5 + 0.05, tDout, { dy: 36, ...o }); M.vis($('#sDecI'), t, tWhole, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
  }

  /* ===== H: the hub (slider, then Ravi's split) ===== */
  const inL = t >= tL0 - 0.1 && t < tT + 0.1, inM = t >= tM0 - 0.1 && t < tK0 + 0.2;
  M.hide($('#sH'), !(inL || inM));
  if (inL || inM) {
    const o = { outDur: 0.3, ody: -16 };
    const hin = inL ? tL0 + 0.1 : tM0 + 0.1, hout = inL ? 1e9 : tMout;
    M.vis($('#hub'), t, hin, hout, { dx: -60, dy: 0, ...o });
    M.vis($('#hubR'), t, hin + 0.2, 1e9, { dy: 10 });
    NX.forEach((_, i) => { M.draw($('#sp' + i), t, hin + 0.3 + i * 0.05, 0.4, M.o3); M.vis($('#nd' + i), t, hin + 0.35 + i * 0.06, 1e9, { dy: 12 }); M.vis($('#nn' + i), t, hin + 0.45 + i * 0.06, 1e9, { dy: 8 }); });
    M.vis($('#hubL'), t, hin + 0.7, 1e9, { dy: 8 });
    let moving = 0;
    DEC.forEach((_, i) => {
      const el = $('#dc' + i), u = down[i](t); M.vis(el, t, hin + 0.4 + i * 0.06, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const settled = Math.abs(u - Math.round(u)) < 0.002; if (!settled) moving = 1;
      snap(el, (settled ? (Math.round(u) ? 412 : 148) : M.lerp(148, 412, u).toFixed(1)) + 'px', 'top');
      const bg = u > 0.5 ? C.gold : C.ink; if (el._bg !== bg) { el._bg = bg; el.style.background = bg; el.style.color = '#fff'; }
      const keep = inM && i < 3 ? pulse(t, tMenu + i * 0.35, 0.6) : 0, sh = (inM && i === 3) ? pulse(t, tShifts - 0.1, 0.6) : (inM && i === 5 ? pulse(t, tStudent, 0.6) : 0);
      const s = Math.max(keep, sh); if (s > 0.001) el.style.transform = `scale(${(1 + 0.08 * s).toFixed(4)})`;
    });
    NX.forEach((_, i) => { const sp = $('#sp' + i); const c = moving ? C.gold : C.line; if (sp._c !== c) { sp._c = c; sp.setAttribute('stroke', c); } });
    const mOn2 = inM && t >= tMeena - 0.1; M.vis($('#ndM'), t, inM ? tMeena - 0.1 : 1e9, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    $('#nd1').querySelector('circle').setAttribute('stroke', mOn2 ? C.gold : C.line);
    $('#nd2').querySelector('circle').setAttribute('stroke', inM && t >= tStudent - 0.1 ? C.gold : C.line);
    // slider card (top right) and the count card (bottom right, until Fayol / the timing card arrive)
    const sl = $('#sld'); M.vis(sl, t, inL ? tL0 + 0.25 : tM0 + 0.25, hout, { dx: 60, dy: 0, ...o });
    let nUp = 0; DEC.forEach((_, i) => { if (down[i](t) < 0.5) nUp++; });
    M.vis($('#cnt'), t, inL ? tL0 + 0.4 : tM0 + 0.4, inL ? tL4 - 0.1 : tM4 - 0.1, { dy: 36, ...o });
    M.setT($('#cnA'), String(nUp)); M.setT($('#cnB'), String(6 - nUp));
    let fr = 0; DEC.forEach((_, i) => fr += 1 - M.clamp(down[i](t))); $('#cnBar').style.width = (688 * fr / 6).toFixed(1) + 'px';
    M.setT($('#sldT'), inL ? 'THE SLIDER' : "RAVI'S SLIDER");
    const u = knobU(t), uS = [0, 0.35, 0.5, 1].find(v => Math.abs(u - v) < 0.001) ?? u;
    snap($('#knob'), (48 + 688 * uS - 28).toFixed(1) + 'px', 'left'); snap($('#trkF'), (688 * uS).toFixed(1) + 'px', 'width');
    M.vis($('#knob'), t, (inL ? tL0 : tM0) + 0.5, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    const rd = $('#rdo'), rtx = inM ? "Ravi's point: half and half" : t < tRight ? 'Head office decides everything' : t < tEither - 0.2 ? 'Every outlet decides for itself' : 'Somewhere in between';
    M.setT($('#rdoT'), rtx); M.vis(rd, t, inL ? tSlider : tMs, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    if (rd._t2 !== rtx) { rd._t2 = rtx; rd._w = rd.offsetWidth; }
    snap(rd, M.clamp(48 + 688 * uS - rd._w / 2, 48, 736 - rd._w).toFixed(1) + 'px', 'left');
    if (inL) {
      M.vis($('#fay'), t, tL4 + 0.12, 1e9, { dy: 36 });
      M.vis($('#fayP'), t, tFayol - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP });
      M.rise($('#fayN'), t, tFayol, { st: 0.06 }); M.vis($('#fayT'), t, tFayol + 0.3, 1e9, { dy: 8 });
      M.rise($('#fayQ'), t, tProp - 0.6, { st: 0.06 }); M.vis($('#fayB'), t, tProp + 0.3, 1e9, { dy: 8 });
    } else M.hide($('#fay'), true);
    if (inM) {
      M.vis($('#mt2'), t, tM4 + 0.12, tMout, { dy: 36, ...o });
      [[0, tStudent, 380], [1, tSameDay, 40]].forEach(([k, ta, w]) => {
        M.vis($('#tbl' + k), t, tM4 + 0.3 + k * 0.1, 1e9, { dy: 8 });
        const uu = M.o5((t - ta) / 0.8), ww = w * uu; $('#tb' + k).style.width = ww.toFixed(1) + 'px'; M.hide($('#tb' + k), ww < 0.5);
        const v = $('#tbv' + k); v.style.left = (220 + ww + 20).toFixed(1) + 'px'; v.style.opacity = M.clamp((t - ta - 0.2) / 0.3).toFixed(3); M.hide(v, t < ta + 0.2);
      });
    } else M.hide($('#mt2'), true);
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

  /* ===== W: which way to lean ===== */
  const wOn = t >= tTu - 0.05 && t < tM0 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const o = { outDur: 0.3, ody: -16 };
    for (const [k, A, T] of [['C', WC, tWc], ['L', WL, tWl]]) {
      const base = k === 'C' ? tW0 + 0.05 : tW0 + 0.2;
      M.vis($('#w' + k), t, base, tWout, { dx: k === 'C' ? -60 : 60, dy: 0, ...o });
      M.vis($('#w' + k + 's'), t, base + 0.3, 1e9, { dy: 10 });
      A.forEach(([ic], i) => {
        const el = $('#w' + k + i); M.vis(el, t, base + 0.4 + i * 0.07, 1e9, { dy: 14 });
        const on = M.io((t - T[i] + 0.1) / 0.3);
        el.querySelector('.bg').style.background = mix(C.paper, k === 'C' ? C.ink : C.gold, on);
        el.querySelector('.rt').style.color = t < T[i] - 0.1 ? C.dim : (on > 0.5 ? '#fff' : C.ink);
        el.querySelector('.ri').style.background = mix('#fff', k === 'C' ? C.navy2 : '#C99A45', on);
        setIco(el.querySelector('.ri'), ic, t < T[i] - 0.1 ? C.dim : (on > 0.5 ? '#fff' : C.gold), 28, 2.2);
      });
    }
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    M.vis($('#kFoot'), t, tK0 + 0.8, 1e9, { dy: 12 });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X: the human side ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    for (const [k, X, T, tp] of [['C', XC, tXc, wt('X3', 'messengers')], ['D', XD, tXd, wt('X4', 'trusted')]]) {
      const base = k === 'C' ? tX1 + 0.1 : tX1 + 0.3;
      M.vis($('#x' + k), t, base, tXout, { dx: k === 'C' ? -60 : 60, dy: 0, ...o });
      M.vis($('#x' + k + 'i'), t, base + 0.25, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      $('#x' + k).querySelectorAll('.xl').forEach((el, c) => M.vis(el, t, base + 0.4 + c * 0.1, 1e9, { dy: 8 }));
      X.forEach((col, c) => col.forEach((_, i) => {
        const el = $('#x' + k + c + i); M.vis(el, t, T[c][i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        el.style.background = c ? C.redBg : C.gold3; el.style.color = c ? C.red : C.ink;
      }));
      M.vis($('#x' + k + 'p'), t, wt('X1', 'people') + (k === 'C' ? 0 : 0.15), 1e9, { dy: 20 });
      M.rise($('#x' + k + 'p').querySelector('.t2'), t, tp - 0.05, { st: 0.05 });
    }
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
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
        const g = M.io((t - a) / 0.2), d = M.io((t - Math.max(b, a + 0.4)) / 0.3);
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
