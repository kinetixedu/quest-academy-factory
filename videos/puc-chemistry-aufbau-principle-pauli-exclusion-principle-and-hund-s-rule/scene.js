// PUC Chemistry Ep 24: Aufbau principle, Pauli exclusion principle and Hund's rule (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding: n teal, l violet, electrons and spin arrows orange (same in bench, KaTeX, counter, recap)
const NC = C.ac, LC = '#7A4FE0', EC = '#C8461B';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const setH = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
const cN = s => `\\textcolor{${NC}}{${s}}`, cL = s => `\\textcolor{${LC}}{${s}}`, cE = s => `\\textcolor{${EC}}{${s}}`;
const n_ = cN('n'), l_ = cL('l');
const wx = (id, w, nth = 0) => { const W = M.L(id).words, h = W.filter(x => x.w.toLowerCase().replace(/[^a-z0-9]/g, '') === w.toLowerCase()); if (!h.length) { console.warn('word not found', id, w); return M.t0(id); } return h[Math.min(nth, h.length - 1)].t; };
const SUB = (s) => { const n = s[0], l = s.slice(1); return `${cN(n)}${cL('\\mathrm{' + l + '}')}`; };

Object.assign(M.IC, {
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  bus: ['M8 6v6', 'M15 6v6', 'M2 12h19.6', 'M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3', 'M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0', 'M9 18h5', 'M16 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0'],
  ticket: ['M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M13 5v2', 'M13 17v2', 'M13 11v2'],
  upA: ['M12 19V5', 'm5 12 7-7 7 7'], dnA: ['M12 5v14', 'm19 12-7 7-7-7'],
});
const ARW = (p, up, s = 1) => mk(p, 'path', { d: up ? `M0 ${18 * s} V${-18 * s} M${-8 * s} ${-9 * s} L0 ${-18 * s} L${8 * s} ${-9 * s}` : `M0 ${-18 * s} V${18 * s} M${-8 * s} ${9 * s} L0 ${18 * s} L${8 * s} ${9 * s}`, stroke: EC, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
// box with an up and a down arrow slot
const BOX = (p, x, y, s, sw = 2.5) => { const r = mk(p, 'rect', { x, y, width: s, height: s, rx: s * 0.14, fill: '#fff', stroke: C.ink2, 'stroke-width': sw }); const sc = s / 72;
  const u = ARW(p, true, sc * 1.1), d = ARW(p, false, sc * 1.1); attr(u, 'transform', `translate(${x + s * 0.32} ${y + s / 2})`); attr(d, 'transform', `translate(${x + s * 0.68} ${y + s / 2})`); M.hide(u, true); M.hide(d, true); return { r, u, d, cx: x + s / 2, cy: y + s / 2, x, y, s }; };

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tP3 = T0('P3'), tS1 = T0('S1'), tS3 = T0('S3'), tS5 = T0('S5'), tR1 = T0('R1'), tG1 = T0('G1'), tB2 = T0('B2');
const tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card + H ---------- */
const JOBS = [['droplet', 'Water tank', 'FILLS FROM THE BOTTOM', 'tank', 'AUFBAU'], ['bus', 'Bus seats', 'EMPTY SEATS FIRST', 'bus', 'HUND'], ['ticket', 'Seat number', 'NO TWO THE SAME', 'passengers', 'PAULI']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="adr" id="ja${i}">${a}</div></div>`).join('');
const KIT = [['user', 'Empty table first', 'empty'], ['users', 'Then share', 'Sharing']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: two energy ladders ---------- */
const lvl = (p, defs, x0, bs, left) => defs.map(([nm, nb, y, xs]) => { const g = mk(p, 'g', {}); const x = xs ?? x0; for (let k = 0; k < nb; k++) mk(g, 'rect', { x: x + k * (bs + 4), y, width: bs, height: bs, rx: 6, fill: '#fff', stroke: C.ink2, 'stroke-width': 2.5 });
  if (left) { txt(g, x - 16, y + bs - 10, nm, { 'text-anchor': 'end', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 22, fill: LC }); return g; }
  txt(g, x + (nb * (bs + 4) - 4) / 2, y + bs + 24, nm, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: LC }); return g; });
const pS1 = $('#pS1'), pS2 = $('#pS2');
const HL = lvl(pS1, [['1s', 1, 446, 150], ['2s', 1, 316, 150], ['2p', 3, 316, 214], ['3s', 1, 186, 150], ['3p', 3, 186, 214], ['3d', 5, 186, 360]], 150, 40);
const HN = [[1, 466], [2, 336], [3, 206]].map(([n, y]) => txt(pS1, 36, y, 'n = ' + n, { 'font-size': 22, fill: NC, 'font-weight': 600 }));
const HLine = [466, 336, 206].map(y => mk(pS1, 'line', { x1: 130, y1: y + 22, x2: 600, y2: y + 22, stroke: C.line, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
const eAx = (p, x) => { const g = mk(p, 'g', {}); mk(g, 'path', { d: `M${x} 500 V120 M${x - 10} 134 L${x} 118 L${x + 10} 134`, stroke: C.ink, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); txt(g, x - 14, 110, 'ENERGY', { 'text-anchor': 'end', 'font-size': 16, 'font-weight': 600 }); return g; };
const eA1 = eAx(pS1, 700), eA2 = eAx(pS2, 700);
const ML = lvl(pS2, [['1s', 1, 420, 150], ['2s', 1, 364, 150], ['2p', 3, 308, 150], ['3s', 1, 252, 150], ['3p', 3, 196, 150], ['3d', 5, 112, 150]], 150, 40, true);
const mBr = mk(pS2, 'g', {}); mk(mBr, 'path', { d: 'M370 328 H420 M370 384 H420 M420 328 V384', stroke: EC, 'stroke-width': 3, fill: 'none' }); txt(mBr, 434, 364, '2s < 2p', { 'font-size': 22, fill: EC, 'font-weight': 600 });

/* ---------- S: n + l rule + ladder ---------- */
const NLR = [['4s', 4, 0], ['3d', 3, 2], ['4p', 4, 1]];
$('#nlr').innerHTML = `<div class="fx" id="nlF" style="left:36px;top:80px;font-size:46px">${K(`\\text{energy} \\uparrow \\;\\text{as}\\; ${n_} + ${l_} \\uparrow`)}</div>` +
  NLR.map(([s, n, l], i) => `<div class="qr" id="nr${i}" style="top:${170 + i * 104}px;height:88px"><div class="fx" style="left:24px;top:18px;font-size:40px">${K(`${SUB(s)}:\\; ${cN(n)} + ${cL(l)} = ${n + l}`)}</div><div class="qk" id="nk${i}" style="top:30px;color:var(--ac)"></div></div>`).join('');
const ORD = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s'], NB = { s: 1, p: 3, d: 5 };
const lS = $('#lS');
const rungs = ORD.map((s, i) => { const g = mk(lS, 'g', {}), y = 506 - i * 49; txt(g, 40, y + 28, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: LC });
  for (let k = 0; k < NB[s[1]]; k++) mk(g, 'rect', { x: 120 + k * 40, y, width: 36, height: 36, rx: 6, fill: '#fff', stroke: C.ink2, 'stroke-width': 2.2 });
  const nl = +s[0] + 'spd'.indexOf(s[1]); txt(g, 748, y + 26, `n + l = ${nl}`, { 'text-anchor': 'end', 'font-size': 18, fill: C.ink, 'font-weight': 600 }); return { g, y }; });
const ldAx = eAx(lS, 400); M.hide(ldAx, false);
const S5W = M.L('S5').words.filter(x => ['s', 'p', 'd'].includes(x.w.toLowerCase().replace(/[^a-z]/g, '')));
const tRung = ORD.map((s, i) => s === '4s' ? wx('S3', 'Four') : s === '3d' ? wx('S3', 'Three') : s === '4p' ? wx('S4', 'four') : (S5W[i] || { t: tS5 + i * 0.6 }).t - 0.2);

/* ---------- R: the three rules ---------- */
const RR = [['Aufbau principle', 'Fill orbitals from the lowest energy up'], ['Pauli exclusion principle', 'No two electrons share all four quantum numbers'], ["Hund's rule", 'In p, d, f: one in each orbital before pairing']];
$('#rrs').innerHTML = RR.map(([n, s], i) => `<div class="rr" id="rr${i}" style="top:${84 + i * 152}px"><div class="nn">${i + 1}</div><div class="rn">${n}</div><div class="rs">${s}</div></div>`).join('');
const tRule = [wx('R1', 'Aufbau'), wx('R2', 'Pauli'), wx('R4', 'Hunds')];
const rS = $('#rS');
const dA = mk(rS, 'g', {}), dP = mk(rS, 'g', {}), dH = mk(rS, 'g', {});
const aB = [['1s', 380], ['2s', 270], ['2p', 160]].map(([s, y]) => { txt(dA, 120, y + 46, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 32, fill: LC, 'text-anchor': 'end' }); return s === '2p' ? [0, 1, 2].map(k => BOX(dA, 160 + k * 84, y, 72)) : [BOX(dA, 160, y, 72)]; });
eAx(dA, 620).setAttribute('transform', 'translate(0 0)');
const pB = BOX(dP, 322, 170, 140, 3.5);
const qL = txt(dP, 140, 400, '(1, 0, 0, +1/2)', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 }), qR = txt(dP, 644, 400, '(1, 0, 0, -1/2)', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const qLab = txt(dP, 392, 450, '(n, l, mₗ, mₛ) · DIFFER ONLY IN SPIN', { 'text-anchor': 'middle', 'font-size': 17, fill: C.mute, 'font-weight': 600 });
const e3 = mk(dP, 'circle', { r: 10, fill: EC }), e3X = mk(dP, 'g', {}); mk(e3X, 'circle', { cx: 560, cy: 150, r: 22, fill: C.red }); e3X.insertAdjacentHTML('beforeend', `<g transform="translate(548 138)">${M.icon('x', 24, '#fff', 3)}</g>`);
const hB = [0, 1, 2].map(k => BOX(dH, 196 + k * 136, 200, 120, 3.5));
txt(dH, 392, 380, '2p', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: LC });
const rTag = document.createElement('div'); rTag.className = 'pillp ac'; rTag.style.cssText = 'left:36px;top:494px'; $('#rd').appendChild(rTag);

/* ---------- G: the bench ---------- */
const b = $('#bS');
const GR = [['1s', 380, 1], ['2s', 262, 1], ['2p', 144, 3]];
const gB = []; GR.forEach(([s, y, nb]) => { txt(b, 140, y + 50, s, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 36, fill: LC, 'text-anchor': 'end' }); for (let k = 0; k < nb; k++) gB.push(BOX(b, 170 + k * 88, y, 76, 3)); });
eAx(b, 470);
txt(b, 520, 96, 'ELECTRONS TO PLACE', { 'font-size': 16, 'font-weight': 600 });
const Q = Array.from({ length: 8 }, (_, i) => mk(b, 'circle', { cx: 534 + i * 28, cy: 124, r: 10, fill: EC }));
const fly = Array.from({ length: 8 }, () => mk(b, 'circle', { r: 10, fill: EC }));
const EV = [[wx('G2', 'one') + 0.15, 0, 1, 'A'], [wx('G2', 'two'), 0, 0, 'P'], [wx('G3', 'Three'), 1, 1, 'A'], [wx('G3', 'four'), 1, 0, 'P'], [wx('G4', 'five'), 2, 1, 'A'], [wx('G4', 'Six'), 3, 1, 'H'], [wx('G4', 'seven'), 4, 1, 'H'], [wx('G5', 'oxygen'), 2, 0, 'P']];
const FL = 0.6;
const RCH = [['A', 'AUFBAU · LOWEST FIRST'], ['P', 'PAULI · OPPOSITE SPINS'], ['H', 'HUND · SPREAD OUT']];
$('#rcs').innerHTML = RCH.map(([k, s], i) => `<div class="rc" id="rc${i}" style="left:36px;top:${76 + i * 64}px">${s}</div>`).join('');
const RWHY = { A: 'New subshell: the lowest empty one fills first', P: 'Second electron in a box: it must spin the other way', H: 'Empty 2p box free: no pairing yet' };
const rWhy = document.createElement('div'); rWhy.className = 'fx'; rWhy.style.cssText = 'left:420px;top:80px;font:500 22px/1.35 Poppins;color:var(--ink2);white-space:normal;width:330px'; $('#ru').appendChild(rWhy);
const avA = PUC.avatar($('#sG'), { x: 160 + 36, y: 270 + 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Like the reading room!' });
const mobH = (a) => `<span class="mob" style="color:${C.ink2}">${a.map(c => `<i>${c.includes('u') ? M.icon('upA', 26, EC, 3) : ''}${c.includes('d') ? M.icon('dnA', 26, EC, 3) : ''}</i>`).join('')}</span>`;
const th1 = PUC.think($('#th1'), { q: 'Carbon has two 2p electrons. Which drawing is right?', opts: [mobH(['ud', '', '']), mobH(['u', 'u', ''])], right: 1, why: "Separate boxes, same spin: Hund's rule. Pairing waits until every p box has one." });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s`);

/* ---------- D: ordering 4p, 5s, 4d ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`${n_} + ${l_}:\\; 4p = 5,\\; 5s = 5,\\; 4d = 6`)],
  [K(`4d \\text{ has the highest sum} \\to \\text{last}`)],
  [K(`4p, 5s \\text{ tie: lower } ${n_} \\text{ first}`)],
  [K(`4p < 5s < 4d`)]], { label: 'ORDER THREE SUBSHELLS · STEP BY STEP', y0: 110, dy: 112 });
const tDs = [wx('D2', 'Step'), wx('D3', 'Step'), wx('D4', 'Step'), wx('D5', 'Step')];
const dS = $('#dS'), SLX = [56, 292, 528];
const DC = [['5s', 5, 0], ['4d', 4, 2], ['4p', 4, 1]].map(([s, n, l]) => { const g = mk(dS, 'g', {}); mk(g, 'rect', { x: 0, y: 0, width: 200, height: 150, rx: 16, fill: C.soft });
  const lb = txt(g, 100, 78, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 56, fill: LC }); const tg = txt(g, 100, 126, `${n} + ${l} = ${n + l}`, { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink, 'font-weight': 600 }); return { g, tg }; });
const tD3m = wx('D3', 'last'), tD4m = wx('D4', 'Lower');
const DX = [M.keys([[0, SLX[0]], [tD4m, SLX[1]]], 0.8), M.keys([[0, SLX[1]], [tD3m, SLX[2]]], 0.8), M.keys([[0, SLX[2]], [tD3m, SLX[1]], [tD4m, SLX[0]]], 0.8)];
const lts = [0, 1].map(i => txt(dS, 270 + i * 236, 302, '<', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 52, fill: C.ink }));
const dAx = mk(dS, 'g', {}); mk(dAx, 'path', { d: 'M60 420 H720 M704 410 L720 420 L704 430', stroke: C.ink, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); txt(dAx, 60, 456, 'LOWER ENERGY', { 'font-size': 16, 'font-weight': 600 }); txt(dAx, 720, 456, 'HIGHER ENERGY', { 'text-anchor': 'end', 'font-size': 16, 'font-weight': 600 });

/* ---------- W: phosphorus ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`1s^2\\, 2s^2\\, 2p^6 \\;\\to\\; 10`)],
  [K(`+\\; 3s^2 \\;\\to\\; 12`)],
  [K(`3p^3: \\text{ one per box, same spin}`)],
  [K(`\\textcolor{${EC}}{3} \\text{ unpaired electrons}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 92 });
$('#wl .lbl').style.top = '30px';
const tWs = [wx('W3', 'ten'), T0('W4'), wx('W5', 'Hunds'), T0('W6')];
const wS = $('#wS'), WG = [['1s', 1], ['2s', 1], ['2p', 3], ['3s', 1], ['3p', 3]];
const wB = []; { let x = 64; WG.forEach(([s, nb]) => { const x0 = x; for (let k = 0; k < nb; k++) { wB.push(BOX(wS, x, 120, 62, 2.5)); x += 68; } txt(wS, (x0 + x - 6) / 2, 216, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: LC }); x += 18; }); }
// fill order: [box, up]
const WF = [[0, 1], [0, 0], [1, 1], [1, 0], [2, 1], [3, 1], [4, 1], [2, 0], [3, 0], [4, 0], [5, 1], [5, 0], [6, 1], [7, 1], [8, 1]];
const tWf = (() => { const a = [], t1 = wx('W3', 'One'), t2 = wx('W3', 'Two'), t3 = wx('W3', 'Two', 1), t4 = wx('W4', 'Three'), t5 = wx('W5', 'each');
  a.push(t1, t1 + 0.15, t2, t2 + 0.15); for (let i = 0; i < 6; i++) a.push(t3 + i * 0.14); a.push(t4, t4 + 0.15); for (let i = 0; i < 3; i++) a.push(t5 - 0.3 + i * 0.35); return a; })();
const wRd = txt(wS, 392, 286, '', { 'text-anchor': 'middle', 'font-size': 26, fill: C.ink, 'font-weight': 600 });
const avD = PUC.avatar($('#wr'), { x: 36, y: 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'Three lone electrons, just like nitrogen!' });

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Two electrons in one box, both pointing up', right: 'One box: one up, one down (Pauli)' });
const tsv = $('#tS');
const tw = BOX(tsv, 70, 70, 120, 3.5); M.hide(tw.u, false); const tw2 = ARW(tsv, true, 1.8); attr(tw2, 'transform', `translate(${70 + 120 * 0.68} 130)`);
const xW = mk(tsv, 'path', { d: 'M56 56 L204 204 M204 56 L56 204', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const tR = BOX(tsv, 380, 70, 120, 3.5); M.hide(tR.u, false); M.hide(tR.d, false);
const gR = mk(tsv, 'g', {}); [tR.r, tR.u, tR.d].forEach(e => gR.appendChild(e)); const tRt = txt(gR, 440, 230, 'OPPOSITE SPINS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const gW = mk(tsv, 'g', {}); [tw.r, tw.u, tw2].forEach(e => gW.appendChild(e)); txt(gW, 130, 230, 'SAME 4 NUMBERS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN'], type: 'Arranging orbitals in order of energy with the n + l rule' });
const mcq = PUC.mcq($('#mq'), { pat: 'JEE MAIN PATTERN · ORIGINAL QUESTION', q: `What is the largest number of electrons that can fill all the subshells with ${K(`${n_} + ${l_} = 5`)}?`, qW: 780,
  opts: ['8', '10', '18', '32'], right: 2, optW: 474, optY: 300, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`${n_} + ${l_} = 5:\\; 3d,\\; 4p,\\; 5s`)], [K(`\\text{no } 2f:\\; ${l_} < ${n_}`)], [K(`10 + 6 + 2`)], [K(`= \\textcolor{${C.ok}}{18}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wx('A2', 'There'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 310, y: 262, w: 1300, h: 470, title: "Recap · Aufbau, Pauli and Hund's rule", y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s`), `<b>${K(`${n_} + ${l_}`)} rule</b>: lower sum fills first; a tie goes to lower ${K(n_)}`, '<b>Aufbau</b>: orbitals fill in order of increasing energy', '<b>Pauli</b>: no two electrons share all four quantum numbers · 2 per orbital, opposite spins', "<b>Hund</b>: in p, d, f one electron per orbital before pairing, parallel spins"] });
const YQ = ['Which fills first, 4s or 3d, and why?', 'Why can one orbital hold only two electrons?', 'How many unpaired electrons does nitrogen have?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 25', topic: 'Why does chromium break the order? Electronic Configurations', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [EV[5][0] - 0.4, 1.1, 560, 500], [T1('G4') + 0.2, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1210) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1210 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  document.querySelectorAll('.rr .rs').forEach(q => { if (q.offsetWidth > 600) q.style.fontSize = Math.floor(23 * 600 / q.offsetWidth) + 'px'; });
}
const cfgTex = (cnt, names) => names.map((s, i) => cnt[i] ? `${SUB(s)}^{${cE(cnt[i])}}` : '').filter(Boolean).join('\\,');

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
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, wt('H2', 'rules') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'Electrons') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); setBg(el, mix(C.soft, C.ac2, M.io((t - wt('H4', 'decides') + 0.1) / 0.3))); });
    M.vis($('#hTz'), t, wt('H4', 'who') - 0.15, 1e9, POP);
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1'), tMany = wt('P2', 'many');
    M.vis($('#po'), t, tP1 + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tMany + 0.2, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#po'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#poIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    HL.forEach((g, i) => fade(g, t, tP1 + 0.4 + [0, 1, 1, 2, 2, 2][i] * 0.35, 1e9, 0.3)); HN.forEach((g, i) => fade(g, t, tP1 + 0.4 + i * 0.35, 1e9, 0.3)); HLine.forEach((g, i) => fade(g, t, wt('P2', 'only') - 0.1, 1e9, 0.3)); fade(eA1, t, tP1 + 0.3);
    M.vis($('#pm'), t, tMany - 0.05, out, { dx: 60, dy: 0, ...o });
    ML.forEach((g, i) => fade(g, t, wt('P2', 'both') - 0.2 + i * 0.18, 1e9, 0.3)); fade(eA2, t, tMany + 0.2);
    fade(mBr, t, wt('P3', 'Two') - 0.1, 1e9, 0.3);
    M.vis($('#pSh'), t, wt('P3', 'shield') - 0.1, 1e9, POP);
  }

  /* S: n + l */
  const sOn = t >= tS1 - 0.1 && t < tR1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const out = OUT('R1');
    M.vis($('#nl'), t, tS1 + 0.05, out, { dy: 36, ...o });
    { const sh = M.spring(t - tS3 + 0.2, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#nl'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#nlIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    PUC.write($('#nlF'), t, wt('S2', 'Add') - 0.1, 0.8);
    const tRow = [wx('S3', 'Four'), wx('S3', 'Three'), wx('S4', 'four')];
    NLR.forEach((_, i) => M.vis($('#nr' + i), t, tRow[i] - 0.15, 1e9, { dy: 16 }));
    M.setT($('#nk0'), 'FILLS FIRST'); M.vis($('#nk0'), t, wx('S3', 'So') - 0.1, 1e9, POP);
    M.setT($('#nk1'), t < wx('S4', 'Three', 1) ? 'TIE · 5' : 'LOWER n · FIRST'); M.vis($('#nk1'), t, wx('S4', 'both') - 0.1, 1e9, POP);
    M.setT($('#nk2'), 'TIE · 5'); M.vis($('#nk2'), t, wx('S4', 'both') - 0.1, 1e9, POP);
    setBg($('#nr0'), mix(C.soft, C.ac2, M.io((t - wx('S3', 'So')) / 0.3) * (1 - M.io((t - T0('S4')) / 0.3))));
    setBg($('#nr1'), mix(C.soft, C.ac2, M.io((t - wx('S4', 'Three', 1)) / 0.3)));
    M.vis($('#nlP'), t, wx('S4', 'goes') + 0.1, 1e9, POP);
    M.vis($('#ld'), t, tS3 - 0.05, out, { dx: 60, dy: 0, ...o });
    rungs.forEach((r, i) => fade(r.g, t, tRung[i], 1e9, 0.3));
  }

  /* R: three rules */
  const rOn = t >= tR1 - 0.1 && t < tG1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('G1');
    M.vis($('#rl'), t, tR1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#rd'), t, tR1 + 0.25, out, { dx: 60, dy: 0, ...o });
    const ri = tRule.reduce((a, tt, i) => t >= tt - 0.2 ? i : a, 0);
    RR.forEach((_, i) => { M.vis($('#rr' + i), t, tRule[i] - 0.2, 1e9, { dy: 16 }); setBg($('#rr' + i), mix(C.soft, C.ac2, ri === i ? M.io((t - tRule[i] + 0.2) / 0.3) : 0)); });
    M.setT($('#rdL'), ['RULE ONE · AUFBAU', 'RULE TWO · PAULI', "RULE THREE · HUND"][ri]);
    fade(dA, t, tR1 + 0.3, tRule[1] - 0.2, 0.25); fade(dP, t, tRule[1] - 0.2, tRule[2] - 0.2, 0.25); fade(dH, t, tRule[2] - 0.2, 1e9, 0.25);
    // Aufbau: two electrons enter 1s, then 2s
    M.hide(aB[0][0].u, t < wx('R1', 'increasing')); M.hide(aB[1][0].u, t < wx('R1', 'lowest'));
    // Pauli: up, down, a third bounces
    M.hide(pB.u, t < wx('R2', 'two')); M.hide(pB.d, t < wx('R3', 'opposite'));
    fade(qL, t, wx('R2', 'four') - 0.1, 1e9, 0.25); fade(qR, t, wx('R3', 'opposite'), 1e9, 0.25); fade(qLab, t, wx('R3', 'One') - 0.1, 1e9, 0.25);
    { const t3 = wx('R3', 'most') - 0.2, u = M.clamp((t - t3) / 0.9), k = u < 0.5 ? u / 0.5 : 1 - (u - 0.5) / 0.5; attr(e3, 'cx', M.lerp(700, 470, M.io(k)).toFixed(1)); attr(e3, 'cy', M.lerp(80, 150, M.io(k)).toFixed(1)); M.hide(e3, u <= 0 || u >= 1); fade(e3X, t, t3 + 0.45, t3 + 1.6, 0.15); }
    // Hund: one per box, same spin
    const tH = wx('R4', 'every'); hB.forEach((bx, k) => M.hide(bx.u, t < tH - 0.3 + k * 0.35));
    const RT = [[tRule[0], 'Building up: lowest first'], [tRule[1], 'At most 2 per orbital'], [wx('R3', 'opposite'), 'Opposite spins in one box'], [tRule[2], 'One in each before pairing'], [T0('R5'), 'Single electrons: parallel spins']];
    let rt = RT[0][1]; RT.forEach(([a, s]) => { if (t >= a) rt = s; }); M.setT(rTag, rt); M.vis(rTag, t, tR1 + 0.6, 1e9, POP);
  }

  /* G + B: the bench */
  const gOn = t >= tG1 - 0.1 && t < tD1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const z = OUT('B2');
    M.vis($('#bn'), t, tG1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#cf'), t, tG1 + 0.25, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ru'), t, tG1 + 0.4, z, { dy: 36, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'Which') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wx('B3', 'That') });
    const isO = t >= EV[7][0] - 0.8;
    let placed = 0; const cnt = [0, 0, 0];
    EV.forEach(([te, bi, up], k) => { const u = M.clamp((t - te) / FL), bx = gB[bi]; const qi = k;
      const sx = 534 + qi * 28, sy = 124; const tx = bx.x + bx.s * (up ? 0.32 : 0.68), ty = bx.cy;
      const vis = k < 7 || isO; M.hide(Q[k], !(vis && u <= 0)); attr(Q[k], 'opacity', k === 7 ? M.clamp((t - EV[7][0] + 0.8) / 0.3) : 1);
      const f = fly[k]; if (u > 0 && u < 1) { const e = M.io(u); attr(f, 'cx', M.lerp(sx, tx, e).toFixed(1)); attr(f, 'cy', (M.lerp(sy, ty, e) - Math.sin(e * Math.PI) * 60).toFixed(1)); M.hide(f, false); } else M.hide(f, true);
      M.hide(up ? bx.u : bx.d, u < 1);
      if (u >= 1) { placed++; cnt[bi === 0 ? 0 : bi === 1 ? 1 : 2]++; } });
    // configuration + unpaired
    const unp = gB.reduce((a, bx) => a + ((bx.u.style.visibility === 'hidden') !== (bx.d.style.visibility === 'hidden') ? 1 : 0), 0);
    setH($('#cfg'), placed ? K(cfgTex(cnt, ['1s', '2s', '2p'])) : '');
    M.setT($('#elS'), isO ? 'O' : 'N'); M.setT($('#elN'), isO ? 'OXYGEN · 8 ELECTRONS' : 'NITROGEN · 7 ELECTRONS');
    M.setT($('#unp'), placed ? `UNPAIRED ${unp}` : ''); M.vis($('#elc'), t, tG1 + 0.5, 1e9, { dy: 10 });
    // rule chips
    let last = null; EV.forEach(([te, , , r]) => { if (t >= te + FL) last = [te + FL, r]; });
    RCH.forEach(([k], i) => { const el = $('#rc' + i), on = last && last[1] === k ? M.io((t - last[0]) / 0.2) : 0; setBg(el, mix(C.soft, C.ac, on)); el.style.color = mix(C.mute, '#FFFFFF', on); M.vis(el, t, tG1 + 0.6 + i * 0.1, 1e9, { dx: -16, dy: 0 }); });
    if (last) M.setT(rWhy, RWHY[last[1]]); M.vis(rWhy, t, EV[0][0] + FL, 1e9, { dy: 8 });
    avA(t, wx('G5', 'begin') + 0.4, OUT('B2'));
  }

  /* D */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.25, out, { dx: 60, dy: 0, ...o });
    DC.forEach((c, i) => { attr(c.g, 'transform', `translate(${DX[i](t).toFixed(1)} 170)`); fade(c.g, t, wx('D1', ['five', 'd', 'Four'][i]) - 0.1, 1e9, 0.25); fade(c.tg, t, wx('D2', ['Five', 'Four', 'Four'][i], [0, 1, 0][i]) + 0.2, 1e9, 0.25); });
    lts.forEach(e => fade(e, t, tDs[3] + 0.4, 1e9, 0.25)); fade(dAx, t, tDs[3] + 0.6, 1e9, 0.3);
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Lowest') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'spread') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'pair') + 0.2, 0.9);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    let n = 0; const cnt = [0, 0, 0, 0, 0], grp = [0, 1, 2, 2, 2, 3, 4, 4, 4];
    WF.forEach(([bi, up], k) => { const on = t >= tWf[k]; M.hide(up ? wB[bi].u : wB[bi].d, !on); if (on) { n++; cnt[grp[bi]]++; } });
    const unp = wB.reduce((a, bx) => a + ((bx.u.style.visibility === 'hidden') !== (bx.d.style.visibility === 'hidden') ? 1 : 0), 0);
    M.setT(wRd, `ELECTRONS ${n} · UNPAIRED ${unp}`); fade(wRd, t, tWf[0] - 0.2, 1e9, 0.2); attr(wRd, 'fill', n >= 15 ? EC : C.ink);
    setH($('#wCf'), n ? K(cfgTex(cnt, ['1s', '2s', '2p', '3s', '3p'])) : '');
    avD(t, wx('W6', 'electrons') + 0.4);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wx('X2', 'Many') - 0.1, tStrike: wx('X3', 'breaks') - 0.1, tRight: wx('X3', 'In') - 0.1 });
    fade(gW, t, wx('X2', 'both') - 0.1); M.draw(xW, t, wx('X3', 'breaks') - 0.1, 0.5); fade(gR, t, wx('X3', 'In') - 0.05);
    where(t, { tin: T0('E1'), tLight: [wx('E1', 'JEE')], tType: wx('E1', 'usually') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wx('Q1', 'subshells'), tCount, tAns });
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
