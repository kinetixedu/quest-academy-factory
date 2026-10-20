// MBA - Marketing Management, Ep 05: Marketing Environment (Laddoo Lab)
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
  wheat: ['M2 22 16 8', 'M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z', 'M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z'],
  coffee: ['M10 2v2', 'M14 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1', 'M6 2v2'],
  radar: ['M19.07 4.93A10 10 0 0 0 6.99 3.34', 'M4 6h.01', 'M2.29 9.62A10 10 0 1 0 21.31 8.35', 'M16.24 7.76A6 6 0 1 0 8.23 16.67', 'M12 18h.01', 'M17.99 11.66A6 6 0 0 1 15.77 16.67', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'm13.41 10.59 5.66-5.66'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = wt('H1', 'A') - 0.5;
const tEv = [wt('H1', 'jaggery'), wt('H1', 'bakery'), wt('H1', 'millets')];
const tH2 = T0('H2'), tChanges = wt('H2', 'changes'), tC2 = T0('C2');
const tL1 = T0('L1'), tL2 = T0('L2'), tAout = tL1 - 0.32, tPeople = wt('L2', 'people'), tForces = wt('L2', 'forces');
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tLout = tD1 - 0.32;
const tHl = [wt('D2', 'actors'), wt('D2', 'relationships')];
const tAc = [wt('D3', 'suppliers'), wt('D3', 'rivals'), wt('D3', 'rivals') + 0.35, wt('D3', 'prices'), wt('D3', 'laws'), wt('D3', 'technology')], tForc = wt('D3', 'Forces');
const tI = [T0('I1'), T0('I2'), T0('I3')], tDout = tI[0] - 0.32;
const tIoA = [wt('I1', 'recipe'), wt('I1', 'pack'), wt('I1', 'price'), wt('I1', 'team')], tIoB = [wt('I2', 'Supplier'), wt('I2', 'rivals'), wt('I2', 'rules'), wt('I2', 'trends')];
const tManage = wt('I3', 'manage'), tWatch = wt('I3', 'watch');
const tT = T0('T1'), tSt2 = wt('T1', 'But'), tIout = tT - 0.32;
const tR = [1, 2, 3, 4, 5, 6].map(i => T0('R' + i)), tTu = tR[0] - 0.32;
const SIG = [
  [wt('R2', 'spot') - 0.1, wt('R2', 'Jaggery'), wt('R3', 'judge'), wt('R3', 'threat', 1), wt('R4', 'respond')],
  [tR[4], wt('R5', 'bakery'), wt('R5', 'threat') - 0.6, wt('R5', 'threat'), wt('R5', 'Dev')],
  [tR[5], wt('R6', '2023'), wt('R6', 'opportunity') - 0.6, wt('R6', 'opportunity'), wt('R6', 'pack')],
];
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tRout = tK0 - 0.32, tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'airline'), wt('K2', 'bank'), wt('K3', 'bakery'), wt('K4', 'cafe')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'dangers'), wt('X2', 'chances')], tXh = [wt('X3', 'time'), wt('X3', 'false')];
const tArjX = wt('X4', 'Arjun'), tZoyX = wt('X5', 'Zoya'), tAsk = wt('X5', 'Ask'), tMarch = wt('X6', 'March');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'actors'), wt('S2', 'forces')], [wt('S3', 'manage'), wt('S3', 'watch')], [wt('S4', 'Again')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A: three changes
const EV = [['coin', 'JAGGERY PRICE', 'Costs go up', 'Every kilo costs more', 'trendUp', '₹60 to ₹80 a kilo', 1], ['store', 'NEW BAKERY', 'A new rival', 'Near the college gate', 'cookie', 'Cheap cookies', 1], ['wheat', 'MILLETS', 'A new trend', 'Everyone is talking', 'trendUp', 'A new interest', 0]];
$('#evs').innerHTML = EV.map(([ic, l, tt, s, bi, b, bad], i) => `<div class="ev" id="ev${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="lbl" style="left:36px;top:36px">${l}</div><div class="ei">${M.icon(ic, 40, bad ? C.red : C.gold, 2.2)}</div><div class="serif et">${tt}</div><div class="es">${s}</div><div class="eb" id="eb${i}" style="${bad ? 'background:#F6E3DC;color:#B5482F' : 'background:#F3EAD6;color:#14213D'}">${M.icon(bi, 20, bad ? C.red : C.gold, 2.4)}<span>${b}</span></div></div>`).join('');
$('#arws').innerHTML = [0, 1, 2].map(i => `<svg class="arw" id="aw${i}" width="24" height="24" style="left:${404 + i * 544}px"><path d="M12 2 V20 M5 13 L12 20 L19 13" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`).join('');
$('#kitI').innerHTML = M.icon('home', 40, C.gold, 2.2); $('#kitPI').innerHTML = M.icon('globe', 26, C.gold2, 2.2);
// L: Zoya's page
wrap($('#ill'), 'illOut', 784, 580);
const PCH = [['truck', 'Suppliers', 90, 140, 'a'], ['store', 'Rivals', 210, 140, 'a'], ['users', 'Customers', 330, 140, 'a'], ['coin', 'Prices', 135, 225, 'f'], ['scale', 'Laws', 45, 225, 'f'], ['phone', 'Technology', 225, 225, 'f'], ['trendUp', 'Trends', 315, 225, 'f']];
$('#pchs').innerHTML = PCH.map(([ic, n, , , k], i) => `<div class="pch ${k}" id="pc${i}">${M.icon(ic, 18, k === 'a' ? C.ink : C.gold, 2.4)}<span>${n}</span></div>`).join('');
// D
wrap($('#kq'), 'kqOut', 784, 580);
[['truck', C.ink], ['store', C.ink], ['users', C.ink], ['coin', C.gold], ['scale', C.gold], ['phone', C.gold]].forEach(([ic, c], i) => { $('#ac' + i + 'I').innerHTML = M.icon(ic, 18, c, 2.4); });
// I
const IA = [['laddoo', 'The recipe'], ['package', 'The pack'], ['tag', 'The price'], ['users', 'The team']];
const IB = [['truck', 'Supplier prices'], ['store', 'Rivals'], ['scale', 'Rules'], ['trendUp', 'Trends']];
const tile = (p, [ic, n], i, inside) => `<div class="io" id="${p}${i}" style="left:${48 + (i % 2) * 360}px;top:${156 + Math.floor(i / 2) * 162}px;background:${inside ? '#F3EAD6' : '#F5F1E8'}"><i>${M.icon(ic, 28, inside ? C.gold : C.ink, 2.2)}</i><span>${n}</span><b style="background:${inside ? '#B8862F' : '#14213D'}">${M.icon(inside ? 'check' : 'eye', 20, '#fff', 2.6)}</b></div>`;
$('#ioA').innerHTML = IA.map((d, i) => tile('ia', d, i, 1)).join(''); $('#ioB').innerHTML = IB.map((d, i) => tile('ib', d, i, 0)).join('');
$('#ioPAI').innerHTML = M.icon('check', 24, '#fff', 3); $('#ioPBI').innerHTML = M.icon('eye', 24, C.gold2, 2.4);
// R: radar + steps
$('#radC').innerHTML = M.icon('laddoo', 28, C.gold2, 2.2);
const BL = [[40, 150, 'Jaggery ₹80', 'coin', 1], [160, 180, 'New bakery', 'store', 1], [280, 130, 'Year of Millets', 'wheat', 0]];
const bxy = (a, r) => [392 + r * Math.cos(a * Math.PI / 180), 316 - r * Math.sin(a * Math.PI / 180)];
$('#blps').innerHTML = BL.map(([a, r], i) => { const [x, y] = bxy(a, r); return `<g id="bp${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle class="br" r="18" fill="none" stroke="#B8862F" stroke-width="3"/><circle class="bd" r="10" fill="#B8862F"/></g>`; }).join('');
$('#bls').innerHTML = BL.map(([, , n, ic], i) => `<div class="bl" id="bl${i}"><span class="bli">${M.icon(ic, 18, C.gold, 2.4)}</span><span>${n}</span></div>`).join('');
const STEPS = ['01 · SCAN', '02 · SPOT', '03 · JUDGE', '04 · RESPOND'];
const SPOT = ['Jaggery: ₹60 to ₹80 a kilo', 'New bakery: cheap cookies', '2023: UN Year of Millets'];
const JUDGE = [['x', 'Threat · costs go up', 1], ['x', 'Threat · a cheap rival', 1], ['check', 'Opportunity · millets are in', 0]];
const RESP = ['Buy in bulk from a farmer, keep ₹120', 'Show parents why laddoos are healthier', 'Pack now says: made with ragi millet'];
$('#srs').innerHTML = STEPS.map((s, i) => `<div class="sr4" id="sr${i}" style="top:${96 + i * 116}px"><div class="bg"></div><div class="sl">${s}</div>` +
  (i === 0 ? `<div class="sx">Watch prices, rivals, rules and trends</div>` : [0, 1, 2].map(k => i === 1 ? `<div class="sx" id="sp${k}">${SPOT[k]}</div>` : i === 2 ? `<div class="sj" id="sj${k}" style="${JUDGE[k][2] ? 'background:#F6E3DC;color:#B5482F' : 'background:#B8862F;color:#fff'}">${M.icon(JUDGE[k][0], 20, JUDGE[k][2] ? C.red : '#fff', 2.8)}<span>${JUDGE[k][1]}</span></div>` : `<div class="sx" id="rs${k}">${RESP[k]}</div>`).join('')) + `</div>`).join('');
// K
const KA = [
  ['coin', 'Rising costs', 'Protect your price', 'Bulk jaggery, straight from a farmer', 'plane', 'An airline buys fuel in advance to protect fares'],
  ['store', 'New rivals', 'Show your difference', 'Why laddoos beat cheap cookies', 'bank', 'A bank builds a better app when online banks arrive'],
  ['scale', 'New rules', 'Change before you must', 'Paper packs, not plastic film', 'package', 'A bakery prints allergy labels when food rules change'],
  ['trendUp', 'New trends', 'Ride the wave', '"Made with ragi millet" on the pack', 'coffee', 'A cafe adds plant milk as more people ask for it'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['THE ENVIRONMENT TODAY', 'Four signals', 'Every business must answer them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">COSTS, RIVALS, RULES, TRENDS</div><div class="pe"><i>${M.icon('radar', 34, C.gold, 2.2)}</i><span>Spot it early, respond well</span></div>`) + `</div>`).join('');
// X
const XG = [['search', 'Spots dangers early'], ['trendUp', 'Opens new chances']];
const XH = [['clock', 'It takes time'], ['help', 'False alarms']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bb0I').innerHTML = M.icon('megaphone', 20, C.gold, 2.4); $('#bb1I').innerHTML = M.icon('search', 20, C.ink, 2.4); $('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3);
$('#factI').innerHTML = M.icon('ban', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('radar', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz + recap
const OPTS = ['Internal', 'External', 'The recipe', 'Pricing'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('globe', 44, C.gold2, 2.4);
const ROWS = [['globe', 'Environment: actors and forces outside', ['Actors', 'Forces']], ['home', 'Manage inside, watch outside', ['Manage', 'Watch']], ['radar', 'Scan, spot, judge, respond', ['Again and again']]];
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

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  document.querySelectorAll('.ev .et').forEach(el => { if (el.offsetWidth > 440) el.style.fontSize = Math.floor(48 * 440 / el.offsetWidth) + 'px'; });
  PCH.forEach(([, , a, r], i) => { const el = $('#pc' + i), [x, y] = bxy(a, r); el.style.left = (x - el.offsetWidth / 2).toFixed(0) + 'px'; el.style.top = (y - 20).toFixed(0) + 'px'; });
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  for (const g of [[0, 1, 2], [3, 4, 5]]) { let x = 28; g.forEach(i => { const c = $('#ac' + i); c.style.left = x + 'px'; x += c.offsetWidth + 12; }); }
  BL.forEach(([a, r], i) => { const el = $('#bl' + i), [x, y] = bxy(a, r); const left = i === 1 ? x - 30 - el.offsetWidth : x + 30; el.style.left = Math.max(48, Math.min(736 - el.offsetWidth, left)).toFixed(0) + 'px'; el.style.top = (y - 20).toFixed(0) + 'px'; });
  document.querySelectorAll('.sr4 .sx').forEach(el => { if (el.offsetWidth > 632) el.style.fontSize = Math.floor(26 * 632 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const ft = $('#factT'); if (ft.offsetWidth > 552) ft.style.fontSize = Math.floor(28 * 552 / ft.offsetWidth) + 'px';
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : [SIG[0][1] - 0.1, tRout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: three changes outside ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    for (let i = 0; i < 3; i++) {
      const tin = Math.max(tMorph + 0.2 + i * 0.12, tEv[i] - 0.1), c = $('#ev' + i);
      M.vis(c, t, tin, tAout, { dy: 36, ...o });
      M.vis(c.querySelector('.ei'), t, tin + 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.rise(c.querySelector('.et'), t, tin + 0.3, { st: 0.06 });
      M.vis(c.querySelector('.es'), t, tin + 0.5, 1e9, { dy: 10 }); M.vis($('#eb' + i), t, tin + 0.7, 1e9, POP);
      M.vis($('#aw' + i), t, tChanges - 0.2 + i * 0.1, tAout, { dy: -10, ...o });
    }
    M.vis($('#kit'), t, tH2 + 0.05, tAout, { dy: 40, ...o });
    M.vis($('#kitI'), t, tH2 + 0.25, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis($('#kitL'), t, tH2 + 0.3, 1e9, { dy: 8 }); M.rise($('#kitT'), t, tH2 + 0.4, { st: 0.04 });
    M.vis($('#kitP'), t, tC2 - 0.05, 1e9, POP);
  }

  /* ===== L: kitchen + Zoya's page ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#pg'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#core'), t, tL2 + 0.35, 1e9, { dy: 0, fade: 0.15 }); M.vis($('#rgM'), t, tPeople - 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#rgO'), t, tForces - 0.2, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#pgLeg'), t, tL2 + 0.5, 1e9, { dy: 8 });
    PCH.forEach(([, , , , k], i) => M.vis($('#pc' + i), t, (k === 'a' ? tPeople + i * 0.12 : tForces + (i - 3) * 0.12), 1e9, POP));
  }

  /* ===== D: definition ===== */
  const dOn = t >= tD1 - 0.1 && t < tI[0] + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    M.rise($('#kot1'), t, wt('D2', 'Kotler') - 0.1, { st: 0.06, sp: M.HEAVY }); M.rise($('#kot2'), t, wt('D2', 'Armstrong') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'call'), 1e9, { dy: 10 }); M.vis($('#kqHr'), t, wt('D2', 'call') + 0.1, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tHl[0] - 0.3 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tHl[0] - i * 1.1) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#af'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#af0'), t, tD3 + 0.3, 1e9, { dy: 16 }); M.vis($('#af1'), t, tForc - 0.1, 1e9, { dy: 16 });
    tAc.forEach((ta, i) => M.vis($('#ac' + i), t, ta - 0.05, 1e9, POP));
  }

  /* ===== I: inside vs outside ===== */
  const iOn = t >= tI[0] - 0.1 && t < tT + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#ins'), t, tI[0] + 0.05, tIout, { dx: -60, dy: 0, ...o }); M.vis($('#outs'), t, tI[1] - 0.1, tIout, { dx: 60, dy: 0, ...o });
    M.rise($('#ins .ioT'), t, tI[0] + 0.25, { st: 0.06, sp: M.HEAVY }); M.rise($('#outs .ioT'), t, tI[1] + 0.1, { st: 0.06, sp: M.HEAVY });
    for (let i = 0; i < 4; i++) { M.vis($('#ia' + i), t, tIoA[i] - 0.1, 1e9, POP); M.vis($('#ib' + i), t, tIoB[i] - 0.1, 1e9, POP); }
    M.vis($('#ioPA'), t, tManage - 0.1, 1e9, POP); M.vis($('#ioPB'), t, tWatch - 0.1, 1e9, POP);
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

  /* ===== R: scan the environment ===== */
  const rOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#rad'), t, tR[0] + 0.02, tRout, { dx: -60, dy: 0, ...o }); M.vis($('#stp'), t, tR[0] + 0.2, tRout, { dx: 60, dy: 0, ...o });
    M.vis($('#radS'), t, tR[0] + 0.25, 1e9, { dy: 16, sp: M.SOFT });
    const ang = Math.max(0, t - tR[0]) * 110 % 360;
    attr($('#sweepG'), 'transform', `rotate(${ang.toFixed(2)} 392 316)`);
    let k = 0; SIG.forEach((s, i) => { if (t >= s[0]) k = i; });
    M.setT($('#sgH'), `SIGNAL ${k + 1} OF 3`); M.vis($('#sgH'), t, SIG[0][0], 1e9, POP);
    BL.forEach(([, , , ic, bad], i) => {
      const tin = i ? SIG[i][0] : SIG[0][1] - 0.3, g = $('#bp' + i), lb = $('#bl' + i);
      M.vis(g, t, tin, 1e9, { dy: 0, fade: 0.1 }); M.vis(lb, t, tin + 0.15, 1e9, POP);
      const j = M.io((t - SIG[i][3]) / 0.3), col = bad ? mix(C.gold, C.red, j) : C.gold;
      attr(g.querySelector('.bd'), 'fill', col); attr(g.querySelector('.br'), 'stroke', col);
      const pr = t - tin; attr(g.querySelector('.br'), 'r', (18 + (pr > 0 && pr < 1.2 ? 10 * Math.sin(Math.PI * pr / 1.2) : 0)).toFixed(2));
      lb.style.background = bad ? mix(C.paper, C.redBg, j) : mix(C.paper, C.gold3, j); lb.style.color = bad ? mix(C.ink, C.red, j) : C.ink;
      setIco(lb.querySelector('.bli'), ic, bad && j > 0.5 ? C.red : C.gold, 18, 2.4);
    });
    const ts = [tR[0] + 0.3, SIG[k][1], SIG[k][2], SIG[k][4]];
    let cur = 0; ts.forEach((x, i) => { if (t >= x - 0.05) cur = i; });
    STEPS.forEach((_, i) => {
      const r = $('#sr' + i); M.vis(r, t, tR[0] + 0.4 + i * 0.08, 1e9, { dy: 14 });
      const act = i === cur ? M.io((t - ts[i] + 0.05) / 0.3) : 0;
      r.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      r.querySelector('.sl').style.color = mix(C.gold, C.gold2, act);
      r.querySelectorAll('.sx').forEach(x => { x.style.color = mix(C.ink, '#fff', act); });
    });
    M.vis($('#sr0 .sx'), t, tR[0] + 0.6, 1e9, { dy: 10 });
    for (let j = 0; j < 3; j++) {
      const tout = j < 2 ? SIG[j + 1][0] - 0.1 : 1e9, oo = { outDur: 0.18, ody: -10 };
      M.vis($('#sp' + j), t, SIG[j][1] - 0.05, tout, { dy: 10, ...oo }); M.vis($('#sj' + j), t, SIG[j][3] - 0.1, tout, { ...POP, ...oo }); M.vis($('#rs' + j), t, SIG[j][4] + 0.1, tout, { dy: 10, ...oo });
      if (t > tout + 0.3) { M.hide($('#sp' + j), true); M.hide($('#sj' + j), true); M.hide($('#rs' + j), true); }
    }
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
    M.vis($('#xr0'), t, tArjX - 0.05, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr1'), t, tZoyX - 0.05, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr2'), t, tAsk - 0.1, 1e9, { dx: 24, dy: 0 });
    M.vis($('#fact'), t, tMarch - 0.3, 1e9, { dy: 16 });
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
