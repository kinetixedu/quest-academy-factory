// MBA - Marketing Management, Ep 10: Market Targeting (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', ld: '#A8713A', ldD: '#7E5428', goldD: '#D9C08C' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  dumbbell: ['M14.4 14.4 9.6 9.6', 'M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z', 'm21.5 21.5-1.4-1.4', 'M3.9 3.9 2.5 2.5', 'M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tThree = wt('H1', 'three');
const tH2 = T0('H2'), tC2 = T0('C2'), tWhich = wt('C2', 'which');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tL4 = T0('L4'), tChoice = wt('L4', 'choice');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tDout = T0('M0') - 0.32;
const tSet = wt('D2', 'set'), tShare = wt('D2', 'share'), tDecides = wt('D2', 'decides'), tHl = [tSet, wt('D2', 'common'), tDecides];
const tSw = [wt('D3', 'everyone'), wt('D3', 'pick'), wt('D3', 'best')];
// M: scoring
const tM0 = T0('M0'), tM2 = T0('M2'), tM4 = T0('M4'), tM6 = T0('M6'), tM7 = T0('M7');
const tSt = [wt('M1', 'big'), wt('M3', 'competition'), wt('M5', 'fit'), wt('M7', 'Add')];
const tFill = [tM2, tM4, tM6], tWin = wt('M7', 'win'), tTarget = wt('M7', 'target');
const tMout = T0('T1') - 0.32;
// statement
const tT = T0('T1'), tSt2 = wt('T1', 'Choose'), tP0 = T0('P0'), tTu = tP0 - 0.32;
// P: four strategies
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('R0') - 0.32;
// R: Laddoo Lab's choice
const tR0 = T0('R0'), tR1 = T0('R1'), tR2 = T0('R2'), tRout = T0('K0') - 0.32;
const tRq = [wt('R1', 'small'), wt('R1', 'clear'), wt('R1', 'Busy')], tRl = [tR2 + 0.3, wt('R2', 'gym'), wt('R2', 'office')], tKit = wt('R2', 'kitchens'), tDiffR = wt('R2', 'differentiated');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'salt'), wt('K2', 'bank'), wt('K3', 'bakery'), wt('K4', 'food')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7'), tX8 = T0('X8');
const tXg = [wt('X2', 'Money'), wt('X2', 'best')], tXh = [wt('X3', 'losing'), wt('X3', 'risky')];
const tSum = wt('X4', 'summer'), tDrop = wt('X5', 'drop'), tOffX = wt('X6', 'office'), tParX = wt('X7', 'parents');
const tXout = tX8 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'A');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'segments')], [wt('S3', 'size'), wt('S3', 'competition'), wt('S3', 'fit')], [wt('S4', 'mass'), wt('S4', 'differentiated'), wt('S4', 'concentrated'), wt('S4', 'micro')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const SEG = [['rao', 'cap', 'Tiffin parents', 60], ['', 'dumbbell', 'Gym-goers', 40], ['', 'briefcase', 'Office snackers', 50]], SCOL = [C.gold, C.ink, C.ld];
// A
$('#gts').innerHTML = SEG.map(([f, ic, n, v], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 285}px"><div class="gi" style="${f ? FACE(f) + ';box-shadow:0 0 0 3px #B8862F' : ''}">${f ? '' : M.icon(ic, 28, SCOL[i], 2.2)}</div><div class="serif gv" style="color:${SCOL[i]}">${v}</div><div class="gl">BUYERS</div><div class="gn">${n}</div></div>`).join('');
const METH = [['home', 'One kitchen'], ['users', 'Three groups'], ['clock', 'Only so many hours']];
$('#meth').innerHTML = METH.map(([ic, m], i) => `<div class="stp" id="mt${i}" style="top:76px">${M.icon(ic, 24, C.gold, 2.4)}<span>${m}</span></div>`).join('');
// L
const WHO = [['', 'dumbbell', 'Gym-goers', 'New ingredients and machines', 0], ['', 'briefcase', 'Office snackers', 'Deliveries across the city', 0], ['rao', '', 'Tiffin parents', 'Already love the recipe', 1]];
$('#wRows').innerHTML = WHO.map(([f, ic, n, d, ok], i) => `<div class="wr" id="wr${i}" style="top:${88 + i * 128}px"><div class="bg"></div>${f ? `<div class="fa" style="${FACE(f)}"></div>` : `<div class="fi">${M.icon(ic, 34, C.gold2, 2.2)}</div>`}<div class="wn">${n}</div><div class="wd">${d}</div><div class="tg" style="background:${ok ? C.gold : C.redBg};color:${ok ? '#fff' : C.red}">${M.icon(ok ? 'check' : 'alert', 18, ok ? '#fff' : C.red, 2.6)}${ok ? 'READY' : 'HARD'}</div></div>`).join('');
$('#gapI').innerHTML = M.icon('target', 22, C.gold2, 2.4); 
wrap($('#ill'), 'illOut', 784, 580);
// D: segments to a target
const TX = 600, TY = 85;
$('#s2t').innerHTML = `<rect width="712" height="170" rx="20" fill="#F5F1E8"/>` + [60, 40, 20].map((r, i) => `<circle cx="${TX}" cy="${TY}" r="${r}" fill="${i % 2 ? '#FFFFFF' : '#E2DACB'}" id="tr${i}"/>`).join('') + `<circle id="trC" cx="${TX}" cy="${TY}" r="8" fill="#14213D"/>` +
  SEG.map(([, , n], k) => `<g id="sgd${k}"><path id="sl${k}" d="M246 ${30 + k * 55} C 400 ${30 + k * 55}, 440 ${TY}, ${TX - 64} ${TY}" fill="none" stroke="${SCOL[k]}" stroke-width="3" stroke-dasharray="${k ? '6 8' : 'none'}"/><circle cx="48" cy="${30 + k * 55}" r="18" fill="${SCOL[k]}"/><text x="78" y="${30 + k * 55 + 6}" font-family="Poppins" font-weight="600" font-size="17" fill="#14213D">${n}</text></g>`).join('');
const SWT = [['ban', 'NOT', 'Everyone'], ['search', 'PICK', 'One group'], ['award', 'THEN', 'Serve it best']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the scoreboard (688 x 250 svg) and the target */
const SC = [[5, 4, 5], [3, 1, 2], [4, 3, 3]], COLX = [214, 344, 474], RY = [86, 146, 206];
const pip = (r, c, p) => `<circle id="pp${r}${c}${p}" cx="${COLX[c] - 40 + p * 20}" cy="${RY[r]}" r="7" fill="#E2DACB"/>`;
$('#mLIn').innerHTML = `<div class="mav" style="${FACE('zoya')}"></div><div class="lbl mlb">SCORING THE GROUPS · 3 QUESTIONS</div><div class="serif mrd" id="rdL">0 / 15</div>
    <svg class="mplan" id="planL" width="688" height="250"><defs><clipPath id="avc"><circle cx="0" cy="0" r="15"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${['SIZE', 'FEW RIVALS', 'FIT', 'TOTAL'].map((h, c) => `<text id="hd${c}" x="${c < 3 ? COLX[c] : 600}" y="40" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">${h}</text>`).join('')}
      ${[0, 1, 2].map(r => `<rect id="rw${r}b" x="12" y="${RY[r] - 26}" width="664" height="52" rx="14" fill="#F5F1E8"/>
        <g transform="translate(36 ${RY[r]})"><circle r="17" fill="${SCOL[r]}"/>${r === 0 ? `<image href="${IMG}ll-rao-face.jpg" x="-15" y="-15" width="30" height="30" clip-path="url(#avc)"/>` : `<g transform="translate(-10 -10)">${M.icon(SEG[r][1], 20, C.gold2, 2.2)}</g>`}</g>
        <text x="62" y="${RY[r] + 6}" font-family="Poppins" font-weight="600" font-size="17" fill="#14213D">${SEG[r][2]}</text>
        ${[0, 1, 2].map(c => [0, 1, 2, 3, 4].map(p => pip(r, c, p)).join('')).join('')}
        <text id="tt${r}" x="600" y="${RY[r] + 10}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="28" fill="${SCOL[r]}">0</text>`).join('')}
    </svg>
    <div class="mbar" id="barL">${[0, 1, 2, 3].map(k => `<i id="seg${k}" style="left:${k * 174}px;width:166px"></i>`).join('')}</div>
    <div class="mtk" style="left:48px">SIZE</div><div class="mtk" style="right:48px">ADD UP</div>
    <div class="mst" id="msL"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
wrap($('#mL'), 'mLOut', 784, 580);
const BX = 392, BY = 285, ANG = [-90, 150, 30];
$('#tgt').innerHTML = `<defs><clipPath id="avt"><circle cx="0" cy="0" r="23"/></clipPath></defs>` + [190, 140, 90, 40].map((r, i) => `<circle cx="${BX}" cy="${BY}" r="${r}" fill="${i % 2 ? '#FFFFFF' : '#F5F1E8'}" stroke="#E2DACB" stroke-width="2"/>`).join('') + `<circle cx="${BX}" cy="${BY}" r="8" fill="#14213D"/>` +
  SEG.map(([, ic, n], k) => `<g id="mk${k}"><circle id="mkR${k}" r="28" fill="${SCOL[k]}" stroke="#FFFFFF" stroke-width="4"/>${k === 0 ? `<image href="${IMG}ll-rao-face.jpg" x="-23" y="-23" width="46" height="46" clip-path="url(#avt)"/>` : `<g transform="translate(-13 -13)">${M.icon(SEG[k][1], 26, C.gold2, 2.2)}</g>`}<rect x="-74" y="34" width="148" height="30" rx="15" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><text x="0" y="55" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" fill="#14213D">${n}</text></g>`).join('');
$('#tgtI').innerHTML = M.icon('target', 24, '#fff', 2.4);

// P: four strategies
const P4 = [['megaphone', 'Mass', 'One offer for all', 'zoya', 'One laddoo, one poster, for everyone'],
  ['layers', 'Differentiated', 'An offer per segment', 'dev', 'A different offer for each group'],
  ['target', 'Concentrated', 'One segment, done well', 'rao', 'Only busy parents, served very well'],
  ['user', 'Micromarketing', 'One area, or one person', 'arjun', 'A special pack for one school']];
$('#p4').innerHTML = P4.map(([ic, a, b], i) => `<div class="st4" id="pst${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2" style="font:600 26px Poppins;top:232px">${b}</div></div>`).join('');
const sq = (x, y, s = 28) => `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" rx="7" fill="#B8862F"/>`;
const sc = (x, y, r, col) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`;
const ln = (k, j, x1, y1, x2, y2) => `<path class="dl" id="dl${k}${j}" d="M${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}" fill="none" stroke="#B9B1A3" stroke-width="3"/>`;
const SY3 = [22, 66, 110];
const DG = [
  `${SY3.map((y, j) => ln(1, j, 52, 66, 416, y)).join('')}${sq(30, 66)}${SY3.map((y, j) => sc(440, y, 18, SCOL[j])).join('')}`,
  `${SY3.map((y, j) => ln(2, j, 52, y, 416, y)).join('')}${SY3.map(y => sq(30, y)).join('')}${SY3.map((y, j) => sc(440, y, 18, SCOL[j])).join('')}`,
  `${ln(3, 0, 52, 66, 416, 22)}${sq(30, 66)}${SY3.map((y, j) => sc(440, y, 18, j ? '#E2DACB' : SCOL[0])).join('')}`,
  `${[0, 1, 2].map(j => ln(4, j, 46, SY3[j], 404, 18 + j * 46)).join('')}${SY3.map(y => sq(30, y, 22)).join('')}${[0, 1, 2].map(r => [0, 1, 2].map(c => sc(420 + c * 30, 18 + r * 46 + (c === 0 ? 0 : 0), 9, c === 0 ? C.ink : '#E2DACB')).join('')).join('')}`];
$('#pePans').innerHTML = [[null, 'FOUR WAYS TO TARGET', 'From everyone, down to one person']].concat(P4.map((p, i) => [p[3], `STRATEGY 0${i + 1} · FOR LADDOO LAB`, p[4]])).map(([f, l, x], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('target', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div>${k ? `<svg class="pdg" id="pdg${k}" width="520" height="132">${DG[k - 1]}</svg>` : ''}</div>`).join('');

// R: Laddoo Lab's choice
const RQ = ['One kitchen is enough', 'One recipe they already love', 'One clear message'];
$('#rTq').innerHTML = RQ.map((q, i) => `<div class="qr" id="rq${i}" style="top:${304 + i * 80}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="rt">${q}</div><div class="ck">${M.icon('check', 22, '#fff', 3)}</div></div>`).join('');
const RL = [['rao', '', 'Busy parents', 'TODAY'], ['', 'dumbbell', 'Gym-goers', 'OWN OFFER'], ['', 'briefcase', 'Office snackers', 'OWN OFFER']];
$('#rLr').innerHTML = RL.map(([f, ic, n, tg], i) => `<div class="rp" id="rl${i}" style="top:${160 + i * 104}px;background:${i ? C.paper : C.gold3}"><div class="${f ? 'fa' : 'fi'}" style="${f ? FACE(f) : ''}">${f ? '' : M.icon(ic, 32, C.gold2, 2.2)}</div><div class="kl">SEGMENT 0${i + 1}</div><div class="kt">${n}</div><div class="tg" style="${i ? '' : 'background:#B8862F;color:#fff'}">${tg}</div></div>`).join('') +
  `<div id="kitP" class="lgd" style="top:496px;height:52px;background:#F6E3DC;color:#B5482F;font-size:22px"><span id="kitI"></span>Needs more kitchens and more money</div>`;
$('#kitI').innerHTML = M.icon('alert', 20, C.red, 2.4);
wrap($('#rT'), 'rTOut', 784, 580);

// K: at work today
const KA = [
  ['megaphone', 'Mass marketing', 'One offer for all', 'One laddoo and one poster for everyone', 'package', 'A salt maker sells one pack to almost every home'],
  ['layers', 'Differentiated', 'An offer for each segment', 'A different offer for each group, someday', 'bank', 'A bank has accounts for students, families, seniors'],
  ['target', 'Concentrated', 'One segment, served well', 'Laddoo Lab serves busy parents', 'store', 'A small bakery makes only gluten-free bread'],
  ['user', 'Micromarketing', 'One area, or one person', 'A special pack for one school', 'bike', 'A delivery app suggests dishes from your past orders'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['TARGETING TODAY', 'Four strategies', 'Every company picks one', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A SALT MAKER TO A BAKERY</div><div class="pe"><i>${M.icon('target', 34, C.gold, 2.2)}</i><span>Big or small, everyone chooses a target</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['target', 'Focused effort'], ['award', 'Better results']];
const XH = [['ban', 'Lost buyers'], ['alert', 'One-group risk']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const MON = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], TIF = [42, 44, 40, 14, 10, 36, 46, 47, 46, 45, 44, 42], OFF = [14, 15, 15, 16, 16, 16, 17, 17, 18, 18, 18, 19];
const CXp = i => 24 + i * 58, CYp = v => 196 - v * 3.4;
const path = a => a.map((v, i) => `${i ? 'L' : 'M'}${CXp(i)} ${CYp(v).toFixed(1)}`).join(' ');
$('#chart').innerHTML = `<rect id="dipR" x="${CXp(3) - 22}" y="20" width="${58 + 44}" height="180" rx="12" fill="#F6E3DC"/><text id="dipT" x="${CXp(3) + 29}" y="40" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="12" letter-spacing="1.5" fill="#B5482F">SUMMER BREAK</text>
  <path d="M0 197 H688" stroke="#E2DACB" stroke-width="3"/>` + MON.map((m, i) => `<text x="${CXp(i)}" y="222" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.5" fill="#8A8274">${m}</text>`).join('') +
  `<path id="lnT" d="${path(TIF)}" fill="none" stroke="#B8862F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path id="lnO" d="${path(OFF)}" fill="none" stroke="#14213D" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 9"/>
  <text id="lbT" x="664" y="${CYp(42) - 14}" text-anchor="end" font-family="Poppins" font-weight="700" font-size="15" fill="#B8862F">Tiffin parents</text><text id="lbO" x="664" y="${CYp(19) - 14}" text-anchor="end" font-family="Poppins" font-weight="700" font-size="15" fill="#14213D">Office snackers</text>`;
$('#fx0I').innerHTML = M.icon('shield', 32, C.gold, 2.4);
$('#bothI').innerHTML = M.icon('target', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Mass', 'Differentiated', 'Concentrated', 'Micromarketing'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('layers', 44, C.gold2, 2.2);
// recap
const ROWS = [['target', 'Targeting: choose whom to serve', ['Segments']], ['award', 'Score each segment', ['Size and growth', 'Competition', 'Fit']], ['layers', 'Pick a strategy', ['Mass', 'Differentiated', 'Concentrated', 'Micro']]];
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
// the scoring run
const PST = [['Big enough, and growing?', 'users'], ['How tough is the competition?', 'alert'], ['Does it fit what we do best?', 'check'], ['Add up the scores', 'award']];
const pipU = (r, c, p, t) => M.io((t - tFill[c] - 0.15 - r * 0.45 - p * 0.07) / 0.18);
const runP = t => {
  let k = 0; for (let i = 0; i < 4; i++) if (t >= tSt[i] - 0.05) k = i + 1;
  const tot = [0, 0, 0];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) for (let p = 0; p < 5; p++) {
    const u = p < SC[r][c] ? pipU(r, c, p, t) : 0; tot[r] += u;
    attr($(`#pp${r}${c}${p}`), 'fill', mix('#E2DACB', SCOL[r], u));
  }
  for (let r = 0; r < 3; r++) {
    M.setT($('#tt' + r), String(Math.round(tot[r])));
    attr($(`#rw${r}b`), 'fill', r === 0 ? mix(C.paper, C.gold3, M.io((t - tWin) / 0.3)) : C.paper);
  }
  for (let c = 0; c < 4; c++) attr($('#hd' + c), 'fill', k === c + 1 ? C.gold : C.muted);
  for (let s = 0; s < 4; s++) { const sg = $('#seg' + s), on = M.io((t - tSt[s]) / 0.3); sg.style.background = mix(C.paper2, k > s + 1 ? C.goldD : C.gold, on); }
  const mx = Math.round(Math.max(...tot)); M.setT($('#rdL'), `${mx} / 15`); $('#rdL').style.color = t >= tWin ? C.gold : C.ink;
  if (t >= tTarget - 0.1) pill('L', 'target', 'Target: busy parents', '14 of 15', 0, 1);
  else if (k) pill('L', PST[k - 1][1], `0${k}  ${PST[k - 1][0]}`, '', 0, 0);
  else pill('L', 'help', 'Three groups, one kitchen', '', 0, 0);
  // markers move in as points add up
  for (let r = 0; r < 3; r++) {
    const rad = 232 - tot[r] * 13.5, a = ANG[r] * Math.PI / 180, g = $('#mk' + r);
    attr(g, 'transform', `translate(${(BX + rad * Math.cos(a)).toFixed(1)} ${(BY + rad * Math.sin(a)).toFixed(1)})`);
    attr($('#mkR' + r), 'stroke', r === 0 && t >= tWin ? C.gold : '#FFFFFF');
    const u = M.clamp((t - tM0 - 0.8 - r * 0.1) / 0.15); g.style.opacity = u.toFixed(3); M.hide(g, u <= 0);
  }
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const tz = $('#tgZ'); tz.style.left = (68 - tz.offsetWidth) + 'px'; $('#tgN').style.left = '716px';
  document.querySelectorAll('#who .gapP, #who #gapP').forEach(gp => { gp.style.left = (392 - gp.offsetWidth / 2) + 'px'; });
  { const gp = $('#kitP'); gp.style.left = (392 - gp.offsetWidth / 2) + 'px'; }
  for (let i = 0; i < 3; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  const tp = $('#tgtP'); tp.style.left = (392 - tp.offsetWidth / 2) + 'px';
  document.querySelectorAll('.st4 .s1').forEach(el => { if (el.offsetWidth > 304) el.style.fontSize = Math.floor(34 * 304 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.st4 .s2').forEach(el => { if (el.offsetWidth > 304) el.style.fontSize = Math.floor(26 * 304 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.fx .kt').forEach(el => { if (el.offsetWidth > 554) el.style.fontSize = Math.floor(28 * 554 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.wr .wd').forEach(el => { if (el.offsetWidth > 400) el.style.fontSize = Math.floor(24 * 400 / el.offsetWidth) + 'px'; });
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
  const exOn = t < tL1 ? [tMorph + 0.5, tAout] : t < tT ? [tM2 - 0.1, tMout] : [tSum - 0.1, tX7 - 0.2];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: three groups, one kitchen ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#grp'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#gt' + i), t, tMorph + 0.5 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    const tm = [wt('H2', 'Nani'), wt('H2', 'everyone'), wt('H2', 'every', 1)];
    for (let i = 0; i < 3; i++) M.vis($('#mt' + i), t, Math.max(tm[i], tMorph + 0.7) - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tWhich - 0.05, { st: 0.07, sp: M.HEAVY });
    for (let i = 0; i < 3; i++) $('#gt' + i).style.background = mix(C.paper, C.gold3, M.io((t - tWhich - i * 0.25) / 0.2) * (1 - M.io((t - tWhich - i * 0.25 - 0.4) / 0.25)));
  }

  /* ===== L: what each group would need ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tL1 + 0.5, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, wt('L1', 'kitchen') - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#who'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    const tW = [tL2 + 0.4, tL3, tL4];
    WHO.forEach((_, i) => {
      const el = $('#wr' + i); M.vis(el, t, tW[i] - 0.05, 1e9, { dx: 24, dy: 0 });
      M.vis(el.querySelector('.tg'), t, tW[i] + 0.8, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tW[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tW[i + 1]) / 0.25) : M.io((t - tChoice) / 0.25)));
      el.querySelector('.bg').style.background = mix(C.paper, C.gold3, on);
    });
    M.vis($('#gapP'), t, tChoice - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: what is targeting ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.rise($('#dq2'), t, wt('D1', 'market') - 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tSet - 0.6);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Kotler') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Armstrong') - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'define') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tSet - 0.4, 1e9, { dy: 0 });
    for (let i = 0; i < 3; i++) { const q = $('#ql' + i); M.vis(q, t, tSet - 0.3 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tHl[i] + 0.1) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tSet - 0.5, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#s2t'), t, tSet - 0.25, 1e9, { dy: 12 });
    const dc = M.io((t - tDecides) / 0.35);
    for (let k = 0; k < 3; k++) {
      M.vis($('#sgd' + k), t, tSet + k * 0.15, 1e9, { dx: -12, dy: 0 });
      M.draw($('#sl' + k), t, tShare + k * 0.12, 0.6, M.o3);
      $('#sgd' + k).style.opacity = k ? (1 - 0.7 * dc).toFixed(3) : '';
      if (!k) attr($('#sl0'), 'stroke-width', (3 + 3 * dc).toFixed(2));
    }
    attr($('#tr0'), 'fill', mix('#E2DACB', C.gold, dc)); attr($('#tr2'), 'fill', mix('#E2DACB', C.gold, dc));
    M.vis($('#sw'), t, tD3 + 0.05, tDout, { dy: 36, ...o });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tSw[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(i === 0 ? C.redBg : C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : (i === 0 ? C.red : C.gold), 40, 2.2);
    });
  }

  /* ===== M: scoring the groups ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM0 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM0 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    const root = $('#mLIn'), base = tM0 + 0.3;
    M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
    M.vis($('#rdL'), t, base + 0.12, 1e9, { dy: 10 });
    M.vis($('#planL'), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#barL'), t, base + 0.35, 1e9, { dy: 10 });
    root.querySelectorAll('.mtk').forEach(el => M.vis(el, t, base + 0.4, 1e9, { dy: 8 }));
    M.vis($('#msL'), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#tgt'), t, base + 0.2, 1e9, { dy: 0, sc: 0.92, sp: M.SOFT });
    runP(t);
    M.vis($('#tgtP'), t, tTarget - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== P: four strategies ===== */
  const pOn = t >= tTu - 0.05 && t < tR0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    P4.forEach(([ic], i) => {
      const el = $('#pst' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.1 + i * 0.07, tPout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelector('.s1').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.s2').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
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
      if (k) { M.vis($('#pdg' + k), t, tin + 0.3, tout, { dy: 12, ...oo }); pn.querySelectorAll('.dl').forEach((d, j) => { M.draw(d, t, tin + 0.6 + j * 0.15, 0.5, M.o3); attr(d, 'stroke', t > tin + 1.2 ? C.gold : C.dim); }); }
    }
  }

  /* ===== R: Laddoo Lab's choice ===== */
  const rOn = t >= tR0 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    const rT = $('#rT'); M.vis(rT, t, tR0 + 0.1, tRout, { dy: 36, ...o }); grow(rT, $('#rTOut'), t, tR2);
    M.rise($('#rTh'), t, tR1 - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#rTp'), t, wt('R1', 'Concentrated') + 0.2, 1e9, { dy: 14 });
    RQ.forEach((_, i) => { const r = $('#rq' + i); M.vis(r, t, tR1 + 0.5 + i * 0.1, 1e9, { dy: 12 }); r.querySelector('.rt').style.color = mix(C.dim, C.ink, M.io((t - tRq[i]) / 0.25)); M.vis(r.querySelector('.ck'), t, tRq[i] + 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }); });
    M.vis($('#rL'), t, tR2 + 0.12, tRout, { dx: 60, dy: 0, ...o });
    M.rise($('#rLh'), t, tR2 + 0.3, { st: 0.07, sp: M.HEAVY });
    RL.forEach((_, i) => M.vis($('#rl' + i), t, tRl[i] - 0.05, 1e9, { dx: 24, dy: 0 }));
    M.vis($('#kitP'), t, tKit - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    for (let i = 1; i < 3; i++) $('#rl' + i).style.background = mix(C.paper, C.gold3, M.io((t - tDiffR) / 0.3));
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
    M.vis($('#xr0'), t, wt('X4', 'Arjun') + 0.1, 1e9, { dx: 24, dy: 0 });
    M.vis($('#chart'), t, tSum - 0.1, 1e9, { dy: 12 });
    M.draw($('#lnT'), t, tSum, 1.2, M.o3); M.vis($('#lbT'), t, tSum + 1.0, 1e9, { dy: 0, fade: 0.2 });
    { const u = M.clamp((t - tDrop + 0.1) / 0.25); $('#dipR').style.opacity = u.toFixed(3); $('#dipT').style.opacity = u.toFixed(3); }
    M.draw($('#lnO'), t, tOffX - 0.05, 1.0, M.o3); M.vis($('#lbO'), t, tOffX + 0.8, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#fx0'), t, tParX - 0.1, 1e9, { dy: 16 });
    $('#fx0').style.background = mix(C.paper, C.gold3, M.io((t - wt('X7', 'children') - 0.1) / 0.3));
    M.vis($('#lesson'), t, tX8 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX8 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Which') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Which') + 0.3 + i * 0.08, 1e9, { dy: 40 });
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
