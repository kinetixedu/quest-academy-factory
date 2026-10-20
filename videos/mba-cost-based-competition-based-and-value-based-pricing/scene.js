// MBA - Marketing Management, Ep 24: Cost-Based, Competition-Based and Value-Based Pricing (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  wheat: ['M2 22 16 8', 'M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z', 'M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  eyeOff: ['M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49', 'M14.084 14.158a3 3 0 0 1-4.242-4.242', 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143', 'm2 2 20 20'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  cup: ['M10 2v2', 'M14 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1', 'M6 2v2'],
  sofa: ['M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3', 'M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z', 'M4 18v2', 'M20 18v2', 'M12 4v9'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tWhere = wt('H2', 'where'), tQp = [wt('H2', 'high'), wt('H2', 'low'), wt('H2', 'right')];
const tC2 = T0('C2'), tT3 = [wt('C2', 'cost'), wt('C2', 'competition'), wt('C2', 'value')];
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tIng = [wt('L2', 'ragi'), wt('L2', 'jaggery'), wt('L2', 'ghee'), wt('L2', 'box')], tThree = wt('L3', 'three');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tDout = T0('M1') - 0.32, tAlso = wt('D1', 'also'), tMk = wt('D2', 'markup'), tMk2 = wt('D2', 'markup', 1), tTop = wt('D2', 'top'), tProf = wt('D2', 'profit');
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tMout = T0('P1') - 0.32;
const tRow = [wt('M1', 'forty'), wt('M2', 'box'), wt('M2', 'Gas'), wt('M2', 'Delivery'), wt('M3', 'eighty'), wt('M4', 'forty'), wt('M5', 'hundred')];
const tYes = wt('M5', 'yes'), tPct = wt('M4', 'fifty');
// P
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tPout = T0('V1') - 0.32;
const tRv = [wt('P2', 'bakery'), wt('P2', 'supermarket'), wt('P2', 'health')], tBand = wt('P3', 'between'), tFits = wt('P3', 'fits');
// V
const tV1 = T0('V1'), tV2 = T0('V2'), tV3 = T0('V3'), tV4 = T0('V4'), tVout = T0('T1') - 0.32, tAsks = wt('V2', 'asks'), tAvg = wt('V4', 'average'), tDeal = wt('V4', 'good');
// statement + F
const tT = T0('T1'), tSt2 = wt('T1', 'Value'), tF1 = T0('F1'), tTu = tF1 - 0.32;
const tF2 = T0('F2'), tF3 = T0('F3'), tF4 = T0('F4'), tFout = T0('K0') - 0.32;
const tCostsF = wt('F1', 'Costs'), tCustF = wt('F1', 'Customer'), tFloor = wt('F2', 'floor'), tCeil = wt('F2', 'ceiling'), tRivF = wt('F3', 'Rival'), tPass = wt('F4', 'passes'), tStays = wt('F4', 'stays');
// K
const tK0 = T0('K0'), tK = [1, 2, 3].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'furniture'), wt('K2', 'tea'), wt('K3', 'airline')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tBs = [wt('X2', 'ignores'), wt('X2', 'race'), wt('X2', 'research')], tDev = wt('X3', 'Dev'), tZoya = wt('X4', 'Zoya'), tGap = wt('X4', 'gap'), tMrp = wt('X5', 'every');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Cost', 1);
const tS = T0('S1'), tRw = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'markup')], [wt('S3', 'rivals')], [wt('S4', 'worth')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" ${o.a ? `text-anchor="${o.a}"` : ''} ${o.id ? `id="${o.id}"` : ''} font-family="Poppins" font-weight="${o.w || 600}" font-size="${o.fs || 15}" ${o.ls !== 0 ? `letter-spacing="${o.ls || 2.2}"` : ''} fill="${o.c || '#8A8274'}">${s}</text>`;
const brandPack = s => `<g transform="scale(${s})"><path d="M28 40 L212 40 L220 300 Q220 312 208 312 L32 312 Q20 312 20 300 Z" fill="#14213D"/><rect x="22" y="22" width="196" height="28" rx="6" fill="#24345A"/>
  <text x="120" y="110" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="26" fill="#F5E7C6" letter-spacing="1">LADDOO LAB</text>
  <rect x="22" y="150" width="196" height="54" fill="#B8862F"/><text x="120" y="184" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="16" fill="#FFFFFF" letter-spacing="1">NO REFINED SUGAR</text>
  ${[72, 120, 168].map(cx => laddoo(cx, 258, 18)).join('')}</g>`;

// A: the pack with its price tag
$('#hpS').innerHTML = `<g transform="translate(112 24)"><g id="hpP">${brandPack(0.9)}</g></g>
  <g transform="translate(400 70)"><g id="hpT"><g id="hpTr">
    <path d="M0 0 L0 40" stroke="#8A8274" stroke-width="3"/>
    <path d="M-62 40 H62 Q74 40 74 52 V170 Q74 182 62 182 H-62 Q-74 182 -74 170 V52 Q-74 40 -62 40 Z" fill="#B8862F"/>
    <circle cx="0" cy="58" r="7" fill="#FFFFFF"/>
    <text x="0" y="132" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="44" fill="#FFFFFF">₹120</text>
    <text x="0" y="162" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#FFFFFF">PER 6-PACK</text>
  </g></g></g>
  <g transform="translate(468 112)"><g id="hpQ"><circle r="26" fill="#14213D"/><text x="0" y="11" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="30" fill="#FFFFFF">?</text></g></g>
  ${T(308, 400, '₹20 A LADDOO · 6 LADDOOS', { a: 'middle', fs: 16, id: 'hpL' })}`;
const QP = [['trendUp', 'Too high?', 1], ['trendDown', 'Too low?', 1], ['check', 'Just right?', 0]];
$('#q3P').innerHTML = QP.map(([ic, m, b], i) => `<div class="stp" id="qp${i}" style="top:76px;${b ? '' : 'background:#B8862F;color:#fff'}">${M.icon(ic === 'trendUp' ? 'arrowU' : ic === 'trendDown' ? 'arrowD' : 'check', 26, b ? C.gold : '#fff', 2.6)}<span>${m}</span></div>`).join('');
const T3 = [['coin', 'TEST 1', 'Cost'], ['users', 'TEST 2', 'Competition'], ['heart', 'TEST 3', 'Value']];
$('#t3R').innerHTML = T3.map(([ic, n, t], i) => `<div class="sws" id="t3${i}" style="left:${36 + i * 286}px;width:270px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
// L
const ING = [['wheat', 'Ragi', 'MILLET'], ['leaf', 'Jaggery', 'SWEETENER'], ['droplet', 'Ghee', 'BINDS IT'], ['package', 'Box', 'PACKING']];
$('#ingR').innerHTML = ING.map(([ic, t, n], i) => `<div class="ic2" id="in${i}" style="left:${36 + i * 173}px"><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div><div class="zn">${n}</div></div>`).join('');
$('#pZ').style.cssText += ';' + FACE('zoya');
$('#plR').innerHTML = T3.map(([ic, n, t], i) => `<div class="sws" id="pl${i}" style="left:${36 + i * 256}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
const FM = [['coin', 'STEP 1', 'Cost'], ['plus', 'STEP 2', 'Markup'], ['tag', 'RESULT', 'Price']];
$('#fmR').innerHTML = FM.map(([ic, n, t], i) => `<div class="fm3" id="fm${i}" style="left:${48 + i * 246}px;width:190px"><div class="zn" style="width:190px">${n}</div><div class="zi" style="left:75px">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt" style="width:190px">${t}</div></div>` +
  (i < 2 ? `<div class="dop" id="fo${i}" style="left:${246 + i * 246}px">${M.icon(i ? 'equal' : 'plus', 22, '#fff', 3)}</div>` : '')).join('');
$('#mkS').innerHTML = `${T(0, 20, 'WHAT THE CUSTOMER PAYS', { id: 'mkL0' })}
  <path id="mkBr" d="M2 64 V48 H686 V64" fill="none" stroke="#B8862F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  ${T(344, 36, 'PRICE', { a: 'middle', c: '#B8862F', fs: 16, id: 'mkL1' })}
  <rect id="mkC" x="0" y="84" width="0" height="120" rx="18" fill="#14213D"/>
  <rect id="mkM" x="464" y="84" width="0" height="120" rx="18" fill="#B8862F"/>
  ${T(232, 152, 'COST', { a: 'middle', c: '#FFFFFF', fs: 22, w: 700, id: 'mkT0' })}${T(574, 152, 'MARKUP', { a: 'middle', c: '#FFFFFF', fs: 22, w: 700, id: 'mkT1' })}
  <g id="mkX0">${T(232, 250, 'PAYS FOR MAKING IT', { a: 'middle', fs: 16 })}</g>
  <g id="mkX1">${T(574, 250, 'YOUR PROFIT', { a: 'middle', fs: 16, c: '#B8862F' })}</g>
  <g id="mkF"><rect x="0" y="300" width="688" height="120" rx="20" fill="#F5F1E8"/>
    ${T(32, 344, 'THE RULE', { fs: 15 })}${T(32, 390, 'Price = cost + markup', { fs: 34, w: 700, c: '#14213D', ls: 0 })}</g>`;
wrap($('#dfc'), 'dfOut', 784, 580);

/* M: the cost sheet. 1 rupee = 3 px; bar base y = 440. */
const ITEMS = [['Ingredients', 45, '#14213D'], ['Box and label', 15, '#3A4560'], ['Gas and electricity', 8, '#5B647A'], ['Delivery', 12, '#8790A6'], ['Markup, 50% of cost', 40, '#B8862F']];
const BASE = 440, PX = 3; let acc = 0;
const BLK = ITEMS.map(([n, v, c]) => { const y0 = BASE - (acc + v) * PX, h = v * PX; acc += v; return { n, v, c, y0, h, top: acc }; });
$('#stS').innerHTML = [0, 40, 80, 120].map(p => `<line x1="40" y1="${BASE - p * PX}" x2="688" y2="${BASE - p * PX}" stroke="${p ? '#EEE8DB' : '#E2DACB'}" stroke-width="2" ${p ? 'stroke-dasharray="6 8"' : ''}/>${T(0, BASE - p * PX + 5, '₹' + p, { fs: 15, ls: 0, c: '#B9B1A3' })}`).join('') +
  BLK.map((b, i) => `<rect id="sb${i}" x="72" y="${b.y0}" width="220" height="${b.h}" fill="${b.c}" ${i === 0 ? '' : ''}/>
    <g id="sl${i}"><line x1="300" y1="${b.y0 + b.h / 2}" x2="324" y2="${b.y0 + b.h / 2}" stroke="${b.c}" stroke-width="3"/>${T(336, b.y0 + b.h / 2 + 6, `₹${b.v} · ${b.n.toUpperCase()}`, { fs: 16, c: i === 4 ? '#B8862F' : '#3A4560' })}</g>`).join('') +
  `<g id="sTot"><rect id="sTotR" x="122" y="0" width="120" height="40" rx="20" fill="#14213D"/>${T(182, 27, '₹0', { a: 'middle', fs: 20, w: 700, c: '#FFFFFF', ls: 0, id: 'sTotT' })}</g>`;
const BR = [['Ingredients', '₹45', 0], ['Box and label', '₹15', 1], ['Gas and electricity', '₹8', 2], ['Delivery', '₹12', 3], ['Total cost', '₹80', -1], ['Markup, 50% of ₹80', '₹40', 4], ['Price', '₹120', -2]];
const BRY = [92, 144, 196, 248, 318, 370, 446];
$('#bRows').innerHTML = BR.map(([t, v, c], i) => `<div class="br" id="br${i}" style="top:${BRY[i]}px">` + (c >= 0 ? `<div class="bi" style="background:${ITEMS[c][2]}"></div>` : `<div class="bi" style="background:#F5F1E8;display:flex;align-items:center;justify-content:center">${M.icon(c === -1 ? 'coin' : 'tag', 24, C.gold, 2.4)}</div>`) +
  `<div class="bt" style="${c < 0 ? 'font-weight:700' : ''}">${t}</div><div class="bv" style="${c === 4 || c === -2 ? 'color:#B8862F' : ''}${c === -2 ? ';font-size:44px;top:-4px' : ''}">${v}</div></div>`).join('') +
  `<div class="bhr" id="bh0" style="top:304px"></div><div class="bhr" id="bh1" style="top:430px"></div>`;
$('#bOkI').innerHTML = M.icon('check', 20, '#fff', 3);

// P: competition
const px = p => 20 + (p - 90) * 10.8;
const RV = [['store', 'Laddoo box', 'A BAKERY', 100], ['package', 'Snack pack', 'A SUPERMARKET', 110], ['leaf', 'Millet bars', 'A HEALTH STORE', 130]];
$('#clS').innerHTML = `<rect id="cBand" x="${px(100)}" y="110" width="${px(130) - px(100)}" height="190" rx="16" fill="#F3EAD6"/>
  ${T((px(100) + px(130)) / 2, 100, "RIVALS' RANGE", { a: 'middle', c: '#B8862F', fs: 16, id: 'cBandL' })}
  <line x1="${px(90)}" y1="300" x2="${px(150)}" y2="300" stroke="#E2DACB" stroke-width="6" stroke-linecap="round"/>
  ${[90, 100, 110, 120, 130, 140, 150].map(p => T(px(p), 434, '₹' + p, { a: 'middle', fs: 15, ls: 0, c: '#B9B1A3' })).join('')}
  ${RV.map(([ic, , , p], i) => `<g transform="translate(${px(p)} 0)"><g id="cp${i}"><line x1="0" y1="${232 - i * 0}" x2="0" y2="300" stroke="#3A4560" stroke-width="3"/><circle cx="0" cy="204" r="30" fill="#3A4560"/><g transform="translate(-14 190)">${M.icon(ic, 28, '#fff', 2.2)}</g>${T(0, 158, '₹' + p, { a: 'middle', fs: 22, w: 700, c: '#14213D', ls: 0 })}<circle cx="0" cy="300" r="8" fill="#3A4560"/></g></g>`).join('')}
  <g transform="translate(${px(120)} 0)"><g id="cpL"><line x1="0" y1="300" x2="0" y2="344" stroke="#B8862F" stroke-width="3"/><circle cx="0" cy="300" r="10" fill="#B8862F"/><rect x="-104" y="344" width="208" height="44" rx="22" fill="#B8862F"/>${T(0, 373, 'LADDOO LAB ₹120', { a: 'middle', fs: 16, w: 700, c: '#FFFFFF', ls: 1.4 })}</g></g>`;
$('#crR').innerHTML = RV.concat([['laddoo', 'Laddoo Lab 6-pack', 'OUR PRICE', 120]]).map(([ic, t, s, p], i) => `<div class="rr" id="rr${i}" style="top:${92 + i * 112}px"><div class="bg"></div><div class="ri">${M.icon(ic, 28, i === 3 ? C.gold : C.ink, 2.2)}</div><div class="rt">${t}</div><div class="rs">${s}</div><div class="rv">₹${p}</div></div>`).join('');
// V: value survey (dot plot)
const ANS = [130, 150, 140, 120, 160, 140, 130, 150, 140, 140];   // sum 1400, average 140
const vx = p => 24 + (p - 110) * 10.66;
const stackN = {}; const DOT = ANS.map(p => { const k = stackN[p] = (stackN[p] || 0) + 1; return { p, x: vx(p), y: 330 - 26 - (k - 1) * 50 }; });
$('#vrS').innerHTML = `<line x1="${vx(110)}" y1="330" x2="${vx(170)}" y2="330" stroke="#E2DACB" stroke-width="4" stroke-linecap="round"/>
  ${[110, 120, 130, 140, 150, 160, 170].map(p => T(vx(p), 362, '₹' + p, { a: 'middle', fs: 15, ls: 0, c: '#B9B1A3' })).join('')}
  <line id="vAvg" x1="${vx(140)}" y1="104" x2="${vx(140)}" y2="330" stroke="#14213D" stroke-width="3" stroke-dasharray="8 8"/>
  <line id="vOur" x1="${vx(120)}" y1="104" x2="${vx(120)}" y2="330" stroke="#B8862F" stroke-width="3" stroke-dasharray="8 8"/>
  ${DOT.map((d, i) => `<g transform="translate(${d.x} ${d.y})"><g id="vd${i}"><circle r="22" fill="#3A4560"/><g transform="translate(-11 -11)">${M.icon('user', 22, '#fff', 2.4)}</g></g></g>`).join('')}
  ${T(vx(140) + 10, 96, 'AVERAGE ₹140', { fs: 16, w: 700, c: '#14213D', id: 'vAvgL' })}${T(vx(120) - 10, 96, 'OUR PRICE ₹120', { a: 'end', fs: 16, w: 700, c: '#B8862F', id: 'vOurL' })}
  <path id="vBr" d="M${vx(120)} 384 V396 H${vx(140)} V384" fill="none" stroke="#B8862F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  ${T((vx(120) + vx(140)) / 2, 428, 'A ₹20 GOOD DEAL', { a: 'middle', fs: 16, w: 700, c: '#B8862F', id: 'vBrL' })}`;
wrap($('#vl'), 'vlOut', 784, 580);
// F: floor and ceiling
const fy = p => 440 - (p - 60) * 3.6;
$('#flS').innerHTML = `<line x1="80" y1="${fy(60)}" x2="80" y2="${fy(160)}" stroke="#E2DACB" stroke-width="3"/>
  ${[60, 80, 100, 120, 140, 160].map(p => T(64, fy(p) + 5, '₹' + p, { a: 'end', fs: 15, ls: 0, c: '#B9B1A3' })).join('')}
  <rect id="fBand" x="100" y="${fy(130)}" width="560" height="${fy(100) - fy(130)}" rx="14" fill="#EEE8DB"/>
  ${T(120, fy(100) - 14, 'RIVALS · ₹100 TO ₹130', { fs: 15, c: '#3A4560', id: 'fBandL' })}
  <line id="fFl" x1="100" y1="${fy(80)}" x2="660" y2="${fy(80)}" stroke="#14213D" stroke-width="6" stroke-linecap="round"/>
  ${T(110, fy(80) - 14, 'FLOOR · COST ₹80', { fs: 16, w: 700, c: '#14213D', id: 'fFlL' })}
  <line id="fCe" x1="100" y1="${fy(140)}" x2="660" y2="${fy(140)}" stroke="#B8862F" stroke-width="6" stroke-linecap="round"/>
  ${T(110, fy(140) - 14, 'CEILING · VALUE ₹140', { fs: 16, w: 700, c: '#B8862F', id: 'fCeL' })}
  <g id="fOur"><line x1="100" y1="${fy(120)}" x2="500" y2="${fy(120)}" stroke="#B8862F" stroke-width="3" stroke-dasharray="8 8"/><rect x="510" y="${fy(120) - 22}" width="150" height="44" rx="22" fill="#B8862F"/>${T(585, fy(120) + 7, 'OUR ₹120', { a: 'middle', fs: 18, w: 700, c: '#FFFFFF', ls: 1.4 })}</g>`;
const TT = [['coin', 'Cost test', 'FLOOR ₹80 · BELOW ₹120'], ['users', 'Competition test', 'RIVALS ₹100 TO ₹130'], ['heart', 'Value test', 'CEILING ₹140 · ABOVE ₹120']];
$('#frR').innerHTML = TT.map(([ic, t, s], i) => `<div class="tt" id="tt${i}" style="top:${92 + i * 112}px"><div class="bg"></div><div class="ri">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="rt">${t}</div><div class="rs">${s}</div><div class="ok" id="to${i}">${M.icon('check', 26, '#fff', 3)}</div></div>`).join('');
$('#frStI').innerHTML = M.icon('check', 22, '#fff', 3);

// K: at work today
const KA = [
  ['coin', 'Cost-based', 'Cost plus a markup', '₹80 cost plus 50% gives ₹120', 'sofa', 'A furniture maker adds a markup to each table'],
  ['users', 'Competition-based', 'Price close to rivals', 'Rivals charge ₹100 to ₹130, so ₹120 fits', 'cup', 'Two tea stalls on one street charge alike'],
  ['heart', 'Value-based', 'Price by worth to the buyer', 'Parents feel a 6-pack is worth ₹140', 'plane', 'An airline charges more for extra legroom'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['THREE WAYS TO SET A PRICE', 'Three methods', 'Cost, rivals and value', null]].concat(KA.map((a, i) => [`METHOD 0${i + 1} / 03`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A TEA STALL TO AN AIRLINE</div><div class="pe"><i>${M.icon('layers', 34, C.gold, 2.2)}</i><span>Smart firms check all three</span></div>`) + `</div>`).join('');

// X: blind spots + the gap
const XB = [['coin', 'Cost-plus', 'LOOKS ONLY AT COSTS', 'Ignores the customer'], ['users', 'Copying rivals', 'LOOKS ONLY AT OTHERS', 'Race to the bottom'], ['heart', 'Value-based', 'LOOKS AT THE BUYER', 'Needs real research']];
$('#xbR').innerHTML = XB.map(([ic, t, s, c], i) => `<div class="rr" id="xb${i}" style="top:${96 + i * 140}px;height:112px"><div class="bg"></div><div class="ri" style="top:28px">${M.icon(ic, 28, C.ink, 2.2)}</div><div class="rt" style="top:22px">${t}</div><div class="rs" style="top:64px">${s}</div>
  <div class="xc" id="xc${i}" style="right:24px;top:32px;background:#F6E3DC;color:#B5482F">${M.icon('eyeOff', 22, C.red, 2.4)}<span>${c}</span></div></div>`).join('');
$('#gpS').innerHTML = `${T(0, 14, 'WHAT PARENTS FEEL IT IS WORTH')}<rect id="gp0" x="0" y="24" width="0" height="36" rx="10" fill="#3A4560"/>${T(572, 50, '₹140', { fs: 20, w: 700, c: '#3A4560', ls: 0, id: 'gp0L' })}
  ${T(0, 94, 'WHAT LADDOO LAB CHARGES')}<rect id="gp1" x="0" y="104" width="0" height="36" rx="10" fill="#B8862F"/>
  <rect id="gp2" x="480" y="104" width="80" height="36" rx="10" fill="#F3EAD6" stroke="#E9D9B5" stroke-width="2" stroke-dasharray="6 6"/>${T(572, 130, '₹20 GAP', { fs: 20, w: 700, c: '#B8862F', ls: 0, id: 'gp2L' })}
  ${T(240, 128, '₹120', { a: 'middle', fs: 20, w: 700, c: '#FFFFFF', ls: 0, id: 'gp1L' })}`;
$('#bb1I').innerHTML = M.icon('heart', 22, '#fff', 2.4); $('#factI').innerHTML = M.icon('tag', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
$('#xbR').innerHTML += `<div class="xc" id="xbFix" style="left:48px;top:506px;background:#14213D;color:#fff">${M.icon('layers', 22, C.gold2, 2.4)}<span>So check all three before you decide</span></div>`;
wrap($('#xb'), 'xbOut', 784, 580);

// quiz
const OPTS = ['Value-based', 'Cost-based', 'Competition-based', 'Penetration'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('coin', 44, C.gold2, 2.4);
// recap
const ROWS = [['coin', 'Cost-based: costs plus a markup', ['₹80 + 50% = ₹120']], ['users', 'Competition-based: close to rivals', ['Rivals ₹100 to ₹130']], ['heart', 'Value-based: what it is worth to buyers', ['Worth ₹140']]];
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
const tile = (el, on, ic) => {
  el.style.background = mix(C.paper, C.ink, on);
  el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
  setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = (160 + w * geo.es > 1760 - ex.offsetWidth - 32) ? '222px' : '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#qp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  document.querySelectorAll('.dtx').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(40 * 688 / el.offsetWidth) + 'px'; });
  const fsb = $('#frSt'); fsb.style.left = (48 + $('#frBig').offsetWidth + 28) + 'px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const kt = $('#fact .kt'); if (kt.offsetWidth > 556) kt.style.fontSize = Math.floor(28 * 556 / kt.offsetWidth) + 'px';
  const q1 = $('#qq1'); if (q1.offsetWidth > 1400) q1.style.fontSize = Math.floor(68 * 1400 / q1.offsetWidth) + 'px';
  let ofs = 40; OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) ofs = Math.min(ofs, Math.floor(40 * 312 / o.offsetWidth)); });
  OPTS.forEach((_, i) => { $('#o' + i + ' .ot').style.fontSize = ofs + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const swing = M.track(0, [[tMorph + 0.5, 0], [tWhere, -5], [tQp[0], 4], [tQp[1], -3], [tQp[2], 0]], M.SOFT);

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
  const exOn = t < tKout + 1 ? [tM1 + 0.4, tFout] : [tX3 + 0.2, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: where does ₹120 come from ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hpP'), t, tMorph + 0.35, 1e9, { dy: 30, sp: M.SOFT });
    M.vis($('#hpT'), t, tMorph + 0.6, 1e9, { dy: -30, sp: M.SOFT });
    attr($('#hpTr'), 'transform', `rotate(${swing(t).toFixed(3)})`);
    M.vis($('#hpQ'), t, tWhere, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.vis($('#hpL'), t, tMorph + 0.9, 1e9, { dy: 8 });
    M.vis($('#q3'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.rise($('#q3T'), t, tWhere - 0.05, { st: 0.07, sp: M.HEAVY });
    for (let i = 0; i < 3; i++) M.vis($('#qp' + i), t, tQp[i] - 0.1, 1e9, POP);
    M.vis($('#t3'), t, tC2 - 0.1, tAout, { dy: 36, ...o });
    T3.forEach((_, i) => { const el = $('#t3' + i); M.vis(el, t, tT3[i] - 0.05, 1e9, POP); tile(el, M.io((t - tT3[i]) / 0.25) * (i < 2 ? 1 - M.io((t - tT3[i + 1]) / 0.25) : 1), T3[i][0]); });
  }

  /* ===== L: Nani's kitchen ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#ing'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    ING.forEach((_, i) => {
      const el = $('#in' + i); M.vis(el, t, tIng[i] - 0.1, 1e9, POP);
      const on = M.io((t - tIng[i]) / 0.25) * (i < 3 ? 1 - M.io((t - tIng[i + 1]) / 0.25) : 1 - M.io((t - tL3) / 0.3));
      el.style.background = mix(C.paper, C.ink, on); el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), ING[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis($('#pln'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    M.vis($('#pZ'), t, tL3 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    T3.forEach((_, i) => { const el = $('#pl' + i); M.vis(el, t, tThree - 0.2 + i * 0.15, 1e9, POP); tile(el, 0, T3[i][0]); });
  }

  /* ===== D: cost-plus ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    const df = $('#dfc'); M.vis(df, t, tD1 + 0.05, tDout, { dy: 36, ...o }); grow(df, $('#dfOut'), t, tMk2);
    M.vis($('#cpP'), t, tAlso - 0.05, 1e9, POP);
    FM.forEach((_, i) => {
      const el = $('#fm' + i), ta = [tD1 + 0.5, tD1 + 0.9, tD1 + 1.3][i]; M.vis(el, t, ta - 0.1, 1e9, POP);
      if (i < 2) M.vis($('#fo' + i), t, ta + 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
      el.style.background = i === 2 ? mix(C.paper, C.ink, M.io((t - ta - 0.2) / 0.3)) : C.paper;
      el.querySelector('.zt').style.color = i === 2 ? mix(C.ink, '#fff', M.io((t - ta - 0.2) / 0.3)) : C.ink;
    });
    M.vis($('#dfHr'), t, tD2 + 0.3, 1e9, { dy: 0 });
    M.rise($('#dt0'), t, tD2 + 0.35, { st: 0.05, sp: M.HEAVY }); M.rise($('#dt1'), t, tMk - 0.3, { st: 0.05, sp: M.HEAVY });
    M.vis($('#dt2'), t, tMk2 + 0.2, 1e9, { dy: 8 });
    M.vis($('#mk'), t, tMk2 + 0.05, tDout, { dx: 60, dy: 0, ...o });
    attr($('#mkC'), 'width', (450 * M.o3((t - tMk2 - 0.3) / 0.5)).toFixed(1));
    attr($('#mkM'), 'width', (224 * M.o3((t - tTop + 0.1) / 0.5)).toFixed(1));
    M.vis($('#mkT0'), t, tMk2 + 0.6, 1e9, { dy: 6 }); M.vis($('#mkT1'), t, tTop + 0.3, 1e9, { dy: 6 });
    M.vis($('#mkX0'), t, tMk2 + 0.7, 1e9, { dy: 8 }); M.vis($('#mkX1'), t, tProf - 0.1, 1e9, { dy: 8 });
    M.draw($('#mkBr'), t, tProf, 0.5, M.o3); M.vis($('#mkL0'), t, tProf + 0.2, 1e9, { dy: 6 }); M.vis($('#mkL1'), t, tProf + 0.3, 1e9, { dy: 6 });
    M.vis($('#mkF'), t, tProf + 0.5, 1e9, { dy: 16 });
  }

  /* ===== M: the cost sheet ===== */
  const mOn = t >= tM1 - 0.1 && t < tP1 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#stk'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#bill'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    const tb = [tRow[0], tRow[1], tRow[2], tRow[3], tRow[5]];
    let top = 0;
    BLK.forEach((b, i) => {
      const u = M.o3((t - tb[i] + 0.1) / 0.45), h = b.h * u, y = BASE - (b.top - b.v) * PX - h;
      attr($('#sb' + i), 'height', h.toFixed(1)); attr($('#sb' + i), 'y', y.toFixed(1)); M.hide($('#sb' + i), u <= 0);
      M.vis($('#sl' + i), t, tb[i] + 0.2, 1e9, { dx: -10, dy: 0 });
      top += b.v * u;
    });
    const tot = $('#sTot'); M.vis(tot, t, tRow[0] - 0.1, 1e9, { dy: 0, fade: 0.15 });
    attr(tot, 'transform', `translate(0 ${(BASE - top * PX - 52).toFixed(1)})`);
    M.setT($('#sTotT'), '₹' + Math.round(top));
    attr($('#sTotR'), 'fill', t > tRow[6] ? C.gold : C.ink);
    BR.forEach((_, i) => M.vis($('#br' + i), t, tRow[i] - 0.05, 1e9, { dx: 16, dy: 0 }));
    M.vis($('#bh0'), t, tRow[4] - 0.2, 1e9, { dy: 0 }); M.vis($('#bh1'), t, tRow[6] - 0.2, 1e9, { dy: 0 });
    M.vis($('#bOk'), t, tYes - 0.1, 1e9, POP);
    void tPct;
  }

  /* ===== P: competition ===== */
  const pOn = t >= tP1 - 0.1 && t < tV1 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#cl'), t, tP1 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#cr'), t, tP1 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    M.vis($('#clS'), t, tP1 + 0.4, 1e9, { dy: 16 });
    for (let i = 0; i < 3; i++) { M.vis($('#cp' + i), t, tRv[i] - 0.05, 1e9, { dy: -20, sp: M.POP, fade: 0.1 }); M.vis($('#rr' + i), t, tRv[i] - 0.1, 1e9, { dx: 16, dy: 0 }); }
    $('#cBand').style.opacity = M.clamp((t - tBand) / 0.3).toFixed(3); $('#cBandL').style.opacity = M.clamp((t - tBand - 0.1) / 0.3).toFixed(3);
    M.vis($('#cpL'), t, tFits - 0.6, 1e9, { dy: 20, sp: M.POP, fade: 0.1 });
    const r3 = $('#rr3'); M.vis(r3, t, tFits - 0.6, 1e9, { dx: 16, dy: 0 });
    const on = M.io((t - tFits) / 0.3);
    r3.querySelector('.bg').style.background = mix(C.paper, C.ink, on); r3.querySelector('.rt').style.color = mix(C.ink, '#fff', on);
    r3.querySelector('.rv').style.color = mix(C.ink, C.gold2, on); r3.querySelector('.rs').style.color = mix(C.muted, C.gold2, on);
  }

  /* ===== V: value ===== */
  const vOn = t >= tV1 - 0.1 && t < tT + 0.1; M.hide($('#sV'), !vOn);
  if (vOn) {
    const o = { outDur: 0.3, ody: -16 };
    const vl = $('#vl'); M.vis(vl, t, tV1 + 0.1, tVout, { dy: 36, ...o }); grow(vl, $('#vlOut'), t, tV2);
    M.vis($('#vlImg'), t, tV1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#vr'), t, tV2 + 0.12, tVout, { dx: 60, dy: 0, ...o });
    const t0d = tAsks + 0.6, t1d = T1('V3') - 0.2;
    DOT.forEach((_, i) => M.vis($('#vd' + i), t, t0d + i * (t1d - t0d) / 9, 1e9, { dy: -30, sp: M.POP, fade: 0.08 }));
    M.draw($('#vAvg'), t, tAvg - 0.1, 0.4, M.o3); M.vis($('#vAvgL'), t, tAvg + 0.1, 1e9, { dy: 6 });
    M.draw($('#vOur'), t, tDeal - 1.0, 0.4, M.o3); M.vis($('#vOurL'), t, tDeal - 0.8, 1e9, { dy: 6 });
    M.draw($('#vBr'), t, tDeal - 0.2, 0.4, M.o3); M.vis($('#vBrL'), t, tDeal, 1e9, { dy: 6 });
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

  /* ===== F: floor and ceiling ===== */
  const fOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fl'), t, tF1 + 0.05, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#fr'), t, tF1 + 0.2, tFout, { dx: 60, dy: 0, ...o });
    M.vis($('#flS'), t, tF1 + 0.35, 1e9, { dy: 16 });
    M.draw($('#fFl'), t, tCostsF - 0.1, 0.5, M.o3); M.vis($('#fFlL'), t, tFloor - 0.1, 1e9, { dy: 6 });
    M.draw($('#fCe'), t, tCustF - 0.1, 0.5, M.o3); M.vis($('#fCeL'), t, tCeil - 0.1, 1e9, { dy: 6 });
    $('#fBand').style.opacity = M.clamp((t - tRivF) / 0.3).toFixed(3); M.vis($('#fBandL'), t, tRivF + 0.2, 1e9, { dy: 6 });
    M.vis($('#fOur'), t, tF4 + 0.1, 1e9, { dx: -20, dy: 0 });
    const tr = [tCostsF, tRivF, tCustF];
    TT.forEach((_, i) => { M.vis($('#tt' + i), t, tr[i] - 0.05, 1e9, { dx: 16, dy: 0 }); M.vis($('#to' + i), t, tPass + i * 0.2, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); });
    M.vis($('#frBig'), t, tPass + 0.3, 1e9, { dy: 16 });
    M.vis($('#frSt'), t, tStays - 0.05, 1e9, POP);
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
    const xb = $('#xb'); M.vis(xb, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xb, $('#xbOut'), t, tX3);
    XB.forEach((_, i) => { M.vis($('#xb' + i), t, tX1 + 0.4 + i * 0.1, 1e9, { dy: 14 }); M.vis($('#xc' + i), t, tBs[i] - 0.1, 1e9, POP); });
    M.vis($('#xbFix'), t, tBs[2] + 0.9, 1e9, POP);
    M.vis($('#xw'), t, tX3 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, tDev - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tZoya ? C.redBg : C.paper; $('#bb0').style.color = t > tZoya ? C.red : C.ink;
    M.vis($('#xr1'), t, tZoya - 0.05, 1e9, { dx: 24, dy: 0 });
    M.vis($('#gpS'), t, tDev + 0.6, 1e9, { dy: 16 });
    attr($('#gp0'), 'width', (560 * M.o3((t - tDev - 0.8) / 0.5)).toFixed(1)); M.vis($('#gp0L'), t, tDev + 1.2, 1e9, { dy: 0, fade: 0.2 });
    attr($('#gp1'), 'width', (480 * M.o3((t - tGap + 0.4) / 0.5)).toFixed(1)); M.vis($('#gp1L'), t, tGap, 1e9, { dy: 0, fade: 0.2 });
    const gu = M.clamp((t - tGap - 0.1) / 0.2); $('#gp2').style.opacity = gu.toFixed(3); $('#gp2L').style.opacity = gu.toFixed(3);
    M.vis($('#fact'), t, tMrp - 0.1, 1e9, { dy: 16 });
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
