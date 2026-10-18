// MBA - Principles of Management, Ep 23: Rational Decision-Making
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  calc: ['M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M8 6h8', 'M16 14v4', 'M16 10h.01', 'M12 10h.01', 'M8 10h.01', 'M12 14h.01', 'M8 14h.01', 'M12 18h.01', 'M8 18h.01'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  sliders: ['M21 4h-7', 'M10 4H3', 'M21 12h-9', 'M8 12H3', 'M21 20h-5', 'M12 20H3', 'M14 2v4', 'M8 10v4', 'M16 18v4'],
  infinity: ['M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tThreeD = wt('H2', 'Three'), tPick = wt('H2', 'pick');
const tVote = [wt('C1', 'Kabir'), wt('C2', 'Asha'), wt('C2', 'Meena')], tWant = [wt('C1', 'cheapest'), wt('C2', 'best'), wt('C2', 'closest')];
const tNobody = wt('C3', 'nobody');
const tT = T0('T1'), tSt2 = wt('T1', 'Just'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tUsing = wt('D2', 'using'), tThat = wt('D2', 'that'), tD3 = T0('D3');
const tP = [wt('D3', 'logical'), wt('D3', 'complete'), wt('D3', 'knows')], tD4 = T0('D4'), tVery = wt('D4', 'very'), tOpt = wt('D4', 'optimising');
const tF0 = T0('F0'), tDout = tF0 - 0.32;
const tStep = [T0('F1'), T0('F2'), T0('F3'), T0('F4'), T0('F5'), T0('F7')];
const tProb = wt('F1', 'Chai');
const tCrit = [wt('F2', 'Price'), wt('F2', 'quality'), wt('F2', 'reliability'), wt('F2', 'distance')];
const tWgt = [wt('F3', 'two'), wt('F3', 'four'), wt('F3', 'three', 1), wt('F3', 'one')];
const tSup = [wt('F4', 'Green'), wt('F4', 'City'), wt('F4', 'Hill')];
const tRate = wt('F5', 'Rate');
const tHi = [[0, 0, wt('F6', 'cheapest')], [2, 1, wt('F6', 'best')], [1, 2, wt('F6', 'never')], [1, 3, wt('F6', 'close')]];
const tMul = wt('F7', 'Multiply'), tAdd = wt('F7', 'add');
const tTot = [wt('F8', 'sixty'), wt('F8', 'seventy'), wt('F8', 'sixty', 1)];
const tF9 = T0('F9'), tWin = wt('F9', 'wins'), tNotC = wt('F9', 'cheapest'), tNotB = wt('F9', 'best');
const tU0 = T0('U0'), tFout = tU0 - 0.32, tU = [T0('U1'), T0('U2'), T0('U3'), T0('U4')], tRare = wt('U5', 'rarely'), tU6 = T0('U6'), tOr = wt('U6', 'Or');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Decide');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['define', 'criteria', 'weight', 'options', 'rate', 'compute'].map(w => wt('S3', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- data (example figures) ---------- */
const SUP = ['Green Farm', 'City Dairy', 'Hill Farm'];
const CRIT = [['Price', 'tag'], ['Quality', 'star'], ['Reliability', 'clock'], ['Distance', 'pin']];
const W = [2, 4, 3, 1];
const R = [[9, 5, 6, 4], [6, 7, 9, 9], [5, 9, 6, 3]];        // R[supplier][criterion], 1 to 10
const TOT = R.map(r => r.reduce((s, v, k) => s + v * W[k], 0)); // 60, 76, 67
const WIN = 1;

/* ---------- build ---------- */
// awning + milk cans (same stall as Ep 01)
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CANS = [434, 482, 530];
$('#cans').innerHTML = CANS.map((x, i) => `<g id="can${i}" transform="translate(${x} 196)"><path d="M-19 0 v-46 q0 -9 9 -13 v-9 h20 v9 q9 4 9 13 v46 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><rect x="-13" y="-76" width="26" height="9" rx="3" fill="#3A4560"/><path d="M-19 -32 h38" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// dairies + votes
const qm = `<div class="qm" style="position:absolute;right:20px;top:22px;width:48px;height:48px;border-radius:24px;border:3px dashed #CFC5B3;background:#fff;display:flex;align-items:center;justify-content:center;font:700 22px Poppins;color:var(--muted)">?</div>`;
const VOTE = [['K', 'Cheapest', 'coin', 0], ['A', 'Best milk', 'star', 2], ['M', 'Closest', 'pin', 1]];   // [letter, wish, icon, dairy index]
const pickBy = d => VOTE.find(v => v[3] === d)[0];
$('#dRow').innerHTML = SUP.map((s, i) => `<div class="job" id="dj${i}" style="left:${36 + i * 291}px"><div class="ji">${M.icon('milk', 28, C.ink, 2.2)}</div><div class="jt">${s}</div>${qm}<div class="av">${pickBy(i)}</div></div>`).join('');
$('#vRow').innerHTML = VOTE.map(([l, w, ic], i) => `<div class="job" id="vj${i}" style="left:${36 + i * 291}px"><div class="avc" style="left:24px;top:22px;width:56px;height:56px;border-radius:28px;font-size:24px">${l}</div><div class="vi">${M.icon(ic, 32, C.gold, 2.2)}</div><div class="jt jn">${['Kabir', 'Asha', 'Meena'][i]}</div><div class="jt jw">${w}</div></div>`).join('');
$('#vNi').innerHTML = M.icon('alert', 24, C.red, 2.2);
// definition
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const PC = [['Fully logical', 'No moods, no favourites', 'calc'], ['All the facts', 'Every price, every detail', 'book'], ['Every option', 'And where each one leads', 'split']];
$('#pRow').innerHTML = PC.map(([t, m], i) => `<div class="pc" id="pc${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="pn">0${i + 1}</div><div class="eic"><span class="ico"></span></div><div class="serif et">${t}</div><div class="em">${m}</div></div>`).join('');
// steps list
const STEPS = ['Define the problem', 'Set the criteria', 'Weight the criteria', 'List the options', 'Rate each option', 'Compute and choose'];
$('#sRows').innerHTML = STEPS.map((s, k) => `<div class="sr" id="sr${k}" style="top:${80 + k * 82}px"><div class="bg"></div><div class="sn">0${k + 1}</div><div class="st">${s}</div><div class="sk">${M.icon('check', 20, '#fff', 3)}</div></div>`).join('');
// scoring table geometry (inside #tbl)
const CX = [488, 672, 856], RY = [172, 242, 312, 382];
$('#probI').innerHTML = M.icon('target', 26, C.gold2, 2.2);
$('#prob').insertAdjacentHTML('beforeend', `<span id="decI" class="abs" style="left:24px;top:15px"></span><b id="decB" class="abs" style="left:64px;top:18px;color:#fff">DECISION</b><span id="decT" class="abs" style="left:212px;top:12px">City Dairy, the most value overall</span>`);
$('#decI').innerHTML = M.icon('trophy', 26, '#fff', 2.2);
$('#cols').innerHTML = CX.map((x, i) => `<div class="col" id="col${i}" style="left:${x}px"></div>`).join('');
$('#ths').innerHTML = SUP.map((s, i) => `<div class="th" id="th${i}" style="left:${CX[i]}px;width:176px">${s}</div>`).join('');
$('#lines').innerHTML = [164, 234, 304, 374, 452].map((y, k) => `<div class="hl" id="hl${k}" style="top:${y}px${k === 4 ? ';background:#CFC5B3' : ''}"></div>`).join('');
$('#crs').innerHTML = CRIT.map(([n, ic], k) => `<div class="cr" id="cr${k}" style="top:${RY[k]}px"><i>${M.icon(ic, 24, C.gold, 2.2)}</i><span>${n}</span></div><div class="wt" id="wt${k}" style="top:${RY[k]}px"><b>${W[k]}</b><div class="wb">${'<s></s>'.repeat(W[k])}</div></div>`).join('');
$('#cells').innerHTML = R.map((r, i) => r.map((v, k) => `<div class="cl" id="c${i}${k}" style="left:${CX[i]}px;top:${RY[k]}px"><div class="rg"></div><div class="cv">${v}</div><div class="cm">${v * W[k]}</div></div>`).join('')).join('');
$('#tts').innerHTML = CX.map((x, i) => `<div class="tt serif" id="tt${i}" style="left:${x}px">0</div>`).join('');
// assumptions
const AS = [['target', 'Clear', 'problem'], ['list', 'Known', 'every option'], ['sliders', 'Fixed', 'preferences'], ['infinity', 'Unlimited', 'time and money']];
$('#aRow').innerHTML = AS.map(([ic, t, m], i) => `<div class="as" id="as${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="an">0${i + 1}</div><div class="ai"><span class="ico"></span></div><div class="serif at">${t}</div><div class="am">${m}</div><div class="hr"></div><div class="ap ok">${M.icon('check', 22, C.gold, 2.6)}Assumed true</div><div class="ap no">${M.icon('x', 22, C.red, 2.6)}Rarely true</div></div>`).join('');
$('#whatI').innerHTML = M.icon('help', 44, C.gold2, 2.4);
// quiz
const OPTS = [['Rate', 'each option'], ['Weight', 'the criteria'], ['Compute', 'the totals'], ['Define', 'the problem']], RIGHT = 1;
$('#opts').innerHTML = OPTS.map(([o, s], i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="os">${s}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('scale', 44, C.gold2, 2.4);
// recap
const ROWS = [['scale', 'Pure logic, to pick <span class="acc">the most value</span>'], ['list', 'Six steps'], ['alert', 'Assumes all the facts and no limits. <span class="acc">Rarely true.</span>']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
const RP = ['Define', 'Criteria', 'Weight', 'Options', 'Rate', 'Compute'];
$('#rw1').insertAdjacentHTML('beforeend', RP.map((p, k) => `<div class="fp" id="rp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const rt = $('#rw1 .rt'); let px = 216 + rt.offsetWidth + 40;
  for (let k = 0; k < 6; k++) { const p = $('#rp' + k); p.style.left = px + 'px'; px += p.offsetWidth + 14; }
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  /* title card -> header */
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });

  /* ===== A: three dairies, three opinions ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CANS.forEach((x, i) => { const ti0 = tThreeD + i * 0.12; const p = M.spring(t - ti0, M.POP); const g = $('#can' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${x} ${(196 - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // dairies
    M.vis($('#dairy'), t, tMorph + 0.3, 1e9, { dy: 36 });
    SUP.forEach((_, i) => {
      const el = $('#dj' + i); M.vis(el, t, tThreeD - 0.05 + i * 0.12, 1e9, { dy: 24, sp: M.SOFT });
      const d = VOTE.findIndex(v => v[3] === i);
      M.vis(el.querySelector('.qm'), t, tPick + i * 0.1, tWant[d] - 0.05, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08, outDur: 0.15, osc: 0.5, ody: 0 });
      M.vis(el.querySelector('.av'), t, tWant[d] + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      el.style.background = mix(C.paper, C.redBg, M.io((t - tNobody - 0.1 - i * 0.08) / 0.3));
    });
    // votes
    M.vis($('#votes'), t, tMorph + 0.42, 1e9, { dy: 36 });
    VOTE.forEach((_, i) => {
      const el = $('#vj' + i); M.vis(el, t, tMorph + 0.7 + i * 0.12, 1e9, { dy: 24, sp: M.SOFT });
      M.vis(el.querySelector('.vi'), t, tWant[i] - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      M.rise(el.querySelector('.jn'), t, tMorph + 0.8 + i * 0.12, { st: 0.04, out: tWant[i] - 0.3, outDur: 0.2 });
      M.rise(el.querySelector('.jw'), t, tWant[i] - 0.05, { st: 0.05 });
      el.querySelector('.avc').style.background = mix(C.ink, C.gold, on01(t, tVote[i], i < 2 ? tVote[i + 1] : tNobody));
    });
    M.vis($('#vN'), t, tNobody + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
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

  /* ===== D: what is rational decision making? ===== */
  const dOn = t >= tTu - 0.05 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tUsing - 0.25, outDur: 0.3 });
    M.vis($('#mdl'), t, tUsing - 0.05, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    M.rise($('#quote1'), t, tUsing, { st: 0.05, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#quote2'), t, tThat - 0.05, { st: 0.06, out: tD3 - 0.1, outDur: 0.3 });
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#defbar'), t, tD3 + 0.12, tDout, { dy: 24, ...o });
    PC.forEach((d, i) => {
      const el = $('#pc' + i), ta = tP[i], td = i < 2 ? tP[i + 1] : tVery;
      M.vis(el, t, tD3 + 0.3 + i * 0.12, tDout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.32), act = on01(t, ta, td);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.pn').style.color = mix(mix(C.dim, C.gold, on), C.gold2, act);
      el.querySelector('.et').style.color = mix(mix(C.dim, C.ink, on), '#fff', act);
      el.querySelector('.em').style.color = mix(mix(C.dim, C.ink2, on), C.gold2, act);
      el.querySelector('.eic').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), d[2], act > 0.5 ? C.gold2 : (t < ta ? C.dim : C.gold), 44, 2);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tD3 + 1.2 && t < tDout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#both'), t, tVery - 0.1, tDout, { dy: 40, ...o });
  }

  /* ===== F: six steps + weighted scoring table ===== */
  const fOn = t >= tF0 - 0.1 && t < tU0 + 0.2; M.hide($('#sF'), !fOn);
  M.vis($('#exChip'), t, tWgt[1] - 0.2, tFout, { dy: 10, outDur: 0.3 });
  if (fOn) {
    const fo = { outDur: 0.3, ody: -16 };
    M.vis($('#stp'), t, tF0 + 0.05, tFout, { dy: 36, ...fo });
    M.vis($('#tbl'), t, tF0 + 0.17, tFout, { dy: 36, ...fo });
    // step rows
    STEPS.forEach((_, k) => {
      const el = $('#sr' + k), ta = tStep[k], td = k < 5 ? tStep[k + 1] : 1e9;
      M.vis(el, t, tF0 + 0.35 + k * 0.08, 1e9, { dy: 16 });
      const on = M.io((t - ta) / 0.3), act = on01(t, ta, td), done = M.io((t - td) / 0.35);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.sn').style.color = mix(mix(C.dim, C.gold, on), C.gold2, act);
      el.querySelector('.st').style.color = mix(mix(C.dim, C.ink, on), '#fff', act);
      M.vis(el.querySelector('.sk'), t, td + 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    });
    // table skeleton
    M.vis($('#tlC'), t, tF0 + 0.5, 1e9, { dy: 10 }); M.vis($('#tlW'), t, tF0 + 0.6, 1e9, { dy: 10 });
    for (let k = 0; k < 5; k++) { const el = $('#hl' + k); const u = M.io((t - tF0 - 0.6 - k * 0.07) / 0.5); M.hide(el, u <= 0); el.style.transform = `scaleX(${u.toFixed(4)})`; el.style.transformOrigin = '0 0'; }
    // step 1: the problem -> later the decision
    const dec = M.io((t - tWin) / 0.3);
    M.vis($('#prob'), t, tProb - 0.1, 1e9, { dy: 0, sc: 0.92, sp: M.POP, fade: 0.1 });
    [...$('#prob').children].slice(0, 3).forEach(e => { e.style.opacity = (1 - dec).toFixed(3); });
    ['#decI', '#decB', '#decT'].forEach((id, j) => M.vis($(id), t, tWin + 0.05 + j * 0.06, 1e9, { dy: 14, fade: 0.12 }));
    $('#prob').style.background = mix(C.ink, C.gold, dec);
    // step 2: criteria
    CRIT.forEach((_, k) => M.vis($('#cr' + k), t, tCrit[k] - 0.05, 1e9, { dx: -24, dy: 0 }));
    // step 3: weights
    W.forEach((w, k) => {
      const el = $('#wt' + k); M.vis(el.querySelector('b'), t, tWgt[k] - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      [...el.querySelectorAll('s')].forEach((s, j) => M.vis(s, t, tWgt[k] + 0.1 + j * 0.07, 1e9, { dy: 10, sp: M.POP, fade: 0.08 }));
      const fl = on01(t, tMul + k * 0.1, tMul + 0.6 + k * 0.1, 0.2);
      el.querySelector('b').style.transform = fl > 0.001 ? `scale(${(1 + 0.2 * fl).toFixed(4)})` : '';
    });
    // step 4: alternatives (columns), winner turns navy
    SUP.forEach((_, i) => {
      M.vis($('#col' + i), t, tSup[i] - 0.05, 1e9, { dy: 24 });
      M.vis($('#th' + i), t, tSup[i], 1e9, { dy: 12 });
      const win = i === WIN ? M.io((t - tWin) / 0.35) : 0;
      const lose = i === 0 ? M.io((t - tNotC) / 0.35) : i === 2 ? M.io((t - tNotB) / 0.35) : 0;
      $('#col' + i).style.background = mix(C.paper, C.ink, win);
      $('#th' + i).style.color = mix(mix(C.ink, C.dim, lose), '#fff', win);
      // cells
      R[i].forEach((v, k) => {
        const el = $('#c' + i + k), tin = tRate + 0.15 + (i * 4 + k) * 0.1, tm = tMul + 0.1 + k * 0.1 + i * 0.04;
        M.hide(el, t < tin - 0.01);
        M.vis(el.querySelector('.cv'), t, tin, tm, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.08, outDur: 0.18, ody: -14 });
        M.vis(el.querySelector('.cm'), t, tm + 0.1, 1e9, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.08 });
        const col = mix(mix(C.ink, C.dim, lose), '#fff', win);
        el.querySelector('.cv').style.color = col; el.querySelector('.cm').style.color = col;
        const h = tHi.find(x => x[0] === i && x[1] === k);
        const rg = el.querySelector('.rg');
        if (h) M.vis(rg, t, h[2] - 0.05, tMul - 0.1, { dy: 0, sc: 1.2, sp: M.POP, fade: 0.1, outDur: 0.2, ody: 0 }); else M.hide(rg, true);
      });
      // totals
      const tt = $('#tt' + i), t0 = tTot[i] - 0.05;
      M.vis(tt, t, t0, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.count(tt, t, t0, 0.6, 0, TOT[i]);
      tt.style.color = mix(mix(C.gold, C.dim, lose), '#E9B95C', win);
    });
    M.rise($('#totL'), t, tAdd - 0.05, { st: 0.05 });
  }

  /* ===== U: four assumptions ===== */
  const uOn = t >= tU0 - 0.1 && t < tQ + 0.05; M.hide($('#sU'), !uOn);
  if (uOn) {
    M.rise($('#uh'), t, tU0 + 0.08, { st: 0.06, sp: M.HEAVY });
    AS.forEach((a, i) => {
      const el = $('#as' + i), ta = tU[i], td = i < 3 ? tU[i + 1] : tRare - 0.3;
      M.vis(el, t, tU0 + 0.5 + i * 0.1, 1e9, { dy: 30 });
      const on = M.io((t - ta) / 0.3), act = on01(t, ta, td), rare = M.io((t - tRare - i * 0.1) / 0.3);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(mix(C.line, C.ink, act), '#E8C3B6', rare);
      el.querySelector('.an').style.color = mix(mix(C.dim, C.gold, on), C.gold2, act);
      el.querySelector('.ai').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), a[0], act > 0.5 ? C.gold2 : (t < ta ? C.dim : C.gold), 34, 2.2);
      const at = el.querySelector('.at'); M.rise(at, t, ta + 0.05, { st: 0.05 }); at.style.color = mix(C.ink, '#fff', act);
      const am = el.querySelector('.am'); M.rise(am, t, ta + 0.2, { st: 0.04 }); am.style.color = mix(C.ink2, C.gold2, act);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      M.vis(el.querySelector('.ok'), t, ta + 0.45, tRare + i * 0.1 - 0.05, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08, outDur: 0.15, osc: 0.8, ody: 0 });
      el.querySelector('.ok').style.background = mix(C.paper, C.navy2, act); el.querySelector('.ok').style.color = mix(C.ink, '#fff', act);
      M.vis(el.querySelector('.no'), t, tRare + i * 0.1 + 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    });
    M.vis($('#what'), t, tU6 - 0.05, 1e9, { dy: 40 });
    const ws = $('#what').querySelectorAll('.tx');
    M.rise(ws[0], t, tU6 + 0.1, { st: 0.05 }); M.vis(ws[1], t, tOr - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.rise(ws[2], t, tOr, { st: 0.05 });
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
      el.querySelector('.ot').style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      el.querySelector('.os').style.color = right ? mix(C.ink2, C.gold2, r) : mix(C.ink2, C.dim, r);
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
    for (let k = 0; k < 6; k++) {
      const el = $('#rp' + k); M.vis(el, t, tPill[k] - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      const a = tPill[k] - 0.05, b = k < 5 ? tPill[k + 1] - 0.05 : tRow[2] - 0.3;
      const g = M.io((t - a) / 0.2), d = M.io((t - b) / 0.3);
      el.style.background = mix(mix(C.paper, C.gold, g), C.ink, d);
      el.style.color = g > 0.5 ? '#fff' : C.ink;
    }
    M.vis($('#next'), t, tN - 0.05, 1e9, { dy: 40 });
  }
  caps(t);
});

/* ---------- sound (whitelist only) ---------- */
M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.2);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
