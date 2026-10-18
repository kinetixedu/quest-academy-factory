// MBA - Principles of Management, Ep 02: Nature, Scope and Importance of Management
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  clipboard: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z', 'M12 11h4', 'M12 16h4', 'M8 11h.01', 'M8 16h.01'],
  cap: ['M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z', 'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  timer: ['M10 2h4', 'm12 14 3-3', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  trendDown: ['M16 17h6v-6', 'm22 17-8.5-8.5-5 5L2 7'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12', 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17'],
  star: ['M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  eyeOff: ['M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49', 'M14.084 14.158a3 3 0 0 1-4.242-4.242', 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143', 'm2 2 20 20'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
  hospital: ['M12 6v4', 'M14 14h-4', 'M14 18h-4', 'M14 8h-4', 'M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2', 'M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18'],
  landmark: ['M10 18v-7', 'M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z', 'M14 18v-7', 'M18 18v-7', 'M3 22h18', 'M6 18v-7'],
  calendar: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'M3 10h18'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
});

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tOff = wt('H2', 'off'), tNobody = wt('H2', 'nobody');
const tDay = [tNobody - 0.1, tNobody + 0.2, wt('C1', 'Wednesday'), wt('C2', 'Thursday'), T0('C3') + 0.02, wt('C3', 'Saturday')];
const tMilk = wt('C1', 'milk'), tCash = wt('C2', 'cash'), tDrop = wt('C3', 'dropped');
const tT = T0('T1'), tSt2 = wt('T1', 'Management'), tTu = T0('I1') - 0.32;          // statement sweep: cover, line 2, uncover
const tI1 = T0('I1'), tI2 = T0('I2'), tI = [T0('I3'), T0('I4'), T0('I5')], tIout = T0('V0') - 0.32;
const tV0 = T0('V0'), tV = [1, 2, 3, 4, 5].map(i => T0('V' + i)), tVout = T0('W0') - 0.32;
const tAim = wt('V1', 'aim'), tMin = wt('V1', 'three');
const tNm = [wt('V2', 'Ravi'), wt('V2', 'Asha'), wt('V2', 'Kabir'), wt('V2', 'Meena')];
const tPCF = [wt('V3', 'Planning'), wt('V3', 'checking'), wt('V3', 'fixing')], tEvery = wt('V3', 'every');
const tTouch = wt('V4', 'touch'), tShort = wt('V4', 'short'), tHappy = wt('V4', 'happy');
const tUni = [wt('V5', 'chai'), wt('V5', 'hospital'), wt('V5', 'school'), wt('V5', 'government')];
const tW0 = T0('W0'), tReach = wt('W0', 'reaches'), tW1 = T0('W1'), tW = [2, 3, 4, 5].map(i => T0('W' + i)), tW6 = T0('W6');
const tWho = [wt('W2', 'Asha'), wt('W3', 'Ravi'), wt('W4', 'Kabir'), wt('W5', 'Ravi')];
const tBp = ['plans', 'organizes', 'staffs', 'directs', 'controls'].map(w => wt('W6', w)), tWout = T0('X0') - 0.32;
const tX0 = T0('X0'), tX = [1, 2, 3, 4].map(i => T0('X' + i)), tTwo = wt('X2', 'two');
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'Management');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['goal', 'group', 'continuous'].map(w => wt('S2', w)), ['production', 'marketing', 'finance', 'HR'].map(w => wt('S3', w)), ['meets', 'cuts', 'helps'].map(w => wt('S4', w))];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];   // navy page-turn sweeps [cover start, uncover start]

/* ---------- build ---------- */
// awning
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
$('#awayI').innerHTML = M.icon('plane', 22, C.gold2, 2.2);
// week tiles + problems
const DAYS = [['MON', 0, 4000], ['TUE', 0, 4000], ['WED', 'milk', 3400], ['THU', 'coin', 3000], ['FRI', 'trendDown', 2500], ['SAT', 'trendDown', 2000]];
$('#days').innerHTML = DAYS.map(([d], i) => `<div class="day" id="day${i}" style="left:${36 + i * 144}px"><div class="dn">${d}</div><div class="di"></div></div>`).join('');
const PROBS = [['milk', 'No milk', tMilk], ['coin', 'Cash doesn\'t match', tCash], ['trendDown', 'Sales falling', tDay[4]]];
$('#probs').innerHTML = PROBS.map(([ic, tx], i) => `<div class="pill bad" id="pb${i}" style="top:196px">${M.icon(ic, 24, C.red, 2.2)}<span>${tx}</span></div>`).join('');
$('#halfI').innerHTML = M.icon('trendDown', 24, C.red, 2.2);
$('#bars').innerHTML = DAYS.map(([d], i) => `<div class="sb" id="sb${i}" style="left:${398 + i * 86}px"></div><div class="sd" style="left:${398 + i * 86}px">${d[0]}</div>`).join('');
// three things
const THREE = [['search', 'Nature', 'What it is like'], ['layers', 'Scope', 'How far it reaches'], ['star', 'Importance', 'Why it matters']];
$('#iRow').innerHTML = THREE.map(([ic, t, s], i) => `<div class="ic3" id="ic${i}" style="left:${160 + i * 544}px"><div class="bg"></div><div class="lbl">PART ${i + 1}</div><div class="ui"><span class="ico"></span></div><div class="serif ut">${t}</div><div class="us">${s}</div></div>`).join('');
// nature: list + panes
const NAT = [['target', 'Goal-oriented', 'Every task has a clear aim'], ['users', 'Group activity', 'People working together'], ['refresh', 'Continuous', 'It goes on every single day'],
  ['eyeOff', 'Intangible', 'Unseen, but its results show'], ['globe', 'Universal', 'Every group needs it']];
$('#vRows').innerHTML = NAT.map(([ic, t], i) => `<div class="vr" id="vr${i}" style="top:${90 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const VIS = [
  // 1 goal: target + arrow
  `<svg class="abs" style="left:0;top:0" width="156" height="156"><circle cx="78" cy="78" r="74" fill="#F5F1E8"/><circle cx="78" cy="78" r="52" fill="#fff"/><circle cx="78" cy="78" r="30" fill="#E9D9B5"/><circle cx="78" cy="78" r="11" fill="#B8862F"/>
    <g id="arrow"><path d="M78 78 L150 30" stroke="#14213D" stroke-width="6" stroke-linecap="round"/><path d="M150 30 l14 -2 M150 30 l2 -14 M140 37 l14 -2 M140 37 l2 -14" stroke="#14213D" stroke-width="4" stroke-linecap="round"/></g></svg>
   <div class="abs" id="gl1" style="left:196px;top:30px;font:600 32px Poppins;white-space:nowrap">Aim: every cup served</div>
   <div class="abs" id="gl2" style="left:196px;top:80px;font:600 32px Poppins;white-space:nowrap">in under <span class="acc">3 minutes</span></div>`,
  // 2 group: four avatars on one line
  `<svg class="abs" style="left:0;top:0" width="848" height="80"><line id="gline" x1="36" y1="36" x2="624" y2="36" stroke="#E2DACB" stroke-width="4" stroke-linecap="round"/></svg>` +
  [['R', 'Ravi'], ['A', 'Asha'], ['K', 'Kabir'], ['M', 'Meena']].map(([l, n], i) => `<div class="av" id="gav${i}" style="left:${i * 196}px;top:0;${i ? '' : 'background:#B8862F'}">${l}</div><div class="avn" id="gan${i}" style="left:${i * 196 - 44}px;top:92px">${n}</div>`).join(''),
  // 3 continuous: plan -> check -> fix, and around again
  `<svg class="abs" style="left:0;top:0" width="848" height="156" fill="none" stroke-linecap="round" stroke-linejoin="round"><path id="loopP" stroke="#D9CFBC" stroke-width="4"/><path id="loopH" stroke="#D9CFBC" stroke-width="4"/><g id="loopA"></g></svg>` +
  ['Plan', 'Check', 'Fix'].map((s, k) => `<div class="stp" id="stp${k}">${s}</div>`).join('') +
  `<div class="stp" id="stpD" style="background:#B8862F;color:#fff"><span id="stpDI"></span>Every day</div>`,
  // 4 intangible
  `<div class="abs" style="left:0;top:0;width:64px;height:64px;border-radius:32px;background:#F5F1E8;display:flex;align-items:center;justify-content:center" id="eyeC"></div>
   <div class="abs" id="eyeT" style="left:88px;top:12px;font:600 30px Poppins;color:#8A8274;white-space:nowrap">You cannot touch it</div>
   <div class="abs" id="seeT" style="left:0;top:104px;font:600 30px Poppins;white-space:nowrap">You can see:</div>
   <div class="stp" id="res0" style="top:92px;background:#14213D;color:#fff"><span id="res0I"></span>Short lines</div>
   <div class="stp" id="res1" style="top:92px;background:#14213D;color:#fff"><span id="res1I"></span>Happy customers</div>`,
  // 5 universal
  [['store', 'Chai stall'], ['hospital', 'Hospital'], ['cap', 'School'], ['landmark', 'Government']].map(([ic, n], i) => `<div class="ut4" id="ut${i}" style="left:${i * 218}px"><i>${M.icon(ic, 32, C.gold, 2.2)}</i><span>${n}</span></div>`).join(''),
];
const VP = [['PART 1 OF 3', 'Nature', 'What management is like', 'TRUE EVERYWHERE', null]].concat(NAT.map((n, i) => [`FEATURE 0${i + 1} / 05`, n[1], n[2], i === 4 ? 'EVERYWHERE' : 'AT CHAI CORNER', VIS[i]]));
$('#vPans').innerHTML = VP.map(([s, t, m, x, v], i) => `<div class="pn" id="vn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Five features found in every organization</span></div>`}</div>`).join('');
$('#stpDI').innerHTML = M.icon('calendar', 26, '#fff', 2.2);
$('#eyeC').innerHTML = M.icon('eyeOff', 30, C.dim, 2.2);
$('#res0I').innerHTML = M.icon('timer', 26, C.gold2, 2.2); $('#res1I').innerHTML = M.icon('smile', 26, C.gold2, 2.2);
// scope: pillars + base
const PIL = [['cup', 'Production', 'Making the product', 'A', 'Asha makes the chai'], ['megaphone', 'Marketing', 'Bringing in customers', 'R', 'A bright new signboard'],
  ['coin', 'Finance', 'Looking after money', 'K', 'Kabir counts the cash'], ['users', 'HR', 'Human resources', 'R', 'Ravi hires and trains']];
$('#pils').innerHTML = PIL.map(([ic, t, s, a, e], i) => `<div class="pil" id="pl${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="pi"><span class="ico"></span></div><div class="pa">${a}</div><div class="serif pt2">${t}</div><div class="ps2">${s}</div><div class="ph"></div><div class="pe2">${e}</div></div>`).join('');
const BP = ['Plan', 'Organize', 'Staff', 'Direct', 'Control'];
$('#bps').innerHTML = BP.map((p, k) => `<div class="bp" id="bp${k}">${p}</div>`).join('');
// importance: ripple rings
const RX = 552, RY = 570, RR = [76, 144, 212, 280];
$('#rings').innerHTML = [3, 2, 1, 0].map(k => `<circle id="rg${k}" cx="${RX}" cy="${RY}" r="${RR[k]}" fill="#fff" stroke="#E2DACB" stroke-width="3"/>`).join('');
const RL = ['GOALS', 'RESOURCES', 'ORGANIZATION', 'SOCIETY'];
$('#rlabs').innerHTML = RL.map((l, k) => `<div class="rl" id="rl${k}" style="left:${RX - 120}px;top:${k ? RY - (RR[k - 1] + RR[k]) / 2 - 11 : RY + 14}px">${l}</div>`).join('');
$('#rcore').style.left = (RX - 48) + 'px'; $('#rcore').style.top = (RY - 70) + 'px';
const XI = [['THE BIG IDEA', 'Why it matters', 'Four big reasons', 'store', 'Good management helps the stall, the team and the whole street'],
  ['REASON 01 / 04', 'Meets goals', 'Everyone pulls the same way', 'target', 'Fresh chai, served fast, every single time'],
  ['REASON 02 / 04', 'Less waste', 'Uses resources well', 'milk', 'Milk wasted each week: 10 litres down to 2'],
  ['REASON 03 / 04', 'Strong team', 'Builds a strong organization', 'shield', 'The team knows what to do, even when Ravi is away'],
  ['REASON 04 / 04', 'Helps society', 'Jobs for people, value for all', 'smile', 'Steady jobs for 3 people, and good chai for the street']];
$('#xPans').innerHTML = XI.map(([s, t, m, ic, e], i) => `<div class="pn" id="xn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">AT CHAI CORNER</div><div class="pe"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><span>${e}</span></div></div>`).join('');
// quiz
const OPTS = ['Goal-oriented', 'Intangible', 'Continuous', 'Universal'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('refresh', 44, C.gold2, 2.4);
// recap
const ROWS = [['search', 'Nature', ['Goal-oriented', 'Group activity', 'Continuous']], ['layers', 'Scope', ['Production', 'Marketing', 'Finance', 'HR']], ['star', 'Importance', ['Meets goals', 'Cuts waste', 'Helps society']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const inr = v => Math.round(v).toLocaleString('en-IN');
const salesV = M.track(4000, DAYS.slice(2).map(([, , v], i) => [tDay[i + 2], v]), M.SOFT);
// highlight steps of the plan -> check -> fix loop (keeps cycling while the line plays)
const ACTS = tPCF.map((a, k) => [a - 0.05, k]); for (let n = 1; tPCF[2] + n * 0.62 < tV[3] - 0.2; n++) ACTS.push([tPCF[2] + n * 0.62, (2 + n) % 3]);
const stepW = (t, k) => { let j = -1; for (let i = 0; i < ACTS.length; i++) if (ACTS[i][0] <= t) j = i; if (j < 0) return 0; const u = M.io((t - ACTS[j][0]) / 0.2); if (ACTS[j][1] === k) return u; if (j > 0 && ACTS[j - 1][1] === k) return 1 - u; return 0; };
let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  // hook: away pill centred where Ravi stood, problem pills in a row
  const ap = $('#away'); ap.style.left = (308 - ap.offsetWidth / 2) + 'px';
  let x = 36; for (let i = 0; i < 3; i++) { const p = $('#pb' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  // continuous loop: steps in a row with arrows, "every day" pill at the right edge
  x = 0; const cx = [];
  for (let k = 0; k < 3; k++) { const s = $('#stp' + k); s.style.left = x + 'px'; cx.push([x, x + s.offsetWidth]); x += s.offsetWidth + 72; }
  const d = $('#stpD'); d.style.left = (848 - d.offsetWidth) + 'px';
  let ar = ''; for (let k = 0; k < 2; k++) { const m = (cx[k][1] + cx[k + 1][0]) / 2; ar += `<path id="la${k}" d="M${m - 16} 50 H${m + 12} M${m + 2} 40 L${m + 12} 50 L${m + 2} 60" stroke="#B9B1A3" stroke-width="4"/>`; }
  $('#loopA').innerHTML = ar;
  const p0 = (cx[0][0] + cx[0][1]) / 2, p2 = (cx[2][0] + cx[2][1]) / 2;
  $('#loopP').setAttribute('d', `M${p2} 86 V112 a20 20 0 0 1 -20 20 H${p0 + 20} a20 20 0 0 1 -20 -20 V92`);
  $('#loopH').setAttribute('d', `M${p0 - 10} 100 L${p0} 90 L${p0 + 10} 100`);
  // intangible result chips after the label
  x = $('#seeT').offsetWidth + 24; for (let k = 0; k < 2; k++) { const r = $('#res' + k); r.style.left = x + 'px'; x += r.offsetWidth + 16; }
  // base strip: "In every area:" + five pills, centred as one group
  const bt = $('#baseT'); let tw = bt.offsetWidth + 28; BP.forEach((_, k) => { tw += $('#bp' + k).offsetWidth + (k < 4 ? 14 : 0); });
  x = 800 - tw / 2; bt.style.left = x + 'px'; x += bt.offsetWidth + 28;
  BP.forEach((_, k) => { const p = $('#bp' + k); p.style.left = x + 'px'; x += p.offsetWidth + 14; });
  // quiz options auto-fit
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  // recap pills after each row title
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
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
  const exOn = t < tTu ? [tDay[0] + 0.2, tT - 0.3] : [wt('X2', 'Ravi'), tX[2] - 0.1];
  M.vis($('#exChip'), t, exOn[0], exOn[1], { dy: 10, outDur: 0.3 });

  /* ===== A: Ravi takes a week off ===== */
  const aOn = t < tT + 0.1; M.hide($('#sA'), !aOn);
  if (aOn) {
    M.vis($('#hero'), t, tMorph + 0.18, 1e9, { dx: -60, dy: 0 });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    const cold = M.io((t - tMilk) / 0.6);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`); $('#steam').style.opacity = (1 - cold).toFixed(3);
    const gone = M.io((t - tOff) / 0.55);
    if (gone >= 1) M.hide($('#ravi'), true); else { M.hide($('#ravi'), false); $('#ravi').setAttribute('transform', `translate(0 ${(150 * gone).toFixed(2)})`); $('#ravi').style.opacity = (1 - M.io((t - tOff - 0.15) / 0.4)).toFixed(3); }
    M.vis($('#away'), t, tOff + 0.45, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    // week card
    M.vis($('#week'), t, tMorph + 0.3, 1e9, { dy: 36 });
    DAYS.forEach(([, ic], i) => {
      const el = $('#day' + i), ta = tDay[i], bad = !!ic;
      M.vis(el, t, tMorph + 0.55 + i * 0.05, 1e9, { dy: 16, sp: M.SOFT });
      const on = M.io((t - ta) / 0.25);
      el.style.background = bad ? mix(C.paper, C.redBg, on) : C.paper;
      el.querySelector('.dn').style.color = t < ta ? C.dim : (bad ? C.red : C.ink);
      const di = el.querySelector('.di'); setIco(di, bad ? ic : 'check', bad ? C.red : C.gold, 36, bad ? 2.2 : 2.6);
      M.vis(di, t, ta, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
    });
    PROBS.forEach(([, , tp], i) => M.vis($('#pb' + i), t, tp + 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 }));
    // sales card
    M.vis($('#sales'), t, tMorph + 0.42, 1e9, { dy: 36 });
    M.vis($('#sN'), t, tDay[0], 1e9, { dy: 16 });
    M.setT($('#sN'), '₹' + inr(Math.round(salesV(t) / 10) * 10));
    $('#sN').style.color = mix(C.ink, C.red, M.io((t - tDay[2]) / 0.4));
    DAYS.forEach(([, ic, v], i) => {
      const b = $('#sb' + i), p = M.spring(t - tDay[i], M.SOFT);
      M.hide(b, p <= 0); b.style.height = (140 * v / 4000 * p).toFixed(1) + 'px'; b.style.background = ic ? C.red : C.gold;
    });
    M.vis($('#half'), t, tDrop + 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
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

  /* ===== I: three things ===== */
  const iOn = t >= tTu - 0.05 && t < tV0 + 0.2; M.hide($('#sI'), !iOn);
  if (iOn) {
    M.rise($('#iq'), t, tI1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tI2 - 0.1, outDur: 0.3 });
    THREE.forEach(([ic], i) => {
      const el = $('#ic' + i), ta = tI[i], td = i < 2 ? tI[i + 1] : tIout + 1;
      M.vis(el, t, tI2 + 0.15 + i * 0.1, tIout, { dy: 36, outDur: 0.3, ody: -16 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.ut').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.us').style.color = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.lbl').style.color = mix(C.muted, C.gold2, act);
      el.querySelector('.ui').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), ic, t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 56, 2);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tI2 + 1 && t < tIout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
  }

  /* ===== V: nature ===== */
  const vOn = t >= tV0 - 0.1 && t < tW0 + 0.2; M.hide($('#sV'), !vOn);
  if (vOn) {
    const vo = { outDur: 0.3, ody: -16 };
    M.vis($('#vl'), t, tV0 + 0.1, tVout, { dx: -60, dy: 0, ...vo });
    M.vis($('#vp'), t, tV0 + 0.25, tVout, { dx: 60, dy: 0, ...vo });
    NAT.forEach(([ic], i) => {
      const el = $('#vr' + i), ta = tV[i], td = i < 4 ? tV[i + 1] : tVout + 1;
      M.vis(el, t, tV0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    VP.forEach((_, k) => {
      const tin = k ? tV[k - 1] : tV0 + 0.5, tout = k < 5 ? tV[k] - 0.14 : 1e9;
      const pn = $('#vn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      const pv = pn.querySelector('.pv'); M.vis(pv, t, tin + 0.55, tout, { dy: 18, ...oo });
      if (k === 1) {
        const p = M.spring(t - tAim, M.SNAP), ar = $('#arrow');
        M.hide(ar, t < tAim); ar.setAttribute('transform', p >= 1 ? 'translate(0 0)' : `translate(${(90 * (1 - p)).toFixed(2)} ${(-60 * (1 - p)).toFixed(2)})`); ar.style.opacity = M.clamp((t - tAim) / 0.08);
        M.rise($('#gl1'), t, tAim + 0.05, { st: 0.04 }); M.rise($('#gl2'), t, tMin - 0.3, { st: 0.05 });
      } else if (k === 2) {
        M.draw($('#gline'), t, tin + 0.6, 0.8, M.o3);
        for (let i = 0; i < 4; i++) { M.vis($('#gav' + i), t, tNm[i] - 0.05, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); M.vis($('#gan' + i), t, tNm[i] + 0.05, 1e9, { dy: 10 }); }
      } else if (k === 3) {
        for (let s = 0; s < 3; s++) {
          const el = $('#stp' + s); M.vis(el, t, tin + 0.6 + s * 0.08, 1e9, { dy: 12 });
          const w = stepW(t, s); el.style.background = mix(C.paper, C.ink, w); el.style.color = mix(C.ink, '#fff', w);
        }
        for (let s = 0; s < 2; s++) M.vis($('#la' + s), t, tin + 0.7 + s * 0.08, 1e9, { dy: 0, fade: 0.15 });
        M.draw($('#loopP'), t, tPCF[2] + 0.3, 0.6, M.o3); M.vis($('#loopH'), t, tPCF[2] + 0.85, 1e9, { dy: 0, fade: 0.12 });
        M.vis($('#stpD'), t, tEvery - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k === 4) {
        M.vis($('#eyeC'), t, tin + 0.6, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.1 });
        M.rise($('#eyeT'), t, tTouch - 0.25, { st: 0.04 });
        M.rise($('#seeT'), t, wt('V4', 'see') - 0.1, { st: 0.04 });
        M.vis($('#res0'), t, tShort - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
        M.vis($('#res1'), t, tHappy - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      } else if (k === 5) {
        for (let i = 0; i < 4; i++) M.vis($('#ut' + i), t, tUni[i] - 0.08, 1e9, { dy: 24, sc: 0.92, sp: M.POP });
      }
    });
  }

  /* ===== W: scope (the temple) ===== */
  const wOn = t >= tW0 - 0.1 && t < tX0 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    const wo = { outDur: 0.3, ody: -16 };
    M.vis($('#roof'), t, tW0 + 0.15, tWout, { dy: -40, ...wo });
    M.vis($('#roofT'), t, tReach - 0.1, 1e9, { dy: 0, fade: 0.3 });
    M.vis($('#wdl'), t, tW0 + 0.35, tW1 - 0.05, { dy: 12, outDur: 0.25 });
    M.rise($('#wdt'), t, wt('W0', 'Scope', 1) - 0.05, { st: 0.05, sp: M.HEAVY, out: tW1 - 0.05, outDur: 0.25 });
    PIL.forEach(([ic], i) => {
      const el = $('#pl' + i), ta = tW[i], td = i < 3 ? tW[i + 1] : tW6;
      M.vis(el, t, tW1 + 0.15 + i * 0.09, tWout, { dy: 40, ...wo });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      const bg = el.querySelector('.bg'); bg.style.background = mix(C.card, C.ink, act); bg.style.borderColor = mix(C.line, C.ink, act);
      el.querySelector('.pt2').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.ps2').style.color = t < ta ? C.dim : mix(C.gold2, C.ink2, off);
      el.querySelector('.ph').style.background = mix(C.line, C.navy3, act);
      el.querySelector('.pi').style.background = mix(C.paper, C.navy2, act);
      setIco(el.querySelector('.ico'), ic, t < ta ? C.dim : (t < td ? C.gold2 : C.gold), 32, 2.2);
      M.vis(el.querySelector('.pa'), t, tWho[i] - 0.05, 1e9, { dy: 0, sc: 0.4, sp: M.POP, fade: 0.08 });
      const pe = el.querySelector('.pe2'); M.rise(pe, t, tWho[i], { st: 0.04 }); pe.style.color = mix('#fff', C.ink, off);
      const lift = M.spring(t - ta, M.POP) - M.spring(t - td, M.SOFT);
      if (t > tW1 + 1 && t < tWout) el.style.transform = Math.abs(lift) > 0.001 ? `scale(${(1 + 0.02 * lift).toFixed(4)})` : 'none';
    });
    M.vis($('#base'), t, tW6 - 0.05, tWout, { dy: 40, ...wo });
    BP.forEach((_, k) => { const g = M.io((t - tBp[k] + 0.05) / 0.2), el = $('#bp' + k); el.style.background = mix(C.navy2, C.gold, g); el.style.color = mix(C.gold2, '#fff', g); });
  }

  /* ===== X: importance (ripple) ===== */
  const xOn = t >= tX0 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    RR.forEach((r, k) => {
      const c = $('#rg' + k), p = M.spring(t - tX0 - 0.1 - (3 - k) * 0.08, M.SOFT);
      M.hide(c, p <= 0); c.setAttribute('r', (r * p).toFixed(2));
      const ta = tX[k], td = k < 3 ? tX[k + 1] : 1e9;
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35);
      const fill = t < ta ? C.card : mix(mix(C.card, C.gold, on), C.gold3, off);
      c.setAttribute('fill', fill); c.setAttribute('stroke', t < ta ? C.line : mix(C.line, C.gold, on));
      const l = $('#rl' + k); M.vis(l, t, tX0 + 0.5 + (3 - k) * 0.08, 1e9, { dy: 8 });
      l.style.color = t < ta ? C.muted : mix(mix(C.muted, '#fff', on), C.ink, off);
      if (k === 0) setIco($('#rcore'), 'target', t < ta ? C.dim : (t < td ? '#fff' : C.gold), 40, 2.2);
    });
    M.vis($('#rcore'), t, tX0 + 0.5, 1e9, { dy: 0, sc: 0.6, sp: M.POP });
    M.vis($('#xp'), t, tX0 + 0.35, 1e9, { dx: 60, dy: 0 });
    XI.forEach((_, k) => {
      const tin = k ? tX[k - 1] : tX0 + 0.5, tout = k < 4 ? (k ? tX[k] : tX[0]) - 0.14 : 1e9;
      const pn = $('#xn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pe'), t, k === 2 ? tTwo - 0.2 : tin + 0.62, tout, { dy: 18, ...oo });
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
      const el = $('#o' + i); M.vis(el, t, tQ + 1.5 + i * 0.08, 1e9, { dy: 40 });
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
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.28));
M.sfx(tAns + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
