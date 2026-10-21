// Engg CS - Engineering Mathematics, Ep 01: Functions, Limits and Continuity (Dabba Dash)
(() => {
const { $ } = M;
const C = { bg: '#0A1022', pan: '#101A33', pan2: '#0D1630', ln: '#22305A', cy: '#38D9F5', cyd: '#123A52', tx: '#FFFFFF', mut: '#6F7FA6', ink: '#C9D3EC', dim: '#3A4A75', soft: '#9FB3D9' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
Object.assign(M.IC, {
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  hosp: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
  receipt: ['M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8', 'M12 17.5v-11'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  scooter: ['M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M7 16h8l3-7h-4', 'M5 14 8 8h4'],
  dot: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  arrows: ['M2 12h7', 'm6 9 3 3-3 3', 'M22 12h-7', 'm18 9-3 3 3 3'],
  pen: ['M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z'],
});
const IMG = '../../assets/illustrations/engg-cs/';
const FACE = n => `background-image:url(${IMG}ecs-${n}-face.jpg)`;

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tRohan = wt('H2', 'Rohan'), tNothing = wt('H2', 'nothing');
const tC2 = T0('C2'), tFat = wt('C2', 'Fatima'), tThirty = wt('C2', 'thirty'), tFair = wt('C2', 'Fair');
const tL1 = T0('L1'), tL2 = T0('L2'), tAout = tL1 - 0.32;
const tKav = wt('L1', 'Kavya'), tCant = wt('L2', 'canteen'), tRoh2 = wt('L2', 'Rohan'), tFat2 = wt('L2', 'Fatima');
const tF2 = T0('F2'), tF3 = T0('F3'), tF4 = T0('F4'), tLout = tF2 - 0.32;
const tDom = wt('F4', 'domain'), tRan = wt('F4', 'range');
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD5 = T0('D5'), tFout = tD1 - 0.32, tDout = T0('M1') - 0.32;
const tM1 = T0('M1'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tMout = T0('I2') - 0.32;
const tLv = [0, 1, 2].map(k => wt('M2', 'one', k)), tRv = [0, 1, 2].map(k => wt('M4', 'two', k));
const tI2 = T0('I2'), tI3 = T0('I3'), tI4 = T0('I4'), tI5 = T0('I5'), tIout = T0('T1') - 0.32;
const tSq = wt('I2', 'squared'), tZz = wt('I2', 'gives'), tAt2 = wt('I4', 'At', 1);
const tT = T0('T1'), tSt2 = wt('T1', 'not'), tC1 = T0('C1'), tTu = tC1 - 0.32;
const tCk = [T0('C2b'), T0('C3'), T0('C4')], tC5 = T0('C5'), tCout = T0('R1') - 0.32;
const tR1 = T0('R1'), tR3 = T0('R3'), tR4 = T0('R4'), tK0 = T0('K0'), tRout = tK0 - 0.32;
const tK = [1, 2, 3].map(i => T0('K' + i)), tX1 = T0('X1'), tKout = tX1 - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'hospital'), wt('K3', 'Tax')];
const tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'fair'), wt('X2', 'calculus')], tXh = [wt('X3', 'orders'), wt('X3', 'rounded')], tW = wt('X4', '1872');
const tQ = T0('Q1'), tXout = tX7 + 3.0, tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'left');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'output')], [wt('S3', 'heading'), wt('S3', 'both')], [wt('S4', 'value'), wt('S4', 'match')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const attr = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const svg = (h) => h;
const T = (x, y, s, txt, o = '') => `<text x="${x}" y="${y}" font-size="${s}" font-weight="600" ${o}>${txt}</text>`;

// A
$('#kitI').innerHTML = M.icon('store', 28, C.cy, 2.2);
$('#ticks').innerHTML = [1, 2, 3].map(k => `<line x1="${92 + k * 208}" y1="336" x2="${92 + k * 208}" y2="356" stroke="#3A4A75" stroke-width="3"/>` + T(92 + k * 208, 398, 16, k + ' KM', 'text-anchor="middle" letter-spacing="2" fill="#6F7FA6"')).join('');
$('#faR').style.cssText += ';' + FACE('rohan'); $('#faF').style.cssText += ';' + FACE('fatima'); $('#faK').style.cssText += ';' + FACE('kavya');
// L
const TILES = [['store', '1', 'KITCHEN'], ['cap', '1', 'COLLEGE'], ['pin', '3 km', 'DELIVERY RADIUS']];
$('#tiles').innerHTML = TILES.map(([ic, v, l], i) => `<div class="tile" id="tl${i}" style="left:${36 + i * 230}px"><div class="ti">${M.icon(ic, 32, C.cy, 2.2)}</div><div class="tv">${v}</div><div class="tl">${l}</div></div>`).join('');
const TEAM = [['kavya', 'Kavya', 'FOUNDER'], ['joseph', 'Joseph uncle', 'KITCHEN'], ['rohan', 'Rohan', 'SERVERS'], ['fatima', 'Fatima', 'NUMBERS']];
$('#tRow').innerHTML = TEAM.map(([f, n, r], i) => { const cx = 121 + i * 178; return `<div class="av" id="tv${i}" style="left:${cx - 36}px;top:76px;${FACE(f)}"></div><div class="tnm" id="tn${i}" style="left:${cx - 85}px">${n}</div><div class="trl" id="tr${i}" style="left:${cx - 85}px">${r}</div>`; }).join('');
wrap($('#ill'), 'illOut', 784, 580);
// F
const FIN = [['0.5 km', '₹0'], ['1.9 km', '₹0'], ['2.1 km', '₹30'], ['2.8 km', '₹30']];
const tFc = [tF2 + 0.5, tF2 + 2.6, tF3 + 0.15, tF3 + 2.0];
$('#logs').innerHTML = FIN.map(([a, b], i) => `<div class="lg" id="lg${i}">${a} → <span style="color:#38D9F5;margin-left:8px">${b}</span></div>`).join('');
wrap($('#fm'), 'fmOut', 784, 580);
// D
$('#st3s').innerHTML = [['STEP 1', 'x gets close<br>to a'], ['STEP 2', 'f(x) gets<br>close to L'], ['STEP 3', 'L is the<br>limit']].map(([n, t], i) => `<div class="st3" id="s3${i}" style="left:${48 + i * 243}px"><div class="zn">${n}</div><div class="zt">${t}</div></div>`).join('') +
  `<div class="lbl" id="notaR" style="left:48px;top:270px">READ: THE LIMIT OF f(x), AS x GOES TO a, IS L</div>`;
wrap($('#kq'), 'kqOut', 784, 580);
// M: zoomed graph near 2 km
const mx = d => 104 + (d - 1.5) * 560, my = f => 390 - f * 8.7;
$('#mgS').innerHTML = `<line x1="104" y1="420" x2="700" y2="420" stroke="#22305A" stroke-width="3"/><line x1="104" y1="110" x2="104" y2="420" stroke="#22305A" stroke-width="3"/>` +
  [1.5, 2, 2.5].map(d => T(mx(d), 452, 18, d.toFixed(1) + ' km', 'text-anchor="middle" fill="#6F7FA6"')).join('') +
  T(90, 396, 18, '₹0', 'text-anchor="end" fill="#6F7FA6"') + T(90, my(30) + 6, 18, '₹30', 'text-anchor="end" fill="#6F7FA6"') +
  `<line x1="${mx(2)}" y1="104" x2="${mx(2)}" y2="420" stroke="#3A4A75" stroke-width="2" stroke-dasharray="6 8"/>` +
  `<path id="mLo" d="M104 390 H${mx(2)}" stroke="#38D9F5" stroke-width="6" fill="none"/><path id="mHi" d="M${mx(2)} ${my(30)} H700" stroke="#38D9F5" stroke-width="6" fill="none"/>` +
  `<circle id="mDot0" cx="${mx(2)}" cy="390" r="10" fill="#38D9F5"/><circle id="mDot1" cx="${mx(2)}" cy="${my(30)}" r="10" fill="#101A33" stroke="#38D9F5" stroke-width="4"/>` +
  `<g id="pL"><line id="pLv" y1="0" y2="420" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 6"/><circle id="pLc" r="13" fill="#FFFFFF"/></g>` +
  `<g id="pR"><line id="pRv" y1="0" y2="420" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 6"/><circle id="pRc" r="13" fill="#FFFFFF"/></g>` +
  `<g id="jmp"><path d="M${mx(2) + 30} 396 V${my(30) - 6}" stroke="#38D9F5" stroke-width="3"/><path d="M${mx(2) + 22} 380 l8 12 8 -12 M${mx(2) + 22} ${my(30) + 12} l8 -12 8 12" stroke="#38D9F5" stroke-width="3" fill="none"/>` + T(mx(2) + 48, 270, 20, 'JUMP OF ₹30', 'fill="#38D9F5" letter-spacing="2"') + `</g>`;
const VL = ['1.9', '1.99', '1.999'], VR = ['2.1', '2.01', '2.001'];
$('#colL').innerHTML += VL.map((v, i) => `<div class="vr" id="vl${i}" style="top:${44 + i * 64}px"><div class="a">d = ${v}</div><div class="b">₹0</div></div>`).join('') + `<div class="lim" id="limL">LEFT LIMIT = <span class="acc" style="margin-left:12px">0</span></div>`;
$('#colR').innerHTML += VR.map((v, i) => `<div class="vr" id="vr${i}" style="top:${44 + i * 64}px"><div class="a">d = ${v}</div><div class="b">₹30</div></div>`).join('') + `<div class="lim" id="limR">RIGHT LIMIT = <span class="acc" style="margin-left:12px">30</span></div>`;
$('#vI').innerHTML = M.icon('x', 34, C.cy, 2.6);
// I: hole graph
const hx = v => 104 + v * 290, hy = v => 430 - v * 100;
$('#hS').innerHTML = `<line x1="104" y1="430" x2="720" y2="430" stroke="#22305A" stroke-width="3"/><line x1="104" y1="110" x2="104" y2="430" stroke="#22305A" stroke-width="3"/>` +
  T(hx(1), 462, 18, 'x = 1', 'text-anchor="middle" fill="#6F7FA6"') + T(hx(2), 462, 18, '2', 'text-anchor="middle" fill="#6F7FA6"') + T(90, hy(2) + 6, 18, '2', 'text-anchor="end" fill="#6F7FA6"') +
  `<line x1="${hx(1)}" y1="${hy(2)}" x2="${hx(1)}" y2="430" stroke="#3A4A75" stroke-width="2" stroke-dasharray="6 8"/><line x1="104" y1="${hy(2)}" x2="${hx(1)}" y2="${hy(2)}" stroke="#3A4A75" stroke-width="2" stroke-dasharray="6 8"/>` +
  `<path id="hLine" d="M${hx(0)} ${hy(1)} L${hx(2)} ${hy(3)}" stroke="#38D9F5" stroke-width="6" fill="none"/>` +
  `<circle id="hHole" cx="${hx(1)}" cy="${hy(2)}" r="12" fill="#101A33" stroke="#FFFFFF" stroke-width="4"/><circle id="hRing" cx="${hx(1)}" cy="${hy(2)}" r="26" fill="none" stroke="#38D9F5" stroke-width="3"/>` +
  `<circle id="hL" r="11" fill="#FFFFFF"/><circle id="hR" r="11" fill="#FFFFFF"/>` +
  `<g id="hLt"><rect x="150" y="120" width="230" height="44" rx="4" fill="#0D1630" stroke="#22305A" stroke-width="2"/>` + T(265, 150, 22, 'f(0.99) = 1.99', 'text-anchor="middle" fill="#FFFFFF"') + `</g>` +
  `<g id="hRt"><rect x="452" y="300" width="230" height="44" rx="4" fill="#0D1630" stroke="#22305A" stroke-width="2"/>` + T(567, 330, 22, 'f(1.01) = 2.01', 'text-anchor="middle" fill="#FFFFFF"') + `</g>` +
  `<g id="hLim"><rect x="150" y="${hy(2) - 56}" width="196" height="44" rx="4" fill="#123A52" stroke="#38D9F5" stroke-width="2"/>` + T(248, hy(2) - 26, 22, 'LIMIT = 2', 'text-anchor="middle" fill="#38D9F5"') + `</g>`;
// C: three checks + graph
const CK = [['dot', 'f(a) has a value'], ['arrows', 'The limit exists'], ['equal', 'Limit = f(a)']];
$('#cRows').innerHTML = CK.map(([ic, t], i) => `<div class="kr" id="ck_${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div><div class="ok">${M.icon('check', 26, C.bg, 3)}</div></div>`).join('');
$('#cPenI').innerHTML = M.icon('pen', 22, C.cy, 2.2);
const cxu = u => 104 + u * 776, cyu = u => 420 - 70 - 230 * (u * u * (3 - 2 * u)) + 20 * Math.sin(u * Math.PI * 2);
let cpth = ''; for (let i = 0; i <= 80; i++) { const u = i / 80; cpth += (i ? 'L' : 'M') + cxu(u).toFixed(1) + ' ' + cyu(u).toFixed(1); }
const ax = cxu(0.5), ay = cyu(0.5);
$('#cS').innerHTML = `<line x1="104" y1="440" x2="900" y2="440" stroke="#22305A" stroke-width="3"/><line x1="104" y1="110" x2="104" y2="440" stroke="#22305A" stroke-width="3"/>` +
  `<path id="cBase" d="${cpth}" stroke="#3A4A75" stroke-width="6" fill="none"/><path id="cDraw" d="${cpth}" stroke="#38D9F5" stroke-width="6" fill="none"/>` +
  `<g id="cG1"><line x1="${ax}" y1="${ay}" x2="${ax}" y2="440" stroke="#3A4A75" stroke-width="2" stroke-dasharray="6 8"/>` + T(ax, 472, 20, 'a', 'text-anchor="middle" fill="#6F7FA6"') + `<circle cx="${ax}" cy="${ay}" r="12" fill="#FFFFFF"/>` + T(ax - 26, ay - 20, 22, 'f(a)', 'text-anchor="end" fill="#FFFFFF"') + `</g>` +
  `<g id="cAL"><path d="M-12 -10 L10 0 L-12 10 Z" fill="#38D9F5"/></g><g id="cAR"><path d="M12 -10 L-10 0 L12 10 Z" fill="#38D9F5"/></g>` +
  `<g id="cG2"><rect x="${ax - 120}" y="${ay + 40}" width="240" height="44" rx="4" fill="#0D1630" stroke="#22305A" stroke-width="2"/>` + T(ax, ay + 70, 20, 'LEFT = RIGHT', 'text-anchor="middle" fill="#38D9F5" letter-spacing="2"') + `</g>` +
  `<g id="cG3"><circle cx="${ax}" cy="${ay}" r="28" fill="none" stroke="#38D9F5" stroke-width="3"/><rect x="${ax - 120}" y="${ay + 96}" width="240" height="44" rx="4" fill="#123A52" stroke="#38D9F5" stroke-width="2"/>` + T(ax, ay + 126, 20, 'LIMIT = f(a)', 'text-anchor="middle" fill="#FFFFFF" letter-spacing="2"') + `</g>` +
  `<g id="cPenT"><g transform="translate(-4 -28)">${M.icon('pen', 30, '#FFFFFF', 2.2).replace('<svg', '<svg x="0" y="0"')}</g><circle r="7" fill="#FFFFFF"/></g>`;
// R: before / after
const rx = d => 104 + d * 190, ry = f => 400 - f * 8;
const axes = `<line x1="104" y1="420" x2="700" y2="420" stroke="#22305A" stroke-width="3"/><line x1="104" y1="130" x2="104" y2="420" stroke="#22305A" stroke-width="3"/>` +
  [1, 2, 3].map(k => T(rx(k), 452, 18, k + ' km', 'text-anchor="middle" fill="#6F7FA6"')).join('') + [0, 15, 30].map(f => T(90, ry(f) + 6, 18, '₹' + f, 'text-anchor="end" fill="#6F7FA6"')).join('') +
  `<line x1="${rx(2)}" y1="140" x2="${rx(2)}" y2="420" stroke="#3A4A75" stroke-width="2" stroke-dasharray="6 8"/>`;
const mk = (id, face, x, y, lx, ly, txt, anc) => `<g id="${id}"><circle cx="${x}" cy="${y}" r="9" fill="#FFFFFF"/><clipPath id="${id}c"><circle cx="${lx}" cy="${ly}" r="20"/></clipPath><circle cx="${lx}" cy="${ly}" r="22" fill="#22305A"/><image href="${IMG}ecs-${face}-face.jpg" x="${lx - 20}" y="${ly - 20}" width="40" height="40" clip-path="url(#${id}c)"/>` + T(anc === 'end' ? lx - 30 : lx + 30, ly + 8, 22, txt, `text-anchor="${anc}" fill="#FFFFFF"`) + `</g>`;
$('#rbS').innerHTML = axes + `<path id="v1a" d="M104 400 H${rx(2)}" stroke="#38D9F5" stroke-width="6" fill="none"/><path id="v1b" d="M${rx(2)} ${ry(30)} H${rx(3)}" stroke="#38D9F5" stroke-width="6" fill="none"/><circle cx="${rx(2)}" cy="400" r="9" fill="#38D9F5"/><circle cx="${rx(2)}" cy="${ry(30)}" r="9" fill="#101A33" stroke="#38D9F5" stroke-width="4"/>` +
  `<circle id="rbD" r="12" fill="#FFFFFF"/>` + mk('mkR1', 'rohan', rx(1.9), 400, 290, 340, 'Rohan ₹0', 'end') + mk('mkF1', 'fatima', rx(2.1), ry(30), 600, 236, 'Fatima ₹30', 'start');
$('#raS').innerHTML = axes + `<path id="v2" d="M104 400 H${rx(1)} L${rx(3)} ${ry(30)}" stroke="#38D9F5" stroke-width="6" fill="none"/><circle id="raP" cx="${rx(2)}" cy="${ry(15)}" r="12" fill="#101A33" stroke="#38D9F5" stroke-width="4"/>` +
  `<circle id="raD" r="12" fill="#FFFFFF"/>` + mk('mkR2', 'rohan', rx(1.9), ry(13.5), 250, 250, 'Rohan ₹13.50', 'start') + mk('mkF2', 'fatima', rx(2.1), ry(16.5), 560, 360, 'Fatima ₹16.50', 'start');
// K: at work today
const KA = [
  ['code', 'Functions', 'One input, exactly one output', 'Distance in, one delivery fee out', 'bank', 'A bank: loan amount in, one monthly payment out'],
  ['target', 'Limits', 'Where a value is heading', 'Near your door, the delivery time heads to zero', 'hosp', 'A steady drip settles a medicine at one level'],
  ['trendUp', 'Continuity', 'No sudden jumps', 'Fee v2 rises smoothly at every distance', 'receipt', 'Tax slabs: a higher rate only above each limit'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr2" id="kr${i}" style="top:${100 + i * 130}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['ENGINEERING TODAY', 'Three ideas', 'You will meet them everywhere', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 03`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="h pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i style="${FACE('kavya')};border-color:#38D9F5"></i><div class="kl">AT DABBA DASH</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.cy, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CANTEEN APP TO A HOSPITAL</div><div class="pe"><i>${M.icon('cpu', 34, C.cy, 2.2)}</i><span>Same maths, any size of system</span></div>`) + `</div>`).join('');
// X
const XG = [['check', 'Fair and predictable'], ['chart', 'Calculus needs it']];
const XH = [['minus', 'Whole orders'], ['coin', 'Rounded prices']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px;background:#123A52;color:#38D9F5">${M.icon(ic, 22, C.cy, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px;background:#0D1630;border:2px solid #22305A;color:#C9D3EC">${M.icon(ic, 22, C.ink, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#6F7FA6" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#6F7FA6" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="4" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#0D1630" stroke="#6F7FA6" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#38D9F5', 'L'); $('#panR').innerHTML = pan('#9FB3D9', 'R');
{ let p = ''; const N = 1376; for (let i = 0; i <= N; i++) { const x = i / N; let w = 0; for (let n = 0; n < 4; n++) w += Math.pow(0.6, n) * Math.cos(Math.pow(11, n) * Math.PI * x * 1.3); p += (i ? 'L' : 'M') + (i * 688 / N).toFixed(1) + ' ' + (70 - w * 26).toFixed(1); } $('#wP').setAttribute('d', p); }
$('#xrF0').style.cssText += ';' + FACE('fatima'); $('#xrF1').style.cssText += ';' + FACE('kavya');
$('#bb1I').innerHTML = M.icon('check', 22, C.cy, 3); $('#bothI').innerHTML = M.icon('trendUp', 52, C.cy, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz + recap
const OPTS = ['Yes, always', 'No, it jumps', 'Only at 3 km', 'Yes, if f(2) = 0'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot h">${o}</div><div class="ok">${M.icon('check', 30, C.bg, 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('arrows', 44, C.cy, 2.4);
const ROWS = [['code', 'One input, exactly one output', ['f(d)']], ['target', 'A limit: where it is heading', ['From the left', 'From the right']], ['check', 'Continuous: value = limit', ['No jumps', 'No holes']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.cy, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.cy, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const pop = (el, t, a, b = 1e9) => M.vis(el, t, a, b, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
const tr = (el, x, y) => attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
const op = (el, t, a, b = 1e9, f = 0.15) => { const v = M.clamp((t - a) / f) * (1 - M.clamp((t - b) / 0.3)); M.hide(el, v <= 0.001); el.style.opacity = v.toFixed(3); };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const fr = $('#feeR'); fr.style.left = (470 - fr.offsetWidth) + 'px'; $('#feeF').style.left = '546px';
  $('#tgJ').style.left = (72 - $('#tgJ').offsetWidth) + 'px'; $('#tgJ').style.top = '220px'; $('#tgK').style.left = '712px'; $('#tgK').style.top = '330px';
  geo.inW = $('#inC').offsetWidth; geo.outW = $('#outC').offsetWidth;
  let x = 48; FIN.forEach((_, i) => { const l = $('#lg' + i); l.style.left = x + 'px'; x += l.offsetWidth + 12; });
  $('#rg1').style.left = (196 + $('#rg0').offsetWidth + 16) + 'px'; $('#rgN').style.left = (196 + $('#rg0').offsetWidth + $('#rg1').offsetWidth + 52) + 'px';
  const f = $('#ifx'); if (f.offsetWidth > 688) f.style.fontSize = Math.floor(40 * 688 / f.offsetWidth) + 'px';
  let cx = 300; for (let i = 0; i < 3; i++) { const c = $('#ck' + i); c.style.left = cx + 'px'; c.style.top = '500px'; cx += c.offsetWidth + 12; }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(80 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  const q = $('#qq1'); if (q.offsetWidth > 1420) q.style.fontSize = Math.floor(64 * 1420 / q.offsetWidth) + 'px';
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const riderX = M.track(92, [[tRohan + 0.1, 487], [tFat + 0.1, 529]], M.SOFT);
// approach depth k: 0 -> 1.9, 1 -> 1.99, 2 -> 1.999 (smooth between)
const depth = (t, ts) => { let k = 0; ts.forEach((ta, i) => { if (i) k += M.spring(t - ta, M.SOFT); }); return k; };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title -> header */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : t < tI2 ? [tM1 + 0.4, tMout] : [tR1 + 0.3, tRout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });
  const o = { outDur: 0.3, ody: -16 };

  /* A: two friends */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#route'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    const rxx = riderX(t); tr($('#rider'), rxx, 346); M.drawU($('#trail'), (rxx - 92) / 624);
    op($('#rider'), t, tMorph + 0.5);
    M.vis($('#bound'), t, tMorph + 0.6, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#boundT'), t, tMorph + 0.7, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#freeZ'), t, tMorph + 0.7, 1e9, { dy: 0, fade: 0.2 });
    pop($('#faR'), t, tRohan - 0.05); M.vis($('#nmR'), t, tRohan + 0.05, 1e9, { dy: 8 }); M.draw($('#stR'), t, tRohan + 0.1, 0.4);
    pop($('#feeR'), t, tNothing - 0.05);
    pop($('#faF'), t, tFat - 0.05); M.vis($('#nmF'), t, tFat + 0.05, 1e9, { dy: 8 }); M.draw($('#stF'), t, tFat + 0.1, 0.4);
    pop($('#feeF'), t, tThirty - 0.05);
    $('#feeF').style.borderColor = mix(C.ln, C.cy, M.io((t - tThirty) / 0.3));
    M.vis($('#rule1'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    pop($('#faK'), t, tMorph + 0.55); M.vis($('#rr0'), t, tMorph + 0.65, 1e9, { dy: 14 }); M.vis($('#rr1'), t, tMorph + 0.75, 1e9, { dy: 14 });
    $('#rr0').style.borderColor = mix(C.ln, C.cy, M.io((t - tNothing) / 0.3) * (1 - M.io((t - tFat) / 0.3)));
    $('#rr1').style.borderColor = mix(C.ln, C.cy, M.io((t - tThirty) / 0.3));
    M.vis($('#fair'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.vis($('#fa0'), t, tC2 + 0.6, 1e9, { dy: 16 }); M.vis($('#fl0'), t, tC2 + 0.7, 1e9, { dy: 8 });
    M.vis($('#fa1'), t, tThirty, 1e9, { dy: 16 }); M.vis($('#fl1'), t, tThirty + 0.1, 1e9, { dy: 8 });
    M.vis($('#fair').querySelector('.lbl'), t, tMorph + 0.5, 1e9, { dy: 0 });
  }

  /* L: meet Dabba Dash */
  const lOn = t >= tL1 - 0.1 && t < tF2 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2);
    M.vis($('#illP'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    pop($('#tgK'), t, tKav - 0.05, tL2 - 0.3); pop($('#tgJ'), t, wt('L1', 'deliver') - 0.05, tL2 - 0.3);
    M.vis($('#app'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    [tL2 + 0.4, tCant, tCant + 0.35].forEach((a, i) => pop($('#tl' + i), t, a));
    M.vis($('#team'), t, tL2 + 0.3, tLout, { dy: 36, ...o });
    const tv = [tL2 + 0.5, tCant - 0.1, tRoh2 - 0.05, tFat2 - 0.05];
    TEAM.forEach((_, i) => { pop($('#tv' + i), t, tv[i]); M.vis($('#tn' + i), t, tv[i] + 0.08, 1e9, { dy: 10 }); M.vis($('#tr' + i), t, tv[i] + 0.14, 1e9, { dy: 8 });
      const on = i >= 2 ? M.io((t - tv[i]) / 0.25) * (1 - (i === 2 ? M.io((t - tFat2) / 0.25) : 0)) : 0;
      $('#tv' + i).style.boxShadow = '0 0 0 4px ' + mix(C.ln, C.cy, on); });
  }

  /* F: a function */
  const fOn = t >= tF2 - 0.1 && t < tD1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fm = $('#fm'); M.vis(fm, t, tF2 + 0.05, tFout, { dy: 36, ...o }); grow(fm, $('#fmOut'), t, tF3);
    M.vis($('#mach'), t, tF2 + 0.2, 1e9, { dy: 20, sp: M.SOFT });
    let ci = -1; tFc.forEach((a, i) => { if (t >= a) ci = i; });
    const inC = $('#inC'), outC = $('#outC');
    if (ci < 0) { M.hide(inC, true); M.hide(outC, true); }
    else {
      const p = t - tFc[ci];
      M.setT($('#inT'), FIN[ci][0]); M.setT($('#outT'), FIN[ci][1]);
      const ia = M.io(p / 0.4), ib = M.io((p - 0.5) / 0.4);
      M.hide(inC, false); inC.style.left = (M.lerp(148, 392, ib) - geo.inW / 2).toFixed(1) + 'px'; inC.style.opacity = (ia * (1 - ib)).toFixed(3);
      const oa = M.io((p - 0.95) / 0.4); M.hide(outC, oa <= 0); outC.style.left = (M.lerp(392, 636, oa) - geo.outW / 2).toFixed(1) + 'px'; outC.style.opacity = oa.toFixed(3);
      const fl = M.clamp(1 - Math.abs(p - 0.9) / 0.3); attr($('#mbox'), 'fill', mix(C.pan2, C.cyd, fl));
      M.drawU($('#pin0'), M.clamp(p / 0.6)); M.drawU($('#pin1'), M.clamp((p - 0.9) / 0.5));
    }
    M.vis($('#logL'), t, tFc[0] + 1.2, 1e9, { dy: 8 });
    FIN.forEach((_, i) => pop($('#lg' + i), t, tFc[i] + 1.3));
    M.vis($('#frule'), t, tF3 + 0.12, tFout, { dx: 60, dy: 0, ...o });
    M.vis($('#fx0'), t, tF3 + 0.4, 1e9, { dy: 14 }); M.vis($('#fx1'), t, tF3 + 0.55, 1e9, { dy: 14 });
    M.vis($('#fdr'), t, tF4 + 0.05, tFout, { dy: 36, ...o });
    pop($('#dt0'), t, tDom - 0.05); M.draw($('#dbar'), t, tDom, 0.5); M.vis($('#dbar'), t, tDom, 1e9, { dy: 0, fade: 0.2 });
    pop($('#dt1'), t, tRan - 0.05); pop($('#rg0'), t, tRan + 0.1); pop($('#rg1'), t, tRan + 0.25); M.vis($('#rgN'), t, tRan + 0.5, 1e9, { dy: 8 });
  }

  /* D: definition */
  const dOn = t >= tD1 - 0.1 && t < tM1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD5);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    M.rise($('#kot1'), t, wt('D2', 'French') - 0.05, { st: 0.06, sp: M.HEAVY }); M.rise($('#kot2'), t, wt('D2', 'French') + 0.15, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, wt('D2', 'mathematician'), 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tD3 - 0.2, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tD3 - 0.1 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.tx, M.io((t - tD3 - i * 0.9) / 0.3)); }
    [wt('D3', 'closer'), wt('D3', 'fixed'), wt('D3', 'limit')].forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.tx, C.cy, u); });
    M.vis($('#ls'), t, tD5 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#nota'), t, tD5 + 0.3, 1e9, { dy: 20 }); M.vis($('#notaR'), t, tD5 + 0.6, 1e9, { dy: 8 });
    const ts3 = [wt('D5', 'input'), wt('D5', 'close'), wt('D5', 'point')];
    ts3.forEach((a, i) => { const el = $('#s3' + i); pop(el, t, a - 0.1); const on = M.io((t - a) / 0.25);
      el.style.borderColor = mix(C.ln, C.cy, on); el.querySelector('.zn').style.color = mix(C.mut, C.cy, on); });
  }

  /* M: live approach */
  const mOn = t >= tM1 - 0.1 && t < tI2 + 0.2; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#mg'), t, tM1 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#mt'), t, tM1 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    M.draw($('#mLo'), t, tM1 + 0.4, 0.6); M.draw($('#mHi'), t, tM1 + 0.7, 0.6);
    pop($('#mDot0'), t, tM1 + 0.9); pop($('#mDot1'), t, tM1 + 1.1);
    // left point
    const kL = depth(t, tLv), dL = 2 - 0.1 * Math.pow(10, -kL), xL = mx(dL);
    M.vis($('#pL'), t, tLv[0] - 0.1, tM4, { dy: 0, fade: 0.15, outDur: 0.3, ody: 0 });
    attr($('#pLv'), 'x1', xL.toFixed(2)); attr($('#pLv'), 'x2', xL.toFixed(2)); attr($('#pLv'), 'y1', '390'); attr($('#pLc'), 'cx', xL.toFixed(2)); attr($('#pLc'), 'cy', '390');
    const kR = depth(t, tRv), dR = 2 + 0.1 * Math.pow(10, -kR), xR = mx(dR);
    M.vis($('#pR'), t, tRv[0] - 0.1, 1e9, { dy: 0, fade: 0.15 });
    attr($('#pRv'), 'x1', xR.toFixed(2)); attr($('#pRv'), 'x2', xR.toFixed(2)); attr($('#pRv'), 'y1', my(30).toFixed(1)); attr($('#pRc'), 'cx', xR.toFixed(2)); attr($('#pRc'), 'cy', my(30).toFixed(1));
    const right = t >= tRv[0] - 0.1, k = right ? kR : kL;
    M.vis($('#mRd'), t, tLv[0] - 0.1, 1e9, { dy: 10 });
    const step = Math.min(2, Math.round(k)); M.setT($('#mD'), right ? VR[step] : VL[step]); M.setT($('#mF'), right ? '₹30' : '₹0');
    VL.forEach((_, i) => { pop($('#vl' + i), t, tLv[i]); pop($('#vr' + i), t, tRv[i]); });
    pop($('#limL'), t, tM3 + 0.05); pop($('#limR'), t, wt('M5', 'right'));
    $('#limL').style.borderColor = mix(C.ln, C.cy, M.io((t - tM3) / 0.3)); $('#limR').style.borderColor = mix(C.ln, C.cy, M.io((t - wt('M5', 'right')) / 0.3));
    M.vis($('#verdict'), t, tM6 + 0.05, 1e9, { dy: 30 });
    M.vis($('#jmp'), t, wt('M6', 'jump') - 0.1, 1e9, { dy: 0, fade: 0.2 });
  }

  /* I: the hole */
  const iOn = t >= tI2 - 0.1 && t < tT + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const ic = $('#ic'); M.vis(ic, t, tI2 + 0.1, tIout, { dy: 36, ...o }); grow(ic, $('#icA'), t, tSq);
    M.vis($('#icA'), t, tI2 + 0.1, tI4 - 0.15, { dy: 0, fade: 0.1, outDur: 0.25, ody: 0 });
    M.vis($('#icB'), t, tI4 - 0.05, 1e9, { dy: 0, fade: 0.25 });
    M.draw($('#hLine'), t, tI4, 0.6); pop($('#hHole'), t, tI4 + 0.4);
    const kL = M.spring(t - wt('I4', 'gives', 0) + 0.6, M.SOFT) + M.spring(t - tI5, M.SOFT);
    const kR = M.spring(t - tAt2 - 0.1, M.SOFT) + M.spring(t - tI5, M.SOFT);
    const vl = 1 - 0.1 * Math.pow(10, -kL), vr = 1 + 0.1 * Math.pow(10, -kR);
    attr($('#hL'), 'cx', hx(vl).toFixed(2)); attr($('#hL'), 'cy', hy(vl + 1).toFixed(2)); attr($('#hR'), 'cx', hx(vr).toFixed(2)); attr($('#hR'), 'cy', hy(vr + 1).toFixed(2));
    M.vis($('#hL'), t, tI4 + 0.2, 1e9, { dy: 0, fade: 0.2 }); M.vis($('#hR'), t, tAt2 - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#hLt'), t, wt('I4', 'gives', 0), 1e9, { dy: 0, fade: 0.2 }); M.vis($('#hRt'), t, wt('I4', 'two', 0), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#hLim'), t, wt('I5', 'limit'), 1e9, { dy: 0, fade: 0.2 });
    const pr = M.clamp((t - wt('I5', 'limit')) / 0.6); M.hide($('#hRing'), pr <= 0 || pr >= 1); attr($('#hRing'), 'r', (12 + pr * 30).toFixed(1)); $('#hRing').style.opacity = (1 - pr).toFixed(3);
    M.vis($('#ifo'), t, tSq + 0.12, tIout, { dx: 60, dy: 0, ...o }); M.vis($('#ifx'), t, tSq + 0.3, 1e9, { dy: 14 });
    pop($('#ifz'), t, tZz);
    M.vis($('#ie'), t, tI3 + 0.05, tIout, { dy: 36, ...o });
    M.vis($('#te0'), t, tI3 + 0.3, 1e9, { dy: 8 }); M.vis($('#te1'), t, wt('I3', 'crash') - 0.05, 1e9, { dy: 8 });
    pop($('#ilim'), t, wt('I5', 'limit') + 0.2);
  }

  /* statement */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* C: three checks */
  const cOn = t >= tTu - 0.05 && t < tR1 + 0.2; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cl'), t, tC1 + 0.05, tCout, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, tC1 + 0.2, tCout, { dx: 60, dy: 0, ...o });
    M.draw($('#cBase'), t, tC1 + 0.4, 0.8);
    CK.forEach(([ic], i) => {
      const el = $('#ck_' + i), ta = tCk[i], td = i < 2 ? tCk[i + 1] : tC5;
      M.vis(el, t, tC1 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), act = on * (1 - M.io((t - td) / 0.35));
      el.querySelector('.bg').style.borderColor = mix(C.ln, C.cy, act); el.querySelector('.bg').style.background = mix(C.pan2, C.cyd, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : C.tx; el.querySelector('.rn').style.color = t < ta ? C.dim : C.cy;
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : C.cy, 28, 2.4);
      pop(el.querySelector('.ok'), t, ta + 0.6);
    });
    M.vis($('#cG1'), t, tCk[0] + 0.1, 1e9, { dy: 0, fade: 0.2 });
    const al = M.io((t - tCk[1]) / 1.2), ul = M.lerp(0.12, 0.47, al), ur = M.lerp(0.88, 0.53, al);
    op($('#cAL'), t, tCk[1], tC5); op($('#cAR'), t, tCk[1], tC5);
    tr($('#cAL'), cxu(ul), cyu(ul)); tr($('#cAR'), cxu(ur), cyu(ur));
    M.vis($('#cG2'), t, wt('C3', 'agree'), 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#cG3'), t, tCk[2] + 0.4, 1e9, { dy: 0, fade: 0.2 });
    const pu = M.io((t - tC5 - 0.1) / 2.2); M.drawU($('#cDraw'), pu);
    op($('#cPenT'), t, tC5, tC5 + 2.5); tr($('#cPenT'), cxu(pu), cyu(pu));
    pop($('#cPen'), t, wt('C5', 'lifting'));
  }

  /* R: before / after */
  const rOn = t >= tR1 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    M.vis($('#rb'), t, tR1 + 0.1, tRout, { dx: -60, dy: 0, ...o });
    M.vis($('#ra'), t, tR1 + 0.25, tRout, { dx: 60, dy: 0, ...o });
    M.draw($('#v2'), t, wt('R1', 'free'), 1.6);
    const d = 3 * M.io((t - tR1 - 2.4) / 3.4);
    tr($('#rbD'), rx(d), d > 2 ? ry(30) : 400); tr($('#raD'), rx(d), ry(Math.max(0, 15 * (d - 1))));
    op($('#rbD'), t, tR1 + 2.3, tR3 + 0.2); op($('#raD'), t, tR1 + 2.3, tR3 + 0.2);
    const fmt = v => '₹' + (Math.round(v * 100) / 100).toFixed(2).replace('.00', '');
    M.vis($('#rbR'), t, tR1 + 0.6, 1e9, { dy: 10 }); M.vis($('#raR'), t, tR1 + 0.7, 1e9, { dy: 10 });
    if (t < tR3) { M.setT($('#rbF'), d > 2 ? '₹30' : '₹0'); M.setT($('#raF'), fmt(Math.max(0, 15 * (d - 1)))); }
    else { M.setT($('#rbF'), '₹0 → ₹30, a jump'); M.setT($('#raF'), '₹15'); }
    pop($('#raP'), t, tR3 + 0.1);
    { let cx = 48 + $('#raR').offsetWidth + 16; for (let i = 0; i < 3; i++) { const c = $('#ck' + i); c.style.left = cx + 'px'; c.style.top = '500px'; cx += c.offsetWidth + 12; } }
    [wt('R3', 'left'), wt('R3', 'right'), wt('R3', 'point')].forEach((a, i) => pop($('#ck' + i), t, a - 0.05));
    ['mkR1', 'mkF1', 'mkR2', 'mkF2'].forEach((id, i) => M.vis($('#' + id), t, (i % 2 ? wt('R4', 'Fatima') : wt('R4', 'Rohan')) - 0.05, 1e9, { dy: 0, fade: 0.2 }));
  }

  /* K: at work today */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 2 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const act = M.io((t - ta) / 0.3) * (1 - M.io((t - td) / 0.35));
      el.querySelector('.bg').style.background = mix(C.pan2, C.cyd, act); el.querySelector('.bg').style.borderColor = mix(C.ln, C.cy, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : C.tx; el.querySelector('.rn').style.color = t < ta ? C.dim : C.cy;
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : C.cy, 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 3 ? tK[k] - 0.14 : 1e9;
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

  /* X: human side */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tX7 - 0.15, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      pop($('#xg' + i), t, tXg[i] - 0.05); pop($('#xh' + i), t, tXh[i] - 0.05);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 }); M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
    }
    M.vis($('#xw'), t, tX4 + 0.12, tX7 - 0.15, { dx: 60, dy: 0, ...o });
    M.rise($('#wN'), t, tW - 0.3, { st: 0.06, sp: M.HEAVY });
    M.draw($('#wP'), t, tW, 2.2, M.io); M.vis($('#wC'), t, wt('X4', 'jagged') - 0.1, 1e9, { dy: 8 });
    M.vis($('#xr0'), t, tX5 - 0.1, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr1'), t, wt('X5', 'rounds') - 0.1, 1e9, { dx: 24, dy: 0 });
    pop($('#xstep'), t, tX6);
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 }); M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* quick check */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY }); M.rise($('#qq2'), t, wt('Q1', 'Is') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((_, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 1.5 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAns) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.pan, C.cyd, r) : C.pan; bg.style.borderColor = right ? mix(C.ln, C.cy, r) : C.ln;
      el.querySelector('.ot').style.color = right ? C.tx : mix(C.tx, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.color = right ? mix(C.tx, C.cy, r) : mix(C.tx, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) el.style.transform = `scale(${(1 + 0.05 * Math.sin(Math.PI * (t - tAns) / 0.45)).toFixed(4)})`;
      else if (right && t >= tAns + 0.45 && el.style.transform !== 'none') el.style.transform = 'none';
    });
    const u = M.clamp((t - tCount) / (tAns - tCount));
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTakeQ, 1e9, { dy: 40 }); M.rise($('#takeT'), t, tTakeQ + 0.1, { st: 0.045 });
  }

  /* recap */
  const sOn = t >= tS; M.hide($('#recap'), !sOn);
  if (sOn) {
    M.vis($('#rchip'), t, tS + 0.1, 1e9, { dy: 16 }); M.rise($('#rh'), t, tS + 0.18, { st: 0.06, sp: M.HEAVY });
    ROWS.forEach(([, , ps], i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 }); M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04 });
      ps.forEach((_, k) => {
        const el = $('#fp' + i + k), tp = tPill[i][k]; pop(el, t, tp - 0.05);
        const g = M.io((t - tp + 0.05) / 0.2); el.style.borderColor = mix(C.ln, C.cy, g); el.style.color = mix(C.tx, C.cy, g);
      });
    });
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#0A1022', ink: '#FFFFFF', accent: '#38D9F5', sub: 'rgba(201,211,236,.75)', font: 'IBM Plex Sans' });
})();
