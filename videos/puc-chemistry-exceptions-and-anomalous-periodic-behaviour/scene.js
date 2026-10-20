// PUC Chemistry Ep 37: Exceptions and Anomalous Periodic Behaviour (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: the element in play teal, partners ink, the electron that moves orange, NCERT values gold, the exception red
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', XC = C.red;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const N_ = s => `\\textcolor{${NC}}{\\mathrm{${s}}}`, H_ = s => `\\textcolor{${HC}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GC}}{${s}}`;
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const stick = (p) => mk(p, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' });
const setL = (l, x1, y1, x2, y2, u = 1) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; attr(l, 'x1', (mx + (x1 - mx) * u).toFixed(1)); attr(l, 'y1', (my + (y1 - my) * u).toFixed(1)); attr(l, 'x2', (mx + (x2 - mx) * u).toFixed(1)); attr(l, 'y2', (my + (y2 - my) * u).toFixed(1)); M.hide(l, u <= 0.01); };
const chip = (host, x, y, s, bg, fg = '#fff') => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = `left:${x}px;top:${y}px;background:${bg};color:${fg}`; d.innerHTML = s; host.appendChild(d); return d; };

Object.assign(M.IC, {
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M12 18h.01'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1');
const tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tC1 = T0('C1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['phone', 'Phone cell', 'LITHIUM', 'lithium', 'Li', 'ACTS LIKE Mg'], ['flame', 'Pressure cooker', 'ALUMINIUM', 'aluminium', 'Al', 'Be ACTS LIKE Al'], ['droplet', 'Tap water', 'CHLORINE', 'chlorine', 'Cl', 'BEATS F']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , el, ew], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="elw" id="ew${i}"><span>${ew}</span><div class="el">${el}</div></div></div>`).join('');
const KIT = [['chart', 'Neat trends', wt('H3', 'trends')], ['help', 'Exceptions?', wt('H3', 'exceptions')], ['bulb', 'A reason each', wt('H4', 'reason')]];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');

/* ---------- P: IE graph period 2 (NCERT values, kJ/mol) ---------- */
const IE = [['Li', 520], ['Be', 899], ['B', 801], ['C', 1086], ['N', 1402], ['O', 1314], ['F', 1681], ['Ne', 2081]];
const ps = $('#pS');
const gr = PUC.graph(ps, { x: 140, y: 90, w: 900, h: 400, xmax: 8, ymin: 0, ymax: 2200, yt: [0, 500, 1000, 1500, 2000] });
const gx = i => gr.X(i + 0.5);
IE.forEach(([e], i) => txt(ps, gx(i), 524, e, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: C.ink }));
const trendL = mk(ps, 'line', { x1: gx(0), y1: gr.Y(520), x2: gx(7), y2: gr.Y(2081), stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '8 10' });
const gPath = mk(ps, 'path', { d: 'M' + IE.map(([, v], i) => `${gx(i).toFixed(1)} ${gr.Y(v).toFixed(1)}`).join(' L'), fill: 'none', stroke: NC, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const gDot = IE.map(([e, v], i) => { const g = mk(ps, 'g', {}); const dip = e === 'B' || e === 'O'; mk(g, 'circle', { cx: gx(i), cy: gr.Y(v), r: dip ? 11 : 9, fill: dip ? XC : NC }); txt(g, gx(i), gr.Y(v) + (dip ? 52 : -22), String(v), { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 19 }); return g; });
const dipRing = ['B', 'O'].map(e => { const i = IE.findIndex(x => x[0] === e); return mk(ps, 'circle', { cx: gx(i), cy: gr.Y(IE[i][1]), r: 30, fill: 'none', stroke: XC, 'stroke-width': 3, 'stroke-dasharray': '6 6' }); });
const tIE = [wt('P3', 'Lithium'), wt('P3', 'Beryllium'), wt('P3', 'boron'), wt('P4', 'Carbon'), wt('P4', 'Nitrogen'), wt('P4', 'oxygen'), wt('P5', 'Fluorine'), wt('P5', 'neon')];
$('#dips').innerHTML = [['TREND SAYS', 'Rises across the period', C.soft, C.ink], ['DIP 1', 'B 801 &lt; Be 899', C.redBg, XC], ['DIP 2', 'O 1314 &lt; N 1402', C.redBg, XC]].map(([a, b, bg, fg], i) => `<div id="dp${i}" style="position:absolute;left:0;top:${i * 112}px;width:452px;height:96px;border-radius:14px;background:${bg};box-sizing:border-box;padding:16px 22px"><div style="font:600 16px 'IBM Plex Mono';letter-spacing:.08em;color:var(--mute)">${a}</div><div style="font:600 28px Poppins;color:${fg};margin-top:6px;white-space:nowrap">${b}</div></div>`).join('') + `<div class="pillp ac" id="dpU" style="left:0;top:350px">Two dips, two exceptions</div>`;

/* ---------- S: orbital boxes ---------- */
// row: element, config boxes [1s, 2s, 2p x3], each box holds up to 2 arrows (u = up, d = down)
const BOX = 64, BX0 = 150;
const orbRow = (svg, y, sym, sub, boxes, ieTxt) => {
  const g = mk(svg, 'g', {}), r = {};
  r.el = atomG(g, 34, NC, sym, 26); attr(r.el, 'transform', `translate(76 ${y + BOX / 2})`);
  const xs = [BX0, BX0 + 100, BX0 + 200, BX0 + 200 + BOX, BX0 + 200 + 2 * BOX];
  ['1s', '2s', '2p', '', ''].forEach((l, i) => { mk(g, 'rect', { x: xs[i], y, width: BOX, height: BOX, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 }); if (l) txt(g, xs[i] + (l === '2p' ? BOX * 1.5 : BOX / 2), y + BOX + 26, l, { 'text-anchor': 'middle', fill: C.mute, 'font-weight': 600 }); });
  r.arr = [];
  boxes.forEach((s, i) => [...s].forEach((c, k) => { const n = s.length, x = xs[i] + BOX / 2 + (n === 2 ? (k ? 12 : -12) : 0), up = c === 'u';
    const a = mk(g, 'path', { d: up ? `M${x} ${y + 52} V${y + 14} M${x - 7} ${y + 22} L${x} ${y + 12} L${x + 7} ${y + 22}` : `M${x} ${y + 12} V${y + 50} M${x - 7} ${y + 42} L${x} ${y + 52} L${x + 7} ${y + 42}`, stroke: HC, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    r.arr.push({ a, i, k, x }); }));
  r.sub = txt(g, BX0, y - 16, sub, { fill: C.ink, 'font-weight': 600, 'font-size': 17 });
  r.ie = txt(g, 740, y + BOX / 2 + 10, ieTxt, { 'text-anchor': 'end', fill: GC, 'font-weight': 600, 'font-size': 26 });
  r.g = g; r.xs = xs; r.y = y; return r;
};
const bs = $('#bS'), rs = $('#rS');
const rBe = orbRow(bs, 110, 'Be', 'Be · 1s² 2s²', ['ud', 'ud', '', '', ''], '899'), rB = orbRow(bs, 300, 'B', 'B · 1s² 2s² 2p¹', ['ud', 'ud', 'u', '', ''], '801');
const rN = orbRow(rs, 110, 'N', 'N · 2p³, one in each', ['ud', 'ud', 'u', 'u', 'u'], '1402'), rO = orbRow(rs, 300, 'O', 'O · 2p⁴, one pair', ['ud', 'ud', 'ud', 'u', 'u'], '1314');
// the electron that leaves: Be 2s (box 1, second), B 2p (box 2), O paired 2p (box 2, second); N for comparison none
const leaver = (r, bi, k) => r.arr.find(o => o.i === bi && o.k === k);
const LV = [[leaver(rBe, 1, 1), wt('S2', 'Beryllium')], [leaver(rB, 2, 0), wt('S2', 'single')], [leaver(rO, 2, 1), wt('S7', 'easier')]];
const tagBe = chip($('#bn'), 36, 470, '2s: PENETRATES MORE, HELD TIGHTER', C.ink), tagB = chip($('#bn'), 36, 520, '2p: SHIELDED BY 1s², 2s², EASIER TO REMOVE', XC);
const tagN = chip($('#rx'), 36, 470, 'N: NO PAIRED 2p ELECTRONS', C.ink), tagO = chip($('#rx'), 36, 520, 'O: PAIRED 2p ELECTRONS REPEL', XC);
const rep = mk(rs, 'path', { d: `M${rO.xs[2] + 20} ${rO.y - 4} q12 -14 24 0`, stroke: XC, 'stroke-width': 3, fill: 'none' });
const repB = [mk(rs, 'path', { d: '', stroke: XC, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' })];
const shield = mk(bs, 'path', { d: `M${rB.xs[0] - 6} ${rB.y + BOX + 34} H${rB.xs[1] + BOX + 6}`, stroke: XC, 'stroke-width': 4, 'stroke-linecap': 'round' });
const th1 = PUC.think($('#th1'), { q: 'Which has the higher first ionization enthalpy?', opts: ['Nitrogen', 'Oxygen'], right: 0, why: `N ${K(G_('1402'))} vs O ${K(G_('1314'))} kJ/mol: no paired 2p electrons in N, so no extra repulsion.` });

/* ---------- D: electron gain enthalpy ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`\\Delta_{eg}H:\\; ${N_('F')}\\ ${G_('-328')}, \\;\\; ${N_('Cl')}\\ ${G_('-349')}\\;\\text{kJ/mol}`)],
  ['F: the new electron enters a crowded n = 2 shell'],
  ['Cl: n = 3 gives more room, less repulsion'],
  [K(`\\text{Same in group 16: } ${N_('O')}\\ ${G_('-141')}, \\;\\; ${N_('S')}\\ ${G_('-200')}`)]], { label: 'ELECTRON GAIN ENTHALPY · STEP BY STEP', y0: 100, dy: 100 });
$('#dl').querySelectorAll('.sol .sx').forEach((e, i) => { if (i === 1 || i === 2) e.style.font = '600 24px Poppins'; });
const tDs = [T0('D2'), T0('D3'), T0('D4'), T0('D5')];
const ds = $('#dS');
const EG = [{ s: 'F', x: 200, R: 90, sh: 2, v: '−328' }, { s: 'Cl', x: 545, R: 140, sh: 3, v: '−349' }], EY = 250;
const EGd = EG.map(o => { const g = mk(ds, 'g', {});
  for (let i = 0; i < o.sh; i++) mk(g, 'circle', { cx: o.x, cy: EY, r: o.sh === 1 ? o.R : 34 + (o.R - 34) * (i + 1) / o.sh, fill: 'none', stroke: C.dim, 'stroke-width': 2 });
  const n = atomG(g, 26, NC, o.s, 22); attr(n, 'transform', `translate(${o.x} ${EY})`);
  const out = Array.from({ length: 7 }, (_, k) => { const a = Math.PI / 2 + (k + 1) * Math.PI * 2 / 8; return [o.x + o.R * Math.cos(a), EY + o.R * Math.sin(a)]; });
  out.forEach(([x, y]) => mk(g, 'circle', { cx: x, cy: y, r: 6, fill: HC }));
  const e = mk(ds, 'circle', { r: 8, fill: EC });
  const rl = out.slice(0, 7).map(() => mk(ds, 'line', { stroke: XC, 'stroke-width': 2, 'stroke-dasharray': '4 5' }));
  const val = txt(ds, o.x, EY + o.R + 36, `${o.s} ${o.v} kJ/mol`, { 'text-anchor': 'middle', fill: GC, 'font-weight': 600, 'font-size': 22 });
  return { g, e, rl, out, val, ...o }; });
const egTag = [chip($('#dr'), 36, 470, 'F: SMALL n = 2 SHELL · STRONG REPULSION', XC), chip($('#dr'), 36, 520, 'Cl: LARGER n = 3 SHELL · MORE ROOM', C.ink)];
const g16 = chip($('#dr'), 440, 18, 'GROUP 16: O −141 · S −200', GC);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${N_('Be')}\\ ${G_('899')} > ${N_('B')}\\ ${G_('801')} \\qquad ${N_('N')}\\ ${G_('1402')} > ${N_('O')}\\ ${G_('1314')}`);

/* ---------- W: maximum covalency ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${N_('B')}:\\ 2s + 2p = 1 + 3 = 4 \\text{ orbitals}`)],
  [K(`\\text{max covalency of } ${N_('B')} = 4 \\Rightarrow [${N_('B')}\\mathrm{F_4}]^-`)],
  [K(`${N_('Al')}:\\ 1 + 3 + 5 = 9 \\text{ orbitals} \\Rightarrow [${N_('Al')}\\mathrm{F_6}]^{3-}`)],
  [K(`+3 + 4(-1) = -1 \\qquad +3 + 6(-1) = -3`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 90 });
$('#wq').style.fontSize = '27px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS');
const cpx = (cx, cy, n, R, sym) => { const sts = [], fs = []; for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n + (n === 4 ? Math.PI / 4 : 0), x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); sts.push([stick(ws), cx + 34 * Math.cos(a), cy + 34 * Math.sin(a), x - 22 * Math.cos(a), y - 22 * Math.sin(a)]); fs.push(atomG(ws, 22, HC, 'F', 18)); attr(fs[i], 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); }
  const c = atomG(ws, 32, NC, sym, 24); attr(c, 'transform', `translate(${cx} ${cy})`); return { sts, fs, c }; };
const cB = cpx(170, 180, 4, 92, 'B'), cAl = cpx(170, 430, 6, 96, 'Al');
const sq = (x, y, n, lab) => { const g = mk(ws, 'g', {}); const els = []; for (let i = 0; i < n; i++) els.push(mk(g, 'rect', { x: x + i * 40, y, width: 34, height: 34, rx: 6, fill: '#fff', stroke: NC, 'stroke-width': 2.5 })); txt(g, x, y + 64, lab, { fill: C.ink, 'font-weight': 600, 'font-size': 18 }); return { g, els }; };
const sqB = sq(330, 150, 4, '2s 2p · 4 ORBITALS'), sqA = sq(330, 400, 9, '3s 3p 3d · 9 ORBITALS');
const chB = chip($('#wr'), 330, 70, '[BF₄]⁻ · MAX 4', NC), chA = chip($('#wr'), 330, 320, '[AlF₆]³⁻ · 6', NC);

/* ---------- C: first members + diagonal ---------- */
const DG = [['Li', 0, 0], ['Be', 1, 0], ['B', 2, 0], ['C', 3, 0], ['Na', 0, 1], ['Mg', 1, 1], ['Al', 2, 1], ['Si', 3, 1]];
const DGX = c => 100 + c * 120, DGY = r => 120 + r * 130;
$('#dgt').innerHTML = DG.map(([e, c, r]) => `<div class="ptile" id="g_${e}" style="left:${DGX(c)}px;top:${DGY(r)}px;width:96px;height:80px;font-size:30px">${e}</div>`).join('') + ['1', '2', '13', '14'].map((g, c) => `<div class="lbl" style="left:${DGX(c)}px;width:96px;text-align:center;top:86px">${g}</div>`).join('');
const cs = $('#cS');
const dgA = [[0, 1], [1, 2]].map(([a, b]) => PUC.arrow(cs, NC, 5, 18));
const covT = chip($('#cl'), 100, 360, 'Li, Be: PRONOUNCED COVALENT CHARACTER', C.ink);
const RS = [['Small size', 'size'], ['Large charge/radius ratio', 'charge'], ['High electronegativity', 'electronegativity']];
$('#rsn').innerHTML = RS.map(([s], i) => `<div class="pillp" id="rs${i}" style="top:${420 + (i > 1 ? 64 : 0)}px;left:${i === 1 ? 300 : 100}px">${s}</div>`).join('');
{ const card = $('#cl'), d = document.createElement('div'); d.id = 'clIn'; d.className = 'abs'; d.style.cssText = 'left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const ms = $('#mS');
const MB = [['C', 'C', 2, 'C=C', 'C'], ['N', 'N', 3, 'N≡N', 'N'], ['C', 'O', 2, 'C=O', 'O']];
const MBd = MB.map(([a, b, n, lab], i) => { const y = 130 + i * 140, sts = Array.from({ length: n }, () => stick(ms)); const A = atomG(ms, 34, NC, a, 26), B = atomG(ms, 34, b === a ? NC : HC, b, 26); attr(A, 'transform', `translate(160 ${y})`); attr(B, 'transform', `translate(400 ${y})`); const l = txt(ms, 520, y + 10, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32, fill: C.ink }); return { y, sts, A, B, l, n }; });
const avD = PUC.avatar($('#cp'), { x: 36, y: 474, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Small atoms, big surprises!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'B has more protons than Be, so its IE must be higher', right: `${K(`${N_('Be')}\\ ${G_('899')} > ${N_('B')}\\ ${G_('801')}`)} kJ/mol: boron loses a shielded 2p electron` });
$('#trap').insertAdjacentHTML('beforeend', `<div style="position:absolute;right:36px;top:84px;width:380px;display:flex;flex-direction:column;gap:14px">
  <div id="tm0" style="height:72px;border-radius:12px;background:var(--soft);display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:600 16px 'IBM Plex Mono';letter-spacing:.06em;color:var(--mute)">Be LOSES<b style="font:600 24px 'IBM Plex Mono';color:var(--ink)">2s</b></div>
  <div id="tm1" style="height:72px;border-radius:12px;background:var(--okBg);display:flex;align-items:center;justify-content:space-between;padding:0 18px;font:600 16px 'IBM Plex Mono';letter-spacing:.06em;color:#1F6B3F">B LOSES<b style="font:600 24px 'IBM Plex Mono';color:#1F6B3F">2p, SHIELDED</b></div></div>`);
const where = PUC.where($('#wa'), { on: ['NEET'], type: 'IE order of B, C, N, O, the halogen with the most negative gain enthalpy, diagonal pairs' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `Which statement is correct?`, qW: 760,
  opts: ['First ionization enthalpy: O > N', 'Electron gain enthalpy: F is more negative than Cl', 'First ionization enthalpy: Be > B', 'Li forms mainly ionic compounds, like Na'], right: 2, cols: 1, optW: 940, optY: 196, optH: 84, optFs: 28 });
const so = PUC.solution($('#so'), [[K(`${G_('899')} > ${G_('801')} \\;\\checkmark`)], [K(`\\text{A: N } ${G_('1402')} > \\text{O } ${G_('1314')}`)], [K(`\\text{B: Cl } ${G_('-349')},\\ \\text{F } ${G_('-328')}`)], [K(`\\text{D: Li is covalent, like Mg}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), wt('A3', 'B'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · exceptions and anomalies', y0: 96, dy: 74, txt: [0, 1, 0, 1, 1],
  lines: [K(`${N_('Be')}\\,${G_('899')} > ${N_('B')}\\,${G_('801')} \\qquad ${N_('N')}\\,${G_('1402')} > ${N_('O')}\\,${G_('1314')}\\ \\text{kJ/mol}`), '<b>Why</b>: B loses a shielded 2p e⁻ · O loses a paired 2p e⁻', K(`\\Delta_{eg}H:\\ ${N_('Cl')}\\,${G_('-349')},\\ ${N_('F')}\\,${G_('-328')} \\qquad ${N_('S')}\\,${G_('-200')},\\ ${N_('O')}\\,${G_('-141')}`), '<b>Period 2</b>: max covalency 4, [BF₄]⁻ · Al reaches [AlF₆]³⁻', '<b>Diagonal</b>: Li-Mg, Be-Al · small size, high charge/radius, high EN'] });
const YQ = ['Why is boron\'s ionization enthalpy lower than beryllium\'s?', 'Why does chlorine have a more negative electron gain enthalpy than fluorine?', 'Name the two diagonal pairs, and one reason for them.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · CHAPTER 4', topic: 'Why do atoms bond? Chemical Bonding and Molecular Structure', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S6', 'share') - 0.2, 1.05, 1100, 560], [T0('B1') - 0.3, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = (parseFloat(getComputedStyle(l).fontSize) * 1010 / l.offsetWidth).toFixed(1) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#dl .sol .sx, #wl .sol .sx').forEach(q => { if (q.offsetWidth > 650) q.style.fontSize = (parseFloat(getComputedStyle(q).fontSize) * 650 / q.offsetWidth).toFixed(1) + 'px'; });
  document.querySelectorAll('.btag').forEach(q => { if (q.offsetWidth > 712) q.style.fontSize = Math.floor(18 * 700 / q.offsetWidth) + 'px'; });
}
const leave = (o, t, t0, up = true) => { const u = M.io((t - t0) / 0.9); o.a.setAttribute('stroke', mix(HC, EC, M.clamp((t - t0 + 0.4) / 0.3))); o.a.style.transform = `translate(${(30 * u).toFixed(1)}px,${(-110 * u).toFixed(1)}px)`; o.a.style.opacity = (1 - M.clamp((u - 0.6) / 0.4)).toFixed(3); };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ew' + i), t, wt('H2', 'exception') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'trends') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((k, i) => M.vis($('#wq' + i), t, k[2] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'lithium') - 0.15, 1e9, POP);
  }

  /* P: IE graph */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    M.vis($('#pg'), t, tP1 + 0.05, OUT('S1'), { dy: 36, ...o });
    M.drawU(gr.axes, M.io((t - tP1 - 0.3) / 0.5));
    M.drawU(trendL, M.io((t - wt('P2', 'rises') + 0.1) / 0.8)); trendL.style.opacity = 1 - 0.5 * M.clamp((t - tIE[2]) / 0.3);
    // the curve draws point by point as each value is spoken
    const seg = tIE.reduce((a, tt, i) => t >= tt - 0.1 ? i + M.io((t - tt + 0.1) / 0.45) * 0 : a, -1);
    let k = -1; tIE.forEach((tt, i) => { if (t >= tt - 0.1) k = i; });
    const frac = k < 0 ? 0 : k === 0 ? 0 : (k - 1 + M.io((t - tIE[k] + 0.1) / 0.45)) / 7;
    M.drawU(gPath, frac);
    gDot.forEach((g, i) => fade(g, t, tIE[i] - 0.05));
    dipRing.forEach((r, i) => M.draw(r, t, tIE[i ? 5 : 2] + 0.3, 0.5));
    ['dp0', 'dp1', 'dp2', 'dpU'].forEach((id, i) => M.vis($('#' + id), t, [wt('P2', 'trend'), wt('P3', 'drops'), wt('P4', 'drops'), wt('P5', 'Two')][i] - 0.1, 1e9, { dx: 20, dy: 0 }));
  }

  /* S: orbital boxes */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#rx'), t, T0('S5') - 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'nitrogen') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Its') });
    fade(rBe.g, t, tS1 + 0.3); fade(rB.g, t, wt('S1', 'boron') - 0.1);
    fade(rN.g, t, T0('S5') + 0.2); fade(rO.g, t, wt('S6', 'Oxygen') - 0.1);
    // electrons leave (they come back after the think, as a replay for the side by side)
    leave(LV[0][0], t, LV[0][1] + 0.3); leave(LV[1][0], t, LV[1][1] + 0.3); leave(LV[2][0], t, LV[2][1] - 0.2);
    M.draw(shield, t, wt('S4', 'shielded') - 0.1, 0.5);
    M.vis(tagBe, t, wt('S3', 'penetrates') - 0.1, 1e9, POP); M.vis(tagB, t, wt('S4', 'easier') - 0.1, 1e9, POP);
    M.vis(tagN, t, wt('S5', 'separate') - 0.1, 1e9, POP); M.vis(tagO, t, wt('S7', 'repel') - 0.1, 1e9, POP);
    M.draw(rep, t, wt('S7', 'repel') - 0.1, 0.4);
    [rBe.ie, rB.ie, rN.ie, rO.ie].forEach((e, i) => fade(e, t, [wt('S2', 'Beryllium'), wt('S4', 'easier'), wt('S5', 'Nitrogen'), wt('S7', 'dips')][i] - 0.1));
    attr(rB.ie, 'fill', XC); attr(rO.ie, 'fill', XC);
    M.vis($('#bn .lbl'), t, tS1 + 0.1, 1e9, { dy: 6 });
  }

  /* D: electron gain enthalpy */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o }); M.vis($('#dr'), t, tD1 + 0.2, z, { dx: 60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    EGd.forEach((d, j) => {
      fade(d.g, t, tD1 + 0.4 + j * 0.2);
      const te = j ? T0('D4') : T0('D3'), u = M.io((t - te) / 1.0);
      const sx = d.x + 70, ex = d.x + d.R * Math.cos(-Math.PI / 2 + 0.0001), ey = EY - d.R;
      const x = M.lerp(sx, d.x, u), y = M.lerp(EY - d.R - 56, ey, u);
      attr(d.e, 'cx', x.toFixed(1)); attr(d.e, 'cy', y.toFixed(1)); fade(d.e, t, te - 0.2);
      const rp = M.io((t - te - 0.8) / 0.4) * (j ? 0.45 : 1);
      d.rl.forEach((l, k) => { const [ox, oy] = d.out[k]; const near = Math.hypot(ox - d.x, oy - ey) < d.R * 1.25; attr(l, 'x1', x.toFixed(1)); attr(l, 'y1', y.toFixed(1)); attr(l, 'x2', ox.toFixed(1)); attr(l, 'y2', oy.toFixed(1)); l.style.opacity = (near ? rp : 0).toFixed(3); M.hide(l, rp <= 0 || !near); });
      fade(d.val, t, wt('D2', j ? 'Chlorine' : 'Fluorine') - 0.1);
    });
    egTag.forEach((c, i) => M.vis(c, t, (i ? wt('D4', 'room') : wt('D3', 'repulsion')) - 0.1, 1e9, POP));
    M.vis(g16, t, T0('D5') + 0.3, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Every') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'shielding') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'crowded') + 0.2, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    [[cB, wt('W2', 'Boron')], [cAl, wt('W2', 'Aluminium')]].forEach(([c, tt]) => { c.c.style.opacity = M.clamp((t - tt) / 0.3).toFixed(3); c.sts.forEach(([l, x1, y1, x2, y2], i) => { const u = M.io((t - tt - 0.3 - i * 0.12) / 0.3); setL(l, x1, y1, x2, y2, u); c.fs[i].style.opacity = u.toFixed(3); }); });
    sqB.els.forEach((r, i) => { const u = M.clamp((t - wt('W3', 'four') + 0.3 - i * 0.12) / 0.2); r.style.opacity = u; attr(r, 'fill', mix('#FFFFFF', NC, M.io((t - T0('W4') - 0.3 - i * 0.12) / 0.3))); });
    sqA.els.forEach((r, i) => { const u = M.clamp((t - wt('W5', 'one') + 0.1 - i * 0.12) / 0.2); r.style.opacity = u; attr(r, 'fill', mix('#FFFFFF', NC, i < 6 ? M.io((t - wt('W5', 'six') - i * 0.1) / 0.3) : 0)); });
    fade(sqB.g.querySelector('text'), t, wt('W3', 'four')); fade(sqA.g.querySelector('text'), t, wt('W5', 'Nine'));
    M.vis(chB, t, wt('W4', 'maximum') - 0.1, 1e9, POP); M.vis(chA, t, wt('W5', 'six') - 0.1, 1e9, POP);
  }

  /* C */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('X1'), tc4 = T0('C4');
    M.vis($('#cl'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o });
    { const sh = M.spring(t - tc4 + 0.25, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#cl'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#clIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    DG.forEach(([e, c, r]) => { const el = $('#g_' + e); M.vis(el, t, tC1 + 0.3 + (c + r) * 0.06, 1e9, POP);
      const first = (e === 'Li' || e === 'Be') && t >= wt('C1', 'Lithium') - 0.1, pair = (e === 'Mg' && t >= wt('C2', 'magnesium') - 0.1) || (e === 'Al' && t >= wt('C2', 'aluminium') - 0.1);
      setBg(el, first ? NC : pair ? C.ac2 : '#FFFFFF'); el.style.color = first ? '#fff' : C.ink; el.style.borderColor = first || pair ? NC : C.line; });
    [[0, 1, 'magnesium'], [1, 2, 'aluminium']].forEach(([c0, c1, w], i) => { const u = M.io((t - wt('C2', w) + 0.2) / 0.5); if (u > 0) { const x0 = DGX(c0) + 88, y0 = DGY(0) + 76, x1 = DGX(c1) + 8, y1 = DGY(1) + 4; dgA[i].set(x0, y0, M.lerp(x0, x1, u), M.lerp(y0, y1, u)); } else dgA[i].set(0, 0, 0, 0); });
    M.vis(covT, t, wt('C1', 'covalent') - 0.1, 1e9, POP);
    RS.forEach(([, w], i) => M.vis($('#rs' + i), t, wt('C3', w) - 0.1, 1e9, POP));
    M.vis($('#cp'), t, tc4 - 0.05, out, { dx: 60, dy: 0, ...o });
    MBd.forEach((m, i) => { const tt = [wt('C4', 'C'), wt('C4', 'N', 1), wt('C4', 'O')][i], u = M.io((t - tt + 0.1) / 0.4);
      [m.A, m.B].forEach(g => { g.style.opacity = M.clamp((t - tt + 0.3) / 0.2).toFixed(3); }); fade(m.l, t, tt);
      m.sts.forEach((l, k) => { const off = (k - (m.n - 1) / 2) * 16; setL(l, 194, m.y + off, 366, m.y + off, u); }); });
    avD(t, wt('C4', 'O') + 0.8, out);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Students') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'shielded') - 0.3 });
    M.vis($('#tm0'), t, wt('X3', 'beryllium') - 0.1, 1e9, { dx: 20, dy: 0 }); M.vis($('#tm1'), t, wt('X3', 'Boron') - 0.1, 1e9, { dx: 20, dy: 0 });
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'NEET')], tType: wt('E1', 'ionization') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
