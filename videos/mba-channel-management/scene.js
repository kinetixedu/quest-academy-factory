// MBA - Marketing Management, Ep 27: Channel Management (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  swap: ['M8 3 4 7l4 4', 'M4 7h16', 'm16 21 4-4-4-4', 'M20 17H4'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  call: ['M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  cart: ['M8 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'],
  laptop: ['M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16'],
  sparkle: ['M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  stand: ['M4 3h16v12H4z', 'M4 9h16', 'M8 15v6', 'M16 15v6', 'M6 21h12'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  zapOff: ['M13 2 3 14h9l-1 8 10-12h-9l1-8z'],
  paint: ['M18 2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z', 'M12 10v4', 'M10 14h4v8h-4z'],
  pill: ['m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z', 'm8.5 8.5 7 7'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 17h6', 'M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tCalls = wt('H2', 'calls'), tAngry = wt('H2', 'angry');
const tC2 = T0('C2'), tOnline = wt('C2', 'online'), tHow = wt('C2', 'how'), tKeep = wt('C2', 'keep');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tL4 = T0('L4');
const tPath = [wt('L2', 'kitchen') - 0.5, wt('L2', 'kitchen'), wt('L2', 'customer') - 0.35, wt('L2', 'customer')];
const tPaths = [wt('L3', 'ten'), wt('L3', 'supermarket'), wt('L4', 'online')], tThree = wt('L4', 'Three'), tOneP = wt('L4', 'one');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D: what is channel management
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M1') - 0.32;
const tKqL = wt('D2', 'Principles') + 0.5, tHl = [wt('D3', 'selecting'), wt('D3', 'motivating'), wt('D3', 'performance')];
const tMem = [wt('D4', 'business'), wt('D4', 'shop'), wt('D4', 'wholesaler')], tHelps = wt('D4', 'helps');
const tSw = [wt('D5', 'pick'), wt('D5', 'help'), wt('D5', 'check')];
// M: Arjun's round
const tM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => i ? T0('M' + i) : 0);
const tVis0 = wt('M2', 'visits'), tCrit = [wt('M3', 'parents'), wt('M3', 'clean'), wt('M3', 'pays')], tPass = wt('M4', 'pass'), tDrop = wt('M4', 'dropped');
const tMargin = wt('M5', 'margin'), tPart = wt('M6', 'part'), tKeeps = wt('M6', 'keeps'), tStand = wt('M7', 'display'), tMonday = wt('M7', 'Monday');
const tCounts = wt('M8', 'counts'), tOnly = wt('M9', 'only'), tHidden = wt('M10', 'hidden'), tMoves = wt('M11', 'moves'), tNext = wt('M11', 'next'), tUp = wt('M11', 'up');
const tMout = T0('T1') - 0.32;
// statement
const tT = T0('T1'), tSt2 = wt('T1', 'When'), tF1 = T0('F1'), tTu = tF1 - 0.32;
// F: conflict
const tF = [0, 1, 2, 3, 4, 5, 6, 7].map(i => i ? T0('F' + i) : 0);
const tConf = wt('F1', 'conflict'), tGg = [wt('F2', 'goals'), wt('F2', 'roles'), wt('F2', 'rewards')];
const tVert = wt('F3', 'Vertical'), tLevels = wt('F3', 'levels'), tHor = wt('F4', 'Horizontal'), tSame = wt('F4', 'same');
const tOwn = wt('F5', 'online'), tIsV = wt('F5', 'vertical'), tFirst = wt('F6', 'First'), tPrice = wt('F6', 'price'), tEvery = wt('F6', 'everywhere');
const tGo = wt('F7', 'go'), tDel = wt('F7', 'delivers'), tKeepM = wt('F7', 'keeps');
const tFout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'paint'), wt('K3', 'medicine'), wt('K4', 'car')];
// X: human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'Shops'), wt('X2', 'families')], tXh = [wt('X3', 'margin'), wt('X3', 'big')];
const tSup = wt('X4', 'supermarket'), tNaniX = wt('X4', 'Nani'), tPres = wt('X4', 'preservatives'), tAgree = wt('X5', 'agree'), tFresh = wt('X5', 'fresher'), tKot = wt('X6', 'Kotler');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Both');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'selecting'), wt('S2', 'motivating'), wt('S2', 'evaluating')], [wt('S3', 'between'), wt('S3', 'same')], [wt('S4', 'win')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r, id = '') => `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;

// A: ten shop tiles, the call
$('#s10').innerHTML = Array.from({ length: 10 }, (_, i) => `<div class="st10" id="g${i}" style="left:${36 + i * 86}px">${M.icon('store', 32, C.gold, 2.2)}</div>`).join('');
$('#cSoldI').innerHTML = M.icon('store', 24, C.gold, 2.4); $('#cLeftI').innerHTML = M.icon('call', 22, C.red, 2.4);
$('#callI').innerHTML = M.icon('call', 24, C.gold2, 2.4);
// L: the path + three channels
const PATH = [['nani', 'MAKER', 'Nani'], ['arjun', 'DELIVERY', 'Arjun'], [null, 'SELLER', 'Shop'], ['rao', 'BUYER', 'Mrs. Rao']];
$('#pRow').innerHTML = PATH.map(([f, n, nm], i) => `<div class="pt4" id="pt${i}" style="left:${36 + i * 187}px"><div class="zn">${n}</div><div class="pf" style="${f ? FACE(f) : 'box-shadow:0 0 0 3px #B8862F'}">${f ? '' : M.icon('store', 28, C.gold, 2.2)}</div><div class="zt">${nm}</div></div>` +
  (i < 3 ? `<div class="pa4" id="pa${i}" style="left:${36 + i * 187 + 150 + 6}px">${M.icon('arrowR', 24, C.gold, 2.6)}</div>` : '')).join('');
const TP = [['store', 'PATH 1', '10 local shops'], ['cart', 'PATH 2', 'Supermarket'], ['laptop', 'PATH 3', 'Online shop']];
$('#tRow').innerHTML = TP.map(([ic, n, t], i) => `<div class="sws" id="tp${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('') +
  `<div class="gp" id="oneP"><span id="onePI"></span>One product</div>`;
$('#onePI').innerHTML = M.icon('laddoo', 20, '#fff', 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// D: members chain + simple words
$('#vgoodI').innerHTML = M.icon('check', 20, '#fff', 3);
const VM = [['laddoo', 'MAKER', 'Laddoo Lab'], ['package', 'WHOLESALER', 'Middleman'], ['store', 'SHOP', 'Retailer'], ['user', 'BUYER', 'Family']];
$('#vRow').innerHTML = VM.map(([ic, n, t], i) => `<div class="zs" id="vm${i}" style="left:${36 + i * 184}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
const SWT = [['target', 'STEP 1', 'Pick partners'], ['award', 'STEP 2', 'Help them sell'], ['chart', 'STEP 3', 'Check results']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: Arjun's round. Map coords inside a 688 x 340 svg; 12 shops in 6 columns. */
const CX = [0, 1, 2, 3, 4, 5].map(j => 64 + j * 112), ROWY = [22, 238], STREET = 170;
// shop k: column k % 6, row k < 6 ? 0 : 1. Dropped: top of column 3, bottom of column 2.
const SHOPS = []; { let n = 0; for (let j = 0; j < 6; j++) for (let r = 0; r < 2; r++) { const drop = (j === 3 && r === 0) || (j === 2 && r === 1); SHOPS.push({ j, r, drop, num: drop ? 0 : ++n }); } }
const HID = SHOPS.find(s => s.num === 7);
const sbox = (s, k) => `<g id="sh${k}" transform="translate(${CX[s.j] - 46} ${ROWY[s.r]})"><rect width="92" height="80" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g class="bi" transform="translate(32 12)">${M.icon('store', 28, C.ink, 2.2)}</g><text class="bt" x="46" y="66" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">SHOP</text>` +
  `<g class="bd" transform="translate(84 2)"><circle r="14" fill="#B8862F"/><g transform="translate(-9 -9)">${M.icon('coin', 18, '#fff', 2.4)}</g></g></g>`;
const avG = (id, face, x, y) => `<g id="${id}" transform="translate(${x} ${y})"><circle r="30" fill="#14213D"/><image href="${IMG}ll-${face}-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#avc)"/></g>`;
$('#mLIn').innerHTML = `<div class="mav" style="${FACE('arjun')}"></div><div class="lbl mlb">ARJUN'S ROUND</div>` +
  ['SELECT', 'MOTIVATE', 'EVALUATE'].map((s, i) => `<div class="stg" id="stg${i}">${s}</div>`).join('') + `
    <svg class="mplan" id="planL" width="688" height="340"><defs><clipPath id="avc"><circle cx="0" cy="0" r="26"/></clipPath></defs>
      <rect width="688" height="340" rx="24" fill="#F5F1E8"/>
      <path d="M0 ${STREET} H688" stroke="#E2DACB" stroke-width="3" stroke-dasharray="10 10"/>
      <path id="trail" d="M24 ${STREET} H624" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 12"/>
      ${SHOPS.map(sbox).join('')}
      ${avG('avA', 'arjun', 24, STREET)}
    </svg>
    <div class="mst" id="msL"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
// right panels
const CRIT = [['users', 'Do parents shop here?'], ['sparkle', 'Is it clean?'], ['coin', 'Does it pay on time?']];
const BARS = [150, 168, 140, 158, 172, 146, 36, 162, 144, 154], BAR7 = 150;
$('#mRIn').innerHTML = `
  <div class="pq" id="pq0"><div class="ps">STEP 1 OF 3</div><div class="serif pt">Select</div><div class="pm">Pick shops that reach your buyers</div><div class="hr"></div>
    ${CRIT.map(([ic, t], i) => `<div class="cr" id="cr${i}" style="top:${244 + i * 74}px"><i>${M.icon(ic, 26, C.gold, 2.2)}</i><span>${t}</span><b class="crk" id="crk${i}" style="position:absolute;right:16px;top:12px">${M.icon('check', 40, C.gold, 3)}</b></div>`).join('')}
    ${['VISITED', 'CHOSEN', 'DROPPED'].map((l, i) => `<div class="tl3" id="tl${i}" style="left:${48 + i * 240}px"><div class="zn">${l}</div><div class="zt" id="tlN${i}">0</div></div>`).join('')}
  </div>
  <div class="pq" id="pq1"><div class="ps">STEP 2 OF 3</div><div class="serif pt">Motivate</div><div class="pm">Give every shop a reason to sell</div><div class="hr"></div>
    <div class="lbl" id="prT">ONE PACK'S PRICE</div>
    <div id="prb"><div id="prM"></div><div id="prL1">LADDOO LAB'S SHARE</div><div id="prL2">SHOP'S MARGIN</div></div>
    ${[['coin', 'A margin on every pack'], ['stand', 'A display stand'], ['calendar', 'Fresh packs every Monday']].map(([ic, t], i) => `<div class="mc" id="mc${i}">${M.icon(ic, 24, C.gold, 2.4)}<span>${t}</span></div>`).join('')}
  </div>
  <div class="pq" id="pq2"><div class="ps">STEP 3 OF 3</div><div class="serif pt">Evaluate</div><div class="pm">Count the sales, fix the weak spot</div><div class="hr"></div>
    <div class="lbl" style="left:48px;top:244px">PACKS SOLD THIS WEEK · SHOPS 1 TO 10</div>
    <svg id="bch" width="688" height="236" style="top:272px">
      <path d="M0 196 H688" stroke="#E2DACB" stroke-width="2"/>
      ${BARS.map((h, i) => `<rect id="bb${i}x" x="${14 + i * 68}" y="196" width="44" height="0" rx="8" fill="#B8862F"/><text x="${36 + i * 68}" y="222" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" fill="#8A8274">${i + 1}</text>`).join('')}
    </svg>
    <div id="evP"><span id="evPI"></span><span id="evPT"></span></div>
  </div>`;
wrap($('#mL'), 'mLOut', 784, 580);

// F: conflict nodes, fix
$('#cn0').style.cssText += ';' + FACE('zoya') + ';box-shadow:0 0 0 4px #14213D';
$('#cn1').innerHTML = M.icon('laptop', 40, C.ink, 2.2); $('#cn1').style.boxShadow = '0 0 0 4px #14213D';
['cn2', 'cn3'].forEach(id => { $('#' + id).innerHTML = M.icon('store', 40, C.ink, 2.2); $('#' + id).style.boxShadow = '0 0 0 4px #14213D'; });
$('#cn4').innerHTML = M.icon('cart', 40, C.ink, 2.2); $('#cn4').style.boxShadow = '0 0 0 4px #14213D';
$('#cpVI').innerHTML = M.icon('arrowU', 18, '#fff', 2.6); $('#cpHI').innerHTML = M.icon('swap', 18, '#fff', 2.4);
const GG = [['flag', 'Goals'], ['users', 'Roles'], ['coin', 'Rewards']];
$('#ggs').innerHTML = GG.map(([ic, t], i) => `<div class="ggr" id="gg${i}">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const FT = [['store', 'LOCAL SHOP'], ['cart', 'SUPERMARKET'], ['laptop', 'ONLINE']];
$('#ftRow').innerHTML = FT.map(([ic, n], i) => `<div class="ft3" id="ft${i}" style="left:${48 + i * 236}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">Same price</div></div>`).join('');
const FN = [[80, 'call', 'ONLINE ORDER'], [344, 'store', 'NEARBY SHOP'], [608, 'home', 'FAMILY']];
$('#flow').innerHTML = `<path id="fl0" d="M120 40 H304" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 12"/><path id="fl1" d="M384 40 H568" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 12"/>` +
  FN.map(([x, ic, l], i) => `<g id="fn${i}" transform="translate(${x} 40)"><circle r="36" fill="#F5F1E8"/><g transform="translate(-16 -16)">${M.icon(ic, 32, i === 1 ? C.gold : C.ink, 2.2)}</g><text y="70" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2" fill="#8A8274">${l}</text></g>`).join('') +
  `<g id="fpk">${laddoo(0, 0, 12)}</g>`;
$('#fxPI').innerHTML = M.icon('coin', 22, '#fff', 2.4);
wrap($('#ex'), 'exOut', 784, 580);

// K: at work today
const KA = [
  ['target', 'Selecting', 'Pick partners who reach your buyers', 'Arjun picks 10 of 12 shops near schools', 'phone', 'A phone maker picks stores that can repair phones'],
  ['award', 'Motivating', 'Give sellers a reason to push you', 'A margin, a stand, fresh packs on Monday', 'paint', 'A paint company gives dealers bonuses and training'],
  ['chart', 'Evaluating', 'Check every seller, fix the weak spot', 'The Saturday count finds a hidden stand', 'pill', 'A medicine company checks who reorders monthly'],
  ['scale', 'Managing conflict', 'Stop sellers fighting each other', 'One price, and nearby orders go to the shop', 'car', 'A car maker gives each dealer its own area'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['CHANNEL MANAGEMENT TODAY', 'Four jobs', 'Every business with sellers does them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CORNER SHOP TO A CAR DEALER</div><div class="pe"><i>${M.icon('truck', 34, C.gold, 2.2)}</i><span>Select, motivate, evaluate, resolve</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['coin', 'Shops earn more'], ['home', 'Packs close to home']];
const XH = [['trendDown', 'Margins cost money'], ['cart', 'Big buyer power']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#pkL').innerHTML = [64, 100, 136].map(x => laddoo(x, 256, 16)).join('');
$('#xr0i').innerHTML = M.icon('cart', 30, C.gold2, 2.2);
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('book', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Vertical', 'Horizontal', 'No conflict', 'Brand'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('swap', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Pick, help and check your sellers', ['Select', 'Motivate', 'Evaluate']], ['swap', 'Conflict: vertical or horizontal', ['Between levels', 'Same level']], ['heart', 'Sellers are partners', ['They win, you win']]];
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
const pill = (t, ic, tx, tm, bad, fin) => {
  const ms = $('#msL');
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx); M.setT(ms.querySelector('.tm'), tm);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};
// selection round: Arjun stops at each column, both shops are decided
const tCol = CX.map((_, j) => tVis0 + 0.35 + j * (tPass - 0.45 - tVis0 - 0.35) / 5);
const tDec = tCol.map(x => x + 0.45);
// Monday delivery round (right to left), Saturday count round (left to right)
const tMon0 = tMonday - 0.2, tMon1 = T0('M8') - 0.15, tSat0 = tCounts - 0.1, tSat1 = T0('M9') - 0.05;
const runX = (t, a, b, x0, x1) => M.lerp(x0, x1, M.io((t - a) / (b - a)));
const arjunX = t => {
  if (t < tMon0 - 0.9) { let x = 24; for (let j = 0; j < 6; j++) x = M.lerp(x, CX[j], M.io((t - tCol[j] + 0.55) / 0.5)); return x; }
  if (t < tMon0) return runX(t, tMon0 - 0.9, tMon0 - 0.1, 624, 664);
  if (t < tSat0) return runX(t, tMon0, tMon1, 664, 24);
  if (t < tHidden - 0.6) return runX(t, tSat0, tSat1, 24, 664);
  return runX(t, tHidden - 0.6, tHidden, 664, CX[HID.j]);
};
const decided = (k, t) => t >= tDec[SHOPS[k].j] + SHOPS[k].r * 0.12;
const runM = t => {
  const x = arjunX(t);
  attr($('#avA'), 'transform', `translate(${x.toFixed(1)} ${STREET})`);
  // trail: selection walk only
  const tr = $('#trail'); M.drawU(tr, t < tMon0 - 0.9 ? M.clamp((x - 24) / 600) : 1); tr.style.opacity = t < tMon0 - 0.9 ? 1 : M.clamp(1 - (t - tMon0 + 0.9) / 0.4).toFixed(3);
  let vis = 0, ch = 0, dr = 0;
  SHOPS.forEach((s, k) => {
    const g = $('#sh' + k), r = g.querySelector('rect'), dec = decided(k, t), check = t >= tCol[s.j] - 0.1 && !dec;
    if (t >= tCol[s.j] - 0.1) vis++;
    if (dec) { if (s.drop) dr++; else ch++; }
    let fill = '#FFFFFF', stroke = C.line, sw = 2, op = 1, ic = 'store', icc = C.ink, lab = 'SHOP', lc = C.muted;
    if (check) { stroke = C.gold; sw = 4; }
    if (dec && s.drop) { fill = C.redBg; stroke = C.red2; ic = 'x'; icc = C.red; lab = 'DROPPED'; lc = C.red; op = M.lerp(1, 0.55, M.clamp((t - tPass) / 0.4)); }
    if (dec && !s.drop) { fill = C.gold3; stroke = C.gold; ic = 'check'; icc = C.gold; lab = 'SHOP ' + s.num; lc = C.gold; }
    if (!s.drop && t >= tStand) ic = 'stand';
    // Monday: a delivery flash as Arjun passes
    if (!s.drop && t >= tMon0 && t < tSat0) { const near = 1 - M.clamp(Math.abs(x - CX[s.j]) / 40); fill = mix(C.gold3, C.gold2, near); }
    // the hidden stand, then fixed
    if (s === HID && t >= tOnly) { const fx = M.io((t - tMoves - 0.3) / 0.3); fill = mix(C.redBg, C.gold3, fx); stroke = mix(C.red, C.gold, fx); sw = 4; icc = fx > 0.5 ? C.gold : C.red; lc = fx > 0.5 ? C.gold : C.red; }
    attr(r, 'fill', fill); attr(r, 'stroke', stroke); attr(r, 'stroke-width', sw); g.style.opacity = op;
    const bi = g.querySelector('.bi'), key = ic + icc; if (bi._k !== key) { bi._k = key; bi.innerHTML = M.icon(ic, 28, icc, ic === 'check' || ic === 'x' ? 2.8 : 2.2); }
    M.setT(g.querySelector('.bt'), lab); attr(g.querySelector('.bt'), 'fill', lc);
    const bd = g.querySelector('.bd'), bu = s.drop ? 0 : M.spring(t - tMargin - s.j * 0.05, M.POP);
    attr(bd, 'transform', `translate(84 2) scale(${M.clamp(bu, 0, 1.2).toFixed(3)})`); M.hide(bd, bu <= 0.01);
  });
  M.setT($('#tlN0'), `${vis}/12`); M.setT($('#tlN1'), String(ch)); M.setT($('#tlN2'), String(dr));
  const stage = t < tM[5] ? 0 : t < tM[8] ? 1 : 2;
  for (let i = 0; i < 3; i++) { const el = $('#stg' + i), on = i === stage; el.style.background = on ? C.ink : (i < stage ? C.gold3 : C.paper); el.style.color = on ? '#fff' : (i < stage ? C.gold : C.muted); }
  if (t >= tMoves) pill(t, 'trendUp', 'Stand moved to the front', 'sales up', 0, 1);
  else if (t >= tOnly) pill(t, 'x', 'Shop 7 sells only a few', t >= tHidden ? 'stand hidden' : '', 1, 0);
  else if (t >= tM[8]) pill(t, 'chart', 'Saturday: count packs sold', '', 0, 0);
  else if (t >= tMonday - 0.2) pill(t, 'truck', 'Fresh packs every Monday', '', 0, 0);
  else if (t >= tStand) pill(t, 'stand', 'A display stand in every shop', '', 0, 0);
  else if (t >= tM[5]) pill(t, 'coin', 'A margin on every pack', '', 0, 0);
  else if (t >= tPass) pill(t, 'check', '10 chosen', '2 dropped', 0, 1);
  else if (t >= tM[3]) pill(t, 'search', 'Check every shop', `${vis}/12`, 0, 0);
  else if (t >= tVis0) pill(t, 'users', 'Visit shops near schools', `${vis}/12`, 0, 0);
  else pill(t, 'store', 'Find shops near schools', '', 0, 0);
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const cl = $('#cLeft'); cl.style.left = (884 - cl.offsetWidth) + 'px';
  for (const id of ['askQ', 'askT']) { const q = $('#' + id); if (q.offsetWidth > 848) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 848 / q.offsetWidth) + 'px'; }
  // shop scene tags sit beside the image while the card is full width
  const tz = $('#tgZ'); tz.style.left = (92 - 24 - tz.offsetWidth) + 'px'; $('#tgN').style.left = (692 + 24) + 'px';
  const op = $('#oneP'); op.style.left = (748 - op.offsetWidth) + 'px';
  $('#vgood').style.left = (748 - $('#vgood').offsetWidth) + 'px'; $('#vgood').style.right = 'auto';
  for (let i = 0; i < 5; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  // stage chips, right aligned in the run card
  let x = 736; for (let i = 2; i >= 0; i--) { const s = $('#stg' + i); x -= s.offsetWidth; s.style.left = x + 'px'; x -= 10; }
  // motivate chips: two rows
  const m0 = $('#mc0'), m1 = $('#mc1'), m2 = $('#mc2');
  m0.style.left = '48px'; m1.style.left = (48 + m0.offsetWidth + 16) + 'px'; m2.style.left = '48px'; m2.style.top = '470px';
  // conflict labels
  const l2 = $('#lv2'); l2.style.left = (736 - l2.offsetWidth) + 'px';
  $('#cpV').style.left = '176px'; $('#cpV').style.top = '292px';
  const ch = $('#cpH'); ch.style.left = (275 - ch.offsetWidth / 2) + 'px'; ch.style.top = '420px';
  const co = $('#cpO'); co.style.left = (534 + 52) + 'px'; co.style.top = '150px';
  let tot = 0; const gg = [0, 1, 2].map(i => $('#gg' + i)); gg.forEach(n => tot += n.offsetWidth); tot += 32;
  x = 392 - tot / 2; gg.forEach(n => { n.style.left = x + 'px'; x += n.offsetWidth + 16; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  for (const id of ['qq1', 'qq2']) { const q = $('#' + id); if (q.offsetWidth > 1400) q.style.fontSize = Math.floor(68 * 1400 / q.offsetWidth) + 'px'; }
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
  M.vis($('#exChip'), t, tCounts - 0.2, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: ten shops, one angry call ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 10; i++) {
      const el = $('#g' + i); M.vis(el, t, tMorph + 0.5 + i * 0.06, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.06 });
      const a = i === 5 ? M.io((t - tAngry) / 0.25) : 0;
      el.style.background = mix(C.paper, C.redBg, a); el.style.boxShadow = a > 0.5 ? '0 0 0 3px ' + C.red2 : 'none';
      setIco(el, 'store', a > 0.5 ? C.red : C.gold, 32, 2.2);
    }
    M.vis($('#cSold'), t, tMorph + 0.55, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.count($('#cSoldN'), t, tMorph + 0.5, 0.7, 0, 10);
    M.vis($('#cLeft'), t, tAngry + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    const cp = $('#callP'); M.vis(cp, t, tCalls - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const ring = t > tCalls && t < tOnline ? Math.sin((t - tCalls) * 38) * 7 * (0.5 + 0.5 * Math.sin((t - tCalls) * 6)) : 0;
    $('#callI').style.transform = `rotate(${ring.toFixed(2)}deg)`;
    M.rise($('#askQ'), t, tOnline - 0.1, { st: 0.05, sp: M.HEAVY, out: tHow - 0.15, outDur: 0.25 });
    M.rise($('#askT'), t, tKeep - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the three channels ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tL1 + 0.6, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, tL1 + 0.85, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#rcp'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    const tp = [tL2 + 0.35, ...[0, 1, 2].map(k => M.lerp(tPath[1], tPath[3], (k + 1) / 3))];
    PATH.forEach((_, i) => {
      const el = $('#pt' + i); M.vis(el, t, tL2 + 0.3 + i * 0.08, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const on = M.io((t - (i ? tp[i] : tPath[1])) / 0.25) * (1 - (i < 3 ? M.io((t - tp[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      if (i < 3) M.vis($('#pa' + i), t, tp[i + 1] - 0.2, 1e9, { dx: -10, dy: 0, fade: 0.12 });
    });
    M.vis($('#team'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    TP.forEach((_, i) => {
      const el = $('#tp' + i); M.vis(el, t, tPaths[i] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tPaths[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tPaths[i + 1]) / 0.25) : M.io((t - tThree) / 0.3)));
      el.style.background = mix(t >= tThree ? mix(C.paper, C.gold3, M.io((t - tThree) / 0.3)) : C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), TP[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis($('#oneP'), t, tOneP - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: what is channel management ===== */
  const dOn = t >= tD1 - 0.1 && t < tM[1] + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Philip') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Gary') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'Principles') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD3 - 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 5; i++) { const q = $('#ql' + i); M.vis(q, t, tKqL + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tD3 - i * 0.55) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    VM.forEach((_, i) => {
      const el = $('#vm' + i); M.vis(el, t, tD4 + 0.35 + i * 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const on = i === 1 ? M.io((t - tMem[2]) / 0.25) : i === 2 ? M.io((t - tMem[1]) / 0.25) : 0;
      el.style.background = mix(C.paper, C.gold3, on); el.style.boxShadow = on > 0.5 ? '0 0 0 3px ' + C.gold : 'none';
    });
    M.vis($('#vgood'), t, tHelps, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#sw'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tSw[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
  }

  /* ===== M: Arjun's round ===== */
  const mOn = t >= tM[1] - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM[1] + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mR'), t, tM[1] + 0.25, tMout, { dx: 60, dy: 0, ...o });
    const root = $('#mLIn'), b = tM[1] + 0.3;
    M.vis(root.querySelector('.mav'), t, b, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis(root.querySelector('.mlb'), t, b + 0.08, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) M.vis($('#stg' + i), t, b + 0.12 + i * 0.06, 1e9, { dy: 10 });
    M.vis($('#planL'), t, b + 0.1, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#msL'), t, b + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    SHOPS.forEach((s, k) => { $('#sh' + k).style.opacity = Math.min(+($('#sh' + k).style.opacity || 1), M.clamp((t - b - 0.35 - k * 0.04) / 0.12)); });
    $('#avA').style.opacity = M.clamp((t - b - 0.8) / 0.12).toFixed(3);
    runM(t);
    // right panels
    const PT = [[tM[1] + 0.4, tM[5] - 0.14], [tM[5], tM[8] - 0.14], [tM[8], 1e9]];
    PT.forEach(([tin, tout], k) => {
      const pn = $('#pq' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) {
        for (let i = 0; i < 3; i++) {
          M.vis($('#cr' + i), t, tCrit[i] - 0.1, tout, { dy: 14, ...oo });
          M.vis($('#crk' + i), t, tCrit[i] + 0.35, tout, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08, ...oo });
          M.vis($('#tl' + i), t, i === 0 ? tVis0 - 0.1 : tCol[0] + 0.2 + i * 0.1, tout, { dy: 14, ...oo });
          const tl = $('#tl' + i), fin = t >= tPass;
          tl.style.background = fin && i === 1 ? C.ink : (fin && i === 2 ? C.redBg : C.paper);
          tl.querySelector('.zt').style.color = fin && i === 1 ? '#fff' : (i === 2 && fin ? C.red : C.ink);
          tl.querySelector('.zn').style.color = fin && i === 1 ? C.gold2 : (i === 2 && fin ? C.red : C.muted);
        }
      } else if (k === 1) {
        M.vis($('#prT'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis($('#prb'), t, tin + 0.55, tout, { dy: 14, ...oo });
        M.vis($('#prL1'), t, tin + 0.7, tout, { dy: 0, fade: 0.2, ...oo });
        const sp = M.spring(t - tPart, M.HEAVY); $('#prM').style.width = (688 * 0.3 * M.clamp(sp, 0, 1.05)).toFixed(1) + 'px';
        M.vis($('#prL2'), t, tKeeps - 0.05, tout, { dy: 0, fade: 0.15, ...oo });
        const tc = [tMargin, tStand, tMonday];
        for (let i = 0; i < 3; i++) M.vis($('#mc' + i), t, tc[i] - 0.05, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...oo });
      } else {
        BARS.forEach((h, i) => {
          const el = $('#bb' + i + 'x'), u = M.spring(t - tCounts - i * 0.12, M.SOFT);
          let hh = h * M.clamp(u, 0, 1.04);
          if (i === 6) hh = M.lerp(hh, BAR7, M.clamp(M.spring(t - tNext, M.HEAVY), 0, 1.04));
          attr(el, 'height', Math.max(0, hh).toFixed(1)); attr(el, 'y', (196 - Math.max(0, hh)).toFixed(1));
          const red = i === 6 ? M.io((t - tOnly) / 0.25) * (1 - M.io((t - tNext) / 0.3)) : 0;
          attr(el, 'fill', i === 6 ? mix(mix(C.gold, C.red, red), C.gold, 0) : C.gold);
        });
        const ev = $('#evP'), fixd = t >= tMoves; M.vis(ev, t, tHidden - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
        ev.style.background = fixd ? C.gold : C.redBg; ev.style.color = fixd ? '#fff' : C.red;
        setIco($('#evPI'), fixd ? 'trendUp' : 'stand', fixd ? '#fff' : C.red, 24, 2.4);
        M.setT($('#evPT'), fixd ? (t >= tNext ? 'Stand at the front: sales up next week' : 'Arjun moves the stand to the front') : 'Shop 7: stand hidden behind the counter');
      }
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

  /* ===== F: channel conflict ===== */
  const fOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    const exc = $('#ex'); M.vis(exc, t, tF1 + 0.02, tFout, { dy: 36, ...o }); grow(exc, $('#exOut'), t, tF[6]);
    M.vis($('#band'), t, tF1 + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#lv1'), t, tF1 + 0.3, 1e9, { dy: 10 }); M.vis($('#lv2'), t, tF1 + 0.5, 1e9, { dy: 10 });
    const tn = [tF1 + 0.35, tF1 + 0.45, tF1 + 0.6, tF1 + 0.7, tF1 + 0.8];
    for (let i = 0; i < 5; i++) {
      M.vis($('#cn' + i), t, tn[i], 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#cm' + i), t, tn[i] + 0.1, 1e9, { dy: 10 });
    }
    // who is in the fight right now
    const v = M.io((t - tVert) / 0.25) * (1 - M.io((t - tHor) / 0.25)) + M.io((t - tOwn) / 0.25);
    const hz = M.io((t - tHor) / 0.25) * (1 - M.io((t - tOwn) / 0.25));
    const angry = Math.max(M.io((t - tConf) / 0.3) * (1 - M.io((t - tVert) / 0.25)), M.clamp(v), hz);
    $('#cn2').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.red, angry);
    $('#cn3').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.red, hz);
    $('#cn1').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.red, M.io((t - tOwn) / 0.25));
    $('#cn0').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.red, M.io((t - tVert) / 0.25) * (1 - M.io((t - tHor) / 0.25)));
    attr($('#band'), 'fill', mix(C.paper2, C.redBg, M.clamp(v) * 0.6));
    M.vis($('#gg0').parentNode, t, tGg[0] - 0.1, 1e9, { dy: 0, fade: 0.01 });
    for (let i = 0; i < 3; i++) M.vis($('#gg' + i), t, tGg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.draw($('#bv'), t, tVert - 0.05, 0.4, M.o3); M.vis($('#cpV'), t, tLevels - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    $('#bv').style.opacity = (0.35 + 0.65 * M.clamp(v)).toFixed(3); $('#cpV').style.opacity = (0.45 + 0.55 * M.clamp(v + (t < tHor ? 1 : 0))).toFixed(3);
    M.draw($('#bh'), t, tHor - 0.05, 0.4, M.o3); M.vis($('#cpH'), t, tSame - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    $('#bh').style.opacity = (0.35 + 0.65 * (t < tOwn ? 1 : hz)).toFixed(3); $('#cpH').style.opacity = (0.45 + 0.55 * (t < tOwn ? 1 : hz)).toFixed(3);
    M.vis($('#cpO'), t, tOwn - 0.05, tF[6] - 0.2, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, ody: 0 });
    if (t > tIsV && t < tIsV + 0.5) $('#cpV').style.transform = `scale(${(1 + 0.12 * Math.sin(Math.PI * (t - tIsV) / 0.5)).toFixed(4)})`;
    // Zoya's fix
    M.vis($('#tf'), t, tF[6] + 0.12, tFout, { dx: 60, dy: 0, ...o });
    M.vis($('#fx1'), t, tFirst - 0.05, 1e9, { dy: 12 });
    FT.forEach(([ic], i) => {
      const el = $('#ft' + i); M.vis(el, t, tPrice - 0.1 + i * 0.08, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const eq = i < 2 ? 1 : M.io((t - tEvery) / 0.3);
      el.style.background = i === 2 ? mix(C.redBg, C.gold3, eq) : C.gold3;
      const zt = el.querySelector('.zt'); M.setT(zt, eq > 0.5 ? 'Same price' : 'Cheaper'); zt.style.color = eq > 0.5 ? C.ink : C.red;
      setIco(el.querySelector('.zi'), eq > 0.5 ? 'check' : 'tag', eq > 0.5 ? C.gold : C.red, 40, 2.4);
    });
    M.vis($('#fx2'), t, tF[7] + 0.05, 1e9, { dy: 12 });
    M.vis($('#flow'), t, tF[7] + 0.25, 1e9, { dy: 16 });
    M.draw($('#fl0'), t, tGo - 0.2, 0.5, M.o3); M.draw($('#fl1'), t, tDel - 0.2, 0.5, M.o3);
    const px = t < tDel - 0.1 ? M.lerp(80, 344, M.io((t - tGo + 0.1) / 0.6)) : M.lerp(344, 608, M.io((t - tDel + 0.1) / 0.6));
    attr($('#fpk'), 'transform', `translate(${px.toFixed(1)} ${t < tGo - 0.1 ? 40 : 4})`); M.hide($('#fpk'), t < tGo - 0.1);
    const fn1 = $('#fn1').querySelector('circle'); attr(fn1, 'fill', mix(C.paper, C.gold3, M.io((t - tGo - 0.4) / 0.3)));
    M.vis($('#fxP'), t, tKeepM - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
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
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#pack'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#clm0'), t, tSup - 0.05, tFresh - 0.1, { dy: 0, fade: 0.15, outDur: 0.2, ody: 0 });
    M.draw($('#strk'), t, tPres - 0.05, 0.35, M.o3); if (t > tFresh - 0.1) M.hide($('#strk'), true);
    M.vis($('#clm1'), t, tFresh + 0.05, 1e9, { dy: 0, fade: 0.2 });
    { const u = M.clamp((t - tFresh - 0.3) / 0.12); $('#pkOk').style.opacity = u.toFixed(3); M.hide($('#pkOk'), u <= 0); }
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tSup, tNaniX, tAgree][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tPres ? C.redBg : C.paper; $('#bb0').style.color = t > tPres ? C.red : C.ink;
    M.vis($('#fact'), t, tKot - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
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
