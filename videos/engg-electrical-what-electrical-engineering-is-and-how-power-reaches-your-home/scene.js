// Engineering Electrical - Basic Electrical Engineering, Ep 01: What Electrical Engineering Is and How Power Reaches Your Home (Suryagaon)
(() => {
const { $ } = M;
const C = { bg: '#121417', panel: '#1B1F24', panel2: '#22272E', panel3: '#2A3038', line: '#39404A', white: '#F4F5F7', muted: '#8B939E', dim: '#4A525D', yel: '#FFC93C', yel2: '#FFE6A3', yelD: '#3A3220', blue: '#6EA8FF', blueD: '#1E2A3E', red: '#FF6B5A', redD: '#3A2220' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/engg-electrical/';
const FACE = n => `background-image:url(${IMG}eeee-${n}-face.jpg)`;
const inr = n => { const s = String(Math.round(n)); if (s.length <= 3) return s; const l3 = s.slice(-3); let r = s.slice(0, -3); const p = []; while (r.length > 2) { p.unshift(r.slice(-2)); r = r.slice(0, -2); } if (r) p.unshift(r); return p.join(',') + ',' + l3; };

Object.assign(M.IC, {
  x: ['M18 6 6 18', 'm6 6 12 12'],
  fan: ['M10.8 9.5a2 2 0 1 0 2.4 3', 'M12 12 9 4a4 4 0 0 1 6 0z', 'M12 12l7.5 4.5a4 4 0 0 1-3 5.2z', 'M12 12l-7.5 4.5a4 4 0 0 0 3 5.2z'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  tower: ['M8 22 12 2l4 20', 'M6 8h12', 'M7.5 14h9', 'M9 8l6 6', 'M15 8l-6 6', 'M4 8v2', 'M20 8v2'],
  plug: ['M12 22v-5', 'M9 8V2', 'M15 8V2', 'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z'],
  trafo: ['M9 12a5 5 0 1 0 0 .01', 'M15 12a5 5 0 1 0 0 .01'],
  factory: ['M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M17 18h1', 'M12 18h1', 'M7 18h1'],
  hospital: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
  train: ['M8 3.1V7a4 4 0 0 0 8 0V3.1', 'm9 15-1-1', 'm15 15 1-1', 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', 'm8 19-2 3', 'm16 19 2 3'],
  grid: ['M12 2v4', 'M12 18v4', 'M2 12h4', 'M18 12h4', 'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  mountain: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  sigma: ['M3 12h3l3-8 6 16 3-8h3'],
  wave: ['M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0'],
});

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tWhere = wt('H2', 'Where'), tOut = wt('H1', 'out');
const tC1 = T0('C1'), tC2 = T0('C2'), tC3 = T0('C3'), tC4 = T0('C4'), tHout = tC1 - 0.32;
const tPw = wt('C2', 'power'), tPu = wt('C2', 'pumps'), tSh = wt('C3', 'Shankar'), tFa = wt('C4', 'Farida'), tCout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tDout = T0('J1') - 0.32;
const tDk = [wt('D2', 'makes'), wt('D2', 'moves'), wt('D2', 'puts')];
const tDb = [wt('D3', 'power'), wt('D3', 'wires'), wt('D3', 'motors'), wt('D3', 'circuits')];
const tJ = [1, 2, 3, 4, 5, 6, 7].map(i => T0('J' + i)), tEleven = wt('J5', 'eleven'), tMeter = wt('J7', 'meter'), tSwitch = wt('J7', 'switchboard'), tGlow = wt('J7', 'glows'), tJout = T0('W1') - 0.32;
const tW = [1, 2, 3, 4, 5].map(i => T0('W' + i)), tWout = T0('T1') - 0.32;
const tW3a = wt('W3', 'hundred'), tW3b = wt('W3', 'wastes'), tW4a = wt('W4', 'ten', 1), tW4b = wt('W4', 'waste'), tW5b = wt('W5', 'hundredth'), tSq = wt('W5', 'squared');
const tT = T0('T1'), tSt2 = wt('T1', 'and'), tV1 = T0('V1'), tTu = tV1 - 0.32;
const tV2 = T0('V2'), tV3 = T0('V3'), tFifty = wt('V2', 'fifty'), tHz = wt('V2', 'hertz'), tRms = wt('V3', 'two'), tPeak = wt('V3', 'peaks'), tVout = T0('K0') - 0.32;
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'power'), wt('K2', 'India'), wt('K3', 'hospital'), wt('K4', 'metro')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'Light'), wt('X2', 'water')], tXh = [wt('X3', 'Wires'), wt('X3', 'live')];
const tKit = wt('X4', 'Kittu'), tShX = wt('X4', 'Shankar'), tOnly = wt('X5', 'Only'), tFact = wt('X6', 'nineteen'), tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Higher');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'makes'), wt('S2', 'moves'), wt('S2', 'work')], [wt('S3', 'up'), wt('S3', 'down')], [wt('S4', 'two'), wt('S4', 'fifty')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- helpers ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const attr = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };

/* ---------- build ---------- */
// H: what stops
const HS = [['bulb', 'LIGHTS'], ['fan', 'FAN'], ['droplet', 'PUMP']];
$('#hRow').innerHTML = HS.map(([ic, n], i) => `<div class="sr" id="hs${i}" style="left:${36 + i * 246}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt"></div></div>`).join('');
wrap($('#hI'), 'hIOut', 784, 580);
// C: problem + team
$('#pr0I').innerHTML = M.icon('bulb', 30, C.red, 2.2); $('#pr1I').innerHTML = M.icon('droplet', 30, C.red, 2.2);
const TEAM = [['meera', 'Meera', 'STUDENT'], ['shankar', 'Shankar anna', 'LINEMAN'], ['farida', 'Farida', 'PANCHAYAT'], ['kittu', 'Kittu', 'BROTHER']];
$('#tRow').innerHTML = TEAM.map(([f, n, r], i) => { const cx = 116 + i * 184; return `<div class="av" id="tv${i}" style="left:${cx - 36}px;top:72px;${FACE(f)}"></div><div class="tnm" id="tn${i}" style="left:${cx - 85}px">${n}</div><div class="trl" id="tr${i}" style="left:${cx - 85}px">${r}</div>`; }).join('');
wrap($('#cI'), 'cIOut', 784, 580);
// D: three jobs + builds
const MM = [['zap', 'JOB 1', 'Make'], ['tower', 'JOB 2', 'Move'], ['plug', 'JOB 3', 'Use']];
$('#mmRow').innerHTML = MM.map(([ic, n, t], i) => `<div class="mm" id="mm${i}" style="left:${36 + i * 243}px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${t}</div></div>`).join('');
const BB = [['factory', 'Power stations'], ['tower', 'Wires'], ['gear', 'Motors'], ['cpu', 'Circuits']];
$('#bRow').innerHTML = BB.map(([ic, t], i) => `<div class="pill" id="bb${i}x" style="top:${i < 2 ? 84 : 160}px"><span></span><span>${t}</span></div>`).join('');
wrap($('#dD'), 'dDOut', 784, 580);

// J: the journey. Nodes on a 1600 x 580 svg.
const NY = 300;
const NODES = [
  { x: 150, n: 'POWER STATION', v: '11,000 V' }, { x: 380, n: 'STEP UP', v: '4,00,000 V' }, { x: 680, n: 'TOWERS', v: '4,00,000 V' },
  { x: 980, n: 'SUBSTATION', v: '33,000 V' }, { x: 1200, n: 'POLE', v: '230 V' }, { x: 1360, n: 'METER', v: '230 V' }, { x: 1490, n: 'HOME', v: '230 V' }];
const SEG = [ // [path, voltage class (2 high, 1 mid, 0 low), step index when it lights]
  ['M190 300 H330', 1, 1], ['M430 300 H500 L560 196 H800 L860 300 H930', 2, 2], ['M1030 300 H1170', 1, 4], ['M1230 300 H1330', 0, 5], ['M1390 300 H1460', 0, 6]];
const st = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
const trafo = (x, id) => `<g id="${id}"><rect x="${x - 50}" y="${NY - 50}" width="100" height="100" rx="10" fill="#22272E" stroke="#39404A" stroke-width="2.5"/><circle cx="${x - 12}" cy="${NY}" r="24" ${st} stroke="#8B939E" stroke-width="4"/><circle cx="${x + 12}" cy="${NY}" r="24" ${st} stroke="#8B939E" stroke-width="4"/></g>`;
const towerG = x => `<path d="M${x - 34} ${NY + 60} L${x} 160 L${x + 34} ${NY + 60} M${x - 26} 196 H${x + 26} M${x - 20} 236 H${x + 20} M${x - 14} 274 L${x + 18} 236 M${x + 14} 274 L${x - 18} 236 M${x - 30} 196 V208 M${x + 30} 196 V208" ${st} stroke="#8B939E" stroke-width="4"/>`;
$('#jSvg').innerHTML = `
  <g id="n0"><rect x="96" y="232" width="108" height="118" rx="10" fill="#22272E" stroke="#39404A" stroke-width="2.5"/><rect x="112" y="186" width="22" height="50" fill="#39404A"/><circle cx="150" cy="300" r="28" ${st} stroke="#8B939E" stroke-width="4"/><text x="150" y="309" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="26" fill="#8B939E">G</text></g>
  ${trafo(380, 'n1')}
  <g id="n2">${towerG(560)}${towerG(800)}</g>
  <g id="n3"><rect x="930" y="244" width="100" height="112" rx="10" fill="#22272E" stroke="#39404A" stroke-width="2.5"/><circle cx="968" cy="300" r="18" ${st} stroke="#8B939E" stroke-width="4"/><circle cx="992" cy="300" r="18" ${st} stroke="#8B939E" stroke-width="4"/><path d="M930 270 H1030 M930 330 H1030" stroke="#39404A" stroke-width="2"/></g>
  <g id="n4"><path d="M1200 186 V390" stroke="#8B939E" stroke-width="6" stroke-linecap="round"/><path d="M1176 200 H1224" stroke="#8B939E" stroke-width="4" stroke-linecap="round"/><rect x="1172" y="250" width="56" height="70" rx="8" fill="#22272E" stroke="#8B939E" stroke-width="4"/></g>
  <g id="n5"><rect x="1332" y="252" width="56" height="96" rx="8" fill="#22272E" stroke="#8B939E" stroke-width="4"/><rect id="mDisp" x="1342" y="266" width="36" height="22" rx="3" fill="#2A3038"/><circle cx="1360" cy="318" r="10" ${st} stroke="#8B939E" stroke-width="3"/></g>
  <g id="n6"><path d="M1440 316 V380 H1540 V316 M1426 326 L1490 262 L1554 326" ${st} stroke="#8B939E" stroke-width="4"/><circle id="hGlow" cx="1490" cy="336" r="34" fill="#FFC93C" opacity="0"/><circle id="hBulb" cx="1490" cy="336" r="14" fill="#2A3038" stroke="#8B939E" stroke-width="3"/></g>
  ${SEG.map(([d, c], i) => `<path id="sb${i}" d="${d}" ${st} stroke="#2A3038" stroke-width="${[6, 8, 12][c]}"/><path id="sf${i}" d="${d}" ${st} stroke="${c === 2 ? '#FFC93C' : c === 1 ? '#FFD86E' : '#FFE6A3'}" stroke-width="${[6, 8, 12][c]}" stroke-dasharray="${c === 2 ? '22 18' : '14 18'}"/>`).join('')}
  <path id="sMark" d="M520 172 L560 140 L600 172" ${st} stroke="#FFC93C" stroke-width="4" opacity="0"/>`;
$('#jLab').innerHTML = NODES.map((n, i) => `<div class="jn" id="jn${i}" style="left:${n.x - 90}px;top:${i === 2 ? 404 : 404}px">${n.n}</div><div class="jv" id="jvv${i}" style="left:${n.x - 90}px;top:436px">${n.v}</div>`).join('');
const JSTEP = [['zap', 'Follow the power'], ['zap', 'The generator makes it'], ['trendUp', 'Step up for the long trip'], ['tower', 'Towers carry it far'], ['trendDown', 'Substation steps it down'], ['trafo', 'Pole transformer: safe level'], ['bulb', 'Meter, switch, light']];
const JV = [null, 11000, 400000, 400000, 33000, 230, 230];

// W: two runs
const wCard = (k, V) => {
  const I = 100000 / V, L = I * I * 1;
  return `<div class="lbl" style="left:40px;top:30px">SEND 100 kW · LINE 1 Ω</div><div class="wide wh" id="wh${k}">${V === 1000 ? '1,000' : '10,000'} V</div>
  <svg class="wsvg" id="ws${k}" width="704" height="170">
    <rect x="0" y="40" width="120" height="90" rx="10" fill="#22272E" stroke="#39404A" stroke-width="2.5"/><text x="60" y="94" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="#F4F5F7">SOURCE</text>
    <rect x="584" y="40" width="120" height="90" rx="10" fill="#22272E" stroke="#39404A" stroke-width="2.5"/><text x="644" y="94" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="#F4F5F7">LOAD</text>
    <path id="wwB${k}" d="M120 85 H584" stroke="#2A3038" stroke-width="${V === 1000 ? 16 : 8}" stroke-linecap="round"/>
    <path id="wwH${k}" d="M120 85 H584" stroke="#FF6B5A" stroke-width="${V === 1000 ? 16 : 8}" stroke-linecap="round" opacity="0"/>
    <path id="wwF${k}" d="M130 85 H574" stroke="#FFC93C" stroke-width="${V === 1000 ? 8 : 4}" stroke-linecap="round" stroke-dasharray="${V === 1000 ? '16 14' : '10 30'}"/>
  </svg>
  <div class="wrow" id="wr${k}0" style="top:276px"><div class="k">CURRENT  I = P / V</div><div class="v" id="wv${k}0">${I} A</div></div>
  <div class="wrow" id="wr${k}1" style="top:356px"><div class="k">LOSS  I² × R</div><div class="v" id="wv${k}1">${inr(L)} W</div></div>
  <div class="wbar" id="wb${k}"><i id="wbi${k}"></i></div>
  <div class="pill wpl" id="wp${k}"><span class="wpi"></span><span class="wpt"></span></div>`;
};
$('#wLIn').innerHTML = wCard('L', 1000); $('#wRIn').innerHTML = wCard('R', 10000);
['#wLIn', '#wRIn'].forEach(q => $(q).style.cssText = 'left:0;top:0;width:784px;height:580px');

// V: the live AC wave. Plot x 80..960 = 0..40 ms, centre y 320, 325 V -> 170 px.
const VX0 = 80, VX1 = 960, VY = 320, VA = 170, VP = 325.27;
const yOf = v => VY - v / VP * VA;
let wpath = ''; for (let i = 0; i <= 400; i++) { const ms = 40 * i / 400, v = VP * Math.sin(2 * Math.PI * 50 * ms / 1000); wpath += (i ? ' L' : 'M') + (VX0 + (VX1 - VX0) * i / 400).toFixed(1) + ' ' + yOf(v).toFixed(1); }
$('#vSvg').innerHTML = `
  <path d="M${VX0} ${VY} H${VX1}" stroke="#39404A" stroke-width="2"/><path d="M${VX0} 96 V${VY + VA + 30}" stroke="#39404A" stroke-width="2"/>
  <path id="vPk" d="M${VX0} ${yOf(VP)} H${VX1} M${VX0} ${yOf(-VP)} H${VX1}" stroke="#8B939E" stroke-width="2" stroke-dasharray="6 8" opacity="0"/>
  <path id="vRm" d="M${VX0} ${yOf(230)} H${VX1}" stroke="#6EA8FF" stroke-width="2.5" stroke-dasharray="10 8" opacity="0"/>
  <text id="vPkT" x="${VX0 - 12}" y="${yOf(VP) + 7}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#8B939E" opacity="0">+325</text>
  <text id="vRmT" x="${VX1}" y="${yOf(230) - 12}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="#6EA8FF" opacity="0">230 V RMS</text>
  <text x="${VX0 - 12}" y="${VY + 7}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#8B939E">0</text>
  <text x="${(VX0 + VX1) / 2}" y="${VY + VA + 58}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#8B939E">20 ms</text>
  <text x="${VX1}" y="${VY + VA + 58}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="18" fill="#8B939E">40 ms</text>
  <path id="vWave" d="${wpath}" fill="none" stroke="#FFC93C" stroke-width="5" stroke-linejoin="round"/>
  <circle id="vDot" r="11" fill="#FFC93C" stroke="#121417" stroke-width="4" opacity="0"/>
  <text id="vRead" x="${VX1}" y="64" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="40" fill="#F4F5F7" opacity="0">0 V</text>
  <text id="vSlow" x="${VX1}" y="96" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="16" letter-spacing="2" fill="#8B939E" opacity="0">SHOWN SLOWED DOWN</text>`;

// K: at work today
const KA = [
  ['zap', 'Make', 'Turn energy into electricity', 'A far-away station feeds Suryagaon', 'factory', 'A control room keeps every generator in step'],
  ['tower', 'Move', 'Carry it far, at high voltage', 'Tall towers cross the fields near the village', 'grid', "Since 2013, India's grids run as one, at 50 Hz"],
  ['trafo', 'Step down', 'Bring it to a safe level', "The pole transformer near Meera's house", 'hospital', 'A big hospital has its own transformer'],
  ['plug', 'Use', 'Light, heat and motion', 'Lights, fans and the farm pumps', 'train', 'A metro railway runs every train on electricity'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['ELECTRICITY TODAY', 'Four steps', 'From a power station to your switch', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="wide pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:310px"><i style="${FACE('meera')}"></i><div class="kl">IN SURYAGAON</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:430px"><i>${M.icon(a[4], 34, C.yel, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A VILLAGE TO A CITY</div><div class="pe"><i>${M.icon('zap', 34, C.yel, 2.2)}</i><span>Same chain, every home in India</span></div>`) + `</div>`).join('');

// X: human side
const XG = [['bulb', 'Light to study'], ['droplet', 'Water for fields']];
const XH = [['trendDown', 'Wires waste some'], ['alert', 'A live wire can kill']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px;background:${C.yelD};color:${C.yel2}">${M.icon(ic, 22, C.yel, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px;background:${C.redD};color:#FFB3A8">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#8B939E" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#8B939E" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="4" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#2A3038" stroke="#8B939E" stroke-width="3"/>`;
$('#panL').innerHTML = pan(C.yel, 'L'); $('#panR').innerHTML = pan(C.red, 'R');
$('#bb2I').innerHTML = M.icon('shield', 22, '#121417', 2.6); $('#factI').innerHTML = M.icon('mountain', 34, C.yel, 2.2);
$('#bothI').innerHTML = M.icon('shield', 52, '#121417', 2.4);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz + recap
const OPTS = ['To make it<br>flow faster', 'To cut the loss<br>in the wires', 'To make bulbs<br>brighter', 'To make wires<br>safe to touch'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot">${o}</div><div class="ok">${M.icon('check', 30, C.yel, 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('zap', 44, '#121417', 2.4);
const ROWS = [['zap', 'Make it, move it, use it', ['Make', 'Move', 'Use']], ['tower', 'Step up to travel, down for home', ['Up', 'Down']], ['plug', 'At home: AC at 230 V', ['230 V', '50 Hz']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.yel, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.yel, 2.4);

/* ---------- measure ---------- */
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '112px';
  let fs = 112; if (ti.offsetWidth > 1560) fs = Math.floor(112 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 54 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36, y0 = 84; for (let i = 0; i < 4; i++) { const p = $('#bb' + i + 'x'); if (i === 2) x = 36; p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(76 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  const qq = $('#qq1'); if (qq.offsetWidth > 1400) qq.style.fontSize = Math.floor(62 * 1400 / qq.offsetWidth) + 'px';
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es.toFixed(4)})` : `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  const exOn = t < tT ? [tJ[1] - 0.1, tWout] : [1e9, 1e9];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });
  const o = { outDur: 0.3, ody: -16 };

  /* ===== H: the power cut ===== */
  const hOn = t >= tMorph - 0.1 && t < tC1 + 0.2; M.hide($('#sH'), !hOn);
  if (hOn) {
    M.vis($('#hI'), t, tMorph + 0.18, tHout, { dx: -60, dy: 0, ...o });
    M.vis($('#hPl'), t, tMorph + 0.4, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#hS'), t, tMorph + 0.3, tHout, { dy: 36, ...o });
    HS.forEach(([ic], i) => {
      const el = $('#hs' + i), ta = tMorph + 0.5 + i * 0.08, off = M.io((t - (tMorph + 1.0 + i * 0.35)) / 0.25);
      M.vis(el, t, ta, 1e9, { dy: 16 });
      setIco(el.querySelector('.zi'), ic, off > 0.5 ? C.dim : C.yel, 48, 2.2);
      const zt = el.querySelector('.zt'); M.setT(zt, off > 0.5 ? 'OFF' : 'ON'); zt.style.color = off > 0.5 ? C.red : C.yel;
      el.style.background = mix(C.panel2, C.redD, off);
    });
    M.vis($('#hQ'), t, tMorph + 0.42, tHout, { dy: 36, ...o });
    M.vis($('#hqA'), t, tWhere - 0.4, 1e9, { ...POP, sc: 0.5 });
    M.rise($('#hqT'), t, tWhere - 0.1, { st: 0.06, sp: M.HEAVY }); M.rise($('#hqT2'), t, tWhere + 0.25, { st: 0.06, sp: M.HEAVY });
  }

  /* ===== C: meet the cast ===== */
  const cOn = t >= tC1 - 0.1 && t < tD1 + 0.2; M.hide($('#sC'), !cOn);
  if (cOn) {
    const ci = $('#cI'); M.vis(ci, t, tC1 + 0.1, tCout, { dy: 36, ...o }); grow(ci, $('#cIOut'), t, tC2);
    M.vis($('#cImg'), t, tC1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgM'), t, wt('C1', 'Meera') - 0.05, tC2 - 0.3, { ...POP, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#cP'), t, tC2 + 0.12, tCout, { dx: 60, dy: 0, ...o });
    M.vis($('#pr0'), t, tPw - 0.1, 1e9, { dy: 16 }); M.vis($('#pr1'), t, tPu - 0.1, 1e9, { dy: 16 });
    M.vis($('#cT'), t, tC3 + 0.05, tCout, { dy: 36, ...o });
    const tTv = [tC3 + 0.3, tSh - 0.05, tFa - 0.05, tC3 + 0.42];
    TEAM.forEach((_, i) => {
      M.vis($('#tv' + i), t, tTv[i], 1e9, { ...POP, sc: 0.5 });
      M.vis($('#tn' + i), t, tTv[i] + 0.08, 1e9, { dy: 10 }); M.vis($('#tr' + i), t, tTv[i] + 0.14, 1e9, { dy: 8 });
      const on = i === 1 ? M.io((t - tSh) / 0.25) * (1 - M.io((t - tFa) / 0.25)) : i === 2 ? M.io((t - tFa) / 0.25) : 0;
      $('#tv' + i).style.boxShadow = '0 0 0 4px ' + mix(C.line, C.yel, on);
    });
  }

  /* ===== D: what is electrical engineering ===== */
  const dOn = t >= tD1 - 0.1 && t < tJ[0] + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const dd = $('#dD'); M.vis(dd, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(dd, $('#dDOut'), t, tD3);
    for (let i = 0; i < 4; i++) M.vis($('#dl' + i), t, tD2 + 0.2 + i * 0.1, 1e9, { dy: 14 });
    tDk.forEach((tk, i) => { $('#dk' + i).style.color = mix(C.white, C.yel, M.io((t - tk + 0.05) / 0.3)); });
    M.vis($('#dHr'), t, tDk[2] + 0.3, 1e9, { dy: 0 }); M.vis($('#dSrc'), t, tDk[2] + 0.4, 1e9, { dy: 10 });
    M.vis($('#dM'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    MM.forEach(([ic], i) => {
      const el = $('#mm' + i), ta = tD3 + 0.4 + i * 0.3; M.vis(el, t, ta - 0.15, 1e9, POP);
      const on = M.io((t - ta) / 0.25);
      el.style.background = mix(C.panel2, C.yel, on); el.querySelector('.zt').style.color = mix(C.white, '#121417', on); el.querySelector('.zn').style.color = mix(C.muted, '#3A3220', on);
      setIco(el.querySelector('.zi'), ic, on > 0.5 ? '#121417' : C.yel, 48, 2.2);
    });
    M.vis($('#dB'), t, tD3 + 0.25, tDout, { dy: 36, ...o });
    BB.forEach(([ic], i) => { const el = $('#bb' + i + 'x'); M.vis(el, t, tDb[i] - 0.08, 1e9, POP); setIco(el.firstChild, ic, C.yel, 26, 2.2); });
  }

  /* ===== J: the journey of power ===== */
  const jOn = t >= tJ[0] - 0.1 && t < tW[0] + 0.2; M.hide($('#sJ'), !jOn);
  if (jOn) {
    M.vis($('#jC'), t, tJ[0] + 0.1, tJout, { dy: 36, ...o });
    let step = 0; for (let i = 0; i < 7; i++) if (t >= tJ[i] - 0.05) step = i;
    const tS5b = tEleven - 0.05;
    NODES.forEach((n, i) => {
      const nodeT = i === 0 ? tJ[1] : i === 1 ? tJ[2] : i === 2 ? tJ[3] : i === 3 ? tJ[4] : i === 4 ? tJ[5] : i === 5 ? tMeter : tSwitch;
      const g = $('#n' + i); g.style.opacity = M.clamp((t - tJ[0] - 0.4 - i * 0.08) / 0.15).toFixed(3);
      const act = M.io((t - nodeT + 0.1) / 0.25), done = act;
      g.querySelectorAll('circle,path,rect').forEach(el => { if (el.id === 'hGlow' || el.id === 'mDisp') return; if (el.getAttribute('stroke') && el.getAttribute('stroke') !== '#39404A') attr(el, 'stroke', done > 0.5 ? C.yel : '#8B939E'); });
      M.vis($('#jn' + i), t, tJ[0] + 0.5 + i * 0.08, 1e9, { dy: 10 });
      const jv = $('#jvv' + i); M.vis(jv, t, nodeT, 1e9, { dy: 10 }); jv.style.color = i === 3 ? (t > tS5b ? C.yel2 : C.white) : C.white;
      if (i === 3) M.setT(jv, t > tS5b ? '33 kV > 11 kV' : '33,000 V');
    });
    SEG.forEach(([, c, s], i) => {
      const ton = i === 0 ? tJ[1] + 0.3 : i === 1 ? tJ[3] - 0.1 : i === 2 ? tJ[4] + 0.2 : i === 3 ? tMeter - 0.2 : tSwitch - 0.1;
      const f = $('#sf' + i), u = M.clamp((t - ton) / 0.5);
      f.style.opacity = u.toFixed(3); M.hide(f, u <= 0);
      f.style.strokeDashoffset = (-(t * (c === 2 ? 140 : 90)) % 400).toFixed(1);
    });
    $('#sMark').setAttribute('opacity', '0');
    const glow = M.io((t - tGlow) / 0.3);
    attr($('#hGlow'), 'opacity', (0.35 * glow).toFixed(3)); attr($('#hBulb'), 'fill', mix('#2A3038', C.yel, glow));
    attr($('#mDisp'), 'fill', t > tMeter ? C.yelD : '#2A3038');
    const vNow = t < tJ[1] ? 0 : t < tJ[2] ? 11000 : t < tJ[4] ? 400000 : t < tS5b ? 33000 : t < tJ[5] ? 11000 : 230;
    M.setT($('#jV'), t < tJ[1] ? '...' : inr(vNow) + ' V');
    M.vis($('#jV'), t, tJ[0] + 0.5, 1e9, { dy: 10 }); M.vis($('#jVl'), t, tJ[0] + 0.6, 1e9, { dy: 8 });
    const sp = $('#jStep'); M.vis(sp, t, tJ[0] + 0.6, 1e9, POP);
    setIco($('#jStepI'), JSTEP[step][0], C.yel, 26, 2.4); M.setT($('#jStepT'), (step ? `0${step} · ` : '') + JSTEP[step][1]);
    sp.style.borderColor = step === 6 && t > tGlow ? C.yel : C.line;
  }

  /* ===== W: why high voltage ===== */
  const wOn = t >= tW[0] - 0.1 && t < tT + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wL'), t, tW[0] + 0.1, tWout, { dx: -60, dy: 0, ...o });
    M.vis($('#wR'), t, tW[0] + 0.25, tWout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const isL = k === 'L', tGo = isL ? tW3a : tW4a, tRes = isL ? tW3b : tW4b;
      M.vis($('#wh' + k), t, tW[0] + 0.4, 1e9, { dy: 10 });
      M.vis($('#ws' + k), t, tW[1] - 0.1, 1e9, { dy: 16 });
      const run = M.clamp((t - tGo + 0.1) / 0.3), f = $('#wwF' + k);
      f.style.opacity = run.toFixed(3); f.style.strokeDashoffset = (-(t * (isL ? 260 : 40)) % 600).toFixed(1);
      const heat = M.io((t - tRes) / 0.6) * (isL ? 0.85 : 0.08);
      attr($('#wwH' + k), 'opacity', heat.toFixed(3));
      M.vis($('#wr' + k + '0'), t, tGo - 0.1, 1e9, { dy: 14 });
      M.vis($('#wr' + k + '1'), t, tRes - 0.1, 1e9, { dy: 14 });
      const sq = M.io((t - tSq + 0.1) / 0.3);
      $('#wr' + k + '1').style.background = mix(C.panel2, C.yelD, sq);
      $('#wv' + k + '1').style.color = isL ? C.red : C.yel;
      M.vis($('#wb' + k), t, tRes - 0.05, 1e9, { dy: 10 });
      const bi = $('#wbi' + k), bw = 704 * (isL ? 1 : 0.01) * M.o3((t - tRes) / 0.7);
      bi.style.width = Math.max(isL ? 0 : 8 * M.clamp((t - tRes) / 0.3), bw).toFixed(1) + 'px'; bi.style.background = isL ? C.red : C.yel;
      const wp = $('#wp' + k); M.vis(wp, t, tRes + 0.4, 1e9, POP);
      const fin = !isL && t > tW5b;
      setIco(wp.querySelector('.wpi'), isL ? 'flame' in M.IC ? 'flame' : 'alert' : (fin ? 'check' : 'zap'), fin ? '#121417' : (isL ? C.red : C.yel), 24, 2.4);
      M.setT(wp.querySelector('.wpt'), isL ? '10% of the power wasted' : (fin ? '100 times less waste' : '0.1% of the power wasted'));
      wp.style.background = fin ? C.yel : C.panel2; wp.style.color = fin ? '#121417' : C.white;
    }
  }

  /* ===== statement sweep ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== V: alternating current ===== */
  const vOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.vis($('#vW'), t, tV1 + 0.02, tVout, { dy: 36, ...o });
    M.draw($('#vWave'), t, tV1 + 0.4, 2.2, M.io);
    const dOn2 = t > tV1 + 2.6, ph = (t - tV1 - 2.6) * 0.5; // slowed: one swing every 2 s
    const frac = ((ph % 2) + 2) % 2 / 2, x = VX0 + (VX1 - VX0) * frac, ms = 40 * frac, v = VP * Math.sin(2 * Math.PI * 50 * ms / 1000);
    const dot = $('#vDot'); attr(dot, 'opacity', dOn2 ? '1' : '0'); attr(dot, 'cx', x.toFixed(1)); attr(dot, 'cy', yOf(v).toFixed(1));
    const rd = $('#vRead'); attr(rd, 'opacity', dOn2 ? '1' : '0'); M.setT(rd, `${v >= 0 ? '+' : '-'}${Math.abs(Math.round(v))} V`);
    attr($('#vSlow'), 'opacity', dOn2 ? '1' : '0');
    const pk = M.clamp((t - tPeak) / 0.3), rm = M.clamp((t - tRms) / 0.3);
    attr($('#vPk'), 'opacity', pk.toFixed(3)); attr($('#vPkT'), 'opacity', pk.toFixed(3));
    attr($('#vRm'), 'opacity', rm.toFixed(3)); attr($('#vRmT'), 'opacity', rm.toFixed(3));
    M.vis($('#vF'), t, tV2 + 0.12, tVout, { dx: 60, dy: 0, ...o });
    const n = Math.min(50, Math.floor(50 * M.clamp((t - tFifty) / 1.0)));
    M.setT($('#vFn'), t > tHz ? '50 Hz' : String(n)); $('#vFn').style.color = t > tHz ? C.yel : C.white;
    M.setT($('#vFs'), t > tHz ? '50 swings every second' : 'swings in one second');
    M.vis($('#vFn'), t, tV2 + 0.3, 1e9, { dy: 10 }); M.vis($('#vFs'), t, tV2 + 0.4, 1e9, { dy: 8 });
    M.vis($('#vR'), t, tV3 + 0.12, tVout, { dy: 36, ...o });
    const b0 = $('#vRb0'), b1 = $('#vRb1');
    M.vis(b0, t, tRms - 0.05, 1e9, { dx: -20, dy: 0 }); M.vis(b1, t, tPeak - 0.05, 1e9, { dx: -20, dy: 0 });
    snap(b0, (200 + (345 - 200) * M.o3((t - tRms) / 0.5)).toFixed(0) + 'px', 'width'); snap(b1, (200 + (488 - 200) * M.o3((t - tPeak) / 0.5)).toFixed(0) + 'px', 'width');
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.panel2, C.yel, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix(C.white, '#121417', act);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.yel, '#121417', act);
      el.querySelector('.ri').style.background = mix(C.panel3, '#E6B02E', act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? '#121417' : C.yel), 28, 2.2);
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
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X: the human side ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, POP); M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, POP);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 }); M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#xr0'), t, tKit - 0.1, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr1'), t, tShX - 0.1, 1e9, { dx: 24, dy: 0 }); M.vis($('#xr2'), t, tOnly - 0.1, 1e9, { dx: 24, dy: 0 });
    const no = t > tShX; $('#bb0').style.background = no ? C.redD : C.panel2; $('#bb0').style.color = no ? '#FFB3A8' : C.white;
    M.vis($('#fact'), t, tFact - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'very') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((_, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 1.5 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAns) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.panel, C.yel, r) : mix(C.panel, '#16191D', r);
      bg.style.borderColor = right ? mix(C.panel3, C.yel, r) : C.panel3;
      el.querySelector('.ot').style.color = right ? mix(C.white, '#121417', r) : mix(C.white, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.panel2, '#121417', r) : C.panel2; lt.style.color = right ? mix(C.white, C.yel, r) : mix(C.white, C.dim, r);
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
        el.style.background = mix(mix(C.panel2, C.yel, g), C.panel3, d);
        el.style.color = g > 0.5 && d < 0.5 ? '#121417' : C.white;
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
M.outro({ bg: '#121417', ink: '#F4F5F7', accent: '#FFC93C', sub: 'rgba(244,245,247,.7)', font: 'Archivo' });
})();
