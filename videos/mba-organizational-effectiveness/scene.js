// MBA - Principles of Management, Ep 28 (finale): Organizational Effectiveness
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E', off: '#F0EBE1' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  trendUp: ['M22 7 13.5 15.5 8.5 10.5 2 17', 'M16 7h6v6'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  owner: ['M2 20h20', 'm4 17-2-11 6 4 4-7 4 7 6-4-2 11Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tFive = wt('H2', 'five'), tWell = wt('H2', 'doing');
const tK = T0('C1'), tGreat = wt('C1', 'great'), tA = T0('C2'), tMe = wt('C2', 'Meena'), tDiff = wt('C3', 'different'), tRight = wt('C3', 'right');
const tT = T0('T1'), tSt2 = wt('T1', 'Ravi'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tHow = wt('D2', 'how'), tAch = wt('D2', 'achieves'), tD3 = T0('D3'), tCard = wt('D3', 'card'), tDout = T0('E1') - 0.32;
const tE1 = T0('E1'), tEp = wt('E1', 'episode'), tEff = wt('E1', 'Effective'), tE2 = T0('E2'), tE3 = T0('E3'), tWrong = wt('E3', 'wrong'), tEout = T0('F0') - 0.32;
const tF0 = T0('F0'), tF = [1, 2, 3, 4].map(i => T0('F' + i)), tFout = T0('I0') - 0.32;
const tFq = [wt('F1', 'Did'), wt('F2', 'Can'), wt('F3', 'Does'), wt('F4', 'Is')];
const tFe = [wt('F1', 'Ravi'), wt('F2', 'like'), wt('F3', 'smoothly'), wt('F4', 'customers')];
const tSh = ['customers', 'staff', 'owners', 'suppliers', 'society'].map(w => wt('F4', w));
const tI0 = T0('I0'), tG = [wt('I1', 'Profit'), wt('I1', 'productivity'), wt('I1', 'customer'), wt('I1', 'employee'), wt('I1', 'growth'), wt('I1', 'adaptability')], tIout = T0('J0') - 0.32;
const tJ0 = T0('J0'), tMs = [wt('J1', 'started'), wt('J2', 'team'), wt('J3', 'second'), wt('J3', 'five')];
const tLp = [wt('J2', 'plan'), wt('J2', 'organize'), wt('J2', 'control'), wt('J4', 'decide'), wt('J4', 'delegate'), wt('J4', 'span')], tJout = T0('J5') - 0.32;
const tJ5 = T0('J5'), tSc = [wt('J5', 'Goals'), wt('J5', 'Resources'), wt('J5', 'Smooth'), wt('J5', 'Stakeholders')], tJ6 = T0('J6'), tBig = wt('J6', 'bigger'), tEffv = wt('J6', 'effective');
const tQ = T0('Q1'), tQw = wt('Q1', 'Which'), tCount = T1('Q1') + 0.05, tAnsQ = T0('A1') - 0.02, tTakeQ = wt('A1', 'He');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'achieves')], ['goals', 'resources', 'internal', 'stakeholders'].map(w => wt('S3', w)), [wt('S4', 'right'), wt('S4', 'right', 1)]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// five outlets
$('#outs').innerHTML = [0, 1, 2, 3, 4].map(k => `<div class="ol" id="ol${k}" style="left:${300 + k * 116}px"></div>`).join('');
$('#pPI').innerHTML = M.icon('users', 24, C.ink, 2.2); $('#pHI').innerHTML = M.icon('home', 24, C.ink, 2.2);
// three opinions
const ASK = [['K', 'KABIR SAYS', 'Sales are up', 'Doing great', 'check', C.gold, '#fff'], ['A', 'ASHA ASKS', 'Staff happy?', 'Not sure', 'help', C.redBg, C.red], ['M', 'MEENA ASKS', 'Customers?', 'Not sure', 'help', C.redBg, C.red]];
$('#jobRow').innerHTML = ASK.map(([l, d, o, p, ic, bg, fg], i) => `<div class="job" id="job${i}" style="left:${36 + i * 291}px"><div class="jd">${d}</div><div class="av">${l}</div><div class="jt">${o}</div><div class="jp" style="background:${bg};color:${fg}"><span>${M.icon(ic, 20, fg, 2.6)}</span><span>${p}</span></div></div>`).join('');
// definition + report card
$('#defI').innerHTML = M.icon('target', 36, C.gold, 2.2);
$('#rcard').innerHTML = `<rect x="0" y="0" width="272" height="320" rx="24" fill="#F5F1E8"/><path d="M24 0 h224 a24 24 0 0 1 24 24 v40 h-272 v-40 a24 24 0 0 1 24 -24 z" fill="#14213D"/><circle cx="40" cy="32" r="10" fill="#B8862F"/><rect x="64" y="27" width="120" height="10" rx="5" fill="#3A4560"/>` +
  [0, 1, 2, 3].map(k => `<rect id="rl${k}" x="32" y="${100 + k * 48}" width="140" height="12" rx="6" fill="#E2DACB"/><rect id="rb${k}" x="200" y="${92 + k * 48}" width="40" height="28" rx="8" fill="#fff" stroke="#D9CFBC" stroke-width="2.5" stroke-dasharray="5 5"/>`).join('') +
  `<rect x="32" y="288" width="208" height="8" rx="4" fill="#E9D9B5"/>`;
const SUBJ = [['target', 'Goals'], ['package', 'Resources'], ['gear', 'Inside work'], ['users', 'Stakeholders']];
$('#subj').innerHTML = SUBJ.map(([ic, n], k) => `<div class="sj" id="sj${k}" style="top:${104 + k * 80}px"><div class="si">${M.icon(ic, 26, C.gold, 2.2)}</div><div class="sn">${n}</div><div class="sg">?</div></div>`).join('');
// effective / efficient (Ep 01 cards)
const EE = [['Effective', 'Doing the right things', 'target', 'Sell the chai people love'], ['Efficient', 'Doing things right', 'gauge', 'No wasted milk, no wasted time']];
$('#eRow').innerHTML = EE.map(([t, m, ic, v], i) => `<div class="ee" id="ee${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div><div class="hr"></div><div class="ex">AT CHAI CORNER</div><div class="ev">${v}</div></div>`).join('');
// system diagram: inputs -> process -> outputs, stakeholders below
const NY = 200, NX = [128, 392, 656];
const SN = [['package', 'INPUTS', 'Resources'], ['gear', 'PROCESS', 'Inside work'], ['target', 'OUTPUTS', 'Goals']];
$('#sNodes').innerHTML = SN.map(([, k, l], i) => `<div class="nd" id="nd${i}" style="left:${NX[i] - 64}px;top:${NY - 64}px"><div class="bg"></div><div class="ni"></div></div><div class="ndk" id="ndk${i}" style="left:${NX[i] - 120}px;top:${NY + 82}px">${k}</div><div class="serif ndl" id="ndl${i}" style="left:${NX[i] - 120}px;top:${NY + 106}px">${l}</div>`).join('');
const SH = [['smile', 'CUSTOMERS'], ['users', 'STAFF'], ['owner', 'OWNERS'], ['package', 'SUPPLIERS'], ['home', 'SOCIETY']], SHX = k => 392 + (k - 2) * 136;
$('#sHold').innerHTML = SH.map(([, l], k) => `<div class="sh" id="sh${k}" style="left:${SHX(k) - 36}px"><div class="bg"></div><div class="ni"></div></div><div class="shl" id="shl${k}" style="left:${SHX(k) - 68}px">${l}</div>`).join('');
const head = (x, y, id) => `<path id="${id}" d="M-9 -11 L3 0 L-9 11" transform="translate(${x} ${y})"/>`;
$('#sysG').innerHTML = `<path id="sl0" d="M48 394 H300" stroke="#E2DACB" stroke-width="2"/><path id="sl1" d="M484 394 H736" stroke="#E2DACB" stroke-width="2"/>` +
  [0, 1].map(k => { const x0 = NX[k] + 76, x1 = NX[k + 1] - 80; return `<g id="ag${k}" stroke="#D9CFBC"><path id="ar${k}" d="M${x0} ${NY} H${x1}"/>${head(x1 + 2, NY, 'ah' + k)}</g>`; }).join('');
$('#sHold').insertAdjacentHTML('beforeend', `<div class="ndk" id="shT" style="left:272px;top:384px">STAKEHOLDERS</div>`);
const PANES = [['THE BIG IDEA', 'Four approaches', 'Four ways to judge one firm', 'clipboard', 'Each one checks a different', 'part of Chai Corner'],
  ['01 / 04 · OUTPUTS', 'Goal attainment', 'Did we reach our goals?', 'target', 'Ravi aimed for five outlets,', 'and he got there'],
  ['02 / 04 · INPUTS', 'System resource', 'Can we get what we need?', 'package', 'Good milk, money and skilled', 'staff, from outside'],
  ['03 / 04 · PROCESS', 'Internal process', 'Does work run smoothly?', 'gear', 'Clear roles, quick decisions,', 'and little conflict'],
  ['04 / 04 · STRATEGIC CONSTITUENCIES', 'Stakeholder', 'Is every group happy?', 'users', 'Customers, staff, owners,', 'suppliers and society']];
$('#pans').innerHTML = PANES.map(([s, t, m, ic, e1, e2], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div><div class="pe"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><span><b>${e1}</b><b>${e2}</b></span></div></div>`).join('');
// six signs
const SIG = [['coin', 'Profit', 'Money left after costs'], ['gauge', 'Productivity', 'Cups served per worker'], ['smile', 'Customer satisfaction', 'Do customers come back?'],
  ['heart', 'Employee satisfaction', 'Does the team enjoy work?'], ['trendUp', 'Growth', 'More outlets, more sales'], ['refresh', 'Adaptability', 'Changing with the times']];
$('#gRow').innerHTML = SIG.map(([, t, s], i) => `<div class="sg6" id="sg${i}" style="left:${160 + (i % 3) * 544}px;top:${270 + Math.floor(i / 3) * 306}px;height:274px"><div class="bg"></div><div class="gi"></div><div class="gk">SIGN 0${i + 1}</div><div class="serif gt">${t}</div><div class="gs">${s}</div></div>`).join('');
// journey
const MS = [['user', 'THE START', 'One stall', 'Ravi alone, 100 customers'], ['users', 'THE TEAM', 'A real team', 'Asha, Kabir and Meena'], ['store', 'THE BUS STAND', 'Second outlet', 'Run by Meena'], ['network', 'TODAY', 'Five outlets', 'Plus a head office']];
$('#mss').innerHTML = MS.map(([, k, t, m], i) => `<div class="ms" id="ms${i}" style="left:${i * 400}px"><div class="mc"><div class="bg"></div><div class="ni"></div></div><div class="mk">${k}</div><div class="serif mt">${t}</div><div class="mm">${m}</div></div>`).join('');
const LP = ['Plan', 'Organize', 'Control', 'Decide', 'Delegate', 'Right span'];
$('#lps').innerHTML = LP.map((p, k) => `<div class="lp" id="lp${k}">${p}</div>`).join('');
// scorecard
const SC = [['target', 'Goal attainment', 'Reached'], ['package', 'System resource', 'Secured'], ['gear', 'Internal process', 'Smooth'], ['users', 'Stakeholder', 'Happy']];
$('#srs').innerHTML = SC.map(([ic, n, p], k) => `<div class="sr" id="sr${k}" style="top:${104 + k * 112}px"><div class="ri2">${M.icon(ic, 28, C.gold, 2.2)}</div><div class="rn2">${n}</div><div class="rs"></div><div class="rp"><span>${p}</span><i>${M.icon('check', 22, '#fff', 3)}</i></div></div>`).join('');
const TN = [['THEN · EPISODE 01', C.muted, [['store', '1 stall'], ['user', '1 person'], ['timer', '15 min wait']]], ['NOW · EPISODE 28', C.gold, [['store', '5 outlets'], ['users', '30 people'], ['home', 'Head office']]]];
$('#tcs').innerHTML = TN.map(([h, col, rows], c) => `<div class="tc" id="tc${c}" style="left:${c ? 432 : 48}px"><div class="th" style="color:${col}">${h}</div>${rows.map(([ic, tx], k) => `<div class="tr" id="tr${c}${k}" style="top:${40 + k * 84}px"><i>${M.icon(ic, 28, c ? C.gold : C.dim, 2.2)}</i><span style="color:${c ? C.ink : C.muted}">${tx}</span></div>`).join('')}</div>`).join('');
// quiz
const OPTS = ['Goal attainment', 'System resource', 'Internal process', 'Stakeholder'], RIGHT = 3;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['target', 'Effectiveness', ['Achieving its goals']], ['clipboard', 'Four approaches', ['Goals', 'Resources', 'Internal process', 'Stakeholders']], ['gauge', 'Effective and efficient', ['Right things', 'Done right']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('trophy', 40, C.gold2, 2.2);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const lift = (el, t, ta, td, amt, from, to) => { const l = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT); if (t > from && t < to) el.style.transform = Math.abs(l) > 0.001 ? `scale(${(1 + amt * l).toFixed(4)})` : 'none'; };
const pulse = (el, t, tw, amt = 0.05) => { if (t > tw && t < tw + 0.45) el.style.transform = `scale(${(1 + amt * Math.sin(Math.PI * (t - tw) / 0.45)).toFixed(4)})`; else if (t >= tw + 0.45 && el.style.transform !== 'none') el.style.transform = 'none'; };
const jline = M.track(0, [[tMs[1], 400], [tMs[2], 800], [tMs[3], 1200]], M.SOFT);
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  ['#exChip', '#fromChip'].forEach(s => { const ex = $(s); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px'; });
  document.querySelectorAll('#pans .pt').forEach(p => { if (p.offsetWidth > 688) p.style.fontSize = Math.floor(76 * 688 / p.offsetWidth) + 'px'; });
  document.querySelectorAll('.sg6 .gt').forEach(p => { if (p.offsetWidth > 440) p.style.fontSize = Math.floor(38 * 440 / p.offsetWidth) + 'px'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  let lx = 48; LP.forEach((_, k) => { const p = $('#lp' + k); p.style.left = lx + 'px'; lx += p.offsetWidth + 16; });
  ROWS.forEach(([, , ps], i) => { let px = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = px + 'px'; px += p.offsetWidth + 16; }); });
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
  if (t < tJ0 - 1) M.vis($('#exChip'), t, tFive + 0.4, tT - 0.1, { dy: 10, outDur: 0.3 });
  else M.vis($('#exChip'), t, tMs[0] + 0.3, tQ - 0.3, { dy: 10, outDur: 0.3 });
  M.vis($('#fromChip'), t, tEp, tEout, { dy: 10, outDur: 0.3 });

  /* ===== A: five outlets, but is it doing well? ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // question bubble over Ravi when nobody agrees
    const qp = M.spring(t - tRight + 0.1, M.POP); const qb = $('#qb'); M.hide(qb, t < tRight - 0.1);
    qb.setAttribute('transform', `translate(392 70) scale(${Math.max(0.001, qp).toFixed(4)})`);
    // today card
    M.vis($('#now'), t, tMorph + 0.3, 1e9, { dy: 36 });
    const n = 1 + Math.round(4 * M.o3((t - tFive) / 0.7)); M.setT($('#nN'), String(n));
    M.vis($('#nU'), t, tMorph + 0.6, 1e9, { dy: 10 });
    for (let k = 0; k < 5; k++) {
      const el = $('#ol' + k), tin = k ? tFive + (k - 1) * 0.14 : tMorph + 0.55;
      M.vis(el, t, tin, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      setIco(el, 'store', C.gold, 40, 2);
    }
    M.vis($('#pPpl'), t, tWell - 0.2, 1e9, { dy: 16 }); M.vis($('#pHo'), t, tWell, 1e9, { dy: 16 });
    // opinions card
    M.vis($('#ask'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const tJob = [tK, tA, tMe], tJp = [tGreat, tDiff, tDiff + 0.15];
    ASK.forEach((_, i) => {
      const el = $('#job' + i); M.vis(el, t, tJob[i] - 0.05, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.av'), t, tJob[i] + 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      M.vis(el.querySelector('.jp'), t, tJp[i], 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      el.querySelector('.av').style.background = mix(C.ink2, C.gold, M.io((t - tJob[i] - 0.2) / 0.3) * (1 - M.io((t - (i < 2 ? tJob[i + 1] : tDiff + 0.4)) / 0.3)));
    });
    $('#askL').style.color = mix(C.muted, C.red, M.io((t - tRight) / 0.3));
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

  /* ===== D: definition + report card ===== */
  const dOn = t >= tTu - 0.05 && t < tE1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#dqs'), t, tD1 + 0.5, tD2 - 0.1, { dy: 12, outDur: 0.25 });
    M.vis($('#dlbl'), t, tD2 + 0.05, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    M.rise($('#quote1'), t, tHow - 0.05, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, tAch - 0.05, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tD3 + 0.12, tDout, { dy: 24, ...o });
    M.vis($('#rep'), t, tD3 + 0.3, tDout, { dy: 36, ...o });
    M.vis($('#repS'), t, tD3 + 0.5, tDout, { dy: 0, sc: 0.9, sp: M.POP, ...o });
    SUBJ.forEach((_, k) => {
      M.vis($('#sj' + k), t, tCard - 0.1 + k * 0.22, tDout, { dy: 20, ...o });
      $('#rl' + k).setAttribute('fill', t > tCard - 0.1 + k * 0.22 ? '#D9CFBC' : '#E2DACB');
    });
  }

  /* ===== E: effective vs efficient (Ep 01 callback) ===== */
  const eOn = t >= tE1 - 0.1 && t < tF0 + 0.2; M.hide($('#sE'), !eOn);
  if (eOn) {
    EE.forEach((_, i) => {
      const el = $('#ee' + i), ta = i ? tE2 : tEff, td = i ? tE3 : tE2;
      M.vis(el, t, tE1 + 0.15 + i * 0.1, tEout, { dy: 36, outDur: 0.3, ody: -16 });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const em = el.querySelector('.em'); M.rise(em, t, ta + 0.1, { st: 0.04 }); em.style.color = mix(C.gold2, C.gold, off);
      el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), EE[i][2], t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, C.navy3, act);
      const ex = el.querySelector('.ex'); M.vis(ex, t, ta + 0.45, 1e9, { dy: 10 }); ex.style.color = mix('#8C96AE', C.muted, off);
      const ev = el.querySelector('.ev'); M.rise(ev, t, ta + 0.55, { st: 0.04 }); ev.style.color = mix('#fff', C.ink, off);
      lift(el, t, ta, td, 0.02, tE1 + 0.8, tEout);
    });
    M.vis($('#both'), t, tE3 - 0.05, tEout, { dy: 40, outDur: 0.3, ody: -16 });
    pulse($('#both'), t, tWrong, 0.03);
  }

  /* ===== F: four approaches ===== */
  const fOn = t >= tF0 - 0.1 && t < tI0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#sys'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...fo });
    M.vis($('#panel'), t, tF0 + 0.3, tFout, { dx: 60, dy: 0, ...fo });
    // nodes: [active from, active until]; goals first, then resources, then the process
    const WIN = [[tF[1], tF[2]], [tF[2], tF[3]], [tF[0], tF[1]]];
    SN.forEach((s, i) => {
      const el = $('#nd' + i), [ta, td] = WIN[i];
      M.vis(el, t, tF0 + 0.4 + i * 0.12, 1e9, { dy: 0, sc: 0.6, sp: M.POP });
      M.vis($('#ndk' + i), t, tF0 + 0.55 + i * 0.12, 1e9, { dy: 10 });
      M.vis($('#ndl' + i), t, tF0 + 0.6 + i * 0.12, 1e9, { dy: 10 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.gold, act); bg.style.borderColor = mix(t >= ta ? C.gold : C.line, C.gold, act);
      setIco(el.querySelector('.ni'), s[0], act > 0.5 ? '#fff' : (t >= ta ? C.gold : C.dim), 52, 2);
      $('#ndl' + i).style.color = t >= ta ? C.ink : C.dim;
      lift(el, t, ta, td, 0.08, tF0 + 2, tFout);
    });
    [0, 1].forEach(k => {
      M.vis($('#ag' + k), t, tF0 + 0.8 + k * 0.1, 1e9, { dy: 0, fade: 0.15 });
      const ta = k ? tF[0] : tF[1]; $('#ag' + k).setAttribute('stroke', t >= ta ? C.gold : '#D9CFBC');
    });
    M.vis($('#sl0'), t, tF0 + 1.0, 1e9, { dy: 0 }); M.vis($('#sl1'), t, tF0 + 1.0, 1e9, { dy: 0 }); M.vis($('#shT'), t, tF0 + 1.0, 1e9, { dy: 8 });
    $('#shT').style.color = t >= tF[3] ? C.gold : C.muted;
    SH.forEach((s, k) => {
      const el = $('#sh' + k); M.vis(el, t, tF0 + 1.1 + k * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP });
      M.vis($('#shl' + k), t, tF0 + 1.2 + k * 0.08, 1e9, { dy: 8 });
      const g = M.io((t - tSh[k] + 0.05) / 0.25), bg = el.querySelector('.bg');
      bg.style.background = mix(C.paper, C.gold, g); bg.style.borderColor = mix(C.paper, C.gold, g);
      setIco(el.querySelector('.ni'), s[0], g > 0.5 ? '#fff' : C.dim, 28, 2.2);
      $('#shl' + k).style.color = g > 0.5 ? C.ink : C.muted;
      pulse(el, t, tSh[k], 0.12);
    });
    PANES.forEach((_, k) => {
      const tin = k ? tF[k - 1] : tF0 + 0.5, tout = k < 4 ? (k ? tF[k] : tF[0]) - 0.14 : 1e9;
      const pn = $('#pn' + k); M.hide(pn, t < tin - 0.01 || t > tout + 0.3);
      if (t < tin - 0.01 || t > tout + 0.3) return;
      const oo = { outDur: 0.18, ody: -12 }, tq = k ? tFq[k - 1] : tin + 0.3, te = k ? tFe[k - 1] : tin + 0.62;
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tq, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tq + 0.1, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tq + 0.2, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pe'), t, te - 0.05, tout, { dy: 18, ...oo });
    });
  }

  /* ===== I: six signs ===== */
  const iOn = t >= tI0 - 0.1 && t < tJ0 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    SIG.forEach((s, i) => {
      const el = $('#sg' + i), ta = tG[i];
      M.vis(el, t, tI0 + 0.1 + i * 0.07, tIout, { dy: 30, outDur: 0.3, ody: -16 });
      const g = M.io((t - ta) / 0.3);
      const gi = el.querySelector('.gi'); gi.style.background = mix(C.paper, C.gold, g);
      setIco(gi, s[0], g > 0.5 ? '#fff' : C.dim, 40, 2);
      el.querySelector('.bg').style.borderColor = mix(C.line, C.gold, g);
      el.querySelector('.gt').style.color = mix(C.dim, C.ink, g);
      el.querySelector('.gk').style.color = mix(C.dim, C.gold, g);
      const gs = el.querySelector('.gs'); M.rise(gs, t, ta + 0.1, { st: 0.04 }); gs.style.color = C.ink2;
      pulse(el, t, ta, 0.03);
    });
  }

  /* ===== J: the journey ===== */
  const jOn = t >= tJ0 - 0.1 && t < tJ5 + 0.2; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const jo = { outDur: 0.3, ody: -16 };
    M.vis($('#jour'), t, tJ0 + 0.1, tJout, { dy: 36, ...jo });
    M.draw($('#jL0'), t, tJ0 + 0.4, 0.9, M.io);
    const L = jline(t); M.hide($('#jL1'), t < tMs[1] || L < 1); $('#jL1').setAttribute('x2', (200 + L).toFixed(1));
    MS.forEach((s, i) => {
      const el = $('#ms' + i), ta = tMs[i];
      const mc = el.querySelector('.mc'); M.vis(mc, t, tJ0 + 0.6 + i * 0.12, 1e9, { dy: 0, sc: 0.6, sp: M.POP });
      const g = M.io((t - ta) / 0.3), bg = mc.querySelector('.bg');
      bg.style.background = mix(C.paper2, i === 3 ? C.gold : C.ink, g); bg.style.borderColor = mix(C.paper2, i === 3 ? C.gold : C.ink, g);
      setIco(mc.querySelector('.ni'), s[0], g > 0.5 ? '#fff' : C.dim, 44, 2);
      M.vis(el.querySelector('.mk'), t, ta + 0.1, 1e9, { dy: 10 });
      M.rise(el.querySelector('.mt'), t, ta + 0.15, { st: 0.05, sp: M.HEAVY });
      M.rise(el.querySelector('.mm'), t, ta + 0.35, { st: 0.04 });
      pulse(mc, t, ta, 0.1);
    });
    M.vis($('#jHr'), t, tJ0 + 0.5, 1e9, { dy: 0 });
    M.vis($('#jLl'), t, tJ0 + 0.6, 1e9, { dy: 10 });
    LP.forEach((_, k) => {
      const el = $('#lp' + k), tp = tLp[k]; M.vis(el, t, tp - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const nx = k === 2 || k === 5 ? tp + 1.2 : tLp[k + 1];
      const g = M.io((t - tp + 0.05) / 0.2), d = M.io((t - nx + 0.05) / 0.3);
      el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d); el.style.color = g > 0.5 ? '#fff' : C.ink;
    });
  }

  /* ===== K: scorecard + then and now ===== */
  const kOn = t >= tJ5 - 0.1 && t < tQ + 0.05; M.hide($('#sK'), !kOn);
  if (kOn) {
    M.vis($('#score'), t, tJ5 + 0.1, 1e9, { dx: -60, dy: 0 });
    M.vis($('#tn'), t, tJ5 + 0.3, 1e9, { dx: 60, dy: 0 });
    SC.forEach((_, k) => {
      const el = $('#sr' + k); M.vis(el, t, tJ5 + 0.4 + k * 0.1, 1e9, { dy: 20 });
      const tc = tSc[k];
      M.vis(el.querySelector('.rs'), t, tJ5 + 0.5, tc, { dy: 0, outDur: 0.15, osc: 0.6, ody: 0 });
      M.vis(el.querySelector('.rp'), t, tc - 0.02, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      el.style.background = mix(C.paper, C.gold3, M.io((t - tc) / 0.3));
    });
    TN.forEach(([, , rows], c) => {
      M.vis($('#tc' + c + ' .th'), t, tJ5 + 0.6 + c * 0.5, 1e9, { dy: 10 });
      rows.forEach((_, k) => M.vis($('#tr' + c + k), t, tJ5 + 0.7 + c * 0.5 + k * 0.1, 1e9, { dy: 16 }));
    });
    M.vis($('#tnV'), t, tJ5 + 0.9, 1e9, { dy: 0 });
    M.vis($('#verd'), t, tBig - 0.1, 1e9, { dy: 30 });
    const vs = $('#verd').children; M.hide(vs[1], t < tEffv - 0.05);
    if (t >= tEffv - 0.05) { const p = M.spring(t - tEffv + 0.05, M.POP); vs[1].style.transform = p > 0.999 ? 'none' : `scale(${(0.6 + 0.4 * p).toFixed(4)})`; vs[1].style.opacity = M.clamp((t - tEffv + 0.05) / 0.1); }
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, wt('Q1', 'Ravi') - 0.05, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, tQw - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQw + 0.2 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAnsQ) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.card, C.ink, r) : mix(C.card, C.off, r);
      bg.style.borderColor = right ? mix(C.line, C.ink, r) : mix(C.line, '#EAE3D6', r);
      el.querySelector('.ot').style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.paper, C.gold, r) : C.paper; lt.style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAnsQ + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right) pulse(el, t, tAnsQ, 0.05);
    });
    const cd = tAnsQ - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAnsQ, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAnsQ, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAnsQ + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTakeQ, 1e9, { dy: 40 });
    M.rise($('#takeT'), t, tTakeQ + 0.1, { st: 0.045 });
  }

  /* ===== recap + series complete ===== */
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
