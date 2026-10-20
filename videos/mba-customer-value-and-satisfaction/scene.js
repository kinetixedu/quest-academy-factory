// MBA - Marketing Management, Ep 04: Customer Value and Satisfaction (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  swap: ['M8 3 4 7l4 4', 'M4 7h16', 'm16 21 4-4-4-4', 'M20 17H4'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  factory: ['M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M17 18h1', 'M12 18h1', 'M7 18h1'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  gem: ['M6 3h12l4 6-10 13L2 9Z', 'M11 3 8 9l4 13 4-13-3-6', 'M2 9h20'],
  train: ['M8 3.1V7a4 4 0 0 0 8 0V3.1', 'm9 15-1-1', 'm15 15 1-1', 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', 'm8 19-2 3', 'm16 19 2 3'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', circ(7, 17, 2), 'M9 17h6', circ(17, 17, 2)],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', circ(17, 18, 2), circ(7, 18, 2)],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  cookie: ['M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5', 'M8.5 8.5v.01', 'M16 15.5v.01', 'M12 12v.01', 'M11 17v.01', 'M7 14v.01'],
  apple: ['M12 6.528V3a1 1 0 0 1 1-1', 'M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', circ(12, 12, 3)],
  building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  call: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  camera: ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', circ(12, 13, 3)],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;
const ACC = s => s.replace(/\*(.+?)\*/g, '<span class="acc">$1</span>');

Object.assign(M.IC, {
  wallet: ['M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1', 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4'],
  frown: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M16 16s-1.5-2-4-2-4 2-4 2', 'M9 9h.01', 'M15 9h.01'],
  meh: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 15h8', 'M9 9h.01', 'M15 9h.01'],
  note: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 13H8', 'M16 17H8', 'M16 13h-2'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = wt('H1', 'packet') - 0.45;
const tH2 = T0('H2'), tPicks = wt('H2', 'picks'), tC2 = T0('C2'), tTi = [wt('C2', 'value'), wt('C2', 'satisfaction')];
const tL1 = T0('L1'), tL2 = T0('L2'), tAout = tL1 - 0.32, tWorth = wt('L2', 'worth'), tProm = wt('L2', 'promise');
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tLout = tD1 - 0.32;
const tHl = [wt('D3', 'benefits'), wt('D3', 'costs'), wt('D3', 'compared')], tBel = wt('D4', 'believes'), tSel = wt('D4', 'seller');
const tV = [1, 2, 3, 4].map(i => T0('V' + i)), tDout = tV[0] - 0.32;
const tBen = [wt('V1', 'healthy'), wt('V1', 'taste'), wt('V1', 'trust')], tCos = [wt('V2', 'hundred'), wt('V2', 'time'), wt('V2', 'worry')];
const tGone = wt('V3', 'time'), tDis = wt('V3', 'disappears'), tBis = wt('V4', 'Biscuits'), tFewer = wt('V4', 'fewer');
const tT = T0('T1'), tSt2 = wt('T1', 'They'), tVout = tT - 0.32;
const tP1 = T0('P1'), tP2 = T0('P2'), tTu = tP1 - 0.32;
const tSh = [wt('P1', 'pleasure'), wt('P1', 'got'), wt('P1', 'expected')];
const tOb = [wt('P2', 'Fall'), wt('P2', 'Match'), wt('P2', 'Beat')], tObL = [wt('P2', 'dissatisfied'), wt('P2', 'satisfied', 0), wt('P2', 'delighted')];
const tW = [1, 2, 3, 4, 5].map(i => T0('W' + i)), tPout = tW[0] - 0.32;
const RUN = [[tW[1] + 0.4, wt('W2', 'arrives') + 0.4, 105], [tW[2] + 0.4, wt('W3', 'arrives') + 0.3, 25], [tW[3] + 0.3, wt('W4', 'again') + 0.3, 20]];
const tMood = [wt('W2', 'unhappy'), wt('W3', 'satisfied'), wt('W5', 'delighted')], tNote = wt('W4', 'note'), tTells = wt('W5', 'tells'), tTwo = wt('W5', 'two');
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tWout = tK0 - 0.32, tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'food'), wt('K3', 'airline'), wt('K4', 'hotel')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'back'), wt('X2', 'friends')], tXh = [wt('X3', 'expectations'), wt('X3', 'extras')];
const tDevX = wt('X4', 'Dev'), tZoyX = wt('X5', 'Zoya'), tBeat = wt('X5', 'Promise'), tKano = wt('X6', 'Kano');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'What');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'compared')], [wt('S3', 'expected'), wt('S3', 'got')], [wt('S4', 'back')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
$('#pkL').innerHTML = [64, 100, 136, 172].map(x => laddoo(x, 256, 16)).join('');
$('#bsk').innerHTML = [70, 120, 170].map(x => `<circle cx="${x}" cy="250" r="20" fill="#D8CDB9" stroke="#C9BFAE" stroke-width="3"/>`).join('');
$('#pkBI').innerHTML = M.icon('x', 22, C.ink2, 2.6);
$('#ti0I').innerHTML = M.icon('scale', 28, C.gold2, 2.2); $('#ti1I').innerHTML = M.icon('smile', 28, C.gold2, 2.2);
$('#tg0I').innerHTML = M.icon('scale', 18, C.gold2, 2.4); $('#tg1I').innerHTML = M.icon('smile', 18, C.gold2, 2.4);
wrap($('#ill'), 'illOut', 784, 580);
$('#pvE').innerHTML = M.icon('eye', 44, C.gold, 2); $('#vr0I').innerHTML = M.icon('check', 30, C.gold, 2.8); $('#vr1I').innerHTML = M.icon('x', 30, C.red, 2.8);
wrap($('#kq'), 'kqOut', 784, 580);
// value builder
const BEN = [['heart', 'A healthy snack'], ['smile', 'A taste she loves'], ['home', "Trust in Nani's kitchen"]];
const COS = [['coin', '₹120 a week'], ['clock', 'Time to buy it'], ['help', 'A little worry']];
const bTop = k => 436 - 72 * k;
$('#blks').innerHTML = BEN.map(([ic, tx], k) => `<div class="blk" id="bb${k}x" style="left:96px;top:${bTop(k)}px;background:#F3EAD6;color:#14213D">${M.icon(ic, 22, C.gold, 2.4)}<span>${tx}</span></div>`).join('') +
  COS.map(([ic, tx], k) => `<div class="blk" id="bc${k}x" style="left:432px;top:${bTop(k)}px;background:#F6E3DC;color:#B5482F">${M.icon(ic, 22, C.red, 2.4)}<span>${tx}</span></div>`).join('');
$('#vgapI').innerHTML = M.icon('award', 22, C.gold, 2.4);
Object.assign($('#vgap').style, { left: '432px', top: bTop(2) + 'px', height: '64px' });
Object.assign($('#vline').style, { left: '96px', top: bTop(2) + 'px', width: '592px' });
wrap($('#vb'), 'vbOut', 784, 580);
$('#cc0I').innerHTML = M.icon('coin', 18, C.gold, 2.4); $('#cc1I').innerHTML = M.icon('coin', 18, C.muted, 2.4); $('#vc2PI').innerHTML = M.icon('check', 22, '#fff', 3);
// satisfaction
$('#sqFI').innerHTML = M.icon('laddoo', 32, C.gold, 2.2);
wrap($('#sq'), 'sqOut', 784, 580);
const OB = [['frown', 'Dissatisfied', 'FALLS SHORT', 110, C.red2, 72], ['meh', 'Satisfied', 'MATCHES', 180, C.ink, 304], ['heart', 'Delighted', 'BEATS IT', 260, C.gold, 536]];
$('#obs').innerHTML = OB.map(([ic, l, s, h, c, x], i) => `<div class="ob" id="ob${i}" style="left:${x}px;top:${440 - h}px;height:${h}px;background:${c}"></div><div class="obi" id="oi${i}" style="left:${x + 60}px;top:${440 - h + 16}px">${M.icon(ic, 30, i === 0 ? C.red : i === 1 ? C.ink : C.gold, 2.2)}</div><div class="obl" id="ol${i}" style="left:${x}px;top:456px">${l}</div><div class="obs" id="os${i}" style="left:${x}px;top:494px">${s}</div>`).join('');
Object.assign($('#expL').style, { top: '260px' }); Object.assign($('#expT').style, { top: '228px' });
// delivery run
$('#pinK').innerHTML = M.icon('home', 28, C.ink, 2.2); $('#pinR').innerHTML = M.icon('home', 28, C.ink, 2.2);
const WR = [['WEEK 1 · EXPECTED BY 7:00', 'Got 8:15', 'frown', 'Dissatisfied', C.redBg, C.red], ['WEEK 2 · EXPECTED BY 7:00', 'Got 6:55', 'meh', 'Satisfied', C.ink, '#fff'], ['WEEK 3 · EXPECTED BY 7:00', 'Got 6:50, and a note', 'heart', 'Delighted', C.gold, '#fff']];
$('#wrs').innerHTML = WR.map(([n, g, ic, m, bg, fg], i) => `<div class="wr" id="wr${i}" style="top:${96 + i * 116}px"><div class="bg"></div><div class="wn">${n}</div><div class="wg">${g}</div><div class="wm" id="wm${i}" style="background:${bg};color:${fg}">${M.icon(ic, 22, fg, 2.4)}<span>${m}</span></div></div>`).join('');
$('#ru0').innerHTML = M.icon('user', 24, C.gold2, 2.4); $('#ru1').innerHTML = M.icon('user', 24, C.gold2, 2.4);
// K: at work today
const KA = [
  ['heart', 'Benefits', 'Add more good', "Nani's trust and a healthy taste", 'bank', 'A bank gives free money advice, not just an account'],
  ['clock', 'Costs', 'Cut money, time and worry', 'Door delivery saves her a trip', 'phone', 'A food delivery app saves you time, not just money'],
  ['target', 'Expectations', 'Promise clearly', 'Delivery by 7:00 every morning', 'plane', 'An airline shows the real arrival time'],
  ['award', 'Delight', 'Beat the promise', "Nani's handwritten note", 'building', 'A hotel remembers you like a quiet room'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['VALUE AND SATISFACTION TODAY', 'Four levers', 'Every business can pull them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">TWO FOR VALUE, TWO FOR SATISFACTION</div><div class="pe"><i>${M.icon('scale', 34, C.gold, 2.2)}</i><span>More good, less cost, kept promises</span></div>`) + `</div>`).join('');
// X
const XG = [['repeat', 'They come back'], ['users', 'They bring friends']];
const XH = [['trendUp', 'Expectations rise'], ['coin', 'Extras cost money']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bb0I').innerHTML = M.icon('megaphone', 20, C.gold, 2.4); $('#bb1I').innerHTML = M.icon('ban', 20, C.red, 2.4); $('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3);
$('#factI').innerHTML = M.icon('trendUp', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz + recap
const OPTS = ['Dissatisfied', 'Satisfied', 'Delighted', 'Surprised'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('target', 44, C.gold2, 2.4);
const ROWS = [['scale', 'Value: all benefits minus all costs', ['Vs other choices']], ['target', 'Satisfaction: expected vs got', ['Expected', 'Got']], ['heart', 'Beat expectations, honestly', ['They come back']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const attr = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const rowHi = (el, ic, t, ta, td) => {
  const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
  el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
  el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
  el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
  el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
  setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
};
const clockS = min => { const m = Math.round(390 + min), h = Math.floor(m / 60), mm = m % 60; return `${h}:${String(mm).padStart(2, '0')} AM`; };
const tlX = min => 48 + 688 * min / 120;

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  for (let i = 0; i < 4; i++) { const q = $('#sl' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  for (let k = 0; k < 2; k++) { const c = $('#cc' + k), n = $('#cm' + k + ' .cn'); c.style.left = (28 + n.offsetWidth + 20) + 'px'; }
  $('#vc2P').style.left = (392 - $('#vc2P').offsetWidth / 2) + 'px';
  $('#tk1').style.left = (tlX(30) - $('#tk1').offsetWidth / 2) + 'px'; $('#tk0').style.left = '48px'; $('#tk2').style.left = (736 - $('#tk2').offsetWidth) + 'px';
  $('#tlp').style.left = (tlX(30) - 2) + 'px';
  $('#ru1').style.left = (668 - 48) + 'px'; $('#ru0').style.left = (668 - 48 - 60) + 'px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const ft = $('#factT'); if (ft.offsetWidth > 552) ft.style.fontSize = Math.floor(28 * 552 / ft.offsetWidth) + 'px';
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  geo.pA = $('#rtAf'); geo.pB = $('#rtBf'); geo.lA = geo.pA.getTotalLength(); geo.lB = geo.pB.getTotalLength();
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);

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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : [tBis - 0.1, tVout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: two choices ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pcA'), t, tMorph + 0.2, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#pcB'), t, tMorph + 0.45, tAout, { dx: 60, dy: 0, ...o });
    for (const k of ['A', 'B']) { const c = $('#pc' + k), b = k === 'A' ? tMorph + 0.2 : tMorph + 0.45;
      M.vis(c.querySelector('svg'), t, b + 0.2, 1e9, { dy: 24, sp: M.SOFT }); M.rise(c.querySelector('.pn2'), t, b + 0.3, { st: 0.06 });
      M.vis($('#pp' + k), t, b + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }); M.vis(c.querySelector('.pq'), t, b + 0.55, 1e9, { dy: 8 }); }
    M.vis($('#pkA'), t, tPicks - 0.05, 1e9, POP); M.vis($('#pkB'), t, tPicks + 0.4, 1e9, POP);
    const d = M.io((t - tPicks - 0.3) / 0.4); $('#pcB').querySelector('.bg').style.background = mix(C.card, '#F0EBE1', d);
    M.vis($('#twoI'), t, tC2 - 0.05, tAout, { dy: 40, ...o });
    M.vis($('#ti0'), t, tTi[0] - 0.1, 1e9, POP); M.vis($('#ti1'), t, tTi[1] - 0.1, 1e9, POP);
  }

  /* ===== L: tiffin + two questions ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tq'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    [tWorth, tProm].forEach((tw, i) => { M.vis($('#tq' + i), t, tw - 0.3, 1e9, { dy: 16 }); M.vis($('#tq' + i + ' .tg'), t, tw + 0.3, 1e9, POP); });
  }

  /* ===== D: customer perceived value ===== */
  const dOn = t >= tD1 - 0.1 && t < tV[0] + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    M.rise($('#kot1'), t, wt('D2', 'Philip') - 0.05, { st: 0.06, sp: M.HEAVY }); M.rise($('#kot2'), t, wt('D2', 'Kotler') + 0.2, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'calls'), 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD3 - 0.3, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tD3 - 0.2 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tD3 - i * 0.9) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#pv'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#pvE'), t, tD4 + 0.35, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.rise($('#pvT'), t, tD4 + 0.45, { st: 0.06 }); M.vis($('#pvS'), t, tD4 + 0.7, 1e9, { dy: 10 });
    M.vis($('#vr0'), t, tBel - 0.1, 1e9, { dx: 24, dy: 0 }); M.vis($('#vr1'), t, tSel - 0.1, 1e9, { dx: 24, dy: 0 });
  }

  /* ===== V: value builder ===== */
  const vOn = t >= tV[0] - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const o = { outDur: 0.3, ody: -16 };
    const vb = $('#vb'); M.vis(vb, t, tV[0] + 0.05, tVout, { dy: 36, ...o }); grow(vb, $('#vbOut'), t, tV[3]);
    M.vis($('#vhB'), t, tV[0] + 0.3, 1e9, { dy: 10 }); M.vis($('#vhC'), t, tV[1] - 0.1, 1e9, { dy: 10 }); M.vis($('#vbase'), t, tV[0] + 0.25, 1e9, { dy: 0 });
    BEN.forEach((_, k) => M.vis($('#bb' + k + 'x'), t, tBen[k] - 0.1, 1e9, { dy: -60, sp: M.HEAVY, fade: 0.08 }));
    COS.forEach((_, k) => { const el = $('#bc' + k + 'x');
      if (k === 1) { const g = M.io((t - tDis + 0.2) / 0.4); M.vis(el, t, tCos[k] - 0.1, tDis - 0.2, { dy: -60, sp: M.HEAVY, fade: 0.08, outDur: 0.35, osc: 0.6, ody: 0 }); el.style.textDecoration = t > tGone ? 'line-through' : 'none'; void g; return; }
      M.vis(el, t, tCos[k] - 0.1, 1e9, { dy: -60, sp: M.HEAVY, fade: 0.08 });
      if (k === 2) { const d = M.spring(t - tDis - 0.1, M.HEAVY); el.style.top = M.lerp(bTop(2), bTop(1), d).toFixed(1) + 'px'; } });
    M.vis($('#vline'), t, tDis + 0.5, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#vgap'), t, tDis + 0.7, 1e9, POP);
    M.vis($('#vc2'), t, tV[3] + 0.12, tVout, { dx: 60, dy: 0, ...o });
    [tV[3] + 0.3, tBis].forEach((tc, k) => { M.vis($('#cm' + k), t, tc - 0.05, 1e9, { dy: 16 });
      const u = M.spring(t - tc - 0.3 - (k ? 0.8 : 0), M.HEAVY), w = (k ? 130 : 400) * Math.max(0, u); snap($('#cf' + k), (u >= 1 ? (k ? 130 : 400) : w).toFixed(1) + 'px', 'width'); });
    M.vis($('#vc2P'), t, tFewer - 0.05, 1e9, POP);
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

  /* ===== P: satisfaction ===== */
  const pOn = t >= tTu - 0.05 && t < tW[0] + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    const sq = $('#sq'); M.vis(sq, t, tP1 + 0.02, tPout, { dy: 36, ...o }); grow(sq, $('#sqOut'), t, tP2);
    M.rise($('#sqT'), t, tP1 + 0.2, { st: 0.06, sp: M.HEAVY }); M.vis($('#sqHr'), t, tP1 + 0.5, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) M.vis($('#sl' + i), t, wt('P1', 'Kotler') + i * 0.12, 1e9, { dy: 14 });
    tSh.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#sh' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#sqF'), t, T1('P1') - 0.4, 1e9, { dy: 16 });
    M.vis($('#so3'), t, tP2 + 0.12, tPout, { dx: 60, dy: 0, ...o });
    M.vis($('#expL'), t, tP2 + 0.3, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#expT'), t, tP2 + 0.4, 1e9, { dy: 8 });
    OB.forEach((_, i) => {
      const u = M.spring(t - tOb[i], M.HEAVY), b = $('#ob' + i); b.style.transformOrigin = '50% 100%'; snap(b, `scaleY(${u >= 1 ? 1 : Math.max(0, u).toFixed(4)})`);
      M.hide(b, t < tOb[i]); M.vis($('#oi' + i), t, tOb[i] + 0.3, 1e9, POP);
      M.vis($('#ol' + i), t, tObL[i] - 0.1, 1e9, { dy: 10 }); M.vis($('#os' + i), t, tObL[i], 1e9, { dy: 8 });
    });
  }

  /* ===== W: the delivery run ===== */
  const wOn = t >= tW[0] - 0.1 && t < tK0 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mp'), t, tW[0] + 0.05, tWout, { dx: -60, dy: 0, ...o });
    M.vis($('#wk'), t, tW[0] + 0.2, tWout, { dx: 60, dy: 0, ...o });
    M.vis($('#mpS'), t, tW[0] + 0.3, 1e9, { dy: 16, sp: M.SOFT }); M.vis($('#clk'), t, tW[0] + 0.4, 1e9, { dy: 10 });
    ['tlb', 'tlp', 'tk0', 'tk1', 'tk2'].forEach((id, i) => M.vis($('#' + id), t, tW[0] + 0.5 + i * 0.05, 1e9, { dy: 8 }));
    M.vis($('#mst'), t, tW[0] + 0.6, 1e9, POP);
    // which week is running
    let k = -1; RUN.forEach(([a], i) => { if (t >= a - 0.25) k = i; });
    let x = 60, y = 240, clock = 0;
    if (k >= 0) {
      const [a, b, arr] = RUN[k], p = M.io((t - a) / (b - a)), path = k === 0 ? geo.pA : geo.pB, L = k === 0 ? geo.lA : geo.lB;
      const pt = path.getPointAtLength(L * p); x = pt.x; y = pt.y; clock = arr * M.clamp((t - a) / (b - a));
      const fo = t < a ? M.clamp((t - a + 0.25) / 0.2) : 1; $('#mv').style.opacity = fo.toFixed(3);
    } else $('#mv').style.opacity = '1';
    attr($('#mv'), 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    M.setT($('#clk'), clockS(clock));
    const late = k === 0 && clock > 30; $('#clk').style.color = late ? C.red : (k > 0 && t >= RUN[k][1] ? C.gold : C.ink);
    const ra = k === 0 ? M.clamp((t - RUN[0][0] + 0.3) / 0.3) : k > 0 ? 1 - M.clamp((t - RUN[1][0] + 0.3) / 0.3) : 0; $('#rtA').style.opacity = ra.toFixed(3);
    attr($('#pinRr'), 'stroke', k >= 0 && t >= RUN[k][1] ? (k === 0 ? C.red : C.gold) : C.line); attr($('#pinRr'), 'stroke-width', k >= 0 && t >= RUN[k][1] ? 4 : 2);
    RUN.forEach(([, b, arr], i) => { const d = $('#td' + i); d.style.left = (tlX(arr) - 16) + 'px'; M.vis(d, t, b, 1e9, POP); });
    const ms = $('#mst'); let st;
    if (k < 0) st = ['clock', 'Promise: by 7:00 every morning', C.paper, C.ink, C.gold];
    else if (k === 0) st = t < RUN[0][1] ? ['x', 'Week 1 · a wrong turn', C.redBg, C.red, C.red] : ['frown', 'Week 1 · 8:15, late', C.red, '#fff', '#fff'];
    else if (k === 1) st = t < RUN[1][1] ? ['clock', 'Week 2 · on the way', C.paper, C.ink, C.gold] : ['check', 'Week 2 · 6:55, on time', C.ink, '#fff', C.gold2];
    else st = t < tNote - 0.1 ? (t < RUN[2][1] ? ['clock', 'Week 3 · on the way', C.paper, C.ink, C.gold] : ['check', 'Week 3 · 6:50, on time', C.ink, '#fff', C.gold2]) : ['note', 'Week 3 · 6:50, plus a note', C.gold, '#fff', '#fff'];
    setIco(ms.querySelector('.msi'), st[0], st[4], 26, 2.4); M.setT(ms.querySelector('.mtx'), st[1]);
    if (ms._bg !== st[2]) { ms._bg = st[2]; ms.style.background = st[2]; ms.style.color = st[3]; }
    WR.forEach((_, i) => {
      const r = $('#wr' + i); M.vis(r, t, tW[0] + 0.5 + i * 0.08, 1e9, { dy: 14 });
      const got = i < 2 ? RUN[i][1] : tNote; const g = r.querySelector('.wg'); g.style.color = t < got ? C.dim : C.ink; g.style.opacity = t < got ? '0' : '1';
      M.vis($('#wm' + i), t, tMood[i] - 0.1, 1e9, POP);
      r.querySelector('.bg').style.background = mix(C.paper, C.gold3, M.io((t - tMood[i]) / 0.3) * (i < 2 ? 1 - M.io((t - tMood[i + 1]) / 0.3) : 1));
    });
    M.vis($('#ref'), t, tTells - 0.1, 1e9, { dy: 16 });
    M.vis($('#ru0'), t, tTwo, 1e9, POP); M.vis($('#ru1'), t, tTwo + 0.15, 1e9, POP);
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => { const el = $('#kr' + i); M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 }); rowHi(el, ic, t, tK[i], i < 3 ? tK[i + 1] : tKout + 1); });
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
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POP); M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POP);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, tDevX - 0.05, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr1'), t, tZoyX - 0.05, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr2'), t, tBeat - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb1').style.background = C.redBg; $('#bb1').style.color = C.red;
    M.vis($('#fact'), t, tKano - 0.4, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, tq + 0.7, { st: 0.06, sp: M.HEAVY });
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
