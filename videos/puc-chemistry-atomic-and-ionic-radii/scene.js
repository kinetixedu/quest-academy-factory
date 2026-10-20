// PUC Chemistry Ep 31: Atomic and ionic radii (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, KaTeX, readout, chart, recap): radius r teal, protons / nuclear charge gold, the moving electron orange, distance d ink
const NC = C.ac, HC = C.ink, EC = '#C8461B', GC = '#B7791F';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };
const tN = s => `\\textcolor{${NC}}{${s}}`, tG = s => `\\textcolor{${GC}}{${s}}`, tE = s => `\\textcolor{${EC}}{${s}}`;
const ion = s => `\\mathrm{${s}}`;

Object.assign(M.IC, {
  layers: ['m12 2 10 5-10 5L2 7Z', 'm2 17 10 5 10-5', 'm2 12 10 5 10-5'],
  balloon: ['M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1', 'M12 6a2 2 0 0 1 2 2', 'M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0'],
  magnet: ['m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15', 'm5 8 4 4', 'm12 15 4 4'],
});

/* ---------- atom drawer: rings scale with the radius, electrons sit on the rings ---------- */
const atomV = (svg, cx, cy, o = {}) => {
  const g = mk(svg, 'g', {});
  const rings = Array.from({ length: 6 }, () => mk(g, 'circle', { cx, cy, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
  const rl = mk(g, 'line', { x1: cx, y1: cy, y2: cy, stroke: NC, 'stroke-width': 4, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' });
  const rt = txt(g, 0, 0, '', { 'font-size': 26, fill: NC, 'font-weight': 600, 'text-anchor': 'middle' });
  const nuc = mk(g, 'circle', { cx, cy, r: o.nr ?? 24, fill: NC });
  const sym = txt(g, cx, cy + 8, '', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': o.fs ?? 22, fill: '#fff', 'text-anchor': 'middle' });
  const zt = txt(g, cx + 30, cy - 28, '', { 'font-size': 22, fill: GC, 'font-weight': 600 });
  const dots = Array.from({ length: 12 }, () => mk(g, 'circle', { r: 8, fill: HC }));
  // st: {R (px), rr: [ring radii], ra: [ring alpha], e: [[ringIndex, count, colourLastOrange?]], sym, z, pm, lab}
  return { g, set(st) {
    rings.forEach((r, k) => { const v = st.rr[k] || 0, a = st.ra ? st.ra[k] ?? 1 : 1; attr(r, 'r', v.toFixed(1)); r.style.opacity = a.toFixed(3); M.hide(r, v <= 0.5 || a <= 0.01); });
    let di = 0;
    (st.e || []).forEach(([k, n, orange, a0 = 0, al = 1]) => { const R = st.rr[k]; for (let j = 0; j < n; j++) { const d = dots[di++]; if (!d) return; const a = -Math.PI / 2 + a0 + j * 2 * Math.PI / Math.max(n, 1); attr(d, 'cx', (cx + R * Math.cos(a)).toFixed(1)); attr(d, 'cy', (cy + R * Math.sin(a)).toFixed(1)); attr(d, 'fill', orange && j === n - 1 ? EC : HC); d.style.opacity = al.toFixed(3); M.hide(d, al <= 0.01); } });
    for (; di < dots.length; di++) M.hide(dots[di], true);
    const R = st.R; attr(rl, 'x2', (cx + R).toFixed(1)); attr(rt, 'x', (cx + R / 2).toFixed(1)); attr(rt, 'y', (cy - 14).toFixed(1)); M.setT(rt, st.pm != null ? `${Math.round(st.pm)} pm` : ''); rl.style.opacity = rt.style.opacity = (st.ral ?? 1).toFixed(3);
    M.setT(sym, st.sym); M.setT(zt, st.z);
  }, dots };
};
const lerpA = (a, b, u) => a.map((v, i) => M.lerp(v, b[i] ?? 0, u));

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tI1 = T0('I1'), tB1 = T0('B1'), tB2 = T0('B2'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tNx = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['layers', 'Onion', 'MORE LAYERS', 'onion', 'BIGGER', NC], ['balloon', 'Balloon', 'SQUEEZED', 'balloon', 'SMALLER', GC], ['magnet', 'Magnet', 'PULLS CLIPS IN', 'magnet', 'TIGHTER', GC]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , bd, c], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jb" id="jb_${i}" style="color:${c}">${bd}</div></div>`).join('');
const KIT = [['More layers: bigger', 'More'], ['Atoms: shells are layers', 'shells'], ['More electrons, yet smaller?', 'some']];
$('#wqs').innerHTML = KIT.map(([w], i) => `<div class="wq" id="wq${i}">${M.icon(i ? 'layers' : 'layers', 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = [wt('H3', 'More'), wt('H4', 'shells'), wt('H4', 'some')];

/* ---------- P: covalent + metallic radius ---------- */
const pc = $('#pcS'), PY = 250, PR = 110, PX1 = 392 - PR, PX2 = 392 + PR;
const pAt = [PX1, PX2].map(x => { const g = mk(pc, 'g', {}); mk(g, 'circle', { cx: x, cy: PY, r: PR, fill: C.ac3, stroke: NC, 'stroke-width': 3 }); mk(g, 'circle', { cx: x, cy: PY, r: 10, fill: HC }); return g; });
const pD = mk(pc, 'path', { d: `M${PX1} ${PY + 150} H${PX2}`, stroke: HC, 'stroke-width': 3, fill: 'none' });
const pDt = txt(pc, 392, PY + 186, 'd = distance between nuclei', { 'text-anchor': 'middle', 'font-size': 22, fill: HC, 'font-weight': 600 });
const pTick = [PX1, PX2].map(x => mk(pc, 'line', { x1: x, y1: PY + 136, x2: x, y2: PY + 164, stroke: HC, 'stroke-width': 3 }));
const pR = mk(pc, 'line', { x1: PX2, y1: PY, x2: PX2 + PR, y2: PY, stroke: NC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const pRt = txt(pc, PX2 + PR / 2, PY - 16, 'r', { 'text-anchor': 'middle', 'font-size': 30, fill: NC, 'font-weight': 600, 'font-style': 'italic' });
const pF = document.createElement('div'); pF.className = 'fx'; pF.style.cssText = 'left:0;width:784px;top:478px;text-align:center;font-size:52px'; pF.innerHTML = K(`${tN('r')} = \\dfrac{d}{2}`); $('#pc').appendChild(pF);
const pm = $('#pmS'), MY = 250, MR = 80;
const mAt = [-2, -1, 0, 1, 2].map(k => { const g = mk(pm, 'g', {}); mk(g, 'circle', { cx: 392 + k * 2 * MR, cy: MY, r: MR, fill: '#E9E5DA', stroke: C.ink2, 'stroke-width': 3 }); mk(g, 'circle', { cx: 392 + k * 2 * MR, cy: MY, r: 8, fill: HC }); return g; });
const mR = mk(pm, 'line', { x1: 392, y1: MY, x2: 392 + MR, y2: MY, stroke: NC, 'stroke-width': 5, 'stroke-linecap': 'round' });
const mD = mk(pm, 'path', { d: `M${392 - 2 * MR} ${MY + 120} H392`, stroke: HC, 'stroke-width': 3, fill: 'none' });
const mDt = txt(pm, 392 - MR, MY + 156, 'd', { 'text-anchor': 'middle', 'font-size': 26, fill: HC, 'font-weight': 600, 'font-style': 'italic' });
const mRt = txt(pm, 392 + MR / 2, MY - 16, 'r', { 'text-anchor': 'middle', 'font-size': 30, fill: NC, 'font-weight': 600, 'font-style': 'italic' });
$('#pmP').innerHTML = `${K(`1\\,\\text{pm} = 10^{-12}\\,\\text{m}`)}<span style="color:var(--mute);font-weight:500">a million millionth of a metre</span>`;

/* ---------- S: period 2, then group 1 ---------- */
const P2 = [['Li', 3, 152, 1, 'S2', 'Lithium'], ['Be', 4, 111, 2, 'S3', 'Beryllium'], ['B', 5, 88, 3, 'S4', 'Boron'], ['C', 6, 77, 4, 'S4', 'Carbon'], ['N', 7, 74, 5, 'S4', 'Nitrogen'], ['O', 8, 66, 6, 'S5', 'Oxygen'], ['F', 9, 64, 7, 'S5', 'Fluorine']];
const G1 = [['Li', 3, 152, 2, 'S7', 'Lithium'], ['Na', 11, 186, 3, 'S7', 'sodium'], ['K', 19, 231, 4, 'S7', 'potassium'], ['Rb', 37, 244, 5, 'S7', 'rubidium'], ['Cs', 55, 262, 6, 'S7', 'caesium']];
const tP2 = P2.map(p => wt(p[4], p[5])), tG1 = G1.map(p => wt(p[4], p[5]));
const SC = 0.92, AX = 392, AY = 300;
const av = atomV($('#bS'), AX, AY);
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
const RO = [['PROTONS', 'pull of the nucleus', GC], ['SHELLS', 'layers of electrons', HC], ['RADIUS', 'size of the atom', NC]];
$('#crs').innerHTML = RO.map(([k, w, c], i) => `<div class="cr" id="cr${i}" style="top:${74 + i * 64}px"><div class="ck" style="color:${c}">${k}</div><div class="cw2">${w}</div><div class="cv" id="cv${i}" style="color:${c}"></div></div>`).join('');
// chart
const ch = $('#chS'), BY = 226, BS = 0.55;
const mkBars = (set, x0, dx) => set.map(([s, , pm], i) => { const g = mk(ch, 'g', {}); const x = x0 + i * dx; const r = mk(g, 'rect', { x: x - 26, y: BY, width: 52, height: 0, rx: 6, fill: C.dim }); const l = txt(g, x, BY + 26, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 20, fill: HC }); const v = txt(g, x, BY - 8, String(pm), { 'text-anchor': 'middle', 'font-size': 18, fill: NC, 'font-weight': 600 }); return { g, r, v, pm }; });
const bP = mkBars(P2, 120, 92), bG = mkBars(G1, 160, 116);
mk(ch, 'line', { x1: 60, y1: BY, x2: 724, y2: BY, stroke: C.ink2, 'stroke-width': 2 });
const arrL = document.createElement('div'); arrL.className = 'btag'; arrL.style.cssText = 'right:36px;top:22px;background:var(--ac2);color:var(--ac)'; $('#ch').appendChild(arrL);
const avA = PUC.avatar($('#sS'), { x: 160 + 36, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'More protons, same shell: a tighter pull.' });

/* ---------- I: ions side by side ---------- */
const IS = 1.2, IY = 290;
const aNa = atomV($('#iAS'), 392, IY), aF = atomV($('#iBS'), 392, IY);
const flyNa = mk($('#iAS'), 'circle', { r: 10, fill: EC }), flyF = mk($('#iBS'), 'circle', { r: 10, fill: EC });
const ionLab = (host, a, b) => { const d = document.createElement('div'); d.className = 'fx'; d.style.cssText = 'left:36px;top:500px;font-size:40px'; d.innerHTML = `<span class="i0">${K(a)}</span><span class="i1">${K(b)}</span>`; host.appendChild(d); return d; };
const lNa = ionLab($('#iA'), ion('Na'), `${ion('Na')} \\rightarrow ${ion('Na^{+}')}`), lF = ionLab($('#iB'), ion('F'), `${ion('F')} \\rightarrow ${ion('F^{-}')}`);
const chip = (host) => { const d = document.createElement('div'); d.className = 'btag'; d.style.cssText = 'right:36px;top:506px;background:var(--soft);color:var(--ink)'; host.appendChild(d); return d; };
const cNa = chip($('#iA')), cF = chip($('#iB'));
const th1 = PUC.think($('#th1'), { q: `${K(ion('F^-'))} and ${K(ion('Na^+'))} both have 10 electrons. Which one is smaller?`, opts: [K(ion('F^-')), K(ion('Na^+'))], right: 1, why: `${K(ion('Na^+'))} has 11 protons pulling 10 electrons. ${K(ion('F^-'))} has only 9.` });

/* ---------- D: isoelectronic ranking ---------- */
const MS = [['Count the electrons: all 10', 'D2'], [`Count the protons: ${K(tG('8,\\ 9,\\ 11,\\ 12'))}`, 'D3'], [`More protons pull closer: smaller ${K(tN('r'))}`, 'D4'], [`${K(`${ion('O^{2-}')} > ${ion('F^-')} > ${ion('Na^+')} > ${ion('Mg^{2+}')}`)}`, 'D5']];
$('#mss').innerHTML = MS.map(([s], i) => `<div class="ms" id="ms${i}" style="top:${96 + i * 92}px"><div class="sn">${i + 1}</div><div class="stx">${s}</div></div>`).join('');
const tMs = MS.map(m => T0(m[1]) + 0.25);
const ISO = [['O^{2-}', 8, 72], ['F^-', 9, 66], ['Na^+', 11, 50], ['Mg^{2+}', 12, 42]];
$('#ics').innerHTML = ISO.map(([s, p], i) => `<div class="ic" id="ic${i}" style="left:${36 + i * 180}px;width:172px"><svg width="172" height="250" style="position:absolute;left:0;top:0"><circle cx="86" cy="120" r="70" fill="${C.ac3}" stroke="${NC}" stroke-width="3"/><circle cx="86" cy="120" r="9" fill="${GC}"/></svg>
  <div class="ik" style="width:172px">${K(ion(s))}</div><div class="ir" id="ie${i}" style="top:330px;left:11px;color:${EC}">10 e⁻</div><div class="ir" id="ip${i}" style="top:382px;left:11px;color:${GC}">${p} p⁺</div><div class="rk" id="rk${i}" style="width:172px">${['BIGGEST', '2nd', '3rd', 'SMALLEST'][i]}</div></div>`).join('');
const tIe = wt('D2', 'ten'), tIp = [wt('D3', 'Eight'), wt('D3', 'nine'), wt('D3', 'eleven'), wt('D3', 'twelve')], tShr = wt('D4', 'closer'), tRk = [wt('D5', 'oxide'), wt('D5', 'fluoride'), wt('D5', 'sodium'), wt('D5', 'magnesium')];

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${ion('O^{2-}')} > ${ion('F^-')} > ${ion('Na^+')} > ${ion('Mg^{2+}')} \\quad (\\text{all } ${tE('10\\,e^-')})`);

/* ---------- W: worked example ---------- */
const wsol = PUC.solution($('#wl'), [
  [K(`${tN('r')} = \\dfrac{d}{2}`)],
  [K(`${tN('r_{\\mathrm{Cl}}')} = \\dfrac{198}{2} = ${tN('99\\,\\text{pm}')}`)],
  [K(`${tN('r_{\\mathrm{Cu}}')} = \\dfrac{256}{2} = ${tN('128\\,\\text{pm}')}`)],
  [K(`${tN('r_{\\mathrm{Cl}}')} = 99 > ${tN('r_{\\mathrm{F}}')} = 64\\,\\text{pm}`)]], { label: 'WORKED EXAMPLE', y0: 196, dy: 96 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6')];
const ws = $('#wS'), WY = 250, WS = 0.95;
const pair = (r, d, fill, stroke) => { const g = mk(ws, 'g', {}); [-1, 1].forEach(s => { mk(g, 'circle', { cx: 392 + s * d / 2, cy: WY, r, fill, stroke, 'stroke-width': 3 }); mk(g, 'circle', { cx: 392 + s * d / 2, cy: WY, r: 8, fill: HC }); }); return g; };
const gCl = pair(99 * WS, 198 * WS, C.ac3, NC); txt(gCl, 392 - 99 * WS, WY + 99 * WS + 40, 'Cl', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: HC }); txt(gCl, 392 + 99 * WS, WY + 99 * WS + 40, 'Cl', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: HC });
const CuS = 0.7, gCu = mk(ws, 'g', {}); [-1, 0, 1].forEach(k => { mk(gCu, 'circle', { cx: 392 + k * 256 * CuS, cy: WY, r: 128 * CuS, fill: '#E9E5DA', stroke: C.ink2, 'stroke-width': 3 }); mk(gCu, 'circle', { cx: 392 + k * 256 * CuS, cy: WY, r: 8, fill: HC }); });
txt(gCu, 392, WY + 128 * CuS + 40, 'Cu · Cu · Cu', { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 26, fill: HC });
const dLine = mk(ws, 'path', { d: '', stroke: HC, 'stroke-width': 3, fill: 'none' }), dTxt = txt(ws, 392, 0, '', { 'text-anchor': 'middle', 'font-size': 26, fill: HC, 'font-weight': 600 });
const rLine = mk(ws, 'line', { y1: WY, y2: WY, stroke: NC, 'stroke-width': 5, 'stroke-linecap': 'round' }), rTxt = txt(ws, 0, WY - 18, '', { 'text-anchor': 'middle', 'font-size': 26, fill: NC, 'font-weight': 600 });
const gCmp = mk(ws, 'g', {}); [[250, 64, 'F', '64 pm'], [520, 99, 'Cl', '99 pm']].forEach(([x, r, s, v]) => { mk(gCmp, 'circle', { cx: x, cy: WY, r: r * 1.5, fill: C.ac3, stroke: NC, 'stroke-width': 3 }); txt(gCmp, x, WY + 10, s, { 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 30, fill: HC }); txt(gCmp, x, WY + r * 1.5 + 44, v, { 'text-anchor': 'middle', 'font-size': 26, fill: NC, 'font-weight': 600 }); });
const cmpTag = document.createElement('div'); cmpTag.className = 'pillp ac'; cmpTag.style.cssText = 'left:36px;top:494px'; cmpTag.textContent = 'One shell further down group 17: bigger'; $('#wr').appendChild(cmpTag);

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Same electrons, so the same size', right: `More protons, smaller: ${K(`${ion('O^{2-}')} > ${ion('F^-')} > ${ion('Na^+')}`)}` });
const tsv = $('#tS');
const eqC = mk(tsv, 'g', {}); [70, 160, 250].forEach(x => mk(eqC, 'circle', { cx: x, cy: 120, r: 40, fill: C.redBg, stroke: C.red, 'stroke-width': 3 }));
txt(eqC, 160, 214, 'EQUAL? NO', { 'text-anchor': 'middle', 'font-size': 16, fill: C.red, 'font-weight': 600 });
const xEq = mk(tsv, 'path', { d: 'M40 80 L280 170 M280 80 L40 170', stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
const okC = mk(tsv, 'g', {}); [[380, 48], [470, 42], [548, 32], [604, 26]].forEach(([x, r]) => mk(okC, 'circle', { cx: x - 20, cy: 120, r, fill: C.okBg, stroke: C.ok, 'stroke-width': 3 }));
txt(okC, 470, 214, '8, 9, 11 PROTONS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: ['JEE MAIN', 'NEET'], type: 'Order the sizes of atoms, or of isoelectronic ions' });
const OPT = [`${ion('Ca^{2+}')} > ${ion('K^+')} > ${ion('Cl^-')} > ${ion('S^{2-}')}`, `${ion('S^{2-}')} > ${ion('Cl^-')} > ${ion('K^+')} > ${ion('Ca^{2+}')}`, `${ion('Cl^-')} > ${ion('S^{2-}')} > ${ion('K^+')} > ${ion('Ca^{2+}')}`, `${ion('K^+')} > ${ion('Ca^{2+}')} > ${ion('S^{2-}')} > ${ion('Cl^-')}`];
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `Which order of radius is correct for ${K(ion('S^{2-}'))}, ${K(ion('Cl^-'))}, ${K(ion('K^+'))} and ${K(ion('Ca^{2+}'))}?`, qW: 780,
  opts: OPT.map(s => K(s)), right: 1, optW: 474, optY: 330, optH: 110, optFs: 30 });
const so = PUC.solution($('#so'), [[`All have ${K(tE('18\\,e^-'))}`], [`Protons: ${K(tG('16,\\ 17,\\ 19,\\ 20'))}`], ['More protons: smaller'], [K(`${ion('S^{2-}')} > ${ion('Cl^-')} > ${ion('K^+')} > ${ion('Ca^{2+}')}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), T0('A3'), T0('A4'), wt('A4', 'largest')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · atomic and ionic radii', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(`${tN('r_{\\text{covalent}}')} = \\dfrac{d}{2} \\qquad ${tN('r_{\\mathrm{Cl}}')} = 99\\,\\text{pm},\\; ${tN('r_{\\mathrm{Cu}}')} = 128\\,\\text{pm}`), '<b>Across period 2</b>: Li 152 → F 64 pm (more protons, same shell)', '<b>Down group 1</b>: Li 152 → Cs 262 pm (a new shell each step)', '<b>Ions</b>: Na 186 → Na⁺ 95 pm · F 64 → F⁻ 136 pm', '<b>Isoelectronic</b>: more protons, smaller · O²⁻ > F⁻ > Na⁺ > Mg²⁺'] });
const YQ = ['Why do atoms shrink from lithium to fluorine?', 'Why is the sodium ion so much smaller than the sodium atom?', 'Which is bigger, the oxide ion or the magnesium ion, and why?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 32', topic: 'Why is an electron harder to pull from fluorine? Ionization Enthalpy', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tP2[5] - 0.3, 1.1, 640, 570], [T0('S6') + 0.4, 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  const nc = $('#nchip'), sj = $('#subj'), room = 1760 - sj.offsetWidth - 32 - 160; if (nc.offsetWidth > room) nc.style.fontSize = Math.floor(22 * room / nc.offsetWidth) + 'px';
  [0, 1, 2].forEach(i => { $('#wq' + i).style.left = '36px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
}
// period 2 / group 1 state at time t
const benchState = t => {
  const grp = t >= tG1[0] - 0.2;
  const set = grp ? G1 : P2, ts = grp ? tG1 : tP2;
  let i = 0; ts.forEach((tt, k) => { if (t >= tt - 0.1) i = k; });
  const u = M.io((t - ts[i] + 0.1) / 0.6), prev = set[Math.max(0, i - 1)], cur = set[i];
  const pmv = i === 0 ? cur[2] : M.lerp(prev[2], cur[2], u);
  return { grp, i, cur, prev, u, pmv };
};

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
    const tB = [wt('H2', 'bigger'), wt('H2', 'smaller'), wt('H2', 'smaller') + 0.25];
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); const jb = $('#jb_' + i); M.vis(jb, t, tB[i] - 0.1, 1e9, POP); const u = M.io((t - tB[i]) / 0.3); setBg(jb, mix('#FFFFFF', JOBS[i][5], u)); jb.style.color = mix(JOBS[i][5], '#FFFFFF', u); });
    M.vis($('#hjP'), t, wt('H2', 'stronger') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => M.vis($('#wq' + i), t, tKit[i] - 0.1, i < 2 ? tKit[i + 1] - 0.1 : tH5 - 0.1, { ...POP, outDur: 0.2, ody: 0 }));
    M.vis($('#hTz'), t, wt('H5', 'fluorine') - 0.15, 1e9, POP);
  }

  /* P: covalent and metallic radius */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pc'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    pAt.forEach((g, i) => fade(g, t, tP1 + 0.4 + i * 0.25));
    const tDist = wt('P2', 'distance'); M.draw(pD, t, tDist, 0.6); pTick.forEach(l => fade(l, t, tDist)); fade(pDt, t, tDist + 0.3);
    const tHalf = wt('P3', 'Half'); M.draw(pR, t, tHalf, 0.5); fade(pRt, t, tHalf + 0.3); PUC.write(pF, t, wt('P3', 'covalent'), 0.7);
    M.vis($('#pm'), t, T0('P4') - 0.1, out, { dx: 60, dy: 0, ...o });
    mAt.forEach((g, i) => fade(g, t, T0('P4') + 0.2 + i * 0.1));
    M.draw(mD, t, wt('P4', 'neighbouring'), 0.5); fade(mDt, t, wt('P4', 'neighbouring') + 0.3); M.draw(mR, t, wt('P4', 'metallic'), 0.5); fade(mRt, t, wt('P4', 'metallic') + 0.3);
    M.vis($('#pmP'), t, wt('P4', 'picometres') - 0.1, 1e9, POP);
  }

  /* S: the bench */
  const sOn = t >= tS1 - 0.1 && t < tI1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('I1');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    M.vis($('#ad'), t, tP2[0] - 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ch'), t, tP2[0] + 0.2, z, { dy: 36, ...o });
    const s = benchState(t), R = s.pmv * SC, n = s.grp ? M.lerp(s.prev[3], s.cur[3], s.i ? s.u : 1) : 2;
    const nI = Math.round(n), rr = [], ra = [];
    for (let k = 0; k < 6; k++) { rr.push(R * (k + 1) / Math.max(n, 1)); ra.push(k < n - 0.999 ? 1 : k < n ? n - Math.floor(n) || 1 : 0); }
    let e;
    if (!s.grp) { const outE = s.cur[3]; e = [[0, 2, false], [1, outE, t >= s.i && s.i > 0 && s.u < 1 ? true : true, 0.35]]; }
    else e = [[Math.max(0, Math.ceil(n) - 1), 1, true]];
    av.set({ R, rr, ra, e, sym: s.cur[0], z: `+${s.cur[1]}`, pm: s.pmv, ral: M.clamp((t - tP2[0] - 0.6) / 0.3) });
    av.g.style.opacity = M.clamp((t - tP2[0] + 0.3) / 0.3).toFixed(3);
    M.setT(btag, s.grp ? `GROUP 1 · ${s.cur[0]} · ${s.cur[3]} SHELLS` : `PERIOD 2 · ${s.cur[0]} · 2, ${s.cur[3]}`); M.vis(btag, t, tP2[0] - 0.1, 1e9, POP);
    M.setT($('#bnL'), s.grp ? 'MOLECULE BENCH · DOWN GROUP 1' : 'MOLECULE BENCH · ACROSS PERIOD 2');
    M.setT($('#cv0'), `+${s.cur[1]}`); M.setT($('#cv1'), String(s.grp ? s.cur[3] : 2)); M.setT($('#cv2'), `${Math.round(s.pmv)} pm`);
    const fl = M.io((t - (s.grp ? tG1 : tP2)[s.i]) / 0.2) * (1 - M.io((t - (s.grp ? tG1 : tP2)[s.i] - 0.6) / 0.4));
    RO.forEach((_, i) => { M.vis($('#cr' + i), t, tP2[0] + i * 0.12, 1e9, { dx: -16, dy: 0 }); setBg($('#cr' + i), mix(C.soft, C.ac2, i === 1 && !s.grp ? 0 : fl)); });
    // chart
    const gOn = M.io((t - tG1[0] + 0.3) / 0.3);
    bP.forEach((bb, i) => { const u = M.io((t - tP2[i] + 0.05) / 0.45); attr(bb.r, 'height', (bb.pm * BS * u).toFixed(1)); attr(bb.r, 'y', (BY - bb.pm * BS * u).toFixed(1)); attr(bb.v, 'y', (BY - bb.pm * BS * u - 8).toFixed(1)); attr(bb.r, 'fill', !s.grp && i === s.i ? NC : C.dim); bb.g.style.opacity = (M.clamp((t - tP2[i] + 0.1) / 0.2) * (1 - gOn)).toFixed(3); M.hide(bb.g, t < tP2[i] - 0.1 || gOn >= 1); });
    bG.forEach((bb, i) => { const u = M.io((t - tG1[i] + 0.05) / 0.45); attr(bb.r, 'height', (bb.pm * BS * u).toFixed(1)); attr(bb.r, 'y', (BY - bb.pm * BS * u).toFixed(1)); attr(bb.v, 'y', (BY - bb.pm * BS * u - 8).toFixed(1)); attr(bb.r, 'fill', s.grp && i === s.i ? NC : C.dim); bb.g.style.opacity = M.clamp((t - tG1[i] + 0.1) / 0.2).toFixed(3); M.hide(bb.g, t < tG1[i] - 0.1); });
    M.setT($('#chL'), s.grp ? 'ATOMIC RADIUS / pm · NCERT TABLE 3.6(b)' : 'ATOMIC RADIUS / pm · NCERT TABLE 3.6(a)');
    M.setT(arrL, s.grp ? 'NEW SHELL: BIGGER' : 'SAME SHELL: SMALLER'); M.vis(arrL, t, s.grp ? wt('S8', 'shell') - 0.1 : wt('S6', 'shrinks') - 0.1, 1e9, POP);
    avA(t, wt('S6', 'pull') - 0.1, tG1[0] - 0.4);
  }

  /* I: ions + think */
  const iOn = t >= tI1 - 0.1 && t < tD1 + 0.1; M.hide($('#sI'), !iOn);
  if (iOn) {
    const z = OUT('B2');
    M.vis($('#iA'), t, tI1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#iB'), t, T0('I3') - 0.2, z, { dx: 60, dy: 0, ...o });
    M.vis($('#th1'), t, tB2 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB2, tOpts: wt('B2', 'fluoride') - 0.1, tCount: T1('B2') + 0.05, dur: 3, tAns: T0('B3') - 0.02, tWhy: wt('B3', 'It') });
    // sodium: electron leaves, third shell vanishes, radius 186 -> 95
    const tLose = wt('I2', 'loses'), tDrop = wt('I2', 'drops'), uL = M.io((t - tLose) / 0.8), uD = M.io((t - tDrop + 0.2) / 0.7);
    const pNa = M.lerp(186, 95, uD), RNa = pNa * IS, nNa = M.lerp(3, 2, uD);
    aNa.set({ R: RNa, rr: [1, 2, 3].map(k => RNa * k / nNa), ra: [1, 1, 1 - M.io((t - tLose - 0.4) / 0.6)], e: [[0, 2], [1, 8, false, 0.2], [2, 1, true, 0, 1 - M.clamp((t - tLose) / 0.05)]], sym: 'Na', z: '+11', pm: pNa, ral: 1 });
    const [ex, ey] = [392, IY - 186 * IS]; attr(flyNa, 'cx', M.lerp(ex, 760, uL).toFixed(1)); attr(flyNa, 'cy', M.lerp(ey, 20, uL).toFixed(1)); M.hide(flyNa, t < tLose || uL >= 1);
    lNa.querySelector('.i0').style.display = t < tLose ? '' : 'none'; lNa.querySelector('.i1').style.display = t < tLose ? 'none' : '';
    M.vis(lNa, t, tI1 + 0.3, 1e9, { dy: 10 });
    // fluorine: electron arrives, radius 64 -> 136
    const tGain = wt('I3', 'gains'), tGrow = wt('I3', 'grows'), uG = M.io((t - tGain) / 0.8), uR = M.io((t - tGrow + 0.2) / 0.7);
    const pF2 = M.lerp(64, 136, uR), RF = pF2 * IS, in8 = t >= tGain + 0.8;
    aF.set({ R: RF, rr: [RF / 2, RF], e: [[0, 2], [1, in8 ? 8 : 7, in8, 0]], sym: 'F', z: '+9', pm: pF2, ral: 1 });
    const fx = 392 + RF * Math.cos(-Math.PI / 2 + 7 * 2 * Math.PI / 8), fy = IY + RF * Math.sin(-Math.PI / 2 + 7 * 2 * Math.PI / 8);
    attr(flyF, 'cx', M.lerp(760, fx, uG).toFixed(1)); attr(flyF, 'cy', M.lerp(20, fy, uG).toFixed(1)); M.hide(flyF, t < tGain || in8);
    lF.querySelector('.i0').style.display = t < tGain ? '' : 'none'; lF.querySelector('.i1').style.display = t < tGain ? 'none' : '';
    M.vis(lF, t, T0('I3'), 1e9, { dy: 10 });
    // electron chips: both 10 e- on B1
    M.setT(cNa, t < tLose + 0.5 ? '11 p⁺ · 11 e⁻' : '11 p⁺ · 10 e⁻'); M.setT(cF, t < tGain + 0.6 ? '9 p⁺ · 9 e⁻' : '9 p⁺ · 10 e⁻');
    M.vis(cNa, t, tI1 + 0.5, 1e9, POP); M.vis(cF, t, T0('I3') + 0.2, 1e9, POP);
    const hb = M.io((t - wt('B1', 'ten') + 0.1) / 0.3); [cNa, cF].forEach(c => { setBg(c, mix(C.soft, EC, hb)); c.style.color = mix(C.ink, '#FFFFFF', hb); });
  }

  /* D: isoelectronic ranking */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const z = OUT('T1');
    M.vis($('#mt'), t, tD1 + 0.05, z, { dx: -60, dy: 0, ...o });
    M.vis($('#mtP'), t, wt('D1', 'isoelectronic') - 0.1, 1e9, POP);
    M.vis($('#iso'), t, tD1 + 0.3, z, { dx: 60, dy: 0, ...o });
    MS.forEach((_, i) => { const r = $('#ms' + i); M.vis(r.querySelector('.sn'), t, tMs[i] - 0.1, 1e9, POP); PUC.write(r.querySelector('.stx'), t, tMs[i], 0.6); });
    const shr = M.io((t - tShr + 0.2) / 0.9);
    ISO.forEach(([, , rf], i) => { const c = $('#ic' + i); M.vis(c, t, tD1 + 0.5 + i * 0.1, 1e9, { dy: 16 });
      const cs = c.querySelectorAll('circle'); attr(cs[0], 'r', M.lerp(70, rf, shr).toFixed(1));
      M.vis($('#ie' + i), t, tIe - 0.1 + i * 0.1, 1e9, POP); M.vis($('#ip' + i), t, tIp[i] - 0.1, 1e9, POP);
      M.vis($('#rk' + i), t, tRk[i] - 0.1, 1e9, POP); $('#rk' + i).style.color = i === 0 ? NC : i === 3 ? GC : C.ink2; });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Same') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'smaller') - 0.3, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'smaller') + 0.4, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    const tCu = T0('W5'), tCm = T0('W6');
    fade(gCl, t, T0('W2') + 0.3, tCu); fade(gCu, t, tCu + 0.1, tCm); fade(gCmp, t, tCm + 0.1);
    M.setT($('#wrL'), t < tCu ? 'CHLORINE MOLECULE · HALF THE DISTANCE' : t < tCm ? 'COPPER METAL · HALF THE DISTANCE' : 'FLUORINE VERSUS CHLORINE');
    const cu = t >= tCu, dd = cu ? 256 * CuS : 198 * WS, rv = dd / 2, dy = WY + (cu ? 128 * CuS : 99 * WS) + 70;
    attr(dLine, 'd', `M${392 - dd / 2} ${dy} H${392 + dd / 2} M${392 - dd / 2} ${dy - 12} v24 M${392 + dd / 2} ${dy - 12} v24`); attr(dTxt, 'y', (dy + 40).toFixed(1));
    M.setT(dTxt, cu ? 'd = 256 pm' : 'd = 198 pm'); M.setT(rTxt, cu ? '128 pm' : '99 pm');
    const d0 = cu ? wt('W5', 'neighbouring') : wt('W2', 'nuclei'), r0 = cu ? wt('W5', 'Half') : wt('W4', 'ninety');
    M.draw(dLine, t, d0, 0.5); fade(dTxt, t, d0 + 0.3, tCm);
    attr(rLine, 'x1', (392 + dd / 2).toFixed(1)); attr(rLine, 'x2', (392 + dd / 2 + rv).toFixed(1)); attr(rTxt, 'x', (392 + dd / 2 + rv / 2).toFixed(1));
    M.draw(rLine, t, r0, 0.4); if (t >= tCm) M.hide(rLine, true); fade(rTxt, t, r0 + 0.3, tCm);
    if (t >= tCm) M.hide(dLine, true);
    M.vis(cmpTag, t, wt('W6', 'shell') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'same') - 0.1, tStrike: wt('X3', 'But') - 0.1, tRight: wt('X3', 'More') - 0.1 });
    fade(eqC, t, wt('X2', 'same') + 0.1); M.draw(xEq, t, wt('X3', 'different'), 0.4); fade(okC, t, wt('X3', 'More') + 0.1);
    where(t, { tin: T0('E1'), tLight: [wt('E1', 'JEE'), wt('E1', 'NEET')], tType: wt('E1', 'order') });
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
    nx(t, tNx - 0.05);
  }
  caps(t);
});

SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
