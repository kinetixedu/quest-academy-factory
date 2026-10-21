// Engineering Mechanics Ep 01: What Is Engineering Mechanics? Forces and Force Systems (Salim Auto Works)
(() => {
const { $ } = M;
const C = { steel: '#2E3742', steel2: '#3E4855', mid: '#6C7886', dim: '#A9B2BD', line: '#CBD2DA', card: '#F7F8FA', bg: '#E9ECEF', orange: '#FF6A13', soft: '#FFE3D2', track: '#DDE2E7', red: '#C2410C', redBg: '#FBE1D3', white: '#FFFFFF' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix, PI = Math.PI;
const NS = 'http://www.w3.org/2000/svg';
const f2 = v => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);

Object.assign(M.IC, {
  crane: ['M4 22V4l8-2 8 2', 'M4 4h16', 'M18 4v6', 'M16 10h4v3h-4z', 'M2 22h6'],
  train: ['M8 3h8a4 4 0 0 1 4 4v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a4 4 0 0 1 4-4Z', 'M4 11h16', 'M12 3v8', 'm8 19-2 3', 'm18 22-2-3', 'M8 15h.01', 'M16 15h.01'],
  bridge: ['M2 8h20', 'M4 8v12', 'M20 8v12', 'M12 8v12', 'M2 20h20', 'M4 8c2-4 6-4 8 0 2-4 6-4 8 0'],
  sign: ['M12 22V12', 'M5 4h14v8H5z', 'M8 22h8'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  ban: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm4.9 4.9 14.2 14.2'],
  pencil: ['M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  move: ['M5 12h14', 'm13 6 6 6-6 6'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  trendUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
  rule: ['M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z', 'm14.5 12.5 2-2', 'm11.5 9.5 2-2', 'm8.5 6.5 2-2', 'm17.5 15.5 2-2'],
});
const IMG = '../../assets/illustrations/engg-mech/';
const FACE = n => `background-image:url(${IMG}emech-${n}-face.jpg)`;
const el = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; };
// straight arrow from (x0,y0) to (x1,y1): returns svg markup; head drawn as a filled triangle at the tip
const arrow = (id, x0, y0, x1, y1, col, w = 8, hs = 22) => {
  const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), bx = x1 - hs * Math.cos(a), by = y1 - hs * Math.sin(a);
  const nx = -Math.sin(a) * hs * 0.55, ny = Math.cos(a) * hs * 0.55;
  return `<g id="${id}"><path class="sh" d="M${f2(x0)} ${f2(y0)} L${f2(bx)} ${f2(by)}" stroke="${col}" stroke-width="${w}" stroke-linecap="butt" fill="none"/><path class="hd" d="M${f2(x1)} ${f2(y1)} L${f2(bx + nx)} ${f2(by + ny)} L${f2(bx - nx)} ${f2(by - ny)} Z" fill="${col}"/></g>`;
};
// draw an arrow group on: shaft draws, head appears at the end
const drawArrow = (g, t, t0, dur = 0.45) => { const sh = g.querySelector('.sh'), hd = g.querySelector('.hd'); M.draw(sh, t, t0, dur, M.o3); hd.style.opacity = M.clamp((t - t0 - dur * 0.8) / 0.12).toFixed(3); };

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tKir = wt('H2', 'Kiran'), tSal = wt('H2', 'Salim'), tSwv = wt('H2', 'swerves'), tC2 = T0('C2'), tPushed = wt('C2', 'pushed'), tForgot = wt('C2', 'forgot');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tLsal = wt('L2', 'Salim'), tLkir = wt('L2', 'Kiran'), tLpri = wt('L3', 'Priya'), tLraj = wt('L3', 'Raju'), tLfar = wt('L3', 'Farida'), tLel = wt('L3', 'electric'), tLbij = wt('L3', 'Bijli');
const tD1 = T0('D1'), tD2 = T0('D2'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('F1') - 0.32;
const tHib = wt('D2', 'Hibbeler'), tQl = wt('D2', 'mechanics'), tHl = [wt('D2', 'rest'), wt('D2', 'bodies'), wt('D2', 'forces')];
const tSta = wt('D4', 'statics'), tDyn = wt('D4', 'dynamics'), tSw = [wt('D5', 'find'), wt('D5', 'predict')];
const tF1 = T0('F1'), tF2 = T0('F2'), tF3 = T0('F3'), tF4 = T0('F4'), tFout = T0('M1') - 0.32;
const tPush = wt('F1', 'push'), tPull = wt('F1', 'pull'), tSize = wt('F2', 'size'), tNewt = wt('F2', 'newtons'), tApple = wt('F2', 'apple');
const tDir = wt('F3', 'direction'), tPoint = wt('F3', 'point'), tLine = wt('F3', 'action'), tVec = wt('F4', 'vector'), tArr = wt('F4', 'arrow');
const tM1 = T0('M1'), tM2 = T0('M2'), tM3 = T0('M3'), tM4 = T0('M4'), tM5 = T0('M5'), tM6 = T0('M6'), tM7 = T0('M7'), tM8 = T0('M8');
const tKp = wt('M2', 'pushes'), tSp = wt('M3', 'pulls'), tThirty = wt('M3', 'thirty'), tTip = wt('M4', 'tip'), tRes = wt('M4', 'resultant'), tEight = wt('M4', 'eighteen');
const tDrift = wt('M5', 'drifts'), tSide = wt('M5', 'sideways'), tStr = wt('M6', 'straight'), tAdd = wt('M7', 'add'), tFive = wt('M8', 'Five'), tFwd = wt('M8', 'forward');
const tMout = T0('T1') - 0.32;
const tT = T0('T1'), tSt2 = wt('T1', 'also'), tS0 = T0('S0'), tTu = tS0 - 0.32;
const tP = [1, 2, 3, 4].map(i => T0('P' + i)), tCop = wt('P4', 'coplanar'), tPout = T0('K0') - 0.32;
const tPex = [wt('P1', 'straight'), wt('P2', 'angled'), wt('P3', 'wheels'), wt('P4', 'roof')];
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'railway'), wt('K2', 'crane'), wt('K3', 'bridge'), wt('K4', 'signboard')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX7 = T0('X7');
const tXg = [wt('X2', 'quick'), wt('X2', 'bicycles')], tXh = [wt('X3', 'bend'), wt('X3', 'forgotten')];
const tRule = wt('X5', 'rule'), tDraw = wt('X5', 'draws'), tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Same');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'rest'), wt('S2', 'motion')], [wt('S3', 'vector'), wt('S3', 'newtons')], [wt('S4', 'collinear'), wt('S4', 'concurrent'), wt('S4', 'parallel'), wt('S4', 'general')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
// top view of an auto rickshaw (nose at +x), centred on 0,0 ; hook point at (48, 0)
const autoTop = id => `<g id="${id}"><path d="M-50 -30 H24 C40 -30 48 -14 48 -6 V6 C48 14 40 30 24 30 H-50 C-56 30 -58 26 -58 20 V-20 C-58 -26 -56 -30 -50 -30Z" fill="#F7F8FA" stroke="#2E3742" stroke-width="3"/><path d="M-40 -30 V30 M8 -30 V30" stroke="#2E3742" stroke-width="2.5"/><rect x="-36" y="-22" width="40" height="44" rx="4" fill="#DDE2E7"/><circle cx="48" cy="0" r="5" fill="#FF6A13"/></g>`;
const hatch = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#htc)"/><line x1="${x}" y1="${y + h}" x2="${x + w}" y2="${y + h}" stroke="#2E3742" stroke-width="3"/>`;
const defs = id => `<defs><pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="14" fill="#E9ECEF"/><line x1="0" y1="0" x2="0" y2="14" stroke="#A9B2BD" stroke-width="3"/></pattern></defs>`;

// A: path card (top view, the swerve)
$('#pathS').innerHTML = defs('htc') + hatch(36, 70, 712, 26) + `<text x="742" y="62" text-anchor="end" font-family="Barlow Condensed" font-weight="600" font-size="18" letter-spacing="3" fill="#6C7886">WALL</text>
  <path id="trail" d="" fill="none" stroke="#FF6A13" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>` + `<g id="pauto" transform="translate(110 190)">${autoTop('pa')}</g>`;
const METH = [['check', 'Pushed hard', 0], ['check', 'Pulled hard', 0], ['x', 'Which way?', 1]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="pill${bad ? ' bad' : ''}" id="mt${i}" style="top:74px">${M.icon(ic, 24, bad ? C.red : C.steel, 2.6)}<span>${m}</span></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// L: project + cast
$('#projR').innerHTML = `<div class="pill" id="pj0" style="left:36px;top:96px">${M.icon('gear', 26, C.steel, 2.2)}<span>Old diesel auto</span></div>
  <svg id="pjA" width="80" height="30" style="position:absolute;left:320px;top:105px"><path d="M4 15 H66 M54 4 L68 15 L54 26" fill="none" stroke="#6C7886" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="pill or" id="pj1" style="left:420px;top:96px">${M.icon('zap', 26, '#fff', 2.4)}<span>Electric auto</span></div>
  <div class="cond big" id="pjT" style="left:36px;top:178px;font-size:58px">Its name: <span class="acc">Bijli</span></div>`;
const TEAM = [['salim', 'Salim', 'OWNER'], ['kiran', 'Kiran', 'MECH STUDENT'], ['priya', 'Priya', 'BATTERY'], ['raju', 'Raju', 'DRIVER'], ['farida', 'Farida', 'PARTS']];
$('#tRow').innerHTML = TEAM.map(([f, n, r], i) => { const cx = 102 + i * 145; return `<div class="av" id="tv${i}" style="left:${cx - 36}px;top:76px;${FACE(f)}"></div><div class="avn" id="tn${i}" style="left:${cx - 70}px;top:164px">${n}</div><div class="avr" id="tr${i}" style="left:${cx - 70}px;top:202px">${r}</div>`; }).join('');
wrap($('#ill2'), 'ill2Out', 784, 580);
// D: branches + simple words
$('#brS').innerHTML = `<path id="brL0" d="M268 137 H330 V90 H372" fill="none" stroke="#A9B2BD" stroke-width="3"/><path id="brL1" d="M330 137 V186 H372" fill="none" stroke="#A9B2BD" stroke-width="3"/>`;
$('#brB').innerHTML = `<div class="bx" id="bx0" style="left:36px;top:105px;background:#2E3742;color:#fff">Mechanics</div>
  <div class="bx" id="bx1" style="left:372px;top:58px">Statics <small>at rest</small></div>
  <div class="bx" id="bx2" style="left:372px;top:154px">Dynamics <small>in motion</small></div>`;
$('#swRow').innerHTML = `<div class="bx" id="sw0" style="left:36px;top:96px">${M.icon('search', 28, C.orange, 2.4)}Find every force</div>
  <svg id="swA" width="70" height="30" style="position:absolute;left:0;top:113px"><path d="M4 15 H56 M44 4 L58 15 L44 26" fill="none" stroke="#6C7886" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="bx" id="sw1" style="left:0;top:96px">${M.icon('target', 28, C.orange, 2.4)}Predict what it does</div>
  <div class="lbl" id="swN" style="left:36px;top:196px">STILL OR MOVING · STATICS OR DYNAMICS</div>`;
wrap($('#kq'), 'kqOut', 784, 580);

// F: side view auto with one force
{
  const s = $('#fcS'); const GY = 452;
  s.innerHTML = defs('htf') + `<line x1="40" y1="${GY}" x2="1008" y2="${GY}" stroke="#2E3742" stroke-width="3"/>
  <g id="sideAuto" transform="translate(250 0)">
    <path d="M40 ${GY - 60} V${GY - 210} C40 ${GY - 250} 70 ${GY - 266} 120 ${GY - 266} H330 C362 ${GY - 266} 376 ${GY - 250} 380 ${GY - 220} L404 ${GY - 120} C410 ${GY - 96} 410 ${GY - 70} 400 ${GY - 60} Z" fill="#F7F8FA" stroke="#2E3742" stroke-width="4" stroke-linejoin="round"/>
    <path d="M60 ${GY - 236} H330 L352 ${GY - 150} H60 Z" fill="#DDE2E7" stroke="#2E3742" stroke-width="3"/>
    <line x1="210" y1="${GY - 236}" x2="210" y2="${GY - 150}" stroke="#2E3742" stroke-width="3"/>
    <rect x="40" y="${GY - 112}" width="368" height="14" fill="#FF6A13"/>
    <circle cx="110" cy="${GY - 36}" r="36" fill="#2E3742"/><circle cx="110" cy="${GY - 36}" r="14" fill="#A9B2BD"/>
    <circle cx="360" cy="${GY - 36}" r="36" fill="#2E3742"/><circle cx="360" cy="${GY - 36}" r="14" fill="#A9B2BD"/>
  </g>
  <line id="loa" x1="80" y1="${GY - 90}" x2="1010" y2="${GY - 90}" stroke="#6C7886" stroke-width="2.5" stroke-dasharray="18 8 4 8"/>
  ${arrow('fPush', 110, GY - 90, 286, GY - 90, C.steel, 10, 28)}
  ${arrow('fPull', 662, GY - 90, 902, GY - 90, C.orange, 10, 28)}
  <circle id="fPt" cx="662" cy="${GY - 90}" r="11" fill="#FF6A13" stroke="#2E3742" stroke-width="3"/>`;
  $('#fcL').innerHTML = `<div class="fl" id="fl0" style="left:120px;top:${GY - 154}px">PUSH</div>
    <div class="fl or" id="fl1" style="left:770px;top:${GY - 154}px">SIZE<span class="v">300 N</span></div>
    <div class="fl or" id="fl2" style="left:770px;top:${GY - 208}px">DIRECTION<span class="v">→</span></div>
    <div class="fl" id="fl3" style="left:560px;top:${GY - 20}px">POINT OF APPLICATION</div>
    <div class="fl" id="fl4" style="left:40px;top:${GY + 30}px">LINE OF ACTION</div>`;
  $('#apple').innerHTML = `<circle cx="60" cy="66" r="42" fill="#FF6A13" stroke="#2E3742" stroke-width="4"/><path d="M60 24 V10" stroke="#2E3742" stroke-width="4" stroke-linecap="round"/><path d="M62 18 C72 6 86 8 92 12 C84 22 72 24 62 18Z" fill="#6C7886" stroke="#2E3742" stroke-width="3"/>`;
  $('#vecI').innerHTML = M.icon('move', 26, '#fff', 2.6);
}

/* M: the two runs, inside 704 x 300 plan svgs. Scale 0.5 px per newton. */
const K = 0.5, HX = 200, HY = 214, ANG = 30 * PI / 180;
const pP = [100, 0], pS = [150 * Math.cos(ANG), -150 * Math.sin(ANG)], pR = [pP[0] + pS[0], pP[1] + pS[1]];
const RL = Math.hypot(pR[0], pR[1]), RU = [pR[0] / RL, pR[1] / RL];
const plan = (k, title, face) => `<div class="mav" style="${FACE(face)}"></div><div class="lbl mlb">${title}</div>
  <svg class="plan" id="plan${k}" width="704" height="300">${defs('hm' + k)}<rect width="704" height="300" rx="6" fill="#E9ECEF"/>
    <rect x="0" y="0" width="704" height="30" fill="url(#hm${k})"/><line x1="0" y1="30" x2="704" y2="30" stroke="#2E3742" stroke-width="3"/>
    <text x="690" y="58" text-anchor="end" font-family="Barlow Condensed" font-weight="600" font-size="17" letter-spacing="3" fill="#6C7886">WALL</text>
    <path id="tr${k}" d="" fill="none" stroke="#FF6A13" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
    <g id="car${k}" transform="translate(${HX - 48} ${HY})">${autoTop('a' + k)}</g>
    <g id="vec${k}"></g>
  </svg>
  <div class="ro" id="ro${k}0" style="left:40px"><div class="k">FORWARD</div><div class="n" id="rn${k}0">0 N</div></div>
  <div class="ro" id="ro${k}1" style="left:406px"><div class="k">SIDEWAYS</div><div class="n" id="rn${k}1">0 N</div></div>
  <div class="mst" id="ms${k}"><span class="msi"></span><span class="mtx"></span></div>`;
$('#mLIn').innerHTML = plan('L', 'ROPE AT AN ANGLE', 'salim');
$('#mRIn').innerHTML = plan('R', 'ROPE STRAIGHT', 'salim');
// vectors drawn at the hook H (concurrent point). Left: push, pull at 30 deg, the pull copy tip-to-tail, resultant.
$('#vecL').innerHTML = `<g id="vgL">${arrow('vPL', HX, HY, HX + pP[0], HY, C.steel, 7, 20)}${arrow('vSL', HX, HY, HX + pS[0], HY + pS[1], C.orange, 7, 20)}
  <g id="vCL" opacity="0">${arrow('vSL2', HX + pP[0], HY, HX + pR[0], HY + pR[1], C.orange, 5, 16)}</g></g>
  ${arrow('vRL', HX, HY, HX + pR[0], HY + pR[1], C.steel, 10, 26)}
  <text id="tPL" x="${HX + 50}" y="${HY + 34}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="#2E3742">200 N</text>
  <text id="tSL" x="${HX + 18}" y="${HY - 64}" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="#FF6A13">300 N · 30°</text>
  <text id="tRL" x="${HX + pR[0] + 14}" y="${HY + pR[1] + 6}" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="#2E3742">R = 484 N</text>`;
$('#vecR').innerHTML = `${arrow('vPR', HX, HY, HX + 100, HY, C.steel, 7, 20)}<g id="vCR" opacity="0">${arrow('vSR', HX + 100, HY, HX + 250, HY, C.orange, 7, 20)}</g>
  <text id="tPR" x="${HX + 50}" y="${HY + 34}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="#2E3742">200 N</text>
  <text id="tSR" x="${HX + 175}" y="${HY + 34}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="20" fill="#FF6A13">300 N</text>
  <text id="tRR" x="${HX + 125}" y="${HY - 22}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="#2E3742">R = 500 N</text>`;
wrap($('#mL'), 'mLOut', 784, 580);

// P: four force systems (2 x 2 tiles), each with its own small diagram (280 x 230)
const FS = [
  ['Collinear', 'All forces on one line', 'The straight pull', `<line x1="10" y1="115" x2="270" y2="115" stroke="#A9B2BD" stroke-width="2" stroke-dasharray="14 6 3 6"/>${arrow('d00', 30, 115, 120, 115, C.steel, 7, 20)}${arrow('d01', 130, 115, 260, 115, C.orange, 7, 20)}`],
  ['Concurrent', 'Lines meet at one point', 'Angled rope + push', `${arrow('d10', 40, 160, 140, 160, C.steel, 7, 20)}${arrow('d11', 140, 160, 236, 104, C.orange, 7, 20)}${arrow('d12', 140, 160, 140, 40, C.steel, 7, 20)}<circle cx="140" cy="160" r="9" fill="#FF6A13" stroke="#2E3742" stroke-width="3"/>`],
  ['Parallel', 'Lines never meet', 'Ground on three wheels', `<rect x="40" y="88" width="200" height="40" rx="6" fill="#DDE2E7" stroke="#2E3742" stroke-width="3"/>${arrow('d20', 140, 20, 140, 84, C.orange, 7, 20)}${arrow('d21', 60, 210, 60, 132, C.steel, 7, 20)}${arrow('d22', 140, 210, 140, 132, C.steel, 7, 20)}${arrow('d23', 220, 210, 220, 132, C.steel, 7, 20)}`],
  ['General', 'Neither meet nor parallel', 'Wind and weight on a roof', `<path d="M40 150 L140 80 L240 150 Z" fill="#DDE2E7" stroke="#2E3742" stroke-width="3"/>${arrow('d30', 0, 90, 82, 110, C.orange, 7, 20)}${arrow('d31', 170, 60, 170, 120, C.steel, 7, 20)}${arrow('d32', 230, 220, 230, 160, C.steel, 7, 20)}${arrow('d33', 60, 220, 92, 160, C.steel, 7, 20)}`],
];
$('#fsT').innerHTML = FS.map(([n, d, ex, svg], i) => `<div class="fs" id="fs${i}" style="left:${i % 2 ? 976 : 160}px;top:${i < 2 ? 270 : 576}px"><div class="bg"></div><div class="nm">0${i + 1}</div><div class="cond tt">${n}</div><div class="ds">${d}</div><div class="ex">${M.icon('pencil', 20, C.orange, 2.4)}<span>${ex}</span></div><svg width="280" height="230">${svg}</svg></div>`).join('');
$('#ncpI').innerHTML = M.icon('move', 22, C.orange, 2.6);

// K: at work today
const KA = [
  ['move', 'Collinear', 'One line, just add', 'The straight pull: 200 + 300 = 500 N', 'train', 'A railway engine pulls coaches in one line'],
  ['target', 'Concurrent', 'Lines meet at one point', 'Push and angled rope meet at the hook', 'crane', 'Crane slings meet at one hook'],
  ['bridge', 'Parallel', 'Side by side, never meeting', 'The ground pushes up on all three wheels', 'bridge', 'Pillars push straight up on a bridge deck'],
  ['wind', 'General', 'Any place, any direction', 'Wind and weight on the workshop roof', 'sign', 'Wind and weight on a tall signboard'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['FORCE SYSTEMS TODAY', 'Four kinds', 'You will meet them in every machine', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="cond pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:300px"><i class="f" style="${FACE(i === 1 ? 'kiran' : 'salim')}"></i><div class="kl">AT SALIM AUTO WORKS</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:420px"><i>${M.icon(a[4], 34, C.steel, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="ka" id="ka00" style="top:300px"><i>${M.icon('gear', 34, C.orange, 2.2)}</i><div class="kl">FROM AN AUTO TO A BRIDGE</div><div class="kt">Same rules, any size of machine</div></div>`) + `</div>`).join('');

// X: the human side
const XG = [['check', 'Quick, reliable answers'], ['bridge', 'Bicycles to bridges']];
const XH = [['ban', 'Real parts bend, twist'], ['wind', 'Forgotten forces']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.steel, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3E4855" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3E4855" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="4" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#DDE2E7" stroke="#3E4855" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#2E3742', 'L'); $('#panR').innerHTML = pan('#C2410C', 'R');
$('#factI').innerHTML = M.icon('bridge', 36, C.steel, 2.2); $('#bb1I').innerHTML = M.icon('pencil', 22, '#fff', 2.4);
$('#bothI').innerHTML = M.icon('target', 56, C.orange, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz
const OPTS = ['100 N', '300 N', '500 N', '600 N'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('move', 44, C.orange, 2.4);
// recap
const ROWS = [['search', 'Mechanics: forces on bodies', ['At rest', 'In motion']], ['move', 'A force: size, direction, point', ['Vector', 'Newtons']], ['target', 'Force systems', ['Collinear', 'Concurrent', 'Parallel', 'General']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.orange, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.orange, 2.4);

/* ---------- helpers ---------- */
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (e, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (e._k !== k) { e._k = k; e.innerHTML = M.icon(ic, s, col, w); } };
const snap = (e, v, prop = 'transform') => { if (e.style[prop] !== v) e.style[prop] = v; };
const attr = (e, a, v) => { if (e['_' + a] !== v) { e['_' + a] = v; e.setAttribute(a, v); } };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const pill = (k, ic, tx, state) => { // state 0 neutral, 1 orange (done), 2 bad
  const ms = $('#ms' + k);
  setIco(ms.querySelector('.msi'), ic, state === 1 ? '#fff' : (state === 2 ? C.red : C.orange), 24, 2.4);
  M.setT(ms.querySelector('.mtx'), tx);
  const bg = state === 1 ? C.orange : (state === 2 ? C.redBg : C.track), fg = state === 1 ? '#fff' : (state === 2 ? C.red : C.steel);
  if (ms._bg !== bg) { ms._bg = bg; ms.style.background = bg; ms.style.color = fg; }
};
// accelerating travel (constant force from rest): s = 0.5 * a * tau^2, capped at sMax
const travel = (t, t0, dur, sMax) => { const u = M.clamp((t - t0) / dur); return sMax * u * u; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '150px';
  let fs = 150; if (ti.offsetWidth > 1560) fs = Math.floor(150 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 40, ex: 160, ey: 152, es: 64 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 140 };
  const g = $('#tdimG'), x0 = geo.sx, x1 = geo.sx + w, y = geo.sy + h + 34;
  g.innerHTML = `<line id="dl" x1="${x0 + 2}" y1="${y}" x2="${x1 - 2}" y2="${y}"/><line x1="${x0}" y1="${y - 26}" x2="${x0}" y2="${y + 14}"/><line x1="${x1}" y1="${y - 26}" x2="${x1}" y2="${y + 14}"/><path d="M${x0} ${y} l18 -6 v12z" fill="#6C7886" stroke="none"/><path d="M${x1} ${y} l-18 -6 v12z" fill="#6C7886" stroke="none"/>`;
  $('#sub').style.top = (y + 34) + 'px';
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const nc = $('#ncp'); nc.style.left = (1760 - nc.offsetWidth) + 'px'; nc.style.top = '162px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 14; }
  const tk = $('#tgK'); tk.style.left = '120px'; tk.style.top = '112px'; const ts = $('#tgS'); ts.style.left = (1600 - 120 - ts.offsetWidth) + 'px'; ts.style.top = '112px';
  const s0 = $('#sw0'); $('#swA').style.left = (36 + s0.offsetWidth + 14) + 'px'; $('#sw1').style.left = (36 + s0.offsetWidth + 98) + 'px';
  for (let i = 0; i < 4; i++) { const q = $('#ql' + i); if (q.offsetWidth > 688) q.style.fontSize = Math.floor(31 * 688 / q.offsetWidth) + 'px'; }
  const v = $('#vec'); if (v.offsetWidth > 440) v.style.fontSize = Math.floor(24 * 440 / v.offsetWidth) + 'px';
  document.querySelectorAll('#kPans .pt').forEach(e => { if (e.offsetWidth > 848) e.style.fontSize = Math.floor(92 * 848 / e.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(e => { if (e.offsetWidth > 748) e.style.fontSize = Math.floor(30 * 748 / e.offsetWidth) + 'px'; });
  ['#qq1', '#qq2'].forEach(s => { const e = $(s); if (e.offsetWidth > 1420) e.style.fontSize = Math.floor(70 * 1420 / e.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 14; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es.toFixed(4)})` : `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = (m >= 1 ? 160 : M.lerp(960 - geo.cw / 2, 160, m)).toFixed(2) + 'px'; ey.style.top = (m >= 1 ? 96 : M.lerp(geo.cy, 96, m)).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#dl'), t, 0.9, 0.7, M.o3);
  M.vis($('#tdim'), t, 0.85, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  const exOn = t < tT ? [tF1 + 0.3, tMout] : [tK0 + 0.3, tKout];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: the dead auto swerves ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tMorph + 0.18, tAout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tSwv - 0.2);
    M.vis($('#illImg'), t, tMorph + 0.4, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#tgK'), t, tKir - 0.05, tSwv - 0.4, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#tgS'), t, tSal - 0.05, tSwv - 0.4, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.9, ody: 0 });
    M.vis($('#path'), t, tSwv + 0.15, tAout, { dx: 60, dy: 0, ...o });
    // the auto drifts toward the wall along a curve, speeding up
    const u = M.clamp((t - tSwv - 0.45) / 2.2), s = u * u;
    const px = 110 + 520 * s, py = 190 - 70 * s * s, hd = Math.atan2(-140 * s, 520) * 180 / PI;
    attr($('#pauto'), 'transform', `translate(${f2(px)} ${f2(py)}) rotate(${f2(hd)})`);
    let d = ''; for (let k = 0; k <= 24; k++) { const ss = (k / 24) * s; d += (k ? 'L' : 'M') + f2(110 + 520 * ss) + ' ' + f2(190 - 70 * ss * ss); }
    attr($('#trail'), 'd', d);
    M.vis($('#ask'), t, tC2 + 0.05, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tPushed - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mt1'), t, tPushed + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mt2'), t, tForgot - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tForgot + 0.3, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L: meet Salim Auto Works ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill2'); M.vis(ill, t, tL1 + 0.1, tLout, { dy: 36, ...o }); grow(ill, $('#ill2Out'), t, tL2);
    M.vis($('#ill2Img'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#team'), t, tL2 + 0.12, tLout, { dx: 60, dy: 0, ...o });
    const tTv = [tLsal - 0.05, tLkir - 0.05, tLpri - 0.05, tLraj - 0.05, tLfar - 0.05];
    TEAM.forEach((_, i) => {
      M.vis($('#tv' + i), t, Math.max(tTv[i], tL2 + 0.3), 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#tn' + i), t, Math.max(tTv[i], tL2 + 0.3) + 0.08, 1e9, { dy: 10 }); M.vis($('#tr' + i), t, Math.max(tTv[i], tL2 + 0.3) + 0.14, 1e9, { dy: 8 });
    });
    M.vis($('#proj'), t, tL3 + 0.05, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#pj0'), t, tL3 + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#pjA'), t, tLel - 0.3, 1e9, { dx: -12, dy: 0, fade: 0.15 });
    M.vis($('#pj1'), t, tLel - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#pjT'), t, tLbij - 0.25, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== D: what is engineering mechanics ===== */
  const dOn = t >= tD1 - 0.1 && t < tF1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const kq = $('#kq'); M.vis(kq, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(kq, $('#kqOut'), t, tD4);
    M.vis($('#bookS'), t, tD2 + 0.25, 1e9, { dy: 20, sp: M.SOFT });
    ['bl1', 'bl2', 'bl3'].forEach((id, k) => M.vis($('#' + id), t, tD2 + 0.5 + k * 0.08, 1e9, { dy: 0, fade: 0.15 }));
    M.rise($('#kot1'), t, tHib - 0.3, { st: 0.06, sp: M.HEAVY });
    M.vis($('#kbk'), t, tHib + 0.3, 1e9, { dy: 10 });
    M.vis($('#kqHr'), t, tQl - 0.3, 1e9, { dy: 0 });
    for (let i = 0; i < 4; i++) { const q = $('#ql' + i); M.vis(q, t, tQl - 0.2 + i * 0.1, 1e9, { dy: 14 }); q.style.color = mix(C.dim, C.steel, M.io((t - tQl - i * 0.7) / 0.3)); }
    tHl.forEach((th, i) => { const u = M.io((t - th + 0.05) / 0.3); $('#hl' + i).style.color = u <= 0 ? '' : mix(C.steel, C.orange, u); });
    M.vis($('#br'), t, tD4 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    M.vis($('#bx0'), t, tD4 + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.draw($('#brL0'), t, tSta - 0.35, 0.35, M.o3); M.draw($('#brL1'), t, tDyn - 0.35, 0.35, M.o3);
    M.vis($('#bx1'), t, tSta - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#bx2'), t, tDyn - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    for (const [k, tk, tn] of [[1, tSta, tDyn], [2, tDyn, tD5]]) { const on = M.io((t - tk) / 0.25) * (1 - M.io((t - tn) / 0.3)); const b = $('#bx' + k); b.style.background = mix(C.track, C.orange, on); b.style.color = mix(C.steel, '#fff', on); b.querySelector('small').style.color = mix(C.mid, '#fff', on); }
    M.vis($('#sw'), t, tD5 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#sw0'), t, tSw[0] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#swA'), t, tSw[1] - 0.3, 1e9, { dx: -12, dy: 0, fade: 0.15 });
    M.vis($('#sw1'), t, tSw[1] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#swN'), t, tSw[1] + 0.5, 1e9, { dy: 10 });
  }

  /* ===== F: what is a force ===== */
  const fOn = t >= tF1 - 0.1 && t < tM1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fc'), t, tF1 + 0.1, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#sideAuto'), t, tF1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    drawArrow($('#fPush'), t, tPush - 0.1); M.vis($('#fl0'), t, tPush, tSize - 0.2, { dy: 10, outDur: 0.2, ody: 0 });
    $('#fPush').style.opacity = (1 - M.clamp((t - tSize + 0.3) / 0.25)).toFixed(3);
    drawArrow($('#fPull'), t, tPull - 0.1);
    M.vis($('#fl1'), t, tSize - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#fl2'), t, tDir - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#fPt'), t, tPoint - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.vis($('#fl3'), t, tPoint + 0.05, 1e9, { dy: 10 });
    M.draw($('#loa'), t, tLine - 0.4, 0.6, M.o3); M.vis($('#fl4'), t, tLine - 0.05, 1e9, { dy: 10 });
    if (t > tArr && t < tArr + 0.6) $('#fPull').setAttribute('transform', `translate(${(10 * Math.sin(PI * (t - tArr) / 0.6)).toFixed(2)} 0)`); else attr($('#fPull'), 'transform', 'translate(0 0)');
    M.vis($('#un'), t, tNewt - 0.1, tFout, { dx: 60, dy: 0, ...o });
    M.rise($('#unN'), t, tNewt + 0.1, { st: 0.07, sp: M.HEAVY }); M.vis($('#unE'), t, tNewt + 0.5, 1e9, { dy: 12 });
    M.vis($('#apple'), t, tApple - 0.3, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    M.vis($('#unA'), t, tApple - 0.1, 1e9, { dy: 12 }); M.vis($('#unC'), t, tApple + 0.4, 1e9, { dy: 8 });
    M.vis($('#vec'), t, tVec - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== M: the push, replayed (process) ===== */
  const mOn = t >= tM1 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    const mL = $('#mL'); M.vis(mL, t, tM1 + 0.1, tMout, { dy: 36, ...o }); grow(mL, $('#mLOut'), t, tM6 - 0.1);
    M.vis($('#mR'), t, tM6 + 0.1, tMout, { dx: 60, dy: 0, ...o });
    for (const k of ['L', 'R']) {
      const base = k === 'L' ? tM1 + 0.3 : tM6 + 0.3, root = $('#m' + k + 'In');
      M.vis(root.querySelector('.mav'), t, base, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(root.querySelector('.mlb'), t, base + 0.08, 1e9, { dy: 10 });
      M.vis($('#plan' + k), t, base + 0.1, 1e9, { dy: 20, sp: M.SOFT });
      M.vis($('#ro' + k + '0'), t, base + 0.35, 1e9, { dy: 10 }); M.vis($('#ro' + k + '1'), t, base + 0.42, 1e9, { dy: 10 });
      M.vis($('#ms' + k), t, base + 0.45, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.1 });
    }
    // LEFT: angled rope
    drawArrow($('#vPL'), t, tKp - 0.1); M.vis($('#tPL'), t, tKp + 0.2, 1e9, { dy: 0, fade: 0.15 });
    drawArrow($('#vSL'), t, tSp - 0.1); M.vis($('#tSL'), t, tThirty, 1e9, { dy: 0, fade: 0.15 });
    { const u = M.clamp((t - tTip) / 0.25); $('#vCL').setAttribute('opacity', u.toFixed(3)); if (u > 0) drawArrow($('#vSL2'), t, tTip); }
    drawArrow($('#vRL'), t, tRes - 0.1); M.vis($('#tRL'), t, tEight - 0.2, 1e9, { dy: 0, fade: 0.15 });
    // drift: the whole auto + its resultant travel along the resultant line, speeding up
    const sL = travel(t, tDrift - 0.1, 2.6, 300), dxL = RU[0] * sL, dyL = RU[1] * sL;
    const hdg = M.io((t - tDrift + 0.1) / 0.6) * Math.atan2(RU[1], RU[0]) * 180 / PI;
    attr($('#carL'), 'transform', `translate(${f2(HX - 48 + dxL)} ${f2(HY + dyL)}) rotate(${f2(hdg)} 48 0)`);
    attr($('#vecL'), 'transform', `translate(${f2(dxL)} ${f2(dyL)})`);
    $('#vgL').setAttribute('opacity', (1 - M.clamp((t - tDrift + 0.1) / 0.3)).toFixed(3));
    ['tPL', 'tSL'].forEach(id => { $('#' + id).style.opacity = (1 - M.clamp((t - tDrift + 0.1) / 0.3)).toFixed(3); });
    attr($('#trL'), 'd', sL > 1 ? `M${HX} ${HY} L${f2(HX + dxL)} ${f2(HY + dyL)}` : '');
    const fwdL = M.lerp(0, 459.8, M.io((t - tRes) / 0.5)), sideL = M.lerp(0, 150, M.io((t - tRes) / 0.5));
    M.setT($('#rnL0'), Math.round(fwdL) + ' N'); M.setT($('#rnL1'), Math.round(sideL) + ' N');
    $('#rnL1').style.color = t > tSide ? C.orange : C.steel; $('#roL1').style.background = mix(C.track, C.soft, M.io((t - tSide) / 0.3));
    if (t >= tDrift) pill('L', 'x', 'Drifts toward the wall', 2);
    else if (t >= tTip) pill('L', 'move', 'Tip to tail: R = 484 N at 18°', 0);
    else if (t >= tSp) pill('L', 'move', 'Salim pulls 300 N at 30°', 0);
    else pill('L', 'move', 'Kiran pushes 200 N', 0);
    // RIGHT: straight rope
    drawArrow($('#vPR'), t, tM6 + 0.5); M.vis($('#tPR'), t, tM6 + 0.8, 1e9, { dy: 0, fade: 0.15 });
    { const u = M.clamp((t - tStr) / 0.25); $('#vCR').setAttribute('opacity', u.toFixed(3)); if (u > 0) drawArrow($('#vSR'), t, tStr); }
    M.vis($('#tSR'), t, tStr + 0.3, 1e9, { dy: 0, fade: 0.15 }); M.vis($('#tRR'), t, tFive - 0.1, 1e9, { dy: 0, fade: 0.15 });
    const sR = travel(t, tFwd - 0.2, 2.2, 340);
    attr($('#carR'), 'transform', `translate(${f2(HX - 48 + sR)} ${HY})`); attr($('#vecR'), 'transform', `translate(${f2(sR)} 0)`);
    attr($('#trR'), 'd', sR > 1 ? `M${HX} ${HY} L${f2(HX + sR)} ${HY}` : '');
    M.setT($('#rnR0'), Math.round(M.lerp(0, 500, M.io((t - tAdd) / 0.6))) + ' N'); M.setT($('#rnR1'), '0 N');
    $('#rnR0').style.color = t > tFive ? C.orange : C.steel; $('#roR0').style.background = mix(C.track, C.soft, M.io((t - tFive) / 0.3));
    if (t >= tFive) pill('R', 'check', '500 N, all forward', 1);
    else if (t >= tAdd) pill('R', 'move', 'Same line: 200 + 300', 0);
    else pill('R', 'move', 'Salim pulls straight', 0);
  }

  /* ===== statement (steel sweep) ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.2, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== P: force systems ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    FS.forEach((_, i) => {
      const e = $('#fs' + i), ta = tP[i], td = i < 3 ? tP[i + 1] : tPout + 1;
      M.vis(e, t, tS0 + 0.1 + i * 0.08, tPout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), seen = t >= ta;
      const bg = e.querySelector('.bg'); bg.style.borderColor = mix(C.line, C.orange, act); bg.style.borderWidth = act > 0.5 ? '4px' : '2px';
      e.querySelector('.tt').style.color = seen ? C.steel : C.dim; e.querySelector('.ds').style.color = seen ? C.steel2 : C.dim;
      e.querySelector('.nm').style.color = act > 0.5 ? C.orange : C.mid;
      e.querySelectorAll('svg > g').forEach((g, k) => drawArrow(g, t, ta + 0.1 + k * 0.12, 0.35));
      M.vis(e.querySelector('.ex'), t, tPex[i] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    });
    M.vis($('#ncp'), t, tCop - 0.3, tPout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...o });
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const e = $('#kr' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : tKout + 1;
      M.vis(e, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      e.querySelector('.bg').style.background = mix(C.track, C.steel, act);
      e.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.steel, off);
      e.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.orange, C.mid, off);
      e.querySelector('.ri').style.background = mix('#fff', C.steel2, act);
      setIco(e.querySelector('.ri'), ic, t < ta ? C.dim : C.orange, 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
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
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * PI / 180;
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
      g.style.background = C.track; g.style.color = C.steel; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#fact'), t, tX4 + 0.3, 1e9, { dy: 16 });
    M.vis($('#xr0'), t, tRule - 0.2, 1e9, { dx: 24, dy: 0 });
    M.vis($('#xr1'), t, tDraw - 0.2, 1e9, { dx: 24, dy: 0 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'What') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((_, i) => {
      const e = $('#o' + i); M.vis(e, t, tQ + 1.5 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAns) / 0.3), bg = e.querySelector('.bg');
      bg.style.background = right ? mix(C.card, C.steel, r) : mix(C.card, '#EEF0F3', r);
      bg.style.borderColor = right ? mix(C.line, C.steel, r) : C.line;
      e.querySelector('.ot').style.color = right ? mix(C.steel, '#fff', r) : mix(C.steel, C.dim, r);
      const lt = e.querySelector('.lt'); lt.style.borderColor = right ? mix(C.steel, C.orange, r) : mix(C.steel, C.dim, r); lt.style.color = right ? mix(C.steel, '#fff', r) : mix(C.steel, C.dim, r);
      const ok = e.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) e.style.transform = `scale(${(1 + 0.05 * Math.sin(PI * (t - tAns) / 0.45)).toFixed(4)})`;
      else if (right && t >= tAns + 0.45 && e.style.transform !== 'none') e.style.transform = 'none';
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
        const e = $('#fp' + i + k), tp = tPill[i][k]; M.vis(e, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const a = tp - 0.05, b = k < ps.length - 1 ? tPill[i][k + 1] - 0.05 : (i < 2 ? tRow[i + 1] - 0.2 : tN - 0.4);
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        e.style.background = mix(mix(C.track, C.orange, g), C.steel, d);
        e.style.color = g > 0.5 ? '#fff' : C.steel;
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
M.outro({ bg: '#2E3742', ink: '#E9ECEF', accent: '#FF6A13', sub: 'rgba(255,255,255,.6)', font: 'Barlow' });
})();
