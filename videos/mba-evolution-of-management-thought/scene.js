// MBA - Principles of Management, Ep 07: Evolution of Management Thought
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  route: ['M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15', 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tSix = wt('H1', 'six');
const tAsk = T0('H2') + 0.3, tTile = [wt('C1', 'time'), wt('C1', 'strict'), wt('C1', 'listen')], tArg = wt('C2', 'argued'), tHund = wt('C2', 'hundred');
const tT = T0('T1'), tSt2 = wt('T1', 'grew'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tChg = wt('D2', 'changed'), tD3 = T0('D3');
const tDc = [tD3 + 0.2, wt('D3', 'gap'), wt('D3', 'old')], tD4 = T0('D4'), tDout = tD4 - 0.05;
const tRoad = tD4 + 0.3, tCart = wt('D4', 'road'), tThree = wt('D4', 'three');
const tK1 = T0('K1'), tK2 = T0('K2'), tTh = [wt('K3', 'Frederick'), wt('K4', 'Henri'), wt('K5', 'Max')], tBur = wt('K5', 'bureaucracy');
const tK6 = T0('K6'), tK7g = wt('K7', 'gap'), tP1 = T0('P1'), tKout = tP1 - 0.3;
const tP2 = T0('P2'), tTl = [wt('P3', 'lights'), wt('P3', 'breaks'), wt('P3', 'hours')], tP4 = T0('P4'), tUp = wt('P4', 'up');
const tP5 = T0('P5'), tP6 = T0('P6'), tP7 = T0('P7'), tM1 = T0('M1'), tPout = tM1 - 0.3;
const tM2 = T0('M2'), tFb = [wt('M3', 'Inputs'), wt('M3', 'work'), wt('M3', 'outputs')], tMilk = wt('M4', 'milk'), tWhole = wt('M4', 'whole');
const tM5 = T0('M5'), tNo = wt('M6', 'no'), tDep = wt('M6', 'depends'), tM7 = T0('M7'), tSt = [wt('M7', 'calm'), wt('M7', 'festival')];
const tW1 = T0('W1'), tMout = tW1 - 0.3, tSm = [wt('W1', 'machines'), wt('W1', 'people'), wt('W1', 'systems')];
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning + cups (same stall as Ep 01)
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = []; [[4, 0], [3, 1]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([430 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// crew: six people (three we know, three new helpers)
const CREW = [['A', 0], ['K', 0], ['M', 0], ['', 1], ['', 1], ['', 1]];
$('#crewRow').innerHTML = CREW.map(([l, nw], i) => `<div class="avc${nw ? ' nw' : ''}" id="cr${i}" style="left:${248 + i * 106}px">${nw ? M.icon('user', 30, C.ink2, 2.2) : l}</div>`).join('');
$('#cYi').innerHTML = M.icon('clock', 24, C.ink, 2.2);
// the big question
const ASK = [['Time tasks', 'timer'], ['Strict rules', 'clipboard'], ['Listen more', 'users']];
$('#askRow').innerHTML = ASK.map(([t, ic], i) => `<div class="job" id="ak${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 28, C.ink, 2.2)}</div><div class="jt">${t}</div><div class="av">?</div></div>`).join('');
// definition
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const DC = [['bulb', 'Old idea', 'Works for a while', C.dim], ['alert', 'A gap', 'Something is missing', C.red], ['bulb', 'New idea', 'Fixes the gap', C.gold]];
$('#dRow').innerHTML = DC.map(([ic, t, s, col], i) => `<div class="card dc" id="dc${i}" style="left:${160 + i * 544}px"><div class="di">${M.icon(ic, 36, col, 2.2)}</div><div class="dn">0${i + 1}</div><div class="serif dt">${t}</div><div class="ds">${s}</div></div>`).join('');
// road: stops, eras, cart
const SX = [416, 960, 1504];
const ERA = [['Classical', 'EARLY 1900s'], ['Neo-classical', '1920s-1930s'], ['Modern', '1950s-1970s']];
$('#stops').innerHTML = ERA.map(([e, y], i) => `<div class="stop" id="sp${i}" style="left:${SX[i] - 30}px">${i + 1}</div><div class="serif era" id="er${i}" style="left:${SX[i] - 240}px">${e}</div><div class="yr" id="yr${i}" style="left:${SX[i] - 240}px"><span class="lbl">${y}</span></div>`).join('');
let cg = ''; for (let i = 0; i < 4; i++) cg += `<path d="M${4 + i * 26} 2 h26 v14 a13 9 0 0 1 -26 0 z" fill="${i % 2 ? '#B8862F' : '#14213D'}"/>`;
$('#cartG').innerHTML = cg + `<rect x="12" y="20" width="6" height="26" fill="#14213D"/><rect x="94" y="20" width="6" height="26" fill="#14213D"/><rect x="44" y="30" width="14" height="16" rx="3" fill="#FFFFFF" stroke="#3A4560" stroke-width="2.5"/><rect x="62" y="30" width="14" height="16" rx="3" fill="#FFFFFF" stroke="#3A4560" stroke-width="2.5"/><rect x="4" y="44" width="104" height="18" rx="5" fill="#3A4560"/><rect x="4" y="44" width="104" height="5" rx="2.5" fill="#B8862F"/><circle cx="28" cy="64" r="8" fill="#14213D"/><circle cx="84" cy="64" r="8" fill="#14213D"/><circle cx="28" cy="64" r="3" fill="#E9D9B5"/><circle cx="84" cy="64" r="3" fill="#E9D9B5"/>`;
// banner states [in, out, icon, tag, tone, text]
const tP1b = tP1 + 0.45, tM1b = tM1 + 0.45;
const BS = [[tK2, tK6, 'gear', 'BIG IDEA', '', 'A business is a machine. Find the <span class="acc">one best way.</span>'],
  [tK6, tK7g, 'cup', 'AT CHAI CORNER', 'cc', 'One fixed recipe, and one boss for every job'],
  [tK7g, tP1b, 'alert', 'THE GAP', 'gap', 'It treated people like machine parts'],
  [tP1b, tP6, 'users', 'BIG IDEA', '', 'People are not machines. <span class="acc">Feelings matter.</span>'],
  [tP6, tP7, 'cup', 'AT CHAI CORNER', 'cc', 'A five minute team chat every morning'],
  [tP7, tM1b, 'alert', 'THE GAP', 'gap', 'One stall is part of a bigger world'],
  [tM1b, tW1, 'network', 'BIG IDEA', '', 'See the <span class="acc">whole picture</span>, then pick what fits'],
  [tW1, 1e9, 'route', 'THE ROAD', '', 'Each stop fixed what the last one <span class="acc">missed</span>']];
const BCOL = { '': C.gold, cc: C.gold, gap: C.red };
$('#ideaS').innerHTML = BS.map(([, , ic, tg, tone, tx], i) => `<div class="bs" id="bs${i}"><span class="bi">${M.icon(ic, 32, BCOL[tone], 2.2)}</span><span class="tg ${tone}">${tg}</span><span class="tx">${tx}</span></div>`).join('');
// classical thinkers
const TH = [['T', 'F.W. Taylor', '1911', 'Scientific management', 'Time tasks, one best way'], ['F', 'Henri Fayol', '1916', '14 principles', 'Rules for the whole company'], ['W', 'Max Weber', '1922', 'Bureaucracy', 'Clear rules, clear ranks']];
$('#thRow').innerHTML = TH.map(([l, n, y, tt, td], i) => `<div class="card th" id="th${i}" style="left:${160 + i * 544}px"><div class="avc" style="left:32px;top:30px">${l}</div><div class="serif nm">${n}</div><div class="yp">${y}</div><div class="hr"></div><div class="serif tt">${tt}</div><div class="td">${td}</div></div>`).join('');
// Hawthorne tiles
const TL = [['bulb', 'Lights'], ['cup', 'Breaks'], ['clock', 'Hours']];
$('#tlRow').innerHTML = TL.map(([ic, n], i) => `<div class="tl" id="tl${i}" style="left:${32 + i * 248}px"><div class="ti">${M.icon(ic, 28, C.ink, 2.2)}</div><div class="tu">${M.icon('arrowU', 26, '#fff', 2.6)}</div><div class="serif tn">${n}</div></div>`).join('');
$('#fndP').innerHTML = `<div class="pn" id="fn0"><div class="lbl" style="left:32px;top:36px">WHAT THEY FOUND</div><div class="bigU">${M.icon('arrowU', 38, '#fff', 2.6)}</div><div class="serif pq" style="left:128px;top:92px">Output went <span class="acc">up</span></div><div class="pl" style="top:186px">Workers felt noticed and valued</div></div>`
  + `<div class="pn" id="fn1"><div class="avc" style="left:32px;top:30px;font-size:24px">EM</div><div class="serif nm">Elton Mayo</div><div class="lbl" style="left:122px;top:82px;font-size:15px">HUMAN RELATIONS</div><div class="hr"></div><div class="serif pq" id="my1" style="top:142px;font-size:36px">People work better</div><div class="serif pq" id="my2" style="top:190px;font-size:36px">when they feel <span class="acc">heard.</span></div></div>`;
// systems flow
const FB = [['INPUT', 'Milk + tea'], ['PROCESS', 'Brewing'], ['OUTPUT', 'Chai']];
$('#fbRow').innerHTML = FB.map(([l, t], i) => `<div class="fb" id="fb${i}" style="left:${32 + i * 260}px"><div class="fl">${l}</div><div class="serif ft">${t}</div></div>`).join('')
  + [0, 1].map(i => `<div class="fa" id="fa${i}" style="left:${244 + i * 260}px">${M.icon('arrowR', 36, C.gold, 2.4)}</div>`).join('');
// contingency situations
const STN = [['sun', 'Calm Sunday', 'Fewer hands'], ['zap', 'Festival rush', 'Everyone on shift']];
$('#stRow').innerHTML = STN.map(([ic, n, p], i) => `<div class="st" id="st${i}" style="left:${32 + i * 376}px"><div class="ti">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="serif sn">${n}</div><div class="sp">${p}</div></div>`).join('');
// summary under the three stops
const SM = [['gear', 'Machines', 'Find the one best way'], ['users', 'People', 'Feelings matter'], ['network', 'Systems', 'See the whole, it depends']];
$('#smRow').innerHTML = SM.map(([ic, t, s], i) => `<div class="card sm" id="sm${i}" style="left:${160 + i * 544}px"><div class="si"><span class="ico"></span></div><div class="lbl sl">STOP 0${i + 1}</div><div class="serif st2">${t}</div><div class="ss">${s}</div></div>`).join('');
// quiz
const OPTS = ['Classical', 'Bureaucracy', 'Systems', 'Contingency'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('compass', 44, C.gold2, 2.4);
// recap
const ROWS = [['gear', 'Classical: business as a <span class="acc">machine</span>', ['Taylor', 'Fayol', 'Weber'], [wt('S2', 'Taylor'), wt('S2', 'Fayol'), wt('S2', 'Weber')]],
  ['users', 'Human relations: <span class="acc">people first</span>', ['Hawthorne studies'], [wt('S3', 'Hawthorne')]],
  ['network', 'Modern: whole system, and <span class="acc">it depends</span>', ['Systems', 'Contingency'], [wt('S4', 'system'), wt('S4', 'depends')]]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const cartX = M.track(224, [[tK1, SX[0] - 96], [tP1, SX[1] - 96], [tM1, SX[2] - 96]], M.HEAVY);
const goldW = M.track(0, [[tK1, SX[0] - 160], [tP1, SX[1] - 160], [tM1, SX[2] - 160], [tW1 + 0.1, 1600]], M.HEAVY);
const tReach = [tK1, tP1, tM1];
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
const slideL = (el, t, ts) => { const s = M.spring(t - ts, M.HEAVY); el.style.left = (s >= 0.999 ? 160 : 160 + 408 * (1 - s)).toFixed(1) + 'px'; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  ROWS.forEach((r, i) => { const rt = $('#rw' + i + ' .rt'); let x = 216 + rt.offsetWidth + 40; r[2].forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  $('#strikeL').setAttribute('x2', (32 + $('#obw').offsetWidth + 8).toFixed(0));
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

  /* ===== A: a busy stall, one big question ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // crew card: six people
    M.vis($('#crew'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const sixT = Math.max(tSix, tMorph + 0.5);
    M.setT($('#cN'), String(Math.round(6 * M.o5((t - sixT) / 0.9))));
    CREW.forEach((_, i) => M.vis($('#cr' + i), t, sixT + 0.1 + i * 0.09, 1e9, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1 }));
    M.vis($('#cYrs'), t, tArg - 0.05, 1e9, { dy: 16 });
    M.setT($('#cYt'), `Argued about for ${Math.round(100 * M.o5((t - tHund + 0.4) / 0.9))}+ years`);
    // ask card: three possible answers
    M.vis($('#ask'), t, tAsk, 1e9, { dy: 36 });
    ASK.forEach((_, i) => {
      const el = $('#ak' + i); M.vis(el, t, tTile[i] - 0.05, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.av'), t, tTile[i] + 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      el.querySelector('.av').style.background = mix(C.gold, C.ink, M.io((t - tArg) / 0.4));
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

  /* ===== D: what is the evolution of management thought? ===== */
  const dOn = t >= tTu - 0.05 && t < tD4 + 0.5; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq1'), t, tD1 + 0.05, { st: 0.06, sp: M.HEAVY, out: tD2 - 0.12, outDur: 0.3 });
    M.rise($('#dq2'), t, tD1 + 0.3, { st: 0.06, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.rise($('#quote1'), t, tD2 + 0.15, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, tChg - 0.05, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    M.vis($('#qby'), t, tChg + 0.4, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tD3 + 0.08, tDout, { dy: 24, ...o });
    DC.forEach((_, i) => M.vis($('#dc' + i), t, tDc[i] - 0.05, tDout, { dy: 30, ...o }));
  }

  /* ===== the road ===== */
  const rOn = t >= tD4 && t < tQ + 0.05; M.hide($('#sRoad'), !rOn);
  if (rOn) {
    const ro = { outDur: 0.3, ody: -16 };
    const rb = M.o3((t - tRoad) / 1.0); $('#roadBase').style.width = (1600 * rb).toFixed(1) + 'px'; M.hide($('#roadBase'), rb <= 0);
    M.draw($('#dashL'), t, tRoad + 0.3, 1.0, M.io);
    const gw = goldW(t); $('#roadGold').style.width = Math.max(0, gw).toFixed(1) + 'px'; M.hide($('#roadGold'), gw < 1);
    // cart rides the road
    const cart = $('#cart'); M.vis(cart, t, tCart, 1e9, { dy: -40, sp: M.SOFT, fade: 0.12 });
    const cx = cartX(t); cart.style.left = (Math.abs(cx - Math.round(cx)) < 0.02 ? Math.round(cx) - 56 : cx - 56).toFixed(2) + 'px';
    ERA.forEach((_, i) => {
      const sp = $('#sp' + i), ta = tThree + 0.1 + i * 0.12, tr = tReach[i];
      M.vis(sp, t, ta, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const g = M.io((t - tr - 0.25) / 0.3);
      sp.style.background = mix(C.card, C.gold, g); sp.style.color = mix(C.muted, '#fff', g);
      if (t > tr + 0.25 && t < tr + 0.75) sp.style.transform = `scale(${(1 + 0.12 * Math.sin(Math.PI * (t - tr - 0.25) / 0.5)).toFixed(4)})`;
      else if (t > ta + 1 && sp.style.transform !== 'none') sp.style.transform = 'none';
      const er = $('#er' + i); M.vis(er, t, ta + 0.1, 1e9, { dy: 12 }); er.style.color = mix(C.dim, C.ink, g);
      const yr = $('#yr' + i); M.vis(yr, t, ta + 0.2, 1e9, { dy: 10 }); yr.querySelector('.lbl').style.color = mix(C.dim, C.gold, g);
    });
    // banner
    M.vis($('#idea'), t, tK2 - 0.15, 1e9, { dy: 24 });
    BS.forEach(([a, b], i) => {
      const el = $('#bs' + i), on = t >= a - 0.02 && t < b + 0.3; M.hide(el, !on); if (!on) return;
      M.vis(el.querySelector('.bi'), t, a + 0.02, b - 0.12, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08, outDur: 0.16, ody: 0 });
      M.vis(el.querySelector('.tg'), t, a + 0.06, b - 0.12, { dy: 12, outDur: 0.16, ody: -10 });
      M.rise(el.querySelector('.tx'), t, a + 0.14, { st: 0.035, out: b - 0.14, outDur: 0.16 });
    });

    /* stop 1: classical */
    const kOn = t >= tTh[0] - 0.1 && t < tKout + 0.5;
    TH.forEach((_, i) => {
      const el = $('#th' + i); if (!kOn) { M.hide(el, true); return; }
      M.vis(el, t, tTh[i] - 0.08, tKout, { dy: 30, ...ro });
      el.querySelector('.avc').style.background = mix(C.ink, C.gold, on01(t, tTh[i], i < 2 ? tTh[i + 1] : tK6));
      M.vis(el.querySelector('.yp'), t, tTh[i] + 0.3, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      M.rise(el.querySelector('.tt'), t, i === 2 ? tBur - 0.05 : tTh[i] + 0.4, { st: 0.05 });
      M.rise(el.querySelector('.td'), t, tTh[i] + 0.6, { st: 0.04 });
    });

    /* stop 2: human relations */
    const pOn = t >= tP2 - 0.1 && t < tPout + 0.5;
    const haw = $('#haw'), fnd = $('#fnd');
    if (!pOn) { M.hide(haw, true); M.hide(fnd, true); }
    else {
      M.vis(haw, t, tP2 + 0.05, tPout, { dy: 30, ...ro }); slideL(haw, t, tP4 - 0.1);
      TL.forEach((_, i) => {
        const el = $('#tl' + i); M.vis(el, t, tTl[i] - 0.05, 1e9, { dy: 20 });
        M.vis(el.querySelector('.tu'), t, tUp + i * 0.12, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      });
      M.vis(fnd, t, tP4 + 0.25, tPout, { dx: 60, dy: 0, ...ro });
      const panes = [[tP4 + 0.4, tP5 - 0.14], [tP5, 1e9]];
      panes.forEach(([a, b], k) => {
        const pn = $("#fn" + k), on = t >= a - 0.01 && t < b + 0.3; M.hide(pn, !on); if (!on) return;
        const oo = { outDur: 0.18, ody: -12 };
        [...pn.children].forEach((c, j) => {
          if (c.classList.contains('pq') || c.classList.contains('pl') || c.classList.contains('nm')) M.rise(c, t, a + 0.08 + j * 0.1, { st: 0.05, out: b, outDur: 0.2 });
          else M.vis(c, t, a + j * 0.08, b, { dy: 12, ...oo });
        });
      });
    }

    /* stop 3: modern */
    const mOn = t >= tM2 - 0.1 && t < tMout + 0.5;
    const sys = $('#sys'), con = $('#con');
    if (!mOn) { M.hide(sys, true); M.hide(con, true); }
    else {
      M.vis(sys, t, tM2 + 0.05, tMout, { dy: 30, ...ro }); slideL(sys, t, tM5 - 0.1);
      FB.forEach((_, i) => {
        const el = $('#fb' + i); M.vis(el, t, tFb[i] - 0.05, 1e9, { dy: 20 });
        if (i) M.vis($('#fa' + (i - 1)), t, tFb[i] - 0.2, 1e9, { dx: -16, dy: 0 });
        const r = M.io((t - (i ? tWhole + (i - 1) * 0.22 : tMilk)) / 0.3);
        el.style.background = mix(C.paper, C.redBg, r);
        el.querySelector('.ft').style.color = mix(C.ink, C.red, r); el.querySelector('.fl').style.color = mix(C.muted, C.red, r);
      });
      M.setT($('#fb0 .ft'), t >= tMilk ? 'Milk late' : 'Milk + tea');
      M.draw($('#fbkP'), t, tFb[2] + 0.5, 0.7, M.io); M.vis($('#fbkA'), t, tFb[2] + 1.1, 1e9, { dy: 0, fade: 0.12 });
      M.vis($('#fbkL'), t, tFb[2] + 0.9, 1e9, { dy: 8 });
      M.vis(con, t, tM5 + 0.25, tMout, { dx: 60, dy: 0, ...ro });
      const cA = $('#conA'), aOut = tM7 - 0.12;
      M.hide(cA, t > aOut + 0.4);
      M.rise($('#obw'), t, tM5 + 0.6, { st: 0.06, sp: M.HEAVY, out: aOut, outDur: 0.2 });
      M.draw($('#strikeL'), t, tNo, 0.45, M.o3); $('#strike').style.opacity = (1 - M.io((t - aOut) / 0.2)).toFixed(3);
      $('#obw').style.color = mix(C.ink, C.dim, M.io((t - tNo - 0.3) / 0.3));
      M.rise($('#dep'), t, tDep - 0.05, { st: 0.04, out: aOut, outDur: 0.2 });
      STN.forEach((_, i) => M.vis($('#st' + i), t, tSt[i] - 0.05, 1e9, { dy: 20 }));
    }

    /* summary */
    const wOn = t >= tW1 - 0.1;
    SM.forEach((s, i) => {
      const el = $('#sm' + i); if (!wOn) { M.hide(el, true); return; }
      M.vis(el, t, tSm[i] - 0.08, 1e9, { dy: 30 });
      const g = on01(t, tSm[i], i < 2 ? tSm[i + 1] : T1('W1') + 0.2);
      el.querySelector('.si').style.background = mix(C.paper, C.gold, g);
      setIco(el.querySelector('.ico'), s[0], g > 0.5 ? '#fff' : C.gold, 40, 2.2);
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Which') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Which') + 0.2 + i * 0.08, 1e9, { dy: 40 });
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
