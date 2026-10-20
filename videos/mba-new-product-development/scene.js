// MBA - Marketing Management, Ep 18: New Product Development (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428', cocoa: '#6B4A2E', mid: '#D9B97A' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  filter: ['M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 17h6', 'M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  rocket: ['M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z', 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z', 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0', 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 9H8', 'M16 13H8', 'M16 17H8'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  flask2: ['M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2', 'M8.5 2h7', 'M7 16h10'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tGuess = wt('H2', 'guessing');
const tC2 = T0('C2'), tPath = wt('C2', 'path'), tStepW = wt('C2', 'step');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tReached = wt('L1', 'reached'), tFlat = wt('L1', 'flat'), tNewL = wt('L2', 'new');
const tTeam = [wt('L3', 'Zoya'), wt('L3', 'Nani'), wt('L3', 'Arjun'), wt('L3', 'Dev')];
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('M0') - 0.32;
const tBl = [wt('D2', 'turning'), wt('D2', 'product'), wt('D2', 'buy')], tFl = [wt('D2', 'idea'), wt('D2', 'product'), wt('D2', 'buy')];
const tEight = wt('D3', 'eight'), tLaunchD = wt('D3', 'launch'), tGates = wt('D4', 'gates'), tStopped = wt('D4', 'stopped');
// M: eight steps
const tM0 = T0('M0'), tMl = Array.from({ length: 10 }, (_, i) => T0('M' + (i + 1)));
const tStep = [tMl[0], tMl[1], tMl[3], tMl[5], tMl[6], tMl[7], tMl[8], tMl[9]];
const tMout = T0('T1') - 0.32;
const tSix = wt('M1', 'six'), tSrc = [wt('M1', 'customers'), wt('M1', 'family'), wt('M1', 'rivals')];
const tCrit = [wt('M2', 'refined'), wt('M2', 'kids'), wt('M2', 'Nani')];
const tDrop = { 1: wt('M3', 'Mango'), 3: wt('M3', 'Sugar'), 5: wt('M3', 'masala') };
const tFlashCrit = { 1: wt('M3', 'fruit'), 5: wt('M3', 'kids') };
const tTwenty = wt('M4', 'twenty'), tWin = wt('M5', 'wins'), tSaved = wt('M5', 'saved'), tCoco = wt('M5', 'Coconut');
const tBusy = wt('M6', 'Busy'), tProfit = wt('M7', 'profit'), tBatch = wt('M8', 'batch'), tRight = wt('M8', 'right');
const tForty = wt('M9', 'Forty'), tThirty = wt('M9', 'Thirty'), tLaunch = wt('M10', 'launches');
// statement + cost
const tT = T0('T1'), tSt2 = wt('T1', 'Only'), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP = [0, 1, 2, 3].map(i => T0('P' + i)), tPout = T0('K0') - 0.32, tEach = wt('P0', 'each');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'phone'), wt('K2', 'bank'), wt('K3', 'food'), wt('K4', 'carmaker')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'flops'), wt('X2', 'facts')], tXh = [wt('X3', 'time'), wt('X3', 'copy')];
const tDevX = wt('X4', 'Dev'), tNaniX = wt('X4', 'Nani'), tFam = wt('X5', 'families'), tFix = wt('X5', 'fixes'), tAct = wt('X6', 'Cooper');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'small');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'idea'), wt('S2', 'launch')], [wt('S3', 'cheap')], [wt('S4', 'before')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const laddoo = (x, y, r, fill = C.ld, dk = C.ldD) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${fill}" stroke="${dk}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.3}" r="${r * 0.13}" fill="${dk}"/><circle cx="${r * 0.3}" cy="${-r * 0.1}" r="${r * 0.11}" fill="${dk}"/><circle cx="${-r * 0.05}" cy="${r * 0.38}" r="${r * 0.12}" fill="${dk}"/></g>`;
// A: a month of days
$('#dgrid').innerHTML = Array.from({ length: 30 }, (_, i) => `<div class="dd" id="d${i}" style="left:${(i % 15) * 56}px;top:${Math.floor(i / 15) * 42}px"></div>`).join('');
$('#cDaysI').innerHTML = M.icon('calendar', 24, C.gold, 2.4); $('#cLostI').innerHTML = M.icon('x', 24, C.red, 2.6);
const METH = [['x', 'Guess blind', 1], ['check', 'Test each step', 0]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="stp" id="mt${i}" style="top:76px;${bad ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, bad ? C.red : C.gold, 2.6)}<span>${m}</span></div>`).join('');
// L: curve recap + team
$('#flatPI').innerHTML = M.icon('trendUp', 20, C.red, 2.6);
$('#crvS').innerHTML = `<line x1="0" y1="136" x2="712" y2="136" stroke="#E2DACB" stroke-width="3"/>
  <path id="lcC" d="M0 130 C150 128 230 48 340 34 C400 28 460 28 560 28" fill="none" stroke="#B8862F" stroke-width="6" stroke-linecap="round"/>
  <path id="lcN" d="M560 28 C610 26 646 16 690 8" fill="none" stroke="#14213D" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 10"/>
  <text id="lcT" x="700" y="60" text-anchor="end" font-family="Poppins" font-weight="700" font-size="14" letter-spacing="2" fill="#14213D">+ SOMETHING NEW</text>
  <circle id="lcD" cx="560" cy="28" r="11" fill="#B8862F" stroke="#fff" stroke-width="4"/>
  ${[['INTRODUCTION', 70], ['GROWTH', 260], ['MATURITY', 470]].map(([n, x]) => `<text x="${x}" y="158" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">${n}</text>`).join('')}`;
const TEAM = [['zoya', 'Zoya', 'LEADS'], ['nani', 'Nani', 'TASTE'], ['arjun', 'Arjun', 'COST'], ['dev', 'Dev', 'PACK']];
$('#tRow').innerHTML = TEAM.map(([f, n, r], i) => { const cx = 125 + i * 178; return `<div class="av face tav" id="tv${i}" style="left:${cx - 36}px;${FACE(f)}">${n[0]}</div><div class="tnm" id="tn${i}" style="left:${cx - 80}px">${n}</div><div class="trl" id="tr${i}" style="left:${cx - 80}px">${r}</div>`; }).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D: flow row, 8 steps, stage-gate
const FL = [['bulb', 'IDEA'], ['package', 'PRODUCT'], ['coin', 'PEOPLE BUY']];
$('#flowR').innerHTML = FL.map(([ic, l], i) => `<div class="flow" id="fl${i}" style="left:${i * 244}px"><i>${M.icon(ic, 44, C.gold, 2.2)}</i><span>${l}</span></div>` +
  (i < 2 ? `<svg class="fa2" id="fla${i}" width="44" height="24" style="left:${200 + i * 244}px"><path d="M8 12 H34 M26 5 L34 12 L26 19" fill="none" stroke="#B9B1A3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '')).join('');
$('#k8PI').innerHTML = M.icon('rocket', 22, C.gold2, 2.2);
$('#n8Row').innerHTML = Array.from({ length: 8 }, (_, i) => `<div class="n8" id="n8${i}" style="left:${36 + i * 84}px">0${i + 1}</div>`).join('');
$('#cgS').innerHTML = [0, 1, 2].map(i => `<rect x="${i * 272}" y="44" width="168" height="72" rx="16" fill="#F5F1E8"/><text x="${i * 272 + 84}" y="87" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2" fill="#8A8274">STAGE ${i + 1}</text>`).join('') +
  [0, 1].map(i => `<g id="gt${i}"><rect x="${212 + i * 272}" y="22" width="16" height="116" rx="6" fill="#14213D"/><text x="${220 + i * 272}" y="14" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="2" fill="#B8862F">GATE</text></g>`).join('') +
  `<circle id="gdG" cx="24" cy="80" r="12" fill="#B8862F" stroke="#fff" stroke-width="3"/><circle id="gdR" cx="24" cy="80" r="12" fill="#B5482F" stroke="#fff" stroke-width="3"/>
   <g id="gdX" transform="translate(190 80)"><path d="M-8 -8 8 8 M8 -8 -8 8" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/></g>
   <text id="gdT" x="220" y="162" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="14" letter-spacing="2" fill="#B5482F">WEAK IDEA STOPPED</text>
   <text id="gdT2" x="704" y="162" text-anchor="end" font-family="Poppins" font-weight="700" font-size="14" letter-spacing="2" fill="#B8862F">STRONG IDEA GOES ON</text>`;
wrap($('#kq'), 'kqOut', 784, 580);

/* M: the eight-step run */
const NX = i => 40 + i * 1424 / 7;
const STEPS = ['IDEAS', 'SCREEN', 'CONCEPT', 'STRATEGY', 'BUSINESS', 'BUILD', 'TEST', 'LAUNCH'];
$('#trk').innerHTML = `<line x1="40" y1="30" x2="1464" y2="30" stroke="#E2DACB" stroke-width="4" stroke-linecap="round"/><line id="trkF" x1="40" y1="30" x2="40" y2="30" stroke="#B8862F" stroke-width="4" stroke-linecap="round"/>` +
  STEPS.map((s, i) => `<g id="nd${i}" transform="translate(${NX(i)} 30)"><circle r="22" fill="#FFFFFF" stroke="#E2DACB" stroke-width="3"/><text y="7" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="17" fill="#B9B1A3">${i + 1}</text></g><text id="nl${i}" x="${NX(i)}" y="84" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#B9B1A3">${s}</text>`).join('');
const IDEAS = [['laddoo', 'Cocoa-ragi'], ['sun', 'Mango laddoo'], ['leaf', 'Coconut-jowar'], ['ban', 'Sugar free'], ['zap', 'Protein bar'], ['flame', 'Spicy masala']];
const VOTES = { 0: 12, 2: 6, 4: 2 };
$('#chips').innerHTML = IDEAS.map(([ic, n], i) => `<div class="ic2" id="ic${i}" style="left:${48 + (i % 2) * 408}px;width:${i % 2 ? 296 : 376}px;top:${250 + Math.floor(i / 2) * 88}px"><div class="bg"></div><div class="ii"></div><div class="in">${n}</div><div class="xs"></div><div class="vb"></div><div class="vn"></div><div class="sv">SAVED</div></div>`).join('');
document.querySelectorAll('.ic2 .in').forEach(el => { el.style.top = '12px'; });
document.querySelectorAll('.ic2 .vb').forEach(el => { el.style.right = 'auto'; el.style.left = '76px'; el.style.top = '50px'; el.style.height = '8px'; });
$('#idCI').innerHTML = M.icon('bulb', 20, C.gold, 2.4);
$('#prodTI').innerHTML = M.icon('laddoo', 20, '#fff', 2.4); $('#launchPI').innerHTML = M.icon('rocket', 20, C.gold2, 2.2);
const row4 = (id, top, ic, kl, kt, extra = '') => `<div class="pr4" id="${id}" style="top:${top}px"><div class="bg"></div><div class="ri">${M.icon(ic, 26, C.gold, 2.2)}</div><div class="kl">${kl}</div><div class="kt">${kt}</div>${extra}</div>`;
const PANE_SRC = [['users', 'CUSTOMERS', 'What tiffin parents ask for'], ['home', 'FAMILY', "Nani's old recipes"], ['store', 'RIVALS', 'What the bakery sells']];
const PANE_CRIT = [['leaf', 'RULE 1', 'No refined sugar'], ['smile', 'RULE 2', 'Kids must love it'], ['home', 'RULE 3', 'Nani can make it all year']];
$('#prows').innerHTML =
  `<div class="abs" id="pnS"><div class="lbl zl" style="left:800px">WHERE IDEAS COME FROM</div>${PANE_SRC.map(([ic, l, v], k) => row4('ps' + k, 250 + k * 72, ic, l, v)).join('')}</div>` +
  `<div class="abs" id="pnC"><div class="lbl zl" style="left:800px">THE SCREEN · THREE RULES</div>${PANE_CRIT.map(([ic, l, v], k) => row4('pc' + k, 250 + k * 72, ic, l, v, `<div class="ok2" id="pcok${k}">${M.icon('check', 20, '#fff', 3)}</div>`)).join('')}</div>` +
  `<div class="abs" id="pnV"><div class="lbl zl" style="left:800px">CONCEPT TEST · 20 TIFFIN PARENTS</div>` +
    Array.from({ length: 20 }, (_, i) => `<div class="av" id="pv${i}" style="left:${800 + (i % 10) * 64}px;top:${254 + Math.floor(i / 10) * 64}px;width:52px;height:52px;border-radius:26px;background:#E2DACB"></div>`).join('') +
    [['Cocoa-ragi', C.gold, 12], ['Coconut-jowar', C.mid, 6], ['Protein bar', C.ink, 2]].map(([n, c, v], k) => `<div class="pill" id="lg${k}" style="top:398px;background:#F5F1E8"><span style="width:16px;height:16px;border-radius:8px;background:${c};display:block"></span><span>${n}</span><b style="font:700 22px Poppins">${v}</b></div>`).join('') + `</div>` +
  `<div class="abs" id="pnP"><div class="lbl zl" style="left:800px">THE PRODUCT</div>` +
    row4('pr0', 250, 'target', 'STEP 04 · MARKETING STRATEGY', 'Busy parents · ₹120 for six') +
    row4('pr1', 322, 'coin', 'STEP 05 · BUSINESS ANALYSIS', 'A profit on every pack', `<div class="ok2" id="prok1">${M.icon('check', 20, '#fff', 3)}</div>`) +
    row4('pr2', 394, 'flask2', 'STEP 06 · PRODUCT DEVELOPMENT', 'Batch 1', [0, 1, 2, 3].map(k => `<div class="bdot" id="bd${k}" style="right:${20 + (3 - k) * 26}px"></div>`).join('')) +
    row4('pr3', 466, 'users', 'STEP 07 · TEST MARKETING', '0 of 40 order again', Array.from({ length: 40 }, (_, i) => `<div class="tdot" id="td${i}" style="right:${20 + (19 - (i % 20)) * 12}px;top:${18 + Math.floor(i / 20) * 18}px"></div>`).join('')) +
  `</div>`;
// voting order: 12 cocoa, 6 coconut, 2 protein, spread across the grid
const VOTE_OF = Array.from({ length: 20 }, (_, i) => [0, 0, 2, 0, 0, 4, 0, 2, 0, 0, 2, 0, 0, 2, 0, 4, 0, 2, 0, 2][i]);

// P: cost bars
const BH = Array.from({ length: 8 }, (_, i) => Math.round(16 * Math.pow(1.46, i)));
$('#csS').innerHTML = `<line x1="0" y1="240" x2="688" y2="240" stroke="#E2DACB" stroke-width="3"/>` +
  BH.map((h, i) => `<rect id="cb${i}r" x="${i * 89}" y="${240 - h}" width="64" height="${h}" rx="10" fill="#E2DACB"/><text x="${i * 89 + 32}" y="266" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="1" fill="#8A8274">${String(i + 1).padStart(2, '0')}</text>`).join('');
$('#csp0I').innerHTML = M.icon('file', 22, C.gold, 2.4); $('#csp1I').innerHTML = M.icon('x', 22, C.red, 2.6); $('#gatePI').innerHTML = M.icon('shield', 26, C.gold2, 2.2);
$('#cb0I').innerHTML = M.icon('file', 34, C.gold, 2.2); $('#cb1I').innerHTML = M.icon('package', 34, C.red, 2.2);
wrap($('#cs'), 'csOut', 784, 580);

// K: at work today
const KA = [
  ['bulb', 'Ideas', 'Collect them from everyone', 'Customers, family and rivals', 'phone', 'A phone maker collects ideas from its users'],
  ['filter', 'Screening', 'Drop what does not fit', 'Mango, sugar free and masala go', 'bank', 'A bank drops a loan idea that breaks rules'],
  ['users', 'Testing', 'Try small before big', 'Forty families try cocoa-ragi', 'pin', 'A delivery app tests a feature in one city'],
  ['rocket', 'Launch', 'Go big, all at once', 'Cocoa-ragi goes to every customer', 'car', 'A carmaker opens bookings nationwide'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['NEW PRODUCTS TODAY', 'Four moves', 'Every company that launches makes them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A HOME KITCHEN TO A CAR FACTORY</div><div class="pe"><i>${M.icon('rocket', 34, C.gold, 2.2)}</i><span>Ideas, screening, testing, launch</span></div>`) + `</div>`).join('');

// X: the human side
const XG = [['shield', 'Fewer costly flops'], ['search', 'Choices on facts']];
const XH = [['clock', 'Testing takes time'], ['eye', 'Rivals may copy']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#cocoa').innerHTML = `<rect width="240" height="312" rx="20" fill="#F5F1E8"/>
  <text x="24" y="40" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">COCOA LEVEL</text>
  <rect x="40" y="64" width="56" height="204" rx="14" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/>
  <rect id="cocF" x="44" y="100" width="48" height="164" rx="10" fill="#6B4A2E"/>
  <line x1="104" y1="104" x2="124" y2="104" stroke="#B5482F" stroke-width="3"/><text id="cocB" x="132" y="109" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="1.5" fill="#B5482F">TOO MUCH</text>
  <line id="cocAl" x1="104" y1="154" x2="124" y2="154" stroke="#B8862F" stroke-width="3"/><text id="cocA" x="132" y="159" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="1.5" fill="#B8862F">JUST RIGHT</text>
  ${laddoo(176, 238, 22, C.cocoa, '#4A3220')}
  <text x="24" y="296" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="2" fill="#8A8274">COCOA-RAGI</text>`;
$('#bb2I').innerHTML = M.icon('message', 20, C.ink, 2.4) || '';
$('#factI').innerHTML = M.icon('shield', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('users', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Idea screening', 'Business analysis', 'Test marketing', 'Commercialization'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['rocket', 'Eight steps', ['From idea', 'to launch']], ['shield', 'Gates stop weak ideas early', ['While it is cheap']], ['users', 'Real customers test it first', ['Before the big launch']]];
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
const stepAt = t => { let s = -1; tStep.forEach((ts, i) => { if (t >= ts) s = i; }); return s; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 2; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const cl = $('#cLost'); cl.style.left = (884 - cl.offsetWidth) + 'px';
  const dq = $('#dq'); if (dq.offsetWidth > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dq.offsetWidth) + 'px';
  $('#k8P').style.left = (36 + $('#k8N').offsetWidth + 28) + 'px';
  $('#idC').style.left = (48 + document.querySelector('#npd .zl').offsetWidth + 20) + 'px';
  $('#prodT').style.left = (800 + $('#pnP .zl').offsetWidth + 20) + 'px';
  const lp = $('#launchP'); lp.style.left = (1552 - lp.offsetWidth) + 'px';
  x = 800; for (let k = 0; k < 3; k++) { const l = $('#lg' + k); l.style.left = x + 'px'; x += l.offsetWidth + 16; }
  const c1 = $('#csp1'); c1.style.left = (736 - c1.offsetWidth) + 'px';
  document.querySelectorAll('.cb .kt').forEach(el => { if (el.offsetWidth > 656) el.style.fontSize = Math.floor(26 * 656 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.xr .bb').forEach(el => { if (el.offsetWidth > 332) el.style.fontSize = Math.floor(22 * 332 / el.offsetWidth) + 'px'; });
  { const k = $('#fact .kt'); if (k.offsetWidth > 560) k.style.fontSize = Math.floor(28 * 560 / k.offsetWidth) + 'px'; }
  { let f = 40; OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) f = Math.min(f, Math.floor(40 * 312 / o.offsetWidth)); }); OPTS.forEach((_, i) => { $('#o' + i + ' .ot').style.fontSize = f + 'px'; }); }
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
  M.vis($('#exChip'), t, tTwenty - 0.2, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: one wrong guess ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.45, 1e9, { dy: 40, sp: M.SOFT });
    M.vis($('#tbl'), t, tMorph + 0.35, 1e9, { dy: 20 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    const td0 = tMorph + 0.55, dstep = Math.max(0.03, (tGuess - 0.2 - td0) / 30);
    for (let i = 0; i < 30; i++) {
      const el = $('#d' + i), ta = td0 + i * dstep;
      M.vis(el, t, td0 - 0.05 + i * 0.01, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.06 });
      const f = M.io((t - ta) / 0.15), r = M.io((t - tGuess - 0.15 - i * 0.012) / 0.25);
      el.style.background = mix(mix(C.line, C.gold, f), C.red2, r);
    }
    M.vis($('#cDays'), t, td0, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.count($('#cDaysN'), t, td0, Math.max(0.5, tGuess - 0.2 - td0), 0, 30);
    M.vis($('#cLost'), t, tGuess + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, Math.min(tGuess - 0.05, tMorph + 0.8), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mt1'), t, tStepW - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tPath - 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: the team plans something new ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tReached);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#crv'), t, tReached + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.draw($('#lcC'), t, tReached + 0.3, 0.9, M.o3);
    M.vis($('#lcD'), t, tReached + 1.1, 1e9, { dy: 0, fade: 0.12 });
    M.vis($('#flatP'), t, tFlat - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    { const u = M.io((t - tNewL + 0.1) / 0.5), n = $('#lcN'); n.style.clipPath = `inset(0 ${((1 - u) * 100).toFixed(1)}% 0 0)`; M.hide(n, u <= 0); }
    M.vis($('#lcT'), t, tNewL + 0.3, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#team'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    TEAM.forEach((_, i) => {
      const ta = i === 0 ? Math.min(tTeam[0], tL3 + 0.3) : tTeam[i] - 0.05;
      M.vis($('#tv' + i), t, ta, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#tn' + i), t, ta + 0.08, 1e9, { dy: 10 }); M.vis($('#tr' + i), t, ta + 0.14, 1e9, { dy: 8 });
      const on = M.io((t - ta) / 0.25) * (1 - (i < 3 ? M.io((t - tTeam[i + 1] + 0.05) / 0.25) : 0));
      $('#tv' + i).style.boxShadow = '0 0 0 4px ' + mix(C.ink, C.gold, on);
    });
  }

  /* ===== D: what is new product development ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    for (let i = 0; i < 3; i++) M.rise($('#bl' + i), t, Math.max(tD2 + 0.15, tBl[i] - 0.15), { st: 0.06, sp: M.HEAVY });
    M.vis($('#kqHr'), t, tD2 + 0.4, 1e9, { dy: 0 });
    for (let i = 0; i < 3; i++) {
      M.vis($('#fl' + i), t, tFl[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      if (i < 2) M.vis($('#fla' + i), t, tFl[i + 1] - 0.2, 1e9, { dx: -10, dy: 0, fade: 0.15 });
      const on = M.io((t - tFl[i]) / 0.25), ic = $('#fl' + i + ' i');
      ic.style.background = mix(C.paper, i === 2 ? C.ink : C.gold3, on);
      setIco(ic, FL[i][0], i === 2 && on > 0.5 ? C.gold2 : C.gold, 44, 2.2);
    }
    M.vis($('#k8'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.rise($('#k8N'), t, tEight - 0.1, { st: 0.06, sp: M.HEAVY });
    M.vis($('#k8P'), t, tLaunchD - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    for (let i = 0; i < 8; i++) {
      const el = $('#n8' + i), ta = tEight + 0.1 + i * 0.09; M.vis(el, t, ta, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const g = M.io((t - tLaunchD - 0.1 - i * 0.05) / 0.2); el.style.background = mix(C.paper, i === 7 ? C.ink : C.gold3, g); el.style.color = i === 7 ? mix(C.ink, '#fff', g) : C.ink;
    }
    M.vis($('#cg'), t, tD4 + 0.05, tDout, { dy: 36, ...o });
    const gx = M.lerp(24, 690, M.io((t - tGates - 0.1) / 2.6)), rx = M.lerp(24, 190, M.io((t - tGates) / 1.0));
    attr($('#gdG'), 'cx', gx.toFixed(1)); attr($('#gdR'), 'cx', rx.toFixed(1));
    M.vis($('#gdG'), t, tGates - 0.1, 1e9, { dy: 0, fade: 0.12 }); M.vis($('#gdR'), t, tGates - 0.1, 1e9, { dy: 0, fade: 0.12 });
    M.vis($('#gdX'), t, Math.max(tGates + 1.0, tStopped - 0.1), 1e9, { dy: 0, fade: 0.1 });
    M.vis($('#gdT'), t, Math.max(tGates + 1.0, tStopped - 0.1), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#gdT2'), t, tGates + 2.4, 1e9, { dy: 0, fade: 0.2 });
    [0, 1].forEach(i => attr($('#gt' + i).querySelector('rect'), 'fill', t > tGates + 0.3 + i * 1.0 && gx > 200 + i * 272 ? C.gold : C.ink));
  }

  /* ===== M: eight steps, live ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#npd'), t, tM0 + 0.05, tMout, { dy: 36, ...o });
    M.vis($('#trk'), t, tM0 + 0.2, 1e9, { dy: 12 });
    M.vis($('#npdHr'), t, tM0 + 0.3, 1e9, { dy: 0 });
    M.vis($('#npd > .zl'), t, tM0 + 0.35, 1e9, { dy: 8 });
    const s = stepAt(t);
    // track
    const fx = s < 0 ? 40 : M.lerp(NX(Math.max(0, s - 1)), NX(s), M.io((t - tStep[s]) / 0.5));
    attr($('#trkF'), 'x2', fx.toFixed(1));
    for (let i = 0; i < 8; i++) {
      const g = $('#nd' + i), c = g.querySelector('circle'), tx = g.querySelector('text');
      const act = i === s, done = i < s || (i === 7 && t >= tLaunch + 0.3);
      attr(c, 'fill', done ? C.gold : act ? C.ink : '#FFFFFF'); attr(c, 'stroke', done ? C.gold : act ? C.gold : C.line); attr(c, 'stroke-width', act ? 4 : 3);
      attr(tx, 'fill', done || act ? '#FFFFFF' : C.dim); attr($('#nl' + i), 'fill', act ? C.ink : done ? C.gold : C.dim);
      if (act && t < tStep[i] + 0.4) attr(g, 'transform', `translate(${NX(i)} 30) scale(${(1 + 0.12 * Math.sin(Math.PI * M.clamp((t - tStep[i]) / 0.4))).toFixed(4)})`);
      else attr(g, 'transform', `translate(${NX(i)} 30)`);
    }
    // idea chips
    M.vis($('#idC'), t, tSix - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const left = t < tDrop[5] + 0.2 ? '6 ideas' : t < tWin ? '3 left' : '1 winner';
    M.setT($('#idCT'), left);
    const tApp = i => tSix + i * Math.max(0.25, (tSrc[2] - tSix) / 6);
    IDEAS.forEach(([ic], i) => {
      const el = $('#ic' + i), bg = el.querySelector('.bg');
      M.vis(el, t, tApp(i), 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
      const dropT = tDrop[i] ?? (i === 4 ? tWin + 0.4 : null);
      const dr = dropT ? M.io((t - dropT) / 0.3) : 0;
      const win = i === 0 ? M.io((t - tWin) / 0.3) : 0, sav = i === 2 ? M.io((t - tSaved) / 0.3) : 0;
      bg.style.background = mix(mix(mix(C.paper, C.paper2, dr), C.ink, win), C.gold3, sav);
      el.querySelector('.in').style.color = mix(mix(C.ink, C.dim, dr), '#fff', win);
      const ii = el.querySelector('.ii'); ii.style.background = win > 0.5 ? C.navy2 : '#fff';
      setIco(ii, dr > 0.5 ? 'x' : ic, dr > 0.5 ? C.red : win > 0.5 ? C.gold2 : C.gold, 24, 2.4);
      const xs = el.querySelector('.xs'); const sw2 = el.querySelector('.in').offsetWidth + 8;
      xs.style.width = (sw2 * M.io((t - (dropT ?? 1e9)) / 0.3)).toFixed(1) + 'px'; M.hide(xs, !dropT || t < dropT);
      // votes
      const v = VOTES[i];
      const vb = el.querySelector('.vb'), vn = el.querySelector('.vn');
      if (v != null && t >= tTwenty) {
        const u = M.o3((t - tTwenty - 0.3) / 1.6);
        M.hide(vb, sav > 0.5); M.hide(vn, sav > 0.5);
        vb.style.width = (176 * v / 12 * u).toFixed(1) + 'px'; vb.style.background = win > 0.5 ? C.gold2 : (i === 4 ? C.dim : C.gold);
        M.setT(vn, String(Math.round(v * u))); vn.style.color = win > 0.5 ? '#fff' : (dr > 0.5 ? C.dim : C.gold);
      } else { M.hide(vb, true); M.hide(vn, true); }
      M.vis(el.querySelector('.sv'), t, i === 2 ? tSaved : 1e9, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    });
    // right zone panes
    const panes = [['pnS', tSix, tMl[1] - 0.14], ['pnC', tMl[1], tMl[3] - 0.14], ['pnV', tMl[3], tMl[5] - 0.14], ['pnP', tMl[5], 1e9]];
    panes.forEach(([id, a, b]) => { const pn = $('#' + id), off = t < a - 0.01 || t > b + 0.3; M.hide(pn, off); if (!off) M.vis(pn, t, a, b, { dy: 14, outDur: 0.18, ody: -12 }); });
    PANE_SRC.forEach((_, k) => M.vis($('#ps' + k), t, tSrc[k] - 0.1, 1e9, { dy: 12 }));
    PANE_CRIT.forEach((_, k) => {
      const el = $('#pc' + k); M.vis(el, t, tMl[1] + 0.3 + k * 0.1, 1e9, { dy: 12 });
      const on = M.io((t - tCrit[k]) / 0.25), fl = Object.entries(tFlashCrit).reduce((a, [i, ft]) => a + ((+i === 1 && k === 2) || (+i === 5 && k === 1) ? M.io((t - ft) / 0.2) * (1 - M.io((t - ft - 0.9) / 0.3)) : 0), 0);
      el.querySelector('.bg').style.background = mix(mix(C.paper, C.gold3, on), C.redBg, fl);
      M.vis($('#pcok' + k), t, tCrit[k], 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    });
    for (let i = 0; i < 20; i++) {
      const el = $('#pv' + i), vt = tTwenty + 0.3 + i * 0.08, vo = VOTE_OF[i];
      M.vis(el, t, tMl[3] + 0.3 + i * 0.03, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      el.style.background = mix(C.line, vo === 0 ? C.gold : vo === 2 ? C.mid : C.ink, M.io((t - vt) / 0.2));
    }
    for (let k = 0; k < 3; k++) M.vis($('#lg' + k), t, tTwenty + 1.9 + k * 0.12, 1e9, { dy: 10 });
    M.vis($('#prodT'), t, tMl[5] + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // product rows
    M.vis($('#pr0'), t, tMl[5] + 0.2, 1e9, { dy: 12 });
    M.vis($('#pr1'), t, tMl[6] + 0.1, 1e9, { dy: 12 }); M.vis($('#prok1'), t, tProfit, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.vis($('#pr2'), t, tMl[7] + 0.1, 1e9, { dy: 12 });
    { const bt = M.clamp((t - tBatch) / Math.max(0.8, tRight - tBatch)), n = Math.min(4, 1 + Math.floor(bt * 4));
      M.setT($('#pr2 .kt'), t >= tRight ? 'Batch 4: the taste is right' : `Batch ${t < tBatch ? 1 : n}`);
      for (let k = 0; k < 4; k++) $('#bd' + k).style.background = t >= tBatch && k < (t >= tRight ? 4 : n) ? (k === 3 && t >= tRight ? C.gold : C.mid) : C.line; }
    M.vis($('#pr3'), t, tMl[8] + 0.1, 1e9, { dy: 12 });
    { const n = Math.round(32 * M.o3((t - tThirty) / 1.2)); M.setT($('#pr3 .kt'), `${t < tThirty ? 0 : n} of 40 order again`);
      for (let i = 0; i < 40; i++) { const d = $('#td' + i); M.vis(d, t, tForty + i * 0.02, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 }); d.style.background = t >= tThirty && i < n ? C.gold : C.line; } }
    [0, 1, 2, 3].forEach(k => { const el = $('#pr' + k), ta = tStep[3 + k], td = tStep[4 + k]; const act = M.io((t - ta) / 0.25) * (1 - M.io((t - td) / 0.3)); el.querySelector('.bg').style.background = mix(C.paper, C.gold3, act); });
    M.vis($('#launchP'), t, tLaunch - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== P: the cost of stopping ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    const cs = $('#cs'); M.vis(cs, t, tP0 + 0.05, tPout, { dy: 36, ...o }); grow(cs, $('#csOut'), t, tP[1]);
    M.vis($('#csS'), t, tP0 + 0.25, 1e9, { dy: 16 });
    BH.forEach((h, i) => {
      const el = $('#cb' + i + 'r'), p = M.spring(t - tEach - i * 0.12, M.SOFT);
      attr(el, 'height', (h * p).toFixed(1)); attr(el, 'y', (240 - h * p).toFixed(1));
      const g = i === 0 ? M.io((t - tP[1]) / 0.3) : 0, r = i === 7 ? M.io((t - tP[2]) / 0.3) : 0;
      attr(el, 'fill', mix(mix(mix(C.line, C.dim, M.io((t - tEach - i * 0.12) / 0.3)), C.gold, g), C.red, r));
    });
    M.vis($('#csp0'), t, tP[1] + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#csp1'), t, tP[2] + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#gateP'), t, tP[3] + 0.05, 1e9, { dy: 24 });
    M.vis($('#cr'), t, tP[1] + 0.12, tPout, { dx: 60, dy: 0, ...o });
    M.vis($('#cb0'), t, tP[1] + 0.3, 1e9, { dy: 16 });
    M.vis($('#cb1'), t, tP[2] + 0.05, 1e9, { dy: 16 });
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
    M.vis($('#cocoa'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    { const lv = M.lerp(164, 110, M.io((t - tFix) / 0.6)); attr($('#cocF'), 'height', lv.toFixed(1)); attr($('#cocF'), 'y', (264 - lv).toFixed(1)); }
    M.vis($('#cocA'), t, tFix + 0.4, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#cocAl'), t, tFix + 0.4, 1e9, { dy: 0, fade: 0.2 });
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tNaniX, tFam][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tNaniX ? C.redBg : C.paper; $('#bb0').style.color = t > tNaniX ? C.red : C.ink;
    $('#bb2').style.background = t > tFix ? C.gold : C.paper; $('#bb2').style.color = t > tFix ? '#fff' : C.ink;
    setIco($('#bb2I'), t > tFix ? 'check' : 'message', t > tFix ? '#fff' : C.gold, 20, 2.6);
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
