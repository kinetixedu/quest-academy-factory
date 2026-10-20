// MBA - Marketing Management, Ep 07: Marketing Information Systems (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', goldD: '#D9C08C' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  radar: ['M19.07 4.93A10 10 0 0 0 6.99 3.34', 'M4 6h.01', 'M2.29 9.62A10 10 0 1 0 21.31 8.35', 'M16.24 7.76A6 6 0 1 0 8.23 16.67', 'M12 18h.01', 'M17.99 11.66A6 6 0 0 1 15.77 16.67', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'm13.41 10.59 5.66-5.66'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  sheet: ['M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z', 'M3 9h18', 'M3 15h18', 'M9 3v18'],
  undo: ['M9 14 4 9l5-5', 'M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11'],
  share: ['M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'm8.59 13.51 6.83 3.98', 'm15.41 6.51-6.82 3.98'],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
  torch: ['M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z', 'M6 6h12', 'M12 12v.01'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFri = wt('H1', 'Friday'), tNoon = wt('H1', 'noon'), tMon = wt('H2', 'Monday'), tUns = wt('H2', 'unsold');
const tC2 = T0('C2'), tAnsw = wt('C2', 'answers'), tScat = wt('C2', 'scattered');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tL4 = T0('L4'), tZoya = wt('L1', 'Zoya'), tNei = wt('L1', 'neighbours');
const tNob = wt('L4', 'nobody');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M1') - 0.32;
const tNerve = wt('D2', 'idea'), tCalled = wt('D2', 'called'), tSixty = wt('D2', 'sixty');
const tHl = [wt('D3', 'people'), wt('D3', 'gather'), wt('D3', 'needed'), wt('D3', 'accurate'), wt('D3', 'decision')];
const tNv = [wt('D3', 'gather'), wt('D3', 'analyze'), wt('D3', 'decision')];
const tSw = [wt('D4', 'facts'), wt('D4', 'person'), wt('D4', 'time')];
// M: the system at work
const tM1 = T0('M1'), tM5 = T0('M5'), tM8 = T0('M8');
const tSt = [wt('M2', 'gather'), wt('M3', 'sort'), wt('M4', 'analyze'), wt('M6', 'share'), wt('M7', 'decide')];
const tChart = wt('M4', 'chart'), tFriM = wt('M5', 'Fridays'), tMonM = wt('M5', 'Mondays'), tMore = wt('M7', 'more'), tLess = wt('M7', 'less'), tFour = wt('M8', 'four');
const tMout = T0('T1') - 0.32;
// statement
const tT = T0('T1'), tSt2 = wt('T1', 'Information'), tP0 = T0('P0'), tTu = tP0 - 0.32;
// P: four parts
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('R1') - 0.32;
const PCH = [[wt('P1', 'orders'), wt('P1', 'sales'), wt('P1', 'stock')], [wt('P2', 'customers'), wt('P2', 'rivals'), wt('P2', 'market')], [wt('P3', 'special'), wt('P3', 'question')], [wt('P4', 'tools'), wt('P4', 'models')]];
// R: radar vs torch
const tR1 = T0('R1'), tR2 = T0('R2'), tR3 = T0('R3'), tRout = T0('K0') - 0.32;
const tSig = [wt('R2', 'picks'), wt('R2', 'small'), wt('R2', 'every')], tRadar = wt('R2', 'radar');
const tSwi = wt('R3', 'switched'), tTorch = wt('R3', 'torch'), tAnsR = wt('R3', 'answer'), tStops = wt('R3', 'stops');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bakery'), wt('K2', 'airline'), wt('K3', 'phone'), wt('K4', 'food')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'guesses'), wt('X2', 'waste')], tXh = [wt('X3', 'confuses'), wt('X3', 'old')];
const tDevX = wt('X4', 'Dev'), tZoyaX = wt('X4', 'Zoya'), tPriv = wt('X5', 'private'), tTeam = wt('X5', 'team'), tAct = wt('X6', 'Digital');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'time')], [wt('S3', 'internal'), wt('S3', 'intelligence'), wt('S3', 'research'), wt('S3', 'decision')], [wt('S4', 'always'), wt('S4', 'one')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A: the week + scattered answers
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const WANT = [15, 19, 18, 26, 40, 32], MADE0 = 24, MADE1 = [16, 20, 20, 26, 40, 32];
$('#days').innerHTML = DAYS.map((d, i) => `<div class="cupt" id="dy${i}" style="left:${36 + i * 144}px"><div class="cn">${d}</div><div class="ci"></div><div class="ct">24 made</div></div>`).join('');
$('#wkBackI').innerHTML = M.icon('undo', 20, C.red, 2.6);
const METH = [['arjun', "Arjun's notebook"], ['dev', "Dev's phone"], ['nani', "Nani's memory"]];
$('#meth').innerHTML = METH.map(([f, m], i) => `<div class="stp" id="mt${i}" style="top:76px"><span class="pf" style="${FACE(f)}"></span><span>${m}</span></div>`).join('');
// L: who knows what
const WHO = [['arjun', 'Arjun', 'Every sale, in a notebook', 'book'], ['dev', 'Dev', 'Customer messages, on his phone', 'phone'], ['nani', 'Nani', 'Who liked what, in her memory', 'heart']];
$('#wRows').innerHTML = WHO.map(([f, n, d, ic], i) => `<div class="wr" id="wr${i}" style="top:${88 + i * 128}px"><div class="bg"></div><div class="fa" style="${FACE(f)}"></div><div class="wn">${n}</div><div class="wd">${d}</div><div class="wic">${M.icon(ic, 28, C.gold, 2.2)}</div></div>`).join('');
$('#gapI').innerHTML = M.icon('x', 22, C.red, 2.6);
wrap($('#ill'), 'illOut', 784, 580);
// D: nerve center + simple words
const NV = [['radar', 'SIGNALS IN', 'Facts arrive'], ['gear', 'THE CENTER', 'Make sense'], ['zap', 'ACTION', 'Decide']];
$('#nvRow').innerHTML = NV.map(([ic, n, tx], i) => `<div class="nv" id="nv${i}" style="left:${36 + i * 256}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${tx}</div></div>` + (i < 2 ? `<svg class="nva" id="nva${i}" width="40" height="28" style="left:${244 + i * 256}px"><path d="M4 14 H32 M24 6 L33 14 L24 22" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
const SWT = [['target', 'FACT', 'The right facts'], ['user', 'WHO', 'The right person'], ['clock', 'WHEN', 'In time to decide']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="sws" id="sw${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the pipeline. Plan coords are inside a 688 x 250 svg. */
const STN = ['GATHER', 'SORT', 'ANALYZE', 'SHARE', 'DECIDE'], STI = ['sheet', 'filter', 'chart', 'share', 'check'];
const SX = i => 28 + i * 130, SC = i => 84 + i * 130;
const box = (id, x, y, ic, label, w = 112) => `<g id="${id}" transform="translate(${x} ${y})"><rect width="${w}" height="84" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/><g class="bi" transform="translate(${w / 2 - 14} 12)">${M.icon(ic, 28, C.ink, 2.2)}</g><text class="bt" x="${w / 2}" y="68" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${label}</text></g>`;
const ND = 12, KIND = i => (i < 5 ? 0 : i < 9 ? 1 : 2), KCOL = [C.ink2, C.gold, C.ld];
const rnd = M.rng(7), F0 = Array.from({ length: ND }, () => [24 + rnd() * 640, 134 + rnd() * 96]);
const SHUF = [3, 9, 0, 6, 11, 1, 7, 4, 10, 2, 8, 5];
const KI = i => (i < 5 ? i : i < 9 ? i - 5 : i - 9);
const COLS = [[0, 1], [2, 3, 4], [5, 6, 7], [8, 9, 10, 11]]; // chart columns, heights 2 3 3 4
const FORM = [
  i => F0[i],
  i => { const k = SHUF.indexOf(i); return [SC(0) - 27 + (k % 4) * 18, 156 + Math.floor(k / 4) * 18]; },
  i => [SC(1) - 36 + KI(i) * 18, 156 + KIND(i) * 20],
  i => { const c = COLS.findIndex(a => a.includes(i)), r = COLS[c].indexOf(i); return [SC(2) - 27 + c * 18, 200 - r * 18]; },
  i => { const c = COLS.findIndex(a => a.includes(i)), r = COLS[c].indexOf(i); return [SC(3) - 27 + c * 18, 200 - r * 18]; },
  () => [SC(4), 170],
];
$('#mLIn').innerHTML = `<div class="mav" style="${FACE('zoya')}"></div><div class="lbl mlb">THE SYSTEM AT WORK · 5 STEPS</div><div class="serif mrd" id="rdL">0 / 5</div>
    <svg class="mplan" id="planL" width="688" height="250"><defs><clipPath id="avc"><circle cx="0" cy="0" r="14"/></clipPath></defs>
      <rect width="688" height="250" rx="24" fill="#F5F1E8"/>
      ${STN.map((s, i) => box('sb' + i, SX(i), 22, STI[i], s)).join('')}
      ${[0, 1, 2, 3].map(i => `<path id="sa${i}" d="M${SX(i) + 116} 64 H${SX(i + 1) - 4}" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round"/>`).join('')}
      ${Array.from({ length: ND }, (_, i) => `<circle id="dt${i}" r="7" cx="0" cy="0" fill="${KCOL[KIND(i)]}"/>`).join('')}
      ${['nani', 'arjun', 'dev'].map((f, k) => `<g id="tm${k}" transform="translate(${SC(3) - 30 + k * 30} 226)"><circle r="16" fill="#14213D"/><image href="${IMG}ll-${f}-face.jpg" x="-14" y="-14" width="28" height="28" clip-path="url(#avc)"/></g>`).join('')}
      <g id="okG" transform="translate(${SC(4)} 176)"><circle r="30" fill="#B8862F"/><g transform="translate(-14 -14)">${M.icon('check', 28, '#fff', 3)}</g></g>
    </svg>
    <div class="mbar" id="barL">${[0, 1, 2, 3, 4].map(k => `<i id="seg${k}" style="left:${(k * 139.2).toFixed(1)}px;width:131px"></i>`).join('')}</div>
    <div class="mtk" style="left:48px">GATHER</div><div class="mtk" style="right:48px">DECIDE</div>
    <div class="mst" id="msL"><span class="msi"></span><span class="mtx"></span><span class="tm"></span></div>`;
wrap($('#mL'), 'mLOut', 784, 580);
// the week chart (svg 688 x 390, baseline y 330, 6.5 px per pack)
const BASE = 330, PX = 6.5, SLOT = 688 / 6, BW = 64;
$('#wch').innerHTML = DAYS.map((d, i) => { const x = SLOT * i + (SLOT - BW) / 2; return `<g id="wb${i}">
    <rect id="wbW${i}" x="${x + 1.5}" width="${BW - 3}" rx="8" fill="none" stroke="#B5482F" stroke-width="3" stroke-dasharray="7 6"/>
    <rect id="wbU${i}" x="${x}" width="${BW}" rx="8" fill="#E7B9AB"/>
    <rect id="wbS${i}" x="${x}" width="${BW}" rx="8" fill="#B8862F"/>
    <text id="wbV${i}" x="${x + BW / 2}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="24" fill="#14213D"></text>
    <text x="${x + BW / 2}" y="${BASE + 30}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.5" fill="#8A8274">${d}</text></g>`; }).join('') +
  `<path d="M0 ${BASE + 1} H688" stroke="#E2DACB" stroke-width="3"/>`;

// P: four parts
const P4 = [['book', 'Internal', 'records', 'arjun', "Arjun's sales book: what sold, where and when", ['Orders', 'Sales', 'Stock']],
  ['radar', 'Marketing', 'intelligence', 'dev', 'Dev spots a new snack stall near the college', ['Customers', 'Rivals', 'Market']],
  ['search', 'Marketing', 'research', 'zoya', 'Zoya plans a survey at the school gate', ['One question', 'One study']],
  ['gear', 'Decision', 'support', 'nani', 'A simple sheet tells Nani how many to make', ['Charts', 'Forecasts']]];
$('#p4').innerHTML = P4.map(([ic, a, b], i) => `<div class="st4" id="pst${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2">${b}</div></div>`).join('');
$('#pePans').innerHTML = [[null, 'KOTLER · FOUR PARTS', 'One system, four sources of facts', []]].concat(P4.map((p, i) => [p[3], `PART 0${i + 1} · AT LADDOO LAB`, p[4], p[5]])).map(([f, l, x, ch], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('layers', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div>${ch.map((c, j) => `<div class="fp" id="pc${k}${j}" style="top:96px">${c}</div>`).join('')}</div>`).join('');

// R: radar + torch
const RC = 150;
$('#radar').innerHTML = `<circle cx="${RC}" cy="${RC}" r="146" fill="#F5F1E8"/>` + [140, 95, 50].map(r => `<circle cx="${RC}" cy="${RC}" r="${r}" fill="none" stroke="#E2DACB" stroke-width="3"/>`).join('') +
  `<path d="M${RC - 140} ${RC} H${RC + 140} M${RC} ${RC - 140} V${RC + 140}" stroke="#E2DACB" stroke-width="3"/>` +
  `<g id="swp"><path d="M${RC} ${RC} L${RC + 140} ${RC} A140 140 0 0 0 ${(RC + 140 * Math.cos(-0.7)).toFixed(1)} ${(RC + 140 * Math.sin(-0.7)).toFixed(1)} Z" fill="#B8862F" fill-opacity=".22"/><path d="M${RC} ${RC} L${RC + 140} ${RC}" stroke="#B8862F" stroke-width="4" stroke-linecap="round"/></g>` +
  [[-40, 104], [-160, 118], [-265, 66]].map(([a, r], i) => `<g transform="translate(${(RC + r * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(RC + r * Math.sin(a * Math.PI / 180)).toFixed(1)})"><g id="bp${i}"><circle r="11" fill="#14213D"/><circle r="4" fill="#E9D9B5"/></g></g>`).join('') +
  `<circle cx="${RC}" cy="${RC}" r="9" fill="#14213D"/>`;
const SG = [['store', 'A new snack stall'], ['message', 'A customer message'], ['tag', 'A rival price change']];
$('#sgs').innerHTML = SG.map(([ic, t], i) => `<div class="sg" id="sg${i}" style="top:${196 + i * 76}px">${M.icon(ic, 24, C.gold, 2.4)}<span>${t}</span></div>`).join('');
$('#rdPI').innerHTML = M.icon('radar', 24, C.gold2, 2.2);
$('#torch').innerHTML = `<polygon id="beamT" points="150,106 150,144 332,214 332,36" fill="#F3EAD6"/>
  <g id="trB"><rect x="20" y="104" width="96" height="42" rx="12" fill="#14213D"/><path d="M116 96 L150 86 L150 164 L116 154 Z" fill="#24345A"/><rect x="152" y="86" width="8" height="78" rx="4" fill="#B8862F" id="lens"/><circle cx="62" cy="125" r="8" fill="#B8862F"/></g>`;
const TL = [['zap', 'Switch on'], ['check', 'Get the answer'], ['ban', 'Stop']];
$('#tls').innerHTML = TL.map(([ic, t], i) => `<div class="tl" id="tl${i}"><span class="tli"></span><span>${t}</span></div>` + (i < 2 ? `<svg class="tla" id="tla${i}" width="44" height="30"><path d="M4 15 H34 M26 7 L35 15 L26 23" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');

// K: at work today
const KA = [
  ['book', 'Internal records', 'What happens inside', "Arjun's book shows what sold, and where", 'store', 'A bakery sees which bread sells out first'],
  ['radar', 'Intelligence', 'Everyday news from outside', 'Dev spots a new snack stall nearby', 'plane', 'An airline checks rival fares every day'],
  ['search', 'Research', 'One study, one question', 'Zoya plans to ask parents at a school gate', 'phone', 'A phone maker tests two designs with users'],
  ['gear', 'Decision support', 'Turn facts into choices', 'A simple sheet tells Nani how many to make', 'bike', 'A delivery app plans riders for a rainy night'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['INFORMATION TODAY', 'Four parts', 'Every big company runs them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO AN AIRLINE</div><div class="pe"><i>${M.icon('layers', 34, C.gold, 2.2)}</i><span>Same parts, any size of business</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['target', 'Fewer guesses'], ['check', 'Less waste']];
const XH = [['layers', 'Too much data'], ['clock', 'Old data misleads']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#sheet').innerHTML = `<rect x="10" y="10" width="220" height="300" rx="18" fill="#E2DACB"/><rect x="0" y="0" width="220" height="300" rx="18" fill="#FFFFFF" stroke="#14213D" stroke-width="4"/>
  <rect x="0" y="0" width="220" height="56" rx="18" fill="#14213D"/><rect x="0" y="38" width="220" height="18" fill="#14213D"/>
  <text x="110" y="36" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="18" fill="#F5E7C6" letter-spacing="2">CUSTOMERS</text>` +
  [0, 1, 2, 3, 4].map(i => `<g id="sr${i}"><circle cx="34" cy="${92 + i * 46}" r="12" fill="#E9D9B5"/><rect x="56" y="${84 + i * 46}" width="${[70, 56, 80, 62, 74][i]}" height="8" rx="4" fill="#3A4560"/><rect x="56" y="${98 + i * 46}" width="132" height="8" rx="4" fill="#B9B1A3"/></g>`).join('') +
  `<g id="lockG" transform="translate(110 170)"><circle r="52" fill="#FFFFFF" stroke="#B8862F" stroke-width="5"/><g transform="translate(-24 -26)">${M.icon('lock', 48, C.ink, 2.4)}</g></g>`;
$('#xr2f').innerHTML = M.icon('lock', 30, C.gold2, 2.4);
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('scale', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('lock', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Internal records', 'Intelligence', 'Research', 'Decision support'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('radar', 44, C.gold2, 2.2);
// recap
const ROWS = [['target', 'The right facts, to the right people', ['In time']], ['layers', 'Four parts', ['Records', 'Intelligence', 'Research', 'Decision support']], ['radar', 'Intelligence vs research', ['Always on', 'One question']]];
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
const boxHi = (id, state) => { // 0 idle, 1 active, 2 done
  const g = $('#' + id), r = g.querySelector('rect');
  attr(r, 'stroke', state ? C.gold : C.line); attr(r, 'stroke-width', state ? 4 : 2); attr(r, 'fill', state === 2 ? C.gold3 : '#FFFFFF');
};
// the pipeline run
const PST = [['Gather into one sheet', 'sheet'], ['Sort: day, place, buyer', 'filter'], ['Analyze: find the pattern', 'chart'], ['Share with the team', 'share'], ['Decide: plan each day', 'check']];
const runP = t => {
  let k = 0; for (let i = 0; i < 5; i++) if (t >= tSt[i] - 0.05) k = i + 1;
  // dots: blend from formation k-1 to k with a spring
  for (let i = 0; i < ND; i++) {
    let [x, y] = FORM[0](i);
    for (let s = 1; s <= 5; s++) { const p = M.spring(t - tSt[s - 1] - 0.15 - (s === 1 ? (i % 6) * 0.04 : 0), M.SOFT); if (p <= 0) break; const [x2, y2] = FORM[s](i); x = M.lerp(x, x2, p); y = M.lerp(y, y2, p); }
    const d = $('#dt' + i); attr(d, 'cx', x.toFixed(1)); attr(d, 'cy', y.toFixed(1));
    const g = M.io((t - tSt[2] - 0.2) / 0.3);
    attr(d, 'fill', mix(KCOL[KIND(i)], C.gold, g));
    const hide = M.io((t - tSt[4] - 0.55) / 0.2); attr(d, 'r', (7 * (1 - hide)).toFixed(2));
  }
  for (let s = 0; s < 5; s++) boxHi('sb' + s, k === s + 1 ? 1 : k > s + 1 ? 2 : 0);
  for (let s = 0; s < 4; s++) attr($('#sa' + s), 'stroke', k > s + 1 ? C.gold : C.dim);
  for (let s = 0; s < 3; s++) { const g = $('#tm' + s); const u = M.clamp((t - tSt[3] - 0.3 - s * 0.12) / 0.12); g.style.opacity = u.toFixed(3); M.hide(g, u <= 0); }
  { const u = M.clamp((t - tSt[4] - 0.6) / 0.12); $('#okG').style.opacity = u.toFixed(3); M.hide($('#okG'), u <= 0); }
  for (let s = 0; s < 5; s++) { const sg = $('#seg' + s), on = M.io((t - tSt[s]) / 0.3); sg.style.background = mix(C.paper2, k > s + 1 ? C.goldD : C.gold, on); }
  M.setT($('#rdL'), `${k} / 5`); $('#rdL').style.color = k === 5 ? C.gold : C.ink;
  if (t >= tFour - 0.1) pill('L', 'check', 'Plan each day', '4 unsold', 0, 1);
  else if (k) pill('L', PST[k - 1][1], `0${k}  ${PST[k - 1][0]}`, '', 0, 0);
  else pill('L', 'x', 'Facts in three places', '', 1, 0);
};
// the week chart
const madeAt = (i, t) => { const tm = i >= 3 ? tMore : tLess; return M.lerp(MADE0, MADE1[i], M.spring(t - tm - 0.1, M.HEAVY)); };
const runW = t => {
  let un = 0;
  for (let i = 0; i < 6; i++) {
    const g = M.spring(t - tM1 - 0.5 - i * 0.07, M.SOFT), mk = madeAt(i, t) * g, w = WANT[i] * g;
    const sold = Math.min(mk, w), uns = mk - sold; un += Math.max(0, MADE0 * 0 + uns);
    const ys = BASE - sold * PX, ym = BASE - mk * PX, yw = BASE - Math.max(w, mk) * PX;
    attr($('#wbS' + i), 'y', ys.toFixed(1)); attr($('#wbS' + i), 'height', Math.max(0, sold * PX).toFixed(1));
    attr($('#wbU' + i), 'y', (ym).toFixed(1)); attr($('#wbU' + i), 'height', Math.max(0, uns * PX + (uns > 0.05 ? 8 : 0)).toFixed(1));
    const wv = M.clamp((t - tChart) / 0.3), wh = Math.max(0, (w - mk) * PX);
    attr($('#wbW' + i), 'y', (yw + 1.5).toFixed(1)); attr($('#wbW' + i), 'height', Math.max(0, wh - 1.5).toFixed(1));
    $('#wbW' + i).style.opacity = (wh > 3 ? wv : 0).toFixed(3);
    const tv = $('#wbV' + i), vOn = M.clamp((t - tChart - 0.2 - i * 0.05) / 0.2);
    attr(tv, 'y', (Math.min(yw, ym) - 14).toFixed(1)); M.setT(tv, String(WANT[i])); tv.style.opacity = vOn.toFixed(3);
    const em = i === 4 ? M.io((t - tFriM) / 0.25) : i === 0 ? M.io((t - tMonM) / 0.25) : 0;
    attr(tv, 'fill', mix(C.ink, i === 4 ? C.gold : C.red, em)); attr(tv, 'font-size', (24 + 8 * em).toFixed(1));
  }
  const n = Math.round(un);
  M.setT($('#wUn'), `${n} unsold`); $('#wUn').style.color = t >= tLess + 0.4 ? C.gold : C.red;
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
  const gp = $('#gapP'); gp.style.left = (392 - gp.offsetWidth / 2) + 'px';
  for (let i = 0; i < 5; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(30 * 688 / q.offsetWidth) + 'px'; }
  for (const id of ['#kot1', '#kot2']) { const k = $(id), fs0 = parseFloat(getComputedStyle(k).fontSize); if (k.offsetWidth > 532) k.style.fontSize = Math.floor(fs0 * 532 / k.offsetWidth) + 'px'; }
  x = 48; for (let i = 0; i < 3; i++) { const l = $('#lg' + i); l.style.left = x + 'px'; x += l.offsetWidth + 16; }
  document.querySelectorAll('.st4 .s1, .st4 .s2').forEach(el => { if (el.offsetWidth > 304) el.style.fontSize = Math.floor(34 * 304 / el.offsetWidth) + 'px'; });
  [['#bkl0', 188], ['#bkl1', 800], ['#bkl2', 1412]].forEach(([id, c]) => { const b = $(id); b.style.left = (160 + c - b.offsetWidth / 2) + 'px'; });
  for (let k = 1; k < 5; k++) { const ch = P4[k - 1][5]; let xr = 1552; for (let j = ch.length - 1; j >= 0; j--) { const p = $('#pc' + k + j); xr -= p.offsetWidth; p.style.left = xr + 'px'; xr -= 16; } }
  x = 48; for (let i = 0; i < 3; i++) { const p = $('#tl' + i); p.style.left = x + 'px'; x += p.offsetWidth + 12; if (i < 2) { $('#tla' + i).style.left = x + 'px'; x += 56; } }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  { const k = $('#fact .kt'); if (k.offsetWidth > 560) k.style.fontSize = Math.floor(28 * 560 / k.offsetWidth) + 'px'; }
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

  /* ===== A: Friday sells out, Monday comes back ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    const tD = [tMon, tUns, tUns + 0.15, tNoon, tFri, tNoon + 0.15];
    DAYS.forEach((_, i) => {
      const el = $('#dy' + i); M.vis(el, t, tMorph + 0.5 + i * 0.06, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tD[i] + 0.05) / 0.25), out = WANT[i] > MADE0, strong = i === 4 || i === 0;
      const bg = out ? (strong ? C.gold : C.gold3) : (strong ? C.red : C.redBg);
      el.style.background = mix(C.paper, bg, on);
      const fg = strong ? '#fff' : (out ? C.ink : C.red);
      el.querySelector('.ct').style.color = mix(C.ink, fg, on); el.querySelector('.cn').style.color = mix(C.muted, strong ? (out ? C.gold3 : '#F6E3DC') : C.muted, on);
      M.setT(el.querySelector('.ct'), on > 0.5 ? (out ? 'Sold out' : `${MADE0 - WANT[i]} back`) : '24 made');
      setIco(el.querySelector('.ci'), on > 0.5 ? (out ? 'check' : 'undo') : 'laddoo', on > 0.5 ? (strong ? '#fff' : (out ? C.gold : C.red)) : C.dim, 40, 2.2);
    });
    M.vis($('#wkBack'), t, tMon + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.setT($('#wkBackN'), String(Math.round(9 * M.io((t - tMon) / 0.3) + 11 * M.io((t - tUns) / 0.4))));
    M.vis($('#ask'), t, tC2 - 0.1, tAout, { dy: 36, ...o });
    const sc = M.spring(t - tScat, M.SOFT), SY = [-10, 8, -4], SR = [-3, 2.5, -2];
    for (let i = 0; i < 3; i++) {
      const el = $('#mt' + i), p = M.vis(el, t, tAnsw - 0.05 + i * 0.22, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      if (p >= 1 && t >= tScat) el.style.transform = sc >= 1 ? `translateY(${SY[i]}px) rotate(${SR[i]}deg)` : `translateY(${(SY[i] * sc).toFixed(2)}px) rotate(${(SR[i] * sc).toFixed(3)}deg)`;
    }
    M.rise($('#askT'), t, tScat - 0.05, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: who knows what ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgZ'), t, tZoya - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgN'), t, tNei - 0.05, tL2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#who'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    const tW = [wt('L2', 'Arjun'), wt('L3', 'Dev'), wt('L4', 'Nani')];
    WHO.forEach((_, i) => {
      const el = $('#wr' + i); M.vis(el, t, tW[i] - 0.05 + (i === 0 ? 0.25 : 0), 1e9, { dx: 24, dy: 0 });
      const on = M.io((t - tW[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tW[i + 1]) / 0.25) : M.io((t - tNob) / 0.25)));
      el.querySelector('.fa').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, on);
      el.querySelector('.bg').style.background = mix(C.paper, C.gold3, on);
    });
    M.vis($('#gapP'), t, tNob - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: what is an MIS ===== */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.rise($('#dq2'), t, wt('D1', 'marketing') - 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tNerve);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, wt('D2', 'Philip') - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, tSixty - 0.05, 1e9, { dy: 10 });
    M.rise($('#kot2'), t, tCalled - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kqHr'), t, tNerve + 0.5, 1e9, { dy: 0 });
    for (let i = 0; i < 5; i++) { const q = $('#ql' + i); M.vis(q, t, tNerve + 0.6 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - tHl[i] + 0.1) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#vc'), t, tNerve + 0.12, tDout, { dx: 60, dy: 0, ...o });
    NV.forEach((_, i) => {
      const el = $('#nv' + i); M.vis(el, t, tNerve + 0.35 + i * 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      if (i < 2) M.vis($('#nva' + i), t, tNerve + 0.5 + i * 0.25, 1e9, { dx: -10, dy: 0, fade: 0.15 });
      const on = M.io((t - tNv[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tNv[i + 1]) / 0.25) : M.io((t - tD4) / 0.3)));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), NV[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis($('#sw'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    SWT.forEach((_, i) => {
      const el = $('#sw' + i); M.vis(el, t, tSw[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), SWT[i][0], on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
  }

  /* ===== M: the system at work ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#mL'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mW'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    const root = $('#mLIn'), base = tM1 + 0.3;
    M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
    M.vis($('#rdL'), t, base + 0.12, 1e9, { dy: 10 });
    M.vis($('#planL'), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#barL'), t, base + 0.35, 1e9, { dy: 10 });
    root.querySelectorAll('.mtk').forEach(el => M.vis(el, t, base + 0.4, 1e9, { dy: 8 }));
    M.vis($('#msL'), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    STN.forEach((_, i) => { $('#sb' + i).style.opacity = M.clamp((t - tM1 - 0.55 - i * 0.07) / 0.1); });
    for (let i = 0; i < 4; i++) $('#sa' + i).style.opacity = M.clamp((t - tM1 - 0.8 - i * 0.07) / 0.1);
    for (let i = 0; i < ND; i++) $('#dt' + i).style.opacity = M.clamp((t - tM1 - 0.9 - i * 0.03) / 0.12);
    runP(t);
    M.vis($('#wUn'), t, tM1 + 0.5, 1e9, { dy: 10 });
    M.vis($('#wch'), t, tM1 + 0.4, 1e9, { dy: 0, fade: 0.1 });
    runW(t);
    M.vis($('#lg0'), t, tM1 + 0.9, 1e9, { dy: 10 }); M.vis($('#lg1'), t, tM1 + 1.0, 1e9, { dy: 10 }); M.vis($('#lg2'), t, tChart, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== P: four parts ===== */
  const pOn = t >= tTu - 0.05 && t < tR1 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    P4.forEach(([ic], i) => {
      const el = $('#pst' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(el, t, tP0 + 0.1 + i * 0.07, tPout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      const tc = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.s1').style.color = tc; el.querySelector('.s2').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.sn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.si').style.background = t < ta ? C.paper : mix(C.navy2, C.paper, off);
      setIco(el.querySelector('.si'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 34, 2.2);
    });
    M.draw($('#bk0'), t, tP[0] + 0.4, 0.5, M.o3); M.draw($('#bk1'), t, tP[1] + 0.4, 0.6, M.o3); M.draw($('#bk2'), t, tP[3] + 0.4, 0.5, M.o3);
    M.vis($('#bkl0'), t, tP[0] + 0.6, tPout, { dy: 8, ...o }); M.vis($('#bkl1'), t, tP[1] + 0.7, tPout, { dy: 8, ...o }); M.vis($('#bkl2'), t, tP[3] + 0.6, tPout, { dy: 8, ...o });
    M.hide($('#brk'), t > tPout + 0.3);
    M.vis($('#pe'), t, tP0 + 0.35, tPout, { dy: 36, ...o });
    for (let k = 0; k < 5; k++) {
      const tin = k ? tP[k - 1] : tP0 + 0.6, tout = k < 4 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pex' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.lbl'), t, tin, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pa, .pi'), t, tin + 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
      M.rise(pn.querySelector('.pt2'), t, tin + 0.12, { st: 0.04, out: tout, outDur: 0.2 });
      if (k) PCH[k - 1].forEach((tc, j) => {
        const el = $('#pc' + k + j); M.vis(el, t, tc - 0.05, tout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08, ...oo });
        const g = M.io((t - tc) / 0.2); el.style.background = mix(C.paper, C.gold3, g);
      });
    }
  }

  /* ===== R: radar vs torch ===== */
  const rOn = t >= tR1 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#rdC'), t, tR1 + 0.1, tRout, { dx: -60, dy: 0, ...o });
    M.vis($('#trC'), t, tR1 + 0.25, tRout, { dx: 60, dy: 0, ...o });
    M.rise($('#rdT'), t, wt('R1', 'intelligence') - 0.05, { st: 0.07, sp: M.HEAVY });
    M.rise($('#trT'), t, wt('R1', 'research') - 0.05, { st: 0.07, sp: M.HEAVY });
    M.vis($('#radar'), t, tR1 + 0.35, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    const ang = -((Math.max(0, t - tR1 - 0.4)) * 110) % 360;
    attr($('#swp'), 'transform', `rotate(${ang.toFixed(2)} ${RC} ${RC})`);
    for (let i = 0; i < 3; i++) {
      M.vis($('#bp' + i), t, tSig[i] - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      const el = $('#sg' + i); M.vis(el, t, tSig[i], 1e9, { dx: 24, dy: 0 });
      const g = M.io((t - tSig[i]) / 0.2) * (1 - M.io((t - tSig[i] - 1.2) / 0.4)); el.style.background = mix(C.paper, C.gold3, g);
    }
    M.vis($('#rdP'), t, tRadar - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#torch'), t, tR1 + 0.5, 1e9, { dy: 16, sp: M.SOFT });
    M.vis($('#tq'), t, tR1 + 0.6, 1e9, { dy: 16 });
    const bOn = M.io((t - tSwi) / 0.3) * (1 - M.io((t - tStops - 0.1) / 0.3));
    $('#beamT').style.opacity = bOn.toFixed(3); M.hide($('#beamT'), bOn <= 0.001);
    attr($('#lens'), 'fill', mix(C.dim, C.gold, bOn));
    $('#tq').style.borderColor = mix(C.line, C.gold, bOn); $('#tq').style.background = mix('#FFFFFF', C.gold3, M.io((t - tAnsR) / 0.25) * (1 - M.io((t - tStops) / 0.3)));
    const tTl = [tSwi, tAnsR, tStops];
    TL.forEach(([ic], i) => {
      const el = $('#tl' + i); M.vis(el, t, tR1 + 0.8 + i * 0.08, 1e9, { dy: 12 });
      if (i < 2) M.vis($('#tla' + i), t, tR1 + 0.85 + i * 0.08, 1e9, { dy: 0, fade: 0.15 });
      const on = M.io((t - tTl[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tTl[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, i === 1 ? C.gold : C.ink, on); el.style.color = on > 0.5 ? '#fff' : C.ink;
      setIco(el.querySelector('.tli'), ic, on > 0.5 ? '#fff' : (t >= tTl[i] ? C.gold : C.dim), 22, 2.4);
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
    M.vis($('#sheet'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    for (let i = 0; i < 5; i++) { const g = $('#sr' + i); g.style.opacity = (1 - 0.65 * M.io((t - tPriv) / 0.3)).toFixed(3); }
    { const u = M.clamp((t - tPriv - 0.1) / 0.12); $('#lockG').style.opacity = u.toFixed(3); M.hide($('#lockG'), u <= 0); }
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tZoyaX, tTeam][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tZoyaX ? C.redBg : C.paper; $('#bb0').style.color = t > tZoyaX ? C.red : C.ink;
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
