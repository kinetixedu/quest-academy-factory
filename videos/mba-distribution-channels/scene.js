// MBA - Marketing Management, Ep 26: Distribution Channels (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  warehouse: ['M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z', 'M6 18h12', 'M6 14h12', 'M6 10h12'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  eyeOff: ['M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49', 'M14.084 14.158a3 3 0 0 1-4.242-4.242', 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143', 'm2 2 20 20'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tTired = wt('H2', 'tired'), tMany = wt('H2', 'many');
const tC2 = T0('C2'), tNeeds = wt('C2', 'needs');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tYes = wt('L3', 'yes'), tWithin = wt('L3', 'Within'), tTen = wt('L3', 'ten');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M1') - 0.32;
const tKqL = wt('D2', 'set') + 0.2, tHl = [wt('D2', 'connected'), wt('D2', 'available'), wt('D2', 'customer')], tInt = wt('D3', 'intermediaries'), tWh = wt('D3', 'wholesalers'), tPath = wt('D4', 'path');
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tMout = T0('T1') - 0.32;
const tVis = wt('M2', 'visits'), tTenM = wt('M3', 'ten');
// statement + levels
const tT = T0('T1'), tSt2 = wt('T1', 'where'), tV0 = T0('V0'), tTu = tV0 - 0.32;
const tV = [1, 2, 3, 4].map(i => T0('V' + i)), tVout = T0('G1') - 0.32;
// G
const tG1 = T0('G1'), tG2 = T0('G2'), tG3 = T0('G3'), tGout = T0('K0') - 0.32, tSup = wt('G1', 'supermarket'), tOnl = wt('G2', 'online'), tMulti = wt('G3', 'multichannel'), tThreeW = wt('G3', 'three');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bakery'), wt('K2', 'phone'), wt('K3', 'soap'), wt('K4', 'bank')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'reach'), wt('X2', 'save')], tXh = [wt('X3', 'margin'), wt('X3', 'control')];
const tTwF = wt('X4', 'twenty'), tNin = wt('X5', 'ninety'), tCostX = wt('X5', 'eighty'), tShelf = wt('X6', 'shelf');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'One', 1);
const tS = T0('S1'), tRw = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'customer')], [wt('S3', 'trips')], [wt('S4', 'multichannel')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" ${o.a ? `text-anchor="${o.a}"` : ''} ${o.id ? `id="${o.id}"` : ''} font-family="Poppins" font-weight="${o.w || 600}" font-size="${o.fs || 15}" ${o.ls !== 0 ? `letter-spacing="${o.ls || 2.2}"` : ''} fill="${o.c || '#8A8274'}">${s}</text>`;
const node = (r, ic, col, s = 1.1) => `<circle r="${r}" fill="${col}"/><g transform="translate(${-r * s / 2} ${-r * s / 2})">${M.icon(ic, r * s, '#fff', 2.2)}</g>`;

// A
$('#hgrid').innerHTML = Array.from({ length: 30 }, (_, i) => `<div class="hd" id="hd${i}" style="left:${36 + (i % 15) * 56}px;top:${80 + Math.floor(i / 15) * 46}px"></div>`).join('');
$('#cDel').style.top = '188px'; $('#cClk').style.top = '188px';
$('#cDelI').innerHTML = M.icon('check', 24, C.gold, 2.6); $('#cClkI').innerHTML = M.icon('clock', 24, C.red, 2.4);
$('#cClk').style.background = C.redBg; $('#cClk').style.color = C.red;
$('#wgrid').innerHTML = Array.from({ length: 60 }, (_, i) => `<div class="wd" id="wd${i}" style="left:${36 + (i % 30) * 28.4}px;top:${80 + Math.floor(i / 30) * 30}px"></div>`).join('');
// L
$('#pr1I').innerHTML = M.icon('store', 30, '#fff', 2.2); $('#pb1I').innerHTML = M.icon('check', 22, '#fff', 3);
$('#stR').innerHTML = Array.from({ length: 10 }, (_, i) => `<div class="st" id="sto${i}" style="left:${36 + i * 72}px">${M.icon('store', 28, C.gold, 2.2)}</div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
const IM = [['laddoo', 'MAKER', 'Laddoo Lab'], ['warehouse', 'MIDDLE', 'Wholesaler'], ['store', 'MIDDLE', 'Retailer'], ['user', 'CUSTOMER', 'You']];
$('#imR').innerHTML = IM.map(([ic, n, t], i) => `<div class="sws" id="im${i}" style="left:${36 + i * 190}px;width:140px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>` +
  (i < 3 ? `<div class="ar" id="ia${i}" style="left:${181 + i * 190}px">${M.icon('arrowR', 22, C.gold, 2.6)}</div>` : '')).join('');
$('#swS').innerHTML = `<path id="swP" d="M110 90 C 260 10, 450 170, 602 90" fill="none" stroke="#D9CFBC" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
  <g transform="translate(60 90)"><g id="swA">${node(42, 'laddoo', '#B8862F')}</g></g><g transform="translate(652 90)"><g id="swB">${node(42, 'home', '#14213D')}</g></g>
  ${T(60, 168, 'THE MAKER', { a: 'middle', fs: 15, id: 'swL0' })}${T(652, 168, 'YOU', { a: 'middle', fs: 15, id: 'swL1' })}
  <g id="swDot"><circle r="14" fill="#B8862F" stroke="#FFFFFF" stroke-width="3"/></g>`;
wrap($('#kq'), 'kqOut', 784, 580);

/* M: counting trips. Plan coords inside a 688 x 250 svg. */
const KX = 344, KY = 125;
const HOMES = Array.from({ length: 30 }, (_, i) => { const a = -Math.PI / 2 + i / 30 * Math.PI * 2; return [KX + 300 * Math.cos(a), KY + 98 * Math.sin(a)]; });
const STORES = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + (i + 0.5) / 10 * Math.PI * 2; return [KX + 205 * Math.cos(a), KY + 68 * Math.sin(a), a]; });
const FAM = []; STORES.forEach(([, , a], j) => [-0.11, 0, 0.11].forEach(d => FAM.push([KX + 312 * Math.cos(a + d), KY + 106 * Math.sin(a + d), j])));
const avG = (id, face) => `<g id="${id}" transform="translate(${KX} ${KY})"><circle r="22" fill="#14213D"/><image href="${IMG}ll-${face}-face.jpg" x="-19" y="-19" width="38" height="38" clip-path="url(#avc19)"/></g>`;
const head = (k, name) => `<div class="mav" style="${FACE('arjun')}"></div><div class="lbl mlb">${name}</div><div class="serif mrd" id="rd${k}">0 trips</div>`;
const tail = k => `<div class="mbar" id="bar${k}"><i id="sg${k}0"></i></div>
    <div class="mtk" id="tk0${k}" style="left:48px">0</div><div class="mtk" id="tk1${k}" style="right:48px">30 TRIPS</div>
    <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
const kitchen = `<g transform="translate(${KX} ${KY})"><circle r="26" fill="#B8862F"/><g transform="translate(-13 -13)">${M.icon('laddoo', 26, '#fff', 2.2)}</g></g>`;
$('#mLIn').innerHTML = head('L', 'WITHOUT STORES') + `
    <svg class="mplan" id="planL" width="688" height="250"><defs><clipPath id="avc19"><circle r="19"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${HOMES.map((h, i) => `<line id="spL${i}" x1="${KX}" y1="${KY}" x2="${h[0].toFixed(1)}" y2="${h[1].toFixed(1)}" stroke="#3A4560" stroke-width="2" opacity="0.5"/>`).join('')}
      ${HOMES.map((h, i) => `<circle id="hmL${i}" cx="${h[0].toFixed(1)}" cy="${h[1].toFixed(1)}" r="9" fill="#E2DACB"/>`).join('')}
      ${kitchen}${avG('avL', 'arjun')}
    </svg>` + tail('L');
$('#mRIn').innerHTML = head('R', 'WITH 10 STORES') + `
    <svg class="mplan" id="planR" width="688" height="250">
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${FAM.map((f, i) => `<line id="flR${i}" x1="${STORES[f[2]][0].toFixed(1)}" y1="${STORES[f[2]][1].toFixed(1)}" x2="${f[0].toFixed(1)}" y2="${f[1].toFixed(1)}" stroke="#B8862F" stroke-width="2"/>`).join('')}
      ${STORES.map((s, i) => `<line id="spR${i}" x1="${KX}" y1="${KY}" x2="${s[0].toFixed(1)}" y2="${s[1].toFixed(1)}" stroke="#3A4560" stroke-width="2.5" opacity="0.6"/>`).join('')}
      ${FAM.map((f, i) => `<circle id="fmR${i}" cx="${f[0].toFixed(1)}" cy="${f[1].toFixed(1)}" r="7" fill="#B8862F"/>`).join('')}
      ${STORES.map((s, i) => `<g transform="translate(${s[0].toFixed(1)} ${s[1].toFixed(1)})"><g id="stR${i}"><rect x="-17" y="-17" width="34" height="34" rx="9" fill="#FFFFFF" stroke="#3A4560" stroke-width="2"/><g transform="translate(-10 -10)">${M.icon('store', 20, C.ink, 2.2)}</g></g></g>`).join('')}
      ${kitchen}${avG('avR', 'arjun')}
    </svg>` + tail('R');
$('#gLeftI').innerHTML = M.icon('clock', 22, C.red, 2.4);
wrap($('#mL'), 'mLOut', 784, 580);
const tpL = HOMES.map((_, i) => tVis + i * (tM3 - 0.4 - tVis) / 30);
const tpR = STORES.map((_, i) => tTenM + i * (T1('M3') - tTenM) / 10);

// V: channel levels (Kotler and Armstrong)
const LV = [['ZERO LEVEL', 'ARJUN AT YOUR DOOR', []], ['ONE LEVEL', 'THE 10 LOCAL STORES', ['R']], ['TWO LEVELS', 'MANY PACKAGED SNACKS', ['W', 'R']], ['THREE LEVELS', 'VERY SMALL SHOPS', ['W', 'J', 'R']]];
const ND = { MK: ['laddoo', 'MAKER', '#B8862F'], W: ['warehouse', 'WHOLESALER', '#3A4560'], J: ['truck', 'JOBBER', '#3A4560'], R: ['store', 'RETAILER', '#3A4560'], CU: ['user', 'CUSTOMER', '#14213D'] };
$('#lvS').innerHTML = LV.map(([n, ex, mids], i) => {
  const cy = 130 + i * 118, seq = ['MK', ...mids, 'CU'], xs = seq.map((_, j) => 460 + j * (1040 / (seq.length - 1)));
  return `<g id="lr${i}"><rect id="lb${i}" x="24" y="${cy - 54}" width="1552" height="108" rx="20" fill="#F5F1E8"/>
    ${T(56, cy + 2, n, { fs: 26, w: 700, c: '#14213D', ls: 0, id: 'ln' + i })}${T(56, cy + 32, ex, { fs: 15, id: 'le' + i })}
    ${xs.slice(0, -1).map((x, j) => `<path d="M${x + 44} ${cy - 8} H${xs[j + 1] - 50} M${xs[j + 1] - 62} ${cy - 20} L${xs[j + 1] - 48} ${cy - 8} L${xs[j + 1] - 62} ${cy + 4}" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
    ${seq.map((s, j) => `<g transform="translate(${xs[j]} ${cy - 8})">${node(30, ND[s][0], ND[s][2])}</g>${T(xs[j], cy + 42, ND[s][1], { a: 'middle', fs: 14 })}`).join('')}</g>`;
}).join('');

// G: Laddoo Lab's channels
const GN = [['store', '10 LOCAL STORES', 110, 96, '#3A4560'], ['building', 'SUPERMARKET CHAIN', 578, 96, '#3A4560'], ['phone', 'ONLINE SHOP', 344, 392, '#14213D']];
$('#ghS').innerHTML = GN.map(([, , x, y], i) => `<path id="gs${i}" d="M344 235 L${x} ${y}" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-dasharray="3 14"/>`).join('') +
  `<g transform="translate(344 235)"><g id="gHub">${node(58, 'laddoo', '#B8862F', 1)}</g></g>` +
  GN.map(([ic, l, x, y, col], i) => `<g transform="translate(${x} ${y})"><g id="gn${i}">${node(44, ic, col)}</g></g>${T(x, y + 72, l, { a: 'middle', fs: 15, c: '#14213D', id: 'gl' + i })}`).join('') +
  T(344, 322, 'LADDOO LAB', { a: 'middle', fs: 15, c: '#B8862F', id: 'gHl' });
const GR = [['store', '10 local stores', 'NEAR SCHOOLS AND HOMES', 'ONE LEVEL'], ['building', 'A supermarket chain', 'STORES ACROSS THE CITY', 'ONE LEVEL'], ['phone', 'Its own online shop', 'BUILT BY DEV · ORDER FROM HOME', 'ZERO LEVEL']];
$('#gmR').innerHTML = GR.map(([ic, t, s, v], i) => `<div class="rr" id="gr${i}" style="top:${92 + i * 112}px"><div class="bg"></div><div class="ri">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="rt">${t}</div><div class="rs">${s}</div><div class="rv">${v}</div></div>`).join('');

// K
const KA = [
  ['home', 'Zero level', 'The maker sells to you directly', 'Arjun at your door, and the online shop', 'store', 'A bakery sells from its own counter'],
  ['store', 'One level', 'One retailer in between', 'The 10 local stores and the supermarket', 'phone', 'A phone maker sells through electronics stores'],
  ['warehouse', 'Two levels', 'A wholesaler, then a retailer', 'Far-off towns, maybe one day', 'package', 'A soap maker sells to wholesalers for small shops'],
  ['layers', 'Multichannel', 'Two or more channels at once', 'Stores, a supermarket and an online shop', 'bank', 'A bank serves you at branches, on an app and at ATMs'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 116}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['CHANNELS EVERYWHERE', 'Four patterns', 'Paths from the maker to you', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A BAKERY TO A BANK</div><div class="pe"><i>${M.icon('map', 34, C.gold, 2.2)}</i><span>Every business picks its paths</span></div>`) + `</div>`).join('');

// X
const XG = [['users', 'Reach more people'], ['store', 'Stock kept nearby']];
const XH = [['coin', 'They keep a margin'], ['eyeOff', 'Less control']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const MX = 640 / 120;
$('#mgS').innerHTML = `${T(0, 14, 'SHELF PRICE OF A 6-PACK · ₹120')}
  <rect x="0" y="34" width="640" height="64" rx="14" fill="#EEE8DB"/>
  <rect id="mg0" x="0" y="34" width="0" height="64" rx="14" fill="#B8862F"/>
  <rect id="mg1" x="${96 * MX}" y="34" width="${24 * MX}" height="64" rx="14" fill="#14213D"/>
  ${T(24, 74, '₹96 · LADDOO LAB', { fs: 20, w: 700, c: '#FFFFFF', ls: 1, id: 'mgL0' })}${T(108 * MX, 74, '₹24', { a: 'middle', fs: 20, w: 700, c: '#FFFFFF', ls: 0, id: 'mgL1' })}
  ${T(108 * MX, 126, 'STORE · 20%', { a: 'middle', fs: 14, c: '#14213D', id: 'mgL2' })}
  <g id="mgC"><line x1="${80 * MX}" y1="24" x2="${80 * MX}" y2="108" stroke="#B5482F" stroke-width="3" stroke-dasharray="6 5"/>${T(80 * MX, 134, 'COST ₹80', { a: 'middle', fs: 14, w: 700, c: '#B5482F' })}</g>
  ${T(0, 170, 'LADDOO LAB STILL EARNS ABOVE ITS COST', { fs: 14, id: 'mgL3', c: '#B8862F' })}`;
$('#bb0I').innerHTML = M.icon('shield', 22, '#fff', 2.4);
$('#wks').innerHTML = [1, 2, 3, 4].map(i => `<div class="wk" id="wk${i - 1}x" style="left:${48 + (i - 1) * 178}px"><div class="zn">WEEK ${i}</div><div class="zi"></div><div class="zt">Shelf checked</div></div>`).join('');
$('#bothI').innerHTML = M.icon('map', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Zero level', 'One level', 'Two levels', 'Three levels'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('store', 44, C.gold2, 2.4);
// recap
const ROWS = [['map', 'A channel: the path from maker to customer', ['Maker to you']], ['store', 'Middlemen cut trips, but keep a margin', ['30 trips down to 10']], ['layers', 'Levels: zero, one, two, three', ['Multichannel']]];
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
const tile = (el, on, ic) => {
  el.style.background = mix(C.paper, C.ink, on);
  el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
  setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
};
// trips: Arjun moves from target to target; each arrival lights a spoke
const trips = (k, t, pts, tp, spoke, dot) => {
  let n = 0, x = KX, y = KY;
  for (let i = 0; i < pts.length; i++) {
    const u = M.io((t - tp[i] + 0.3) / 0.3), from = i ? pts[i - 1] : [KX, KY];
    if (t >= tp[i] - 0.3) { x = M.lerp(from[0], pts[i][0], u); y = M.lerp(from[1], pts[i][1], u); }
    const on = t >= tp[i]; if (on) n++;
    const sp = $('#' + spoke + i); M.hide(sp, !on);
    if (dot) attr($('#' + dot + i), 'fill', on ? C.gold : C.line);
  }
  attr($('#av' + k), 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  M.setT($('#rd' + k), `${n} trip${n === 1 ? '' : 's'}`);
  const g = $('#sg' + k + '0'); g.style.left = '0px'; g.style.width = (688 * n / 30).toFixed(1) + 'px'; g.style.background = k === 'L' ? C.ink2 : C.gold;
  return n;
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const cc = $('#cClk'); cc.style.left = (884 - cc.offsetWidth) + 'px';
  const dq = $('#dq'); dq.style.width = 'auto'; if (dq.offsetWidth > 1560) dq.style.fontSize = Math.floor(88 * 1560 / dq.offsetWidth) + 'px'; dq.style.width = '1920px';
  document.querySelectorAll('#pit .bb').forEach(el => { if (el.offsetWidth > 620) el.style.fontSize = Math.floor(22 * 620 / el.offsetWidth) + 'px'; });
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  const gl = $('#gLeft'); gl.style.left = (392 - gl.offsetWidth / 2) + 'px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
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
  const exOn = t < tT ? [tM1 + 0.4, tMout] : [tX4 + 0.1, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: one brother, one city ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#rnd'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    let n = 0;
    for (let i = 0; i < 30; i++) {
      const el = $('#hd' + i), ta = tMorph + 0.6 + i * (tTired - 0.1 - tMorph - 0.6) / 30;
      M.vis(el, t, tMorph + 0.4 + i * 0.015, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
      const u = M.io((t - ta) / 0.2); el.style.background = mix(C.line, C.gold, u); if (u >= 0.5) n++;
    }
    M.vis($('#cDel'), t, tMorph + 0.6, 1e9, POP); M.setT($('#cDelN'), String(n));
    M.vis($('#cClk'), t, tTired - 0.05, 1e9, POP);
    M.vis($('#wai'), t, tMany - 0.4, tAout, { dy: 36, ...o });
    for (let i = 0; i < 60; i++) M.vis($('#wd' + i), t, tMany - 0.1 + i * 0.012, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
    M.rise($('#waiT'), t, tNeeds - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the first store ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#shopImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#pit'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#pr0'), t, tL2 + 0.4, 1e9, { dx: 24, dy: 0 }); M.vis($('#pr1'), t, tYes - 0.1, 1e9, { dx: 24, dy: 0 });
    M.vis($('#sts'), t, tWithin - 0.1, tLout, { dy: 36, ...o });
    let n = 0; for (let i = 0; i < 10; i++) { const ta = tTen - 0.2 + i * 0.12; M.vis($('#sto' + i), t, ta, 1e9, POP); if (t >= ta + 0.05) n++; }
    M.setT($('#stNn'), String(n)); M.rise($('#stN'), t, tWithin + 0.1, { st: 0.06, sp: M.HEAVY });
  }

  /* ===== D: what is a distribution channel ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY }); M.rise($('#kot2'), t, wt('D2', 'Armstrong') - 0.2, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'describe'), 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tKqL - 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tKqL + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tKqL - 0.3 - i * 0.6) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#imd'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    IM.forEach((_, i) => { const el = $('#im' + i); M.vis(el, t, tD3 + 0.3 + i * 0.1, 1e9, POP); if (i < 3) M.vis($('#ia' + i), t, tD3 + 0.4 + i * 0.1, 1e9, { dx: -10, dy: 0, fade: 0.15 }); tile(el, (i === 1 || i === 2) ? M.io((t - (i === 1 ? tInt : tWh + 0.3)) / 0.3) : 0, IM[i][0]); });
    M.vis($('#sw'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#swA'), t, tD4 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#swB'), t, tD4 + 0.45, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#swL0'), t, tD4 + 0.4, 1e9, { dy: 6 }); M.vis($('#swL1'), t, tD4 + 0.55, 1e9, { dy: 6 });
    const P = $('#swP'); M.vis(P, t, tD4 + 0.5, 1e9, { dy: 0, fade: 0.2 });
    const L = P.getTotalLength(), u = M.io((t - tPath) / 1.6), pt = P.getPointAtLength(L * u);
    const dt = $('#swDot'); attr(dt, 'transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`); dt.style.opacity = M.clamp((t - tPath + 0.2) / 0.2).toFixed(3);
  }

  /* ===== M: counting trips ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM1 + 0.25, tM3 - 0.05, { dx: 60, dy: 0, outDur: 0.25, ody: 0 });
    M.vis($('#mR'), t, tM3 + 0.2, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM1 + 0.3 : tM3 + 0.3, root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      M.vis($('#bar' + k), t, base + 0.35, 1e9, { dy: 10 });
      M.vis($('#tk0' + k), t, base + 0.4, 1e9, { dy: 8 }); M.vis($('#tk1' + k), t, base + 0.4, 1e9, { dy: 8 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    }
    const nL = trips('L', t, HOMES, tpL, 'spL', 'hmL');
    const nR = trips('R', t, STORES, tpR, 'spR', null);
    STORES.forEach((_, i) => M.vis($('#stR' + i), t, tM3 + 0.6 + i * 0.04, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }));
    FAM.forEach((_, i) => { M.vis($('#fmR' + i), t, tM4 + 0.1 + i * 0.03, 1e9, { dy: 0, fade: 0.1 }); M.draw($('#flR' + i), t, tM4 + 0.1 + i * 0.03, 0.3, M.o3); });
    if (nL >= 30) pill('L', 'clock', '30 trips', 'tired by noon', 1, 1);
    else if (t >= tM2) pill('L', 'home', 'One trip per family', '', 0, 0);
    else pill('L', 'message', 'Count the trips', '', 0, 0);
    if (t >= tM5) pill('R', 'check', 'Just 10 trips', 'and more families reached', 0, 1);
    else if (t >= tM4) pill('R', 'users', 'Families buy near home', '', 0, 0);
    else pill('R', 'store', 'One trip per store', '', 0, 0);
    void nR;
    M.vis($('#gv'), t, tM1 + 0.45, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.drawU($('#gArc'), nL / 30);
    M.vis($('#gN'), t, tM1 + 0.55, 1e9, { dy: 12 }); M.setT($('#gN'), String(nL));
    M.vis($('#gOf'), t, tM1 + 0.6, 1e9, { dy: 8 }); M.vis($('#gWay'), t, tM1 + 0.65, 1e9, { dy: 8 });
    M.vis($('#gLeft'), t, tVis, 1e9, POP);
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

  /* ===== V: channel levels ===== */
  const vOn = t >= tTu - 0.05 && t < tG1 + 0.2; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#lv'), t, tV0 + 0.05, tVout, { dy: 36, outDur: 0.3, ody: -16 });
    LV.forEach((_, i) => {
      M.vis($('#lr' + i), t, tV0 + 0.5 + i * 0.25, 1e9, { dx: -24, dy: 0 });
      const on = M.io((t - tV[i]) / 0.3), off = i < 3 ? M.io((t - tV[i + 1]) / 0.35) : 0, act = on * (1 - off);
      attr($('#lb' + i), 'fill', mix(C.paper, C.gold3, act));
      attr($('#ln' + i), 'fill', mix(C.ink, C.gold, act));
    });
  }

  /* ===== G: more channels ===== */
  const gOn = t >= tG1 - 0.1 && t < tK0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#gh'), t, tG1 + 0.05, tGout, { dx: -60, dy: 0, ...o });
    M.vis($('#gm'), t, tG1 + 0.2, tGout, { dx: 60, dy: 0, ...o });
    M.vis($('#gHub'), t, tG1 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#gHl'), t, tG1 + 0.4, 1e9, { dy: 6 });
    const tg = [tG1 + 0.5, tSup, tOnl];
    for (let i = 0; i < 3; i++) {
      const s = $('#gs' + i); M.vis(s, t, tg[i] + 0.1, 1e9, { dy: 0, fade: 0.2 }); s.style.strokeDashoffset = (-(t * 30) % 17).toFixed(1);
      M.vis($('#gn' + i), t, tg[i], 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#gl' + i), t, tg[i] + 0.15, 1e9, { dy: 6 });
      const r = $('#gr' + i); M.vis(r, t, tg[i] + 0.1, 1e9, { dx: 16, dy: 0 });
      const on = M.io((t - tThreeW - i * 0.25) / 0.3) * (1 - M.io((t - tMulti + 0.2) / 0.3));
      r.querySelector('.bg').style.background = mix(C.paper, C.gold3, on);
    }
    M.vis($('#gmD'), t, tMulti - 0.1, 1e9, { dy: 16 });
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POP);
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POP);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#mgS'), t, tX4 + 0.3, 1e9, { dy: 16 });
    const su = M.clamp((t - tTwF) / 0.25); $('#mg1').style.opacity = su.toFixed(3); $('#mgL1').style.opacity = su.toFixed(3); $('#mgL2').style.opacity = su.toFixed(3);
    attr($('#mg0'), 'width', (96 * MX * M.o3((t - tNin + 0.2) / 0.6)).toFixed(1)); M.vis($('#mgL0'), t, tNin + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#mgC'), t, tCostX - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#mgL3'), t, tCostX + 0.4, 1e9, { dy: 6 });
    M.vis($('#xr0'), t, tX6 - 0.05, 1e9, { dx: 24, dy: 0 });
    for (let i = 0; i < 4; i++) {
      const el = $('#wk' + i + 'x'), tl = tShelf + i * 0.35;
      M.vis(el, t, tX6 + 0.2 + i * 0.06, 1e9, { dy: 16 });
      const on = M.io((t - tl) / 0.25);
      el.style.background = mix(C.paper, C.ink, on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      el.querySelector('.zt').style.color = mix(C.paper, C.gold2, on);
      setIco(el.querySelector('.zi'), on > 0.5 ? 'check' : 'store', on > 0.5 ? C.gold2 : C.dim, 44, 2.2);
    }
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'How') - 0.05, { st: 0.06, sp: M.HEAVY });
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
