// MBA - Principles of Management, Ep 04: Management vs Administration
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  userX: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'm17 8 5 5', 'm22 8-5 5'],
  alert: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 8v4', 'M12 16h.01'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12', 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tCannot = wt('H2', 'cannot'), tWho = wt('H2', 'who');
const tC1 = T0('C1'), tAsha = wt('C1', 'Asha'), tUp = wt('C1', 'price'), tKabir = wt('C2', 'Kabir'), tBack = wt('C2', 'back');
const tConf = wt('C3', 'confused'), tNobody = wt('C3', 'nobody');
const tT = T0('T1'), tSt2 = wt('T1', 'Someone', 1), tTu = T0('D1') - 0.32;    // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tD2 = T0('D2'), tAdm = wt('D2', 'Administration'), tThink = wt('D2', 'thinking'), tD3 = T0('D3'), tDoing = wt('D3', 'doing'), tD4 = T0('D4'), tDout = T0('P1') - 0.32;
const tP1 = T0('P1'), tPol = [wt('P2', 'cup'), wt('P2', 'stall')], tPout = T0('R1') - 0.32;
const tR1 = T0('R1'), tR2 = T0('R2'), tAdmr = wt('R2', 'administrator'), tRi = [wt('R2', 'prices'), wt('R2', 'timings'), wt('R2', 'goals')];
const tR3 = T0('R3'), tShift = wt('R3', 'shift'), tMi = [wt('R3', 'runs'), wt('R3', 'every'), wt('R3', 'rules')], tRout = T0('K0') - 0.32;
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('V0') - 0.32;
const tKa = tK.map((_, i) => wt('K' + (i + 1), i === 4 ? 'Owners' : 'Administration')), tKm = tK.map((_, i) => wt('K' + (i + 1), i === 4 ? 'Managers' : 'Management'));
const tV0 = T0('V0'), tV = [T0('V1'), T0('V2'), T0('V3')];
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'It');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['above', 'inside', 'same'].map(w => wt('S4', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
// open-hours timeline: 6 AM .. 10 PM over 584 px
const PXH = 584 / 16;
$('#tks').innerHTML = [['6 AM', 0], ['10 AM', 4], ['2 PM', 8], ['6 PM', 12], ['10 PM', 16]].map(([l, h], i) => `<div class="tk tk${i}" style="left:${(h * PXH).toFixed(1)}px">${l}</div>`).join('');
const tlR = $('#tlR'); tlR.style.left = (3 * PXH).toFixed(1) + 'px'; tlR.style.width = (4 * PXH).toFixed(1) + 'px';
$('#hOi').innerHTML = M.icon('clock', 24, C.ink, 2.2); $('#hAi').innerHTML = M.icon('userX', 24, C.red, 2.2);
$('#pCi').innerHTML = M.icon('help', 24, C.ink, 2.2); $('#pWi').innerHTML = M.icon('alert', 24, C.red, 2.2);
$('#chg1 .avc').style.background = C.ink;
// definition cards
const EE = [['Administration', 'Decides the policies and goals', 'bulb', 'Thinking'], ['Management', 'Carries the policies out', 'gear', 'Doing']];
$('#eRow').innerHTML = EE.map(([t, m, ic, v], i) => `<div class="ee" id="ee${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">FUNCTION</div><div class="serif ev">${v}</div></div>`).join('');
$('#bothI').innerHTML = M.icon('book', 36, C.gold, 2.2);
// policy
$('#defI').innerHTML = M.icon('clipboard', 36, C.gold, 2.2);
const POL = [['tag', 'POLICY 01', '₹15 a cup', 'Same price on every shift'], ['clock', 'POLICY 02', 'Opens at 6 AM', 'Every day, whoever is on duty']];
$('#polRow').innerHTML = POL.map(([ic, s, t, m], i) => `<div class="card pol" id="pol${i}" style="left:${160 + i * 816}px"><div class="pi">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="hr"></div><div class="pm">${m}</div></div>`).join('');
// Ravi decides, Meena does
const WHO = [['R', 'Ravi', 'ADMINISTRATOR', 'Thinks and decides', C.gold, [['tag', 'Sets prices'], ['clock', 'Sets timings'], ['target', 'Sets goals']]],
  ['M', 'Meena', 'SHIFT MANAGER', 'Does the daily work', C.ink, [['store', 'Runs the stall'], ['clock', 'Every shift'], ['check', 'By the rules']]]];
$('#whoRow').innerHTML = WHO.map(([l, n, r, d, col, its], i) => `<div class="card who" id="who${i}" style="top:${i ? 610 : 270}px"><div class="avb" style="background:${col}">${l}</div><div class="serif wn">${n}</div><div class="wr">${r}</div><div class="wd">${d}</div>${its.map(([ic, tx], k) => `<div class="it" id="it${i}${k}" style="left:${784 + k * 272}px"><div class="ii">${M.icon(ic, 28, i ? C.ink : C.gold, 2.2)}</div><div class="itx">${tx}</div></div>`).join('')}</div>`).join('');
$('#flowI').innerHTML = M.icon('arrowD', 24, '#fff', 2.6);
// comparison table
const ROWS_K = [['layers', 'LEVEL', 'Top level', 'Middle and lower levels'], ['bulb', 'FUNCTION', 'Thinking', 'Doing'], ['target', 'FOCUS', 'Sets the goals', 'Reaches the goals'],
  ['scale', 'DECISIONS', 'Big, long-term ones', 'Daily, routine ones'], ['users', 'WHO', 'Owners, directors', 'Managers, supervisors']];
$('#trows').innerHTML = ROWS_K.map(([ic, a, x, y], i) => `<div class="trw" id="tr${i}" style="top:${132 + i * 86}px"><div class="tb"></div><div class="ta"><span class="tic"></span><span class="tal">${a}</span></div><div class="tv tva" style="left:400px">${x}</div><div class="tv tvm" style="left:976px">${y}</div></div>`).join('');
// three views: small diagrams in the stall style
const box = (y, fill, txt, tc, stroke) => `<rect x="116" y="${y}" width="280" height="64" rx="18" fill="${fill}" ${stroke ? `stroke="${stroke}" stroke-width="3"` : ''}/><text x="256" y="${y + 33}" text-anchor="middle" dominant-baseline="central" font-family="Poppins" font-weight="600" font-size="17" letter-spacing="2.6" fill="${tc}">${txt}</text>`;
const VIEWS = [
  ['Above', 'Administration is on top', 'OLIVER SHELDON',
    `<g class="v0">${box(14, C.ink, 'ADMINISTRATION', '#F5E7C6')}</g><g class="v1"><path d="M256 90 v34 M244 112 l12 12 l12 -12" fill="none" stroke="${C.gold}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g><g class="v2">${box(136, C.paper, 'MANAGEMENT', C.ink, C.line)}</g>`],
  ['Inside', 'Management holds it all', 'E.F.L. BRECH',
    `<g class="v0"><circle cx="256" cy="108" r="100" fill="${C.paper}" stroke="${C.line}" stroke-width="3"/><text x="256" y="46" text-anchor="middle" dominant-baseline="central" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2.4" fill="${C.ink}">MANAGEMENT</text></g><g class="v1"><circle cx="256" cy="126" r="54" fill="${C.ink}"/></g><g class="v2"><text x="256" y="126" text-anchor="middle" dominant-baseline="central" font-family="Poppins" font-weight="600" font-size="15" letter-spacing="2" fill="#F5E7C6">ADMIN</text></g>`],
  ['Same thing', 'Two names, one job', 'HAROLD KOONTZ AND OTHERS',
    `<g class="v0">${box(14, C.ink, 'ADMINISTRATION', '#F5E7C6')}</g><g class="v1"><path d="M238 100 h36 M238 114 h36" stroke="${C.gold}" stroke-width="5" stroke-linecap="round"/></g><g class="v2">${box(136, C.paper, 'MANAGEMENT', C.ink, C.line)}</g>`]];
$('#vRow').innerHTML = VIEWS.map(([t, s, b, svg], i) => `<div class="card uc" id="vc${i}" style="left:${160 + i * 544}px"><svg width="512" height="216" viewBox="0 0 512 216">${svg}</svg><div class="serif ut">${t}</div><div class="us">${s}</div><div class="ub">${b}</div></div>`).join('');
// quiz
const OPTS = ['Wash cups', 'Set prices', 'Serve chai', 'Count cash'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('bulb', 44, C.gold2, 2.4);
// recap
const ROWS = [['bulb', 'Administration = <span class="acc">thinking</span>, decides the policies'], ['gear', 'Management = <span class="acc">doing</span>, carries them out'], ['layers', 'Three views']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
$('#rw2').insertAdjacentHTML('beforeend', ['Above', 'Inside', 'Same'].map((p, k) => `<div class="fp" id="fp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
// price changes: [time, value]
const PRICE = [[0, '₹15'], [tUp, '₹20'], [tBack, '₹15']];
const priceAt = t => { let k = 0; for (let i = 1; i < PRICE.length; i++) if (t >= PRICE[i][0]) k = i; return k; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  $('#hAway').style.left = (36 + $('#hOpen').offsetWidth + 16) + 'px';
  $('#pWho').style.left = (36 + $('#pConf').offsetWidth + 16) + 'px';
  const rt = $('#rw2 .rt'); let x = 216 + rt.offsetWidth + 40;
  for (let k = 0; k < 3; k++) { const p = $('#fp' + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
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

  /* example-figures chip: prices in the hook, then the policy cards */
  if (t < tT) M.vis($('#exChip'), t, tUp + 0.2, tT - 0.3, { dy: 10, outDur: 0.2 });
  else M.vis($('#exChip'), t, tP1 + 0.3, tPout, { dy: 10, outDur: 0.3 });

  /* ===== A: long hours, nobody in charge ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    // Ravi leaves: his figure turns into an empty (solid) outline and a question mark takes his place
    const gone = M.io((t - tCannot) / 0.4);
    $('#rvH').setAttribute('fill', mix(C.ink, C.paper2, gone)); $('#rvB').setAttribute('fill', mix(C.ink, C.paper2, gone));
    $('#rvC').setAttribute('stroke', mix(C.gold, C.paper2, gone));
    const qp = M.spring(t - tCannot - 0.25, M.POP); M.hide($('#qm'), t < tCannot + 0.25);
    $('#qm').setAttribute('transform', `translate(308 ${(104 + (1 - qp) * 16).toFixed(2)}) scale(${(0.6 + 0.4 * qp).toFixed(4)})`);
    $('#qm').style.opacity = M.clamp((t - tCannot - 0.25) / 0.12).toFixed(3);
    M.setT($('#htag'), t < tCannot + 0.2 ? 'OWNER · CHAI CORNER' : 'OWNER · NOT HERE ALL DAY');
    // price board on the stall
    const k = priceAt(t), tk = PRICE[k][0];
    $('#tagT').textContent = PRICE[k][1];
    const tp = k ? M.spring(t - tk, M.POP) : 1;
    $('#tagG').setAttribute('transform', `translate(470 196) scale(${(1 + 0.08 * Math.sin(Math.PI * M.clamp((t - tk) / 0.4)) * (k ? 1 : 0)).toFixed(4)})`);
    M.vis($('#tagIn'), t, tMorph + 1.0, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    // open-hours card
    M.vis($('#hours'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.count($('#hN'), t, tMorph + 0.6, 1.2, 0, 16, v => Math.round(v) + 'h');
    $('#tlF').style.width = (584 * M.o3((t - tMorph - 0.6) / 1.2)).toFixed(1) + 'px';
    M.vis($('#tks'), t, tMorph + 0.7, 1e9, { dy: 8 });
    M.vis(tlR, t, tCannot + 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.vis($('#hOpen'), t, tMorph + 1.0, 1e9, { dy: 16 });
    M.vis($('#hAway'), t, tCannot + 0.3, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    // price card
    M.vis($('#price'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const pN = $('#pN'); M.setT(pN, PRICE[k][1]);
    pN.style.transform = tp >= 1 ? 'none' : `translateY(${((1 - tp) * 28).toFixed(2)}px)`;
    pN.style.opacity = k ? M.clamp((t - tk) / 0.12).toFixed(3) : '';
    pN.style.color = mix(k === 1 ? mix(C.ink, C.gold, M.io((t - tUp) / 0.3)) : C.ink, C.red, M.io((t - tNobody) / 0.4));
    M.vis($('#chg0'), t, tAsha - 0.05, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#chg1'), t, tKabir - 0.05, 1e9, { dy: 20, sp: M.SOFT });
    M.vis($('#pConf'), t, tConf - 0.05, 1e9, { dy: 16 });
    M.vis($('#pWho'), t, tNobody, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: thinking vs doing ===== */
  const dOn = t >= tTu - 0.05 && t < tP1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.12, outDur: 0.3 });
    EE.forEach((_, i) => {
      const el = $('#ee' + i), ta = i ? tD3 : tAdm, td = i ? tD4 : tD3, tv = i ? tDoing : tThink;
      M.vis(el, t, tD2 + 0.15 + i * 0.1, tDout, { dy: 36, outDur: 0.3, ody: -16 });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const em = el.querySelector('.em'); M.rise(em, t, ta + 0.1, { st: 0.04 }); em.style.color = mix(C.gold2, C.gold, off);
      el.querySelector('.eic').style.background = mix(C.paper, '#24345A', act);
      setIco(el.querySelector('.ico'), EE[i][2], t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.45, 1e9, { dy: 10 }); ex.style.color = mix('#8C96AE', C.muted, off);
      const ev = el.querySelector('.ev'); M.rise(ev, t, tv - 0.05, { st: 0.04, sp: M.HEAVY }); ev.style.color = mix(C.gold2, C.gold, off);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (Math.abs(lift) > 0.001) el.style.transform = `scale(${(1 + 0.02 * lift).toFixed(4)})`; else if (t > ta + 2 && el.style.transform !== 'none' && t < tDout) el.style.transform = 'none';
    });
    M.vis($('#both'), t, tD4 + 0.05, tDout, { dy: 40, outDur: 0.3, ody: -16 });
  }

  /* ===== P: what a policy is ===== */
  const pOn = t >= tP1 - 0.1 && t < tR1 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tP1 + 0.12, tPout, { dy: 24, ...o });
    POL.forEach((_, i) => {
      const el = $('#pol' + i); M.vis(el, t, tPol[i] - 0.1, tPout, { dy: 36, ...o });
      M.rise(el.querySelector('.pt'), t, tPol[i] + 0.05, { st: 0.06, sp: M.HEAVY });
      M.vis(el.querySelector('.pm'), t, tPol[i] + 0.35, 1e9, { dy: 12 });
    });
  }

  /* ===== R: Ravi decides, Meena does ===== */
  const rOn = t >= tR1 - 0.1 && t < tK0 + 0.2; M.hide($('#sR'), !rOn);
  if (rOn) {
    const o = { outDur: 0.3, ody: -16 };
    WHO.forEach((w, i) => {
      const el = $('#who' + i), tin = i ? wt('R1', 'two') : tR1 + 0.1, tr = i ? tShift : tAdmr, act = i ? [tR3, tRout + 1] : [tR2, tR3];
      M.vis(el, t, tin, tRout, { dy: 30, ...o });
      M.rise(el.querySelector('.wn'), t, tin + 0.1, { st: 0.06 });
      M.vis(el.querySelector('.wr'), t, tr - 0.05, 1e9, { dy: 10 });
      M.rise(el.querySelector('.wd'), t, tr + 0.25, { st: 0.04 });
      const a = M.io((t - act[0]) / 0.3) * (1 - M.io((t - act[1]) / 0.4));
      el.querySelector('.avb').style.background = mix(C.dim, w[4], M.io((t - act[0]) / 0.3));
      const its = i ? tMi : tRi;
      its.forEach((ts, k) => {
        const it = $('#it' + i + k); M.vis(it, t, ts - 0.06, 1e9, { dy: 24, sp: M.SOFT });
        it.style.background = mix(C.paper, i ? '#E8EBF1' : '#F3E9D3', M.io((t - ts) / 0.25) * (1 - M.io((t - (its[k + 1] ?? act[1]) + 0.05) / 0.35)));
      });
      el.style.boxShadow = '';
      void a;
    });
    M.vis($('#flowP'), t, tR3 - 0.05, tRout, { dy: -16, sc: 0.85, sp: M.POP, ...o });
  }

  /* ===== K: the comparison table, row by row ===== */
  const kOn = t >= tK0 - 0.1 && t < tV0 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#tbl'), t, tK0 + 0.08, tKout, { dy: 36, ...o });
    M.vis($('#th0'), t, tK0 + 0.3, 1e9, { dy: 12 });
    M.vis($('#th1'), t, wt('K0', 'two') - 0.1, 1e9, { dy: 12 });
    M.vis($('#th2'), t, wt('K0', 'two') + 0.05, 1e9, { dy: 12 });
    M.vis($('#tsep'), t, tK0 + 0.5, 1e9, { dy: 0 });
    ROWS_K.forEach((r, i) => {
      const el = $('#tr' + i), ta = tK[i], td = i < 4 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, ta - 0.05, 1e9, { dy: 24 });
      const act = M.io((t - ta) / 0.3) * (1 - M.io((t - td + 0.1) / 0.35));
      el.querySelector('.tb').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.ta').style.color = mix(C.muted, C.gold2, act);
      setIco(el.querySelector('.tic'), r[0], act > 0.5 ? C.gold2 : C.gold, 28, 2.2);
      const va = el.querySelector('.tva'), vm = el.querySelector('.tvm');
      M.rise(va, t, tKa[i] - 0.02, { st: 0.04 }); M.rise(vm, t, tKm[i] - 0.02, { st: 0.04 });
      va.style.color = mix(C.ink, '#fff', act); vm.style.color = mix(C.ink, '#fff', act);
    });
  }

  /* ===== V: three views ===== */
  const vOn = t >= tV0 - 0.1 && t < tQ + 0.05; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.rise($('#uh'), t, tV0 + 0.08, { st: 0.06, sp: M.HEAVY });
    VIEWS.forEach((_, i) => {
      const el = $('#vc' + i); M.vis(el, t, tV[i] - 0.06, 1e9, { dy: 30, sc: 0.92, sp: M.POP });
      [0, 1, 2].forEach(k => { const g = el.querySelector('.v' + k); const p = M.vis(g, t, tV[i] + 0.25 + k * 0.22, 1e9, { dy: 0, fade: 0.15 }); void p; });
      M.vis(el.querySelector('.ub'), t, tV[i] + 0.3, 1e9, { dy: 10 });
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, wt('Q1', 'Four') - 0.05, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Which') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Four') + 0.3 + i * 0.08, 1e9, { dy: 40 });
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
    for (let k = 0; k < 3; k++) {
      const el = $('#fp' + k); M.vis(el, t, tPill[k] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const a = tPill[k] - 0.05, b = k < 2 ? tPill[k + 1] - 0.05 : tN - 0.4;
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
