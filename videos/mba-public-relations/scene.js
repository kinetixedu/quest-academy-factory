// MBA - Marketing Management, Ep 31: Public Relations (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', grey: '#CFC6B5' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  news: ['M15 18h-5', 'M18 14h-8', 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2', 'M10 6h8v4h-8V6Z'],
  sparkle: ['M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  notebook: ['M2 6h4', 'M2 10h4', 'M2 14h4', 'M2 18h4', 'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M16 2v20'],
  pen: ['M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'],
  share: ['M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'm8.59 13.51 6.83 3.98', 'm15.41 6.51-6.82 3.98'],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'm22 7-10 6L2 7'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  hospital: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tKn = [wt('H1', 'ads'), wt('H1', 'offers'), wt('H1', 'ten')], tStory = wt('H1', 'story'), tRep = wt('H2', 'reporter');
const tPaper = wt('C2', 'newspaper'), tOrd = wt('C2', 'orders'), tJump = wt('C2', 'jump');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tPay = wt('L1', 'pay'), tEarn = wt('L1', 'earned'), tWb = [wt('L2', 'real'), wt('L2', 'grandmother'), wt('L2', 'hand')], tPR = wt('L3', 'public');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tDout = T0('M0') - 0.32;
const tQl = [wt('D2', 'building'), wt('D2', 'publics'), wt('D2', 'publicity'), wt('D2', 'image'), wt('D2', 'rumours')], tHl = [tQl[1], tQl[2], tQl[3]];
const tPub = [wt('D3', 'customers'), wt('D3', 'neighbours'), wt('D3', 'press'), wt('D3', 'shopkeepers'), wt('D3', 'government')];
// M
const tM0 = T0('M0'), tS = [1, 2, 3, 4, 5].map(i => T0('M' + i)), tMout = T0('T1') - 0.32;
const tTrue = wt('M1', 'true'), tLove = wt('M1', 'love'), tWrites = wt('M2', 'writes'), tNote = wt('M2', 'note'), tAsks = wt('M3', 'asks'), tReporter = wt('M3', 'reporter'), tTasting = wt('M3', 'tasting');
const tPhoto = wt('M4', 'photo'), tHead = wt('M4', 'headline'), tPosts = wt('M5', 'posts'), tShop = wt('M5', 'shop');
const tT = T0('T1'), tSt2 = wt('T1', 'Good'), tP0 = T0('P0'), tTu = tP0 - 0.32;
// P
const tP = [wt('P0', 'news'), T0('P1'), T0('P2'), T0('P3')], tPout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'bank'), wt('K3', 'bakery'), wt('K4', 'airline')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'trust'), wt('X2', 'costs')], tXh = [wt('X3', 'control'), wt('X3', 'bad')];
const tParent = wt('X4', 'parent'), tReplies = wt('X4', 'replies'), tReplaces = wt('X4', 'replaces'), tIvy = wt('X5', '1906');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'story');
const tSS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tNx = T0('N1');
const tPill = [[wt('S2', 'earns')], [wt('S3', 'news'), wt('S3', 'events'), wt('S3', 'community'), wt('S3', 'social')], [wt('S4', 'truth'), wt('S4', 'fast')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tSS - 0.42, tSS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A
const KN = [['megaphone', 'Ads'], ['tag', 'Offers'], ['store', '10 shops']];
$('#kns').innerHTML = KN.map(([ic, t], i) => `<div class="kn" id="kn${i}">${M.icon(ic, 24, C.gold, 2.4)}<span>${t}</span></div>`).join('');
$('#kq2I').innerHTML = M.icon('help', 24, C.dim, 2.4); $('#repI').innerHTML = M.icon('notebook', 24, C.gold2, 2.2);
const OB = [62, 66, 64, 142];
$('#obars').innerHTML = `<path d="M0 150 H464" stroke="#E2DACB" stroke-width="2"/>` + OB.map((h, i) => `<rect id="ob${i}" x="${12 + i * 116}" y="150" width="80" height="0" rx="10" fill="${i === 3 ? C.gold : C.grey}"/><text x="${52 + i * 116}" y="174" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${i === 3 ? 'STORY' : 'WEEK ' + (i + 1)}</text>`).join('') +
  `<g id="obUp" transform="translate(340 0)"><rect width="104" height="34" rx="17" fill="#14213D"/><g transform="translate(14 7)">${M.icon('trendUp', 20, C.gold2, 2.4)}</g><text x="64" y="23" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="15" fill="#fff">JUMP</text></g>`;
// L
$('#jb0I').innerHTML = M.icon('coin', 30, C.ink2, 2.2); $('#jb1I').innerHTML = M.icon('news', 30, C.gold, 2.2);
const WB = [['sparkle', 'A real story'], ['heart', "Nani's recipe"], ['laddoo', 'Made by hand']];
$('#wbs').innerHTML = WB.map(([ic, t], i) => `<div class="wb" id="wb${i}">${M.icon(ic, 24, C.gold, 2.4)}<span>${t}</span></div>`).join('');
$('#prPI').innerHTML = M.icon('news', 20, '#fff', 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// D: publics hub
const HC = [392, 316], HR = 206, ANG = [-90, -18, 54, 126, 198];
const PUB = [['rao', null, 'Customers'], [null, 'home', 'Neighbours'], [null, 'news', 'The press'], [null, 'store', 'Shopkeepers'], [null, 'bank', 'Government']];
const HP = ANG.map(a => [HC[0] + HR * Math.cos(a * Math.PI / 180), HC[1] + HR * Math.sin(a * Math.PI / 180)]);
$('#hubS').innerHTML = HP.map(([x, y], i) => `<line id="hl${i}x" x1="${HC[0]}" y1="${HC[1]}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#E2DACB" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 10"/>`).join('');
$('#hns').innerHTML = PUB.map(([f, ic, n], i) => { const [x, y] = HP[i]; return `<div class="hn" id="hn${i}" style="left:${(x - 44).toFixed(1)}px;top:${(y - 44).toFixed(1)}px;${f ? FACE(f) : ''}">${ic ? M.icon(ic, 36, C.ink, 2.2) : ''}</div><div class="hl2" id="hm${i}" style="left:${(x - 100).toFixed(1)}px;top:${(y + 50).toFixed(1)}px">${n}</div>`; }).join('');
$('#hubCI').innerHTML = M.icon('laddoo', 34, C.gold2, 2.2);
wrap($('#kq'), 'kqOut', 784, 580);
// M
$('#sTagI').innerHTML = M.icon('sparkle', 20, '#fff', 2.4);
const PRW = [296, 280, 296, 240, 296, 268, 296, 200];
$('#prLs').innerHTML = PRW.map((w, i) => `<div class="pl" id="prl${i}" style="top:${156 + i * 30}px;width:${w}px"></div>`).join('');
$('#ivR').innerHTML = M.icon('notebook', 52, C.ink, 2);
$('#ivCI').innerHTML = M.icon('laddoo', 24, C.gold, 2.4);
$('#npL').innerHTML = [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<div class="cl" style="left:316px;top:${176 + i * 24}px;width:${i % 3 === 2 ? 160 : 220}px"></div>`).join('') + [0, 1, 2].map(i => `<div class="cl" style="left:24px;top:${412 + i * 20}px;width:${i === 2 ? 340 : 512}px"></div>`).join('');
$('#sh0I').innerHTML = M.icon('share', 22, '#fff', 2.4); $('#sh1I').innerHTML = M.icon('store', 22, C.gold2, 2.4);
const STP = [['sparkle', 'Find a true story'], ['pen', 'Write a press release'], ['mail', 'Invite the press'], ['news', 'The story runs'], ['share', 'Share it everywhere']];
$('#psR').innerHTML = STP.map(([ic, t], i) => `<div class="kr" id="pr${i}" style="top:${96 + i * 94}px;left:48px;width:688px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
wrap($('#pl5'), 'pl5Out', 784, 580);
// P: tools
const TC = [['news', 'News', 'Stories in the press', 'Nani in the newspaper'], ['calendar', 'Events', 'Meet people in person', 'A millet tasting at a school fair'], ['heart', 'Community work', 'Help the people around you', 'A free healthy-snack class for parents'], ['phone', 'Social media', 'Talk with people online', 'Dev answers every parent, kindly and quickly']];
$('#tcs').innerHTML = TC.map(([ic, t, s, e], i) => `<div class="tc" id="tc${i}" style="left:${160 + (i % 2) * 816}px;top:${270 + Math.floor(i / 2) * 302}px"><div class="bg"></div><div class="ti"></div><div class="serif tt">${t}</div><div class="ts">${s}</div><div class="th"></div><div class="tx2">AT LADDOO LAB</div><div class="te">${e}</div></div>`).join('');
// K
const KA = [
  ['news', 'News', 'Share real stories', 'Nani in the city newspaper', 'hospital', 'A hospital shares its new heart unit with the local paper'],
  ['calendar', 'Events', 'Meet people in person', 'A millet tasting at a school fair', 'bank', 'A bank runs a free money class for college students'],
  ['heart', 'Community work', 'Help the people around you', 'A free healthy-snack class for parents', 'store', 'A bakery gives its extra bread to a shelter every night'],
  ['ban', 'Handling bad news', 'Be quick and honest', 'A stale pack replaced the same day', 'plane', 'An airline explains a delay quickly and honestly'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['PR TODAY', 'Four moves', 'From a hospital to an airline', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}x"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">GOOD NEWS AND BAD NEWS</div><div class="pe"><i>${M.icon('news', 34, C.gold, 2.2)}</i><span>Earn the story, own the mistake</span></div>`) + `</div>`).join('');
// X
const XG = [['heart', 'More trust than ads'], ['coin', 'Costs little']];
const XH = [['ban', 'No control'], ['zap', 'Bad news spreads']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#xr0f').innerHTML = M.icon('user', 30, C.ink, 2.2);
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('news', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('heart', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Advertising', 'Sales promotion', 'Personal selling', 'Public relations'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('news', 44, C.gold2, 2.4);
// recap
const ROWS = [['users', 'Good relations with your publics', ['Earned stories']], ['news', 'Four PR tools', ['News', 'Events', 'Community', 'Social media']], ['heart', 'When things go wrong', ['Tell the truth', 'Fast']]];
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
const rowsHi = (prefix, n, times, tEnd, t, icons) => {
  for (let i = 0; i < n; i++) {
    const el = $('#' + prefix + i), ta = times[i], td = i < n - 1 ? times[i + 1] : tEnd;
    const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
    el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
    el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
    el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
    el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
    setIco(el.querySelector('.ri'), icons[i], t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
  }
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; [0, 1, 2].forEach(i => { const n = $('#kn' + i); n.style.left = x + 'px'; x += n.offsetWidth + 16; });
  const rp = $('#rep'); rp.style.left = (884 - rp.offsetWidth) + 'px';
  const tz = $('#tgZ'); tz.style.left = (92 - 24 - tz.offsetWidth) + 'px'; $('#tgN').style.left = (692 + 24) + 'px';
  for (let i = 0; i < 2; i++) { const g = $('#jb' + i); g.querySelector('.id').style.left = (88 + g.querySelector('.in').offsetWidth + 16) + 'px'; }
  x = 36; [0, 1, 2].forEach(i => { const n = $('#wb' + i); n.style.left = x + 'px'; x += n.offsetWidth + 16; });
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  for (let i = 0; i < 5; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  $('#sh0').style.left = '64px'; $('#sh0').style.top = '420px';
  const s1 = $('#sh1'); s1.style.left = (736 - s1.offsetWidth) + 'px'; s1.style.top = '488px';
  document.querySelectorAll('.tc .te').forEach(el => { if (el.offsetWidth > 712) el.style.fontSize = Math.floor(28 * 712 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
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
  M.vis($('#exChip'), t, tOrd - 0.1, tAout, { dy: 10, outDur: 0.3 });

  /* ===== A: the story behind it ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#kn' + i), t, tMorph + 0.5 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#kq2'), t, tMorph + 0.9, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#rep'), t, Math.max(tMorph + 1.1, tRep - 0.1), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.vis($('#npMini'), t, tPaper - 0.2, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#oL'), t, tOrd - 0.15, 1e9, { dy: 8 }); M.vis($('#obars'), t, tOrd - 0.15, 1e9, { dy: 0, fade: 0.15 });
    OB.forEach((hh, i) => { const u = M.clamp(M.spring(t - (i < 3 ? tOrd + i * 0.1 : tJump - 0.05), M.SOFT), 0, 1.04) * hh; attr($('#ob' + i), 'height', u.toFixed(1)); attr($('#ob' + i), 'y', (150 - u).toFixed(1)); });
    $('#obUp').style.opacity = M.clamp((t - tJump - 0.3) / 0.2).toFixed(3);
  }

  /* ===== L: the reporter's visit ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tEarn - 0.3);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tL1 + 0.4, tEarn - 0.6, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, tL1 + 0.6, tEarn - 0.6, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#rcp'), t, tEarn - 0.18, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#jb0'), t, tEarn, 1e9, { dy: 16 }); M.vis($('#jb1'), t, tEarn + 0.35, 1e9, { dy: 16 });
    $('#jb1').style.background = mix(C.paper, C.gold3, M.io((t - tEarn - 0.6) / 0.3));
    M.vis($('#team'), t, tL2 + 0.05, tLout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#wb' + i), t, tWb[i] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#prP'), t, tPR - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: definition + publics ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY }); M.rise($('#kot2'), t, tD2 + 0.35, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, tD2 + 0.6, 1e9, { dy: 10 }); M.vis($('#kqHr'), t, tD2 + 0.7, 1e9, { dy: 0 });
    for (let i = 0; i < 5; i++) { const q = $('#ql' + i); M.vis(q, t, tD2 + 0.9 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tQl[i] + 0.1) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#pub'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#hubC'), t, tD3 + 0.35, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    PUB.forEach((_, i) => {
      M.vis($('#hn' + i), t, tPub[i] - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#hm' + i), t, tPub[i], 1e9, { dy: 8 });
      M.draw($('#hl' + i + 'x'), t, tPub[i] - 0.25, 0.35, M.o3);
      const on = M.io((t - tPub[i]) / 0.25); $('#hn' + i).style.boxShadow = '0 0 0 4px ' + mix(C.line, C.gold, on);
    });
  }

  /* ===== M: how the Nani story happened ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 }, oo = { outDur: 0.25, ody: -14 };
    M.vis($('#pl5'), t, tM0 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#ps5'), t, tM0 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    STP.forEach((_, i) => M.vis($('#pr' + i), t, tM0 + 0.4 + i * 0.07, 1e9, { dy: 14 }));
    rowsHi('pr', 5, tS, tMout + 1, t, STP.map(s => s[0]));
    // step 1: the story
    M.vis($('#aS'), t, tM0 + 0.45, tS[1] - 0.15, { dy: 20, ...oo });
    M.rise($('#sQ'), t, tM0 + 0.8, { st: 0.04 }); M.vis($('#sFace'), t, tM0 + 0.7, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#sTag'), t, tTrue - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // step 2: the press release
    M.vis($('#aP'), t, tS[1] + 0.05, tS[2] - 0.15, { dy: 30, sp: M.SOFT, ...oo });
    PRW.forEach((_, i) => { const el = $('#prl' + i), u = M.io((t - tWrites - i * 0.18) / 0.25); el.style.transform = `scaleX(${u.toFixed(3)})`; el.style.transformOrigin = '0 0'; });
    // step 3: invite the press
    M.vis($('#aI'), t, tS[2] + 0.05, tS[3] - 0.15, { dy: 20, ...oo });
    const inv = $('#inv'); M.vis(inv.querySelector('.ivf'), t, tS[2] + 0.2, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#ivA'), t, tAsks - 0.1, 1e9, { dx: -16, dy: 0, fade: 0.15 });
    M.vis($('#ivR'), t, tReporter - 0.15, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.vis(inv.querySelectorAll('.ivn')[1], t, tReporter, 1e9, { dy: 8 });
    M.vis($('#ivC'), t, tTasting - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    // step 4 + 5: the newspaper, then shared
    M.vis($('#aN'), t, tS[3] + 0.05, 1e9, { dy: 0, fade: 0.01 });
    M.vis($('#np'), t, tS[3] + 0.1, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#npP'), t, tPhoto - 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.1 }); M.vis($('#npC'), t, tPhoto + 0.3, 1e9, { dy: 6 });
    M.rise($('#npH'), t, tHead - 0.1, { st: 0.05, sp: M.HEAVY });
    $('#npL').style.opacity = M.clamp((t - tHead - 0.3) / 0.4).toFixed(3);
    M.vis($('#sh0'), t, tPosts - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#sh1'), t, tShop - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
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

  /* ===== P: more PR tools ===== */
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
    KA.forEach((_, i) => M.vis($('#kr' + i), t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 }));
    rowsHi('kr', 4, tK, tKout + 1, t, KA.map(a => a[0]));
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k + 'x'); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
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
    M.vis($('#phone'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    [tParent, tReplies, tReplaces + 0.6].forEach((ta, i) => { $('#pp' + i).style.opacity = M.clamp((t - ta) / 0.25).toFixed(3); });
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tParent, tReplies, tReplaces][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = C.redBg; $('#bb0').style.color = C.red;
    M.vis($('#fact'), t, tIvy - 0.1, 1e9, { dy: 16 });
    { const kt = $('#fact .kt'), kl = $('#fact .kl'), tO = wt('X5', 'often'), tF = wt('X5', 'facts');
      const sw2 = t >= tO - 0.1; M.setT(kt, sw2 ? 'Often called the first press release' : 'Share the facts with reporters');
      M.setT(kl, sw2 ? 'IVY LEE · 1906' : '1906 · A TRAIN CRASH IN AMERICA');
      kt.style.color = sw2 ? C.gold : (t >= tF - 0.1 ? C.ink : C.ink2);
      const u = M.io((t - (sw2 ? tO - 0.1 : tF - 0.1)) / 0.3); kt.style.transform = `translateY(${((1 - u) * 10).toFixed(1)}px)`; kt.style.opacity = (0.35 + 0.65 * u).toFixed(3);
      $('#fact').style.background = mix(C.paper, C.gold3, sw2 ? M.io((t - tO) / 0.3) : 0); }
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tSS; M.hide($('#quiz'), !qOn);
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
  const sOn = t >= tSS; M.hide($('#recap'), !sOn);
  if (sOn) {
    M.vis($('#rchip'), t, tSS + 0.1, 1e9, { dy: 16 });
    M.rise($('#rh'), t, tSS + 0.18, { st: 0.06, sp: M.HEAVY });
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
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tSS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
