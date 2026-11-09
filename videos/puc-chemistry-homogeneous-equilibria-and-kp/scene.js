// PUC Chemistry Ep 61: Homogeneous equilibria and Kp (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: N teal, H ink, NH3 violet label; pressure blue; RT orange; delta n gold; Kc teal; Kp blue; ok green, wrong red
const NC = C.ac, HC = C.ink, GC = '#B7791F', OC = '#7A4FE0', XC = '#C8461B', BC = '#2F6FEB', OK = C.ok, RD = C.red, OKT = '#CDEBD9', RDT = '#F6D3D3';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tB = s => `\\textcolor{${BC}}{${s}}`, tX = s => `\\textcolor{${XC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tN = s => `\\textcolor{${NC}}{${s}}`, tO = s => `\\textcolor{${OK}}{${s}}`, tR = s => `\\textcolor{${RD}}{${s}}`;
const Kc = tN('K_c'), Kp = tB('K_p'), RT = tX('RT'), dn = tG('\\Delta n');
const pp = s => `${tB('p')}_{\\mathrm{${s}}}`;
const KPNH3 = `${Kp} = \\dfrac{${pp('NH_3')}^{2}}{${pp('N_2')}\\,${pp('H_2')}^{3}}`;
const pos = (e, x, y) => { attr(e, 'cx', x.toFixed(1)); attr(e, 'cy', y.toFixed(1)); };
const dot = (p, r, fill) => mk(p, 'circle', { r, fill });
const rnd = (i, k) => { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v); };
const line = (p, col, w = 5) => mk(p, 'line', { stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' });
const setL = (l, x1, y1, x2, y2) => { attr(l, 'x1', x1.toFixed(1)); attr(l, 'y1', y1.toFixed(1)); attr(l, 'x2', x2.toFixed(1)); attr(l, 'y2', y2.toFixed(1)); };
const tri = u => { const f = u - Math.floor(u); return f < 0.5 ? f * 2 : 2 - f * 2; };

Object.assign(M.IC, {
  heart: ['M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z'],
  bike: ['M5.5 17.5a3.5 3.5 0 1 0 0-.01', 'M18.5 17.5a3.5 3.5 0 1 0 0-.01', 'M15 6h2l3 11.5', 'M5.5 17.5 9 9h6l-3 8.5'],
  gauge: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'm12 12 4-4', 'M12 12h.01'],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tL1 = T0('L1'), tD1 = T0('D1'), tG1 = T0('G1'), tC1 = T0('C1'), tK1 = T0('K1'), tR1 = T0('R1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tFc = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tFc, tFc + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['heart', 'Blood pressure', 'THE DOCTOR', 'doctor', 'PRESSURE', RD], ['bike', 'Tyre pressure', 'THE CYCLIST', 'cyclist', 'PRESSURE', BC], ['gauge', 'Gas cylinder', 'THE COOK', 'cook', 'PRESSURE', XC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]) - 0.2);
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['The gauge reads 3 bar, not mol per litre', 'Three', 'H3'], ['Can K use pressures instead?', 'pressures', 'H4']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon('gauge', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt(k[2], k[1]) - 0.2);

/* ---------- P: smoothie ---------- */
const QR = [['Homogeneous: the same all through', 'SAME', 'P1', 'homogeneous', NC], ['A smoothie: one blended phase', 'ONE PHASE', 'P2', 'smoothie', OK], ['All gases, or all in one solution', 'SAME PHASE', 'P3', 'gases', BC]];
$('#qrs').innerHTML = QR.map(([q, k, , , c], i) => `<div class="qr" id="qr${i}" style="top:${96 + i * 104}px"><div class="nn">${i + 1}</div><div class="qt">${q}</div><div class="qk" style="color:${c}">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const ps = $('#pS');
const smo = mk(ps, 'g', {}); mk(smo, 'path', { d: 'M110 140 L140 430 H290 L320 140 Z', fill: '#F3C7D4', stroke: C.ink2, 'stroke-width': 4, 'stroke-linejoin': 'round' });
for (let i = 0; i < 40; i++) mk(smo, 'circle', { cx: 145 + (i % 8) * 20 + (Math.floor(i / 8) % 2) * 10, cy: 170 + Math.floor(i / 8) * 52, r: 3, fill: '#D98AA3' });
txt(smo, 215, 480, 'ONE PHASE', { 'text-anchor': 'middle', 'font-size': 20, fill: OK, 'font-weight': 600 });
const sal = mk(ps, 'g', {}); mk(sal, 'path', { d: 'M440 300 a170 130 0 0 0 300 0 Z', fill: '#FBF5EC', stroke: C.ink2, 'stroke-width': 4 });
[[490, 285, '#E85D5D', 'r'], [540, 270, '#F2B33D', 's'], [600, 288, '#6BB36B', 'r'], [660, 272, '#9B7BE8', 's'], [700, 290, '#E85D5D', 's'], [565, 330, '#F2B33D', 'r'], [630, 340, '#6BB36B', 's'], [520, 320, '#9B7BE8', 'r']].forEach(([x, y, c, k]) => k === 'r' ? mk(sal, 'rect', { x: x - 18, y: y - 18, width: 36, height: 36, rx: 6, fill: c }) : mk(sal, 'circle', { cx: x, cy: y, r: 18, fill: c }));
txt(sal, 590, 480, 'SEPARATE PIECES', { 'text-anchor': 'middle', 'font-size': 20, fill: C.mute, 'font-weight': 600 });
const smoT = txt(ps, 215, 116, '✓ HOMOGENEOUS', { 'text-anchor': 'middle', 'font-size': 20, fill: OK, 'font-weight': 700 }), salT = txt(ps, 590, 200, '✗ NOT HOMOGENEOUS', { 'text-anchor': 'middle', 'font-size': 20, fill: RD, 'font-weight': 700 });

/* ---------- S: tank ---------- */
const b = $('#bS'), BX0 = 110, BX1 = 530, BY0 = 110, BY1 = 450;
const tank = mk(b, 'rect', { x: BX0, y: BY0, width: BX1 - BX0, height: BY1 - BY0, rx: 24, fill: '#FBFCFE', stroke: C.ink2, 'stroke-width': 5 });
const flashes = Array.from({ length: 14 }, () => mk(b, 'circle', { r: 14, fill: 'none', stroke: XC, 'stroke-width': 3 }));
const mol = (kind, i) => { const g = mk(b, 'g', {}); if (kind === 'N2') { mk(g, 'line', { x1: -12, y1: 0, x2: 12, y2: 0, stroke: '#9AA3B5', 'stroke-width': 5 }); dot(g, 13, NC).setAttribute('cx', -12); const d2 = dot(g, 13, NC); d2.setAttribute('cx', 12); }
  else if (kind === 'H2') { mk(g, 'line', { x1: -9, y1: 0, x2: 9, y2: 0, stroke: '#9AA3B5', 'stroke-width': 4 }); const a = dot(g, 8, HC); a.setAttribute('cx', -9); const c = dot(g, 8, HC); c.setAttribute('cx', 9); }
  else { [0, 120, 240].forEach(an => { const r = (an - 90) * Math.PI / 180; mk(g, 'line', { x1: 0, y1: 0, x2: 20 * Math.cos(r), y2: 20 * Math.sin(r), stroke: '#9AA3B5', 'stroke-width': 4 }); const h = dot(g, 8, HC); h.setAttribute('cx', 20 * Math.cos(r)); h.setAttribute('cy', 20 * Math.sin(r)); }); dot(g, 13, NC); mk(g, 'circle', { r: 26, fill: 'none', stroke: OC, 'stroke-width': 2, 'stroke-dasharray': '4 4' }); }
  return { g, kind, vx: 0.05 + rnd(i, 1) * 0.06, vy: 0.04 + rnd(i, 2) * 0.06, px: rnd(i, 3), py: rnd(i, 4), m: kind === 'NH3' ? 30 : 18 }; };
const mols = [...Array(4).fill('N2'), ...Array(8).fill('H2'), ...Array(4).fill('NH3')].map((k, i) => mol(k, i));
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const key = [['N₂', NC], ['H₂', HC], ['NH₃', OC]].map(([s, c], i) => txt(b, 160 + i * 150, 500, s, { 'font-size': 20, fill: c, 'font-weight': 600 }));
const es = $('#eS');
$('#eG').innerHTML = K(`\\mathrm{N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)}`);
const PP = [['N₂', NC, 0.25], ['H₂', HC, 0.5], ['NH₃', OC, 0.25]];
const ppRows = PP.map(([s, c, f], i) => { const g = mk(es, 'g', {}); txt(g, 36, 206 + i * 64, `p of ${s}`, { 'font-size': 20, fill: c, 'font-weight': 600 }); const r = mk(g, 'rect', { x: 200, y: 182 + i * 64, width: 0, height: 34, rx: 8, fill: c }); return { g, r, w: 520 * f }; });
const totG = mk(es, 'g', {}); txt(totG, 36, 420, 'TOTAL', { 'font-size': 20, fill: BC, 'font-weight': 700 });
const totR = PP.map(([, c]) => mk(totG, 'rect', { x: 200, y: 396, width: 0, height: 40, fill: c }));
const totT = txt(es, 392, 470, 'p total = sum of partial pressures', { 'text-anchor': 'middle', 'font-size': 18, fill: BC, 'font-weight': 600 });
$('#eP').innerHTML = `Also in solution: ${K('\\mathrm{Fe^{3+}(aq) + SCN^{-}(aq) \\rightleftharpoons [Fe(SCN)]^{2+}(aq)}')}`;
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 470, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Like my tyre: every hit on the wall adds up.' });

/* ---------- L: Kp ---------- */
$('#lEq0').innerHTML = K(`\\text{Before: } ${Kc} = \\dfrac{[\\mathrm{NH_3}]^{2}}{[\\mathrm{N_2}][\\mathrm{H_2}]^{3}}`);
$('#lEq').innerHTML = K(KPNH3);
const GT = [[tB('p'), 'PARTIAL PRESSURE', 'IN BAR', BC, wt('L1', 'partial')], ['\\tfrac{\\text{products}}{\\text{reactants}}', 'TOP AND BOTTOM', 'SAME AS Kc', OC, wt('L2', 'Products')], ['x^{n}', 'POWERS', 'FROM THE EQUATION', XC, wt('L2', 'power')]];
$('#gts').innerHTML = GT.map(([k, v, s, c], i) => `<div class="gt" id="gt${i}" style="left:${36 + i * 512}px;top:300px;height:240px"><div class="gk" style="top:30px;font-size:40px">${K(k)}</div><div class="gv" style="color:${c};top:124px">${v}</div><div class="gs" style="top:176px">${s}</div></div>`).join('');

/* ---------- D: derivation ---------- */
const MS = [[K(`${tB('p')}V = nRT`), 'D2'], [K(`${tB('p')} = \\dfrac{n}{V}\\,${RT} = c\\,${RT}`), 'D3'], [K(`${pp('i')} = [\\mathrm{i}]\\,${RT}`), 'D4'], [K(`${Kp} = ${Kc}\\,(${RT})^{${dn}}`), 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="rl" id="ms${i}" style="top:${96 + i * 108}px;height:92px"><div class="nn" style="top:22px">${i + 1}</div><div class="rt2" style="height:92px;font-size:32px">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.3);
const DL = [K(`${Kp} = \\dfrac{([\\mathrm{NH_3}]${RT})^{2}}{([\\mathrm{N_2}]${RT})([\\mathrm{H_2}]${RT})^{3}}`), K(`= \\dfrac{[\\mathrm{NH_3}]^{2}}{[\\mathrm{N_2}][\\mathrm{H_2}]^{3}} \\times (${RT})^{2-4}`), K(`= ${Kc}\\,(${RT})^{${tG('-2')}}`)];
$('#dLs').innerHTML = DL.map((s, i) => `<div class="fx fxc" id="dl${i}" style="top:${90 + i * 150}px;font-size:36px">${s}</div>`).join('');

/* ---------- G: delta n ---------- */
const GR = [[K(`${dn} = n_{\\text{gas, products}} - n_{\\text{gas, reactants}}`), wt('G2', 'moles')], [K(`\\mathrm{NH_3}:\\ 2 - 4 = ${tG('-2')}`), wt('G3', 'ammonia')], [K(`\\mathrm{HI}:\\ 2 - 2 = ${tG('0')} \\Rightarrow ${Kp} = ${Kc}`), wt('G4', 'hydrogen')], [K(`R = 0.0831\\ \\text{bar L mol}^{-1}\\text{K}^{-1}`), wt('G5', 'zero')]];
$('#grs').innerHTML = GR.map(([s], i) => `<div class="rl" id="gr${i}" style="top:${96 + i * 100}px"><div class="nn">${i + 1}</div><div class="rt2" style="font-size:28px">${s}</div></div>`).join('');
const gs = $('#gS');
const row = (y, lefts, rights, lab) => { const g = mk(gs, 'g', {}); txt(g, 36, y - 52, lab, { 'font-size': 18, fill: HC, 'font-weight': 600 }); const L = lefts.map((c, i) => mk(g, 'rect', { x: 36 + i * 54, y: y - 30, width: 44, height: 44, rx: 8, fill: c })); txt(g, 36 + lefts.length * 54 + 30, y + 2, '⇌', { 'text-anchor': 'middle', 'font-size': 34, fill: HC }); const R = rights.map((c, i) => mk(g, 'rect', { x: 36 + lefts.length * 54 + 70 + i * 54, y: y - 30, width: 44, height: 44, rx: 8, fill: c })); const v = txt(g, 748, y + 2, '', { 'text-anchor': 'end', 'font-size': 26, fill: GC, 'font-weight': 700 }); return { g, L, R, v }; };
const gNH = row(200, [NC, HC, HC, HC], [OC, OC], 'N₂ + 3H₂ ⇌ 2NH₃ · GAS MOLES'), gHI = row(380, [HC, OC], [OC, OC], 'H₂ + I₂ ⇌ 2HI · GAS MOLES');
const gR = txt(gs, 392, 500, 'R = 0.0831 bar L mol⁻¹ K⁻¹ · T in kelvin', { 'text-anchor': 'middle', 'font-size': 18, fill: XC, 'font-weight': 600 });

/* ---------- C ---------- */
$('#caK').innerHTML = K(`\\mathrm{H_2 + I_2 \\rightleftharpoons 2HI},\\ ${dn} = ${tG('0')}`); $('#caK2').innerHTML = K(`${Kp} = ${Kc}`);
$('#cfK').innerHTML = K(`\\mathrm{N_2 + 3H_2 \\rightleftharpoons 2NH_3},\\ ${dn} = ${tG('-2')}`); $('#cfK2').innerHTML = K(`${Kp} = \\dfrac{${Kc}}{(${RT})^{2}}`);
$('#caV').innerHTML = `<span style="color:${OK}">SAME VALUE</span>`; $('#cfV').innerHTML = `<span style="color:${BC}">Kp SMALLER</span>`;
$('#caV').style.top = $('#cfV').style.top = '400px';
const th1 = PUC.think($('#th1'), { q: '2SO₂ + O₂ ⇌ 2SO₃ at 500 K. Is Kp bigger or smaller than Kc?', opts: ['Bigger', 'Smaller'], right: 1, why: 'Smaller. Δn = -1, so Kp = Kc ÷ RT, and RT ≈ 42.' });

/* ---------- R: units ---------- */
const RL = [[K(`${Kc}:\\ (\\text{mol L}^{-1})^{${dn}}`), wt('R2', 'K')], [K(`${Kp}:\\ (\\text{bar})^{${dn}}`), wt('R2', 'bar')], [K(`${dn} = 0:\\ \\text{no units}`), T0('R3')], ['Divide by 1 mol L⁻¹ or 1 bar: no units', wt('R4', 'standard')]];
$('#rrs').innerHTML = RL.map(([s], i) => `<div class="rl" id="rl${i}" style="top:${96 + i * 100}px"><div class="nn">${i + 1}</div><div class="rt2" style="font-size:28px">${s}</div></div>`).join('');
const COL = [[20, 160], [190, 260], [460, 230]];
const sp = (k, s, st = '') => `<span style="left:${COL[k][0]}px;width:${COL[k][1]}px;${st}">${s}</span>`;
const UR = [['0', '\\text{none}', '\\text{none}'], ['+1', '\\text{mol L}^{-1}', '\\text{bar}'], ['-1', '\\text{L mol}^{-1}', '\\text{bar}^{-1}'], ['-2', '\\text{L}^{2}\\,\\text{mol}^{-2}', '\\text{bar}^{-2}']];
$('#tbl').innerHTML = `<div class="th" id="th0" style="top:84px">${sp(0, 'Δn', `color:${GC}`)}${sp(1, 'Kc UNITS', `color:${NC}`)}${sp(2, 'Kp UNITS', `color:${BC}`)}</div>` + UR.map((r, i) => `<div class="tr" id="tr${i}" style="top:${136 + i * 88}px">${sp(0, K(tG(r[0])))}${sp(1, K(r[1]))}${sp(2, K(r[2]))}</div>`).join('');

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${Kp} = ${Kc}\\,(${RT})^{${dn}}`);

/* ---------- W ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${dn} = 2 - 1 = ${tG('+1')}`)],
  [K(`${RT} = 0.0831 \\times 500 = 41.55`)],
  [K(`${Kp} = 0.040 \\times 41.55 \\approx ${tO('1.66')}\\ \\text{bar}`)],
  ['Δn = +1: Kp bigger, unit bar']], { label: 'WORKED EXAMPLE', y0: 220, dy: 86 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS');
const chip = (x, y, lab, col) => { const g = mk(ws, 'g', {}); mk(g, 'rect', { x: x - 130, y: y - 50, width: 260, height: 100, rx: 16, fill: C.soft, stroke: col, 'stroke-width': 3 }); const v = txt(g, x, y + 12, lab, { 'text-anchor': 'middle', 'font-size': 32, fill: col, 'font-weight': 600 }); return { g, v }; };
const wKc = chip(200, 300, 'Kc = 0.040', NC), wKp = chip(590, 300, 'Kp = 1.66 bar', BC);
const wAr = mk(ws, 'g', {}); mk(wAr, 'path', { d: 'M340 300 H440', stroke: XC, 'stroke-width': 6, 'stroke-linecap': 'round' }); mk(wAr, 'path', { d: 'M452 300 L432 288 L432 312 Z', fill: XC }); txt(wAr, 395, 270, '× RT¹', { 'text-anchor': 'middle', 'font-size': 22, fill: XC, 'font-weight': 600 }); txt(wAr, 395, 345, '× 41.55', { 'text-anchor': 'middle', 'font-size': 20, fill: XC, 'font-weight': 600 });
const wMol = mk(ws, 'g', {}); txt(wMol, 392, 150, 'GAS MOLES: 1 → 2', { 'text-anchor': 'middle', 'font-size': 22, fill: GC, 'font-weight': 600 }); txt(wMol, 392, 186, 'Δn = +1', { 'text-anchor': 'middle', 'font-size': 22, fill: GC, 'font-weight': 700 });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: K(`0.040 \\times ${tR('8.314')} \\times 500 = 166\\ \\text{bar}`), right: K(`0.040 \\times ${tO('0.0831')} \\times 500 = 1.66\\ \\text{bar}`) });
const tsv = $('#tS');
const tq1 = txt(tsv, 200, 110, '8.314: joules', { 'font-size': 26, fill: RD, 'font-weight': 600 }), tq2 = txt(tsv, 200, 160, '0.0831: bar L', { 'font-size': 26, fill: OK, 'font-weight': 600 }), tq3 = txt(tsv, 200, 216, 'T always in kelvin', { 'font-size': 22, fill: XC, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Deriving Kp = Kc(RT)^Δn, finding Kp from Kc, and the units of K' });
const OPT = ['0.0353\\ \\text{bar}^{-2}', '1.05 \\times 10^{5}\\ \\text{bar}^{2}', '1.47\\ \\text{bar}^{-1}', '0.0353\\ \\text{bar}^{2}'];
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `${K('\\mathrm{N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)}')} at 500 K has Kc = 61 L² mol⁻². Find Kp. (R = 0.0831 bar L mol⁻¹ K⁻¹)`, qW: 780,
  opts: OPT.map(s => K(s)), right: 0, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[K(`${dn} = 2 - 4 = ${tG('-2')}`)], [K(`(${RT})^{2} = 41.55^{2} \\approx 1726`)], [K(`61 \\div 1726 = ${tO('0.0353')}`)], ['C used Δn = -1']], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'used') - 0.2];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · Homogeneous equilibria and Kp', y0: 96, dy: 74, txt: [0, 0, 1, 1, 1],
  lines: [K(`${Kp} = ${pp('NH_3')}^{2} \\,/\\, ${pp('N_2')}\\,${pp('H_2')}^{3}`), K(`${Kp} = ${Kc}\\,(${RT})^{${dn}},\\quad R = 0.0831\\ \\text{bar L mol}^{-1}\\text{K}^{-1}`),
    '<b>Homogeneous</b>: all reactants and products in one phase',
    '<b>Δn</b> = gas moles of products - gas moles of reactants',
    '<b>Units</b>: Kc (mol L⁻¹)^Δn · Kp bar^Δn · none when Δn = 0'] });
const YQ = ['What makes an equilibrium homogeneous?', 'What is Δn when nitrogen and hydrogen make ammonia?', 'When does Kp equal Kc?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 62', topic: 'What if a solid takes part? Heterogeneous Equilibria', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [T0('S4') - 0.2, 1.05, 960, 560], [T0('S5') + 0.6, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.qr .qt').forEach(q => { const w = q.parentNode.offsetWidth - 88 - 150; if (q.offsetWidth > w) q.style.fontSize = Math.floor(28 * w / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.rl .rt2').forEach(q => { if (q.offsetWidth > 600) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 600 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.fxc').forEach(q => { const k = q.querySelector('.katex'); if (k && k.offsetWidth > 712) q.style.fontSize = Math.floor(parseFloat(getComputedStyle(q).fontSize) * 712 / k.offsetWidth) + 'px'; });
  const ep = $('#eP'); if (ep.offsetWidth > 712) ep.style.fontSize = Math.floor(parseFloat(getComputedStyle(ep).fontSize) * 712 / ep.offsetWidth) + 'px';
  const st = $('#stF'); if (st.firstElementChild && st.firstElementChild.offsetWidth > 1600) st.style.fontSize = Math.floor(parseFloat(getComputedStyle(st).fontSize) * 1600 / st.firstElementChild.offsetWidth) + 'px';
}

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
    const tBd = [wt('H2', 'pressure'), wt('H2', 'pressure') + 0.25, wt('H2', 'pressure') + 0.5];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tBd[i] - 0.1, 1e9, POP); const u = M.io((t - tBd[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'easy') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 1 ? tKit[1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'formula') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 2 ? tQr[i + 1] : T1('P3') + 0.3; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, tQr[0] + 0.2, out, { dx: 60, dy: 0, ...o });
    fade(smo, t, wt('P2', 'smoothie')); fade(sal, t, tQr[0] + 0.4); fade(salT, t, wt('P2', 'separate')); fade(smoT, t, wt('P2', 'blended'));
  }

  /* S */
  const sOn = t >= tS1 - 0.1 && t < tL1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('L1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    fade(tank, t, wt('S1', 'tank') - 0.2);
    const tN2 = wt('S1', 'nitrogen'), tHit = wt('S3', 'hits');
    let fi = 0;
    mols.forEach((m, i) => {
      const xr = BX0 + m.m + (BX1 - BX0 - 2 * m.m) * tri(m.px + t * m.vx), yr = BY0 + m.m + (BY1 - BY0 - 2 * m.m) * tri(m.py + t * m.vy);
      attr(m.g, 'transform', `translate(${xr.toFixed(1)},${yr.toFixed(1)}) rotate(${((t * 40 + i * 30) % 360).toFixed(0)})`);
      fade(m.g, t, m.kind === 'NH3' ? wt('S1', 'ammonia') : tN2 + i * 0.05, 1e9, 0.2);
      // wall hits: flash where a molecule touches a wall
      if (t > tHit - 0.3 && fi < flashes.length) { const dx = Math.min(xr - BX0 - m.m, BX1 - m.m - xr), dy = Math.min(yr - BY0 - m.m, BY1 - m.m - yr); if (dx < 10 || dy < 10) { const f = flashes[fi++]; const wx = dx < dy ? (xr - BX0 < BX1 - xr ? BX0 : BX1) : xr, wy = dx < dy ? yr : (yr - BY0 < BY1 - yr ? BY0 : BY1); pos(f, wx, wy); f.style.opacity = (Math.max(0, 1 - Math.min(dx, dy) / 10) * M.io((t - tHit + 0.3) / 0.3)).toFixed(2); M.hide(f, false); } }
    });
    for (; fi < flashes.length; fi++) M.hide(flashes[fi], true);
    key.forEach((k, i) => fade(k, t, wt('S1', 'nitrogen') + i * 0.3));
    const TAG = [[tS1 + 0.3, 'N₂ + H₂ ⇌ NH₃'], [T0('S2'), 'ALL GASES · ONE PHASE'], [T0('S3'), 'HITS ON THE WALLS'], [T0('S4'), 'EACH GAS: ITS OWN SHARE'], [T0('S5'), 'SHARES ADD UP'], [T0('S6'), 'SOLUTIONS TOO']];
    let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tS1 + 0.2, 1e9, POP);
    M.vis($('#eb'), t, T0('S2') - 0.2, z, { dx: 60, dy: 0, ...o });
    fade($('#eG'), t, T0('S2'));
    const tSh = wt('S4', 'share');
    ppRows.forEach((r, i) => { fade(r.g, t, tSh - 0.3 + i * 0.2); attr(r.r, 'width', (r.w * M.io((t - tSh - i * 0.3) / 0.8)).toFixed(1)); });
    let x0 = 200; const tTot = wt('S5', 'total'); totR.forEach((r, i) => { const w = ppRows[i].w * 0.6 * M.io((t - tTot + 0.6 - i * 0.25) / 0.6); attr(r, 'x', x0.toFixed(1)); attr(r, 'width', w.toFixed(1)); x0 += w; });
    fade(totG, t, tTot - 0.8); fade(totT, t, tTot);
    M.vis($('#eP'), t, wt('S6', 'iron') - 0.2, 1e9, POP);
    avA(t, wt('S5', 'tank') + 0.4, T0('S6') + 0.2);
  }

  /* L */
  const lOn = t >= tL1 - 0.1 && t < tD1 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const z = OUT('D1');
    M.vis($('#lw'), t, tL1 + 0.05, z, { dy: 36, ...o });
    fade($('#lEq0'), t, tL1 + 0.3);
    PUC.write($('#lEq'), t, T0('L3') - 0.1, 1.8);
    GT.forEach((g, i) => { const el = $('#gt' + i); M.vis(el, t, g[4] - 0.4, 1e9, { dy: 24 }); const on = M.io((t - g[4] + 0.3) / 0.3) * (i < 2 ? 1 - M.io((t - GT[i + 1][4] + 0.3) / 0.3) : 1 - M.io((t - T0('L3')) / 0.3)); setBg(el, mix(C.soft, C.ac2, on)); });
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tG1 + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('G1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    MS.forEach((_, i) => { const el = $('#ms' + i); M.vis(el, t, tMs[i] - 0.1, 1e9, { dy: 16 }); PUC.write(el.querySelector('.rt2'), t, tMs[i], 0.9); const nx2 = i < 3 ? tMs[i + 1] : T1('D5') + 0.3; const on = M.io((t - tMs[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#rr'), t, T0('D4') - 0.1, z, { dx: 60, dy: 0, ...o });
    PUC.write($('#dl0'), t, wt('D4', 'Put'), 1.2); PUC.write($('#dl1'), t, T0('D5') + 0.4, 1.2); PUC.write($('#dl2'), t, wt('D5', 'equals') - 0.2, 0.9);
  }

  /* G */
  const gOn = t >= tG1 - 0.1 && t < tC1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('C1');
    M.vis($('#ga'), t, tG1 + 0.05, z, { dx: -60, dy: 0, ...o });
    GR.forEach((g, i) => { const el = $('#gr' + i); M.vis(el, t, g[1] - 0.2, 1e9, { dy: 16 }); const nx2 = i < 3 ? GR[i + 1][1] : T1('G5') + 0.4; const on = M.io((t - g[1]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#gb'), t, tG1 + 0.4, z, { dx: 60, dy: 0, ...o });
    const t3 = T0('G3'), t4 = T0('G4');
    fade(gNH.g, t, tG1 + 0.6); gNH.L.forEach((r, i) => fade(r, t, wt('G2', 'reactant') + i * 0.12, 1e9, 0.2)); gNH.R.forEach((r, i) => fade(r, t, wt('G2', 'product') + i * 0.12, 1e9, 0.2));
    M.setT(gNH.v, 'Δn = 2 - 4 = -2'); fade(gNH.v, t, wt('G3', 'minus'));
    fade(gHI.g, t, t4); M.setT(gHI.v, 'Δn = 0'); fade(gHI.v, t, wt('G4', 'Zero'));
    fade(gR, t, T0('G5') + 0.3);
  }

  /* C + think */
  const cOn = t >= tC1 - 0.1 && t < tR1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const zc = OUT('K1');
    M.vis($('#ca'), t, tC1 + 0.05, zc, { dx: -60, dy: 0, ...o }); PUC.write($('#caK'), t, wt('C1', 'Hydrogen'), 0.8); PUC.write($('#caK2'), t, wt('C1', 'equals') - 0.1, 0.6);
    M.vis($('#cf'), t, wt('C1', 'Ammonia') - 0.3, zc, { dx: 60, dy: 0, ...o }); PUC.write($('#cfK'), t, wt('C1', 'Ammonia'), 0.8); PUC.write($('#cfK2'), t, wt('C1', 'divided') - 0.3, 0.8);
    M.vis($('#caV'), t, wt('C1', 'equals') + 0.4, 1e9, { dy: 16 }); M.vis($('#cfV'), t, T1('C1') - 0.3, 1e9, { dy: 16 });
    M.vis($('#th1'), t, tK1 + 0.05, OUT('R1'), { dy: 36, ...o });
    th1(t, { tin: tK1, tOpts: wt('K1', 'bigger') - 0.1, tCount: T1('K1') + 0.05, dur: 3, tAns: T0('K2') - 0.02, tWhy: wt('K2', 'Delta') });
  }

  /* R */
  const rOn = t >= tR1 - 0.1 && t < tT + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const z = OUT('T1');
    M.vis($('#ra'), t, tR1 + 0.05, z, { dx: -60, dy: 0, ...o });
    RL.forEach((r, i) => { const el = $('#rl' + i); M.vis(el, t, r[1] - 0.2, 1e9, { dy: 16 }); const nx2 = i < 3 ? RL[i + 1][1] : T1('R4') + 0.3; const on = M.io((t - r[1]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#rb'), t, tR1 + 0.4, z, { dx: 60, dy: 0, ...o }); M.vis($('#th0'), t, tR1 + 0.6, 1e9, { dy: 10 });
    UR.forEach((_, i) => { const el = $('#tr' + i); M.vis(el, t, T0('R2') + 0.6 + i * 0.4, 1e9, { dy: 14 }); setBg(el, mix(C.soft, OKT, i === 0 ? M.io((t - T0('R3')) / 0.3) : 0)); });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'K') - 0.2, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'times') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'delta') + 0.1, 0.8);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    fade(wKc.g, t, wt('W2', 'zero') - 0.1); fade(wMol, t, T0('W3') + 0.4); fade(wAr, t, T0('W4') + 0.4); fade(wKp.g, t, wt('W5', 'About') - 0.1);
    M.vis($('#wG'), t, T0('W6') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'eight') - 0.3, tStrike: T0('X3') - 0.1, tRight: wt('X3', 'With') - 0.2 });
    fade(tq1, t, wt('X3', 'joules') - 0.2); fade(tq2, t, wt('X3', 'use') - 0.2); fade(tq3, t, wt('X3', 'kelvin') - 0.3);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Boards') });
  }

  /* Q */
  const qOn = t >= tQ && t < tFc; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Find') - 0.1, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tFc; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tFc + 0.1, tout: tY - 0.3, tLines: [tFc + 0.4, tFc + 0.8, tFc + 1.2, tFc + 1.6, tFc + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tNx - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
