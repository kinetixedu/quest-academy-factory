// MBA - Marketing Management, Ep 06: Microenvironment and Macroenvironment (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', navy3: '#2C3B5E', ld: '#A8713A', ldD: '#7E5428' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  swap: ['M8 3 4 7l4 4', 'M4 7h16', 'm16 21 4-4-4-4', 'M20 17H4'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  factory: ['M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M17 18h1', 'M12 18h1', 'M7 18h1'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  gem: ['M6 3h12l4 6-10 13L2 9Z', 'M11 3 8 9l4 13 4-13-3-6', 'M2 9h20'],
  train: ['M8 3.1V7a4 4 0 0 0 8 0V3.1', 'm9 15-1-1', 'm15 15 1-1', 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', 'm8 19-2 3', 'm16 19 2 3'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', circ(7, 17, 2), 'M9 17h6', circ(17, 17, 2)],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', circ(17, 18, 2), circ(7, 18, 2)],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  cookie: ['M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5', 'M8.5 8.5v.01', 'M16 15.5v.01', 'M12 12v.01', 'M11 17v.01', 'M7 14v.01'],
  apple: ['M12 6.528V3a1 1 0 0 1 1-1', 'M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', circ(12, 12, 3)],
  building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  call: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  camera: ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', circ(12, 13, 3)],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;
const ACC = s => s.replace(/\*(.+?)\*/g, '<span class="acc">$1</span>');

Object.assign(M.IC, {
  wheat: ['M2 22 16 8', 'M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z', 'M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z', 'M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z', 'M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z'],
  note: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 13H8', 'M16 17H8', 'M16 13h-2'],
  hospital: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = wt('H1', 'The') - 0.4;
const tNt = [wt('H1', 'farmer'), wt('H1', 'Rao'), wt('H1', 'bakery'), wt('H1', 'jaggery'), wt('H1', 'rule'), T0('H2') + 0.2, T0('H2') + 0.35, T0('H2') + 0.5];
const tH2 = T0('H2'), tTwo = wt('H2', 'two'), tC2 = T0('C2'), tMic = wt('C2', 'microenvironment'), tMac = wt('C2', 'macroenvironment');
const tL1 = T0('L1'), tL2 = T0('L2'), tAout = tL1 - 0.32, tClose = wt('L2', 'Close'), tBig = wt('L2', 'Big');
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tLout = tD1 - 0.32;
const tDw = [wt('D4', 'Micro'), wt('D4', 'Macro')];
const tM = [1, 2, 3, 4, 5, 6, 7].map(i => T0('M' + i)), tDout = tM[0] - 0.32;
const tSells = wt('M2', 'sells'), tPays = wt('M4', 'pays'), tCust = wt('M5', 'Mrs');
const tT = T0('T1'), tSt2 = wt('T1', 'Macro'), tMout = tT - 0.32;
const tP = [1, 2, 3, 4, 5, 6, 7, 8].map(i => T0('P' + i)), tTu = tP[0] - 0.32;
const tPl = ['Political', 'economic', 'social', 'technological', 'legal', 'environmental'].map(w => wt('P8', w));
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tPout = tK0 - 0.32, tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'phone'), wt('K3', 'airline'), wt('K4', 'bank')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'checklist'), wt('X2', 'big')], tXh = [wt('X3', 'overlap'), wt('X3', 'old')];
const tDevX = wt('X4', 'Dev'), tZoyX = wt('X5', 'Zoya'), tC3 = [wt('X5', 'Jaggery'), wt('X5', 'bakery'), wt('X5', 'healthy')], tMap = wt('X6', 'map');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'A');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'suppliers'), wt('S2', 'customers')], [wt('S3', 'forces')], [wt('S4', 'matters')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const ico = (ic, c, s = 28) => M.icon(ic, s, c, 2.2);
// A: wall
const NT = [['wheat', 'The farmer', 1], ['@rao', 'Mrs. Rao', 1], ['store', 'The new bakery', 1], ['coin', 'Jaggery prices', 0], ['scale', 'A new food rule', 0], ['bank', 'Bank and UPI', 1], ['heart', 'Healthy food trend', 0], ['users', 'Building families', 1]];
$('#nts').innerHTML = NT.map(([ic, n, mi], i) => `<div class="nt6" id="nt${i}" style="left:${40 + (i % 4) * 384}px;top:${88 + Math.floor(i / 4) * 166}px"><i style="${ic[0] === '@' ? FACE(ic.slice(1)) : ''}">${ic[0] === '@' ? '' : ico(ic, mi ? C.ink : C.gold)}</i><div class="nn">${n}</div><div class="ng" id="ng${i}" style="${mi ? 'background:#14213D;color:#fff' : 'background:#B8862F;color:#fff'}">${mi ? 'MICRO' : 'MACRO'}</div></div>`).join('');
$('#bx0I').innerHTML = ico('users', C.gold2, 26); $('#bx1I').innerHTML = ico('globe', C.gold2, 26);
// L: sorted boxes
wrap($('#ill'), 'illOut', 784, 580);
const SK0 = [['wheat', 'The farmer'], ['@rao', 'Mrs. Rao'], ['store', 'The new bakery'], ['bank', 'Bank and UPI'], ['users', 'Building families']];
const SK1 = [['coin', 'Jaggery prices'], ['scale', 'A new food rule'], ['heart', 'Healthy food trend']];
const skH = (arr, k) => arr.map(([ic, n], j) => `<div class="sk" id="sk${k}${j}" style="top:${116 + j * 68}px;height:56px">${ic[0] === '@' ? `<span style="width:32px;height:32px;border-radius:16px;${FACE(ic.slice(1))};background-size:cover;flex:0 0 32px"></span>` : M.icon(ic, 24, k ? C.gold : C.ink, 2.2)}<span>${n}</span></div>`).join('');
$('#sk0').innerHTML = skH(SK0, 0); $('#sk1').innerHTML = skH(SK1, 1);
$('#sc0').style.height = '460px'; $('#sc1').style.height = '460px';
$('#sh0I').innerHTML = M.icon('users', 18, '#fff', 2.4); $('#sh1I').innerHTML = M.icon('globe', 18, '#fff', 2.4);
// D: nested circles
wrap($('#kq'), 'kqOut', 784, 580);
const NC = [['wheat', 54, 108, 0], ['users', 126, 108, 0], ['store', 198, 108, 0], ['bank', 270, 108, 0], ['heart', 342, 108, 0], ['users', 0, 190, 1], ['coin', 60, 190, 1], ['leaf', 120, 190, 1], ['phone', 180, 190, 1], ['scale', 240, 190, 1], ['smile', 300, 190, 1]];
const pxy = (a, r) => [392 + r * Math.cos(a * Math.PI / 180), 326 - r * Math.sin(a * Math.PI / 180)];
$('#nchs').innerHTML = NC.map(([ic, a, r, k], i) => { const [x, y] = pxy(a, r); return `<div id="nc${i}" style="position:absolute;left:${(x - 22).toFixed(0)}px;top:${(y - 22).toFixed(0)}px;width:44px;height:44px;border-radius:22px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px ${k ? '#E9D9B5' : '#E2DACB'}">${M.icon(ic, 22, k ? C.gold : C.ink, 2.2)}</div>`; }).join('');
// M: chain
const CN = [
  ['SUPPLIER', ['wheat'], 'A ragi farmer', 'Ragi and jaggery', 64, 112, 200],
  ['THE COMPANY', ['@nani', '@arjun', '@dev', '@zoya'], 'Laddoo Lab', 'The whole family team', 448, 112, 200],
  ['INTERMEDIARY', ['bank', 'phone'], 'Bank and UPI', 'Moves the money', 832, 112, 200],
  ['CUSTOMER', ['@rao'], 'Mrs. Rao', 'And other tiffin parents', 1216, 112, 200],
  ['COMPETITOR', ['store'], 'The new bakery', 'Same tiffin box', 1216, 380, 172],
  ['PUBLICS', ['users', 'eye'], 'Building families', 'They watch and talk', 832, 380, 172],
];
$('#cns').innerHTML = CN.map(([l, ics, tt, ss, x, y, h], i) => `<div class="cn6" id="cn${i}" style="left:${x}px;top:${y}px;height:${h}px"><div class="bg"></div><div class="lbl">${l}</div><div class="ci">${ics.map(ic => ic[0] === '@' ? `<i style="${FACE(ic.slice(1))}"></i>` : `<i>${M.icon(ic, 26, i === 4 ? C.red : C.gold, 2.2)}</i>`).join('')}</div><div class="ct6" style="top:${h === 200 ? 122 : 112}px">${tt}</div><div class="cs6" style="top:${h === 200 ? 160 : 146}px">${ss}</div></div>`).join('');
const gapArrow = x => `<path d="M${x + 14} 212 h36 m-9 -9 l9 9 l-9 9" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
$('#chnS').innerHTML = [384, 768, 1152].map(gapArrow).join('') +
  `<path id="lnC" d="M1376 380 V312" stroke="#B5482F" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round"/><path id="lnP" d="M992 380 V352 H608 V312" fill="none" stroke="#B9B1A3" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round"/>`;
$('#lg0I').innerHTML = M.icon('arrowR', 22, '#fff', 2.6); $('#lg1I').innerHTML = M.icon(['M19 12H5', 'm12 19-7-7 7-7'], 22, C.ink, 2.6);
$('#tkPI').innerHTML = M.icon('wheat', 20, '#fff', 2.2); $('#tkLI').innerHTML = M.icon('laddoo', 20, C.gold2, 2.2); $('#tkMI').innerHTML = M.icon('phone', 20, C.ink, 2.2);
// P: six forces
const FO = [
  ['users', 'Demographic', 'Who people are', 'users', 'FACT · UNITED NATIONS ESTIMATE, 2023', 'India became the most populous country', '@rao', 'Customers', 'S'],
  ['coin', 'Economic', 'How much people can spend', 'coin', 'AT LADDOO LAB', 'Families watch every rupee', '@rao', 'Customers', 'E'],
  ['leaf', 'Natural', 'Weather and resources', 'leaf', 'AT LADDOO LAB', 'A poor cane season, costly jaggery', 'wheat', 'Suppliers', 'E'],
  ['phone', 'Technological', 'New tools', 'phone', 'AT LADDOO LAB', 'Parents pay by phone in seconds', 'bank', 'Intermediaries', 'T'],
  ['scale', 'Political', 'Laws and rules', 'scale', 'AT LADDOO LAB', 'A new label rule changes the pack', 'laddoo', 'The company', 'P'],
  ['smile', 'Cultural', 'Beliefs and habits', 'heart', 'AT LADDOO LAB', 'More parents want healthy home food', '@rao', 'Customers', 'S'],
];
$('#fRows').innerHTML = FO.map(([ic, n, , , , , , , L], i) => `<div class="fr6" id="fr${i}" style="top:${84 + i * 80}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${n}</div><div class="rp" id="rp${i}" style="background:#B8862F;color:#fff">${L}</div></div>`).join('');
const PL = [['P', 'Political', 'KOTLER: POLITICAL'], ['E', 'Economic', 'KOTLER: ECONOMIC'], ['S', 'Social', 'DEMOGRAPHIC, CULTURAL'], ['T', 'Technological', 'KOTLER: TECHNOLOGY'], ['L', 'Legal', 'LAWS AND RULES'], ['E', 'Environmental', 'KOTLER: NATURAL']];
const hitH = (f, i) => `<div class="hit" id="hit${i}"><div class="lbl" style="left:0;top:0">WHO IT HITS IN THE MICRO</div>
  <div class="hc" id="hcA${i}" style="left:0;top:28px;background:#B8862F;color:#fff">${M.icon(f[0], 24, '#fff', 2.2)}<span>${f[1]}</span></div>
  <svg class="ha" id="ha${i}" width="80" height="24" style="position:absolute;top:44px"><path id="hp${i}" d="M4 12 H66 M56 3 L68 12 L56 21" fill="none" stroke="#14213D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="hc" id="hcB${i}" style="top:28px;background:#fff;color:#14213D;box-shadow:0 0 0 2px #14213D">${f[6][0] === '@' ? `<span class="fa" style="${FACE(f[6].slice(1))}"></span>` : M.icon(f[6], 24, C.ink, 2.2)}<span>${f[7]}</span></div></div>`;
const FP = [['THE MACROENVIRONMENT', 'Six big forces', 'They shape every actor in the micro', null]].concat(FO.map((f, i) => [`FORCE 0${i + 1} / 06`, f[1], f[2], f]));
$('#fPans').innerHTML = FP.map(([s, t, m, f], i) => `<div class="pn" id="fn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (f ? `<div class="ka" id="fe${i}" style="top:318px"><i>${M.icon(f[3], 34, f[4].startsWith('FACT') ? C.ink : C.gold, 2.2)}</i><div class="kl">${f[4]}</div><div class="kt">${f[5]}</div></div>` + hitH(f, i)
     : `<div class="px">KOTLER AND ARMSTRONG</div><div class="pe"><i>${M.icon('globe', 34, C.gold, 2.2)}</i><span>Demographic, economic, natural, and more</span></div>`) + `</div>`).join('') +
  `<div class="pn" id="fn7"><div class="ps">A SIMILAR CHECKLIST</div><div class="serif pt">PESTLE</div><div class="pm">Same world, different labels</div><div class="hr"></div>${PL.map(([L, w, k], j) => `<div class="pl" id="pl${j}" style="left:${48 + (j % 3) * 284}px;top:${314 + Math.floor(j / 3) * 124}px;height:112px"><b>${L}</b><span style="top:76px">${w}</span></div>`).join('')}</div>`;
// K
const KA = [
  ['truck', 'Suppliers', 'Never depend on one', 'Ragi and jaggery from a farmer', 'hospital', 'A hospital keeps two medicine suppliers'],
  ['store', 'Competitors', 'Know your rivals', 'Watching the new bakery', 'phone', 'A phone maker studies every rival launch'],
  ['coin', 'Economic forces', 'Follow the spending', 'Keeping the pack at ₹120', 'plane', 'An airline offers cheaper seats when families spend less'],
  ['phone', 'Technology', 'Use the new tools', 'Parents pay Laddoo Lab by UPI', 'bank', 'A bank moves its services onto your phone'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['MICRO AND MACRO TODAY', 'Two actors, two forces', 'Every business lives inside both', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04 · ${i < 2 ? 'MICRO' : 'MACRO'}`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A HOSPITAL TO A BANK</div><div class="pe"><i>${M.icon('globe', 34, C.gold, 2.2)}</i><span>Close actors, big forces</span></div>`) + `</div>`).join('');
// X
const XG = [['check', 'Nothing big is missed'], ['search', 'A clear picture']];
const XH = [['repeat', 'Forces overlap'], ['clock', 'Lists get old']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#bb0I').innerHTML = M.icon('note', 20, C.gold, 2.4); $('#bb1I').innerHTML = M.icon('target', 20, '#fff', 2.4);
const C3 = [['coin', 'Jaggery prices'], ['store', 'The bakery'], ['heart', 'Healthy food trend']];
$('#c3s').innerHTML = C3.map(([ic, n], i) => `<div class="c3" id="c3${i}">${M.icon(ic, 20, C.gold, 2.4)}<span>${n}</span></div>`).join('');
$('#factI').innerHTML = M.icon('globe', 34, C.ink, 2.2);
$('#bothI').innerHTML = M.icon('target', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz + recap
const OPTS = ['Micro', 'Macro', 'Both', 'Neither'], RIGHT = 0;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('store', 44, C.gold2, 2.4);
const ROWS = [['users', 'Micro: the actors close to you', ['Suppliers', 'Customers']], ['globe', 'Macro: big forces that shape them', ['Six forces']], ['check', 'Check with PESTLE, act on what matters', ['Top three']]];
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
const rowHi = (el, ic, t, ta, td, s = 28) => {
  const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
  el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
  el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
  el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
  el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
  setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), s, 2.2);
};
// token x along the corridor (y = 346)
const tokX = (pts, t) => { let x = pts[0][1]; for (const [tt, v] of pts) { x = M.lerp(x, v, M.spring(t - tt, M.HEAVY)); } return x; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  for (let i = 0; i < 5; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(28 * 688 / q.offsetWidth) + 'px'; }
  geo.tw = ['tkP', 'tkL', 'tkM'].map(id => $('#' + id).offsetWidth);
  for (let i = 1; i < 7; i++) { const a = $('#hcA' + i), b = $('#hcB' + i), ar = $('#ha' + i); ar.style.left = (a.offsetWidth + 20) + 'px'; b.style.left = (a.offsetWidth + 120) + 'px'; }
  document.querySelectorAll('#fPans .pt, #kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#fPans .kt, #kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  let x = 48; for (let i = 0; i < 3; i++) { const c = $('#c3' + i); c.style.left = x + 'px'; x += c.offsetWidth + 12; }
  const ft = $('#factT'); if (ft.offsetWidth > 552) ft.style.fontSize = Math.floor(28 * 552 / ft.offsetWidth) + 'px';
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
  M.hide($('#exChip'), true);

  /* ===== A: the wall ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#wall'), t, tMorph + 0.2, tAout, { dy: 36, ...o });
    NT.forEach(([, , mi], i) => { M.vis($('#nt' + i), t, Math.max(tMorph + 0.4, tNt[i] - 0.1), 1e9, POP); M.vis($('#ng' + i), t, (mi ? tMic : tMac) + i * 0.04, 1e9, POP); });
    M.vis($('#boxes'), t, tTwo - 0.1, tAout, { dy: 40, ...o });
    M.vis($('#bx0'), t, tMic - 0.1, 1e9, POP); M.vis($('#bx1'), t, tMac - 0.1, 1e9, POP);
  }

  /* ===== L: team + sorted boxes ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#srt'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#sc0'), t, tL2 + 0.3, 1e9, { dy: 16 }); M.vis($('#sc1'), t, tL2 + 0.4, 1e9, { dy: 16 });
    SK0.forEach((_, j) => M.vis($('#sk0' + j), t, tClose + j * 0.12, 1e9, { dx: -16, dy: 0 }));
    SK1.forEach((_, j) => M.vis($('#sk1' + j), t, tBig + j * 0.12, 1e9, { dx: -16, dy: 0 }));
  }

  /* ===== D: definitions + nested circles ===== */
  const dOn = t >= tD1 - 0.1 && t < tM[0] + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD3);
    M.vis($('#dmL'), t, tD2 + 0.3, 1e9, { dy: 10 });
    [0, 1, 2].forEach(i => { const q = $('#ql' + i); M.vis(q, t, tD2 + 0.5 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - wt('D2', 'microenvironment') - i * 1.2) / 0.3)); });
    M.vis($('#kqHr'), t, tD3 - 0.2, 1e9, { dy: 0 }); M.vis($('#dML'), t, tD3, 1e9, { dy: 10 });
    [3, 4].forEach((i, j) => { const q = $('#ql' + i); M.vis(q, t, tD3 + 0.2 + j * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.ink, M.io((t - wt('D3', 'larger') - j * 1.2) / 0.3)); });
    [wt('D2', 'actors'), wt('D3', 'larger')].forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.ink, i ? C.gold : C.ink, u); });
    M.vis($('#dw0'), t, tDw[0] - 0.1, 1e9, POP); M.vis($('#dw1'), t, tDw[1] - 0.1, 1e9, POP);
    M.vis($('#nest'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#ncc'), t, tD3 + 0.3, 1e9, { dy: 0, fade: 0.15 }); M.vis($('#nct0'), t, tD3 + 0.35, 1e9, { dy: 0, fade: 0.15 }); M.vis($('#nct1'), t, tD3 + 0.35, 1e9, { dy: 0, fade: 0.15 });
    M.vis($('#ncm'), t, tD3 + 0.45, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#ntm'), t, tD3 + 0.55, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ncM'), t, wt('D3', 'forces') - 0.1, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#ntM'), t, wt('D3', 'forces'), 1e9, { dy: 0, fade: 0.2 });
    NC.forEach(([, , , k], i) => M.vis($('#nc' + i), t, (k ? wt('D3', 'forces') + 0.2 + (i - 5) * 0.08 : tD3 + 0.6 + i * 0.08), 1e9, POP));
    const pu = M.io((t - tDw[0]) / 0.3) * (1 - M.io((t - tDw[1]) / 0.3)), pU = M.io((t - tDw[1]) / 0.3);
    attr($('#ncm'), 'stroke', mix(C.line, C.ink, pu)); attr($('#ncm'), 'stroke-width', (2 + 2 * pu).toFixed(2));
    attr($('#ncM'), 'fill', mix(C.gold3, C.gold2, pU));
  }

  /* ===== M: the micro chain ===== */
  const mOn = t >= tM[0] - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#chn'), t, tM[0] + 0.05, tMout, { dy: 36, ...o });
    M.vis($('#chnS'), t, tM[0] + 0.6, 1e9, { dy: 0, fade: 0.2 });
    const tOn = [tM[1], tM[2], tM[3], tM[4], tM[5], tM[6]];
    CN.forEach((_, i) => {
      const c = $('#cn' + i); M.vis(c, t, tM[0] + 0.3 + i * 0.08, 1e9, { dy: 16 });
      const on = M.io((t - tOn[i]) / 0.3) * (1 - (i < 5 ? M.io((t - tOn[i + 1]) / 0.3) : 0)), seen = t >= tOn[i];
      c.querySelector('.bg').style.background = mix(seen ? C.paper : '#F7F4EE', C.gold3, on);
      c.querySelector('.bg').style.boxShadow = on > 0.02 ? `0 0 0 ${(3 * on).toFixed(2)}px ${C.gold}` : 'none';
      c.querySelector('.ct6').style.color = seen ? C.ink : C.dim;
    });
    attr($('#lnC'), 'stroke-opacity', String(M.clamp((t - tM[5]) / 0.3))); attr($('#lnP'), 'stroke-opacity', String(M.clamp((t - tM[6]) / 0.3)));
    M.vis($('#lg'), t, tM[0] + 0.8, 1e9, { dy: 16 }); M.vis($('#lg0'), t, tSells, 1e9, { dx: -12, dy: 0 }); M.vis($('#lg1'), t, tPays, 1e9, { dx: -12, dy: 0 });
    const tok = (id, k, pts, tin, tout) => { const el = $('#' + id); M.vis(el, t, tin, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.25, osc: 0.8, ody: 0 }); const x = tokX(pts, t); el.style.left = (x - geo.tw[k] / 2).toFixed(1) + 'px'; el.style.top = '324px'; };
    tok('tkP', 0, [[0, 224], [tSells + 0.3, 608]], tSells - 0.1, tM[2] + 0.6);
    tok('tkM', 2, [[0, 1376], [tPays + 0.4, 992], [tPays + 1.6, 608]], tPays - 0.1, tM[4] - 0.1);
    tok('tkL', 1, [[0, 608], [tCust + 0.2, 1376]], tM[4] - 0.05, tM[5] + 0.3);
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

  /* ===== P: six macro forces ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fl6'), t, tP[0] + 0.02, tPout, { dx: -60, dy: 0, ...o }); M.vis($('#fp6'), t, tP[0] + 0.2, tPout, { dx: 60, dy: 0, ...o });
    FO.forEach(([ic], i) => {
      const el = $('#fr' + i); M.vis(el, t, tP[0] + 0.35 + i * 0.07, 1e9, { dy: 14 });
      rowHi(el, ic, t, tP[i + 1], i < 5 ? tP[i + 2] : tP[7], 24);
      M.vis($('#rp' + i), t, tP[7] + 0.4 + i * 0.1, 1e9, POP);
    });
    for (let k = 0; k < 8; k++) {
      const tin = k ? tP[k] : tP[0] + 0.5, tout = k < 7 ? tP[k + 1] - 0.14 : 1e9;
      const pn = $('#fn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); continue; }
      if (k === 7) { PL.forEach((_, j) => M.vis($('#pl' + j), t, tPl[j] - 0.1, tout, { ...POP, ...oo })); continue; }
      const th = tin + (tout - tin) * 0.45;
      M.vis($('#fe' + k), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#hit' + k), t, th - 0.2, tout, { dy: 12, ...oo }); M.vis($('#hcA' + k), t, th - 0.1, tout, { ...POP, ...oo });
      M.draw($('#hp' + k), t, th + 0.1, 0.4, M.o3); M.vis($('#hcB' + k), t, th + 0.45, tout, { ...POP, ...oo });
    }
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => { const el = $('#kr' + i); M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 }); rowHi(el, ic, t, tK[i], i < 3 ? tK[i + 1] : tKout + 1); });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
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
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POP); M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POP);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, tDevX - 0.05, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr1'), t, tZoyX - 0.05, 1e9, { dx: 24, dy: 0 });
    C3.forEach((_, i) => M.vis($('#c3' + i), t, tC3[i] - 0.1, 1e9, POP));
    M.vis($('#fact'), t, tMap - 0.2, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, tq + 0.7, { st: 0.06, sp: M.HEAVY });
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
