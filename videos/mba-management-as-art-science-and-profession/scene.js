// MBA - Principles of Management, Ep 03: Management as Art, Science and Profession
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  palette: ['M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z', 'M13.5 6.5h.01', 'M17.5 10.5h.01', 'M8.5 7.5h.01', 'M6.5 12.5h.01'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
  steth: ['M11 2v2', 'M5 2v2', 'M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1', 'M8 15a6 6 0 0 0 12 0v-3', 'M22 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M18 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z'],
  minus: ['M5 12h14'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  listCheck: ['m3 17 2 2 4-4', 'm3 7 2 2 4-4', 'M13 6h8', 'M13 12h8', 'M13 18h8'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02;
const tOp = [tMorph + 0.45, T0('C1') - 0.05, T0('C2') - 0.05], tTag = [wt('H2', 'gift'), wt('C1', 'science'), wt('C2', 'licence')];
const tSpk = [[T0('H2') + 0.3, T0('C1')], [T0('C1'), T0('C2')], [T0('C2'), T0('T1') - 0.6]];
const tT = T0('T1'), tSt2 = wt('T1', 'Let'), tTu = T0('AR1') - 0.32;
// test 1: art
const tA1 = T0('AR1'), tA2 = T0('AR2'), tKab = wt('AR3', 'Kabir'), tRec = wt('AR3', 'recipe'), tIng = [wt('AR3', 'tea'), wt('AR3', 'milk'), wt('AR3', 'sugar')];
const tCust = wt('AR4', 'customers'), tDiff = wt('AR4', 'difference'), tWhy = T0('AR5'), tPrac = wt('AR5', 'years'), tGin = wt('AR6', 'ginger'), tCre = wt('AR6', 'creativity');
const tA7 = T0('AR7'), tKc = [wt('AR7', 'Personal'), wt('AR7', 'practice'), wt('AR7', 'creativity'), wt('AR7', 'results')], tVd0 = wt('AR7', 'art'), tArOut = T0('SC1') - 0.32;
// test 2: science
const tS1 = T0('SC1'), tS2 = T0('SC2'), tTest = wt('SC2', 'Tested'), tSort = wt('SC2', 'sorted'), tS3 = T0('SC3'), tDo = wt('SC3', 'Do');
const tS4 = T0('SC4'), tGive = wt('SC4', 'Give'), tJobW = [wt('SC4', 'each'), wt('SC4', 'one'), wt('SC4', 'clear')], tWork = wt('SC4', 'work');
const tS5 = T0('SC5'), tEvery = wt('SC5', 'Every'), tS6 = T0('SC6'), tPpl = wt('SC6', 'people'), tWk = wt('SC6', 'work'), tFail = wt('SC6', 'fail'), tAnother = wt('SC6', 'another');
const tVd1 = wt('SC7', 'inexact'), tSocial = wt('SC7', 'social'), tScOut = T0('PR1') - 0.32;
// test 3: profession
const tP1 = T0('PR1'), tP2 = T0('PR2'), tFive = wt('PR2', 'five'), tPr = [3, 4, 5, 6, 7].map(i => T0('PR' + i));
const tPs = [wt('PR3', 'have'), wt('PR4', 'BBA'), wt('PR5', 'All'), wt('PR6', 'forced'), wt('PR7', 'still')];
const tP8 = T0('PR8'), tLr = [wt('PR8', 'Doctors'), wt('PR8', 'lawyers'), wt('PR9', 'manager')], tLs = [wt('PR8', 'licence'), wt('PR8', 'licence'), wt('PR9', 'none')], tRavi = wt('PR9', 'Ravi');
const tVd2 = wt('PR10', 'partly'), tPrOut = T0('V1') - 0.32;
// verdict
const tV1 = T0('V1'), tVc = [wt('V2', 'Asha'), wt('V3', 'Kabir'), wt('V4', 'Meena')], tVp = [wt('V2', 'art'), wt('V3', 'science'), wt('V4', 'partly')], tV5 = T0('V5');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Anyone');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tPill = ['skill', 'practice', 'creativity'].map(w => wt('S2', w)), tN = T0('N1');
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = []; [[3, 0], [2, 1]].forEach(([n, r]) => { for (let k = 0; k < n; k++) CUPS.push([448 + r * 18 + k * 36, 196 - r * 38]); });
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
// three opinions
const OPS = [['A', 'Asha', 'It\'s a gift. Books can\'t teach it.', 'palette', 'ART'], ['K', 'Kabir', 'It has rules, just like science.', 'flask', 'SCIENCE'], ['M', 'Meena', 'Then why no licence, like doctors?', 'briefcase', 'PROFESSION']];
$('#opRow').innerHTML = OPS.map(([l, n, q, ic, tg], i) => `<div class="card op" id="op${i}" style="top:${270 + i * 204}px"><div class="avc">${l}</div><div class="serif nm">${n}</div><div class="qt">"${q}"</div><div class="tg">${M.icon(ic, 22, C.gold, 2.2)}${tg}</div></div>`).join('');
// definition bars
['book', 'flask', 'briefcase'].forEach((ic, i) => { $('#db' + i + ' .di').innerHTML = M.icon(ic, 36, C.gold, 2.2); });
const VD = [['check', 'It\'s an art'], ['check', 'An inexact science'], ['minus', 'Only partly']];
VD.forEach(([ic, tx], i) => { $('#db' + i + ' .vd').innerHTML = M.icon(ic, 24, '#fff', 3) + tx; });
$('#sp0').innerHTML = M.icon('check', 22, C.gold, 2.6) + 'Tested'; $('#sp1').innerHTML = M.icon('listCheck', 22, C.gold, 2.4) + 'Sorted';
// test 1: two cups
const PERSON = `<svg width="32" height="40" viewBox="0 0 40 48" fill="currentColor"><circle cx="20" cy="11" r="10"/><path d="M2 47c0-11 8-19 18-19s18 8 18 19z"/></svg>`;
const cupSvg = (i, tea) => `<svg class="cupv" width="184" height="184" viewBox="0 0 184 184"><g fill="none" stroke="#C9BFAE" stroke-width="5" stroke-linecap="round"><path id="cs${i}0" d="M72 46 c-10 -12 10 -20 0 -34"/><path id="cs${i}1" d="M92 42 c-10 -12 10 -22 0 -38"/><path id="cs${i}2" d="M112 46 c-10 -12 10 -20 0 -34"/></g><ellipse cx="92" cy="168" rx="78" ry="11" fill="#EEE8DB"/><path d="M42 60 h100 l-13 104 h-74 z" fill="#fff" stroke="#3A4560" stroke-width="5" stroke-linejoin="round"/><path d="M49 84 h86 l-9 74 h-68 z" fill="${tea}"/><path d="M42 60 h100" stroke="#B8862F" stroke-width="6" stroke-linecap="round"/>${i ? '<g id="gin"><ellipse cx="112" cy="86" rx="15" ry="6" fill="#E9D9B5" stroke="#8A6420" stroke-width="3"/><ellipse cx="78" cy="88" rx="11" ry="5" fill="#E9D9B5" stroke="#8A6420" stroke-width="3"/></g>' : ''}</svg>`;
const CK = [['K', 'KABIR\'S CHAI', '#D9C7A0', 3], ['A', 'ASHA\'S CHAI', '#B8862F', 9]];
$('#ckRow').innerHTML = CK.map(([l, n, tea], i) => `<div class="card ck" id="ck${i}" style="left:${160 + i * 816}px"><div class="lbl" style="left:40px;top:40px">${n}</div><div class="avc">${l}</div>${cupSvg(i, tea)}`
  + ['Tea', 'Milk', 'Sugar'].map((p, k) => `<div class="pill" id="ig${i}${k}" style="top:100px">${p}</div>`).join('')
  + (i ? `<div class="pill" id="pr1" style="left:264px;top:164px;background:#B8862F;color:#fff"><span>${M.icon('repeat', 22, '#fff', 2.4)}</span>Years of practice</div><div class="pill" id="gn1" style="left:264px;top:228px;background:#14213D;color:#F5E7C6"><span>${M.icon('bulb', 22, '#E9D9B5', 2.4)}</span>Adds ginger on rainy days</div>`
    : `<div class="pill" id="pr0" style="left:264px;top:164px;color:#8A8274">First try</div>`)
  + `<div class="hr"></div><div class="lbl" style="left:40px;top:332px">CUSTOMERS WHO LOVE IT</div><div class="serif cnt">0 of 10</div><div class="ppl">${Array.from({ length: 10 }, (_, k) => `<div class="pp" id="pp${i}${k}" style="left:${k * 44}px">${PERSON}</div>`).join('')}</div></div>`).join('');
// test 1 summary: four keys of art
const KC = [['star', 'Skill', 'Your own talent', 'Asha\'s touch'], ['repeat', 'Practice', 'Better every day', 'Years of chai'], ['bulb', 'Creativity', 'Fresh ideas', 'Rainy-day ginger'], ['trophy', 'Results', 'The best outcome', 'Happy customers']];
$('#kcRow').innerHTML = KC.map(([ic, t, s, e], i) => `<div class="kc" id="kc${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="ki"><span class="ico"></span></div><div class="kn">0${i + 1}</div><div class="serif kt">${t}</div><div class="ks">${s}</div><div class="hr"></div><div class="kx">AT CHAI CORNER</div><div class="ke">${e}</div></div>`).join('');
// test 2: cause and effect
const BXA = [['A', 'cup'], ['K', 'coin'], ['M', 'droplet']];
$('#bxA').innerHTML = BXA.map(([l, ic], k) => `<div class="avc" id="ba${k}" style="left:${32 + k * 88}px">${l}</div><div class="ji" id="bj${k}" style="left:${46 + k * 88}px">${M.icon(ic, 28, C.gold, 2.2)}</div>`).join('');
$('#tmr').innerHTML = M.icon('timer', 48, C.gold, 2.2);
const SR = [['flask', 'Heat ice. It melts.', 'PHYSICS · SAME RESULT EVERY TIME', 'Exact', 80], ['users', 'People are different.', 'PEOPLE · A SOCIAL SCIENCE', 'Inexact', 264]];
SR.forEach(([ic, t, l, p, y], r) => {
  $('#sr' + r).innerHTML = `<div class="si" style="top:${y}px">${M.icon(ic, 30, C.gold, 2.2)}</div><div class="serif st" style="top:${y + 4}px">${t}</div>`
    + Array.from({ length: 5 }, (_, k) => `<div class="dt" id="dt${r}${k}" style="left:${128 + k * 52}px;top:${y + 64}px"><span class="dti"></span></div>`).join('')
    + `<div class="sl" style="top:${y + 122}px">${l}</div><div class="sp2" style="top:${y + 10}px;background:${r ? C.redBg : C.gold};color:${r ? C.red : '#fff'}">${p}</div>`;
});
const RES1 = [1, 1, 0, 1, 0];
// test 3: five signs + licence
const PRR = [['Specialised knowledge', 'Yes', 1], ['Formal education', 'BBA, MBA', 1], ['Professional body', 'AIMA', 1], ['Code of conduct', 'Not compulsory', 0], ['Service motive', 'Still growing', 0]];
$('#prRows').innerHTML = PRR.map(([t, s, y], i) => `<div class="pr" id="pr_${i}" style="top:${84 + i * 72}px"><div class="rn">0${i + 1}</div><div class="rt">${t}</div><div class="rs" style="background:${y ? C.gold : C.gold2};color:${y ? '#fff' : C.ink}">${M.icon(y ? 'check' : 'minus', 22, y ? '#fff' : C.ink, 3)}${s}</div></div>`).join('');
const LR = [['steth', 'Doctor', 'Required', 1], ['scale', 'Lawyer', 'Required', 1], ['briefcase', 'Manager', 'Not needed', 0]];
$('#lrRows').innerHTML = LR.map(([ic, n, s, y], i) => `<div class="lr" id="lr${i}" style="top:${96 + i * 112}px"><div class="li">${M.icon(ic, 30, C.gold, 2.2)}</div><div class="serif ln">${n}</div><div class="ls" style="background:${y ? C.ink : C.redBg};color:${y ? '#F5E7C6' : C.red}">${M.icon(y ? 'award' : 'x', 22, y ? C.gold2 : C.red, 2.4)}${s}</div></div>`).join('');
$('#lr2 .li').insertAdjacentHTML('beforeend', `<div class="avc" id="lrR" style="left:0;top:0;background:var(--gold)">R</div>`);
// verdict
const VC = [['A', 'palette', 'Art', 'ASHA WAS RIGHT', 'Yes, an art', 1], ['K', 'flask', 'Science', 'KABIR WAS RIGHT', 'Yes, but inexact', 1], ['M', 'briefcase', 'Profession', 'MEENA FOUND THE GAP', 'Only partly', 0]];
$('#vcRow').innerHTML = VC.map(([l, ic, t, s, p, y], i) => `<div class="card vc" id="vc${i}" style="left:${160 + i * 544}px"><div class="avc">${l}</div><div class="vb" style="background:${y ? C.gold : C.gold2}">${M.icon(y ? 'check' : 'minus', 30, y ? '#fff' : C.ink, 3)}</div><div class="vi">${M.icon(ic, 48, C.gold, 2)}</div><div class="serif vt">${t}</div><div class="vl">${s}</div><div class="vp" style="background:${y ? C.ink : C.gold2};color:${y ? '#fff' : C.ink}">${p}</div></div>`).join('');
$('#r2a').innerHTML = M.icon('bulb', 40, C.gold2, 2.4);
// quiz
const OPTS = ['Skill', 'Knowledge', 'A licence', 'Practice'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('award', 44, C.gold2, 2.4);
// recap
const ROWS = [['palette', 'Management is an <span class="acc">art</span>'], ['flask', 'A <span class="acc">science</span>, but an inexact one, because of people'], ['briefcase', 'Only <span class="acc">partly</span> a profession: no licence needed yet']];
$('#rRows').innerHTML = ROWS.map(([ic, tx], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div></div>`).join('');
$('#rw0').insertAdjacentHTML('beforeend', ['Skill', 'Practice', 'Creativity'].map((p, k) => `<div class="fp" id="fp${k}">${p}</div>`).join(''));
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const on01 = (t, a, b, d = 0.32) => M.io((t - a) / d) * (1 - M.io((t - b) / 0.4));
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // definition bars: chip, icon, text, then science's two pills
  for (let i = 0; i < 3; i++) {
    const db = $('#db' + i), tn = db.querySelector('.tn'), di = db.querySelector('.di'), tx = db.querySelector('.tx');
    const x1 = 24 + tn.offsetWidth + 22; di.style.left = x1 + 'px'; tx.style.left = (x1 + 36 + 18) + 'px';
    if (i === 1) { let x = x1 + 54 + tx.offsetWidth + 28; ['#sp0', '#sp1'].forEach(s => { const p = $(s); p.style.left = x + 'px'; x += p.offsetWidth + 14; }); }
  }
  // recipe pills
  for (let i = 0; i < 2; i++) { let x = 264; for (let k = 0; k < 3; k++) { const p = $('#ig' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 12; } }
  // verdict pills centred
  for (let i = 0; i < 3; i++) { const p = $('#vc' + i + ' .vp'); p.style.left = ((512 - p.offsetWidth) / 2) + 'px'; }
  const rt = $('#rw0 .rt'); let x = 216 + rt.offsetWidth + 40;
  for (let k = 0; k < 3; k++) { const p = $('#fp' + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
}
// section opener: label + big question, then out
const opener = (i, t, ta, tb) => { M.vis($('#bl' + i), t, ta, tb, { dy: 12, outDur: 0.25 }); M.rise($('#bt' + i), t, ta + 0.05, { st: 0.07, sp: M.HEAVY, out: tb, outDur: 0.3 }); };
// definition bar: in, text rise, verdict pop
const defbar = (i, t, ta, tv, tout) => {
  const db = $('#db' + i); M.vis(db, t, ta, tout, { dy: 24, outDur: 0.3, ody: -16 });
  M.vis(db.querySelector('.tn'), t, ta + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.08 });
  M.vis(db.querySelector('.di'), t, ta + 0.16, 1e9, { dy: 8 });
  M.rise(db.querySelector('.tx'), t, ta + 0.2, { st: 0.04 });
  M.vis(db.querySelector('.vd'), t, tv, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
};

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

  /* ===== A: a book, and three different answers ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#moon'), t, tMorph + 0.55, 1e9, { dy: 0, fade: 0.3 });
    const bp = M.spring(t - tMorph - 0.75, M.POP); $('#book').setAttribute('transform', `translate(308 ${(194 + (1 - bp) * 26).toFixed(2)})`); $('#book').style.opacity = M.clamp((t - tMorph - 0.75) / 0.12);
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    OPS.forEach((_, i) => {
      const el = $('#op' + i); M.vis(el, t, tOp[i], 1e9, { dy: 30 });
      M.rise(el.querySelector('.qt'), t, tOp[i] + 0.3, { st: 0.04 });
      M.vis(el.querySelector('.tg'), t, tTag[i], 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      el.querySelector('.avc').style.background = mix(C.ink, C.gold, on01(t, tSpk[i][0], tSpk[i][1]));
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

  /* ===== test 1: art ===== */
  const arOn = t >= tTu - 0.05 && t < tS1 + 0.2; M.hide($('#sAr'), !arOn);
  M.vis($('#exChip'), t, tCust + 0.2, tA7 - 0.1, { dy: 10, outDur: 0.3 });
  if (arOn) {
    opener(0, t, tA1, tA2 - 0.12);
    defbar(0, t, tA2 + 0.08, tVd0, tArOut);
    const co = { outDur: 0.3, ody: -16 };
    CK.forEach(([, , , n], i) => {
      const el = $('#ck' + i); M.vis(el, t, i ? tRec - 0.05 : tKab - 0.08, tA7 - 0.05, { dy: 36, ...co });
      const tin = i ? tRec : tKab;
      for (let k = 0; k < 3; k++) M.draw($('#cs' + i + k), t, tin + 0.35 + k * 0.1, 0.5, M.o3);
      for (let k = 0; k < 3; k++) M.vis($('#ig' + i + k), t, tIng[k] - 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      el.querySelector('.cupv g').setAttribute('transform', `translate(0 ${(-3 * Math.sin(t * 2.4 + i)).toFixed(2)})`);
      for (let k = 0; k < 10; k++) {
        const pp = $('#pp' + i + k); M.vis(pp, t, tCust + k * 0.04, 1e9, { dy: 10, sc: 0.7, sp: M.POP, fade: 0.08 });
        pp.style.color = k < n ? mix(C.line, C.gold, M.io((t - tDiff - k * 0.06) / 0.25)) : C.line;
      }
      M.vis(el.querySelector('.cnt'), t, tCust + 0.1, 1e9, { dy: 10 });
      M.setT(el.querySelector('.cnt'), `${Math.round(n * M.o3((t - tDiff) / (0.06 * n + 0.3)))} of 10`);
    });
    M.vis($('#pr0'), t, tWhy + 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#pr1'), t, tPrac - 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#gn1'), t, tGin - 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    const gp = M.spring(t - tGin - 0.1, M.POP); $('#gin').setAttribute('transform', `translate(0 ${((1 - gp) * -30).toFixed(2)})`); $('#gin').style.opacity = M.clamp((t - tGin - 0.1) / 0.12);
    const cr = $('#gn1'); const pulse = t > tCre && t < tCre + 0.45 ? Math.sin(Math.PI * (t - tCre) / 0.45) : 0;
    cr.style.background = mix(C.ink, C.gold, M.io((t - tCre) / 0.3)); cr.style.color = t > tCre + 0.15 ? '#fff' : '#F5E7C6';
    setIco(cr.querySelector('span'), 'bulb', t > tCre + 0.15 ? '#fff' : C.gold2, 22, 2.4);
    if (pulse > 0) cr.style.transform = `scale(${(1 + 0.05 * pulse).toFixed(4)})`; else if (t > tCre && cr.style.opacity === '') cr.style.transform = 'none';
    // four keys of art
    KC.forEach((k, i) => {
      const el = $('#kc' + i), ta = tKc[i], td = i < 3 ? tKc[i + 1] : 1e9;
      M.vis(el, t, tA7 + 0.25 + i * 0.08, tArOut, { dy: 36, ...co });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.4), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.kt').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      el.querySelector('.ks').style.color = mix(mix(C.dim, C.gold2, on), C.gold, off);
      el.querySelector('.kn').style.color = mix(C.dim, C.gold, on);
      el.querySelector('.ki').style.background = mix(C.paper, '#24345A', act);
      setIco(el.querySelector('.ico'), k[0], t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 44, 2);
      el.querySelector('.hr').style.background = mix(C.line, '#2C3B5E', act);
      el.querySelector('.kx').style.color = mix(mix(C.dim, '#8C96AE', on), C.muted, off);
      el.querySelector('.ke').style.color = mix(mix(C.dim, '#fff', on), C.ink, off);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tA7 + 1.2 && t < tArOut) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== test 2: science ===== */
  const scOn = t >= tS1 - 0.1 && t < tP1 + 0.2; M.hide($('#sSc'), !scOn);
  if (scOn) {
    const so = { outDur: 0.3, ody: -16 };
    opener(1, t, tS1, tS2 - 0.12);
    defbar(1, t, tS2 + 0.08, tVd1, tScOut);
    M.vis($('#sp0'), t, tTest - 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    M.vis($('#sp1'), t, tSort - 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    // cause and effect
    M.vis($('#sc0'), t, tS3 + 0.05, tScOut, { dy: 36, ...so });
    M.rise($('#dothis'), t, tDo - 0.05, { st: 0.06 });
    M.vis($('#schr'), t, tS4 - 0.1, 1e9, { dy: 0 }); M.vis($('#rlbl'), t, tS4, 1e9, { dy: 10 });
    M.vis($('#bx0'), t, tGive - 0.1, 1e9, { dy: 24 });
    for (let k = 0; k < 3; k++) {
      M.vis($('#ba' + k), t, tGive + 0.1 + k * 0.08, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      M.vis($('#bj' + k), t, tJobW[k], 1e9, { dy: 10, sp: M.POP });
      $('#ba' + k).style.background = mix(C.ink, C.gold, M.io((t - tJobW[k]) / 0.3));
    }
    M.vis($('#bx0 .cp'), t, tJobW[2] + 0.15, 1e9, { dy: 10 });
    M.draw($('#arL'), t, tWork - 0.15, 0.4, M.o3); M.draw($('#arH'), t, tWork + 0.15, 0.25, M.o3);
    M.vis($('#bx1'), t, tWork + 0.1, 1e9, { dy: 24 });
    M.vis($('#tmr'), t, tWork + 0.25, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    M.vis($('#bx1 .cp'), t, tWork + 0.35, 1e9, { dy: 10 });
    // same rule, same result?
    M.vis($('#sc1'), t, tS5 - 0.05, tScOut, { dy: 36, ...so });
    const rows = [[tS5 + 0.15, tEvery, tEvery + 0.5], [tPpl - 0.05, tWk, tAnother]];
    rows.forEach(([tr, td, tp], r) => {
      const R = $('#sr' + r);
      M.vis(R.querySelector('.si'), t, tr, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.rise(R.querySelector('.st'), t, tr + 0.05, { st: 0.05 });
      for (let k = 0; k < 5; k++) {
        const d = $('#dt' + r + k), good = r === 0 || RES1[k], tk = r === 0 ? td + k * 0.09 : (good ? td + k * 0.06 : tFail + (k - 2) * 0.1);
        M.vis(d, t, tr + 0.25 + k * 0.05, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
        const u = M.io((t - tk) / 0.25);
        d.style.background = mix(C.paper, good ? C.gold : C.redBg, u);
        const ic = d.querySelector('.dti'); if (t >= tk) setIco(ic, good ? 'check' : 'x', good ? '#fff' : C.red, 22, 3); else if (ic._k) { ic._k = null; ic.innerHTML = ''; }
      }
      M.vis(R.querySelector('.sl'), t, r === 0 ? td + 0.5 : tSocial, 1e9, { dy: 10 });
      M.vis(R.querySelector('.sp2'), t, tp, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    });
    M.vis($('#sr_hr'), t, tPpl - 0.15, 1e9, { dy: 0 });
  }

  /* ===== test 3: profession ===== */
  const prOn = t >= tP1 - 0.1 && t < tV1 + 0.2; M.hide($('#sPr'), !prOn);
  if (prOn) {
    const po = { outDur: 0.3, ody: -16 };
    opener(2, t, tP1, tP2 - 0.12);
    defbar(2, t, tP2 + 0.08, tVd2, tPrOut);
    M.vis($('#pc0'), t, tFive - 0.3, tPrOut, { dy: 36, ...po });
    PRR.forEach((_, i) => {
      const el = $('#pr_' + i), ta = tPr[i], td = i < 4 ? tPr[i + 1] : tP8;
      M.vis(el, t, tFive + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), act = on * (1 - M.io((t - td) / 0.4));
      el.style.background = mix(C.card, C.paper, act);
      el.querySelector('.rt').style.color = mix(C.dim, C.ink, on);
      el.querySelector('.rn').style.color = mix(C.dim, C.gold, on);
      M.vis(el.querySelector('.rs'), t, tPs[i] - 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    });
    M.vis($('#pc1'), t, tP8 - 0.05, tPrOut, { dy: 36, ...po });
    LR.forEach((_, i) => {
      const el = $('#lr' + i); M.vis(el, t, tLr[i] - 0.06, 1e9, { dy: 16 });
      M.vis(el.querySelector('.ls'), t, tLs[i] + i * 0.08, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
    });
    M.vis($('#lrR'), t, tRavi - 0.04, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.1 });
  }

  /* ===== verdict ===== */
  const vOn = t >= tV1 - 0.1 && t < tQ + 0.05; M.hide($('#sV'), !vOn);
  if (vOn) {
    M.rise($('#vh'), t, tV1 + 0.05, { st: 0.06, sp: M.HEAVY });
    VC.forEach((_, i) => {
      const el = $('#vc' + i); M.vis(el, t, tVc[i] - 0.08, 1e9, { dy: 30, sc: 0.92, sp: M.POP });
      M.vis(el.querySelector('.vp'), t, tVp[i] - 0.04, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.08 });
      M.vis(el.querySelector('.vb'), t, tVp[i] + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 });
    });
    M.vis($('#rule2'), t, tV5 - 0.05, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, wt('Q1', 'What') - 0.05, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'that') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, wt('Q1', 'that') + 0.2 + i * 0.08, 1e9, { dy: 40 });
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
