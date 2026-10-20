// MBA - Marketing Management, Ep 02: Marketing Concepts and Orientations (Laddoo Lab)
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

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = wt('H1', 'How') - 0.15;
const tH3 = T0('H3'), tC2 = T0('C2');
const tAnQ = [wt('H3', 'more'), wt('H3', 'better'), wt('H3', 'harder')], tAnN = [wt('H3', 'Arjun'), wt('H3', 'Nani'), wt('H3', 'Dev')];
const tWay = wt('C2', 'way'), tOrient = wt('C2', 'orientation');
const tL1 = T0('L1'), tL2 = T0('L2'), tAout = tL1 - 0.32;
const tDir = [wt('L2', 'factory'), wt('L2', 'product'), wt('L2', 'selling'), wt('L2', 'customer'), wt('L2', 'society')], tPoints = wt('L1', 'points'), tDecides = wt('L2', 'society') + 0.7;
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD3e = T1('D3'), tLout = tD1 - 0.32;
const tFive = wt('D2', 'five'), tFr = [wt('D3', 'Production'), wt('D3', 'Product'), wt('D3', 'Selling'), wt('D3', 'Marketing'), wt('D3', 'societal')];
const tBelief = wt('D2', 'belief'), tWhy = wt('D2', 'why');
const RUN = ['R', 'O', 'G', 'M', 'Y'];
const tR = RUN.map(a => T0(a + '1')), tDout = tR[0] - 0.32;
const tActor = [wt('R2', 'Arjun'), wt('O2', 'Nani'), wt('G2', 'Dev'), wt('M1', 'customers'), wt('Y1', 'Serve')];
const tVerd = [wt('R3', 'nobody'), wt('O3', 'parents'), wt('G3', 'Pushed'), wt('M3', 'sales'), wt('Y3', 'Good')];
const tT = T0('T1'), tSt2 = wt('T1', 'last'), tPout = tT - 0.32;
const tV = [1, 2, 3, 4, 5, 6, 7].map(i => T0('V' + i)), tTu = tV[0] - 0.32;
const tVout = T0('K0') - 0.32;
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'budget'), wt('K2', 'phone'), wt('K3', 'insurance'), wt('K4', 'bank'), wt('K5', 'food')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'trust'), wt('X2', 'city')], tXh = [wt('X3', 'costs'), wt('X3', 'time')];
const tPaper = wt('X4', 'paper'), tPlast = wt('X4', 'plastic'), tPrice = wt('X5', 'price'), tEarns = wt('X5', 'earns'), tJuly = wt('X6', 'July');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'five')], [wt('S3', 'first'), wt('S3', 'Marketing')], [wt('S4', 'protects')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A: question + three answers
$('#qaF').style.cssText += ';' + FACE('zoya');
$('#qaPI').innerHTML = M.icon('target', 24, C.gold2, 2.4);
const ANS = [['arjun', 'Arjun', 'SALES', 'factory', 'Make more'], ['nani', 'Nani', 'RECIPE', 'gem', 'Make it better'], ['dev', 'Dev', 'DESIGN', 'megaphone', 'Push harder']];
$('#anRow').innerHTML = ANS.map(([f, n, r, ic, q], i) => `<div class="card an" id="an${i}" style="left:${160 + i * 544}px"><div class="av face abs anF" id="anF${i}" style="${FACE(f)}"></div><div class="serif anN">${n}</div><div class="anR">${r}</div><div class="anQ" id="anQ${i}">${M.icon(ic, 26, C.gold, 2.2)}<span>"${q}"</span></div></div>`).join('');
// L: compass
wrap($('#ill'), 'illOut', 784, 580);
const DIRS = [['factory', 'FACTORY', 170], ['package', 'PRODUCT', 130], ['megaphone', 'SELLING', 90], ['users', 'CUSTOMER', 50], ['globe', 'SOCIETY', 10]];
const GC = [392, 430], pol = (a, r) => [GC[0] + r * Math.cos(a * Math.PI / 180), GC[1] - r * Math.sin(a * Math.PI / 180)];
$('#dirs').innerHTML = DIRS.map(([ic, n], i) => `<div class="dir" id="dr${i}"><span class="dri">${M.icon(ic, 20, C.gold, 2.4)}</span><span>${n}</span></div>`).join('');
$('#gtk').innerHTML = DIRS.map(([, , a], i) => { const [x, y] = pol(a, 170); return `<circle id="gk${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#E2DACB"/>`; }).join('');
$('#cmpPI').innerHTML = M.icon('target', 22, '#fff', 2.4);
// D: five rows
const FIVE = [['factory', 'Production', 'Cheap and easy'], ['gem', 'Product', 'Best quality'], ['megaphone', 'Selling', 'Push to buy'], ['users', 'Marketing', 'Serve the need'], ['globe', 'Societal marketing', 'People and planet']];
$('#fRows').innerHTML = FIVE.map(([ic, n, b], i) => `<div class="fr" id="fr${i}" style="top:${88 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${n}</div><div class="rb">${b}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

// P: tabs, left panes, flow, widgets
const TABN = ['Production', 'Product', 'Selling', 'Marketing', 'Societal'];
$('#tabs').innerHTML = FIVE.map(([ic], i) => `<div class="tb" id="tb${i}" style="left:${160 + i * 326}px"><div class="bg"></div><div class="ti"></div><div class="tn">0${i + 1}</div><div class="tt">${TABN[i]}</div></div>`).join('');
const LP = [
  ['THE PRODUCTION CONCEPT', 'Make it *cheap*', 'People want cheap and easy to find', 'arjun', "ARJUN'S IDEA", 'Make 200 laddoos a day', 'Nobody asked who wants 200', 0],
  ['THE PRODUCT CONCEPT', 'Make it *better*', 'People want the best quality', 'nani', "NANI'S IDEA", 'Add almonds and saffron', 'Too fancy for a tiffin', 0],
  ['THE SELLING CONCEPT', 'Push *harder*', 'People will not buy unless pushed', 'dev', "DEV AND ARJUN'S IDEA", 'Posters and gate deals', 'Pushed buyers rarely return', 0],
  ['THE MARKETING CONCEPT', 'Serve the *need*', 'Find needs, serve them better', 'zoya', "ZOYA'S IDEA", 'Ask busy parents first', 'Customers come back weekly', 1],
  ['THE SOCIETAL MARKETING CONCEPT', 'Serve and *protect*', 'Customers, people and planet', 'dev', "DEV'S IDEA", 'Paper packs, not plastic', 'Good for everyone', 1],
];
$('#lps').innerHTML = LP.map(([l, ti, b, f, n, a, v, good], k) => `<div class="lp" id="lp${k}"><div class="lbl" style="left:48px;top:36px;color:${C.gold}">0${k + 1} · ${l}</div><div class="serif lpT">${ACC(ti)}</div><div class="lpB">${b}</div><div class="lpH"></div>
  <div class="av face abs lpF" style="${FACE(f)}"></div><div class="lbl lpN">${n}</div><div class="lpA">${a}</div>
  <div class="lpV" style="${good ? 'background:#B8862F;color:#fff' : 'background:#F6E3DC;color:#B5482F'}">${M.icon(good ? 'check' : 'x', 22, good ? '#fff' : C.red, 2.8)}<span>${v}</span></div></div>`).join('');
const NODES = [['factory', 'KITCHEN'], ['package', 'PRODUCT'], ['megaphone', 'PROMOTION'], ['users', 'CUSTOMER'], ['globe', 'SOCIETY']];
const NX = NODES.map((_, i) => 72 + i * 182);
$('#nodes').innerHTML = NODES.map(([ic, n], i) => `<g id="nd${i}" transform="translate(${i * 182} 0)"><rect width="144" height="96" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g class="ni" transform="translate(56 14)"></g><text class="nt" x="72" y="80" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">${n}</text></g>`).join('') +
  NODES.slice(0, 4).map((_, i) => `<path d="M${i * 182 + 150} 48 h20 m-7 -7 l7 7 l-7 7" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
const MOV = ['arjun', 'nani', 'dev', 'zoya', 'dev'];
const SELL = [8, 34, 20, 12, 9, 8], MKT = [10, 14, 19, 24, 30, 36], BMAX = 40, BH = 104;
const bars = (k, data, show) => data.map((v, i) => { const h = BH * v / BMAX, x = i * 155.2; return `<div class="bw" id="bw${k}${i}" style="left:${x.toFixed(1)}px;top:${160 - h}px;height:${h}px"></div><div class="bwl" style="left:${x.toFixed(1)}px;top:168px">WEEK ${i + 1}</div>` + (show.includes(i) ? `<div class="bwv" id="bv${k}${i}" style="left:${x.toFixed(1)}px;top:${h > 44 ? 160 - h + 8 : 160 - h - 32}px;color:${h > 44 ? '#fff' : C.ink}">${v}</div>` : ''); }).join('');
const star = (x, id) => `<path id="${id}" transform="translate(${x} 2)" d="M24 2 L30.2 15.4 L44.9 17.2 L34.1 27.3 L36.9 41.8 L24 34.6 L11.1 41.8 L13.9 27.3 L3.1 17.2 L17.8 15.4 Z" fill="#E2DACB" stroke-linejoin="round"/>`;
const ip = (id, ic, tx) => `<div class="ip" id="${id}">${M.icon(ic, 20, C.gold, 2.4)}<span>${tx}</span></div>`;
const WD = [
  `<div class="serif big" id="w0n" style="left:0;top:6px">0</div><div class="lbl" style="left:0;top:98px">LADDOOS A DAY</div>
   <div id="w0d" class="abs" style="left:260px;top:8px;width:292px;height:112px">${Array.from({ length: 40 }, (_, i) => `<div class="dt" id="dt${i}" style="left:${(i % 10) * 30}px;top:${Math.floor(i / 10) * 30}px"></div>`).join('')}</div>
   <div class="lbl" style="left:260px;top:140px">EACH DOT = 5 LADDOOS</div>
   <div class="lbl" style="left:640px;top:0">COST PER LADDOO</div><div class="serif big" id="w0c" style="left:640px;top:36px">₹12</div>${ip('w0w', 'trendDown', 'Was ₹12')}`,
  `<svg id="w1s" width="300" height="52" style="position:absolute;left:0;top:0">${[0, 1, 2, 3, 4].map(i => star(i * 60, 'sr' + i)).join('')}</svg><div class="lbl" style="left:0;top:66px">QUALITY</div>
   ${ip('w1a', 'plus', 'Almonds')}${ip('w1b', 'plus', 'Saffron')}
   <div class="lbl" style="left:640px;top:0">PRICE FOR SIX</div><div class="serif big" id="w1p" style="left:640px;top:36px">₹120</div>${ip('w1w', 'trendUp', 'Was ₹120')}`,
  `${ip('w2a', 'megaphone', 'Posters')}${ip('w2b', 'tag', 'Gate deals')}<div class="lbl wkl" id="wl2" style="top:12px">PACKS A WEEK</div>${bars(2, SELL, [1, 5])}`,
  `${ip('w3a', 'target', 'Small laddoos')}${ip('w3b', 'package', 'Six pack')}${ip('w3c', 'laddoo', 'Tiffin boxes')}<div class="lbl wkl" id="wl3" style="top:12px">PACKS A WEEK</div>${bars(3, MKT, [5])}`,
  [['smile', 'THE CHILD', 'No refined sugar'], ['users', 'THE FAMILY', 'Fair ₹120 price'], ['building', 'THE CITY', 'Paper, not plastic']].map(([ic, n, tx], i) => `<div class="so" id="so${i}" style="left:${i * 300}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${tx}</div></div>`).join(''),
];
$('#wds').innerHTML = WD.map((h, k) => `<div class="wd" id="wd${k}">${h}</div>`).join('');

// V: Levitt + lens diagrams
$('#lvE').innerHTML = M.icon('eye', 30, C.gold, 2.2);
wrap($('#lv'), 'lvOut', 784, 580);
const LZ = [
  ['WHAT BUSINESS WERE THEY IN?', 'WHAT THEY SAW', 'train', 'Railroads', 'only their product', 'WHAT CUSTOMERS NEEDED', 'Transportation', [['train', 'Train'], ['car', 'Car'], ['truck', 'Truck'], ['plane', 'Plane']], 'Product oriented, not customer oriented', 0],
  ['WHAT BUSINESS IS LADDOO LAB IN?', 'WHAT WE MAKE', 'laddoo', 'Laddoos', 'only our product', 'WHAT PARENTS BUY', 'Healthy tiffin snacks', [['laddoo', 'Laddoo'], ['cookie', 'Biscuit'], ['apple', 'Fruit'], ['package', 'Chips']], 'Every tiffin snack is a rival', 1],
];
$('#lzs').innerHTML = LZ.map(([l, a, ic, nm, note, b, bt, tiles, pill, good], k) => `<div class="lz" id="lz${k}"><div class="lbl" style="left:48px;top:40px">${l}</div>
  <div class="lbl lza" style="left:48px;top:96px">${a}</div><div class="lnA" id="lnA${k}"><i>${M.icon(ic, 44, C.ink, 2.2)}</i><span>${nm}</span></div><div class="lnN" id="lnN${k}">${note}</div>
  <div class="lbl lzb" style="left:48px;top:272px">${b}</div><div class="lnB" id="lnB${k}"><div class="lbT">${bt}</div>${tiles.map(([ti, tn], i) => `<div class="lt4" id="lt${k}${i}" style="left:${28 + i * 160}px"><span class="lti">${M.icon(ti, 26, C.ink, 2.2)}</span><span>${tn}</span></div>`).join('')}</div>
  <div class="lnP" id="lnP${k}" style="${good ? 'background:#B8862F;color:#fff' : 'background:#F6E3DC;color:#B5482F'}">${M.icon(good ? 'check' : 'eye', 22, good ? '#fff' : C.red, 2.6)}<span>${pill}</span></div></div>`).join('');

// K: at work today
const KA = [
  ['factory', 'Production', 'Cheap and everywhere', "Arjun's idea: 200 laddoos a day", 'plane', 'A budget airline cuts costs, so fares stay low'],
  ['gem', 'Product', 'Better and better', "Nani's almond and saffron laddoo", 'camera', 'A phone maker adds a sharper camera every year'],
  ['megaphone', 'Selling', 'Push hard', 'Posters and deals at the college gate', 'call', 'An insurance agent calls you again and again'],
  ['users', 'Marketing', 'Need first', 'Small laddoos in a six pack for tiffins', 'bank', 'A bank adds the app features customers ask for'],
  ['globe', 'Societal', 'Customers and society', 'No refined sugar, and paper packs', 'phone', 'A food app lets you say no to plastic spoons'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${96 + i * 92}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['FIVE CONCEPTS TODAY', 'Five mindsets', 'You can spot them in any business', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM AN AIRLINE TO A LADDOO KITCHEN</div><div class="pe"><i>${M.icon('target', 34, C.gold, 2.2)}</i><span>Ask: where does it point?</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['heart', 'Customers trust you'], ['building', 'A cleaner city']];
const XH = [['coin', 'It costs more'], ['clock', 'It takes time']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#pkAI').innerHTML = M.icon('package', 30, C.red, 2.2); $('#pkBI').innerHTML = M.icon('leaf', 30, C.gold, 2.2);
$('#pkABI').innerHTML = M.icon('x', 18, C.red, 2.8); $('#pkBBI').innerHTML = M.icon('check', 18, '#fff', 3);
$('#bb0I').innerHTML = M.icon('tag', 20, C.gold, 2.4); $('#bb1I').innerHTML = M.icon('trendDown', 20, C.red, 2.4);
$('#factI').innerHTML = M.icon('ban', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Production', 'Selling', 'Product', 'Societal marketing'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('globe', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Five ways to think about the market', ['5 concepts']], ['swap', 'Business first, or customer first', ['First three', 'Marketing']], ['globe', 'Societal: people and planet too', ['No harm']]];
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
// highlight a list row (navy while active, then settles back)
const rowHi = (el, ic, t, ta, td, rt = '.rt') => {
  const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
  el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
  el.querySelector(rt).style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
  el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
  el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
  setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
  return act;
};
// needle angle on the compass
const needleA = M.track(90, tDir.map((td, i) => [td - 0.1, DIRS[i][2]]), M.SOFT);
// the mover on the flow: back to the kitchen at each concept start, then out to the focus node
const moverX = t => {
  let k = -1; for (let i = 0; i < 5; i++) if (t >= tR[i]) k = i;
  if (k < 0) return [72, 0];
  const prev = k ? NX[k - 1] : 72;
  const back = M.lerp(prev, 72, M.spring(t - tR[k], M.HEAVY));
  const out = M.lerp(0, NX[k] - 72, M.spring(t - tActor[k] + 0.05, M.HEAVY));
  return [back + out, k];
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  for (let i = 0; i < 3; i++) { const q = $('#anQ' + i); q.style.left = (256 - q.offsetWidth / 2) + 'px'; }
  DIRS.forEach(([, , a], i) => { const d = $('#dr' + i), [x, y] = pol(a, 268); d.style.left = (x - d.offsetWidth / 2).toFixed(0) + 'px'; d.style.top = (y - 22).toFixed(0) + 'px'; });
  const cp = $('#cmpP'); cp.style.left = (392 - cp.offsetWidth / 2) + 'px';
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  for (let i = 0; i < 4; i++) { const q = $('#lq' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  document.querySelectorAll('.lp .lpT').forEach(el => { if (el.offsetWidth > 552) el.style.fontSize = Math.floor(52 * 552 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.lp .lpB').forEach(el => { if (el.offsetWidth > 552) el.style.fontSize = Math.floor(26 * 552 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.lp .lpA').forEach(el => { if (el.offsetWidth > 464) el.style.fontSize = Math.floor(28 * 464 / el.offsetWidth) + 'px'; });
  $('#w0w').style.cssText += ';left:640px;top:126px'; $('#w1w').style.cssText += ';left:640px;top:126px';
  $('#w1a').style.cssText += ';left:0;top:110px'; $('#w1b').style.cssText += `;left:${$('#w1a').offsetWidth + 12}px;top:110px`;
  for (const k of [2, 3]) {
    let x = 0; for (const s of 'abc') { const el = $('#w' + k + s); if (!el) continue; el.style.left = x + 'px'; el.style.top = '0px'; x += el.offsetWidth + 12; }
    const l = $('#wl' + k); l.style.left = (872 - l.offsetWidth) + 'px';
  }
  for (let k = 0; k < 2; k++) { const p = $('#lnP' + k); p.style.left = (392 - p.offsetWidth / 2) + 'px'; }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  $('#bb1').style.left = (84 + $('#bb0').offsetWidth + 16) + 'px';
  const ft = $('#factT'); if (ft.offsetWidth > 552) ft.style.fontSize = Math.floor(28 * 552 / ft.offsetWidth) + 'px';
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

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
  const exOn = t < tT ? [tR[0] + 0.4, tPout] : [tX4 - 0.1, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: one question, three answers ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#qa'), t, tMorph + 0.2, tAout, { dy: 36, ...o });
    M.vis($('#qaF'), t, tMorph + 0.4, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#qaL'), t, tMorph + 0.48, 1e9, { dy: 10 });
    M.rise($('#qaT'), t, tMorph + 0.55, { st: 0.06, sp: M.HEAVY });
    M.vis($('#qaP'), t, tWay - 0.1, 1e9, POP);
    for (let i = 0; i < 3; i++) {
      const c = $('#an' + i); M.vis(c, t, tAnN[i] - 0.25, tAout, { dy: 36, ...o });
      M.vis($('#anF' + i), t, tAnN[i] - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#anQ' + i), t, tAnQ[i] - 0.05, 1e9, POP);
      const on = M.io((t - tAnN[i] + 0.05) / 0.25);
      $('#anF' + i).style.boxShadow = '0 0 0 5px ' + mix(C.ink, C.gold, on);
      const q = $('#anQ' + i), g = M.io((t - tOrient) / 0.3);
      q.style.background = mix(C.paper, C.ink, g); q.style.color = mix(C.ink, '#fff', g);
    }
  }

  /* ===== L: team + compass ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tPoints);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#cmp'), t, tPoints + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#gauge'), t, tPoints + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = needleA(t);
    attr($('#needle'), 'transform', `translate(392 430) rotate(${(-a).toFixed(2)})`);
    let cur = -1; tDir.forEach((td, i) => { if (t >= td - 0.1) cur = i; });
    DIRS.forEach(([ic], i) => {
      const d = $('#dr' + i); M.vis(d, t, tPoints + 0.45 + i * 0.07, 1e9, POP);
      const on = M.io((t - tDir[i] + 0.1) / 0.25) * (i < 4 ? 1 - M.io((t - tDir[i + 1] + 0.1) / 0.25) : 1);
      d.style.background = mix('#fff', C.ink, on); d.style.borderColor = mix(C.line, C.ink, on); d.style.color = mix(C.ink, '#fff', on);
      setIco(d.querySelector('.dri'), ic, on > 0.5 ? C.gold2 : C.gold, 20, 2.4);
      attr($('#gk' + i), 'fill', t >= tDir[i] - 0.1 ? C.gold : C.line);
    });
    M.vis($('#cmpP'), t, tDecides - 0.1, 1e9, POP);
  }

  /* ===== D: Kotler's five ===== */
  const dOn = t >= tD1 - 0.1 && t < tR[0] + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Philip') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'Kotler') + 0.2, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tFive - 0.3, 1e9, { dy: 0 });
    M.vis($('#ql0'), t, tFive - 0.1, 1e9, { dy: 14 }); M.vis($('#ql1'), t, tFive + 0.1, 1e9, { dy: 14 });
    M.vis($('#ql2'), t, tBelief - 0.25, 1e9, { dy: 14 }); M.vis($('#ql3'), t, tBelief - 0.05, 1e9, { dy: 14 });
    [tFive, tBelief, tWhy].forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#fl'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    FIVE.forEach(([ic], i) => {
      const el = $('#fr' + i); M.vis(el, t, tD3 + 0.3 + i * 0.06, 1e9, { dy: 14 });
      rowHi(el, ic, t, tFr[i] - 0.05, i < 4 ? tFr[i + 1] - 0.05 : tD3e + 0.2);
      M.vis(el.querySelector('.rb'), t, tFr[i] + 0.25, 1e9, { dx: 16, dy: 0 });
      { const on = M.io((t - tFr[i] + 0.05) / 0.3) * (1 - M.io((t - (i < 4 ? tFr[i + 1] - 0.05 : tD3e + 0.2)) / 0.35)); el.querySelector('.rb').style.color = mix(C.ink2, C.gold2, on); }
    });
  }

  /* ===== P: five runs on one flow ===== */
  const pOn = t >= tR[0] - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    FIVE.forEach(([ic], i) => {
      const el = $('#tb' + i), ta = tR[i], td = i < 4 ? tR[i + 1] : tPout + 1;
      M.vis(el, t, tR[0] + 0.05 + i * 0.06, tPout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelector('.tt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.tn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ti').style.background = t < ta ? C.paper : mix(C.navy2, C.gold3, off);
      setIco(el.querySelector('.ti'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    M.vis($('#stg'), t, tR[0] + 0.2, tPout, { dy: 36, ...o });
    M.vis($('#sdv'), t, tR[0] + 0.5, 1e9, { dy: 0 });
    M.vis($('#flow'), t, tR[0] + 0.45, 1e9, { dy: 16, sp: M.SOFT });
    const [mx, k] = moverX(t);
    attr($('#mover'), 'transform', `translate(${mx.toFixed(1)} 136)`);
    if (k >= 0) attr($('#mvI'), 'href', `${IMG}ll-${MOV[k]}-face.jpg`);
    attr($('#trail'), 'd', `M72 136 H${Math.max(72.01, mx).toFixed(1)}`);
    const mo = M.clamp((t - tR[0] - 0.6) / 0.15); $('#mover').style.opacity = mo.toFixed(3); M.hide($('#mover'), mo <= 0);
    NODES.forEach(([ic], i) => {
      const g = $('#nd' + i), r = g.querySelector('rect');
      g.style.opacity = M.clamp((t - tR[0] - 0.55 - i * 0.06) / 0.12).toFixed(3);
      const hit = k >= 0 && t > tActor[k] + 0.35 && (i === k || (k === 4 && i === 3)) ? 1 : (k === 0 && i === 0 && t > tActor[0] ? 1 : 0);
      attr(r, 'stroke', hit ? C.gold : C.line); attr(r, 'stroke-width', hit ? 4 : 2); attr(r, 'fill', hit ? C.gold3 : '#FFFFFF');
      attr(g.querySelector('.nt'), 'fill', hit ? C.gold : C.muted);
      const ni = g.querySelector('.ni'), key = ic + hit; if (ni._k !== key) { ni._k = key; ni.innerHTML = M.icon(ic, 32, hit ? C.gold : C.ink, 2.2); }
    });
    for (let q = 0; q < 5; q++) {
      const tin = tR[q], tout = q < 4 ? tR[q + 1] - 0.14 : 1e9;
      const lp = $('#lp' + q), wd = $('#wd' + q), off = t < tin - 0.01 || t > tout + 0.3;
      M.hide(lp, off); M.hide(wd, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 }, tb = q ? tin : tin + 0.4;
      M.vis(lp.querySelector('.lbl'), t, tb + 0.05, tout, { dy: 10, ...oo });
      M.rise(lp.querySelector('.lpT'), t, tb + 0.12, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(lp.querySelector('.lpB'), t, tb + 0.4, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(lp.querySelector('.lpH'), t, tb + 0.5, tout, { dy: 0, ...oo });
      M.vis(lp.querySelector('.lpF'), t, tActor[q] - 0.1, tout, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08, ...oo });
      M.vis(lp.querySelector('.lpN'), t, tActor[q], tout, { dy: 10, ...oo });
      M.rise(lp.querySelector('.lpA'), t, tActor[q] + 0.1, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(lp.querySelector('.lpV'), t, tVerd[q] - 0.05, tout, { ...POP, ...oo });
      M.vis(wd, t, tb + 0.3, tout, { dy: 16, ...oo });
    }
    // widget 0: production
    { const tn = wt('R2', 'two'), n = 200 * M.o3((t - tn) / 1.6); M.setT($('#w0n'), String(Math.round(n)));
      for (let i = 0; i < 40; i++) $('#dt' + i).style.background = n >= (i + 1) * 5 - 0.01 ? C.ld : C.line;
      const td = wt('R2', 'lower'), c = 12 - 3 * M.o3((t - td) / 0.9); M.setT($('#w0c'), '₹' + Math.round(c)); $('#w0c').style.color = mix(C.ink, C.gold, M.io((t - td) / 0.4));
      M.vis($('#w0w'), t, td + 0.6, 1e9, POP); }
    // widget 1: product
    { const ts = [tR[1] + 0.6, tR[1] + 0.7, tR[1] + 0.8, wt('O2', 'almonds'), wt('O2', 'saffron')];
      ts.forEach((s, i) => attr($('#sr' + i), 'fill', t >= s ? C.gold : C.line));
      M.vis($('#w1a'), t, ts[3] - 0.05, 1e9, POP); M.vis($('#w1b'), t, ts[4] - 0.05, 1e9, POP);
      const tp = wt('O2', 'price'), p = 120 + 80 * M.o3((t - tp) / 1.0); M.setT($('#w1p'), '₹' + Math.round(p / 5) * 5); $('#w1p').style.color = mix(C.ink, C.red, M.io((t - tp) / 0.5));
      M.vis($('#w1w'), t, tp + 0.8, 1e9, POP); }
    // widgets 2, 3: weekly packs
    const barRun = (k, data, times, col) => data.forEach((v, i) => {
      const el = $('#bw' + k + i), u = M.spring(t - times[i], M.HEAVY), h = BH * v / BMAX;
      snap(el, `scaleY(${u >= 1 ? 1 : Math.max(0, u).toFixed(4)})`); el.style.transformOrigin = '50% 100%';
      el.style.background = t >= times[i] ? col(i) : C.line;
      const bv = $('#bv' + k + i); if (bv) M.vis(bv, t, times[i] + 0.3, 1e9, { dy: 8 });
    });
    { M.vis($('#w2a'), t, wt('G2', 'posters') - 0.05, 1e9, POP); M.vis($('#w2b'), t, wt('G2', 'deals') - 0.05, 1e9, POP); M.vis($('#wl2'), t, tR[2] + 0.8, 1e9, { dy: 8 });
      const tj = wt('G3', 'jump'), tf = wt('G3', 'fall');
      barRun(2, SELL, [tj - 0.3, tj, tf - 0.25, tf - 0.05, tf + 0.15, tf + 0.35], i => i < 2 ? C.gold : C.red2); }
    { M.vis($('#w3a'), t, wt('M2', 'small') - 0.05, 1e9, POP); M.vis($('#w3b'), t, wt('M2', 'six') - 0.05, 1e9, POP); M.vis($('#w3c'), t, wt('M2', 'tiffins') - 0.05, 1e9, POP); M.vis($('#wl3'), t, tR[3] + 0.8, 1e9, { dy: 8 });
      const a = wt('M3', 'Mrs'), b = wt('M3', 'keep');
      barRun(3, MKT, MKT.map((_, i) => a + i * (b - a) / 5), () => C.gold); }
    // widget 4: societal
    { const tin = [wt('Y1', 'people'), wt('Y1', 'customers'), wt('Y1', 'planet')], th = [wt('Y3', 'child'), wt('Y3', 'family'), wt('Y3', 'city')];
      const SO = ['smile', 'users', 'building'];
      for (let i = 0; i < 3; i++) {
        const el = $('#so' + i); M.vis(el, t, tin[i] - 0.1, 1e9, POP);
        const on = M.io((t - th[i]) / 0.25);
        el.style.background = mix(C.paper, C.ink, on); el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
        setIco(el.querySelector('.zi'), SO[i], on > 0.5 ? C.gold2 : C.gold, 44, 2.2);
      } }
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

  /* ===== V: Levitt, Marketing Myopia ===== */
  const vOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sV'), !vOn);
  if (vOn) {
    const o = { outDur: 0.3, ody: -16 };
    const lv = $('#lv'); M.vis(lv, t, tV[0] + 0.02, tV[5] - 0.3, { dy: 36, ...o }); grow(lv, $('#lvOut'), t, tV[2]);
    M.rise($('#lvT'), t, wt('V1', 'Marketing') - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#lvE'), t, tV[1] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.rise($('#lvM'), t, tV[1] + 0.05, { st: 0.05 });
    M.vis($('#lvH'), t, wt('V1', 'Harvard') - 0.2, 1e9, { dy: 0 });
    const tl5 = [wt('V5', 'railroads'), wt('V5', 'product'), wt('V5', 'instead'), wt('V5', 'customer')];
    for (let i = 0; i < 4; i++) { const q = $('#lq' + i); M.vis(q, t, wt('V1', 'Harvard') + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tV[4] - i * 0.5) / 0.3)); }
    const lh = [[tl5[0], C.gold], [tl5[0] + 0.5, C.gold], [tl5[1], C.red], [tl5[3], C.gold]];
    lh.forEach(([th, col], i) => { const u = M.io((t - th) / 0.3); $('#lh' + i).style.color = u <= 0 ? '' : mix(C.ink, col, u); });
    M.vis($('#tf'), t, tV[5] + 0.05, tVout, { dx: -60, dy: 0, ...o });
    M.vis($('#tfImg'), t, tV[5] + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#lr'), t, tV[2] + 0.12, tVout, { dx: 60, dy: 0, ...o });
    for (let k = 0; k < 2; k++) {
      const z = $('#lz' + k), tin = k ? tV[5] : tV[2] + 0.2, tout = k ? 1e9 : tV[5] - 0.15;
      const off = t < tin - 0.01 || t > tout + 0.3; M.hide(z, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      const tA = k ? wt('V6', 'business') : wt('V3', 'railroads'), tB = k ? wt('V7', 'Healthy') : wt('V3', 'travel');
      M.vis(z.querySelector('.lbl'), t, tin + 0.05, tout, { dy: 10, ...oo });
      M.vis(z.querySelector('.lza'), t, tA - 0.15, tout, { dy: 10, ...oo }); M.vis($('#lnA' + k), t, tA - 0.1, tout, { dy: 16, ...oo });
      M.vis($('#lnN' + k), t, tA + 0.3, tout, { dx: -12, dy: 0, ...oo });
      M.vis(z.querySelector('.lzb'), t, tB - 0.15, tout, { dy: 10, ...oo }); M.vis($('#lnB' + k), t, tB - 0.1, tout, { dy: 16, ...oo });
      for (let i = 0; i < 4; i++) M.vis($('#lt' + k + i), t, tB + 0.2 + i * 0.08, tout, { ...POP, ...oo });
      const tRed = k ? wt('V7', 'Not') + 0.1 : tl5[1];
      const r = M.io((t - tRed) / 0.3); $('#lnA' + k).style.background = mix(C.paper, C.redBg, r); $('#lnA' + k).querySelector('span').style.color = mix(C.ink, C.red, r);
      const tTile = k ? [0, wt('V7', 'biscuits'), wt('V7', 'fruit'), wt('V7', 'chips')] : [wt('V4', 'took'), wt('V4', 'cars'), wt('V4', 'trucks'), wt('V4', 'planes')];
      for (let i = 0; i < 4; i++) {
        const el = $('#lt' + k + i), ic = LZ[k][7][i][0];
        let bg = '#FFFFFF', fg = C.ink;
        if (k === 0 && i === 0) { const u = M.io((t - tTile[0]) / 0.3); bg = mix('#FFFFFF', C.redBg, u); fg = mix(C.ink, C.red, u); }
        else if (k === 1 && i === 0) { const u = M.io((t - tB - 0.6) / 0.3); bg = mix('#FFFFFF', C.gold, u); fg = mix(C.ink, '#fff', u); }
        else { const u = M.io((t - tTile[i]) / 0.3); bg = mix('#FFFFFF', C.ink, u); fg = mix(C.ink, '#fff', u); }
        el.style.background = bg; el.style.color = fg;
        setIco(el.querySelector('.lti'), ic, fg === C.ink ? C.ink : fg, 26, 2.2);
      }
      M.vis($('#lnP' + k), t, k ? wt('V7', 'rivals') - 0.1 : tl5[1] - 0.1, tout, { ...POP, ...oo });
    }
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i); M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      rowHi(el, ic, t, tK[i], i < 4 ? tK[i + 1] : tKout + 1);
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
    M.vis($('#pkB'), t, tPaper - 0.1, 1e9, { dy: 20 }); M.vis($('#pkA'), t, tPlast - 0.1, 1e9, { dy: 20 });
    M.vis($('#pkBB'), t, tPlast + 0.5, 1e9, POP); M.vis($('#pkAB'), t, tPlast + 0.7, 1e9, POP);
    M.vis($('#xr0'), t, tPrice - 0.3, 1e9, { dx: 24, dy: 0 });
    M.vis($('#bb0'), t, tPrice - 0.1, 1e9, POP); M.vis($('#bb1'), t, tEarns - 0.05, 1e9, POP);
    $('#bb1').style.background = C.redBg; $('#bb1').style.color = C.red;
    M.vis($('#fact'), t, tJuly - 0.15, 1e9, { dy: 16 });
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
