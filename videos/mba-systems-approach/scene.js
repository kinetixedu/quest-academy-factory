// MBA - Principles of Management, Ep 12: Systems Approach
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  heartPulse: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z', 'M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  chat: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  brain: ['M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z', 'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z', 'M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4', 'M17.599 6.5a3 3 0 0 0 .399-1.375', 'M6.003 5.125A3 3 0 0 0 6.401 6.5', 'M3.477 10.896a4 4 0 0 1 .585-.396', 'M19.938 10.5a4 4 0 0 1 .585.396', 'M6 18a4 4 0 0 1-1.967-.516', 'M19.967 17.484A4 4 0 0 1 18 18'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 17h10', 'M9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z', 'M19 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tFail = [wt('H2', 'breaks'), wt('C1', 'stops'), wt('C2', 'cold'), wt('C2', 'cups')], tSuffer = wt('C3', 'suffers');
const tT = T0('T1'), tSt2 = wt('T1', 'It'), tTu = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tLud = wt('D1', 'Ludwig'), tAus = wt('D1', 'Austrian'), tLiving = wt('D1', 'living'), tD2 = T0('D2');
const tOrg = [wt('D2', 'heart'), wt('D2', 'lungs'), wt('D2', 'brain')], tAlone = wt('D2', 'alone'), tD3 = T0('D3'), tGen = wt('D3', 'general'), tD4 = T0('D4'), t1966 = wt('D4', '1966'), tFamous = wt('D4', 'famous'), tDout = T0('M1') - 0.32;
// M
const tM1 = T0('M1'), tM2 = T0('M2'), tSees = wt('M2', 'sees'), tConn = wt('M2', 'connected'), tGoal = wt('M2', 'goal'), tM3 = T0('M3'), tSmaller = wt('M3', 'smaller');
const tSubW = [wt('M4', 'kitchen'), wt('M4', 'cash'), wt('M4', 'cleaning')], tLinks = wt('M4', 'links'), tMout = T0('L0') - 0.32;
// L
const tL0 = T0('L0'), tL = [1, 2, 3, 4, 5].map(i => T0('L' + i)), tLout = T0('O1') - 0.32;
const tLin = ['Milk', 'tea', 'sugar', 'time'].map(w => wt('L1', w)), tTrans = wt('L2', 'transformation'), tHot = wt('L3', 'Hot'), tPay = wt('L3', 'customers');
const tSay = wt('L4', 'say'), tSweet = wt('L4', 'sweet'), tLess = wt('L5', 'less'), tComes = wt('L5', 'comes');
// O
const tO1 = T0('O1'), tOpen = wt('O1', 'open'), tO2 = T0('O2'), tForce = [wt('O2', 'Customers'), wt('O2', 'suppliers'), wt('O2', 'government'), wt('O2', 'competitors')];
const tO3 = T0('O3'), tDoub = wt('O3', 'doubles'), tKabO = wt('O3', 'Kabir'), tExtra = wt('O3', 'extra'), tO4 = T0('O4'), tClosed = wt('O4', 'closed'), tReal = wt('O4', 'Real'), tOout = T0('Y1') - 0.32;
// Y
const tY1 = T0('Y1'), tY2 = T0('Y2'), tWhole = wt('Y2', 'whole'), tSum = wt('Y2', 'sum'), tSixty = wt('Y3', 'sixty'), tHund = wt('Y3', 'hundred'), tYout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'parts'), wt('K3', 'Apps'), wt('K4', 'Shops'), wt('K5', 'Doctors')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5');
const tXg = [wt('X2', 'big'), wt('X2', 'affects'), wt('X2', 'others')], tXh = [wt('X3', 'abstract'), wt('X3', 'connected'), wt('X3', 'do')];
const tSee = wt('X4', 'see'), tRecipe = wt('X4', 'recipe'), tXout = tX5 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Information');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'connected')], ['inputs', 'process', 'outputs', 'feedback'].map(w => wt('S3', w)), [wt('S4', 'open'), wt('S4', 'greater')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const icoG = (n, x, y, sc, col, sw) => `<g transform="translate(${x} ${y}) scale(${sc})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${M.IC[n].map(d => `<path d="${d}"/>`).join('')}</g>`;
const faceG = (n, x, y, r, ring, id) => `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y})"><clipPath id="cf${id || n + x + y}"><circle r="${r}"/></clipPath><circle class="ring" r="${r + 4}" fill="${ring}"/><image href="${IMG}${n}-face.jpg" x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" clip-path="url(#cf${id || n + x + y})"/></g>`;
const userG = (x, y, r, id) => `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y})"><circle class="ring" r="${r + 4}" fill="#14213D"/><circle r="${r}" fill="#EEE8DB"/>${icoG('user', -r * 0.55, -r * 0.55, r * 1.1 / 24, C.ink2, 2)}</g>`;
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// A: cascade
const FN = [['CASH', 'kabir', null, 'Broken'], ['QUEUE', null, 'users', 'Stopped'], ['CHAI', 'asha', null, 'Gone cold'], ['CUPS', 'meena', null, 'No cups']];
$('#fNodes').innerHTML = FN.map(([l, f, ic, s], i) => `<div class="fn" id="fn${i}" style="left:${36 + i * 218}px"><div class="fl">${l}</div><div class="fv" style="${f ? FACE(f) + ';box-shadow:0 0 0 4px #14213D' : ''}">${ic ? M.icon(ic, 44, C.ink, 2) : ''}</div><div class="fs">Working</div></div>` +
  (i < 3 ? `<svg class="fa" id="fa${i}" style="left:${36 + i * 218 + 194 - 2}px" viewBox="0 0 24 28"><path d="M4 14 H18 M12 7 L19 14 L12 21" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
$('#fBar').innerHTML = FN.map((_, i) => `<i id="fb${i}" style="left:${i * 212}px;width:${i < 3 ? 208 : 212}px"></i>`).join('');
$('#fTxI').innerHTML = M.icon('x', 26, '#fff', 3);
// D
wrap($('#gst'), 'gstOut', 784, 580);
const ORG = [['heart', 'HEART', 172, 250], ['wind', 'LUNGS', 516, 250], ['brain', 'BRAIN', 344, 76]];
const OL = [[0, 1], [1, 2], [2, 0]];
$('#body').innerHTML = `<g id="leaf" transform="translate(344 170)"><circle r="96" fill="#F3EAD6"/>${icoG('leaf', -48, -48, 4, C.gold, 1.4)}</g>` +
  OL.map(([a, b], i) => `<line id="ol${i}" x1="${ORG[a][2]}" y1="${ORG[a][3]}" x2="${ORG[b][2]}" y2="${ORG[b][3]}" stroke="#E2DACB" stroke-width="6" stroke-linecap="round"/>`).join('') +
  OL.map((_, i) => `<circle id="op${i}" r="9" fill="#B8862F"/>`).join('') +
  ORG.map(([ic, l, x, y], i) => `<g id="og${i}" transform="translate(${x} ${y})"><circle r="60" fill="#14213D"/>${icoG(ic, -26, -26, 52 / 24, C.gold2, 1.6)}<rect x="-54" y="70" width="108" height="32" rx="16" fill="#F5F1E8"/><text y="92" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.4" fill="#14213D">${l}</text></g>`).join('');
Object.assign(M.IC, { leaf: ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'] });
$('#body').innerHTML = $('#body').innerHTML.replace('<g transform="translate(-48 -48) scale(4)" fill="none" stroke="#B8862F" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></g>', icoG('leaf', -48, -48, 4, C.gold, 1.4));
wrap($('#bio'), 'bioOut', 784, 580);
// M: definition diagram (one system, connected parts, one goal)
const DP = [[120, 300], [256, 380], [392, 300], [256, 210]];
$('#defS').innerHTML = `<rect id="dBox" x="8" y="96" width="496" height="356" rx="48" fill="none" stroke="#B8862F" stroke-width="4" stroke-dasharray="10 10"/>
  <text x="40" y="136" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">ONE SYSTEM</text>
  <g id="dStar" transform="translate(256 44)"><circle r="40" fill="#B8862F"/>${icoG('star', -20, -20, 40 / 24, '#fff', 2)}<text x="56" y="7" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#B8862F">ONE GOAL</text></g>
  <line id="dUp" x1="256" y1="84" x2="256" y2="176" stroke="#B8862F" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>` +
  [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]].map(([a, b], i) => `<line id="dl${i}" x1="${DP[a][0]}" y1="${DP[a][1]}" x2="${DP[b][0]}" y2="${DP[b][1]}" stroke="#C9BFAE" stroke-width="5" stroke-linecap="round"/>`).join('') +
  DP.map(([x, y], i) => `<g id="dp${i}" transform="translate(${x} ${y})"><circle r="34" fill="${i === 3 ? '#14213D' : '#F3EAD6'}"/>${icoG(['gear', 'gear', 'gear', 'network'][i], -16, -16, 32 / 24, i === 3 ? C.gold2 : C.gold, 2)}</g>`).join('');
// M: subsystems
const SB = [['asha', 'Kitchen · Asha', 140, 96], ['kabir', 'Cash · Kabir', 548, 96], ['meena', 'Cleaning · Meena', 344, 300]];
const pw = s => Math.round(s.length * 10.4 + 36);
$('#subS').innerHTML = `<rect id="sBox" x="4" y="4" width="680" height="400" rx="40" fill="#F5F1E8"/><text x="32" y="44" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.4" fill="#8A8274">CHAI CORNER · THE BIG SYSTEM</text>` +
  SB.map(([, , x, y], i) => `<line id="sl${i}" x1="344" y1="200" x2="${x}" y2="${y + (i === 2 ? -40 : 30)}" stroke="#B8862F" stroke-width="4" stroke-linecap="round"/>`).join('') +
  faceG('ravi', 344, 200, 38, '#B8862F', 'sR') +
  SB.map(([n, l, x, y], i) => `<g id="sg${i}"><circle cx="${x}" cy="${y + 20}" r="72" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/>${faceG(n, x, y + 6, 36, '#14213D', 'sf' + i)}<rect x="${x - pw(l) / 2}" y="${y + 52}" width="${pw(l)}" height="34" rx="17" fill="#14213D"/><text x="${x}" y="${y + 75}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="17" fill="#FFFFFF">${l}</text></g>`).join('');
// L: the loop
const LB = [['package', 'INPUTS', 0, 40], ['gear', 'PROCESS', 264, 40], ['cup', 'OUTPUTS', 528, 40], ['chat', 'FEEDBACK', 264, 300]];
$('#loop').innerHTML = `<path id="pF1" d="M608 160 V350 H424" fill="none" stroke="#B8862F" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/><path id="pF2" d="M264 350 H80 V160" fill="none" stroke="#B8862F" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
  <path d="M70 172 L80 160 L90 172" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" id="pF2h"/>
  <path id="pA" d="M164 100 H258" stroke="#3A4560" stroke-width="4" stroke-linecap="round"/><path d="M248 90 L260 100 L248 110" fill="none" stroke="#3A4560" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="pB" d="M428 100 H522" stroke="#3A4560" stroke-width="4" stroke-linecap="round"/><path d="M512 90 L524 100 L512 110" fill="none" stroke="#3A4560" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
  LB.map(([ic, l, x, y], i) => `<g id="lb${i}" transform="translate(${x} ${y})"><rect width="160" height="${i === 3 ? 100 : 120}" rx="20" fill="#F5F1E8" stroke="#E2DACB" stroke-width="2"/><g class="lbi" transform="translate(${80 - 18} ${i === 3 ? 16 : 22})"></g><text class="lbt" x="80" y="${i === 3 ? 82 : 96}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">${l}</text></g>`).join('') +
  Array.from({ length: 3 }, (_, i) => `<circle id="ta${i}" r="8" fill="#3A4560"/>`).join('') + Array.from({ length: 3 }, (_, i) => `<circle id="tb${i}" r="8" fill="#B8862F"/>`).join('') +
  `<g id="tf"><circle r="13" fill="#B5482F"/>${icoG('chat', -8, -8, 16 / 24, '#fff', 2.6)}</g>`;
const LR = [['package', 'Inputs', ['Milk', 'Tea leaves', 'Sugar', 'Time']], ['gear', 'Process', ['Transformation']], ['cup', 'Outputs', ['Hot chai', 'Paying customers']], ['chat', 'Feedback', ['"Too sweet!"']], ['refresh', 'Next morning', ['Sugar: 2 spoons to 1']]];
$('#lRows').innerHTML = LR.map(([ic, t, ch], i) => `<div class="rr" id="lr${i}" style="top:${84 + i * 92}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div>${ch.map((c, k) => `<div class="rc" id="lc${i}${k}">${c}</div>`).join('')}</div>`).join('');
Object.assign(M.IC, { package: ['M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z', 'M12 22V12', 'm3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7', 'm7.5 4.27 9 5.15'] });
wrap($('#lp'), 'lpOut', 784, 580);
// O: open system
const FO = [['users', 'Customers', 112, 44], ['truck', 'Suppliers', 576, 44], ['landmark', 'Government', 112, 336], ['store', 'Competitors', 576, 336]];
Object.assign(M.IC, { landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2l8 5H4z'] });
const fw = s => Math.round(s.length * 11 + 76);
$('#envS').innerHTML = `<circle id="eBound" cx="344" cy="190" r="118" fill="#F5F1E8" stroke="#B8862F" stroke-width="5" stroke-dasharray="26 16"/>
  <g transform="translate(344 162)"><circle r="40" fill="#14213D"/>${icoG('store', -20, -20, 40 / 24, C.gold2, 2)}</g>
  <text x="344" y="236" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#14213D">Chai Corner</text><text id="eSub" x="344" y="262" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2.4" fill="#B8862F">OPEN SYSTEM</text>` +
  FO.map(([ic, l, x, y], i) => { const dx = 344 - x, dy = 190 - y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d; const x1 = x + ux * 70, y1 = y + uy * 40, x2 = 344 - ux * 128, y2 = 190 - uy * 128;
    return `<g id="fo${i}"><line id="fl${i}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#3A4560" stroke-width="4" stroke-linecap="round"/>
      <path id="fh${i}" transform="translate(${x2.toFixed(1)} ${y2.toFixed(1)}) rotate(${(Math.atan2(uy, ux) * 180 / Math.PI).toFixed(1)})" d="M-12 -9 L0 0 L-12 9" fill="none" stroke="#3A4560" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="fp${i}" transform="translate(${x} ${y})"><rect class="fpr" x="${-fw(l) / 2}" y="-24" width="${fw(l)}" height="48" rx="24" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/>${icoG(ic, -fw(l) / 2 + 16, -11, 22 / 24, C.gold, 2.2)}<text x="${-fw(l) / 2 + 48}" y="7" font-family="Poppins" font-weight="600" font-size="20" fill="#14213D">${l}</text></g></g>`; }).join('');
const EC = [['Queue doubles', C.redBg, C.red, 'users'], ['Kabir moves to serving', C.paper, C.ink, 'refresh'], ['Extra help called', C.gold, '#fff', 'check']];
$('#eChips').innerHTML = EC.map(([t, bg, fg, ic], i) => `<div class="ech" id="ec${i}" style="background:${bg};color:${fg}">${M.icon(ic, 20, fg === '#fff' ? '#fff' : (fg === C.red ? C.red : C.gold), 2.4)}${t}</div>`).join('');
wrap($('#env'), 'envOut', 784, 580);
// Y: synergy
const SIX = ['ravi', 'asha', 'kabir', 'meena', null, null];
const GA = SIX.map((_, i) => [114 + (i % 3) * 230, 76 + Math.floor(i / 3) * 170]);
$('#yAS').innerHTML = SIX.map((n, i) => { const [x, y] = GA[i]; return `<rect x="${x - 96}" y="${y - 62}" width="192" height="150" rx="20" fill="#F5F1E8"/>` + (n ? faceG(n, x, y, 40, '#14213D', 'ya' + i) : userG(x, y, 40, 'ya' + i)) + `<text x="${x}" y="${y + 74}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="18" fill="#3A4560">10 an hour</text>`; }).join('');
const RB = SIX.map((_, i) => { const a = (-90 + i * 60) * Math.PI / 180; return [344 + 128 * Math.cos(a), 170 + 128 * Math.sin(a)]; });
$('#yBS').innerHTML = `<circle cx="344" cy="170" r="128" fill="none" stroke="#B8862F" stroke-width="5" id="yRing"/>` +
  RB.map(([x, y], i) => `<line id="ys${i}" x1="344" y1="170" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#E9D9B5" stroke-width="4"/>`).join('') +
  `<g id="yCore" transform="translate(344 170)"><circle r="46" fill="#B8862F"/><text y="8" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" fill="#FFFFFF">TEAM</text></g>` +
  SIX.map((n, i) => n ? faceG(n, RB[i][0].toFixed(1), RB[i][1].toFixed(1), 36, '#B8862F', 'yb' + i) : userG(RB[i][0].toFixed(1), RB[i][1].toFixed(1), 36, 'yb' + i)).join('');

// K: at work today
const KA = [
  ['network', 'Subsystems', 'Every department is part of the whole', 'Kitchen, cash counter and cleaning', 'heartPulse', 'A hospital: emergency, surgery, pharmacy'],
  ['link', 'Interdependence', 'One delay spreads', 'One broken counter stopped the stall', 'car', 'A late supplier stops a car factory'],
  ['chat', 'Feedback', 'Learn from results', '"Too sweet" means less sugar tomorrow', 'star', 'Apps fix problems from user ratings'],
  ['globe', 'Open system', 'Watch the world outside', 'Extra help on festival evenings', 'store', 'Shops stock up before the festival season'],
  ['users', 'Synergy', 'Teams beat solo stars', 'Six people as one team, not six', 'heart', 'Doctors, nurses and therapists plan care together'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['SYSTEMS TODAY', 'Five ideas', 'You will see them in every organisation', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>See the whole, not just one part</span></div>`) + `</div>`).join('');

// X: the limits
const XG = [['eye', 'Big picture'], ['link', 'Links made visible'], ['users', 'Every part counts']];
const XH = [['help', 'Too abstract'], ['network', 'Everything connects'], ['x', 'No clear steps']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#xr0I').innerHTML = M.icon('eye', 34, C.gold, 2.2); $('#xr1I').innerHTML = M.icon('clipboard', 34, C.red, 2.2);
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Inputs', 'Process', 'Outputs', 'Feedback'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('refresh', 44, C.gold2, 2.4);
// recap
const ROWS = [['network', 'One system, many subsystems', ['Connected parts']], ['refresh', 'The system loop', ['Inputs', 'Process', 'Outputs', 'Feedback']], ['globe', 'Open to the world', ['Open system', 'Synergy']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const fadeG = (el, t, tin, tout = 1e9, d = 0.15) => { const op = M.clamp((t - tin) / d) * (1 - M.clamp((t - tout) / 0.25)); M.hide(el, op <= 0.001); el.style.opacity = op.toFixed(3); };
const setA = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const grow = (card, inner, t, tShrink, w1 = 784) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, w1, sh);
  snap(card, (sh >= 1 ? w1 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - w1) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const growH = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), h = M.lerp(580, 274, sh);
  snap(card, (sh >= 1 ? 274 : h.toFixed(1)) + 'px', 'height');
  snap(inner, (sh >= 1 ? 0 : ((h - 274) / 2).toFixed(1)) + 'px', 'top');
};
const PTH = {}; ['pA', 'pB', 'pF1', 'pF2'].forEach(id => { PTH[id] = [$('#' + id), $('#' + id).getTotalLength()]; });
const ptAt = (id, u) => { const [p, L] = PTH[id]; const q = p.getPointAtLength(L * M.clamp(u)); return [q.x, q.y]; };
// the input-process-output-feedback loop at time t
const runLoop = t => {
  let s = -1; tL.forEach((a, i) => { if (t >= a - 0.05) s = i; });
  const act = [0, 1, 2, 3, 0][s] ?? -1;
  LB.forEach(([ic], i) => {
    const g = $('#lb' + i), on = act === i && t < tLout, r = g.querySelector('rect');
    const f = on ? (s === 4 ? C.gold : C.ink) : C.paper; if (r._f !== f) { r._f = f; r.setAttribute('fill', f); r.setAttribute('stroke', on ? f : C.line); }
    const col = on ? (s === 4 ? '#fff' : C.gold2) : C.gold, li = g.querySelector('.lbi'), k = ic + col;
    if (li._k !== k) { li._k = k; li.innerHTML = icoG(ic, 0, 0, 36 / 24, col, 2); }
    const tx = g.querySelector('.lbt'), tc = on ? '#FFFFFF' : C.muted; if (tx._f !== tc) { tx._f = tc; tx.setAttribute('fill', tc); }
  });
  // gear spins while processing
  if (s === 1) { const li = $('#lb1').querySelector('.lbi'); li.setAttribute('transform', `translate(62 22) rotate(${((t - tL[1]) * 90 % 360).toFixed(1)} 18 18)`); } else setA($('#lb1').querySelector('.lbi'), 'transform', 'translate(62 22)');
  // flows
  for (let i = 0; i < 3; i++) {
    const a = $('#ta' + i), b = $('#tb' + i);
    const onA = s === 1, onB = s === 2;
    M.hide(a, !onA); M.hide(b, !onB);
    if (onA) { const [x, y] = ptAt('pA', ((t - tL[1]) * 0.8 + i / 3) % 1); a.setAttribute('cx', x.toFixed(1)); a.setAttribute('cy', y.toFixed(1)); }
    if (onB) { const [x, y] = ptAt('pB', ((t - tL[2]) * 0.8 + i / 3) % 1); b.setAttribute('cx', x.toFixed(1)); b.setAttribute('cy', y.toFixed(1)); }
  }
  // feedback travels back
  M.draw($('#pF1'), t, tL[3] - 0.1, 0.8, M.o3); M.draw($('#pF2'), t, tL[4] - 0.1, 0.8, M.o3); fadeG($('#pF2h'), t, tL[4] + 0.6);
  const tf = $('#tf'); let p = null;
  if (t >= tSay - 0.2 && t < tL[4]) p = ptAt('pF1', M.io((t - tSay + 0.2) / 1.2));
  else if (t >= tL[4] && t < tLess + 1.2) p = ptAt('pF2', M.io((t - tL[4] - 0.1) / 1.4));
  M.hide(tf, !p); if (p) setA(tf, 'transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
  // rows
  LR.forEach(([ic, , ch], i) => {
    const el = $('#lr' + i), ta = tL[i], td = i < 4 ? tL[i + 1] : tLout + 1;
    const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), ac = on * (1 - off);
    el.querySelector('.bg').style.background = mix(C.paper, i === 4 ? C.gold : C.ink, ac);
    el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
    el.querySelector('.rn').style.color = t < ta ? C.dim : mix(i === 4 ? '#fff' : C.gold2, C.gold, off);
    el.querySelector('.ri').style.background = mix('#fff', i === 4 ? '#C99A45' : C.navy2, ac);
    setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (ac > 0.5 ? (i === 4 ? '#fff' : C.gold2) : C.gold), 24, 2.2);
    const tc = [tLin, [tTrans], [tHot, tPay], [tSweet], [tLess]][i];
    ch.forEach((_, k) => { const c = $('#lc' + i + k); M.vis(c, t, tc[k] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); if (i === 3) { c.style.background = C.redBg; c.style.color = C.red; } if (i === 4) { c.style.background = mix('#fff', C.gold3, off); c.style.color = C.ink; } });
  });
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  ['#dq', '#yq'].forEach(id => { const el = $(id); if (el.offsetWidth > 1600) el.style.fontSize = Math.floor(88 * 1600 / el.offsetWidth) + 'px'; });
  LR.forEach(([, , ch], i) => { let x = 134 + $('#lr' + i + ' .rt').offsetWidth + 18; ch.forEach((_, k) => { const c = $('#lc' + i + k); c.style.left = x + 'px'; x += c.offsetWidth + 8; }); });
  let x = 48; EC.forEach((_, i) => { const c = $('#ec' + i); c.style.left = x + 'px'; x += c.offsetWidth + 12; });
  if (x - 12 > 736) { const k = 688 / (x - 12 - 48); EC.forEach((_, i) => { const c = $('#ec' + i); c.style.fontSize = Math.floor(21 * k) + 'px'; }); x = 48; EC.forEach((_, i) => { const c = $('#ec' + i); c.style.left = x + 'px'; x += c.offsetWidth + 12; }); }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  const qq = $('#qq2'); if (qq.offsetWidth > 1380) qq.style.fontSize = Math.floor(68 * 1380 / qq.offsetWidth) + 'px';
  const q1 = $('#qq1'); if (q1.offsetWidth > 1380) q1.style.fontSize = Math.floor(68 * 1380 / q1.offsetWidth) + 'px';
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 4]), ...tXh.map((th, i) => [th + 0.1, -12 + (i + 1) * 4])], M.SOFT);

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
  const exOn = t < tLout + 1 ? [tL0 + 0.3, tLout] : [tO3 - 0.1, tYout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: one part fails ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    M.vis($('#fail'), t, tMorph + 0.3, 1e9, { dx: 60, dy: 0 });
    FN.forEach((f, i) => {
      const el = $('#fn' + i); M.vis(el, t, tMorph + 0.5 + i * 0.08, 1e9, { dy: 16 });
      if (i < 3) M.vis($('#fa' + i), t, tMorph + 0.7 + i * 0.08, 1e9, { dx: -8, dy: 0, fade: 0.15 });
      const r = M.io((t - tFail[i]) / 0.3);
      el.style.background = mix(C.paper, C.redBg, r);
      M.setT(el.querySelector('.fs'), r > 0.5 ? f[3] : 'Working'); el.querySelector('.fs').style.color = r > 0.5 ? C.red : C.ink;
      el.querySelector('.fl').style.color = r > 0.5 ? C.red : C.muted;
      const fv = el.querySelector('.fv'); if (f[1]) fv.style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.red, r);
      const b = $('#fb' + i); b.style.background = mix('#9DB38A', C.red, r);
      if (i < 3) { const ap = $('#fa' + i).querySelector('path'); ap.setAttribute('stroke', mix(C.dim, C.red, M.io((t - tFail[i + 1] + 0.2) / 0.3))); }
    });
    M.vis($('#fBar'), t, tMorph + 0.9, 1e9, { dy: 10 });
    M.vis($('#fTx'), t, tSuffer - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: where the idea came from ===== */
  const dOn = t >= tTu - 0.05 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    const bio = $('#bio'); M.vis(bio, t, tD1 - 0.1, tDout, { dy: 36, ...o }); grow(bio, $('#bioOut'), t, tD3);
    M.rise($('#bn'), t, tLud - 0.1, { st: 0.07, sp: M.HEAVY }); M.vis($('#bt'), t, tAus - 0.05, 1e9, { dy: 10 });
    M.vis($('#body'), t, tD1 + 0.2, 1e9, { dy: 0, fade: 0.2 });
    fadeG($('#leaf'), t, tD1 + 0.3, tLiving - 0.1, 0.25);
    ORG.forEach((_, i) => fadeG($('#og' + i), t, Math.min(tLiving + i * 0.15, tOrg[i] - 0.1), 1e9, 0.2));
    OL.forEach(([a, b], i) => {
      M.draw($('#ol' + i), t, tOrg[0] + 0.2 + i * 0.25, 0.5, M.o3);
      const dot = $('#op' + i), on = t >= tAlone - 0.6; M.hide(dot, !on);
      if (on) { const u = ((t - tAlone + 0.6) * 0.5 + i / 3) % 1, A = ORG[a], B = ORG[b]; dot.setAttribute('cx', M.lerp(A[2], B[2], u).toFixed(1)); dot.setAttribute('cy', M.lerp(A[3], B[3], u).toFixed(1)); }
    });
    const gst = $('#gst'); M.vis(gst, t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o }); growH(gst, $('#gstOut'), t, tD4);
    M.rise($('#g1'), t, tGen - 0.1, { st: 0.07 }); M.vis($('#g2'), t, tGen + 0.7, 1e9, { dy: 10 }); M.vis($('#g3'), t, tGen + 0.9, 1e9, { dy: 10 });
    M.vis($('#kk'), t, tD4 + 0.12, tDout, { dy: 36, ...o });
    M.vis($('#bookS'), t, t1966 - 0.1, 1e9, { dy: 20, sp: M.SOFT });
    M.rise($('#kk1'), t, tFamous - 0.6, { st: 0.05 }); M.rise($('#kk2'), t, tFamous - 0.3, { st: 0.05 }); M.vis($('#kk3'), t, tFamous + 0.3, 1e9, { dy: 10 });
  }

  /* ===== M: definition + subsystems ===== */
  const mOn = t >= tM1 - 0.1 && t < tL0 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tM1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tM2 - 0.15, outDur: 0.3 });
    M.vis($('#def'), t, tM2 + 0.05, tM3 - 0.3, { dy: 36, ...o });
    M.rise($('#dl1'), t, tSees - 0.1, { st: 0.06 }); M.rise($('#dl2'), t, tConn - 0.3, { st: 0.06 }); M.rise($('#dl3'), t, tGoal - 0.8, { st: 0.06 });
    M.draw($('#dBox'), t, tM2 + 0.3, 0.9, M.o3);
    DP.forEach((_, i) => fadeG($('#dp' + i), t, tConn - 0.3 + i * 0.12));
    [0, 1, 2, 3, 4].forEach(i => M.draw($('#dl' + i), t, tConn + 0.2 + i * 0.1, 0.4, M.o3));
    fadeG($('#dStar'), t, tGoal - 0.1); M.draw($('#dUp'), t, tGoal, 0.4, M.o3);
    M.vis($('#ill'), t, tM3 + 0.05, tMout, { dy: 36, ...o });
    M.vis($('#illImg'), t, tM3 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#subs'), t, tM3 + 0.18, tMout, { dx: 60, dy: 0, ...o });
    M.rise($('#sb1'), t, tSmaller - 0.2, { st: 0.05 });
    M.vis($('#subS'), t, tM3 + 0.4, 1e9, { dy: 16, sp: M.SOFT });
    SB.forEach((_, i) => { fadeG($('#sg' + i), t, Math.min(tM3 + 0.6 + i * 0.12, tSubW[i] - 0.1)); M.draw($('#sl' + i), t, tLinks - 0.1 + i * 0.12, 0.4, M.o3); });
    fadeG($('#sR'), t, tLinks - 0.2);
    SB.forEach((_, i) => { const r = $('#sf' + i).querySelector('.ring'), c = t >= tSubW[i] - 0.05 ? C.gold : C.ink; if (r._f !== c) { r._f = c; r.setAttribute('fill', c); } });
  }

  /* ===== L: the system loop ===== */
  const lOn = t >= tL0 - 0.1 && t < tO1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const lp = $('#lp'); M.vis(lp, t, tL0 + 0.05, tLout, { dy: 36, ...o }); grow(lp, $('#lpOut'), t, tL[0]);
    M.vis($('#loop'), t, tL0 + 0.25, 1e9, { dy: 16, sp: M.SOFT });
    M.vis($('#lr'), t, tL[0] + 0.12, tLout, { dx: 60, dy: 0, ...o });
    LR.forEach((_, i) => M.vis($('#lr' + i), t, tL[0] + 0.3 + i * 0.06, 1e9, { dy: 14 }));
    runLoop(t);
  }

  /* ===== O: open system ===== */
  const oOn = t >= tO1 - 0.1 && t < tY1 + 0.2; M.hide($('#sO'), !oOn);
  if (oOn) {
    const o = { outDur: 0.3, ody: -16 };
    const env = $('#env'); M.vis(env, t, tO1 + 0.05, tOout, { dy: 36, ...o }); grow(env, $('#envOut'), t, tO3);
    M.vis($('#envS'), t, tO1 + 0.25, 1e9, { dy: 0, sc: 0.92, sp: M.SOFT });
    M.vis($('#eSub'), t, tOpen, 1e9, { dy: 0, fade: 0.2 });
    FO.forEach((_, i) => { fadeG($('#fp' + i), t, tForce[i] - 0.1); M.draw($('#fl' + i), t, tForce[i] + 0.05, 0.35, M.o3); fadeG($('#fh' + i), t, tForce[i] + 0.35); });
    const dbl = M.io((t - tDoub) / 0.3), fr = $('#fp0').querySelector('.fpr');
    setA(fr, 'stroke', dbl > 0.5 ? C.red : C.line); setA(fr, 'stroke-width', dbl > 0.5 ? '4' : '2'); setA(fr, 'fill', mix('#FFFFFF', C.redBg, dbl));
    EC.forEach((_, i) => M.vis($('#ec' + i), t, [tDoub, tKabO, tExtra][i] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    const op = $('#oPill'), rl = t >= tReal - 0.1;
    M.vis(op, t, tClosed - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.setT($('#oPillT'), rl ? 'Real businesses are open' : 'Closed system: cut off');
    setIco($('#oPillI'), rl ? 'check' : 'x', '#fff', 20, 3);
    op.style.background = rl ? C.gold : C.red; op.style.color = '#fff';
    if (op._w !== op.offsetWidth) { op._w = op.offsetWidth; op.style.left = (736 - op.offsetWidth) + 'px'; }
    M.vis($('#fes'), t, tO3 + 0.12, tOout, { dx: 60, dy: 0, ...o });
    M.vis($('#fesImg'), t, tO3 + 0.35, 1e9, { dy: 24, sp: M.SOFT });
  }

  /* ===== Y: synergy ===== */
  const yOn = t >= tY1 - 0.1 && t < tK0 + 0.2; M.hide($('#sY'), !yOn);
  if (yOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#yq'), t, tY1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tY2 - 0.15, outDur: 0.25 });
    M.vis($('#yA'), t, tY2 + 0.05, tYout, { dx: -60, dy: 0, ...o });
    M.vis($('#yB'), t, tWhole - 0.1, tYout, { dx: 60, dy: 0, ...o });
    SIX.forEach((_, i) => { fadeG($('#ya' + i), t, tY2 + 0.3 + i * 0.06); fadeG($('#yb' + i), t, tWhole + 0.15 + i * 0.06); M.draw($('#ys' + i), t, tWhole + 0.5 + i * 0.05, 0.3, M.o3); });
    M.draw($('#yRing'), t, tWhole + 0.2, 0.9, M.o3); fadeG($('#yCore'), t, tWhole + 0.6);
    M.vis($('#yAT'), t, tSixty - 0.1, 1e9, { dy: 12 }); M.count($('#yAT'), t, tSixty - 0.1, 0.8, 0, 60);
    M.vis($('#yAU'), t, tSixty, 1e9, { dy: 8 });
    M.vis($('#yBT'), t, tHund - 0.1, 1e9, { dy: 12 }); M.count($('#yBT'), t, tHund - 0.1, 0.9, 0, 100);
    M.vis($('#yBU'), t, tHund, 1e9, { dy: 8 });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 4 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 5 ? tK[k] - 0.14 : 1e9;
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

  /* ===== X: the limits ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    $('#beam').setAttribute('transform', `rotate(${a.toFixed(3)} 344 40)`);
    $('#panL').setAttribute('transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    $('#panR').setAttribute('transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, tSee - 0.2, 1e9, { dy: 18 }); M.vis($('#xr1'), t, tRecipe - 0.4, 1e9, { dy: 18 }); M.vis($('#xr2'), t, tRecipe + 0.2, 1e9, { dy: 8 });
    M.vis($('#lesson'), t, tX5 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX5 + 0.15, 1e9, { dy: 40 });
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
