// MBA - Principles of Management, Ep 11: Human Relations Approach - Elton Mayo
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  factory: ['M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M17 18h1', 'M12 18h1', 'M7 18h1'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  meh: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 15h8', 'M9 9h.01', 'M15 9h.01'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  msg: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  apple: ['M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z', 'M10 2c1 .5 2 2 2 5'],
  phone: ['M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tSix = wt('H1', 'six'), tPay = wt('H1', 'pays');
const tQuiet = wt('H2', 'quiet'), tSlow = wt('H2', 'slow'), tMoney = wt('C1', 'money'), tNoth = wt('C1', 'Nothing');
const tSits = wt('C2', 'sits'), tFast = wt('C3', 'faster');
const tT = T0('T1'), tSt2 = wt('T1', 'His'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tNot = wt('D2', 'noticed'), tD3 = T0('D3');
const tDc = [wt('D3', 'Elton'), wt('D3', 'Fritz')], tW1 = T0('W1'), tDout = tW1 - 0.32;
const tWorks = wt('W1', 'Hawthorne'), tChic = wt('W1', 'Chicago'), tW2 = T0('W2'), tYr = wt('W2', '1924'), tFour = wt('W2', 'four');
const tE = [T0('E1'), T0('R1'), T0('I1'), T0('B1')], tF0 = T0('F0'), tWout = tF0 - 0.32;
const tBri = wt('E2', 'Brighter'), tUp1 = wt('E2', 'up'), tDim = wt('E3', 'Dimmer'), tUp2 = wt('E3', 'still'), tE4 = T0('E4');
const tR2 = T0('R2'), tTel = wt('R2', 'telephone'), tCp = [wt('R3', 'breaks'), wt('R3', 'snacks'), wt('R3', 'hours'), wt('R3', 'views')], tR4 = T0('R4'), tOld = wt('R4', 'old');
const tTw = wt('I2', 'twenty'), tAsked = wt('I2', 'asked'), tLis = wt('I3', 'listened'), tBet = wt('I3', 'better');
const tMen = wt('B2', 'Fourteen'), tInf = wt('B3', 'informal'), tUnw = wt('B3', 'unwritten'), tRf = wt('B4', 'fast'), tRs = wt('B4', 'slow'), tPace = wt('B4', 'group');
const tF = [T0('F1'), T0('F2'), T0('F3'), T0('F4')], tHE = wt('F2', 'Hawthorne'), tK1 = T0('K2'), tFout = tK1 - 0.32;
const tK2 = wt('K2', 'holds'), tK3 = T0('K3'), tK4 = T0('K4'), tSixty = wt('K4', 'sixty');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'People');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
const PERSON = `<svg width="100%" height="100%" viewBox="0 0 40 48" fill="currentColor"><circle cx="20" cy="11" r="10"/><path d="M2 47c0-11 8-19 18-19s18 8 18 19z"/></svg>`;
// awning + cups (same stall as Ep 01)
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = []; [[4, 0], [3, 1]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([430 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// the team: six people
const CREW = [['A', 0], ['K', 0], ['M', 0], ['', 1], ['', 1], ['', 1]];
$('#crewRow').innerHTML = CREW.map(([l, nw], i) => `<div class="avc" id="cr${i}" style="left:${248 + i * 106}px">${nw ? '<span class="ico"></span>' : l}</div>`).join('');
$('#pPayI').innerHTML = M.icon('coin', 24, C.gold, 2.2); $('#pMoodI').innerHTML = M.icon('meh', 24, C.muted, 2.2); $('#pChaiI').innerHTML = M.icon('timer', 24, C.red, 2.2);
// what Ravi tries
const ASK = [['More money', 'coin', 'x', 'NO CHANGE'], ['Just listen', 'users', 'check', 'IT WORKS']];
$('#askRow').innerHTML = ASK.map(([t, ic, b, r], i) => `<div class="job" id="ak${i}" style="left:${36 + i * 436}px"><div class="ji">${M.icon(ic, 28, C.ink, 2.2)}</div><div class="jt">${t}</div><div class="av" style="background:${i ? C.gold : C.red}">${M.icon(b, 26, '#fff', 3)}</div><div class="jr" style="color:${i ? C.gold : C.red}">${r}</div></div>`).join('');
// definition + people
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const DC = [['EM', 'Elton Mayo', 'Professor at Harvard', [['BORN', 'Adelaide, Australia, 1880'], ['KNOWN AS', 'Father of human relations']]], ['FR', 'Fritz Roethlisberger', 'His colleague at Harvard', [['ROLE', 'Led much of the factory research'], ['BOOK', 'Management and the Worker, 1939']]]];
$('#dRow').innerHTML = DC.map(([l, t, s, fx], i) => `<div class="card dc" id="dc${i}" style="left:${160 + i * 816}px">${l ? `<div class="avc" style="font-size:24px">${l}</div>` : `<div class="di">${M.icon('factory', 36, C.gold, 2.2)}</div>`}<div class="dn">0${i + 1}</div><div class="serif dt">${t}</div><div class="ds">${s}</div><div class="hr"></div>${fx.map(([a, b], k) => `<div class="fx" style="top:${294 + k * 88}px">${a}</div><div class="fv" style="top:${324 + k * 88}px">${b}</div>`).join('')}</div>`).join('');
// rail: four stages
const STG = ['Lighting tests', 'Relay test room', 'Interviews', 'Bank wiring room'];
$('#rsRow').innerHTML = STG.map((s, i) => `<div class="rs" id="rs${i}" style="left:${i * 400}px"><div class="rc">${i + 1}</div><div class="rt">${s}</div>${i < 3 ? `<div class="rv">${M.icon('arrowR', 24, C.dim, 2.2)}</div>` : ''}</div>`).join('');
// factory
let sw = ''; for (let i = 0; i < 4; i++) { const x = 72 + i * 118; sw += `<path d="M${x} 141 V96 L${x + 118} 141 Z" fill="#14213D"/><path d="M${x + 6} 134 V108" stroke="#E9D9B5" stroke-width="5" stroke-linecap="round"/>`; }
$('#saw').innerHTML = sw;
const WIN = []; for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) WIN.push([98 + c * 76, 158 + r * 40]);
$('#wins').innerHTML = WIN.map(([x, y], i) => `<rect id="wn${i}" x="${x}" y="${y}" width="44" height="28" rx="6" fill="#E9D9B5"/>`).join('');
$('#facYI').innerHTML = M.icon('calendar', 22, C.gold, 2.2);
$('#p0cI').innerHTML = M.icon('factory', 24, C.gold, 2.2);
// stage 1
$('#lrLi').innerHTML = M.icon('bulb', 30, C.gold, 2.2); $('#lrOi').innerHTML = M.icon('chart', 30, C.ink, 2.2);
// stage 2
$('#grpP').innerHTML = Array.from({ length: 6 }, (_, k) => `<div class="pp" id="gp${k}" style="left:${40 + k * 58}px;top:276px">${PERSON}</div>`).join('');
$('#telI').innerHTML = M.icon('phone', 22, C.gold, 2.2);
const CP = [['cup', 'Breaks'], ['apple', 'Snacks'], ['clock', 'Hours'], ['msg', 'Their views']];
$('#cpRow').innerHTML = CP.map(([ic, n], i) => `<div class="pill cp" id="cp${i}">${M.icon(ic, 22, C.gold, 2.2)}<span>${n}</span></div>`).join('');
const CPTS = [[0, 132], [80, 124], [160, 112], [240, 104], [320, 92], [400, 84], [480, 72], [560, 64], [640, 54], [720, 44], [800, 34], [860, 28]];
const segL = []; let totL = 0; for (let i = 1; i < CPTS.length; i++) { const d = Math.hypot(CPTS[i][0] - CPTS[i - 1][0], CPTS[i][1] - CPTS[i - 1][1]); segL.push(d); totL += d; }
$('#cLine').setAttribute('d', 'M' + CPTS.map(p => p.join(' ')).join(' L'));
const ptAt = u => { let L = u * totL; for (let i = 0; i < segL.length; i++) { if (L <= segL[i] || i === segL.length - 1) { const f = Math.min(1, L / segL[i]); return [CPTS[i][0] + (CPTS[i + 1][0] - CPTS[i][0]) * f, CPTS[i][1] + (CPTS[i + 1][1] - CPTS[i][1]) * f]; } L -= segL[i]; } return CPTS[CPTS.length - 1]; };
// stage 3
$('#ivP1I').innerHTML = M.icon('users', 22, C.gold, 2.2); $('#ivP2I').innerHTML = M.icon('smile', 22, C.gold2, 2.2); $('#ivA').innerHTML = M.icon('arrowR', 36, C.gold, 2.4);
// stage 4: fourteen men, two rows of seven
$('#bw').innerHTML = Array.from({ length: 14 }, (_, k) => `<div class="pp" id="bp${k}" style="left:${76 + (k % 7) * 56}px;top:${256 + Math.floor(k / 7) * 64}px">${PERSON}</div>`).join('');
$('#rl0I').innerHTML = M.icon('zap', 22, C.gold, 2.2); $('#rl1I').innerHTML = M.icon('timer', 22, C.gold, 2.2);
// findings
const FD = [['users', 'Social beings', 'People want to belong'], ['eye', 'Attention lifts output', 'Being noticed makes people try harder'], ['network', 'Informal groups', 'They shape how hard people work'], ['coin', 'Money is not everything', 'It matters, but it is not the only motivator']];
$('#fGrid').innerHTML = FD.map(([ic, t, s], i) => `<div class="fc" id="fc${i}" style="left:${160 + (i % 2) * 816}px;top:${270 + Math.floor(i / 2) * 311}px"><div class="bg"></div><div class="fi"><span class="ico"></span></div><div class="fn">0${i + 1}</div><div class="serif ft">${t}</div><div class="fs">${s}</div>${i === 1 ? '<div class="fh">HAWTHORNE EFFECT</div>' : ''}</div>`).join('');
// back at Chai Corner
const KR = [['users', 'Five minute team chat', 'Every morning, everyone speaks'], ['star', 'Thanks Asha by name', 'For her new ginger chai']];
$('#kRows').innerHTML = KR.map(([ic, t, s], i) => `<div class="kr" id="kr${i}" style="top:${108 + i * 120}px"><div class="ki">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="serif kt">${t}</div><div class="ks">${s}</div></div>`).join('');
$('#kTeam').innerHTML = CREW.map(([l, nw], i) => `<div class="avc" id="kt${i}" style="left:${48 + i * 84}px;background:${nw ? C.gold2 : C.gold}">${nw ? M.icon('user', 30, C.gold, 2.2) : l}</div>`).join('') + `<div class="pill" id="kHappy" style="top:448px"><span id="kHappyI"></span><span>Happy team</span></div>`;
$('#kMoreI').innerHTML = M.icon('cup', 24, C.gold, 2.2); $('#kHappyI').innerHTML = M.icon('smile', 24, C.gold, 2.2);
const BARS = [['Before', 400, 40], ['After', 600, 60]];
$('#kBars').innerHTML = BARS.map(([n], k) => `<div class="bar" id="kb${k}" style="top:${130 + k * 160}px"><div class="bl">${n}</div><div class="bt"></div><div class="serif bv"></div></div>`).join('');
// quiz
const OPTS = [['Scalar', 'chain'], ['Hawthorne', 'effect'], ['Red', 'tape'], ['Time', 'study']], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif" style="top:104px">${o[0]}</div><div class="ot serif" style="top:152px">${o[1]}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('eye', 44, C.gold2, 2.4);
// recap
const ROWS = [['factory', 'Hawthorne studies, <span class="acc">1924-1932</span>', ['Near Chicago'], [wt('S2', 'near')]],
  ['users', 'Workers are <span class="acc">social beings</span>', ['Not machines'], [wt('S3', 'machines')]],
  ['eye', '<span class="acc">Attention</span> raises output', ['Belonging', 'Good teams', 'Not just money'], [wt('S4', 'belonging'), wt('S4', 'teams'), wt('S4', 'money')]]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
const light = M.track(0.62, [[tBri, 0.94], [tDim, 0.16], [tE[1], 0.62]], M.SOFT);
const outp = M.track(0.4, [[tUp1, 0.64], [tUp2, 0.86]], M.SOFT);
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // team pills: fixed widths so nothing shifts when the text changes
  const pm = $('#pMood'), pc = $('#pChai');
  M.setT($('#pMoodT'), 'Team: lively'); pm.style.boxSizing = 'border-box'; pm.style.width = pm.offsetWidth + 'px'; M.setT($('#pMoodT'), 'Team: quiet');
  pm.style.left = (36 + $('#pPay').offsetWidth + 16) + 'px';
  pc.style.left = (pm.offsetLeft + pm.offsetWidth + 16) + 'px';
  let x = 40; for (let i = 0; i < 4; i++) { const p = $('#cp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  const a = $('#ivP1').offsetWidth + 40 + 20; $('#ivA').style.left = a + 'px'; $('#ivP2').style.left = (a + 36 + 20) + 'px';
  const kh = $('#kHappy'); kh.style.left = (784 - 48 - kh.offsetWidth) + 'px';
  ROWS.forEach((r, i) => { const rt = $('#rw' + i + ' .rt'); let x2 = 216 + rt.offsetWidth + 40; r[2].forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x2 + 'px'; x2 += p.offsetWidth + 16; }); });
}

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

  /* ===== A: good pay, quiet team ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // team card: six people, quiet until Ravi listens
    M.vis($('#crew'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const sixT = Math.max(tSix, tMorph + 0.45);
    M.setT($('#cN'), String(Math.round(6 * M.o5((t - sixT) / 0.9))));
    CREW.forEach(([, nw], i) => {
      const el = $('#cr' + i); M.vis(el, t, sixT + 0.1 + i * 0.09, 1e9, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1 });
      const g = M.io((t - tFast - i * 0.06) / 0.3);
      el.style.background = nw ? mix(C.paper2, C.gold2, g) : mix(C.paper2, C.gold, g);
      if (nw) setIco(el.querySelector('.ico'), 'user', g > 0.5 ? C.gold : C.dim, 30); else el.style.color = mix(C.dim, '#fff', g);
      if (g > 0 && g < 1) el.style.transform = `scale(${(1 + 0.1 * Math.sin(Math.PI * g)).toFixed(4)})`; else if (t > tFast + 1 && el.style.transform !== 'none') el.style.transform = 'none';
    });
    M.vis($('#pPay'), t, tPay - 0.05, 1e9, { dy: 16 });
    const lv = M.io((t - tFast) / 0.35);
    M.vis($('#pMood'), t, tQuiet - 0.05, 1e9, { dy: 16 });
    M.setT($('#pMoodT'), lv > 0.5 ? 'Team: lively' : 'Team: quiet'); setIco($('#pMoodI'), lv > 0.5 ? 'smile' : 'meh', lv > 0.5 ? C.gold : C.muted, 24);
    M.vis($('#pChai'), t, tSlow - 0.05, 1e9, { dy: 16 });
    const pc = $('#pChai'); pc.style.background = mix(C.redBg, C.ink, lv); pc.style.color = mix(C.red, '#fff', lv);
    M.setT($('#pChaiT'), lv > 0.5 ? 'Chai: fast' : 'Chai: slow'); setIco($('#pChaiI'), lv > 0.5 ? 'zap' : 'timer', lv > 0.5 ? C.gold2 : C.red, 24);
    // what Ravi tries
    M.vis($('#ask'), t, tMoney - 0.3, 1e9, { dy: 36 });
    ASK.forEach((_, i) => {
      const el = $('#ak' + i), ta = i ? tSits - 0.05 : tMoney - 0.05, tb = i ? tFast : tNoth;
      M.vis(el, t, ta, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.av'), t, tb, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      M.vis(el.querySelector('.jr'), t, tb + 0.15, 1e9, { dy: 10 });
    });
  }

  /* ===== statement on navy ===== */
  const sx = sweepX(t);
  const swp = $('#sweep'); M.hide(swp, sx === null); if (sx !== null) swp.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== D: definition + the people behind it ===== */
  const dOn = t >= tTu - 0.05 && t < tW1 + 0.3; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq1'), t, tD1 + 0.05, { st: 0.06, sp: M.HEAVY, out: tD2 - 0.12, outDur: 0.3 });
    M.rise($('#quote1'), t, tD2 + 0.1, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, tNot - 0.05, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    M.vis($('#qby'), t, tNot + 0.6, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tD3 + 0.08, tDout, { dy: 24, ...o });
    DC.forEach((d, i) => {
      const el = $('#dc' + i); M.vis(el, t, tDc[i] - 0.08, tDout, { dy: 30, ...o });
      el.querySelectorAll('.hr,.fx,.fv').forEach((c, j) => M.vis(c, t, tDc[i] + 0.5 + j * 0.12, 1e9, { dy: 12 }));
      const av = el.querySelector('.avc'); if (av) av.style.background = mix(C.ink, C.gold, on01(t, tDc[i], tDc[i + 1]));
    });
  }

  /* ===== W: the Hawthorne studies ===== */
  const wOn = t >= tW1 - 0.1 && t < tF0 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const wo = { outDur: 0.3, ody: -16 };
    // factory: centred first, then slides to the left column when the stages begin
    const fac = $('#fac'); M.vis(fac, t, tW1 + 0.05, tWout, { dy: 36, ...wo });
    // a lone full-width card first, then it shrinks into the left column when the stages arrive
    const s0 = M.spring(t - (tW2 - 0.05), M.HEAVY), s = s0 > 0.999 ? 1 : s0;
    const fw = M.lerp(1600, 616, s), fh = M.lerp(580, 452, s), ft = M.lerp(270, 398, s);
    fac.style.width = fw.toFixed(1) + 'px'; fac.style.height = fh.toFixed(1) + 'px'; fac.style.top = ft.toFixed(1) + 'px';
    $('#facIn').style.transform = s === 1 ? 'none' : `translate(${((fw - 616) / 2).toFixed(2)}px,${((fh - 452) / 2).toFixed(2)}px) scale(${M.lerp(1.2, 1, s).toFixed(4)})`;
    M.draw($('#k1'), t, tW1 + 0.6, 0.5, M.o3); M.draw($('#k2'), t, tW1 + 0.72, 0.5, M.o3);
    $('#smoke').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    const lv = light(t);
    WIN.forEach((_, i) => { const r = $('#wn' + i), u = M.clamp((t - tW1 - 0.45 - i * 0.04) / 0.2); r.setAttribute('fill', mix(C.paper2, mix('#2C3B5E', '#F2C46B', lv), u)); });
    M.rise($('#facN'), t, tWorks - 0.05, { st: 0.06 });
    M.vis($('#facT'), t, tChic - 0.3, 1e9, { dy: 10 });
    M.vis($('#facY'), t, tYr - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // rail
    M.vis($('#rail'), t, tFour - 0.2, tWout, { dy: 24, ...wo });
    STG.forEach((_, i) => {
      const el = $('#rs' + i); M.vis(el, t, tFour + i * 0.1, 1e9, { dy: 12 });
      const a = M.io((t - tE[i]) / 0.3), d = i < 3 ? M.io((t - tE[i + 1]) / 0.3) : 0;
      const rc = el.querySelector('.rc'); rc.style.background = mix(mix(C.paper, C.gold, a), C.ink, d); rc.style.color = a > 0.5 ? '#fff' : C.muted;
      el.querySelector('.rt').style.color = mix(mix(C.muted, C.ink, a), C.ink2, d);
      if (t > tE[i] && t < tE[i] + 0.45) rc.style.transform = `scale(${(1 + 0.12 * Math.sin(Math.PI * (t - tE[i]) / 0.45)).toFixed(4)})`; else if (rc.style.transform !== 'none') rc.style.transform = 'none';
    });
    // stage panel
    M.vis($('#stp'), t, tW2 + 0.15, tWout, { dx: 60, dy: 0, ...wo });
    const PIN = [tW2 + 0.3, tE[0] + 0.05, tE[1] + 0.05, tE[2] + 0.05, tE[3] + 0.05];
    for (let k = 0; k < 5; k++) {
      const tin = PIN[k], tout = k < 4 ? PIN[k + 1] - 0.19 : 1e9;
      const pn = $('#sp' + k), on = t >= tin - 0.01 && t <= tout + 0.3; M.hide(pn, !on); if (!on) continue;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.3, tout, { dy: 0, ...oo });
      if (k === 0) {
        M.rise($('#p0a'), t, tin + 0.5, { st: 0.035, out: tout, outDur: 0.2 });
        M.rise($('#p0b'), t, tin + 0.8, { st: 0.04, out: tout, outDur: 0.2 });
        M.vis($('#p0c'), t, tin + 1.2, tout, { dy: 16, ...oo });
      }
      if (k === 1) {
        [['#lrL', tin + 0.45, light, tBri, tDim], ['#lrO', tin + 0.55, outp, tUp1, tUp2]].forEach(([id, ta, fn, c1, c2], j) => {
          const el = $(id); M.vis(el, t, ta, tout, { dy: 16, ...oo });
          const g = M.o3((t - ta - 0.1) / 0.7); el.querySelector('.lf').style.width = (712 * fn(t) * g).toFixed(1) + 'px';
          const la = el.querySelector('.la'); M.vis(la, t, c1, tout, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08, ...oo });
          const down = j === 0 && t >= c2;
          la.style.background = j === 0 ? (down ? C.ink2 : C.gold) : C.ink;
          setIco(la, down ? 'arrowD' : 'arrowU', '#fff', 28, 2.6);
          if (t > c2 && t < c2 + 0.45) la.style.transform = `scale(${(1 + 0.14 * Math.sin(Math.PI * (t - c2) / 0.45)).toFixed(4)})`; else if (t > c1 + 0.8 && la.style.transform !== 'none' && !(t > c2 && t < c2 + 0.45)) la.style.transform = 'none';
        });
        M.rise($('#s1t'), t, tE4 + 0.1, { st: 0.04, out: tout, outDur: 0.2 });
      }
      if (k === 2) {
        const gOut = tCp[0] - 0.3;
        M.vis($('#grp .lbl'), t, tin + 0.5, gOut, { dy: 10, ...oo });
        for (let j = 0; j < 6; j++) M.vis($('#gp' + j), t, tR2 + j * 0.07, gOut, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1, ...oo });
        M.vis($('#telP'), t, tTel - 0.05, gOut, { dy: 16, ...oo });
        CP.forEach((_, j) => M.vis($('#cp' + j), t, tCp[j] - 0.05, tout, { dy: 16, ...oo }));
        const chOn = t >= tCp[0] - 0.1; M.hide($('#chart'), !chOn); M.hide($('#cLine'), !chOn);
        M.vis($('#chart'), t, tCp[0] - 0.1, tout, { dy: 0, fade: 0.2, ...oo });
        M.vis($('#outL'), t, tCp[0], tout, { dy: 8, ...oo });
        const u = M.clamp(0.6 * M.o3((t - tCp[0]) / Math.max(0.5, tR4 - tCp[0])) + 0.4 * M.o3((t - tOld) / 1.3));
        M.drawU($('#cLine'), u); const [px, py] = ptAt(u); $('#cDot').setAttribute('cx', px.toFixed(1)); $('#cDot').setAttribute('cy', py.toFixed(1)); M.hide($('#cDot'), u < 0.01);
        M.vis($('#oldL'), t, tOld - 0.1, tout, { dy: 0, fade: 0.2, ...oo });
        M.vis($('#oldP'), t, tOld + 0.05, tout, { dy: 12, ...oo });
      }
      if (k === 3) {
        const n = 20000 * M.o5((t - tTw) / 1.1); M.hide($('#ivN'), t < tTw - 0.05);
        M.vis($('#ivN'), t, tTw - 0.05, tout, { dy: 16, ...oo });
        M.setT($('#ivN'), Math.round(n / 100) * 100 >= 20000 ? '20,000+' : (Math.round(n / 100) * 100).toLocaleString('en-IN'));
        M.vis($('#ivL'), t, tTw + 0.3, tout, { dy: 10, ...oo });
        M.vis($('#bub'), t, tAsked - 0.05, tout, { dy: 10, sc: 0.85, sp: M.POP, ...oo });
        M.vis($('#ivP1'), t, tLis - 0.05, tout, { dy: 16, ...oo });
        M.vis($('#ivA'), t, tBet - 0.3, tout, { dx: -16, dy: 0, ...oo });
        M.vis($('#ivP2'), t, tBet - 0.1, tout, { dy: 16, ...oo });
      }
      if (k === 4) {
        for (let j = 0; j < 14; j++) {
          const el = $('#bp' + j); M.vis(el, t, tMen + j * 0.05, tout, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1, ...oo });
          el.style.color = mix(C.ink2, C.gold, M.io((t - tInf - j * 0.03) / 0.3));
        }
        M.vis($('#loopL'), t, tMen + 0.2, tout, { dy: 10, ...oo }); M.setT($('#loopL'), t < tInf ? '14 WORKERS' : 'ONE INFORMAL GROUP');
        M.vis($('#loop'), t, tInf - 0.05, tout, { dy: 0, sc: 0.96, sp: M.SOFT, fade: 0.2, ...oo });
        M.vis($('#rlL'), t, tUnw - 0.05, tout, { dy: 10, ...oo });
        M.vis($('#rl0'), t, tRf - 0.25, tout, { dy: 16, ...oo });
        M.vis($('#rl1'), t, tRs - 0.25, tout, { dy: 16, ...oo });
        M.rise($('#pace'), t, tPace - 0.05, { st: 0.05 });
      }
    }
  }

  /* ===== F: what Mayo learned ===== */
  const fOn = t >= tF0 - 0.1 && t < tK1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    FD.forEach((f, i) => {
      const el = $('#fc' + i), ta = tF[i], td = i < 3 ? tF[i + 1] : 1e9;
      M.vis(el, t, tF0 + 0.1 + i * 0.08, tFout, { dy: 30, outDur: 0.3, ody: -16 });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.ft').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      el.querySelector('.fs').style.color = mix(mix(C.dim, C.gold2, on), C.ink2, off);
      el.querySelector('.fn').style.color = mix(mix(C.line, C.gold, on), C.gold, off);
      el.querySelector('.fi').style.background = mix(C.paper, '#24345A', act);
      setIco(el.querySelector('.ico'), f[0], t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 40, 2.2);
      if (i === 1) { M.vis(el.querySelector('.fh'), t, tHE - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 }); M.hide(el.querySelector('.fn'), t >= tHE - 0.05); }
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tF0 + 1 && t < tFout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.015 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== K: back at Chai Corner ===== */
  const kOn = t >= tK1 - 0.1 && t < tQ + 0.05; M.hide($('#sK'), !kOn);
  M.vis($('#exChip'), t, tK1 + 0.3, tQ - 0.05, { dy: 10, outDur: 0.01 });
  if (kOn) {
    M.vis($('#kAct'), t, tK1 + 0.1, 1e9, { dy: 36 });
    M.vis($('#kRes'), t, tK1 + 0.22, 1e9, { dy: 36 });
    KR.forEach((_, i) => { M.vis($('#kr' + i), t, (i ? tK3 : tK2) - 0.05, 1e9, { dy: 20 }); });
    CREW.forEach((_, i) => M.vis($('#kt' + i), t, tK4 + i * 0.07, 1e9, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#kHappy'), t, tK4 + 0.6, 1e9, { dy: 16 });
    M.vis($('#kAct .hr'), t, tK1 + 0.4, 1e9, { dy: 0 }); M.vis($('#kTL'), t, tK1 + 0.5, 1e9, { dy: 10 });
    M.vis($('#kMore'), t, tSixty + 0.9, 1e9, { dy: 16 });
    M.vis($('#kBig'), t, tSixty + 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    BARS.forEach(([n, w, v], k) => {
      const el = $('#kb' + k), bt = el.querySelector('.bt'), bv = el.querySelector('.bv');
      M.vis(el, t, tK1 + 0.5 + k * 0.12, 1e9, { dy: 16 });
      const g = k === 0 ? M.o3((t - tK1 - 0.6) / 0.6) : M.o5((t - tSixty) / 0.9), ww = w * g;
      bt.style.width = Math.max(0, ww).toFixed(1) + 'px'; bt.style.background = k === 1 ? C.gold : '#E7E0D2';
      bv.style.left = (Math.max(0, ww) + 20).toFixed(1) + 'px'; M.setT(bv, String(Math.round(v * g)));
      bv.style.opacity = M.clamp(ww / 40).toFixed(3); bv.style.color = k === 1 ? C.ink : C.muted;
    });
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
      const right = i === RIGHT, r = M.io((t - tAns) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.card, C.ink, r) : mix(C.card, '#F0EBE1', r);
      bg.style.borderColor = right ? mix(C.line, C.ink, r) : mix(C.line, '#EAE3D6', r);
      el.querySelectorAll('.ot').forEach(ot => { ot.style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r); });
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
    ROWS.forEach((r, i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04 });
      r[3].forEach((tp, k) => {
        const el = $('#fp' + i + k); M.vis(el, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const a = tp - 0.05, b = k < r[3].length - 1 ? r[3][k + 1] - 0.05 : (i < 2 ? tRow[i + 1] - 0.05 : tN - 0.4);
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
        el.style.color = g > 0.5 ? '#fff' : C.ink;
      });
    });
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on the 3 sweeps, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
