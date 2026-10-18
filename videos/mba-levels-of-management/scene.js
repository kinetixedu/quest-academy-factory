// MBA - Principles of Management, Ep 05: Levels of Management
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', link: '#D9CFBC', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  crown: ['M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z', 'M5 21h14'],
  building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  hardhat: ['M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z', 'M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5', 'M4 15v-3a6 6 0 0 1 6-6', 'M14 6a6 6 0 0 1 6 6v3'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 22a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tFive = wt('H1', 'Five'), tFifty = wt('H1', 'fifty'), tMorph = tFive - 0.35;
const tEvery = wt('H2', 'every'), tQues = wt('H2', 'question'), tAsk = [wt('C1', 'Out'), wt('C1', 'Ask'), wt('C1', 'stove'), wt('C1', 'Ask', 1), T1('C1') - 0.25];
const tC2 = T0('C2'), tFut = wt('C2', 'future'), tC3 = T0('C3'), tOne = wt('C3', 'one'), tNoth = wt('C3', 'nothing');
const tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = T0('D1') - 0.32;          // statement sweep: cover, line 2, uncover
const tD1 = T0('D1'), tD2 = T0('D2'), tLayers = wt('D2', 'layers'), tTop = wt('D2', 'top'), tBot = wt('D2', 'bottom');
const tD3 = T0('D3'), tDiff = wt('D3', 'different'), tPower = wt('D3', 'power'), tDout = T0('P0') - 0.32;
const tP0 = T0('P0'), tThree = wt('P0', 'three'), tPyr = wt('P0', 'pyramid');
const tP1 = T0('P1'), tM1 = T0('M1'), tL1 = T0('L1'), tW1 = T0('W1'), tW2 = T0('W2');
const tFew = wt('W1', 'few'), tMany = wt('W1', 'many');
const tHi = wt('W2', 'higher'), tFur = wt('W2', 'further'), tToday = wt('W2', 'Lower'), tPout = T0('K1') - 0.32;
const tK1 = T0('K1'), tK2 = T0('K2'), tK3 = T0('K3'), tK4 = T0('K4'), tK5 = T0('K5');
const tNext = wt('K2', 'next'), tStock = wt('K3', 'stock'), tRush = wt('K4', 'morning'), tSup = wt('K5', 'supervisor'), tBack = wt('K5', 'time');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Big');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['top', 'middle', 'lower'].map(w => wt('S2', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
const PERSON = `<svg width="100%" height="100%" viewBox="0 0 40 48" fill="currentColor"><circle cx="20" cy="11" r="10"/><path d="M2 47c0-11 8-19 18-19s18 8 18 19z"/></svg>`;
// A: five outlets, ten workers each, every line runs to Ravi
const OX = [0, 1, 2, 3, 4].map(i => 160 + i * 320);
const QS = ['Out of milk?', 'Leave early?', 'New cups?', 'Price of tea?', 'Stove broken?'], QORD = [0, 1, 4, 3, 2];   // order the questions pop
$('#outs').innerHTML = OX.map((x, i) => `<div class="ol" id="ol${i}" style="left:${x - 32}px">${M.icon('store', 30, C.ink, 2.2)}</div>`
  + Array.from({ length: 10 }, (_, k) => `<div class="wk" id="wk${i}_${k}" style="left:${x - 95 + (k % 5) * 40}px;top:${156 + Math.floor(k / 5) * 44}px">${PERSON}</div>`).join('')
  + `<div class="qp" id="qp${i}">${QS[i]}</div>`).join('');
$('#nl').innerHTML = OX.map((x, i) => `<path id="ln${i}" d="M${x} 312 C${x} 360 800 344 800 394" stroke="${C.link}" stroke-width="4"/>`).join('');
$('#qCi').innerHTML = M.icon('help', 24, C.ink, 2.2); $('#tPi').innerHTML = M.icon('timer', 24, C.ink, 2.2);
// D: layers + authority
const SLABS = [['Top layer', 300], ['Middle layer', 460], ['Bottom layer', 620]];
$('#slabs').innerHTML = SLABS.map(([n, w], i) => `<div class="slab" id="sl${i}" style="left:${392 - w / 2}px;top:${120 + i * 92}px;width:${w}px">${n}</div>`).join('');
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2); $('#aic').innerHTML = M.icon('key', 48, C.gold, 2);
const ABARS = [['Top', 538], ['Middle', 340], ['Bottom', 150]];
$('#abars').innerHTML = ABARS.map(([n], i) => `<div class="ab" id="ab${i}" style="top:${284 + i * 52}px"><div class="al">${n}</div><div class="at"></div></div>`).join('');
// P: the pyramid (apex 552,280 - base y 840, half width 380)
const PX = 552, hw = y => 380 * (y - 280) / 560;
const TIER = [[280, 452], [466, 646], [660, 840]];
const tierD = ([a, b]) => a === 280 ? `M${PX} ${a} L${PX + hw(b)} ${b} L${PX - hw(b)} ${b} Z` : `M${PX - hw(a)} ${a} L${PX + hw(a)} ${a} L${PX + hw(b)} ${b} L${PX - hw(b)} ${b} Z`;
$('#tiers').innerHTML = TIER.map((tr, i) => `<path id="ti${i}" d="${tierD(tr)}" fill="#fff" stroke="${C.line}" stroke-width="3" stroke-linejoin="round"/>`).join('');
const TLAB = [['TOP', 410], ['MIDDLE', 596], ['LOWER', 786]];
const TICO = [['crown', 350], ['building', 524], ['hardhat', 704]];
$('#tlab').innerHTML = TICO.map(([ic, y], i) => `<div class="abs" id="tic${i}" style="left:${PX - 18}px;top:${y}px"></div>`).join('') + TLAB.map(([n, y], i) => `<div class="tl" id="tl${i}" style="top:${y}px">${n}</div>`).join('');
const PPL = [[1, 352], [3, 534], [7, 712]];   // people per tier: a few at the top, many at the bottom
$('#ppl').innerHTML = PPL.map(([n, y], i) => Array.from({ length: n }, (_, k) => `<div class="pp" id="pp${i}_${k}" style="left:${PX - 14 + (k - (n - 1) / 2) * 44}px;top:${y}px;color:${C.ink2}">${PERSON}</div>`).join('')).join('');
const PANES = [
  { ps: 'THE BIG IDEA', pt: '3 Levels', l1: 'THE LAYERS', chips: ['Top', 'Middle', 'Lower'], l2: 'THE IDEA', rows: [['layers', 'Each layer has its own job'], ['key', 'More authority near the top']] },
  { ps: 'LEVEL 01 / 03', pt: 'Top level', l1: 'WHO', chips: ['Board of directors', 'CEO or MD'], l2: 'WHAT THEY DO', rows: [['target', 'Set the big goals'], ['book', 'Make policies, the rules'], ['calendar', 'Plan for years ahead']] },
  { ps: 'LEVEL 02 / 03', pt: 'Middle level', l1: 'WHO', chips: ['Department heads', 'Branch managers'], l2: 'WHAT THEY DO', rows: [['clipboard', 'Turn the plan into department plans'], ['arrowD', 'Pass orders down'], ['arrowU', 'Bring problems up']] },
  { ps: 'LEVEL 03 / 03 · FIRST-LINE', pt: 'Lower level', l1: 'WHO', chips: ['Supervisors', 'Foremen'], l2: 'WHAT THEY DO', rows: [['users', 'Lead the team on the floor'], ['sun', 'Plan the daily work'], ['compass', 'Guide the workers directly']] },
  { ps: 'THE SHAPE', pt: 'A pyramid', l1: 'HOW MANY', chips: ['A few at the top', 'Many at the bottom'], l2: 'WHY', rows: [['users', 'One boss can guide only a few people']] },
  { ps: 'LOOKING AHEAD', pt: 'Plan ahead', l1: 'HOW FAR EACH LEVEL PLANS', bars: [['Top', 380, 'Years'], ['Middle', 220, 'Months'], ['Lower', 64, 'Today']] },
];
$('#pans').innerHTML = PANES.map((p, i) => `<div class="pn" id="pn${i}"><div class="ps">${p.ps}</div><div class="serif pt">${p.pt}</div><div class="hr" style="top:196px"></div><div class="px" style="top:220px">${p.l1}</div>`
  + (p.chips ? p.chips.map((c, k) => `<div class="pill pc" id="pc${i}_${k}" style="top:254px">${c}</div>`).join('') + `<div class="px" id="px2_${i}" style="top:330px">${p.l2}</div>`
    + p.rows.map(([ic, tx], k) => `<div class="pr" id="pr${i}_${k}" style="top:${364 + k * 58}px"><i>${M.icon(ic, 26, C.gold, 2.2)}</i><span>${tx}</span></div>`).join('')
    : p.bars.map(([n], k) => `<div class="pr" id="pr${i}_${k}" style="top:${274 + k * 88}px"><div class="tn">${n}</div><div class="tb"></div><div class="tv">${p.bars[k][2]}</div></div>`).join(''))
  + `</div>`).join('');
// K: Chai Corner with five outlets, as an org chart
const LV = [['Top', 270, 104], ['Middle', 430, 120], ['Lower', 597, 120]];
$('#lvs').innerHTML = LV.map(([n, y, h], i) => `<div class="lv" id="lv${i}" style="top:${y}px;height:${h}px"><div class="bg"></div><div class="serif ln" style="top:${h / 2 - 34}px">${n}</div><div class="ll" style="top:${h / 2 + 12}px">LEVEL</div></div>`).join('');
const KX = [0, 1, 2, 3, 4].map(i => 392 + i * 280);
$('#oms').innerHTML = KX.map((x, i) => `<div class="card om" id="om${i}" style="left:${x}px"><div class="oi">${M.icon('store', 28, C.gold, 2.2)}</div><div class="serif on">Outlet ${i + 1}</div><div class="lbl oml">MANAGER</div></div>`).join('');
$('#svs').innerHTML = KX.map((x, i) => [0, 1].map(k => { const cx = x + 62 + k * 124; return `<div class="sv" id="sv${i}_${k}" style="left:${cx - 32}px"><div class="bg"></div><div class="si"></div></div><div class="svl" id="svl${i}_${k}" style="left:${cx - 62}px">${k ? 'EVENING' : 'MORNING'}</div>`; }).join('')).join('');
let kl = KX.map((x, i) => `<path id="ka${i}" d="M1076 374 V402 H${x + 124} V430"/>`).join('');
kl += KX.map((x, i) => `<path id="kb${i}_0" d="M${x + 124} 550 V580 H${x + 62} V610"/><path id="kb${i}_1" d="M${x + 124} 550 V580 H${x + 186} V610"/>`).join('');
$('#kl').innerHTML = kl;
$('#tplI').innerHTML = M.icon('timer', 24, '#fff', 2.2);
const KS = [['crown', 'Top: Ravi picks where the <span class="acc">next outlet</span> opens'], ['building', 'Middle: <span class="acc">stock and staff</span> for each outlet'], ['sun', 'Lower: run the <span class="acc">morning rush</span>'], ['check', 'Small problems get fixed <span class="acc">lower down</span>']];
$('#kss').innerHTML = KS.map(([ic, tx], i) => `<div class="ks" id="ks${i}"><span>${M.icon(ic, 40, C.gold2, 2.4)}</span><span class="serif tx" style="color:#fff">${tx.replace(/class="acc"/g, 'style="color:#E9D9B5"')}</span></div>`).join('');
// quiz
const OPTS = ['Top level', 'Middle level', 'Lower level', 'Workers'], RIGHT = 0;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('crown', 44, C.gold2, 2.4);
// recap
const ROWS = [['layers', 'Three levels'], ['target', 'Top sets goals, middle <span class="acc">plans</span>, lower runs the day'], ['calendar', 'The higher the level, the <span class="acc">further ahead</span> it plans']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
$('#rw0').insertAdjacentHTML('beforeend', ['Top', 'Middle', 'Lower'].map((p, k) => `<div class="fp" id="fp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
// pyramid tier state: active window(s) per tier -> [active 0..1, visited 0/1]
const TACT = [[[tP1, tM1], [tHi, tFur]], [[tM1, tL1], [tFur, tToday]], [[tL1, tW1], [tToday, tPout + 1]]];
const PANE_IN = [tP0 + 0.5, tP1, tM1, tL1, tW1, tW2];
const PANE_T = [   // [chip times], [row times]
  [[tThree + 0.1, tThree + 0.25, tThree + 0.4], [tPyr - 0.1, tPyr + 0.4]],
  [[wt('P1', 'board'), wt('P1', 'CEO')], [wt('P2', 'big'), wt('P2', 'policies'), wt('P2', 'long')]],
  [[wt('M1', 'Department'), wt('M1', 'branch')], [wt('M2', 'turn'), wt('M3', 'Orders'), wt('M3', 'problems')]],
  [[wt('L1', 'Supervisors'), wt('L1', 'foremen')], [wt('L1', 'team'), wt('L2', 'daily'), wt('L2', 'guide')]],
  [[tFew, tMany], [tMany + 0.9]],
  [[], [tHi, tFur, tToday]],
];
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  OX.forEach((x, i) => { const q = $('#qp' + i); q.style.left = (x - q.offsetWidth / 2) + 'px'; });
  const tp = $('#tPl'); tp.style.left = (1600 - 36 - tp.offsetWidth) + 'px';
  PANES.forEach((p, i) => { if (!p.chips) return; let x = 48; p.chips.forEach((_, k) => { const c = $(`#pc${i}_${k}`); c.style.left = x + 'px'; x += c.offsetWidth + 16; }); });
  const rt = $('#rw0 .rt'); let x = 216 + rt.offsetWidth + 40;
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
  const exOn = M.vis($('#exChip'), t, tC2 + 0.1, tT - 0.3, { dy: 10, outDur: 0.3 });
  if (t > tK1) M.vis($('#exChip'), t, tBack - 0.1, tQ - 0.42, { dy: 10, outDur: 0.3 });

  /* ===== A: fifty workers, one manager ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#net'), t, tMorph + 0.18, 1e9, { dy: 36 });
    const jam = M.io((t - tOne) / 0.4);
    M.vis($('#rav'), t, tMorph + 0.55, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
    $('#rav').style.background = mix(C.gold, C.red, jam);
    M.rise($('#ravN'), t, tMorph + 0.7, { st: 0.06 });
    let nW = 0;
    OX.forEach((x, i) => {
      M.vis($('#ol' + i), t, tFive + i * 0.09, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
      for (let k = 0; k < 10; k++) {
        const tin = tFifty + (i * 10 + k) * 0.022, el = $(`#wk${i}_${k}`);
        if (M.vis(el, t, tin, 1e9, { dy: 10, sc: 0.7, sp: M.POP, fade: 0.08 }) > 0.5) nW++;
        el.style.color = mix(C.ink2, C.dim, M.io((t - tNoth) / 0.5));
      }
      const qi = QORD.indexOf(i), tq = tAsk[qi];
      M.draw($('#ln' + i), t, tEvery + i * 0.09, 0.6, M.o3);
      const asked = on01(t, tq, tq + 1.2, 0.25);
      $('#ln' + i).setAttribute('stroke', mix(mix(C.link, C.gold, asked), C.red, jam));
      M.vis($('#qp' + i), t, tq, 1e9, { dy: 14, sc: 0.8, sp: M.POP, fade: 0.1 });
      const qp = $('#qp' + i); qp.style.background = mix(C.paper, C.redBg, jam); qp.style.color = mix(C.ink, C.red, jam);
    });
    M.setT($('#wkL'), `${nW} WORKERS`);
    M.vis($('#qCnt'), t, tQues - 0.05, 1e9, { dy: 16 });
    const nq = Math.round(48 * M.o3((t - tQues) / (tOne - tQues))); M.setT($('#qCt'), `${nq} question${nq === 1 ? '' : 's'} today`);
    const qc = $('#qCnt'); qc.style.background = mix(C.paper, C.redBg, jam); qc.style.color = mix(C.ink, C.red, jam); setIco($('#qCi'), 'help', jam > 0.5 ? C.red : C.ink, 24);
    M.vis($('#tPl'), t, tC2 + 0.05, 1e9, { dy: 16 });
    const hrs = 3 * (1 - M.io((t - tC2 - 0.3) / (tFut - tC2)));
    M.setT($('#tPt'), `Time to plan: ${Math.round(hrs)} hrs`);
    const hot = M.io((t - tFut + 0.3) / 0.4), tp = $('#tPl'); tp.style.background = mix(C.paper, C.redBg, hot); tp.style.color = mix(C.ink, C.red, hot);
    setIco($('#tPi'), 'timer', hot > 0.5 ? C.red : C.ink, 24);
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

  /* ===== D: what are levels of management? ===== */
  const dOn = t >= tTu - 0.05 && t < tP0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#defbar'), t, tD2 + 0.15, tDout, { dy: 24, ...o });
    M.vis($('#lay'), t, tLayers - 0.15, tDout, { dy: 36, ...o });
    SLABS.forEach((_, i) => {
      const el = $('#sl' + i); M.vis(el, t, tLayers + 0.1 + i * 0.14, 1e9, { dy: 20, sc: 0.92, sp: M.POP });
      const act = i === 0 ? on01(t, tTop - 0.05, tBot - 0.05) : i === 2 ? on01(t, tBot - 0.05, tD3 + 0.6) : 0;
      el.style.background = mix(C.paper, C.gold, act); el.style.color = mix(C.ink, '#fff', act);
    });
    M.vis($('#auth'), t, tD3 - 0.05, tDout, { dy: 36, ...o });
    M.vis($('#aic'), t, tD3 + 0.15, 1e9, { dy: 0, sc: 0.6, sp: M.POP });
    M.rise($('#aT'), t, tD3 + 0.2, { st: 0.06, sp: M.HEAVY });
    M.vis($('#auth .hr'), t, tD3 + 0.4, 1e9, { dy: 0 });
    ABARS.forEach(([_, w], i) => {
      const el = $('#ab' + i), ta = tDiff + i * 0.22; M.vis(el, t, ta - 0.1, 1e9, { dy: 12 });
      el.querySelector('.at').style.width = (w * M.o5((t - ta) / 0.8)).toFixed(1) + 'px';
      el.querySelector('.at').style.background = mix(C.gold, C.gold2, i / 2.5);
    });
    M.rise($('#aM'), t, tPower - 0.25, { st: 0.04 });
  }

  /* ===== P: the pyramid ===== */
  const pOn = t >= tP0 - 0.1 && t < tK1 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const po = { outDur: 0.3, ody: -16 };
    TIER.forEach((_, i) => {
      const el = $('#ti' + i), tin = tThree - 0.1 + (2 - i) * 0.16;
      M.vis(el, t, tin, tPout, { dy: 30, sp: M.POP, fade: 0.12, outDur: 0.3, ody: 0 });
      let act = 0; for (const [a, b] of TACT[i]) act = Math.max(act, on01(t, a, b, 0.3));
      const seen = t >= TACT[i][0][0];
      el.setAttribute('fill', mix('#ffffff', C.gold, act));
      el.setAttribute('stroke', act > 0.01 ? mix(C.gold, C.gold, act) : (seen ? C.gold : C.line));
      const tl = $('#tl' + i); M.vis(tl, t, tin + 0.2, tPout, { dy: 10, ...po });
      tl.style.color = act > 0.5 ? '#fff' : (seen ? C.ink : C.muted);
      const tc = $('#tic' + i); M.vis(tc, t, tin + 0.25, i ? tMany - 0.1 : tFew - 0.1, { dy: 10, sc: 0.7, sp: M.POP, outDur: 0.2, ody: -8 });
      setIco(tc, TICO[i][0], act > 0.5 ? '#fff' : (seen ? C.gold : C.dim), 36, 2.2);
      PPL[i][0] && Array.from({ length: PPL[i][0] }, (_, k) => {
        const pe = $(`#pp${i}_${k}`), tpp = (i === 0 ? tFew : tMany) + k * 0.05 + (i === 2 ? 0.15 : 0);
        M.vis(pe, t, tpp, tPout, { dy: 10, sc: 0.6, sp: M.POP, fade: 0.08, ...po });
        pe.style.color = act > 0.5 ? '#fff' : C.ink2;
      });
    });
    M.vis($('#panel'), t, tP0 + 0.3, tPout, { dx: 60, dy: 0, ...po });
    PANES.forEach((p, k) => {
      const tin = PANE_IN[k], tout = k < 5 ? PANE_IN[k + 1] - 0.14 : 1e9;
      const pn = $('#pn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.3, tout, { dy: 0, ...oo });
      const [ct, rt] = PANE_T[k];
      M.vis(pn.querySelectorAll('.px')[0], t, tin + 0.4, tout, { dy: 10, ...oo });
      if (p.chips) {
        p.chips.forEach((_, j) => M.vis($(`#pc${k}_${j}`), t, ct[j] - 0.05, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08, ...oo }));
        M.vis($('#px2_' + k), t, Math.min(rt[0] - 0.3, ct[ct.length - 1] + 0.5), tout, { dy: 10, ...oo });
        p.rows.forEach((_, j) => M.vis($(`#pr${k}_${j}`), t, rt[j] - 0.08, tout, { dy: 18, ...oo }));
      } else {
        p.bars.forEach(([n, w], j) => {
          const r = $(`#pr${k}_${j}`); M.vis(r, t, rt[j] - 0.15, tout, { dy: 14, ...oo });
          const ww = w * M.o5((t - rt[j]) / 0.8), bt = r.querySelector('.tb'), tv = r.querySelector('.tv');
          bt.style.width = ww.toFixed(1) + 'px'; tv.style.left = (180 + ww + 20).toFixed(1) + 'px';
          tv.style.opacity = M.clamp((t - rt[j] - 0.2) / 0.3).toFixed(3); tv.style.color = j === 2 ? C.gold : C.ink;
        });
      }
    });
  }

  /* ===== K: Chai Corner, grown ===== */
  const kOn = t >= tK1 - 0.1 && t < tQ + 0.05; M.hide($('#sK'), !kOn);
  if (kOn) {
    const tRow1 = tK1 + 0.1, tRow2 = tK1 + 0.4, tRow3 = tK1 + 0.75;
    const LVT = [[tRow1, tK2, tK3], [tRow2, tK3, tK4], [tRow3, tK4, tK5]];
    LV.forEach((_, i) => {
      const el = $('#lv' + i), [tin, a, b] = LVT[i]; M.vis(el, t, tin, 1e9, { dx: -40, dy: 0 });
      const act = on01(t, a, b, 0.3), seen = t >= a;
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.gold, act); bg.style.borderColor = mix(seen ? C.gold : C.line, C.gold, act);
      el.querySelector('.ln').style.color = act > 0.5 ? '#fff' : (seen ? C.ink : C.dim);
      el.querySelector('.ll').style.color = act > 0.5 ? '#fff' : C.muted;
    });
    M.vis($('#kR'), t, tRow1 + 0.15, 1e9, { dy: 0, sc: 0.85, sp: M.POP });
    KX.forEach((x, i) => {
      M.draw($('#ka' + i), t, tRow2 + 0.05 + i * 0.06, 0.5, M.o3);
      const om = $('#om' + i); M.vis(om, t, tRow2 + 0.2 + i * 0.07, 1e9, { dy: 24 });
      const oAct = on01(t, tStock + i * 0.06, tK4, 0.3);
      om.querySelector('.oi').style.background = mix(C.paper, C.gold, oAct); setIco(om.querySelector('.oi'), 'store', oAct > 0.5 ? '#fff' : C.gold, 28);
      [0, 1].forEach(k => {
        M.draw($(`#kb${i}_${k}`), t, tRow3 + 0.05 + i * 0.05, 0.45, M.o3);
        const sv = $(`#sv${i}_${k}`), tin = tRow3 + 0.2 + i * 0.06 + k * 0.03;
        M.vis(sv, t, tin, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($(`#svl${i}_${k}`), t, tin + 0.1, 1e9, { dy: 8 });
        const pick = i === 2 && k === 0;
        let a = on01(t, tRush + i * 0.05, tK5, 0.3) * (k === 0 ? 1 : 0.0);
        if (pick) a = Math.max(a, on01(t, tSup - 0.1, 1e9, 0.3));
        const bg = sv.querySelector('.bg'); bg.style.background = mix(C.card, C.gold, a); bg.style.borderColor = mix(t >= tK4 ? C.gold : C.line, C.gold, a);
        setIco(sv.querySelector('.si'), k ? 'moon' : 'sun', a > 0.5 ? '#fff' : C.gold, 28);
        if (pick && t > tSup - 0.1 && t < tSup + 0.5) sv.style.transform = `scale(${(1 + 0.12 * Math.sin(Math.PI * (t - tSup + 0.1) / 0.6)).toFixed(4)})`;
        else if (pick && t >= tSup + 0.5 && sv.style.transform !== 'none') sv.style.transform = 'none';
      });
    });
    M.vis($('#tplan'), t, tBack - 0.1, 1e9, { dx: -20, dy: 0, sp: M.SOFT });
    const tp = $('#tplan'); tp.style.background = C.gold; tp.style.color = '#fff';
    M.vis($('#kstrip'), t, tK2 + 0.15, 1e9, { dy: 30 });
    const KST = [tK2 + 0.25, tK3, tK4, tK5];
    KS.forEach((_, k) => {
      const tin = KST[k], tout = k < 3 ? KST[k + 1] - 0.15 : 1e9, el = $('#ks' + k);
      M.vis(el, t, tin, tout, { dy: 16, outDur: 0.2, ody: -12 });
    });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'Who') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'next') + i * 0.08, 1e9, { dy: 40 });
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
      const a = tPill[k] - 0.05, b = k < 2 ? tPill[k + 1] - 0.05 : tRow[1] - 0.2;
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
