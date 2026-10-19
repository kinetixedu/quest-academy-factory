// MBA - Principles of Management, Ep 23: Rational Decision-Making
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', redMid: '#D98F7B', navy2: '#24345A', off: '#F0EBE1' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  alert: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 8v4', 'M12 16h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M5 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0', 'M15 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0'],
  route: ['M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15', 'M18 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  brain: ['M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z', 'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z', 'M12 5v13'],
  calc: ['M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M8 6h8', 'M16 14v4', 'M16 10h.01', 'M12 10h.01', 'M8 10h.01', 'M12 14h.01', 'M8 14h.01', 'M12 18h.01', 'M8 18h.01'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  pin: ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tThree = wt('H2', 'Three');
const tSay = [wt('C1', 'Kabir'), wt('C2', 'Asha'), wt('C2', 'Meena')], tNobody = wt('C3', 'nobody');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('I1') - 0.32;
const tI1 = T0('I1'), tI2 = T0('I2'), tFacts = [wt('I2', 'Prices'), wt('I2', 'delivery'), wt('I2', 'taste')], tI3 = T0('I3'), tScore = wt('I3', 'score'), tIout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tUsing = wt('D2', 'using'), tThat = wt('D2', 'that'), tD3 = T0('D3'), tEcon = wt('D3', 'economic');
const tEc = [wt('D4', 'logical'), wt('D4', 'facts'), wt('D4', 'option')], tD5 = T0('D5'), tBest5 = wt('D5', 'best'), tGood = wt('D5', 'good'), tOptim = wt('D5', 'optimising'), tDout = T0('F0') - 0.32;
// F: steps + matrix
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => T0('F' + i)), tFout = T0('U0') - 0.32;
const tCrit = ['quality', 'reliability', 'price', 'distance'].map(w => wt('F2', w));
const tWts = [wt('F3', 'Quality'), wt('F3', 'Reliability'), wt('F3', 'price'), wt('F3', 'distance')];
const tDairy = ['Green', 'Hill', 'River'].map(w => wt('F4', w));
const tHi = [wt('F6', 'Green'), wt('F6', 'Hill'), wt('F6', 'River'), wt('F6', 'close')];
const tMult = wt('F7', 'Multiply'), tAdd = wt('F7', 'add');
const tTot = [wt('F8', 'sixty', 0), wt('F8', 'sixty', 1), wt('F8', 'seventy')], tWins = wt('F9', 'wins'), tValue = wt('F9', 'value');
const STEPT = [tF[0], tF[1], tF[2], tF[3], tF[4], tF[6]];
// U: assumptions
const tU0 = T0('U0'), tU = [1, 2, 3, 4].map(i => T0('U' + i)), tUout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'team'), wt('K3', 'city'), wt('K4', 'Each'), wt('K5', 'airline')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'clear'), wt('X2', 'fair'), wt('X2', 'explain')], tXh = [wt('X3', 'time'), wt('X3', 'money'), wt('X4', 'rarely')];
const tFourth = wt('X4', 'fourth'), tJump = wt('X4', 'jump'), tPrice5 = wt('X5', 'price'), tGreen5 = wt('X5', 'Green'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Decide');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'value')], [wt('S3', 'criteria'), wt('S3', 'weight'), wt('S3', 'compute')], [wt('S4', 'rarely')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
const DAI = ['Green Farm', 'Hill Farm', 'River Dairy'];
$('#dyRow').innerHTML = DAI.map((d, i) => `<div class="dy" id="dy${i}" style="left:${36 + i * 288}px"><div class="ci">${M.icon('milk', 30, C.gold, 2.2)}</div><div class="cs">DAIRY ${'ABC'[i]}</div><div class="cn">${d}</div></div>`).join('');
const SAY = [['kabir', 'The cheapest'], ['asha', 'The best milk'], ['meena', 'The closest']];
$('#ideas').innerHTML = SAY.map(([f, t], i) => `<div class="idp" id="id${i}"><div class="fc" style="${FACE(f)}"></div><span>${t}</span></div>`).join('');
const FR = [['coin', 'PRICES', 'What each dairy charges'], ['truck', 'DELIVERY RECORDS', 'Who arrives on time'], ['cup', 'TASTE TEST', 'Which milk makes the best chai']];
$('#fRows').innerHTML = FR.map(([ic, n, t], i) => `<div class="qr" id="fr${i}" style="top:${96 + i * 120}px"><div class="ri">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="qn">${n}</div><div class="qt">${t}</div><div class="qd">${['G', 'H', 'R'].map(x => `<span>${x}</span>`).join('')}</div></div>`).join('');
$('#hitI').innerHTML = M.icon('calc', 28, C.gold2, 2.2);
wrap($('#ill'), 'illOut', 784, 580);
$('#defI').innerHTML = M.icon('brain', 48, C.gold, 2.2);
['check', 'search', 'list'].forEach((ic, i) => $('#ec' + i + 'I').innerHTML = M.icon(ic, 22, C.gold, 2.4));
const OB = [70, 104, 150, 88, 120];
$('#obars').innerHTML = OB.map((h, i) => `<div class="ob" id="ob${i}" style="left:${36 + i * 96}px;height:${h}px"></div>`).join('');
$('#bestI').innerHTML = M.icon('trophy', 24, C.gold2, 2.2);
// F: steps list
const FS = ['Define the problem', 'Pick the criteria', 'Weight them', 'List alternatives', 'Rate each one', 'Compute and choose'];
$('#flRows').innerHTML = FS.map((t, i) => `<div class="fr" id="fs${i}" style="top:${92 + i * 76}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="rt">${t}</div></div>`).join('');
// matrix
const CR = [['award', 'Quality'], ['clock', 'Reliability'], ['coin', 'Price'], ['pin', 'Distance']], W = [4, 3, 2, 1];
const R = [[5, 5, 10, 5], [10, 4, 6, 3], [7, 10, 5, 8]], TOT = R.map(r => r.reduce((s, v, c) => s + v * W[c], 0));
const DX = d => 412 + d * 228, RY = r => 176 + r * 72;
$('#prbI').innerHTML = M.icon('target', 22, C.gold2, 2.4);
$('#mxH').innerHTML = DAI.map((d, i) => `<div class="mh" id="mh${i}" style="left:${DX(i)}px">${M.icon('milk', 24, C.gold, 2.2)}<span>${d}</span></div>`).join('');
$('#mxC').innerHTML = CR.map(([ic, n], r) => `<div class="mc" id="mc${r}" style="top:${RY(r)}px"><i>${M.icon(ic, 24, C.gold, 2.2)}</i><span>${n}</span></div>`).join('');
$('#mxW').innerHTML = W.map((w, r) => `<div class="mw" id="mw${r}" style="top:${RY(r) + 8}px">x${w}</div>`).join('');
$('#mxE').innerHTML = R.map((row, d) => row.map((v, r) => `<div class="ce" id="ce${d}${r}" style="left:${DX(d)}px;top:${RY(r)}px"><div class="cv"></div><div class="cx"></div></div>`).join('')).join('');
$('#mxT').innerHTML = DAI.map((_, d) => `<div class="tot" id="to${d}" style="left:${DX(d)}px"><div class="tv"></div></div>`).join('');
$('#winI').innerHTML = M.icon('trophy', 22, '#fff', 2.4);
// U: assumptions 2 x 2
const AS = [['target', 'The problem is clear', 'One supplier for five outlets'], ['search', 'Every option is known', 'Only these three dairies exist'], ['heart', 'What you want is clear', 'Quality always matters most'], ['clock', 'No limits on time or money', 'Ravi can wait for every fact']];
$('#aCards').innerHTML = AS.map(([ic, t, e], i) => `<div class="as" id="as${i}" style="left:${i % 2 ? 976 : 160}px;top:${i < 2 ? 270 : 576}px"><div class="bg"></div><div class="ai">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="al">ASSUMPTION 0${i + 1}</div><div class="serif at">${t}</div><div class="hr"></div><div class="ax">AT CHAI CORNER</div><div class="ae">${e}</div><div class="ak" id="ak${i}" style="top:192px;background:#F3EAD6">${M.icon('check', 20, C.gold, 2.6)}Assumed</div></div>`).join('');
// K
const KA = [
  ['list', 'Clear criteria', 'Decide what matters first', 'Quality, reliability, price, distance', 'clipboard', 'A hospital lists safety, cost and service'],
  ['scale', 'Weights', 'Some things count more', 'Quality gets four, distance gets one', 'users', 'Skills count more than years when hiring'],
  ['search', 'All the options', 'Look before you choose', 'Green Farm, Hill Farm, River Dairy', 'landmark', 'A city invites bids from every builder'],
  ['calc', 'Scoring', 'Points for every option', 'Each dairy rated from one to ten', 'award', 'Each bid gets points for price and quality'],
  ['target', 'Optimising', 'Find the single best', 'River Dairy wins on total value', 'plane', 'Software finds the cheapest flight plan'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['RATIONAL TODAY', 'Five habits', 'Big, costly choices use them most', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A CITY</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>The bigger the choice, the more it pays</span></div>`) + `</div>`).join('');
// X
const XG = [['check', 'Clear'], ['scale', 'Fair'], ['bulb', 'Easy to explain']];
const XH = [['clock', 'Facts take time'], ['coin', 'Facts cost money'], ['alert', 'Assumptions fail']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
const XR = [['The problem is clear', ''], ['Every option is known', 'A fourth dairy?'], ['What you want stays the same', 'A price jump?'], ['No limits on time or money', '']];
$('#xRows').innerHTML = XR.map(([t, n], i) => `<div class="rr2" id="xr${i}" style="top:${84 + i * 46}px"><i id="xrI${i}"></i><span>${t}</span>${n ? `<span class="xn" id="xn${i}" style="margin-left:auto;height:36px;padding:0 14px;border-radius:18px;background:#F6E3DC;color:#B5482F;display:flex;align-items:center;font:600 18px Poppins">${n}</span>` : ''}</div>`).join('');
const NEWW = [4, 3, 2, 1].map((_, c) => [3, 1, 4, 2][c]); // quality 3, reliability 1, price 4, distance 2
const TOT2 = R.map(r => r.reduce((s, v, c) => s + v * NEWW[c], 0)); // 70, 64, 67
$('#wBars').innerHTML = DAI.map((d, i) => `<div class="wb" id="wb${i}"><div class="wn">${d}</div><div class="wt"><i></i></div><div class="wv"></div></div>`).join('');
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Rate options', 'Weight criteria', 'Add totals', 'List options'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('scale', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Logic picks the most value', ['Optimise']], ['list', 'Six steps, in order', ['Criteria', 'Weights', 'Compute']], ['alert', 'Assumes full facts, no limits', ['Rarely true']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const fade = (el, o) => { M.hide(el, o <= 0.001); const v = o >= 0.999 ? '' : o.toFixed(3); if (el.style.opacity !== v) el.style.opacity = v; };
const pop = (el, t, a, out = 1e9) => M.vis(el, t, a, out, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
// ranks for the re-weighted bars: before = by TOT, after = by TOT2
const rankOf = arr => { const o = arr.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]).map(x => x[1]); const r = []; o.forEach((i, k) => r[i] = k); return r; };
const RK0 = rankOf(TOT), RK1 = rankOf(TOT2);
const rkT = DAI.map((_, i) => M.track(RK0[i], [[tGreen5 - 0.1, RK1[i]]], M.HEAVY));

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#id' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const tr = $('#tgR'); tr.style.left = (84 - tr.offsetWidth) + 'px'; tr.style.top = '200px';
  ['#dl1', '#dl2'].forEach(s => { const el = $(s); if (el.offsetWidth > 1368) el.style.fontSize = Math.floor(52 * 1368 / el.offsetWidth) + 'px'; });
  x = 36; for (let i = 0; i < 3; i++) { const p = $('#ec' + i); p.style.left = x + 'px'; x += p.offsetWidth + 14; }
  document.querySelectorAll('#aCards .at').forEach(el => { if (el.offsetWidth > 616) el.style.fontSize = Math.floor(40 * 616 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 4]), ...tXh.map((th, i) => [th + 0.1, -12 + (i + 1) * 4])], M.SOFT);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  const exOn = t < tFout + 1 ? [tF[0] + 0.3, tFout] : [tX5, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    M.vis($('#ways'), t, tMorph + 0.3, 1e9, { dy: 36 });
    for (let i = 0; i < 3; i++) M.vis($('#dy' + i), t, tThree + 0.1 + i * 0.15, 1e9, { dy: 16 });
    M.vis($('#ask'), t, tSay[0] - 0.35, 1e9, { dy: 36 });
    for (let i = 0; i < 3; i++) pop($('#id' + i), t, tSay[i] - 0.05);
    M.rise($('#askT'), t, tNobody - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== statement ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== I: every fact ===== */
  const iOn = t >= tTu - 0.05 && t < tD1 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tI1 + 0.05, tIout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tI2);
    M.vis($('#illImg'), t, tI1 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgR'), t, tI1 + 0.6, tI2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#fct'), t, tI2 + 0.12, tIout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 3; i++) {
      M.vis($('#fr' + i), t, tFacts[i] - 0.1, 1e9, { dx: 40, dy: 0 });
      $$fill($('#fr' + i), t, tFacts[i] + 0.3);
    }
    M.vis($('#hit'), t, tScore - 0.2, 1e9, { dy: 20 });
  }

  /* ===== D ===== */
  const dOn = t >= tD1 - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#def'), t, tD2 + 0.1, tDout, { dy: 36, ...o });
    pop($('#defI'), t, tD2 + 0.3);
    M.rise($('#dl1'), t, tUsing - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#dl2'), t, tThat - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#eco'), t, tD3 + 0.05, tDout, { dy: 36, ...o });
    M.rise($('#ecoT'), t, wt('D3', 'perfect') - 0.05, { st: 0.07, sp: M.HEAVY });
    for (let i = 0; i < 3; i++) pop($('#ec' + i), t, tEc[i] - 0.1);
    M.vis($('#opt'), t, tD5 + 0.05, tDout, { dx: 60, dy: 0, ...o });
    OB.forEach((_, i) => { const el = $('#ob' + i); M.vis(el, t, tD5 + 0.3 + i * 0.06, 1e9, { dy: 30, sp: M.SOFT }); el.style.background = i === 2 ? mix(C.line, C.gold, M.io((t - tBest5) / 0.3)) : C.line; });
    pop($('#bestP'), t, tBest5);
    M.draw($('#gdL'), t, tGood - 0.1, 0.5, M.o3); M.vis($('#gdT'), t, tGood, 1e9, { dy: 8 });
  }

  /* ===== F: six steps, live score sheet ===== */
  const fOn = t >= tF0 - 0.1 && t < tU0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fl'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#mx'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...o });
    FS.forEach((_, i) => {
      const el = $('#fs' + i), ta = STEPT[i], td = i < 5 ? STEPT[i + 1] : 1e9;
      M.vis(el, t, tF0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(mix(C.paper, C.ink, act), C.gold3, off);
      el.querySelector('.rt').style.color = t < ta ? C.dim : (act > 0.5 ? '#fff' : C.ink);
      el.querySelector('.rn').style.color = t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold);
    });
    pop($('#prb'), t, tF[0] + 0.3, tWins - 0.3);
    CR.forEach((_, r) => { M.vis($('#mc' + r), t, tCrit[r] - 0.1, 1e9, { dx: -20, dy: 0 }); pop($('#mw' + r), t, tWts[r] - 0.05); });
    DAI.forEach((_, d) => {
      M.vis($('#mh' + d), t, tDairy[d] - 0.1, 1e9, { dy: 16 });
      const win = d === 2 ? M.io((t - tWins) / 0.3) : 0, lose = d < 2 ? M.io((t - tWins) / 0.3) : 0;
      const mh = $('#mh' + d); mh.style.background = mix(mix(C.paper, C.ink, win), C.off, lose); mh.style.color = win > 0.5 ? '#fff' : mix(C.ink, C.dim, lose);
      R[d].forEach((v, r) => {
        const el = $('#ce' + d + r), a = tF[4] + 0.5 + d * 0.5 + r * 0.1;
        pop(el, t, tF0 + 0.7 + (d * 4 + r) * 0.03);
        const hi = (d === 0 && r === 2 && t > tHi[0]) || (d === 1 && r === 0 && t > tHi[1]) || (d === 2 && r === 1 && t > tHi[2]) || (d === 2 && r === 3 && t > tHi[3]);
        const mul = M.io((t - tMult - (d * 4 + r) * 0.05) / 0.25);
        const cv = el.querySelector('.cv'), cx = el.querySelector('.cx');
        M.setT(cv, String(mul > 0.5 ? v * W[r] : v)); cv.style.opacity = (M.clamp((t - a) / 0.15) * Math.abs(mul - 0.5) * 2).toFixed(3);
        M.setT(cx, mul > 0.5 ? `${v}x${W[r]}` : '');
        el.style.background = mix(mix(hi ? C.gold3 : C.paper, C.ink, win), C.off, lose);
        cv.style.color = win > 0.5 ? '#fff' : (lose > 0.5 ? C.dim : (hi ? C.gold : C.ink));
        cx.style.color = win > 0.5 ? C.gold2 : C.muted;
      });
      const to = $('#to' + d); M.vis(to, t, tAdd, 1e9, { dy: 16 });
      const cu = M.o3((t - tTot[d] + 0.1) / 0.8);
      M.setT(to.querySelector('.tv'), t < tTot[d] - 0.1 ? '?' : String(Math.round(TOT[d] * cu)));
      to.style.background = mix(mix(C.paper, C.gold, win), C.off, lose);
      to.querySelector('.tv').style.color = win > 0.5 ? '#fff' : (lose > 0.5 ? C.dim : (t < tTot[d] - 0.1 ? C.dim : C.ink));
    });
    M.vis($('#mxL'), t, tAdd + 0.1, 1e9, { dy: 8 });
    const wn = $('#win'); if (!wn._l) { wn._l = 1; wn.style.left = (DX(2) + 102 - wn.offsetWidth / 2) + 'px'; } pop(wn, t, tWins + 0.3);
  }

  /* ===== U: four assumptions ===== */
  const uOn = t >= tU0 - 0.1 && t < tK0 + 0.2; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.rise($('#uq'), t, tU0 + 0.05, { st: 0.07, sp: M.HEAVY, out: tU[0] - 0.15, outDur: 0.3 });
    AS.forEach((_, i) => {
      const el = $('#as' + i); M.vis(el, t, tU[i] + 0.02, tUout, { dy: 36, outDur: 0.3, ody: -16 });
      M.rise(el.querySelector('.at'), t, tU[i] + 0.2, { st: 0.05, sp: M.HEAVY });
      M.vis(el.querySelector('.ae'), t, tU[i] + 0.6, 1e9, { dy: 10 });
      pop($('#ak' + i), t, tU[i] + 0.9);
    });
  }

  /* ===== K ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 4 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 5 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.7, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X: the human side ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    $('#beam').setAttribute('transform', `rotate(${a.toFixed(3)} 344 40)`);
    $('#panL').setAttribute('transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    $('#panR').setAttribute('transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) {
      pop($('#xg' + i), t, tXg[i] - 0.05); pop($('#xh' + i), t, tXh[i] - 0.05);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    XR.forEach((_, i) => {
      const el = $('#xr' + i); M.vis(el, t, tX4 + 0.35 + i * 0.1, 1e9, { dy: 10 });
      const bad = t > wt('X4', 'rarely') + i * 0.15; setIco($('#xrI' + i), bad ? 'x' : 'check', bad ? C.red : C.gold, 20, 2.6);
      $('#xrI' + i).style.background = bad ? C.redBg : C.gold3;
      el.style.color = bad ? C.ink2 : C.ink;
    });
    pop($('#xn1'), t, tFourth - 0.05); pop($('#xn2'), t, tJump - 0.05);
    M.vis($('#nwL'), t, tX5 - 0.1, 1e9, { dy: 8 });
    DAI.forEach((_, i) => {
      const el = $('#wb' + i); M.vis(el, t, tX5 + 0.1 + i * 0.08, 1e9, { dx: 30, dy: 0 });
      const rk = rkT[i](t); el.style.top = (340 + rk * 64).toFixed(1) + 'px';
      const u = M.io((t - tPrice5 - 0.1) / 0.6), v = M.lerp(TOT[i], TOT2[i], u);
      const bar = el.querySelector('i'); bar.style.width = (v * 4.6).toFixed(1) + 'px';
      const lead = (u < 0.5 ? RK0 : RK1)[i] === 0;
      bar.style.background = lead ? C.gold : C.dim;
      M.setT(el.querySelector('.wv'), String(Math.round(v))); el.querySelector('.wv').style.color = lead ? C.gold : C.ink;
    });
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'What') - 0.05, { st: 0.06, sp: M.HEAVY });
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

  /* ===== recap ===== */
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
// small helper: the G / H / R chips light up once that fact is collected
function $$fill(row, t, a) { row.querySelectorAll('.qd span').forEach((s, k) => { const g = M.io((t - a - k * 0.12) / 0.2); s.style.background = mix('#FFFFFF', C.gold, g); s.style.color = g > 0.5 ? '#fff' : C.muted; }); }

M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
