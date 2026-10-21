// Engineering Electronics Ep 01: What Is Electronics - Signals, Components and Systems (Project Neeru)
(() => {
const { $ } = M;
const C = { pcb: '#0B2A20', pcb2: '#0F3328', pcb3: '#133D30', tr: '#1F4A3A', cu: '#D9A35B', cu2: '#F0D2A2', cud: '#4A3A22', silk: '#E9F2EC', mut: '#7FA595', dim: '#3F6B5A', red: '#FF4D4D', red2: '#FF8A8A', redBg: '#3A1E1E', grn: '#3DDC84', scope: '#06170F', gridc: '#123526', dry: '#A8835A', wet: '#4A3524' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

Object.assign(M.IC, {
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  wave: ['M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0'],
  activity: ['M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2'],
  car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 17h6', 'M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  recycle: ['M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5', 'M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12', 'm14 16-3 3 3 3', 'M8.293 13.596 7.196 9.5 3.1 10.598', 'm9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843', 'm13.378 9.633 4.096 1.098 1.097-4.096'],
  timer: ['M10 2h4', 'M12 14l3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  eye: ['M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  power: ['M12 2v10', 'M18.4 6.6a9 9 0 1 1-12.77.04'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
});
const IMG = '../../assets/illustrations/engg-electronics/';
const FACE = n => `background-image:url(${IMG}eece-${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tAway = wt('H2', 'three'), tNobody = wt('H2', 'nobody');
const tH3 = T0('H3'), tCirc = wt('H3', 'circuit');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tTanvi = wt('L1', 'Tanvi'), tUncle = wt('L1', 'uncle');
const tImran = wt('L2', 'Imran'), tLak = wt('L2', 'Lakshmi'), tShab = wt('L3', 'Shabana');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tDout = T0('G1') - 0.32;
const tBulb = wt('D2', 'bulb'), tMotor = wt('D2', 'motor'), tInfo = wt('D3', 'information'), tDecs = wt('D3', 'decisions');
const tWork = wt('D4', 'work'), tWhen = wt('D4', 'when');
const tG1 = T0('G1'), tG2 = T0('G2'), tG3 = T0('G3'), tGout = T0('C1') - 0.32, tChanges = wt('G1', 'changes'), tSmooth = wt('G2', 'smoothly'), tTwo = wt('G3', 'two');
const tC1 = T0('C1'), tC2 = T0('C2'), tC3 = T0('C3'), tCout = T0('Y0') - 0.32;
const tRes = wt('C2', 'resistors'), tCap = wt('C2', 'capacitors'), tCannot = wt('C2', 'cannot'), tGuide = wt('C2', 'guide');
const tTrans = wt('C3', 'transistors'), tChips = wt('C3', 'chips'), tBigger = wt('C3', 'bigger');
const tY0 = T0('Y0'), tY = [T0('Y1'), T0('Y2'), T0('Y3')], tYout = T0('P1') - 0.32, tThree = wt('Y0', 'three');
const tP1 = T0('P1'), tP2 = T0('P2'), tP3 = T0('P3'), tP4 = T0('P4'), tP5 = T0('P5'), tP6 = T0('P6');
const tCross = wt('P4', 'crosses'), tDecide = wt('P4', 'decides'), tRelay = wt('P5', 'relay'), tGreen = wt('P5', 'green');
const tClimbs = wt('P6', 'climbs'), tOffP = wt('P6', 'off'), tNobodyP = wt('P6', 'Nobody');
const tT = T0('T1'), tSt2 = wt('T1', 'Electronics'), tPout = tT - 0.42, tTu = T0('K0') - 0.4;
const tK0 = T0('K0'), tK = [T0('K1'), T0('K2'), T0('K3')], tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'hospital'), wt('K2', 'airbag'), wt('K3', 'phone')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'water'), wt('X2', 'lives')], tXh = [wt('X3', 'power'), wt('X3', 'fail'), wt('X3', 'gadgets')];
const tBreaks = wt('X5', 'breaks'), tTimer = wt('X6', 'timer'), tHour = wt('X6', 'hour'), tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'sensor');
const tS = T0('R1'), tRow = [T0('R2'), T0('R3'), T0('R4')], tN = T0('N1');
const tPill = [[wt('R2', 'information'), wt('R2', 'decisions')], [wt('R3', 'Signals'), wt('R3', 'Components')], [wt('R4', 'senses'), wt('R4', 'decides'), wt('R4', 'acts')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const gridP = (w, h, s) => { let d = ''; for (let x = s; x < w; x += s) d += `M${x} 0V${h}`; for (let y = s; y < h; y += s) d += `M0 ${y}H${w}`; return `<path d="${d}" stroke="${C.gridc}" stroke-width="2" fill="none"/>`; };
// board holes
{ let s = ''; for (let x = 40; x < 1920; x += 80) for (let y = 40; y < 1080; y += 80) s += `<circle cx="${x}" cy="${y}" r="3" fill="#0F3328"/>`; $('#holes').innerHTML = s; }

// A: three days of drying soil
const DAYS = [[1, 60], [2, 35], [3, 12]];
$('#dRow').innerHTML = DAYS.map(([d, v], i) => `<div class="dy" id="dy${i}" style="left:${48 + i * 244}px"><div class="dl">DAY ${d}</div><div class="dt"><i id="dyb${i}"></i></div><div class="dv" id="dyv${i}">${v}%</div></div>`).join('');
wrap($('#hA'), 'hAOut', 784, 580);
// L: team
const TEAM = [['tanvi', 'Tanvi', 'TEAM LEAD · 18'], ['imran', 'Imran', 'BUILDS CIRCUITS'], ['lakshmi', 'Lakshmi', 'MEASURES + CODES'], ['shabana', 'Dr. Shabana', 'LAB MENTOR']];
$('#tRow').innerHTML = TEAM.map(([f, n, r], i) => { const x = 48 + (i % 2) * 352, y = 92 + Math.floor(i / 2) * 176; return `<div class="av" id="tv${i}" style="left:${x}px;top:${y}px;${FACE(f)}"></div><div class="nm" id="tn${i}" style="left:${x + 112}px;top:${y + 10}px">${n}</div><div class="rl" id="tr${i}" style="left:${x + 112}px;top:${y + 54}px">${r}</div>`; }).join('');
$('#goalI').innerHTML = M.icon('drop', 30, C.pcb, 2.4);
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#defPI').innerHTML = M.icon('zap', 24, C.cu, 2.4);
$('#elI').innerHTML = M.icon('bulb', 52, C.cu, 2); $('#enI').innerHTML = M.icon('cpu', 52, C.cu, 2);
[['elp0', 'bulb'], ['elp1', 'gear'], ['enp0', 'activity'], ['enp1', 'cpu']].forEach(([id, ic]) => { $('#' + id + ' span').innerHTML = M.icon(ic, 20, C.cu, 2.4); });
wrap($('#def'), 'defOut', 784, 580);
// G: scopes
$('#gdGrid').innerHTML = gridP(1472, 220, 40); $('#gAGrid').innerHTML = gridP(688, 340, 40); $('#gDGrid').innerHTML = gridP(688, 340, 40);
const pathFn = (f, x0, x1, n) => { let d = ''; for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + f(i / n).toFixed(1); } return d; };
// message-like signal: a few bumps of changing size
$('#gdW').setAttribute('d', pathFn(u => 110 - 70 * Math.sin(u * Math.PI * 7) * (0.35 + 0.65 * Math.sin(u * Math.PI)), 24, 1448, 280));
$('#gAW').setAttribute('d', pathFn(u => 50 + 250 * (1 - Math.exp(-2.2 * u)) / (1 - Math.exp(-2.2)) + 6 * Math.sin(u * 40), 70, 668, 200));
{ let d = 'M70 270', x = 70, hi = false; const seg = [60, 40, 80, 50, 40, 90, 60, 50, 70, 58]; for (const s of seg) { const y = hi ? 70 : 270; d += ` L${x} ${y} L${x + s} ${y}`; x += s; hi = !hi; } $('#gDW').setAttribute('d', d); }
// C: symbols
const SYMS = {
  res: '<path d="M0 70 H40 L50 50 L66 90 L82 50 L98 90 L114 50 L130 90 L140 70 H160" fill="none" stroke="#D9A35B" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>',
  cap: '<path d="M0 70 H70 M90 70 H160 M70 34 V106 M90 34 V106" fill="none" stroke="#D9A35B" stroke-width="5" stroke-linecap="round"/>',
  ind: '<path d="M0 70 H24 C24 40 52 40 52 70 C52 40 80 40 80 70 C80 40 108 40 108 70 C108 40 136 40 136 70 H160" fill="none" stroke="#D9A35B" stroke-width="5" stroke-linecap="round"/>',
  bjt: '<circle cx="86" cy="70" r="52" fill="none" stroke="#D9A35B" stroke-width="4"/><path d="M10 70 H64 M64 38 V102 M64 56 L112 26 M64 84 L112 114" fill="none" stroke="#D9A35B" stroke-width="5" stroke-linecap="round"/><path d="M96 98 L112 114 L90 114" fill="none" stroke="#D9A35B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  ic: '<rect x="36" y="20" width="88" height="100" rx="6" fill="#0B2A20" stroke="#D9A35B" stroke-width="5"/><path d="M66 20 a14 14 0 0 0 28 0" fill="none" stroke="#D9A35B" stroke-width="4"/>' + [36, 60, 84, 108].map(y => `<path d="M20 ${y} H36 M124 ${y} H140" stroke="#D9A35B" stroke-width="5" stroke-linecap="round"/>`).join(''),
};
const symTile = (id, k, name, x) => `<div class="sym" id="${id}" style="left:${x}px"><svg width="160" height="140">${SYMS[k]}</svg><div class="sn">${name}</div></div>`;
$('#cPs').innerHTML = symTile('sy0', 'res', 'Resistor', 48) + symTile('sy1', 'cap', 'Capacitor', 288) + symTile('sy2', 'ind', 'Inductor', 528) +
  [['RESIST', 48], ['STORE', 288], ['GUIDE', 528]].map(([v, x], i) => `<div class="vb" id="vb${i}" style="left:${x}px">${v}</div>`).join('');
$('#cAs').innerHTML = symTile('sy3', 'bjt', 'Transistor', 48) + symTile('sy4', 'ic', 'Chip (IC)', 288) +
  [['CONTROL', 48], ['AMPLIFY', 288]].map(([v, x], i) => `<div class="vb" id="vc${i}" style="left:${x}px">${v}</div>`).join('');
$('#ampI').setAttribute('d', pathFn(u => 75 + 14 * Math.sin(u * Math.PI * 4), 16, 192, 80));
$('#ampO').setAttribute('d', pathFn(u => 140 - 0 + 48 * Math.sin(u * Math.PI * 4) - 40, 16, 192, 80));
$('#cPbI').innerHTML = M.icon('x', 30, C.red2, 2.8); $('#cAbI').innerHTML = M.icon('zap', 30, C.pcb, 2.4);
// Y: system blocks
const YB = [['eye', 'SENSE', 'Sense'], ['cpu', 'DECIDE', 'Decide'], ['power', 'ACT', 'Act']];
$('#yBlocks').innerHTML = YB.map(([ic, n, t], i) => `<div class="card yb" id="yb${i}" style="left:${160 + i * 560}px"><div class="yn">0${i + 1} · ${n}</div><div class="yi"></div><div class="h yt">${t}</div></div>`).join('');
$('#yDots').innerHTML = Array.from({ length: 8 }, (_, i) => `<circle id="yd${i}" r="7" fill="#D9A35B"/>`).join('');
const YM = [['lakshmi', 'SENSE · SOIL SENSOR', 'How wet is the soil?'], ['imran', 'DECIDE · CONTROLLER', 'Is it below the dry line?'], ['tanvi', 'ACT · RELAY + PUMP', 'Water on, light green']];
$('#ymRow').innerHTML = YM.map(([f, a, b], i) => `<div class="ymc" id="ymc${i}" style="left:${48 + i * 520}px"><i style="${FACE(f)}"></i><div class="a">${a}</div><div class="b">${b}</div></div>`).join('');

// P: the controller drawing
$('#pS').innerHTML = `
  <rect width="688" height="380" rx="4" fill="#0B2A20"/>
  <rect id="soil" x="0" y="258" width="400" height="122" fill="${C.dry}"/>
  <text x="20" y="364" font-family="IBM Plex Mono" font-weight="600" font-size="18" letter-spacing="2" fill="#0B2A20">SOIL</text>
  <path d="M134 196 V120 H288" fill="none" stroke="#1F4A3A" stroke-width="10"/><path id="sigT" d="M134 196 V120 H288" fill="none" stroke="#D9A35B" stroke-width="4" stroke-dasharray="10 14"/>
  <rect x="112" y="196" width="44" height="40" rx="4" fill="#133D30" stroke="#D9A35B" stroke-width="3"/>
  <path d="M122 236 V318 M146 236 V318" stroke="#D9A35B" stroke-width="7" stroke-linecap="round"/>
  <text x="168" y="226" font-family="IBM Plex Mono" font-weight="600" font-size="16" letter-spacing="2" fill="#7FA595">SENSOR</text>
  <rect x="288" y="76" width="140" height="92" rx="6" fill="#133D30" stroke="#D9A35B" stroke-width="3"/>
  ${[96, 122, 148].map(y => `<path d="M276 ${y} H288 M428 ${y} H440" stroke="#D9A35B" stroke-width="4"/>`).join('')}
  <text x="358" y="128" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="18" letter-spacing="2" fill="#E9F2EC">CONTROL</text>
  <path d="M440 122 H500" stroke="#1F4A3A" stroke-width="10"/><path id="cmdT" d="M440 122 H500" stroke="#D9A35B" stroke-width="4"/>
  <rect x="500" y="92" width="64" height="60" rx="4" fill="#133D30" stroke="#7FA595" stroke-width="3"/>
  <path d="M512 122 h40" stroke="#7FA595" stroke-width="3" stroke-dasharray="6 6"/>
  <text x="532" y="80" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="16" letter-spacing="2" fill="#7FA595">RELAY</text>
  <path id="loop" d="M564 106 H640 V240 M640 324 V344 H476 V106 H500" fill="none" stroke="#1F4A3A" stroke-width="10" stroke-linejoin="round"/>
  <g id="sw" transform="translate(640 240)"><circle r="6" fill="#D9A35B"/><path id="swArm" d="M0 0 L0 40" stroke="#D9A35B" stroke-width="6" stroke-linecap="round"/></g>
  <g transform="translate(640 284)"><circle r="40" fill="#133D30" stroke="#D9A35B" stroke-width="4"/><g id="fan">${[0, 120, 240].map(a => `<path transform="rotate(${a})" d="M0 0 C10 -10 26 -12 30 -2 C22 0 10 4 0 0Z" fill="#D9A35B"/>`).join('')}</g><circle r="6" fill="#0B2A20"/></g>
  <text x="590" y="372" font-family="IBM Plex Mono" font-weight="600" font-size="16" letter-spacing="2" fill="#7FA595">PUMP</text>
  <path d="M600 300 H400" stroke="#1F4A3A" stroke-width="14"/><path id="water" d="M600 300 H400" stroke="#E9F2EC" stroke-width="5" stroke-dasharray="14 16"/>
  <g transform="translate(476 210)"><circle id="ledP" r="16" fill="#1C3A2F" stroke="#2E5A49" stroke-width="3"/></g>
  <text x="430" y="196" font-family="IBM Plex Mono" font-weight="600" font-size="16" letter-spacing="2" fill="#7FA595">LED</text>
  <g id="pDots">${Array.from({ length: 12 }, (_, i) => `<circle id="pd${i}" r="6" fill="#F0D2A2"/>`).join('')}</g>`;
// oscilloscope
const OX0 = 60, OX1 = 664, VY = v => 222 - v / 3.2 * 196, DRY = 1.2;
$('#oS').innerHTML = `${gridP(688, 360, 40)}
  <path d="M${OX0} ${VY(DRY)} H${OX1}" stroke="#FF4D4D" stroke-width="3" stroke-dasharray="10 10"/>
  <text x="${OX1}" y="${VY(DRY) - 12}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="16" letter-spacing="2" fill="#FF8A8A">DRY LINE 1.2 V</text>
  <text x="14" y="${VY(2.8) + 6}" font-family="IBM Plex Mono" font-size="15" fill="#7FA595">2.8</text><text x="14" y="${VY(0) + 4}" font-family="IBM Plex Mono" font-size="15" fill="#7FA595">0 V</text>
  <text x="14" y="282" font-family="IBM Plex Mono" font-weight="600" font-size="15" fill="#3DDC84">ON</text><text x="14" y="332" font-family="IBM Plex Mono" font-weight="600" font-size="15" fill="#7FA595">OFF</text>
  <path d="M0 244 H688" stroke="#1F4A3A" stroke-width="2"/>
  <path id="ch1" fill="none" stroke="#D9A35B" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  <path id="ch2" fill="none" stroke="#3DDC84" stroke-width="4" stroke-linejoin="round"/>
  <circle id="ch1d" r="8" fill="#F0D2A2"/>`;
$('#pstI').innerHTML = M.icon('sun', 28, C.cu, 2.2);

// K: at work today
const KA = [
  ['eye', 'Sense', 'Turn the world into a signal', 'lakshmi', 'The soil sensor reads how wet the field is', 'activity', 'A hospital monitor reads a heartbeat'],
  ['cpu', 'Decide', 'Compare the signal with a rule', 'imran', 'The controller checks the dry line', 'car', 'An airbag circuit decides in a split second'],
  ['power', 'Act', 'An output does the work', 'tanvi', 'The relay switches the pump on', 'phone', 'A phone screen lights millions of dots'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${116 + i * 148}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['ELECTRONICS TODAY', 'Three jobs', 'In every gadget you own', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 03`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="h pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:336px"><i style="${FACE(a[3])}"></i><div class="kl">AT PROJECT NEERU</div><div class="kt">${a[4]}</div></div>
        <div class="ka" id="ka${i}1" style="top:456px"><i>${M.icon(a[5], 36, C.cu, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[6]}</div></div>`
     : `<div class="ka" id="ka00" style="top:320px"><i>${M.icon('activity', 36, C.cu, 2.2)}</i><div class="kl">SENSE · DECIDE · ACT</div><div class="kt">From a farm pump to a hospital</div></div>`) + `</div>`).join('');

// X: human side
const XG = [['drop', 'Saves water and time'], ['heart', 'Even saves lives']];
const XH = [['zap', 'Needs power'], ['alert', 'It can fail'], ['recycle', 'E-waste']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${388 + i * 60}px;background:#14402F;color:#E9F2EC">${M.icon(ic, 22, C.grn, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${388 + i * 60}px;background:${C.redBg};color:${C.red2}">${M.icon(ic, 22, C.red2, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n, k) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#7FA595" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#7FA595" stroke-width="3"/>` +
  Array.from({ length: k }, (_, i) => `<rect id="wt${n}${i}" x="${-58 + i * 40}" y="52" width="34" height="34" rx="4" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#133D30" stroke="#7FA595" stroke-width="3"/>`;
$('#panL').innerHTML = pan(C.grn, 'L', 2); $('#panR').innerHTML = pan(C.red, 'R', 3);
$('#xf0').style.cssText += ';' + FACE('mahadev'); $('#xf1').style.cssText += ';' + FACE('tanvi');
$('#bb1I').innerHTML = M.icon('timer', 24, C.pcb, 2.4);
$('#bothI').innerHTML = M.icon('alert', 52, C.pcb, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['Soil sensor', 'Circuit', 'Pump', 'Green light'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot h">${o}</div><div class="ok">${M.icon('check', 30, C.pcb, 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('cpu', 44, C.pcb, 2.4);
// recap
const ROWS = [['cpu', 'Current carries information', ['Information', 'Decisions']], ['wave', 'Analog or digital, passive or active', ['Signals', 'Components']], ['power', 'Every system has three jobs', ['Sense', 'Decide', 'Act']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.cu, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.cu, 2.4);

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
const led = (el, on, col) => { el.style.background = on > 0 ? mix('#1C3A2F', col, on) : '#1C3A2F'; el.style.boxShadow = on > 0.5 ? `0 0 0 3px ${M.rgba(col, 0.35)}` : 'inset 0 0 0 3px #2E5A49'; };

// the farm model (EXAMPLE FIGURES): sensor volts over the story time
const tVend = tPout;
const V = t => {
  if (t < tP3) return 2.8;
  if (t < tCross) return M.lerp(2.8, 1.2, M.clamp((t - tP3) / (tCross - tP3)));
  const tOn = tRelay;
  if (t < tOn + 0.6) return M.lerp(1.2, 1.05, M.io((t - tCross) / (tOn + 0.6 - tCross)));
  if (t < tOffP) return M.lerp(1.05, 2.4, M.io((t - tOn - 0.6) / (tOffP - tOn - 0.6)));
  return M.lerp(2.4, 2.5, M.clamp((t - tOffP) / 3));
};
const pumpOn = t => t >= tRelay && t < tOffP;
const tx = t => OX0 + (OX1 - OX0) * M.clamp((t - tP2) / (tVend - tP2));
// clock: 06:00 at P2, 12:00 at P4, 14:30 at pump off, 15:00 at the end
const clock = t => { const k = [[tP2, 360], [tP4, 720], [tOffP, 870], [tVend, 900]]; let m = 360; for (let i = 0; i < k.length - 1; i++) if (t >= k[i][0]) m = M.lerp(k[i][1], k[i + 1][1], M.clamp((t - k[i][0]) / (k[i + 1][0] - k[i][0]))); const mm = Math.floor(m / 5) * 5; return `${String(Math.floor(mm / 60)).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`; };
let loopEl = null, loopLen = 0;

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '130px';
  let fs = 130; if (ti.offsetWidth > 1560) fs = Math.floor(130 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 152, es: 60 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '172px';
  let x = 168; for (let i = 0; i < 2; i++) { const p = $('#elp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 14; }
  x = 168; for (let i = 0; i < 2; i++) { const p = $('#enp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 14; }
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 744) el.style.fontSize = Math.floor(32 * 744 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.ql').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(44 * 688 / el.offsetWidth) + 'px'; });
  const ds = $('#defS'); if (ds.offsetWidth > 688) ds.style.fontSize = Math.floor(26 * 688 / ds.offsetWidth) + 'px';
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 316) o.style.fontSize = Math.floor(40 * 316 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 14; }); });
  const tm = $('#tgM'); tm.style.left = '48px';
  loopEl = $('#loop'); loopLen = loopEl.getTotalLength();
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -5], [tXg[1] + 0.1, -10], [tXh[0] + 0.1, -5], [tXh[1] + 0.1, 0], [tXh[2] + 0.1, 5]], M.SOFT);

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
  const exOn = t < tL1 ? [tMorph + 0.6, tAout] : t < tK0 ? [tP2, tPout] : [tX6, tXout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: the dry field ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    const hA = $('#hA'); M.vis(hA, t, tMorph + 0.15, tAout, { dy: 36, ...o }); grow(hA, $('#hAOut'), t, tAway - 0.1);
    M.vis($('#hImg'), t, tMorph + 0.35, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgM'), t, tMorph + 0.7, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#days'), t, tAway + 0.05, tAout, { dx: 60, dy: 0, ...o });
    DAYS.forEach(([, v], i) => {
      const ta = tAway + 0.3 + i * 0.45, el = $('#dy' + i);
      M.vis(el, t, ta - 0.15, 1e9, { dy: 16 });
      const u = M.io((t - ta) / 0.6), h = M.lerp(170, 170 * v / 100, u);
      const b = $('#dyb' + i); b.style.height = h.toFixed(1) + 'px'; b.style.background = mix(C.cu, C.red, i === 2 ? u : 0);
      M.setT($('#dyv' + i), Math.round(M.lerp(100, v, u)) + '%'); $('#dyv' + i).style.color = i === 2 && u > 0.5 ? C.red2 : C.silk;
    });
    M.vis($('#pumpOff'), t, tNobody - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    led($('#poL'), 1, C.red);
    M.rise($('#hq'), t, tCirc - 0.15, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: meet Project Neeru ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tL2 - 0.2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#team'), t, tL2 + 0.02, tLout, { dx: 60, dy: 0, ...o });
    const tTv = [tL2 + 0.25, tImran - 0.05, tLak - 0.05, tShab - 0.1];
    TEAM.forEach((_, i) => {
      M.vis($('#tv' + i), t, tTv[i], 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#tn' + i), t, tTv[i] + 0.08, 1e9, { dy: 10 }); M.vis($('#tr' + i), t, tTv[i] + 0.14, 1e9, { dy: 8 });
      const nx = i < 3 ? tTv[i + 1] : 1e9, on = M.io((t - tTv[i]) / 0.25) * (1 - M.io((t - nx) / 0.25));
      $('#tv' + i).style.boxShadow = '0 0 0 4px ' + mix(C.tr, C.cu, i === 0 ? Math.max(on, 0) : on);
    });
    M.vis($('#goal'), t, tL3 + 1.2, 1e9, { dy: 20 });
  }

  /* ===== D: what is electronics ===== */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const df = $('#def'); M.vis(df, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(df, $('#defOut'), t, tBulb - 0.3);
    M.vis($('#defP'), t, tD2 + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    for (let i = 0; i < 3; i++) { const q = $('#ql' + i); M.vis(q, t, tD3 - 0.2 + i * 0.1, 1e9, { dy: 14 }); }
    $('#hl0').style.color = mix(C.silk, C.cu, M.io((t - tInfo) / 0.3)); $('#hl1').style.color = mix(C.silk, C.cu, M.io((t - tDecs) / 0.3));
    M.vis($('#defHr'), t, tD4 - 0.1, 1e9, { dy: 0 }); M.rise($('#defS'), t, tD4 + 0.1, { st: 0.03 });
    M.vis($('#elc'), t, tBulb - 0.15, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#elp0'), t, tBulb, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#elp1'), t, tMotor, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#enc'), t, tD3 + 0.1, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#enp0'), t, tInfo, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#enp1'), t, tDecs, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const a = M.io((t - tWork) / 0.3) * (1 - M.io((t - tWhen + 0.1) / 0.3)), b = M.io((t - tWhen) / 0.3);
    $('#elc').style.borderColor = mix(C.tr, C.cu, a); $('#enc').style.borderColor = mix(C.tr, C.cu, b);
    $('#elI').style.background = mix(C.pcb3, C.cud, a); $('#enI').style.background = mix(C.pcb3, C.cud, b);
  }

  /* ===== G: signals ===== */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#gdef'), t, tG1 + 0.05, tG2 - 0.3, { dy: 36, ...o });
    M.rise($('#gdT'), t, tG1 + 0.25, { st: 0.06, sp: M.HEAVY }); M.rise($('#gdT2'), t, tChanges + 0.2, { st: 0.06, sp: M.HEAVY });
    M.vis($('#gdS'), t, tG1 + 0.4, 1e9, { dy: 20 }); M.draw($('#gdW'), t, tChanges - 0.2, 2.6, M.io);
    M.vis($('#gA'), t, tG2 + 0.05, tGout, { dx: -60, dy: 0, ...o }); M.draw($('#gAW'), t, tSmooth - 0.5, 2.4, M.io);
    M.vis($('#gAs'), t, tSmooth, 1e9, { dy: 10 });
    M.vis($('#gD'), t, tG2 + 0.3, tGout, { dx: 60, dy: 0, ...o });
    const du = M.io((t - tTwo + 0.2) / 2.6); M.drawU($('#gDW'), du);
    M.vis($('#gDs'), t, tTwo + 0.2, 1e9, { dy: 10 });
    // LED follows the level at the pen tip
    { const el = $('#gDW'); const L = el.getTotalLength(); const p = el.getPointAtLength(L * M.clamp(du)); led($('#gLed'), du > 0 && p.y < 170 ? 1 : 0, C.grn); }
  }

  /* ===== C: components ===== */
  const cOn = t >= tC1 - 0.1 && t < tY0 + 0.2; M.hide($('#sC'), !cOn);
  if (cOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#cP'), t, tC1 + 0.1, tCout, { dx: -60, dy: 0, ...o });
    M.vis($('#cA'), t, tC1 + 0.25, tCout, { dx: 60, dy: 0, ...o });
    const tS3 = [tRes - 0.1, tCap - 0.1, tCap + 0.4, tTrans - 0.1, tChips - 0.1];
    for (let i = 0; i < 5; i++) {
      const el = $('#sy' + i); M.vis(el, t, i < 3 ? tC1 + 0.4 + i * 0.08 : tC1 + 0.55 + (i - 3) * 0.08, 1e9, { dy: 16 });
      const on = M.io((t - tS3[i]) / 0.3); el.style.background = mix(C.pcb3, C.cud, on * (i < 3 ? 1 - M.io((t - tC3) / 0.3) : 1));
      el.querySelector('svg').style.opacity = (0.35 + 0.65 * on).toFixed(3);
    }
    for (let i = 0; i < 3; i++) M.vis($('#vb' + i), t, tGuide - 0.6 + i * 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#cPb'), t, tCannot - 0.05, 1e9, { dy: 20 });
    M.vis($('#amp'), t, tC3 + 0.5, 1e9, { dy: 16 }); M.draw($('#ampI'), t, tC3 + 0.7, 0.8, M.io); M.draw($('#ampO'), t, tBigger - 0.3, 0.9, M.io);
    for (let i = 0; i < 2; i++) M.vis($('#vc' + i), t, [wt('C3', 'control'), tBigger][i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#cAb'), t, tBigger + 0.1, 1e9, { dy: 20 });
  }

  /* ===== Y: the system ===== */
  const yOn = t >= tY0 - 0.1 && t < tP1 + 0.2; M.hide($('#sY'), !yOn);
  if (yOn) {
    const o = { outDur: 0.3, ody: -16 };
    YB.forEach(([ic], i) => {
      const el = $('#yb' + i); M.vis(el, t, tY0 + 0.1 + i * 0.1, tYout, { dy: 36, ...o });
      const on = M.io((t - tY[i]) / 0.3), off = i < 2 ? M.io((t - tY[i + 1]) / 0.3) : M.io((t - tYout + 0.4) / 0.3), act = on * (1 - off);
      el.style.background = mix(C.pcb2, C.cu, act); el.style.borderColor = mix(C.tr, C.cu, on);
      el.querySelector('.yt').style.color = mix(C.silk, C.pcb, act); el.querySelector('.yn').style.color = mix(t < tY[i] ? C.dim : C.mut, C.pcb, act);
      el.querySelector('.yi').style.background = mix(C.pcb3, C.pcb, act);
      setIco(el.querySelector('.yi'), ic, t < tY[i] ? C.dim : C.cu, 52, 2);
    });
    M.vis($('#yTr'), t, tY0 + 0.4, tYout, { dy: 0, ...o });
    for (let i = 0; i < 8; i++) {
      const lane = i < 4 ? 0 : 1, ts = tY[lane + 1] - 0.4, s = t - ts;
      const d = $('#yd' + i); if (s < 0) { M.hide(d, true); continue; } M.hide(d, false);
      const u = ((s * 0.9 + (i % 4) * 0.25) % 1); attr(d, 'cx', (lane ? 1040 : 480) + 80 * u); attr(d, 'cy', 145);
    }
    M.vis($('#ym'), t, tThree - 0.1, tYout, { dy: 36, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#ymc' + i), t, tY[i] + 0.25, 1e9, { dy: 16 });
  }

  /* ===== P: the live run ===== */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pL'), t, tP1 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#pR'), t, tP1 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    const tc = Math.max(t, tP2), v = V(tc), on = pumpOn(t);
    // soil colour follows moisture
    attr($('#soil'), 'fill', mix(C.dry, C.wet, M.clamp((v - 1.0) / 1.8)));
    M.setT($('#pClk'), clock(Math.max(t, tP2)));
    // signal trace dashes creep toward the controller
    attr($('#sigT'), 'stroke-dashoffset', (-(t * 30) % 24).toFixed(1));
    attr($('#cmdT'), 'stroke', on ? C.cu : C.dim);
    const ang = on ? -90 + 90 * (1 - M.io((t - tRelay) / 0.25)) : -40;
    attr($('#swArm'), 'transform', `rotate(${on ? (-90 + 90 * M.io((t - tRelay) / 0.2)).toFixed(1) : '-40'})`);
    const fanA = on ? ((t - tRelay) * 540) % 360 : 0; attr($('#fan'), 'transform', `rotate(${fanA.toFixed(1)})`);
    attr($('#water'), 'stroke-dashoffset', on ? ((t - tRelay) * 60 % 30).toFixed(1) : '0');
    $('#water').style.opacity = on ? '1' : '0';
    attr($('#ledP'), 'fill', on ? mix('#1C3A2F', C.grn, M.io((t - tRelay - 0.1) / 0.25)) : '#1C3A2F');
    for (let i = 0; i < 12; i++) {
      const d = $('#pd' + i); if (!on) { M.hide(d, true); continue; } M.hide(d, false);
      const p = loopEl.getPointAtLength(((t - tRelay) * 160 + i * loopLen / 12) % loopLen); attr(d, 'cx', p.x.toFixed(1)); attr(d, 'cy', p.y.toFixed(1));
    }
    // oscilloscope traces
    let d1 = '', d2 = ''; const te = M.clamp(t, tP2, tVend);
    if (t > tP2) {
      const n = 160;
      for (let i = 0; i <= n; i++) { const tt = tP2 + (te - tP2) * i / n; d1 += (i ? 'L' : 'M') + tx(tt).toFixed(1) + ' ' + VY(V(tt)).toFixed(1); }
      const y2 = s => pumpOn(s) ? 276 : 326;
      d2 = `M${OX0} 326`; let prev = false;
      for (let i = 0; i <= n; i++) { const tt = tP2 + (te - tP2) * i / n, s = pumpOn(tt); if (s !== prev) { d2 += ` L${tx(tt).toFixed(1)} ${prev ? 276 : 326} L${tx(tt).toFixed(1)} ${y2(tt)}`; prev = s; } }
      d2 += ` L${tx(te).toFixed(1)} ${y2(te)}`;
    }
    attr($('#ch1'), 'd', d1 || 'M0 0'); attr($('#ch2'), 'd', d2 || 'M0 0');
    M.hide($('#ch1'), t <= tP2); M.hide($('#ch2'), t <= tP2);
    const dt = $('#ch1d'); M.hide(dt, t <= tP2); attr(dt, 'cx', tx(te).toFixed(1)); attr(dt, 'cy', VY(V(te)).toFixed(1));
    M.setT($('#rdV'), v.toFixed(1) + ' V'); $('#rdV').style.color = v <= DRY + 0.02 ? C.red2 : C.silk;
    M.setT($('#rdP'), on ? 'ON' : 'OFF'); $('#rdP').style.color = on ? C.grn : C.silk; led($('#rdL'), on ? 1 : 0, C.grn);
    M.vis($('#rd0'), t, tP2 - 0.1, 1e9, { dy: 10 }); M.vis($('#rd1'), t, tP2, 1e9, { dy: 10 });
    // step pill
    const ps = t >= tOffP ? ['check', 'Soil wet again, pump off by itself', C.grn] : t >= tRelay ? ['power', 'Relay on: pump runs, LED green', C.grn] : t >= tDecide ? ['cpu', 'Below the dry line: water now', C.cu] : t >= tP3 ? ['sun', 'Noon: the soil dries, signal falls', C.cu] : ['drop', 'Sunrise: soil wet, pump off', C.cu];
    setIco($('#pstI'), ps[0], ps[2], 28, 2.4); M.setT($('#pstT'), ps[1]);
    const hi = t >= tDecide && t < tRelay; $('#pst').style.background = hi ? C.cu : C.pcb3; $('#pst').style.color = hi ? C.pcb : C.silk; if (hi) setIco($('#pstI'), 'cpu', C.pcb, 28, 2.4);
    M.vis($('#pst'), t, tP1 + 0.6, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
  }

  /* ===== statement ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.4 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 2 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.pcb3, C.cu, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix(C.pcb, C.silk, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.pcb, C.cu, off);
      el.querySelector('.ri').style.background = mix(C.pcb, C.cud, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : C.cu, 32, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 3 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis($('#ka00'), t, tin + 0.6, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X: the human side ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4 - 0.1);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) { M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 }); }
    for (let i = 0; i < 3; i++) { M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }); M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 }); }
    M.vis($('#xw'), t, tX4 - 0.1 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#fact'), t, tX4 + 0.3, 1e9, { dy: 16 });
    M.vis($('#xr0'), t, tX5 - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tBreaks ? C.redBg : C.pcb3; $('#bb0').style.color = t > tBreaks ? C.red2 : C.silk;
    M.vis($('#xr1'), t, tX6 - 0.1, 1e9, { dx: 24, dy: 0 }); $('#bb1').style.background = C.cu; $('#bb1').style.color = C.pcb;
    M.vis($('#tmr'), t, tTimer - 0.05, 1e9, { dy: 16 }); M.draw($('#tmrA'), t, tHour - 0.3, 1.2, M.io);
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
    OPTS.forEach((_, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 1.5 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAns) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.pcb2, C.cu, r) : mix(C.pcb2, C.pcb, r);
      bg.style.borderColor = right ? mix(C.tr, C.cu, r) : C.tr;
      el.querySelector('.ot').style.color = right ? mix(C.silk, C.pcb, r) : mix(C.silk, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.cud, C.pcb, r) : C.cud; lt.style.color = right ? C.cu : mix(C.cu, C.dim, r);
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

  /* ===== recap + next ===== */
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
        el.style.background = mix(mix(C.pcb3, C.cu, g), C.cud, d);
        el.style.color = g > 0.5 && d < 0.5 ? C.pcb : (d >= 0.5 ? C.cu : C.silk);
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
M.outro({ bg: '#0B2A20', ink: '#E9F2EC', accent: '#D9A35B', sub: 'rgba(233,242,236,.62)', font: 'Chakra Petch' });
})();
