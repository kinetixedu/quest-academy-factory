// Case Study mode - Amul
(() => {
const { $ } = M, wt = M.wt, t0 = M.t0, t1 = M.t1;
const RED = '#D62828', INK = '#1B1A17', CREAM = '#FFFDF8';
const A = window.ASSETS || {};
const img = (k, fb) => A[k] || fb;

/* ---------- helpers ---------- */
const fmtIN = n => { n = Math.round(n); const s = String(n); if (s.length <= 3) return s; const last = s.slice(-3), rest = s.slice(0, -3); return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last; };
// jagged torn-paper polygon (percent coords) for a w x h box
function tornClip(w, h, seed, amp = 9, step = 26) {
  const r = M.rng(seed), pts = [];
  const j = () => (r() * amp);
  for (let x = 0; x <= w; x += step) pts.push([Math.min(x, w), j()]);
  for (let y = step; y <= h; y += step) pts.push([w - j(), Math.min(y, h)]);
  for (let x = w - step; x >= 0; x -= step) pts.push([Math.max(x, 0), h - j()]);
  for (let y = h - step; y > 0; y -= step) pts.push([j(), y]);
  return 'polygon(' + pts.map(([x, y]) => `${(x / w * 100).toFixed(2)}% ${(y / h * 100).toFixed(2)}%`).join(',') + ')';
}
function torn(el, seed) { const w = el.offsetWidth, h = el.offsetHeight; el.querySelector('.pb').style.clipPath = tornClip(w, h, seed, 10, 24); el.querySelector('.im').style.clipPath = tornClip(w - 28, h - 28, seed + 7, 7, 22); }
const tornCard = (id, x, y, w, h, src, pos = '50% 50%') => `<div class="torn" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><div class="pb"></div><div class="im"><img src="${src}" style="object-position:${pos}"></div></div>`;

/* ---------- paper texture (static, seeded) ---------- */
(() => { const c = $('#paperTex'), x = c.getContext('2d'), d = x.createImageData(960, 540), r = M.rng(11); for (let i = 0; i < d.data.length; i += 4) { const v = 236 + (r() - 0.5) * 16; d.data[i] = v; d.data[i + 1] = v - 6; d.data[i + 2] = v - 17; d.data[i + 3] = 255; } x.putImageData(d, 0, 0); c.style.width = '1920px'; c.style.height = '1080px'; })();

/* ---------- beats ---------- */
const S = [t0('H1') - 0.45, t0('J2') - 0.35, t0('J3') - 0.35, t0('J4') - 0.35];   // camera arrives at each stop
const tZoom = wt('J5', 'All') - 0.1, tLogo = wt('J5', 'Amul') - 0.15;
const RIPS = [t0('V1') - 0.35, t0('F1') - 0.35, t0('M1') - 0.35, t0('R1') - 0.35, t0('Q1') - 0.3];
const RD = 0.62;                                   // rip duration, scene swaps at the midpoint
const tF = t0('R2') - 0.05;
const SC = [['A', -1, RIPS[0] + RD / 2], ['B', RIPS[0] + RD / 2, RIPS[1] + RD / 2], ['C', RIPS[1] + RD / 2, RIPS[2] + RD / 2], ['D', RIPS[2] + RD / 2, RIPS[3] + RD / 2], ['E', RIPS[3] + RD / 2, tF], ['F', tF, RIPS[4] + RD / 2], ['Q', RIPS[4] + RD / 2, 1e9]];
const tCount = t1('Q1') + 0.05, tAns = t0('A1') - 0.02, tTake = wt('A1', 'All') - 0.1;

/* ---------- A: build the journey ---------- */
const Y = i => 280 + i * 1000;            // top of each stop (content 520 tall, centre at 540 + i*1000)
const L = 160, R = 1000, PW = 760, PH = 520;
let st = '';
st += tornCard('ph0', L, Y(0), PW, PH, img('cows', 'cut/cow.png'), '50% 55%');
st += tornCard('ph1', R, Y(1), PW, PH, img('milk_pour', 'cut/pour_full.jpg'));
st += tornCard('ph2', L, Y(2), PW, PH, img('plant', 'cut/trinity_full.jpg'));
st += tornCard('ph3', L, Y(3), PW, PH, img('parlour', 'cut/cans_full.jpg'));
// text blocks
const tb = (id, x, y, ic, num, lab, extra = '') => `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px">
  <div class="icn" style="left:0;top:0">${M.icon(ic, 44, INK, 2.2)}</div>
  <div class="cond big num" style="left:0;top:122px;font-size:180px">${num}</div>
  <div class="condm lbl" style="left:4px;top:300px;font-size:44px;color:${INK}">${lab}</div>${extra}</div>`;
st += tb('tx0', R + 40, Y(0) + 20, 'users', '0', 'Farmers', `<div class="redtag" id="tg0" style="left:4px;top:380px">Villages of Gujarat</div>`);
st += tb('tx1', L, Y(1) - 20, 'db', '3 crore', 'Litres of milk a day', `<div id="tx1b" style="position:absolute;left:4px;top:380px;display:flex;align-items:baseline;gap:18px"><span class="cond" id="n1b" style="font-size:96px;color:${RED}">0</span><span class="condm" style="font-size:32px">village societies</span></div>`);
st += tb('tx2', R + 40, Y(2) + 10, 'gear', '18', 'District unions');
st += tb('tx3', R + 40, Y(3) + 20, 'store', 'India', 'Shops across the country');
$('#stops').innerHTML = st;
// product cutouts + tanker (absolute in world)
const PROD = (A.products || []).slice(0, 3);
const PPOS = [[1060, Y(2) + 390, 250, -6], [1290, Y(2) + 380, 260, 3], [1480, Y(2) + 420, 210, 8]];
PROD.forEach((p, i) => { const [x, y, h, r] = PPOS[i]; $('#stops').insertAdjacentHTML('beforeend', `<div id="pr${i}" style="position:absolute;left:${x}px;top:${y}px"><img class="cutimg" src="${p}" style="position:relative;height:${h}px;transform:rotate(${r}deg)"></div>`); });
if (A.tanker) $('#stops').insertAdjacentHTML('beforeend', `<img class="cutimg" id="tank" src="${A.tanker}" style="height:270px;left:1050px;top:${Y(3) + 395}px">`);
// the dashed path: through each photo's outer side, S-curves between stops
const PX = [L + PW / 2, R + PW / 2, L + PW / 2, L + PW / 2];
let d = `M${PX[0]} ${Y(0) - 400} L${PX[0]} ${Y(0) + 260}`;
for (let i = 0; i < 3; i++) { const ya = Y(i) + 260, yb = Y(i + 1) + 260; d += ` C${PX[i]} ${ya + 560} ${PX[i + 1]} ${yb - 560} ${PX[i + 1]} ${yb}`; }
d += ` L${PX[3]} ${Y(3) + 900}`;
$('#pdash').setAttribute('d', d); $('#pmask').setAttribute('d', d);
const PL = $('#pmask').getTotalLength();
const PROGK = [[0, 0.06], [S[0] + 0.3, 0.12], [S[1], 0.37], [S[2], 0.63], [S[3], 0.88], [tZoom, 1]];
const pathU = M.keys(PROGK.map(([t, v]) => [t, v]), 0.9, M.io);
const camF = M.camera($('#world'), [[0, 1, 960, 540], [S[1], 1, 960, 1540], [S[2], 1, 960, 2540], [S[3], 1, 960, 3540], [tZoom, 0.27, 2560, 2080, [4.2, 1]]], [6.2, 1]);
let tornDone = false;

/* ---------- B / C / D / E builds ---------- */
$('#bPolI').innerHTML = M.icon('store', 120, '#F2B705', 1.6);
if (A.bombay) $('#bombay').src = A.bombay; else $('#bombay').src = 'cut/cans_full.jpg';
if (A.patel) $('#sarImg').src = A.patel;
const TIERS = [['Village society', '18,000+', 'home', 1000], ['District union', '18', 'gear', 920], ['Federation (GCMMF)', 'Sells as Amul', 'store', 840]];
$('#tiers').innerHTML = TIERS.map(([n, v, ic, w], i) => `<div id="ti${i}" style="position:absolute;left:${660 - w / 2}px;top:${760 - i * 130}px;width:${w}px;height:110px;background:${i === 2 ? INK : CREAM};color:${i === 2 ? '#fff' : INK};box-shadow:0 12px 24px -12px rgba(40,25,5,.35);display:flex;align-items:center;padding:0 30px;gap:22px">
  ${M.icon(ic, 44, i === 2 ? '#F2B705' : RED, 2.2)}<span class="condm" style="font-size:36px;white-space:nowrap">${n}</span><span class="cond" style="margin-left:auto;font-size:52px;white-space:nowrap;color:${i === 2 ? '#F2B705' : RED}">${v}</span></div>`).join('');
// India map (if supplied) with a photo clipped inside
if (A.mapPath) {
  const [vx, vy, vw, vh] = A.mapView; const sc = Math.min(760 / vw, 860 / vh), ox = 1000 + (760 - vw * sc) / 2, oy = 130 + (860 - vh * sc) / 2;
  $('#map').innerHTML = `<defs><clipPath id="mc"><path d="${A.mapPath}" transform="translate(${ox} ${oy}) scale(${sc}) translate(${-vx} ${-vy})"/></clipPath></defs>
  <g id="mapG"><path d="${A.mapPath}" transform="translate(${ox + 10} ${oy + 14}) scale(${sc}) translate(${-vx} ${-vy})" fill="rgba(40,25,5,.18)"/>
  <image href="${A.mapPhoto || img('parlour', 'cut/cans_full.jpg')}" x="1000" y="130" width="760" height="860" preserveAspectRatio="xMidYMid slice" clip-path="url(#mc)"/>
  <path id="mapO" d="${A.mapPath}" transform="translate(${ox} ${oy}) scale(${sc}) translate(${-vx} ${-vy})" fill="none" stroke="#FFFDF8" stroke-width="${(6 / sc).toFixed(2)}" stroke-linejoin="round"/></g>`;
} else {
  $('#map').outerHTML = tornCard('map', 1040, 200, 720, 700, img('parlour', 'cut/cans_full.jpg'));
}
// quiz
const OPTS = [['A rich owner', 'user'], ['The government', 'home'], ['The farmers', 'users']], RIGHT = 2;
OPTS.forEach(([o, ic], i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="lt">${'ABC'[i]}</div><div class="ic2">${M.icon(ic, 52, INK, 2)}</div><div class="cond ot">${o}</div><div class="ok">${M.icon('check', 34, '#fff', 3)}</div></div>`));
$('#cred').textContent = A.credits || '';
$('#takeI').innerHTML = M.icon('users', 46, '#F2B705', 2.2);

/* ---------- rip transition (torn dark panel sweeping left to right) ---------- */
const RIPR = M.rng(5), JAG = [...Array(46)].map(() => RIPR() * 44 - 22);
const edge = (x, dir) => JAG.map((j, k) => `${(x + j * dir).toFixed(1)} ${(k * 24).toFixed(0)}`);
function rip(t) {
  let act = -1; RIPS.forEach((a, i) => { if (t >= a && t < a + RD) act = i; });
  if (act < 0) { M.hide($('#rip'), true); return; }
  M.hide($('#rip'), false);
  const u = (t - RIPS[act]) / RD;
  const r = -60 + 2080 * M.io(Math.min(1, u * 2)), l = u < 0.5 ? -200 : -60 + 2080 * M.io((u - 0.5) * 2);
  const R1 = edge(r, 1), L1 = edge(l, -1).reverse();
  $('#ripP').setAttribute('d', 'M' + R1.join(' L') + ' L' + L1.join(' L') + ' Z');
  $('#ripE').setAttribute('d', 'M' + R1.join(' L'));
}

const caps = M.captions($('#cap'), M.CUES.order, { maxW: 6 });

/* ---------- frame ---------- */
M.on(t => {
  if (!tornDone) { ['#ph0', '#ph1', '#ph2', '#ph3', '#tTri', '#map'].forEach((s, i) => { const e = $(s); if (e && e.classList.contains('torn')) torn(e, 30 + i * 13); }); tornDone = true; }
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  SC.forEach(([id, a, b]) => M.hide($('#' + id), !(t >= a && t < b)));
  M.vis($('#chip'), t, 0.2, RIPS[4] + RD / 2, { dy: -10, outDur: 0.01 });
  rip(t);

  // ===== A: journey =====
  if (t < SC[0][2]) {
    camF(t);
    $('#pmask').style.strokeDasharray = PL.toFixed(0); $('#pmask').style.strokeDashoffset = (PL * (1 - pathU(t))).toFixed(1);
    // stop 0
    M.vis($('#ph0'), t, 0.25, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.12 });
    M.vis($('#tx0'), t, 0.55, 1e9, { dx: 40, dy: 0 });
    M.count($('#tx0 .num'), t, wt('H1', 'thirty') - 0.05, 1.3, 0, 3600000, fmtIN);
    M.vis($('#tg0'), t, wt('J1', 'villages') - 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    // stop 1
    M.vis($('#ph1'), t, S[1] + 0.25, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.12 });
    M.vis($('#tx1'), t, S[1] + 0.3, 1e9, { dx: -40, dy: 0 });
    M.vis($('#tx1b'), t, wt('J2', 'eighteen') - 0.15, 1e9, { dy: 20 });
    M.count($('#n1b'), t, wt('J2', 'eighteen') - 0.1, 1.0, 0, 18000, v => fmtIN(v) + (v > 17999 ? '+' : ''));
    // stop 2
    M.vis($('#ph2'), t, S[2] + 0.25, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.12 });
    M.vis($('#tx2'), t, S[2] + 0.3, 1e9, { dx: 40, dy: 0 });
    [['drinks', 0], ['chocolates', 1], ['more', 2]].forEach(([w, i]) => { const e = $('#pr' + i); if (e) M.vis(e, t, wt('J3', w) - 0.1 + (i === 2 ? -0.35 : 0), 1e9, { dy: 60, sc: 0.6, sp: M.POP, fade: 0.1 }); });
    // stop 3
    M.vis($('#ph3'), t, wt('J4', 'shops') - 0.15, 1e9, { dy: 0, sc: 0.85, sp: M.POP, fade: 0.12 });
    M.vis($('#tx3'), t, S[3] + 0.3, 1e9, { dx: 40, dy: 0 });
    const tk = $('#tank'); if (tk) M.vis(tk, t, wt('J4', 'tankers') - 0.15, 1e9, { dx: 700, dy: 0, sp: [6, 1], fade: 0.1 });
    // logo reveal beside the zoomed-out chain
    M.vis($('#logoCard'), t, tLogo, 1e9, { dx: 120, dy: 0, sc: 0.92, sp: M.HEAVY, fade: 0.15 });
  }

  // ===== B: 1946 =====
  if (t >= SC[1][1] - 0.1 && t < SC[1][2] + 0.1) {
    const u = M.clamp((t - SC[1][1]) / (SC[1][2] - SC[1][1]));
    $('#Bbg').style.transform = `scale(${(1.0 + 0.06 * u).toFixed(4)})`;
    M.vis($('#y46'), t, SC[1][1] + 0.15, 1e9, { dy: 50, sp: M.HEAVY, fade: 0.3 });
    M.vis($('#Bloc'), t, SC[1][1] + 0.45, 1e9, { dy: 12 });
    M.vis($('#bFarm'), t, wt('V2', 'Farmers') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 });
    M.vis($('#pFarm'), t, wt('V2', 'Farmers') + 0.15, 1e9, { dy: 16 });
    M.vis($('#bPol'), t, wt('V2', 'company') - 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 });
    M.vis($('#pPol'), t, wt('V2', 'Polson') - 0.05, 1e9, { dy: 16 });
    M.draw($('#ba1'), t, wt('V2', 'sell') - 0.1, 0.6, M.o3); M.vis($('#ba1h'), t, wt('V2', 'sell') + 0.45, 1e9, { dy: 0, fade: 0.1 }); M.vis($('#BmilkL'), t, wt('V2', 'milk') - 0.1, 1e9, { dy: 10 });
    M.vis($('#tSets'), t, wt('V3', 'set') - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    M.vis($('#tLow'), t, wt('V3', 'earned') - 0.05, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    // the farmer badge shrinks a little when he loses out
    const sh = M.spring(t - wt('V3', 'little'), M.SOFT); if (t > wt('V3', 'little')) $('#bFarm').style.transform = `scale(${(1 - 0.08 * sh).toFixed(4)})`;
  }

  // ===== C: the fight back =====
  if (t >= SC[2][1] - 0.1 && t < SC[2][2] + 0.1) {
    const tq = t0('F2') - 0.2, tFo = wt('F3', 'Tribhuvandas') - 0.1;
    M.vis($('#bSar'), t, SC[2][1] + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 });
    M.vis($('#pSar'), t, SC[2][1] + 0.35, 1e9, { dy: 16 });
    M.vis($('#quote'), t, wt('F1', 'advice') - 0.2, tq, { dx: 60, dy: 0, outDur: 0.3, odx: 80, ody: 0 });
    M.rise($('#q1'), t, wt('F1', "Don't") - 0.05, { st: 0.07 });
    M.rise($('#q2'), t, wt('F1', 'Start') - 0.05, { st: 0.07 });
    M.vis($('#tTri'), t, tq + 0.25, 1e9, { dy: 60, sp: M.SOFT, fade: 0.15 });
    // rubber stamp
    const ts = wt('F2', 'December') - 0.05, ps = M.spring(t - ts, [16, 0.62]);
    M.hide($('#stamp'), t < ts); $('#stamp').style.opacity = M.clamp((t - ts) / 0.06).toFixed(2);
    $('#stamp').style.transform = `rotate(-8deg) scale(${(2.2 - 1.2 * ps).toFixed(4)})`;
    M.vis($('#bTri'), t, tFo, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); M.vis($('#pTri'), t, tFo + 0.2, 1e9, { dy: 14 });
    const tK = wt('F3', 'Verghese') - 0.1; M.vis($('#bKur'), t, tK, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.1 }); M.vis($('#pKur'), t, tK + 0.2, 1e9, { dy: 14 });
  }

  // ===== D: the model =====
  if (t >= SC[3][1] - 0.1 && t < SC[3][2] + 0.1) {
    const tM3 = t0('M3') - 0.15;
    M.rise($('#Dh'), t, SC[3][1] + 0.1, { st: 0.06, sp: M.HEAVY });
    ['village', 'district', 'federation'].forEach((w, i) => M.vis($('#ti' + i), t, wt('M2', w) - 0.15, 1e9, { dy: -40, sp: M.SOFT, fade: 0.12 }));
    M.draw($('#brkP'), t, wt('M1', 'own') - 0.1, 0.5, M.o3); if (t > tM3) $('#brkP').style.opacity = (1 - M.io((t - tM3) / 0.25)).toFixed(3);
    M.vis($('#own'), t, wt('M1', 'own') + 0.2, tM3, { dx: 30, dy: 0, outDur: 0.25, odx: 30, ody: 0 });
    M.vis($('#rupee'), t, tM3 + 0.15, 1e9, { dy: 0, sc: 0.8, sp: M.POP, fade: 0.12 });
    const C2 = 2 * Math.PI * 150, te = wt('M3', 'eighty') - 0.1, u = 0.8 * M.o3((t - te) / 0.8);
    $('#rArc').style.strokeDasharray = `${(C2 * u).toFixed(1)} ${C2.toFixed(1)}`;
    $('#rRest').style.strokeDasharray = `0 ${(C2 * u).toFixed(1)} ${(C2 * (1 - u) * (t > te ? 1 : 1)).toFixed(1)} ${C2.toFixed(1)}`;
    $('#rRest').style.opacity = t > te + 0.6 ? M.clamp((t - te - 0.6) / 0.3).toFixed(2) : '0';
    M.count($('#rN'), t, te, 0.8, 0, 80, v => Math.round(v) + 'p');
    M.vis($('#rTag'), t, te + 0.5, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); M.vis($('#rSrc'), t, te + 0.8, 1e9, { dy: 8 });
  }

  // ===== E: today =====
  if (t >= SC[4][1] - 0.1 && t < SC[4][2] + 0.1) {
    M.vis($('#map'), t, SC[4][1] + 0.1, 1e9, { dx: 80, dy: 0, sp: M.SOFT, fade: 0.2 });
    const mo = $('#mapO'); if (mo) M.draw(mo, t, SC[4][1] + 0.2, 1.2, M.io);
    M.vis($('#Elab'), t, SC[4][1] + 0.3, 1e9, { dy: 12 });
    const tn = wt('R1', 'one') - 0.15;
    M.vis($('#En'), t, wt('R1', 'brand') - 0.1, 1e9, { dy: 40, sp: M.HEAVY, fade: 0.15 });
    M.count($('#En'), t, tn, 1.0, 0, 100000, v => '₹' + fmtIN(v));
    M.rise($('#Eu'), t, wt('R1', 'crore') - 0.05, { st: 0.08 });
    M.vis($('#Esrc'), t, wt('R1', 'rupees'), 1e9, { dy: 8 });
  }

  // ===== F: punch =====
  if (t >= tF - 0.1 && t < SC[5][2] + 0.1) {
    M.rise($('#Fl1'), t, tF + 0.08, { st: 0.07 });
    M.vis($('#Fl2'), t, wt('R2', 'cooperative') - 0.08, 1e9, { dy: 30, sp: M.HEAVY, fade: 0.2, blur: 12 });
  }

  // ===== Q: quick check =====
  if (t >= SC[6][1] - 0.1) {
    const tq = SC[6][1];
    M.vis($('#qtag'), t, tq + 0.1, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    M.rise($('#qq'), t, wt('Q1', 'Who') - 0.1, { st: 0.07, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'Amul') + i * 0.09, 1e9, { dy: 50 });
      const right = i === RIGHT, r = M.io((t - tAns) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(CREAM, INK, r) : M.mix(CREAM, '#E6DDCD', r);
      el.querySelector('.ot').style.color = right ? M.mix(INK, '#FFFFFF', r) : M.mix(INK, '#A8A094', r);
      el.querySelector('.lt').style.background = right ? M.mix(INK, RED, r) : M.mix(INK, '#A8A094', r);
      el.querySelector('.ic2').style.opacity = right ? (1 - r).toFixed(2) : (1 - 0.6 * r).toFixed(2);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) el.style.transform = `scale(${(1 + 0.05 * Math.sin(Math.PI * (t - tAns) / 0.45)).toFixed(4)})`;
    });
    const u = M.clamp((t - tCount) / (tAns - tCount));
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 40 }); M.rise($('#takeT'), t, tTake + 0.1, { st: 0.04 }); M.vis($('#cred'), t, tTake + 0.8, 1e9, { dy: 0, fade: 0.4 });
  }
  caps(t);
});

/* ---------- sound ---------- */
M.sfx(0.25, 'paper', 0.5); M.sfx(0.55, 'swish', 0.3); M.sfx(wt('H1', 'thirty') - 0.05, 'riser', 0.18);
M.sfx(wt('J1', 'villages') - 0.1, 'stamp', 0.3);
S.slice(1).forEach(s => { M.sfx(s - 0.5, 'whoosh', 0.4); M.sfx(s + 0.25, 'paper', 0.45); });
M.sfx(wt('J2', 'eighteen') - 0.1, 'tick', 0.35);
[['drinks', 0], ['chocolates', 1], ['more', 2]].forEach(([w, i]) => M.sfx(wt('J3', w) - 0.1 + (i === 2 ? -0.35 : 0), 'pop', 0.3, -0.3 + i * 0.3));
M.sfx(wt('J4', 'tankers') - 0.15, 'whoosh', 0.35); M.sfx(wt('J4', 'shops') - 0.15, 'paper', 0.4);
M.sfx(tZoom, 'riser', 0.25); M.sfx(tLogo, 'thud', 0.45); M.sfx(tLogo + 0.05, 'chime', 0.3);
RIPS.forEach(r => M.sfx(r + 0.1, 'paper', 0.6));
M.sfx(wt('V2', 'Farmers') - 0.1, 'pop', 0.35); M.sfx(wt('V2', 'company') - 0.1, 'pop', 0.35); M.sfx(wt('V2', 'sell'), 'swish', 0.3);
M.sfx(wt('V3', 'set') - 0.05, 'stamp', 0.35); M.sfx(wt('V3', 'earned') - 0.05, 'wrong', 0.2);
M.sfx(t0('F1') - 0.25, 'pop', 0.35); M.sfx(wt('F1', "Don't"), 'tick', 0.3); M.sfx(wt('F1', 'Start'), 'tick', 0.3);
M.sfx(wt('F2', 'December') + 0.12, 'stamp', 0.6);
M.sfx(wt('F3', 'Tribhuvandas') - 0.1, 'pop', 0.35); M.sfx(wt('F3', 'Verghese') - 0.1, 'pop', 0.35);
['village', 'district', 'federation'].forEach(w => M.sfx(wt('M2', w) - 0.15, 'clunk', 0.25));
M.sfx(wt('M3', 'eighty') - 0.1, 'riser', 0.2); M.sfx(wt('M3', 'eighty') + 0.4, 'stamp', 0.3);
M.sfx(wt('R1', 'one') - 0.15, 'riser', 0.25); M.sfx(wt('R1', 'crore'), 'thud', 0.35);
M.sfx(tF, 'thud', 0.6); M.sfx(wt('R2', 'cooperative') - 0.08, 'whoosh', 0.3);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.55));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tTake, 'swish', 0.35);
M.outro({ bg: '#1B1A17', ink: '#FFF8E8', accent: '#D62828', sub: 'rgba(255,248,232,.62)', font: 'Archivo', credits: (window.ASSETS && window.ASSETS.credits) || '' });
})();
