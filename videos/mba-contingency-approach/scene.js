// MBA - Principles of Management, Ep 13: Contingency Approach
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navyLine: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  chat: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  sunrise: ['M12 2v8', 'm4.93 10.93 1.41 1.41', 'M2 18h2', 'M20 18h2', 'm19.07 10.93-1.41 1.41', 'M22 22H2', 'm8 6 4-4 4 4', 'M16 18a4 4 0 0 0-8 0'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z'],
  thermo: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  split: ['M16 3h5v5', 'M8 3H3v5', 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3', 'm15 9 6-6'],
  maximize: ['M8 3H5a2 2 0 0 0-2 2v3', 'M21 8V5a2 2 0 0 0-2-2h-3', 'M3 16v3a2 2 0 0 0 2 2h3', 'M16 21h3a2 2 0 0 0 2-2v-3'],
  volX: ['M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z', 'm22 9-6 6', 'm16 9 6 6'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  waves: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tLong = wt('H2', 'Long'), tShares = wt('H2', 'shares');
const tSlow = wt('C1', 'slow'), tWorks = wt('C1', 'works'), tEight = wt('C2', 'eight'), tRush = wt('C2', 'rush'), tChat = wt('C2', 'team');
const tThirty = wt('C3', 'Thirty'), tCold = wt('C3', 'cold');
const tT = T0('T1'), tSt2 = wt('T1', 'It'), tTu = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tTaylor = wt('D3', 'Taylor'), tOne = wt('D3', 'one'), tD4 = T0('D4');
const tRight = wt('D4', 'right'), tDep = wt('D4', 'depends'), tSit = wt('D4', 'situation'), tDout = T0('W1') - 0.32;
const tW1 = T0('W1'), tGrew = wt('W1', 'grew'), tW = [2, 3, 4, 5].map(i => T0('W' + i)), tWout = T0('I1') - 0.32;
const tWb = [[wt('W2', 'stable'), wt('W2', 'fast')], [wt('W3', 'showed'), wt('W3', 'technology')], [wt('W4', 'showed'), wt('W4', 'environment')], [wt('W5', 'showed'), wt('W5', 'situation')]];
const tI1 = T0('I1'), tIf = wt('I1', 'If'), tThen = wt('I1', 'then'), tI2 = T0('I2'), tI2s = wt('I2', 'situation'), tI2t = wt('I2', 'then'), tI2m = wt('I2', 'manage'), tIout = T0('F1') - 0.32;
const tF = [1, 2, 3, 4].map(i => T0('F' + i)), tFout = T0('K1') - 0.32;
const tFr = [[wt('F1', 'Six'), wt('F1', 'sixty')], [wt('F2', 'tools'), wt('F2', 'methods')], [wt('F3', 'Stable'), wt('F3', 'changing')], [wt('F4', 'helper'), wt('F4', 'expert')]];
const tK1 = T0('K1'), tK2 = T0('K2'), tQuick = wt('K2', 'quick'), tKp0 = [wt('K2', 'Asha'), wt('K2', 'Kabir'), wt('K2', 'Meena')];
const tK3 = T0('K3'), tRelax = wt('K3', 'relaxes'), tKp1 = [wt('K3', 'shares'), wt('K3', 'ideas') + 0.25, wt('K3', 'ideas') + 0.5];
const tK4 = T0('K4'), tTwo = wt('K4', 'Two'), tBoth = wt('K4', 'both'), tKout = T0('O1') - 0.32;
const tO1 = T0('O1'), tO2 = T0('O2'), tO3 = T0('O3'), tO4 = T0('O4');
const tOp = [[wt('O2', 'fast'), wt('O2', 'low'), wt('O2', 'fun')], [wt('O3', 'orders'), wt('O3', 'quiet')]];
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'A', 0);
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['Size', 'technology', 'environment', 'people'].map(w => wt('S3', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
const PERSON = `<svg width="40" height="48" viewBox="0 0 40 48" fill="currentColor"><circle cx="20" cy="11" r="10"/><path d="M2 47c0-11 8-19 18-19s18 8 18 19z"/></svg>`;
const BUB = `<svg width="40" height="36" viewBox="0 0 40 36"><path d="M8 2h24a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H18l-8 8v-8H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" fill="#E9D9B5"/><circle cx="13" cy="13" r="2.4" fill="#B8862F"/><circle cx="20" cy="13" r="2.4" fill="#B8862F"/><circle cx="27" cy="13" r="2.4" fill="#B8862F"/></svg>`;
$('#team6').innerHTML = Array.from({ length: 6 }, (_, i) => `<div class="tp" id="tp${i}" style="left:${i * 68}px">${PERSON}</div><div class="bb" id="bb${i}" style="left:${i * 68}px">${BUB}</div>`).join('');
$('#ppl').innerHTML = Array.from({ length: 20 }, (_, i) => `<div class="pp" id="pp${i}" style="left:${(i % 10) * 58}px;top:${Math.floor(i / 10) * 64}px">${PERSON}</div>`).join('');
$('#pAi').innerHTML = M.icon('sun', 24, C.gold, 2.2); $('#pBi').innerHTML = M.icon('sunrise', 24, C.red, 2.2);
$('#stI').innerHTML = M.icon('chat', 30, C.gold, 2.2);
$('#sP1i').innerHTML = M.icon('users', 24, C.ink, 2.2); $('#sP2i').innerHTML = M.icon('timer', 24, C.red, 2.2);
$('#r1pi').innerHTML = M.icon('smile', 24, C.gold, 2.2); $('#r2pi').innerHTML = M.icon('thermo', 24, C.red, 2.2);
// definition
$('#defI').innerHTML = M.icon('book', 36, C.gold, 2.2);
const CV = [['EARLIER THINKERS · 1900s', 'One best way', [['user', 'Taylor: one best method'], ['book', 'Fayol: fixed principles'], ['clipboard', 'Weber: strict rules for all']]],
  ['CONTINGENCY APPROACH', 'It depends', [['compass', 'First, read the situation'], ['split', 'Then choose the style'], ['check', 'Different firms, different ways']]]];
$('#cvRow').innerHTML = CV.map(([l, t, rows], i) => `<div class="cv" id="cv${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="lbl">${l}</div><div class="serif ct">${t}</div><div class="hrl"></div>${rows.map(([ic, tx], k) => `<div class="row" id="cr${i}${k}" style="top:${208 + k * 76}px"><i></i><span>${tx}</span></div>`).join('')}<div class="bx"></div></div>`).join('');
// thinkers
$('#wbarI').innerHTML = M.icon('clock', 36, C.gold, 2.2);
const TK = [['1961', ['Burns and', 'Stalker'], 'waves', ['Stable: strict rules', 'Changing: flexible'], 'globe', 'Environment'],
  ['1965', ['Joan', 'Woodward'], 'gear', ['Studied factories', 'Structure fits tech'], 'gear', 'Technology'],
  ['1967', ['Lawrence', 'and Lorsch'], 'globe', ['Design must fit', 'the environment'], 'globe', 'Environment'],
  ['1967', ['Fred', 'Fiedler'], 'users', ['Best leader fits', 'the situation'], 'users', 'Leadership']];
$('#tkRow').innerHTML = TK.map(([y, nm, ic, bd, fi, ft], i) => `<div class="tk" id="tk${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="yr">${y}</div><div class="ic64"></div>${nm.map((n, k) => `<div class="serif nm" style="top:${100 + k * 50}px">${n}</div>`).join('')}<div class="hrl"></div><div class="lbl">FOUND</div>${bd.map((b, k) => `<div class="bd" style="top:${286 + k * 40}px">${b}</div>`).join('')}<div class="fp2"><span class="fi"></span>${ft}</div></div>`).join('');
// if / then
const IT = [['IF', ['the situation', 'is like this'], 'THE SITUATION', ['Size', 'Technology', 'Environment', 'People'], 'compass'],
  ['THEN', ['manage', 'like that'], 'THE STYLE', ['Firm orders', 'Team ideas', 'Strict rules', 'Free teams'], 'split']];
$('#itRow').innerHTML = IT.map(([w, ln, l, pl, ic], i) => `<div class="it" id="it${i}" style="left:${160 + i * 816}px"><div class="bg"></div><div class="serif bw">${w}</div><div class="ic72"></div>${ln.map((x, k) => `<div class="serif ln" style="top:${192 + k * 60}px">${x}</div>`).join('')}<div class="hrl"></div><div class="lbl">${l}</div><div class="pls"></div></div>`).join('');
// factors
$('#fbarI').innerHTML = M.icon('compass', 36, C.gold, 2.2);
const FC = [['maximize', 'Size', 'How big the team is', ['6 people: few rules', '60 people: more rules']],
  ['gear', 'Technology', 'Tools and methods', ['Kettle: simple steps', 'Machine: new ways']],
  ['globe', 'Environment', 'The world around you', ['Stable: steady plans', 'Changing: adapt fast']],
  ['users', 'People', 'Skills of the team', ['New: clear steps', 'Expert: freedom']]];
$('#fcRow').innerHTML = FC.map(([ic, t, m, rows], i) => `<div class="fc" id="fc${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="ic72"></div><div class="no">0${i + 1}</div><div class="serif ft">${t}</div><div class="fm">${m}</div><div class="hrl"></div><div class="lbl">IF / THEN</div>${rows.map((r, k) => `<div class="fr" style="top:${318 + k * 56}px"><b></b>${r}</div>`).join('')}</div>`).join('');
// if-then rows at chai corner
const KR = [['Morning rush', '8 AM · 30 customers', 'sunrise', 'Quick, firm instructions', [['A', 'Asha brews'], ['K', 'Kabir bills'], ['M', 'Meena cleans']], 0],
  ['Slow afternoon', '4 PM · a few customers', 'sun', 'Relax and share ideas', [['bulb', 'New flavour?'], ['bulb', 'Shorter queue?'], ['users', 'Everyone talks']], 1]];
$('#krRows').innerHTML = KR.map(([s, sub, ic, th, pills, ii], i) => `<div class="kr" id="kr${i}" style="top:${270 + i * 304}px"><div class="bg"></div><div class="kc" style="left:40px;background:#14213D;color:#E9D9B5">IF</div><div class="serif kt" style="left:40px">${s}</div><div class="ks">${sub}</div><div class="ic72"></div><div class="arr"></div><div class="kc kthen" style="left:712px;background:#B8862F;color:#fff">THEN</div><div class="serif kt kq" style="left:712px;color:#B9B1A3">Which style?</div><div class="serif kt ka" style="left:712px">${th}</div><div class="kps"></div><div class="ok2"><span class="oi"></span>It works</div></div>`).join('');
// outlets
const OC = [['cap', 'Near a college', 'Students, all day long', [['zap', 'Fast service'], ['coin', 'Low prices'], ['smile', 'A fun feel']]],
  ['briefcase', 'Near an office', 'Office workers, busy mornings', [['clock', 'Orders on time'], ['volX', 'Quiet tables']]]];
$('#ocRow').innerHTML = OC.map(([ic, t, s, pl], i) => `<div class="card oc" id="oc${i}" style="left:${160 + i * 816}px"><svg width="784" height="96" style="position:absolute;left:0;top:0"><g class="oaw"></g></svg><div class="sg">CHAI CORNER · OUTLET 2 · OPTION ${'AB'[i]}</div><div class="ic72"></div><div class="serif ot2">${t}</div><div class="os">${s}</div><div class="hrl"></div><div class="lbl">IT NEEDS</div><div class="ops"></div></div>`).join('');
let aw2 = ''; for (let i = 0; i < 8; i++) aw2 += `<path d="M${i * 98} 0 h98 v50 a49 28 0 0 1 -98 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
M.$$('.oaw').forEach(g => g.innerHTML = aw2);
// quiz
const OPTS = [['Long team', 'chat'], ['Quick, firm', 'instructions'], ['Let everyone', 'decide'], ['Close the', 'stall']], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif" style="top:116px">${o[0]}</div><div class="ot serif" style="top:166px">${o[1]}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('megaphone', 44, C.gold2, 2.4);
// recap
const ROWS = [['split', 'No one best way. It all <span class="acc">depends.</span>'], ['compass', 'Four factors'], ['layers', 'Think <span class="acc">if-then</span>: this situation, that approach']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
$('#rw1').insertAdjacentHTML('beforeend', ['Size', 'Technology', 'Environment', 'People'].map((p, k) => `<div class="fp" id="fp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const lift = (el, t, ta, td, amt = 0.02, settle = 1e9) => { const l = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT); if (Math.abs(l) > 0.001) el.style.transform = `scale(${(1 + amt * l).toFixed(4)})`; else if (el.style.transform && el.style.transform !== 'none' && t < settle) el.style.transform = 'none'; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  const rt = $('#rw1 .rt'); let x = 216 + rt.offsetWidth + 40;
  for (let k = 0; k < 4; k++) { const p = $('#fp' + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  // if/then pills: 2 per row
  IT.forEach(([, , , pl], i) => {
    const box = $('#it' + i + ' .pls'); box.innerHTML = pl.map((p, k) => `<div class="pl" id="ip${i}${k}">${p}</div>`).join('');
    let px = 48; pl.forEach((_, k) => { const el = $('#ip' + i + k); if (k === 2) px = 48; el.style.left = px + 'px'; el.style.top = (k < 2 ? 412 : 480) + 'px'; px += el.offsetWidth + 16; });
  });
  // chai corner rows: pills
  KR.forEach(([, , , , pills, ii], i) => {
    const box = $('#kr' + i + ' .kps');
    box.innerHTML = pills.map(([a, tx], k) => `<div class="kp" id="kp${i}${k}">${ii ? `<span class="ii">${M.icon(a, 26, C.gold, 2.2)}</span>` : `<span class="av">${a}</span>`}${tx}</div>`).join('');
    let px = 712; pills.forEach((_, k) => { const el = $('#kp' + i + k); el.style.left = px + 'px'; px += el.offsetWidth + 16; });
  });
  // outlet pills
  OC.forEach(([, , , pl], i) => {
    const box = $('#oc' + i + ' .ops'); box.innerHTML = pl.map(([ic, tx], k) => `<div class="op" id="op${i}${k}"><span>${M.icon(ic, 26, C.gold, 2.2)}</span>${tx}</div>`).join('');
    let px = 40; pl.forEach((_, k) => { const el = $('#op' + i + k); el.style.left = px + 'px'; px += el.offsetWidth + 16; });
  });
  // static icons that need the boxes built
  CV[0][2].forEach(([ic], k) => $('#cr0' + k + ' i').innerHTML = M.icon(ic, 28, C.gold, 2.2));
  TK.forEach(([, , ic, , fi], i) => { $('#tk' + i + ' .fi').innerHTML = M.icon(fi, 22, C.gold, 2.2); });
  KR.forEach(([, , ic], i) => { $('#kr' + i + ' .ic72').innerHTML = M.icon(ic, 34, C.gold, 2.2); $('#kr' + i + ' .arr').innerHTML = M.icon('arrowR', 32, C.gold, 2.4); $('#kr' + i + ' .oi').innerHTML = M.icon('check', 22, '#fff', 3); });
  OC.forEach(([ic], i) => { $('#oc' + i + ' .ic72').innerHTML = M.icon(ic, 34, C.gold, 2.2); });
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
  const exA = t < tT + 1;
  M.vis($('#exChip'), t, exA ? tThirty + 0.2 : tK1 + 0.3, exA ? tT - 0.4 : tKout, { dy: 10, outDur: 0.3 });

  /* ===== A: one favourite style ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // time + style card
    M.vis($('#tc'), t, tMorph + 0.3, 1e9, { dy: 36 });
    M.rise($('#tA'), t, tMorph + 0.6, { st: 0.06, out: tEight - 0.05, outDur: 0.3 });
    M.rise($('#tB'), t, tEight + 0.2, { st: 0.06, sp: M.HEAVY });
    M.vis($('#pA'), t, tSlow - 0.05, tRush - 0.1, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.8, ody: 0 });
    M.vis($('#pB'), t, tRush + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#stI'), t, tLong - 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
    M.rise($('#stName'), t, tLong + 0.05, { st: 0.06 });
    M.vis($('#sP1'), t, tShares - 0.05, tCold - 0.1, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.2, osc: 0.8, ody: 0 });
    M.vis($('#sP2'), t, tCold + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    const warn = M.io((t - tChat) / 0.35);
    $('#stI').style.background = mix(C.paper, C.redBg, warn); setIco($('#stI'), 'chat', warn > 0.5 ? C.red : C.gold, 30);
    $('#stName').style.color = mix(C.ink, C.red, warn);
    // result card
    M.vis($('#rc'), t, tMorph + 0.42, 1e9, { dy: 36 });
    const r1out = tThirty - 0.3;
    M.rise($('#r1t'), t, tWorks - 0.05, { st: 0.06, sp: M.HEAVY, out: r1out, outDur: 0.25 });
    M.vis($('#r1p'), t, tWorks + 0.35, r1out, { dy: 12, outDur: 0.25 });
    for (let k = 0; k < 6; k++) {
      M.vis($('#tp' + k), t, tMorph + 0.8 + k * 0.06, r1out, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1, outDur: 0.25 });
      const b0 = tShares + (k % 3) * 0.12 + Math.floor(k / 3) * 0.06;
      M.vis($('#bb' + k), t, b0, r1out, { dy: 8, sc: 0.5, sp: M.POP, fade: 0.08, outDur: 0.25 });
    }
    M.vis($('#r2'), t, tThirty - 0.1, 1e9, { dy: 0, fade: 0.1 });
    M.setT($('#wN'), String(Math.max(0, Math.round(30 * M.o5((t - tThirty) / 1.2)))));
    for (let k = 0; k < 20; k++) M.vis($('#pp' + k), t, tThirty + k * 0.05, 1e9, { dy: 14, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#r2p'), t, tCold - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== D: what is the contingency approach? ===== */
  const dOn = t >= tTu - 0.05 && t < tW1 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD3 - 0.12, outDur: 0.3 });
    M.rise($('#dl'), t, tD2 + 0.05, { st: 0.05, out: tD3 - 0.1, outDur: 0.3 });
    M.vis($('#dlb'), t, wt('D2', 'depending') + 0.3, tD3 - 0.12, { dy: 12, outDur: 0.25 });
    M.vis($('#defbar'), t, tD3 + 0.12, tDout, { dy: 24, ...o });
    CV.forEach((cv, i) => {
      const el = $('#cv' + i), tin = i ? tD4 : tD3 + 0.25;
      M.vis(el, t, tin, tDout, { dy: 36, ...o });
      const bg = el.querySelector('.bg'), lb = el.querySelector('.lbl'), ct = el.querySelector('.ct'), hr = el.querySelector('.hrl'), bx = el.querySelector('.bx');
      if (i === 0) {
        const off = M.io((t - tD4) / 0.4);
        bg.style.background = mix(C.card, C.paper2, off); ct.style.color = mix(C.ink, C.muted, off); lb.style.color = C.muted; hr.style.background = mix(C.line, '#E0D8C8', off);
        M.rise(ct, t, tOne - 0.05, { st: 0.06, sp: M.HEAVY });
        const tr = [tTaylor, tTaylor + 0.45, tTaylor + 0.9];
        for (let k = 0; k < 3; k++) {
          const r = $('#cr0' + k); M.vis(r, t, tr[k], 1e9, { dy: 16 });
          r.querySelector('span').style.color = mix(C.ink, C.muted, off); r.querySelector('i').style.background = mix(C.paper, '#E6DFD1', off);
        }
        bx.style.background = C.redBg; setIco(bx, 'x', C.red, 26, 2.6);
        M.vis(bx, t, tD4 + 0.25, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      } else {
        bg.style.background = C.ink; lb.style.color = C.gold2; ct.style.color = C.gold2; hr.style.background = C.navyLine;
        M.rise(ct, t, tD4 + 0.3, { st: 0.06, sp: M.HEAVY });
        const tr = [tRight - 0.05, tDep + 0.15, tSit - 0.05];
        for (let k = 0; k < 3; k++) {
          const r = $('#cr1' + k); M.vis(r, t, tr[k], 1e9, { dy: 16 });
          r.querySelector('span').style.color = '#fff'; const ii = r.querySelector('i'); ii.style.background = C.navy2; setIco(ii, CV[1][2][k][0], C.gold2, 28);
        }
        bx.style.background = C.gold; setIco(bx, 'check', '#fff', 26, 3);
        M.vis(bx, t, tSit + 0.5, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
      }
    });
  }

  /* ===== W: the thinkers ===== */
  const wOn = t >= tW1 - 0.1 && t < tI1 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#wbar'), t, tW1 + 0.1, tWout, { dy: 24, ...o });
    TK.forEach((tk, i) => {
      const el = $('#tk' + i), ta = tW[i], td = i < 3 ? tW[i + 1] : tWout + 1;
      M.vis(el, t, tGrew + 0.2 + i * 0.45, tWout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      el.querySelectorAll('.nm').forEach(n => n.style.color = mix(C.ink, '#fff', act));
      el.querySelector('.hrl').style.background = mix(C.line, C.navyLine, act);
      const lb = el.querySelector('.lbl'); M.vis(lb, t, tWb[i][0] - 0.1, 1e9, { dy: 10 }); lb.style.color = mix(C.muted, '#8C96AE', act);
      el.querySelectorAll('.bd').forEach((b, k) => { M.rise(b, t, tWb[i][k] - 0.05, { st: 0.04 }); b.style.color = mix(C.ink2, '#fff', act); });
      const ic = el.querySelector('.ic64'); ic.style.background = mix(C.paper, C.navy2, act); setIco(ic, tk[2], act > 0.5 ? C.gold2 : C.gold, 30);
      const fp = el.querySelector('.fp2'); M.vis(fp, t, tWb[i][1] + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      fp.style.background = mix(C.paper, C.navy2, act); fp.style.color = mix(C.ink, '#fff', act);
      if (t > tGrew + 2.5 && t < tWout) lift(el, t, ta, td, 0.02);
    });
  }

  /* ===== I: if, then ===== */
  const iOn = t >= tI1 - 0.1 && t < tF[0] + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#iq'), t, tI1 + 0.1, { st: 0.07, sp: M.HEAVY, out: tIf - 0.3, outDur: 0.25 });
    M.vis($('#iqb'), t, wt('I1', 'simple'), tIf - 0.3, { dy: 12, outDur: 0.2 });
    IT.forEach((it, i) => {
      const el = $('#it' + i), tin = i ? tThen - 0.08 : tIf - 0.12, tw = tin + 0.1;
      M.vis(el, t, tin, tIout, { dy: 36, ...o });
      const nav = i === 1;
      el.querySelector('.bg').style.background = nav ? C.ink : C.card;
      const bw = el.querySelector('.bw'); bw.style.color = nav ? C.gold2 : C.ink; M.rise(bw, t, tw, { st: 0.06, sp: M.HEAVY });
      const ic = el.querySelector('.ic72'); ic.style.background = nav ? C.navy2 : C.paper; setIco(ic, it[4], nav ? C.gold2 : C.gold, 34);
      M.vis(ic, t, tin + 0.4, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      const t1 = i ? tI2t : tI2;
      el.querySelectorAll('.ln').forEach((ln, k) => { ln.style.color = nav ? '#fff' : C.ink; M.rise(ln, t, t1 + 0.05 + k * 0.4, { st: 0.05 }); });
      el.querySelector('.hrl').style.background = nav ? C.navyLine : C.line;
      const lb = el.querySelector('.lbl'); lb.style.color = nav ? '#8C96AE' : C.muted; M.vis(lb, t, tin + 0.35, 1e9, { dy: 10 });
      for (let k = 0; k < 4; k++) {
        const p = $('#ip' + i + k); p.style.background = nav ? C.navy2 : C.paper; p.style.color = nav ? '#fff' : C.ink;
        M.vis(p, t, tin + 0.45 + k * 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      }
    });
  }

  /* ===== F: four factors ===== */
  const fOn = t >= tF[0] - 0.1 && t < tK1 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#fbar'), t, tF[0] + 0.05, tFout, { dy: 24, ...o });
    FC.forEach((f, i) => {
      const el = $('#fc' + i), ta = tF[i], td = i < 3 ? tF[i + 1] : T0('F4') + (T1('F4') - T0('F4')) + 0.4;
      M.vis(el, t, tF[0] + 0.1 + i * 0.12, tFout, { dy: 36, ...o });
      const on = M.io((t - ta) / 0.32), off = M.io((t - td) / 0.4), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.card, C.ink, act);
      const ic = el.querySelector('.ic72'); ic.style.background = mix(C.paper, C.navy2, act); setIco(ic, f[0], act > 0.5 ? C.gold2 : C.gold, 34);
      const ft = el.querySelector('.ft'); M.rise(ft, t, tF[0] + 0.15 + i * 0.12, { st: 0.06, sp: M.HEAVY }); ft.style.color = mix(C.ink, '#fff', act);
      const fm = el.querySelector('.fm'); M.rise(fm, t, ta + 0.4, { st: 0.04 }); fm.style.color = mix(C.ink2, C.gold2, act);
      el.querySelector('.hrl').style.background = mix(C.line, C.navyLine, act);
      const lb = el.querySelector('.lbl'); M.vis(lb, t, tFr[i][0] - 0.25, 1e9, { dy: 10 }); lb.style.color = mix(C.muted, '#8C96AE', act);
      el.querySelectorAll('.fr').forEach((r, k) => { M.vis(r, t, tFr[i][k] - 0.05, 1e9, { dy: 16 }); r.style.color = mix(C.ink, '#fff', act); });
      if (t > tF[0] + 1 && t < tFout) lift(el, t, ta, td, 0.02);
    });
  }

  /* ===== K: if-then at chai corner ===== */
  const kOn = t >= tK1 - 0.1 && t < tO1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    KR.forEach((kr, i) => {
      const el = $('#kr' + i), tA = i ? tRelax : tQuick, tP = i ? tKp1 : tKp0, tOk = i ? tBoth : tTwo;
      M.vis(el, t, tK1 + 0.15 + i * 0.15, tKout, { dy: 36, ...o });
      const kts = el.querySelectorAll('.kt');
      M.rise(kts[0], t, tK1 + 0.4 + i * 0.15, { st: 0.06 });
      M.vis(el.querySelector('.ks'), t, tK1 + 0.8 + i * 0.15, 1e9, { dy: 10 });
      M.vis(el.querySelector('.ic72'), t, tK1 + 0.6 + i * 0.15, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      M.vis(el.querySelector('.arr'), t, tK1 + 1.0 + i * 0.15, 1e9, { dx: -16, dy: 0 });
      M.vis(el.querySelector('.kthen'), t, tK1 + 1.1 + i * 0.15, 1e9, { dy: 10 });
      M.rise(el.querySelector('.kq'), t, tK1 + 1.3 + i * 0.15, { st: 0.06, out: tA - 0.25, outDur: 0.2 });
      M.rise(el.querySelector('.ka'), t, tA - 0.02, { st: 0.06, sp: M.HEAVY });
      kr[4].forEach((_, k) => M.vis($('#kp' + i + k), t, tP[k] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
      M.vis(el.querySelector('.ok2'), t, tOk, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      // the row being spoken gets the navy IF chip glow: a gold left accent via card tint
      const act = M.io((t - (i ? tK3 : tK2)) / 0.3) * (1 - M.io((t - (i ? tK4 : tK3)) / 0.4));
      el.querySelector('.bg').style.boxShadow = `0 1px 0 rgba(20,33,61,.04),0 18px 40px -12px rgba(20,33,61,.14),inset 0 0 0 ${(3 * act).toFixed(2)}px #B8862F`;
    });
  }

  /* ===== O: two outlets ===== */
  const oOn = t >= tO1 - 0.1 && t < tQ + 0.05; M.hide($('#sO'), !oOn);
  if (oOn) {
    OC.forEach((oc, i) => {
      const el = $('#oc' + i);
      M.vis(el, t, i ? tO1 + 0.35 : tO1 + 0.15, 1e9, { dy: 36 });
      const ta = i ? tO3 : tO2;
      M.vis(el.querySelector('svg'), t, (i ? tO1 + 0.35 : tO1 + 0.15) + 0.3, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
      M.vis(el.querySelector('.sg'), t, (i ? tO1 + 0.35 : tO1 + 0.15) + 0.6, 1e9, { dy: 10 });
      const tb = tO1 + 0.9 + i * 0.3;
      M.vis(el.querySelector('.ic72'), t, tb - 0.1, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
      M.rise(el.querySelector('.ot2'), t, tb, { st: 0.06, sp: M.HEAVY });
      M.vis(el.querySelector('.os'), t, tb + 0.5, 1e9, { dy: 10 });
      M.vis(el.querySelector('.hrl'), t, tb + 0.6, 1e9, { dy: 0 });
      M.vis(el.querySelector('.lbl'), t, ta - 0.3, 1e9, { dy: 10 });
      oc[3].forEach((_, k) => M.vis($('#op' + i + k), t, tOp[i][k] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
      // the outlet being described is outlined in gold
      const act = M.io((t - ta) / 0.3) * (1 - M.io((t - (i ? tO4 : tO3)) / 0.4));
      el.style.boxShadow = `0 1px 0 rgba(20,33,61,.04),0 18px 40px -12px rgba(20,33,61,.14),inset 0 0 0 ${(3 * act).toFixed(2)}px #B8862F`;
    });
    M.vis($('#both'), t, tO1 + 1.6, 1e9, { dy: 40 });
    M.vis($('#bothA'), t, null, tO4 - 0.1, { outDur: 0.25, ody: -14 });
    M.vis($('#bothB'), t, tO4 + 0.1, 1e9, { dy: 14 });
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
      el.querySelectorAll('.ot').forEach(ot => ot.style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r));
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
