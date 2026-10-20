// MBA - Marketing Management, Ep 20: Branding Fundamentals (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', goldD: '#8F6620', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', ld: '#A8713A', ldD: '#7E5428', cocoa: '#6B4A2E', cream: '#F3EAD6', plain: '#E7E0D2', plainD: '#CFC6B4' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  palette: ['M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z', 'M13.5 6.5h.01', 'M17.5 10.5h.01', 'M6.5 12.5h.01', 'M8.5 7.5h.01'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  barrel: ['M6 3h12', 'M6 21h12', 'M6 3c-1.6 3-1.6 15 0 18', 'M18 3c1.6 3 1.6 15 0 18', 'M4.4 8h15.2', 'M4.4 16h15.2'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  type: ['M4 7V4h16v3', 'M9 20h6', 'M12 4v16'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tPlain = wt('H2', 'Plain'), tSmall = wt('H2', 'small');
const tGood = wt('C2', 'good'), tStrong = wt('C2', 'strong'), tNot = wt('C2', 'not');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tJob = [wt('L2', 'spot'), wt('L2', 'remember'), wt('L2', 'copy')], tNani = wt('L3', 'Nani'), tTruth = wt('L3', 'truth');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M0') - 0.32;
const tName = wt('D2', 'name'), tApart = wt('D2', 'apart'), tBurn = [wt('D3', 'burning'), wt('D3', 'barrels'), wt('D3', 'theirs')], tProm = wt('D4', 'promise'), tMark = wt('D4', 'mark');
const tM0 = T0('M0'), tMl = Array.from({ length: 9 }, (_, i) => T0('M' + (i + 1))), tMout = T0('T1') - 0.32;
const tWm = wt('M1', 'Laddoo'), tN3 = [wt('M1', 'Short'), wt('M1', 'easy'), wt('M1', 'tells')];
const tCk = [wt('M2', 'memorable'), wt('M2', 'meaningful'), wt('M2', 'likable'), wt('M3', 'stretch'), wt('M3', 'adapt'), wt('M3', 'protected')], tPass = wt('M3', 'passes');
const tRound = wt('M4', 'round'), tLeaf = wt('M4', 'leaf'), tRemove = wt('M5', 'removes'), tCoin = wt('M5', 'coin');
const tNavy = wt('M6', 'Navy'), tGoldW = wt('M6', 'gold'), tCream = wt('M6', 'cream');
const tTagW = wt('M7', 'healthy'), tStands = wt('M7', 'stands'), tPackW = wt('M8', 'pack'), tBand = wt('M8', 'band'), tSpot = wt('M9', 'spots');
const tDone = [tPass, tCoin + 0.3, tCream + 0.3, tStands, tBand + 0.2], tStart = [tMl[0], tMl[3], tMl[5], tMl[6], tMl[7]];
const tPane = [tM0 + 0.4, tMl[0], tMl[1], tMl[3], tMl[5], tMl[6], tMl[7], tMl[8]];
const tT = T0('T1'), tSt2 = wt('T1', 'brand'), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'food'), wt('K2', 'bank'), wt('K3', 'airline'), wt('K4', 'phone')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'trust'), wt('X2', 'back')], tXh = [wt('X3', 'once'), wt('X3', 'falls')];
const tDevX = wt('X4', 'Dev'), tNaniX = wt('X4', 'Nani'), tProve = wt('X4', 'prove'), tTrueX = wt('X5', 'true'), tAct = wt('X6', 'Trade');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'parts');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'name'), wt('S2', 'logo'), wt('S2', 'symbol')], [wt('S3', 'memorable'), wt('S3', 'meaningful'), wt('S3', 'protectable')], [wt('S4', 'kept')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// Laddoo Lab logo: gold laddoo + navy leaf, in a 120-unit box centred at 60,60
const logo = (id = '') => `<g ${id ? `id="${id}"` : ''}><circle ${id ? `id="${id}c"` : ''} cx="56" cy="64" r="44" fill="${C.gold}" stroke="${C.goldD}" stroke-width="4"/>
  <g ${id ? `id="${id}s"` : ''} fill="${C.goldD}"><circle cx="40" cy="52" r="5.5"/><circle cx="66" cy="58" r="5"/><circle cx="50" cy="80" r="5.5"/><circle cx="74" cy="82" r="4.5"/></g>
  <path ${id ? `id="${id}l"` : ''} d="M84 30 C92 10 112 6 118 4 C118 20 110 40 88 42 Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
  <path ${id ? `id="${id}v"` : ''} d="M88 40 C96 28 104 18 114 9" fill="none" stroke="${C.cream}" stroke-width="2.5" stroke-linecap="round"/></g>`;
// a pack: navy body, logo, wordmark, flavour band
const pack = (x, y, s, band, bandTxt, txtCol = '#fff', id = '') => `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y}) scale(${s})">
  <path d="M14 20 L146 20 L152 252 Q152 262 142 262 L18 262 Q8 262 8 252 Z" fill="${C.ink}"/><rect x="10" y="6" width="140" height="22" rx="5" fill="${C.navy2}"/>
  <g transform="translate(48 44) scale(0.5)">${logo()}</g>
  <text x="80" y="134" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="17" letter-spacing="1.5" fill="${C.cream}">LADDOO LAB</text>
  <rect x="10" y="168" width="140" height="40" fill="${band}"/><text x="80" y="194" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="12" letter-spacing="1.2" fill="${txtCol}">${bandTxt}</text></g>`;
const plainPack = (x, y, s, txt, id = '') => `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y}) scale(${s})">
  <path d="M14 20 L146 20 L152 252 Q152 262 142 262 L18 262 Q8 262 8 252 Z" fill="${C.plain}"/><rect x="10" y="6" width="140" height="22" rx="5" fill="${C.plainD}"/>
  <text x="80" y="140" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="13" fill="#9A917F">${txt}</text></g>`;
// A: two look-alike packs
$('#look').innerHTML = plainPack(30, 30, 1.05, 'laddoo lab', 'pkA') + plainPack(316, 30, 1.05, 'millet laddoos', 'pkB') +
  `<g id="qm" transform="translate(260 170)"><circle r="30" fill="#F6E3DC"/><text y="12" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="#B5482F">?</text></g>
   <text x="114" y="350" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">LADDOO LAB</text>
   <text x="400" y="350" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">THE BAKERY</text>
   <rect id="ring0" x="22" y="22" width="184" height="302" rx="20" fill="none" stroke="#B5482F" stroke-width="3" stroke-dasharray="6 8"/>
   <rect id="ring1" x="308" y="22" width="184" height="302" rx="20" fill="none" stroke="#B5482F" stroke-width="3" stroke-dasharray="6 8"/>
   <text id="lookT" x="257" y="410" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="26" fill="#14213D">Which one is which?</text>`;
const SAW = [['package', 'Same shape'], ['palette', 'Same colour'], ['type', 'Tiny name']];
$('#saw').innerHTML = SAW.map(([ic, t], i) => `<div class="stp" id="sw${i}" style="top:76px;background:#F6E3DC;color:#B5482F">${M.icon(ic, 26, C.red, 2.4)}<span>${t}</span></div>`).join('') +
  `<div class="serif" id="mixT" style="position:absolute;left:36px;top:170px;font-size:56px;white-space:nowrap">Easy to <span class="acc">mix up.</span></div>`;
$('#wrongPI').innerHTML = M.icon('x', 20, C.red, 2.8);
const METH = [['check', 'Good product', 0], ['x', 'Strong brand', 1]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="stp" id="mt${i}" style="top:76px;${bad ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, bad ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L: brief tiles
const JOB = [['eye', 'GOAL 1', 'Easy to spot'], ['bulb', 'GOAL 2', 'Easy to remember'], ['shield', 'GOAL 3', 'Hard to copy']];
$('#jobRow').innerHTML = JOB.map(([ic, n, t], i) => `<div class="wt" id="jb${i}" style="left:${36 + i * 248}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${t}</div></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: burn tiles
const BRN = [['flame', 'THE OLD WORD', 'Burning'], ['barrel', 'MARKED ON', 'Barrels, cattle'], ['user', 'TO SHOW', 'Whose it is']];
$('#burnRow').innerHTML = BRN.map(([ic, n, t], i) => `<div class="wt" id="bn${i}" style="left:${36 + i * 248}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${t}</div></div>`).join('');
$('#promPI').innerHTML = M.icon('eye', 24, C.gold2, 2.2);
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the brand board */
$('#lock').innerHTML = `<rect id="lkBg" x="0" y="0" width="170" height="170" rx="28" fill="${C.cream}"/>
  <g transform="translate(22 18) scale(1.08)">${logo('lg')}</g>
  <g id="lkX" fill="none" stroke="#B9B1A3" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 7"><circle cx="82" cy="88" r="72"/><path d="M14 30 L30 44"/><path d="M150 140 L162 156"/><path d="M8 120 C20 150 40 162 60 166"/></g>`;
$('#coin').innerHTML = `<g transform="translate(6 10) scale(0.42)">${logo()}</g><circle cx="108" cy="38" r="26" fill="none" stroke="#B9B1A3" stroke-width="3"/><text x="108" y="44" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="16" fill="#8A8274">₹1</text>
  <text x="75" y="100" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">COIN SIZE TEST</text>`;
const SLOT = [['type', 'Name'], ['award', 'Logo'], ['palette', 'Colours'], ['quote', 'Tagline'], ['package', 'Pack']];
$('#slots').innerHTML = SLOT.map(([ic, n], i) => `<div class="sl" id="sl${i}" style="left:${48 + i * 170}px"><div class="zn">TO DO</div><div class="zi"></div><div class="zt">${n}</div></div>`).join('');
const rw3 = (id, top, ic, txt) => `<div class="rw3" id="${id}" style="top:${top}px"><i>${M.icon(ic, 28, C.gold, 2.4)}</i><span>${txt}</span></div>`;
const CKS = ['Memorable', 'Meaningful', 'Likable', 'Transferable', 'Adaptable', 'Protectable'];
const shelf = () => {
  const items = [['p', 0], ['o', 0], ['p', 1], ['o', 1], ['p', 2], ['o', 2]];
  let x = 6, out = `<line x1="0" y1="262" x2="600" y2="262" stroke="#B9B1A3" stroke-width="5" stroke-linecap="round"/>`;
  const BANDS = [[C.gold, 'ORIGINAL', '#fff'], [C.cocoa, 'COCOA-RAGI', '#fff'], [C.cream, 'COCONUT-JOWAR', C.ink]];
  items.forEach(([k, i], j) => { const px = 8 + j * 99; out += k === 'p' ? plainPack(px, 60, 0.6, '') : pack(px, 60, 0.6, ...BANDS[i], `sh${i}`); });
  out += [1, 3, 5].map((j, i) => `<rect id="shR${i}" x="${8 + j * 99 - 2}" y="54" width="100" height="168" rx="14" fill="none" stroke="#B8862F" stroke-width="4"/>`).join('');
  return out;
};
const PANES = [
  ['THE BRAND ELEMENTS', 'Five pieces', 'that make a brand easy to spot', [rw3('r00', 236, 'eye', 'Seen: logo, colours, pack'), rw3('r01', 324, 'message', 'Said: the name and tagline')]],
  ['PIECE 1 · THE NAME', 'Laddoo Lab', '', [rw3('r10', 176, 'check', 'Short'), rw3('r11', 264, 'check', 'Easy to say'), rw3('r12', 352, 'check', 'Says what is inside')]],
  ['KEVIN LANE KELLER · SIX CHECKS', 'Does it pass?', '', [CKS.map((c, i) => `<div class="ck" id="ck${i}" style="left:${(i >= 3) * 310}px;top:${176 + (i % 3) * 80}px"><i></i><span>${c}</span></div>`).join('') + `<div class="pill" id="ckP" style="left:0;top:432px;background:#14213D;color:#fff">${M.icon('check', 22, C.gold2, 3)}<span>Passes all six</span></div>`]],
  ['PIECE 2 · THE LOGO', 'A laddoo and a leaf', '', [rw3('r30', 176, 'laddoo', 'Round laddoo: what we make'), rw3('r31', 264, 'leaf', 'Leaf: made to be healthy'), rw3('r32', 352, 'check', 'Still clear at coin size')]],
  ['PIECE 3 · THE COLOURS', 'Three colours', '', [[[C.ink, '#fff', C.gold2, 'NAVY', 'Trust'], [C.gold, '#fff', '#F7E7C6', 'JAGGERY GOLD', 'Warmth'], [C.cream, C.ink, C.muted, 'CREAM', 'Home-made']].map(([bg, fg, lc, l, v], i) => `<div class="sw" id="cw${i}" style="top:${176 + i * 108}px;background:${bg}"><div class="kl" style="color:${lc}">${l}</div><div class="kt" style="color:${fg}">${v}</div></div>`).join('')]],
  ['PIECE 4 · THE TAGLINE', '', '', [`<div class="serif tq" id="tq0" style="top:96px">"The healthy sweet</div><div class="serif tq" id="tq1" style="top:158px">for <span class="acc">tiffin boxes."</span></div>` + rw3('r50', 288, 'target', 'Says where Laddoo Lab stands') + rw3('r51', 376, 'check', 'True: healthy, no refined sugar')]],
  ['PIECE 5 · THE PACK', 'One look, three flavours', '', [`<svg id="pk3" width="600" height="320" style="position:absolute;left:0;top:168px">${pack(20, 10, 1.05, C.gold, 'ORIGINAL', '#fff', 'pa0')}${pack(214, 10, 1.05, C.cocoa, 'COCOA-RAGI', '#fff', 'pa1')}${pack(408, 10, 1.05, C.cream, 'COCONUT-JOWAR', C.ink, 'pa2')}</svg>`]],
  ['THE SHELF TEST', 'Spotted in a second', '', [`<svg id="shf" width="600" height="300" style="position:absolute;left:0;top:168px">${shelf()}</svg>`]],
];
$('#sPans').innerHTML = PANES.map(([s, n, mtxt, inner], i) => `<div class="sp" id="sp${i}"><div class="ps">${s}</div>${n ? `<div class="serif pt">${n}</div>` : ''}${mtxt ? `<div class="pm">${mtxt}</div>` : ''}${inner.join('')}</div>`).join('');

// K
const KA = [
  ['type', 'Names', 'Short and easy to say', 'Laddoo Lab says what is inside', 'phone', 'A delivery app picks a short, easy name'],
  ['award', 'Logos', 'Simple enough to shrink', 'The laddoo and leaf, at coin size', 'bank', "A bank's logo works on a tiny screen"],
  ['palette', 'Colours', 'The same colours everywhere', 'Navy, jaggery gold and cream', 'plane', 'An airline paints every plane alike'],
  ['quote', 'Taglines', 'One short, true line', 'The healthy sweet for tiffin boxes', 'megaphone', 'A phone maker repeats one line in every ad'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['BRANDS TODAY', 'Four pieces', 'You see them a hundred times a day', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A LADDOO PACK TO AN AIRLINE</div><div class="pe"><i>${M.icon('award', 34, C.gold, 2.2)}</i><span>Name, logo, colours, tagline</span></div>`) + `</div>`).join('');

// P: icons
$('#cb0I').innerHTML = M.icon('clock', 34, C.gold, 2.2); $('#cb1I').innerHTML = M.icon('shield', 34, C.gold, 2.2);
$('#cb2I').innerHTML = M.icon('heart', 34, C.ink, 2.2); $('#cb3I').innerHTML = M.icon('lock', 34, C.ink, 2.2);

// X
const XG = [['heart', 'Earns trust'], ['repeat', 'Brings people back']];
const XH = [['ban', 'One broken promise'], ['trendDown', 'Trust falls fast']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#pack').innerHTML = `<g transform="translate(26 22) scale(1.18)">
  <path d="M14 20 L146 20 L152 252 Q152 262 142 262 L18 262 Q8 262 8 252 Z" fill="${C.ink}"/><rect x="10" y="6" width="140" height="22" rx="5" fill="${C.navy2}"/>
  <g transform="translate(48 40) scale(0.5)">${logo()}</g>
  <text x="80" y="126" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="17" letter-spacing="1.5" fill="${C.cream}">LADDOO LAB</text>
  <rect x="10" y="150" width="140" height="44" fill="${C.gold}"/>
  <text id="clm0" x="80" y="178" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="1" fill="#fff">BEST IN INDIA</text>
  <text id="clm1" x="80" y="178" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="12" letter-spacing="1" fill="#fff">RAGI + JAGGERY</text>
  <line id="strk" x1="30" y1="173" x2="130" y2="173" stroke="#B5482F" stroke-width="5" stroke-linecap="round"/>
  <g id="pkOk" transform="translate(126 232)"><circle r="18" fill="#FFFFFF" stroke="#B8862F" stroke-width="4"/><path d="M-7 0 l5 5 l10 -10" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('lock', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz + recap
const OPTS = ['Brand elements', 'Product levels', 'Price points', 'Sales channels'], RIGHT = 0;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('award', 44, C.gold2, 2.4);
const ROWS = [['award', 'A brand sets you apart', ['Name', 'Logo', 'Symbol']], ['check', 'Good elements pass the checks', ['Memorable', 'Meaningful', 'Protectable']], ['heart', 'A brand is a promise', ['Keep it']]];
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
const svgPop = (el, t, tin, sc0 = 0.6) => {
  const p = M.spring(t - tin, M.POP), base = el._base ?? (el._base = el.getAttribute('transform') || '');
  if (t < tin) { M.hide(el, true); return; } M.hide(el, false);
  el.style.opacity = M.clamp((t - tin) / 0.1).toFixed(3);
  attr(el, 'transform', p >= 1 ? base : `${base} translate(0 ${((1 - p) * 30).toFixed(2)})`);
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#sw' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  x = 36; for (let i = 0; i < 2; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  for (let i = 0; i < 4; i++) { const q = $('#qa' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(32 * 688 / q.offsetWidth) + 'px'; }
  { const wm = $('#wm'); if (wm.offsetWidth > 470) wm.style.fontSize = Math.floor(88 * 470 / wm.offsetWidth) + 'px'; $('#coin').style.left = (236 + wm.offsetWidth + 36) + 'px'; }
  { const tg = $('#tag'); if (tg.offsetWidth > 640) tg.style.fontSize = Math.floor(32 * 640 / tg.offsetWidth) + 'px'; }
  document.querySelectorAll('.sp .pt').forEach(el => { if (el.offsetWidth > 590) el.style.fontSize = Math.floor(56 * 590 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.cb .kt').forEach(el => { if (el.offsetWidth > 656) el.style.fontSize = Math.floor(26 * 656 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.cb .cs2').forEach(el => { if (el.offsetWidth > 560) el.style.fontSize = Math.floor(26 * 560 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.xr .bb').forEach(el => { if (el.offsetWidth > 332) el.style.fontSize = Math.floor(22 * 332 / el.offsetWidth) + 'px'; });
  { const k = $('#fact .kt'); if (k.offsetWidth > 560) k.style.fontSize = Math.floor(28 * 560 / k.offsetWidth) + 'px'; }
  { const k = $('#takeT'); if (k.offsetWidth > 1440) k.style.fontSize = Math.floor(40 * 1440 / k.offsetWidth) + 'px'; }
  { let f = 40; OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) f = Math.min(f, Math.floor(40 * 312 / o.offsetWidth)); }); OPTS.forEach((_, i) => { $('#o' + i + ' .ot').style.fontSize = f + 'px'; }); }
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const tileOn = (el, ic, t, ta, tb) => {
  const on = M.io((t - ta) / 0.25) * (tb ? 1 - M.io((t - tb) / 0.25) : 1);
  el.style.background = mix(C.paper, C.ink, on);
  el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
  setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
};

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

  /* ===== A ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    svgPop($('#pkA'), t, tMorph + 0.4); svgPop($('#pkB'), t, tMorph + 0.55);
    M.vis($('#qm'), t, tMorph + 0.9, 1e9, { dy: 0, fade: 0.15 });
    for (let i = 0; i < 2; i++) M.draw($('#ring' + i), t, tPlain - 0.05 + i * 0.12, 0.5, M.o3);
    M.vis($('#lookT'), t, tMorph + 1.1, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.vis($('#wrongP'), t, tMorph + 0.6, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    [tMorph + 0.8, tPlain - 0.05, tSmall - 0.1].forEach((ta, i) => M.vis($('#sw' + i), t, ta, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.rise($('#mixT'), t, tSmall + 0.3, { st: 0.07, sp: M.HEAVY });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tGood - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mt1'), t, tStrong - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tNot - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#job'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    JOB.forEach(([ic], i) => { const el = $('#jb' + i); M.vis(el, t, Math.max(tL2 + 0.35, tJob[i] - 0.1), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); tileOn(el, ic, t, tJob[i], i < 2 ? tJob[i + 1] : tL3); });
    M.vis($('#nrule'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    M.vis($('#nrF'), t, tNani - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#nq0'), t, tTruth - 0.25, { st: 0.06, sp: M.HEAVY }); M.rise($('#nq1'), t, tTruth + 0.2, { st: 0.06, sp: M.HEAVY });
  }

  /* ===== D ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.rise($('#amaB'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kqHr'), t, tD2 + 0.5, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) M.vis($('#qa' + i), t, tName - 0.2 + i * 0.12, 1e9, { dy: 14 });
    [tName, tApart].forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#h' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#burn'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    BRN.forEach(([ic], i) => { const el = $('#bn' + i); M.vis(el, t, Math.max(tD3 + 0.35, tBurn[i] - 0.1), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); tileOn(el, ic, t, tBurn[i], i < 2 ? tBurn[i + 1] : tD4); });
    M.vis($('#prom'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    M.rise($('#promT'), t, tProm - 0.4, { st: 0.07, sp: M.HEAVY });
    M.vis($('#promP'), t, tMark - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== M: the brand board ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#bld'), t, tM0 + 0.05, tMout, { dy: 36, ...o });
    M.vis($('#bldHr'), t, tM0 + 0.3, 1e9, { dy: 0 }); M.vis($('#bldV'), t, tM0 + 0.3, 1e9, { dy: 0 });
    M.vis($('#slL'), t, tM0 + 0.35, 1e9, { dy: 8 });
    // name
    M.rise($('#wm'), t, tWm - 0.05, { st: 0.07, sp: M.HEAVY });
    $('#wm').style.color = mix(C.muted, C.ink, M.io((t - tNavy) / 0.3));
    // logo: draw as an outline sketch, then fill with colour
    M.vis($('#lock'), t, tRound - 0.15, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const gU = M.io((t - tGoldW) / 0.35), nU = M.io((t - tNavy) / 0.35), cU = M.io((t - tCream) / 0.35);
    attr($('#lkBg'), 'fill', mix('#FFFFFF', C.cream, cU));
    const lc = $('#lgc'); M.draw(lc, t, tRound - 0.1, 0.7, M.o3); attr(lc, 'fill', gU > 0 ? mix('#FFFFFF', C.gold, gU) : 'none'); attr(lc, 'stroke', mix(C.ink, C.goldD, gU));
    if (t > tRound + 0.7) lc.style.strokeDasharray = 'none';
    attr($('#lgs'), 'fill', mix(C.ink, C.goldD, gU)); M.vis($('#lgs'), t, tRound + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const ll = $('#lgl'); M.draw(ll, t, tLeaf - 0.1, 0.5, M.o3); attr(ll, 'fill', nU > 0 ? mix('#FFFFFF', C.ink, nU) : 'none');
    if (t > tLeaf + 0.5) ll.style.strokeDasharray = 'none';
    M.vis($('#lgv'), t, tNavy + 0.2, 1e9, { dy: 0, fade: 0.2 });
    { const x = M.io((t - tLeaf - 0.3) / 0.3) * (1 - M.io((t - tRemove) / 0.5)); $('#lkX').style.opacity = x.toFixed(3); M.hide($('#lkX'), x <= 0); }
    M.vis($('#coin'), t, tCoin - 0.1, 1e9, { dy: 10 });
    M.rise($('#tag'), t, tTagW - 0.1, { st: 0.05 });
    // slots
    SLOT.forEach(([ic], i) => {
      const el = $('#sl' + i); M.vis(el, t, tM0 + 0.45 + i * 0.08, 1e9, { dy: 14 });
      const act = M.io((t - tStart[i]) / 0.25) * (1 - M.io((t - tDone[i]) / 0.25)), dn = M.io((t - tDone[i]) / 0.25);
      el.style.background = mix(mix(C.paper, C.ink, act), C.gold3, dn);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', act);
      const zn = el.querySelector('.zn'); M.setT(zn, dn > 0.5 ? 'DONE' : act > 0.5 ? 'NOW' : 'TO DO'); zn.style.color = dn > 0.5 ? C.gold : act > 0.5 ? C.gold2 : C.muted;
      const zi = el.querySelector('.zi'); zi.style.background = act > 0.5 ? C.navy2 : (dn > 0.5 ? C.gold : '#fff');
      setIco(zi, dn > 0.5 ? 'check' : ic, dn > 0.5 ? '#fff' : act > 0.5 ? C.gold2 : C.gold, 24, 2.4);
    });
    // panes
    for (let k = 0; k < 8; k++) {
      const tin = tPane[k], tout = k < 7 ? tPane[k + 1] - 0.14 : 1e9;
      const pn = $('#sp' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      const pt = pn.querySelector('.pt'); if (pt) M.rise(pt, t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      const pm = pn.querySelector('.pm'); if (pm) M.rise(pm, t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
    }
    M.vis($('#r00'), t, tPane[0] + 0.6, tPane[1] - 0.14, { dy: 14, outDur: 0.18 }); M.vis($('#r01'), t, tPane[0] + 0.75, tPane[1] - 0.14, { dy: 14, outDur: 0.18 });
    for (let i = 0; i < 3; i++) M.vis($('#r1' + i), t, Math.max(tPane[1] + 0.3, tN3[i] - 0.1), tPane[2] - 0.14, { dy: 14, outDur: 0.18 });
    CKS.forEach((_, i) => {
      const el = $('#ck' + i); M.vis(el, t, tPane[2] + 0.3 + i * 0.06, tPane[3] - 0.14, { dy: 12, outDur: 0.18 });
      const on = M.io((t - tCk[i]) / 0.25); el.style.background = mix(C.paper, C.gold3, on);
      const ii = el.querySelector('i'); ii.style.background = on > 0.5 ? C.gold : '#fff'; setIco(ii, on > 0.5 ? 'check' : 'help', on > 0.5 ? '#fff' : C.dim, 22, 2.6);
    });
    M.vis($('#ckP'), t, tPass - 0.05, tPane[3] - 0.14, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.18 });
    [tRound, tLeaf, tCoin].forEach((ta, i) => M.vis($('#r3' + i), t, Math.max(tPane[3] + 0.3, ta - 0.1), tPane[4] - 0.14, { dy: 14, outDur: 0.18 }));
    [tNavy, tGoldW, tCream].forEach((ta, i) => M.vis($('#cw' + i), t, Math.max(tPane[4] + 0.3, ta - 0.1), tPane[5] - 0.14, { dx: 30, dy: 0, outDur: 0.18 }));
    M.rise($('#tq0'), t, tPane[5] + 0.1, { st: 0.06, sp: M.HEAVY, out: tPane[6] - 0.14, outDur: 0.2 }); M.rise($('#tq1'), t, tPane[5] + 0.35, { st: 0.06, sp: M.HEAVY, out: tPane[6] - 0.14, outDur: 0.2 });
    M.vis($('#r50'), t, tStands - 0.4, tPane[6] - 0.14, { dy: 14, outDur: 0.18 }); M.vis($('#r51'), t, tStands, tPane[6] - 0.14, { dy: 14, outDur: 0.18 });
    for (let i = 0; i < 3; i++) svgPop($('#pa' + i), t, tPackW + i * 0.25);
    for (let i = 0; i < 3; i++) { const r = $('#shR' + i); M.draw(r, t, tSpot - 0.1 + i * 0.1, 0.4, M.o3); }
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

  /* ===== P: why a brand matters ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#wb'), t, tP0 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#ws'), t, tP0 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 4; i++) {
      const el = $('#cb' + i); M.vis(el, t, tP[i] - 0.05, 1e9, { dy: 16 });
      const act = M.io((t - tP[i]) / 0.3) * (1 - (i < 3 ? M.io((t - tP[i + 1]) / 0.3) : 0));
      el.style.background = mix(C.paper, C.gold3, act);
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
    M.vis($('#pack'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#clm0'), t, tDevX + 0.3, tTrueX - 0.1, { dy: 0, fade: 0.15, outDur: 0.2, ody: 0 });
    M.draw($('#strk'), t, tProve - 0.05, 0.35, M.o3); if (t > tTrueX - 0.1) M.hide($('#strk'), true);
    M.vis($('#clm1'), t, tTrueX + 0.05, 1e9, { dy: 0, fade: 0.2 });
    { const u = M.clamp((t - tTrueX - 0.3) / 0.12); $('#pkOk').style.opacity = u.toFixed(3); M.hide($('#pkOk'), u <= 0); }
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tNaniX, tTrueX - 0.3][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tProve ? C.redBg : C.paper; $('#bb0').style.color = t > tProve ? C.red : C.ink;
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
