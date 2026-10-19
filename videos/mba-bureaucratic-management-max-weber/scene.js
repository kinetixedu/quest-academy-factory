// MBA - Principles of Management, Ep 10: Bureaucratic Management - Max Weber
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  heartPulse: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z', 'M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  pen: ['M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'],
  folder: ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'],
  fileText: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 9H8', 'M16 13H8', 'M16 17H8'],
  landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2l8 5H4z'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 17h10', 'M9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z', 'M19 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tSteps = wt('H2', 'steps'), tOwn = wt('H2', 'own');
const tFree = wt('C1', 'free'), tWrite = wt('C2', 'write'), tFriend = wt('C3', 'friend');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;
// D: Max Weber
const tD1 = T0('D1'), tMax = wt('D1', 'Max'), tGerman = wt('D1', 'German'), t1864 = wt('D1', '1864'), tD2 = T0('D2'), tSocio = wt('D2', 'sociologist');
const tLive = wt('D2', 'live'), tGroups = wt('D2', 'groups'), tD3 = T0('D3'), tEcon = wt('D3', 'Economy'), tDied = wt('D3', 'died'), tDout = T0('B1') - 0.32;
// B: the office
const tB1 = T0('B1'), tOff = wt('B1', 'offices'), tRule = wt('B1', 'rule'), tB2 = T0('B2'), tBw = [wt('B2', 'one'), wt('B2', 'written'), wt('B2', 'record')];
const tWho = wt('B3', 'whoever'), tBout = T0('M1') - 0.32;
// M: definition
const tM1 = T0('M1'), tM2 = T0('M2'), tRun = wt('M2', 'running'), tChain = wt('M2', 'chain'), tM3 = T0('M3'), tIdeal = wt('M3', 'ideal'), tPerf = wt('M3', 'perfect'), tMout = T0('R0') - 0.32;
// R: one leave request
const tR0 = T0('R0'), tR = [1, 2, 3, 4, 5, 6].map(i => T0('R' + i)), tRout = T0('U0') - 0.32;
const tFills = wt('R1', 'fills'), tUp = wt('R2', 'up'), tRchk = wt('R3', 'checks'), tNotice = wt('R3', 'notice'), tDid = wt('R3', 'did');
const tRavi4 = wt('R4', 'Ravi'), tSigns = wt('R4', 'signs'), tBack = wt('R5', 'back'), tKab = wt('R6', 'Kabir'), tRec = wt('R6', 'record'), tFair = wt('R6', 'fair');
// U: three kinds of authority
const tU0 = T0('U0'), tThree = wt('U0', 'three'), tU = [1, 2, 3].map(i => T0('U' + i)), tBur = wt('U3', 'Bureaucracy'), tUout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5, 6].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'army'), wt('K3', 'passport'), wt('K4', 'traffic'), wt('K5', 'government'), wt('K6', 'hospital')];
// X: the limits
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'fair'), wt('X2', 'orderly'), wt('X2', 'predictable')], tXh = [wt('X3', 'rigid'), wt('X3', 'slow'), wt('X3', 'tape')];
const tRibbon = wt('X4', 'ribbon'), tSugar = wt('X5', 'sugar'), tStrict = wt('X5', 'strict'), tCage = wt('X6', 'iron'), tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'rules'), wt('S2', 'chain')], [wt('S3', 'rules')], [wt('S4', 'fairness'), wt('S4', 'order'), wt('S4', 'tape')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const icoG = (n, x, y, sc, col, sw) => `<g transform="translate(${x} ${y}) scale(${sc})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${M.IC[n].map(d => `<path d="${d}"/>`).join('')}</g>`;
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// A
$('#oaR').style.cssText += ';' + FACE('ravi');
const METH = ['Own recipe', 'Own prices', 'Own hours'];
$('#meth').innerHTML = METH.map((m, i) => `<div class="stp" id="mt${i}" style="top:112px;height:56px;font-size:24px;padding:0 22px">${M.icon('help', 24, C.muted, 2.2)}<span>${m}</span></div>`).join('');
const WR = [['cup', 'FREE CHAI', 'For friends'], ['book', 'NOT WRITTEN', 'The sales'], ['award', 'BEST SHIFT', 'To a friend']];
$('#wrong').innerHTML = WR.map(([ic, n, v], i) => `<div class="wt" id="wt${i}" style="left:${36 + i * 286}px"><div class="wn">${n}</div><div class="wi">${M.icon(ic, 40, C.red, 2.2)}</div><div class="wv">${v}</div></div>`).join('');
// D
wrap($('#tay'), 'tayIn', 616, 580); wrap($('#soc'), 'socIn', 920, 274);
$('#fatherI').innerHTML = M.icon('users', 26, '#fff', 2.2);
$('#grp').innerHTML = `<g stroke="#C9BFAE" stroke-width="4" stroke-linecap="round"><line x1="110" y1="44" x2="44" y2="128"/><line x1="110" y1="44" x2="176" y2="128"/><line x1="44" y1="128" x2="176" y2="128"/></g>` +
  [[110, 44, 'ravi'], [44, 128, 'asha'], [176, 128, 'kabir']].map(([x, y, n], i) => `<g id="gp${i}" transform="translate(${x} ${y})"><clipPath id="gpc${i}"><circle r="34"/></clipPath><circle r="38" fill="${i ? '#14213D' : '#B8862F'}"/><image href="${IMG}${n}-face.jpg" x="-34" y="-34" width="68" height="68" clip-path="url(#gpc${i})"/></g>`).join('');
// B
const HW = [['user', 'One job each', 'Every clerk had one task'], ['book', 'Written rules', 'The same steps, every time'], ['folder', 'A record of everything', 'Every case kept on file']];
$('#hwR').innerHTML = HW.map(([ic, a, b], i) => `<div class="br3" id="hw${i}" style="top:${96 + i * 112}px"><div class="bi">${M.icon(ic, 32, C.gold, 2.2)}</div><div class="bt">${a}</div><div class="bs">${b}</div></div>`).join('');
$('#sameI').innerHTML = M.icon('check', 26, C.gold2, 3);
wrap($('#ill'), 'illOut', 784, 580);
// M
const orgSvg = (w, mess) => {
  const j = mess ? [[6, -6], [-10, 8], [12, 4], [-6, 10], [8, -4], [0, 12], [-12, 2]] : Array(7).fill([0, 0]);
  const pos = [[w / 2 - 20, 14], [w / 2 - 72, 76], [w / 2 + 32, 76], [w / 2 - 98, 138], [w / 2 - 46, 138], [w / 2 + 6, 138], [w / 2 + 58, 138]];
  const col = mess ? [C.ink2, C.dim, C.red, C.paper2, C.dim, C.paper2, C.redBg] : [C.ink, C.gold, C.gold, C.gold2, C.gold2, C.gold2, C.gold2];
  const P = pos.map(([x, y], i) => [x + j[i][0], y + j[i][1]]);
  const ln = (a, b) => `<path d="M${P[a][0] + 20} ${P[a][1] + 28} V${(P[a][1] + 28 + P[b][1]) / 2} H${P[b][0] + 20} V${P[b][1]}"/>`;
  return `<g fill="none" stroke="${mess ? '#D9B9AE' : '#C9BFAE'}" stroke-width="3" ${mess ? 'stroke-dasharray="6 6"' : ''}>${ln(0, 1)}${ln(0, 2)}${ln(1, 3)}${ln(1, 4)}${ln(2, 5)}${ln(2, 6)}</g>` +
    P.map(([x, y], i) => `<rect x="${x}" y="${y}" width="40" height="28" rx="7" fill="${col[i]}"/>`).join('');
};
$('#defS').innerHTML = `<rect x="16" y="6" width="144" height="174" rx="14" fill="#14213D"/><rect x="16" y="6" width="18" height="174" rx="8" fill="#B8862F"/>` +
  [40, 66, 92, 118].map((y, i) => `<rect id="dsl${i}" x="52" y="${y}" width="${[88, 70, 80, 60][i]}" height="9" rx="4.5" fill="#E9D9B5"/>`).join('') + `<text x="52" y="162" font-family="Poppins" font-weight="700" font-size="20" fill="#B8862F">RULES</text>`;
$('#idlS').innerHTML = `<g transform="translate(-6 18)">${orgSvg(220, false)}</g>`;
$('#idrS').innerHTML = `<g transform="translate(-6 18)">${orgSvg(220, true)}</g>`;
wrap($('#def'), 'defOut', 1600, 580);

/* R: the leave request through the chain */
const CX = 196, NY = [58, 218, 378], WHO = ['ravi', 'asha', 'meena'], NAMES = ['Ravi · Owner', 'Asha · Lead', 'Meena · Helper'];
const pillW = s => Math.round(s.length * 11.6 + 40);
$('#rPlan').innerHTML = `<defs>${WHO.map((n, i) => `<clipPath id="rc${i}"><circle r="40"/></clipPath>`).join('')}<clipPath id="rck"><circle r="18"/></clipPath></defs>
  <g stroke="#3A4560" stroke-width="4" stroke-linecap="round"><line x1="${CX}" y1="${NY[0] + 46}" x2="${CX}" y2="${NY[1] - 46}"/><line x1="${CX}" y1="${NY[1] + 46}" x2="${CX}" y2="${NY[2] - 46}"/></g>
  ${WHO.map((n, i) => `<g id="rn${i}" transform="translate(${CX} ${NY[i]})"><circle id="rr${i}" r="45" fill="#14213D"/><image href="${IMG}${n}-face.jpg" x="-40" y="-40" width="80" height="80" clip-path="url(#rc${i})"/></g>
    <g id="rp${i}" transform="translate(${CX + 60} ${NY[i] - 21})"><rect width="${pillW(NAMES[i])}" height="42" rx="21" fill="#F5F1E8"/><text x="20" y="28" font-family="Poppins" font-weight="600" font-size="20" fill="#14213D">${NAMES[i]}</text></g>`).join('')}
  <path id="rDash" d="M${CX + 72 + pillW(NAMES[1])} ${NY[1]} H468" fill="none" stroke="#B8862F" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>
  <g id="rBook" transform="translate(468 140)"><rect width="220" height="156" rx="20" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/>
    ${icoG('book', 20, 20, 1.2, C.gold, 2)}<text x="58" y="40" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.4" fill="#8A8274">RULEBOOK</text>
    <text id="rRule" x="20" y="90" font-family="Poppins" font-weight="700" font-size="26" fill="#14213D">Rule 6</text><text id="rRule2" x="20" y="126" font-family="Poppins" font-weight="500" font-size="20" fill="#3A4560">Two days' notice</text>
    <g id="rOk" transform="translate(186 82)"><circle r="16" fill="#B8862F"/>${icoG('check', -9, -9, 0.75, '#fff', 4)}</g></g>
  <g id="rLog" transform="translate(468 300)"><rect width="220" height="136" rx="20" fill="#FFFFFF" stroke="#E2DACB" stroke-width="2"/>
    <g transform="translate(38 36)"><circle r="21" fill="#14213D"/><image href="${IMG}kabir-face.jpg" x="-18" y="-18" width="36" height="36" clip-path="url(#rck)"/></g>
    <text x="70" y="42" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.4" fill="#8A8274">RECORD BOOK</text>
    <rect x="20" y="70" width="180" height="6" rx="3" fill="#EEE8DB"/><rect x="20" y="86" width="140" height="6" rx="3" fill="#EEE8DB"/>
    <g id="rEnt"><rect x="12" y="98" width="196" height="28" rx="9" fill="#F3EAD6"/><text x="22" y="118" font-family="Poppins" font-weight="600" font-size="16" fill="#14213D">Meena · Sat off · OK</text></g></g>
  <g id="rDoc"><g transform="scale(1.2)"><rect x="-22" y="-28" width="44" height="56" rx="7" fill="#FFFFFF" stroke="#3A4560" stroke-width="3"/>
    <rect x="-12" y="-16" width="24" height="4" rx="2" fill="#B9B1A3"/><rect x="-12" y="-7" width="18" height="4" rx="2" fill="#B9B1A3"/><rect x="-12" y="2" width="22" height="4" rx="2" fill="#B9B1A3"/>
    <path id="rSig" d="M-14 16 q4 -8 8 0 t8 0 t8 -2" fill="none" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>
    <g id="rDocOk" transform="translate(20 -26)"><circle r="12" fill="#B8862F" stroke="#fff" stroke-width="3"/>${icoG('check', -7, -7, 0.58, '#fff', 4)}</g></g></g>`;
const RS = [['pen', 'Meena fills in a leave form', 'Mon 9 AM'], ['arrowU', 'Up to Asha, the shift lead', 'Mon 10 AM'], ['book', "Rule 6: two days' notice", 'Mon 11 AM'],
  ['pen', 'Ravi signs it', 'Mon 4 PM'], ['arrowD', 'The answer comes back down', 'Tue 9 AM'], ['folder', 'Written in the record book', 'Tue 10 AM']];
$('#rRowsR').innerHTML = RS.map(([ic, tx, tm], i) => `<div class="rr" id="rs${i}" style="top:${84 + i * 76}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${tx}</div><div class="rm">${tm}</div></div>`).join('');
wrap($('#rL'), 'rLOut', 784, 580);

/* U: three kinds of authority */
const UA = [['home', 'Traditional', ['Because it has always', 'been done this way'], ['A family business', 'passed down']],
  ['star', 'Charismatic', ['A leader we', 'admire'], ['A team that follows', 'a founder they love']],
  ['book', 'Rational-legal', ['The rules and the role,', 'not the person'], ['Asha follows the', 'rulebook, not a mood']]];
$('#uCards').innerHTML = UA.map(([ic, t, ob, ex], i) => `<div class="uc" id="uc${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="un">TYPE 0${i + 1}</div><div class="ui"></div><div class="serif ut">${t}</div>
  <div class="ul" style="top:278px">WE OBEY</div><div class="ux" style="top:308px">${ob[0]}</div><div class="ux" style="top:348px">${ob[1]}</div><div class="uh"></div>
  <div class="ul" style="top:428px">FOR EXAMPLE</div><div class="ue" style="top:460px">${ex[0]}</div><div class="ue" style="top:494px">${ex[1]}</div>${i === 2 ? '<div id="ubc">BUREAUCRACY</div>' : ''}</div>`).join('');

// K: at work today
const KA = [
  ['split', 'Division of labour', 'One clear job each', 'Asha brews, Kabir handles the cash', 'landmark', 'A bank: one opens accounts, one approves loans'],
  ['network', 'Hierarchy', 'A ladder of bosses', 'Helper, then Asha, then Ravi', 'shield', 'An army: from general down to soldier'],
  ['book', 'Written rules', 'The same steps every time', 'The leave form and the recipe card', 'fileText', 'A passport office: same steps for all'],
  ['scale', 'Impersonality', 'The same rules for everyone', "Kabir's friend pays the full price", 'car', 'A traffic fine is the same for anyone'],
  ['award', 'Merit', 'Skill, not family ties', 'The best helper gets the best shift', 'pen', 'Open exams for many government jobs'],
  ['folder', 'Records', 'Write everything down', "Every sale goes in Kabir's book", 'heartPulse', 'A hospital keeps a file for every patient'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${88 + i * 76}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['WEBER TODAY', 'Six features', 'Every big organisation uses them', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 06`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A BANK</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Rules that work without the boss</span></div>`) + `</div>`).join('');

// X: the limits
const XG = [['check', 'Fair'], ['clipboard', 'Orderly'], ['clock', 'Predictable']];
const XH = [['lock', 'Rigid'], ['clock', 'Slow'], ['fileText', 'Red tape']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#tape').innerHTML = `<rect x="34" y="34" width="132" height="92" rx="8" fill="#E2DACB"/><rect x="24" y="24" width="132" height="92" rx="8" fill="#EEE8DB" stroke="#C9BFAE" stroke-width="2"/><rect x="14" y="14" width="132" height="92" rx="8" fill="#FFFFFF" stroke="#C9BFAE" stroke-width="2"/>
  <rect x="34" y="34" width="70" height="6" rx="3" fill="#E2DACB"/><rect x="34" y="50" width="90" height="6" rx="3" fill="#E2DACB"/><rect x="34" y="66" width="60" height="6" rx="3" fill="#E2DACB"/>
  <g id="rib"><rect x="14" y="76" width="132" height="12" fill="#B5482F"/><rect x="104" y="14" width="12" height="92" fill="#B5482F"/><path d="M110 82 l-22 -18 q-6 18 0 22 z M110 82 l22 -18 q6 18 0 22 z" fill="#B5482F"/><path d="M110 82 l-12 32 M110 82 l14 30" stroke="#B5482F" stroke-width="8" stroke-linecap="round"/></g>`;
$('#xp0I').innerHTML = M.icon('cup', 24, C.ink, 2.4); $('#xp1I').innerHTML = M.icon('ban', 24, C.red, 2.4);
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Hierarchy', 'Impersonality', 'Merit', 'Records'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('scale', 44, C.gold2, 2.4);
// recap
const ROWS = [['book', 'Clear rules, clear chain', ['Written rules', 'Chain of command']], ['scale', 'Rational-legal authority', ['Rules, not the person']], ['ban', 'Fair, but watch the red tape', ['Fairness', 'Order', 'Red tape']]];
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
// the leave request at time t
const PM = [CX - 100, NY[2]], PA = [CX - 100, NY[1]], PR = [CX - 100, NY[0]], PK = [606, 368];
const docPos = t => {
  const legs = [[tUp, PM, PA], [tRavi4, PA, PR], [tBack, PR, PM, 1.2], [tKab, PM, PK, 0.9]];
  let p = PM;
  for (const [ta, a, b, d] of legs) { if (t < ta) break; const u = M.spring((t - ta) * (0.9 / (d || 0.9)), M.SOFT); p = [M.lerp(a[0], b[0], u), M.lerp(a[1], b[1], u)]; }
  return p;
};
const runReq = t => {
  const p = docPos(t), doc = $('#rDoc');
  const sc = t < tKab + 0.6 ? 1 : M.lerp(1, 0.5, M.io((t - tKab - 0.6) / 0.3));
  setA(doc, 'transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})${sc < 1 ? ` scale(${sc.toFixed(3)})` : ''}`);
  fadeG(doc, t, tFills - 0.1, tRec + 0.2);
  M.draw($('#rSig'), t, tSigns, 0.5, M.o3);
  fadeG($('#rDocOk'), t, tDid - 0.05);
  // who holds the form
  const holder = t < tUp + 0.3 ? 2 : t < tRavi4 + 0.3 ? 1 : t < tBack + 0.6 ? 0 : t < tKab ? 2 : -1;
  [0, 1, 2].forEach(i => { const r = $('#rr' + i), c = holder === i && t >= tFills - 0.1 ? C.gold : C.ink; if (r._f !== c) { r._f = c; r.setAttribute('fill', c); } });
  // rulebook check
  M.draw($('#rDash'), t, tRchk, 0.4, M.o3);
  fadeG($('#rBook'), t, tRchk + 0.2);
  const hl = t >= tRchk + 0.2 && t < tR[3]; const br = $('#rBook').querySelector('rect'), bc = hl ? C.gold : C.line;
  if (br._c !== bc) { br._c = bc; br.setAttribute('stroke', bc); br.setAttribute('stroke-width', hl ? 4 : 2); }
  fadeG($('#rRule'), t, wt('R3', 'Rule') - 0.05); fadeG($('#rRule2'), t, tNotice - 0.3); fadeG($('#rOk'), t, tDid - 0.05);
  // record book
  fadeG($('#rLog'), t, tKab - 0.3);
  fadeG($('#rEnt'), t, tRec);
  // clock
  const CL = ['Mon 9 AM', 'Mon 9 AM', 'Mon 10 AM', 'Mon 11 AM', 'Mon 4 PM', 'Tue 9 AM', 'Tue 10 AM'];
  let s = 0; tR.forEach((a, i) => { if (t >= a - 0.05) s = i + 1; });
  M.setT($('#rClk'), CL[s]);
  // steps list
  RS.forEach(([ic], i) => {
    const el = $('#rs' + i), ta = tR[i], td = i < 5 ? tR[i + 1] : tFair;
    const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
    el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
    el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
    el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
    el.querySelector('.rm').style.color = t < ta ? C.paper2 : mix(C.gold2, C.gold, off);
    el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
    setIco(el.querySelector('.ri'), t >= td ? 'check' : ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 24, t >= td ? 3 : 2.2);
  });
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 156; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 14; }
  const ou = $('#out'); ou.style.left = (72 - ou.offsetWidth / 2) + 'px';
  const fa = $('#father'); fa.style.left = (308 - fa.offsetWidth / 2) + 'px';
  const tg = $('#tgT'); tg.style.left = (128 - tg.offsetWidth) + 'px'; $('#tgW').style.left = '660px'; $('#tgW').style.top = '150px';
  const xp1 = $('#xp1'); xp1.style.left = (48 + $('#xp0').offsetWidth + 24) + 'px'; $('#xp0').style.left = '48px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  ['#xt1', '#xt2'].forEach(id => { const el = $(id); if (el.offsetWidth > 464) el.style.fontSize = Math.floor(34 * 464 / el.offsetWidth) + 'px'; });
  const qq = $('#qq1'); if (qq.offsetWidth > 1380) qq.style.fontSize = Math.floor(68 * 1380 / qq.offsetWidth) + 'px';
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
  M.vis($('#exChip'), t, tR[0] + 0.2, tRout, { dy: 10, outDur: 0.3 });

  /* ===== A: everyone does it their own way ===== */
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
    M.vis($('#ways'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.vis($('#oaR'), t, tMorph + 0.5, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#onR'), t, tMorph + 0.58, 1e9, { dy: 10 });
    const og = M.io((t - tSteps) / 0.3);
    $('#oaR').style.filter = og > 0.01 ? `grayscale(${og.toFixed(2)}) opacity(${(1 - 0.45 * og).toFixed(2)})` : '';
    M.vis($('#out'), t, tSteps + 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    METH.forEach((_, i) => M.vis($('#mt' + i), t, tOwn - 0.1 + i * 0.18, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#ask'), t, T0('C1') - 0.15, 1e9, { dy: 36 });
    [tFree, tWrite, tFriend].forEach((ta, i) => {
      const el = $('#wt' + i); M.vis(el, t, ta - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const r = M.io((t - ta - 0.2) / 0.25); el.style.background = mix(C.paper, C.redBg, r); el.querySelector('.wv').style.color = mix(C.ink, C.red, r);
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

  /* ===== D: Max Weber ===== */
  const dOn = t >= tTu - 0.05 && t < tB1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    const tay = $('#tay'), sh = M.spring(t - tD2 + 0.1, M.HEAVY), tw = M.lerp(1600, 616, sh);
    M.vis(tay, t, tD1 - 0.1, tDout, { dy: 36, ...o });
    snap(tay, (sh >= 1 ? 616 : tw.toFixed(1)) + 'px', 'width');
    snap($('#tayIn'), (sh >= 1 ? 0 : ((tw - 616) / 2).toFixed(1)) + 'px', 'left');
    M.vis($('#port'), t, tD1 + 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tMax - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, tGerman - 0.05, 1e9, { dy: 10 });
    M.vis($('#father'), t, tSocio - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const soc = $('#soc'); M.vis(soc, t, tD2 + 0.12, tDout, { dx: 60, dy: 0, ...o }); growH(soc, $('#socIn'), t, tD3);
    [0, 1, 2].forEach(i => fadeG($('#gp' + i), t, tSocio + 0.2 + i * 0.12));
    M.vis($('#grp'), t, tSocio, 1e9, { dy: 0, fade: 0.2 });
    M.rise($('#sc1'), t, tSocio + 0.3, { st: 0.06 }); M.rise($('#sc2'), t, tSocio + 0.7, { st: 0.06 });
    M.vis($('#bk'), t, tD3 + 0.12, tDout, { dy: 36, ...o });
    M.vis($('#bookS'), t, tD3 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD3 + 0.55 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.vis($('#bookL'), t, tEcon - 0.2, 1e9, { dy: 10 });
    M.rise($('#bk1'), t, tEcon - 0.05, { st: 0.07 });
    M.vis($('#bkE'), t, tEcon + 0.8, 1e9, { dy: 10 });
  }

  /* ===== B: the office ===== */
  const bOn = t >= tB1 - 0.1 && t < tM1 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tB1 + 0.05, tBout, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tB2);
    M.vis($('#illImg'), t, tB1 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgT'), t, tOff - 0.1, tB2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgW'), t, tRule - 0.1, tB2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#hw'), t, tB2 + 0.12, tBout, { dx: 60, dy: 0, ...o });
    HW.forEach((_, i) => M.vis($('#hw' + i), t, tBw[i] - 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
    M.vis($('#same'), t, tWho - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== M: definition + ideal type ===== */
  const mOn = t >= tM1 - 0.1 && t < tR0 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tM1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tM2 - 0.15, outDur: 0.3 });
    const def = $('#def'); M.vis(def, t, tM2 + 0.05, tMout, { dy: 36, ...o }); growH(def, $('#defIn'), t, tM3);
    M.rise($('#dl1'), t, tRun - 0.1, { st: 0.06 }); M.rise($('#dl2'), t, tChain - 0.5, { st: 0.06 });
    M.vis($('#defS'), t, tRun + 0.6, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    M.vis($('#idl'), t, tIdeal - 0.1, tMout, { dy: 36, ...o });
    M.vis($('#idr'), t, tPerf - 0.1, tMout, { dy: 36, ...o });
  }

  /* ===== R: one leave request ===== */
  const rOn = t >= tR0 - 0.1 && t < T0('U0') + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    const rL = $('#rL'); M.vis(rL, t, tR0 + 0.05, tRout, { dy: 36, ...o }); grow(rL, $('#rLOut'), t, tR[0]);
    M.vis($('#rClk'), t, tR0 + 0.3, 1e9, { dy: 10 });
    M.vis($('#rPlan'), t, tR0 + 0.2, 1e9, { dy: 20, sp: M.SOFT });
    [0, 1, 2].forEach(i => { fadeG($('#rn' + i), t, tR0 + 0.35 + i * 0.1); fadeG($('#rp' + i), t, tR0 + 0.45 + i * 0.1); });
    M.vis($('#rS'), t, tR[0] + 0.12, tRout, { dx: 60, dy: 0, ...o });
    RS.forEach((_, i) => M.vis($('#rs' + i), t, tR[0] + 0.3 + i * 0.06, 1e9, { dy: 14 }));
    runReq(t);
  }

  /* ===== U: three kinds of authority ===== */
  const uOn = t >= tU0 - 0.1 && t < tK0 + 0.2; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.rise($('#uq'), t, tU0 + 0.05, { st: 0.07, sp: M.HEAVY, out: tThree - 0.4, outDur: 0.3 });
    UA.forEach(([ic], i) => {
      const el = $('#uc' + i), ta = tU[i];
      M.vis(el, t, tThree + i * 0.1, tUout, { dy: 40, outDur: 0.3, ody: -16 });
      const lit = t >= ta - 0.05, nav = i === 2 ? M.io((t - ta) / 0.35) : 0;
      el.querySelector('.bg').style.background = mix(C.card, C.ink, nav);
      el.querySelector('.un').style.color = lit ? (nav > 0.5 ? C.gold2 : C.gold) : C.dim;
      el.querySelector('.ut').style.color = lit ? mix(C.ink, '#fff', nav) : C.dim;
      const ui = el.querySelector('.ui'); ui.style.background = lit ? mix(C.gold3, C.navy2, nav) : C.paper;
      setIco(ui, ic, lit ? (nav > 0.5 ? C.gold2 : C.gold) : C.dim, 44, 2.2);
      el.querySelector('.uh').style.background = mix(C.line, C.navy3, nav);
      el.querySelectorAll('.ul').forEach(x => { x.style.color = nav > 0.5 ? C.gold2 : C.muted; });
      el.querySelectorAll('.ux').forEach((x, k) => { M.vis(x, t, ta + 0.4 + k * 0.1, 1e9, { dy: 10 }); x.style.color = mix(C.ink, '#fff', nav); });
      el.querySelectorAll('.ue').forEach((x, k) => { M.vis(x, t, ta + 0.9 + k * 0.1, 1e9, { dy: 10 }); x.style.color = mix(C.ink2, C.gold2, nav); });
      el.querySelectorAll('.ul').forEach((x, k) => M.vis(x, t, ta + 0.3 + k * 0.5, 1e9, { dy: 8 }));
      M.vis(el.querySelector('.uh'), t, ta + 0.7, 1e9, { dy: 0 });
    });
    M.vis($('#ubc'), t, tBur - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 5 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 6 ? tK[k] - 0.14 : 1e9;
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
    M.vis($('#tape'), t, tX4 + 0.35, 1e9, { dy: 16, sp: M.SOFT });
    fadeG($('#rib'), t, tRibbon - 0.1, 1e9, 0.25);
    M.rise($('#xt1'), t, tRibbon - 0.4, { st: 0.06 }); M.rise($('#xt2'), t, tRibbon + 0.3, { st: 0.06 });
    M.vis($('#xcL'), t, tX5, 1e9, { dy: 8 });
    M.vis($('#xp0'), t, tSugar - 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#xp1'), t, tStrict + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#xfv'), t, tCage - 0.6, 1e9, { dy: 18 });
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
