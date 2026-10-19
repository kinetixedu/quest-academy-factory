// MBA - Principles of Management, Ep 13: Contingency Approach
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
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  msg: ['M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z', 'M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1'],
  umbrella: ['M22 12a10.06 10.06 1 0 0-20 0Z', 'M12 12v8a2 2 0 0 0 4 0', 'M12 2v1'],
  rain: ['M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242', 'M16 14v6', 'M8 14v6', 'M12 16v6'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  pulse: ['M22 12h-4l-3 9L9 3l-3 9H2'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M12 18h.01'],
  factory: ['M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M17 18h1', 'M12 18h1', 'M7 18h1'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  hourglass: ['M5 22h14', 'M5 2h14', 'M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22', 'M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  rocket: ['M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z', 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z', 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0', 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'],
  megaphone: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tChats = wt('H2', 'chats'), tShares = wt('H2', 'shares'), tIdeas = wt('H2', 'ideas');
const tC1 = T0('C1'), tBeaut = wt('C1', 'beautifully'), tC2 = T0('C2'), tRush = wt('C2', 'rush'), tCalls = wt('C2', 'calls');
const tC3 = T0('C3'), tThirty = wt('C3', 'Thirty'), tCold = wt('C3', 'cold');
const tB1 = T0('B1'), tB2 = T0('B2'), tPoints = wt('B2', 'points'), tB3 = T0('B3');
const tBrews = wt('B3', 'brews'), tMoney = wt('B3', 'money'), tMeena = wt('B3', 'Meena'), tB4 = T0('B4'), tMoves = wt('B4', 'moves'), tSmiling = wt('B4', 'smiling');
const tAout = tB1 - 0.32, tT = T0('T1'), tSt2 = wt('T1', 'It'), tTu = T0('D1') - 0.32, tBout = tT - 0.3;
const tD1 = T0('D1'), tD2 = T0('D2'), tDep = wt('D2', 'depending'), tD3 = T0('D3'), tTaylor = wt('D3', 'Taylor'), tOne = wt('D3', 'one');
const tD4 = T0('D4'), tRight = wt('D4', 'right'), tSitu = wt('D4', 'situation'), tDout = T0('W1') - 0.32;
// W: the research
const tW1 = T0('W1'), tW = [T0('W2'), T0('W4'), T0('W5'), T0('W6')], tWout = T0('M1') - 0.32;
const tStable = wt('W2', 'stable'), tStrict = wt('W2', 'strict'), tFast = wt('W3', 'fast'), tFlex = wt('W3', 'flexible');
const tHund = wt('W4', 'hundred'), tTech = wt('W4', 'technology'), tEnv = wt('W5', 'environment'), tWbest = wt('W6', 'best'), tWsit = wt('W6', 'situation');
// M: rule + runs
const tM1 = T0('M1'), tM2 = T0('M2'), tQuiet = wt('M2', 'quiet'), tChat2 = wt('M2', 'chats'), tM3 = T0('M3'), tLong = wt('M3', 'long'), tFirm = wt('M3', 'firm');
const tM4 = T0('M4'), tTwo = wt('M4', 'two'), tM5 = T0('M5'), tM6 = T0('M6'), tJob = wt('M6', 'job'), tM7 = T0('M7'), tThree = wt('M7', 'three'), tFit = wt('M7', 'fit');
const tMout = T0('P0') - 0.32;
const RUN = { L: [tM4 + 0.9, T1('M5') - 0.1], R: [tM6 + 0.3, tThree] };
// P: four factors
const tP0 = T0('P0'), tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
const tSixty = wt('P1', 'sixty'), tTools = wt('P2', 'tools'), tPstable = wt('P3', 'stable'), tPchg = wt('P3', 'changing'), tPsteps = wt('P4', 'steps'), tPfree = wt('P4', 'freedom');
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'emergency'), wt('K3', 'phone'), wt('K4', 'nurse')];
// X: the human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'real'), wt('X2', 'flexible')], tXh = [wt('X3', 'ready'), wt('X3', 'read', 1)];
const tXwrong = wt('X4', 'wrong'), tXslow = wt('X4', 'slowly'), tXcrit = wt('X5', 'Critics'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'rush') - 0.15;
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'depends')], ['Size', 'technology', 'environment', 'people'].map(w => wt('S3', w)), [wt('S4', 'Read'), wt('S4', 'pick')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// A: the team + chat bubbles
const TEAM = ['ravi', 'asha', 'kabir', 'meena', null, null];
$('#wAv').innerHTML = TEAM.map((n, i) => n ? `<div class="av face sm" id="wa${i}" style="left:${36 + i * 84}px;top:88px;${FACE(n)}">${n[0]}</div>` : `<div class="av sm ic" id="wa${i}" style="left:${36 + i * 84}px;top:88px">${M.icon('user', 30, C.muted, 2.2)}</div>`).join('');
$('#chatPI').innerHTML = M.icon('msg', 24, C.gold2, 2.2);
const BUBS = ['Ginger chai?', 'Bigger cups?', 'New biscuits?'];
$('#bubs').innerHTML = BUBS.map((b, i) => `<div class="bub" id="bb${i}">${M.icon('msg', 22, C.gold, 2.2)}<span>${b}</span></div>`).join('');
const TR = [['sun', '3 PM · Slow afternoon'], ['clock', '8 AM · Morning rush']];
$('#tRows').innerHTML = TR.map(([ic, t], i) => `<div class="tr" id="tr${i}" style="top:${80 + i * 92}px"><div class="bg"></div><div class="ri">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="rt">${t}</div>${i ? '<div class="rq" id="rq">0 waiting</div>' : ''}<div class="rs" id="rs${i}"></div></div>`).join('');
$('#rs0').innerHTML = M.icon('check', 22, '#fff', 3) + '<span>Works well</span>'; $('#rs0').style.cssText += ';background:#B8862F;color:#fff';
$('#rs1').innerHTML = M.icon('x', 22, C.red, 3) + '<span>Chai goes cold</span>'; $('#rs1').style.cssText += ';background:#F6E3DC;color:#B5482F';
// B: one job each
const JOBS = [['asha', 'Asha', 'TEA MAKER', 'flame', 'Brews'], ['kabir', 'Kabir', 'CASH BOX', 'coin', 'Takes the money'], ['meena', 'Meena', 'CLEANING', 'droplet', 'Clean cups']];
$('#jRows').innerHTML = JOBS.map(([f, n, l, ic, j], i) => `<div class="jr" id="jr${i}" style="top:${92 + i * 112}px"><div class="bg"></div><div class="av face" style="${FACE(f)}">${n[0]}</div><div class="jn">${n}</div><div class="jl">${l}</div><div class="jc" id="jc${i}">${M.icon(ic, 24, C.gold, 2.2)}<span>${j}</span></div></div>`).join('');
$('#qDots').innerHTML = Array.from({ length: 8 }, (_, i) => `<div class="qd" id="qd${i}" style="left:${48 + i * 40}px;top:476px"></div>`).join('');
$('#smileI').innerHTML = M.icon('smile', 24, '#fff', 2.2);
// D
$('#wc0I').innerHTML = M.icon('rain', 24, C.ink, 2.2); $('#wc1I').innerHTML = M.icon('umbrella', 24, C.gold2, 2.2);
$('#nAv').innerHTML = M.icon('split', 40, C.gold2, 2.2);
wrap($('#word'), 'wordOut', 784, 580);

// W: the research (list + panes)
const WR = [['1961', 'scale', 'Burns and Stalker'], ['1965', 'factory', 'Joan Woodward'], ['1967', 'globe', 'Lawrence and Lorsch'], ['1960s', 'users', 'Fred Fiedler']];
$('#wRows').innerHTML = WR.map(([y, ic, t], i) => `<div class="yr" id="wr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">${y}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const flat = `<svg class="abs" style="left:0;top:2px" width="64" height="36"><path d="M2 18 H62" stroke="#14213D" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`;
const zig = `<svg class="abs" style="left:0;top:2px" width="64" height="36"><path d="M2 26 l10 -16 l10 16 l10 -16 l10 16 l10 -16 l10 16" stroke="#B5482F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
const WV = [
  `<div class="abs" id="bs0" style="left:0;top:0;width:412px;height:176px">${flat}<div class="ct2">Stable market</div><div class="vc nv" id="bc0" style="left:0;top:60px">${M.icon('clipboard', 22, C.gold2, 2.2)}<span>Strict rules</span></div><div class="lbl" id="bl0" style="left:0;top:136px">MECHANISTIC</div></div>
   <div class="abs" id="bs1" style="left:436px;top:0;width:412px;height:176px">${zig}<div class="ct2">Fast changing market</div><div class="vc gd" id="bc1" style="left:0;top:60px">${M.icon('users', 22, '#fff', 2.2)}<span>Flexible teams</span></div><div class="lbl" id="bl1" style="left:0;top:136px">ORGANIC</div></div>`,
  `<div class="vc" id="wf" style="left:0;top:0">${M.icon('factory', 24, C.gold, 2.2)}<span>100 factories studied</span></div>` +
   [['UNIT', 'Made to order'], ['MASS', 'Assembly line'], ['PROCESS', 'Non-stop flow']].map(([l, t], i) => `<div class="tb" id="tb${i}" style="left:${i * 292}px"><div class="lbl">${l}</div><div class="tx">${t}</div></div>`).join(''),
  [['users', 'Customers'], ['target', 'Rivals'], ['zap', 'New technology']].map(([ic, t], i) => `<div class="vc" id="lc${i}" style="top:0">${M.icon(ic, 22, C.gold, 2.2)}<span>${t}</span></div>`).join('') +
   `<svg class="abs" id="lArr" style="left:0;top:58px" width="848" height="56">${[141, 424, 707].map((x, i) => `<path id="la${i}" d="M${x} 4 V44 M${x - 9} 35 L${x} 46 L${x + 9} 35" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</svg>
   <div id="lbar">${M.icon('network', 26, C.gold2, 2.2)}<span style="margin-left:12px">The best structure for the firm</span></div>`,
  ['Easy situation', 'In between', 'Hard situation'].map((s, i) => `<div class="fs" id="fs${i}" style="left:${i * 288}px">${s}</div>`).join('') +
   ['Task-focused', 'People-focused', 'Task-focused'].map((s, i) => `<div class="vc ${i === 1 ? 'gd' : 'nv'}" id="fl${i}" style="top:96px">${M.icon(i === 1 ? 'heart' : 'target', 22, i === 1 ? '#fff' : C.gold2, 2.2)}<span>${s}</span></div>`).join(''),
];
const WP = [['THE RESEARCH', 'Four studies', 'All found the same thing', 'ONE FINDING', null]].concat([
  ['STUDY 01 · 1961', 'Burns and Stalker', 'Strict or flexible? It depends on the market', 'WHAT THEY FOUND'],
  ['STUDY 02 · 1965', 'Joan Woodward', 'Technology shapes the best structure', 'THREE KINDS OF FACTORY'],
  ['STUDY 03 · 1967', 'Lawrence and Lorsch', 'The environment shapes it too', 'WHAT PRESSES ON A FIRM'],
  ['STUDY 04 · 1960s', 'Fred Fiedler', 'The best leader fits the situation', 'WHICH LEADER DOES BEST']].map((p, i) => [...p, WV[i]]));
$('#wPans').innerHTML = WP.map(([s, t, m, x, v], i) => `<div class="pn" id="wn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="wv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('split', 34, C.gold, 2.2)}</i><span>There is no one best way. It depends.</span></div>`}</div>`).join('');

// M: the rule card + the situation card
const RB = [['sun', 'The stall is quiet', 'msg', 'Team chat, share ideas'], ['users', 'The queue is long', 'megaphone', 'Quick, firm orders']];
$('#rRb').innerHTML = RB.map(([i1, s, i2, a], i) => `<div class="rb" id="rb${i}" style="top:${196 + i * 184}px"><div class="bg"></div>
  <div class="bd" id="rbi${i}" style="top:24px">IF</div><div class="rx" id="rbs${i}" style="top:27px"><span class="ri1"></span><span>${s}</span></div>
  <div class="bd" id="rbt${i}" style="top:88px">THEN</div><div class="rx" id="rba${i}" style="top:91px"><span class="ri2"></span><span>${a}</span></div></div>`).join('');
wrap($('#rcard'), 'ruleOut', 784, 580);
let ck = ''; for (let k = 0; k < 12; k++) { const a = k * 30 * Math.PI / 180; ck += `<line x1="${(120 + 92 * Math.sin(a)).toFixed(1)}" y1="${(120 - 92 * Math.cos(a)).toFixed(1)}" x2="${(120 + (k % 3 ? 84 : 78) * Math.sin(a)).toFixed(1)}" y2="${(120 - (k % 3 ? 84 : 78) * Math.cos(a)).toFixed(1)}" stroke="${k % 3 ? '#B9B1A3' : '#14213D'}" stroke-width="${k % 3 ? 4 : 6}" stroke-linecap="round"/>`; }
$('#clkT').innerHTML = ck;
$('#sDots').innerHTML = Array.from({ length: 15 }, (_, i) => `<div class="qd" id="sd${i}" style="left:${i * 46}px"></div>`).join('');

// M: the same rush run two ways. Lane coords inside a 688 x 250 svg.
const STN = [['asha', 'BREW'], ['kabir', 'BILL'], ['meena', 'CUPS']];
const CHAT = [[404, 70], [450, 46], [496, 70]];            // staff huddled around a table, talking
const POST = [[566, 50], [566, 125], [566, 200]];          // staff at their stations
const QY = 170, Q0 = 474, QS = 34, NV = 12;                // queue line, first slot, spacing, visible slots
const WAYS = {
  L: { name: 'STYLE A · TEAM CHAT', wait: 12, serve: false, T: RUN.L },
  R: { name: 'STYLE B · FIRM ORDERS', wait: 3, serve: true, T: RUN.R },
};
for (const k of ['L', 'R']) {
  const W = WAYS[k];
  const stations = STN.map(([f, l], i) => `<g id="st${k}${i}" transform="translate(538 ${18 + i * 75})"><rect width="134" height="64" rx="14" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><circle cx="28" cy="32" r="21" fill="#EEE8DB"/><text x="62" y="39" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2" fill="#8A8274">${l}</text></g>`).join('');
  const staff = STN.map(([f], i) => `<g id="sf${k}${i}" transform="translate(${CHAT[i][0]} ${CHAT[i][1]})"><circle r="23" fill="#14213D"/><image href="${IMG}${f}-face.jpg" x="-20" y="-20" width="40" height="40" clip-path="url(#fc${k})"/></g>`).join('');
  const dots = Array.from({ length: 30 }, (_, i) => `<circle id="cu${k}${i}" r="13" fill="${i % 3 === 1 ? '#3A4560' : '#14213D'}"/>`).join('');
  $('#m' + k + 'In').innerHTML = `<div class="mav" style="${FACE('ravi')}"></div><div class="lbl mlb">${W.name}</div><div class="serif mrd" id="rd${k}"><span class="mu">WAIT</span><span id="rdv${k}">0 min</span></div>
    <svg class="mplan" id="plan${k}" width="688" height="250"><defs><clipPath id="fc${k}"><circle cx="0" cy="0" r="20"/></clipPath><clipPath id="lc${k}"><rect width="688" height="250" rx="24"/></clipPath></defs>
      <g clip-path="url(#lc${k})"><rect width="688" height="250" fill="#F5F1E8"/>
      <rect x="524" y="0" width="164" height="250" fill="#EEE8DB"/>${stations}
      <line x1="24" y1="${QY + 26}" x2="500" y2="${QY + 26}" stroke="#E2DACB" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
      ${dots}
      <g id="tb${k}"><ellipse cx="450" cy="96" rx="40" ry="12" fill="#E2DACB"/></g>
      <g id="bub${k}" transform="translate(334 30)"><rect width="40" height="30" rx="10" fill="#B5482F"/><circle cx="12" cy="15" r="3" fill="#fff"/><circle cx="20" cy="15" r="3" fill="#fff"/><circle cx="28" cy="15" r="3" fill="#fff"/></g>
      ${staff}
      <g id="ov${k}"><rect x="16" y="${QY - 18}" width="64" height="36" rx="18" fill="#B5482F"/><text id="ovt${k}" x="48" y="${QY + 7}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="18" fill="#fff">+0</text></g></g>
    </svg>
    <div class="mbar" id="bar${k}"><i id="bf${k}"></i></div>
    <div class="mtk" id="tk0${k}" style="left:48px">0 IN THE QUEUE</div><div class="mtk" id="tk1${k}" style="right:48px">30</div>
    <div class="mst lg" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
}

// P: four factors (list + panes)
const PR = [['users', 'Size'], ['gear', 'Technology'], ['globe', 'Environment'], ['user', 'People']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="pr" id="pr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
let grid = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 15; c++) grid += `<circle cx="${10 + c * 26}" cy="${10 + r * 26}" r="8" fill="${(r * 15 + c) % 4 ? '#3A4560' : '#B8862F'}"/>`;
const PV = [
  TEAM.map((n, i) => n ? `<div class="av face" id="z${i}" style="left:${i * 60}px;top:16px;width:48px;height:48px;${FACE(n)};box-shadow:0 0 0 3px #14213D">${n[0]}</div>` : `<div class="av ic" id="z${i}" style="left:${i * 60}px;top:16px;width:48px;height:48px;box-shadow:0 0 0 3px #E2DACB">${M.icon('user', 24, C.muted, 2.2)}</div>`).join('') +
   `<div class="vc" id="zc0" style="left:0;top:112px">${M.icon('check', 22, C.gold, 3)}<span>6 people: a few rules</span></div>
    <svg class="abs" id="zg" style="left:452px;top:0" width="390" height="100">${grid}</svg>
    <div class="vc nv" id="zc1" style="left:452px;top:112px">${M.icon('clipboard', 22, C.gold2, 2.2)}<span>60 people: written rules</span></div>`,
  `<div class="abs" id="tq0" style="left:0;top:0;width:412px;height:176px"><i class="abs" style="left:0;top:0;width:64px;height:64px;border-radius:32px;background:#F5F1E8;display:flex;align-items:center;justify-content:center">${M.icon('flame', 30, C.gold, 2.2)}</i><div class="ct2" style="top:14px">A pot on a stove</div><div class="vc" style="left:0;top:96px">${M.icon('user', 22, C.gold, 2.2)}<span>Skill matters most</span></div></div>
   <div class="abs" id="tq1" style="left:436px;top:0;width:412px;height:176px"><i class="abs" style="left:0;top:0;width:64px;height:64px;border-radius:32px;background:#14213D;display:flex;align-items:center;justify-content:center">${M.icon('gear', 30, C.gold2, 2.2)}</i><div class="ct2" style="top:14px">A tea machine</div><div class="vc nv" style="left:0;top:96px">${M.icon('wrench', 22, C.gold2, 2.2)}<span>Upkeep matters most</span></div></div>`,
  `<svg class="abs" style="left:0;top:0" width="848" height="176" fill="none" stroke-linecap="round" stroke-linejoin="round"><path id="ev0" d="M8 36 H248" stroke="#14213D" stroke-width="6"/><path id="ev1" d="M8 136 l30 -26 l30 26 l30 -26 l30 26 l30 -26 l30 26 l30 -26 l20 18" stroke="#B5482F" stroke-width="5"/></svg>
   <div class="abs" id="et0" style="left:288px;top:14px;font:600 28px Poppins;white-space:nowrap">Stable: <span style="color:#3A4560;font-weight:500">the same crowd every day</span></div>
   <div class="abs" id="et1" style="left:288px;top:110px;font:600 28px Poppins;white-space:nowrap;color:#B5482F">Changing: <span style="color:#3A4560;font-weight:500">festival, rain, a new rival</span></div>`,
  `<div class="abs" id="pq0" style="left:0;top:0;width:412px;height:176px"><div class="av ic" style="left:0;top:0;width:64px;height:64px;box-shadow:0 0 0 3px #E2DACB">${M.icon('user', 30, C.muted, 2.2)}</div><div class="ct2" style="top:14px">A new helper</div><div class="vc" id="pc0" style="left:0;top:96px">${M.icon('clipboard', 22, C.gold, 2.2)}<span>Clear steps: 1, 2, 3</span></div></div>
   <div class="abs" id="pq1" style="left:436px;top:0;width:412px;height:176px"><div class="av face" style="left:0;top:0;width:64px;height:64px;${FACE('asha')};box-shadow:0 0 0 3px #B8862F">A</div><div class="ct2" style="top:14px">Asha, the expert</div><div class="vc gd" id="pc1" style="left:0;top:96px">${M.icon('bulb', 22, '#fff', 2.2)}<span>Freedom to decide</span></div></div>`,
];
const PP = [['FOUR FACTORS', 'It depends on...', 'Four big things shape the right way', 'IN SHORT', null]].concat([
  ['FACTOR 01 / 04', 'Size', 'Six people need fewer rules than sixty', 'SMALL TEAM VS BIG TEAM'],
  ['FACTOR 02 / 04', 'Technology', 'The tools and methods you use', 'TWO WAYS TO MAKE CHAI'],
  ['FACTOR 03 / 04', 'Environment', 'Customers, prices and rivals', 'STABLE OR CHANGING FAST?'],
  ['FACTOR 04 / 04', 'People', 'Match the style to the person', 'AT CHAI CORNER']].map((p, i) => [...p, PV[i]]));
const buildPans = (sel, list, pre, peIc, peTx) => { $(sel).innerHTML = list.map(([s, t, m, x, v], i) => `<div class="pn" id="${pre}n${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="${pre}v${i}">${v}</div>` : `<div class="pe"><i>${M.icon(peIc, 34, C.gold, 2.2)}</i><span>${peTx}</span></div>`}</div>`).join(''); };
buildPans('#pPans', PP, 'p', 'eye', 'Read these four before you choose');

// K: at work today
const KA = [
  ['network', 'Structure', 'Rules that fit the size and the market', 'Six people, a few simple rules', 'bank', 'A bank: strict rules. A startup: flexible'],
  ['megaphone', 'Leadership', 'Lead to fit the moment', 'Firm orders in a rush, chats when quiet', 'pulse', 'Emergency room: quick, firm orders'],
  ['calendar', 'Planning', 'Plan for the environment you face', 'Extra milk and cups before festival day', 'phone', 'A phone maker changes plans often'],
  ['users', 'People', 'Match the style to the person', 'Clear steps for helpers, freedom for Asha', 'clipboard', 'New nurse: checklist. Senior nurse: decides'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="pr" id="kr${i}" style="top:${96 + i * 118}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['IT DEPENDS, AT WORK', 'Four areas', 'You will see it in every workplace', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same idea, any size of team</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['globe', 'Fits real life'], ['split', 'Keeps managers flexible']];
const XH = [['help', 'No ready answer'], ['eye', 'Must read it first']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 64}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 64}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#xNodeI').innerHTML = M.icon('eye', 26, C.gold2, 2.2);
$('#xr0I').innerHTML = M.icon('alert', 22, C.red, 2.4); $('#xr1I').innerHTML = M.icon('hourglass', 22, C.red, 2.4);
$('#bothI').innerHTML = M.icon('eye', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
wrap($('#ill'), 'illOut', 784, 580);

// quiz
const OPTS = ['Long team chat', 'Quick, firm orders', 'Vote on it', 'Close early'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('megaphone', 44, C.gold2, 2.4);
// recap
const ROWS = [['split', 'No one best way', ['It depends']], ['eye', 'Four factors', ['Size', 'Technology', 'Environment', 'People']], ['target', 'Think if-then', ['Read', 'Pick']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
// a card that starts at full width (1600) and shrinks to 784 when its sibling arrives
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const pop = (el, t, ta, tout = 1e9) => M.vis(el, t, ta, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
// list rows that turn navy while their pane is up
const runRows = (t, pre, n, icons, tOn, t0, tEnd) => {
  for (let i = 0; i < n; i++) {
    const el = $('#' + pre + i), ta = tOn[i], td = i < n - 1 ? tOn[i + 1] : tEnd + 1;
    M.vis(el, t, t0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
    const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
    el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
    el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
    el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
    el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
    setIco(el.querySelector('.ri'), icons[i], t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
  }
};
// pane k of a list+pane scene: returns [tin, tout] or null when hidden
const paneHead = (pn, t, tin, tout, withPx = true) => {
  const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return false;
  const oo = { outDur: 0.18, ody: -12 };
  M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
  M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
  M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
  M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
  if (withPx) M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
  return true;
};
// the same morning rush, simulated over 20 minutes (example figures)
const runRush = (k, t) => {
  const W = WAYS[k], [a, b] = W.T, s = 20 * M.clamp((t - a) / (b - a)), done = t >= b;
  const arrived = Math.min(30, 1.5 * s), served = W.serve ? M.clamp(1.5 * (s - 2.6), 0, 30) : 0;
  let maxK = 0;
  for (let i = 0; i < 30; i++) {
    const el = $('#cu' + k + i), si = i / 1.5;
    if (s < si || t < a) { M.hide(el, true); continue; }
    const kq = i - served;
    let x, y = QY, op = 1;
    if (kq < 0) { const u = M.clamp(-kq); x = Q0 + 36 + u * 40; y = QY - u * 30; op = 1 - u; } // being served: step up to the counter
    else { const tx = Q0 - kq * QS, wv = M.io((s - si) / 0.9); x = M.lerp(-30, tx, wv); maxK = Math.max(maxK, kq); }
    M.hide(el, op <= 0.02 || kq >= NV);
    el.setAttribute('cx', x.toFixed(1)); el.setAttribute('cy', y.toFixed(1)); el.style.opacity = op.toFixed(3);
  }
  const queue = Math.max(0, Math.floor(arrived) - Math.floor(served)), over = Math.max(0, queue - NV);
  M.hide($('#ov' + k), over <= 0); M.setT($('#ovt' + k), '+' + over);
  // staff: huddle and talk (A) or walk to their stations (B)
  const go = W.serve ? M.io((t - tJob + 0.4) / 0.6) : 0;
  STN.forEach((_, i) => {
    const p = [M.lerp(CHAT[i][0], POST[i][0], go), M.lerp(CHAT[i][1], POST[i][1], go)];
    $('#sf' + k + i).setAttribute('transform', go >= 1 ? `translate(${POST[i][0]} ${POST[i][1]})` : `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
    const r = $('#st' + k + i).querySelector('rect'), c = go > 0.9 ? C.gold : C.line; if (r._c !== c) { r._c = c; r.setAttribute('stroke', c); r.setAttribute('stroke-width', go > 0.9 ? 4 : 2); }
  });
  $('#tb' + k).style.opacity = (1 - go).toFixed(3);
  const bub = $('#bub' + k); M.hide(bub, go > 0.5); if (go <= 0.5) bub.setAttribute('transform', `translate(334 ${(30 - 3 * Math.abs(Math.sin(t * 3))).toFixed(1)})`);
  // wait time, queue bar, step pill
  const wait = W.serve ? Math.min(W.wait, s * 1.15) : W.wait * s / 20;
  M.setT($('#rdv' + k), Math.round(wait) + ' min');
  $('#rd' + k).style.color = done ? (W.serve ? C.gold : C.red) : C.ink;
  const bf = $('#bf' + k); bf.style.left = '0px'; bf.style.width = (688 * queue / 30).toFixed(1) + 'px'; bf.style.background = queue > 10 ? '#D98F7B' : C.gold;
  M.setT($('#tk0' + k), queue + ' IN THE QUEUE');
  const ms = $('#ms' + k);
  let ic, tx, tm = '', bad = 0, fin = 0;
  if (done) { fin = 1; bad = !W.serve; ic = W.serve ? 'check' : 'hourglass'; tx = W.serve ? '3 minute wait' : '12 minute wait'; tm = W.serve ? 'queue moving' : '30 in the queue'; }
  else if (t < a + 0.05) { ic = 'clock'; tx = '8:00 AM, the rush begins'; }
  else if (!W.serve) { ic = 'msg'; tx = 'Everyone is talking'; tm = 'nobody serves'; bad = 1; }
  else if (go < 1) { ic = 'megaphone'; tx = 'Ravi gives the orders'; }
  else { ic = 'users'; tx = 'Brew, bill, cups'; tm = 'one job each'; }
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx); M.setT(ms.querySelector('.tm'), tm);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  $('#chatP').style.left = (884 - $('#chatP').offsetWidth) + 'px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#bb' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  $('#rq').style.right = (14 + $('#rs1').offsetWidth + 24) + 'px';
  // festival tags beside the picture while the card is full width (picture spans 500..1100)
  $('#tgQ').style.cssText += `;left:${60 - $('#tgQ').offsetWidth}px;top:330px`;
  ['tgR', 'tgA', 'tgK'].forEach((id, i) => { $('#' + id).style.cssText += `;left:724px;top:${190 + i * 76}px`; });
  // D
  x = 48; const c0 = $('#wc0'); x += c0.offsetWidth + 16; $('#wA').style.left = x + 'px'; x += 76; $('#wc1').style.left = x + 'px';
  $('#oX').setAttribute('width', $('#oT').offsetWidth + 16); $('#oXL').setAttribute('x2', $('#oT').offsetWidth + 8);
  // W pane 2/3/4 layouts
  [0, 1, 2].forEach(i => { const c = $('#lc' + i); c.style.left = ([141, 424, 707][i] - c.offsetWidth / 2) + 'px'; });
  [0, 1, 2].forEach(i => { const c = $('#fl' + i); c.style.left = (i * 288 + 136 - c.offsetWidth / 2) + 'px'; });
  // rule badges + text
  for (let i = 0; i < 2; i++) { setIco($('#rbs' + i + ' .ri1'), RB[i][0], C.gold, 28, 2.2); setIco($('#rba' + i + ' .ri2'), RB[i][2], C.gold, 28, 2.2); }
  $('#ab1').style.left = ($('#ab0').offsetWidth + 16) + 'px';
  // X fork
  const xn = $('#xNode'); xn.style.left = (392 - xn.offsetWidth / 2) + 'px';
  [[0, 220], [1, 564]].forEach(([i, cx]) => { const r = $('#xr' + i); r.style.left = (cx - r.offsetWidth / 2) + 'px'; });
  // pane titles fit 848
  document.querySelectorAll('#kPans .pt, #pPans .pt, #wPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#wPans .pm, #pPans .pm, #kPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 5]), ...tXh.map((th, i) => [th + 0.1, -10 + (i + 1) * 5])], M.SOFT);
const hrT = M.track(90, [[tLong - 0.1, 240, M.HEAVY]]), mnT = M.track(0, [[tLong - 0.1, 1800 + 0, M.HEAVY]]);

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
  const exOn = t < tTu ? [tThirty - 0.2, tAout] : [tM4 + 0.4, tMout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: one style, two times of day ===== */
  const aOn = t < tB1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    TEAM.forEach((_, i) => M.vis($('#wa' + i), t, tMorph + 0.6 + i * 0.07, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }));
    pop($('#chatP'), t, tChats - 0.1);
    BUBS.forEach((_, i) => pop($('#bb' + i), t, tShares + i * 0.3));
    // chat bubbles go grey when the rush hits
    BUBS.forEach((_, i) => { const r = M.io((t - tCalls - i * 0.08) / 0.3), b = $('#bb' + i); b.style.background = mix(C.paper, C.redBg, r); b.style.color = mix(C.ink, C.red, r); });
    M.vis($('#ask'), t, tC1 - 0.15, tAout, { dy: 36, ...o });
    M.vis($('#tr0'), t, tC1 + 0.1, 1e9, { dy: 14 }); pop($('#rs0'), t, tBeaut - 0.05);
    M.vis($('#tr1'), t, tC2 + 0.3, 1e9, { dy: 14 });
    const r1 = $('#tr1'), hot = M.io((t - tRush) / 0.3);
    r1.querySelector('.bg').style.background = mix(C.paper, C.redBg, hot);
    M.vis($('#rq'), t, tThirty - 0.1, 1e9, { dy: 8 }); M.count($('#rq'), t, tThirty, 1.2, 0, 30, v => Math.round(v) + ' waiting');
    pop($('#rs1'), t, tCold - 0.1);
  }

  /* ===== B: festival day ===== */
  const bOn = t >= tB1 - 0.1 && t < tT + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tB1 + 0.1, tBout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tB3);
    M.vis($('#illImg'), t, tB1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    const tg = { outDur: 0.2, osc: 0.9, ody: 0 };
    M.vis($('#tgQ'), t, wt('B1', 'queue') - 0.05, tB3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...tg });
    M.vis($('#tgR'), t, wt('B2', 'Ravi') - 0.05, tB3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...tg });
    M.vis($('#tgA'), t, tPoints, tB3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...tg });
    M.vis($('#tgK'), t, tPoints + 0.15, tB3 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...tg });
    M.vis($('#jobs'), t, tB3 + 0.12, tBout, { dx: 60, dy: 0, ...o });
    const tj = [tBrews, tMoney, tMeena];
    JOBS.forEach((_, i) => {
      M.vis($('#jr' + i), t, tB3 + 0.3 + i * 0.07, 1e9, { dy: 14 });
      const jc = $('#jc' + i); pop(jc, t, tj[i] - 0.05);
      const g = M.io((t - tj[i]) / 0.3); jc.style.background = mix('#fff', C.ink, g); jc.style.color = mix(C.ink, '#fff', g);
    });
    M.vis($('#qL'), t, tB3 + 0.5, 1e9, { dy: 8 });
    for (let i = 0; i < 8; i++) { const d = $('#qd' + i); M.vis(d, t, tB3 + 0.55 + i * 0.04, tMoves + (7 - i) * 0.22, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08, outDur: 0.2, osc: 0.4, ody: 0 }); }
    pop($('#smile'), t, tSmiling - 0.1);
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

  /* ===== D: the big idea ===== */
  const dOn = t >= tTu - 0.05 && t < tW1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const wd = $('#word'); M.vis(wd, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(wd, $('#wordOut'), t, tD3);
    M.rise($('#wBig'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY });
    M.rise($('#wMean'), t, tDep - 0.15, { st: 0.05 });
    M.vis($('#wHr'), t, tDep + 0.4, 1e9, { dy: 0 }); M.vis($('#wEx'), t, tDep + 0.5, 1e9, { dy: 8 });
    pop($('#wc0'), t, tDep + 0.7);
    M.vis($('#wA'), t, tDep + 1.0, 1e9, { dx: -12, dy: 0, fade: 0.15 });
    pop($('#wc1'), t, tDep + 1.1);
    M.rise($('#wNote'), t, tDep + 1.4, { st: 0.04 });
    M.vis($('#old'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#oAv'), t, tD3 + 0.35, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#oT'), t, tD3 + 0.5, { st: 0.06, sp: M.HEAVY });
    M.rise($('#oS'), t, tTaylor - 0.1, { st: 0.04 });
    M.draw($('#oXL'), t, tD4 + 0.1, 0.45, M.o3);
    const dimO = M.io((t - tD4 - 0.2) / 0.3); $('#oT').style.color = mix(C.ink, C.dim, dimO);
    M.vis($('#new'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#nAv'), t, tD4 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#nT1'), t, tRight - 0.15, { st: 0.05 }); M.rise($('#nT2'), t, tSitu - 0.6, { st: 0.06, sp: M.HEAVY });
  }

  /* ===== W: the research ===== */
  const wOn = t >= tW1 - 0.1 && t < tM1 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#wl'), t, tW1 + 0.1, tWout, { dx: -60, dy: 0, ...o });
    M.vis($('#wp'), t, tW1 + 0.25, tWout, { dx: 60, dy: 0, ...o });
    runRows(t, 'wr', 4, WR.map(r => r[1]), tW, tW1, tWout);
    WP.forEach((_, k) => {
      const tin = k ? tW[k - 1] : tW1 + 0.5, tout = k < 4 ? tW[k] - 0.14 : 1e9;
      const pn = $('#wn' + k); if (!paneHead(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        M.vis($('#bs0'), t, tStable - 0.1, 1e9, { dy: 14 }); pop($('#bc0'), t, tStrict - 0.05); M.vis($('#bl0'), t, tStrict + 0.2, 1e9, { dy: 8 });
        M.vis($('#bs1'), t, tFast - 0.1, 1e9, { dy: 14 }); pop($('#bc1'), t, tFlex - 0.05); M.vis($('#bl1'), t, tFlex + 0.2, 1e9, { dy: 8 });
      } else if (k === 2) {
        pop($('#wf'), t, tHund - 0.1);
        for (let i = 0; i < 3; i++) { const b = $('#tb' + i); M.vis(b, t, wt('W4', 'best') - 0.1 + i * 0.25, 1e9, { dy: 16 }); }
      } else if (k === 3) {
        for (let i = 0; i < 3; i++) { pop($('#lc' + i), t, tin + 0.8 + i * 0.3); M.draw($('#la' + i), t, wt('W5', 'depends') + i * 0.12, 0.4, M.o3); }
        M.vis($('#lbar'), t, tEnv - 0.1, 1e9, { dy: 16 });
      } else if (k === 4) {
        for (let i = 0; i < 3; i++) { M.vis($('#fs' + i), t, tin + 0.7 + i * 0.12, 1e9, { dy: 12 }); pop($('#fl' + i), t, tWsit - 0.2 + i * 0.15); }
      }
    });
  }

  /* ===== M: the if-then rule, then one rush run two ways ===== */
  const mOn = t >= tM1 - 0.1 && t < tP0 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    const rc = $('#rcard'); M.vis(rc, t, tM1 + 0.1, tM4 - 0.1, { dy: 36, ...o }); grow(rc, $('#ruleOut'), t, tM2);
    M.rise($('#rT'), t, wt('M1', 'If') - 0.05, { st: 0.07, sp: M.HEAVY });
    const tr = [[tM2, tQuiet, tChat2], [tM3, tLong, tFirm]];
    for (let i = 0; i < 2; i++) {
      const rb = $('#rb' + i), [ta, ts, tc] = tr[i];
      M.vis(rb, t, ta + 0.05, 1e9, { dy: 16 });
      M.vis($('#rbi' + i), t, ta + 0.15, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); M.vis($('#rbs' + i), t, ts - 0.2, 1e9, { dy: 10 });
      M.vis($('#rbt' + i), t, tc - 0.4, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 }); M.vis($('#rba' + i), t, tc - 0.25, 1e9, { dy: 10 });
      // the row that matches the situation turns navy
      const act = i === 0 ? M.io((t - ts) / 0.3) * (1 - M.io((t - tLong + 0.1) / 0.3)) : M.io((t - ts) / 0.3);
      rb.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      rb.querySelectorAll('.rx').forEach(e => { e.style.color = mix(C.ink, '#fff', act); });
      $('#rbi' + i).style.background = mix(C.ink, C.navy3, act); $('#rbi' + i).style.color = '#fff';
      $('#rbt' + i).style.background = C.gold; $('#rbt' + i).style.color = '#fff';
    }
    M.vis($('#sit'), t, tM2 + 0.12, tM6 - 0.14, { dx: 60, dy: 0, ...o });
    const hr = hrT(t), mn = mnT(t);
    $('#hrH').setAttribute('transform', `rotate(${hr.toFixed(2)} 120 120)`); $('#mnH').setAttribute('transform', `rotate(${(mn % 360).toFixed(2)} 120 120)`);
    const rush = M.io((t - tLong) / 0.4);
    M.setT($('#sTime'), rush > 0.5 ? '8:00 AM' : '3:00 PM');
    M.vis($('#sTime'), t, tM2 + 0.4, 1e9, { dy: 10 });
    const st = $('#sStat'); M.vis(st, t, tQuiet, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    st.style.background = mix(C.gold, C.red, rush); st.style.color = '#fff';
    setIco($('#sStatI'), rush > 0.5 ? 'users' : 'sun', '#fff', 26, 2.4); M.setT($('#sStatT'), rush > 0.5 ? 'Morning rush' : 'Quiet');
    const nQ = Math.round(M.lerp(2, 15, M.o3((t - tLong) / 1.0)));
    for (let i = 0; i < 15; i++) { const d = $('#sd' + i); const on = i < nQ; M.vis(d, t, i < 2 ? tQuiet + 0.1 + i * 0.08 : (on ? tLong + (i - 2) * 0.07 : 1e9), 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); d.style.background = i >= 2 ? C.red : C.ink; }
    M.vis($('#sQn'), t, tQuiet + 0.1, 1e9, { dy: 8 }); M.setT($('#sQn'), rush > 0.5 ? '30 waiting' : '2 waiting'); $('#sQn').style.color = rush > 0.5 ? C.red : C.ink;
    pop($('#ab0'), t, tTwo - 0.05); pop($('#ab1'), t, tTwo + 0.15);
    // the two runs
    M.vis($('#mL'), t, tM4 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mR'), t, tM6, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM4 + 0.3 : tM6 + 0.2, root = $('#m' + k + 'In');
      if (t < base - 0.3) continue;
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      M.vis($('#bar' + k), t, base + 0.35, 1e9, { dy: 10 });
      M.vis($('#tk0' + k), t, base + 0.4, 1e9, { dy: 8 }); M.vis($('#tk1' + k), t, base + 0.4, 1e9, { dy: 8 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      runRush(k, t);
    }
  }

  /* ===== P: four factors ===== */
  const pOn = t >= tP0 - 0.1 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pl'), t, tP0 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#pp'), t, tP0 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    runRows(t, 'pr', 4, PR.map(r => r[0]), tP, tP0, tPout);
    PP.forEach((_, k) => {
      const tin = k ? tP[k - 1] : tP0 + 0.5, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pn' + k); if (!paneHead(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        for (let i = 0; i < 6; i++) M.vis($('#z' + i), t, tin + 0.7 + i * 0.06, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
        pop($('#zc0'), t, tin + 1.2);
        M.vis($('#zg'), t, tSixty - 0.3, 1e9, { dy: 0, sc: 0.85, sp: M.SOFT }); pop($('#zc1'), t, tSixty + 0.3);
      } else if (k === 2) {
        M.vis($('#tq0'), t, tin + 0.7, 1e9, { dy: 14 }); M.vis($('#tq1'), t, tTools, 1e9, { dy: 14 });
      } else if (k === 3) {
        M.draw($('#ev0'), t, tPstable - 0.3, 0.6, M.o3); M.rise($('#et0'), t, tPstable - 0.1, { st: 0.04 });
        M.draw($('#ev1'), t, tPchg - 0.3, 0.7, M.o3); M.rise($('#et1'), t, tPchg - 0.1, { st: 0.04 });
      } else if (k === 4) {
        M.vis($('#pq0'), t, tin + 0.7, 1e9, { dy: 14 }); pop($('#pc0'), t, tPsteps - 0.1);
        M.vis($('#pq1'), t, wt('P4', 'expert') - 0.1, 1e9, { dy: 14 }); pop($('#pc1'), t, tPfree - 0.1);
      }
    });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    runRows(t, 'kr', 4, KA.map(r => r[0]), tK, tK0, tKout);
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); if (!paneHead(pn, t, tin, tout, false)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { pn.querySelectorAll('.px').forEach(e => M.vis(e, t, tin + 0.5, tout, { dy: 10, ...oo })); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
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
    for (let i = 0; i < 2; i++) {
      pop($('#xg' + i), t, tXg[i] - 0.05); pop($('#xh' + i), t, tXh[i] - 0.05);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw2'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    pop($('#xNode'), t, tX4 + 0.35);
    M.draw($('#xf0'), t, tXwrong - 0.45, 0.45, M.o3); M.draw($('#xf1'), t, tXslow - 0.45, 0.45, M.o3);
    pop($('#xr0'), t, tXwrong - 0.05); pop($('#xr1'), t, tXslow - 0.05);
    M.vis($('#xcrit'), t, tXcrit - 0.05, 1e9, { dy: 16 });
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
