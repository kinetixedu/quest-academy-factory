// MBA - Principles of Management, Ep 16: Organizing and Departmentation
(() => {
const { $ } = M;
const C = { ink: '#14213D', ink2: '#3A4560', muted: '#8A8274', dim: '#B9B1A3', gold: '#B8862F', gold2: '#E9D9B5', gold3: '#F3EAD6', paper: '#F5F1E8', paper2: '#EEE8DB', card: '#FFFFFF', line: '#E2DACB', red: '#B5482F', redBg: '#F6E3DC', navy2: '#24345A', navy3: '#2C3B5E' };
const wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;

/* extra line icons (24-unit, lucide style) */
Object.assign(M.IC, {
  cup: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  milk: ['M8 2h8', 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2', 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  network: ['M16 16h6v6h-6z', 'M2 16h6v6H2z', 'M9 2h6v6H9z', 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3', 'M12 12V8'],
  key: ['m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4', 'm21 2-9.6 9.6', 'M7.5 22a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'],
  list: ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'],
  layers: ['m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
  link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  pin: ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6'],
  tag: ['M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z', 'M7.5 7.5h.01'],
  shuffle: ['m18 14 4 4-4 4', 'm18 2 4 4-4 4', 'M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22', 'M2 6h1.972a4 4 0 0 1 3.6 2.2', 'M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  crown: ['M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z', 'M5 21h14'],
  award: ['m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526', 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  wall: ['M3 3h18v18H3z', 'M3 9h18', 'M3 15h18', 'M9 3v6', 'M15 9v6', 'M9 15v6'],
  truck: ['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z', 'M17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
  bank: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7H4z'],
  scissors: ['M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M8.12 8.12 12 12', 'M20 4 8.12 15.88', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M14.8 14.8 20 20'],
  briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  scale: ['m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z', 'M7 21h10', 'M12 3v18', 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2'],
});
const IMG = '../../assets/illustrations/mba/';
const FACE = n => `background-image:url(${IMG}${n}-face.jpg)`;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.25, tMorph = T0('H2') + 0.02, tSure = wt('H2', 'sure');
const tC1 = T0('C1'), tWash = wt('C1', 'washes'), tC2 = T0('C2'), tSour = wt('C2', 'sour'), tC3 = T0('C3'), tQues = wt('C3', 'question');
const tB1 = T0('B1'), tAout = tB1 - 0.32, tT = T0('T1'), tSt2 = wt('T1', 'He'), tTu = tB1 - 0.32;
const tB2 = T0('B2'), tLg = [wt('B2', 'Milk'), wt('B2', 'Cups'), wt('B2', 'money')], tB3 = T0('B3'), tNobody = wt('B3', 'Nobody'), tBout = T0('D1') - 0.32;
const tD1 = T0('D1'), tD2 = T0('D2'), tArr = wt('D2', 'arranging'), tPlanD = wt('D2', 'plan'), tD3 = T0('D3'), tD = [T0('D3'), T0('D4'), T0('D5')], tDout = T0('F0') - 0.32;
const tDex = [wt('D3', 'what'), wt('D4', 'power'), wt('D5', 'reports')];
// F
const tF0 = T0('F0'), tF = [1, 2, 3, 4, 5].map(i => T0('F' + i)), tFout = T0('G0') - 0.32;
const tAct = [wt('F1', 'Boil'), wt('F1', 'serve'), wt('F1', 'take'), wt('F1', 'wash'), wt('F1', 'buy'), wt('F1', 'buy') + 0.45];
const tGroup = wt('F2', 'Group'), tAshaF = wt('F3', 'Asha'), tKabirF = wt('F3', 'Kabir'), tHand = wt('F4', 'handing'), tAsha4 = wt('F4', 'Asha'), tLink = wt('F5', 'Link'), tTeam = wt('F5', 'team');
// G + P
const tG0 = T0('G0'), tG1 = T0('G1'), tP = [1, 2, 3, 4, 5].map(i => T0('P' + i)), tPout = T0('W1') - 0.32;
const tPw = [['Kitchen', 'cash', 'counter'].map(w => wt('P1', w)), [wt('P2', 'first'), wt('P2', 'bus')], [wt('P3', 'Chai'), wt('P3', 'snacks')], [wt('P4', 'Walk'), wt('P4', 'bulk')], ['Boil', 'brew', 'serve'].map(w => wt('P5', w))];
// W
const tW1 = T0('W1'), tMixes = wt('W1', 'mixes'), tW2 = T0('W2'), tStall = wt('W2', 'stall'), tBusW = wt('W2', 'bus'), tJobs = wt('W2', 'jobs'), tW3 = T0('W3'), tQW = wt('W3', 'question'), tMeenaW = wt('W3', 'Meena'), tWout = T0('K0') - 0.32;
// K
const tK0 = T0('K0'), tK = [1, 2, 3, 4, 5].map(i => T0('K' + i)), tKout = T0('X1') - 0.32;
const tKw = [wt('K1', 'company'), wt('K2', 'bank'), wt('K3', 'vehicle'), wt('K4', 'bank'), wt('K5', 'garment')];
// X
const tX1 = T0('X1'), tX2 = T0('X2'), tX3 = T0('X3'), tX4 = T0('X4'), tX5 = T0('X5'), tX6 = T0('X6');
const tXg = [wt('X2', 'roles'), wt('X2', 'expert')], tXh = [wt('X3', 'think'), wt('X4', 'silos')];
const tBl = [wt('X4', 'blames'), wt('X4', 'blames', 1)], tFay = wt('X5', 'Fayol'), tGang = wt('X5', 'gangplank'), tDirect = wt('X5', 'directly'), tXout = tX6 - 0.15;
const tQ = T0('Q1'), tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02, tTakeQ = wt('A1', 'The') - 0.1;
const tS = T0('S1'), tRow = [T0('S2'), T0('S3'), T0('S4')], tN = T0('N1');
const tPill = [['role', 'authority', 'boss'].map(w => wt('S2', w)), ['function', 'territory', 'product', 'customer', 'process'].map(w => wt('S3', w)), [wt('S4', 'one')]];
const SW = [[tT - 0.42, tTu], [tQ - 0.42, tQ + 0.06], [tS - 0.42, tS + 0.06]];

/* ---------- build ---------- */
const wrap = (card, id, w, h) => { const d = document.createElement('div'); d.id = id; d.className = 'abs'; d.style.cssText = `left:0;top:0;width:${w}px;height:${h}px`; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); };
let aw = ''; for (let i = 0; i < 8; i++) aw += `<path d="M${i * 77} 0 h77 v58 a38.5 26 0 0 1 -77 0 z" fill="${i % 2 ? '#F5F1E8' : '#14213D'}"/>`;
$('#awnG').innerHTML = aw;
const CUPS = [[430, 196], [466, 196], [502, 196], [448, 158], [484, 158]];
$('#cups').innerHTML = CUPS.map(([x, y], i) => `<g id="cup${i}" transform="translate(${x} ${y})"><path d="M-15 -34 h30 l-4 34 h-22 z" fill="#fff" stroke="#3A4560" stroke-width="3" stroke-linejoin="round"/><path d="M-15 -34 h30" stroke="#B8862F" stroke-width="4"/></g>`).join('');
const hlp = (x, y, s = 64, id = '') => `<div class="av ic" ${id ? `id="${id}"` : ''} style="left:${x}px;top:${y}px;width:${s}px;height:${s}px">${M.icon('user', Math.round(s * 0.45), C.muted, 2.2)}</div>`;
// A
const TEAM = ['ravi', 'asha', 'kabir', 'meena', null, null, null, null];
$('#whoAv').innerHTML = TEAM.map((n, i) => n ? `<div class="av face" id="wa${i}" style="left:${36 + i * 84}px;top:88px;width:64px;height:64px;${FACE(n)}">${n[0]}</div>` : hlp(36 + i * 84, 88, 64, 'wa' + i)).join('') +
  TEAM.map((_, i) => `<div class="abs" id="wq${i}" style="left:${36 + i * 84 + 16}px;top:176px;width:32px;height:32px;border-radius:16px;background:#F6E3DC;display:flex;align-items:center;justify-content:center">${M.icon('help', 20, C.red, 2.4)}</div>`).join('');
const OT = [['droplet', 'Nobody washes cups'], ['milk', 'Half the milk sours'], ['help', 'Questions pile up']];
$('#ots').innerHTML = OT.map(([ic, t], i) => `<div class="ot2" id="ot${i}" style="left:${36 + i * 288}px"><i></i><div class="tx2">${t}</div></div>`).join('');
// B
const LG = [['milk', 'Milk, bought twice', 'WASTE'], ['cup', 'Cups ran out at the bus stand', 'SHORT'], ['help', 'Who was in charge?', 'NOBODY']];
$('#lgs').innerHTML = LG.map(([ic, t, tg], i) => `<div class="lg" id="lg${i}" style="top:${92 + i * 100}px"><i>${M.icon(ic, 28, C.red, 2.2)}</i><div class="lt2">${t}</div><div class="vc s rd" id="lt${i}">${tg}</div></div>`).join('');
$('#causeI').innerHTML = M.icon('alert', 32, C.gold2, 2.2);
wrap($('#ill'), 'illOut', 784, 580);
// D
$('#dc0I').innerHTML = M.icon('list', 24, C.gold, 2.2); $('#dc1I').innerHTML = M.icon('layers', 24, C.gold, 2.2); $('#dc2I').innerHTML = M.icon('network', 24, C.gold2, 2.2);
wrap($('#def'), 'defOut', 784, 580);
const TR = [['tag', 'Role', 'What you do', 'Asha: the kitchen'], ['key', 'Authority', 'The power to decide', 'Kabir: signs for cash'], ['network', 'A boss', 'Who you report to', 'Helpers report to Meena']];
$('#tRows').innerHTML = TR.map(([ic, n, s, e], i) => `<div class="tr3" id="tr${i}" style="top:${92 + i * 160}px"><div class="bg"></div><i>${M.icon(ic, 30, C.gold, 2.2)}</i><div class="serif tn">${n}</div><div class="ts">${s}</div><div class="vc" id="te${i}" style="left:auto;right:24px;top:24px">${M.icon('cup', 16, C.gold, 2.2)}<span>${e}</span></div></div>`).join('');
// F: steps + canvas
const ST = ['List the activities', 'Group them', 'Give each an owner', 'Delegate authority', 'Link the groups'];
$('#sRows').innerHTML = ST.map((t, i) => `<div class="pr" id="sr${i}" style="top:${96 + i * 92}px;height:80px"><div class="bg"></div><div class="rn" style="top:27px">0${i + 1}</div><div class="ri" style="top:12px"></div><div class="rt" style="top:21px">${t}</div></div>`).join('');
const GX = [['Kitchen', 'asha'], ['Money', 'kabir'], ['Counter', null]];
$('#gxs').innerHTML = GX.map(([n, f], i) => `<div class="gx" id="gx${i}" style="left:${48 + i * 292}px"><div class="gn">${n}</div>${f ? `<div class="go" id="go${i}" style="${FACE(f)}"></div>` : `<div class="go av ic" id="go${i}" style="position:absolute;box-shadow:0 0 0 3px #B8862F">${M.icon('user', 22, C.muted, 2.2)}</div>`}</div>`).join('');
const ACT = [['flame', 'Boil tea', 0, 0], ['cup', 'Serve', 2, 0], ['coin', 'Take cash', 1, 0], ['droplet', 'Wash cups', 2, 1], ['milk', 'Buy milk', 0, 1], ['list', 'Count sales', 1, 1]];
const SCAT = [[60, 168], [300, 176], [560, 164], [740, 220], [150, 236], [430, 244]];
$('#acs').innerHTML = ACT.map(([ic, t], i) => `<div class="ac" id="ac${i}">${M.icon(ic, 20, C.gold, 2.2)}<span>${t}</span></div>`).join('') +
  `<div class="ac" id="acD" style="background:#B8862F;color:#fff">${M.icon('key', 20, '#fff', 2.2)}<span>Orders milk</span></div>`;
// P: five ways (list + panes with a mini chart)
const PR = [['network', 'Functional'], ['pin', 'Territorial'], ['tag', 'Product'], ['users', 'Customer'], ['shuffle', 'Process']];
$('#pRows').innerHTML = PR.map(([ic, t], i) => `<div class="kr" id="pr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KIDS = [[['flame', 'Kitchen'], ['coin', 'Cash'], ['cup', 'Counter']], [['store', 'First stall'], ['pin', 'Bus stand']], [['cup', 'Chai'], ['tag', 'Snacks']], [['user', 'Walk-in buyers'], ['store', 'Bulk orders']], [['flame', 'Boil'], ['droplet', 'Brew'], ['cup', 'Serve']]];
const tree = (kids, k, seq) => {
  const n = kids.length, w = (848 - (n - 1) * 28) / n, cx = kids.map((_, i) => i * (w + 28) + w / 2);
  const lines = seq ? `<path id="tl${k}" d="M424 48 V80 M${cx[0]} 80 H${cx[n - 1]} M${cx[0]} 80 V112" />` + cx.slice(1).map((x, i) => `<path id="ta${k}${i}" d="M${cx[i] + w / 2 + 4} 144 H${x - w / 2 - 6} M${x - w / 2 - 16} 136 L${x - w / 2 - 6} 144 L${x - w / 2 - 16} 152" />`).join('')
    : `<path id="tl${k}" d="M424 48 V80 M${cx[0]} 80 H${cx[n - 1]} ${cx.map(x => `M${x} 80 V112`).join(' ')}" />`;
  return `<div class="vc nv" id="tr0${k}" style="top:0;left:${424 - 100}px;width:200px;justify-content:center;padding:0">${M.icon('store', 22, C.gold2, 2.2)}<span>Chai Corner</span></div>
    <svg class="abs" style="left:0;top:0" width="848" height="176" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${lines}</svg>` +
    kids.map(([ic, t], i) => `<div class="abs" id="tk${k}${i}" style="left:${(i * (w + 28)).toFixed(0)}px;top:112px;width:${w.toFixed(0)}px;height:64px;border-radius:18px;background:#F5F1E8;display:flex;align-items:center;justify-content:center;gap:10px;font:600 24px Poppins;white-space:nowrap">${M.icon(ic, 24, C.gold, 2.2)}<span>${t}</span></div>`).join('');
};
const PP = [['DEPARTMENTATION', 'Departmentation', 'Grouping activities into departments', 'IN SHORT', null]].concat([
  ['TYPE 01 / 05', 'Functional', 'Group by job'], ['TYPE 02 / 05', 'Territorial', 'Group by place'], ['TYPE 03 / 05', 'Product', 'Group by what you sell'],
  ['TYPE 04 / 05', 'Customer', 'Group by who you serve'], ['TYPE 05 / 05', 'Process', 'Group by the steps of the work']].map((p, i) => [...p, 'AT CHAI CORNER', tree(KIDS[i], i, i === 4)]));
$('#pPans').innerHTML = PP.map(([s, t, m, x, v], i) => `<div class="pn" id="pn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div><div class="px">${x}</div>${v ? `<div class="pv" id="pv${i}">${v}</div>` : `<div class="pe"><i>${M.icon('layers', 34, C.gold, 2.2)}</i><span>Five common ways to split the work</span></div>`}</div>`).join('');
// W: the mixed chart (card coords, 1600 wide)
const NW = [ // id, label, face|icon, x centre, y top, level
  ['nR', 'Ravi', 'f:ravi', 800, 84, 0], ['nA', 'First stall', 'i:store', 440, 214, 1], ['nB', 'Bus stand · Meena', 'f:meena', 1160, 214, 1],
  ['n1', 'Kitchen · Asha', 'f:asha', 200, 352, 2], ['n2', 'Money · Kabir', 'f:kabir', 440, 352, 2], ['n3', 'Counter', 'i:user', 680, 352, 2],
  ['n4', 'Kitchen', 'i:flame', 1040, 352, 2], ['n5', 'Counter', 'i:cup', 1280, 352, 2]];
$('#mxN').innerHTML = NW.map(([id, l, fi, x, y, lv]) => `<div class="nd${lv === 0 ? ' top' : ''}" id="${id}" style="top:${y}px"><i style="${fi[0] === 'f' ? FACE(fi.slice(2)) : ''}">${fi[0] === 'i' ? M.icon(fi.slice(2), 24, C.gold, 2.2) : ''}</i><span>${l}</span></div>`).join('');
$('#mxG').innerHTML = `<path id="ml0" d="M800 148 V182 M440 182 H1160 M440 182 V214 M1160 182 V214" fill="none" stroke="#B8862F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="ml1" d="M440 278 V318 M200 318 H680 M200 318 V352 M440 318 V352 M680 318 V352" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="ml2" d="M1160 278 V318 M1040 318 H1280 M1040 318 V352 M1280 318 V352" fill="none" stroke="#B9B1A3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="mq" d="M1280 352 V300 H1330 V246" fill="none" stroke="#B5482F" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>`;
$('#mx0I').innerHTML = M.icon('pin', 22, C.gold2, 2.2); $('#mx1I').innerHTML = M.icon('network', 22, C.gold, 2.2); $('#mx2I').innerHTML = M.icon('check', 22, '#fff', 3);
$('#qTok').innerHTML = M.icon('help', 28, '#fff', 2.4);
// K: at work today
const KA = [
  ['network', 'Functional', 'Group by job', 'Kitchen, cash and counter', 'briefcase', 'Marketing, finance and human resources'],
  ['pin', 'Territorial', 'Group by place', 'The first stall and the bus stand', 'bank', 'A bank with a north and a south zone'],
  ['tag', 'Product', 'Group by what you sell', 'Chai and snacks', 'truck', 'A vehicle maker: cars team, trucks team'],
  ['users', 'Customer', 'Group by who you serve', 'Walk-in buyers and bulk orders', 'bank', 'Home buyers and businesses, separate teams'],
  ['shuffle', 'Process', 'Group by the steps of the work', 'Boil, brew and serve', 'scissors', 'A garment factory: cut, stitch, pack'],
];
$('#kRows').innerHTML = KA.map(([ic, t], i) => `<div class="kr" id="kr${i}" style="top:${92 + i * 94}px"><div class="bg"></div><div class="rn">0${i + 1}</div><div class="ri"></div><div class="rt">${t}</div></div>`).join('');
const KP = [['DEPARTMENTS, AT WORK', 'Everywhere', 'Companies, banks, factories', null]].concat(KA.map((a, i) => [`IN PRACTICE 0${i + 1} / 05`, a[1], a[2], a]));
$('#kPans').innerHTML = KP.map(([s, t, m, a], i) => `<div class="pn" id="kn${i}"><div class="ps">${s}</div><div class="serif pt">${t}</div><div class="pm">${m}</div><div class="hr"></div>` +
  (a ? `<div class="ka" id="ka${i}0" style="top:322px"><i>${M.icon('cup', 34, C.gold, 2.2)}</i><div class="kl">AT CHAI CORNER</div><div class="kt">${a[3]}</div></div>
        <div class="ka" id="ka${i}1" style="top:442px"><i>${M.icon(a[4], 34, C.ink, 2.2)}</i><div class="kl">AT WORK TODAY</div><div class="kt">${a[5]}</div></div>`
     : `<div class="px">FROM A CHAI STALL TO A BANK</div><div class="pe"><i>${M.icon('store', 34, C.gold, 2.2)}</i><span>Same five ways, any size of business</span></div>`) + `</div>`).join('');
// X
const XG = [['tag', 'Clear roles'], ['award', 'Expert teams']];
const XH = [['wall', 'Thinks only of itself'], ['alert', 'Silos form']];
$('#xChips').innerHTML = XG.map(([ic, t], i) => `<div class="xc" id="xg${i}" style="left:48px;top:${392 + i * 64}px">${M.icon(ic, 22, C.gold, 2.4)}<span>${t}</span></div>`).join('') +
  XH.map(([ic, t], i) => `<div class="xc" id="xh${i}" style="left:408px;top:${392 + i * 64}px">${M.icon(ic, 22, C.red, 2.4)}<span>${t}</span></div>`).join('');
const pan = (col, n) => `<line x1="-70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/><line x1="70" y1="86" x2="0" y2="0" stroke="#3A4560" stroke-width="3"/>` +
  Array.from({ length: 2 }, (_, i) => `<rect id="wt${n}${i}" x="${-40 + i * 44}" y="56" width="36" height="30" rx="6" fill="${col}"/>`).join('') +
  `<path d="M-84 86 H84 C84 112 50 122 0 122 C-50 122 -84 112 -84 86Z" fill="#E2DACB" stroke="#3A4560" stroke-width="3"/>`;
$('#panL').innerHTML = pan('#B8862F', 'L'); $('#panR').innerHTML = pan('#B5482F', 'R');
const SC = [['KITCHEN', 'asha', null], ['COUNTER', null, null], ['CASH', 'kabir', null]];
$('#scs').innerHTML = SC.map(([n, f], i) => `<div class="sc" id="sc${i}" style="left:${48 + i * 240}px"><div class="lbl">${n}</div>` +
  (f ? `<div class="av face" style="left:76px;top:50px;${FACE(f)}">${f[0]}</div>` : hlp(76, 50, 56)) + hlp(76, 136, 56) + `</div>`).join('');
$('#bothI').innerHTML = M.icon('link', 52, C.gold, 2.2);
wrap($('#xs'), 'xsOut', 784, 580);
// quiz
const OPTS = ['Functional', 'Territorial', 'Customer', 'Process'], RIGHT = 2;
$('#opts').innerHTML = OPTS.map((o, i) => `<div class="opt" id="o${i}" style="left:${160 + i * 408}px"><div class="bg"></div><div class="lt">${'ABCD'[i]}</div><div class="ot serif">${o}</div><div class="ok">${M.icon('check', 30, '#fff', 3)}</div></div>`).join('');
$('#takeI').innerHTML = M.icon('users', 44, C.gold2, 2.4);
// recap
const ROWS = [['network', 'Clear structure', ['Role', 'Authority', 'Boss']], ['layers', 'Five ways', ['Function', 'Territory', 'Product', 'Customer', 'Process']], ['link', 'Keep bridges open', ['Work as one']]];
$('#rRows').innerHTML = ROWS.map(([ic, tx, ps], i) => `<div class="card rw" id="rw${i}" style="top:${280 + i * 152}px"><div class="rn">0${i + 1}</div><div class="ri">${M.icon(ic, 34, C.gold, 2.2)}</div><div class="rt">${tx}</div>${ps.map((p, k) => `<div class="fp" id="fp${i}${k}">${p}</div>`).join('')}</div>`).join('');
$('#nextI').innerHTML = M.icon('arrowR', 40, C.gold2, 2.4);

/* ---------- helpers ---------- */
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]]]);
const caps = M.captions($('#cap'), M.CUES.order);
const sweepX = t => { for (const [a, b] of SW) { const a1 = M.io((t - a) / 0.42), a2 = M.io((t - b) / 0.46); if (a1 > 0 && a2 < 1) return 1940 * (1 - a1) - 1960 * a2; } return null; };
const setIco = (el, ic, col, s = 32, w = 2.2) => { const k = ic + col + s; if (el._k !== k) { el._k = k; el.innerHTML = M.icon(ic, s, col, w); } };
const snap = (el, v, prop = 'transform') => { if (el.style[prop] !== v) el.style[prop] = v; };
const grow = (card, inner, t, tShrink) => {
  const sh = M.spring(t - tShrink + 0.1, M.HEAVY), w = M.lerp(1600, 784, sh);
  snap(card, (sh >= 1 ? 784 : w.toFixed(1)) + 'px', 'width');
  snap(inner, (sh >= 1 ? 0 : ((w - 784) / 2).toFixed(1)) + 'px', 'left');
  return sh;
};
const pop = (el, t, ta, tout = 1e9) => M.vis(el, t, ta, tout, { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 });
const runRows = (t, pre, n, icons, tOn, t0, tEnd) => {
  for (let i = 0; i < n; i++) {
    const el = $('#' + pre + i), ta = tOn[i], td = i < n - 1 ? tOn[i + 1] : tEnd + 1;
    M.vis(el, t, t0 + 0.4 + i * 0.07, 1e9, { dy: 14 });
    const on = M.io((t - ta) / 0.3), off = M.io((t - td) / 0.35), act = on * (1 - off);
    el.querySelector('.bg').style.background = mix(C.paper, C.ink, act);
    el.querySelector('.rt').style.color = t < ta ? C.dim : mix('#fff', C.ink, off);
    el.querySelector('.rn').style.color = t < ta ? C.dim : mix(C.gold2, C.gold, off);
    const ri = el.querySelector('.ri'); if (ri && icons) { ri.style.background = mix('#fff', C.navy2, act); setIco(ri, icons[i], t < ta ? C.dim : (act > 0.5 ? C.gold2 : C.gold), 28, 2.2); }
  }
};
const paneHead = (pn, t, tin, tout, withPx = true) => {
  const off = t < tin - 0.01 || t > tout + 0.3; M.hide(pn, off); if (off) return false;
  const oo = { outDur: 0.18, ody: -12 };
  M.vis(pn.querySelector('.ps'), t, tin, tout, { dy: 12, ...oo });
  M.rise(pn.querySelector('.pt'), t, tin + 0.06, { st: 0.06, sp: M.HEAVY, out: tout, outDur: 0.2 });
  M.rise(pn.querySelector('.pm'), t, tin + 0.3, { st: 0.04, out: tout, outDur: 0.2 });
  M.vis(pn.querySelector('.hr'), t, tin + 0.4, tout, { dy: 0, ...oo });
  if (withPx) M.vis(pn.querySelector('.px'), t, tin + 0.5, tout, { dy: 10, ...oo });
  return true;
};
// slot position of activity chip i inside its group box (card coords)
const slot = i => { const [, , g, s] = ACT[i]; return [48 + g * 292 + 16, 300 + 72 + s * 56]; };

let geo = null;
function measure() {
  const ti = $('#title'); ti.style.fontSize = '120px';
  let fs = 120; if (ti.offsetWidth > 1560) fs = Math.floor(120 * 1560 / ti.offsetWidth); ti.style.fontSize = fs + 'px';
  const w = ti.offsetWidth, h = ti.offsetHeight;
  geo = { sx: 960 - w / 2, sy: 540 - h / 2 - 20, ex: 160, ey: 156, es: 56 / fs, cw: $('#eyebrow').offsetWidth, cy: 540 - h / 2 - 112 };
  const ex = $('#exChip'); ex.style.left = (1760 - ex.offsetWidth) + 'px'; ex.style.top = '170px';
  let x = 48; ['dc0', 'dc1', 'dc2'].forEach(id => { const el = $('#' + id); el.style.left = x + 'px'; x += el.offsetWidth + 16; });
  $('#cvR').style.left = (472 - $('#cvR').offsetWidth / 2) + 'px';
  NW.forEach(([id, , , cx]) => { const el = $('#' + id); el.style.left = (cx - el.offsetWidth / 2) + 'px'; });
  $('#mx1').style.left = (64 + $('#mx0').offsetWidth + 16) + 'px'; $('#mx2').style.left = (1536 - $('#mx2').offsetWidth) + 'px';
  document.querySelectorAll('#kPans .pt, #pPans .pt').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(84 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .kt').forEach(el => { if (el.offsetWidth > 748) el.style.fontSize = Math.floor(30 * 748 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('#kPans .pm, #pPans .pm').forEach(el => { if (el.offsetWidth > 848) el.style.fontSize = Math.floor(36 * 848 / el.offsetWidth) + 'px'; });
  document.querySelectorAll('.tr3 .vc').forEach(el => { el.style.left = 'auto'; });
  OPTS.forEach((_, i) => { const o = $('#o' + i + ' .ot'); if (o.offsetWidth > 312) o.style.fontSize = Math.floor(40 * 312 / o.offsetWidth) + 'px'; });
  const q1 = $('#qq1'); if (q1.offsetWidth > 1420) q1.style.fontSize = Math.floor(68 * 1420 / q1.offsetWidth) + 'px';
  ROWS.forEach(([, , ps], i) => { let x = 216 + $('#rw' + i + ' .rt').offsetWidth + 40; ps.forEach((_, k) => { const p = $('#fp' + i + k); p.style.left = x + 'px'; x += p.offsetWidth + 16; }); });
}
const tiltT = M.track(0, [...tXg.map((tg, i) => [tg + 0.1, -(i + 1) * 5]), ...tXh.map((th, i) => [th + 0.1, -10 + (i + 1) * 5])], M.SOFT);

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
  M.hide($('#exChip'), true);

  /* ===== A: nobody is sure who does what ===== */
  const aOn = t < tB1 + 0.2; M.hide($('#sA'), !aOn);
  if (aOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#hero'), t, tMorph + 0.18, tAout, { dx: -60, dy: 0, ...o });
    M.draw($('#s1'), t, tMorph + 0.7, 0.5, M.o3); M.draw($('#s2'), t, tMorph + 0.82, 0.5, M.o3); M.draw($('#s3'), t, tMorph + 0.94, 0.5, M.o3);
    $('#steam').setAttribute('transform', `translate(0 ${(-4 * Math.sin(t * 2.4)).toFixed(2)})`);
    M.vis($('#awn'), t, tMorph + 0.4, 1e9, { dy: -90, sp: [12, 0.62], fade: 0.05 });
    M.vis($('#sign'), t, tMorph + 0.7, 1e9, { dy: 10 });
    M.vis($('#ravi'), t, tMorph + 0.55, 1e9, { dy: 40, sp: M.SOFT });
    M.rise($('#hname'), t, tMorph + 0.6, { st: 0.06 }); M.vis($('#htag'), t, tMorph + 0.8, 1e9, { dy: 10 });
    CUPS.forEach((c, i) => { const ti0 = tMorph + 0.9 + i * 0.06; const p = M.spring(t - ti0, M.POP); const g = $('#cup' + i); M.hide(g, t < ti0); g.setAttribute('transform', `translate(${c[0]} ${(c[1] - (1 - p) * 24).toFixed(2)})`); g.style.opacity = M.clamp((t - ti0) / 0.1); });
    M.vis($('#who'), t, tMorph + 0.3, tAout, { dy: 36, ...o });
    TEAM.forEach((_, i) => { M.vis($('#wa' + i), t, tMorph + 0.55 + i * 0.06, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 }); pop($('#wq' + i), t, tSure - 0.1 + i * 0.05); });
    pop($('#whoP'), t, tSure + 0.4);
    M.vis($('#mess'), t, tMorph + 0.42, tAout, { dy: 36, ...o });
    const tO = [tWash - 0.1, tSour - 0.3, tQues - 0.1];
    OT.forEach(([ic], i) => {
      const el = $('#ot' + i); M.vis(el, t, tMorph + 0.7 + i * 0.08, 1e9, { dy: 14 });
      const r = M.io((t - tO[i]) / 0.3); el.style.background = mix(C.paper, C.redBg, r);
      setIco(el.querySelector('i'), ic, r > 0.5 ? C.red : C.dim, 28, 2.2);
      M.rise(el.querySelector('.tx2'), t, tO[i], { st: 0.04 }); el.querySelector('.tx2').style.color = C.red;
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

  /* ===== B: Kabir checks the books ===== */
  const bOn = t >= tB1 - 0.1 && t < tD1 + 0.2; M.hide($('#sB'), !bOn);
  if (bOn) {
    const o = { outDur: 0.3, ody: -16 };
    const ill = $('#ill'); M.vis(ill, t, tB1 + 0.1, tBout, { dy: 36, ...o }); grow(ill, $('#illOut'), t, tB2);
    M.vis($('#illImg'), t, tB1 + 0.3, 1e9, { dy: 24, sp: M.SOFT });
    M.vis($('#books'), t, tB2 + 0.12, tBout, { dx: 60, dy: 0, ...o });
    LG.forEach((_, i) => { M.vis($('#lg' + i), t, tLg[i] - 0.15, 1e9, { dx: 30, dy: 0, sp: M.SOFT, fade: 0.12 }); pop($('#lt' + i), t, i < 2 ? tLg[i] + 0.5 : tNobody - 0.1); });
    M.vis($('#cause'), t, tB3 + 0.1, 1e9, { dy: 24 });
  }

  /* ===== D: what organizing is ===== */
  const dOn = t >= tD1 - 0.1 && t < tF0 + 0.2; M.hide($('#sD'), !dOn);
  if (dOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.rise($('#dq'), t, tD1 + 0.05, { st: 0.07, sp: M.HEAVY, out: tD2 - 0.1, outDur: 0.3 });
    const df = $('#def'); M.vis(df, t, tD2 + 0.05, tDout, { dy: 36, ...o }); grow(df, $('#defOut'), t, tD3);
    M.rise($('#dl0'), t, tArr - 0.15, { st: 0.06, sp: M.HEAVY }); M.rise($('#dl1'), t, tArr + 0.5, { st: 0.06, sp: M.HEAVY }); M.rise($('#dl2'), t, tPlanD - 0.5, { st: 0.06, sp: M.HEAVY });
    M.vis($('#dHr'), t, tPlanD + 0.2, 1e9, { dy: 0 }); M.vis($('#dWh'), t, tPlanD + 0.25, 1e9, { dy: 8 });
    ['dc0', 'dc1', 'dc2'].forEach((id, i) => pop($('#' + id), t, tPlanD + 0.4 + i * 0.25));
    M.vis($('#three'), t, tD3 + 0.12, tDout, { dx: 60, dy: 0, ...o });
    TR.forEach((_, i) => {
      const r = $('#tr' + i); M.vis(r, t, tD[i] - 0.05, 1e9, { dy: 14 }); pop($('#te' + i), t, tDex[i]);
      const act = M.io((t - tD[i]) / 0.3) * (i < 2 ? 1 - M.io((t - tD[i + 1]) / 0.3) : 1);
      r.querySelector('.bg').style.background = mix(C.paper, C.ink, act); r.querySelector('.tn').style.color = act > 0.5 ? '#fff' : C.ink; r.querySelector('.ts').style.color = act > 0.5 ? C.gold2 : C.ink2;
    });
  }

  /* ===== F: the five steps, building the structure ===== */
  const fOn = t >= tF0 - 0.1 && t < tG0 + 0.2; M.hide($('#sF'), !fOn);
  if (fOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#sl'), t, tF0 + 0.1, tFout, { dx: -60, dy: 0, ...o });
    M.vis($('#cv'), t, tF0 + 0.25, tFout, { dx: 60, dy: 0, ...o });
    runRows(t, 'sr', 5, ['list', 'layers', 'users', 'key', 'link'], tF, tF0, tFout);
    pop($('#cvR'), t, tF0 + 0.6);
    // activities pop in where they are named, then slide into their group box
    ACT.forEach((_, i) => {
      const el = $('#ac' + i), ta = tAct[i] - 0.1; pop(el, t, ta);
      const mv = M.io((t - tGroup - 0.1 - i * 0.12) / 0.6), [x1, y1] = slot(i), [x0, y0] = SCAT[i];
      el.style.left = (mv >= 1 ? x1 : M.lerp(x0, x1, mv)).toFixed(1) + 'px'; el.style.top = (mv >= 1 ? y1 : M.lerp(y0, y1, mv)).toFixed(1) + 'px';
    });
    GX.forEach((_, i) => {
      const g = $('#gx' + i); M.vis(g, t, tGroup - 0.2 + i * 0.1, 1e9, { dy: 16 });
      const tOwn = [tAshaF, tKabirF, tKabirF + 0.7][i]; M.vis($('#go' + i), t, tOwn - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
      const lit = M.io((t - tLink - i * 0.15) / 0.4); g.style.borderColor = mix(C.paper, C.gold, lit);
    });
    // delegation: a piece of Ravi's authority travels down to Asha's kitchen
    const d = $('#acD'); pop(d, t, tHand - 0.1);
    const dm = M.io((t - tAsha4 + 0.1) / 0.7), d0 = [472 - 80, 160], d1 = [48 + 16, 300 + 72 + 112];
    d.style.left = (dm >= 1 ? d1[0] : M.lerp(d0[0], d1[0], dm)).toFixed(1) + 'px'; d.style.top = (dm >= 1 ? d1[1] : M.lerp(d0[1], d1[1], dm)).toFixed(1) + 'px';
    M.draw($('#cvP'), t, tLink - 0.1, 0.9, M.o3);
  }

  /* ===== G + P: departmentation, five ways ===== */
  const pOn = t >= tG0 - 0.1 && t < tW1 + 0.2; M.hide($('#sP'), !pOn);
  if (pOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl'), t, tG0 + 0.1, tPout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp'), t, tG0 + 0.25, tPout, { dx: 60, dy: 0, ...o });
    runRows(t, 'pr', 5, PR.map(r => r[0]), tP, tG0, tPout);
    PP.forEach((_, k) => {
      const tin = k ? tP[k - 1] : tG0 + 0.5, tout = k < 5 ? tP[k] - 0.14 : 1e9;
      const pn = $('#pn' + k); if (!paneHead(pn, t, tin, tout)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { M.vis(pn.querySelector('.pe'), t, tG1 + 0.2, tout, { dy: 18, ...oo }); return; }
      M.vis(pn.querySelector('.pv'), t, tin + 0.55, tout, { dy: 18, ...oo });
      const i = k - 1; pop($('#tr0' + i), t, tin + 0.6); M.draw($('#tl' + i), t, tin + 0.8, 0.5, M.o3);
      KIDS[i].forEach((_, j) => { pop($('#tk' + i + j), t, tPw[i][j] - 0.1); if (i === 4 && j > 0) M.draw($('#ta' + i + (j - 1)), t, tPw[i][j] - 0.3, 0.3, M.o3); });
    });
  }

  /* ===== W: Ravi's mixed chart ===== */
  const wOn = t >= tW1 - 0.1 && t < tK0 + 0.2; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#mix'), t, tW1 + 0.1, tWout, { dy: 36, outDur: 0.3, ody: -16 });
    pop($('#nR'), t, tW1 + 0.4);
    pop($('#mx0'), t, tMixes - 0.05); pop($('#mx1'), t, tMixes + 0.25);
    pop($('#nA'), t, tStall - 0.15); pop($('#nB'), t, tBusW - 0.1); M.draw($('#ml0'), t, tStall - 0.3, 0.6, M.o3);
    ['n1', 'n2', 'n3'].forEach((id, i) => pop($('#' + id), t, tJobs + i * 0.1)); ['n4', 'n5'].forEach((id, i) => pop($('#' + id), t, tJobs + 0.3 + i * 0.1));
    M.draw($('#ml1'), t, tJobs - 0.1, 0.5, M.o3); M.draw($('#ml2'), t, tJobs + 0.2, 0.5, M.o3);
    // a small question climbs from the bus stand counter and stops at Meena
    const q = $('#qTok'), qm = M.io((t - tQW) / 1.2), path = [[1280, 352], [1280, 300], [1330, 300], [1330, 246]];
    const segL = [52, 50, 54], tot = 156; let dd = qm * tot, p = path[0];
    for (let s = 0; s < 3; s++) { if (dd <= segL[s]) { const u = dd / segL[s]; p = [M.lerp(path[s][0], path[s + 1][0], u), M.lerp(path[s][1], path[s + 1][1], u)]; break; } dd -= segL[s]; p = path[s + 1]; }
    M.vis(q, t, tQW - 0.1, 1e9, { dy: 0, sc: 0.5, sp: M.POP, fade: 0.08 });
    q.style.left = (p[0] - 24).toFixed(1) + 'px'; q.style.top = (p[1] - 24).toFixed(1) + 'px';
    const done = M.io((t - tMeenaW) / 0.3); q.style.background = mix(C.red, C.gold, done); setIco(q, done > 0.5 ? 'check' : 'help', '#fff', 28, 2.6);
    M.draw($('#mq'), t, tQW, 1.2, M.io);
    $('#nB').style.background = mix(C.paper, C.gold3, done);
    pop($('#mx2'), t, tMeenaW + 0.2);
  }

  /* ===== K: at work today ===== */
  const kOn = t >= tK0 - 0.1 && t < tX1 + 0.2; M.hide($('#sK'), !kOn);
  if (kOn) {
    const o = { outDur: 0.3, ody: -16 };
    M.vis($('#kl2'), t, tK0 + 0.1, tKout, { dx: -60, dy: 0, ...o });
    M.vis($('#kp2'), t, tK0 + 0.25, tKout, { dx: 60, dy: 0, ...o });
    runRows(t, 'kr', 5, KA.map(r => r[0]), tK, tK0, tKout);
    KP.forEach((_, k) => {
      const tin = k ? tK[k - 1] : tK0 + 0.5, tout = k < 5 ? tK[k] - 0.14 : 1e9;
      const pn = $('#kn' + k); if (!paneHead(pn, t, tin, tout, false)) return;
      const oo = { outDur: 0.18, ody: -12 };
      if (k === 0) { pn.querySelectorAll('.px').forEach(e => M.vis(e, t, tin + 0.5, tout, { dy: 10, ...oo })); M.vis(pn.querySelector('.pe'), t, tin + 0.62, tout, { dy: 18, ...oo }); return; }
      M.vis($('#ka' + k + '0'), t, tin + 0.6, tout, { dy: 18, ...oo });
      M.vis($('#ka' + k + '1'), t, tKw[k - 1] - 0.1, tout, { dy: 18, ...oo });
    });
  }

  /* ===== X: the human side ===== */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    const o = { outDur: 0.3, ody: -16 };
    const xs = $('#xs'); M.vis(xs, t, tX1 + 0.1, tXout, { dy: 36, ...o }); grow(xs, $('#xsOut'), t, tX4);
    M.vis($('#scl'), t, tX1 + 0.3, 1e9, { dy: 20, sp: M.SOFT });
    const a = tiltT(t), r = a * Math.PI / 180;
    $('#beam').setAttribute('transform', `rotate(${a.toFixed(3)} 344 40)`);
    $('#panL').setAttribute('transform', `translate(${(344 - 280 * Math.cos(r)).toFixed(2)} ${(40 - 280 * Math.sin(r)).toFixed(2)})`);
    $('#panR').setAttribute('transform', `translate(${(344 + 280 * Math.cos(r)).toFixed(2)} ${(40 + 280 * Math.sin(r)).toFixed(2)})`);
    M.vis($('#xgL'), t, tX2 - 0.05, 1e9, { dy: 10 }); M.vis($('#xhL'), t, tX3 - 0.05, 1e9, { dy: 10 });
    for (let i = 0; i < 2; i++) {
      pop($('#xg' + i), t, tXg[i] - 0.05); pop($('#xh' + i), t, tXh[i] - 0.05);
      M.vis($('#wtL' + i), t, tXg[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      M.vis($('#wtR' + i), t, tXh[i], 1e9, { dy: -40, sp: M.POP, fade: 0.08 });
      const g = $('#xg' + i), h = $('#xh' + i);
      g.style.background = C.gold3; g.style.color = C.ink; h.style.background = C.redBg; h.style.color = C.red;
    }
    M.vis($('#silo'), t, tX4 + 0.12, tXout, { dx: 60, dy: 0, ...o });
    SC.forEach((_, i) => M.vis($('#sc' + i), t, tX4 + 0.35 + i * 0.1, 1e9, { dy: 16 }));
    M.draw($('#bl0'), t, tBl[0] - 0.1, 0.4, M.o3); M.vis($('#bl0h'), t, tBl[0] + 0.25, 1e9, { dy: 0, fade: 0.1 });
    M.draw($('#bl1'), t, tBl[1] - 0.1, 0.4, M.o3); M.vis($('#bl1h'), t, tBl[1] + 0.25, 1e9, { dy: 0, fade: 0.1 });
    const calm = M.io((t - tGang) / 0.4); ['bl0', 'bl0h', 'bl1', 'bl1h'].forEach(id => { $('#' + id).style.opacity = (1 - 0.75 * calm).toFixed(3); });
    M.vis($('#fay2'), t, tFay - 0.1, 1e9, { dy: 16 });
    M.draw($('#gp'), t, tGang, 0.6, M.o3);
    M.vis($('#lesson'), t, tX6 + 0.05, 1e9, { dy: 16 });
    M.vis($('#both'), t, tX6 + 0.15, 1e9, { dy: 40 });
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
