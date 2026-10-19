// MBA - Principles of Management, Ep 27: Span of Control
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 17h6', 'M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  sliders: ['M21 4h-7', 'M10 4H3', 'M21 12h-9', 'M8 12H3', 'M21 20h-5', 'M12 20H3', 'M14 2v4', 'M8 10v4', 'M16 18v4'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tReport = wt('H2', 'report');
const tC1 = T0('C1'), tTwo = wt('C1', 'two'), tC2 = T0('C2'), tUnseen = wt('C2', 'unseen'), tC3 = T0('C3'), tBehind = wt('C3', 'behind'), tAout = T0('I1') - 0.32;
// I
const tI1 = T0('I1'), tOrd = [wt('I2', 'Tea'), wt('I2', 'Cash'), wt('I2', 'Watch')], tI3 = T0('I3'), tIout = T0('D1') - 0.32;
// D
const tD1 = T0('D1'), tD2 = T0('D2'), tNum = wt('D2', 'number'), tSup = wt('D2', 'supervise'), tAka = wt('D2', 'management'), tD3 = T0('D3'), tThirty = wt('D3', 'thirty'), tFar = wt('D3', 'Far'), tDout = T0('G1') - 0.32;
// G: Graicunas
const tG1 = T0('G1'), t1933 = wt('G1', '1933'), tGr = wt('G1', 'Graicunas'), tG2 = T0('G2'), tGc = [wt('G2', 'person'), wt('G2', 'group'), wt('G2', 'links')];
const tG3 = T0('G3'), tG2p = wt('G3', 'two'), tG5p = wt('G3', 'five'), tG4 = T0('G4'), tG6p = wt('G4', 'six'), tDbl = wt('G4', 'doubles'), tGout = T0('O1') - 0.32;
// O + W: the org chart
const tO1 = T0('O1'), tFlat1 = wt('O1', 'manager'), tMeena = wt('O1', 'Meena'), tO2 = T0('O2'), tO3 = T0('O3'), tClose = wt('O3', 'close');
const tW1 = T0('W1'), tTall = wt('W1', 'two'), tW2 = T0('W2'), tW3 = T0('W3'), tFlat2 = wt('W3', 'five'), tW4 = T0('W4'), tOout = T0('T1') + 0.1;
const tT = T0('T1'), tSt2 = wt('T1', 'Wide'), tTu = T0('P1') - 0.32;
// P
const tP1 = T0('P1'), tP2 = T0('P2'), tPout = T0('K0') - 0.32;
const tPt = [[wt('P1', 'close')], [wt('P1', 'crawl'), wt('P1', 'cost')]], tPf = [[wt('P2', 'freedom'), wt('P2', 'fast')], [wt('P2', 'less'), wt('P2', 'skilled')]];
const tMsgT = wt('P1', 'messages'), tMsgF = wt('P2', 'fast');
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'supervisor'), wt('K2', 'senior'), wt('K3', 'hospital'), wt('K4', 'team'), wt('K5', 'regional')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tXout = tX6 - 0.15;
const tXn = [wt('X2', 'watching'), wt('X2', 'trusted')], tXw = [wt('X3', 'nobody'), wt('X3', 'Problems'), wt('X3', 'burns')];
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Fewer');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'supervise')], [wt('S3', 'tall'), wt('S3', 'flat')], ['work', 'skill', 'guidance', 'technology', 'distance'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];
const EXW = [[tTwo - 0.2, tAout], [tX5 - 0.3, tXout]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// A: the fan of thirty
const FX = i => 228 + (i % 10) * 70, FY = i => 96 + Math.floor(i / 10) * 58;
$('#fanS').innerHTML = Array.from({ length: 30 }, (_, i) => `<path id="fl${i}" d="M136 154 L${FX(i)} ${FY(i)}" stroke="#E2DACB" stroke-width="2" fill="none"/>`).join('') +
  `<defs><clipPath id="frc"><circle cx="100" cy="154" r="34"/></clipPath></defs><circle id="frR" cx="100" cy="154" r="38" fill="#14213D"/><image href="${IMG}ravi-face.jpg" x="66" y="120" width="68" height="68" clip-path="url(#frc)"/>` +
  Array.from({ length: 30 }, (_, i) => `<circle id="fd${i}" cx="${FX(i)}" cy="${FY(i)}" r="13" fill="#F5F1E8" stroke="#3A4560" stroke-width="3"/>`).join('');
const METH = [['Waits 2 days', tTwo], ['Mistake unseen', tUnseen], ['Ravi falls behind', tBehind]];
$('#meth').innerHTML = METH.map(([m], i) => `<div class="stp" id="mt${i}" style="top:76px;background:#F6E3DC;color:#B5482F">${M.icon('alert', 26, C.red, 2.2)}<span>${m}</span></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#dAkaI').innerHTML = M.icon('link', 24, C.gold, 2.4); $('#dAf').style.cssText = FACE('ravi');
$('#zb').innerHTML = `<i style="position:absolute;left:0;top:0;width:229px;height:28px;background:#EEE8DB"></i><i style="position:absolute;left:229px;top:0;width:230px;height:28px;background:#F3EAD6"></i><i style="position:absolute;left:459px;top:0;width:229px;height:28px;background:#F6E3DC"></i>`;
$('#zl').innerHTML = [['NARROW', 48, C.muted], ['WIDE', 277, C.gold], ['TOO WIDE', 507, C.red]].map(([n, x, c]) => `<div class="lbl" style="left:${x}px;top:140px;color:${c}">${n}</div>`).join('');
// G
const GV = [1, 6, 18, 44, 100, 222], GH = v => Math.max(8, 360 * v / 222), GX = i => 48 + i * 688 / 6 + (688 / 6 - 72) / 2;
$('#gBars').innerHTML = GV.map((v, i) => `<div class="gb" id="gb${i}" style="left:${GX(i).toFixed(1)}px;height:${GH(v).toFixed(1)}px"></div><div class="gbv serif" id="gbv${i}" style="left:${(GX(i) - 24).toFixed(1)}px;top:${(380 - GH(v) - 40).toFixed(1)}px">${v}</div>`).join('');
$('#gLbls').innerHTML = GV.map((_, i) => `<div class="gbl" style="left:${(GX(i) - 24).toFixed(1)}px;top:494px">${i + 1} ${i ? 'PEOPLE' : 'PERSON'}</div>`).join('');
const b5 = GX(4) + 36, b6 = GX(5) + 36, y5 = 96 + 380 - GH(100) - 52, y6 = 96 + 380 - GH(222) - 52;
$('#gBr').innerHTML = `<path id="gArc" d="M${b5} ${y5} Q${(b5 + b6) / 2 - 60} ${y6 - 30} ${b6 - 30} ${y6 + 6}" fill="none" stroke="#B5482F" stroke-width="4" stroke-linecap="round"/><path id="gArh" d="M${b6 - 46} ${y6 - 4} L${b6 - 28} ${y6 + 8} L${b6 - 44} ${y6 + 20}" fill="none" stroke="#B5482F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<g id="gDb"><rect x="${b5 - 236}" y="${y5 - 64}" width="168" height="44" rx="22" fill="#B5482F"/><text x="${b5 - 152}" y="${y5 - 35}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="20" fill="#fff">More than 2x</text></g>`;
const GC = [['user', 'Each person'], ['users', 'Each group'], ['link', 'Each pair']];
$('#gChips').innerHTML = GC.map(([ic, t], i) => `<div class="gch" id="gc${i}">${M.icon(ic, 22, C.gold, 2.4)}${t}</div>`).join('');
const GW = [[tG2p, '2 people: 2 × (2 + 1) = 6'], [tG5p, '5 people: 5 × (16 + 4) = 100'], [tG6p, '6 people: 6 × (32 + 5) = 222']];

/* O: the org chart. 31 nodes: 0 = Ravi, 1..30 = the team */
const X0 = 150, XW = 850;
const LAY = {
  fan: i => i === 0 ? [575, 130] : [X0 + ((i - 1) % 15) * XW / 14, i <= 15 ? 360 : 450],
  flat: i => { if (i === 0) return [575, 130]; if (i <= 5) return [206 + (i - 1) * 184.5, 290]; const g = Math.floor((i - 6) / 5), k = (i - 6) % 5; return [206 + g * 184.5 + (k - 2) * 28, 450]; },
  tall: i => { const lv = Math.floor(Math.log2(i + 1)), j = i + 1 - 2 ** lv, m = 2 ** lv; return [X0 + (j + 0.5) * XW / m, 120 + lv * 90]; },
};
const PAR = { fan: i => 0, flat: i => i <= 5 ? 0 : 1 + Math.floor((i - 6) / 5), tall: i => Math.floor((i - 1) / 2) };
const MGR = { fan: i => i === 0, flat: i => i <= 5, tall: i => i <= 14 };
const STEPS = [['fan', -1], ['flat', tFlat1], ['tall', tTall], ['flat', tFlat2]];
const LV = { fan: [130, 405], flat: [130, 290, 450], tall: [120, 210, 300, 390, 480] };
const STAT = { fan: [30, 1, 2], flat: [5, 6, 3], tall: [2, 15, 5] };
const SHAPE = { fan: ['users', 'One big fan'], flat: ['layers', 'Flat chart'], tall: ['network', 'Tall chart'] };
$('#ocL').innerHTML = Array.from({ length: 30 }, (_, i) => `<line id="ol${i + 1}" stroke="#E2DACB" stroke-width="2.5"/>`).join('');
$('#ocN').innerHTML = `<defs><clipPath id="ocR"><circle r="22"/></clipPath><clipPath id="ocM"><circle r="16"/></clipPath></defs>` + Array.from({ length: 31 }, (_, i) => i === 0
  ? `<g id="on0"><circle r="26" fill="#14213D"/><image href="${IMG}ravi-face.jpg" x="-22" y="-22" width="44" height="44" clip-path="url(#ocR)"/></g>`
  : `<g id="on${i}"><circle r="11" fill="#F5F1E8" stroke="#3A4560" stroke-width="3"/>${i === 2 ? `<g id="onM"><circle r="20" fill="#B8862F"/><image href="${IMG}meena-face.jpg" x="-16" y="-16" width="32" height="32" clip-path="url(#ocM)"/></g>` : ''}</g>`).join('');
$('#lvls').innerHTML = Object.entries(LV).map(([k, ys]) => ys.map((y, j) => `<div class="lvl" id="lv${k}${j}" style="top:${y - 10}px">LEVEL ${j + 1}</div>`).join('')).join('');
const posOf = (i, t) => {
  let p = LAY.fan(i).slice();
  for (let s = 1; s < STEPS.length; s++) { const [k, ts] = STEPS[s], a = LAY[STEPS[s - 1][0]](i), b = LAY[k](i), u = M.spring(t - ts, M.HEAVY); p[0] += (b[0] - a[0]) * u; p[1] += (b[1] - a[1]) * u; }
  return p;
};
const stepAt = t => { let s = 0; for (let k = 1; k < STEPS.length; k++) if (t >= STEPS[k][1]) s = k; return s; };
const statT = [
  [[tFlat1 + 0.3, 5], [tTall + 0.3, 2], [tFlat2 + 0.3, 5]],
  [[tFlat1 + 0.5, 6], [tTall + 0.5, 15], [tFlat2 + 0.5, 6]],
  [[tFlat1 + 0.7, 3], [tTall + 0.7, 5], [tFlat2 + 0.7, 3]],
];
const statV = (k, t) => { let v = STAT.fan[k], from = v, ta = -9; for (const [tt, nv] of statT[k]) if (t >= tt) { from = v; v = nv; ta = tt; } return Math.round(from + (v - from) * M.o3((t - ta) / 0.6)); };

// P: tall vs flat
const miniT = `${[[90, 12], [50, 44], [130, 44], [30, 76], [70, 76], [110, 76], [150, 76], [20, 108], [40, 108], [60, 108], [80, 108], [100, 108], [120, 108], [140, 108], [160, 108]].map(([x, y], i, a) => (i ? `<line x1="${x}" y1="${y}" x2="${a[Math.floor((i - 1) / 2)][0]}" y2="${a[Math.floor((i - 1) / 2)][1]}" stroke="#E2DACB" stroke-width="2"/>` : '')).join('')}${[[90, 12], [50, 44], [130, 44], [30, 76], [70, 76], [110, 76], [150, 76]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#14213D"/>`).join('')}${Array.from({ length: 8 }, (_, i) => `<circle cx="${20 + i * 20}" cy="108" r="5" fill="#B8862F"/>`).join('')}`;
const miniF = `${Array.from({ length: 5 }, (_, g) => `<line x1="90" y1="20" x2="${18 + g * 36}" y2="62" stroke="#E2DACB" stroke-width="2"/>` + Array.from({ length: 3 }, (_, k) => `<line x1="${18 + g * 36}" y1="62" x2="${8 + g * 36 + k * 10}" y2="100" stroke="#E2DACB" stroke-width="1.5"/><circle cx="${8 + g * 36 + k * 10}" cy="100" r="4" fill="#B8862F"/>`).join('') + `<circle cx="${18 + g * 36}" cy="62" r="6" fill="#14213D"/>`).join('')}<circle cx="90" cy="20" r="8" fill="#14213D"/>`;
$('#pTs').innerHTML = miniT; $('#pFs').innerHTML = miniF;
const PT = [[['eye', 'Close supervision']], [['clock', 'Slow messages'], ['coin', 'Costs more']]];
const PF = [[['smile', 'More freedom'], ['zap', 'Fast messages']], [['users', 'Less time each'], ['award', 'Needs skilled staff']]];
const pch = (k, P) => P.map((col, c) => col.map(([ic, t], i) => `<div class="xc" id="p${k}${c}${i}" style="left:${c ? 400 : 48}px;top:${208 + i * 60}px">${M.icon(ic, 22, c ? C.red : C.gold, 2.4)}<span>${t}</span></div>`).join('')).join('');
$('#pTc').innerHTML = pch('T', PT); $('#pFc').innerHTML = pch('F', PF);
const track = (k, n) => { const xs = Array.from({ length: n }, (_, i) => 60 + i * 568 / (n - 1)); return `<line x1="60" y1="34" x2="628" y2="34" stroke="#E2DACB" stroke-width="4"/><line id="mtr${k}" x1="60" y1="34" x2="60" y2="34" stroke="#B8862F" stroke-width="4"/>` + xs.map((x, i) => `<circle cx="${x}" cy="34" r="11" fill="#fff" stroke="#14213D" stroke-width="3"/><text x="${x}" y="70" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="13" letter-spacing="1.5" fill="#8A8274">L${i + 1}</text>`).join('') + `<g id="mtk${k}"><circle r="15" fill="#B8862F"/><g transform="translate(-9 -9)">${M.icon('message', 18, '#fff', 2.4)}</g></g>`; };
$('#pTr').innerHTML = track('T', 5); $('#pFr').innerHTML = track('F', 3);
wrap($('#pT'), 'pTOut', 784, 580);

// K: at work today
const KA = [
  ['repeat', 'The work', 'Simple, repeated work allows a wide span', 'Pouring chai is routine, so one manager guides many', 'package', 'One supervisor guides a big team of packers'],
  ['award', 'Skill', 'Skilled people need less help', "Asha's trained team needs little checking", 'gear', 'Senior engineers need little checking'],
  ['cap', 'Guidance', 'New staff need more', 'New helpers need their manager close by', 'heart', 'Each new nurse is paired with a mentor'],
  ['phone', 'Technology', 'Tools let one boss reach more people', 'One phone group reaches all five outlets', 'message', 'A team chat reaches everyone at once'],
  ['pin', 'Distance', 'Far apart is harder to watch', 'Five outlets across town take time to visit', 'car', 'A regional manager travels to each branch'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['THE RIGHT SPAN', 'Five things', 'They decide how wide a span can be', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">NO SINGLE MAGIC NUMBER</div><div class="pe"><i>${M.icon('sliders', 34, C.gold, 2.2)}</i><span>Each team needs its own span</span></div>`) + `</div>`).join('');

// X: the human side
const XN = [['eye', 'Always watched'], ['lock', 'Not trusted']], XWC = [['user', 'Nobody notices you'], ['clock', 'Problems wait'], ['flame', 'Manager burns out']];
$('#xChips').innerHTML = XN.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('') +
  XWC.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 56}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B5482F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#xrF').style.cssText = FACE('ravi');
$('#xrW').innerHTML = `<svg class="abs" style="left:48px;top:160px" width="688" height="120">${Array.from({ length: 5 }, (_, g) => { const mx = 69 + g * 137.5; return `<line x1="344" y1="16" x2="${mx}" y2="60" stroke="#E2DACB" stroke-width="2.5"/>` + Array.from({ length: 5 }, (_, k) => `<line x1="${mx}" y1="60" x2="${mx + (k - 2) * 22}" y2="104" stroke="#E2DACB" stroke-width="2"/><circle cx="${mx + (k - 2) * 22}" cy="104" r="7" fill="#F5F1E8" stroke="#3A4560" stroke-width="2.5"/>`).join('') + `<circle cx="${mx}" cy="60" r="10" fill="#14213D" stroke="#B8862F" stroke-width="3"/>`; }).join('')}<circle cx="344" cy="16" r="12" fill="#14213D"/></svg>`;
$('#bothI').innerHTML = M.icon('scale', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Narrow span', 'Wide span', 'Tall chart', 'More levels'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('layers', 44, C.gold2, 2.4);
// recap
const ROWS = [['users', 'Span = people one boss guides well', ['Supervise well']], ['network', 'Narrow is tall, wide is flat', ['Tall', 'Flat']], ['sliders', 'It depends on five things', ['Work', 'Skill', 'Guidance', 'Tech', 'Distance']]];
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
const pulse = (t, a, d = 0.9) => (t > a && t < a + d) ? Math.sin(Math.PI * (t - a) / d) : 0;
// a message hopping down n levels: pause at each level, then move
const hop = (k, n, t, t0, per) => {
  const xs = Array.from({ length: n }, (_, i) => 60 + i * 568 / (n - 1));
  let x = 60; for (let i = 1; i < n; i++) x += (xs[i] - xs[i - 1]) * M.io((t - t0 - (i - 1) * per - per * 0.45) / (per * 0.55));
  $('#mtk' + k).setAttribute('transform', `translate(${x.toFixed(1)} 34)`); $('#mtr' + k).setAttribute('x2', x.toFixed(1));
  return t > t0 + (n - 1) * per;
};
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; METH.forEach((_, i) => { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; });
  for (let i = 0; i < 3; i++) { const o = $('#or' + i); o.style.left = '716px'; o.style.top = (196 + i * 72) + 'px'; }
  x = 48; GC.forEach((_, i) => { const c = $('#gc' + i); c.style.left = x + 'px'; x += c.offsetWidth + 16; });
  const dq = $('#dq'); dq.style.width = 'auto'; dq.style.display = 'inline-block'; const dqw = dq.offsetWidth; dq.style.display = ''; dq.style.width = '1920px'; if (dqw > 1600) dq.style.fontSize = Math.floor(88 * 1600 / dqw) + 'px';
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  const bo = $('#both'); let bw = 0; [...bo.children].forEach(c => bw += c.offsetWidth + 22); if (bw > 1520) bo.querySelectorAll('.tx').forEach(c => c.style.fontSize = Math.floor(52 * 1520 / bw) + 'px');
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXn[0] + 0.1, -6], [tXn[1] + 0.1, -11], [tXw[0] + 0.1, -2], [tXw[1] + 0.1, 5], [tXw[2] + 0.1, 11], [wt('X4', 'keeps'), 0]], M.SOFT);
const ravN = t => t < tReport ? 0 : Math.round(30 * M.o3((t - tReport) / 1.4));

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
  const exW = EXW.find(([a, b]) => t >= a - 0.5 && t < b + 0.5) || EXW[0];
  M.vis($('#exChip'), t, exW[0], exW[1], { dy: 10, outDur: 0.3 });

  /* ===== A: thirty people, one boss ===== */
  const aOn = t < tAout + 0.45; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#sign'), t, tMorph + 0.45, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    M.vis($('#callT'), t, tMorph + 1.0, 1e9, { dy: 0, fade: 0.2 }); M.setT($('#callT'), `Reporting to Ravi: ${ravN(t)}`);
    $('#callT').setAttribute('fill', t > tC3 ? C.red : C.ink);
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    for (let i = 0; i < 30; i++) {
      const d = $('#fd' + i); M.vis(d, t, tMorph + 0.5 + i * 0.025, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      M.draw($('#fl' + i), t, tReport + i * 0.03, 0.35, M.o3);
      const bad = (i === 7 && t > tTwo - 0.1) || (i === 23 && t > tUnseen - 0.1);
      const c = bad ? C.red : (t > tReport + i * 0.03 + 0.3 ? C.ink : C.ink2);
      d.setAttribute('fill', bad ? C.redBg : C.paper); d.setAttribute('stroke', bad ? C.red : C.ink2);
      $('#fl' + i).setAttribute('stroke', t > tC3 ? '#E9C3B8' : (bad ? '#E9C3B8' : C.line));
    }
    $('#frR').setAttribute('fill', mix(C.ink, C.red, M.io((t - tBehind) / 0.3)));
    M.vis($('#ask'), t, tTwo - 0.35, tAout, { dy: 36, ...o });
    METH.forEach(([, tm], i) => M.vis($('#mt' + i), t, tm - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.rise($('#askT'), t, tC3 + 0.1, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== I: the festival rush and the team ===== */
  const iOn = t >= tI1 - 0.1 && t < tD1 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tI1 + 0.1, tIout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tI3);
    M.vis($('#illImg'), t, tI1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.hide($('#tgR'), true);
    for (let i = 0; i < 3; i++) M.vis($('#or' + i), t, tOrd[i] - 0.05, tI3 - 0.3, { dx: 20, dy: 0, sc: 0.8, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#ill2'), t, tI3 + 0.12, tIout, { dx: 60, dy: 0, ...o });
    M.vis($('#ill2Img'), t, tI3 + 0.32, 1e9, { dy: 24, sp: M.SOFT });
  }

  /* ===== D: definition ===== */
  const dOn = t >= tD1 - 0.05 && t < tG1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#def'), t, tD2 + 0.1, tDout, { dy: 36, ...o });
    M.rise($('#dl1'), t, tNum - 0.1, { st: 0.05 }); M.rise($('#dl2'), t, tSup - 0.25, { st: 0.06 });
    M.vis($('#dAka'), t, tAka - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#dA'), t, tD3 + 0.05, tDout, { dy: 36, ...o }); M.vis($('#dAn'), t, tThirty - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.count($('#dAn'), t, tThirty - 0.05, 0.6, 0, 30);
    M.vis($('#dB'), t, tD3 + 0.2, tDout, { dy: 36, ...o });
    const zm = $('#zm'), zu = M.o3((t - tThirty) / 1.0); snap(zm, (48 + 670 * zu).toFixed(1) + 'px', 'left'); M.vis(zm, t, tD3 + 0.5, 1e9, { dy: 0, fade: 0.1 });
    zm.style.background = t > tFar - 0.1 ? C.red : C.ink;
  }

  /* ===== G: Graicunas ===== */
  const gOn = t >= tG1 - 0.1 && t < tO1 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#gA'), t, tG1 + 0.1, tGout, { dx: -60, dy: 0, ...o });
    M.vis($('#bookS'), t, t1933 - 0.1, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#gAl'), t, tGr - 0.1, 1e9, { dy: 8 }); M.rise($('#gAt1'), t, tGr + 0.1, { st: 0.05 }); M.rise($('#gAt2'), t, tGr + 0.3, { st: 0.05 });
    M.vis($('#gAs'), t, tGr + 0.6, 1e9, { dy: 8 });
    M.vis($('#gC'), t, tG1 + 0.3, tGout, { dx: 60, dy: 0, ...o });
    GV.forEach((v, i) => {
      const b = $('#gb' + i), ta = i < 2 ? tG2p : i < 5 ? tG5p + (i - 2) * 0.12 : tG6p;
      M.vis(b, t, tG1 + 0.5 + i * 0.06, 1e9, { dy: 30 });
      const f = M.io((t - ta) / 0.3);
      b.style.background = mix(C.paper2, i === 5 ? C.red : ((i === 1 || i === 4) ? C.gold : C.ink2), f);
      M.vis($('#gbv' + i), t, ta + 0.1, 1e9, { dy: 10, sc: 0.8, sp: M.POP, fade: 0.1 });
      $('#gbv' + i).style.color = i === 5 ? C.red : C.ink;
    });
    M.draw($('#gArc'), t, tDbl - 0.3, 0.5, M.o3); M.vis($('#gArh'), t, tDbl + 0.15, 1e9, { dy: 0, fade: 0.1 });
    M.vis($('#gDb'), t, tDbl - 0.05, 1e9, { dy: 0, fade: 0.12 });
    M.vis($('#gB'), t, tG2 + 0.05, tGout, { dy: 36, ...o });
    GC.forEach((_, i) => M.vis($('#gc' + i), t, tGc[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.rise($('#gF'), t, tG3 - 0.05, { st: 0.05 });
    const cur = GW.filter(([ta]) => t >= ta - 0.05).pop();
    M.setT($('#gW'), cur ? cur[1] : ''); M.vis($('#gW'), t, GW[0][0] - 0.05, 1e9, { dy: 8 });
    if (cur) { const p = pulse(t, cur[0] - 0.05, 0.4); $('#gW').style.color = p > 0.1 ? C.gold : C.ink2; }
  }

  /* ===== O + W: the org chart ===== */
  const oOn = t >= tO1 - 0.1 && t < tOout; M.hide($('#sO'), !oOn);
  if (oOn) {
    M.vis($('#oc'), t, tO1 + 0.1, 1e9, { dx: -60, dy: 0 });
    M.vis($('#os'), t, tO1 + 0.25, 1e9, { dx: 60, dy: 0 });
    const s = stepAt(t), lay = STEPS[s][0], ts = STEPS[s][1], tnext = s < STEPS.length - 1 ? STEPS[s + 1][1] : 1e9;
    const lop = (s ? M.clamp((t - ts - 0.45) / 0.35) : M.clamp((t - tO1 - 0.6) / 0.4)) * (1 - M.clamp((t - (tnext - 0.25)) / 0.25));
    const P = []; for (let i = 0; i < 31; i++) P.push(posOf(i, t));
    for (let i = 0; i < 31; i++) {
      const g = $('#on' + i), ta = tO1 + 0.4 + i * 0.015;
      const sp = M.spring(t - ta, M.POP), sc = sp >= 1 ? 1 : Math.max(0.01, 0.4 + 0.6 * sp);
      g.setAttribute('transform', `translate(${P[i][0].toFixed(1)} ${P[i][1].toFixed(1)})${sc < 1 ? ` scale(${sc.toFixed(3)})` : ''}`);
      g.style.opacity = M.clamp((t - ta) / 0.1); M.hide(g, t < ta);
      if (i) {
        const mg = MGR[lay](i), c = g.querySelector('circle');
        const fill = mg ? C.ink : C.paper, str = mg ? C.gold : C.ink2;
        if (c._f !== fill) { c._f = fill; c.setAttribute('fill', fill); c.setAttribute('stroke', str); c.setAttribute('r', mg ? 13 : 10); }
        const l = $('#ol' + i), pp = P[PAR[lay](i)];
        l.setAttribute('x1', P[i][0].toFixed(1)); l.setAttribute('y1', P[i][1].toFixed(1)); l.setAttribute('x2', pp[0].toFixed(1)); l.setAttribute('y2', pp[1].toFixed(1));
        l.style.opacity = lop.toFixed(3);
        const hl = lay === 'flat' && PAR.flat(i) > 0 && t > tClose - 0.1 && t < tW1 ? 1 : 0;
        const lc = hl ? C.gold : C.line; if (l._c !== lc) { l._c = lc; l.setAttribute('stroke', lc); }
      }
    }
    M.vis($('#onM'), t, tMeena - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    Object.entries(LV).forEach(([k, ys]) => ys.forEach((_, j) => { const on = lay === k && !(k === 'flat' && false); const el = $('#lv' + k + j); const a = on ? M.clamp((t - ts - 0.5) / 0.3) * (1 - M.clamp((t - (tnext - 0.25)) / 0.2)) : 0; el.style.opacity = a.toFixed(3); M.hide(el, a < 0.01); }));
    const HLW = [[wt('O2', 'five'), wt('W1', 'two'), wt('W3', 'five')], [wt('O2', 'managers'), wt('W2', 'fifteen'), wt('W4', 'six')], [tO3, wt('W2', 'levels'), wt('W4', 'levels')]];
    for (let k = 0; k < 3; k++) { M.vis($('#os' + k), t, tO1 + 0.45 + k * 0.08, 1e9, { dy: 14 }); M.setT($('#osv' + k), String(statV(k, t))); const hp = Math.max(...HLW[k].map(a => pulse(t, a - 0.1, 0.8))); $('#osv' + k).style.color = mix(C.ink, C.gold, hp); }
    const sh = SHAPE[lay]; M.setT($('#oShT'), sh[1]); setIco($('#oShI'), sh[0], C.gold2, 26, 2.4);
    M.vis($('#oShape'), t, tO1 + 0.7, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    const pp = pulse(t, ts + 0.3, 0.5); if (s && pp > 0.001) $('#oShape').style.transform = `scale(${(1 + 0.06 * pp).toFixed(4)})`;
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

  /* ===== P: tall vs flat ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    const pT = $('#pT'); M.vis(pT, t, tP1 + 0.05, tPout, { dy: 36, ...o }); grow(pT, $('#pTOut'), t, tP2);
    M.vis($('#pF'), t, tP2 + 0.12, tPout, { dx: 60, dy: 0, ...o });
    for (const [k, P, T, tm, n, per, base] of [['T', PT, tPt, tMsgT, 5, 0.75, tP1], ['F', PF, tPf, tMsgF, 3, 0.45, tP2]]) {
      M.vis($('#p' + k + 's'), t, base + 0.3, 1e9, { dy: 10 });
      $('#p' + k).querySelectorAll('.xl').forEach((el, c) => M.vis(el, t, base + 0.4 + c * 0.1, 1e9, { dy: 8 }));
      P.forEach((col, c) => col.forEach((_, i) => { const el = $('#p' + k + c + i); M.vis(el, t, T[c][i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); el.style.background = c ? C.redBg : C.gold3; el.style.color = c ? C.red : C.ink; }));
      M.vis($('#p' + k + 'm'), t, base + 0.6, 1e9, { dy: 16 });
      const done = hop(k, n, t, tm, per);
      M.vis($('#p' + k + 'v'), t, tm + (n - 1) * per + 0.1, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    }
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
    for (let i = 0; i < 3; i++) {
      if (i < 2) { M.vis($('#xg' + i), t, tXn[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); $('#xg' + i).style.background = C.redBg; $('#xg' + i).style.color = C.red; }
      M.vis($('#xh' + i), t, tXw[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); $('#xh' + i).style.background = C.redBg; $('#xh' + i).style.color = C.red;
      M.vis($('#wtL' + i), t, i < 2 ? tXn[i] : tXn[1] + 0.15, 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXw[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
    }
    M.vis($('#xr'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xrH'), t, tX4 + 0.35, 1e9, { dy: 10 }); M.vis($('#xrW'), t, wt('X4', 'flat') - 0.1, 1e9, { dy: 16, sp: M.SOFT });
    [[0, tX5 - 0.1, 400, wt('X5', 'two')], [1, wt('X5', 'one'), 30, wt('X5', 'one')]].forEach(([k, ta, w]) => {
      M.vis($('#tbl' + k), t, tX5 - 0.2 + k * 0.1, 1e9, { dy: 8 });
      const uu = M.o5((t - ta) / 0.8), ww = w * uu; $('#tb' + k).style.width = ww.toFixed(1) + 'px'; M.hide($('#tb' + k), ww < 0.5);
      const v = $('#tbv' + k); v.style.left = (220 + ww + 20).toFixed(1) + 'px'; v.style.opacity = M.clamp((t - ta - 0.2) / 0.3).toFixed(3); M.hide(v, t < ta + 0.2);
    });
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
        const g = M.io((t - a) / 0.2), d = M.io((t - Math.max(b, a + 0.4)) / 0.3);
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
