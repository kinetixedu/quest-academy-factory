// Civil Engineering, Ep 01: Introduction to Civil Engineering and Its Branches (The New School at Hosahalli)
// Series reference: engg-civil world port of the v2 components (title travel, plate cards, grow(), list + panes,
// balance scale, blueprint-sheet sweeps, quiz, recap, NEXT strip). Later episodes copy these helpers as they are.
(() => {
const { $ } = M;
const C = { onacc: '#1C1F23', acct: '#9A6F00', bp: '#E4E4DF', grid: '#D2D2CB', panel: '#F6F6F3', row: '#ECECE7', line: '#CBCCC5', white: '#1C1F23', soft: '#5D6269', dim: '#9EA2A6', yel: '#FFC20E', con: '#B3B6B9', plate: '#FFFFFF', deep: '#D5D5CF' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix, PI = Math.PI;
const NS = 'http://www.w3.org/2000/svg';
const f = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
const el = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; };
const IMG = '../../assets/illustrations/engg-civil/';
const FACE = n => `background-image:url(${IMG}eciv-${n}-face.jpg)`;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  frame: ['M3 21h18', 'M5 21V7', 'M19 21V7', 'M12 21V7', 'M3 7h18', 'M3 14h18'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12', 'm2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17'],
  road: ['M4 21 8 3', 'M20 21 16 3', 'M12 4v2', 'M12 10v3', 'M12 17v3'],
  drop: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  waves: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
  tripod: ['M9 3h6v4H9z', 'M12 7 6 21', 'M12 7l6 14', 'M12 7v14'],
  gantt: ['M3 3v18h18', 'M7 7h6', 'M9 12h8', 'M13 17h6'],
  hospital: ['M4 22V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16', 'M2 22h20', 'M12 8v6', 'M9 11h6', 'M10 22v-4h4v4'],
  train: ['M8 3h8a4 4 0 0 1 4 4v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a4 4 0 0 1 4-4z', 'M4 11h16', 'M12 3v8', 'm8 19-2 3', 'm18 22-2-3', 'M8 15h.01', 'M16 15h.01'],
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M9 18h5', 'M16 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  rain: ['M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2', 'M16 14v6', 'M8 14v6', 'M12 16v6'],
  rock: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  city: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  pencil: ['M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z', 'm15 5 4 4'],
  hammer: ['m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9', 'm18 15 4-4', 'm21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  cake: ['M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8', 'M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1', 'M2 21h20', 'M7 8v3', 'M12 8v3', 'M17 8v3', 'M7 4h.01', 'M12 4h.01', 'M17 4h.01'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tLeaks = wt('H1', 'leaks'), tCrack = wt('H2', 'crack'), tDoor = wt('H2', 'door');
const tC2 = T0('C2'), tLak = wt('C2', 'Lakshmi'), tSafe = wt('C2', 'safe');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tNewS = wt('L1', 'new'), tTwo = wt('L1', 'Two'), tSix = wt('L1', 'six'), tChil = wt('L1', 'children');
const tAna = wt('L2', 'Ananya'), tFirst = wt('L2', 'first');
const tRag = wt('L3', 'Raghu'), tFar = wt('L3', 'Farhan'), tDes = wt('L3', 'Deshpande');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M0') - 0.32;
const tHl = [wt('D3', 'directing'), wt('D3', 'power'), wt('D3', 'use')];
const tNat = [wt('D4', 'gravity'), wt('D4', 'rain'), wt('D4', 'rivers'), wt('D4', 'rock')];
const tSw = [wt('D5', 'plan'), wt('D5', 'build'), wt('D5', 'care')];
// M: the build-up
const tM0 = T0('M0'), tM = [1, 2, 3, 4, 5, 6].map(i => T0('M' + i)), tMout = T0('T1') - 0.32;
const tPeg = wt('M1', 'pegs'), tLev = wt('M1', 'levels'), tMeas = wt('M1', 'measures');
const tBore = wt('M2', 'borehole'), tLay = wt('M2', 'layers'), tFoot = wt('M2', 'footing');
const tCol = wt('M3', 'Columns'), tBeams = wt('M3', 'beams'), tSlab = wt('M3', 'slabs'), tLoad = wt('M3', 'load'), tDown = wt('M3', 'down'), tFoot3 = wt('M3', 'footing');
const tTank = wt('M4', 'tank'), tPipe = wt('M4', 'clean'), tDrain = wt('M4', 'drains');
const tRoad = wt('M5', 'road'), tBay = wt('M5', 'bay'), tBus = wt('M5', 'bus');
const tSched = wt('M6', 'schedule'), tWho = wt('M6', 'Who'), tOrder = wt('M6', 'order');
// statement + branches
const tT = T0('T1'), tSt2 = wt('T1', 'Civil'), tSt3 = wt('T1', 'plan');
const tB0 = T0('B0'), tTb = tB0 - 0.32, tB = [1, 2, 3, 4, 5, 6, 7].map(i => T0('B' + i)), tB8 = T0('B8'), tBout = T0('K0') - 0.32;
// K: at work today
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'city'), wt('K2', 'metro'), wt('K3', 'city'), wt('K4', 'highway')];
// X: human side
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'homes'), wt('X2', 'water'), wt('X2', 'roads')], tXh = [wt('X3', 'cost'), wt('X3', 'late'), wt('X3', 'failures')];
const tRagX = wt('X4', 'Raghu'), tAnaX = wt('X4', 'Ananya'), tDesX = wt('X5', 'Deshpande'), tSave = wt('X5', 'save');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'share')], [wt('S3', 'structures'), wt('S3', 'water')], [wt('S4', 'Check'), wt('S4', 'build')]];
// blueprint sheets: [in, out]; out = 1e9 keeps the sheet
const SW = { S: [tT - 0.42, tTb], A: [tQ - 0.42, 1e9], B: [tS - 0.42, 1e9] };

/* ---------- build ---------- */
// blueprint sheet: blue + grid + double border + title block (the world transition)
const sheetSVG = (svg, title, dwg, no, note) => {
  svg.innerHTML = `<g class="sg"><rect width="1920" height="1080" fill="#E4E4DF"/><rect width="1920" height="1080" fill="url(#g40)"/>
    <rect class="shB" x="40" y="40" width="1840" height="1000" fill="none" stroke="#1C1F23" stroke-width="4"/>
    <rect x="56" y="56" width="1808" height="968" fill="none" stroke="#1C1F23" stroke-width="1.5"/>
    <g stroke="#1C1F23" stroke-width="2" fill="none"><rect x="1504" y="880" width="360" height="144" fill="#F6F6F3"/><line x1="1504" y1="932" x2="1864" y2="932"/><line x1="1504" y1="978" x2="1864" y2="978"/><line x1="1684" y1="932" x2="1684" y2="1024"/></g>
    <text x="1522" y="916" font-family="Archivo" font-weight="700" font-size="26" fill="#1C1F23" letter-spacing="1">${title}</text>
    <text x="1522" y="962" font-family="IBM Plex Mono" font-size="18" fill="#5D6269">${dwg}</text>
    <text x="1702" y="962" font-family="IBM Plex Mono" font-size="18" fill="#5D6269">${no}</text>
    <text x="1522" y="1008" font-family="IBM Plex Mono" font-size="18" fill="#5D6269">HOSAHALLI SCHOOL</text>
    <text x="1702" y="1008" font-family="Architects Daughter" font-size="22" fill="#9A6F00">${note}</text></g>`;
};
sheetSVG($('#sheetS'), 'THE BIG IDEA', 'DWG CE-01', 'SHEET 1/3', 'noted');
sheetSVG($('#sheetA'), 'QUICK CHECK', 'DWG CE-01', 'SHEET 2/3', 'checked');
sheetSVG($('#sheetB'), 'RECAP', 'DWG CE-01', 'SHEET 3/3', 'approved');

// A: the old block elevation (rain, drip, crack)
const oe = $('#oeS');
oe.innerHTML = `<defs><clipPath id="skyC"><path d="M0 0H380V76H320L160 22L20 76H0Z"/></clipPath></defs>
  <g id="rainG" clip-path="url(#skyC)"></g>
  <path id="oeRoof" d="M16 76 L160 22 L324 76" fill="none" stroke="#1C1F23" stroke-width="3" stroke-linejoin="round"/>
  <rect id="oeWall" x="40" y="76" width="260" height="128" fill="#F6F6F3" stroke="#1C1F23" stroke-width="3"/>
  <rect id="oeDoor" x="120" y="124" width="56" height="80" fill="#E4E4DF" stroke="#1C1F23" stroke-width="2.5"/>
  <rect id="oeWin" x="216" y="112" width="52" height="44" fill="#E4E4DF" stroke="#1C1F23" stroke-width="2.5"/>
  <path id="oeCrack" d="M180 120 L190 110 L186 102 L198 92 L196 84 L210 78" fill="none" stroke="#9A6F00" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="oeBkt" d="M78 186 h28 l-4 18 h-20 Z" fill="none" stroke="#5D6269" stroke-width="2.5"/>
  <circle id="oeDrip" cx="92" cy="80" r="4" fill="#5D6269"/>
  <line x1="0" y1="204" x2="380" y2="204" stroke="#1C1F23" stroke-width="3"/>
  <path d="${Array.from({ length: 23 }, (_, k) => `M${8 + k * 16} 208 l-10 12`).join(' ')}" stroke="#5D6269" stroke-width="2" fill="none"/>`;
$('#rainG').innerHTML = Array.from({ length: 12 }, (_, k) => `<line class="rd" x1="0" y1="0" x2="-6" y2="16" stroke="#5D6269" stroke-width="2.5" stroke-linecap="round"/>`).join('');
$('#pr0I').innerHTML = M.icon('rain', 30, C.acct, 2.2); $('#pr1I').innerHTML = M.icon('alert', 30, C.acct, 2.2);
$('#lqA').style.cssText += ';' + FACE('lakshmi');

// L: the brief, Ananya, the team
$('#br0I').innerHTML = M.icon('home', 26, C.acct, 2.4); $('#br1I').innerHTML = M.icon('layers', 26, C.acct, 2.4); $('#br2I').innerHTML = M.icon('pin', 26, C.acct, 2.4);
$('#anaPI').innerHTML = M.icon('hardhat' in M.IC ? 'hardhat' : 'shield', 24, C.bp, 2.4);
const TEAM = [['raghu', 'Raghu', 'HEAD MASON'], ['farhan', 'Farhan', 'SURVEYOR'], ['deshpande', 'Prof. Deshpande', 'CHECKER'], ['lakshmi', 'Mrs. Lakshmi', 'CLIENT']];
$('#tRow').innerHTML = TEAM.map(([fc, n, r], i) => { const cx = 124 + i * 178; return `<div class="av tav" id="tv${i}" style="left:${cx - 36}px;${FACE(fc)}"></div><div class="tnm" id="tn${i}" style="left:${cx - 88}px">${n}</div><div class="trl" id="tr${i}" style="left:${cx - 88}px">${r}</div>`; }).join('');
// name pills on the plot scene (beside figures, never on faces)
const TAGS = [['Farhan', 230, 512], ['Ananya', 450, 456], ['Raghu', 586, 512]];
$('#illIn').insertAdjacentHTML('beforeend', TAGS.map(([n], i) => `<div class="pill y" id="tg${i}" style="height:40px;padding:0 16px;font-size:20px">${n}</div>`).join(''));

// D: charter + nature + simple words
const NAT = [['arrowD', 'GRAVITY'], ['rain', 'RAIN'], ['waves', 'RIVERS'], ['rock', 'ROCK']];
$('#natRow').innerHTML = NAT.map(([ic, n], i) => `<div class="zs" id="nt${i}" style="left:${36 + i * 182}px;width:166px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${['Pulls down', 'Falls hard', 'Flow, flood', 'Holds, cracks'][i]}</div></div>`).join('');
const SWT = [['pencil', 'STEP 1', 'Plan it'], ['hammer', 'STEP 2', 'Build it'], ['wrench', 'STEP 3', 'Care for it']];
$('#swRow').innerHTML = SWT.map(([ic, n, t], i) => `<div class="zs" id="sw${i}" style="left:${36 + i * 243}px;width:226px"><div class="zn">${n}</div><div class="zi"></div><div class="zt">${t}</div></div>`).join('');

/* M: one drawing, built branch by branch (section through the new school) */
const PS = [['tripod', 'Surveying'], ['layers', 'Geotechnical'], ['frame', 'Structural'], ['drop', 'Water and Environmental'], ['bus', 'Transportation'], ['gantt', 'Construction Management']];
$('#plRows').innerHTML = PS.map(([ic, t], i) => `<div class="sr" id="pr${i}x" style="top:${80 + i * 80}px"><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const S = $('#pdS'), GY = 372, CX = [150, 350, 550], FT = 416, FB = 442, L1 = 262, RF = 152;
S.innerHTML = `<defs>
  <pattern id="pTop" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#D9CFB8"/><circle cx="4" cy="5" r="1.6" fill="#5D6269"/><circle cx="12" cy="12" r="1.6" fill="#5D6269"/></pattern>
  <pattern id="pClay" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#F6F6F3"/><path d="M-2 16 L16 -2" stroke="#CBCCC5" stroke-width="2"/></pattern>
  <pattern id="pRock" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#BDB8AE"/><path d="M0 20 L20 0 M0 0 L20 20" stroke="#CBCCC5" stroke-width="1.6"/></pattern>
  <clipPath id="soilC"><rect id="soilR" x="32" y="${GY}" width="0" height="190"/></clipPath>
  <clipPath id="pdC"><rect x="2" y="2" width="1052" height="576"/></clipPath>
</defs><g clip-path="url(#pdC)">
  <g id="soilG" clip-path="url(#soilC)">
    <rect x="32" y="${GY}" width="992" height="58" fill="url(#pTop)"/><rect x="32" y="430" width="992" height="70" fill="url(#pClay)"/><rect x="32" y="500" width="992" height="62" fill="url(#pRock)"/>
    <path d="M32 430H1024M32 500H1024" stroke="#5D6269" stroke-width="1.5" stroke-dasharray="8 6"/>
  </g>
  <g id="axG"></g>
  <path id="gl" d="M32 ${GY} H1024" stroke="#1C1F23" stroke-width="3"/>
  <g id="lvl0"><path d="M62 ${GY - 14} h20 l-10 14z" fill="#FFC20E"/><text x="40" y="${GY - 22}" font-family="IBM Plex Mono" font-size="17" fill="#1C1F23">GL +0.00</text></g>
  <g id="lvl1"><path d="M62 ${L1 - 14} h20 l-10 14z" fill="#1C1F23"/><text x="40" y="${L1 - 22}" font-family="IBM Plex Mono" font-size="17" fill="#1C1F23">+3.60</text></g>
  <g id="lvl2"><path d="M62 ${RF - 14} h20 l-10 14z" fill="#1C1F23"/><text x="40" y="${RF - 22}" font-family="IBM Plex Mono" font-size="17" fill="#1C1F23">+7.20</text></g>
  <g id="dimG" stroke="#5D6269" stroke-width="2" fill="none"></g>
  <g id="instG"><line id="sight" x1="686" y1="296" x2="150" y2="282" stroke="#9A6F00" stroke-width="2.5" stroke-dasharray="10 7"/>
    <rect x="146" y="250" width="8" height="122" fill="#1C1F23"/><path d="M146 270h8M146 300h8M146 330h8" stroke="#1C1F23" stroke-width="3"/>
    <path d="M686 304 L660 ${GY} M686 304 L712 ${GY} M686 304 V${GY}" stroke="#1C1F23" stroke-width="3" fill="none"/>
    <rect x="670" y="284" width="32" height="20" fill="#F6F6F3" stroke="#1C1F23" stroke-width="2.5"/></g>
  <g id="pegG"></g>
  <rect id="bore" x="640" y="${GY}" width="18" height="0" fill="#E4E4DF" stroke="#1C1F23" stroke-width="2.5"/>
  <g id="footG"></g>
  <g id="frameG"></g>
  <g id="pipeG"></g>
  <g id="tankG"><rect x="572" y="104" width="62" height="48" fill="#F6F6F3" stroke="#1C1F23" stroke-width="2.5"/><rect id="tankW" x="575" y="149" width="56" height="0" fill="#5D6269"/></g>
  <g id="roadG"></g>
  <g id="busV"><g id="bus"></g></g>
  <g id="loadG"></g>
  <g id="schG"></g>
  <g id="tagG"></g>
</g>`;
// survey: grid axes with bubbles + bay dimensions
$('#axG').innerHTML = CX.map((x, i) => `<path class="ax" d="M${x} 92 V560" stroke="#CBCCC5" stroke-width="2" stroke-dasharray="14 6 3 6" fill="none"/><g class="axb"><circle cx="${x}" cy="76" r="16" fill="#E4E4DF" stroke="#1C1F23" stroke-width="2.5"/><text x="${x}" y="83" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="19" fill="#1C1F23">${'ABC'[i]}</text></g>`).join('');
$('#dimG').innerHTML = [0, 1].map(i => `<path class="dm" d="M${CX[i]} 122 H${CX[i + 1]} M${CX[i] - 8} 130 l16 -16 M${CX[i + 1] - 8} 130 l16 -16"/>`).join('') +
  [0, 1].map(i => `<text class="dmt" x="${(CX[i] + CX[i + 1]) / 2}" y="114" text-anchor="middle" font-family="IBM Plex Mono" font-size="18" fill="#1C1F23" stroke="none">4.0 m</text>`).join('');
$('#pegG').innerHTML = CX.map(x => `<g class="peg" transform="translate(${x} ${GY})"><path d="M-7 -26 h14 l-7 34 z" fill="#FFC20E" stroke="#1C1F23" stroke-width="1.5"/></g>`).join('');
// geotech: footings + size dimension
$('#footG').innerHTML = CX.map(x => `<rect class="ft" x="${x - 48}" y="${FT}" width="96" height="${FB - FT}" fill="#B3B6B9" stroke="#1C1F23" stroke-width="2"/>`).join('') +
  `<g id="ftDim"><path d="M102 456 H198 M94 464 l16 -16 M190 464 l16 -16" stroke="#1C1F23" stroke-width="2" fill="none"/><rect x="104" y="466" width="92" height="26" fill="#E4E4DF"/><text x="150" y="485" text-anchor="middle" font-family="IBM Plex Mono" font-size="17" fill="#1C1F23">1.5 m</text></g>`;
// structural: columns, plinth, slabs + beams
const colEls = CX.map(x => el('rect', { x: x - 10, y: FT, width: 20, height: 0, fill: C.con, stroke: C.white, 'stroke-width': 2 }, $('#frameG')));
const plinth = el('rect', { x: 140, y: GY - 14, width: 420, height: 14, fill: C.con, stroke: C.white, 'stroke-width': 2 }, $('#frameG'));
const slabs = [L1, RF].map(y => { const g = el('g', {}, $('#frameG')); el('rect', { x: 110, y, width: 530, height: 14, fill: C.con, stroke: C.white, 'stroke-width': 2 }, g); [0, 1].forEach(i => el('rect', { x: CX[i] + 10, y: y + 14, width: 180, height: 16, fill: C.con, stroke: C.white, 'stroke-width': 2 }, g)); return g; });
const slabClip = el('clipPath', { id: 'slabC' }, S.querySelector('defs')), slabCR = el('rect', { x: 100, y: 140, width: 0, height: 160 }, slabClip);
slabs.forEach(g => g.setAttribute('clip-path', 'url(#slabC)'));
// load: arrow on the roof + load path (flowing dashes) + pressure bulb under footing B
const LP = [[250, 82], [250, 150], [250, 160], [340, 160], [340, 272], [340, 410], [350, 444], [350, 470]];
$('#loadG').innerHTML = `<g id="ldA"><line x1="250" y1="40" x2="250" y2="122" stroke="#9A6F00" stroke-width="8" stroke-linecap="round"/><path d="M250 150 L234 118 H266 Z" fill="#FFC20E"/></g>
  <path id="ldP" d="" fill="none" stroke="#9A6F00" stroke-width="4" stroke-dasharray="12 9" stroke-linecap="round"/>
  <path id="bulb" d="M298 446 C298 500 402 500 402 446" fill="none" stroke="#9A6F00" stroke-width="3" stroke-dasharray="6 6"/>`;
// water: supply main from the left up to the roof tank, drain from the building to the road sewer
$('#pipeG').innerHTML = `<path id="supB" d="M1024 404 H664 V128 H634" fill="none" stroke="#CBCCC5" stroke-width="9" stroke-linejoin="round"/>
  <path id="supF" d="M1024 404 H664 V128 H634" fill="none" stroke="#1C1F23" stroke-width="3" stroke-dasharray="10 10"/>
  <path id="drB" d="M592 386 L1024 392" fill="none" stroke="#CBCCC5" stroke-width="9"/>
  <path id="drF" d="M592 386 L1024 392" fill="none" stroke="#B3B6B9" stroke-width="3" stroke-dasharray="10 10"/>`;
// transport: road section with camber and kerb, bus stop pole, the bus
$('#roadG').innerHTML = `<path id="rdS" d="M772 ${GY} V356 Q896 346 1024 356 V${GY} Z" fill="#B3B6B9" stroke="#1C1F23" stroke-width="2"/>
  <rect id="kerb" x="756" y="344" width="16" height="28" fill="#B3B6B9" stroke="#1C1F23" stroke-width="2"/>
  <g id="pole"></g>`;
$('#bus').innerHTML = `<rect x="0" y="-66" width="170" height="52" fill="#F6F6F3" stroke="#1C1F23" stroke-width="2.5"/>
  ${[0, 1, 2, 3].map(k => `<rect x="${14 + k * 36}" y="-58" width="28" height="18" fill="#5D6269"/>`).join('')}
  <rect x="152" y="-58" width="12" height="30" fill="#5D6269"/><rect x="0" y="-34" width="170" height="6" fill="#FFC20E"/>
  ${[34, 136].map(x => `<circle cx="${x}" cy="-12" r="12" fill="#E4E4DF" stroke="#1C1F23" stroke-width="2.5"/>`).join('')}`;
// construction management: a bar-chart schedule
const SCH = [['SURVEY', 0, 0.14], ['SOIL', 0.1, 0.28], ['FRAME', 0.28, 0.72], ['WATER', 0.55, 0.86], ['ROAD', 0.7, 1]];
const SX = 850, SWd = 166;
$('#schG').innerHTML = `<rect x="760" y="48" width="272" height="176" fill="#E4E4DF" stroke="#CBCCC5" stroke-width="2"/><text x="776" y="74" font-family="IBM Plex Mono" font-weight="600" font-size="15" letter-spacing="2" fill="#9A6F00">SCHEDULE</text>` +
  SCH.map(([n], i) => `<text x="776" y="${104 + i * 26}" font-family="IBM Plex Mono" font-size="14" fill="#5D6269">${n}</text><rect x="${SX}" y="${92 + i * 26}" width="${SWd}" height="14" fill="#ECECE7"/><rect class="sb" x="${SX}" y="${92 + i * 26}" width="0" height="14" fill="#FFC20E"/>`).join('') +
  `<line id="today" x1="${SX}" y1="86" x2="${SX}" y2="220" stroke="#1C1F23" stroke-width="2"/>`;
// small label tags on the drawing (mono, solid backing)
const TG = [['tgSv', 'LEVELS PEGGED', 560, 236], ['tgBh', 'BOREHOLE', 728, 336], ['tgL1', 'topsoil', 674, 420], ['tgL2', 'stiff clay', 674, 476], ['tgL3', 'weathered rock', 674, 540],
  ['tgLp', 'LOAD PATH', 362, 214], ['tgTk', 'TANK', 676, 120], ['tgSp', 'CLEAN WATER', 680, 262], ['tgDr', 'DRAIN', 900, 446], ['tgBb', 'BUS BAY', 878, 270]];
$('#tagG').innerHTML = TG.map(([id, tx, x, y]) => /[a-z]/.test(tx)
  ? `<g id="${id}"><text x="${x}" y="${y}" font-family="Architects Daughter" font-size="22" fill="#1C1F23">${tx}</text></g>`
  : `<g id="${id}"><rect x="${x}" y="${y - 22}" width="${tx.length * 10.4 + 20}" height="30" fill="#E4E4DF" stroke="#9A6F00" stroke-width="1.5"/><text x="${x + 10}" y="${y - 1}" font-family="IBM Plex Mono" font-weight="600" font-size="16" letter-spacing="1" fill="#9A6F00">${tx}</text></g>`).join('');

// B: the seven branches
const BR = [['frame', 'Structural', 'Frames that carry loads'], ['layers', 'Geotechnical', 'Soil and rock below'], ['road', 'Transportation', 'Roads, rails, airports'],
  ['waves', 'Water Resources', 'Rivers, dams, canals'], ['leaf', 'Environmental', 'Clean water and waste'], ['tripod', 'Surveying and Geomatics', 'Measuring the land'], ['gantt', 'Construction Management', 'Time, money, people']];
$('#bRow').innerHTML = BR.map(([ic, t, d], i) => `<div class="bc" id="bc${i}" style="left:${160 + (i % 4) * 408}px;top:${i < 4 ? 270 : 576}px"><div class="bg"></div><div class="bi"></div><div class="bn">0${i + 1}</div><div class="hd bt">${t}</div><div class="bd">${d}</div></div>`).join('');
$('#b7').innerHTML = BR.map((_, i) => `<div class="bd7" id="bd${i}" style="left:${32 + i * 44}px"></div>`).join('');

// K: at work today
const KA = [
  ['frame', 'Structural', 'frames that carry loads', 'deshpande', 'Prof. Deshpande checks every beam', 'hospital', 'A city hospital: engineers design its frame'],
  ['layers', 'Geotechnical', 'the ground under it all', 'ananya', 'Ananya orders a soil test first', 'train', 'A metro line: test the ground, then tunnel'],
  ['drop', 'Water', 'clean in, waste out', 'farhan', 'Farhan plans drains for the monsoon', 'city', 'A water board pipes water to lakhs of homes'],
  ['bus', 'Transportation', 'moving people safely', 'lakshmi', 'A bus bay keeps the children off the road', 'road', 'A highway: lanes, curves and safe junctions'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['AT WORK TODAY', 'Four branches', 'on our site, and in your city', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="hd pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:318px"><div class="av" style="${FACE(a[3])}"></div><div class="kl">AT HOSAHALLI</div><div class="kt">${a[4]}</div></div>
        <div class="ka" id="ka${i}1" style="top:438px"><div class="ki">${M.icon(a[5], 34, C.acct, 2.2)}</div><div class="kl">AT WORK TODAY</div><div class="kt">${a[6]}</div></div>`
     : `<div class="ka" id="ka00" style="top:318px"><div class="ki">${M.icon('home', 34, C.acct, 2.2)}</div><div class="kl">AT HOSAHALLI</div><div class="kt">One school, one branch at a time</div></div>
        <div class="ka" id="ka01" style="top:438px"><div class="ki">${M.icon('city', 34, C.acct, 2.2)}</div><div class="kl">AT WORK TODAY</div><div class="kt">Hospitals, metros, water, highways</div></div>`) + `</div>`).join('');

// X: the human side
const XG = [['home', 'Safe homes'], ['drop', 'Clean water'], ['road', 'Roads that connect']];
const XH = [['coin', 'High cost'], ['clock', 'Delays'], ['alert', 'Failures hurt people']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${384 + i * 60}px;background:#FFC20E;color:#1C1F23">${M.icon(ic, 22, C.onacc, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${384 + i * 60}px;background:#ECECE7;color:#1C1F23;border:2px solid #CBCCC5">${M.icon(ic, 22, C.soft, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#5D6269" stroke-width="2.5"/><line x1="70" y1="86" x2="0" y2="0" stroke="#5D6269" stroke-width="2.5"/>` +
  Array.from({ length: 3 }, (_, i) => `<rect id="wt${n}${i}" x="${-50 + i * 34}" y="56" width="30" height="30" fill="${col}" stroke="#1C1F23" stroke-width="2"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#F6F6F3" stroke="#1C1F23" stroke-width="2.5"/>`;
$('#panL').innerHTML = pan('#FFC20E', 'L'); $('#panR').innerHTML = pan('#B3B6B9', 'R');
['raghu', 'ananya', 'deshpande'].forEach((n, i) => { $('#xa' + i).style.cssText += ';' + FACE(n); });
$('#bb2I').innerHTML = M.icon('check', 22, C.bp, 3); $('#factI').innerHTML = M.icon('cake', 36, C.yel, 2);
$('#bothI').innerHTML = M.icon('shield', 52, C.bp, 2.4);

// quiz
const OPTS = ['Structural', 'Geotechnical', 'Transportation', 'Surveying'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot hd">${o}</div><div class="ok">${M.icon('check', 30, C.bp, 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('layers', 44, C.bp, 2.4);
// recap
const ROWS = [['frame', 'Plan, build and care for what we share', ['For everyone']], ['layers', 'Seven main branches', ['Structures and soil', 'Water and roads']], ['shield', 'Safety first', ['Check', 'Then build']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.acct, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.bp, 2.4);

/* ---------- helpers (copy these into every later episode) ---------- */
const camF = M.camera($('#cam'), [[0, 1.04, 960, 530], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const setIco = (e, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (e._k !== k) { e._k = k; e.innerHTML = M.icon(ic, s, col, w); } };
const snap = (e, v, prop = 'transform') => { if (e.style[prop] !== v) e.style[prop] = v; };
const attr = (e, a, v) => { if (e['_' + a] !== v) { e['_' + a] = v; e.setAttribute(a, v); } };
// a card that starts at full width (1600) and shrinks to 784 when its sibling arrives
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
// blueprint sheet x (world transition): slides in from the right, optionally leaves to the left
const sheetX = (t, [a, b]) => { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 <= 0 || a2 >= 1) return null; return 1940 * (1 - a1) - 1960 * a2; };
const sheet = (svg, t, w) => {
  const x = sheetX(t, w); M.hide(svg, x === null); if (x === null) return null;
  attr(svg.querySelector('.sg'), 'transform', Math.abs(x) < 0.05 ? 'translate(0 0)' : `translate(${f(x)} 0)`);
  M.drawU(svg.querySelector('.shB'), M.io((t - w[0] - 0.2) / 0.6)); return x;
};
// list row state (dim -> active yellow -> done): used by step lists, branch lists, at-work lists
const rowState = (e, t, ta, td, ic) => {
  const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), fut = t < ta;
  const bg = e.querySelector('.bg') || e;
  bg.style.background = mix(C.row, C.yel, act); bg.style.borderColor = mix(C.line, C.yel, act);
  e.querySelector('.rt').style.color = fut ? C.dim : mix(C.white, C.onacc, act);
  e.querySelector('.rn').style.color = fut ? C.dim : mix(C.acct, C.onacc, act);
  setIco(e.querySelector('.ri'), ic, fut ? C.dim : (act > 0.5 ? C.bp : (t > td ? C.yel : C.yel)), 28, 2.2);
};
// partial polyline for a path that draws on while its dashes keep flowing
const partial = (pts, u) => {
  let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let rem = L * M.clamp(u), d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length && rem > 0; i++) { const k = Math.min(1, rem / seg[i - 1]); d += `L${f(M.lerp(pts[i - 1][0], pts[i][0], k))} ${f(M.lerp(pts[i - 1][1], pts[i][1], k))}`; rem -= seg[i - 1]; }
  return d;
};
const fadeIn = (e, t, t0, d = 0.25) => { const u = M.clamp((t - t0) / d); e.style.opacity = u >= 1 ? '' : u.toFixed(3); M.hide(e, u <= 0); return u; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 152, es: 60 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112, w };
  const x0 = Math.round(geo.sx), x1 = Math.round(geo.sx + w), y = Math.round(geo.sy + h + 26);
  $('#tlG').innerHTML = `<line id="tl0" x1="${x0}" y1="${y}" x2="${x1}" y2="${y}"/><path id="tl1" d="M${x0 + 40} ${y} l-18 28 h36 z" stroke="#1C1F23" stroke-width="2.5"/><path id="tl2" d="M${x1 - 40} ${y} l-18 28 h36 z" stroke="#1C1F23" stroke-width="2.5"/>`;
  $('#sub').style.top = (y + 52) + 'px';
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // plot tags centred on their x
  TAGS.forEach(([, x, y], i) => { const p = $('#tg' + i); p.style.left = (x - p.offsetWidth / 2) + 'px'; p.style.top = (y - 20) + 'px'; });
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(32 * 688 / q.offsetWidth) + 'px'; }
  document.querySelectorAll('.tnm').forEach(e => { if (e.offsetWidth > 176) e.style.fontSize = Math.floor(23 * 176 / e.scrollWidth) + 'px'; });
  document.querySelectorAll('.sr .rt').forEach(e => { if (e.offsetWidth > 350) e.style.fontSize = Math.floor(25 * 350 / e.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(e => { if (e.offsetWidth > 848) e.style.fontSize = Math.floor(80 * 848 / e.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(e => { if (e.offsetWidth > 748) e.style.fontSize = Math.floor(30 * 748 / e.offsetWidth) + 'px'; });
  document.querySelectorAll('.xr .bb').forEach(e => { if (e.offsetWidth > 600) e.style.fontSize = Math.floor(23 * 600 / e.offsetWidth) + 'px'; });
  const bb0 = $('#bb0'); $('#sx0').style.width = (bb0.offsetWidth - 24) + 'px';
  ['#fact .kt', '#fact .kt2'].forEach(s => { const e = $(s); if (e.offsetWidth > 548) e.style.fontSize = Math.floor(parseFloat(getComputedStyle(e).fontSize) * 548 / e.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  const nt = $('#next .nt'); if (nt.scrollWidth > nt.offsetWidth) nt.style.fontSize = Math.floor(34 * nt.offsetWidth / nt.scrollWidth) + 'px';
  const qq = $('#qq1'); if (qq.offsetWidth > 1400) qq.style.fontSize = Math.floor(68 * 1400 / qq.offsetWidth) + 'px';
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -4], [tXg[1] + 0.1, -8], [tXg[2] + 0.1, -12], [tXh[0] + 0.1, -8], [tXh[1] + 0.1, -5], [tXh[2] + 0.1, -3]], M.SOFT);
const busT = M.track(1120, [[tBus - 0.6, 836]], [4.2, 1]);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header (shared element) */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es.toFixed(4)})` : `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01, rot: 0 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.vis($('#tline'), t, 0.8, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  if (t < tMorph + 0.3) { M.draw($('#tl0'), t, 0.85, 0.6, M.o3); M.draw($('#tl1'), t, 1.3, 0.35, M.o3); M.draw($('#tl2'), t, 1.4, 0.35, M.o3); }
  M.rise($('#sub'), t, 1.4, { st: 0.05, out: tMorph - 0.1, outDur: 0.3, rot: 0 });
  M.vis($('#exChip'), t, tM0 + 0.4, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A: the old school ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.vis($('#hImg'), t, tMorph + 0.4, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#oe'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    ['#oeRoof', '#oeWall', '#oeDoor', '#oeWin'].forEach((s, k) => M.draw($(s), t, tMorph + 0.45 + k * 0.12, 0.45, M.o3));
    // rain loops above the roof; a drip falls into the bucket
    [...document.querySelectorAll('#rainG .rd')].forEach((r, k) => { const ph = ((t * 1.6 + k * 0.37) % 1), x = 18 + k * 30 + ph * 6, y = -16 + ph * 92; attr(r, 'transform', `translate(${f(x)} ${f(y)})`); });
    M.vis($('#rainG'), t, tMorph + 0.6, 1e9, { dy: 0, fade: 0.3 });
    const dp = ((t - tMorph) % 0.9) / 0.9; attr($('#oeDrip'), 'cy', f(80 + 104 * dp * dp)); M.hide($('#oeDrip'), t < tMorph + 0.9);
    M.draw($('#oeBkt'), t, tMorph + 0.8, 0.3, M.o3);
    M.draw($('#oeCrack'), t, tCrack - 0.05, 0.7, M.o3);
    M.vis($('#pr0'), t, tMorph + 0.7, 1e9, { dx: 24, dy: 0 });
    M.vis($('#pr1'), t, tCrack, 1e9, { dx: 24, dy: 0 });
    M.vis($('#lq'), t, tC2 + 0.05, tAout, { dy: 36, ...o });
    const la = M.vis($('#lqA'), t, tLak - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    $('#lqA').style.boxShadow = '0 0 0 4px ' + mix(C.soft, C.acct, M.io((t - tSafe) / 0.3));
    M.rise($('#lqN'), t, tLak, { st: 0.06, sp: M.HEAVY, rot: 0 }); M.vis($('#lqR'), t, tLak + 0.2, 1e9, { dy: 10 });
    M.rise($('#lqQ'), t, wt('C2', 'Will') - 0.05, { st: 0.07, sp: M.HEAVY, rot: 0 });
  }

  /* ===== L: the brief and the team ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#illIn'), t, tL2);
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    const bo = { dx: -20, dy: 0, outDur: 0.2, ody: 0, odx: -20 };
    M.vis($('#brL'), t, tL1 + 0.4, tL2 - 0.3, bo);
    M.vis($('#br0'), t, tNewS - 0.05, tL2 - 0.3, bo); M.vis($('#br1'), t, tTwo - 0.05, tL2 - 0.3, bo); M.vis($('#br2'), t, tL1 + 0.5, tL2 - 0.3, bo);
    M.vis($('#chL'), t, tSix - 0.15, tL2 - 0.3, { ...bo, dx: 20, odx: 20 }); M.vis($('#chN'), t, tSix - 0.1, tL2 - 0.3, { ...bo, dx: 20, odx: 20 }); M.vis($('#chT'), t, tChil, tL2 - 0.3, { ...bo, dx: 20, odx: 20 });
    M.count($('#chN'), t, tSix - 0.05, 0.9, 0, 600);
    M.vis($('#ana'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#anaImg'), t, tL2 + 0.3, 1e9, { dy: 16, sp: M.SOFT });
    M.vis($('#anaL'), t, tAna - 0.1, 1e9, { dy: 10 }); M.rise($('#anaN'), t, tAna, { st: 0.06, sp: M.HEAVY, rot: 0 });
    M.vis($('#anaP'), t, tFirst - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#team'), t, tL3 + 0.05, tLout, { dy: 36, ...o });
    const tTv = [tRag - 0.05, tFar - 0.05, tDes - 0.25, tL3 + 0.3];
    TEAM.forEach((_, i) => {
      M.vis($('#tv' + i), t, tTv[i], 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#tn' + i), t, tTv[i] + 0.08, 1e9, { dy: 10 }); M.vis($('#tr' + i), t, tTv[i] + 0.14, 1e9, { dy: 8 });
      const nx = i < 2 ? tTv[i + 1] : (i === 2 ? T1('L3') + 0.2 : 0);
      const on = i < 3 ? M.io((t - tTv[i]) / 0.25) * (1 - M.io((t - nx) / 0.25)) : 0;
      $('#tv' + i).style.boxShadow = '0 0 0 4px ' + mix(C.soft, C.acct, on);
    });
    // name pills on the plot, once the card has settled
    const tgT = [tFar, tAna, tRag];
    TAGS.forEach((_, i) => M.vis($('#tg' + i), t, Math.max(tgT[i], tL2 + 0.6) - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
  }

  /* ===== D: what is civil engineering ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3, rot: 0 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqIn'), t, tD4);
    M.vis($('#chS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['cl1', 'cl2', 'cl3', 'cl4'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.vis($('#seal'), t, wt('D2', 'Charter') - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.rise($('#kot1'), t, wt('D3', 'Thomas') - 0.05, { st: 0.06, sp: M.HEAVY, rot: 0 });
    M.vis($('#kot2'), t, wt('D3', 'Tredgold') + 0.2, 1e9, { dy: 10 });
    M.vis($('#kbk'), t, wt('D2', '1828') - 0.05, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, wt('D3', 'art') - 0.3, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, wt('D3', 'art') - 0.2 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.white, M.io((t - wt('D3', 'art') - i * 0.9) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.white, C.acct, u); });
    M.vis($('#nat'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    NAT.forEach(([ic], i) => {
      const e = $('#nt' + i); M.vis(e, t, tNat[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tNat[i]) / 0.25) * (1 - (i < 3 ? M.io((t - tNat[i + 1]) / 0.25) : M.io((t - tD5) / 0.25)));
      e.style.background = mix(C.row, C.yel, on); e.style.borderColor = mix(C.line, C.yel, on);
      e.querySelector('.zt').style.color = mix(C.white, C.onacc, on); e.querySelector('.zn').style.color = mix(C.soft, C.onacc, on);
      setIco(e.querySelector('.zi'), ic, on > 0.5 ? C.bp : C.yel, 40, 2.2);
    });
    M.vis($('#sw'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    SWT.forEach(([ic], i) => {
      const e = $('#sw' + i); M.vis(e, t, tSw[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const on = M.io((t - tSw[i]) / 0.25) * (1 - (i < 2 ? M.io((t - tSw[i + 1]) / 0.25) : 0));
      e.style.background = mix(C.row, C.yel, on); e.style.borderColor = mix(C.line, C.yel, on);
      e.querySelector('.zt').style.color = mix(C.white, C.onacc, on); e.querySelector('.zn').style.color = mix(C.soft, C.onacc, on);
      setIco(e.querySelector('.zi'), ic, on > 0.5 ? C.bp : C.yel, 40, 2.2);
    });
  }

  /* ===== M: the new school, built up branch by branch on one drawing ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#pd'), t, tM0 + 0.1, tMout, { dx: -60, dy: 0, ...o });
    M.vis($('#pl'), t, tM0 + 0.25, tMout, { dx: 60, dy: 0, ...o });
    PS.forEach(([ic], i) => { const e = $('#pr' + i + 'x'); M.vis(e, t, tM0 + 0.4 + i * 0.07, 1e9, { dy: 14 }); rowState(e, t, tM[i], i < 5 ? tM[i + 1] : tMout + 1, ic); });
    // 0 the plot: ground line
    M.draw($('#gl'), t, tM0 + 0.5, 0.7, M.o3); fadeIn($('#lvl0'), t, tM0 + 1.0);
    // 1 surveying: grid axes, bay dims, instrument sight line, pegs
    document.querySelectorAll('#axG .ax').forEach((e, k) => M.draw(e, t, tM[0] + 0.2 + k * 0.12, 0.5, M.o3));
    document.querySelectorAll('#axG .axb').forEach((e, k) => M.vis(e, t, tM[0] + 0.3 + k * 0.12, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 }));
    document.querySelectorAll('#dimG .dm').forEach((e, k) => M.draw(e, t, tMeas + k * 0.15, 0.5, M.o3));
    document.querySelectorAll('#dimG .dmt').forEach((e, k) => fadeIn(e, t, tMeas + 0.3 + k * 0.15));
    const instOut = M.clamp((t - tM[2]) / 0.3), ig = $('#instG');
    const instIn = fadeIn(ig, t, tM[0] + 0.6); ig.style.opacity = (instIn * (1 - instOut)).toFixed(3); M.hide(ig, instIn * (1 - instOut) <= 0);
    M.draw($('#sight'), t, tLev - 0.3, 0.6, M.o3);
    document.querySelectorAll('#pegG .peg').forEach((e, k) => { const p = M.spring(t - tPeg - k * 0.15, M.SNAP); attr(e, 'transform', `translate(${CX[k]} ${f(GY - 30 * (1 - p))})`); fadeIn(e, t, tPeg - 0.05 + k * 0.15, 0.1); });
    const sv = fadeIn($('#tgSv'), t, tLev + 0.2); $('#tgSv').style.opacity = (sv * (1 - instOut)).toFixed(3); M.hide($('#tgSv'), sv * (1 - instOut) <= 0);
    // 2 geotechnical: soil layers wipe in, borehole drills, footings sized
    attr($('#soilR'), 'width', f(992 * M.io((t - tM[1] - 0.3) / 1.2)));
    const bh = 188 * M.io((t - tBore) / 1.6); attr($('#bore'), 'height', f(bh));
    fadeIn($('#tgBh'), t, tBore + 0.1); const bhOut = M.clamp((t - tM[2]) / 0.3); $('#tgBh').style.opacity = ((t > tBore + 0.1 ? 1 : 0) * (1 - bhOut)).toFixed(3); M.hide($('#tgBh'), t < tBore + 0.1 || bhOut >= 1);
    [['tgL1', 0.15], ['tgL2', 0.55], ['tgL3', 1.0], ['bore', 0]].forEach(([id, d]) => { const e = $('#' + id), u = id === 'bore' ? (bh > 0 ? 1 : 0) : M.clamp((t - Math.max(tBore + d, tLay - 0.3 + d * 0.4)) / 0.25), q = M.clamp((t - tM[3] + 0.3) / 0.3), v = u * (1 - q); e.style.opacity = v >= 1 ? '' : v.toFixed(3); M.hide(e, v <= 0); });
    document.querySelectorAll('#footG .ft').forEach((e, k) => M.vis(e, t, tFoot - 0.05 + k * 0.1, 1e9, { dy: -16, sp: M.SNAP, fade: 0.1 }));
    M.vis($('#ftDim'), t, tFoot + 0.4, 1e9, { dy: 0, fade: 0.2 });
    // 3 structural: columns rise, plinth, slabs + beams wipe, load arrow, load path flows down to the footing
    colEls.forEach((e, k) => { const u = M.io((t - tCol - k * 0.15) / 0.6), h = (FT - RF) * u; attr(e, 'y', f(FT - h)); attr(e, 'height', f(h)); M.hide(e, u <= 0); });
    fadeIn(plinth, t, tCol + 0.3);
    attr(slabCR, 'width', f(550 * M.io((t - tBeams + 0.1) / 0.9))); M.hide(slabs[0], t < tBeams - 0.1); M.hide(slabs[1], t < tBeams - 0.1);
    fadeIn($('#lvl1'), t, tSlab - 0.1); fadeIn($('#lvl2'), t, tSlab + 0.1);
    const la = M.spring(t - tLoad, M.SNAP); attr($('#ldA'), 'transform', `translate(0 ${f(-40 * (1 - la))})`); M.vis($('#ldA'), t, tLoad - 0.05, tM[3] + 0.2, { dy: 0, ody: 0, fade: 0.1, outDur: 0.3 });
    const lpU = M.io((t - tDown + 0.2) / Math.max(0.8, tFoot3 - tDown + 0.3));
    attr($('#ldP'), 'd', lpU > 0 ? partial(LP.slice(1), lpU) : ''); $('#ldP').style.strokeDashoffset = f(-t * 40);
    M.vis($('#ldP'), t, tDown - 0.2, tM[3] + 0.2, { dy: 0, ody: 0, fade: 0.1, outDur: 0.3 });
    M.draw($('#bulb'), t, tFoot3, 0.5, M.o3); if (t > tM[3] + 0.2) M.vis($('#bulb'), t, null, tM[3] + 0.2, { dy: 0, ody: 0, outDur: 0.3 });
    M.vis($('#tgLp'), t, tLoad + 0.2, tM[3] + 0.2, { dy: 0, ody: 0, fade: 0.15, outDur: 0.3 });
    // 4 water and environmental: tank fills, clean water flows up to it, drain flows to the sewer
    M.vis($('#tankG'), t, tTank - 0.1, 1e9, { dy: -12, sp: M.SNAP, fade: 0.1 });
    const wl = 40 * M.io((t - tPipe - 0.4) / 1.6); attr($('#tankW'), 'y', f(149 - wl)); attr($('#tankW'), 'height', f(wl));
    fadeIn($('#tgTk'), t, tTank + 0.1);
    M.draw($('#supB'), t, tPipe - 0.1, 0.8, M.o3); fadeIn($('#supF'), t, tPipe + 0.6); $('#supF').style.strokeDashoffset = f(-t * 40);
    fadeIn($('#tgSp'), t, tPipe + 0.4);
    M.draw($('#drB'), t, tDrain - 0.1, 0.6, M.o3); fadeIn($('#drF'), t, tDrain + 0.4); $('#drF').style.strokeDashoffset = f(-t * 30);
    fadeIn($('#tgDr'), t, tDrain + 0.3);
    // 5 transportation: road section, kerb, bus stop, the bus pulls into the bay
    M.vis($('#rdS'), t, tRoad - 0.1, 1e9, { dy: 10, sp: M.SNAP }); M.vis($('#kerb'), t, tRoad + 0.1, 1e9, { dy: 10, sp: M.SNAP });
    M.vis($('#pole'), t, tBay - 0.1, 1e9, { dy: 16, sp: M.SNAP });
    const bx = busT(t); attr($('#bus'), 'transform', `translate(${f(bx)} 356)`); M.hide($('#busV'), t < tBus - 0.6);
    fadeIn($('#tgBb'), t, tBus + 0.6);
    // 6 construction management: the schedule fills bar by bar, a "today" line sweeps
    M.vis($('#schG'), t, tSched - 0.15, 1e9, { dy: 16, sp: M.SNAP });
    const span = Math.max(1.6, tOrder - tWho + 0.6), su = M.clamp((t - tWho + 0.2) / span);
    document.querySelectorAll('#schG .sb').forEach((e, k) => { const [, a, b] = SCH[k], w = SWd * M.clamp((su - a) / (b - a)) * (b - a); attr(e, 'x', f(SX + SWd * a)); attr(e, 'width', f(Math.max(0, w))); });
    attr($('#today'), 'x1', f(SX + SWd * su)); attr($('#today'), 'x2', f(SX + SWd * su)); M.hide($('#today'), su <= 0 || su >= 1);
  }

  /* ===== statement on the blueprint sheet ===== */
  const sx = sheet($('#sheetS'), t, SW.S);
  const stOn = t >= tT && t < tTb + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    snap(stmt, t > tTb ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none');
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05, rot: 0 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.07, sp: M.HEAVY, rot: 0 });
    M.rise($('#st3'), t, tSt3 - 0.1, { st: 0.09, sp: M.HEAVY, rot: 0 });
  }

  /* ===== B: the seven branches ===== */
  const bOn = t >= tTb - 0.05 && t < tK0 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    BR.forEach(([ic], i) => {
      const e = $('#bc' + i), ta = tB[i], td = i < 6 ? tB[i + 1] : tB8;
      M.vis(e, t, tB0 + 0.1 + i * 0.07, tBout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), fut = t < ta;
      const bg = e.querySelector('.bg'); bg.style.background = mix(C.panel, C.yel, act); bg.style.borderColor = fut ? C.line : mix(C.yel, C.soft, off);
      e.querySelector('.bt').style.color = fut ? C.dim : mix(C.white, C.onacc, act);
      e.querySelector('.bd').style.color = fut ? C.dim : mix(C.soft, C.onacc, act);
      e.querySelector('.bn').style.color = fut ? C.dim : mix(C.acct, C.onacc, act);
      e.querySelector('.bi').style.borderColor = fut ? C.line : mix(C.line, C.onacc, act);
      setIco(e.querySelector('.bi'), ic, fut ? C.dim : (act > 0.5 ? C.bp : C.yel), 36, 2.2);
    });
    M.vis($('#ball'), t, tB0 + 0.6, tBout, { dy: 36, ...o });
    M.rise($('#ballT'), t, tB8 + 0.05, { st: 0.05, rot: 0 });
    BR.forEach((_, i) => { const d = $('#bd' + i); d.style.background = mix(C.bp, C.yel, M.io((t - tB[i] - 0.2) / 0.25)); });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => { const e = $('#kr' + i); M.vis(e, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 }); rowState(e, t, tK[i], i < 3 ? tK[i + 1] : tKout + 1, ic); });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2, rot: 0 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2, rot: 0 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, k ? tKw[k - 1] - 0.1 : tin + 0.8, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X: the human side ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsIn'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * PI / 180;
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    const tx = [tRagX, tAnaX, tDesX];
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, tx[i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#xa0').style.boxShadow = '0 0 0 4px ' + mix(C.soft, C.dim, M.io((t - tAnaX) / 0.3));
    $('#xa1').style.boxShadow = '0 0 0 4px ' + mix(C.soft, C.acct, M.io((t - tAnaX) / 0.3));
    $('#xa2').style.boxShadow = '0 0 0 4px ' + mix(C.soft, C.acct, M.io((t - tDesX) / 0.3));
    M.draw($('#sx0'), t, tAnaX + 0.4, 0.35, M.o3);
    { const sxe = $('#sx0'), u = M.o3((t - tAnaX - 0.4) / 0.35); sxe.style.transformOrigin = '0 0'; sxe.style.transform = `scaleX(${u.toFixed(3)})`; M.hide(sxe, u <= 0); }
    $('#bb0').style.color = mix(C.white, C.dim, M.io((t - tAnaX - 0.4) / 0.3));
    M.vis($('#fact'), t, tX6 - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check (sheet 2) ===== */
  sheet($('#sheetA'), t, SW.A);
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY, rot: 0 });
    M.rise($('#qq2'), t, wt('Q1', 'carry') - 0.25, { st: 0.06, sp: M.HEAVY, rot: 0 });
    OPTS.forEach((_, i) => {
      const e = $('#o' + i); M.vis(e, t, tQ + 1.5 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAns) / 0.3), bg = e.querySelector('.bg');
      bg.style.background = right ? mix(C.panel, C.white, r) : mix(C.panel, C.bp, r);
      bg.style.borderColor = right ? mix(C.soft, C.white, r) : mix(C.soft, C.line, r);
      e.querySelector('.ot').style.color = right ? mix(C.white, C.onacc, r) : mix(C.white, C.dim, r);
      const lt = e.querySelector('.lt'); lt.style.background = right ? mix(C.panel, C.yel, r) : C.panel; lt.style.borderColor = right ? mix(C.white, C.acct, r) : mix(C.white, C.dim, r); lt.style.color = right ? mix(C.white, C.onacc, r) : mix(C.white, C.dim, r);
      const ok = e.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) e.style.transform = `scale(${(1 + 0.04 * Math.sin(PI * (t - tAns) / 0.45)).toFixed(4)})`;
      else if (right && t >= tAns + 0.45 && e.style.transform !== 'none') e.style.transform = 'none';
    });
    const cd = tAns - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTakeQ, 1e9, { dy: 40 });
    M.rise($('#takeT'), t, tTakeQ + 0.1, { st: 0.045, rot: 0 });
  }

  /* ===== recap + next episode (sheet 3) ===== */
  sheet($('#sheetB'), t, SW.B);
  const sOn = t >= tS; M.hide($('#recap'), !sOn);
  if (sOn) {
    M.vis($('#rchip'), t, tS + 0.1, 1e9, { dy: 16 });
    M.rise($('#rh'), t, tS + 0.18, { st: 0.06, sp: M.HEAVY, rot: 0 });
    ROWS.forEach(([, , ps], i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04, rot: 0 });
      ps.forEach((_, k) => {
        const e = $('#fp' + i + k), tp = tPill[i][k]; M.vis(e, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const a = tp - 0.05, b = k < ps.length - 1 ? tPill[i][k + 1] - 0.05 : (i < 2 ? tRow[i + 1] - 0.2 : tN - 0.4);
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        e.style.background = mix(mix(C.row, C.yel, g), C.row, d); e.style.borderColor = mix(mix(C.line, C.yel, g), C.line, d);
        e.style.color = g > 0.5 && d < 0.5 ? C.bp : C.white;
      });
    });
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on the three sheets, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#E4E4DF', ink: '#1C1F23', accent: '#FFC20E', sub: 'rgba(28,31,35,.62)', font: 'Archivo' });
})();
