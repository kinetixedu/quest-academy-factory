// MBA - Principles of Management, Ep 06: Managerial Roles and Skills
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', sand: '#D9CFBC', mute: '#ECE6DA' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  trendUp: ['M22 7 13.5 15.5 8.5 10.5 2 17', 'M16 7h6v6'],
  crown: ['M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z', 'M5 21h14'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  share: ['M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'm8.59 13.51 6.83 3.98', 'm15.41 6.51-6.82 3.98'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  pie: ['M21.21 15.89A10 10 0 1 1 8 2.83', 'M22 12A10 10 0 0 0 12 2v10z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  map: ['M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z', 'M15 5.764v15', 'M9 3.236v15'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12', 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tC = [T0('C1'), T0('C2'), T0('C3'), T0('C4')], tStrike = wt('C4', 'milk');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tActor = wt('D2', 'actor'), tD3 = T0('D3'), tWatch = wt('D3', 'watched'), tTen = wt('D4', 'ten'), tD5 = T0('D5'), tThreeG = wt('D5', 'three');
const tB = T0('I0'), tDout = tB - 0.32;
const G = [T0('I0'), T0('F0'), T0('X0')];
const ROLE_T = [T0('I1'), T0('I2'), T0('I3'), T0('F1'), T0('F2'), T0('F3'), T0('X1'), T0('X2'), T0('X3'), T0('X4')];
const tK0 = T0('K0'), tBout = tK0 - 0.32, tKs = wt('K0', 'Skills'), tK1 = T0('K1'), tKatz = wt('K1', 'Robert'), tK3 = wt('K1', 'three');
const tK = [T0('K2'), T0('K3'), T0('K4')], tL0 = T0('L0'), tKout = tL0 - 0.32;
const tMix = wt('L0', 'mix'), tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3');
const tTech = wt('L1', 'technical'), tConc = wt('L2', 'conceptual'), tHum = wt('L3', 'human');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'He');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPillA = ['interpersonal', 'informational', 'decisional'].map(w => wt('S2', w)), tPillB = ['technical', 'human', 'conceptual'].map(w => wt('S3', w));
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// stall
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// Ravi's day
const DAY = [['9:00', 'cap', 'Welcomes the school principal'], ['11:30', 'trendUp', 'Hears that milk prices will rise'], ['2:00', 'cup', 'Calms a customer who got cold tea'], ['5:00', 'coin', 'Bargains with the milk seller']];
$('#dayRows').innerHTML = DAY.map(([tm, ic, tx], i) => `<div class="dr" id="dr${i}" style="top:${84 + i * 74}px"><div class="dt">${tm}</div><div class="di">${M.icon(ic, 22, C.gold, 2.2)}</div><div class="dx">${tx}</div></div>`).join('');
$('#jobsI').innerHTML = M.icon('list', 22, C.ink, 2.2);
// definition + Mintzberg
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const GROUPS = [['users', 'Interpersonal', 'ROLES WITH PEOPLE'], ['message', 'Informational', 'ROLES WITH NEWS AND FACTS'], ['split', 'Decisional', 'ROLES WHERE HE DECIDES']];
$('#gps').innerHTML = GROUPS.map(([ic, n], i) => `<div class="gp" id="gp${i}"><i>${M.icon(ic, 20, C.gold, 2.4)}</i>${n}</div>`).join('');
// role board
const ROLES = [['Figurehead', 'crown', 'Ravi greets the principal as the face of Chai Corner', 1], ['Leader', 'compass', 'He guides and motivates Asha, Kabir and Meena'], ['Liaison', 'link', 'He builds links outside, like the bakery next door'],
  ['Monitor', 'eye', 'He hears that milk prices will rise', 1], ['Disseminator', 'share', 'He passes that news to his team'], ['Spokesperson', 'megaphone', 'He speaks for Chai Corner to people outside'],
  ['Entrepreneur', 'bulb', 'He tries something new, like ginger chai'], ['Disturbance handler', 'shield', 'He calms the customer with cold tea', 1], ['Resource allocator', 'pie', 'He decides how to use people, time and money'], ['Negotiator', 'scale', 'He bargains with the milk seller', 1]];
const GOF = [0, 3, 6, 10];   // role index ranges per group
$('#cols').innerHTML = GROUPS.map(([ic, n, s], g) => `<div class="gc" id="gc${g}" style="left:${160 + g * 544}px"><div class="bg"></div><div class="gi"></div><div class="serif gn">${n}</div><div class="gs">${s}</div>` +
  ROLES.slice(GOF[g], GOF[g + 1]).map(([r], k) => `<div class="rt2" id="rt${GOF[g] + k}" style="top:${136 + k * 74}px"><div class="n">${String(GOF[g] + k + 1).padStart(2, '0')}</div><div class="t">${r}</div></div>`).join('') + `</div>`).join('');
// strip panes: group meaning, then each role
const PANES = [];   // [tin, iconName, keyText, text, fromDay]
GROUPS.forEach(([ic, n, s], g) => {
  PANES.push([G[g], ic, n, '= ' + s.toLowerCase(), 0]);
  for (let r = GOF[g]; r < GOF[g + 1]; r++) PANES.push([ROLE_T[r], ROLES[r][1], ROLES[r][0], ROLES[r][2], ROLES[r][3] || 0]);
});
$('#xps').innerHTML = PANES.map(([, , k, tx], i) => `<div class="xp" id="xp${i}"><span class="k">${k}</span>${tx}</div>`).join('');
$('#fdI').innerHTML = M.icon('clock', 20, C.gold2, 2.4);
// Katz skills
$('#kbI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const SK = [['Technical', 'Knowing how to do the work', 'wrench', 'Making perfect chai'], ['Human', 'Working well with people', 'users', 'Keeping the team happy'], ['Conceptual', 'Seeing the big picture', 'map', 'Planning a second stall']];
$('#skRow').innerHTML = SK.map(([n, m, ic, v], i) => `<div class="sk" id="sk${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="si"><span class="ico"></span></div><div class="serif sn">${n}</div><div class="sm">${m}</div><div class="hr"></div><div class="sx">AT CHAI CORNER</div><div class="sv">${v}</div></div>`).join('');
// skill mix by level: pyramid + bars
const TIER_Y = [80, 244, 408], TH = 150, hw = y => 60 + 210 * (y - 80) / 478;     // svg coords (svg top = 270)
const TIER_C = [C.ink, C.ink2, C.sand], TIER_N = [['Top', 'OWNERS, CEOS'], ['Middle', 'DEPARTMENT HEADS'], ['Lower', 'SUPERVISORS']];
$('#tiers').innerHTML = TIER_Y.map((y, i) => { const a = hw(y), b = hw(y + TH); return `<path id="tr${i}" d="M${(270 - a).toFixed(1)} ${y} H${(270 + a).toFixed(1)} L${(270 + b).toFixed(1)} ${y + TH} H${(270 - b).toFixed(1)} Z" fill="${TIER_C[i]}" stroke="${TIER_C[i]}" stroke-width="10" stroke-linejoin="round"/>`; }).join('');
$('#tls').innerHTML = TIER_N.map(([n, s], i) => `<div class="tl" id="tl${i}" style="top:${270 + TIER_Y[i] + (i ? 44 : 70)}px;color:${i < 2 ? '#fff' : C.ink}"><b>${n}</b><span style="color:${i < 2 ? C.gold2 : C.ink2}">${s}</span></div>`).join('');
const SEGC = [C.sand, C.gold, C.ink], SEGN = ['Technical', 'Human', 'Conceptual'];
$('#lgs').innerHTML = SEGN.map((n, i) => `<div class="lg" id="lg${i}"><i style="background:${SEGC[i]}"></i>${n}</div>`).join('');
const MIX = [[16, 40, 44], [30, 40, 30], [46, 40, 14]], ROWN = ['TOP MANAGERS', 'MIDDLE MANAGERS', 'LOWER LEVEL MANAGERS'], TAGS = ['MOST CONCEPTUAL', 'HUMAN AT EVERY LEVEL', 'MOST TECHNICAL'];
$('#mrs').innerHTML = MIX.map((mx, i) => `<div class="mr" id="mr${i}" style="top:${270 + TIER_Y[i] - 4}px"><div class="ml">${ROWN[i]}</div><div class="mt">${TAGS[i]}</div><div class="mb">${mx.map((_, k) => `<div class="sg" id="sg${i}${k}"></div>`).join('')}</div></div>`).join('');
// quiz
const OPTS = ['Figurehead', 'Disseminator', 'Negotiator', 'Liaison'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('share', 44, C.gold2, 2.4);
// recap
const ROWS = [['users', 'Ten roles in <span class="acc">three groups</span>'], ['bulb', 'Three <span class="acc">skills</span>'], ['layers', 'Top level: more <span class="acc">conceptual</span>. Every level: <span class="acc">human</span>']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
const PILLS = [['Interpersonal', 'Informational', 'Decisional'], ['Technical', 'Human', 'Conceptual']];
PILLS.forEach((ps, r) => $('#rw' + r).insertAdjacentHTML('beforeend', ps.map((p, k) => `<div class="fp" id="fp${r}${k}">${p}</div>`).join('')));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const raviX = M.track(0, [[tC[0], -36], [tC[1], 24], [tC[2], -16], [tC[3], 30], [tStrike + 0.3, 0]], M.SOFT);
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  // strike-through matches the text width
  const sw = $('#ideaT').offsetWidth + 16; $('#strike').setAttribute('width', sw); $('#strikeL').setAttribute('x2', sw - 4);
  // group pills in a row
  let x = 48; for (let i = 0; i < 3; i++) { const p = $('#gp' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  // legend pills
  x = 764; for (let i = 0; i < 3; i++) { const p = $('#lg' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  // mix bars (6 px gaps)
  MIX.forEach((mx, i) => { let sx = 0; mx.forEach((v, k) => { const ww = (996 - 12) * v / 100; geo['s' + i + k] = [sx, ww]; sx += ww + 6; }); });
  // recap pills
  for (let r = 0; r < 2; r++) { const rt = $('#rw' + r + ' .rt'); let px = 216 + rt.offsetWidth + 40; for (let k = 0; k < 3; k++) { const p = $('#fp' + r + k); p.style.left = px + 'px'; px += p.offsetWidth + 16; } }
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

  /* ===== A: one busy day ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    const rx = raviX(t); $('#ravi').setAttribute('transform', Math.abs(rx) < 0.01 ? 'translate(0 0)' : `translate(${rx.toFixed(2)} 0)`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // what Ravi thinks
    M.vis($('#idea'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.rise($('#ideaT'), t, tMorph + 0.5, { st: 0.06 });
    M.draw($('#strikeL'), t, tStrike, 0.45, M.o3);
    $('#ideaT').style.color = mix(C.ink, C.dim, M.io((t - tStrike - 0.1) / 0.4));
    const nJobs = tC.filter(x => t >= x).length;
    M.vis($('#jobsP'), t, tC[0] - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.setT($('#jobsT'), `Jobs today: ${Math.max(1, nJobs)}`);
    const hot = M.io((t - tC[3]) / 0.4); $('#jobsP').style.background = mix(C.paper, C.gold, hot); $('#jobsP').style.color = hot > 0.5 ? '#fff' : C.ink;
    setIco($('#jobsI'), 'list', hot > 0.5 ? '#fff' : C.ink, 22);
    // the day
    M.vis($('#day'), t, tC[0] - 0.35, 1e9, { dy: 36 });
    DAY.forEach((_, i) => {
      const el = $('#dr' + i); M.vis(el, t, tC[i] - 0.06, 1e9, { dy: 22, sp: M.SOFT });
      const act = M.io((t - tC[i]) / 0.3) * (1 - M.io((t - (i < 3 ? tC[i + 1] : tStrike)) / 0.35));
      el.style.background = mix(C.paper, C.gold2, act);
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

  /* ===== D: what are managerial roles? + Mintzberg ===== */
  const dOn = t >= tTu - 0.05 && t < tB + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.rise($('#quote1'), t, tD2 + 0.1, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, wt('D2', 'manager') - 0.05, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    M.vis($('#qby'), t, tActor - 0.05, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tD3 + 0.12, tDout, { dy: 24, ...o });
    M.vis($('#book'), t, tD3 + 0.3, tDout, { dy: 36, ...o });
    M.vis($('#bookS'), t, tD3 + 0.45, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    M.vis($('#bookL'), t, tD3 + 0.7, 1e9, { dy: 10 });
    M.vis($('#mz'), t, tD3 + 0.42, tDout, { dy: 36, ...o });
    M.vis($('#mzL'), t, tD3 + 0.6, 1e9, { dy: 10 });
    M.rise($('#mzW'), t, tWatch, { st: 0.04 });
    M.rise($('#mzBig'), t, tTen - 0.08, { st: 0.07, sp: M.HEAVY });
    M.vis($('#mzHr'), t, tD5 - 0.1, 1e9, { dy: 0 });
    M.vis($('#mzL2'), t, tD5, 1e9, { dy: 10 });
    for (let i = 0; i < 3; i++) M.vis($('#gp' + i), t, tThreeG + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
  }

  /* ===== B: the ten roles ===== */
  const bOn = t >= tB - 0.1 && t < tK0 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const bo = { outDur: 0.3, ody: -16 };
    const gAct = t < G[1] ? 0 : t < G[2] ? 1 : 2;
    GROUPS.forEach((gr, g) => {
      const el = $('#gc' + g); M.vis(el, t, tB + 0.05 + g * 0.1, tBout, { dy: 36, ...bo });
      const a = M.io((t - G[g]) / 0.3) * (1 - M.io((t - (g < 2 ? G[g + 1] : tBout + 1)) / 0.35));
      el.querySelector('.bg').style.borderColor = mix(C.line, C.gold, a);
      el.querySelector('.gi').style.background = mix(C.paper, C.gold, a);
      setIco(el.querySelector('.gi'), gr[0], a > 0.5 ? '#fff' : (t >= G[g] ? C.gold : C.dim), 34, 2.2);
      el.querySelector('.gn').style.color = t >= G[g] ? C.ink : C.dim;
    });
    ROLES.forEach((r, k) => {
      const el = $('#rt' + k), ta = ROLE_T[k];
      const g = k < 3 ? 0 : k < 6 ? 1 : 2, nextT = k < 9 ? Math.min(ROLE_T[k + 1], g < 2 ? G[g + 1] : 1e9) : tBout + 1;
      const on = M.io((t - ta) / 0.3), off = M.io((t - nextT) / 0.35), act = on * (1 - off);
      el.style.background = mix(C.paper, C.gold, act);
      el.querySelector('.t').style.color = act > 0.5 ? '#fff' : (t >= ta ? C.ink : C.dim);
      el.querySelector('.n').style.color = act > 0.5 ? '#fff' : (t >= ta ? C.gold : C.dim);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - nextT, M.SOFT);
      if (t > tB + 1 && t < tBout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.03 * lift).toFixed(4)})` : 'none';
    });
    // example strip
    M.vis($('#ex'), t, G[0] + 0.2, tBout, { dy: 30, ...bo });
    let cur = -1; PANES.forEach((p, i) => { if (t >= p[0] - 0.02) cur = i; });
    setIco($('#exI'), PANES[Math.max(0, cur)][1], C.gold2, 30, 2.2);
    PANES.forEach((p, i) => {
      const tin = p[0] + 0.05, tout = i < PANES.length - 1 ? PANES[i + 1][0] - 0.14 : 1e9, el = $('#xp' + i);
      if (t < tin - 0.01 || t > tout + 0.5) { M.hide(el, true); return; }
      M.rise(el, t, tin, { st: 0.035, out: tout, outDur: 0.18 });
    });
    const fdOn = cur >= 0 && PANES[cur][4];
    const fdIn = fdOn ? PANES[cur][0] + 0.35 : 1e9, fdOut = fdOn ? (cur < PANES.length - 1 ? PANES[cur + 1][0] - 0.14 : 1e9) : -1;
    if (fdOn) M.vis($('#fromDay'), t, fdIn, fdOut, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.18, ody: 0 }); else M.hide($('#fromDay'), true);
  }

  /* ===== K: skills (Katz) ===== */
  const kOn = t >= tK0 - 0.1 && t < tL0 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const ko = { outDur: 0.3, ody: -16 };
    M.rise($('#kq1'), t, tK0 + 0.05, { st: 0.05, sp: M.HEAVY, out: tK1 - 0.15, outDur: 0.3 });
    M.rise($('#kq2'), t, tKs - 0.05, { st: 0.05, sp: M.HEAVY, out: tK1 - 0.12, outDur: 0.3 });
    M.vis($('#kbar'), t, tKatz - 0.05, tKout, { dy: 24, ...ko });
    SK.forEach((s, i) => {
      const el = $('#sk' + i), ta = tK[i], td = i < 2 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK3 + i * 0.1, tKout, { dy: 36, ...ko });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.sn').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const sm = el.querySelector('.sm'); M.rise(sm, t, ta + 0.1, { st: 0.04 }); sm.style.color = mix(C.gold2, C.gold, off);
      el.querySelector('.si').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), s[2], t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 48, 2);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      const sx2 = el.querySelector('.sx'); M.vis(sx2, t, ta + 0.45, 1e9, { dy: 10 }); sx2.style.color = mix('#8C96AE', C.muted, off);
      const sv = el.querySelector('.sv'); M.rise(sv, t, ta + 0.55, { st: 0.04 }); sv.style.color = mix('#fff', C.ink, off);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tK3 + 1 && t < tKout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== L: the mix changes by level ===== */
  const lOn = t >= tL0 - 0.1 && t < tQ + 0.05; M.hide($('#sL'), !lOn);
  if (lOn) {
    // focus: which segments stay strong
    const foc = (i, k) => t < tL1 ? 1 : t < tL2 ? (i === 2 && k === 0) : t < tL3 ? (i === 0 && k === 2) : k === 1;
    const fAmt = t < tL1 ? 0 : M.io((t - tL1 - 0.1) / 0.35);
    const tFoc = [t >= tL2 && t < tL3 ? 1 : 0, t >= tL3 ? 1 : 0, t >= tL1 && t < tL2 ? 1 : 0];   // tier focus
    TIER_Y.forEach((_, i) => {
      const tin = tL0 + 0.05 + i * 0.12, el = $('#tr' + i);
      const p = M.spring(t - tin, M.SOFT); M.hide(el, t < tin);
      el.setAttribute('transform', p >= 1 ? 'translate(0 0)' : `translate(0 ${((1 - p) * 30).toFixed(2)})`); el.style.opacity = M.clamp((t - tin) / 0.18);
      const strong = t < tL1 || tFoc[i] || t >= tL3;
      const col = mix(TIER_C[i], C.mute, strong ? 0 : fAmt * 0.7); el.setAttribute('fill', col); el.setAttribute('stroke', col);
      M.vis($('#tl' + i), t, tin + 0.15, 1e9, { dy: 10 });
      const mr = $('#mr' + i); M.vis(mr, t, tMix - 0.1 + i * 0.12, 1e9, { dy: 20 });
      MIX[i].forEach((v, k) => {
        const sg = $('#sg' + i + k), [x0, w0] = geo['s' + i + k], g = M.o3((t - tMix - i * 0.12 - k * 0.14) / 0.55);
        sg.style.left = x0.toFixed(1) + 'px'; sg.style.width = (w0 * g).toFixed(1) + 'px'; M.hide(sg, g <= 0);
        sg.style.background = mix(SEGC[k], C.mute, foc(i, k) ? 0 : fAmt * 0.8);
        const pk = foc(i, k) && t >= tL1 ? M.spring(t - (t < tL2 ? tTech : t < tL3 ? tConc : tHum), M.POP) - 1 : 0;
        sg.style.transform = Math.abs(pk) > 0.002 ? `scaleY(${(1 - 0.12 * pk).toFixed(4)})` : 'none';
      });
      const tagT = [tConc, tHum, tTech][i];
      M.vis(mr.querySelector('.mt'), t, tagT, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    });
    SEGN.forEach((_, k) => {
      const lg = $('#lg' + k); M.vis(lg, t, tL0 + 0.2 + k * 0.1, 1e9, { dy: 12 });
      const hl = k === 1 ? M.io((t - tHum) / 0.3) : 0; lg.style.background = mix(C.card, C.gold, hl); lg.style.color = hl > 0.5 ? '#fff' : C.ink;
      lg.querySelector('i').style.background = k === 1 ? mix(C.gold, '#fff', hl) : SEGC[k];
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
    [tPillA, tPillB].forEach((tp, r) => {
      for (let k = 0; k < 3; k++) {
        const el = $('#fp' + r + k); M.vis(el, t, tp[k] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const a = tp[k] - 0.05, b = k < 2 ? tp[k + 1] - 0.05 : tRow[r + 1] - 0.3;
        const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
        el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
        el.style.color = g > 0.5 ? '#fff' : C.ink;
      }
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
