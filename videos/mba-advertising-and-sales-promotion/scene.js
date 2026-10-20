// MBA - Marketing Management, Ep 29: Advertising and Sales Promotion (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', grey: '#CFC6B5' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  gift: ['M3 8h18v4H3z', 'M12 8v13', 'M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7', 'M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5'],
  stand: ['M4 3h16v12H4z', 'M4 9h16', 'M8 15v6', 'M16 15v6', 'M6 21h12'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  sparkle: ['M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tTiny = wt('H2', 'tiny'), tHeard = wt('H2', 'heard');
const tC2 = T0('C2'), tTool = [wt('C2', 'advertising'), wt('C2', 'sales')];
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tDev = wt('L1', 'Dev'), tArj = wt('L1', 'Arjun'), tJob = [wt('L2', 'reason'), wt('L2', 'now')], tOneM = wt('L3', 'one'), tDiw = wt('L3', 'Diwali');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('O0') - 0.32;
const tKey = [wt('D3', 'Paid'), wt('D3', 'Non'), wt('D3', 'everyone')], tShort = wt('D4', 'short'), tEnc = wt('D4', 'encourage'), tNowD = wt('D4', 'now');
// O: three jobs of an ad
const tA0 = T0('O0'), tA = [1, 2, 3].map(i => T0('O' + i)), tOout = T0('M1') - 0.32;
const tAd = [wt('O1', 'Laddoo'), wt('O2', 'No'), wt('O3', 'poster')];
// M: six weeks
const tM = [0, 1, 2, 3, 4, 5, 6, 7].map(i => i ? T0('M' + i) : 0);
const tB = [wt('M2', 'one'), wt('M2', 'two'), wt('M3', 'starts'), wt('M4', 'four'), wt('M4', 'five'), wt('M6', 'six')];
const tAdStart = wt('M3', 'ad'), tSlow = wt('M3', 'slowly'), tBuy2 = wt('M4', 'Buy'), tJump = wt('M5', 'jump'), tFirst = wt('M5', 'first'), tEnds = wt('M6', 'ends'), tDropB = wt('M6', 'drop');
const tNotAll = wt('M7', 'not'), tHigher = wt('M7', 'higher');
const tMout = T0('T1') - 0.32;
const tT = T0('T1'), tSt2 = wt('T1', 'Promotion'), tP0 = T0('P0'), tTu = tP0 - 0.32;
// P: tools
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'drink'), wt('K3', 'food'), wt('K4', 'supermarket')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'hear'), wt('X2', 'try')], tXh = [wt('X3', 'offers'), wt('X3', 'stretch')];
const tDevX = wt('X4', 'Dev'), tZoyX = wt('X4', 'Zoya'), tNo = wt('X4', 'No'), tGoes = wt('X4', 'goes'), tAsci = wt('X5', 'Advertising');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'short');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tNx = T0('N1');
const tPill = [[wt('S2', 'informs'), wt('S2', 'persuades'), wt('S2', 'reminds')], [wt('S3', 'samples'), wt('S3', 'coupons'), wt('S3', 'premiums'), wt('S3', 'displays')], [wt('S4', 'reason'), wt('S4', 'push')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;

// A: noise chips (generic, no brands) + two tools
const NZ = [[['MEGA SALE', 0], ['BUY 1 GET 1', 2], ['FREE GIFT', 1], ['BIG DEALS', 0]], [['FESTIVE COMBO', 1], null, ['SWEETS BOX', 2]], [['NEW OFFER', 0], ['LIMITED TIME', 1], ['DIWALI SPECIAL', 2]]];
const NZC = [[C.redBg, C.red], [C.ink, '#fff'], [C.gold3, C.gold]];
let nzi = 0; const NZL = [];
$('#nzs').innerHTML = NZ.map((row, r) => row.map(c => { if (!c) return ''; const [tx, k] = c, id = 'nz' + nzi++; NZL.push([id, r]); return `<div class="nz" id="${id}" style="top:${82 + r * 62}px;background:${NZC[k][0]};color:${NZC[k][1]}">${tx}</div>`; }).join('')).join('');
$('#dwI').innerHTML = M.icon('calendar', 20, C.gold2, 2.4);
const TL = [['megaphone', 'TOOL 1', 'Advertising'], ['tag', 'TOOL 2', 'Sales promotion']];
$('#tls').innerHTML = TL.map(([ic, n, t], i) => `<div class="tl2" id="tl${i}" style="left:${36 + i * 432}px"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><div class="zn">${n}</div><div class="zt">${t}</div></div>`).join('');
// L
$('#nDI').innerHTML = M.icon('megaphone', 22, C.gold2, 2.4); $('#nAI').innerHTML = M.icon('tag', 22, C.gold2, 2.4);
$('#jb0I').innerHTML = M.icon('megaphone', 30, C.gold, 2.2); $('#jb1I').innerHTML = M.icon('clock', 30, C.gold, 2.2);
$('#imcPI').innerHTML = M.icon('check', 20, '#fff', 3);
wrap($('#ill'), 'illOut', 784, 580);
// D
const VK = [['coin', 'PAID', 'Bought space'], ['users', 'NON-PERSONAL', 'Many at once'], ['megaphone', 'SPONSOR', 'Known speaker']];
$('#vRow').innerHTML = VK.map(([ic, n, t], i) => `<div class="sws" id="vk${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
$('#spPI').innerHTML = M.icon('clock', 20, '#fff', 2.6);
const SPR = [['clock', 'Buy now'], ['gift', 'Extra value'], ['calendar', 'Limited time']];
$('#spR').innerHTML = SPR.map(([ic, t], i) => `<div class="xc" id="sp${i}" style="top:196px;background:#F5F1E8;color:#14213D">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);
// O: three jobs of an ad
const OB = [['bulb', 'Inform', 'Tell people something new', 'NEW THIS DIWALI', 'The festive', 'gift box.'],
  ['heart', 'Persuade', 'Give a reason to choose you', 'WHY CHOOSE US', 'No refined sugar.', 'Made by Nani.'],
  ['repeat', 'Remind', 'Keep the brand in mind', 'SCHOOL GATE POSTER', 'Tiffin time?', 'Laddoo Lab.']];
$('#obs').innerHTML = OB.map(([ic, t, s, al, a1, a2], i) => `<div class="ob" id="ob${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="serif ot">${t}</div><div class="os">${s}</div>
  <div class="ad" id="ad${i}"><div class="al">${al}</div><div class="a1">${a1}</div><div class="a2">${a2}</div><svg width="200" height="48">${[24, 74, 124].map(x => laddoo(x, 24, 20)).join('')}</svg></div></div>`).join('');
// M: six-week chart. Inside a 1520 x 320 svg; baseline y 270, 1 pack = 1 px.
const V = [100, 100, 118, 190, 212, 132], CXW = i => 160 + i * 240, BW = 150, BASE = 292, NORM = BASE - 100;
$('#ch6S').innerHTML = `
  <rect id="bandAd" x="${CXW(2) - 112}" y="0" width="${CXW(5) - CXW(2) + 224}" height="${BASE}" rx="18" fill="#E9ECF3"/>
  <text id="bandAdT" x="${CXW(2) - 92}" y="28" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.5" fill="#3A4560">THE AD RUNS</text>
  <rect id="bandOf" x="${CXW(3) - 96}" y="0" width="${CXW(4) - CXW(3) + 192}" height="${BASE}" rx="16" fill="#F3EAD6"/>
  <text id="bandOfT" x="${CXW(3) - 76}" y="28" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.5" fill="#B8862F">FESTIVE OFFER</text>
  <path d="M0 ${BASE} H1520" stroke="#E2DACB" stroke-width="3"/>
  ${V.map((v, i) => `<rect id="b6${i}" x="${CXW(i) - BW / 2}" y="${BASE}" width="${BW}" height="0" rx="14" fill="${C.grey}"/><text id="v6${i}" x="${CXW(i)}" y="${BASE - 12}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="26" fill="#14213D"></text><text x="${CXW(i)}" y="${BASE + 34}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.5" fill="#8A8274">WEEK ${i + 1}</text>`).join('')}
  <path id="norm" d="M20 ${NORM} H1500" stroke="#8A8274" stroke-width="3" stroke-dasharray="4 10" stroke-linecap="round"/>
  <text id="normT" x="20" y="${NORM - 12}" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.5" fill="#8A8274">BEFORE</text>
  <path id="gap6" d="M${CXW(5) + BW / 2 + 22} ${NORM} V${BASE - V[5]}" stroke="#B8862F" stroke-width="5" stroke-linecap="round"/>
  <g id="gap6T" transform="translate(${CXW(5) + BW / 2 + 36} ${(NORM + BASE - V[5]) / 2 - 18})"><rect width="88" height="36" rx="18" fill="#B8862F"/><text x="44" y="24" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="16" fill="#fff">HIGHER</text></g>
  <g id="newF" transform="translate(${(CXW(3) + CXW(4)) / 2 - 104} ${BASE - 250})"><rect width="208" height="40" rx="20" fill="#14213D"/><text x="104" y="27" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="17" fill="#fff">First-time buyers</text></g>`;
// P: tools 2x2
const TC = [['laddoo', 'Samples', 'Free tastes', 'Free tastes at three shops'], ['tag', 'Coupons', 'A discount code', 'A code for the online shop'], ['gift', 'Premiums', 'A free gift with a buy', 'Buy two 6-packs, get a mini pack free'], ['stand', 'Point of purchase', 'A display where people pay', 'A bright stand by the billing counter']];
$('#tcs').innerHTML = TC.map(([ic, t, s, e], i) => `<div class="tc" id="tc${i}" style="left:${160 + (i % 2) * 816}px;top:${270 + Math.floor(i / 2) * 302}px"><div class="bg"></div><div class="ti"></div><div class="serif tt">${t}</div><div class="ts">${s}</div><div class="th"></div><div class="tx2">AT LADDOO LAB</div><div class="te">${e}</div></div>`).join('');
// K
const KA = [
  ['megaphone', 'Inform', 'Tell people something new', 'The festive gift box ad', 'phone', 'A phone maker runs ads to launch a new model'],
  ['repeat', 'Remind', 'Keep the brand in mind', 'The school gate poster, every morning', 'sun', 'A cold drink brand advertises every summer'],
  ['tag', 'Coupons', 'A reason to try it today', 'A discount code for the online shop', 'phone', 'A food app gives a code on your first order'],
  ['stand', 'Displays', 'Be seen where people pay', 'A bright stand by the billing counter', 'store', 'A supermarket puts snacks by the billing counter'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['ADS AND OFFERS TODAY', 'Four moves', 'Two from ads, two from promotion', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A LAUNCH TO THE BILLING COUNTER</div><div class="pe"><i>${M.icon('tag', 34, C.gold, 2.2)}</i><span>Inform, remind, coupons, displays</span></div>`) + `</div>`).join('');
// X
const XG = [['users', 'New people hear'], ['laddoo', 'New buyers try it']];
const XH = [['clock', 'They wait for deals'], ['ban', 'Stretched claims']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#pkL').innerHTML = [64, 100, 136].map(x => laddoo(x, 262, 16)).join('');
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('scale', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('laddoo', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Advertising', 'Sales promotion', 'Personal selling', 'Public relations'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('tag', 44, C.gold2, 2.4);
// recap
const ROWS = [['megaphone', 'Advertising: paid, for many, known sponsor', ['Inform', 'Persuade', 'Remind']], ['tag', 'Promotion: a short-term push', ['Samples', 'Coupons', 'Premiums', 'Displays']], ['trendUp', 'Ads build the reason, offers give the push', ['Reason', 'Push']]];
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
// six weeks: bar heights over time
const barH = (i, t) => {
  if (i === 2) return V[2] * M.io((t - tB[2]) / 2.2);
  if (i === 5) { const up = M.clamp(M.spring(t - tB[5], M.SOFT), 0, 1.04) * V[4]; return M.lerp(up, V[5], M.io((t - tDropB) / 0.6)); }
  return V[i] * M.clamp(M.spring(t - tB[i], M.SOFT), 0, 1.04);
};
const barCol = i => i < 2 ? C.grey : (i === 3 || i === 4) ? C.gold : C.ink2;

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // noise rows: spread each row across the card width, the tiny Laddoo Lab chip in the middle row
  const rows = [[], [], []]; NZL.forEach(([id, r]) => rows[r].push($('#' + id)));
  rows[1].splice(1, 0, $('#llTiny'));
  rows.forEach((els, r) => { const tot = els.reduce((a, e) => a + e.offsetWidth, 0), gap = (848 - tot) / (els.length - 1); let x = 36; els.forEach(e => { e.style.left = x.toFixed(1) + 'px'; if (e.id === 'llTiny') e.style.top = (82 + r * 62 + 4) + 'px'; x += e.offsetWidth + gap; }); });
  const pd = $('#nD'), pa = $('#nA'); pd.style.left = (222 - pd.offsetWidth / 2) + 'px'; pa.style.left = (562 - pa.offsetWidth / 2) + 'px';
  for (let i = 0; i < 2; i++) { const g = $('#jb' + i); g.querySelector('.id').style.left = (88 + g.querySelector('.in').offsetWidth + 16) + 'px'; }
  const ip = $('#imcP'); ip.style.right = 'auto'; ip.style.left = (748 - ip.offsetWidth) + 'px';
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  for (const id of ['spQ', 'spQ2']) { const q = $('#' + id); if (q.offsetWidth > 712) q.style.fontSize = Math.floor(26 * 712 / q.offsetWidth) + 'px'; }
  let x = 36; [0, 1, 2].forEach(i => { const c = $('#sp' + i); c.style.left = x + 'px'; x += c.offsetWidth + 14; });
  document.querySelectorAll('.ob .a1, .ob .a2').forEach(el => { if (el.offsetWidth > 376) el.style.fontSize = Math.floor(34 * 376 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.tc .te').forEach(el => { if (el.offsetWidth > 712) el.style.fontSize = Math.floor(28 * 712 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  for (const id of ['qq1', 'qq2']) { const q = $('#' + id); if (q.offsetWidth > 1400) q.style.fontSize = Math.floor(68 * 1400 / q.offsetWidth) + 'px'; }
  const tk = $('#takeT'); if (tk.offsetWidth > 1440) tk.style.fontSize = Math.floor(40 * 1440 / tk.offsetWidth) + 'px';
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
  M.vis($('#exChip'), t, tM[1] + 0.4, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: Diwali noise ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.vis($('#dw'), t, tMorph + 0.5, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    NZL.forEach(([id], i) => {
      const el = $('#' + id); M.vis(el, t, tMorph + 0.55 + i * 0.09, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.06 });
      const ph = (t - tMorph) * 7 + i * 1.7, s = t > tMorph + 1.5 && t < tC2 ? 1 + 0.035 * Math.max(0, Math.sin(ph)) : 1;
      if (t > tMorph + 1.4) el.style.transform = s === 1 ? 'none' : `scale(${s.toFixed(4)})`;
    });
    const tn = $('#llTiny'); M.vis(tn, t, tTiny - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    tn.style.borderColor = mix(C.dim, C.gold, M.io((t - tTiny) / 0.3)); tn.style.color = mix(C.muted, C.gold, M.io((t - tTiny) / 0.3));
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.rise($('#askQ'), t, tHeard - 0.1, { st: 0.06, sp: M.HEAVY, out: tTool[0] - 0.25, outDur: 0.25 });
    TL.forEach((_, i) => M.vis($('#tl' + i), t, tTool[i] - 0.1, 1e9, { dy: 0, sc: 0.75, sp: M.POP, fade: 0.1 }));
  }

  /* ===== L: Dev and Arjun ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#pD'), t, tDev - 0.1, 1e9, { dy: 30, sp: M.SOFT }); M.vis($('#nD'), t, tDev + 0.2, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#pA'), t, tArj - 0.1, 1e9, { dy: 30, sp: M.SOFT }); M.vis($('#nA'), t, tArj + 0.2, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#rcp'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    for (let i = 0; i < 2; i++) {
      const el = $('#jb' + i); M.vis(el, t, tJob[i] - 0.15, 1e9, { dy: 16 });
      const on = M.io((t - tJob[i]) / 0.25) * (1 - (i === 0 ? M.io((t - tJob[1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.gold3, on);
    }
    M.vis($('#team'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    M.rise($('#msgT'), t, tOneM - 0.05, { st: 0.06, sp: M.HEAVY }); M.rise($('#msgT2'), t, tDiw - 0.25, { st: 0.06, sp: M.HEAVY });
    M.vis($('#imcP'), t, tL3 + 0.5, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: definitions ===== */
  const dOn = t >= tD1 - 0.1 && t < tA0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY }); M.rise($('#kot2'), t, tD2 + 0.35, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, tD2 + 0.6, 1e9, { dy: 10 }); M.vis($('#kqHr'), t, tD2 + 0.7, 1e9, { dy: 0 });
    const tl = [wt('D2', 'any'), wt('D2', 'non'), wt('D2', 'promotion'), wt('D2', 'identified')];
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tD2 + 0.9 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tl[i] + 0.1) / 0.3)); }
    tKey.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    VK.forEach((_, i) => {
      const el = $('#vk' + i); M.vis(el, t, tKey[i] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tKey[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tKey[i + 1]) / 0.25) : M.io((t - tD4) / 0.3)));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), VK[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis($('#sw'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#spQ'), t, tShort - 0.1, 1e9, { dy: 12 }); M.vis($('#spQ2'), t, tShort + 0.1, 1e9, { dy: 12 });
    M.vis($('#spP'), t, tShort + 0.2, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    [tEnc, tEnc + 0.4, tNowD].forEach((ta, i) => M.vis($('#sp' + i), t, ta - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
  }

  /* ===== O: three jobs of an ad ===== */
  const oOn = t >= tA0 - 0.1 && t < tM[1] + 0.2; M.hide($('#sO'), !oOn);
  if (oOn) {
    const o = { outDur: 0.3, ody: -16 };
    OB.forEach(([ic], i) => {
      const el = $('#ob' + i), ta = tA[i], td = i < 2 ? tA[i + 1] : tOout + 1;
      M.vis(el, t, tA0 + 0.1 + i * 0.1, tOout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
      el.querySelector('.bg').style.boxShadow = `0 0 0 ${(4 * act).toFixed(2)}px ${C.gold}, 0 18px 40px -12px rgba(20,33,61,.14)`;
      el.querySelector('.sn').style.color = seen ? C.gold : C.dim;
      el.querySelector('.ot').style.color = seen ? mix(C.ink, C.gold, act) : C.dim;
      el.querySelector('.os').style.color = seen ? C.ink2 : C.dim;
      el.querySelector('.si').style.background = mix(C.paper, C.ink, act);
      setIco(el.querySelector('.si'), ic, act > 0.5 ? C.gold2 : (seen ? C.gold : C.dim), 34, 2.2);
      const ad = $('#ad' + i); M.vis(ad, t, tAd[i] - 0.3, tOout, { dy: 24, sp: M.SOFT, ...o });
      M.vis(ad.querySelector('.a1'), t, tAd[i] - 0.1, 1e9, { dy: 12 }); M.vis(ad.querySelector('.a2'), t, tAd[i] + 0.2, 1e9, { dy: 12 });
    });
  }

  /* ===== M: six weeks of sales ===== */
  const mOn = t >= tM[1] - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#ch6'), t, tM[1] + 0.1, tMout, { dy: 36, ...o });
    ['rdW', 'rdN', 'rdY'].forEach((id, i) => M.vis($('#' + id), t, tM[1] + 0.3 + i * 0.08, tMout, { dy: 36, ...o }));
    M.vis($('#ch6S'), t, tM[1] + 0.3, 1e9, { dy: 16, sp: M.SOFT });
    const bA = M.io((t - tAdStart + 0.1) / 0.4), bO = M.io((t - tBuy2 + 0.4) / 0.4) * (1 - M.io((t - tEnds) / 0.4));
    $('#bandAd').style.opacity = bA.toFixed(3); $('#bandAdT').style.opacity = bA.toFixed(3);
    $('#bandOf').style.opacity = bO.toFixed(3); $('#bandOfT').style.opacity = bO.toFixed(3);
    let cur = 0;
    V.forEach((v, i) => {
      const hh = Math.max(0, barH(i, t)), b = $('#b6' + i);
      attr(b, 'height', hh.toFixed(1)); attr(b, 'y', (BASE - hh).toFixed(1));
      const glow = (i === 3 || i === 4) ? M.io((t - tJump) / 0.3) * (1 - M.io((t - tEnds) / 0.4)) : 0;
      attr(b, 'fill', mix(barCol(i), '#D69A35', glow));
      const lab = $('#v6' + i); M.setT(lab, hh > 4 ? String(Math.round(hh)) : ''); attr(lab, 'y', (BASE - hh - 12).toFixed(1));
      if (t >= tB[i] - 0.05) cur = i;
    });
    const nv = $('#norm'), nt = $('#normT'), nu = M.clamp((t - tNotAll + 0.2) / 0.3);
    M.drawU(nv, M.io((t - tNotAll + 0.2) / 0.6)); nt.style.opacity = nu.toFixed(3);
    M.drawU($('#gap6'), M.io((t - tHigher + 0.3) / 0.4)); $('#gap6T').style.opacity = M.clamp((t - tHigher) / 0.2).toFixed(3);
    $('#newF').style.opacity = (M.clamp((t - tFirst + 0.5) / 0.25) * (1 - M.clamp((t - tEnds) / 0.3))).toFixed(3);
    M.setT($('#rdWv'), 'Week ' + (cur + 1));
    M.setT($('#rdNv'), String(Math.round(Math.max(0, barH(cur, t)))));
    $('#rdNv').style.color = cur === 3 || cur === 4 ? C.gold : C.ink;
    let ic = 'calendar', tx = 'Normal sales', st = 0;
    if (t >= tNotAll) { ic = 'trendUp'; tx = 'Still higher than before'; st = 2; }
    else if (t >= tEnds) { ic = 'trendDown'; tx = 'Offer ends, sales drop back'; st = 0; }
    else if (t >= tJump) { ic = 'users'; tx = 'Families try it for the first time'; st = 2; }
    else if (t >= tBuy2) { ic = 'gift'; tx = 'Buy two 6-packs, get a mini pack free'; st = 1; }
    else if (t >= tAdStart) { ic = 'megaphone'; tx = t >= tSlow ? 'The ad starts: a slow rise' : 'The ad starts'; st = 1; }
    const yp = $('#rdYP'); setIco($('#rdYI'), ic, st === 2 ? '#fff' : C.gold, 26, 2.4); M.setT($('#rdYT'), tx);
    const bg = st === 2 ? C.gold : st === 1 ? C.gold3 : C.paper; if (yp._bg !== bg) { yp._bg = bg; yp.style.background = bg; yp.style.color = st === 2 ? '#fff' : C.ink; }
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

  /* ===== P: promotion tools ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    TC.forEach(([ic], i) => {
      const el = $('#tc' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.05 + i * 0.08, tPout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act); el.querySelector('.bg').style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.tt').style.color = seen ? mix(C.ink, '#fff', act) : C.dim;
      el.querySelector('.ts').style.color = seen ? mix(C.ink2, C.gold2, act) : C.dim;
      el.querySelector('.th').style.background = mix(C.line, C.navy3, act);
      el.querySelector('.tx2').style.color = seen ? mix(C.muted, C.gold2, act) : C.dim;
      el.querySelector('.te').style.color = seen ? mix(C.ink, '#fff', act) : C.dim;
      el.querySelector('.ti').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ti'), ic, seen ? (act > 0.5 ? C.gold2 : C.gold) : C.dim, 36, 2.2);
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
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#pst'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#clm0'), t, tX4 + 0.5, tGoes - 0.4, { dy: 0, fade: 0.15, outDur: 0.2, ody: 0 });
    M.draw($('#strk'), t, tNo - 0.05, 0.35, M.o3); if (t > tGoes - 0.25) M.hide($('#strk'), true);
    M.vis($('#clm1'), t, tGoes, 1e9, { dy: 0, fade: 0.2 });
    { const u = M.clamp((t - tGoes - 0.3) / 0.12); $('#pkOk').style.opacity = u.toFixed(3); M.hide($('#pkOk'), u <= 0); }
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tZoyX, tGoes][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tNo ? C.redBg : C.paper; $('#bb0').style.color = t > tNo ? C.red : C.ink;
    M.vis($('#fact'), t, tAsci - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
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
