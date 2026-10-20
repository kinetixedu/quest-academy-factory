// MBA - Marketing Management, Ep 17: Product Life Cycle (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  sprout: ['M7 20h10', 'M10 20c5.5-2.5.8-6.4 3-10', 'M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z', 'M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z'],
  music: ['M9 18V5l12-2v13', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  scissors: ['M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M8.12 8.12 12 12', 'M20 4 8.12 15.88', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M14.8 14.8 20 20'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tStop = wt('H2', 'stopped');
const tC2 = T0('C2'), tDying = wt('C2', 'dying'), tNo = wt('C2', 'No'), tGrow = wt('C2', 'growing');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tL4 = T0('L4');
const tFew = wt('L1', 'few'), tTold = wt('L2', 'told'), tClimb = wt('L2', 'climbed'), tMost = wt('L3', 'most'), tBak = wt('L3', 'bakery'), tName = wt('L4', 'product');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M0') - 0.32;
const tQl = wt('D2', 'course'), tHl = [wt('D2', 'sales'), wt('D2', 'lifetime')];
const tLev = wt('D3', 'Theodore'), tHbr = wt('D3', 'Harvard'), tYr = wt('D3', '1965');
const tFs = [wt('D4', 'Introduction'), wt('D4', 'growth'), wt('D4', 'maturity'), wt('D4', 'decline')];
// M: the life run
const tM0 = T0('M0'), tM = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => T0('M' + i));
const tMout = T0('T1') - 0.32;
const tToday = wt('M7', 'Laddoo'), tFall = wt('M8', 'fall'), tSlip = wt('M6', 'slip');
const tStage = [tM[0], tM[2], tM[4], tM[7]];
// statement + plans
const tT = T0('T1'), tSt2 = wt('T1', 'Every'), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tPout = T0('R0') - 0.32;
// R: refresh
const tR0 = T0('R0'), tR = [1, 2, 3].map(i => T0('R' + i)), tRout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'scooter'), wt('K2', 'food'), wt('K3', 'toothpaste'), wt('K4', 'Music')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'tells'), wt('X2', 'plan')], tXh = [wt('X3', 'back'), wt('X3', 'months')];
const tDevX = wt('X4', 'Dev'), tNaniX = wt('X4', 'Nani'), tLove = wt('X4', 'love'), tKeep = wt('X5', 'keeps'), tNew = wt('X5', 'new'), tAct = wt('X6', 'Dhalla');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Sales');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'introduction'), wt('S2', 'growth'), wt('S2', 'maturity'), wt('S2', 'decline')], [wt('S3', 'own')], [wt('S4', 'users'), wt('S4', 'product'), wt('S4', 'mix')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.ld}" stroke="${C.ldD}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${C.ldD}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${C.ldD}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${C.ldD}"/></g>`;
// A: the six-pack on the table, weekly bars, the worry pills
$('#six').innerHTML = `<rect x="384" y="2" width="132" height="66" rx="10" fill="#14213D"/><rect x="384" y="2" width="132" height="12" rx="6" fill="#24345A"/>` +
  [0, 1, 2].map(i => laddoo(410 + i * 40, 30, 11) + laddoo(410 + i * 40, 52, 11)).join('');
const WK = [10, 16, 26, 40, 56, 74, 90, 104, 112, 115, 116, 115];
$('#wkBars').innerHTML = WK.map((v, i) => `<div class="wbar" id="wb${i}" style="left:${i * 72}px;height:${Math.round(v / 116 * 136)}px;background:#B8862F"></div>`).join('') + `<div id="flat" style="left:${8 * 72 - 10}px;width:${3 * 72 + 72}px;top:${150 - 136 - 16}px"></div>`;
$('#stopI').innerHTML = M.icon('x', 20, C.red, 2.8);
const METH = [['trendUp', 'Sales flat', 1], ['help', 'Dying?', 1]];
$('#meth').innerHTML = METH.map(([ic, m], i) => `<div class="stp" id="mt${i}" style="top:76px;background:#F6E3DC;color:#B5482F">${M.icon(ic, 26, C.red, 2.6)}<span>${m}</span>${i === 1 ? '<div class="strike" id="mtS"></div>' : ''}</div>`).join('');
// L: who buys, the rival
const WHO = [['home', 'AT FIRST', 'Neighbours'], ['users', 'THEN', 'Tiffin parents'], ['store', 'NOW', 'Most families']];
$('#whoRow').innerHTML = WHO.map(([ic, n, t], i) => `<div class="wt" id="wt${i}" style="left:${36 + i * 252}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${t}</div></div>` +
  (i < 2 ? `<svg class="wa" id="wa${i}" width="44" height="24" style="left:${36 + 208 + i * 252}px"><path d="M10 12 H34 M26 5 L34 12 L26 19" fill="none" stroke="#B9B1A3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
$('#rivI').innerHTML = M.icon('store', 30, C.red, 2.2); $('#plcPI').innerHTML = M.icon('repeat', 24, C.gold2, 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// D: Levitt + four stages
$('#levBI').innerHTML = M.icon('book', 24, C.gold2, 2.2);
const FS = [['sprout', 'Introduction'], ['trendUp', 'Growth'], ['award', 'Maturity'], ['trendDown', 'Decline']];
$('#fsRow').innerHTML = FS.map(([ic, t], i) => `<div class="fz" id="fz${i}" style="left:${36 + i * 180}px"><div class="zn">STAGE ${i + 1}</div><div class="zi"></div><div class="zt">${t}</div></div>`).join('');
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the life curve. Plot is 1000 x 452; bands y 40-400; profit zero line y 330. */
const SP = [[0, 8], [100, 12], [200, 26], [325, 70], [450, 108], [525, 120], [600, 124], [675, 122], [750, 112], [875, 74], [1000, 40]];
const PP = [[0, -18], [100, -24], [200, -10], [325, 22], [450, 46], [525, 48], [600, 42], [675, 34], [750, 22], [875, 2], [1000, -12]];
const cr = P => x => { // Catmull-Rom through P (x evenly enough spaced)
  let i = 0; while (i < P.length - 2 && x > P[i + 1][0]) i++;
  const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
  const u = M.clamp((x - p1[0]) / (p2[0] - p1[0])), u2 = u * u, u3 = u2 * u;
  return 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3);
};
const fS = cr(SP), fP = cr(PP), Y = v => 330 - v * 2.08;
const pathTo = (f, a, b) => { let d = ''; for (let x = a; x <= b + 0.01; x += 4) d += (d ? 'L' : 'M') + Math.min(x, b).toFixed(1) + ' ' + Y(f(Math.min(x, b))).toFixed(1); return d; };
const BANDS = [[0, 200, 'INTRODUCTION'], [200, 450, 'GROWTH'], [450, 750, 'MATURITY'], [750, 1000, 'DECLINE']];
$('#plot').innerHTML = `<defs><clipPath id="futC"><rect id="futR" x="600" y="0" width="0" height="452"/></clipPath></defs>` +
  BANDS.map(([a, b, n], i) => `<rect id="bd${i}" x="${a + (i ? 2 : 0)}" y="40" width="${b - a - (i ? 2 : 0) - (i < 3 ? 2 : 0)}" height="360" rx="${i === 0 ? 0 : 0}" fill="#F5F1E8"/><text id="bt${i}" x="${(a + b) / 2}" y="24" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">${n}</text>`).join('') +
  `<line x1="0" y1="330" x2="1000" y2="330" stroke="#B9B1A3" stroke-width="2" stroke-dasharray="6 8"/>
   <text x="992" y="320" text-anchor="end" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">BREAK-EVEN</text>
   <g clip-path="url(#futC)"><path d="${pathTo(fS, 600, 1000)}" fill="none" stroke="#B5482F" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 12"/><path d="${pathTo(fP, 600, 1000)}" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 10"/></g>
   <text id="futT" x="884" y="248" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.2" fill="#B5482F">IF NOTHING CHANGES</text>
   <path id="pfL" d="" fill="none" stroke="#14213D" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 10"/>
   <path id="slL" d="" fill="none" stroke="#B8862F" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
   <circle id="pDot" r="8" fill="#14213D" stroke="#fff" stroke-width="3"/>
   <circle id="sDot" r="13" fill="#B8862F" stroke="#fff" stroke-width="4"/>
   <g transform="translate(0 432)"><line x1="0" y1="0" x2="36" y2="0" stroke="#B8862F" stroke-width="7" stroke-linecap="round"/><text x="52" y="6" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2" fill="#3A4560">SALES</text>
   <line x1="160" y1="0" x2="196" y2="0" stroke="#14213D" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 10"/><text x="212" y="6" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2" fill="#3A4560">PROFIT</text></g>`;
$('#here').style.cssText += ';' + FACE('zoya');
const SROW = ['SALES', 'PROFIT', 'RIVALS', 'AT LADDOO LAB'], SIC = ['trendUp', 'coin', 'users', 'laddoo'];
const STG = [
  ['STAGE 01 / 04', 'Introduction', ['Slow', 'Below zero', 'Hardly any', 'Free tastings']],
  ['STAGE 02 / 04', 'Growth', ['Climbing fast', 'Turns positive', 'A few join in', "Mrs. Rao's friends"]],
  ['STAGE 03 / 04', 'Maturity', ['Highest, but flat', 'Starts to slip', 'Many copy you', 'A bakery copies']],
  ['STAGE 04 / 04', 'Decline', ['Falling', 'Shrinking', 'Some give up', 'Not there yet']],
];
$('#sPans').innerHTML = `<div class="sp" id="sp0"><div class="ps">ONE CURVE · TWO LINES</div><div class="serif pt">Watch it live</div>` +
  [['trendUp', 'SALES', 'Packs sold each week', C.gold], ['coin', 'PROFIT', 'Money left after costs', C.ink]].map(([ic, l, v, c], k) => `<div class="sr4" style="top:${176 + k * 92}px"><i>${M.icon(ic, 30, c, 2.2)}</i><div class="kl">${l}</div><div class="kt">${v}</div></div>`).join('') + `</div>` +
  STG.map(([s, n, vs], i) => `<div class="sp" id="sp${i + 1}"><div class="ps">${s}</div><div class="serif pt">${n}</div>` +
    vs.map((v, k) => `<div class="sr4" id="sr${i + 1}${k}" style="top:${176 + k * 92}px"><i>${M.icon(SIC[k], 30, k === 3 ? C.gold : C.ink, 2.2)}</i><div class="kl">${SROW[k]}</div><div class="kt">${v}</div></div>`).join('') + `</div>`).join('');

// P: a plan for each stage
const P4 = [['sprout', 'Introduction', 'Make people aware,', 'let them try it', 'zoya', 'Free tastings at the school gate, and Dev\'s first posters'],
  ['trendUp', 'Growth', 'Reach more buyers,', 'keep quality high', 'nani', 'More buyers every week, and Nani\'s recipe never changes'],
  ['shield', 'Maturity', 'Defend your buyers,', 'refresh the product', 'zoya', 'Keep tiffin parents happy, and find a fresh idea'],
  ['scissors', 'Decline', 'Cut costs, sell out,', 'or drop the product', 'arjun', 'Not yet. Arjun checks weekly sales for an early drop']];
$('#p4').innerHTML = P4.map(([ic, a, b, c], i) => `<div class="st4" id="pst${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="sn">0${i + 1}</div><div class="si"></div><div class="s1">${a}</div><div class="s2">${b}</div><div class="s3">${c}</div></div>` + (i < 3 ? `<div class="cx" id="cx${i}" style="left:${536 + i * 408}px">${M.icon('arrowR', 18, C.gold, 2.6)}</div>` : '')).join('');
$('#pePans').innerHTML = [[null, 'A PLAN FOR EACH STAGE', 'Same product, a different job at every stage']].concat(P4.map((p, i) => [p[4], `STAGE 0${i + 1} · AT LADDOO LAB`, p[5]])).map(([f, l, x], k) =>
  `<div class="pex" id="pex${k}"><div class="lbl">${l}</div>${f ? `<div class="pa" style="${FACE(f)}"></div>` : `<div class="pi">${M.icon('map', 36, C.gold, 2.2)}</div>`}<div class="pt2">${x}</div></div>`).join('');

// R: three ways to refresh
const R3 = [['users', 'Change the market', 'New users: gym-goers', 'zoya'], ['laddoo', 'Change the product', "A new flavour in Nani's kitchen", 'nani'], ['megaphone', 'Change the mix', 'Dev posts tiffin ideas', 'dev']];
$('#rRows3').innerHTML = R3.map(([ic, t, s, f], i) => `<div class="rr" id="rr${i}" style="top:${88 + i * 160}px"><div class="bg"></div><div class="ri"></div><div class="rt">${t}</div><div class="rs">${s}</div><div class="rf" style="${FACE(f)}"></div></div>`).join('');
wrap($('#rI'), 'rIOut', 784, 580);

// K: at work today
const KA = [
  ['sprout', 'Introduction', 'Build awareness and trial', 'Free tastings at the school gate', 'bike', 'A scooter maker offers free test rides'],
  ['trendUp', 'Growth', 'Grow fast, keep quality', "Mrs. Rao's friends start buying", 'phone', 'A delivery app opens in new cities monthly'],
  ['award', 'Maturity', 'Defend and refresh', 'Zoya plans something new', 'smile', 'A toothpaste maker adds new flavours'],
  ['trendDown', 'Decline', 'Cut, harvest or drop', 'Not yet: Arjun watches weekly sales', 'music', 'Music CDs faded as streaming arrived'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['THE LIFE CYCLE TODAY', 'Four stages', 'You will spot them in every market', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A SIX-PACK TO A SMARTPHONE</div><div class="pe"><i>${M.icon('chart', 34, C.gold, 2.2)}</i><span>Same curve, any product</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['map', 'Shows the next plan'], ['target', 'Plan fits the stage']];
const XH = [['eye', 'Seen too late'], ['clock', 'Months or decades']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#mini').innerHTML = `<rect width="240" height="312" rx="20" fill="#F5F1E8"/>
  <text x="24" y="40" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">ORIGINAL</text>
  <line x1="24" y1="262" x2="216" y2="262" stroke="#E2DACB" stroke-width="3"/>
  <path id="mC" d="M24 250 C70 246 90 150 132 120 C150 108 158 106 168 106 H210" fill="none" stroke="#B8862F" stroke-width="6" stroke-linecap="round"/>
  <path id="mD" d="M168 106 C188 108 200 160 214 212" fill="none" stroke="#B5482F" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 10"/>
  <path id="mU" d="M168 106 C186 100 196 84 206 58" fill="none" stroke="#14213D" stroke-width="6" stroke-linecap="round"/>
  <path id="mUa" d="M194 66 L207 54 L214 71" fill="none" stroke="#14213D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <text id="mUt" x="216" y="296" text-anchor="end" font-family="Poppins" font-weight="700" font-size="14" letter-spacing="2" fill="#14213D">+ SOMETHING NEW</text>
  ${laddoo(168, 106, 12)}`;
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('book', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('map', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Introduction', 'Growth', 'Maturity', 'Decline'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('award', 44, C.gold2, 2.4);
// recap
const ROWS = [['repeat', 'Four stages', ['Introduction', 'Growth', 'Maturity', 'Decline']], ['map', 'Each stage needs its own plan', ['Its own plan']], ['sprout', 'Refresh a mature product', ['New users', 'New product', 'New mix']]];
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
// the life run: x position of "now" on the curve
const seg = (t, a, b, x0, x1) => M.lerp(x0, x1, M.io((t - a) / (b - a)));
const xNow = t => {
  if (t < tM[2]) return seg(t, tM[0] + 0.3, T1('M2'), 0, 200);
  if (t < tM[4]) return seg(t, tM[2] + 0.2, T1('M4'), 200, 450);
  return seg(t, tM[4] + 0.2, tSlip + 0.3, 450, 600);
};
const STG_ON = t => t < tStage[1] ? 0 : t < tStage[2] ? 1 : t < tStage[3] ? 2 : 3;

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 2; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  for (let i = 0; i < 3; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(40 * 688 / q.offsetWidth) + 'px'; }
  document.querySelectorAll('.sp .pt').forEach(el => { if (el.offsetWidth > 440) el.style.fontSize = Math.floor(60 * 440 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.sr4 .kt').forEach(el => { if (el.offsetWidth > 360) el.style.fontSize = Math.floor(28 * 360 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.st4 .s2, .st4 .s3').forEach(el => { if (el.offsetWidth > 312) el.style.fontSize = Math.floor(24 * 312 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.pex .pt2').forEach(el => { if (el.offsetWidth > 1390) el.style.fontSize = Math.floor(36 * 1390 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.rr .rs').forEach(el => { if (el.offsetWidth > 470) el.style.fontSize = Math.floor(26 * 470 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.xr .bb').forEach(el => { if (el.offsetWidth > 332) el.style.fontSize = Math.floor(22 * 332 / el.offsetWidth) + 'px'; });
  { const k = $('#fact .kt'); if (k.offsetWidth > 560) k.style.fontSize = Math.floor(28 * 560 / k.offsetWidth) + 'px'; }
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  const ht = $('#hereT'); geo.hw = ht.offsetWidth;
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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : [tM0 + 0.3, tMout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: sales stopped growing ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    const tb0 = tMorph + 0.55, step = Math.max(0.06, (tStop - 0.1 - tb0) / 12);
    WK.forEach((_, i) => {
      const el = $('#wb' + i), p = M.spring(t - tb0 - i * step, M.SOFT);
      M.hide(el, p <= 0); snap(el, p >= 1 ? 'none' : `scaleY(${p.toFixed(4)})`); el.style.transformOrigin = '50% 100%';
      el.style.background = i >= 8 ? mix(C.gold, C.red2, M.io((t - tStop - (i - 8) * 0.05) / 0.3)) : C.gold;
    });
    { const u = M.io((t - tStop - 0.2) / 0.4); const f = $('#flat'); M.hide(f, u <= 0); f.style.clipPath = `inset(0 ${((1 - u) * 100).toFixed(1)}% 0 0)`; }
    M.vis($('#stopP'), t, tStop + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tC2 + 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mt1'), t, tDying - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    { const u = M.io((t - tNo) / 0.3), s = $('#mtS'); s.style.transformOrigin = '0 50%'; s.style.transform = `scaleX(${u.toFixed(3)})`; M.hide(s, u <= 0); }
    $('#mt1').style.opacity = t > tNo + 0.3 ? String((1 - 0.45 * M.io((t - tNo - 0.3) / 0.3)).toFixed(3)) : $('#mt1').style.opacity;
    M.rise($('#askT'), t, tGrow - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the story so far ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#who'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    const tw = [tL2 + 0.35, tTold, tMost - 0.05];
    WHO.forEach(([ic], i) => {
      const el = $('#wt' + i); M.vis(el, t, tw[i], 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      if (i < 2) M.vis($('#wa' + i), t, tw[i + 1] - 0.15, 1e9, { dx: -10, dy: 0, fade: 0.15 });
      const on = M.io((t - tw[i] - 0.05) / 0.25) * (1 - (i < 2 ? M.io((t - tw[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
    M.vis($('#riv'), t, tL3 + 0.1, tLout, { dy: 36, ...o });
    M.vis($('#rivR'), t, tBak - 0.1, 1e9, { dy: 16 });
    M.vis($('#plcP'), t, tName - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== D: what is the product life cycle ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, tD2 + 0.1, { st: 0.06, sp: M.HEAVY });
    M.rise($('#kot2'), t, wt('D2', 'Armstrong') - 0.15, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'call') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tQl - 0.25, 1e9, { dy: 0 });
    for (let i = 0; i < 3; i++) M.vis($('#ql' + i), t, tQl - 0.15 + i * 0.12, 1e9, { dy: 14 });
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, C.gold, u); });
    M.vis($('#lev'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.rise($('#levN'), t, tLev - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#levH'), t, tHbr - 0.05, 1e9, { dy: 10 });
    M.vis($('#levB'), t, tYr - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#fs'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    FS.forEach(([ic], i) => {
      const el = $('#fz' + i); M.vis(el, t, tFs[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tFs[i]) / 0.25) * (1 - (i < 3 ? M.io((t - tFs[i + 1]) / 0.25) : 0));
      el.style.background = mix(C.paper, C.ink, on);
      el.querySelector('.zt').style.color = mix(C.ink, '#fff', on); el.querySelector('.zn').style.color = mix(C.muted, C.gold2, on);
      setIco(el.querySelector('.zi'), ic, on > 0.5 ? C.gold2 : C.gold, 40, 2.2);
    });
  }

  /* ===== M: the life of the six-pack ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#plc'), t, tM0 + 0.05, tMout, { dy: 36, ...o });
    M.vis($('#plot'), t, tM0 + 0.25, 1e9, { dy: 16, sp: M.SOFT });
    M.vis($('#plcV'), t, tM0 + 0.3, 1e9, { dy: 0 });
    const x = xNow(t), live = t >= tM[0] + 0.3, si = STG_ON(t);
    attr($('#slL'), 'd', live && x > 0.5 ? pathTo(fS, 0, x) : 'M0 0'); M.hide($('#slL'), !(live && x > 0.5));
    attr($('#pfL'), 'd', live && x > 0.5 ? pathTo(fP, 0, x) : 'M0 0'); M.hide($('#pfL'), !(live && x > 0.5));
    const sy = Y(fS(x)), py = Y(fP(x));
    M.vis($('#sDot'), t, tM[0] + 0.2, 1e9, { dy: 0, fade: 0.12 }); attr($('#sDot'), 'cx', x.toFixed(1)); attr($('#sDot'), 'cy', sy.toFixed(1));
    M.vis($('#pDot'), t, tM[0] + 0.2, 1e9, { dy: 0, fade: 0.12 }); attr($('#pDot'), 'cx', x.toFixed(1)); attr($('#pDot'), 'cy', py.toFixed(1));
    BANDS.forEach((_, i) => {
      const on = t >= tStage[i] ? M.io((t - tStage[i]) / 0.3) * (i < 3 ? 1 - M.io((t - tStage[i + 1]) / 0.3) : 1) : 0;
      attr($('#bd' + i), 'fill', mix(C.paper, C.gold3, on)); attr($('#bt' + i), 'fill', mix(C.muted, C.gold, on));
    });
    M.vis($('#cntN'), t, tM[0] + 0.1, 1e9, { dy: 12 }); M.vis($('#cntL'), t, tM[0] + 0.2, 1e9, { dy: 8 });
    M.setT($('#cntN'), String(Math.round(fS(x))));
    // the future: dashed decline if nothing changes
    { const u = M.io((t - tM[7] - 0.2) / Math.max(0.6, tFall - tM[7])); attr($('#futR'), 'width', (400 * u).toFixed(1)); }
    M.vis($('#futT'), t, tFall, 1e9, { dy: 0, fade: 0.2 });
    // "Laddoo Lab today" marker under the dot
    const hx = 48 + 600, hy = 88 + Y(fS(600));
    const h = $('#here'); M.vis(h, t, tToday - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); h.style.left = (hx - 32) + 'px'; h.style.top = (hy + 34) + 'px';
    const ht = $('#hereT'); M.vis(ht, t, tToday + 0.1, 1e9, { dx: 16, dy: 0 }); ht.style.left = (hx - 48 - geo.hw) + 'px'; ht.style.top = (hy + 46) + 'px';
    // right panes
    for (let k = 0; k < 5; k++) {
      const tin = k ? tStage[k - 1] : tM0 + 0.4, tout = k < 4 ? (k ? tStage[k] : tStage[0]) - 0.14 : 1e9;
      const pn = $('#sp' + k), off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      pn.querySelectorAll('.sr4').forEach((r, j) => M.vis(r, t, tin + 0.3 + j * 0.12, tout, { dy: 16, ...oo }));
    }
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

  /* ===== P: a plan for each stage ===== */
  const pOn = t >= tTu - 0.05 && t < tR0 + 0.2; M.hide($('#sP'), !pOn);
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

  /* ===== R: three ways to refresh ===== */
  const rOn = t >= tR0 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ri = $('#rI'); M.vis(ri, t, tR0 + 0.1, tRout, { dy: 36, ...o }); grow(ri, $('#rIOut'), t, tR[0]);
    M.vis($('#rImg'), t, tR0 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#rW'), t, tR[0] + 0.12, tRout, { dx: 60, dy: 0, ...o });
    R3.forEach(([ic], i) => {
      const el = $('#rr' + i), ta = tR[i], td = i < 2 ? tR[i + 1] : tRout + 1;
      M.vis(el, t, ta - 0.05 + (i === 0 ? 0.25 : 0), 1e9, { dy: 18 });
      const on = M.io((t - ta - 0.2) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = mix(C.ink, '#fff', act); el.querySelector('.rs').style.color = mix(C.ink2, C.gold2, act);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      el.querySelector('.rf').style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, act);
      setIco(el.querySelector('.ri'), ic, act > 0.5 ? C.gold2 : C.gold, 34, 2.2);
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
    M.vis($('#mini'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.draw($('#mC'), t, tX4 + 0.45, 0.7, M.o3);
    { const u = M.io((t - tDevX - 0.2) / 0.3) * (1 - M.io((t - tLove) / 0.3)); $('#mD').style.opacity = u.toFixed(3); M.hide($('#mD'), u <= 0); }
    M.draw($('#mU'), t, tNew - 0.2, 0.5, M.o3); M.vis($('#mUa'), t, tNew + 0.2, 1e9, { dy: 0, fade: 0.1 }); M.vis($('#mUt'), t, tNew + 0.1, 1e9, { dy: 0, fade: 0.2 });
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tNaniX, tKeep][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tNaniX ? C.redBg : C.paper; $('#bb0').style.color = t > tNaniX ? C.red : C.ink;
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
