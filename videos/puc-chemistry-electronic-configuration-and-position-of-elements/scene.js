// PUC Chemistry Ep 30: Electronic configuration and position of elements (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, address card, table, recap): period / shell n teal, block / subshell gold, group violet, the moving electron orange
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F', VC = '#7A4FE0';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
// exact-word times (wt() also matches prefixes, so 's' would hit 'shells')
const occ = (id, ws) => { const L = M.L(id), cl = s => s.toLowerCase().replace(/[^a-z0-9]/g, ''); return L.words.filter(w => ws.includes(cl(w.w))).map(w => w.t); };
const we = (id, w, nth = 0) => { const h = occ(id, [w]); if (!h.length) { console.warn('word not found', id, w); return T0(id); } return h[Math.min(nth, h.length - 1)]; };
// LaTeX colour helpers
const tN = s => `\\textcolor{${NC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tV = s => `\\textcolor{${VC}}{${s}}`, tE = s => `\\textcolor{${EC}}{${s}}`;
const last = (n, l, e) => `${tN(n)}${tG(l)}^{${tE(e)}}`;

Object.assign(M.IC, {
  ticket: ['M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M13 5v2', 'M13 17v2', 'M13 11v2'],
  mail: ['M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'],
  train: ['M8 3.1V7a4 4 0 0 0 8 0V3.1', 'm9 15-1-1', 'm15 15 1-1', 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z', 'm8 19-2 3', 'm16 19 2 3'],
  list: ['M3 6h.01', 'M3 12h.01', 'M3 18h.01', 'M8 6h13', 'M8 12h13', 'M8 18h13'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
});

/* ---------- periodic table, periods 1 to 4 ---------- */
const ROWS = [['H', ...Array(16).fill(''), 'He'], ['Li', 'Be', ...Array(10).fill(''), 'B', 'C', 'N', 'O', 'F', 'Ne'], ['Na', 'Mg', ...Array(10).fill(''), 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr']];
const blockOf = (r, c) => (c < 2 || (r === 0 && c === 17)) ? 's' : (c < 12 ? 'd' : 'p');
const BT = { s: '#D3EFEF', p: '#F3E5C8', d: '#E4DDF8' };
const table = (host, cs, gap, fs, o = {}) => {
  const P = cs + gap, cells = {};
  ROWS.forEach((row, r) => row.forEach((s, c) => { if (!s) return; const e = document.createElement('span'); e.style.cssText = `left:${c * P}px;top:${r * P}px;width:${cs}px;height:${cs}px;font-size:${fs}px;background:${C.soft}`; e.textContent = s; host.appendChild(e); cells[s] = { e, r, c }; }));
  if (o.labels) {
    for (let c = 0; c < 18; c++) { const l = document.createElement('div'); l.className = 'pl'; l.style.cssText = `left:${c * P}px;top:-28px;width:${cs}px`; l.textContent = c + 1; host.appendChild(l); }
    for (let r = 0; r < 4; r++) { const l = document.createElement('div'); l.className = 'pl'; l.style.cssText = `left:-40px;top:${r * P + cs / 2 - 10}px;width:28px`; l.textContent = r + 1; host.appendChild(l); }
  }
  const frame = (x, y, w, h, col) => { const f = document.createElement('div'); f.className = 'hl'; f.style.cssText = `left:${x - 5}px;top:${y - 5}px;width:${w + 4}px;height:${h + 4}px;border-color:${col}`; host.appendChild(f); return f; };
  return { cells, P, cs, row: (r, c0 = 0, c1 = 17, col = NC) => frame(c0 * P, r * P, (c1 - c0) * P + cs, cs, col), col: (c, r0 = 0, r1 = 3, col = VC) => frame(c * P, r0 * P, cs, (r1 - r0) * P + cs, col) };
};
const lit = (cell, u, col = NC) => { setBg(cell.e, mix(C.soft, col, u)); cell.e.style.color = mix(C.ink2, '#FFFFFF', u); };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three tickets ---------- */
const JOBS = [['ticket', 'Cinema', 'ROW F · SEAT 12', 'cinema', ['ROW', 'F'], ['SEAT', '12']], ['mail', 'Letter', 'STREET · DOOR', 'letter', ['STREET', '5'], ['DOOR', '21']], ['train', 'Train', 'COACH · BERTH', 'train', ['COACH', 'S4'], ['BERTH', '32']]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a, b], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="adr"><span id="ja${i}"><em>${a[0]}</em>${a[1]}</span><span id="jc${i}"><em>${b[0]}</em>${b[1]}</span></div></div>`).join('');
const KIT = [['Na', 'row 3, column 1', 'Sodium'], ['K', 'row 4, column 1', 'Potassium']];
$('#wqs').innerHTML = KIT.map(([s, w], i) => `<div class="wq" id="wq${i}"><b class="n">${s}</b><span>${w}</span></div>`).join('') + `<div class="wq" id="wq2" style="background:var(--redBg);color:var(--red)">${M.icon('droplet', 24, C.red, 2.2)}<span>Both: violent in water</span></div>`;
const tKit = [wt('H3', 'Sodium'), wt('H4', 'Potassium'), wt('H4', 'violently')];

/* ---------- P: three keys + subshells ---------- */
$('#mdefI').innerHTML = M.icon('list', 28, '#fff', 2.2);
const QR = [['The outermost shell', 'PERIOD', NC, 'outermost'], ['The last subshell filled', 'BLOCK', GC, 'last'], ['The valence electrons', 'GROUP', VC, 'valence']];
$('#qrs').innerHTML = QR.map(([q, k, c], i) => `<div class="qr" id="qr${i}" style="top:${170 + i * 112}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="background:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt('P4', q[3]));
const SS = [['s', 1, 2], ['p', 3, 6], ['d', 5, 10], ['f', 7, 14]];
$('#sss').innerHTML = SS.map(([l, n, cap], i) => `<div class="ss" id="ss${i}" style="top:${84 + i * 100}px"><div class="sl">${l}</div><div class="bx">${'<i></i>'.repeat(n)}</div><div class="sc">${n} box${n > 1 ? 'es' : ''} · <b style="color:${EC}">${cap} e⁻</b></div></div>`).join('');
const tSs = occ('P2', ['s', 'p', 'd', 'f']);

/* ---------- S: the bench (build Na, then Cl, then K) ---------- */
const b = $('#bS'), AX = 392, AY = 262, RR = [56, 100, 144, 188], CAP = [2, 8, 8, 2];
const rings = RR.map(r => mk(b, 'circle', { cx: AX, cy: AY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const nuc = mk(b, 'circle', { cx: AX, cy: AY, r: 38, fill: NC });
const nucT = txt(b, AX, AY + 11, 'Na', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: '#fff', 'text-anchor': 'middle' });
const nTag = mk(b, 'g', {}); const nTagR = mk(nTag, 'rect', { x: AX + 188 - 4, y: AY - 20, width: 0, height: 40, rx: 9, fill: NC }); const nTagT = txt(nTag, AX + 196 + 12, AY + 7, 'n = 3', { 'font-size': 20, fill: '#fff', 'font-weight': 600 });
// electron schedule: [shell, slot, tAdd]
const tNa = [wt('S2', 'Two'), wt('S2', 'Two') + 0.25, ...Array.from({ length: 8 }, (_, i) => wt('S3', 'Eight') + i * 0.13), wt('S4', 'new')];
const tCl = Array.from({ length: 6 }, (_, i) => wt('S8', 'Two') + 0.3 + i * 0.16);
const tK = [wt('B1', 'potassium'), wt('B1', 'potassium') + 0.35];
const EL = [[0, 0, tNa[0]], [0, 1, tNa[1]], ...Array.from({ length: 8 }, (_, i) => [1, i, tNa[2 + i]]), [2, 0, tNa[10]], ...tCl.map((tt, i) => [2, i + 1, tt]), [2, 7, tK[0]], [3, 0, tK[1]]];
const eDots = EL.map(() => mk(b, 'circle', { r: 9, fill: HC }));
const slot = (k, j) => { const a = -Math.PI / 2 + j * 2 * Math.PI / CAP[k] + (k === 2 ? Math.PI / 8 : 0); return [AX + RR[k] * Math.cos(a), AY + RR[k] * Math.sin(a)]; };
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
// configuration under the atom (pieces write on as they are spoken)
const CFG = {
  Na: [['1s^2', wt('S2', 'One')], ['\\;2s^2\\;2p^6', wt('S3', 'Two')], [`\\;${last(3, 's', 1)}`, wt('S4', 'Three')]],
  Cl: [[`1s^2\\;2s^2\\;2p^6\\;3s^2\\;${last(3, 'p', 5)}`, wt('S8', 'Two')]],
  K: [[`1s^2\\;2s^2\\;2p^6\\;3s^2\\;3p^6\\;${last(4, 's', 1)}`, wt('B1', 'potassium') + 0.3]],
};
$('#cfg').innerHTML = Object.entries(CFG).map(([k, ps]) => `<span id="cf${k}" style="position:absolute;left:0;width:784px;text-align:center">${ps.map((p, i) => `<span id="cf${k}${i}">${K(p[0])}</span>`).join('')}</span>`).join('');
const tClIn = T0('S8'), tKIn = tK[0], tShr = T0('S2') - 0.2;
// address card
const AR = [['PERIOD', 'outermost shell, n', NC], ['BLOCK', 'subshell of the last e⁻', GC], ['GROUP', 'from the valence e⁻', VC]];
$('#crs').innerHTML = AR.map(([k, w, c], i) => `<div class="cr" id="cr${i}" style="top:${74 + i * 64}px"><div class="ck" style="color:${c}">${k}</div><div class="cw2">${w}</div><div class="cv" id="cv${i}" style="background:${c}">?</div></div>`).join('');
const tAd = { Na: [wt('S5', 'period'), wt('S6', 'block'), wt('S7', 'group')], Cl: [wt('S9', 'Period'), wt('S10', 'block'), 1e9] };
const T1t = table($('#pt1'), 36, 3, 15);
const fRow1 = T1t.row(2), fCol1 = T1t.col(0);
const th1 = PUC.think($('#th1'), { q: `${K(`\\mathrm{Na}`)} is 2, 8, 1 and ${K(`\\mathrm{K}`)} is 2, 8, 8, 1. Same group, or same period?`, opts: ['Same group', 'Same period'], right: 0, why: 'Both have 1 valence electron: group 1. K has 4 shells: period 4, one row below Na.' });

/* ---------- D + R: method and block map ---------- */
const MS = [['Write the electronic configuration', 'D2'], [`Biggest shell number ${K(tN('n'))} = the <b class="n">period</b>`, 'D3'], [`Subshell of the last ${K(tE('e^-'))} = the <b class="g">block</b>`, 'D4'], ['The <b class="v">group</b>, by block:', 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${82 + i * 70}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const GR = [['S BLOCK', 'outer s electrons', 'D5', 'For'], ['P BLOCK', `${K(`10 + s + p`)} electrons`, 'D6', 'For'], ['D BLOCK', `${K(`s + (n-1)d`)} electrons`, 'D7', 'For']];
$('#grs').innerHTML = GR.map(([k, w], i) => `<div class="gr" id="gr${i}" style="top:${370 + i * 66}px"><b style="color:${VC}">${k}</b><span>${w}</span></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.25), tGr = [wt('D5', 'group'), wt('D6', 'add'), wt('D7', 'add')];
const T2t = table($('#pt2'), 36, 3, 15, { labels: true });
const BL = [['s', 0, 'S BLOCK'], ['d', 2, 'D BLOCK'], ['p', 12, 'P BLOCK']];
const blab = BL.map(([bk, c0, s]) => { const d = document.createElement('div'); d.className = 'pl'; d.style.cssText = `left:${c0 * T2t.P}px;top:${4 * T2t.P + 12}px;width:${(bk === 'd' ? 10 : bk === 's' ? 2 : 6) * T2t.P - 3}px;color:${GC};font-size:17px`; d.textContent = s; $('#pt2').appendChild(d); return d; });
const fG1 = T2t.col(0), fG17 = T2t.col(16, 0, 3), fD = T2t.row(3, 2, 11, VC), fP2 = T2t.row(1, 0, 17, NC), fP4 = T2t.row(3, 0, 17, NC);
const OT = [['1 outer s electron: group 1', 'D5', 'group'], ['Cl: 10 + 2 + 5 = group 17', 'D6', 'Ten'], [`Fe: 4s² + 3d⁶ = group 8`, 'D7', 'd'], ['2s + 2p = 4 orbitals: 8 elements', 'R2', 'four'], ['4s + 3d + 4p = 9 orbitals: 18 elements', 'R3', 'Nine']];
$('#otg').innerHTML = OT.map(([s], i) => `<div class="otag" id="ot${i}" style="left:36px;top:${i < 3 ? 400 : 400}px;${i < 3 ? `background:${VC}` : `background:${NC}`}">${s}</div>`).join('');
const tOt = OT.map(o => wt(o[1], o[2]));
const orbTag = document.createElement('div'); orbTag.className = 'pillp'; orbTag.style.cssText = 'left:36px;top:470px'; orbTag.innerHTML = `Each orbital holds <b style="color:${EC};margin-left:6px">2 electrons</b>`; $('#bm').appendChild(orbTag);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${last(3, 's', 1)} \\;\\Rightarrow\\; \\text{period } ${tN(3)},\\; ${tG('s')}\\text{ block}`);

/* ---------- W: worked example + orbital boxes ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`1s^2 2s^2 2p^6 3s^2 3p^6 ${tN(4)}s^2 3${tG('d')}^{${tE(6)}}`)],
  [K(`n_{\\max} = ${tN(4)} \\Rightarrow \\text{period } ${tN(4)}`)],
  [K(`\\text{last } ${tE('e^-')} \\text{ in } 3${tG('d')} \\Rightarrow ${tG('d')}\\text{ block}`)],
  [K(`\\text{group} = 2 + 6 = ${tV(8)}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const wPill = document.createElement('div'); wPill.className = 'pillp ac'; wPill.style.cssText = 'left:36px;top:494px'; wPill.textContent = 'Period 4 · group 8 · d block: iron, Fe'; $('#wl').appendChild(wPill);
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ORB = [['1s', 1, 2, 36, 0], ['2s', 1, 2, 36, 1], ['2p', 3, 6, 36, 2], ['3s', 1, 2, 36, 3], ['3p', 3, 6, 400, 0], ['4s', 1, 2, 400, 1], ['3d', 5, 6, 400, 2]];
const arrows = (n, e) => { const a = Array(n).fill(''); for (let k = 0; k < e; k++) { const j = k < n ? k : k - n; a[j] += k < n ? '<b class="u"></b>' : '<b class="d"></b>'; } return a; };
$('#ors').innerHTML = ORB.map(([l, n, e, x, r], i) => `<div class="orow" id="or${i}" style="left:${x}px;top:${84 + r * 66}px"><div class="ol">${l}</div><div class="ob">${arrows(n, e).map(s => `<i>${s}</i>`).join('')}</div></div>`).join('');
$('#ors').querySelectorAll('b').forEach(x => { x.style.color = HC; });
const tOrb = occ('W3', ['s', 'p', 'd']);
const ATL = [['PERIOD', '4', NC], ['BLOCK', 'd', GC], ['GROUP', '8', VC]];
$('#ats').innerHTML = ATL.map(([k, v, c], i) => `<div class="at" id="at${i}" style="left:${36 + i * 246}px"><div class="ak" style="color:${c}">${k}</div><div class="av2" style="color:${c}">${v}</div></div>`).join('');
const tAt = [wt('W4', 'period'), wt('W5', 'block'), wt('W6', 'Group', 1)];
const fePill = document.createElement('div'); fePill.className = 'pillp'; fePill.style.cssText = 'left:36px;top:370px'; fePill.innerHTML = `${K(`${tN(4)}s^2\\;3${tG('d')}^6`)}<span>: group 2 + 6 = <b class="v">8</b></span>`; $('#wr').appendChild(fePill);

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K('\\mathrm{Cl}')} has 7 valence electrons, so group 7`, right: `${K('\\mathrm{Cl}')} is p block: 10 + 7 = group 17` });
const tsv = $('#tS');
const badge = (x, s, col) => { const g = mk(tsv, 'g', {}); mk(g, 'rect', { x: x - 90, y: 76, width: 180, height: 84, rx: 14, fill: '#fff', stroke: col, 'stroke-width': 3 }); txt(g, x, 106, 'GROUP', { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }); txt(g, x, 146, s, { 'text-anchor': 'middle', 'font-size': 36, fill: col, 'font-weight': 600 }); return g; };
const g7 = badge(130, '7', C.red), g17 = badge(390, '17', C.ok);
const x7 = mk(tsv, 'path', { d: 'M70 70 L190 170 M190 70 L70 170', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const ck = mk(tsv, 'g', {}); mk(ck, 'circle', { cx: 470, cy: 76, r: 20, fill: C.ok }); ck.insertAdjacentHTML('beforeend', `<g transform="translate(458 64)">${M.icon('check', 24, '#fff', 3)}</g>`);
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Given Z or a configuration: find the period, group or block' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `An element has the configuration ${K('[\\mathrm{Ar}]\\,3d^{10}\\,4s^2\\,4p^3')}. Find its period, block and group.`, qW: 780,
  opts: ['4, p block, group 15', '4, d block, group 5', '3, p block, group 15', '4, p block, group 5'], right: 0, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`n_{\\max} = ${tN(4)} \\Rightarrow \\text{period } ${tN(4)}`)], [K(`\\text{last } ${tE('e^-')} \\to 4${tG('p')} \\Rightarrow ${tG('p')}\\text{ block}`)], [K(`\\text{group} = 10 + 2 + 3 = ${tV(15)}`)], ['D forgot the + 10']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'D')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · electronic configuration and position', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`\\text{period} = ${tN('n_{\\max}')} \\qquad \\text{block} = \\text{subshell of the last } ${tE('e^-')}`), `<b class="v">Group</b>: s block = ns · p block = 10 + ns + np · d block = ns + (n-1)d`, '<b>Period length</b>: 2 electrons per orbital · period 2 = 8 · period 4 = 18', '<b>Na</b> 3s¹: period 3, group 1, s · <b>Cl</b> 3s² 3p⁵: period 3, group 17, p', '<b>Fe</b> 4s² 3d⁶: period 4, group 8, d block'] });
const YQ = ['Which part of the configuration gives the period?', 'Why does period 4 hold 18 elements?', 'Chlorine has 7 valence electrons. Why is it in group 17?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 31', topic: 'Why is potassium bigger than sodium? Atomic and Ionic Radii', y: 764 });
const avD = PUC.avatar($('#sD'), { x: 976 + 36, y: 270 + 470, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So the table is just electrons in order!' });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('S4', 'brand') - 0.2, 1.1, 760, 560], [T0('S5') + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  // NCERT chip is long: shrink its font only if it would run into the subject pill
  const nc = $('#nchip'), sj = $('#subj'); if (nc.offsetWidth > 1760 - sj.offsetWidth - 32 - 160) nc.style.fontSize = Math.floor(22 * (1760 - sj.offsetWidth - 32 - 160) / nc.offsetWidth) + 'px';
  let x = 36; [0, 1, 2].forEach(i => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; if (x > 760) { e.style.left = '36px'; } });
  $('#wq2').style.left = '36px';
  geo.tag = nTagT.getComputedTextLength() + 24;
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('#mss .ms, #grs .gr').forEach(q => { if (q.offsetLeft + q.offsetWidth > 750) q.style.transform = ''; });
  ['cfNa', 'cfCl', 'cfK'].forEach(id => { const e = $('#' + id); if (e.scrollWidth > 740) e.style.fontSize = Math.floor(44 * 740 / e.scrollWidth) + 'px'; });
}

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: the three tickets pop in with their words, then leave as the title travels */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: three addresses, Diya's study */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    const tRow = wt('H2', 'row'), tColm = wt('H2', 'column');
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 });
      const a = $('#ja' + i), c = $('#jc' + i); M.vis(a, t, tMorph + 0.5 + i * 0.12, 1e9, POP); M.vis(c, t, tMorph + 0.6 + i * 0.12, 1e9, POP);
      const ua = M.io((t - tRow + 0.1) / 0.3), uc = M.io((t - tColm + 0.1) / 0.3);
      setBg(a, mix('#FFFFFF', NC, ua)); a.style.color = mix(C.ink, '#FFFFFF', ua); a.querySelector('em').style.color = mix(C.mute, C.ac2, ua);
      setBg(c, mix('#FFFFFF', VC, uc)); c.style.color = mix(C.ink, '#FFFFFF', uc); c.querySelector('em').style.color = mix(C.mute, '#E4DDF8', uc); });
    M.vis($('#hjP'), t, wt('H2', 'Every') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    [0, 1].forEach(i => M.vis($('#wq' + i), t, tKit[i] - 0.1, tKit[2] - 0.1, { ...POP, outDur: 0.25, ody: 0 }));
    M.vis($('#wq2'), t, tKit[2] - 0.05, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 });
    M.vis($('#hTz'), t, wt('H5', 'address') - 0.15, 1e9, POP);
  }

  /* P: three keys + subshells */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, T0('P3') - 0.3, out, { dx: 60, dy: 0, ...o });
    M.vis($('#mdef'), t, wt('P3', 'electronic') - 0.1, 1e9, POP);
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : wt('P4', 'Valence', 1); const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    SS.forEach((_, i) => { const el = $('#ss' + i); M.vis(el, t, tP1 + 0.4 + i * 0.15, 1e9, { dx: -16, dy: 0 });
      const on = M.io((t - tSs[i]) / 0.2) * (1 - M.io((t - (tSs[i + 1] ?? T0('P3'))) / 0.3)); setBg(el, mix(C.soft, C.ac2, on));
      el.querySelectorAll('.bx i').forEach((bx, k) => { bx.style.opacity = M.clamp((t - tP1 - 0.6 - i * 0.15 - k * 0.05) / 0.15).toFixed(3); }); });
    M.vis($('#pwP'), t, wt('P3', 'list') - 0.1, 1e9, POP);
  }

  /* S + B: the bench, address card, table, think */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tShr + 0.4, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); const ofs = sh >= 1 ? 0 : (wv - 784) / 2; b.style.transform = `translateX(${ofs.toFixed(1)}px)`; $('#cfg').style.transform = `translateX(${ofs.toFixed(1)}px)`; }
    M.vis($('#ad'), t, tShr - 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#tb'), t, tShr + 0.2, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'same') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'Each') });
    // atom: rings draw on as shells are used, electrons fly in to their slots
    const ringT = [tNa[0] - 0.3, tNa[2] - 0.3, wt('S4', 'brand') - 0.2, tK[1] - 0.3];
    rings.forEach((r, k) => M.draw(r, t, ringT[k], 0.6));
    const elem = t >= tKIn - 0.2 ? 'K' : t >= tClIn ? 'Cl' : 'Na';
    M.setT(nucT, elem); fade(nuc, t, tS1 + 0.2); fade(nucT, t, tS1 + 0.3);
    let lastI = -1; EL.forEach(([, , ta], i) => { if (t >= ta) lastI = i; });
    EL.forEach(([k, j, ta], i) => { const d = eDots[i], u = M.io((t - ta) / 0.55), [sx, sy] = slot(k, j), fx = 760, fy = 40;
      attr(d, 'cx', M.lerp(fx, sx, u).toFixed(1)); attr(d, 'cy', M.lerp(fy, sy, u).toFixed(1)); d.style.opacity = M.clamp((t - ta) / 0.12).toFixed(3); M.hide(d, t < ta);
      attr(d, 'fill', i === lastI ? EC : HC); attr(d, 'r', i === lastI ? 11 : 9); });
    // outermost shell tag
    const outK = elem === 'K' ? 3 : 2, tgOn = M.io((t - wt('S5', 'outermost') + 0.1) / 0.3);
    rings.forEach((r, k) => { attr(r, 'stroke', k === outK ? mix(C.dim, NC, tgOn) : C.dim); attr(r, 'stroke-width', k === outK ? (2 + 2 * tgOn).toFixed(2) : 2); });
    M.setT(nTagT, `n = ${outK + 1}`); attr(nTagR, 'width', geo.tag.toFixed(1)); attr(nTagR, 'x', (AX + RR[outK] + 8).toFixed(1)); attr(nTagT, 'x', (AX + RR[outK] + 20).toFixed(1));
    fade(nTag, t, wt('S5', 'outermost'));
    const TAG = [[tS1 + 0.3, 'Na · Z = 11'], [wt('S2', 'Two'), 'SHELL 1 · 2 e⁻'], [wt('S3', 'Eight'), 'SHELL 2 · 8 e⁻'], [wt('S4', 'new'), 'SHELL 3 · 1 e⁻'], [T0('S5'), 'Na · 2, 8, 1'], [tClIn, 'Cl · Z = 17'], [wt('S8', 'seven'), 'Cl · 2, 8, 7'], [tKIn, 'K · Z = 19 · 2, 8, 8, 1']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    // configuration
    Object.entries(CFG).forEach(([k, ps]) => { const on = k === elem; M.hide($('#cf' + k), !on); if (on) ps.forEach((p, i) => PUC.write($('#cf' + k + i), t, p[1] - 0.05, 0.6)); });
    // address card
    M.setT($('#adL'), elem === 'Na' ? 'ADDRESS · SODIUM' : elem === 'Cl' ? 'ADDRESS · CHLORINE' : 'ADDRESS · POTASSIUM');
    const VAL = { Na: ['3', 's', '1'], Cl: ['3', 'p', '?'], K: ['?', '?', '?'] }, TT = tAd[elem] || [1e9, 1e9, 1e9];
    AR.forEach((_, i) => { const cv = $('#cv' + i), on = t >= TT[i]; M.setT(cv, on ? VAL[elem][i] : '?'); setBg(cv, on ? AR[i][2] : C.dim);
      const fl = M.io((t - TT[i]) / 0.2) * (1 - M.io((t - TT[i] - 0.6) / 0.4)); setBg($('#cr' + i), mix(C.soft, C.ac2, fl));
      M.vis($('#cr' + i), t, tShr + 0.1 + i * 0.12, 1e9, { dx: -16, dy: 0 }); });
    // table: Na lights at period, row frame at period, column at group; Cl and K later
    const uNa = M.io((t - tAd.Na[0] + 0.1) / 0.3), uCl = M.io((t - tAd.Cl[0] + 0.1) / 0.3), uK = M.io((t - tKIn - 0.3) / 0.3);
    lit(T1t.cells.Na, uNa * (1 - 0.5 * uCl * (1 - uK))); lit(T1t.cells.Cl, uCl); lit(T1t.cells.K, uK);
    fade(fRow1, t, tAd.Na[0], tKIn); fade(fCol1, t, tAd.Na[2], tClIn);
  }

  /* D + R: the method and the block map */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('T1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#bm'), t, tD1 + 0.25, z, { dx: 60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.6);
      const nxt = i < 3 ? tMs[i + 1] : tR1; const pu = M.io((t - tMs[i]) / 0.2) * (1 - M.io((t - nxt + 0.2) / 0.3)); r.querySelector('.sn').style.background = mix(C.dim, C.ac, 0.35 + 0.65 * pu); });
    GR.forEach((_, i) => { const el = $('#gr' + i); M.vis(el, t, tGr[i] - 0.1, 1e9, { dx: -16, dy: 0 }); const nxt = i < 2 ? tGr[i + 1] : tR1; const on = M.io((t - tGr[i]) / 0.25) * (1 - M.io((t - nxt) / 0.3)); setBg(el, mix(C.soft, '#E4DDF8', on)); });
    // block map: cells appear, tint by block at step 3, element cells light
    const tTint = wt('D4', 'block');
    for (const s in T2t.cells) { const c = T2t.cells[s], bk = blockOf(c.r, c.c), u = M.io((t - tTint - (bk === 's' ? 0 : bk === 'd' ? 0.25 : 0.5)) / 0.3);
      const hot = (s === 'Na' && t >= tGr[0] && t < tGr[1]) || (s === 'Cl' && t >= tGr[1] && t < tGr[2]) || (s === 'Fe' && t >= tGr[2] && t < tR1);
      setBg(c.e, hot ? NC : mix(C.soft, BT[bk], u)); c.e.style.color = hot ? '#fff' : C.ink2; c.e.style.opacity = M.clamp((t - tD1 - 0.4 - c.r * 0.08) / 0.25).toFixed(3); }
    $('#pt2').querySelectorAll('.pl').forEach(l => { if (!blab.includes(l)) l.style.opacity = M.clamp((t - T0('D3')) / 0.3).toFixed(3); });
    blab.forEach((l, i) => fade(l, t, tTint + i * 0.25));
    M.setT($('#bmL'), t < tR1 ? 'BLOCKS · WHERE THE LAST ELECTRON GOES' : 'PERIOD LENGTH · 2 ELECTRONS PER ORBITAL');
    fade(fG1, t, tGr[0], tGr[1]); fade(fG17, t, tGr[1], tGr[2]); fade(fD, t, tGr[2], tR1); fade(fP2, t, wt('R2', 'Period'), T0('R3')); fade(fP4, t, wt('R3', 'Period'));
    OT.forEach((_, i) => M.vis($('#ot' + i), t, tOt[i] - 0.1, i < 4 ? tOt[i + 1] - 0.15 : 1e9, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis(orbTag, t, wt('R1', 'orbital') - 0.1, 1e9, POP);
    avD(t, T1('R3') - 0.2, z);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'outer') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'last') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'block') + 0.2, 0.8);
  }

  /* W: worked example + orbital boxes */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis(wPill, t, wt('W7', 'iron') - 0.2, 1e9, POP);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    ORB.forEach((_, i) => { const r = $('#or' + i), ta = tOrb[i] ?? T0('W3'); M.vis(r, t, (i === 0 ? T0('W3') : ta) - 0.25, 1e9, { dx: -12, dy: 0 });
      r.querySelectorAll('b').forEach((a, k) => { const u = M.clamp((t - ta - k * 0.07) / 0.12); a.style.opacity = u.toFixed(3); a.style.color = (i === 6 && t < T0('W4')) ? EC : HC; });
      const lab = r.querySelector('.ol'); lab.style.color = i === 5 ? mix(C.ink, NC, M.io((t - tAt[0] + 0.1) / 0.3)) : i === 6 ? mix(C.ink, GC, M.io((t - tAt[1] + 0.1) / 0.3)) : C.ink;
      r.querySelectorAll('.ob i').forEach(bx => { bx.style.borderColor = i === 6 ? mix(C.ink2, GC, M.io((t - tAt[1] + 0.1) / 0.3)) : i === 5 ? mix(C.ink2, NC, M.io((t - tAt[0] + 0.1) / 0.3)) : C.ink2; }); });
    ATL.forEach((_, i) => { const a = $('#at' + i); M.vis(a, t, tAt[i] - 0.1, 1e9, { dy: 16 }); const fl = M.io((t - wt('W7', 'Period') - i * 0.25) / 0.2) * (1 - M.io((t - wt('W7', 'Period') - i * 0.25 - 0.4) / 0.3)); setBg(a, mix(C.soft, C.ac2, fl)); });
    M.vis(fePill, t, wt('W6', 'Group') + 0.4, 1e9, POP);
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'Chlorine') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'Add') - 0.1 });
    fade(g7, t, wt('X2', 'seven', 1) - 0.1); M.draw(x7, t, wt('X3', 'But'), 0.4); fade(g17, t, wt('X3', 'seventeen') - 0.1); fade(ck, t, wt('X3', 'seventeen') + 0.2);
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE')], tType: wt('E1', 'Give') });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tNx - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
