// MBA - Principles of Management, Ep 15: Planning and Goal Setting
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 22a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  pulse: ['M22 12h-4l-3 9L9 3l-3 9H2'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  compass: ['m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z', 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z'],
  recycle: ['M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5', 'M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12', 'm14 16-3 3 3 3', 'M8.293 13.596 7.196 9.5 3.1 10.598', 'm9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843', 'm13.378 9.633 4.096 1.098 1.097-4.096'],
  hourglass: ['M5 22h14', 'M5 2h14', 'M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22', 'M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2'],
  unlink: ['m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71', 'm5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71', 'M8 2v3', 'M2 8h3', 'M16 22v-3', 'M22 16h-3'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  grad: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M7 18h7', 'M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  footprints: ['M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z', 'M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tSell = wt('H2', 'Sell'), tNoPlan = wt('H2', 'no');
const tC1 = T0('C1'), tMilk = wt('C1', 'milk'), tC2 = T0('C2'), tC3 = T0('C3'), tSales = wt('C3', 'sales');
const tB1 = T0('B1'), tAout = tB1 - 0.32, tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = tB1 - 0.32;
const tB2 = T0('B2'), tB3 = T0('B3'), tBout = T0('D1') - 0.32;
const tPQ = [[wt('B2', 'What'), wt('B2', 'Serve')], [wt('B2', 'How'), wt('B2', 'Asha')], [wt('B3', 'When'), wt('B3', 'seven')], [wt('B3', 'who'), wt('B3', 'Meena')]];
const tD1 = T0('D1'), tD2 = T0('D2'), tAdv = wt('D2', 'advance'), tDw = ['what', 'how', 'when', 'who'].map(w => wt('D2', w)), tDout = T0('F0') - 0.32;
// F: seven steps
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5, 6, 7].map(i => T0('F' + i)), tFout = T0('L1') - 0.32;
const tObj = wt('F1', 'Two'), tWalk = wt('F2', 'walk'), tOpt = [wt('F3', 'college'), wt('F3', 'bus'), wt('F3', 'market')];
const tCmp = [wt('F4', 'Rent'), wt('F4', 'crowd'), wt('F4', 'rival')], tWins = wt('F5', 'wins'), tF6w = [wt('F6', 'Hire'), wt('F6', 'order')], tCheck = wt('F7', 'check');
// L: three sizes
const tL1 = T0('L1'), tL = [wt('L1', 'Strategic'), T0('L2'), T0('L3')], tLx = [wt('L1', 'Five'), wt('L2', 'Open'), wt('L3', 'Tomorrow')], tLout = T0('G0') - 0.32;
// G: SMART
const tG0 = T0('G0'), tVague = wt('G0', 'vague'), tG1 = T0('G1'), tDoran = wt('G1', 'Doran'), tSmart = wt('G1', 'SMART');
const tG = [T0('G2'), T0('G3'), T0('G4'), T0('G5'), T0('G6')], tGw = [wt('G2', 'Chai'), wt('G3', 'Two'), wt('G4', 'Three'), wt('G5', 'pays'), wt('G6', 'Within')];
const tG7 = T0('G7'), tGout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'ice'), wt('K3', 'company'), wt('K4', 'sales')];
// X: the human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'direction'), wt('X2', 'waste')], tXh = [wt('X3', 'time'), wt('X3', 'break')];
const tSaying = wt('X4', 'saying'), tBut = wt('X5', 'but'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It') - 0.1;
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['what', 'how', 'when', 'who'].map(w => wt('S2', w)), [wt('S3', 'objective'), wt('S3', 'follow')], [wt('S4', 'SMART')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// A
const QS = ['What?', 'How?', 'When?', 'Who?'];
$('#qcs').innerHTML = QS.map((q, i) => `<div class="qc" id="qc${i}">${M.icon('help', 22, C.dim, 2.2)}<span>${q}</span></div>`).join('');
const OT = [['milk', 'Milk gone by 10'], ['key', 'Who opens up?'], ['help', 'Sales up or down?']];
$('#ots').innerHTML = OT.map(([ic, t], i) => `<div class="ot2" id="ot${i}" style="left:${36 + i * 288}px"><i></i><div class="tx2">${t}</div></div>`).join('');
// B: four questions
const PQ = [['WHAT?', 'Serve chai at a new outlet', null], ['HOW?', "With Asha's recipe", 'asha'], ['WHEN?', 'From 7 AM, every morning', null], ['WHO?', 'Meena will run it', 'meena']];
$('#pqs').innerHTML = PQ.map(([q, a, f], i) => `<div class="pq" id="pq${i}" style="top:${92 + i * 108}px"><div class="bg"></div><div class="qb">${q}</div><div class="qa" id="pa${i}">${f ? `<i style="${FACE(f)}"></i>` : ''}<span>${a}</span></div></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
const DC = [['target', 'What to do'], ['list', 'How to do it'], ['calendar', 'When'], ['users', 'Who does it']];
$('#dChips').innerHTML = DC.map(([ic, t], i) => `<div class="vc${i === 0 ? ' nv' : ''}" id="dc${i}" style="top:384px;height:80px;padding:0 32px;border-radius:40px;font-size:32px;gap:14px">${M.icon(ic, 32, i === 0 ? C.gold2 : C.gold, 2.2)}<span>${t}</span></div>`).join('');
// F: seven steps
const ST = ['Set the objective', 'Make premises', 'List the options', 'Compare them', 'Choose the best', 'Supporting plans', 'Act and follow up'];
$('#sRows').innerHTML = ST.map((t, i) => `<div class="s7" id="s7${i}" style="top:${84 + i * 66}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="rt">${t}</div></div>`).join('');
const PX = [150, 440, 730], PN = ['College', 'Bus stand', 'Market'], PI = ['grad', 'bus', 'store'];
$('#mapG').innerHTML = `<rect width="880" height="236" rx="22" fill="#F5F1E8"/>
  <path d="M0 156 H880" stroke="#E2DACB" stroke-width="22"/><path d="M295 0 V236 M585 0 V236" stroke="#E2DACB" stroke-width="16"/>
  <path d="M0 156 H880" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="14 14"/>
  ${[[40, 30], [200, 40], [340, 28], [500, 36], [640, 30], [790, 40], [60, 190], [380, 196], [690, 194]].map(([x, y]) => `<rect x="${x}" y="${y}" width="56" height="${y > 150 ? 30 : 44}" rx="8" fill="#EEE8DB"/>`).join('')}
  ${PX.map((x, i) => `<g id="pin${i}" transform="translate(${x} 0)"><path d="M0 132 C-8 116 -26 102 -26 82 A26 26 0 0 1 26 82 C26 102 8 116 0 132Z" fill="#B9B1A3"/><circle cy="82" r="10" fill="#fff"/><text id="pl${i}" y="190" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="20" fill="#14213D">${PN[i]}</text></g>`).join('')}
  <g id="chosen" transform="translate(440 0)"><rect x="-56" y="14" width="112" height="30" rx="15" fill="#B8862F"/><text y="35" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="15" letter-spacing="2" fill="#fff">CHOSEN</text></g>`;
const FF = ['120 / hour', '300 / hour', '200 / hour'];
$('#fcs').innerHTML = FF.map((f, i) => `<div class="fc" id="ff${i}">${M.icon('footprints', 18, C.gold2, 2.2)}<span>${f}</span></div>`).join('');
const CMP = [['Rent', [['Low', 1], ['Medium', 0], ['High', -1]]], ['Crowd', [['Small', -1], ['Huge', 1], ['Big', 0]]], ['Rivals', [['1 stall', 0], ['1 stall', 0], ['4 stalls', -1]]]];
const cell = v => v > 0 ? 'background:#F3EAD6;color:#14213D' : v < 0 ? 'background:#F6E3DC;color:#B5482F' : 'background:#F5F1E8;color:#14213D';
const SP = [
  `<div class="lbl">THE OBJECTIVE · AT THE NEW OUTLET</div><i class="abs" id="o1i" style="left:0;top:52px;width:88px;height:88px;border-radius:44px;background:#14213D;display:flex;align-items:center;justify-content:center">${M.icon('target', 44, C.gold2, 2.2)}</i><div class="serif abs" id="o1t" style="left:116px;top:52px;font-size:72px;white-space:nowrap;line-height:1.1">200 cups <span class="acc">a day</span></div>`,
  `<div class="lbl">PREMISES · FORECASTS ABOUT THE FUTURE</div><div class="abs" id="o2a" style="left:0;top:48px;font:600 30px Poppins;white-space:nowrap">A premise is a careful guess about what will happen.</div><div class="abs" id="o2b" style="left:0;top:104px;font:500 28px Poppins;color:#3A4560;white-space:nowrap">Ravi counts the people passing each spot, every hour.</div>`,
  `<div class="lbl">THE OPTIONS</div>` + PN.map((n, i) => `<div class="abs" id="o3${i}" style="left:${i * 292}px;top:48px;width:264px;height:104px;border-radius:20px;background:#F5F1E8"><i class="abs" style="left:24px;top:24px;width:56px;height:56px;border-radius:28px;background:#fff;display:flex;align-items:center;justify-content:center">${M.icon(PI[i], 28, C.gold, 2.2)}</i><div class="abs" style="left:100px;top:32px;font:600 28px Poppins;white-space:nowrap">${n}</div></div>`).join(''),
  PN.map((n, i) => `<div class="cmh" style="left:${220 + i * 214}px;top:0">${n.toUpperCase()}</div>`).join('') +
   CMP.map(([l, cs], r) => `<div class="cml" id="cl${r}" style="top:${44 + r * 56}px;line-height:40px">${l}</div>` + cs.map(([v, g], i) => `<div class="cmp" id="cc${r}${i}" style="left:${220 + i * 214}px;top:${44 + r * 56}px;${cell(g)}">${v}</div>`).join('')).join(''),
  `<div class="lbl">THE CHOICE</div><div class="serif abs" id="o5t" style="left:0;top:44px;font-size:64px;white-space:nowrap">The <span class="acc">bus stand</span> wins</div><div class="abs" id="o5s" style="left:0;top:132px;font:500 28px Poppins;color:#3A4560;white-space:nowrap">The biggest crowd, a fair rent, and only one rival.</div>`,
  `<div class="lbl">SUPPORTING PLANS</div>` + [['users', 'Hire 2 helpers', ''], ['milk', 'Order milk daily', ''], ['flame', 'Buy 2 stoves', '']].map(([ic, t], i) => `<div class="vc" id="o6${i}" style="top:48px">${M.icon(ic, 24, C.gold, 2.2)}<span>${t}</span></div>`).join('') +
   `<div class="vc nv" id="o63" style="left:0;top:124px"><i style="width:36px;height:36px;border-radius:18px;margin-left:-12px;${FACE('meena')};background-size:cover"></i><span>Meena runs it, Asha trains the helpers</span></div>`,
  `<div class="lbl">ACT, THEN FOLLOW UP EVERY WEEK · CUPS PER DAY</div>` + [150, 170, 190, 210].map((v, i) => `<div class="wk" id="o7${i}" style="left:${i * 217}px"><div class="lbl">WEEK ${i + 1}</div><div class="wc" style="background:${i === 3 ? '#B8862F' : '#14213D'}">${M.icon('check', 20, '#fff', 3)}</div><div class="wv" style="color:${i === 3 ? '#B8862F' : '#14213D'}">${v}</div></div>`).join(''),
];
$('#sps').innerHTML = SP.map((s, i) => `<div class="sp" id="sp${i}">${s}</div>`).join('');
// L: pyramid
const TIER = [['Strategic', 0, 140], ['Tactical', 150, 290], ['Operational', 300, 440]];
const hw = y => 344 * y / 440;
$('#pyG').innerHTML = TIER.map(([n, y0, y1], i) => `<g id="ty${i}"><path id="tp${i}" d="M${(344 - hw(y0)).toFixed(1)} ${y0} H${(344 + hw(y0)).toFixed(1)} L${(344 + hw(y1)).toFixed(1)} ${y1} H${(344 - hw(y1)).toFixed(1)} Z" fill="#F5F1E8" stroke-linejoin="round"/><text id="tt${i}" x="344" y="${(y0 + y1) / 2 + (i ? 10 : 30)}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="${i ? 32 : 26}" fill="#14213D">${n}</text></g>`).join('');
const LV = [['Strategic', 'Five outlets in five years', 'YEARS'], ['Tactical', 'Open the second outlet', 'THIS YEAR'], ['Operational', "Tomorrow's shift chart", 'DAYS']];
$('#lRows').innerHTML = LV.map(([n, x, h], i) => `<div class="lr" id="lr${i}" style="top:${84 + i * 156}px"><div class="bg"></div><div class="serif ln">${n}</div><div class="lx">${x}</div><div class="lh">${h}</div></div>`).join('');
// G: SMART
const GL = [['S', 'Specific'], ['M', 'Measurable'], ['A', 'Achievable'], ['R', 'Relevant'], ['T', 'Time-bound']];
$('#gRows').innerHTML = GL.map(([l, t], i) => `<div class="kr" id="gr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn" style="font-size:26px;top:24px">${l}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const GB = [['S', 'Chai, at the bus stand outlet', 'SPECIFIC'], ['M', '200 cups a day', 'MEASURABLE'], ['A', '300 people pass each hour', 'IN 1981: ASSIGNABLE'], ['R', "It pays the outlet's rent", 'RELEVANT'], ['T', 'Within 4 weeks of opening', 'TIME-BOUND']];
$('#gBits').innerHTML = GB.map(([l, t, e], i) => `<div class="gr" id="gb${i}" style="top:${156 + i * 62}px"><b>${l}</b><span>${t}</span><em>${e}</em></div>`).join('');
$('#doranI').innerHTML = M.icon('book', 20, C.gold, 2.2); $('#gFinI').innerHTML = M.icon('target', 30, C.gold2, 2.2);
// K: at work today
const KA = [
  ['target', 'Objectives', 'Say exactly what you want', '200 cups a day at the new outlet', 'pulse', 'A hospital: waits cut to 20 minutes'],
  ['sun', 'Premises', 'Forecast what will happen', '300 people pass each hour', 'chart', 'Ice cream maker: hot summer, extra stock'],
  ['split', 'Options', 'Compare before you choose', 'College, bus stand or market', 'building', 'Three cities compared for one new office'],
  ['refresh', 'Follow up', 'Check the numbers, then adjust', 'Kabir checks the cups every week', 'calendar', 'A sales team checks numbers every Monday'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['PLANNING, AT WORK', 'Every day', 'Hospitals, factories, offices, sales teams', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A HOSPITAL</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same steps, any size of plan</span></div>`) + `</div>`).join('');
// X
const XG = [['compass', 'Gives direction'], ['recycle', 'Cuts waste']];
const XH = [['hourglass', 'Takes time'], ['unlink', 'Breaks on change']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 64}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 64}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#ic0I').innerHTML = M.icon('clipboard', 22, C.gold, 2.2); $('#ic1I').innerHTML = M.icon('alert', 22, C.red, 2.4); $('#ic2I').innerHTML = M.icon('refresh', 22, '#fff', 2.4);
$('#bothI').innerHTML = M.icon('compass', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Specific', 'Measurable', 'Relevant', 'Time-bound'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('calendar', 44, C.gold2, 2.4);
// recap
const ROWS = [['clipboard', 'Decide in advance', ['What', 'How', 'When', 'Who']], ['list', 'Follow the steps', ['Objective', 'Follow up']], ['target', 'Make goals SMART', ['SMART']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const pop = (el, t, ta, tout = 1e9) => M.vis(el, t, ta, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
const runRows = (t, pre, n, icons, tOn, t0, tEnd) => {
  for (let i = 0; i < n; i++) {
    const el = $('#' + pre + i), ta = tOn[i], td = i < n - 1 ? tOn[i + 1] : tEnd + 1;
    M.vis(el, t, t0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
    const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
    el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
    el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
    el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
    const ri = el.querySelector('.ri'); if (ri && icons) { ri.style.background = mix('#fff', C.navy2, act); setIco(ri, icons[i], t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2); }
  }
};
const paneHead = (pn, t, tin, tout, withPx = true) => {
  const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return false;
  const oo = { outDur: 0.18, ody: -12 };
  M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
  M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
  M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
  M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
  if (withPx) M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
  return true;
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; QS.forEach((_, i) => { const el = $('#qc' + i); el.style.left = x + 'px'; x += el.offsetWidth + 16; });
  x = 64; DC.forEach((_, i) => { const el = $('#dc' + i); el.style.left = x + 'px'; x += el.offsetWidth + 24; });
  FF.forEach((_, i) => { const el = $('#ff' + i); el.style.left = (32 + PX[i] - el.offsetWidth / 2) + 'px'; });
  x = 0; [0, 1, 2].forEach(i => { const el = $('#o6' + i); el.style.left = x + 'px'; x += el.offsetWidth + 16; });
  x = 48; ['ic0', 'ia0', 'ic1', 'ia1', 'ic2'].forEach(id => { const el = $('#' + id); el.style.left = x + 'px'; x += (el.offsetWidth || +el.getAttribute('width')) + 12; });
  $('#oldX').setAttribute('width', $('#old').offsetWidth + 16); $('#oldXL').setAttribute('x2', $('#old').offsetWidth + 8);
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 5]), ...tXh.map((th, i) => [th + 0.1, -10 + (i + 1) * 5])], M.SOFT);

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
  M.vis($('#exChip'), t, tF[0] + 0.2, tGout, { dy: 10, outDur: 0.3 });

  /* ===== A: a wish, not a plan ===== */
  const aOn = t < tB1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    M.vis($('#wish'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    QS.forEach((_, i) => M.vis($('#qc' + i), t, tMorph + 0.6 + i * 0.08, 1e9, { dy: 10 }));
    M.rise($('#wT'), t, tSell - 0.1, { st: 0.08, sp: M.HEAVY });
    M.vis($('#oops'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    const tO = [tMilk - 0.1, tC2 + 0.1, tSales - 0.15];
    OT.forEach(([ic], i) => {
      const el = $('#ot' + i); M.vis(el, t, tMorph + 0.7 + i * 0.08, 1e9, { dy: 14 });
      const r = M.io((t - tO[i]) / 0.3); el.style.background = mix(C.paper, C.redBg, r);
      setIco(el.querySelector('i'), ic, r > 0.5 ? C.red : C.dim, 28, 2.2);
      M.rise(el.querySelector('.tx2'), t, tO[i], { st: 0.04 }); el.querySelector('.tx2').style.color = C.red;
    });
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

  /* ===== B: the planning meeting ===== */
  const bOn = t >= tB1 - 0.1 && t < tD1 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tB1 + 0.1, tBout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tB2);
    M.vis($('#illImg'), t, tB1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#plan'), t, tB2 + 0.12, tBout, { dx: 60, dy: 0, ...o });
    PQ.forEach((_, i) => {
      const r = $('#pq' + i); M.vis(r, t, tB2 + 0.3 + i * 0.08, 1e9, { dy: 14 });
      const [tq, ta] = tPQ[i], g = M.io((t - tq) / 0.3);
      r.querySelector('.qb').style.background = mix(C.ink, C.gold, g); r.querySelector('.qb').style.color = g > 0.5 ? '#fff' : C.gold2;
      M.vis($('#pa' + i), t, ta - 0.1, 1e9, { dx: 30, dy: 0, sp: M.SOFT, fade: 0.12 });
    });
  }

  /* ===== D: definition ===== */
  const dOn = t >= tD1 - 0.1 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#def'), t, tD2 + 0.05, tDout, { dy: 36, outDur: 0.3, ody: -16 });
    M.rise($('#dl0'), t, tD2 + 0.2, { st: 0.07, sp: M.HEAVY }); M.rise($('#dl1'), t, tAdv + 0.2, { st: 0.04 });
    M.vis($('#dHr'), t, tAdv + 0.3, 1e9, { dy: 0 }); M.vis($('#dWh'), t, tAdv + 0.35, 1e9, { dy: 8 });
    DC.forEach((_, i) => pop($('#dc' + i), t, tDw[i] - 0.1));
  }

  /* ===== F: the seven steps ===== */
  const fOn = t >= tF0 - 0.1 && t < tL1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#sl'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#sb'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...o });
    runRows(t, 's7', 7, null, tF, tF0, tFout);
    M.vis($('#map'), t, tF0 + 0.5, 1e9, { dy: 16, sp: M.SOFT });
    // pins: grey, then lit as each option is named, then the bus stand wins
    PX.forEach((_, i) => {
      const g = $('#pin' + i), lit = M.io((t - tOpt[i] + 0.1) / 0.3), win = M.io((t - tWins + 0.1) / 0.3);
      const col = i === 1 ? mix(mix(C.dim, C.ink, lit), C.gold, win) : mix(mix(C.dim, C.ink, lit), C.dim, win);
      g.querySelector('path').setAttribute('fill', col);
      const pl = $('#pl' + i); pl.style.opacity = M.clamp((t - tOpt[i] + 0.1) / 0.2) * (i === 1 ? 1 : 1 - 0.55 * win);
      const p = M.spring(t - tOpt[i] + 0.1, M.POP), s = i === 1 ? 1 + 0.12 * M.spring(t - tWins, M.POP) : 1, dy = (1 - p) * -18;
      g.setAttribute('transform', `translate(${PX[i]} ${(t < tOpt[i] - 0.1 ? 0 : dy).toFixed(2)})` + (s !== 1 ? ` translate(0 132) scale(${s.toFixed(4)}) translate(0 -132)` : ''));
    });
    const ch = $('#chosen'); M.hide(ch, t < tWins); ch.style.opacity = M.clamp((t - tWins) / 0.2);
    FF.forEach((_, i) => pop($('#ff' + i), t, tWalk + i * 0.25));
    SP.forEach((_, k) => {
      const tin = tF[k] + 0.1, tout = k < 6 ? tF[k + 1] - 0.14 : 1e9, sp = $('#sp' + k);
      const off = t < tin - 0.01 || t > tout + 0.3; M.hide(sp, off); if (off) return;
      M.vis(sp, t, tin, tout, { dy: 16, outDur: 0.2, ody: -12 });
      if (k === 0) { pop($('#o1i'), t, tin + 0.2); M.rise($('#o1t'), t, tObj - 0.05, { st: 0.06, sp: M.HEAVY }); }
      else if (k === 1) { M.rise($('#o2a'), t, tin + 0.4, { st: 0.035 }); M.rise($('#o2b'), t, tWalk, { st: 0.035 }); }
      else if (k === 2) PN.forEach((_, i) => M.vis($('#o3' + i), t, tOpt[i] - 0.1, 1e9, { dy: 14 }));
      else if (k === 3) CMP.forEach((r, ri) => { M.vis($('#cl' + ri), t, tCmp[ri] - 0.15, 1e9, { dy: 8 }); r[1].forEach((_, i) => pop($('#cc' + ri + i), t, tCmp[ri] + i * 0.12)); });
      else if (k === 4) { M.rise($('#o5t'), t, tin + 0.2, { st: 0.06, sp: M.HEAVY }); M.rise($('#o5s'), t, tWins + 0.3, { st: 0.035 }); }
      else if (k === 5) { [0, 1, 2].forEach(i => pop($('#o6' + i), t, i < 2 ? tF6w[i] - 0.1 : tF6w[1] + 0.5)); M.vis($('#o63'), t, tF6w[1] + 0.9, 1e9, { dy: 12 }); }
      else if (k === 6) [0, 1, 2, 3].forEach(i => M.vis($('#o7' + i), t, tCheck - 0.2 + i * 0.3, 1e9, { dy: 14 }));
    });
  }

  /* ===== L: three sizes of plan ===== */
  const lOn = t >= tL1 - 0.1 && t < tG0 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pyr'), t, tL1 + 0.1, tLout, { dx: -60, dy: 0, ...o });
    M.vis($('#lv'), t, tL1 + 0.25, tLout, { dx: 60, dy: 0, ...o });
    TIER.forEach((_, i) => {
      M.vis($('#ty' + i), t, tL1 + 0.4 + (2 - i) * 0.12, 1e9, { dy: 16, sp: M.SOFT });
      const on = M.io((t - tL[i]) / 0.3), off = i < 2 ? M.io((t - tL[i + 1]) / 0.35) : 0, act = on * (1 - off);
      $('#tp' + i).setAttribute('fill', mix(mix(C.paper, C.ink, act), C.paper2, off));
      $('#tt' + i).setAttribute('fill', act > 0.5 ? '#fff' : C.ink);
      const r = $('#lr' + i); M.vis(r, t, tL1 + 0.5 + i * 0.1, 1e9, { dy: 14 });
      r.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      r.querySelector('.ln').style.color = act > 0.5 ? '#fff' : C.ink; r.querySelector('.lx').style.color = act > 0.5 ? C.gold2 : C.ink2;
      M.rise(r.querySelector('.lx'), t, tLx[i] - 0.1, { st: 0.04 });
    });
  }

  /* ===== G: SMART goals ===== */
  const gOn = t >= tG0 - 0.1 && t < tK0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#gl'), t, tG0 + 0.1, tGout, { dx: -60, dy: 0, ...o });
    M.vis($('#gp'), t, tG0 + 0.25, tGout, { dx: 60, dy: 0, ...o });
    runRows(t, 'gr', 5, ['target', 'chart', 'check', 'link', 'calendar'], tG, tG0, tGout);
    M.rise($('#old'), t, tG0 + 0.5, { st: 0.07, sp: M.HEAVY }); M.draw($('#oldXL'), t, tVague, 0.4, M.o3);
    $('#old').style.color = mix(C.ink, C.dim, M.io((t - tVague - 0.2) / 0.3));
    pop($('#doran'), t, tDoran - 0.1);
    GB.forEach((_, i) => {
      const row = $('#gb' + i), b = row.querySelector('b'); M.hide(row, t < tSmart);
      M.vis(b, t, tSmart + i * 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const g = M.io((t - tGw[i] + 0.15) / 0.3); b.style.background = mix(C.paper, C.gold, g); b.style.color = g > 0.5 ? '#fff' : C.dim;
      M.vis(row.querySelector('span'), t, tGw[i] - 0.15, 1e9, { dx: 30, dy: 0, sp: M.SOFT, fade: 0.12 });
      M.vis(row.querySelector('em'), t, tGw[i], 1e9, { dy: 0, fade: 0.2 });
    });
    M.vis($('#gFin'), t, tG7 + 0.1, 1e9, { dy: 24 });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    runRows(t, 'kr', 4, KA.map(r => r[0]), tK, tK0, tKout);
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); if (!paneHead(pn, t, tin, tout, false)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { pn.querySelectorAll('.px').forEach(e => M.vis(e, t, tin + 0.5, tout, { dy: 10, ...oo })); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
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
    $('#beam').setAttribute('transform', `rotate(${a.toFixed(3)} 344 40)`);
    $('#panL').setAttribute('transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    $('#panR').setAttribute('transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      pop($('#xg' + i), t, tXg[i] - 0.05); pop($('#xh' + i), t, tXh[i] - 0.05);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#ike'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#iWl'), t, tX4 + 0.4, 1e9, { dy: 8 }); M.vis($('#iHr'), t, tX4 + 0.4, 1e9, { dy: 0 });
    pop($('#ic0'), t, tX4 + 0.5); M.vis($('#ia0'), t, tX4 + 0.8, 1e9, { dx: -10, dy: 0, fade: 0.15 });
    pop($('#ic1'), t, tX4 + 1.0); M.vis($('#ia1'), t, tX4 + 1.3, 1e9, { dx: -10, dy: 0, fade: 0.15 }); pop($('#ic2'), t, tX4 + 1.5);
    M.rise($('#iNote'), t, tX4 + 1.9, { st: 0.035 });
    M.vis($('#iqS'), t, tSaying - 0.1, 1e9, { dy: 8 });
    M.rise($('#iq0'), t, tX5 - 0.05, { st: 0.07, sp: M.HEAVY }); M.rise($('#iq1'), t, tBut - 0.05, { st: 0.07, sp: M.HEAVY });
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
