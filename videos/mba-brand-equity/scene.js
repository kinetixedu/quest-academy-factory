// MBA - Marketing Management, Ep 22: Brand Equity (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  hospital: ['M3 21h18', 'M5 21V7l7-4 7 4v14', 'M12 9v6', 'M9 12h6'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tPick = wt('H2', 'pick'), tAgain = wt('H2', 'again', 1);
const tC2 = T0('C2'), tWhyN = wt('C2', 'name'), tThat = wt('C2', 'That');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tL4 = T0('L4');
const tBso = [wt('L1', 'name'), wt('L1', 'logo'), wt('L1', 'pack')];
const tTells = wt('L3', 'tells'), tMore = wt('L3', 'more'), tSlow = wt('L4', 'Slowly'), tMean = wt('L4', 'mean');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M1') - 0.32;
const tKqL = wt('D2', 'Journal') + 0.4, tHl = [wt('D3', 'differential'), wt('D3', 'knowledge'), wt('D3', 'consumer')];
const tDiff = wt('D4', 'difference'), tDMk = wt('D4', 'makes'), tSw = [wt('D5', 'same'), wt('D5', 'known'), wt('D5', 'extra')];
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8');
const tBlind = wt('M2', 'blind'), tPlainB = wt('M2', 'plain'), tDead = wt('M4', 'dead'), tSays = wt('M5', 'says'), tSixteen = wt('M7', 'Sixteen'), tGap = wt('M8', 'gap'), tSix = wt('M8', 'six');
const tMout = T0('T1') - 0.32;
// statement + pyramid
const tT = T0('T1'), tSt2 = wt('T1', 'Customers'), tB0 = T0('B0'), tTu = tB0 - 0.32;
const tB = [1, 2, 3, 4].map(i => T0('B' + i)), tBn = [wt('B1', 'Identity'), wt('B2', 'Meaning'), wt('B3', 'Response'), wt('B4', 'Relationship')];
const tBout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'Travellers'), wt('K2', 'Patients'), wt('K3', 'phone'), wt('K4', 'bank'), wt('K5', 'snack')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'Trust'), wt('X2', 'shops')], tXh = [wt('X3', 'years'), wt('X3', 'batch')];
const tArj = wt('X4', 'Arjun'), tNo = wt('X4', 'no'), tPar = wt('X5', 'Parents'), tProm = wt('X5', 'promise'), tBreak = wt('X5', 'Break'), tAcc = wt('X6', 'accounting');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'extra')], [wt('S3', 'awareness'), wt('S3', 'quality'), wt('S3', 'meaning'), wt('S3', 'loyalty')], [wt('S4', 'keep')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
// a pack in 240 x 320 units: 'brand' (Laddoo Lab navy and gold) or 'plain' (blank, optional letter)
const pack = (id, x, y, s, kind, letter = '') => `<g ${id ? `id="${id}"` : ""} transform="translate(${x} ${y}) scale(${s})">` + (kind === 'brand'
  ? `<path d="M28 40 L212 40 L220 300 Q220 312 208 312 L32 312 Q20 312 20 300 Z" fill="#14213D"/><rect x="22" y="22" width="196" height="28" rx="6" fill="#24345A"/>
     <text x="120" y="110" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="26" fill="#F5E7C6" letter-spacing="1">LADDOO LAB</text>
     <rect x="22" y="150" width="196" height="54" fill="#B8862F"/><text x="120" y="184" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="16" fill="#FFFFFF" letter-spacing="1">NO REFINED SUGAR</text>
     ${[72, 120, 168].map(cx => laddoo(cx, 258, 18)).join('')}`
  : `<path d="M28 40 L212 40 L220 300 Q220 312 208 312 L32 312 Q20 312 20 300 Z" fill="#E9E2D3" stroke="#CFC6B4" stroke-width="4"/><rect x="22" y="22" width="196" height="28" rx="6" fill="#DCD3C1"/>
     ${letter ? `<text x="120" y="218" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="120" fill="#B9B1A3">${letter}</text>` : ''}`) + `</g>`;

// A: two packs, 20 picks, why
$('#pkS').innerHTML = `<g id="pkP">${pack('', 72, 0, 0.8, 'plain')}</g><g id="pkB">${pack('', 352, 0, 0.8, 'brand')}</g>` +
  `<g transform="translate(308 128)"><g id="pkEq"><circle r="22" fill="#14213D"/><path d="M-10 -5 h20 M-10 5 h20" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/></g></g>` +
  `<g id="pkL0">${[128, 168, 208].map(x => laddoo(x, 300, 16)).join('')}</g><g id="pkL1">${[408, 448, 488].map(x => laddoo(x, 300, 16)).join('')}</g>` +
  `<g transform="translate(308 300)"><g id="pkEq2"><circle r="16" fill="#B8862F"/><path d="M-7 -4 h14 M-7 4 h14" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g></g>`;
$('#sameI').innerHTML = M.icon('check', 22, '#fff', 3);
const PLAIN_I = [3, 9, 14, 18];
$('#pgrid').innerHTML = Array.from({ length: 20 }, (_, i) => `<div class="pd" id="pd${i}" style="left:${i * 42}px"></div>`).join('');
$('#cLLI').innerHTML = M.icon('check', 24, C.gold, 2.6);
const WHY = [['check', 'Same recipe', 0], ['check', 'Same taste', 0], ['tag', 'A known name', 1]];
$('#whyP').innerHTML = WHY.map(([ic, m, k], i) => `<div class="stp" id="wy${i}" style="top:76px;${k ? 'background:#B8862F;color:#fff' : ''}">${M.icon(ic, 26, k ? '#fff' : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L: brand so far + word of mouth
const BSO = [['tag', 'NAME', 'Laddoo Lab'], ['award', 'LOGO', 'One clear mark'], ['package', 'PACK', 'The 6-pack']];
$('#bsoR').innerHTML = BSO.map(([ic, n, t], i) => `<div class="sws" id="bs${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
$('#meanI').innerHTML = M.icon('heart', 20, '#fff', 2.6);
const WR = [96, 158], W2 = [[300, 112], [300, 204]], W3 = [[500, 92], [500, 138], [500, 184], [500, 230]], W4 = Array.from({ length: 8 }, (_, k) => [680, 82 + k * 22]);
const curve = (a, b) => { const mx = (a[0] + b[0]) / 2; return `M${a[0]} ${a[1]} C${mx} ${a[1]} ${mx} ${b[1]} ${b[0]} ${b[1]}`; };
$('#womS').innerHTML = `<defs><clipPath id="womc"><circle cx="0" cy="0" r="36"/></clipPath></defs>` +
  W2.map((p, i) => `<path id="wl2${i}" d="${curve(WR, p)}" fill="none" stroke="#D9CFBC" stroke-width="3"/>`).join('') +
  W3.map((p, i) => `<path id="wl3${i}" d="${curve(W2[i >> 1], p)}" fill="none" stroke="#D9CFBC" stroke-width="3"/>`).join('') +
  W4.map((p, i) => `<path id="wl4${i}" d="${curve(W3[i >> 1], p)}" fill="none" stroke="#E2DACB" stroke-width="2.5"/>`).join('') +
  `<g transform="translate(${WR[0]} ${WR[1]})"><g id="wR"><circle r="40" fill="#B8862F"/><image href="${IMG}ll-rao-face.jpg" x="-36" y="-36" width="72" height="72" clip-path="url(#womc)"/></g></g>` +
  W2.map((p, i) => `<g transform="translate(${p[0]} ${p[1]})"><g id="wn2${i}"><circle r="24" fill="#14213D"/><g transform="translate(-12 -12)">${M.icon('user', 24, '#fff', 2.4)}</g></g></g>`).join('') +
  W3.map((p, i) => `<g transform="translate(${p[0]} ${p[1]})"><g id="wn3${i}"><circle r="18" fill="#3A4560"/><g transform="translate(-9 -9)">${M.icon('user', 18, '#fff', 2.4)}</g></g></g>`).join('') +
  W4.map((p, i) => `<g transform="translate(${p[0]} ${p[1]})"><circle id="wn4${i}" r="9" fill="#B9B1A3"/></g>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: definition, differential effect, simple words
const SWT = [['laddoo', 'PRODUCT', 'Same laddoo'], ['tag', 'NAME', 'Known name'], ['trendUp', 'RESULT', 'Extra pull']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${50 + i * 252}px;width:180px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>` +
  (i < 2 ? `<div class="op" id="op${i}" style="left:${246 + i * 252}px">${M.icon(i ? 'equal' : 'plus', 22, '#fff', 3)}</div>` : '')).join('');
attr0($('#dBrP'), 'd', 'M532 2 V12 H732 V2');
function attr0(el, a, v) { el.setAttribute(a, v); }
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the two tests. Plan coords are inside a 688 x 250 svg. */
const BL = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1];          // 10 A, 10 B
const NM = Array.from({ length: 20 }, (_, i) => PLAIN_I.includes(i) ? 1 : 0);      // 16 Laddoo Lab, 4 plain
const SPAWN = [344, 222];
const slot = (side, n) => [side ? 538 - (n % 4) * 36 : 150 + (n % 4) * 36, 62 + Math.floor(n / 4) * 36];
const slots = seq => { const c = [0, 0]; return seq.map(s => { const p = slot(s, c[s]); const n = c[s]++; return { s, p, n }; }); };
const SL = { L: slots(BL), R: slots(NM) };
const tpL = Array.from({ length: 20 }, (_, i) => tM3 + 0.1 + i * (tM4 - 0.1 - tM3) / 19);
const tpR = Array.from({ length: 20 }, (_, i) => tM6 + 0.1 + i * (tSixteen + 0.5 - tM6) / 20);
const head = (k, name) => `<div class="mav" style="${FACE('zoya')}"></div><div class="lbl mlb">${name}</div><div class="serif mrd" id="rd${k}">0 : 0</div>`;
const tail = (k, a, b) => `<div class="mbar" id="bar${k}"><i id="sg${k}0"></i><i id="sg${k}1"></i></div>
    <div class="mtk" id="tk0${k}" style="left:48px">${a}</div><div class="mtk" id="tk1${k}" style="right:48px">${b}</div>
    <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
const plan = (k, left, right, la, lb) => `<svg class="mplan" id="plan${k}" width="688" height="250">
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${left}${right}
      <text id="pl${k}0" x="74" y="186" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${la}</text>
      <text id="pl${k}1" x="614" y="186" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${lb}</text>
      <circle id="sp${k}" cx="${SPAWN[0]}" cy="${SPAWN[1]}" r="20" fill="none" stroke="#CFC6B4" stroke-width="2.5" stroke-dasharray="4 6"/>
      ${Array.from({ length: 20 }, (_, i) => `<g id="pp${k}${i}" transform="translate(${SPAWN[0]} ${SPAWN[1]})"><circle r="15" fill="#3A4560" stroke="#14213D" stroke-width="0"/><g transform="translate(-8 -8)">${M.icon('user', 16, '#fff', 2.6)}</g></g>`).join('')}
    </svg>`;
$('#mLIn').innerHTML = head('L', 'THE BLIND TEST · NO NAMES') + plan('L', pack('pAL', 28, 34, 0.38, 'plain', 'A'), pack('pBL', 569, 34, 0.38, 'plain', 'B'), 'PACK A', 'PACK B') + tail('L', 'PACK A', 'PACK B');
$('#mRIn').innerHTML = head('R', 'THE NAMED TEST · ONE NAME') + plan('R', pack('pAR', 28, 34, 0.38, 'brand'), pack('pBR', 569, 34, 0.38, 'plain'), 'LADDOO LAB', 'PLAIN') + tail('R', 'LADDOO LAB', 'PLAIN');
$('#gLeftI').innerHTML = M.icon('scale', 22, C.gold2, 2.4);
wrap($('#mL'), 'mLOut', 784, 580);

// B: Keller's pyramid
const PY = [['Identity', 'SALIENCE', 'Who are you?', 'zoya', 'Parents can name Laddoo Lab', 'eye', 'Be noticed and remembered'],
  ['Meaning', 'PERFORMANCE · IMAGERY', 'What do you stand for?', 'nani', 'A healthy sweet, no refined sugar', 'award', 'Deliver what you promise'],
  ['Response', 'JUDGMENTS · FEELINGS', 'What do people think and feel?', 'rao', 'They trust it and feel good giving it', 'heart', 'Earn trust and good feelings'],
  ['Relationship', 'RESONANCE', 'Will they stay and speak up?', 'arjun', 'Loyal parents buy weekly and tell friends', 'repeat', 'Turn buyers into fans']];
const hw = y => 120 + y / 456 * 224;
$('#pyS').innerHTML = PY.map(([n, b], i) => {
  const yb = 456 - i * 116, yt = yb - 104, yc = (yt + yb) / 2;
  return `<g id="ty${i}"><g id="tyb${i}"><polygon id="tp${i}" points="${344 - hw(yt)},${yt} ${344 + hw(yt)},${yt} ${344 + hw(yb)},${yb} ${344 - hw(yb)},${yb}" fill="#EEE8DB" stroke="#EEE8DB" stroke-width="10" stroke-linejoin="round"/>
    <text id="tn${i}" x="344" y="${yc + 2}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="30" fill="#B9B1A3">${n}</text>
    <text id="tb${i}" x="344" y="${yc + 32}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#B9B1A3">${b}</text></g></g>`;
}).join('');
const PYP = [['KELLER · CUSTOMER-BASED BRAND EQUITY', 'Built bottom up', 'Each step rests on the one below', ['layers', 'THE BASE', 'People must know the name first'], ['repeat', 'THE TOP', 'Loyalty that lasts for years']]]
  .concat(PY.map((p, i) => [`STEP 0${i + 1} OF 04 · ${p[1]}`, p[0], p[2], [p[3], 'AT LADDOO LAB', p[4]], [p[5], "THE BRAND'S JOB", p[6]]]));
const kaRow = (id, top, [ic, l, x]) => `<div class="ka" id="${id}" style="top:${top}px">` + (['zoya', 'nani', 'rao', 'arjun'].includes(ic)
  ? `<i style="${FACE(ic)};background-size:cover;box-shadow:0 0 0 4px #B8862F"></i>` : `<i>${M.icon(ic, 34, C.gold, 2.2)}</i>`) + `<div class="kl">${l}</div><div class="kt">${x}</div></div>`;
$('#pyPans').innerHTML = PYP.map(([s, t, m, r0, r1], i) => `<div class="pn" id="yn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  kaRow(`ya${i}0`, 322, r0) + kaRow(`ya${i}1`, 442, r1) + `</div>`).join('');

// K: Aaker's five assets at work today
const KA = [
  ['eye', 'Awareness', 'People know your name', 'Children point out the Laddoo Lab pack', 'plane', "Travellers spot an airline's logo at a glance"],
  ['award', 'Perceived quality', 'People expect it to be good', "Parents trust Nani's no-shortcuts recipe", 'hospital', 'Patients trust a well known hospital'],
  ['link', 'Associations', 'What the name brings to mind', 'Laddoo Lab means the healthy tiffin sweet', 'phone', "A phone maker's name means smart design"],
  ['repeat', 'Loyalty', 'People keep coming back', 'Mrs. Rao buys a 6-pack every week', 'bank', 'A bank keeps the same customers for years'],
  ['lock', 'Other assets', 'Things rivals cannot copy', 'Its name can be registered as a trademark', 'package', 'A snack company registers its trademark'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 96}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['DAVID AAKER · MANAGING BRAND EQUITY, 1991', 'Five brand assets', 'What a strong name is made of', null]].concat(KA.map((a, i) => [`AAKER ASSET 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A SNACK MAKER TO AN AIRLINE</div><div class="pe"><i>${M.icon('shield', 34, C.gold, 2.2)}</i><span>Every asset lives in the customer's mind</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['check', 'Easy to choose'], ['store', 'Shops want it']];
const XH = [['clock', 'Years to build'], ['trendDown', 'Breaks fast']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#trS').innerHTML = `<text x="0" y="14" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.2" fill="#8A8274">TRUST IN THE NAME</text>
  <line x1="0" y1="134" x2="688" y2="134" stroke="#E2DACB" stroke-width="3"/>
  <path id="trUp" d="M8 128 C190 126 360 86 520 40" fill="none" stroke="#B8862F" stroke-width="5" stroke-linecap="round"/>
  <g transform="translate(520 40)"><circle id="trPk" r="9" fill="#B8862F"/></g>
  <path id="trDn" d="M520 40 L600 128" fill="none" stroke="#B5482F" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 9"/>
  <text id="trT0" x="8" y="158" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">YEARS TO BUILD</text>
  <text id="trT1" x="600" y="158" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#B5482F">ONE BAD BATCH</text>`;
$('#bb1I').innerHTML = M.icon('shield', 22, '#fff', 2.4); $('#factI').innerHTML = M.icon('book', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('shield', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Segmentation', 'Brand equity', 'Market research', 'A price cut'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('tag', 44, C.gold2, 2.4);
// recap
const ROWS = [['tag', 'Brand equity: the extra value a name adds', ['Extra pull']], ['layers', "It lives in people's minds", ['Awareness', 'Quality', 'Meaning', 'Loyalty']], ['shield', 'Years to build, moments to lose', ['Keep the promise']]];
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
const bars = (k, a, b, colB) => {
  const g = $('#sg' + k + '0'), r = $('#sg' + k + '1'), gw = 688 * a / 20, rw = 688 * b / 20;
  g.style.left = '0px'; g.style.width = gw.toFixed(1) + 'px'; g.style.background = C.gold;
  r.style.left = (688 - rw).toFixed(1) + 'px'; r.style.width = rw.toFixed(1) + 'px'; r.style.background = colB;
};
// one test run: parents walk from the queue to the pack they choose
const run = (k, t, tp, colB) => {
  const S = SL[k]; let a = 0, b = 0;
  S.forEach(({ s, p, n }, i) => {
    const g = $('#pp' + k + i), u = M.io((t - tp[i]) / 0.45);
    if (t < tp[i] - 0.12) { M.hide(g, true); return; }
    M.hide(g, false);
    const x = M.lerp(SPAWN[0], p[0], u), y = M.lerp(SPAWN[1], p[1], u) - 26 * Math.sin(Math.PI * u);
    attr(g, 'transform', u >= 1 ? `translate(${p[0]} ${p[1]})` : `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    const c = g.querySelector('circle');
    attr(c, 'fill', u < 0.5 ? C.ink2 : (s ? colB : C.gold));
    const ring = k === 'R' && s === 0 && n >= 10 && t > tGap;
    attr(c, 'stroke-width', ring ? '4' : '0');
    if (u >= 1) s ? b++ : a++;
  });
  M.setT($('#rd' + k), `${a} : ${b}`);
  bars(k, a, b, colB);
  return [a, b];
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const sm = $('#same'); sm.style.left = (308 - sm.offsetWidth / 2) + 'px';
  const cp = $('#cPl'); cp.style.left = (884 - cp.offsetWidth) + 'px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#wy' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  const dg = $('#dGap'); dg.style.left = (748 - dg.offsetWidth) + 'px';
  const gl = $('#gLeft'); gl.style.left = (392 - gl.offsetWidth / 2) + 'px';
  document.querySelectorAll('#pyPans .pt').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(76 * 688 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#pyPans .pm').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(36 * 688 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#pyPans .kt').forEach(el => { if (el.offsetWidth > 588) el.style.fontSize = Math.floor(30 * 588 / el.offsetWidth) + 'px'; });
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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : [tM1 + 0.4, tMout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: same laddoos, two packs ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pk2'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#pkP'), t, tMorph + 0.4, 1e9, { dy: 30, sp: M.SOFT }); M.vis($('#pkB'), t, tMorph + 0.55, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#pkn0'), t, tMorph + 0.5, 1e9, { dy: 10 }); M.vis($('#pkn1'), t, tMorph + 0.65, 1e9, { dy: 10 });
    M.vis($('#pkL0'), t, tMorph + 0.8, 1e9, { dy: 16 }); M.vis($('#pkL1'), t, tMorph + 0.9, 1e9, { dy: 16 });
    M.vis($('#pkEq'), t, tMorph + 1.0, 1e9, POP); M.vis($('#pkEq2'), t, tMorph + 1.1, 1e9, POP);
    M.vis($('#same'), t, tMorph + 1.25, 1e9, POP);
    M.vis($('#pick'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    let nL = 0, nP = 0;
    for (let i = 0; i < 20; i++) {
      const el = $('#pd' + i), ta = tPick + i * (tAgain + 0.3 - tPick) / 20;
      M.vis(el, t, tMorph + 0.5 + i * 0.02, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      const u = M.io((t - ta) / 0.2), pl = PLAIN_I.includes(i);
      el.style.background = mix('#E2DACB', pl ? C.ink2 : C.gold, u);
      if (u >= 0.5) pl ? nP++ : nL++;
    }
    M.setT($('#cLLN'), String(nL)); M.setT($('#cPlN'), String(nP));
    M.vis($('#cLL'), t, tPick - 0.1, 1e9, POP); M.vis($('#cPl'), t, tPick + 0.1, 1e9, POP);
    M.vis($('#why'), t, tAgain - 0.65, tAout, { dy: 36, ...o });
    M.vis($('#wy0'), t, tAgain - 0.35, 1e9, POP); M.vis($('#wy1'), t, tAgain + 0.05, 1e9, POP); M.vis($('#wy2'), t, tWhyN - 0.1, 1e9, POP);
    M.rise($('#whyT'), t, tThat - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the brand so far ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tBso[0]);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#bso'), t, tBso[0] + 0.05, tLout, { dx: 60, dy: 0, ...o });
    BSO.forEach((_, i) => {
      const el = $('#bs' + i); M.vis(el, t, tBso[i] - 0.05, 1e9, POP);
      const on = M.io((t - tBso[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tBso[i + 1]) / 0.25) : M.io((t - tL2) / 0.3)));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), BSO[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis($('#wom'), t, tL2 + 0.1, tLout, { dy: 36, ...o });
    M.vis($('#wR'), t, tL2 + 0.4, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    for (let i = 0; i < 2; i++) { M.draw($('#wl2' + i), t, tTells - 0.1 + i * 0.1, 0.4, M.o3); M.vis($('#wn2' + i), t, tTells + 0.2 + i * 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); }
    for (let i = 0; i < 4; i++) { M.draw($('#wl3' + i), t, tMore - 0.1 + i * 0.07, 0.4, M.o3); M.vis($('#wn3' + i), t, tMore + 0.2 + i * 0.07, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); }
    for (let i = 0; i < 8; i++) {
      M.draw($('#wl4' + i), t, tSlow - 0.1 + i * 0.05, 0.4, M.o3); M.vis($('#wn4' + i), t, tSlow + 0.2 + i * 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      attr($('#wn4' + i), 'fill', mix(C.dim, C.gold, M.io((t - tMean - i * 0.04) / 0.25)));
    }
    M.vis($('#mean'), t, tMean - 0.1, 1e9, POP);
  }

  /* ===== D: what is brand equity ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Kevin') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Journal') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', '1993') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD3 - 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tKqL + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tD3 - i * 0.9) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#df0'), t, tD4 + 0.35, 1e9, { dy: 10 }); M.vis($('#df1'), t, tD4 + 0.5, 1e9, { dy: 10 });
    snap($('#db0'), (260 * M.o3((t - tD4 - 0.45) / 0.5)).toFixed(1) + 'px', 'width');
    snap($('#db1'), (260 * M.o3((t - tD4 - 0.6) / 0.5)).toFixed(1) + 'px', 'width');
    const g2 = $('#db2'); g2.style.left = '496px'; snap(g2, (200 * M.o3((t - tDiff) / 0.6)).toFixed(1) + 'px', 'width'); M.hide(g2, t < tDiff);
    M.draw($('#dBrP'), t, tDMk - 0.2, 0.4, M.o3); M.vis($('#dGap'), t, tDMk, 1e9, { dy: 8 });
    M.vis($('#sw'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tSw[i] - 0.05, 1e9, POP);
      if (i < 2) M.vis($('#op' + i), t, tSw[i + 1] - 0.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
      const on = i === 2 ? M.io((t - tSw[2]) / 0.25) : 0;
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
  }

  /* ===== M: blind test vs named test ===== */
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
    const tpk = [tBlind - 0.05, tPlainB + 0.1, tSays - 0.05, tSays + 0.15];
    ['pAL', 'pBL', 'pAR', 'pBR'].forEach((id, i) => { const el = $('#' + id), u = M.clamp((t - tpk[i]) / 0.15); el.style.opacity = u.toFixed(3); });
    ['plL0', 'plL1', 'plR0', 'plR1'].forEach((id, i) => { $('#' + id).style.opacity = M.clamp((t - tpk[i] - 0.1) / 0.15).toFixed(3); });
    $('#spL').style.opacity = M.clamp((t - tM1 - 0.7) / 0.15).toFixed(3); $('#spR').style.opacity = M.clamp((t - tM5 - 0.7) / 0.15).toFixed(3);
    const [a, b] = run('L', t, tpL, C.ink2); const [c, d] = run('R', t, tpR, C.dim);
    const doneL = a + b === 20, doneR = c + d === 20;
    if (doneL) pill('L', 'scale', 'Ten and ten', 'a dead heat', 0, 1);
    else if (t >= tM3) pill('L', 'users', '20 parents taste and choose', '', 0, 0);
    else if (t >= tM2) pill('L', 'package', 'Two plain packs, A and B', '', 0, 0);
    else pill('L', 'clock', 'Ready at the school gate', '', 0, 0);
    if (doneR && t >= tGap) pill('R', 'trendUp', 'Six extra choices', '+6 from the name', 0, 1);
    else if (doneR) pill('R', 'check', '16 pick Laddoo Lab', '4 plain', 0, 1);
    else if (t >= tM6) pill('R', 'users', '20 new parents choose', '', 0, 0);
    else pill('R', 'tag', 'One pack says Laddoo Lab', '', 0, 0);
    // live choices ring for the blind test
    M.vis($('#gv'), t, tM1 + 0.45, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.drawU($('#gArc'), a / 20); M.drawU($('#gArcB'), b / 20);
    M.vis($('#gN'), t, tM1 + 0.55, 1e9, { dy: 12 }); M.setT($('#gN'), `${a} : ${b}`);
    M.vis($('#gOf'), t, tM1 + 0.6, 1e9, { dy: 8 }); M.vis($('#gWay'), t, tM1 + 0.65, 1e9, { dy: 8 });
    M.vis($('#gLeft'), t, tDead - 0.1, 1e9, POP);
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

  /* ===== B: Keller's pyramid ===== */
  const bOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pyr'), t, tB0 + 0.05, tBout, { dx: -60, dy: 0, ...o });
    M.vis($('#pyp'), t, tB0 + 0.2, tBout, { dx: 60, dy: 0, ...o });
    PY.forEach((_, i) => {
      M.vis($('#ty' + i), t, tB0 + 0.4 + i * 0.1, 1e9, { dy: 14 });
      const on = M.io((t - tBn[i] + 0.05) / 0.3), off = i < 3 ? M.io((t - tB[i + 1]) / 0.35) : 0, act = on * (1 - off);
      const fill = t < tBn[i] - 0.05 ? C.paper2 : mix(mix(C.paper2, C.ink, on), C.gold3, off);
      attr($('#tp' + i), 'fill', fill); attr($('#tp' + i), 'stroke', fill);
      attr($('#tn' + i), 'fill', t < tBn[i] - 0.05 ? C.dim : mix(mix(C.dim, '#FFFFFF', on), C.ink, off));
      attr($('#tb' + i), 'fill', t < tBn[i] - 0.05 ? C.dim : mix(mix(C.dim, C.gold2, on), C.gold, off));
      if (t > tBn[i] && t < tBn[i] + 0.5) attr($('#tyb' + i), 'transform', `translate(0 ${(-8 * Math.sin(Math.PI * (t - tBn[i]) / 0.5)).toFixed(2)})`);
      else attr($('#tyb' + i), 'transform', 'translate(0 0)');
      void act;
    });
    for (let k = 0; k < 5; k++) {
      const tin = k ? tB[k - 1] : tB0 + 0.5, tout = k < 4 ? tB[k] - 0.14 : 1e9;
      const pn = $('#yn' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis($('#ya' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#ya' + k + '1'), t, k ? tBn[k - 1] + 0.9 : tin + 1.2, tout, { dy: 18, ...oo });
    }
  }

  /* ===== K: at work today ===== */
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
    M.vis($('#xr0'), t, tArj - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tNo ? C.redBg : C.paper; $('#bb0').style.color = t > tNo ? C.red : C.ink;
    M.vis($('#xr1'), t, tNo - 0.05, 1e9, { dx: 24, dy: 0 });
    M.vis($('#trS'), t, tPar - 0.1, 1e9, { dy: 16 });
    M.draw($('#trUp'), t, tPar + 0.1, 1.0, M.o3); M.vis($('#trPk'), t, tPar + 1.0, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.vis($('#trT0'), t, tPar + 0.3, 1e9, { dy: 6 });
    M.draw($('#trDn'), t, tBreak - 0.05, 0.45, M.o3); M.vis($('#trT1'), t, tBreak + 0.2, 1e9, { dy: 6 });
    attr($('#trPk'), 'fill', t > tBreak ? C.red : C.gold);
    M.vis($('#fact'), t, tAcc - 0.1, 1e9, { dy: 16 });
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
