// MBA - Marketing Management, Ep 14: Extended Marketing Mix - 7Ps (Laddoo Lab)
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
  list: ['m3 17 2 2 4-4', 'm3 7 2 2 4-4', 'M13 6h8', 'M13 12h8', 'M13 18h8'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  hospital: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  bed: ['M2 4v16', 'M2 8h18a2 2 0 0 1 2 2v10', 'M2 17h20', 'M6 8v9'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  camera: ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', 'M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tHt = [wt('H2', 'nine'), wt('H2', 'crushed'), wt('H2', 'never')], tH3 = T0('H3'), tH4 = T0('H4');
const tL1 = T0('L1'), tMore = wt('L1', 'more'), tL3 = T0('L3');
const tSr = [wt('L1', 'pack'), wt('L1', 'delivery'), wt('L2', 'service')], tVr = [wt('L3', 'touch'), wt('L4', 'made'), wt('L5', 'changes')];
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D: three more Ps
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD6 = T0('D6'), tDout = T0('M1') - 0.32;
const tNew = [T0('D3'), T0('D4'), T0('D5')], tSeven = wt('D6', 'seven');
// M: two Mondays
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8');
const tO = { list: wt('M2', 'list'), hurry: wt('M2', 'hurry'), late: wt('M2', 'late'), lost: wt('M3', 'lost'), ten: wt('M3', 'ten'), gone: wt('M3', 'gone'), crushed: wt('M3', 'crushed') };
const tN = { rem: wt('M4', 'reminder'), six: wt('M5', 'six'), forty: wt('M6', 'forty'), cap: wt('M6', 'cap'), twenty: wt('M7', 'twenty'), name: wt('M7', 'name'), photo: wt('M7', 'photo'), ten: wt('M8', 'ten') };
const tMout = T0('T1') - 0.32;
// statement + the ring
const tT = T0('T1'), tSt2 = wt('T1', 'They'), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP = [0, 1, 2, 3, 4, 5].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'airline'), wt('K2', 'hospital'), wt('K3', 'bank'), wt('K4', 'hotel')];
// X: human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'experience'), wt('X2', 'product')], tXh = [wt('X3', 'cost'), wt('X3', 'already')];
const tNani = wt('X5', 'Nani'), tNot = wt('X5', 'Not');
const tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Things');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tNx = T0('N1');
const tPill = [[wt('S2', 'touch'), wt('S2', 'delivered'), wt('S2', 'change')], [wt('S3', 'people'), wt('S3', 'process'), wt('S3', 'physical')], [wt('S4', 'just')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const tile = (id, x, w, ic, n, t) => `<div class="sws" id="${id}" style="left:${x}px;width:${w}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`;
// A
const HT = [['clock', 'ARRIVED', '9:00 AM'], ['package', 'TWO PACKS', 'Crushed'], ['user', 'WHO WAS HE?', 'No name']];
$('#hRow').innerHTML = HT.map(([ic, n, t], i) => tile('ht' + i, 36 + i * 288, 272, ic, n, t)).join('');
$('#meth').innerHTML = `<div class="av face" id="raoB" style="${FACE('rao')}"></div><div class="stp" id="mt0" style="top:76px;left:112px;background:#F6E3DC;color:#B5482F">${M.icon('x', 26, C.red, 2.6)}<span>The school bus had gone!</span></div>`;
// L
const SR = [['package', 'THE PACK', 'Six laddoos'], ['clock', 'THE ROUND', 'Every Monday'], ['star', 'SO IT IS', 'A service too']];
$('#sRow').innerHTML = SR.map(([ic, n, t], i) => tile('sr' + i, 36 + i * 243, 226, ic, n, t)).join('');
const VR = [['ban', 'INTANGIBLE', "Can't touch it"], ['clock', 'INSEPARABLE', 'Made on delivery'], ['repeat', 'VARIABLE', 'Varies each day']];
$('#vRow').innerHTML = VR.map(([ic, n, t], i) => tile('vr' + i, 36 + i * 243, 226, ic, n, t)).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: seven tiles + three definitions
const P7 = [['package', 'Product'], ['tag', 'Price'], ['pin', 'Place'], ['megaphone', 'Promotion'], ['users', 'People'], ['list', 'Process'], ['eye', 'Physical evidence']];
$('#t7').innerHTML = P7.map(([ic, n], i) => { const r2 = i >= 4, x = r2 ? 48 + (i - 4) * 236 : 48 + i * 172, w = r2 ? 216 : 160; return `<div class="tl7" id="t7${i}" style="left:${x}px;top:${r2 ? 364 : 228}px;width:${w}px"><i>${M.icon(ic, 32, r2 ? C.gold : C.ink2, 2.2)}</i><span>${n}</span></div>`; }).join('');
$('#sum7I').innerHTML = M.icon('plus', 20, C.gold2, 2.6);
const DF = [['users', 'People', 'Everyone the customer meets'], ['list', 'Process', 'The steps, the same every time'], ['eye', 'Physical evidence', 'What they can see and touch']];
$('#dRows').innerHTML = DF.map(([ic, tt, m], i) => `<div class="df" id="df${i}" style="top:${96 + i * 148}px"><div class="bg"></div><div class="bd"></div><div class="serif dt">${tt}</div><div class="dm">${m}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: two Mondays on one clock line (6:00 to 9:30 AM). Plan coords inside a 688 x 250 svg. */
const X = min => 24 + (min - 360) * 640 / 210, BUS = X(450);
const T = (x, y, s, fill, txt, o = '') => `<text x="${x}" y="${y}" font-family="Poppins" font-weight="600" font-size="${s}" fill="${fill}" ${o}>${txt}</text>`;
const fmt = min => { const h = Math.floor(min / 60), m = Math.floor(min % 60); return `${h}:${String(m).padStart(2, '0')} AM`; };
const ev = (id, min, tier, txt, col, anchor = 'middle') => `<g id="${id}" visibility="hidden"><circle cx="${X(min)}" cy="160" r="10" fill="${col}" stroke="#fff" stroke-width="3"/><line x1="${X(min)}" y1="${tier ? 112 : 140}" x2="${X(min)}" y2="148" stroke="${col}" stroke-width="2"/>${T(X(min), tier ? 104 : 132, 16, C.ink, txt, `text-anchor="${anchor}"`)}</g>`;
const plan = (k, evs, extra) => `<svg class="mplan" id="plan${k}" width="688" height="250"><defs><clipPath id="avc${k}"><circle cx="0" cy="0" r="20"/></clipPath></defs>
    <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
    <line x1="${BUS}" y1="48" x2="${BUS}" y2="214" stroke="#B5482F" stroke-width="3" stroke-dasharray="6 7"/>
    ${T(BUS, 36, 14, C.red, 'SCHOOL BUS 7:30', 'text-anchor="middle" letter-spacing="2"')}
    <path d="M24 160 H664" stroke="#14213D" stroke-width="4" stroke-linecap="round"/>
    ${[360, 420, 480, 540].map(m => `<line x1="${X(m)}" y1="152" x2="${X(m)}" y2="168" stroke="#14213D" stroke-width="3"/>${T(X(m), 238, 14, C.muted, fmt(m).replace(' AM', ''), `text-anchor="${m === 360 ? 'start' : 'middle'}" letter-spacing="1.5"`)}`).join('')}
    ${extra}${evs}
    <g id="mk${k}" visibility="hidden"><circle r="24" fill="#14213D"/>${k === 'R' ? `<image href="${IMG}ll-arjun-face.jpg" x="-20" y="-20" width="40" height="40" clip-path="url(#avc${k})"/>` : `<g transform="translate(-11 -11)">${M.icon('user', 22, '#fff', 2.4)}</g>`}</g>
  </svg>`;
const PCH = [['users', 'People'], ['list', 'Process'], ['eye', 'Physical evidence']];
const tail = k => PCH.map(([ic, n], i) => `<div class="pchip" id="pc${k}${i}" style="left:${48 + i * 235}px"><span class="pci"></span><span>${n}</span></div>`).join('') + `<div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span></div>`;
$('#mLIn').innerHTML = `<div class="mav ic">${M.icon('user', 28, C.muted, 2.2)}</div><div class="lbl mlb">THE OLD WAY · NO LIST, NO CHECKS</div><div class="serif mrd" id="rdL">7:50 AM</div>` +
  plan('L', ev('eL0', 480, 0, 'Packs in a hurry', C.ink2) + ev('eL1', 510, 1, 'Leaves late', C.ink2) + ev('eL2', 550, 0, 'Reaches 9:10', C.red, 'end'),
    `<path id="lostP" d="M${X(510)} 160 q15 -14 30 0 t30 0 t30 0 t30 0" fill="none" stroke="#B5482F" stroke-width="3" stroke-dasharray="4 6" visibility="hidden"/>
     <g id="lateT" visibility="hidden"><rect x="${X(500) - 64}" y="176" width="128" height="28" rx="14" fill="#B5482F"/>${T(X(500), 195, 13, '#FFFFFF', '40 MIN LATE', 'text-anchor="middle" letter-spacing="1.5"')}</g>`) + tail('L');
$('#mRIn').innerHTML = `<div class="mav" style="${FACE('arjun')}"></div><div class="lbl mlb">THE NEW WAY · A CHECKLIST</div><div class="serif mrd" id="rdR">Sun 8 PM</div>` +
  plan('R', ev('eR0', 360, 0, 'Nani checks', C.ink2, 'start') + ev('eR1', 400, 1, 'Arjun leaves', C.ink2) + ev('eR2', 440, 0, 'Delivered', C.gold),
    `<g id="remT" visibility="hidden"><rect x="440" y="84" width="224" height="40" rx="20" fill="#FFFFFF" stroke="#B8862F" stroke-width="2"/>${T(552, 109, 14, C.gold, 'SUN 8 PM · REMINDER SENT', 'text-anchor="middle" letter-spacing="1.2"')}</g>
     <g id="earT" visibility="hidden"><rect x="${X(445) - 62}" y="176" width="124" height="28" rx="14" fill="#B8862F"/>${T(X(445), 195, 13, '#FFFFFF', '10 MIN EARLY', 'text-anchor="middle" letter-spacing="1.5"')}</g>`) + tail('R');

// P: the ring
const RC = [344, 228], RO = 210, RI = 112, SEG = 360 / 7;
const pol = (r, a) => [RC[0] + r * Math.cos(a * Math.PI / 180), RC[1] + r * Math.sin(a * Math.PI / 180)];
const sector = (a0, a1) => { const [x0, y0] = pol(RO, a0), [x1, y1] = pol(RO, a1), [x2, y2] = pol(RI, a1), [x3, y3] = pol(RI, a0); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${RO} ${RO} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} A${RI} ${RI} 0 0 0 ${x3.toFixed(1)} ${y3.toFixed(1)}Z`; };
$('#ring7').innerHTML = P7.map(([ic, n], i) => {
  const a0 = -90 + i * SEG + 1.2, a1 = -90 + (i + 1) * SEG - 1.2, am = (a0 + a1) / 2, [lx, ly] = pol(161, am), nw = i >= 4;
  const lines = n === 'Physical evidence' ? ['Physical', 'evidence'] : [n];
  return `<g id="rs${i}"><path d="${sector(a0, a1)}" fill="${nw ? C.gold : C.ink}"/><g transform="translate(${(lx - 12).toFixed(1)} ${(ly - 12 - lines.length * 9).toFixed(1)})">${M.icon(ic, 24, nw ? '#fff' : C.gold2, 2.2)}</g>` +
    lines.map((l, k) => T(lx.toFixed(1), (ly + 28 + k * 18 - (lines.length - 1) * 9).toFixed(1), 15, '#FFFFFF', l, 'text-anchor="middle"')).join('') + `</g>`;
}).join('') + `<circle cx="${RC[0]}" cy="${RC[1]}" r="${RI - 8}" fill="#F5F1E8"/><clipPath id="rcl"><circle cx="${RC[0]}" cy="${RC[1] - 12}" r="56"/></clipPath><circle cx="${RC[0]}" cy="${RC[1] - 12}" r="60" fill="#B8862F"/><image href="${IMG}ll-rao-face.jpg" x="${RC[0] - 56}" y="${RC[1] - 68}" width="112" height="112" clip-path="url(#rcl)"/>${T(RC[0], RC[1] + 74, 13, C.muted, 'THE CUSTOMER', 'text-anchor="middle" letter-spacing="2"')}`;
const RP = [
  ['THE 7PS', 'Seven Ps', 'Around one customer', [['n', '4 from McCarthy'], ['g', '3 from Booms and Bitner']]],
  ['THE FIRST FOUR', 'The 4Ps', 'From the last episode', [['n', 'Product'], ['n', 'Price'], ['n', 'Place'], ['n', 'Promotion']]],
  ['NEW P · 01', 'People', 'Everyone the customer meets', 'arjun|On time, polite, says his name'],
  ['NEW P · 02', 'Process', 'The same steps, every time', [['', 'Checklist'], ['a', ''], ['', 'Route card'], ['a', ''], ['g', 'Every Monday']]],
  ['NEW P · 03', 'Physical evidence', 'What they can see and touch', [['', 'Sealed pack'], ['', 'Clean bag'], ['g', 'Photo at the door']]],
  ['THE RESULT', 'Seen and trusted', 'An invisible service, made visible', 'rao|Same laddoos, a far better Monday'],
];
$('#rPans').innerHTML = RP.map(([s, t, m, c], k) => `<div class="pn" id="rp${k}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (typeof c === 'string' ? `<div class="rcf" style="${FACE(c.split('|')[0])}"></div><div class="rct">${c.split('|')[1]}</div>`
    : c.map(([cl, tx], j) => cl === 'a' ? `<svg class="rca" id="rc${k}${j}" width="40" height="24"><path d="M4 12 H30 M22 4 L32 12 L22 20" fill="none" stroke="#B9B1A3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : `<div class="rc7 ${cl}" id="rc${k}${j}">${tx}</div>`).join('')) + `</div>`).join('');

// K: at work today
const KA = [
  ['users', 'People', 'Everyone they meet', 'Arjun says his name at every door', 'plane', 'An airline trains crew to stay calm and kind'],
  ['list', 'Process', 'Same steps every time', 'Reminder, check, route card, photo', 'hospital', 'A hospital checks patients in the same steps'],
  ['eye', 'Physical evidence', 'What they see and touch', 'A sealed pack and a photo at the door', 'bank', 'A bank keeps its branch and app clean'],
  ['star', 'All seven', 'The whole experience', 'Great laddoos, delivered the right way', 'bed', 'A hotel gets the room and the welcome right'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['SERVICES TODAY', 'Three extra Ps', 'Wherever people serve people', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A LADDOO ROUND TO A HOTEL</div><div class="pe"><i>${M.icon('users', 34, C.gold, 2.2)}</i><span>People, process, physical evidence</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['heart', 'The whole experience'], ['users', 'Staff matter']];
const XH = [['coin', 'Costs time and money'], ['repeat', 'Overlaps the 4Ps']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3);
$('#bothI').innerHTML = M.icon('star', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['People', 'Process', 'Physical evidence', 'Promotion'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('eye', 44, C.gold2, 2.4);
// recap
const ROWS = [['ban', 'Services are different', ["Can't touch", 'Made on delivery', 'Varies']], ['plus', 'Three new Ps', ['People', 'Process', 'Physical evidence']], ['heart', 'The 7Ps shape the experience', ['Not just the product']]];
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
const tileOn = (el, on, ic, bad = 0) => {
  el.style.background = mix(mix(C.paper, C.redBg, bad), C.ink, on);
  el.querySelector('.zt').style.color = mix(mix(C.ink, C.red, bad), '#fff', on); el.querySelector('.zn').style.color = mix(mix(C.muted, C.red, bad), C.gold2, on);
  setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : (bad > 0.5 ? C.red : C.gold), 40, 2.2);
};
const pop = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const svgShow = (el, t, t0) => attr(el, 'visibility', t >= t0 ? 'inherit' : 'hidden');
const pill = (k, ic, tx, st) => { // st: 0 neutral, 1 bad, 2 good, 3 bad final, 4 good final
  const ms = $('#ms' + k), fin = st >= 3, bad = st === 1 || st === 3;
  setIco(ms.querySelector('.msi'), ic, fin ? '#fff' : (bad ? C.red : C.gold), 26, 2.4);
  M.setT(ms.querySelector('.mtx'), tx);
  const bg = fin ? (bad ? C.red : C.gold) : (bad ? C.redBg : C.paper), fg = fin ? '#fff' : (bad ? C.red : C.ink);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};
const chipSt = (el, t, t0, good, ic) => {
  const u = M.io((t - t0) / 0.3);
  el.style.background = mix(C.paper, good ? C.gold : C.redBg, u); el.style.color = mix(C.muted, good ? '#fff' : C.red, u);
  setIco(el.querySelector('.pci'), u > 0.5 ? (good ? 'check' : 'x') : ic, u > 0.5 ? (good ? '#fff' : C.red) : C.muted, 22, 2.4);
};
const oldMin = M.track(470, [[tO.hurry - 0.2, 480], [tO.late - 0.2, 510], [tO.lost - 0.1, 530], [tO.ten - 0.4, 550]], M.SOFT);
const newMin = M.track(360, [[tN.forty - 0.4, 400], [tN.twenty - 0.4, 440]], M.SOFT);
const ringOn = (i, t) => { // how "active" ring segment i is
  const sets = [[0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3], [4], [5], [6], [4, 5, 6]];
  let k = 0; for (let j = 0; j < 6; j++) if (t >= tP[j] - 0.05) k = j;
  return sets[k].includes(i) ? 1 : 0;
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  document.querySelectorAll('.df .dm').forEach(el => { if (el.offsetWidth > 560) el.style.fontSize = Math.floor(26 * 560 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.tl7 span').forEach(el => { const max = el.parentNode.offsetWidth - 40; if (el.offsetWidth > max) el.style.fontSize = Math.floor(24 * max / el.offsetWidth) + 'px'; });
  RP.forEach(([, , , c], k) => {
    const pt = $('#rp' + k + ' .pt'); if (pt.offsetWidth > 688) pt.style.fontSize = Math.floor(84 * 688 / pt.offsetWidth) + 'px';
    const pm = $('#rp' + k + ' .pm'); if (pm.offsetWidth > 688) pm.style.fontSize = Math.floor(36 * 688 / pm.offsetWidth) + 'px';
    if (typeof c !== 'string') { let x = 48; c.forEach(([cl], j) => { const el = $('#rc' + k + j); el.style.left = x + 'px'; x += (cl === 'a' ? 40 : el.offsetWidth) + (cl === 'a' ? 6 : 12); }); }
  });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  const tk = $('#takeT'); if (tk.offsetWidth > 1440) tk.style.fontSize = Math.floor(40 * 1440 / tk.offsetWidth) + 'px';
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
  M.vis($('#exChip'), t, tM1 + 0.4, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: the Monday that went wrong ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    HT.forEach(([ic], i) => { const el = $('#ht' + i); M.vis(el, t, tHt[i] - 0.05, 1e9, pop); tileOn(el, 0, ic, M.io((t - tHt[i] - 0.2) / 0.3)); });
    M.vis($('#ask'), t, tH3 + 0.05, tAout, { dy: 36, ...o });
    M.vis($('#raoB'), t, tH3 + 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#mt0'), t, tH3 + 0.5, 1e9, pop);
    M.rise($('#askT'), t, tH4 + 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: a service too ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tMore);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#rcp'), t, tMore + 0.12, tLout, { dx: 60, dy: 0, ...o });
    SR.forEach(([ic], i) => { const el = $('#sr' + i); M.vis(el, t, tSr[i] - 0.05, 1e9, pop); tileOn(el, i === 2 ? M.io((t - tSr[2]) / 0.3) : 0, ic); });
    M.vis($('#team'), t, tL3 - 0.1, tLout, { dy: 36, ...o });
    VR.forEach(([ic], i) => {
      const el = $('#vr' + i); M.vis(el, t, tVr[i] - 0.05, 1e9, pop);
      tileOn(el, M.io((t - tVr[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tVr[i + 1]) / 0.25) : M.io((t - tLout + 0.3) / 0.3))), ic);
    });
  }

  /* ===== D: three more Ps ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.rise($('#kot1'), t, wt('D2', 'Bernard') - 0.1, { st: 0.06, sp: M.HEAVY }); M.vis($('#kbk'), t, wt('D2', 'Bitner') + 0.2, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD2 + 0.4, 1e9, { dy: 0 });
    P7.forEach((_, i) => {
      const el = $('#t7' + i), ta = i < 4 ? tD2 + 0.5 + i * 0.1 : tNew[i - 4];
      M.vis(el, t, ta - 0.05, 1e9, i < 4 ? { dy: 14 } : pop);
      if (i >= 4) { const on = M.io((t - ta) / 0.25) * (1 - (i < 6 ? M.io((t - tNew[i - 3]) / 0.25) : M.io((t - tD6) / 0.3)));
        el.style.background = mix(C.gold3, C.ink, on); el.querySelector('span').style.color = mix(C.ink, '#fff', on); }
      else { el.querySelector('span').style.color = C.ink2; }
    });
    M.vis($('#sum7'), t, tSeven - 0.1, 1e9, pop);
    M.vis($('#vc'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    DF.forEach(([ic], i) => {
      const el = $('#df' + i); M.vis(el, t, tNew[i] + 0.05, 1e9, { dy: 18 });
      const on = M.io((t - tNew[i]) / 0.3) * (1 - (i < 2 ? M.io((t - tNew[i + 1]) / 0.3) : M.io((t - tD6) / 0.35)));
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, on);
      el.querySelector('.dt').style.color = mix(C.ink, '#fff', on); el.querySelector('.dm').style.color = mix(C.ink2, C.gold2, on);
      const bd = el.querySelector('.bd'); bd.style.background = mix('#fff', C.navy2, on); setIco(bd, ic, on > 0.5 ? C.gold2 : C.gold, 34, 2.2);
    });
  }

  /* ===== M: two Mondays ===== */
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
      for (let i = 0; i < 3; i++) M.vis($('#pc' + k + i), t, base + 0.35 + i * 0.07, 1e9, pop);
      M.vis($('#ms' + k), t, base + 0.5, 1e9, pop);
    }
    // the old way
    const om = oldMin(t), mkL = $('#mkL'); svgShow(mkL, t, tM1 + 0.6); attr(mkL, 'transform', `translate(${X(om).toFixed(1)} 160)`);
    M.setT($('#rdL'), fmt(om)); $('#rdL').style.color = om > 450 ? C.red : C.ink;
    svgShow($('#eL0'), t, tO.hurry); svgShow($('#eL1'), t, tO.late); svgShow($('#eL2'), t, tO.ten);
    svgShow($('#lostP'), t, tO.lost); svgShow($('#lateT'), t, tO.gone);
    chipSt($('#pcL1'), t, tO.list, false, 'list'); chipSt($('#pcL0'), t, tO.lost, false, 'users'); chipSt($('#pcL2'), t, tO.crushed, false, 'eye');
    if (t >= tO.crushed + 0.5) pill('L', 'x', 'Late, crushed, no name', 3);
    else if (t >= tO.ten) pill('L', 'clock', 'Reaches 9:10. The bus has gone', 1);
    else if (t >= tO.lost) pill('L', 'pin', 'Gets lost on the way', 1);
    else if (t >= tO.late) pill('L', 'clock', 'Leaves late', 1);
    else if (t >= tO.list) pill('L', 'list', 'No list, no checks', 1);
    else pill('L', 'clock', 'Monday morning', 0);
    // the new way
    const nm = newMin(t), mkR = $('#mkR'); svgShow(mkR, t, tN.six); attr(mkR, 'transform', `translate(${X(nm).toFixed(1)} 160)`);
    M.setT($('#rdR'), t < tN.six ? 'Sun 8 PM' : fmt(nm)); $('#rdR').style.color = t >= tN.twenty ? C.gold : C.ink;
    svgShow($('#remT'), t, tN.rem); svgShow($('#eR0'), t, tN.six); svgShow($('#eR1'), t, tN.forty); svgShow($('#eR2'), t, tN.twenty); svgShow($('#earT'), t, tN.ten);
    chipSt($('#pcR1'), t, tN.rem, true, 'list'); chipSt($('#pcR0'), t, tN.name, true, 'users'); chipSt($('#pcR2'), t, tN.photo, true, 'eye');
    if (t >= tN.ten) pill('R', 'check', '10 minutes before the bus', 4);
    else if (t >= tN.photo) pill('R', 'camera', 'Photo message to Mrs. Rao', 2);
    else if (t >= tN.twenty) pill('R', 'package', 'Sealed pack, says his name', 2);
    else if (t >= tN.forty) pill('R', 'pin', 'Leaves with a route card', 2);
    else if (t >= tN.six) pill('R', 'list', 'Nani checks every pack', 2);
    else if (t >= tN.rem) pill('R', 'message', 'Reminder to every family', 2);
    else pill('R', 'clock', 'Sunday night', 0);
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

  /* ===== P: the 7Ps ring ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#rg'), t, tP0 + 0.02, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#ring7'), t, tP0 + 0.2, 1e9, { dy: 0, sc: 0.9, sp: M.SOFT, fade: 0.2 });
    P7.forEach((_, i) => {
      const g = $('#rs' + i), ta = tP0 + 0.35 + i * 0.09, a = M.clamp((t - ta) / 0.15);
      const on = M.io((t - tP[1] + 0.05) / 0.25) > 0 ? ringOn(i, t) : 1;
      const am = (-90 + (i + 0.5) * SEG) * Math.PI / 180, d = t >= tP[1] - 0.05 && on ? 12 : 0;
      attr(g, 'opacity', (a * (on ? 1 : 0.28)).toFixed(3));
      attr(g, 'transform', `translate(${(d * Math.cos(am)).toFixed(1)} ${(d * Math.sin(am)).toFixed(1)})`);
    });
    M.vis($('#rgP'), t, tP0 + 0.2, tPout, { dx: 60, dy: 0, ...o });
    RP.forEach(([, , , c], k) => {
      const tin = k ? tP[k] : tP0 + 0.4, tout = k < 5 ? tP[k + 1] - 0.14 : 1e9;
      const pn = $('#rp' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (typeof c === 'string') { M.vis(pn.querySelector('.rcf'), t, tin + 0.6, tout, { ...pop, ...oo }); M.vis(pn.querySelector('.rct'), t, tin + 0.7, tout, { dy: 12, ...oo }); }
      else c.forEach((_, j) => M.vis($('#rc' + k + j), t, tin + 0.6 + j * 0.28, tout, { ...pop, ...oo }));
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
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tX4 + 0.3, tNani, tNot][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    M.vis($('#fx'), t, tNani + 0.5, 1e9, { dy: 16 });
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
