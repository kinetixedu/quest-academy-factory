// MBA - Marketing Management, Ep 25: Price Discrimination (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', stu: '#5B647A' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 17h6', 'M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  eyeOff: ['M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49', 'M14.084 14.158a3 3 0 0 1-4.242-4.242', 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143', 'm2 2 20 20'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tPuts = wt('H1', 'puts'), tLoves = wt('H2', 'loves'), tCannot = wt('H2', 'cannot');
const tC2 = T0('C2'), tLose = wt('C2', 'lose'), tDiffP = wt('C2', 'different'), tThat = wt('C2', 'That');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tFriends = wt('L2', 'friends'), tLess = wt('L2', 'less'), tOffice = wt('L3', 'office'), tFour = wt('L3', 'four'), tCan = wt('L3', 'Can');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tDout = T0('M1') - 0.32;
const tSame = wt('D2', 'same'), tBuy = wt('D2', 'buyers'), tPri = wt('D2', 'prices'), tCosts = wt('D2', 'costs'), tTell = wt('D3', 'telling');
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8');
const tStuA = wt('M3', 'students'), tSixK = wt('M4', 'six'), tID = wt('M5', 'Students'), tEightK = wt('M7', 'Eight'), tEarns = wt('M8', 'earns');
const tMout = T0('T1') - 0.32;
// statement + C
const tT = T0('T1'), tSt2 = wt('T1', 'Different', 1), tC1 = T0('R1'), tTu = tC1 - 0.32;
const tCc = [2, 3, 4, 5].map(i => T0('R' + i)), tCout = T0('K0') - 0.32;
const tCv = [wt('R2', 'ID'), wt('R3', 'One'), wt('R4', 'pay'), wt('R5', 'fair')];
// K
const tK0 = T0('K0'), tK = [1, 2, 3].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'car'), wt('K2', 'wholesaler'), wt('K3', 'museum')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'afford'), wt('X2', 'grow')], tXh = [wt('X3', 'cheated'), wt('X3', 'secret')];
const tRao = wt('X4', 'Rao'), tExpl = wt('X4', 'explains'), tMonthly = wt('X4', 'monthly'), tAct = wt('X5', 'Competition');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The');
const tS = T0('S1'), tRw = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'buyers')], [wt('S3', 'apart')], [wt('S4', 'person'), wt('S4', 'much'), wt('S4', 'group')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" ${o.a ? `text-anchor="${o.a}"` : ''} ${o.id ? `id="${o.id}"` : ''} font-family="Poppins" font-weight="${o.w || 600}" font-size="${o.fs || 15}" ${o.ls !== 0 ? `letter-spacing="${o.ls || 2.2}"` : ''} fill="${o.c || '#8A8274'}">${s}</text>`;
const brandPack = s => `<g transform="scale(${s})"><path d="M28 40 L212 40 L220 300 Q220 312 208 312 L32 312 Q20 312 20 300 Z" fill="#14213D"/><rect x="22" y="22" width="196" height="28" rx="6" fill="#24345A"/>
  <text x="120" y="110" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="26" fill="#F5E7C6" letter-spacing="1">LADDOO LAB</text>
  <rect x="22" y="150" width="196" height="54" fill="#B8862F"/><text x="120" y="184" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="16" fill="#FFFFFF" letter-spacing="1">NO REFINED SUGAR</text>
  ${[72, 120, 168].map(cx => laddoo(cx, 258, 18)).join('')}</g>`;
const miniPack = (x, y) => `<g transform="translate(${x} ${y})"><rect width="52" height="70" rx="8" fill="#14213D"/><rect y="30" width="52" height="12" fill="#B8862F"/></g>`;
const person = (r, ic, col) => `<circle r="${r}" fill="${col}"/><g transform="translate(${-r * 0.55} ${-r * 0.55})">${M.icon(ic, r * 1.1, '#fff', 2.4)}</g>`;
const pillS = (x, y, w, txt, bg, fg, fs = 18) => `<rect x="${x - w / 2}" y="${y - 20}" width="${w}" height="40" rx="20" fill="${bg}"/>${T(x, y + 7, txt, { a: 'middle', fs, w: 700, c: fg, ls: 1 })}`;

// A
$('#hpS').innerHTML = `<g transform="translate(64 20)"><g id="hpP">${brandPack(0.75)}</g></g>
  <g transform="translate(154 300)"><g id="hpTag">${pillS(0, 0, 120, '₹120', '#14213D', '#FFFFFF', 22)}</g></g>
  <g transform="translate(450 150)"><g id="hpS1">${person(60, 'cap', C.stu)}</g></g>
  ${T(450, 250, 'A COLLEGE STUDENT', { a: 'middle', fs: 16, id: 'hpS2' })}
  <g id="hpC0" transform="translate(0 0)">${pillS(170, 380, 230, 'LOVES THE TASTE', '#F3EAD6', '#14213D', 16)}</g>
  <g id="hpC1">${pillS(436, 380, 250, 'CANNOT SPEND ₹120', '#F6E3DC', '#B5482F', 16)}</g>`;
$('#bdS').innerHTML = `${T(0, 14, 'PRICE OF A 6-PACK')}<rect id="bd0" x="0" y="24" width="0" height="44" rx="12" fill="#14213D"/>${T(736, 56, '₹120', { fs: 26, w: 700, c: '#14213D', ls: 0, id: 'bd0L' })}
  ${T(0, 108, 'WHAT SHE CAN SPEND')}<rect id="bd2" x="600" y="118" width="120" height="44" rx="12" fill="#F6E3DC" stroke="#E7B9AB" stroke-width="2" stroke-dasharray="6 6"/>
  <rect id="bd1" x="0" y="118" width="0" height="44" rx="12" fill="#B8862F"/>${T(300, 148, '₹100', { a: 'middle', fs: 24, w: 700, c: '#FFFFFF', ls: 0, id: 'bd1L' })}${T(736, 148, '₹20 SHORT', { fs: 18, w: 700, c: '#B5482F', ls: 1, id: 'bd2L' })}`;
const CH = [['x', 'Lose her', 1], ['tag', 'Charge a different price', 0]];
$('#choP').innerHTML = CH.map(([ic, m, b], i) => `<div class="stp" id="ch${i}" style="top:76px;${b ? 'background:#F6E3DC;color:#B5482F' : 'background:#B8862F;color:#fff'}">${M.icon(ic, 26, b ? C.red : '#fff', 2.6)}<span>${m}</span></div>`).join('');
// L
$('#sZ').style.cssText += ';' + FACE('zoya');
$('#stuR').innerHTML = [0, 1, 2, 3].map(i => `<div class="sav" id="sv${i}" style="left:${36 + i * 92}px">${M.icon('cap', 36, '#fff', 2.2)}</div>`).join('') +
  `<div class="serif" id="stN" style="position:absolute;left:420px;top:86px;font-size:56px;white-space:nowrap">20 students</div>` +
  `<div class="chp" id="sc0" style="left:36px;background:#F3EAD6;color:#14213D">${M.icon('heart', 22, C.gold, 2.4)}<span>Love the taste</span></div>` +
  `<div class="chp" id="sc1" style="left:262px;background:#F6E3DC;color:#B5482F">${M.icon('coin', 22, C.red, 2.4)}<span>Less money to spend</span></div>`;
$('#oneI').innerHTML = M.icon('help', 20, '#fff', 2.6);
$('#offS').innerHTML = `<g transform="translate(56 70)"><g id="ofB">${person(46, 'building', '#14213D')}</g></g>${T(56, 150, 'OFFICE', { a: 'middle', fs: 15, id: 'ofL' })}
  ${[0, 1, 2, 3].map(i => `<g id="ofP${i}">${miniPack(190 + i * 86, 30)}</g>`).join('')}
  ${T(190, 140, '4 PACKS EVERY MONTH', { fs: 16, id: 'ofT', c: '#14213D' })}`;
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#dt4I').innerHTML = M.icon('users', 22, C.gold2, 2.4);
$('#dsS').innerHTML = `<defs><clipPath id="fc40"><circle r="40"/></clipPath></defs>
  <g transform="translate(284 0)"><g id="dsP">${brandPack(0.5)}</g></g>
  <path id="dsA0" d="M300 176 C300 230 150 200 150 244" fill="none" stroke="#14213D" stroke-width="4" stroke-linecap="round"/>
  <path id="dsA1" d="M388 176 C388 230 538 200 538 244" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round"/>
  <g transform="translate(150 290)"><g id="dsN0"><circle r="44" fill="#14213D"/><image href="${IMG}ll-rao-face.jpg" x="-40" y="-40" width="80" height="80" clip-path="url(#fc40)"/></g></g>
  <g transform="translate(538 290)"><g id="dsN1">${person(44, 'cap', C.stu)}</g></g>
  ${T(150, 360, 'BUSY PARENT', { a: 'middle', fs: 15, id: 'dsL0' })}${T(538, 360, 'STUDENT, WITH ID', { a: 'middle', fs: 15, id: 'dsL1' })}
  <g transform="translate(260 290)"><g id="dsT0">${pillS(0, 0, 100, '₹120', '#14213D', '#FFFFFF', 20)}</g></g>
  <g transform="translate(428 290)"><g id="dsT1">${pillS(0, 0, 100, '₹100', '#B8862F', '#FFFFFF', 20)}</g></g>
  <g id="dsC"><rect x="0" y="392" width="688" height="64" rx="18" fill="#F5F1E8"/>${T(344, 432, 'COST TO MAKE: ₹80 A PACK, FOR BOTH', { a: 'middle', fs: 17, w: 700, c: '#3A4560' })}</g>`;
wrap($('#dfc'), 'dfOut', 784, 580);

/* M: one price vs two prices. Plan coords inside a 688 x 250 svg. Each icon = 10 buyers. */
const SEQ = ['P', 'P', 'S', 'P', 'P', 'S', 'P'];
const SLOT = n => [470 + (n % 4) * 52, 76 + Math.floor(n / 4) * 62];
const ARRIVE = [344, 190];
const head = (k, name) => `<div class="mav" style="${FACE('zoya')}"></div><div class="lbl mlb">${name}</div><div class="serif mrd" id="rd${k}">₹0</div>`;
const tail = k => `<div class="mbar" id="bar${k}"><i id="sg${k}0"></i><i id="sg${k}1"></i></div>
    <div class="mtk" id="tk0${k}" style="left:48px">₹0</div><div class="mtk" id="tk1${k}" style="right:48px">₹8,000 A WEEK</div>
    <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
const plan = (k, tag, tw) => `<svg class="mplan" id="plan${k}" width="688" height="250"><defs><clipPath id="pc${k}"><rect width="688" height="250" rx="24"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      <g transform="translate(300 62)"><rect width="88" height="84" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g transform="translate(30 12)">${M.icon('store', 28, C.ink, 2.2)}</g>${T(44, 68, 'STALL', { a: 'middle', fs: 13 })}</g>
      ${pillS(344, 32, tw, tag, '#14213D', '#FFFFFF', 15)}
      ${T(548, 36, 'BOUGHT', { a: 'middle', fs: 14 })}
      <path d="M0 214 H688" stroke="#E2DACB" stroke-width="3" stroke-dasharray="10 10"/>
      ${T(20, 240, 'EACH ICON = 10 BUYERS', { fs: 13 })}
      <g clip-path="url(#pc${k})">${SEQ.map((s, i) => `<g id="bu${k}${i}" transform="translate(-40 190)">${person(20, s === 'P' ? 'user' : 'cap', s === 'P' ? C.ink : C.stu)}</g>`).join('')}</g>
    </svg>`;
$('#mLIn').innerHTML = head('L', 'ONE PRICE FOR EVERYONE') + plan('L', '₹120 FOR ALL', 160) + tail('L');
$('#mRIn').innerHTML = head('R', 'TWO PRICES') + plan('R', '₹120 · ₹100 WITH ID', 224) + tail('R');
const MW = [['user', C.ink, '50 parents × ₹120', '₹6,000', 0], ['cap', C.stu, '20 students', 'walked away', 1]];
$('#mwR').innerHTML = MW.map(([ic, col, t, v, b], i) => `<div class="br" id="mw${i}" style="top:${100 + i * 84}px"><div class="bi" style="background:${col}">${M.icon(ic, 26, '#fff', 2.4)}</div><div class="bt">${t}</div><div class="bv" style="${b ? 'color:#B5482F;font-size:26px;top:10px' : ''}">${v}</div></div>`).join('') +
  `<div class="lbl" id="mwH" style="left:48px;top:320px">TOTAL</div>`;
$('#mwPI').innerHTML = M.icon('x', 20, C.red, 3);
wrap($('#mL'), 'mLOut', 784, 580);
const tbL = SEQ.map((_, i) => wt('M3', 'Fifty') + i * (tM4 - 0.5 - wt('M3', 'Fifty')) / 7);
const tbR = SEQ.map((_, i) => wt('M6', 'Fifty') + i * (tM7 - 0.4 - wt('M6', 'Fifty')) / 7);

// C: four conditions + Laddoo Lab visual
const CR = [['users', 'Groups can be told apart'], ['ban', 'No reselling'], ['coin', 'Groups differ in budget'], ['scale', 'Legal, and feels fair']];
$('#cRows').innerHTML = CR.map(([ic, t], i) => `<div class="zr" id="cr${i}" style="top:${96 + i * 108}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div><div class="ok" id="co${i}">${M.icon('check', 26, '#fff', 3)}</div></div>`).join('');
$('#cvS').innerHTML = `<g id="cv0"><rect x="0" y="0" width="320" height="200" rx="18" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><rect x="0" y="0" width="320" height="48" rx="18" fill="#14213D"/><rect x="0" y="30" width="320" height="18" fill="#14213D"/>
    ${T(24, 31, 'COLLEGE ID', { fs: 16, w: 700, c: '#F5E7C6' })}<g transform="translate(76 124)">${person(44, 'cap', C.stu)}</g>
    <rect x="148" y="90" width="140" height="12" rx="6" fill="#E2DACB"/><rect x="148" y="116" width="100" height="12" rx="6" fill="#E2DACB"/><rect x="148" y="142" width="120" height="12" rx="6" fill="#E2DACB"/></g>
  <g id="cv1"><rect x="352" y="0" width="336" height="200" rx="18" fill="#FFFFFF" stroke="#E7B9AB" stroke-width="3" stroke-dasharray="10 8"/>
    <g transform="translate(488 30)">${M.icon('ban', 64, C.red, 2.2)}</g>${T(520, 136, '1 STUDENT PACK', { a: 'middle', fs: 18, w: 700, c: '#B5482F', ls: 1.4 })}${T(520, 164, 'PER ID, PER DAY', { a: 'middle', fs: 18, w: 700, c: '#B5482F', ls: 1.4 })}</g>
  <g id="cv2"><rect x="0" y="232" width="320" height="238" rx="18" fill="#F5F1E8"/>${T(24, 264, 'WHAT EACH CAN PAY', { fs: 14 })}
    <rect id="cb0" x="56" y="${448 - 120}" width="80" height="120" rx="10" fill="#14213D"/><rect id="cb1" x="184" y="${448 - 100}" width="80" height="100" rx="10" fill="#5B647A"/>
    ${T(96, 316, '₹120', { a: 'middle', fs: 18, w: 700, c: '#14213D', ls: 0 })}${T(224, 336, '₹100', { a: 'middle', fs: 18, w: 700, c: '#5B647A', ls: 0 })}
    ${T(96, 468, 'PARENTS', { a: 'middle', fs: 13 })}${T(224, 468, 'STUDENTS', { a: 'middle', fs: 13 })}</g>
  <g id="cv3"><rect x="352" y="232" width="336" height="238" rx="18" fill="#14213D"/>${T(380, 272, 'PRICES ON SHOW FOR ALL', { fs: 14, c: '#E9D9B5' })}
    ${[['6-pack', '₹120'], ['Student, with ID', '₹100'], ['Monthly 4-pack', '₹440']].map(([a, b], i) => `${T(380, 324 + i * 48, a, { fs: 22, w: 600, c: '#FFFFFF', ls: 0 })}${T(660, 324 + i * 48, b, { a: 'end', fs: 24, w: 700, c: '#E9B95C', ls: 0 })}`).join('')}</g>`;

// K
const KA = [
  ['user', 'First degree', 'A personal price for each buyer', 'Laddoo Lab avoids secret personal prices', 'car', 'A car dealer bargains with every buyer'],
  ['package', 'Second degree', 'Price depends on how much you buy', 'Four packs a month for ₹440, ₹110 each', 'package', 'A wholesaler charges less per box for big orders'],
  ['users', 'Third degree', 'Price depends on your group', 'Students with a college ID pay ₹100', 'bank', 'A museum charges students and children less'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['ARTHUR PIGOU · THE ECONOMICS OF WELFARE, 1920', 'Three degrees', 'Who pays what, and why', null]].concat(KA.map((a, i) => [`DEGREE 0${i + 1} / 03`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CAR DEALER TO A MUSEUM</div><div class="pe"><i>${M.icon('layers', 34, C.gold, 2.2)}</i><span>Each one splits buyers a different way</span></div>`) + `</div>`).join('');

// X
const XG = [['users', 'More can afford it'], ['trendUp', 'Business can grow']];
const XH = [['scale', 'Some feel cheated'], ['eyeOff', 'Secret prices']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#mpS').innerHTML = `${T(0, 14, 'THE MONTHLY PACK OF FOUR · OPEN TO EVERYONE')}
  ${[0, 1, 2, 3].map(i => `<g id="mp${i}">${miniPack(i * 64, 40)}</g>`).join('')}
  <g id="mpA">${T(290, 70, '4 × ₹120 = ₹480', { fs: 22, w: 600, c: '#B9B1A3', ls: 0 })}<line x1="288" y1="63" x2="470" y2="63" stroke="#B5482F" stroke-width="3"/></g>
  <g id="mpB">${T(290, 116, '₹440 · ₹110 A PACK', { fs: 28, w: 700, c: '#B8862F', ls: 0 })}</g>
  <g id="mpC">${pillS(624, 66, 128, 'SAVES ₹40', '#F3EAD6', '#B8862F', 16)}</g>`;
$('#bb1I').innerHTML = M.icon('package', 22, '#fff', 2.4); $('#factI').innerHTML = M.icon('scale', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['First degree', 'Second degree', 'Third degree', 'Skimming'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['tag', 'Same product, different prices', ['Different buyers']], ['shield', 'Tell groups apart, stop reselling', ['College ID']], ['layers', 'Three degrees', ['Person', 'Quantity', 'Group']]];
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
const pill = (k, ic, tx, tm, bad, fin) => {
  const ms = $('#ms' + k);
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx); M.setT(ms.querySelector('.tm'), tm);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};
const inr = v => '₹' + Math.round(v).toLocaleString('en-IN');
// one week at the stall: buyers walk in, then buy (to BOUGHT) or walk away
const run = (k, t, tb, stuBuy) => {
  let money = 0, mp = 0, ms = 0, n = 0;
  SEQ.forEach((s, i) => {
    const g = $('#bu' + k + i), a = M.io((t - tb[i]) / 0.6), b = M.io((t - tb[i] - 0.65) / 0.5);
    if (t < tb[i] - 0.05) { M.hide(g, true); return; }
    M.hide(g, false);
    const buys = s === 'P' || stuBuy; let x, y;
    if (b <= 0) { x = M.lerp(-40, ARRIVE[0], a); y = ARRIVE[1]; }
    else if (buys) { const sl = SLOT(n); x = M.lerp(ARRIVE[0], sl[0], b); y = M.lerp(ARRIVE[1], sl[1], b) - 20 * Math.sin(Math.PI * b); }
    else { x = ARRIVE[0]; y = M.lerp(ARRIVE[1], 290, b); }
    if (buys) n++;
    attr(g, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    const c = g.querySelector('circle');
    attr(c, 'fill', !buys && b > 0 ? C.red : (s === 'P' ? C.ink : (b >= 1 ? C.gold : C.stu)));
    if (buys && b >= 1) { const v = s === 'P' ? 1200 : 1000; money += v; s === 'P' ? mp += v : ms += v; }
  });
  M.setT($('#rd' + k), inr(money));
  const g0 = $('#sg' + k + '0'), g1 = $('#sg' + k + '1');
  g0.style.left = '0px'; g0.style.width = (688 * mp / 8000).toFixed(1) + 'px'; g0.style.background = C.ink;
  g1.style.left = (688 * mp / 8000).toFixed(1) + 'px'; g1.style.width = (688 * ms / 8000).toFixed(1) + 'px'; g1.style.background = C.gold;
  return money;
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const dq = $('#dq'); dq.style.width = 'auto'; if (dq.offsetWidth > 1560) dq.style.fontSize = Math.floor(88 * 1560 / dq.offsetWidth) + 'px'; dq.style.width = '1920px';
  let x = 36; for (let i = 0; i < 2; i++) { const p = $('#ch' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const s1 = $('#sc1'); s1.style.left = (36 + $('#sc0').offsetWidth + 16) + 'px';
  document.querySelectorAll('.dtx').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(52 * 688 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .ps').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(20 * 848 / el.offsetWidth) + 'px'; });
  const kt = $('#fact .kt'); if (kt.offsetWidth > 556) kt.style.fontSize = Math.floor(28 * 556 / kt.offsetWidth) + 'px';
  const q1 = $('#qq1'); if (q1.offsetWidth > 1400) q1.style.fontSize = Math.floor(68 * 1400 / q1.offsetWidth) + 'px';
  let ofs = 40; OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) ofs = Math.min(ofs, Math.floor(40 * 312 / o.offsetWidth)); });
  OPTS.forEach((_, i) => { $('#o' + i + ' .ot').style.fontSize = ofs + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const pickX = M.track(0, [[tPuts - 1.4, 60], [tPuts, 0]], M.SOFT);

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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : t < tT ? [tM1 + 0.4, tMout] : [tX4 + 0.2, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: the student who puts it back ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hpP'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    attr($('#hpP').parentNode, 'transform', `translate(${(64 + pickX(t)).toFixed(1)} 20)`);
    M.vis($('#hpTag'), t, tMorph + 0.55, 1e9, POP);
    M.vis($('#hpS1'), t, tMorph + 0.45, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#hpS2'), t, tMorph + 0.6, 1e9, { dy: 8 });
    M.vis($('#hpC0'), t, tLoves - 0.05, 1e9, { dy: 10 }); M.vis($('#hpC1'), t, tCannot - 0.05, 1e9, { dy: 10 });
    M.vis($('#bud'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    attr($('#bd0'), 'width', (720 * M.o3((t - tMorph - 0.6) / 0.6)).toFixed(1)); M.vis($('#bd0L'), t, tMorph + 1.1, 1e9, { dy: 0, fade: 0.2 });
    attr($('#bd1'), 'width', (600 * M.o3((t - tCannot) / 0.6)).toFixed(1)); M.vis($('#bd1L'), t, tCannot + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const gu = M.clamp((t - tCannot - 0.6) / 0.2); $('#bd2').style.opacity = gu.toFixed(3); $('#bd2L').style.opacity = gu.toFixed(3);
    M.vis($('#cho'), t, tC2 - 0.2, tAout, { dy: 36, ...o });
    M.vis($('#ch0'), t, tLose - 0.1, 1e9, POP); M.vis($('#ch1'), t, tDiffP - 0.1, 1e9, POP);
    M.rise($('#choT'), t, tThat - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: three kinds of buyers ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#stu'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#sZ'), t, tL2 + 0.4, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    for (let i = 0; i < 4; i++) M.vis($('#sv' + i), t, tFriends - 0.1 + i * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#stN'), t, tFriends + 0.3, { st: 0.06, sp: M.HEAVY });
    M.vis($('#sc0'), t, tFriends + 0.5, 1e9, POP); M.vis($('#sc1'), t, tLess - 0.05, 1e9, POP);
    M.vis($('#off'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    M.vis($('#ofB'), t, tOffice - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#ofL'), t, tOffice + 0.1, 1e9, { dy: 6 });
    for (let i = 0; i < 4; i++) M.vis($('#ofP' + i), t, tFour - 0.1 + i * 0.1, 1e9, { dy: -16, sp: M.POP, fade: 0.08 });
    M.vis($('#ofT'), t, tFour + 0.4, 1e9, { dy: 6 });
    M.vis($('#one'), t, tCan - 0.05, 1e9, POP);
  }

  /* ===== D: what is price discrimination ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const df = $('#dfc'); M.vis(df, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(df, $('#dfOut'), t, tBuy);
    M.rise($('#dt0'), t, tSame - 0.1, { st: 0.06, sp: M.HEAVY }); M.rise($('#dt1'), t, tBuy - 0.1, { st: 0.06, sp: M.HEAVY }); M.rise($('#dt2'), t, tPri - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#dfHr'), t, tCosts - 0.2, 1e9, { dy: 0 }); M.vis($('#dt3'), t, tCosts - 0.05, 1e9, { dy: 8 });
    M.vis($('#dt4'), t, tTell - 0.1, 1e9, POP);
    M.vis($('#dsc'), t, tBuy + 0.05, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#dsP'), t, tBuy + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    M.draw($('#dsA0'), t, tBuy + 0.5, 0.5, M.o3); M.vis($('#dsN0'), t, tBuy + 0.8, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#dsL0'), t, tBuy + 0.9, 1e9, { dy: 6 });
    M.draw($('#dsA1'), t, tPri - 0.1, 0.5, M.o3); M.vis($('#dsN1'), t, tPri + 0.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#dsL1'), t, tPri + 0.3, 1e9, { dy: 6 });
    M.vis($('#dsT0'), t, tPri + 0.4, 1e9, POP); M.vis($('#dsT1'), t, tPri + 0.6, 1e9, POP);
    M.vis($('#dsC'), t, tCosts, 1e9, { dy: 16 });
  }

  /* ===== M: one price vs two prices ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM1 + 0.25, tM5 - 0.05, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#mR'), t, tM5 + 0.2, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM1 + 0.3 : tM5 + 0.3, root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      M.vis($('#bar' + k), t, base + 0.35, 1e9, { dy: 10 });
      M.vis($('#tk0' + k), t, base + 0.4, 1e9, { dy: 8 }); M.vis($('#tk1' + k), t, base + 0.4, 1e9, { dy: 8 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    }
    const a = run('L', t, tbL, false), b = run('R', t, tbR, true);
    if (t >= tSixK - 0.1) pill('L', 'x', inr(a) + ' this week', '20 students lost', 1, 1);
    else if (t >= tM3) pill('L', 'users', 'Parents buy, students leave', '', 1, 0);
    else pill('L', 'tag', 'One price: ₹120 for all', '', 0, 0);
    if (t >= tEarns - 0.1) pill('R', 'coin', 'Each student pack earns ₹20', '₹100 minus ₹80', 0, 1);
    else if (t >= tEightK - 0.1) pill('R', 'trendUp', inr(b) + ' this week', '+₹2,000', 0, 1);
    else if (t >= tM6) pill('R', 'users', 'Parents and students buy', '', 0, 0);
    else pill('R', 'tag', 'Students with an ID pay ₹100', '', 0, 0);
    M.vis($('#mw0'), t, wt('M3', 'parents') - 0.05, 1e9, { dx: 16, dy: 0 }); M.vis($('#mw1'), t, tStuA - 0.05, 1e9, { dx: 16, dy: 0 });
    M.vis($('#mwH'), t, tSixK - 0.3, 1e9, { dy: 8 }); M.rise($('#mwT'), t, tSixK - 0.1, { st: 0.07, sp: M.HEAVY });
    M.vis($('#mwP'), t, tSixK + 0.6, 1e9, POP);
    void tID;
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

  /* ===== C: four conditions ===== */
  const cOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sC'), !cOn);
  if (cOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#cq'), t, tC1 + 0.05, tCout, { dx: -60, dy: 0, ...o });
    M.vis($('#cv'), t, tC1 + 0.2, tCout, { dx: 60, dy: 0, ...o });
    CR.forEach(([ic], i) => {
      const el = $('#cr' + i), ta = tCc[i], td = i < 3 ? tCc[i + 1] : tCout + 1;
      M.vis(el, t, tC1 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
      M.vis($('#co' + i), t, tCv[i], 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      M.vis($('#cv' + i), t, tCc[i] + 0.1, 1e9, { dy: 16, sp: M.SOFT });
    });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 2 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 3 ? tK[k] - 0.14 : 1e9;
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POP);
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POP);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, tRao - 0.1, 1e9, { dx: 24, dy: 0 });
    M.vis($('#xr1'), t, tExpl - 0.05, 1e9, { dx: 24, dy: 0 });
    M.vis($('#mpS'), t, tMonthly - 0.3, 1e9, { dy: 16 });
    for (let i = 0; i < 4; i++) M.vis($('#mp' + i), t, tMonthly - 0.1 + i * 0.08, 1e9, { dy: -14, sp: M.POP, fade: 0.08 });
    M.vis($('#mpA'), t, tMonthly + 0.4, 1e9, { dy: 6 }); M.vis($('#mpB'), t, tMonthly + 1.0, 1e9, { dy: 6 }); M.vis($('#mpC'), t, tMonthly + 1.5, 1e9, { dy: 6 });
    M.vis($('#fact'), t, tAct - 0.1, 1e9, { dy: 16 });
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
      M.vis($('#rw' + i), t, tRw[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRw[i] + 0.08, { st: 0.04 });
      ps.forEach((_, k) => {
        const el = $('#fp' + i + k), tp = tPill[i][k]; M.vis(el, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const a = tp - 0.05, b = k < ps.length - 1 ? tPill[i][k + 1] - 0.05 : (i < 2 ? tRw[i + 1] - 0.2 : tN - 0.4);
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
