// MBA - Principles of Management, Ep 01: Introduction to Management
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  userPlus: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M19 8v6', 'M22 11h-6'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  userX: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm17 8 5 5', 'm22 8-5 5'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tHundred = wt('H2', 'hundred');
const tC1 = T0('C1'), tJob = [wt('C2', 'boils'), wt('C2', 'takes'), wt('C2', 'washes')], tAngry = wt('C3', 'angry'), tWalk = wt('C3', 'walk');
const tT = T0('T1'), tSt2 = wt('T1', 'He', 1), tTu = T0('D1') - 0.32;          // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tD2 = T0('D2'), tPeople = wt('D2', 'people'), tD3 = T0('D3'), tTeam = wt('D3', 'team');
const tTm = [wt('D4', 'Asha'), wt('D4', 'Kabir'), wt('D4', 'Meena')], tGoal = wt('D5', 'goal'), tDout = T0('E1') - 0.32;
const tE1 = T0('E1'), tE2 = T0('E2'), tE3 = T0('E3'), tE4 = T0('E4'), tEout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tFix = wt('F5', 'fixing'), tFout = T0('R1') - 0.32;
const tR1 = T0('R1'), tFour = wt('R2', 'four'), tFif = wt('R2', 'fifteen'), tThree = wt('R2', 'three', 0), tRout = T0('U1') - 0.32;
const tU1 = T0('U1'), tU = [wt('U2', 'school'), wt('U2', 'home'), wt('U2', 'cricket')];
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'He');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['plan', 'organize', 'staff', 'direct', 'control'].map(w => wt('S4', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
// cups pile (counter top is y 196 in the stall svg)
const CUPS = []; [[4, 0], [3, 1], [2, 2]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([430 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// people in the queue (2 rows x 10)
const PERSON = `<svg width="40" height="48" viewBox="0 0 40 48" fill="currentColor"><circle cx="20" cy="11" r="10"/><path d="M2 47c0-11 8-19 18-19s18 8 18 19z"/></svg>`;
$('#ppl').innerHTML = Array.from({ length: 20 }, (_, i) => `<div class="pp" id="pp${i}" style="left:${(i % 10) * 58}px;top:${Math.floor(i / 10) * 64}px">${PERSON}</div>`).join('');
$('#wTi').innerHTML = M.icon('timer', 24, C.ink, 2.2); $('#wLi').innerHTML = M.icon('userX', 24, C.red, 2.2);
// jobs
const JOBS = [['Boil tea', 'cup'], ['Take money', 'coin'], ['Wash cups', 'droplet']];
$('#jobRow').innerHTML = JOBS.map(([t, ic], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon(ic, 28, C.ink, 2.2)}</div><div class="jt">${t}</div><div class="av">R</div></div>`).join('');
// definition + team
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2); $('#goalI').innerHTML = M.icon('smile', 28, '#fff', 2.4);
const TEAM = [['A', 'Asha', 'Makes the tea', 'cup'], ['K', 'Kabir', 'Takes the money', 'coin'], ['M', 'Meena', 'Washes the cups', 'droplet']];
$('#team').innerHTML = TEAM.map(([l, n, d, ic], i) => `<div class="card tm" id="tm${i}" style="left:${160 + i * 544}px"><div class="avc" style="left:32px;top:58px">${l}</div><div class="serif nm">${n}</div><div class="ds">${d}</div><div class="ic">${M.icon(ic, 30, C.gold, 2.2)}</div></div>`).join('');
// effective / efficient
const EE = [['Effective', 'Doing the right things', 'target', 'Serve the chai people love'], ['Efficient', 'Doing things right', 'gauge', 'No wasted milk, no wasted time']];
$('#eRow').innerHTML = EE.map(([t, m, ic, v], i) => `<div class="ee" id="ee${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">AT CHAI CORNER</div><div class="ev">${v}</div></div>`).join('');
// five functions: nodes on a ring
const FN = [['PLAN', 'clipboard', 'Planning', 'Deciding what to do', 'Decide how much milk to buy for tomorrow'],
  ['ORGANIZE', 'network', 'Organizing', 'Deciding who does what', 'Asha at the stove, Kabir at the cash box'],
  ['STAFF', 'userPlus', 'Staffing', 'Finding the right people', 'Hire a helper for the morning rush'],
  ['DIRECT', 'compass', 'Directing', 'Guiding and motivating', 'Teach the recipe and cheer the team on'],
  ['CONTROL', 'gauge', 'Controlling', 'Checking and fixing', 'Make sure the chai tastes the same every day']];
const CX = 536, CY = 565, RR = 220, ang = i => (-90 + i * 72) * Math.PI / 180;
$('#nodes').innerHTML = FN.map(([l], i) => `<div class="nd" id="nd${i}" style="left:${(CX + RR * Math.cos(ang(i)) - 68).toFixed(1)}px;top:${(CY + RR * Math.sin(ang(i)) - 68).toFixed(1)}px"><div class="bg"></div><div class="ni"></div><div class="nl">${l}</div></div>`).join('');
$('#arrows').innerHTML = FN.map((_, i) => { const a = -90 + i * 72 + 36, r = a * Math.PI / 180; return `<path id="ar${i}" d="M-7 -9 L5 0 L-7 9" fill="none" stroke="#D9CFBC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(${(CX + RR * Math.cos(r)).toFixed(1)} ${(CY + RR * Math.sin(r)).toFixed(1)}) rotate(${a + 90})"/>`; }).join('');
const PANES = [['THE BIG IDEA', '5 Functions', 'What every manager does', 'store', 'Ravi runs Chai Corner with these 5 steps']]
  .concat(FN.map((f, i) => [`STEP 0${i + 1} / 05`, f[2], f[3], f[1], f[4]]));
$('#pans').innerHTML = PANES.map(([s, t, m, ic, e], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div><div class="pe"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><span>${e}</span></div></div>`).join('');
// results
const RES = [['CUSTOMERS SERVED PER HOUR', '4x more', [['Before', 140, '20'], ['After', 560, '80']]], ['WAIT TIME', '5x faster', [['Before', 560, '15 min'], ['After', 112, '3 min']]]];
$('#rRow').innerHTML = RES.map(([l, b, bars], i) => `<div class="card rc" id="rc${i}" style="left:${160 + i * 816}px"><div class="lbl">${l}</div><div class="serif big">${b}</div>${bars.map(([n], k) => `<div class="bar" id="br${i}${k}" style="top:${150 + k * 140}px"><div class="bl">${n}</div><div class="bt"></div><div class="serif bv"></div></div>`).join('')}</div>`).join('');
// everywhere
const UU = [['cap', 'School', 'Teachers plan every lesson'], ['home', 'Home', 'Parents plan the week'], ['trophy', 'Cricket team', 'The captain sets the field']];
$('#uRow').innerHTML = UU.map(([ic, t, s], i) => `<div class="card uc" id="uc${i}" style="left:${160 + i * 544}px"><div class="ui">${M.icon(ic, 56, C.gold, 2)}</div><div class="serif ut">${t}</div><div class="us">${s}</div></div>`).join('');
// quiz
const OPTS = ['Planning', 'Organizing', 'Directing', 'Controlling'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('gauge', 44, C.gold2, 2.4);
// recap
const ROWS = [['users', 'Management = getting things done <span class="acc">through people</span>'], ['target', 'Be <span class="acc">effective</span> and <span class="acc">efficient</span>'], ['clipboard', 'Five functions']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
$('#rw2').insertAdjacentHTML('beforeend', ['Plan', 'Organize', 'Staff', 'Direct', 'Control'].map((p, k) => `<div class="fp" id="fp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const arcD = (deg) => { const a0 = -Math.PI / 2, a1 = a0 + deg * Math.PI / 180; const x0 = CX + RR * Math.cos(a0), y0 = CY + RR * Math.sin(a0), x1 = CX + RR * Math.cos(a1), y1 = CY + RR * Math.sin(a1); return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${RR} ${RR} 0 ${deg > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
const ringDeg = M.track(0, [[tF[1], 72], [tF[2], 144], [tF[3], 216], [tF[4], 288], [tFix, 359.9]], M.SOFT);
const raviX = M.track(0, [[tJob[0], -44], [tJob[1], 0], [tJob[2], 30], [tAngry, 0]], M.SOFT);
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const rt = $('#rw2 .rt'); let x = 216 + rt.offsetWidth + 40;
  for (let k = 0; k < 5; k++) { const p = $('#fp' + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const hideAll = t >= tQ;   // after the quiz sweep the lesson scenes are gone

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

  /* ===== A: one man, a hundred customers ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    $('#ravi').setAttribute('transform', `translate(${raviX(t).toFixed(2)} 0)`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = i < 3 ? tMorph + 0.9 + i * 0.06 : tJob[2] + (i - 3) * 0.18; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // waiting card
    M.vis($('#wait'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const lost = M.o5((t - tWalk) / 0.9) * 23;
    const n = 100 * M.o5((t - tHundred) / 1.4) - lost;
    M.setT($('#wN'), String(Math.max(0, Math.round(n))));
    $('#wN').style.color = mix(C.ink, C.red, M.io((t - tAngry) / 0.4));
    for (let k = 0; k < 20; k++) {
      const el = $('#pp' + k), tin = tHundred + k * 0.06, leave = k >= 14, tl = tWalk + (k - 14) * 0.07;
      const p = M.vis(el, t, tin, leave ? tl : 1e9, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.45, odx: 46, ody: 0 });
      el.style.color = leave ? mix(C.ink2, C.red, M.io((t - tAngry) / 0.3)) : C.ink2;
    }
    M.vis($('#wTime'), t, tC1 + 0.1, 1e9, { dy: 16 });
    const wmin = 2 + 13 * M.io((t - tC1 - 0.2) / (tAngry - tC1));
    M.setT($('#wTt'), `Wait ${Math.round(wmin)} min`);
    const hot = M.io((t - tAngry + 0.6) / 0.6); $('#wTime').style.background = mix(C.paper, C.redBg, hot); $('#wTime').style.color = mix(C.ink, C.red, hot);
    setIco($('#wTi'), 'timer', hot > 0.5 ? C.red : C.ink, 24);
    M.vis($('#wLost'), t, tWalk + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.setT($('#wLt'), `${Math.round(lost)} walked away`);
    // jobs card
    M.vis($('#jobs'), t, tMorph + 0.42, 1e9, { dy: 36 });
    JOBS.forEach((_, i) => {
      const el = $('#job' + i); M.vis(el, t, tJob[i] - 0.05, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.av'), t, tJob[i] + 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    });
    // all three jobs land on one person: avatars pulse red when the line breaks
    const strain = M.io((t - tAngry) / 0.4);
    JOBS.forEach((_, i) => { const av = $('#job' + i + ' .av'); av.style.background = mix(C.gold, C.red, strain); });
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

  /* ===== D: what is management? ===== */
  const dOn = t >= tTu - 0.05 && t < tE1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#qmark'), t, tD2 + 0.05, tD3 - 0.12, { dy: 0, sc: 0.6, sp: M.POP, outDur: 0.25, ody: -10 });
    M.rise($('#quote1'), t, tD2 + 0.1, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, wt('D2', 'things') - 0.05, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    M.vis($('#qby'), t, tPeople + 0.3, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tD3 + 0.12, tDout, { dy: 24, ...o });
    M.vis($('#boss'), t, tD3 + 0.32, tDout, { dy: 0, sc: 0.85, sp: M.POP, ...o });
    [0, 1, 2].forEach(i => {
      M.draw($('#l' + i), t, tTeam + 0.05 + i * 0.08, 0.55, M.o3);
      const el = $('#tm' + i); M.vis(el, t, tTm[i] - 0.08, tDout, { dy: 30, ...o });
      el.querySelector('.avc').style.background = mix(C.ink, C.gold, on01(t, tTm[i], i < 2 ? tTm[i + 1] : tGoal - 0.3));
      M.draw($('#g' + i), t, tGoal - 0.1 + i * 0.06, 0.45, M.o3);
    });
    const lk = M.io((t - tDout) / 0.25); $('#links').style.opacity = (1 - lk).toFixed(3);
    M.vis($('#goal'), t, tGoal + 0.25, tDout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, ...o });
  }

  /* ===== E: effective vs efficient ===== */
  const eOn = t >= tE1 - 0.1 && t < tF0 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    EE.forEach((_, i) => {
      const el = $('#ee' + i), ta = i ? tE3 : tE2, td = i ? tE4 : tE3;
      M.vis(el, t, tE1 + 0.15 + i * 0.1, tEout, { dy: 36, outDur: 0.3, ody: -16 });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const em = el.querySelector('.em'); M.rise(em, t, ta + 0.1, { st: 0.04 }); em.style.color = mix(C.gold2, C.gold, off);
      el.querySelector('.eic').style.background = mix(C.paper, '#24345A', act);
      setIco(el.querySelector('.ico'), EE[i][2], t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.45, 1e9, { dy: 10 }); ex.style.color = mix('#8C96AE', C.muted, off);
      const ev = el.querySelector('.ev'); M.rise(ev, t, ta + 0.55, { st: 0.04 }); ev.style.color = mix('#fff', C.ink, off);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (Math.abs(lift) > 0.001) el.style.transform = `scale(${(1 + 0.02 * lift).toFixed(4)})`; else if (t > ta + 2 && el.style.transform !== 'none' && t < tEout) el.style.transform = 'none';
    });
    M.vis($('#both'), t, tE4 - 0.05, tEout, { dy: 40, outDur: 0.3, ody: -16 });
  }

  /* ===== F: the five functions ===== */
  const fOn = t >= tF0 - 0.1 && t < tR1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    const ringOut = M.io((t - tFout) / 0.3);
    $('#cyc').style.opacity = (1 - ringOut).toFixed(3);
    M.draw($('#ringC'), t, tF0 + 0.1, 1.0, M.io);
    for (let i = 0; i < 5; i++) M.vis($('#ar' + i), t, tF0 + 0.6 + i * 0.1, 1e9, { dy: 0, fade: 0.15 });
    const deg = ringDeg(t); M.hide($('#ringG'), t < tF[1] || deg < 0.5); if (deg >= 0.5) $('#ringG').setAttribute('d', arcD(deg));
    M.vis($('#hub'), t, tF0 + 0.2, tFout, { dy: 0, sc: 0.7, sp: M.POP, ...fo });
    FN.forEach((f, i) => {
      const el = $('#nd' + i), ta = tF[i], td = i < 4 ? tF[i + 1] : tFout + 1;
      M.vis(el, t, tF0 + 0.3 + i * 0.1, tFout, { dy: 0, sc: 0.6, sp: M.POP, ...fo });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.gold, act); bg.style.borderColor = mix(t >= ta ? C.gold : C.line, C.gold, act);
      setIco(el.querySelector('.ni'), f[1], act > 0.5 ? '#fff' : (t >= ta ? C.gold : C.dim), 44, 2);
      el.querySelector('.nl').style.color = act > 0.5 ? '#fff' : (t >= ta ? C.ink : C.muted);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tF0 + 2 && t < tFout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.08 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#panel'), t, tF0 + 0.35, tFout, { dx: 60, dy: 0, ...fo });
    PANES.forEach((_, k) => {
      const tin = k ? tF[k - 1] : tF0 + 0.5, tout = k < 5 ? (k ? tF[k] : tF[0]) - 0.14 : 1e9;
      const pn = $('#pn' + k); M.hide(pn, t < tin - 0.01 || t > tout + 0.3);
      if (t < tin - 0.01 || t > tout + 0.3) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo });
    });
  }

  /* ===== R: one week later ===== */
  const rOn = t >= tR1 - 0.1 && t < tU1 + 0.2; M.hide($('#sR'), !rOn);
  M.vis($('#exChip'), t, tR1 + 0.3, tRout, { dy: 10, outDur: 0.3 });
  if (rOn) {
    const ro = { outDur: 0.3, ody: -16 };
    RES.forEach((r, i) => {
      M.vis($('#rc' + i), t, tR1 + 0.1 + i * 0.12, tRout, { dy: 36, ...ro });
      M.vis($('#rc' + i + ' .big'), t, i ? tThree + 0.2 : tFour + 0.25, tRout, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1, ...ro });
      r[2].forEach(([n, w, v], k) => {
        const el = $('#br' + i + k), bt = el.querySelector('.bt'), bv = el.querySelector('.bv');
        M.vis(el, t, tR1 + 0.5 + k * 0.12 + i * 0.1, tRout, { dy: 16, ...ro });
        let ww, val;
        if (i === 0) { ww = k === 0 ? w * M.o3((t - tR1 - 0.6) / 0.6) : w * M.o5((t - tFour) / 0.9); val = k === 0 ? '20' : String(Math.round(80 * M.o5((t - tFour) / 0.9))); }
        else if (k === 0) { ww = w * M.o3((t - tR1 - 0.7) / 0.6); val = '15 min'; }
        else { const g = M.o3((t - tFif) / 0.5), s = M.io((t - tThree) / 0.8); ww = 560 * g - (560 - 112) * s; val = `${Math.round(15 - 12 * s)} min`; }
        bt.style.width = Math.max(0, ww).toFixed(1) + 'px'; bt.style.background = k === 1 ? C.gold : '#E7E0D2';
        bv.style.left = (Math.max(0, ww) + 20).toFixed(1) + 'px'; M.setT(bv, val);
        bv.style.opacity = M.clamp(ww / 40).toFixed(3); bv.style.color = k === 1 ? C.ink : C.muted;
      });
    });
  }

  /* ===== U: everywhere ===== */
  const uOn = t >= tU1 - 0.1 && t < tQ + 0.05; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.rise($('#uh'), t, tU1 + 0.08, { st: 0.06, sp: M.HEAVY });
    UU.forEach((_, i) => M.vis($('#uc' + i), t, tU[i] - 0.06, 1e9, { dy: 30, sc: 0.92, sp: M.POP }));
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
    for (let k = 0; k < 5; k++) {
      const el = $('#fp' + k); M.vis(el, t, tPill[k] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const a = tPill[k] - 0.05, b = k < 4 ? tPill[k + 1] - 0.05 : tN - 0.4;
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
