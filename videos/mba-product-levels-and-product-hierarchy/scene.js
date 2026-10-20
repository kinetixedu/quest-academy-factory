// MBA - Marketing Management, Ep 15: Product Classification (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  backpack: ['M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', 'M8 10h8', 'M8 18h8', 'M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6', 'M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  watch: ['M12 10v2.2l1.6 1', 'm16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05', 'm7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  pie: ['M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z', 'M21.21 15.89A10 10 0 1 1 8 2.83'],
  wheat: ['M2 22 16 8', 'M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z', 'M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tSix = wt('H1', 'six'), tSec = wt('H1', 'second'), tBag = wt('H2', 'bag'), tFour = wt('H2', 'four'), tH3 = T0('H3'), tTwo = wt('H3', 'Two');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tFr = [wt('L3', 'grab'), wt('L3', 'compare'), wt('L3', 'hunt'), wt('L3', 'never')];
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M1') - 0.32;
const tQl = [wt('D2', 'sorting'), wt('D2', 'how'), wt('D2', 'people')];
const tCc = [wt('D3', 'convenience'), wt('D3', 'shopping'), wt('D3', 'specialty'), wt('D4', 'unsought')];
const tInd = wt('D5', 'industrial'), tBiz = wt('D5', 'businesses');
// M: the sorting tree
const tM1 = T0('M1'), tM7 = T0('M7'), tMout = T0('T1') - 0.32;
// statement + four types
const tT = T0('T1'), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tI1 = T0('I1'), tPout = tI1 - 0.32;
// I: industrial
const tI = [T0('I2'), T0('I3'), T0('I4')], tIout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'biscuit'), wt('K2', 'phone'), wt('K3', 'luxury'), wt('K4', 'insurance')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5');
const tXg = [wt('X2', 'where'), wt('X2', 'push')], tXh = [wt('X3', 'same'), wt('X3', 'different')];
const tFan = wt('X4', 'fan'), tNaniX = wt('X4', 'Nani');
const tXout = tX5 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'They');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tNx = T0('N1');
const tPill = [[wt('S2', 'how'), wt('S2', 'why')], [wt('S3', 'convenience'), wt('S3', 'shopping'), wt('S3', 'specialty'), wt('S3', 'unsought')], [wt('S4', 'materials'), wt('S4', 'capital'), wt('S4', 'supplies')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const tile = (id, x, w, ic, n, t) => `<div class="sws" id="${id}" style="left:${x}px;width:${w}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`;
const T = (x, y, s, fill, txt, o = '') => `<text x="${x}" y="${y}" font-family="Poppins" font-weight="600" font-size="${s}" fill="${fill}" ${o}>${txt}</text>`;
// A
const HC = [['laddoo', 'LADDOO SIX-PACK', 'Every week', 'zap', 'No comparing'], ['backpack', 'SCHOOL BAG', 'Once a year', 'search', 'Four shops compared']];
$('#hRow').innerHTML = HC.map(([ic, n, t, si, s], i) => `<div class="cmp" id="hc${i}" style="left:${36 + i * 432}px"><i>${M.icon(ic, 30, C.gold, 2.2)}</i><div class="cn">${n}</div><div class="ct">${t}</div><div class="cs" id="hs${i}">${M.icon(si, 18, i ? C.ink : C.gold, 2.4)}<span>${s}</span></div></div>`).join('');
const METH = [['zap', 'Grab it'], ['search', 'Compare first']];
$('#meth').innerHTML = METH.map(([ic, m], i) => `<div class="stp" id="mt${i}" style="top:76px;${i ? 'background:#14213D;color:#fff' : ''}">${M.icon(ic, 26, i ? C.gold2 : C.gold, 2.4)}<span>${m}</span></div>`).join('');
// L
$('#zN').style.cssText += ';' + FACE('zoya');
const FR = [['zap', 'GRAB', 'Six-pack'], ['scale', 'COMPARE', 'School bag'], ['target', 'HUNT FOR', 'Silk saree'], ['ban', 'IGNORE', 'Insurance']];
$('#fRow').innerHTML = FR.map(([ic, n, t], i) => tile('fr' + i, 36 + i * 182, 166, ic, n, t)).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
const CC = ['Convenience', 'Shopping', 'Specialty', 'Unsought'];
$('#ccRow').innerHTML = CC.map((c, i) => `<div class="cc${i === 3 ? ' un' : ''}" id="cc${i}">${c}</div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);
// the two families
const box = (id, x, y, w, h, fill, t1, t2, tc, sc) => `<g id="${id}"><rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="16" fill="${fill}"/>${T(x, y + (t2 ? 34 : h / 2 + 8), 22, tc, t1, 'text-anchor="middle"')}${t2 ? T(x, y + 60, 13, sc, t2, 'text-anchor="middle" letter-spacing="2"') : ''}</g>`;
const leaf = (id, x, y, txt) => `<g id="${id}"><rect x="${x - 130}" y="${y}" width="260" height="44" rx="22" fill="#F5F1E8"/>${T(x, y + 29, 19, C.ink, txt, 'text-anchor="middle"')}</g>`;
$('#fam').innerHTML = `<path id="fb0" d="M344 64 V92 H172 V120" fill="none" stroke="#B9B1A3" stroke-width="3"/><path id="fb1" d="M344 64 V92 H516 V120" fill="none" stroke="#B9B1A3" stroke-width="3"/>` +
  box('fr', 344, 0, 200, 64, C.ink, 'Products', '', '#FFFFFF') +
  box('fc', 172, 120, 300, 80, C.gold3, 'Consumer products', 'FOR PERSONAL USE', C.ink, C.muted) +
  box('fi', 516, 120, 300, 80, '#E8EAF0', 'Industrial products', 'FOR BUSINESS USE', C.ink, C.muted) +
  CC.map((c, i) => leaf('lc' + i, 172, 220 + i * 58, c)).join('') +
  ['Materials and parts', 'Capital items', 'Supplies and services'].map((c, i) => leaf('li' + i, 516, 220 + i * 58, c)).join('');

/* M: the sorting tree. Coordinates inside a 1504 x 392 svg. */
const QX = [330, 700, 1070], SY = 150, BY = 330, EX = 1370, SX = 40;
const QT = ['Is she looking for it?', 'Will only one special kind do?', 'Does she compare first?'];
const BIN = [[QX[0], 'UNSOUGHT'], [QX[1], 'SPECIALTY'], [QX[2], 'SHOPPING'], [EX, 'CONVENIENCE']];
const lab = (x, y, txt, a = 'start') => T(x, y, 14, C.muted, txt, `text-anchor="${a}" letter-spacing="2"`);
$('#tree').innerHTML = `<path id="spine" d="M${SX} ${SY} H${EX} V${BY - 50}" fill="none" stroke="#14213D" stroke-width="4" stroke-linecap="round"/>` +
  QX.map((x, i) => `<path id="br${i}" d="M${x} ${SY} V${BY - 50}" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 10"/>`).join('') +
  QX.map((x, i) => `<g id="qn${i}"><rect x="${x - 172}" y="10" width="344" height="84" rx="20" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/>${T(x, 46, 13, C.gold, 'QUESTION ' + (i + 1), 'text-anchor="middle" letter-spacing="2"')}${T(x, 76, 21, C.ink, QT[i], 'text-anchor="middle"')}<line x1="${x}" y1="94" x2="${x}" y2="${SY - 12}" stroke="#E2DACB" stroke-width="3"/><circle cx="${x}" cy="${SY}" r="9" fill="#14213D"/></g>`).join('') +
  `<g id="brl">${QX.map((x, i) => lab(x + 16, SY + 46, i === 0 ? 'NO' : 'YES') + lab(x + 28, SY - 14, i === 0 ? 'YES' : 'NO')).join('')}</g>` +
  BIN.map(([x, n], i) => `<g id="bn${i}"><rect class="bb" x="${x - 120}" y="${BY - 50}" width="240" height="110" rx="20" fill="#F5F1E8" stroke="#E2DACB" stroke-width="2"/>${T(x, BY - 18, 14, C.muted, n, 'text-anchor="middle" letter-spacing="2.4" class="bl"')}<g class="bi" visibility="hidden"><g class="bic"></g>${T(x + 14, BY + 30, 19, C.ink, '', 'class="bt"')}</g></g>`).join('') +
  QX.map((x, i) => `<g id="an${i}" visibility="hidden"><rect class="ar" x="${x - 94}" y="${SY + 16}" width="68" height="30" rx="15" fill="#B8862F"/>${T(x - 60, SY + 37, 14, '#FFFFFF', 'YES', 'text-anchor="middle" letter-spacing="1.5" class="at"')}</g>`).join('') +
  `<g id="tok" visibility="hidden"><circle r="30" fill="#14213D" stroke="#FFFFFF" stroke-width="4"/><g class="ti" transform="translate(-14 -14)"></g></g>`;
// the four items and their routes
const ITEMS = (() => {
  const a0 = wt('M2', 'six') - 0.15, l0 = wt('M2', 'looking'), s0 = wt('M3', 'special'), n0 = wt('M3', 'No'), c0 = wt('M3', 'compare'), n1 = wt('M3', 'No', 1), g0 = wt('M3', 'grabs'), cv = wt('M3', 'convenience');
  const b = wt('M4', 'bag'), cmp = wt('M4', 'compares'), sh = wt('M4', 'shopping');
  const sa = wt('M5', 'saree'), on = wt('M5', 'only'), sp = wt('M5', 'specialty');
  const ins = wt('M6', 'insurance'), lk = wt('M6', 'looking'), un = wt('M6', 'unsought');
  return [
    { ic: 'laddoo', name: 'Six-pack', bin: 3, done: cv, keys: [[a0, SX, SY], [l0, QX[0], SY], [s0 - 0.5, QX[0], SY], [s0, QX[1], SY], [c0 - 0.5, QX[1], SY], [c0, QX[2], SY], [g0 - 0.5, QX[2], SY], [g0 + 0.2, EX, SY], [g0 + 0.7, EX, BY + 4]], ans: [[0, l0 + 0.2, 'YES'], [1, n0, 'NO'], [2, n1, 'NO']] },
    { ic: 'backpack', name: 'School bag', bin: 2, done: sh, keys: [[b - 0.15, SX, SY], [b + 0.5, QX[0], SY], [b + 0.8, QX[0], SY], [b + 1.4, QX[1], SY], [b + 1.7, QX[1], SY], [cmp - 0.1, QX[2], SY], [sh - 0.6, QX[2], SY], [sh - 0.1, QX[2], BY + 4]], ans: [[0, b + 0.5, 'YES'], [1, b + 1.4, 'NO'], [2, cmp + 0.2, 'YES']] },
    { ic: 'star', name: 'Silk saree', bin: 1, done: sp, keys: [[sa - 0.15, SX, SY], [sa + 0.6, QX[0], SY], [sa + 0.9, QX[0], SY], [on - 0.1, QX[1], SY], [sp - 0.6, QX[1], SY], [sp - 0.1, QX[1], BY + 4]], ans: [[0, sa + 0.6, 'YES'], [1, on + 0.2, 'YES']] },
    { ic: 'shield', name: 'Insurance', bin: 0, done: un, keys: [[ins - 0.15, SX, SY], [lk - 0.1, QX[0], SY], [un - 0.6, QX[0], SY], [un - 0.1, QX[0], BY + 4]], ans: [[0, lk + 0.2, 'NO']] },
  ];
})();
ITEMS.forEach(it => { const g = $('#bn' + it.bin); g.querySelector('.bic').innerHTML = `<g transform="translate(${BIN[it.bin][0] - 62} ${BY + 14})">${M.icon(it.ic, 26, C.gold, 2.2)}</g>`; g.querySelector('.bt').textContent = it.name; g.querySelector('.bt').setAttribute('x', BIN[it.bin][0] - 26); });

// P: four types
const P4 = [['zap', 'Convenience', 5, 1], ['scale', 'Shopping', 3, 4], ['star', 'Specialty', 1, 5], ['shield', 'Unsought', 1, 2]];
$('#p5').innerHTML = P4.map(([ic, n], i) => `<div class="st5" id="pst${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="si"></div><div class="s1">${n}</div>` +
  `<div class="ml" style="top:136px">HOW OFTEN</div><div class="mb" style="top:166px"><i id="mo${i}"></i></div><div class="ml" style="top:204px">EFFORT TO BUY</div><div class="mb" style="top:234px"><i id="me${i}"></i></div></div>`).join('');
const PE = [['pie', 'Four types, four plans', 'Two clues: how often people buy, and how hard they think'],
  ['store', 'Sell everywhere, close to home', 'Cheap and frequent: soap, milk, a laddoo six-pack'],
  ['search', 'Give facts, help them compare', 'Bags, phones, fridges: bought now and then'],
  ['star', 'Fewer shops, a strong brand', 'Loyal buyers will travel for the one they love'],
  ['users', 'Explain why they need it', 'Insurance, a health check: often sold face to face']];
$('#pePans').innerHTML = PE.map(([ic, a, b], k) => `<div class="pex" id="pex${k}"><div class="lbl">${k ? `0${k} · ${P4[k - 1][1].toUpperCase()} · THE MARKETING PLAN` : 'WHAT EACH TYPE NEEDS'}</div><div class="pi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="pt2">${a}</div><div class="pt3">${b}</div></div>`).join('');
// I: industrial
const DF = [['wheat', 'Materials', 'Ragi and jaggery: part of the laddoo'], ['gear', 'Capital items', 'The grinder: costly, lasts for years'], ['flame', 'Supplies', 'Tape and gas: used up, bought again']];
$('#dRows').innerHTML = DF.map(([ic, tt, m], i) => `<div class="df" id="df${i}" style="top:${96 + i * 148}px"><div class="bg"></div><div class="bd"></div><div class="serif dt">${tt}</div><div class="dm">${m}</div></div>`).join('');
wrap($('#ill2'), 'ill2Out', 784, 580);

// K: at work today
const KA = [
  ['zap', 'Convenience', 'Bought often, little effort', 'Mrs. Rao grabs her six-pack', 'store', 'A biscuit maker fills every small shop'],
  ['scale', 'Shopping', 'Compared before buying', 'Four shops for one school bag', 'phone', 'A phone maker shows side by side specs'],
  ['star', 'Specialty', 'Only one will do', 'One trusted weaver for a silk saree', 'watch', 'A luxury watchmaker sells in a few stores'],
  ['shield', 'Unsought', 'Must be explained', 'Insurance, once someone explains it', 'users', 'An insurer sends advisers to explain plans'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['PRODUCT TYPES TODAY', 'Four kinds', 'Every shelf holds all four', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">IN THE STORY</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CORNER SHOP TO AN INSURER</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Each type is sold its own way</span></div>`) + `</div>`).join('');

// X
const XG = [['pin', 'Where to sell'], ['megaphone', 'How hard to push']];
const XH = [['users', 'Depends on the buyer'], ['repeat', 'Boxes overlap']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#fanI').innerHTML = M.icon('user', 30, C.muted, 2.2);
$('#bothI').innerHTML = M.icon('users', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Convenience', 'Shopping', 'Specialty', 'Unsought'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('scale', 44, C.gold2, 2.4);
// recap
const ROWS = [['pie', 'Sort by how people buy', ['How', 'Why']], ['users', 'Four consumer types', ['Convenience', 'Shopping', 'Specialty', 'Unsought']], ['briefcase', 'Industrial products', ['Materials', 'Capital items', 'Supplies']]];
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
const tileOn = (el, on, ic) => {
  el.style.background = mix(C.paper, C.ink, on);
  el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
  setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
};
const pop = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const svgShow = (el, on) => attr(el, 'visibility', on ? 'inherit' : 'hidden');
const fade = (el, t, t0, d = 0.25) => { const u = M.clamp((t - t0) / d); attr(el, 'opacity', u.toFixed(3)); svgShow(el, u > 0); };
// position of an item along its keys at time t (null before / after)
const posAt = (it, t) => {
  const k = it.keys; if (t < k[0][0]) return null;
  for (let i = 0; i < k.length - 1; i++) {
    const [ta, xa, ya] = k[i], [tb, xb, yb] = k[i + 1];
    if (t < tb) { const u = M.io((t - ta) / Math.max(0.01, tb - ta)); return [M.lerp(xa, xb, u), M.lerp(ya, yb, u)]; }
  }
  return [k[k.length - 1][1], k[k.length - 1][2]];
};
const msT = (ic, tx, st) => { // st 0 neutral, 2 final gold
  const ms = $('#msT'); setIco(ms.querySelector('.msi'), ic, st ? '#fff' : C.gold, 26, 2.4); M.setT(ms.querySelector('.mtx'), tx);
  const bg = st ? C.gold : C.paper; if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = st ? '#fff' : C.ink; }
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 2; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const at = $('#askT'); if (at.offsetWidth > 848) at.style.fontSize = Math.floor(64 * 848 / at.offsetWidth) + 'px';
  x = 48; for (let i = 0; i < 4; i++) { const p = $('#cc' + i); p.style.left = x + 'px'; x += p.offsetWidth + 12; }
  document.querySelectorAll('.df .dm').forEach(el => { if (el.offsetWidth > 560) el.style.fontSize = Math.floor(26 * 560 / el.offsetWidth) + 'px'; });
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
  M.vis($('#exChip'), t, tP0 + 0.4, tPout, { dy: 10, outDur: 0.3 });

  /* ===== A: two ways of buying ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.vis($('#hc0'), t, tMorph + 0.5, 1e9, pop); M.vis($('#hs0'), t, tMorph + 0.9, 1e9, pop);
    M.vis($('#hc1'), t, tBag - 0.05, 1e9, pop); M.vis($('#hs1'), t, tFour - 0.05, 1e9, pop);
    M.vis($('#ask'), t, tH3 + 0.05, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tH3 + 0.3, 1e9, pop); M.vis($('#mt1'), t, tH3 + 0.6, 1e9, pop);
    M.rise($('#askT'), t, tTwo - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: four ways to buy ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#shopImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#rcp'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#zN'), t, tL2 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#zQ'), t, tL2 + 0.35, { st: 0.05, sp: M.HEAVY }); M.rise($('#zQ2'), t, wt('L2', 'different', 1) - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#zS'), t, tL2 + 0.8, 1e9, { dy: 8 });
    M.vis($('#team'), t, tL3 - 0.1, tLout, { dy: 36, ...o });
    FR.forEach(([ic], i) => {
      const el = $('#fr' + i); M.vis(el, t, tFr[i] - 0.05, 1e9, pop);
      tileOn(el, M.io((t - tFr[i]) / 0.25) * (1 - (i < 3 ? M.io((t - tFr[i + 1]) / 0.25) : M.io((t - tLout + 0.3) / 0.3))), ic);
    });
  }

  /* ===== D: what is product classification ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD5);
    for (let i = 0; i < 3; i++) M.rise($('#ql' + i), t, tQl[i] - 0.1, { st: 0.05, sp: M.HEAVY });
    M.vis($('#kqHr'), t, tD3 - 0.2, 1e9, { dy: 0 });
    M.rise($('#cop'), t, tD3 + 0.05, { st: 0.06, sp: M.HEAVY }); M.vis($('#copB'), t, wt('D3', 'Harvard') - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 4; i++) M.vis($('#cc' + i), t, tCc[i] - 0.05, 1e9, pop);
    M.vis($('#vc'), t, tD5 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#fam'), t, tD5 + 0.3, 1e9, { dy: 16, sp: M.SOFT });
    fade($('#fr'), t, tD5 + 0.35); M.draw($('#fb0'), t, tD5 + 0.5, 0.4, M.o3); fade($('#fc'), t, tD5 + 0.7);
    for (let i = 0; i < 4; i++) fade($('#lc' + i), t, tD5 + 0.9 + i * 0.1);
    M.draw($('#fb1'), t, tInd - 0.2, 0.4, M.o3); fade($('#fi'), t, tInd);
    for (let i = 0; i < 3; i++) fade($('#li' + i), t, tBiz + i * 0.12);
  }

  /* ===== M: the sorting tree ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#tr'), t, tM1 + 0.05, tMout, { dy: 36, outDur: 0.3, ody: -16 });
    M.vis($('#tree'), t, tM1 + 0.2, 1e9, { dy: 16, sp: M.SOFT });
    M.draw($('#spine'), t, tM1 + 0.3, 1.0, M.o3);
    for (let i = 0; i < 3; i++) { fade($('#qn' + i), t, tM1 + 0.4 + i * 0.25); M.draw($('#br' + i), t, tM1 + 0.9 + i * 0.15, 0.4, M.o3); }
    fade($('#brl'), t, tM1 + 1.3);
    for (let i = 0; i < 4; i++) fade($('#bn' + i), t, tM1 + 1.0 + i * 0.12);
    M.vis($('#msT'), t, tM1 + 0.6, 1e9, pop);
    // the current item
    let cur = -1; ITEMS.forEach((it, i) => { if (t >= it.keys[0][0]) cur = i; });
    const tok = $('#tok');
    const it = cur >= 0 ? ITEMS[cur] : null, p = it ? posAt(it, t) : null, last = it ? it.keys[it.keys.length - 1][0] : 0;
    const inBin = it && t > last + 0.05;
    svgShow(tok, !!p && !inBin);
    if (p && !inBin) { attr(tok, 'transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`); const tic = tok.querySelector('.ti'); if (tic._ic !== it.ic) { tic._ic = it.ic; tic.innerHTML = M.icon(it.ic, 28, '#fff', 2.2); } }
    // node highlight + answer chips for the current item
    for (let n = 0; n < 3; n++) {
      const at = p && !inBin && Math.abs(p[0] - QX[n]) < 4 && Math.abs(p[1] - SY) < 4;
      const r = $('#qn' + n + ' rect'); attr(r, 'stroke', at ? C.gold : C.line); attr(r, 'stroke-width', at ? 4 : 2);
      const a = it && it.ans.find(x => x[0] === n), an = $('#an' + n);
      const showA = !!(a && t >= a[1] && t < last + 0.3 && !inBin);
      svgShow(an, showA);
      if (a && showA) { const tx = an.querySelector('.at'); if (tx.textContent !== a[2]) tx.textContent = a[2]; attr(an.querySelector('.ar'), 'fill', a[2] === 'YES' ? C.gold : C.ink2); }
    }
    // bins fill
    ITEMS.forEach(it2 => {
      const g = $('#bn' + it2.bin), on = t >= it2.done - 0.05, u = M.io((t - it2.done + 0.05) / 0.3);
      svgShow(g.querySelector('.bi'), on);
      attr(g.querySelector('.bb'), 'fill', mix(C.paper, C.gold3, u)); attr(g.querySelector('.bb'), 'stroke', mix(C.line, C.gold, u));
      attr(g.querySelector('.bl'), 'fill', mix(C.muted, C.gold, u));
    });
    if (t >= tM7) msT('check', 'Four products, four bins, four plans', 2);
    else if (it && t >= it.done) msT(it.ic, `${it.name}: a ${BIN[it.bin][1].toLowerCase()} product`, 2);
    else if (it) msT(it.ic, it.name, 0);
    else msT('help', 'Three questions sort any product', 0);
  }

  /* ===== statement on navy ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tT + 0.4, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== P: four types, four plans ===== */
  const pOn = t >= tTu - 0.05 && t < tI1 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    P4.forEach(([ic, , fo, ef], i) => {
      const el = $('#pst' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.1 + i * 0.07, tPout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelector('.s1').style.color = mix(C.ink, '#fff', act);
      el.querySelectorAll('.ml').forEach(l => { l.style.color = mix(C.muted, C.gold2, act); });
      el.querySelectorAll('.mb').forEach(b => { b.style.background = mix(C.paper2, C.navy3, act); });
      el.querySelector('.si').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.si'), ic, act > 0.5 ? C.gold2 : C.gold, 30, 2.2);
      const g = M.o3((t - tP0 - 0.6 - i * 0.1) / 0.7);
      const mo = $('#mo' + i), me = $('#me' + i);
      mo.style.width = (312 * fo / 5 * g).toFixed(1) + 'px'; mo.style.background = mix(C.gold, C.gold2, act);
      me.style.width = (312 * ef / 5 * g).toFixed(1) + 'px'; me.style.background = mix(C.ink, '#FFFFFF', act);
    });
    M.vis($('#pe'), t, tP0 + 0.35, tPout, { dy: 36, ...o });
    for (let k = 0; k < 5; k++) {
      const tin = k ? tP[k - 1] : tP0 + 0.6, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pt3'), t, tin + 0.5, { st: 0.03, out: tout, outDur: 0.2 });
    }
  }

  /* ===== I: industrial products ===== */
  const iOn = t >= tI1 - 0.1 && t < tK0 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    const il = $('#ill2'); M.vis(il, t, tI1 + 0.05, tIout, { dy: 36, ...o }); grow(il, $('#ill2Out'), t, tI[0]);
    M.vis($('#kitImg'), t, tI1 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#bv'), t, tI[0] + 0.12, tIout, { dx: 60, dy: 0, ...o });
    DF.forEach(([ic], i) => {
      const el = $('#df' + i); M.vis(el, t, tI[i] + 0.05, 1e9, { dy: 18 });
      const on = M.io((t - tI[i]) / 0.3) * (1 - (i < 2 ? M.io((t - tI[i + 1]) / 0.3) : M.io((t - tIout + 0.3) / 0.3)));
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, on);
      el.querySelector('.dt').style.color = mix(C.ink, '#fff', on); el.querySelector('.dm').style.color = mix(C.ink2, C.gold2, on);
      const bd = el.querySelector('.bd'); bd.style.background = mix('#fff', C.navy2, on); setIco(bd, ic, on > 0.5 ? C.gold2 : C.gold, 34, 2.2);
    });
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
    M.vis($('#pc0'), t, tX4 + 0.4, 1e9, { dx: 24, dy: 0 }); M.vis($('#pc0 .c'), t, wt('X4', 'grab') - 0.05, 1e9, pop);
    M.vis($('#pc1'), t, tFan - 0.1, 1e9, { dx: 24, dy: 0 }); M.vis($('#pc1 .c'), t, wt('X4', 'specialty') - 0.05, 1e9, pop);
    M.vis($('#fx'), t, tNaniX, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX5 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX5 + 0.15, 1e9, { dy: 40 });
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
