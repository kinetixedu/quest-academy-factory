// MBA - Principles of Management, Ep 24: Bounded Rationality
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  brain: ['M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z', 'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z', 'M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4', 'M17.599 6.5a3 3 0 0 0 .399-1.375', 'M6.003 5.125A3 3 0 0 0 6.401 6.5', 'M3.477 10.896a4 4 0 0 1 .585-.396', 'M19.938 10.5a4 4 0 0 1 .585.396', 'M6 18a4 4 0 0 1-1.967-.516', 'M19.967 17.484A4 4 0 0 1 18 18'],
  eyeOff: ['M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49', 'M14.084 14.158a3 3 0 0 1-4.242-4.242', 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143', 'm2 2 20 20'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  bounds: ['M5 3a2 2 0 0 0-2 2', 'M19 3a2 2 0 0 1 2 2', 'M21 19a2 2 0 0 1-2 2', 'M5 21a2 2 0 0 1-2-2', 'M9 3h1', 'M9 21h1', 'M14 3h1', 'M14 21h1', 'M3 9v1', 'M21 9v1', 'M3 14v1', 'M21 14v1'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  pen: ['M12 20h9', 'M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z'],
  thumbUp: ['M7 10v12', 'M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFour = wt('H2', 'four'), tWhich = wt('H2', 'Which');
const tBad = [wt('C1', 'check'), wt('C2', 'whole'), wt('C3', 'already')];
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tLit = [wt('D2', 'rational', 1), wt('D2', 'limits')], tD3 = T0('D3'), tSimon = wt('D3', 'Herbert');
const tMs = [wt('D4', '1947'), wt('D4', 'named'), wt('D6', '1978')], tNobel = wt('D6', 'Nobel'), tDout = T0('B0') - 0.32;
const tB0 = T0('B0'), tB = [T0('B1'), T0('B2'), T0('B3')], tBa = [wt('B1', 'Ravi'), wt('B2', 'A', 1), wt('B3', 'Nobody')], tBout = T0('K0') - 0.32;
const tK0 = T0('K0'), tThey = wt('K0', 'They'), tK1 = T0('K1'), tKw = [wt('K1', 'satisfy'), wt('K1', 'suffice')], tK2 = T0('K2'), tGood = wt('K2', 'good'), tKout = T0('G0') - 0.32;
const tG0 = T0('G0'), tG1 = T0('G1'), tMust = [wt('G2', 'Lots'), wt('G2', 'Rent'), wt('G2', 'No')];
const tSmall = wt('G3', 'small'), tPins = wt('G3', 'street');
const tSt = [T0('G4'), T0('G5'), T0('G6')], tG7 = T0('G7'), tStops = wt('G7', 'stops'), tThree = wt('G7', 'Three'), tGout = T0('R0') - 0.32;
const CELL = [   // [time, state] per row (people, rent, no stall) per street. state: 1 ok, -1 fail, 0 skipped
  [[wt('G4', 'busy'), 1], [wt('G5', 'two') + 0.25, 1], [wt('G6', 'passes'), 1]],
  [[wt('G4', 'rent'), -1], [wt('G5', 'cheap'), 1], [wt('G6', 'passes') + 0.14, 1]],
  [[wt('G4', 'high') + 0.25, 0], [wt('G5', 'chai'), -1], [wt('G6', 'passes') + 0.28, 1]]];
const tVerdict = [wt('G4', 'rent'), wt('G5', 'chai'), wt('G6', 'passes') + 0.28];
const tR0 = T0('R0'), tRa = [wt('R1', 'rational'), wt('R2', 'Bounded')], tRd = [T0('R2'), T0('R3')], tRp = [wt('R1', 'unlimited'), wt('R2', 'stops')];
const tR3 = T0('R3'), tLazy = wt('R3', 'That');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAnsQ = T0('A1') - 0.02, tTakeQ = wt('A1', 'She');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['information', 'time', 'brain'].map(w => wt('S2', w)), ['first', 'good'].map(w => wt('S3', w)), [wt('S4', 'Nobel')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#pDI').innerHTML = M.icon('store', 22, C.ink, 2.2); $('#pNI').innerHTML = M.icon('pin', 22, C.gold, 2.2); $('#pQ').innerHTML = M.icon('help', 36, C.gold, 2.2);
const BAD = [['search', 'Check every', 'single street'], ['calendar', 'Takes a', 'whole year'], ['store', 'Good shops', 'already gone']];
$('#jobRow').innerHTML = BAD.map(([ic, a, b], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji"></div><div class="jt" style="top:90px">${a}</div><div class="jt" style="top:124px">${b}</div></div>`).join('');
// definition
$('#defI').innerHTML = M.icon('bounds', 36, C.gold, 2.2);
const DW = [['target', 'Rational', 'Weigh it all, pick the best', 'WHAT WE WANT', 'The perfect choice'], ['bounds', 'Limited', 'Our thinking has bounds', 'WHAT WE GET', 'Limits, or bounds']];
$('#dRow').innerHTML = DW.map(([ic, q, s, x, a], i) => `<div class="qw wide" id="dw${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="qi"></div><div class="qn">0${i + 1}</div><div class="serif qt">${q}</div><div class="qs">${s}</div><div class="hr"></div><div class="qx">${x}</div><div class="qa">${a}</div></div>`).join('');
$('#sNI').innerHTML = M.icon('award', 22, '#fff', 2.4);
const MS = [['1947', 'THE BOOK', 'Administrative', 'Behavior'], ['1950s', 'THE NAME', 'Bounded', 'rationality'], ['1978', 'THE PRIZE', 'Nobel Prize', 'in Economics']];
const MX = [176, 528, 880];
$('#msRow').innerHTML = MS.map(([y, l, a, b], i) => `<div class="ms" id="ms${i}" style="left:${MX[i] - 160}px"><div class="serif yr">${y}</div><div class="ml">${l}</div><div class="m1">${a}</div><div class="m2">${b}</div></div>`).join('');
$('#tlDots').innerHTML = MX.map((x, i) => `<g id="dot${i}" transform="translate(${x} 232)"><circle r="16" fill="#fff" stroke="#E2DACB" stroke-width="6"/></g>`).join('');
// three bounds
$('#bbI').innerHTML = M.icon('bounds', 36, C.gold, 2.2);
const BW = [['eyeOff', 'Information', 'Never complete', "Can't know every street"], ['timer', 'Time', 'Always limited', 'Good shops go in days'], ['brain', 'Brain power', 'Only so much', "Can't compare 4,000"]];
$('#bRow').innerHTML = BW.map(([ic, q, s, a], i) => `<div class="qw" id="bw${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="qi"></div><div class="qn">0${i + 1}</div><div class="serif qt">${q}</div><div class="qs">${s}</div><div class="hr"></div><div class="qx">AT CHAI CORNER</div><div class="qa">${a}</div></div>`).join('');
// satisfice: two words become one
const KW = [['smile', 'Satisfy', 'Be happy with it', '<span class="acc">satis</span><span class="kd">fy</span>'], ['check', 'Suffice', 'Be enough', '<span class="kd">suf</span><span class="acc">fice</span>']];
$('#kRow').innerHTML = KW.map(([ic, t, m, w], i) => `<div class="ee" id="ke${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">THE PART SIMON KEPT</div><div class="serif kv">${w}</div></div>`).join('');
$('#kbI').innerHTML = M.icon('thumbUp', 40, C.gold2, 2.2);
// the map (card 784 x 580; map area x 32..752, y 32..548)
const MX0 = 32, MY0 = 32, MW = 720, MH = 516, ST = 18, NC = 8, NR = 6, BWD = (MW - ST * (NC + 1)) / NC, BHT = (MH - ST * (NR + 1)) / NR;
const vx = k => MX0 + ST / 2 + k * (BWD + ST), hy = k => MY0 + ST / 2 + k * (BHT + ST);
const PARK = { '1,1': 1, '6,4': 1, '2,4': 1 };
const blocks = (fill, park) => { let s = ''; for (let r = 0; r < NR; r++) for (let c = 0; c < NC; c++) s += `<rect x="${(MX0 + ST + c * (BWD + ST)).toFixed(2)}" y="${(MY0 + ST + r * (BHT + ST)).toFixed(2)}" width="${BWD.toFixed(2)}" height="${BHT.toFixed(2)}" rx="8" fill="${PARK[c + ',' + r] ? park : fill}"${PARK[c + ',' + r] ? ' data-p="1"' : ''}/>`; return s; };
const SC = [vx(5), hy(3)], SR = 168;                               // search area centre + radius
const PIN = [[vx(4), hy(2)], [vx(6), hy(2)], [vx(5), hy(4)]];
$('#mapSvg').innerHTML = `<defs><clipPath id="mClip"><rect x="${MX0}" y="${MY0}" width="${MW}" height="${MH}" rx="20"/></clipPath><clipPath id="spot"><circle id="spC" cx="${SC[0]}" cy="${SC[1]}" r="600"/></clipPath></defs>` +
  `<g clip-path="url(#mClip)"><rect id="nightBg" x="${MX0}" y="${MY0}" width="${MW}" height="${MH}" fill="#FBF8F1"/><g id="night">${blocks('#EEE8DB', '#F3EAD6')}</g>` +
  `<g clip-path="url(#spot)"><rect x="${MX0}" y="${MY0}" width="${MW}" height="${MH}" fill="#FFFFFF"/>${blocks('#EEE8DB', '#F3EAD6')}</g>` +
  `<circle id="spR" cx="${SC[0]}" cy="${SC[1]}" r="${SR}" fill="none" stroke="#B8862F" stroke-width="5" stroke-dasharray="14 12" stroke-linecap="round"/>` +
  `<circle id="focus" r="40" fill="none" stroke="#14213D" stroke-width="5"/>` +
  PIN.map(([x, y], i) => `<g id="pin${i}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><g class="pb"><ellipse cx="0" cy="0" rx="12" ry="5" fill="#14213D" opacity=".18"/><path d="M0 0 C-6 -12 -22 -22 -22 -38 A22 22 0 1 1 22 -38 C22 -22 6 -12 0 0 Z" fill="#14213D"/><text class="pn" x="0" y="-30.5" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#fff">${i + 1}</text><g class="pk" transform="translate(-11 -49)"></g></g></g>`).join('') + `</g>`;
$('#mCI').innerHTML = M.icon('map', 22, C.gold, 2.2); $('#mNI').innerHTML = M.icon('search', 24, C.gold, 2.4);
// must haves
const MUST = [['users', 'Lots of people walking by'], ['coin', 'Rent under ₹50,000'], ['store', 'No chai stall nearby']];
const CX3 = [552, 628, 704];
$('#chs').innerHTML = CX3.map((x, k) => `<div class="ch" id="ch${k}" style="left:${x - 24}px">${k + 1}</div>`).join('');
$('#mRows').innerHTML = MUST.map(([ic, tx], i) => `<div class="mr" id="mr${i}" style="top:${100 + i * 124}px"><i>${M.icon(ic, 28, C.gold, 2.2)}</i><div class="mt">${tx}</div>${CX3.map((x, k) => `<div class="cl" id="cl${i}${k}" style="left:${x - 32 - 24}px"></div>`).join('')}</div>`).join('');
$('#mRI').innerHTML = M.icon('pen', 30, C.gold2, 2.2);
// rational vs bounded
const RW = [['target', 'Rational model', 'Optimises: finds the very best', 'Check all 4,000 streets', 'x', 'Takes a whole year'], ['search', 'Bounded rationality', 'Satisfices: stops at good enough', 'Stop at street 3', 'check', 'Signed in one week']];
$('#rRow').innerHTML = RW.map(([ic, t, m, v, pi, p], i) => `<div class="ee" id="re${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">AT CHAI CORNER</div><div class="ev">${v}</div><div class="pill" style="${i ? 'background:#B8862F;color:#fff' : 'background:#F6E3DC;color:#B5482F'}"><span>${M.icon(pi, 22, i ? '#fff' : C.red, 2.6)}</span>${p}</div></div>`).join('');
$('#rbI').innerHTML = M.icon('users', 40, C.gold2, 2.2); $('#rbI2').innerHTML = M.icon('bulb', 40, C.gold2, 2.2);
// quiz
const OPTS = ['Optimising', 'Satisficing', 'Delegating', 'Guessing'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('thumbUp', 44, C.gold2, 2.4);
// recap
const ROWS = [['brain', 'Three bounds', ['Information', 'Time', 'Brain power']], ['thumbUp', 'Satisfice', ['First option', 'Good enough']], ['award', 'Herbert Simon', ['Nobel Prize 1978']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.3) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.35));
const spR = M.track(600, [[tSmall, SR, M.HEAVY]]);
const fX = M.track(PIN[0][0], [[tSt[1], PIN[1][0], M.SOFT], [tSt[2], PIN[2][0], M.SOFT]]), fY = M.track(PIN[0][1], [[tSt[1], PIN[1][1], M.SOFT], [tSt[2], PIN[2][1], M.SOFT]]);
const tlU = M.track(0, [[tMs[1] - 0.1, 0.5, M.SOFT], [tMs[2] - 0.1, 1, M.SOFT]]);
const pulse = (el, t, tk, amp = 0.05, d = 0.45) => { if (t >= tk && t < tk + d) el.style.transform = `scale(${(1 + amp * Math.sin(Math.PI * (t - tk) / d)).toFixed(4)})`; else if (t >= tk + d && el.style.transform !== 'none') el.style.transform = 'none'; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  $('#pQ').style.left = (36 + $('#pT').offsetWidth + 28) + 'px';
  $('#pNo').style.left = (36 + $('#pDay').offsetWidth + 24) + 'px';
  { const d = $('#dq'); if (d.offsetWidth > 1600) d.style.fontSize = Math.floor(92 * 1600 / d.scrollWidth) + 'px'; }
  ['#re0', '#re1', '#ke0', '#ke1'].forEach(id => { const e = $(id + ' .et'); if (e.offsetWidth > 568) e.style.fontSize = Math.floor(64 * 568 / e.offsetWidth) + 'px'; });
  { const q = $('#qq1'); if (q.offsetWidth > 1400) q.style.fontSize = Math.floor(68 * 1400 / q.offsetWidth) + 'px'; }
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  ROWS.forEach(([, , ps], i) => { let px = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = px + 'px'; px += p.offsetWidth + 16; }); });
}
// two-state card (Ep 19 style): dim -> lit navy while active -> settled white
const litCard = (el, t, ta, td, ic, opt = {}) => {
  const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off), lit = t >= ta;
  const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
  el.querySelector('.qt').style.color = !lit ? C.dim : mix(C.ink, '#fff', act);
  el.querySelector('.qs').style.color = !lit ? C.dim : mix(C.ink2, C.gold2, act);
  el.querySelector('.qi').style.background = mix(C.paper, C.navy2, act);
  setIco(el.querySelector('.qi'), ic, !lit ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 40, 2.2);
  el.querySelector('.qn').style.color = !lit ? C.dim : C.gold;
  el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
  const qx = el.querySelector('.qx'); M.vis(qx, t, ta - 0.1, 1e9, { dy: 10 }); qx.style.color = mix(C.muted, '#8C96AE', act);
  const qa = el.querySelector('.qa'); M.rise(qa, t, opt.ta ?? ta, { st: 0.05 }); qa.style.color = mix(C.ink, '#fff', act);
  const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
  if (t > opt.t0 + 1 && t < opt.tout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
};
const litEE = (el, t, ta, td, ic) => {   // navy highlight for the .ee cards
  const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
  const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
  el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
  const em = el.querySelector('.em'); M.rise(em, t, ta + 0.1, { st: 0.04 }); em.style.color = mix(C.gold2, C.gold, off);
  el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
  setIco(el.querySelector('.ico'), ic, t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 48, 2);
  el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
  const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.45, 1e9, { dy: 10 }); ex.style.color = mix('#8C96AE', C.muted, off);
  return { act, off };
};

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header (one element travels, never cut) */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  const exOn = t < tTu ? [tFour + 0.2, tT - 0.05] : [tMust[1], tQ - 0.45];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: where should outlet 6 go? ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // next outlet card
    M.vis($('#plan'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.vis($('#pDay'), t, tMorph + 0.55, 1e9, { dy: 16 });
    M.rise($('#pT'), t, tMorph + 0.45, { st: 0.08, sp: M.HEAVY });
    M.vis($('#pNo'), t, tFour - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#pQ'), t, tWhich - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    // the rational way
    M.vis($('#wrong'), t, tBad[0] - 0.5, 1e9, { dy: 36 });
    BAD.forEach(([ic], i) => {
      const el = $('#job' + i); M.vis(el, t, tBad[i] - 0.05, 1e9, { dy: 24, sp: M.SOFT });
      const red = i > 0 ? M.io((t - tBad[i]) / 0.35) : 0;
      el.style.background = mix(C.paper, C.redBg, red);
      setIco(el.querySelector('.ji'), ic, i ? C.red : C.gold, 26, 2.2);
      el.querySelectorAll('.jt').forEach((j, k) => { M.rise(j, t, tBad[i] + 0.08 + k * 0.1, { st: 0.04 }); j.style.color = i ? C.red : C.ink; });
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

  /* ===== D: what is bounded rationality? ===== */
  const dOn = t >= tTu - 0.05 && t < tB0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 }, tSw = tD3 - 0.32;
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.15, tDout, { dy: 24, ...o });
    DW.forEach(([ic], i) => {
      const el = $('#dw' + i); M.vis(el, t, tD2 + 0.3 + i * 0.08, tSw, { dy: 36, ...o });
      litCard(el, t, tLit[i], i ? tSw + 1 : tLit[1], ic, { t0: tD2, tout: tSw });
    });
    // Herbert Simon + timeline
    M.vis($('#simon'), t, tD3 + 0.05, tDout, { dx: -60, dy: 0, ...o });
    M.vis($('#sAv'), t, tSimon - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.rise($('#sNm'), t, tSimon, { st: 0.07, sp: M.HEAVY });
    M.vis($('#sYr'), t, tSimon + 0.4, 1e9, { dy: 10 });
    M.vis($('#simon .hr'), t, tSimon + 0.5, 1e9, { dy: 0 });
    M.vis($('#sBk'), t, tSimon + 0.6, 1e9, { dy: 10 });
    M.rise($('#sBt'), t, tSimon + 0.7, { st: 0.05 });
    M.vis($('#sNob'), t, tNobel - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    pulse($('#sNob'), t, tNobel + 0.3, 0.06);
    M.vis($('#tl'), t, tD3 + 0.17, tDout, { dx: 60, dy: 0, ...o });
    M.draw($('#tlBase'), t, tD3 + 0.5, 0.7, M.io);
    const u = tlU(t), tg = $('#tlGold'); M.hide(tg, u < 0.003); tg.setAttribute('x2', (176 + 704 * Math.min(1, u)).toFixed(2));
    MS.forEach((_, i) => {
      const el = $('#ms' + i), tm = tMs[i], lit = M.io((t - tm) / 0.3);
      M.vis(el.querySelector('.yr'), t, tD3 + 0.6 + i * 0.08, 1e9, { dy: 14 });
      el.querySelector('.yr').style.color = mix(C.dim, i === 2 ? C.gold : C.ink, lit);
      M.vis(el.querySelector('.ml'), t, tm + 0.05, 1e9, { dy: 10 });
      M.rise(el.querySelector('.m1'), t, tm + 0.12, { st: 0.05 });
      M.rise(el.querySelector('.m2'), t, tm + 0.22, { st: 0.05 });
      const d = $('#dot' + i), c = d.querySelector('circle'), p = M.spring(t - tm, M.POP);
      M.vis(d, t, tD3 + 0.7 + i * 0.08, 1e9, { dy: 0, fade: 0.12 });
      c.setAttribute('fill', t >= tm ? C.gold : '#fff'); c.setAttribute('stroke', t >= tm ? C.gold : C.line);
      c.setAttribute('r', (16 + (t >= tm && p < 1 ? 6 * Math.sin(Math.PI * Math.min(1, (t - tm) / 0.45)) : 0)).toFixed(2));
    });
  }

  /* ===== B: three bounds ===== */
  const bOn = t >= tB0 - 0.1 && t < tK0 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#bbar'), t, tB0 + 0.1, tBout, { dy: 24, ...o });
    BW.forEach(([ic], i) => {
      const el = $('#bw' + i); M.vis(el, t, tB0 + 0.3 + i * 0.08, tBout, { dy: 36, ...o });
      litCard(el, t, tB[i], i < 2 ? tB[i + 1] : tBout + 1, ic, { ta: tBa[i], t0: tB0, tout: tBout });
    });
  }

  /* ===== K: satisfice ===== */
  const kOn = t >= tK0 - 0.1 && t < tG0 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#kw'), t, tThey - 0.05, { st: 0.08, sp: M.HEAVY, out: tK1 - 0.12, outDur: 0.3 });
    KW.forEach(([ic], i) => {
      const el = $('#ke' + i), ta = tKw[i], td = i ? tK2 : tKw[1];
      M.vis(el, t, tK1 + 0.1 + i * 0.1, tKout, { dy: 36, ...o });
      litEE(el, t, ta, td, ic);
      const kv = el.querySelector('.kv'); M.rise(kv, t, ta + 0.5, { st: 0.04 });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      el.querySelector('.kd').style.color = mix(C.dim, '#5E6A85', act);
      el.querySelector('.kv .acc').style.color = mix(C.gold, '#E9B95C', act);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tK1 + 1 && t < tKout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#kbar'), t, tKw[1] + 0.45, tKout, { dy: 40, ...o });
    M.vis($('#kbA'), t, tKw[1] + 0.6, tK2 + 0.1, { dy: 14, outDur: 0.25, ody: -14 });
    M.vis($('#kbB'), t, tK2 + 0.35, 1e9, { dy: 14 });
    M.rise($('#kbT'), t, tK2 + 0.4, { st: 0.05 });
    pulse($('#kbar'), t, tGood, 0.02);
  }

  /* ===== G: the bounded search (hero) ===== */
  const gOn = t >= tG0 - 0.1 && t < tR0 + 0.2; M.hide($('#sG'), !gOn);
  if (gOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#map'), t, tG0 + 0.05, tGout, { dx: -60, dy: 0, ...o });
    M.vis($('#must'), t, tG0 + 0.2, tGout, { dx: 60, dy: 0, ...o });
    M.vis($('#mChip'), t, tG0 + 0.5, 1e9, { dy: 12 });
    // the bound: daylight shrinks to one small search area, the rest of the city goes dark
    const r = spR(t), dark = M.io((t - tSmall) / 0.6);
    $('#spC').setAttribute('r', Math.max(1, r).toFixed(2));
    $('#nightBg').setAttribute('fill', mix('#FBF8F1', C.ink, dark));
    $('#night').querySelectorAll('rect').forEach(b => { if (b._d !== dark) { b._d = dark; b.setAttribute('fill', b.dataset.p ? mix(C.gold3, C.navy3, dark) : mix(C.paper2, C.navy2, dark)); } });
    const ring = $('#spR'); M.hide(ring, t < tSmall + 0.25); ring.style.opacity = M.clamp((t - tSmall - 0.25) / 0.3).toFixed(3);
    ring.setAttribute('stroke-dashoffset', (-(t - tSmall) * 10).toFixed(2));
    M.setT($('#mCT'), t < tSmall + 0.3 ? 'THE CITY · 4,000 STREETS' : 'ONE SMALL SEARCH AREA');
    pulse($('#mChip'), t, tSmall + 0.3, 0.05);
    // pins, focus ring and verdicts
    let checked = 0;
    PIN.forEach(([x, y], i) => {
      const g = $('#pin' + i), tp = tPins + i * 0.12, p = M.spring(t - tp, M.POP);
      M.hide(g, t < tp);
      const v = t >= tVerdict[i] ? (i < 2 ? -1 : 1) : 0;
      const sc = (t < tp ? 0 : (0.3 + 0.7 * p)) * (1 + 0.12 * (t >= tSt[i] ? M.spring(t - tSt[i], M.POP) - M.spring(t - tVerdict[i], M.SOFT) : 0));
      g.querySelector('.pb').setAttribute('transform', Math.abs(sc - 1) < 0.0005 ? '' : `scale(${sc.toFixed(4)})`);
      const body = g.querySelector('path');
      body.setAttribute('fill', v === -1 ? C.red : v === 1 ? C.gold : C.ink);
      const pk = g.querySelector('.pk'), pn = g.querySelector('.pn');
      M.hide(pn, v !== 0); if (pk._v !== v) { pk._v = v; pk.innerHTML = v ? M.icon(v === 1 ? 'check' : 'x', 22, '#fff', 3.2) : ''; }
      if (t >= tSt[i]) checked = i + 1;
    });
    const fc = $('#focus');
    fc.setAttribute('cx', fX(t).toFixed(2)); fc.setAttribute('cy', (fY(t) - 34).toFixed(2));
    fc.style.opacity = (M.clamp((t - tSt[0] + 0.05) / 0.2) * (1 - M.io((t - tStops) / 0.3))).toFixed(3);
    M.hide(fc, t < tSt[0] - 0.05 || t > tStops + 0.3);
    M.vis($('#mCnt'), t, tSt[0] - 0.1, 1e9, { dy: 12 });
    M.setT($('#mNT'), `Checked ${checked} of 4,000 streets`);
    $('#mCnt').style.background = t >= tThree ? C.gold : '#fff'; $('#mCnt').style.color = t >= tThree ? '#fff' : C.ink;
    setIco($('#mNI'), t >= tThree ? 'check' : 'search', t >= tThree ? '#fff' : C.gold, 24, t >= tThree ? 2.8 : 2.4);
    pulse($('#mCnt'), t, tThree, 0.06);
    // must-have rows and the check matrix
    CX3.forEach((_, k) => {
      const ch = $('#ch' + k); M.vis(ch, t, tG1 + 0.2 + k * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const active = t >= tSt[k] && t < tVerdict[k] + 0.3, done = t >= tVerdict[k] + 0.3, ok = k === 2;
      ch.style.background = active ? C.ink : done ? (ok ? C.gold : C.redBg) : C.paper;
      ch.style.color = active ? '#fff' : done ? (ok ? '#fff' : C.red) : C.muted;
    });
    MUST.forEach((_, i) => {
      const el = $('#mr' + i); M.vis(el, t, tG1 + 0.35 + i * 0.1, 1e9, { dy: 20 });
      const mt = el.querySelector('.mt'); mt.style.color = t < tMust[i] ? C.dim : C.ink;
      if (t >= tMust[i] && t < tMust[i] + 0.45) el.style.transform = `scale(${(1 + 0.02 * Math.sin(Math.PI * (t - tMust[i]) / 0.45)).toFixed(4)})`; else if (t > tG1 + 1.2 && el.style.transform !== 'none') el.style.transform = 'none';
      setIco(el.querySelector('i'), MUST[i][0], t < tMust[i] ? C.dim : C.gold, 28, 2.2);
      CX3.forEach((_, k) => {
        const cl = $('#cl' + i + k), [tc, s] = CELL[i][k], set = t >= tc;
        M.vis(cl, t, tG1 + 0.5 + i * 0.1 + k * 0.04, 1e9, { dy: 0, sc: 0.7, fade: 0.1 });
        const c = !set ? ['minus', C.line, '#fff', 2.2] : s === 1 ? ['check', '#fff', C.gold, 3] : s === -1 ? ['x', '#fff', C.red, 3] : ['minus', C.dim, C.paper2, 2.6];
        cl.style.background = c[2]; setIco(cl, c[0], c[1], 26, c[3]);
        pulse(cl, t, tc, 0.18, 0.4);
      });
    });
    M.vis($('#mRes'), t, tStops - 0.05, 1e9, { dy: 20 });
  }

  /* ===== R: rational vs bounded ===== */
  const rOn = t >= tR0 - 0.1 && t < tQ + 0.05; M.hide($('#sR'), !rOn);
  if (rOn) {
    RW.forEach(([ic], i) => {
      const el = $('#re' + i), ta = tRa[i], td = tRd[i];
      M.vis(el, t, tR0 + 0.15 + i * 0.1, 1e9, { dy: 36 });
      const { off } = litEE(el, t, ta, td, ic);
      const ev = el.querySelector('.ev'); M.rise(ev, t, ta + 0.55, { st: 0.04 }); ev.style.color = mix('#fff', C.ink, off);
      M.vis(el.querySelector('.pill'), t, tRp[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tR0 + 1) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#rbar'), t, tR3 - 0.05, 1e9, { dy: 40 });
    M.vis($('#rbA'), t, tR3 + 0.1, tLazy - 0.1, { dy: 14, outDur: 0.25, ody: -14 });
    M.vis($('#rbB'), t, tLazy + 0.15, 1e9, { dy: 14 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'What') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'What') + 0.2 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAnsQ) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.card, C.ink, r) : mix(C.card, '#F0EBE1', r);
      bg.style.borderColor = right ? mix(C.line, C.ink, r) : mix(C.line, '#EAE3D6', r);
      el.querySelector('.ot').style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.paper, C.gold, r) : C.paper; lt.style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAnsQ + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAnsQ && t < tAnsQ + 0.45) el.style.transform = `scale(${(1 + 0.05 * Math.sin(Math.PI * (t - tAnsQ) / 0.45)).toFixed(4)})`;
      else if (right && t >= tAnsQ + 0.45 && el.style.transform !== 'none') el.style.transform = 'none';
    });
    const cd = tAnsQ - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAnsQ, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAnsQ, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAnsQ + 0.3);
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
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAnsQ - tCount) / 3, 'tick', 0.28));
M.sfx(tAnsQ + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
