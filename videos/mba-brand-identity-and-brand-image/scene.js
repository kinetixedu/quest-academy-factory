// MBA - Marketing Management, Ep 21: Brand Identity and Brand Image (Laddoo Lab)
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', goldD: '#8F6620', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', red2: '#E7B9AB', navy2: '#24345A', cream: '#F3EAD6', cocoa: '#6B4A2E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

Object.assign(M.IC, {
  laddoo: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.5 9h.01', 'M13 7.5h.01', 'M15.5 12h.01', 'M11 12.5h.01', 'M8 15h.01', 'M13 16.5h.01'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  repeat: ['m17 2 4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'm7 22-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  smile: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
  eye: ['M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'],
  plane: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'],
  send: ['M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z', 'm21.854 2.147-10.94 10.939'],
  quote: ['M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z', 'M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'],
  cross: ['M8 3h8v5h5v8h-5v5H8v-5H3V8h5z'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}ll-${n}-face.jpg)`;

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tExp = wt('H2', 'expensive');
const tWants = wt('C2', 'wants'), tThink = wt('C2', 'think'), tSame = wt('C2', 'same');
const tL1 = T0('L1'), tL2 = T0('L2'), tL3 = T0('L3'), tLastW = [wt('L1', 'name'), wt('L1', 'logo'), wt('L1', 'colours'), wt('L1', 'tagline')], tMsg = wt('L2', 'message'), tThirty = wt('L3', 'thirty');
const tAout = tL1 - 0.32, tLout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tD3 = T0('D3'), tD4 = T0('D4'), tD5 = T0('D5'), tDout = T0('M0') - 0.32;
const tSends = wt('D2', 'sends'), tMinds = wt('D3', 'minds'), tKel = wt('D4', 'Keller'), tSent = wt('D5', 'sent'), tRecv = wt('D5', 'received');
const tM0 = T0('M0'), tMl = Array.from({ length: 9 }, (_, i) => T0('M' + (i + 1))), tMout = T0('T1') - 0.32;
const tAns = wt('M2', 'answers'), tExpM = wt('M3', 'expensive'), tGrand = wt('M3', 'grandparents'), tCounts = wt('M4', 'counts'), tMatch = wt('M5', 'match'), tHonest = wt('M5', 'honest'), tGap = wt('M6', 'gap');
const tTwenty = wt('M7', 'twenty'), tPosts = wt('M8', 'posts'), tInside = wt('M8', 'inside'), tAgain = wt('M9', 'again'), tDrops = wt('M9', 'drops');
const tT = T0('T1'), tSt2 = wt('T1', 'Customers'), tP0 = T0('P0'), tTu = tP0 - 0.32;
const tP = [1, 2, 3, 4, 5, 6].map(i => T0('P' + i)), tPout = T0('K0') - 0.32;
const tK0 = T0('K0'), tK = [1, 2, 3, 4].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'bank'), wt('K2', 'food'), wt('K3', 'airline'), wt('K4', 'hospital')];
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6'), tX7 = T0('X7');
const tXg = [wt('X2', 'Listening'), wt('X2', 'fix')], tXh = [wt('X3', 'slowly'), wt('X3', 'spreads')];
const tDevX = wt('X4', 'Dev'), tZoyaX = wt('X4', 'Zoya'), tKids = wt('X5', 'kids'), tAct = wt('X6', 'Keller');
const tXout = tX7 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAnsQ = T0('A1') - 0.02, tTakeQ = wt('A1', 'how');
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [[wt('S2', 'sends')], [wt('S3', 'receive')], [wt('S4', 'listening'), wt('S4', 'honest')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
const logo = () => `<g><circle cx="56" cy="64" r="44" fill="${C.gold}" stroke="${C.goldD}" stroke-width="4"/><g fill="${C.goldD}"><circle cx="40" cy="52" r="5.5"/><circle cx="66" cy="58" r="5"/><circle cx="50" cy="80" r="5.5"/><circle cx="74" cy="82" r="4.5"/></g>
  <path d="M84 30 C92 10 112 6 118 4 C118 20 110 40 88 42 Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M88 40 C96 28 104 18 114 9" fill="none" stroke="${C.cream}" stroke-width="2.5" stroke-linecap="round"/></g>`;
// A
const WR = [['leaf', 'Healthy'], ['shield', 'Honest'], ['home', 'Home-made']];
$('#wRows').innerHTML = WR.map(([ic, w], i) => `<div class="wr" id="wr${i}" style="top:${100 + i * 116}px"><i>${M.icon(ic, 30, C.gold, 2.2)}</i><span>${w}</span></div>`).join('') +
  `<div class="pill" id="idP" style="left:48px;top:460px;background:#B8862F;color:#fff">${M.icon('send', 22, '#fff', 2.4)}<span>What the brand sends</span></div>`;
$('#bigSI').innerHTML = M.icon('repeat', 22, C.red, 2.4);
const METH = [['send', 'Wanted', 0], ['eye', 'Seen', 1]];
$('#meth').innerHTML = METH.map(([ic, m, bad], i) => `<div class="stp" id="mt${i}" style="top:76px;${bad ? 'background:#F6E3DC;color:#B5482F' : ''}">${M.icon(ic, 26, bad ? C.red : C.gold, 2.4)}<span>${m}</span></div>`).join('');
// L
$('#lstS').innerHTML = `<rect width="160" height="160" rx="24" fill="${C.cream}"/><g transform="translate(18 12) scale(1.08)">${logo()}</g>
  <text x="196" y="66" font-family="Poppins" font-weight="700" font-size="54" letter-spacing="-1" fill="#14213D">Laddoo Lab</text>
  <text x="198" y="104" font-family="Poppins" font-weight="500" font-size="22" fill="#B8862F">The healthy sweet for tiffin boxes</text>
  ${['NAME', 'LOGO', 'COLOURS', 'TAGLINE'].map((n, i) => `<g id="lt${i}" transform="translate(${198 + i * 124} 124)"><rect width="112" height="32" rx="16" fill="#F3EAD6"/><text x="56" y="21" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="12" letter-spacing="1.6" fill="#B8862F">${n}</text></g>`).join('')}`;
$('#qPI').innerHTML = M.icon('users', 20, '#fff', 2.4);
$('#pdots').innerHTML = Array.from({ length: 30 }, (_, i) => `<div class="pdot" id="pd${i}" style="left:${36 + (i % 15) * 47}px;top:${150 + Math.floor(i / 15) * 44}px"></div>`).join('');
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#tgSI').innerHTML = M.icon('send', 20, '#fff', 2.4); $('#tgRI').innerHTML = M.icon('eye', 20, C.gold2, 2.4); $('#kelI').innerHTML = M.icon('quote', 32, C.gold, 2);
const SWL = [['Healthy', 0], ['Honest', 0], ['Home-made', 0]], SWR = [['Healthy', 0], ['Tasty', 0], ['Expensive', 1]];
$('#swL').innerHTML = SWL.map(([w], i) => `<div class="mw" id="wl${i}" style="background:#F3EAD6;color:#14213D">${w}</div>`).join('');
$('#swR').innerHTML = SWR.map(([w, b], i) => `<div class="mw" id="wrr${i}" style="${b ? 'background:#F6E3DC;color:#B5482F' : 'background:#FFFFFF;color:#14213D'}">${w}</div>`).join('');

/* M: the survey */
const CH = [['Healthy', 0], ['Tasty', 3], ['Home-made', 1], ['Healthy', 0], ['Tasty', 3], ['Healthy', 0], ['Home-made', 1], ['Tasty', 3], ['Healthy', 0], ['Home-made', 1],
  ['Expensive', 4], ['Expensive', 4], ['For grandparents', 5], ['Expensive', 4], ['Honest', 2], ['For grandparents', 5], ['Expensive', 4]];
$('#cloud').innerHTML = `<div class="serif" id="svQ" style="position:absolute;left:48px;top:86px;font-size:40px;white-space:nowrap">"What three words come <span class="acc">to mind?"</span></div>` +
  CH.map(([w, k], i) => `<div class="wc" id="wc${i}" style="${k >= 4 ? 'background:#F6E3DC;color:#B5482F' : k === 2 ? 'background:#F3EAD6' : ''}">${w}</div>`).join('');
const WORDS = ['Healthy', 'Home-made', 'Honest', 'Tasty', 'Expensive', 'For grandparents'], WANT = [1, 1, 1, 0, 0, 0];
const BEF = [22, 16, 3, 18, 15, 6], AFT = [23, 16, 12, 19, 6, 3];
$('#bars').innerHTML = WORDS.map((w, i) => `<div class="br" id="br${i}" style="top:${140 + i * 66}px"><div class="bg"></div><div class="bn">${w}</div>${WANT[i] ? '<div class="bw">WANTED</div>' : ''}<div class="bt"></div><div class="bf"></div><div class="bgh"></div><div class="bc">0</div><div class="gap"></div></div>`).join('');
$('#acP').innerHTML = `<g transform="translate(90 6) scale(1.0)"><path d="M14 20 L146 20 L152 252 Q152 262 142 262 L18 262 Q8 262 8 252 Z" fill="${C.ink}"/><rect x="10" y="6" width="140" height="22" rx="5" fill="${C.navy2}"/>
  <g transform="translate(48 40) scale(0.5)">${logo()}</g><text x="80" y="126" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="17" letter-spacing="1.5" fill="${C.cream}">LADDOO LAB</text>
  <rect x="10" y="150" width="140" height="44" fill="${C.gold}"/><text id="pr20" x="80" y="179" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="16" letter-spacing="1" fill="#fff">₹20 A LADDOO</text></g>`;
$('#acQ').innerHTML = `<g transform="translate(80 0)"><rect x="0" y="0" width="180" height="300" rx="26" fill="${C.ink}"/><rect x="10" y="20" width="160" height="260" rx="14" fill="#FFFFFF"/>
  <rect x="22" y="34" width="136" height="110" rx="10" fill="${C.cream}"/>
  <g transform="translate(46 64)"><circle r="18" fill="${C.cocoa}" stroke="#4A3220" stroke-width="2.5"/></g><g transform="translate(90 80)"><circle r="18" fill="${C.cocoa}" stroke="#4A3220" stroke-width="2.5"/></g><g transform="translate(134 64)"><circle r="18" fill="#A8713A" stroke="#7E5428" stroke-width="2.5"/></g>
  <text x="90" y="132" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="12" letter-spacing="1.5" fill="#B8862F">KIDS' LUNCH</text>
  <g id="ins">${['RAGI', 'COCOA', 'JAGGERY'].map((n, i) => `<g transform="translate(22 ${162 + i * 34})"><circle cx="8" cy="8" r="8" fill="#B8862F"/><path d="M4 8 l3 3 l5 -6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><text x="26" y="13" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="1.5" fill="#14213D">${n}</text></g>`).join('')}</g></g>`;

/* P: the prism (pointy hexagon, centre 344,236, r 176) */
const HX = 344, HY = 238, HR = 196, V = k => { const a = (-90 + 60 * k) * Math.PI / 180; return [HX + HR * Math.cos(a), HY + HR * Math.sin(a)]; };
const FAC = [ // [triangle index, label, name, meaning, example, icon, side]
  [5, 'PHYSIQUE', 'Physique', 'How it looks', 'The navy pack and the laddoo logo', 'package', 'SENDER'],
  [0, 'PERSONALITY', 'Personality', 'If it were a person', 'Warm and honest, like Nani', 'smile', 'SENDER'],
  [1, 'CULTURE', 'Culture', 'Its values', 'No shortcuts, real ingredients', 'leaf', 'SENDER'],
  [4, 'RELATIONSHIP', 'Relationship', 'What it does for you', 'A helping hand on busy mornings', 'heart', 'SENDER AND RECEIVER'],
  [3, 'REFLECTION', 'Reflection', 'The typical buyer', 'A busy parent who cares', 'users', 'RECEIVER'],
  [2, 'SELF-IMAGE', 'Self-image', 'How buyers see themselves', '"I am a good parent"', 'user', 'RECEIVER'],
];
$('#pzS').innerHTML = FAC.map(([k, l], i) => { const [x1, y1] = V(k), [x2, y2] = V(k + 1), am = (-60 + 60 * k) * Math.PI / 180, lr = (k === 1 || k === 4) ? 94 : 124, lx = HX + lr * Math.cos(am), ly = HY + lr * Math.sin(am);
  return `<path id="tri${i}" d="M${HX} ${HY} L${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="#F5F1E8" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"/><text id="ftx${i}" x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="1.2" fill="#B9B1A3">${l}</text>`; }).join('') +
  `<circle cx="${HX}" cy="${HY}" r="58" fill="#FFFFFF" stroke="#E2DACB" stroke-width="3"/><g transform="translate(${HX - 39} ${HY - 44}) scale(0.68)">${logo()}</g>
   <text x="${HX}" y="24" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="15" letter-spacing="2.4" fill="#B8862F">SENDER · WHAT WE SHOW</text>
   <text x="${HX}" y="468" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="15" letter-spacing="2.4" fill="#14213D">RECEIVER · WHAT THEY TAKE IN</text>`;
const PP = [['JEAN-NOËL KAPFERER', 'Six sides', 'of one brand identity', 'TOP: SENT · BOTTOM: RECEIVED', 'repeat', 'Who we are, and who our buyer is']].concat(FAC.map((f, i) => [`FACET 0${i + 1} / 06 · ${f[6]}`, f[2], f[3], 'AT LADDOO LAB', f[5], f[4]]));
$('#ppPans').innerHTML = PP.map(([s, t, m, x, ic, e], i) => `<div class="pn" id="pq${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div><div class="pe"><i>${M.icon(ic, 34, C.gold, 2.2)}</i><span>${e}</span></div></div>`).join('');
wrap($('#pz'), 'pzOut', 784, 580);

// K
const KA = [
  ['send', 'Identity', 'What you choose to send', 'Healthy, honest, home-made', 'bank', 'A bank chooses modern and friendly'],
  ['eye', 'Image', 'What people really think', 'Healthy and tasty, but expensive', 'phone', 'A delivery app reads every review'],
  ['target', 'The gap', 'Where the two differ', 'Honest: wanted, but rarely said', 'plane', 'An airline: premium hopes, late flights'],
  ['check', 'Closing it', 'Honest action, not slogans', '₹20 a laddoo, shown clearly', 'cross', 'A hospital shows its prices clearly'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${100 + i * 120}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['IDENTITY AND IMAGE TODAY', 'Sent vs seen', 'Every brand lives with both', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 04`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('laddoo', 34, C.gold, 2.2)}</i><div class="kl">AT LADDOO LAB</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A LADDOO BRAND TO A HOSPITAL</div><div class="pe"><i>${M.icon('eye', 34, C.gold, 2.2)}</i><span>Say it, then check what was heard</span></div>`) + `</div>`).join('');

// X
const XG = [['search', 'Shows what to fix'], ['target', 'A clear next step']];
const XH = [['clock', 'Image changes slowly'], ['megaphone', 'Bad news spreads']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 60}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 60}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="52" width="36" height="34" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
$('#mini').innerHTML = `<defs><clipPath id="nc"><circle cx="64" cy="112" r="36"/></clipPath></defs><rect width="240" height="312" rx="20" fill="#F5F1E8"/>
  <text x="24" y="40" font-family="Poppins" font-weight="600" font-size="14" letter-spacing="2" fill="#8A8274">THE POSTS</text>
  <rect id="t1" x="16" y="58" width="208" height="110" rx="16" fill="#FFFFFF" stroke="#E2DACB" stroke-width="3"/>
  <image href="${IMG}ll-nani-face.jpg" x="28" y="76" width="72" height="72" clip-path="url(#nc)"/>
  <text x="112" y="108" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="1.5" fill="#14213D">NANI'S</text><text x="112" y="128" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="1.5" fill="#14213D">RECIPE</text>
  <g id="t2"><rect x="16" y="184" width="208" height="110" rx="16" fill="#FFFFFF" stroke="#B8862F" stroke-width="3"/>
  <circle cx="50" cy="226" r="16" fill="${C.cocoa}" stroke="#4A3220" stroke-width="2.5"/><circle cx="84" cy="244" r="16" fill="#A8713A" stroke="#7E5428" stroke-width="2.5"/>
  <text x="112" y="234" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="1.5" fill="#14213D">KIDS'</text><text x="112" y="254" font-family="Poppins" font-weight="700" font-size="13" letter-spacing="1.5" fill="#14213D">LUNCH</text></g>`;
$('#bb2I').innerHTML = M.icon('check', 22, '#fff', 3); $('#factI').innerHTML = M.icon('quote', 30, C.ink, 2);
$('#bothI').innerHTML = M.icon('eye', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);

// quiz + recap
const OPTS = ['Brand identity', 'Brand image', 'Brand name', 'Brand logo'], RIGHT = 1;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('eye', 44, C.gold2, 2.4);
const ROWS = [['send', 'Identity: what you send', ['Sent']], ['eye', 'Image: what they remember', ['Received']], ['search', 'Find the gap, then close it', ['Listen', 'Act honestly']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const attr = (el, a, v) => { if (el['_' + a] !== v) { el['_' + a] = v; el.setAttribute(a, v); } };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 36; for (let i = 0; i < 2; i++) { const p = $('#mt' + i); p.style.left = x + 'px'; x += p.offsetWidth + 16; }
  // message chips sit on the lane in the middle of the sender/receiver card
  
  // word cloud: flow layout under the question
  x = 48; let y = 170; geo.wc = CH.map((_, i) => { const el = $('#wc' + i), wd = el.offsetWidth; if (x + wd > 752) { x = 48; y += 62; } const p = [x, y]; x += wd + 12; return p; });
  geo.wc.forEach(([px, py], i) => { const el = $('#wc' + i); el.style.left = px + 'px'; el.style.top = py + 'px'; });
  { const q = $('#svQ'); if (q.offsetWidth > 704) q.style.fontSize = Math.floor(40 * 704 / q.offsetWidth) + 'px'; }
  { const k = $('#kel .kt'); if (k.offsetWidth > 1360) k.style.fontSize = Math.floor(28 * 1360 / k.offsetWidth) + 'px'; }
  document.querySelectorAll('#ppPans .pt').forEach(el => { if (el.offsetWidth > 688) el.style.fontSize = Math.floor(84 * 688 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#ppPans .pe span').forEach(el => { if (el.offsetWidth > 580) el.style.fontSize = Math.floor(32 * 580 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.xr .bb').forEach(el => { if (el.offsetWidth > 332) el.style.fontSize = Math.floor(22 * 332 / el.offsetWidth) + 'px'; });
  { const k = $('#fact .kt'); if (k.offsetWidth > 560) k.style.fontSize = Math.floor(28 * 560 / k.offsetWidth) + 'px'; }
  { let f = 40; OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) f = Math.min(f, Math.floor(40 * 312 / o.offsetWidth)); }); OPTS.forEach((_, i) => { $('#o' + i + ' .ot').style.fontSize = f + 'px'; }); }
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [[tXg[0] + 0.1, -6], [tXg[1] + 0.1, -12], [tXh[0] + 0.1, -6], [tXh[1] + 0.1, 0]], M.SOFT);

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.07, sp: M.HEAVY, out: tQ - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(geo.cy, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tQ - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ruleL'), t, 0.95, 0.7, M.o3);
  M.vis($('#rule'), t, 0.9, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.15, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });
  M.vis($('#exChip'), t, tAns - 0.2, tMout, { dy: 10, outDur: 0.3 });

  /* ===== A ===== */
  const aOn = t < tL1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    for (let i = 0; i < 3; i++) M.vis($('#wr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 });
    M.vis($('#idP'), t, tWants - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ways'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    M.rise($('#bigQ'), t, tMorph + 0.6, { st: 0.05, out: tExp - 0.4, outDur: 0.2 });
    M.rise($('#bigW'), t, Math.max(tMorph + 0.6, tExp - 0.1), { st: 0.06, sp: M.HEAVY });
    M.vis($('#bigS'), t, Math.max(tMorph + 0.9, tExp + 0.3), 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#ask'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    M.vis($('#mt0'), t, tMorph + 0.8, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#mt1'), t, tExp - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.rise($('#askT'), t, tSame - 0.6, { st: 0.07, sp: M.HEAVY });
  }

  /* ===== L ===== */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.2; M.hide($('#sL'), !lOn);
  if (lOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#ill'), t, tL1 + 0.1, tLout, { dy: 36, ...o });
    M.vis($('#illImg'), t, tL1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#lst'), t, tL1 + 0.25, tLout, { dx: 60, dy: 0, ...o });
    M.vis($('#lstS'), t, tL1 + 0.45, 1e9, { dy: 12 });
    for (let i = 0; i < 4; i++) { const g = $('#lt' + i), on = M.io((t - tLastW[i]) / 0.25); attr(g.querySelector('rect'), 'fill', mix(C.gold3, C.gold, on)); attr(g.querySelector('text'), 'fill', mix(C.gold, '#FFFFFF', on)); }
    M.vis($('#qst'), t, tL2 + 0.05, tLout, { dy: 36, ...o });
    M.rise($('#qT'), t, tMsg - 0.3, { st: 0.06, sp: M.HEAVY });
    M.vis($('#qP'), t, tThirty - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    for (let i = 0; i < 30; i++) { const d = $('#pd' + i); M.vis(d, t, tThirty + i * 0.03, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.06 }); d.style.background = mix(C.line, C.ink2, M.io((t - tThirty - 0.9 - i * 0.03) / 0.2)); }
  }

  /* ===== D ===== */
  const dOn = t >= tD1 - 0.1 && t < tM0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    M.vis($('#sr'), t, tD2 + 0.05, tDout, { dy: 36, ...o });
    M.vis($('#sbL'), t, tD2 + 0.25, 1e9, { dx: -30, dy: 0 });
    M.vis($('#sbR'), t, tD3 + 0.05, 1e9, { dx: 30, dy: 0 });
    M.vis($('#tgS'), t, tSent - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.vis($('#tgR'), t, tRecv - 0.1, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    M.draw($('#srL'), t, tSends - 0.1, 0.6, M.o3); M.vis($('#srH'), t, tSends + 0.4, 1e9, { dy: 0, fade: 0.1 });
    for (let i = 0; i < 3; i++) M.vis($('#wl' + i), t, tSends - 0.3 + i * 0.12, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    for (let i = 0; i < 3; i++) M.vis($('#wrr' + i), t, tMinds - 0.6 + i * 0.25, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
    for (let i = 0; i < 4; i++) { const c = $('#pl' + i), ts = tSends + 0.3; if (t < ts) { M.hide(c, true); continue; } const u = ((t - ts) * 0.45 + i * 0.25) % 1; M.hide(c, false); attr(c, 'cx', (560 + 470 * u).toFixed(1)); c.style.opacity = Math.min(1, u * 6, (1 - u) * 6).toFixed(3); }
    M.vis($('#kel'), t, tKel - 0.1, 1e9, { dy: 20 });
  }

  /* ===== M: the survey ===== */
  const mOn = t >= tM0 - 0.1 && t < tT + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#sv'), t, tM0 + 0.05, tMout, { dy: 36, ...o });
    M.vis($('#svL'), t, tM0 + 0.3, 1e9, { dy: 8 }); M.vis($('#svV'), t, tM0 + 0.3, 1e9, { dy: 0 });
    const cloudOut = tMl[6] - 0.1;
    M.rise($('#svQ'), t, tMl[0] + 0.3, { st: 0.05, sp: M.HEAVY, out: cloudOut, outDur: 0.25 });
    const t2 = [], n2 = 10; for (let i = 0; i < n2; i++) t2.push(tAns + 0.2 + i * Math.max(0.12, (T1('M2') - tAns - 0.3) / n2));
    const t3 = [tExpM, tExpM + 0.25, tGrand, tExpM + 0.5, tGrand + 0.3, tGrand + 0.55, tExpM + 0.75];
    CH.forEach(([w, k], i) => {
      const el = $('#wc' + i), ta = i < 10 ? t2[i] : t3[i - 10];
      M.vis(el, t, ta, cloudOut, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08, outDur: 0.25 });
      const cnt = M.io((t - tCounts - 0.05 * i) / 0.25);
      if (cnt > 0) { el.style.background = mix(k >= 4 ? C.redBg : k === 2 ? C.gold3 : C.paper, C.paper2, cnt); el.style.color = mix(k >= 4 ? C.red : C.ink, C.dim, cnt); }
    });
    // fixes
    M.vis($('#ac0'), t, tMl[6] + 0.1, 1e9, { dy: 24 }); M.vis($('#ac1'), t, tPosts - 0.1, 1e9, { dy: 24 });
    M.vis($('#pr20'), t, tTwenty - 0.1, 1e9, { dy: 0, fade: 0.2 });
    M.vis($('#ins'), t, tInside - 0.2, 1e9, { dy: 0, fade: 0.2 });
    // comparison bars
    M.vis($('#cmpL'), t, tM0 + 0.35, 1e9, { dy: 8 });
    for (let h = 0; h < 3; h++) M.vis($('#hd' + h), t, tMl[0] + 0.3 + h * 0.06, 1e9, { dy: 8 });
    const resurvey = M.io((t - tDrops + 0.3) / 1.0);
    WORDS.forEach((_, i) => {
      const el = $('#br' + i); M.vis(el, t, tMl[0] + 0.4 + i * 0.1, 1e9, { dy: 14 });
      const grow1 = M.o3((t - tCounts - 0.2 - i * 0.12) / 0.9), v = BEF[i] * grow1 + (AFT[i] - BEF[i]) * resurvey;
      el.querySelector('.bf').style.width = (300 * v / 30).toFixed(1) + 'px';
      el.querySelector('.bf').style.background = i >= 4 ? C.red2 : (i === 2 ? (resurvey > 0.5 ? C.gold : C.dim) : C.gold);
      M.setT(el.querySelector('.bc'), String(Math.round(v)));
      const gh = el.querySelector('.bgh'); gh.style.left = (330 + 300 * BEF[i] / 30 - 2).toFixed(1) + 'px'; M.hide(gh, t < tAgain); gh.style.opacity = M.clamp((t - tAgain) / 0.2).toFixed(3);
      const match = (i === 0 || i === 1) ? M.io((t - tMatch) / 0.3) : 0, fixed = i === 2 ? resurvey : 0;
      el.querySelector('.bg').style.background = mix(mix(C.paper, C.gold3, match), C.gold3, fixed);
      const isGap = i === 2 ? tHonest : i === 4 ? tGap : null, g = el.querySelector('.gap');
      if (isGap) { const u = M.io((t - isGap) / 0.25) * (1 - resurvey * 0.85); g.style.opacity = u.toFixed(3); M.hide(g, u <= 0.01); } else M.hide(g, true);
    });
  }

  /* ===== statement ===== */
  const sx = sweepX(t);
  const sw = $('#sweep'); M.hide(sw, sx === null); if (sx !== null) sw.style.transform = `translateX(${sx.toFixed(1)}px)`;
  const stOn = t >= tT && t < tTu + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    stmt.style.transform = t > tTu ? `translateX(${(sx ?? -1960).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 });
    M.rise($('#st2'), t, tSt2 - 0.05, { st: 0.08, sp: M.HEAVY });
  }

  /* ===== P: the prism ===== */
  const pOn = t >= tTu - 0.05 && t < tK0 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    const pz = $('#pz'); M.vis(pz, t, tP0 + 0.05, tPout, { dy: 36, ...o }); grow(pz, $('#pzOut'), t, tP[0]);
    M.vis($('#pzS'), t, tP0 + 0.25, 1e9, { dy: 16, sp: M.SOFT });
    FAC.forEach((_, i) => {
      const ta = tP[i], td = i < 5 ? tP[i + 1] : tPout + 1, act = M.io((t - ta) / 0.3) * (1 - M.io((t - td) / 0.3)), done = t >= td ? 1 : 0;
      attr($('#tri' + i), 'fill', mix(mix(C.paper, C.gold3, done), C.ink, act));
      attr($('#ftx' + i), 'fill', act > 0.5 ? C.gold2 : (t >= ta ? C.gold : C.dim));
    });
    M.vis($('#pp'), t, tP[0] + 0.12, tPout, { dx: 60, dy: 0, ...o });
    PP.forEach((_, k) => {
      const tin = k ? tP[k - 1] : tP[0] - 0.4, tout = k < 6 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pq' + k), off = t < tin - 0.01 || t > tout + 0.3 || (k === 0); M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
      M.vis(pn.querySelector('.pe'), t, tin + 0.6, tout, { dy: 18, ...oo });
    });
  }

  /* ===== K ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    KA.forEach(([ic], i) => {
      const el = $('#kr' + i), ta = tK[i], td = i < 3 ? tK[i + 1] : tKout + 1;
      M.vis(el, t, tK0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
      const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
      el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
      el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
      el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
      el.querySelector('.ri').style.background = mix('#fff', C.navy2, act);
      setIco(el.querySelector('.ri'), ic, t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2);
    });
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 4 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return;
      const oo = { outDur: 0.18, ody: -12 };
      M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
      M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
      M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
      M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
      if (k === 0) { M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo }); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.7, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    attr($('#beam'), 'transform', `rotate(${a.toFixed(3)} 344 40)`);
    attr($('#panL'), 'transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    attr($('#panR'), 'transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      M.vis($('#xg' + i), t, tXg[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#xh' + i), t, tXh[i] - 0.05, 1e9, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#xw'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    M.vis($('#mini'), t, tX4 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    attr($('#t1'), 'stroke', t > tZoyaX ? C.gold : t > tDevX + 0.2 ? C.red : C.line);
    attr($('#t1'), 'stroke-dasharray', t > tDevX + 0.2 && t <= tZoyaX ? '6 8' : 'none');
    M.vis($('#t2'), t, tKids - 0.1, 1e9, { dy: 0, fade: 0.2 });
    for (let i = 0; i < 3; i++) M.vis($('#xr' + i), t, [tDevX, tZoyaX, T0('X5')][i] - 0.1, 1e9, { dx: 24, dy: 0 });
    $('#bb0').style.background = t > tZoyaX ? C.redBg : C.paper; $('#bb0').style.color = t > tZoyaX ? C.red : C.ink;
    M.vis($('#fact'), t, tAct - 0.1, 1e9, { dy: 16 });
    M.vis($('#lesson'), t, tX7 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX7 + 0.15, 1e9, { dy: 40 });
  }

  /* ===== quick check ===== */
  const qOn = t >= tQ && t < tS; M.hide($('#quiz'), !qOn);
  if (qOn) {
    const tq = tQ + 0.12;
    M.vis($('#qchip'), t, tq + 0.05, 1e9, { dy: 16 });
    M.rise($('#qq1'), t, tq + 0.12, { st: 0.05, sp: M.HEAVY });
    M.rise($('#qq2'), t, wt('Q1', 'identity') - 0.05, { st: 0.06, sp: M.HEAVY });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 1.5 + i * 0.08, 1e9, { dy: 40 });
      const right = i === RIGHT, r = M.io((t - tAnsQ) / 0.3), bg = el.querySelector('.bg');
      bg.style.background = right ? mix(C.card, C.ink, r) : mix(C.card, '#F0EBE1', r);
      bg.style.borderColor = right ? mix(C.line, C.ink, r) : mix(C.line, '#EAE3D6', r);
      el.querySelector('.ot').style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? mix(C.paper, C.gold, r) : C.paper; lt.style.color = right ? mix(C.ink, '#fff', r) : mix(C.ink, C.dim, r);
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAnsQ + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAnsQ && t < tAnsQ + 0.45) el.style.transform = `scale(${(1 + 0.05 * Math.sin(Math.PI * (t - tAnsQ) / 0.45)).toFixed(4)})`;
      else if (right && t >= tAnsQ + 0.45 && el.style.transform !== 'none') el.style.transform = 'none';
    });
    const cd = tAnsQ - tCount, u = M.clamp((t - tCount) / cd);
    M.vis($('#ring'), t, tCount - 0.15, tAnsQ, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAnsQ, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAnsQ + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTakeQ, 1e9, { dy: 40 });
    M.rise($('#takeT'), t, tTakeQ + 0.1, { st: 0.045 });
  }

  /* ===== recap ===== */
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

M.sfx(tT - 0.38, 'whoosh', 0.22); M.sfx(tQ - 0.38, 'whoosh', 0.22); M.sfx(tS - 0.38, 'whoosh', 0.22);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAnsQ - tCount) / 3, 'tick', 0.28));
M.sfx(tAnsQ + 0.05, 'correct', 0.32);
M.outro({ bg: '#14213D', ink: '#FFFFFF', accent: '#B8862F', sub: 'rgba(233,217,181,.75)', font: 'Poppins' });
})();
