// MBA - Marketing Management, Ep 19: Product Portfolio Management (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', cocoa: '#6B4A2E', cocoaD: '#4A3220', cnut: '#E3CFA4', cnutD: '#B39660' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  dog: ['M11.25 16.25h1.5L12 17z', 'M16 14v.5', 'M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309', 'M8 14v.5', 'M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  grid: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M3 12h18', 'M12 3v18'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12', 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17'],
  gift: ['M3 8h18v4H3z', 'M12 8v13', 'M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7', 'M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tGet = wt('H2', 'get'), tDropW = wt('H2', 'dropped'), tPort = wt('C2', 'portfolio');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tRange = wt('L1', 'range');
const tRg = [wt('L1', 'original'), wt('L1', 'cocoa'), wt('L2', 'Coconut'), wt('L2', 'gift'), wt('L3', 'loose')];
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M0') - 0.32;
const tKot = wt('D2', 'Kotler'), tWid = wt('D3', 'width'), tCols = [wt('D3', 'six'), wt('D3', 'gifts'), wt('D3', 'loose')];
const tLen = wt('D4', 'length'), tFive = wt('D4', 'five'), tDep = wt('D4', 'depth'), tFlav = wt('D4', 'flavours');
const tBp = [wt('D5', 'Build'), wt('D5', 'keep'), wt('D5', 'drop')];
// M
const tM0 = T0('M0'), tMl = Array.from({ length: 10 }, (_, i) => T0('M' + (i + 1))), tMout = T0('T1') - 0.32;
const tHen = wt('M0', 'Henderson'), tFour = wt('M3', 'four');
const PL = [ // product placements: [bubble id, product idx, x, y, tName, tGrowth, tShare, quadrant]
  ['b1', 1, 250, 118, wt('M4', 'Cocoa'), wt('M4', 'grows'), wt('M4', 'leads'), 0],
  ['b0', 0, 236, 306, wt('M5', 'original'), wt('M5', 'stopped'), wt('M5', 'leads'), 2],
  ['b2', 2, 474, 132, wt('M6', 'Coconut'), wt('M6', 'Growing'), wt('M6', 'few'), 1],
  ['b3', 3, 612, 84, wt('M6', 'gift'), wt('M6', 'Growing') + 0.15, wt('M6', 'few') + 0.15, 1],
  ['b4', 4, 560, 306, wt('M7', 'loose'), wt('M7', 'slow'), wt('M7', 'small'), 3],
];
const tQuad = [wt('M4', 'star'), wt('M6', 'Question'), wt('M5', 'cow'), wt('M7', 'dog')];
const tEarn = wt('M8', 'earns'), tFeed = wt('M9', 'feeds'), tPick = wt('M9', 'picks'), tStays = wt('M10', 'small'), tDropM = wt('M10', 'drop');
const tPane = [tM0 + 0.4, tMl[3], tMl[4], tMl[5], tMl[6], tMl[7]];
// statement + moves
const tT = T0('T1'), tSt2 = wt('T1', 'Choose'), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'bank'), wt('K3', 'food'), wt('K4', 'airline')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'whole'), wt('X2', 'cash')], tXh = [wt('X3', 'two'), wt('X3', 'guess')];
const tDevX = wt('X4', 'Dev'), tArjX = wt('X4', 'Arjun'), tStud = wt('X4', 'Students'), tSix = wt('X4', 'six'), tKeep = wt('X5', 'keeps'), tAct = wt('X6', 'Slater');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'High');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'width'), wt('S2', 'length'), wt('S2', 'depth')], [wt('S3', 'stars'), wt('S3', 'cash'), wt('S3', 'question'), wt('S3', 'dogs')], [wt('S4', 'stars'), wt('S4', 'question')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r, fill = C.ld, dk = C.ldD) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${fill}" stroke="${dk}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${dk}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${dk}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${dk}"/></g>`;
const PROD = [
  { n: 'Original', full: 'Original ragi', tag: 'Since day one', sub: 'SIX-PACK · RAGI AND JAGGERY', kind: 'SIX-PACK', f: C.ld, d: C.ldD },
  { n: 'Cocoa-ragi', full: 'Cocoa-ragi', tag: 'New', sub: 'SIX-PACK · COCOA AND RAGI', kind: 'SIX-PACK', f: C.cocoa, d: C.cocoaD },
  { n: 'Coconut-jowar', full: 'Coconut-jowar', tag: 'For gym-goers', sub: 'SIX-PACK · COCONUT AND JOWAR', kind: 'SIX-PACK', f: C.cnut, d: C.cnutD },
  { n: 'Gift box', full: 'Festive gift box', tag: 'For Diwali', sub: 'GIFT BOX · FESTIVALS', kind: 'GIFT', f: C.gold, d: '#8F6620' },
  { n: 'Loose laddoos', full: 'Loose big laddoos', tag: 'College stall', sub: 'LOOSE · ONE BIG LADDOO', kind: 'LOOSE', f: C.ld, d: C.ldD },
];
// product mark (60 x 60 viewBox centred)
const mark = (k, s) => {
  const p = PROD[k]; let g;
  if (k === 3) g = `<rect x="-24" y="-18" width="48" height="40" rx="6" fill="${C.gold}"/><rect x="-27" y="-24" width="54" height="12" rx="4" fill="#8F6620"/><rect x="-4" y="-24" width="8" height="46" fill="#14213D"/><path d="M0 -24 C-10 -36 -20 -30 -12 -24 M0 -24 C10 -36 20 -30 12 -24" fill="none" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>`;
  else if (k === 4) g = laddoo(0, 0, 25, p.f, p.d);
  else g = `<rect x="-27" y="-27" width="54" height="54" rx="12" fill="#14213D"/>` + laddoo(0, 2, 17, p.f, p.d);
  return `<svg width="${s}" height="${s}" viewBox="-30 -30 60 60" style="display:block;overflow:visible">${g}</svg>`;
};
// A: five tiles
$('#p5row').innerHTML = PROD.map((p, i) => `<div class="pt5" id="pt${i}" style="left:${36 + i * 173}px"><div class="zn">${p.kind}</div><div class="zi">${mark(i, 52)}</div><div class="zt">${p.n}</div></div>`).join('');
$('#onePI').innerHTML = M.icon('coin', 20, '#fff', 2.6);
const METH = [['trendUp', 'Build?'], ['shield', 'Keep?'], ['x', 'Drop?']];
$('#meth').innerHTML = METH.map(([ic, m], i) => `<div class="stp" id="mt${i}" style="top:76px;${i === 2 ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, i === 2 ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L: range rows
$('#rgRows').innerHTML = PROD.map((p, i) => `<div class="rg" id="rg${i}" style="top:${84 + i * 96}px"><div class="bg"></div><div class="gi">${mark(i, 56)}</div><div class="gn">${p.full}</div><div class="gs">${p.sub}</div><div class="gt">${p.tag}</div></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: build/keep/drop pills, dims columns
$('#bp0I').innerHTML = M.icon('trendUp', 24, '#fff', 2.6); $('#bp1I').innerHTML = M.icon('shield', 24, C.gold2, 2.4); $('#bp2I').innerHTML = M.icon('x', 24, C.red, 2.6);
const COLX = [84, 312, 540], COLN = ['SIX-PACKS', 'GIFTS', 'LOOSE'], ITEMS = [[0, 0, 0], [1, 0, 1], [2, 0, 2], [3, 1, 0], [4, 2, 0]]; // [prod, col, row]
$('#dCols').innerHTML = COLN.map((n, c) => `<div class="dh" id="dh${c}" style="left:${COLX[c]}px">${n}</div>`).join('') +
  ITEMS.map(([p, c, r]) => `<div class="dc" id="dc${p}" style="left:${COLX[c]}px;top:${180 + r * 76}px"><i style="background:${PROD[p].f}"></i><span>${PROD[p].n}</span></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the matrix (svg 700 x 480; quadrant area x 100-680, y 20-400) */
const QX = [100, 392, 100, 392], QY = [20, 20, 212, 212];
const QN = [['star', 'STARS'], ['help', 'QUESTION MARKS'], ['coin', 'CASH COWS'], ['dog', 'DOGS']];
const nested = (ic, x, y, s, col, w = 2.2) => `<g transform="translate(${x} ${y})">${M.icon(ic, s, col, w)}</g>`;
$('#mx').innerHTML = `<defs><marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L8 5 L1 9" fill="none" stroke="#B8862F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>` +
  QN.map(([ic, n], q) => `<rect id="qd${q}" x="${QX[q]}" y="${QY[q]}" width="288" height="188" rx="16" fill="#F5F1E8"/><g id="ql${q}">${nested(ic, QX[q] + 16, QY[q] + 14, 22, '#B9B1A3')}<text x="${QX[q] + 46}" y="${QY[q] + 31}" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2" fill="#B9B1A3">${n}</text></g>`).join('') +
  `<g id="axY"><line x1="84" y1="400" x2="84" y2="28" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round"/><path d="M76 38 L84 26 L92 38" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="40" y="210" transform="rotate(-90 40 210)" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">MARKET GROWTH</text>
    <text x="70" y="48" text-anchor="end" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.5" fill="#8A8274">HIGH</text><text x="70" y="398" text-anchor="end" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.5" fill="#8A8274">LOW</text></g>
  <g id="axX"><line x1="100" y1="416" x2="672" y2="416" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round"/><path d="M662 408 L674 416 L662 424" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="390" y="466" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">MARKET SHARE</text>
    <text x="100" y="442" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.5" fill="#8A8274">HIGH</text><text x="672" y="442" text-anchor="end" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.5" fill="#8A8274">LOW</text></g>` +
  PL.map(([id, , x, y]) => `<line id="${id}h" x1="84" y1="${y}" x2="${x}" y2="${y}" stroke="#B8862F" stroke-width="2.5" stroke-dasharray="4 7"/><line id="${id}v" x1="${x}" y1="416" x2="${x}" y2="${y}" stroke="#14213D" stroke-width="2.5" stroke-dasharray="4 7"/>`).join('') +
  `<path id="cf0" d="M220 272 C176 236 182 182 234 156" fill="none" stroke="#B8862F" stroke-width="5" stroke-linecap="round" marker-end="url(#ah)"/>
   <path id="cf1" d="M272 292 C400 270 520 210 584 118" fill="none" stroke="#B8862F" stroke-width="5" stroke-linecap="round" marker-end="url(#ah)"/>
   <path id="cf2" d="M270 304 C360 300 420 230 452 168" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 9"/>
   <g id="coins">${Array.from({ length: 8 }, (_, i) => `<circle id="cn${i}" r="8" fill="#B8862F" stroke="#fff" stroke-width="3"/>`).join('')}</g>` +
  PL.map(([id, k, x, y]) => `<g id="${id}" transform="translate(${x} ${y})"><circle r="36" fill="#FFFFFF" stroke="#E2DACB" stroke-width="3"/><g transform="translate(-24 -24)">${mark(k, 48)}</g><text y="60" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" fill="#14213D">${PROD[k].n}</text></g>`).join('') +
  `<g id="dogX" transform="translate(588 278)"><circle r="16" fill="#B5482F" stroke="#fff" stroke-width="3"/><path d="M-6 -6 6 6 M6 -6 -6 6" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>
   <text id="dogT" x="560" y="390" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="14" letter-spacing="2" fill="#B5482F">DROP IT?</text>
   <text id="cnT" x="430" y="128" text-anchor="end" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="2" fill="#8A8274">WAIT</text>`;
const SROW = ['GROWTH', 'SHARE', 'CASH', 'THE MOVE'], SIC = ['trendUp', 'target', 'coin', 'arrowR'];
const PANES = [
  ['BOSTON CONSULTING GROUP · 1970', 'Growth-share matrix', [['user', 'CREATED BY', 'Bruce Henderson, BCG founder'], ['trendUp', 'QUESTION 1', 'Is the market growing fast?'], ['target', 'QUESTION 2', 'Is our share big, versus rivals?'], ['grid', 'THE RESULT', 'Four boxes']]],
  ['COCOA-RAGI SIX-PACK', 'Star', ['Fast', 'Leads its market', 'Needs cash to keep growing', 'Build it']],
  ['ORIGINAL RAGI SIX-PACK', 'Cash cow', ['Stopped growing', 'Still the leader', 'Earns more than it needs', 'Hold, and use its cash']],
  ['COCONUT-JOWAR · GIFT BOX', 'Question marks', ['Growing', 'Few buyers so far', 'Need cash to grow', 'Back some, not all']],
  ['LOOSE BIG LADDOOS', 'Dog', ['Slow', 'Small', 'Very little', 'Drop it?']],
  ['WHERE THE MONEY GOES', 'Cash flow', [['coin', 'FROM', 'The cash cow: original six-pack'], ['star', 'BUILD', 'Cocoa-ragi, the star'], ['gift', 'BUILD', 'The gift box, for the festival'], ['clock', 'WAIT', 'Coconut-jowar, for now']]],
];
$('#sPans').innerHTML = PANES.map(([s, n, rows], i) => `<div class="sp" id="sp${i}"><div class="ps">${s}</div><div class="serif pt">${n}</div>` +
  rows.map((r, k) => { const [ic, l, v] = Array.isArray(r) ? r : [SIC[k], SROW[k], r]; return `<div class="sr4" id="sr${i}${k}" style="top:${176 + k * 92}px"><i>${M.icon(ic, 30, k === 3 && !Array.isArray(r) ? C.gold : C.ink, 2.2)}</i><div class="kl">${l}</div><div class="kt">${v}</div></div>`; }).join('') + `</div>`).join('');

// P: four moves
const P4 = [['trendUp', 'Build', 'Spend to grow', 'stars, best question marks', 'zoya', 'Cocoa-ragi and the gift box get the money'],
  ['shield', 'Hold', 'Keep the share', 'of a cash cow steady', 'rao', 'Mrs. Rao still gets her original pack every week'],
  ['coin', 'Harvest', 'Take cash out,', 'spend less on promotion', 'dev', 'Fewer posters for the original, same loyal buyers'],
  ['x', 'Divest', 'Sell or drop it,', 'and free the money', 'arjun', 'The loose laddoos: drop them, or keep a few?']];
$('#p4').innerHTML = P4.map(([ic, a, b, c], i) => `<div class="st4" id="pst${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2">${b}</div><div class="s3">${c}</div></div>` + (i < 3 ? `<div class="cx" id="cx${i}" style="left:${536 + i * 408}px">${M.icon('arrowR', 18, C.gold, 2.6)}</div>` : '')).join('');
$('#pePans').innerHTML = [[null, 'FOUR MOVES · ONE PER BOX', 'Build the stars, hold and harvest the cows, divest the dogs']].concat(P4.map((p, i) => [p[4], `${p[1].toUpperCase()} · AT LADDOO LAB`, p[5]])).map(([f, l, x], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('grid', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div></div>`).join('');

// K: at work today
const KA = [
  ['star', 'Stars', 'Build them', 'Cocoa-ragi gets the money', 'phone', 'A phone maker backs its fastest-selling model'],
  ['coin', 'Cash cows', 'Hold, and harvest', 'The original pays for the rest', 'bank', "A bank's savings accounts pay for its app"],
  ['help', 'Question marks', 'Back only a few', 'The gift box, before Diwali', 'pin', 'A delivery app tries groceries in a few cities'],
  ['dog', 'Dogs', 'Drop, or keep for a reason', 'Loose laddoos at the college stall', 'plane', 'An airline drops a route few people fly'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['PORTFOLIOS TODAY', 'Four boxes', 'Every big company sorts its products', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A LADDOO RANGE TO A BANK</div><div class="pe"><i>${M.icon('grid', 34, C.gold, 2.2)}</i><span>Grow, keep, or let go</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['eye', 'See the whole range'], ['coin', 'Where cash should go']];
const XH = [['target', 'Only two measures'], ['help', 'High or low? A guess']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#mini').innerHTML = `<rect width="240" height="312" rx="20" fill="#F5F1E8"/>
  <text x="24" y="40" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">THE STUDENT PATH</text>
  ${[[24, 60], [124, 60], [24, 160], [124, 160]].map(([x, y], q) => `<rect x="${x}" y="${y}" width="92" height="92" rx="12" fill="#FFFFFF"/>`).join('')}
  ${nested('star', 32, 68, 16, '#B9B1A3', 2)}${nested('help', 132, 68, 16, '#B9B1A3', 2)}${nested('coin', 32, 168, 16, '#B9B1A3', 2)}${nested('dog', 132, 168, 16, '#B9B1A3', 2)}
  <g transform="translate(170 214)"><circle r="24" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g transform="translate(-17 -17)">${mark(4, 34)}</g></g>
  <g transform="translate(70 214)"><circle r="24" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g transform="translate(-17 -17)">${mark(0, 34)}</g></g>
  <path id="mA" d="M146 222 C130 238 110 238 96 224" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round"/>
  <path id="mAh" d="M104 218 L94 222 L100 232" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text id="mT" x="120" y="292" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="14" letter-spacing="2" fill="#B8862F">TRY, THEN BUY PACKS</text>`;
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('chart', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('help', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Star', 'Cash cow', 'Question mark', 'Dog'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('coin', 44, C.gold2, 2.4);
// recap
const ROWS = [['layers', 'A portfolio', ['Width', 'Length', 'Depth']], ['grid', 'Four boxes', ['Stars', 'Cash cows', 'Question marks', 'Dogs']], ['coin', 'Cows fund the future', ['Stars', 'Best question marks']]];
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
const svgVis = (el, t, tin, sc0 = 0.4) => { // pop an svg group at its translate
  const p = M.spring(t - tin, M.POP), base = el._base || (el._base = el.getAttribute('transform'));
  if (t < tin) { M.hide(el, true); return; } M.hide(el, false);
  el.style.opacity = M.clamp((t - tin) / 0.08).toFixed(3);
  attr(el, 'transform', p >= 1 ? base : `${base} scale(${(sc0 + (1 - sc0) * p).toFixed(4)})`);
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  x = 48; for (let i = 0; i < 3; i++) { const p = $('#bp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const wl = $('#wL'); wl.style.left = (410 - wl.offsetWidth / 2) + 'px';
  document.querySelectorAll('.rg .gn').forEach(el => { const s = el.parentNode.querySelector('.gs'); if (s.offsetWidth + 92 > 560) s.style.fontSize = '13px'; });
  document.querySelectorAll('.sp .pt').forEach(el => { if (el.offsetWidth > 740) el.style.fontSize = Math.floor(60 * 740 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.sr4 .kt').forEach(el => { if (el.offsetWidth > 660) el.style.fontSize = Math.floor(28 * 660 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.st4 .s2, .st4 .s3').forEach(el => { if (el.offsetWidth > 312) el.style.fontSize = Math.floor(24 * 312 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.pex .pt2').forEach(el => { if (el.offsetWidth > 1390) el.style.fontSize = Math.floor(36 * 1390 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.xr .bb').forEach(el => { if (el.offsetWidth > 332) el.style.fontSize = Math.floor(22 * 332 / el.offsetWidth) + 'px'; });
  { const k = $('#fact .kt'); if (k.offsetWidth > 560) k.style.fontSize = Math.floor(28 * 560 / k.offsetWidth) + 'px'; }
  { const q = $('#qq1'); if (q.offsetWidth > 1420) q.style.fontSize = Math.floor(68 * 1420 / q.offsetWidth) + 'px'; }
  { let f = 40; OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) f = Math.min(f, Math.floor(40 * 312 / o.offsetWidth)); }); OPTS.forEach((_, i) => { $('#o' + i + ' .ot').style.fontSize = f + 'px'; }); }
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  geo.cf = [0, 1].map(i => { const p = $('#cf' + i); return [p, p.getTotalLength()]; });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  M.vis($('#exChip'), t, tMl[3] - 0.2, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 5; i++) M.vis($('#pt' + i), t, tMorph + 0.55 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#oneP'), t, tMorph + 1.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    [tGet - 0.1, tGet + 0.25, tDropW - 0.05].forEach((ta, i) => M.vis($('#mt' + i), t, ta, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.rise($('#askT'), t, tPort - 0.15, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tRange + 0.2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#rng'), t, tRange + 0.32, tLout, { dx: 60, dy: 0, ...o });
    PROD.forEach((_, i) => {
      const el = $('#rg' + i), ta = Math.max(tRange + 0.5, tRg[i] - 0.1); M.vis(el, t, ta, 1e9, { dy: 16 });
      const on = M.io((t - ta) / 0.25) * (1 - (i < 4 ? M.io((t - tRg[i + 1] + 0.1) / 0.25) : M.io((t - tLout + 0.6) / 0.3)));
      el.querySelector('.bg').style.background = mix(C.paper, C.gold3, on);
    });
  }

  /* ===== D ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.rise($('#bl0'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY }); M.rise($('#bl1'), t, tD2 + 0.5, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kmix'), t, tKot - 0.05, { st: 0.05 });
    M.vis($('#kqHr'), t, tKot + 0.3, 1e9, { dy: 0 });
    M.vis($('#pmL'), t, tD5 + 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) M.vis($('#bp' + i), t, tBp[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#dims'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    for (let c = 0; c < 3; c++) {
      const h = $('#dh' + c); M.vis(h, t, tD3 + 0.35 + c * 0.08, 1e9, { dy: 10 });
      h.style.color = mix(C.muted, C.gold, M.io((t - tCols[c]) / 0.25) * (1 - M.io((t - (c < 2 ? tCols[c + 1] : tLen)) / 0.3)));
    }
    ITEMS.forEach(([p], k) => {
      const el = $('#dc' + p); M.vis(el, t, tD3 + 0.45 + k * 0.08, 1e9, { dy: 12 });
      const tl = tLen + 0.2 + k * Math.max(0.15, (tFive - tLen) / 5), on = M.io((t - tl) / 0.2), dep = p < 3 ? M.io((t - tDep) / 0.3) : 0;
      el.style.background = mix(mix(C.paper, C.gold3, on * (1 - M.io((t - tDep + 0.2) / 0.3))), C.ink, dep);
      el.querySelector('span').style.color = mix(C.ink, '#fff', dep);
    });
    M.draw($('#wbrP'), t, tWid - 0.1, 0.6, M.o3); M.vis($('#wL'), t, tWid + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#lL'), t, tLen - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.count($('#lN'), t, tLen + 0.2, Math.max(0.6, tFive - tLen), 0, 5);
    M.draw($('#dbrP'), t, tDep - 0.1, 0.5, M.o3); M.vis($('#dL'), t, tDep + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== M: the matrix ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#bcg'), t, tM0 + 0.05, tMout, { dy: 36, ...o });
    M.vis($('#mx'), t, tM0 + 0.25, 1e9, { dy: 16, sp: M.SOFT });
    M.vis($('#bcgV'), t, tM0 + 0.3, 1e9, { dy: 0 });
    // axes light up on the two questions
    const ay = M.io((t - tMl[0]) / 0.3) * (1 - M.io((t - tMl[1]) / 0.3)), ax = M.io((t - tMl[1]) / 0.3) * (1 - M.io((t - tMl[2]) / 0.3));
    $('#axY').querySelectorAll('line, path').forEach(e => attr(e, 'stroke', mix(C.dim, C.gold, ay)));
    $('#axX').querySelectorAll('line, path').forEach(e => attr(e, 'stroke', mix(C.dim, C.ink, ax)));
    // quadrants: label pops on "four", fills when a product is placed
    const QF = [C.gold3, '#EEE8DB', '#F3EAD6', C.redBg], QC = [C.gold, C.ink2, C.gold, C.red];
    for (let q = 0; q < 4; q++) {
      const lab = M.io((t - tFour - q * 0.15) / 0.25), fill = M.io((t - tQuad[q]) / 0.3);
      attr($('#qd' + q), 'fill', mix(C.paper, QF[q], fill));
      const col = mix(C.dim, QC[q], Math.max(lab * 0.6, fill));
      $('#ql' + q).querySelectorAll('text').forEach(e => attr(e, 'fill', col));
      $('#ql' + q).querySelectorAll('svg').forEach(e => { if (e._c !== col) { e._c = col; e.setAttribute('stroke', col); } });
    }
    // placements
    PL.forEach(([id, , x, y, tn, tg, ts]) => {
      M.drawU($('#' + id + 'h'), M.io((t - tg + 0.05) / 0.45)); M.drawU($('#' + id + 'v'), M.io((t - ts + 0.05) / 0.45));
      const fade = 1 - M.io((t - tMl[7] - 0.2) / 0.4); // guides fade when money starts to move
      $('#' + id + 'h').style.opacity = fade.toFixed(3); $('#' + id + 'v').style.opacity = fade.toFixed(3);
      svgVis($('#' + id), t, tn - 0.05);
    });
    const ring = (id, col) => attr($('#' + id).querySelector('circle'), 'stroke', col);
    ring('b0', mix(C.line, C.gold, M.io((t - tEarn) / 0.3))); ring('b1', mix(C.line, C.gold, M.io((t - tFeed) / 0.3)));
    ring('b3', mix(C.line, C.gold, M.io((t - tPick) / 0.3))); ring('b4', mix(C.line, C.red, M.io((t - tDropM) / 0.3)));
    // cash flow with coins
    const cfu = [M.io((t - tFeed + 0.1) / 0.6), M.io((t - tPick) / 0.6)];
    for (let i = 0; i < 2; i++) M.drawU($('#cf' + i), cfu[i]);
    { const u = M.io((t - tStays + 0.2) / 0.4); $('#cf2').style.opacity = u.toFixed(3); M.hide($('#cf2'), u <= 0); }
    M.vis($('#cnT'), t, tStays, 1e9, { dy: 0, fade: 0.2 });
    for (let i = 0; i < 8; i++) {
      const path = i < 4 ? 0 : 1, [p, L] = geo.cf[path], ts = path ? tPick + 0.5 : tFeed + 0.4, c = $('#cn' + i);
      if (t < ts + (i % 4) * 0.3) { M.hide(c, true); continue; }
      const u = (((t - ts) * 0.55) + (i % 4) * 0.25) % 1, pt = p.getPointAtLength(L * u * 0.94);
      M.hide(c, false); attr(c, 'cx', pt.x.toFixed(1)); attr(c, 'cy', pt.y.toFixed(1)); c.style.opacity = Math.min(1, u * 8, (1 - u) * 8).toFixed(3);
    }
    svgVis($('#dogX'), t, tDropM - 0.05, 0.3); M.vis($('#dogT'), t, tDropM, 1e9, { dy: 0, fade: 0.2 });
    // right panes
    for (let k = 0; k < 6; k++) {
      const tin = tPane[k], tout = k < 5 ? tPane[k + 1] - 0.14 : 1e9;
      const pn = $('#sp' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      const rt = k === 0 ? [tHen - 0.1, tMl[0], tMl[1], tFour - 0.1] : k === 5 ? [tEarn - 0.1, tFeed, tPick, tStays - 0.1] : null;
      pn.querySelectorAll('.sr4').forEach((r, j) => M.vis(r, t, rt ? Math.max(tin + 0.3, rt[j]) : tin + 0.3 + j * 0.12, tout, { dy: 16, ...oo }));
    }
  }

  /* ===== statement ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== P: four moves ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    P4.forEach(([ic], i) => {
      const el = $('#pst' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.1 + i * 0.07, tPout, { dy: 36, ...o });
      if (i < 3) M.vis($('#cx' + i), t, tP0 + 0.3 + i * 0.07, tPout, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelector('.s1').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      const sc = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.s2').style.color = sc; el.querySelector('.s3').style.color = sc;
      el.querySelector('.sn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.si').style.background = t < ta ? C.paper : mix(C.navy2, C.paper, off);
      setIco(el.querySelector('.si'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 34, 2.2);
    });
    M.vis($('#pe'), t, tP0 + 0.35, tPout, { dy: 36, ...o });
    for (let k = 0; k < 5; k++) {
      const tin = k ? tP[k - 1] : tP0 + 0.6, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pa, .pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
    }
  }

  /* ===== K ===== */
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

  /* ===== X ===== */
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
    M.vis($('#mini'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.draw($('#mA'), t, tStud, 0.5, M.o3); M.vis($('#mAh'), t, tStud + 0.4, 1e9, { dy: 0, fade: 0.1 }); M.vis($('#mT'), t, tSix - 0.1, 1e9, { dy: 0, fade: 0.2 });
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tArjX, tKeep][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tArjX ? C.redBg : C.paper; $('#bb0').style.color = t > tArjX ? C.red : C.ink;
    M.vis($('#fact'), t, tAct - 0.1, 1e9, { dy: 16 });
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

  /* ===== recap ===== */
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

M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
