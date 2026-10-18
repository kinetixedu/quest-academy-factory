// MBA - Principles of Management, Ep 12: Systems Approach
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', link: '#D9CFBC', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  brain: ['M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z', 'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z', 'M12 5v13'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
  trendUp: ['m22 7-8.5 8.5-5-5L2 17', 'M16 7h6v6'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tSix = wt('H1', 'six'), tMorph = T0('H2') - 0.35, tBusy = wt('H1', 'busier');
const tBreak = wt('H2', 'breaks'), tKab = wt('H2', 'Kabir'), tStop = wt('C1', 'stops'), tPay = wt('C1', 'pay');
const tCold = wt('C2', 'cold'), tClean = wt('C2', 'clean'), tWhole = wt('C3', 'whole'), tSmall = wt('C3', 'small');
const tT = T0('T1'), tSt2 = wt('T1', 'It'), tTu = T0('D1') - 0.32;          // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tD2 = T0('D2'), t50 = wt('D2', '1950s'), t60 = wt('D2', '1960s'), tLud = wt('D2', 'Ludwig'), tAus = wt('D2', 'Austrian'), tBio = wt('D2', 'biologist');
const tD3 = T0('D3'), tLiv = wt('D3', 'living'), tSys3 = wt('D3', 'systems'), tNeeds = wt('D3', 'needs');
const tD4 = T0('D4'), tBiz = wt('D4', 'business');
const tD5 = T0('D5'), tConn = wt('D5', 'connected'), tGoal5 = wt('D5', 'goal'), tDout = tD5 - 0.32, tD5out = T0('P0') - 0.32;
const tP0 = T0('P0'), tPart = wt('P0', 'part'), tSub = wt('P0', 'subsystem'), tSmaller = wt('P0', 'smaller');
const tSt = [wt('P1', 'kitchen'), wt('P1', 'cash'), wt('P1', 'cleaning')], tP1e = T1('P1');
const tDep = wt('P2', 'depend'), tBrk = wt('P2', 'broken'), tHurt = wt('P2', 'hurt'), tPout = T0('I0') - 0.32;
const tI0 = T0('I0'), tIo = [T0('I1'), T0('I2'), T0('I3'), T0('I4')];
const tIP = [[wt('I1', 'milk'), wt('I1', 'tea'), wt('I1', 'people')], [wt('I2', 'Asha'), wt('I2', 'chai')], [wt('I3', 'Hot'), wt('I3', 'happy')]];
const tTrans = wt('I2', 'transformation'), tSweet = wt('I4', 'sweet'), tLess = wt('I4', 'less'), tIout = T0('O1') - 0.32;
const tO1 = T0('O1'), tOpen = wt('O1', 'open'), tWorld = wt('O1', 'world');
const tEnv = [wt('O2', 'Customers'), wt('O2', 'suppliers'), wt('O2', 'government'), wt('O2', 'competitors')];
const tMilk = wt('O3', 'milk'), tStall = wt('O3', 'stall'), tAdapt = wt('O3', 'adapt'), tOout = T0('Y1') - 0.32;
const tY1 = T0('Y1'), tSyn = wt('Y1', 'Synergy'), tWh = wt('Y2', 'whole'), tSum = wt('Y2', 'sum'), tParts = wt('Y2', 'parts');
const tY3 = T0('Y3'), tSixty = wt('Y3', 'sixty'), tTeam = wt('Y3', 'team'), tHund = wt('Y3', 'hundred');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Information');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['inputs', 'process', 'outputs', 'feedback'].map(w => wt('S3', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// A: the stall (same illustration as Ep 01)
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = []; [[4, 0], [3, 1], [2, 2]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([430 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// the six people
const CREW = [['R', 'Ravi'], ['A', 'Asha'], ['K', 'Kabir'], ['M', 'Meena'], ['', 'Helper'], ['', 'Helper']];
$('#crewRow').innerHTML = CREW.map(([l, n], i) => { const x = 36 + i * 152; return `<div class="cw6" id="cw${i}" style="left:${x}px">${l || M.icon('user', 30, '#fff', 2.2)}</div><div class="cn6" id="cn${i}" style="left:${x - 28}px">${n}</div>`; }).join('');
$('#wLi').innerHTML = M.icon('users', 24, C.ink, 2.2);
const JOBS = [['Kitchen', 'cup', 'A'], ['Cash counter', 'coin', 'K'], ['Cups', 'droplet', 'M']];
const tJobBad = [tCold, tBreak, tClean];
$('#jobRow').innerHTML = JOBS.map(([t, ic, l], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji"></div><div class="jt">${t}</div><div class="av">${l}</div></div>`).join('');
// D: thinker + body/business
$('#gstI').innerHTML = M.icon('network', 24, C.gold, 2.2);
const lp = (i, x, y) => i ? `left:${x - 120}px;top:${y + 78}px` : `left:${x + 88}px;top:${y - 24}px;text-align:left`;
const BN = [[392, 190, 'heart', 'Heart', 'cup', 'Kitchen'], [232, 420, 'wind', 'Lungs', 'coin', 'Cash'], [552, 420, 'brain', 'Brain', 'droplet', 'Cleaning']];
$('#bN').innerHTML = BN.map(([x, y, , a, , b], i) => `<div class="on3" id="bn${i}" style="left:${x - 64}px;top:${y - 64}px"><div class="bg"></div><div class="oi"></div></div><div class="serif onl" id="bla${i}" style="${lp(i, x, y)}">${a}</div><div class="serif onl" id="blb${i}" style="${lp(i, x, y)}">${b}</div>`).join('');
const seg = (a, b, r = 82) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L; return `M${(a[0] + ux * r).toFixed(1)} ${(a[1] + uy * r).toFixed(1)} L${(b[0] - ux * r).toFixed(1)} ${(b[1] - uy * r).toFixed(1)}`; };
$('#bL').innerHTML = [[0, 1], [0, 2], [1, 2]].map(([a, b], i) => `<path id="bk${i}" d="${seg(BN[a], BN[b])}" stroke="${C.link}" stroke-width="4"/>`).join('');
$('#dgI').innerHTML = M.icon('smile', 28, '#fff', 2.4);
// P: subsystems
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2); $('#sgI').innerHTML = M.icon('smile', 24, '#fff', 2.4);
const STS = [['Kitchen', 'cup', [['A', 'Asha'], ['', 'Helper']]], ['Cash counter', 'coin', [['K', 'Kabir']]], ['Cleaning', 'droplet', [['M', 'Meena'], ['', 'Helper']]]];
const STX = [48, 584, 1120];
$('#sts').innerHTML = STS.map(([n, ic, pp], i) => `<div class="st" id="ss${i}" style="left:${STX[i]}px"><div class="bg"></div><div class="si"></div><div class="serif sn">${n}</div><div class="lbl sl">SUBSYSTEM 0${i + 1}</div>`
  + pp.map(([l, nm], k) => `<div class="pa" id="pa${i}_${k}" style="left:${28 + k * 196}px">${l || M.icon('user', 26, '#fff', 2.2)}</div><div class="pn2" id="pn${i}_${k}" style="left:${100 + k * 196}px">${nm}</div>`).join('') + `</div>`).join('');
const ARH = (x, y, d) => `M${x - 9 * d} ${y - 10} L${x} ${y} L${x - 9 * d} ${y + 10}`;
$('#sysL').innerHTML = [0, 1].map(i => { const x0 = STX[i] + 432 + 14, x1 = STX[i + 1] - 14, y = 208; return `<g id="sk${i}"><path id="skl${i}" d="M${x0} ${y} H${x1}" stroke-width="4"/><path id="ska${i}" d="${ARH(x1, y, 1)} M${x0 + 9} ${y - 10} L${x0} ${y} L${x0 + 9} ${y + 10}" stroke-width="4"/></g>`; }).join('');
// I: the loop
const IOX = [160, 728, 1296];
const IO = [['Inputs', 'package', 'What goes in', ['Milk', 'Tea leaves', 'People']], ['Process', 'flame', 'Transformation', ['Asha', 'Boil and brew']], ['Outputs', 'cup', 'What comes out', ['Hot chai', 'Happy customers']]];
$('#ios').innerHTML = IO.map(([t, ic, s, ps], i) => `<div class="io" id="io${i}" style="left:${IOX[i]}px"><div class="bg"></div><div class="ii"></div><div class="serif it">${t}</div><div class="is">${s}</div><div class="hr"></div>${ps.map((p, k) => `<div class="ip" id="ip${i}_${k}">${p}</div>`).join('')}</div>`).join('');
const LY = 435;
let ll = [0, 1].map(i => { const x0 = IOX[i] + 464 + 18, x1 = IOX[i + 1] - 18; return `<path id="la${i}" d="M${x0} ${LY} H${x1}" stroke="${C.gold}" stroke-width="5"/><path id="lh${i}" d="${ARH(x1, LY, 1)}" stroke="${C.gold}" stroke-width="5"/>`; }).join('');
ll += `<path id="fbl" d="M1528 616 V690 H392 V616" stroke="${C.gold}" stroke-width="5"/><path id="fbh" d="M382 628 L392 616 L402 628" stroke="${C.gold}" stroke-width="5"/>`;
$('#loopL').innerHTML = ll;
$('#fbI').innerHTML = M.icon('refresh', 24, '#fff', 2.4); $('#fbsI').innerHTML = M.icon('refresh', 44, C.gold2, 2.4);
// O: open system
const MCX = [56, 372, 688];
$('#mcs').innerHTML = [['Inputs', 'package'], ['Process', 'flame'], ['Outputs', 'cup']].map(([n, ic], i) => `<div class="mc" id="mc${i}" style="left:${MCX[i]}px">${M.icon(ic, 26, C.gold, 2.2)}${n}</div>`).join('');
let ol = [0, 1].map(i => { const x0 = MCX[i] + 200 + 14, x1 = MCX[i + 1] - 14; return `<path id="oa${i}" d="M${x0} 186 H${x1} ${ARH(x1, 186, 1).replace('M', 'M')}" stroke="${C.gold}" stroke-width="4"/>`; }).join('');
ol += `<path id="ofl" d="M788 236 V300 H156 V236" stroke="${C.gold}" stroke-width="4"/><path id="ofh" d="M147 247 L156 236 L165 247" stroke="${C.gold}" stroke-width="4"/>`;
$('#oL').innerHTML = ol;
const ENV = [['Customers', 'users', 160, 270], ['Suppliers', 'truck', 160, 516], ['Government', 'landmark', 1528, 270], ['Competitors', 'store', 1528, 516]];
$('#envs').innerHTML = ENV.map(([n, ic, x, y], i) => `<div class="env" id="ev${i}" style="left:${x}px;top:${y}px"><div class="bg"></div><div class="ei"></div><div class="serif en">${n}</div></div>`).join('');
$('#envL').innerHTML = ENV.map(([, , x, y], i) => { const cy = y + 107, a = x < 900 ? 408 : 1448, b = x < 900 ? 472 : 1512; return `<g id="eg${i}"><path id="ea${i}" d="M${a} ${cy - 12} H${b} ${ARH(b, cy - 12, 1)}" stroke="${C.link}" stroke-width="4"/><path id="eb${i}" d="M${b} ${cy + 12} H${a} M${a + 9} ${cy + 2} L${a} ${cy + 12} L${a + 9} ${cy + 22}" stroke="${C.link}" stroke-width="4"/></g>`; }).join('');
$('#op0I').innerHTML = M.icon('trendUp', 26, C.gold2, 2.4); $('#op1I').innerHTML = M.icon('store', 26, C.gold2, 2.2); $('#opA').innerHTML = M.icon('arrowR', 40, C.gold, 2.4);
// Y: synergy
$('#yic').innerHTML = M.icon('zap', 48, C.gold, 2);
const YA = ['R', 'A', 'K', 'M', '', ''];
$('#yas').innerHTML = YA.map((l, k) => `<div class="ya" id="ya${k}" style="left:${48 + k * 112}px;background:${k === 0 ? C.gold : (l ? C.ink : C.ink2)}">${l || M.icon('user', 32, '#fff', 2.2)}</div>`).join('');
// quiz
const OPTS = ['Input', 'Process', 'Output', 'Feedback'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('refresh', 44, C.gold2, 2.4);
// recap
const ROWS = [['network', 'One system of <span class="acc">connected parts</span>, called subsystems'], ['refresh', 'The loop'], ['globe', 'Open to the world, and the <span class="acc">whole</span> beats the parts']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
$('#rw1').insertAdjacentHTML('beforeend', ['Inputs', 'Process', 'Outputs', 'Feedback'].map((p, k) => `<div class="fp" id="fp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
const pulse = (el, t, a, amp = 0.05, d = 0.45) => { if (t > a && t < a + d) el.style.transform = `scale(${(1 + amp * Math.sin(Math.PI * (t - a) / d)).toFixed(4)})`; else if (t >= a + d && t < a + d + 0.5 && el.style.transform !== 'none') el.style.transform = 'none'; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const y5 = $('#y50'); $('#y60').style.left = (48 + y5.offsetWidth + 16) + 'px';
  IO.forEach(([, , , ps], i) => { let x = 40; ps.forEach((_, k) => { const p = $(`#ip${i}_${k}`); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
  const fb = $('#fbp'); fb.style.left = (960 - fb.offsetWidth / 2) + 'px';
  const oc = $('#ochip'); oc.style.left = (944 - 48 - oc.offsetWidth) + 'px';
  const sg = $('#sgoal'); sg.style.left = (1600 - 48 - sg.offsetWidth) + 'px';
  const rt = $('#rw1 .rt'); let x = 216 + rt.offsetWidth + 40;
  for (let k = 0; k < 4; k++) { const p = $('#fp' + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
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
  M.vis($('#exChip'), t, tSixty - 0.3, tQ - 0.42, { dy: 10, outDur: 0.3 });

  /* ===== A: one part breaks, the whole stall suffers ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    const cool = M.io((t - tCold) / 0.6);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    $('#steam').style.opacity = (1 - 0.85 * cool).toFixed(3);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06, tg = tClean + 0.1 + (CUPS.length - 1 - i) * 0.07; const g = $('#cup' + i); const p = M.spring(t - ti0, M.POP), q = M.io((t - tg) / 0.3); M.hide(g, t < ti0 || q >= 1); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24 - q * 16).toFixed(2)})`); g.style.opacity = (M.clamp((t - ti0) / 0.1) * (1 - q)).toFixed(3); });
    // six people
    M.vis($('#crew'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const hurt = M.io((t - tWhole) / 0.5);
    CREW.forEach((_, i) => {
      const a = $('#cw' + i), tin = tMorph + 0.55 + i * 0.08;
      M.vis(a, t, tin, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#cn' + i), t, tin + 0.08, 1e9, { dy: 8 });
      const base = i === 0 ? C.gold : (i >= 4 ? C.ink2 : C.ink);
      const bad = i === 2 ? M.io((t - tBreak) / 0.3) : hurt;
      a.style.background = mix(base, C.red, bad);
      if (i === 2) pulse(a, t, tBreak, 0.12, 0.5);
    });
    M.vis($('#wLine'), t, tMorph + 1.0, 1e9, { dy: 16 });
    const stop = M.io((t - tPay) / 0.4);
    const n = 6 * M.o3((t - tMorph - 1.0) / 0.8) + 20 * M.o3((t - tStop) / 2.2);
    M.setT($('#wLt'), stop < 0.5 ? `${Math.round(n)} waiting` : `${Math.round(n)} waiting · line stopped`);
    const wl = $('#wLine'); wl.style.background = mix(C.paper, C.redBg, stop); wl.style.color = mix(C.ink, C.red, stop);
    setIco($('#wLi'), stop > 0.5 ? 'timer' : 'users', stop > 0.5 ? C.red : C.ink, 24);
    // parts of the stall
    M.vis($('#jobs'), t, tMorph + 0.42, 1e9, { dy: 36 });
    JOBS.forEach(([, ic], i) => {
      const el = $('#job' + i); M.vis(el, t, tMorph + 0.6 + i * 0.1, 1e9, { dy: 24, sp: M.SOFT });
      const bad = M.io((t - tJobBad[i]) / 0.3);
      el.style.background = mix(C.paper, C.redBg, bad);
      el.querySelector('.jt').style.color = mix(C.ink, C.red, bad);
      el.querySelector('.av').style.background = mix(C.gold, C.red, bad);
      setIco(el.querySelector('.ji'), ic, bad > 0.5 ? C.red : C.ink, 28);
      pulse(el, t, tJobBad[i], 0.04, 0.45);
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

  /* ===== D: where it came from, and the definition ===== */
  const dOn = t >= tTu - 0.05 && t < tP0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: t50 - 0.45, outDur: 0.3 });
    M.vis($('#thinker'), t, t50 - 0.3, tDout, { dy: 36, ...o });
    { const sh = M.spring(t - (tD3 - 0.3), M.HEAVY); $('#thinker').style.width = sh >= 1 ? '784px' : (784 + 816 * (1 - sh)).toFixed(2) + 'px'; $('#thIn').style.transform = sh >= 1 ? 'none' : `translateX(${(408 * (1 - sh)).toFixed(2)}px)`; }
    M.vis($('#y50'), t, t50 - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
    M.vis($('#y60'), t, t60 - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
    const yr = on01(t, t50 - 0.05, tLud - 0.2); ['#y50', '#y60'].forEach(s => { $(s).style.background = mix(C.paper, C.gold, yr); $(s).style.color = mix(C.ink, '#fff', yr); });
    M.vis($('#thr'), t, wt('D2', 'from') - 0.1, 1e9, { dy: 0 });
    M.vis($('#lav'), t, wt('D2', 'ideas') - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.rise($('#lname'), t, tLud, { st: 0.06, sp: M.HEAVY });
    M.vis($('#ltag'), t, tAus - 0.1, 1e9, { dy: 10 });
    M.vis($('#lidea'), t, tBio + 0.45, 1e9, { dy: 10 });
    M.vis($('#gst'), t, tBio + 0.6, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
    M.vis($('#bodyc'), t, tD3 - 0.05, tDout, { dx: 60, dy: 0, ...o });
    const biz = M.io((t - tBiz) / 0.3);
    M.vis($('#bl0'), t, tD3 + 0.1, tBiz - 0.1, { dy: 10, outDur: 0.2, ody: -10 });
    M.vis($('#bl1'), t, tBiz + 0.1, 1e9, { dy: 10 });
    M.vis($('#blr'), t, tNeeds - 0.05, 1e9, { dy: 10 });
    BN.forEach(([, , ia, , ib], i) => {
      const el = $('#bn' + i), tin = tLiv - 0.3 + i * 0.14;
      M.vis(el, t, tin, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#bla' + i), t, tin + 0.1, tBiz - 0.1 + i * 0.06, { dy: 10, outDur: 0.2, ody: -10 });
      M.vis($('#blb' + i), t, tBiz + 0.12 + i * 0.06, 1e9, { dy: 10 });
      const act = Math.max(on01(t, tNeeds, tD4 - 0.1), on01(t, tBiz + i * 0.06, tD5));
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.paper, C.gold, act); bg.style.borderColor = mix(C.line, C.gold, act);
      setIco(el.querySelector('.oi'), t < tBiz + i * 0.06 ? ia : ib, act > 0.5 ? '#fff' : C.gold, 56, 2);
      pulse(el, t, tBiz + i * 0.06, 0.1, 0.4);
    });
    [0, 1, 2].forEach(i => { const k = $('#bk' + i); M.draw(k, t, tSys3 + i * 0.1, 0.5, M.o3); k.setAttribute('stroke', mix(C.link, C.gold, Math.max(on01(t, tNeeds, tD4 - 0.1), on01(t, tBiz, tD5)))); });
    // definition
    const o5 = { outDur: 0.3, ody: -16 };
    M.vis($('#dlab'), t, tD5 + 0.1, tD5out, { dy: 12, ...o5 });
    M.rise($('#quote1'), t, tD5 + 0.15, { st: 0.05, out: tD5out, outDur: 0.3 });
    M.rise($('#quote2'), t, tConn - 0.2, { st: 0.06, out: tD5out, outDur: 0.3 });
    M.vis($('#dgoal'), t, tGoal5 - 0.05, tD5out, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...o5 });
  }

  /* ===== P: subsystems ===== */
  const pOn = t >= tP0 - 0.1 && t < tI0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const po = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tP0 + 0.1, tPout, { dy: 24, ...po });
    M.vis($('#sys'), t, tP0 + 0.25, tPout, { dy: 36, ...po });
    M.vis($('#sysR'), t, tSub, 1e9, { dy: 10 });
    const brk = M.io((t - tBrk) / 0.3), hurt = M.io((t - tHurt) / 0.4);
    STS.forEach(([, ic, pp], i) => {
      const el = $('#ss' + i); M.vis(el, t, tPart - 0.1 + i * 0.1, 1e9, { dy: 20, sc: 0.95, sp: M.POP });
      const ta = tSt[i], act = on01(t, ta - 0.05, i < 2 ? tSt[i + 1] - 0.05 : tP1e, 0.3), seen = t >= ta - 0.05;
      const bad = i === 1 ? brk : hurt;
      const bg = el.querySelector('.bg');
      bg.style.background = mix(mix(seen ? C.card : C.paper, C.card, act), C.redBg, bad);
      bg.style.borderColor = mix(mix(seen ? C.gold : C.paper, C.gold, act), C.red, bad);
      el.querySelector('.sn').style.color = mix(seen ? C.ink : C.dim, C.red, bad);
      M.vis(el.querySelector('.sl'), t, tSub + i * 0.08, 1e9, { dy: 8 });
      el.querySelector('.sl').style.color = bad > 0.5 ? C.red : (seen ? C.gold : C.muted);
      el.querySelector('.si').style.background = mix(mix(C.card, C.paper, seen ? 1 : 0), C.card, bad);
      setIco(el.querySelector('.si'), ic, bad > 0.5 ? C.red : (seen ? C.gold : C.dim), 34, 2.2);
      pp.forEach((_, k) => {
        M.vis($(`#pa${i}_${k}`), t, ta + 0.1 + k * 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
        M.vis($(`#pn${i}_${k}`), t, ta + 0.18 + k * 0.1, 1e9, { dy: 8 });
        $(`#pa${i}_${k}`).style.background = mix(k ? C.ink2 : C.ink, C.red, bad);
      });
      if (act > 0.01 && t < ta + 0.6) pulse(el, t, ta - 0.05, 0.03, 0.45); else if (i === 1) pulse(el, t, tBrk, 0.04, 0.45);
    });
    [0, 1].forEach(i => {
      const l = $('#skl' + i), a = $('#ska' + i), td = tSt[i + 1] + 0.15;
      M.draw(l, t, td, 0.4, M.o3); M.vis(a, t, td + 0.3, 1e9, { dy: 0, fade: 0.12 });
      const dep = on01(t, tDep - 0.05, tBrk, 0.3);
      const c = mix(mix(C.link, C.gold, dep), C.red, M.io((t - tBrk - 0.15 - i * 0.12) / 0.3));
      l.setAttribute('stroke', c); a.setAttribute('stroke', c);
    });
    M.vis($('#ravRow'), t, tP1e - 0.3, 1e9, { dy: 16 });
    M.vis($('#sgoal'), t, tP1e + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    $('#sgoal').style.background = mix(C.gold, C.red, hurt);
  }

  /* ===== I: inputs, process, outputs, feedback ===== */
  const iOn = t >= tI0 - 0.1 && t < tO1 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const io = { outDur: 0.3, ody: -16 };
    const fade = 1 - M.io((t - tIout) / 0.3); $('#loopS').style.opacity = fade.toFixed(3);
    IO.forEach(([, ic, , ps], i) => {
      const el = $('#io' + i); M.vis(el, t, tI0 + 0.1 + i * 0.12, tIout, { dy: 36, ...io });
      const ta = tIo[i], td = tIo[i + 1], on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.it').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      el.querySelector('.ii').style.background = mix(C.paper, '#24345A', act);
      setIco(el.querySelector('.ii'), ic, t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 44, 2.2);
      const is = el.querySelector('.is'); M.rise(is, t, (i === 1 ? tTrans : ta) + 0.1, { st: 0.04 }); is.style.color = mix(C.gold2, C.gold, off);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      ps.forEach((_, k) => { const p = $(`#ip${i}_${k}`); M.vis(p, t, tIP[i][k] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }); p.style.background = mix(C.paper, '#24345A', act); p.style.color = mix(C.ink, '#fff', act); });
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tI0 + 1 && t < tIout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
      if (i === 0 && t > tLess - 0.1 && t < tIout) { const g = on01(t, tLess - 0.1, tIout - 0.3, 0.3); bg.style.borderColor = mix(C.line, C.gold, g); }
    });
    [0, 1].forEach(i => { M.draw($('#la' + i), t, tI0 + 0.55 + i * 0.15, 0.4, M.o3); M.vis($('#lh' + i), t, tI0 + 0.85 + i * 0.15, 1e9, { dy: 0, fade: 0.1 }); });
    M.draw($('#fbl'), t, tIo[3] + 0.1, 1.0, M.io); M.vis($('#fbh'), t, tIo[3] + 1.05, 1e9, { dy: 0, fade: 0.1 });
    M.vis($('#fbp'), t, tIo[3] + 0.5, tIout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...io });
    M.vis($('#fbs'), t, tSweet - 0.15, tIout, { dy: 40, ...io });
    M.rise($('#fbsT'), t, tSweet - 0.05, { st: 0.045, out: tIout, outDur: 0.3 });
  }

  /* ===== O: an open system ===== */
  const oOn = t >= tO1 - 0.1 && t < tY1 + 0.2; M.hide($('#sO'), !oOn);
  if (oOn) {
    const oo = { outDur: 0.3, ody: -16 };
    $('#envS').style.opacity = (1 - M.io((t - tOout) / 0.3)).toFixed(3);
    M.vis($('#osys'), t, tO1 + 0.1, tOout, { dy: 36, ...oo });
    M.vis($('#olab'), t, tO1 + 0.25, 1e9, { dy: 10 });
    [0, 1, 2].forEach(i => M.vis($('#mc' + i), t, tO1 + 0.35 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 }));
    [0, 1].forEach(i => M.vis($('#oa' + i), t, tO1 + 0.75 + i * 0.12, 1e9, { dx: -10, dy: 0, fade: 0.12 }));
    M.draw($('#ofl'), t, tO1 + 0.95, 0.7, M.io); M.vis($('#ofh'), t, tO1 + 1.6, 1e9, { dy: 0, fade: 0.1 });
    M.vis($('#ofb'), t, tO1 + 1.2, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
    M.vis($('#odash'), t, tOpen - 0.05, 1e9, { dy: 0, sc: 0.98, fade: 0.25 });
    M.vis($('#ochip'), t, tOpen + 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.rise($('#odef'), t, tWorld - 0.5, { st: 0.05 });
    const hot = [[tEnv[0], tEnv[1]], [tMilk - 0.05, tStall - 0.1], [tEnv[2], tEnv[3]], [tStall - 0.05, tAdapt]];
    ENV.forEach(([, ic], i) => {
      const el = $('#ev' + i); M.vis(el, t, tEnv[i] - 0.05, tOout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1, ...oo });
      M.draw($('#ea' + i), t, tEnv[i] + 0.15, 0.35, M.o3); M.draw($('#eb' + i), t, tEnv[i] + 0.3, 0.35, M.o3);
      const act = Math.max(on01(t, tEnv[i] - 0.05, i < 3 ? tEnv[i + 1] - 0.05 : T1('O2')), i === 1 || i === 3 ? on01(t, hot[i][0], hot[i][1]) : 0);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.gold, act); bg.style.borderColor = mix(C.card, C.gold, act);
      el.querySelector('.en').style.color = mix(C.ink, '#fff', act);
      el.querySelector('.ei').style.background = mix(C.paper, '#C99A48', act);
      setIco(el.querySelector('.ei'), ic, act > 0.5 ? '#fff' : C.gold, 34, 2.2);
      ['#ea', '#eb'].forEach(s => $(s + i).setAttribute('stroke', mix(C.link, C.gold, act)));
    });
    M.vis($('#ostrip'), t, tMilk - 0.25, tOout, { dy: 40, ...oo });
    M.vis($('#op0'), t, tMilk - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
    M.vis($('#op1'), t, tStall - 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
    M.vis($('#opA'), t, tAdapt - 0.35, 1e9, { dx: -16, dy: 0 });
    M.rise($('#opT'), t, tAdapt - 0.25, { st: 0.06 });
  }

  /* ===== Y: synergy ===== */
  const yOn = t >= tY1 - 0.1 && t < tQ + 0.05; M.hide($('#sY'), !yOn);
  if (yOn) {
    M.vis($('#syn'), t, tSyn - 0.6, 1e9, { dy: 36 });
    { const sh = M.spring(t - (tY3 - 0.35), M.HEAVY); $('#syn').style.width = sh >= 1 ? '784px' : (784 + 816 * (1 - sh)).toFixed(2) + 'px'; $('#synIn').style.transform = sh >= 1 ? 'none' : `translateX(${(408 * (1 - sh)).toFixed(2)}px)`; }
    { const tA = wt('Y3', 'alone'), g = M.lerp(40, 8, M.spring(t - tTeam, M.SOFT)), tog = M.io((t - tTeam) / 0.4);
      YA.forEach((_, k) => { const el = $('#ya' + k); M.vis(el, t, tA - 0.3 + k * 0.07, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); el.style.left = (48 + k * (72 + g)).toFixed(2) + 'px'; });
      const yl = $('#yline'); M.vis(yl, t, tA + 0.2, 1e9, { dy: 0, fade: 0.2 }); yl.style.width = (5 * (72 + g)).toFixed(2) + 'px'; yl.style.background = mix(C.line, C.gold, tog); }
    M.vis($('#yic'), t, tSyn - 0.4, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.rise($('#yT'), t, tSyn - 0.05, { st: 0.06, sp: M.HEAVY });
    M.rise($('#yM'), t, tWh - 0.1, { st: 0.05 });
    M.vis($('#yhr'), t, tSum - 0.1, 1e9, { dy: 0 });
    M.vis($('#ylb'), t, tSum, 1e9, { dy: 10 });
    M.rise($('#yF'), t, tParts - 0.2, { st: 0.08, sp: M.HEAVY });
    M.vis($('#yR'), t, tY3 - 0.1, 1e9, { dx: 60, dy: 0 });
    M.vis($('#yBig'), t, tHund - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    [[tSixty - 0.35, 312, 60, C.muted, '#E7E0D2'], [tTeam - 0.1, 520, 100, C.ink, C.gold]].forEach(([ta, w, v, vc, bc], k) => {
      const el = $('#yb' + k), bt = el.querySelector('.bt'), bv = el.querySelector('.bv');
      M.vis(el, t, tY3 + 0.1 + k * 0.12, 1e9, { dy: 16 });
      const u = M.o5((t - ta) / 0.9), ww = w * u;
      bt.style.width = ww.toFixed(1) + 'px'; bt.style.background = bc;
      bv.style.left = (ww + 20).toFixed(1) + 'px'; M.setT(bv, String(Math.round(v * u)));
      bv.style.opacity = M.clamp(ww / 40).toFixed(3); bv.style.color = vc;
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
    ROWS.forEach((_, i) => {
      M.vis($('#rw' + i), t, tRow[i] - 0.05, 1e9, { dy: 30 });
      M.rise($('#rw' + i + ' .rt'), t, tRow[i] + 0.08, { st: 0.04 });
    });
    for (let k = 0; k < 4; k++) {
      const el = $('#fp' + k); M.vis(el, t, tPill[k] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const a = tPill[k] - 0.05, b = k < 3 ? tPill[k + 1] - 0.05 : tRow[2] - 0.2;
      const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
      el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
      el.style.color = g > 0.5 ? '#fff' : C.ink;
    }
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist: whoosh on big scene changes, ticks, correct) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.2);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
