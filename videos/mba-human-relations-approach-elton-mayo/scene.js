// MBA - Principles of Management, Ep 11: Human Relations Approach - Elton Mayo
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
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  chat: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
});
const IMG = '../../assets/illustrations/mba/';

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tWell = wt('H2', 'well'), tQuiet = wt('H2', 'quiet');
const tMoney = wt('C1', 'money'), tNothing = wt('C1', 'Nothing'), tListens = wt('C2', 'listens'), tFaster = wt('C3', 'faster');
const tT = T0('T1'), tSt2 = wt('T1', 'Attention'), tTu = T0('D1') - 0.32;
// D: Elton Mayo
const tD1 = T0('D1'), tElton = wt('D1', 'Elton'), tAus = wt('D1', 'Australian'), tHarv = wt('D1', 'Harvard'), tD2 = T0('D2'), tWhat = wt('D2', 'what'), tD3 = T0('D3'), tHuman = wt('D3', 'human'), tDout = T0('M1') - 0.32;
// M: definition
const tM1 = T0('M1'), tM2 = T0('M2'), tPeople = wt('M2', 'people'), tNot = wt('M2', 'noticed'), tVal = wt('M2', 'valued'), tTeam = wt('M2', 'team');
const tM3 = T0('M3'), tMTay = wt('M3', 'Taylor'), tMMay = wt('M3', 'Mayo'), tMout = T0('W1') - 0.32;
// W: Hawthorne
const tW1 = T0('W1'), tHaw = wt('W1', 'Hawthorne'), tWest = wt('W1', 'Western'), tW2 = T0('W2'), t1924 = wt('W2', '1924'), t1932 = wt('W2', '1932'), tFour = wt('W2', 'four');
const tSt = [T0('E1'), T0('R1'), T0('I1'), T0('B1')], tWout = T0('F0') - 0.32;
const tUpL = wt('E2', 'up'), tSame = wt('E2', 'same'), tRose = wt('E3', 'rose'), tBoth = wt('E3', 'both'), tCause = wt('E3', 'cause');
const tSix = wt('R1', 'Six'), tBreaks = wt('R2', 'breaks'), tHours = wt('R2', 'hours'), tTalk = wt('R2', 'talked'), tOut2 = wt('R3', 'Output'), tNoticed = wt('R3', 'noticed');
const tTw = wt('I1', 'twenty'), tIntv = wt('I1', 'interviewed'), tListen = wt('I2', 'listened');
const tFourteen = wt('B1', 'Fourteen'), tOwn = wt('B2', 'own'), tUnw = wt('B2', 'unwritten'), tFast = wt('B2', 'fast'), tSlow = wt('B2', 'slow'), tGroup = wt('B3', 'group'), tPace = wt('B3', 'pace');
// F: lessons
const tF0 = T0('F0'), tF = [1, 2, 3, 4].map(i => T0('F' + i)), tHawE = wt('F2', 'Hawthorne'), tFout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'companies'), wt('K2', 'Offices'), wt('K3', 'joiners'), wt('K4', 'smart'), wt('K5', 'Flexible')];
// X: the limits
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'teams'), wt('X2', 'feelings'), wt('X2', 'talking')], tXh = [wt('X3', 'small'), wt('X3', 'controlled'), wt('X4', 'smaller')];
const tFound = wt('X4', 'found'), tHappy = wt('X5', 'happy'), tProd = wt('X5', 'productive'), tFair = wt('X5', 'Fair'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'People');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'Chicago')], [wt('S3', 'machines')], ['Attention', 'belonging', 'teams'].map(w => wt('S4', w))];
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
['asha', 'kabir', 'meena'].forEach((n, i) => { $('#ta' + i).style.cssText += ';' + FACE(n); });
$('#op0I').innerHTML = M.icon('coin', 22, C.gold, 2.4); $('#op1I').innerHTML = M.icon('trendDown', 22, C.muted, 2.4); $('#op2I').innerHTML = M.icon('heart', 22, C.gold2, 2.4);
$('#cc0I').innerHTML = M.icon('coin', 20, C.gold, 2.4); $('#cc2I').innerHTML = M.icon('trendUp', 20, '#fff', 2.4);
// D
wrap($('#tay'), 'tayIn', 616, 580); wrap($('#soc'), 'socIn', 920, 274);
$('#fatherI').innerHTML = M.icon('award', 26, '#fff', 2.2);
$('#qS').innerHTML = `<circle cx="92" cy="92" r="88" fill="#F3EAD6"/>${icoG('help', 32, 32, 5, C.gold, 1.6)}`;
$('#bkI').innerHTML = M.icon('users', 52, C.gold2, 2);
// M
const DW = [['eye', 'NOTICED'], ['heart', 'VALUED'], ['users', 'A TEAM']];
$('#dW').innerHTML = DW.map(([ic, n], i) => `<div class="abs" id="dw${i}" style="left:${1144 + i * 140}px;top:72px;width:112px;height:150px"><div style="position:absolute;left:12px;top:0;width:88px;height:88px;border-radius:44px;background:#F3EAD6;display:flex;align-items:center;justify-content:center">${M.icon(ic, 40, C.gold, 2.2)}</div><div class="lbl" style="left:0;width:112px;text-align:center;top:106px">${n}</div></div>`).join('');
$('#cmTS').innerHTML = `<rect width="192" height="172" y="10" rx="24" fill="#F5F1E8"/>${icoG('gear', 46, 36, 4.2, C.dim, 1.4)}`;
$('#cmMS').innerHTML = `<rect width="192" height="172" y="10" rx="24" fill="#F3EAD6"/>${icoG('users', 44, 38, 4.2, C.gold, 1.6)}`;
wrap($('#def'), 'defOut', 1600, 580);
// W: stage list
const ST = [['bulb', 'Lighting tests', 'Light up in one room only', '1924'], ['gear', 'Relay test room', 'Six women, many changes', '1927'], ['chat', 'Interviews', 'About 20,000 workers', '1928'], ['users', 'Bank wiring room', 'Fourteen men, one group', '1931']];
$('#hlR').innerHTML = ST.map(([ic, a, b, y], i) => `<div class="hr4" id="hr${i}" style="top:${96 + i * 112}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${a}</div><div class="rs">${b}</div><div class="ry">${y}</div></div>`).join('');
// timeline
const YX = y => 24 + (y - 1924) / 8 * 640, SY = [1924, 1927, 1928, 1931];
$('#tl').innerHTML = `<line x1="24" y1="30" x2="664" y2="30" stroke="#EEE8DB" stroke-width="8" stroke-linecap="round"/><line id="tlP" x1="24" y1="30" x2="664" y2="30" stroke="#B8862F" stroke-width="8" stroke-linecap="round"/>` +
  Array.from({ length: 9 }, (_, i) => `<line x1="${YX(1924 + i)}" y1="46" x2="${YX(1924 + i)}" y2="54" stroke="#C9BFAE" stroke-width="3" stroke-linecap="round"/>`).join('') +
  [1924, 1928, 1932].map(y => `<text x="${YX(y)}" y="80" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="1.5" fill="#8A8274">${y}</text>`).join('') +
  SY.map((y, i) => `<g id="tm${i}" transform="translate(${YX(y)} 30)"><circle r="15" fill="#FFFFFF" stroke="#C9BFAE" stroke-width="4"/><text y="6" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="15" fill="#8A8274">${i + 1}</text></g>`).join('');
// stage panels
const OT = [['bulb', 'STAGE 1', 'Lighting tests'], ['gear', 'STAGE 2', 'Relay test room'], ['chat', 'STAGE 3', 'Interviews'], ['users', 'STAGE 4', 'Bank wiring room']];
$('#sp0').innerHTML = OT.map(([ic, n, x], i) => `<div class="ot4" id="ot${i}" style="left:${(i % 2) * 352}px;top:${Math.floor(i / 2) * 194}px"><div class="oi">${M.icon(ic, 30, C.gold, 2.2)}</div><div class="on">${n}</div><div class="ox">${x}</div></div>`).join('');
const room = (x, id, lbl) => `<g transform="translate(${x} 0)"><rect width="336" height="200" rx="20" fill="#F5F1E8"/><text x="24" y="38" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">${lbl}</text>
  <circle id="${id}G" cx="168" cy="112" r="56" fill="#E9D9B5"/><circle cx="168" cy="112" r="30" fill="#FFFFFF" stroke="#3A4560" stroke-width="4"/><path d="M158 112 l5 -8 l5 8 l5 -8 l5 8" fill="none" stroke="#B8862F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="156" y="140" width="24" height="16" rx="4" fill="#3A4560"/></g>`;
$('#sp1').innerHTML = `<svg class="abs" style="left:0;top:0" width="688" height="290">${room(0, 'lT', 'TEST ROOM')}${room(352, 'lC', 'CONTROL ROOM')}
  ${[0, 352].map((x, i) => `<text x="${x + 4}" y="236" font-family="Poppins" font-weight="600" font-size="16" letter-spacing="2.4" fill="#8A8274">OUTPUT</text><rect x="${x}" y="250" width="336" height="28" rx="10" fill="#EEE8DB"/><rect id="ob${i}" x="${x}" y="250" width="120" height="28" rx="10" fill="#14213D"/>`).join('')}</svg>
  <div class="sch" id="lc0" style="left:0;top:308px;background:#B8862F;color:#fff"><span id="lc0I"></span>Output rose in both rooms</div>
  <div class="sch" id="lc1" style="top:308px;background:#14213D;color:#fff"><span id="lc1I"></span>Not the light</div>`;
const RPTS = [[0, 210], [36, 196], [72, 182], [108, 188], [144, 160], [180, 146], [216, 150], [252, 122], [288, 104]];
$('#sp2').innerHTML = `<img id="relImg" src="${IMG}scene-hawthorne-cut.png" style="position:absolute;left:0;top:0;width:360px;height:270px">
  <svg class="abs" style="left:376px;top:0" width="312" height="290"><rect width="312" height="270" rx="20" fill="#F5F1E8"/><text x="20" y="36" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.2" fill="#8A8274">OUTPUT · ROUGH TREND</text>
    <g transform="translate(12 10)"><line x1="0" y1="232" x2="288" y2="232" stroke="#C9BFAE" stroke-width="3"/><polyline id="rLine" points="${RPTS.map(p => p.join(',')).join(' ')}" fill="none" stroke="#B8862F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
  <div class="sch" id="rc0" style="left:0;top:308px;background:#F5F1E8;color:#14213D">Breaks</div><div class="sch" id="rc1" style="top:308px;background:#F5F1E8;color:#14213D">Hours</div><div class="sch" id="rc2" style="top:308px;background:#F5F1E8;color:#14213D">Talks</div>
  <div class="sch" id="rc3" style="top:308px;background:#B8862F;color:#fff"><span id="rc3I"></span>They felt noticed</div>`;
$('#sp3').innerHTML = `<div class="sl" style="left:0;top:20px">INTERVIEWS · 1928 TO 1930</div><div class="serif" id="iCnt" style="position:absolute;left:0;top:52px;font-size:104px;line-height:1;white-space:nowrap">0</div><div class="sl" style="left:0;top:176px">WORKERS, ROUGHLY</div>
  <svg class="abs" style="left:368px;top:10px" width="320" height="250">${Array.from({ length: 40 }, (_, i) => `<g id="ib${i}" transform="translate(${20 + (i % 8) * 40} ${22 + Math.floor(i / 8) * 46})">${icoG('chat', -14, -14, 1.15, i % 5 === 2 ? C.gold : C.ink2, 2)}</g>`).join('')}</svg>
  <div class="sch" id="ic0" style="left:0;top:308px;background:#B8862F;color:#fff"><span id="ic0I"></span>Being listened to mattered</div>`;
const BW = Array.from({ length: 14 }, (_, i) => [52 + (i % 7) * 48, 96 + Math.floor(i / 7) * 76]);
$('#sp4').innerHTML = `<svg class="abs" style="left:0;top:0" width="400" height="290"><rect width="400" height="270" rx="20" fill="#F5F1E8"/><text x="20" y="36" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.2" fill="#8A8274">14 MEN · ONE GROUP</text>
    <rect id="bGrp" x="22" y="58" width="356" height="190" rx="28" fill="none" stroke="#B8862F" stroke-width="3" stroke-dasharray="8 8"/>
    ${BW.map(([x, y], i) => `<g id="bm${i}" transform="translate(${x} ${y})"><circle r="17" fill="${i === 3 ? '#B8862F' : '#14213D'}"/>${icoG('user', -10, -10, 0.84, '#FFFFFF', 2.4)}</g>`).join('')}</svg>
  <svg class="abs" style="left:416px;top:0" width="272" height="290"><rect width="272" height="270" rx="20" fill="#F5F1E8"/><text x="20" y="36" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.2" fill="#8A8274">THE PACE</text>
    <g transform="translate(136 190)"><path d="M-100 0 A100 100 0 0 1 -50 -86.6" fill="none" stroke="#F6E3DC" stroke-width="22"/><path d="M-50 -86.6 A100 100 0 0 1 50 -86.6" fill="none" stroke="#E9D9B5" stroke-width="22"/><path d="M50 -86.6 A100 100 0 0 1 100 0" fill="none" stroke="#F6E3DC" stroke-width="22"/>
      <text x="-96" y="40" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="1.6" fill="#B5482F">SLOW</text><text x="62" y="40" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="1.6" fill="#B5482F">FAST</text><text x="0" y="40" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="1.6" fill="#B8862F">AGREED</text>
      <g id="bNeedle"><line x1="0" y1="0" x2="0" y2="-82" stroke="#14213D" stroke-width="6" stroke-linecap="round"/></g><circle r="11" fill="#B8862F"/></g></svg>
  <div class="sch" id="bc0" style="left:0;top:308px;background:#14213D;color:#fff"><span id="bc0I"></span>Their own unwritten rules</div>
  <div class="sch" id="bc1" style="top:308px;background:#B8862F;color:#fff"><span id="bc1I"></span>The group sets the pace</div>`;
$('#lc0I').innerHTML = M.icon('trendUp', 22, '#fff', 2.4); $('#lc1I').innerHTML = M.icon('x', 22, C.gold2, 2.6);
$('#rc3I').innerHTML = M.icon('eye', 22, '#fff', 2.4); $('#ic0I').innerHTML = M.icon('chat', 22, '#fff', 2.4);
$('#bc0I').innerHTML = M.icon('clipboard', 22, C.gold2, 2.4); $('#bc1I').innerHTML = M.icon('users', 22, '#fff', 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// F: four lessons
const LC = [['users', 'LESSON 01', 'People are social', 'They want to belong'], ['eye', 'LESSON 02', 'Attention lifts output', 'Being noticed makes people try harder'],
  ['network', 'LESSON 03', 'Informal groups', 'They shape how hard people work'], ['coin', 'LESSON 04', 'Money is not everything', 'It matters, but it is not the only motivator']];
$('#lCards').innerHTML = LC.map(([ic, n, t, s], i) => `<div class="lc" id="le${i}" style="left:${160 + (i % 2) * 816}px;top:${270 + Math.floor(i / 2) * 306}px"><div class="bg"></div><div class="li"></div><div class="ln">${n}</div><div class="serif lt">${t}</div><div class="lh"></div><div class="ls">${s}</div>${i === 1 ? '<div id="hwc">HAWTHORNE EFFECT</div>' : ''}</div>`).join('');

// K: at work today
const KA = [
  ['award', 'Recognition', 'Thank people by name', 'Ravi thanks Asha for her ginger chai', 'trophy', 'An employee of the month'],
  ['chat', 'Listening', 'Ask people how they feel', 'A five minute team chat every morning', 'clipboard', 'Staff surveys, and acting on them'],
  ['users', 'Belonging', 'Build real teams', 'The whole team has tea together at 3 PM', 'user', 'A buddy for every new joiner on day one'],
  ['network', 'Informal groups', 'Work with them, not against them', 'Ravi asks Kabir, the team favourite, for help', 'star', "Win over the team's natural leader"],
  ['heart', 'Beyond money', 'Care about the whole person', "Ravi swaps a shift for a helper's exam", 'calendar', 'Flexible hours for parents and students'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['MAYO TODAY', 'Five habits', 'Good managers use them every day', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A BIG OFFICE</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>People first, results follow</span></div>`) + `</div>`).join('');

// X: the limits
const XG = [['users', 'Teams'], ['heart', 'Feelings'], ['chat', 'Talking']];
const XH = [['user', 'Small studies'], ['x', 'Poor controls'], ['trendDown', 'Effect overstated']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#xp0I').innerHTML = M.icon('trendDown', 24, C.red, 2.4); $('#xp1I').innerHTML = M.icon('heart', 24, C.gold, 2.4); $('#xp2I').innerHTML = M.icon('trendUp', 24, C.ink, 2.4);
$('#xfvI').innerHTML = M.icon('coin', 34, C.gold, 2.2);
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Scientific management', 'Hawthorne effect', 'Unity of command', 'Red tape'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('eye', 44, C.gold2, 2.4);
// recap
const ROWS = [['clock', 'Hawthorne studies, 1924 to 1932', ['Near Chicago']], ['users', 'Workers are social beings', ['Not machines']], ['heart', 'What raises output', ['Attention', 'Belonging', 'Teams']]];
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
const fmtN = v => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// the four Hawthorne stages at time t
const runStages = t => {
  let s = -1; tSt.forEach((a, i) => { if (t >= a - 0.05) s = i; });
  // timeline
  const tp = M.track(0, [[t1924, 0.02], ...tSt.map((a, i) => [a, (SY[i] - 1924) / 8 + 0.02]), [tSt[3] + 2.5, 1]], M.SOFT)(t);
  M.drawU($('#tlP'), tp); M.hide($('#tlP'), t < t1924);
  SY.forEach((_, i) => {
    const g = $('#tm' + i), tin = t1924 + i * 0.35; fadeG(g, t, tin);
    const on = s >= i, act = s === i, c = g.querySelector('circle'), tx = g.querySelector('text');
    const f = act ? C.ink : on ? C.gold : '#FFFFFF', st = act ? C.ink : on ? C.gold : '#C9BFAE';
    if (c._f !== f) { c._f = f; c.setAttribute('fill', f); c.setAttribute('stroke', st); tx.setAttribute('fill', act || on ? '#FFFFFF' : '#8A8274'); }
  });
  // stage list
  ST.forEach(([ic], i) => {
    const el = $('#hr' + i), ta = tSt[i], td = i < 3 ? tSt[i + 1] : tWout + 1;
    const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
    el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
    el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
    el.querySelector('.rs').style.color = t < ta ? C.paper2 : mix(C.gold2, C.muted, off);
    el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
    el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
    const ry = el.querySelector('.ry'); ry.style.background = t < ta ? C.paper2 : mix(C.gold, C.gold3, off); ry.style.color = t < ta ? C.dim : mix('#fff', C.gold, off);
    setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 30, 2.2);
  });
  // panels
  const pin = [tW2 + 0.3, ...tSt], pout = [tSt[0] - 0.2, tSt[1] - 0.2, tSt[2] - 0.2, tSt[3] - 0.2, 1e9];
  for (let k = 0; k < 5; k++) M.vis($('#sp' + k), t, pin[k], pout[k], { dy: 18, outDur: 0.2, ody: -12 });
  OT.forEach((_, i) => M.vis($('#ot' + i), t, [t1924, t1924 + 0.4, tFour - 0.2, tFour + 0.1][i], 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 }));
  if (t < tSt[1] + 0.2) { // lighting
    const up = M.io((t - tUpL) / 0.6);
    const gT = $('#lTG'); setA(gT, 'r', (56 + 28 * up).toFixed(1)); setA(gT, 'fill', mix(C.gold2, '#F2C66B', up));
    const rise = M.o5((t - tRose) / 1.2);
    [0, 1].forEach(i => setA($('#ob' + i), 'width', (120 + (i ? 150 : 170) * rise).toFixed(1)));
    M.vis($('#lc0'), t, tBoth, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#lc1'), t, tCause - 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }
  if (t >= tSt[1] - 0.3 && t < tSt[2] + 0.2) { // relay room
    M.vis($('#relImg'), t, tSt[1] + 0.2, 1e9, { dy: 16, sp: M.SOFT });
    M.draw($('#rLine'), t, tOut2 - 0.1, 1.4, M.io);
    [tBreaks, tHours, tTalk, tNoticed].forEach((ta, i) => M.vis($('#rc' + i), t, ta - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
  }
  if (t >= tSt[2] - 0.3 && t < tSt[3] + 0.2) { // interviews
    M.count($('#iCnt'), t, tTw - 0.1, 1.6, 0, 20000, fmtN);
    for (let i = 0; i < 40; i++) fadeG($('#ib' + i), t, tTw - 0.1 + i * 0.05, 1e9, 0.12);
    M.vis($('#ic0'), t, tListen - 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }
  if (t >= tSt[3] - 0.3) { // bank wiring
    BW.forEach((_, i) => fadeG($('#bm' + i), t, tFourteen - 0.1 + i * 0.05, 1e9, 0.12));
    M.draw($('#bGrp'), t, tOwn - 0.1, 0.8, M.o3);
    const ang = M.track(0, [[tFourteen, 0], [tFast - 0.05, 52], [tSlow - 0.05, -52], [tPace - 0.3, 0]], [7, 0.8])(t);
    setA($('#bNeedle'), 'transform', `rotate(${ang.toFixed(2)})`);
    M.vis($('#bc0'), t, tUnw - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#bc1'), t, tGroup - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const c0 = $('#cc0'); $('#cc1').style.left = (36 + c0.offsetWidth + 12) + 'px'; const c2 = $('#cc2'); c2.style.left = (884 - c2.offsetWidth) + 'px';
  const fa = $('#father'); fa.style.left = (308 - fa.offsetWidth / 2) + 'px';
  const tg = $('#tgT'); tg.style.left = (128 - tg.offsetWidth) + 'px'; $('#tgW').style.left = '660px';
  ['#dq', '#fq'].forEach(id => { const el = $(id); if (el.offsetWidth > 1600) el.style.fontSize = Math.floor(88 * 1600 / el.offsetWidth) + 'px'; });
  const b1 = $('#bk1'); if (b1.offsetWidth > 712) b1.style.fontSize = Math.floor(52 * 712 / b1.offsetWidth) + 'px';
  const l0 = $('#lc0'); $('#lc1').style.left = (l0.offsetWidth + 16) + 'px';
  let x = 0; for (let i = 0; i < 4; i++) { const r = $('#rc' + i); r.style.left = x + 'px'; x += r.offsetWidth + 12; }
  const b0 = $('#bc0'); $('#bc1').style.left = (b0.offsetWidth + 16) + 'px';
  const xp1 = $('#xp1'); const xn = $('#xne'); xn.style.left = (48 + xp1.offsetWidth + 20) + 'px'; $('#xp2').style.left = (48 + xp1.offsetWidth + 40 + xn.offsetWidth) + 'px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
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
  M.vis($('#exChip'), t, tMorph + 0.5, tT - 0.3, { dy: 10, outDur: 0.3 });

  /* ===== A: paid well, still slow ===== */
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
    const gl = M.io((t - tListens - 0.3) / 0.3), qu = M.io((t - tQuiet) / 0.3) * (1 - gl);
    [0, 1, 2].forEach(i => {
      M.vis($('#ta' + i), t, tMorph + 0.5 + i * 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#tn' + i), t, tMorph + 0.58 + i * 0.1, 1e9, { dy: 10 });
      const a = $('#ta' + i); a.style.boxShadow = '0 0 0 4px ' + mix(mix(C.ink, C.dim, qu), C.gold, gl);
      a.style.filter = qu > 0.01 ? `grayscale(${(qu * 0.8).toFixed(2)})` : '';
    });
    M.vis($('#op0'), t, tWell - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#op1'), t, tQuiet - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#op2'), t, tListens - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const g = M.o5((t - tFaster) / 1.0), v = 40 + 20 * g;
    M.vis($('#cVal'), t, tMorph + 0.7, 1e9, { dy: 10 }); M.setT($('#cVal'), String(Math.round(v)));
    $('#cVal').style.color = g > 0.5 ? C.gold : C.ink;
    M.vis($('#cBar'), t, tMorph + 0.6, 1e9, { dy: 10 });
    const f = $('#cFill'); f.style.width = (848 * v / 70 * M.o5((t - tMorph - 0.7) / 0.9)).toFixed(1) + 'px'; f.style.background = mix(C.ink, C.gold, M.io((t - tFaster) / 0.4));
    M.vis($('#cc0'), t, tMoney - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#cc1'), t, tNothing - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#cc2'), t, tFaster + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: Elton Mayo ===== */
  const dOn = t >= tTu - 0.05 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    const tay = $('#tay'), sh = M.spring(t - tD2 + 0.1, M.HEAVY), tw = M.lerp(1600, 616, sh);
    M.vis(tay, t, tD1 - 0.1, tDout, { dy: 36, ...o });
    snap(tay, (sh >= 1 ? 616 : tw.toFixed(1)) + 'px', 'width');
    snap($('#tayIn'), (sh >= 1 ? 0 : ((tw - 616) / 2).toFixed(1)) + 'px', 'left');
    M.vis($('#port'), t, tD1 + 0.1, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.rise($('#tname'), t, tElton - 0.05, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ttag'), t, tAus - 0.05, 1e9, { dy: 10 });
    M.vis($('#father'), t, tHarv - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const soc = $('#soc'); M.vis(soc, t, tD2 + 0.12, tDout, { dx: 60, dy: 0, ...o }); growH(soc, $('#socIn'), t, tD3);
    M.rise($('#sc1'), t, tWhat - 0.2, { st: 0.06 }); M.rise($('#sc2'), t, tWhat + 0.3, { st: 0.06 });
    M.vis($('#qS'), t, tD2 + 0.4, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#bk'), t, tD3 + 0.12, tDout, { dy: 36, ...o });
    M.vis($('#bkI'), t, tD3 + 0.35, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.rise($('#bk1'), t, tHuman - 0.1, { st: 0.07 });
  }

  /* ===== M: definition ===== */
  const mOn = t >= tM1 - 0.1 && t < tW1 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tM1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tM2 - 0.15, outDur: 0.3 });
    const def = $('#def'); M.vis(def, t, tM2 + 0.05, tMout, { dy: 36, ...o }); growH(def, $('#defIn'), t, tM3);
    M.rise($('#dl1'), t, tPeople - 0.1, { st: 0.06 }); M.rise($('#dl2'), t, tNot - 0.1, { st: 0.06 });
    [tNot, tVal, tTeam].forEach((ta, i) => M.vis($('#dw' + i), t, ta, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }));
    M.vis($('#cmT'), t, tMTay - 0.05, tMout, { dy: 36, ...o });
    M.vis($('#cmM'), t, tMMay - 0.05, tMout, { dy: 36, ...o });
  }

  /* ===== W: the Hawthorne studies ===== */
  const wOn = t >= tW1 - 0.1 && t < tF0 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tW1 + 0.05, tSt[0] - 0.3, { dy: 36, ...o });
    grow(ill, $('#illOut'), t, tW2);
    M.vis($('#illImg'), t, tW1 + 0.25, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgT'), t, tHaw - 0.1, tW2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgW'), t, tWest - 0.1, tW2 - 0.3, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#hs'), t, tW2 + 0.12, tWout, { dx: 60, dy: 0, ...o });
    M.vis($('#tl'), t, tW2 + 0.3, 1e9, { dy: 10 });
    M.vis($('#hl'), t, tSt[0] + 0.05, tWout, { dy: 36, ...o });
    ST.forEach((_, i) => M.vis($('#hr' + i), t, tSt[0] + 0.25 + i * 0.07, 1e9, { dy: 14 }));
    runStages(t);
  }

  /* ===== F: four lessons ===== */
  const fOn = t >= tF0 - 0.1 && t < tK0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    M.rise($('#fq'), t, tF0 + 0.05, { st: 0.07, sp: M.HEAVY, out: tF[0] - 0.35, outDur: 0.25 });
    LC.forEach(([ic], i) => {
      const el = $("#le" + i), ta = tF[i];
      M.vis(el, t, tF[0] - 0.05 + i * 0.08, tFout, { dy: 40, outDur: 0.3, ody: -16 });
      const lit = t >= ta - 0.05, nav = i === 1 ? M.io((t - tHawE + 0.1) / 0.35) : 0;
      el.querySelector('.bg').style.background = mix(C.card, C.ink, nav);
      el.querySelector('.ln').style.color = lit ? (nav > 0.5 ? C.gold2 : C.gold) : C.dim;
      el.querySelector('.lt').style.color = lit ? mix(C.ink, '#fff', nav) : C.dim;
      const li = el.querySelector('.li'); li.style.background = lit ? mix(C.gold3, C.navy2, nav) : C.paper;
      setIco(li, ic, lit ? (nav > 0.5 ? C.gold2 : C.gold) : C.dim, 44, 2.2);
      el.querySelector('.lh').style.background = mix(C.line, C.navy3, nav);
      const ls = el.querySelector('.ls'); M.vis(ls, t, ta + 0.35, 1e9, { dy: 10 }); ls.style.color = mix(C.ink2, C.gold2, nav);
    });
    M.vis($('#hwc'), t, tHawE - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
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
    M.rise($('#xt1'), t, tX4 + 0.4, { st: 0.06 }); M.rise($('#xt2'), t, tFound + 0.2, { st: 0.06 });
    M.vis($('#xp0'), t, tXh[2] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#xp1'), t, tHappy - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#xne'), t, tProd - 0.4, 1e9, { dy: 8 });
    M.vis($('#xp2'), t, tProd - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#xfv'), t, tFair - 0.1, 1e9, { dy: 18 });
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'What') - 0.05, { st: 0.06, sp: M.HEAVY });
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
