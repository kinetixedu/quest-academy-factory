// MBA - Marketing Management, Ep 16: Product Levels and Product Hierarchy (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', mid: '#C9A35A' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  list: ['m3 17 2 2 4-4', 'm3 7 2 2 4-4', 'M13 6h8', 'M13 12h8', 'M13 18h8'],
  bed: ['M2 4v16', 'M2 8h18a2 2 0 0 1 2 2v10', 'M2 17h20', 'M6 8v9'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
  leaf: ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12', 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tKit = wt('H1', 'kitchen'), tSame = wt('H1', 'same'), tH2 = T0('H2'), tStays = wt('H2', 'stays'), tH3 = T0('H3'), tMore = wt('H3', 'more');
const tL1 = T0('L1'), tDraws = wt('L1', 'draws'), tRings = wt('L1', 'rings'), tOnionW = wt('L1', 'onion'), tL2 = T0('L2'), tL3 = T0('L3');
const tHealthy = wt('L2', 'healthy'), tActually = wt('L2', 'actually');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tDout = T0('M1') - 0.32;
const tLev = wt('D3', 'Levitt'), tMake = wt('D3', 'make'), tAdd = wt('D3', 'add');
// M
const tM = [1, 2, 3, 4, 5, 6, 7].map(i => T0('M' + i)), tMout = T0('T1') - 0.32;
// statement + Y
const tT = T0('T1'), tSt2 = wt('T1', 'You'), tY1 = T0('Y1'), tTu = tY1 - 0.32;
const tY = [3, 4, 5, 6, 7, 8].map(i => T0('Y' + i)), tY2 = T0('Y2'), tYout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hotel'), wt('K2', 'Guests'), wt('K3', 'fast'), wt('K4', 'phone')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'apart'), wt('X2', 'loyalty')], tXh = [wt('X3', 'costs'), wt('X3', 'expectation')];
const tMonths = wt('X4', 'months'), tCompl = wt('X4', 'complain');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Extras');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tNx = T0('N1');
const tPill = [[wt('S2', 'core'), wt('S2', 'potential')], [wt('S3', 'copy')], [wt('S4', 'need'), wt('S4', 'item')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const T = (x, y, s, fill, txt, o = '') => `<text x="${x}" y="${y}" font-family="Poppins" font-weight="600" font-size="${s}" fill="${fill}" ${o}>${txt}</text>`;
// A
const HC = [['store', 'THE NEW KITCHEN', '₹120 for six'], ['laddoo', 'LADDOO LAB', '₹120 for six']];
$('#hRow').innerHTML = HC.map(([ic, n, t], i) => `<div class="cmp" id="hc${i}" style="left:${36 + i * 432}px"><i>${M.icon(ic, 30, C.gold, 2.2)}</i><div class="cn">${n}</div><div class="ct">${t}</div><div class="cs">${M.icon('laddoo', 18, C.gold, 2.4)}<span>Millet laddoos</span></div></div>`).join('') + `<div id="eqS">${M.icon('equal', 16, C.ink, 3)}</div>`;
$('#meth').innerHTML = `<div class="av face" id="raoB" style="${FACE('rao')}"></div><div class="stp" id="mt0" style="top:76px;left:112px;background:#B8862F;color:#fff">${M.icon('check', 24, '#fff', 3)}<span>She stays with Laddoo Lab</span></div>`;
// L
$('#mini').innerHTML = [80, 64, 48, 32, 16].map((r, i) => `<circle id="mc${i}" cx="96" cy="94" r="${r}" fill="${[C.gold3, C.gold2, C.mid, C.navy2, C.ink][i]}" stroke="#B8862F" stroke-width="2" ${i === 0 ? 'stroke-dasharray="5 5"' : ''}/>`).join('');
$('#cF').style.cssText += ';' + FACE('rao');
wrap($('#ill'), 'illOut', 784, 580);
// D
const D5 = [['Core benefit', 'What they really buy'], ['Basic product', 'The thing itself'], ['Expected product', 'What they take for granted'], ['Augmented product', 'Extras that beat rivals'], ['Potential product', 'What it could become']];
$('#dRows').innerHTML = D5.map(([t, m], i) => `<div class="d5" id="d5${i}" style="top:${92 + i * 86}px"><div class="bg"></div><div class="n">0${i + 1}</div><div class="t">${t}</div><div class="m">${m}</div></div>`).join('');
$('#lvI').innerHTML = M.icon('quote', 64, C.gold, 1.8);
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the onion (688 x 456 svg, centre 344,236) */
const OC = [344, 236], OR = [56, 98, 138, 176, 212];
const RING = [['CORE', C.ink, '#FFFFFF'], ['BASIC', C.mid, C.ink], ['EXPECTED', C.gold2, C.ink], ['AUGMENTED', C.gold3, C.ink], ['POTENTIAL', '#FFFFFF', C.gold]];
$('#onion').innerHTML = [4, 3, 2, 1, 0].map(i => {
  const [n, f, tc] = RING[i], r = OR[i], ly = i ? OC[1] - (OR[i - 1] + r) / 2 + 5 : OC[1] + 5;
  return `<g id="rg${i}"><circle class="rc" cx="${OC[0]}" cy="${OC[1]}" r="${r}" fill="${f}" stroke="${i === 4 ? C.gold : '#FFFFFF'}" stroke-width="${i === 4 ? 3 : 3}" ${i === 4 ? 'stroke-dasharray="8 8"' : ''}/>${T(OC[0], ly, 14, tc, n, 'text-anchor="middle" letter-spacing="2.4"')}</g>`;
}).join('') + `<g id="winT"><line x1="${OC[0] + 131}" y1="${OC[1] + 131}" x2="560" y2="412" stroke="#B8862F" stroke-width="3"/><rect x="536" y="398" width="148" height="40" rx="20" fill="#B8862F"/>${T(610, 424, 14, '#FFFFFF', 'WE WIN HERE', 'text-anchor="middle" letter-spacing="2"')}</g>`;
const OP = [
  ['THE SIX-PACK', 'Five rings', 'Built from the inside out', [['n', 'Inside: the core'], ['a', ''], ['g', 'Outside: the extras']], 'KOTLER', 'Each ring adds value', 'layers'],
  ['LEVEL 01 · CORE BENEFIT', 'A healthy treat', 'What she really buys', [['g', 'Healthy'], ['', 'Kids enjoy it']], 'AT THE CENTRE', 'The reason she buys at all', 'heart'],
  ['LEVEL 02 · BASIC PRODUCT', 'Six laddoos', 'The thing itself', [['', 'Ragi'], ['', 'Jaggery'], ['n', 'Six-pack']], 'THE BARE PRODUCT', 'What anyone could copy', 'laddoo'],
  ['LEVEL 03 · EXPECTED PRODUCT', 'Fresh and sealed', 'What every buyer takes for granted', [['', 'Fresh'], ['', 'Clean'], ['', 'Sealed'], ['', 'On time']], 'MISS ONE, AND', 'She is unhappy', 'x'],
  ['LEVEL 04 · AUGMENTED PRODUCT', 'Extras that win', 'What rivals do not give', [['g', 'Monday delivery'], ['g', 'Photo message'], ['g', "Nani's card"]], 'THIS IS WHERE', 'Laddoo Lab beats the new kitchen', 'star'],
  ['LEVEL 05 · POTENTIAL PRODUCT', 'A tiffin plan', 'What it could become one day', [['d', 'A new flavour every month']], 'NOT REAL YET', 'An idea for the future', 'bulb'],
  ['THE NEW KITCHEN', 'Same inner rings', 'Same core, same laddoo, same price', [['', 'Core'], ['', 'Basic'], ['', 'Expected'], ['d', 'No extras']], 'SO MRS. RAO', 'Stays with Laddoo Lab', 'heart'],
];
$('#oPans').innerHTML = OP.map(([s, t, m, c, xl, xt, xi], k) => `<div class="pn" id="op${k}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="lbl xl" style="left:48px;top:306px">${xl}</div>` +
  c.map(([cl, tx], j) => cl === 'a' ? `<svg class="rca" id="oc${k}${j}" width="40" height="24" style="position:absolute;top:372px"><path d="M4 12 H30 M22 4 L32 12 L22 20" fill="none" stroke="#B9B1A3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : `<div class="rc7 ${cl}" id="oc${k}${j}">${tx}</div>`).join('') +
  `<div class="ka xk" style="top:452px"><i>${M.icon(xi, 30, C.gold, 2.4)}</i><div class="kt" style="top:24px">${xt}</div></div></div>`).join('');
wrap($('#on'), 'onOut', 784, 580);

// Y: the hierarchy
const YH = [['Need family', 'Healthy eating'], ['Product family', 'Healthy snacks'], ['Product class', 'Sweet snacks'], ['Product line', "Laddoo Lab's laddoos"], ['Product type', 'Millet laddoos in packs'], ['Item', 'The ragi six-pack, ₹120']];
$('#yRows').innerHTML = YH.map(([t, e], i) => { const w = 720 - i * 48; return `<div class="hr6" id="yr${i}" style="top:${96 + i * 76}px;width:1504px"><div class="bar" style="width:${w}px"></div><div class="n">0${i + 1}</div><div class="t">${t}</div>` +
  `<svg class="ar" style="left:${w + 16}px" width="${800 - w - 32}" height="24"><path d="M2 12 H${800 - w - 46} M${800 - w - 54} 4 L${800 - w - 44} 12 L${800 - w - 54} 20" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${i === 5 ? 'none' : '2 9'}"/></svg><div class="e" style="left:812px">${e}</div></div>`; }).join('');
const LN = [['layers', 'BIG TO SMALL', 'Six steps', 'ONE PATH DOWN'], ['heart', 'STEP 01', 'Healthy eating', 'NEED FAMILY'], ['leaf', 'STEP 02', 'Healthy snacks', 'PRODUCT FAMILY'], ['star', 'STEP 03', 'Sweet snacks', 'PRODUCT CLASS'], ['laddoo', 'STEP 04', "Laddoo Lab's laddoos", 'PRODUCT LINE'], ['package', 'STEP 05', 'Millet laddoos, packed', 'PRODUCT TYPE'], ['tag', 'STEP 06', 'Ragi six-pack, ₹120', 'THE ITEM']];
$('#hyXI').innerHTML = M.icon('laddoo', 20, '#fff', 2.4);

// K
const KA = [
  ['heart', 'Core benefit', 'What they really buy', 'A healthy treat for the tiffin', 'bed', 'A hotel really sells rest and sleep'],
  ['check', 'Expected product', 'What they take for granted', 'Fresh, sealed and on time', 'bed', 'Guests expect a clean bed and fresh towels'],
  ['star', 'Augmented product', 'Extras that beat rivals', "Monday delivery and Nani's card", 'plane', 'A fast check-in and a free airport ride'],
  ['bulb', 'Potential product', 'What it could become', 'A monthly tiffin plan, one day', 'phone', "A phone maker plans next year's features"],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['PRODUCT LEVELS TODAY', 'Rings everywhere', 'From a hotel to a phone', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">SAME FIVE RINGS, ANY PRODUCT</div><div class="pe"><i>${M.icon('layers', 34, C.gold, 2.2)}</i><span>Core inside, extras outside</span></div>`) + `</div>`).join('');

// X
const XG = [['star', 'Sets you apart'], ['heart', 'Builds loyalty']];
const XH = [['coin', 'Extras cost money'], ['repeat', 'Extras become expected']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#mig').innerHTML = [[140, C.gold3, 'AUGMENTED', C.ink], [95, C.gold2, 'EXPECTED', C.ink], [50, C.ink, 'CORE', '#FFFFFF']].map(([r, f, n, tc], i) =>
  `<circle cx="150" cy="150" r="${r}" fill="${f}" stroke="#FFFFFF" stroke-width="3"/>${T(150, i === 2 ? 155 : 150 - r + 22, 12, tc, n, 'text-anchor="middle" letter-spacing="2"')}`).join('') +
  `<g id="mgc" transform="translate(150 46)"><rect x="-56" y="-16" width="112" height="32" rx="16" fill="#B8862F"/>${T(0, 5, 13, '#FFFFFF', 'PHOTO MSG', 'text-anchor="middle" letter-spacing="1.5"')}</g>`;
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Core benefit', 'Basic product', 'Expected product', 'Augmented product'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('star', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Five product levels', ['Core benefit', 'out to potential']], ['star', 'Win on what you add', ['Rivals copy the core']], ['list', 'The product hierarchy', ['A big need', 'down to one item']]];
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
const pop = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const migY = M.track(46, [[tMonths, 78]], M.SOFT);

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const at = $('#askT'); if (at.offsetWidth > 848) at.style.fontSize = Math.floor(64 * 848 / at.offsetWidth) + 'px';
  for (let i = 0; i < 3; i++) { const q = $('#lq' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(40 * 688 / q.offsetWidth) + 'px'; }
  OP.forEach(([, , , c], k) => {
    const pt = $('#op' + k + ' .pt'); if (pt.offsetWidth > 688) pt.style.fontSize = Math.floor(72 * 688 / pt.offsetWidth) + 'px';
    const pm = $('#op' + k + ' .pm'); if (pm.offsetWidth > 688) pm.style.fontSize = Math.floor(32 * 688 / pm.offsetWidth) + 'px';
    let x = 48; c.forEach(([cl], j) => { const el = $('#oc' + k + j); el.style.left = x + 'px'; x += (cl === 'a' ? 40 : el.offsetWidth) + (cl === 'a' ? 6 : 12); });
  });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
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
  M.hide($('#exChip'), true);

  /* ===== A: same price, she stays ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.vis($('#hc0'), t, tMorph + 0.5, 1e9, pop); M.vis($('#hc1'), t, tMorph + 0.75, 1e9, pop); M.vis($('#eqS'), t, tMorph + 1.0, 1e9, pop);
    M.vis($('#ask'), t, tStays - 0.4, tAout, { dy: 36, ...o });
    M.vis($('#raoB'), t, tStays - 0.2, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#mt0'), t, tStays, 1e9, pop);
    M.rise($('#askT'), t, tMore - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: rings like an onion ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tDraws);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#rcp'), t, tDraws + 0.12, tLout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 5; i++) { const c = $('#mc' + i); const u = M.clamp((t - tRings - (4 - i) * 0.12) / 0.2); attr(c, 'opacity', u.toFixed(3)); attr(c, 'visibility', u > 0 ? 'inherit' : 'hidden'); }
    M.rise($('#miniT'), t, tOnionW - 0.2, { st: 0.06, sp: M.HEAVY }); M.vis($('#miniS'), t, tOnionW + 0.3, 1e9, { dy: 10 });
    M.vis($('#team'), t, tL2 + 0.05, tLout, { dy: 36, ...o });
    M.vis($('#cF'), t, tL2 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#cq0'), t, tHealthy - 0.1, { st: 0.05, sp: M.HEAVY }); M.rise($('#cq1'), t, tActually - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#cS'), t, tActually + 0.5, 1e9, { dy: 8 });
  }

  /* ===== D: product levels ===== */
  const dOn = t >= tD1 - 0.1 && t < tM[0] + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    D5.forEach((_, i) => {
      const el = $('#d5' + i), ta = tD2 + 0.5 + i * 0.32; M.vis(el, t, ta, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.25) * (1 - M.io((t - ta - 0.6) / 0.3));
      el.querySelector('.bg').style.background = mix(C.paper, C.gold3, on);
    });
    M.vis($('#vc'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#lvI'), t, tD3 + 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    for (let i = 0; i < 3; i++) M.vis($('#lq' + i), t, tLev + 0.3 + i * 0.12, 1e9, { dy: 14 });
    $('#lk0').style.color = mix(C.ink, C.dim, M.io((t - tMake) / 0.3)); $('#lk1').style.color = mix(C.ink, C.gold, M.io((t - tAdd) / 0.3));
    M.vis($('#lvHr'), t, tD3 + 0.4, 1e9, { dy: 0 }); M.rise($('#lvN'), t, tLev - 0.1, { st: 0.06, sp: M.HEAVY }); M.vis($('#lvB'), t, tLev + 0.4, 1e9, { dy: 8 });
  }

  /* ===== M: build the onion ===== */
  const mOn = t >= tM[0] - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#on'), t, tM[0] + 0.05, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#onP'), t, tM[0] + 0.2, tMout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 5; i++) {
      const g = $('#rg' + i); M.vis(g, t, tM[i + 1] - 0.05, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.12 });
      const rc = g.querySelector('.rc'), act = M.io((t - tM[i + 1]) / 0.25) * (1 - M.io((t - tM[i + 2]) / 0.3));
      const win = i >= 3 ? M.io((t - tM[6]) / 0.3) : 0;
      attr(rc, 'stroke', i === 4 ? C.gold : mix('#FFFFFF', C.gold, Math.max(act, win))); attr(rc, 'stroke-width', (3 + 3 * Math.max(act, win)).toFixed(2));
    }
    M.vis($('#winT'), t, tM[6] + 0.3, 1e9, { dy: 0, fade: 0.2 });
    OP.forEach(([, , , c], k) => {
      const tin = k ? tM[k] : tM[0] + 0.4, tout = k < 6 ? tM[k + 1] - 0.14 : 1e9;
      const pn = $('#op' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.xl'), t, tin + 0.5, tout, { dy: 10, ...oo });
      c.forEach((_, j) => M.vis($('#oc' + k + j), t, tin + 0.6 + j * 0.25, tout, { ...pop, ...oo }));
      M.vis(pn.querySelector('.xk'), t, tin + 0.8 + c.length * 0.25, tout, { dy: 16, ...oo });
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

  /* ===== Y: the product hierarchy ===== */
  const yOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sY'), !yOn);
  if (yOn) {
    M.vis($('#hy'), t, tY1 + 0.02, tYout, { dy: 36, outDur: 0.3, ody: -16 });
    M.vis($('#hyX'), t, tY1 + 0.6, 1e9, pop);
    YH.forEach((_, i) => {
      const r = $('#yr' + i); M.vis(r.querySelector('.bar'), t, tY1 + 0.4 + i * 0.12, 1e9, { dx: -24, dy: 0 });
      M.vis(r.querySelector('.n'), t, tY2 + 0.4 + i * 0.12, 1e9, { dy: 8 }); M.vis(r.querySelector('.t'), t, tY2 + 0.45 + i * 0.12, 1e9, { dy: 8 });
      M.vis(r.querySelector('.ar'), t, tY[i] + 0.1, 1e9, { dx: -16, dy: 0, fade: 0.15 }); M.vis(r.querySelector('.e'), t, tY[i] + 0.25, 1e9, { dy: 10 });
      const on = M.io((t - tY[i]) / 0.3) * (1 - (i < 5 ? M.io((t - tY[i + 1]) / 0.3) : 0)), last = i === 5 ? M.io((t - tY[5]) / 0.3) : 0;
      r.querySelector('.bar').style.background = mix(mix(C.paper, C.ink, on), C.gold, last);
      r.querySelector('.t').style.color = mix(C.ink, '#fff', Math.max(on, last)); r.querySelector('.n').style.color = mix(C.gold, C.gold2, Math.max(on, last));
      r.querySelector('.e').style.color = i === 5 ? C.gold : C.ink;
    });
  }

  if (yOn) {
    M.vis($('#lens'), t, tY1 + 0.5, 1e9, { dx: 30, dy: 0 });
    let k = 0; for (let i = 0; i < 6; i++) if (t >= tY[i] - 0.05) k = i + 1;
    const [ic, st, tx, lb] = LN[k], tk = k ? tY[k - 1] : tY1 + 0.6;
    setIco($('#lnI'), ic, k === 6 ? '#fff' : C.gold, 52, 2);
    $('#lnI').style.background = k === 6 ? C.gold : '#fff';
    M.setT($('#lnS'), st); M.setT($('#lnT'), tx); M.setT($('#lnL'), lb);
    M.vis($('#lnI'), t, tk, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#lnT'), t, tk + 0.08, 1e9, { dy: 12 }); M.vis($('#lnL'), t, tk + 0.14, 1e9, { dy: 8 }); M.vis($('#lnS'), t, tk, 1e9, { dy: 8 });
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, pop);
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, pop);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#mig'), t, tX4 + 0.3, 1e9, { dy: 16, sp: M.SOFT });
    attr($('#mgc'), 'transform', `translate(150 ${migY(t).toFixed(1)})`);
    M.vis($('#mr0'), t, tX4 + 0.5, 1e9, { dx: 16, dy: 0 }); M.vis($('#mr1'), t, tCompl - 0.1, 1e9, { dx: 16, dy: 0 });
    M.vis($('#nB'), t, tX5 + 0.1, 1e9, { dy: 16 });
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
        const a = tp - 0.05, b = k < ps.length - 1 ? tPill[i][k + 1] - 0.05 : (i < 2 ? tRow[i + 1] - 0.2 : tNx - 0.4);
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
        el.style.color = g > 0.5 ? '#fff' : C.ink;
      });
    });
    M.vis($('#next'), t, tNx - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on the three sweeps, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
