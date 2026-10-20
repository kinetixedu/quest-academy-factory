// MBA - Marketing Management, Ep 13: Marketing Mix - 4Ps (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  film: ['M3 3h18v18H3z', 'M7 3v18', 'M3 7.5h4', 'M3 12h18', 'M3 16.5h4', 'M17 3v18', 'M17 7.5h4', 'M17 16.5h4'],
  hospital: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tJar = wt('H1', 'jar'), tH2 = T0('H2'), tOnly = wt('H2', 'only'), tH3 = T0('H3'), tNever = wt('H3', 'never'), tFit = wt('H3', 'fit'), tH4 = T0('H4'), tMixH = wt('H4', 'mix');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tNm = [wt('L3', 'Zoya'), wt('L2', 'Nani'), wt('L2', 'Arjun'), wt('L2', 'Dev')], tFq = [wt('L3', 'What'), wt('L3', 'much'), wt('L3', 'Where'), wt('L3', 'find')];
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D: the marketing mix
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M1') - 0.32;
const tHl = [wt('D2', 'tools'), wt('D2', 'blends'), wt('D2', 'response')], tCk = [wt('D3', 'same'), wt('D3', 'well'), wt('D3', 'great')];
const tBor = wt('D4', 'Borden'), t1960 = wt('D5', '1960'), tP4 = [wt('D5', 'Product'), wt('D5', 'price'), wt('D5', 'place'), wt('D5', 'promotion')];
// M: two runs
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM8 = T0('M8');
const tPromo = wt('M2', 'Promotion'), tNobody = wt('M2', 'Nobody'), tNoSale = wt('M2', 'sale');
const tJx = [tNobody, wt('M3', 'hard'), wt('M3', 'costly'), wt('M3', 'big')];
const tG = [wt('M4', 'Dev'), wt('M5', 'Place'), wt('M6', 'Price'), wt('M7', 'Product')], tBuys = wt('M8', 'buys'), tAgain = wt('M8', 'again');
const tMout = T0('T1') - 0.32;
// statement + the full mix
const tT = T0('T1'), tSt2 = wt('T1', 'One', 1), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP = [1, 2, 3, 4, 5].map(i => T0('P' + i)), tSame = wt('P5', 'same'), tPout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'cinema'), wt('K3', 'bakery'), wt('K4', 'hospital')];
// X: human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'simple'), wt('X2', 'forgotten')], tXh = [wt('X3', 'seller'), wt('X3', 'services')];
const tLaut = wt('X4', 'Lauterborn'), tCs = [wt('X5', 'needs'), wt('X5', 'cost'), wt('X5', 'convenience'), wt('X5', 'communication')];
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'product'), wt('S2', 'price'), wt('S2', 'place'), wt('S2', 'promotion')], [wt('S3', 'what'), wt('S3', 'much'), wt('S3', 'where'), wt('S3', 'find')], [wt('S4', 'same')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const tile = (id, x, w, ic, n, t) => `<div class="sws" id="${id}" style="left:${x}px;width:${w}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`;
// A: the jar
const HT = [['package', 'WHAT', 'A jar of 18'], ['coin', 'HOW MUCH', '₹360 a jar'], ['home', 'WHERE', "Nani's kitchen"], ['megaphone', 'WHO KNEW?', 'Nobody']];
$('#hRow').innerHTML = HT.map(([ic, n, t], i) => tile('ht' + i, 36 + i * 216, 200, ic, n, t)).join('');
const METH = [['x', 'Never heard of it'], ['x', "Won't fit a tiffin"]];
$('#meth').innerHTML = METH.map(([ic, m], i) => `<div class="stp" id="mt${i}" style="top:76px;background:#F6E3DC;color:#B5482F">${M.icon(ic, 26, C.red, 2.6)}<span>${m}</span></div>`).join('');
// L: team + four questions
const TEAM = [['zoya', 'Zoya', 'FOUNDER'], ['nani', 'Nani', 'RECIPE'], ['arjun', 'Arjun', 'SALES'], ['dev', 'Dev', 'DESIGN']];
$('#tRow').innerHTML = TEAM.map(([f, n, r], i) => { const cx = 125 + i * 178; return `<div class="av face tav" id="tv${i}" style="left:${cx - 36}px;${FACE(f)}">${n[0]}</div><div class="tnm" id="tn${i}x" style="left:${cx - 80}px">${n}</div><div class="trl" id="tr${i}x" style="left:${cx - 80}px">${r}</div>`; }).join('');
const FQ = [['package', 'Q1', 'What?'], ['coin', 'Q2', 'How much?'], ['pin', 'Q3', 'Where?'], ['megaphone', 'Q4', 'Who knows?']];
$('#fqRow').innerHTML = FQ.map(([ic, n, t], i) => tile('fq' + i, 36 + i * 182, 166, ic, n, t)).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: definition, cook pills, twelve into four
const CK = [['laddoo', 'Ingredients'], ['repeat', 'Mixed well'], ['check', 'A great dish']];
$('#ckRow').innerHTML = CK.map(([ic, t], i) => `<div class="ck" id="ck${i}" style="${i === 2 ? 'background:#B8862F;color:#fff' : ''}">${M.icon(ic === 'repeat' ? 'plus' : ic, 24, i === 2 ? '#fff' : C.gold, 2.4)}<span>${t}</span></div>` + (i < 2 ? `<svg class="cka" id="cka${i}" width="44" height="24"><path d="M4 12 H34 M26 4 L36 12 L26 20" fill="none" stroke="#B9B1A3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
const P4N = ['Product', 'Price', 'Place', 'Promotion'];
$('#p4Row').innerHTML = P4N.map((n, i) => `<div class="p4" id="p4${i}" style="left:${36 + i * 182}px"><div class="pb">P</div><div class="pl">${n}</div></div>`).join('');
const D12 = Array.from({ length: 12 }, (_, i) => { const k = Math.floor(i / 3), j = i % 3; return { x0: 36 + k * 182 + 83 + (j - 1) * 40, y0: 159, k, j }; });
$('#tw4d').innerHTML = D12.map((d, i) => `<circle id="dz${i}" cx="${d.x0}" cy="${d.y0}" r="12" fill="#B8862F"/>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: Mrs. Rao's week, twice. Gates in the order she meets them. Plan coords inside a 688 x 250 svg. */
const GATE = [['megaphone', 'PROMOTION'], ['pin', 'PLACE'], ['tag', 'PRICE'], ['package', 'PRODUCT']];
const GX = [89, 259, 429, 599];
const gate = (k, i, ic, lb) => `<g id="g${k}${i}" transform="translate(${GX[i] - 65} 24)"><rect width="130" height="96" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g class="bi" transform="translate(51 16)">${M.icon(ic, 28, C.ink, 2.2)}</g><text x="65" y="76" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">${lb}</text>
  <g class="gs" transform="translate(122 8)" visibility="hidden"><circle r="17" fill="#FFFFFF"/><circle r="14" fill="#B8862F"/><g class="gsi" transform="translate(-8 -8)">${M.icon('check', 16, '#fff', 3.2)}</g></g></g>`;
const run = (k, label) => `<div class="mav" style="${FACE('rao')}"></div><div class="lbl mlb">${label}</div><div class="serif mrd" id="rd${k}">Week 1</div>
  <svg class="mplan" id="plan${k}" width="688" height="250"><defs><clipPath id="avc${k}"><circle cx="0" cy="0" r="26"/></clipPath></defs>
    <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
    <path d="M24 196 H664" stroke="#E2DACB" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
    ${GATE.map(([ic, lb], i) => gate(k, i, ic, lb)).join('')}
    <g id="av${k}" transform="translate(30 196)"><circle r="30" fill="#14213D"/><image href="${IMG}ll-rao-face.jpg" x="-26" y="-26" width="52" height="52" clip-path="url(#avc${k})"/></g>
  </svg>
  ${GATE.map(([, lb], i) => `<div class="gseg" id="gs${k}${i}" style="left:${48 + i * 176}px;width:160px"></div><div class="mtk" style="left:${48 + i * 176}px">${lb}</div>`).join('')}
  <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span></div>`;
$('#mLIn').innerHTML = run('L', 'OLD MIX · THE BIG JAR');
$('#mRIn').innerHTML = run('R', 'NEW MIX · THE SIX-PACK');

// P: the full mix
const P5 = [['package', 'Product', 'What do we sell?', 'nani', 'The six-pack: six small laddoos, no refined sugar'],
  ['tag', 'Price', 'What do they pay?', 'zoya', '₹120 for six: a fair price for a healthy snack'],
  ['pin', 'Place', 'Where do they get it?', 'arjun', 'At their door every Monday, before the school week'],
  ['megaphone', 'Promotion', 'How do they find out?', 'dev', 'Posters, free tastes, and parents telling parents']];
$('#p5').innerHTML = P5.map(([ic, a, b], i) => `<div class="st5" id="pst${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2">${b}</div></div>`).join('');
$('#pePans').innerHTML = [[null, 'THE 4PS · E. JEROME McCARTHY, 1960', 'Four questions, one plan']].concat(P5.map((p, i) => [p[3], `0${i + 1} · ${p[1].toUpperCase()} AT LADDOO LAB`, p[4]])).concat([['rao', 'THE TARGET CUSTOMER', 'All four point at one person: the busy parent']]).map(([f, l, x], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('package', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div></div>`).join('');

// K: at work today
const KA = [
  ['package', 'Product', 'What you sell', 'Six small laddoos, each one wrapped', 'phone', 'A phone maker sells one model in three sizes'],
  ['tag', 'Price', 'What they pay', '₹120 for six: ₹20 a school day', 'film', 'A cinema charges less for morning shows'],
  ['pin', 'Place', 'Where they get it', 'Arjun delivers every Monday', 'store', 'A bakery sells from its shop and an app'],
  ['megaphone', 'Promotion', 'How they find out', 'Posters and free tastes at the gate', 'hospital', 'A hospital runs a free health check camp'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['THE 4PS TODAY', 'Four levers', 'Every business pulls them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A LADDOO KITCHEN TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same four questions, any business</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['check', 'Simple to use'], ['package', 'Nothing forgotten']];
const XH = [['user', "The seller's view"], ['users', 'Weak for services']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const PC = [['package', 'Product', 'Customer needs'], ['tag', 'Price', 'Cost'], ['pin', 'Place', 'Convenience'], ['megaphone', 'Promotion', 'Communication']];
$('#pcRows').innerHTML = PC.map(([ic, p, c], i) => `<div class="pc" id="pc${i}" style="top:${96 + i * 80}px"><div class="a">${M.icon(ic, 22, C.ink, 2.4)}<span>${p}</span></div><svg class="ar" width="60" height="24"><path d="M4 12 H48 M38 3 L50 12 L38 21" fill="none" stroke="#B8862F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg><div class="c">${M.icon('user', 22, '#fff', 2.4)}<span>${c}</span></div></div>`).join('');
$('#bothI').innerHTML = M.icon('eye', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Product', 'Price', 'Place', 'Promotion'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('pin', 44, C.gold2, 2.4);
// recap
const ROWS = [['package', 'Tools you control', ['Product', 'Price', 'Place', 'Promotion']], ['help', 'One question each', ['What?', 'How much?', 'Where?', 'How they know']], ['target', 'All four aim at one customer', ['The same customer']]];
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
// tile states: on = navy (active), bad = red
const tileOn = (el, on, ic, bad = 0) => {
  el.style.background = mix(mix(C.paper, C.redBg, bad), C.ink, on);
  el.querySelector('.zt').style.color = mix(mix(C.ink, C.red, bad), '#fff', on); el.querySelector('.zn').style.color = mix(mix(C.muted, C.red, bad), C.gold2, on);
  setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : (bad > 0.5 ? C.red : C.gold), 40, 2.2);
};
const pop = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
// run helpers
const pill = (k, ic, tx, bad, fin) => {
  const ms = $('#ms' + k);
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};
const gateSt = (k, i, t, tOn, ok) => { // tOn: when evaluated
  const g = $('#g' + k + i), r = g.querySelector('rect'), s = g.querySelector('.gs'), u = M.io((t - tOn) / 0.3);
  const col = ok ? C.gold : C.red;
  attr(r, 'stroke', u > 0 ? mix(C.line, col, u) : C.line); attr(r, 'stroke-width', u > 0.5 ? 4 : 2); attr(r, 'fill', mix('#FFFFFF', ok ? C.gold3 : C.redBg, u));
  const on = t >= tOn; attr(s, 'visibility', on ? 'inherit' : 'hidden');
  if (on) { const sc = M.spring(t - tOn, M.POP); attr(s, 'transform', `translate(122 8) scale(${Math.max(0.01, sc).toFixed(3)})`); }
  if (s._ok !== ok) { s._ok = ok; s.querySelectorAll('circle')[1].setAttribute('fill', col); s.querySelector('.gsi').innerHTML = M.icon(ok ? 'check' : 'x', 16, '#fff', 3.2); }
  const seg = $('#gs' + k + i); seg.style.background = mix(C.paper2, ok ? C.gold : C.red2, u);
};
const avL = M.track(30, [[tPromo - 0.6, GX[0]]], M.SOFT);
const avR = M.track(30, [[tG[0] - 0.7, GX[0]], [tG[1] - 0.7, GX[1]], [tG[2] - 0.7, GX[2]], [tG[3] - 0.7, GX[3]], [tBuys - 0.2, 664]], M.SOFT);

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 2; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const tz = $('#tgZ'); tz.style.left = (76 - tz.offsetWidth) + 'px'; $('#tgN').style.left = '708px';
  for (let i = 0; i < 4; i++) { const ql = $('#ql' + i); if (ql && ql.offsetWidth > 688) ql.style.fontSize = Math.floor(34 * 688 / ql.offsetWidth) + 'px'; }
  x = 48; for (let i = 0; i < 3; i++) { const p = $('#ck' + i); p.style.left = x + 'px'; x += p.offsetWidth + 8; if (i < 2) { $('#cka' + i).style.left = x + 'px'; x += 52; } }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.st5 .s2').forEach(el => { if (el.offsetWidth > 304) el.style.fontSize = Math.floor(24 * 304 / el.offsetWidth) + 'px'; });
  const b0 = $('#bkl0'); b0.style.left = (960 - b0.offsetWidth / 2) + 'px';
  const fk = $('#fx .kt'); if (fk.offsetWidth > 548) fk.style.fontSize = Math.floor(28 * 548 / fk.offsetWidth) + 'px';
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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : [tM1 + 0.4, tMout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: the big jar ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    const tIn = [tMorph + 0.55, tH2 + 0.2, tOnly - 0.05, tNever - 0.05], tBad = [tFit, tMixH, tMixH + 0.15, tNever];
    HT.forEach(([ic], i) => { const el = $('#ht' + i); M.vis(el, t, tIn[i], 1e9, pop); tileOn(el, 0, ic, M.io((t - tBad[i]) / 0.3)); });
    M.vis($('#ask'), t, tH3 + 0.05, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tNever + 0.1, 1e9, pop); M.vis($('#mt1'), t, tFit - 0.05, 1e9, pop);
    M.rise($('#askT'), t, tH4 + 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the team plans again ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tL1 + 0.6, tL2 - 0.3, { ...pop, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, tL1 + 0.9, tL2 - 0.3, { ...pop, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#rcp'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    TEAM.forEach((_, i) => {
      const ta = tL2 + 0.3 + i * 0.1;
      M.vis($('#tv' + i), t, ta, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#tn' + i + 'x'), t, ta + 0.08, 1e9, { dy: 10 }); M.vis($('#tr' + i + 'x'), t, ta + 0.14, 1e9, { dy: 8 });
      const nx = i === 3 ? tL3 : (i === 0 ? 1e9 : tNm[i + 1]);
      const on = M.io((t - tNm[i]) / 0.25) * (1 - M.io((t - nx) / 0.25));
      $('#tv' + i).style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, on);
    });
    M.vis($('#team'), t, tFq[0] - 0.45, tLout, { dy: 36, ...o });
    FQ.forEach(([ic], i) => {
      const el = $('#fq' + i); M.vis(el, t, tFq[i] - 0.05, 1e9, pop);
      tileOn(el, M.io((t - tFq[i]) / 0.25) * (1 - (i < 3 ? M.io((t - tFq[i + 1]) / 0.25) : M.io((t - tLout + 0.2) / 0.3))), ic);
    });
  }

  /* ===== D: the marketing mix ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.rise($('#kot1'), t, tD2 + 0.2, { st: 0.06, sp: M.HEAVY }); M.vis($('#kbk'), t, tD2 + 0.5, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD2 + 0.55, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tD2 + 0.6 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tHl[0] + 0.4 - i * 0.7) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    for (let i = 0; i < 3; i++) { M.vis($('#ck' + i), t, tCk[i] - 0.05, 1e9, pop); if (i < 2) M.vis($('#cka' + i), t, tCk[i + 1] - 0.2, 1e9, { dx: -10, dy: 0, fade: 0.15 }); }
    M.vis($('#vc'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.draw($('#tlL'), t, tD4 + 0.3, 0.8, M.o3);
    M.vis($('#tc0'), t, tBor - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 }); M.vis($('#tc1'), t, t1960 - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 });
    M.vis($('#tn0'), t, tBor - 0.05, 1e9, { dy: 16 }); M.vis($('#tn1'), t, t1960 - 0.05, 1e9, { dy: 16 });
    M.vis($('#sw'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    D12.forEach((d, i) => {
      const el = $('#dz' + i), ta = tD5 + 0.35 + i * 0.05;
      if (t < ta) { attr(el, 'r', '0'); return; }
      const tf = tP4[d.k] - 0.35 + d.j * 0.06, p = M.io((t - tf) / 0.45);
      const bx = 36 + d.k * 182 + 83, by = 84 + 46;
      attr(el, 'cx', M.lerp(d.x0, bx, p).toFixed(1)); attr(el, 'cy', M.lerp(d.y0, by, p).toFixed(1));
      attr(el, 'r', (12 * M.spring(t - ta, M.POP) * (1 - p)).toFixed(2));
    });
    P4N.forEach((_, i) => {
      const el = $('#p4' + i); M.vis(el, t, tP4[i] - 0.05, 1e9, pop);
      const on = M.io((t - tP4[i]) / 0.25) * (1 - (i < 3 ? M.io((t - tP4[i + 1]) / 0.25) : M.io((t - tDout + 0.3) / 0.3)));
      el.style.background = mix(C.paper, C.ink, on); el.querySelector('.pl').style.color = mix(C.ink, '#fff', on);
      el.querySelector('.pb').style.background = mix(C.ink, C.gold, on); el.querySelector('.pb').style.color = mix(C.gold2, '#fff', on);
    });
  }

  /* ===== M: two runs ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    const mL = $('#mL'); M.vis(mL, t, tM1 + 0.1, tMout, { dy: 36, ...o }); grow(mL, $('#mLIn'), t, tM4);
    M.vis($('#mR'), t, tM4 + 0.12, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM1 + 0.3 : tM4 + 0.3, root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#rd' + k), t, base + 0.12, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      for (let i = 0; i < 4; i++) { $('#g' + k + i).style.opacity = M.clamp((t - base - 0.3 - i * 0.07) / 0.1); M.vis($('#gs' + k + i), t, base + 0.35 + i * 0.05, 1e9, { dy: 8 }); }
      root.querySelectorAll('.mtk').forEach((el, i) => M.vis(el, t, base + 0.4 + i * 0.05, 1e9, { dy: 8 }));
      M.vis($('#ms' + k), t, base + 0.45, 1e9, pop);
      $('#av' + k).style.opacity = M.clamp((t - base - 0.5) / 0.12).toFixed(3);
    }
    // old mix: stopped at the first gate
    attr($('#avL'), 'transform', `translate(${avL(t).toFixed(1)} 196)`);
    for (let i = 0; i < 4; i++) gateSt('L', i, t, tJx[i], false);
    const doneL = t >= tJx[3] + 0.6;
    M.setT($('#rdL'), t >= tNoSale - 0.05 ? 'No sale' : 'Week 1'); $('#rdL').style.color = t >= tNoSale - 0.05 ? C.red : C.ink;
    if (doneL) pill('L', 'x', '0 of 4 gates open', 1, 1);
    else if (t >= tJx[3]) pill('L', 'package', 'Too big for a tiffin', 1, 0);
    else if (t >= tJx[2]) pill('L', 'tag', 'Too costly', 1, 0);
    else if (t >= tJx[1]) pill('L', 'pin', 'Hard to find', 1, 0);
    else if (t >= tNobody) pill('L', 'megaphone', 'Nobody told her', 1, 0);
    else pill('L', 'clock', "Mrs. Rao's week", 0, 0);
    // new mix: every gate opens
    attr($('#avR'), 'transform', `translate(${avR(t).toFixed(1)} 196)`);
    for (let i = 0; i < 4; i++) gateSt('R', i, t, tG[i] + 0.25, true);
    M.setT($('#rdR'), t >= tAgain ? 'Every week' : t >= tBuys ? 'Bought' : 'Week 1'); $('#rdR').style.color = t >= tBuys ? C.gold : C.ink;
    if (t >= tBuys) pill('R', 'check', '4 of 4 gates open', 0, 1);
    else if (t >= tG[3]) pill('R', 'package', 'Six small, wrapped laddoos', 0, 0);
    else if (t >= tG[2]) pill('R', 'tag', '₹120 for six: ₹20 a day', 0, 0);
    else if (t >= tG[1]) pill('R', 'pin', 'Delivered every Monday', 0, 0);
    else if (t >= tG[0]) pill('R', 'megaphone', 'Posters and free tastes', 0, 0);
    else pill('R', 'clock', "Mrs. Rao's week", 0, 0);
  }

  /* ===== statement on navy ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tT + 0.45, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== P: the full mix ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    P5.forEach(([ic], i) => {
      const el = $('#pst' + i), ta = tP[i], td = tP[i + 1];
      M.vis(el, t, tP0 + 0.1 + i * 0.07, tPout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), fin = M.io((t - tSame) / 0.3);
      el.querySelector('.bg').style.background = mix(mix(C.card, C.ink, act), C.gold3, fin);
      el.querySelector('.s1').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.s2').style.color = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.sn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.si').style.background = t < ta ? C.paper : mix(C.navy2, mix(C.paper, '#fff', fin), off);
      setIco(el.querySelector('.si'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 34, 2.2);
    });
    M.draw($('#bk0'), t, tSame - 0.1, 0.7, M.o3); M.vis($('#bkl0'), t, tSame + 0.2, tPout, { dy: 8, ...o });
    M.hide($('#brk'), t > tPout + 0.3);
    M.vis($('#pe'), t, tP0 + 0.35, tPout, { dy: 36, ...o });
    for (let k = 0; k < 6; k++) {
      const tin = k ? tP[k - 1] : tP0 + 0.6, tout = k < 5 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pa, .pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
    }
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
    PC.forEach((_, i) => {
      const r2 = $('#pc' + i);
      M.vis(r2.querySelector('.a'), t, tLaut + 0.2 + i * 0.1, 1e9, { dx: -16, dy: 0 });
      M.vis(r2.querySelector(".ar"), t, tCs[i] - 0.25, 1e9, { dx: -12, dy: 0, fade: 0.15 });
      M.vis(r2.querySelector('.c'), t, tCs[i] - 0.05, 1e9, pop);
    });
    M.vis($('#fx'), t, tCs[2] + 0.1, 1e9, { dy: 16 });
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
