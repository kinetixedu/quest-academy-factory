// PUC Chemistry Ep 01: Introduction to chemistry (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (same in bench, formulas, counters, recap): O teal (element in play), H ink, C violet, electrons orange, big numbers gold
const OC = C.ac, HC = C.ink, CC = '#7A4FE0', EC = '#C8461B', GC = '#B7791F', NAC = '#8C6D46', CLC = '#2E9E5B', CAC = '#B04F7A', ALC = '#5A6B8C', SUC = '#6B8E23', RUST = '#8B4A2B';
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const f1 = v => v.toFixed(1);
// LaTeX helpers with colour-coding
const E_ = (s, c) => `\\textcolor{${c}}{\\mathrm{${s}}}`, G_ = s => `\\textcolor{${GC}}{${s}}`;
const O_ = E_('O', OC), H_ = E_('H', HC), C_ = E_('C', CC), NA_ = E_('Na', NAC), CL_ = E_('Cl', CLC), CA_ = E_('Ca', CAC);
const O2 = `${O_}_2`, H2 = `${H_}_2`, H2O = `${H_}_2${O_}`, CO2 = `${C_}${O_}_2`, NACL = `${NA_}${CL_}`, CAOH = `${CA_}(${O_}${H_})_2`;
const GLU = `${C_}_6${H_}_{12}${O_}_6`, ALS = `${E_('Al', ALC)}_2(${E_('S', SUC)}${O_}_4)_3`;
const COL = { O: OC, H: HC, C: CC, Na: NAC, Cl: CLC, Ca: CAC };

Object.assign(M.IC, {
  snow: ['m10 20-1.25-2.5L6 18', 'M10 4 8.75 6.5 6 6', 'm14 20 1.25-2.5L18 18', 'm14 4 1.25 2.5L18 6', 'm17 21-3-6h-4', 'm17 3-3 6 1.5 3', 'M2 12h6.5L10 9', 'm20 10-1.5 2 1.5 2', 'M22 12h-6.5L14 15', 'm4 10 1.5 2L4 14', 'm7 21 3-6-1.5-3', 'm7 3 3 6h4'],
  apple: ['M12 6.528V3a1 1 0 0 1 1-1', 'M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3.5 3.5 0 0 0 5.648-.418 3.5 3.5 0 0 0 5.648.418'],
  box: ['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'],
  pen: ['M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z', 'm15 5 4 4'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  wind: ['M12.8 19.6A2 2 0 1 0 14 16H2', 'M17.5 8a2.5 2.5 0 1 1 2 4H2', 'M9.8 4.4A2 2 0 1 1 11 8H2'],
  hex: ['M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'],
  search: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tM1 = T0('M1'), tL1 = T0('L1'), tB1 = T0('B1'), tR2 = T0('R2'), tK1 = T0('K1'), tK2 = T0('K2'), tC1 = T0('C1');
const tT = T0('T1'), tJ1 = T0('J1'), tW1 = T0('W1'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tJ1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card: three puzzles ---------- */
const JOBS = [['snow', 'Ice floats?', 'IN A GLASS OF WATER', 'ice', 'LESS DENSE', ['H3', 'Ice']], ['apple', 'Apple browns?', 'A CUT APPLE IN AIR', 'apple', 'REACTS WITH O₂', ['H4', 'apple']], ['box', 'Salt vanishes?', 'STIRRED INTO WATER', 'salt', 'TINY PARTICLES', ['H4', 'salt']]];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
/* ---------- H ---------- */
$('#jrs').innerHTML = JOBS.map(([ic, n, w, , a], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="ja" id="ja${i}">${a}</div></div>`).join('');
const tJa = JOBS.map(j => wt(...j[5]));
const KIT = [['snow', 'Ice'], ['apple', 'Apple'], ['box', 'Salt']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('') + `<div class="pillp ink" id="hW" style="left:36px;top:498px">Welcome to chemistry</div>`;

/* ---------- P: what is chemistry + is it matter ---------- */
$('#mdefI').innerHTML = M.icon('box', 28, '#fff', 2.2);
const KQ = [['COMPOSITION', 'What is it made of?', 'made'], ['STRUCTURE', 'How is it arranged?', 'arranged'], ['PROPERTIES', 'How does it behave?', 'behaves'], ['CHANGE', 'How does it change?', 'changes']];
$('#kqs').innerHTML = KQ.map(([k, q], i) => `<div class="kq" id="kq${i}" style="left:${36 + (i % 2) * 368}px;top:${314 + Math.floor(i / 2) * 116}px"><div class="kk">${k}</div><div class="kt">${q}</div></div>`).join('');
const tKq = KQ.map(q => wt('P4', q[2]));
const MR = [['pen', 'Your pen', 'pen'], ['droplet', 'Water', 'water'], ['wind', 'Air', 'air']];
const chk = s => `<span>${s}</span>${M.icon('check', 20, C.ok, 3)}`;
$('#mrs').innerHTML = MR.map(([ic, n], i) => `<div class="mr" id="mr${i}" style="top:${92 + i * 116}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="mn">${n}</div><div class="mk" id="mkA${i}" style="right:168px">${chk('MASS')}</div><div class="mk" id="mkB${i}" style="right:20px">${chk('SPACE')}</div></div>`).join('');
const tMr = MR.map(m => wt('P2', m[2]));

/* ---------- M: three states, particles ---------- */
const ST = [['Solid', 'ICE · KEEPS ITS SHAPE', 'SHAKE IN PLACE', 'M2', 'shake'], ['Liquid', 'WATER · FLOWS', 'SLIDE PAST', 'M3', 'slide'], ['Gas', 'STEAM · FILLS ANY SPACE', 'FLY APART', 'M4', 'fly']];
$('#sbs').innerHTML = ST.map(([n, w, m], i) => `<div class="sbx" id="sb${i}" style="left:${48 + i * 512}px"><svg id="sv${i}" width="480" height="320"></svg></div><div class="sn3" id="sn${i}" style="left:${48 + i * 512}px">${n}</div><div class="sx3" id="sx${i}" style="left:${48 + i * 512}px">${w}</div><div class="btag" id="sm${i}" style="top:440px;background:var(--ac2);color:var(--ac)">${m}</div>`).join('');
const rng = M.rng(7);
// solid lattice 7 x 5, liquid 8 x 3 jittered, gas 9 free
const SOL = Array.from({ length: 35 }, (_, i) => [66 + (i % 7) * 58, 44 + Math.floor(i / 7) * 58]);
const LIQ = Array.from({ length: 24 }, (_, i) => [52 + (i % 8) * 54 + (Math.floor(i / 8) % 2) * 20 + (rng() - 0.5) * 6, 150 + Math.floor(i / 8) * 52 + (rng() - 0.5) * 6]);
const GAS = Array.from({ length: 9 }, () => [40 + rng() * 400, 40 + rng() * 240, (rng() < 0.5 ? -1 : 1) * (170 + rng() * 120), (rng() < 0.5 ? -1 : 1) * (150 + rng() * 120)]);
const sv = [0, 1, 2].map(i => $('#sv' + i));
const liqFill = mk(sv[1], 'rect', { x: 0, y: 116, width: 480, height: 204, fill: '#D5F0F0' });
const pS = SOL.map(() => mk(sv[0], 'circle', { r: 22, fill: OC })), pL = LIQ.map(() => mk(sv[1], 'circle', { r: 21, fill: OC })), pG = GAS.map(() => mk(sv[2], 'circle', { r: 22, fill: OC }));
const tri = (u, a, b) => { const L = b - a, m = ((u - a) % (2 * L) + 2 * L) % (2 * L); return a + (m < L ? m : 2 * L - m); };
const posS = (i, tau, amp) => [SOL[i][0] + amp * 3.5 * Math.sin(tau * 17 + i * 1.7), SOL[i][1] + amp * 3.5 * Math.cos(tau * 15 + i * 2.3)];
const posL = (i, tau) => { const r = Math.floor(i / 8); return [LIQ[i][0] + (r % 2 ? -1 : 1) * 20 * Math.sin(tau * 1.5 + r * 1.3), LIQ[i][1] + 4 * Math.sin(tau * 2.3 + i)]; };
const posG = (i, tau) => { const [x, y, vx, vy] = GAS[i]; return [tri(x + vx * tau, 22, 458), tri(y + vy * tau, 22, 298)]; };
// local time: full speed while its line plays, a quarter after, frozen before
const tauOf = (t, a, b) => t < a ? 0 : t < b ? t - a : (b - a) + 0.25 * (t - b);
const tSt = ST.map(s => T0(s[3]));

/* ---------- L: ladder ---------- */
const RG = [['Matter', 'MASS + SPACE'], ['Pure substance', 'ONE KIND OF MATTER'], null, ['Molecule', 'SMALLEST FREE BIT'], ['Atom', 'THE BUILDING BLOCK'], ['Protons, neutrons, electrons', 'CHAPTER 2']];
$('#rgs').innerHTML = RG.map((r, i) => r ? `<div class="rg" id="rg${i}" style="top:${84 + i * 78}px"><div class="nn">${i + 1}</div><div class="rt">${r[0]}</div><div class="rw">${r[1]}</div></div>`
  : `<div style="position:absolute;left:36px;top:${84 + i * 78}px;width:712px;height:62px"><div class="rh" id="rgE" style="left:0;width:340px"><div class="rt">Element</div><div class="rw">ONE KIND</div></div><div class="rh" id="rgC" style="left:372px;width:340px"><div class="rt">Compound</div><div class="rw">2+ KINDS</div></div></div>`).join('');
const tRg = [tL1 + 0.3, wt('L2', 'pure'), wt('L3', 'element'), wt('L4', 'compound'), wt('L5', 'molecule'), wt('L5', 'atoms'), wt('L6', 'protons')];
const rgEls = ['#rg0', '#rg1', '#rgE', '#rgC', '#rg3', '#rg4', '#rg5'].map(s => $(s));
// zoom pane: beaker, magnifier with a water molecule, then the atom inside
const z = $('#zS');
const beaker = mk(z, 'g', {});
mk(beaker, 'rect', { x: 72, y: 250, width: 216, height: 188, rx: 10, fill: '#D5F0F0' });
mk(beaker, 'path', { d: 'M62 160 H72 V420 Q72 440 92 440 H268 Q288 440 288 420 V160 H298', fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
[300, 350, 400].forEach(y => mk(beaker, 'line', { x1: 72, y1: y, x2: 96, y2: y, stroke: C.ink2, 'stroke-width': 2.5 }));
const bkL = txt(z, 180, 140, 'PURE WATER', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const mag = mk(z, 'g', {});
const spot = mk(mag, 'circle', { cx: 230, cy: 330, r: 18, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
const MX = 548, MY = 290, MR_ = 168;
[150, 210].forEach(a => { const r = a * Math.PI / 180; mk(mag, 'line', { x1: 246, y1: a === 150 ? 338 : 322, x2: MX + MR_ * Math.cos(r), y2: MY + MR_ * Math.sin(r), stroke: C.dim, 'stroke-width': 2.5, 'stroke-dasharray': '6 8' }); });
mk(mag, 'circle', { cx: MX, cy: MY, r: MR_, fill: '#fff', stroke: C.ink, 'stroke-width': 4 });
const atomG = (p, r, fill, lab, fs) => { const g = mk(p, 'g', {}); mk(g, 'circle', { r, fill }); txt(g, 0, fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff', 'text-anchor': 'middle' }); return g; };
const molW = mk(mag, 'g', {});
const zO = atomG(molW, 42, OC, 'O', 34), zH = [0, 1].map(() => atomG(molW, 28, HC, 'H', 24));
const zB = [0, 1].map(() => mk(molW, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
molW.insertBefore(zB[0], molW.firstChild); molW.insertBefore(zB[1], molW.firstChild);
const zLab = txt(mag, MX, MY + 128, 'ONE MOLECULE', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const zLab2 = txt(mag, MX, MY + 128, '3 ATOMS', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600 });
const atomM = mk(mag, 'g', {});
const orb = [70, 128].map(r => mk(atomM, 'circle', { cx: MX, cy: MY, r, fill: 'none', stroke: C.dim, 'stroke-width': 2 }));
const NUC = [[-11, -9, 1], [11, -9, 0], [0, 10, 1], [-15, 12, 0], [15, 11, 1], [0, -20, 0]];
NUC.forEach(([dx, dy, p]) => mk(atomM, 'circle', { cx: MX + dx, cy: MY + dy, r: 13, fill: p ? OC : '#9AA3B2', stroke: '#fff', 'stroke-width': 2 }));
const eZ = [[70, 0], [70, Math.PI], [128, 0.4], [128, 0.4 + Math.PI / 2], [128, 0.4 + Math.PI], [128, 0.4 + 1.5 * Math.PI]].map(([r, a]) => ({ r, a, el: mk(atomM, 'circle', { r: 8, fill: EC }) }));
const legend = document.createElement('div'); legend.style.cssText = 'position:absolute;left:36px;top:500px;display:flex;gap:12px'; $('#lz').appendChild(legend);
legend.innerHTML = [['p⁺ PROTON', OC], ['n NEUTRON', '#9AA3B2'], ['e⁻ ELECTRON', EC]].map(([s, c], i) => `<div class="btag" id="lg${i}" style="position:relative;background:${c};color:#fff">${s}</div>`).join('');
const kinds = document.createElement('div'); kinds.style.cssText = 'position:absolute;left:36px;top:500px;display:flex;gap:12px'; $('#lz').appendChild(kinds);
kinds.innerHTML = `<div class="btag" id="kd0" style="position:relative;background:${OC};color:#fff">ELEMENT · OXYGEN</div><div class="btag" id="kd1" style="position:relative;background:${HC};color:#fff">COMPOUND · WATER</div>`;
const lzTag = document.createElement('div'); lzTag.className = 'btag'; lzTag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#lz').appendChild(lzTag);

/* ---------- B: the bench, bond by bond ---------- */
const b = $('#bS');
const bondL = mk(b, 'g', {}), ringL = mk(b, 'g', {}), atomL = mk(b, 'g', {}), dotL = mk(b, 'g', {});
const MOL = [];
const deg = a => a * Math.PI / 180;
// spec: atoms [{x, y, sx, sy, r, ring, col, lab, fs, e: [[angle, bondIndex, stick]]}], bonds [[a, b, n]]
const molecule = (spec) => {
  const m = { spec, at: spec.atoms.map(a => ({ ...a, g: atomG(atomL, a.r, a.col, a.lab, a.fs), rg: mk(ringL, 'circle', { r: a.ring, fill: 'none', stroke: C.dim, 'stroke-width': 2 }),
    ed: a.e.map(([ang, bi, st]) => ({ ang: deg(ang), bi, st, el: mk(dotL, 'circle', { r: 7, fill: HC }) })) })),
    bd: spec.bonds.map(([a, c, n]) => ({ a, c, n, ln: Array.from({ length: n }, () => mk(bondL, 'line', { stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' })) })) };
  MOL.push(m); return m;
};
const bondGeo = (m, bi) => { const bd = m.bd[bi], A = m.at[bd.a], B = m.at[bd.c], dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  const r1 = A.r - 6, r2 = B.r - 6, mx = (A.x + ux * r1 + B.x - ux * r2) / 2, my = (A.y + uy * r1 + B.y - uy * r2) / 2; return { A, B, ux, uy, px: -uy, py: ux, r1, r2, mx, my, n: bd.n }; };
const runMol = (m, t, tIn, tShare, tStick) => {
  const ui = M.io((t - tIn) / 0.9), us = M.io((t - tShare) / 0.9), uk = M.io((t - tStick) / 0.5), op = M.clamp((t - tIn + 0.1) / 0.3);
  m.at.forEach(a => {
    const x = M.lerp(a.sx, a.x, ui), y = M.lerp(a.sy, a.y, ui);
    attr(a.g, 'transform', `translate(${f1(x)} ${f1(y)})`); attr(a.rg, 'cx', f1(x)); attr(a.rg, 'cy', f1(y));
    [a.g, a.rg].forEach(e => { e.style.opacity = op.toFixed(3); M.hide(e, op <= 0.002); });
    a.ed.forEach(d => {
      let ex = x + a.ring * Math.cos(d.ang), ey = y + a.ring * Math.sin(d.ang), u = 0;
      if (d.bi >= 0) { const G = bondGeo(m, d.bi), k = (d.st - (G.n - 1) / 2) * 17, s = G.A === a ? -1 : 1;
        const fx = G.mx + G.px * k + G.ux * s * 9, fy = G.my + G.py * k + G.uy * s * 9; u = us; ex = M.lerp(ex, fx, u); ey = M.lerp(ey, fy, u); }
      attr(d.el, 'cx', f1(ex)); attr(d.el, 'cy', f1(ey)); attr(d.el, 'fill', mix(HC, EC, u)); d.el.style.opacity = op.toFixed(3); M.hide(d.el, op <= 0.002);
    });
  });
  m.bd.forEach((bd, bi) => { const G = bondGeo(m, bi);
    bd.ln.forEach((l, i) => { const k = (i - (G.n - 1) / 2) * 17, ex = G.A.x + G.ux * G.r1 + G.px * k, ey = G.A.y + G.uy * G.r1 + G.py * k, fx = G.B.x - G.ux * G.r2 + G.px * k, fy = G.B.y - G.uy * G.r2 + G.py * k, sx = G.mx + G.px * k, sy = G.my + G.py * k;
      attr(l, 'x1', f1(sx + (ex - sx) * uk)); attr(l, 'y1', f1(sy + (ey - sy) * uk)); attr(l, 'x2', f1(sx + (fx - sx) * uk)); attr(l, 'y2', f1(sy + (fy - sy) * uk)); M.hide(l, uk <= 0.01); }); });
};
const Oat = (x, y, sx, sy, e) => ({ x, y, sx, sy, r: 36, ring: 58, col: OC, lab: 'O', fs: 30, e });
const mO2 = molecule({ atoms: [Oat(125, 175, 70, 175, [[-20, 0, 0], [20, 0, 1], [108, -1], [132, -1], [228, -1], [252, -1]]), Oat(275, 175, 330, 175, [[200, 0, 0], [160, 0, 1], [-72, -1], [-48, -1], [48, -1], [72, -1]])], bonds: [[0, 1, 2]] });
const mH2O = molecule({ atoms: [Oat(580, 150, 580, 140, [[142.3, 0, 0], [37.7, 1, 0], [200, -1], [230, -1], [310, -1], [340, -1]]),
  { x: 485, y: 223, sx: 430, sy: 266, r: 22, ring: 38, col: HC, lab: 'H', fs: 20, e: [[-37.7, 0, 0]] }, { x: 675, y: 223, sx: 730, sy: 266, r: 22, ring: 38, col: HC, lab: 'H', fs: 20, e: [[217.7, 1, 0]] }], bonds: [[0, 1, 1], [0, 2, 1]] });
const mCO2 = molecule({ atoms: [{ x: 392, y: 400, sx: 392, sy: 400, r: 34, ring: 52, col: CC, lab: 'C', fs: 28, e: [[192, 0, 0], [168, 0, 1], [-12, 1, 0], [12, 1, 1]] },
  Oat(242, 400, 190, 400, [[-20, 0, 0], [20, 0, 1], [108, -1], [132, -1], [228, -1], [252, -1]]), Oat(542, 400, 594, 400, [[200, 1, 0], [160, 1, 1], [-72, -1], [-48, -1], [48, -1], [72, -1]])], bonds: [[1, 0, 2], [0, 2, 2]] });
// note: CO2 bond 0 is O(a) to C, so O's electrons sit on side -1, C's on +1
const BL = [[200, 252, O2, 'ELEMENT', OC], [580, 270, H2O, 'COMPOUND', HC], [392, 470, CO2, 'COMPOUND', HC]];
$('#bLab').innerHTML = BL.map(([x, y, f, ty, c], i) => `<div id="bl${i}" style="position:absolute;top:${y}px;display:flex;align-items:center;gap:12px;white-space:nowrap"><span style="font-size:38px">${K(f)}</span><span class="btag" id="bt${i}" style="position:relative;background:${c};color:#fff;height:34px;font-size:15px">${ty}</span></div>`).join('');
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#lz').appendChild(btag);
const tO2 = [tB1 + 0.4, wt('B2', 'Each'), wt('B2', 'pairs') - 0.2], tH2O = [wt('B4', 'hydrogen'), wt('B4', 'share'), wt('B4', 'electron')], tCO2 = [wt('B5', 'carbon'), wt('B5', 'shares'), wt('B5', 'pairs')];
const tBl = [wt('B2', 'molecule') + 0.2, wt('B4', 'Water'), wt('B5', 'dioxide')], tBt = [wt('B3', 'element'), wt('B5', 'compounds'), wt('B5', 'compounds') + 0.15];

/* ---------- R: reading a formula ---------- */
const SYM = [['H', 'HYDROGEN'], ['C', 'CARBON'], ['O', 'OXYGEN'], ['Na', 'SODIUM'], ['Cl', 'CHLORINE'], ['Ca', 'CALCIUM']];
$('#syms').innerHTML = SYM.map(([s, n], i) => `<div class="sym" id="sy${s}" style="left:${i * 120}px;width:112px"><b>${s}</b><span>${n}</span></div>`).join('');
const RF = [
  [NA_, 'Capital N + small a = one symbol, sodium', [['Na']], 'R2', 'is'],
  [H2O, `The small <b style="color:${HC}">2</b> counts the H before it`, [['H', 'H', 'O']], 'R3', 'H'],
  [NACL, 'No small number means one', [['Na', 'Cl']], 'R4', 'one'],
  [`${G_(2)}${H2O}`, `The big <b style="color:${GC}">2</b> counts whole molecules`, [['H', 'H', 'O'], ['H', 'H', 'O']], 'R5', 'big'],
  [CAOH, 'The 2 after the bracket doubles O and H', [['Ca'], ['O', 'H'], ['O', 'H']], 'R6', 'bracket'],
];
const rl = $('#rl');
RF.forEach(([f, n], i) => { const d = document.createElement('div'); d.className = 'fx rbig'; d.id = 'rb' + i; d.style.cssText = 'left:0;width:784px;top:84px;text-align:center;font-size:96px'; d.innerHTML = K(f); rl.appendChild(d);
  const e = document.createElement('div'); e.id = 'rn' + i; e.style.cssText = 'position:absolute;left:0;width:784px;top:236px;text-align:center;font:600 26px Poppins;white-space:nowrap'; e.innerHTML = n; rl.appendChild(e); });
const rB = $('#rBalls');
const ballSets = RF.map(([, , grp]) => { const g = mk(rB, 'g', {}); const flat = []; let w = 0; grp.forEach((gg, gi) => { gg.forEach(() => { w += 66; }); w += gi < grp.length - 1 ? 34 : 0; }); w -= 66 - 60;
  let x = 392 - w / 2 + 30; grp.forEach((gg, gi) => { gg.forEach(s => { const a = atomG(g, 30, COL[s], s, s.length > 1 ? 22 : 26); attr(a, 'transform', `translate(${x} 60)`); flat.push(a); x += 66; }); x += 34; }); return { g, flat }; });
const tRf = RF.map(r => wt(r[3], r[4]) - 0.1);
{ const card = $('#rl'), d = document.createElement('div'); d.id = 'rlIn'; d.className = 'abs'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const FR = [[H2O, [['H', 2], ['O', 1]]], [NACL, [['Na', 1], ['Cl', 1]]], [`${G_(2)}${H2O}`, [['MOLECULES', 2, GC], ['H', 4], ['O', 2]]], [CAOH, [['Ca', 1], ['O', 2], ['H', 2]]]];
$('#frs').innerHTML = FR.map(([f, cs], i) => `<div class="fr" id="fr${i}" style="top:${84 + i * 112}px"><div class="ff">${K(f)}</div><div class="fc">${cs.map(([s, v, c]) => `<span style="color:${c || COL[s]}">${s === 'MOLECULES' ? `${v} molecules` : `${s} ${v}`}</span>`).join('<span style="color:var(--dim)"> · </span>')}</div></div>`).join('');
const tFr = [wt('R3', 'hydrogens'), wt('R4', 'sodium'), wt('R5', 'water'), wt('R6', 'doubles')];
const tSy = [['H', wt('R3', 'H')], ['O', wt('R3', 'H') + 0.15], ['C', wt('R2', 'element') + 0.2], ['Na', wt('R2', 'sodium') - 0.3], ['Cl', wt('R4', 'chlorine')], ['Ca', wt('R6', 'calcium')]];

/* ---------- K: compare + think ---------- */
const drawStatic = (svg, atoms, bonds) => { const bl = mk(svg, 'g', {}), al = mk(svg, 'g', {}), dl = mk(svg, 'g', {});
  bonds.forEach(([a, c, n]) => { const A = atoms[a], B = atoms[c], dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = -uy, py = ux;
    const mx = (A[0] + B[0]) / 2 + ux * (A[2] - B[2]) / 2, my = (A[1] + B[1]) / 2 + uy * (A[2] - B[2]) / 2;
    for (let i = 0; i < n; i++) { const k = (i - (n - 1) / 2) * 20; mk(bl, 'line', { x1: A[0] + px * k, y1: A[1] + py * k, x2: B[0] + px * k, y2: B[1] + py * k, stroke: C.ink2, 'stroke-width': 7, 'stroke-linecap': 'round' });
      [-1, 1].forEach(s => mk(dl, 'circle', { cx: mx + px * k + ux * s * 11, cy: my + py * k + uy * s * 11, r: 8, fill: EC })); } });
  atoms.forEach(([x, y, r, c, l]) => { const g = atomG(al, r, c, l, r * 0.8); attr(g, 'transform', `translate(${x} ${y})`); }); };
drawStatic($('#kaS'), [[292, 230, 58, OC, 'O'], [492, 230, 58, OC, 'O']], [[0, 1, 2]]);
drawStatic($('#kbS'), [[392, 190, 58, OC, 'O'], [392 - 0.791 * 170, 190 + 0.612 * 170, 38, HC, 'H'], [392 + 0.791 * 170, 190 + 0.612 * 170, 38, HC, 'H']], [[0, 1, 1], [0, 2, 1]]);
const kball = (s, c) => `<svg width="64" height="64" style="display:inline-block;margin-left:10px"><circle cx="32" cy="32" r="30" fill="${c}"/><text x="32" y="42" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="28" fill="#fff">${s}</text></svg>`;
$('#kaD').innerHTML = kball('O', OC); $('#kbD').innerHTML = kball('H', HC) + kball('O', OC);
const th1 = PUC.think($('#th1'), { q: `Is ${K(O2)} an element or a compound?`, opts: ['Element', 'Compound'], right: 0, why: 'Two atoms, but both are oxygen: only one kind of atom. So O₂ is an element.' });

/* ---------- C: physical vs chemical change ---------- */
const cp = $('#cpS');
mk(cp, 'rect', { x: 152, y: 90, width: 480, height: 300, rx: 14, fill: C.soft });
const melt = mk(cp, 'rect', { x: 152, y: 190, width: 480, height: 200, rx: 0, fill: '#D5F0F0' });
const ICE = Array.from({ length: 24 }, (_, i) => [152 + 95 + (i % 6) * 58, 90 + 64 + Math.floor(i / 6) * 58]);
const WAT = Array.from({ length: 24 }, (_, i) => [152 + 52 + (i % 8) * 54 + (Math.floor(i / 8) % 2) * 20, 90 + 150 + Math.floor(i / 8) * 52 + (rng() - 0.5) * 10]);
const pM = ICE.map(() => mk(cp, 'circle', { r: 22, fill: OC }));
const cpT = txt(cp, 392, 430, 'ICE', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
$('#cpX').innerHTML = `${K(`${H2O}(\\text{s}) \\rightarrow ${H2O}(\\text{l})`)}<span class="btag" style="position:relative;margin-left:16px;top:-6px;background:var(--okBg);color:#1F6B3F">SAME SUBSTANCE</span>`;
const cc = $('#ccS');
cc.innerHTML = '<defs><clipPath id="barC"><rect x="142" y="220" width="500" height="120" rx="14"/></clipPath></defs>';
mk(cc, 'rect', { x: 142, y: 220, width: 500, height: 120, rx: 14, fill: '#9AA3B2', stroke: C.ink2, 'stroke-width': 3 });
const rustG = mk(cc, 'g', { 'clip-path': 'url(#barC)' });
const RS = Array.from({ length: 16 }, () => [150 + rng() * 484, 222 + rng() * 116, 26 + rng() * 34, rng() * 0.8]);
const rsp = RS.map(([x, y]) => mk(rustG, 'circle', { cx: f1(x), cy: f1(y), r: 0, fill: RUST }));
const barT = txt(cc, 392, 380, 'IRON', { 'text-anchor': 'middle', fill: C.ink, 'font-weight': 600, 'font-size': 22 });
// oxygen molecules and water drops coming in
const inc = [[230, 'O'], [392, 'W'], [554, 'O']].map(([x, k]) => { const g = mk(cc, 'g', {}); if (k === 'O') { mk(g, 'line', { x1: -18, y1: 0, x2: 18, y2: 0, stroke: C.ink2, 'stroke-width': 5 }); [-22, 22].forEach(cx => { mk(g, 'circle', { cx, r: 18, fill: OC }); txt(g, cx, 7, 'O', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 18, fill: '#fff', 'text-anchor': 'middle' }); }); }
  else g.insertAdjacentHTML('beforeend', `<g transform="translate(-22 -26)">${M.icon('droplet', 44, OC, 2.4)}</g>`); return { g, x, k }; });
$('#ccX').insertAdjacentHTML('beforeend', `<span class="btag" style="position:relative;margin-left:16px;top:-2px;background:#F3E6DE;color:${RUST}">NEW SUBSTANCE</span>`);
const avD = PUC.avatar($('#chC'), { x: 36, y: 486, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'So my browning apple was a chemical change!' });

/* ---------- statement ---------- */
$('#stF').innerHTML = K(`${O2} \\quad ${H2O} \\quad ${CO2}`);

/* ---------- J: roadmap + branches ---------- */
const CJ = [['CH 1', 'Some Basic Concepts of Chemistry', 'MEASURE AND COUNT ATOMS · YOU ARE HERE'], ['CH 2', 'Structure of Atom', 'WHAT SITS INSIDE AN ATOM'], ['CH 3', 'Classification of Elements', 'AND PERIODICITY · THE PERIODIC TABLE']];
$('#cjs').innerHTML = CJ.map(([n, ti, w], i) => `<div class="cj" id="cj${i}" style="top:${84 + i * 132}px"><div class="cn2">${n}</div><div class="ct2">${ti}</div><div class="cw2">${w}</div></div>`).join('');
const tCj = [wt('J1', 'one'), wt('J1', 'two'), wt('J1', 'three')];
const SR = [['zap', 'Physical', 'ENERGY · REACTION SPEED', ['J4', 'Physical']], ['hex', 'Organic', 'COMPOUNDS OF CARBON', ['J4', 'Organic']], ['box', 'Inorganic', 'THE OTHER ELEMENTS', ['J5', 'Inorganic']], ['search', 'Analytical', 'WHAT IS IN IT · HOW MUCH', ['J5', 'Analytical']], ['leaf', 'Biochemistry', 'THE CHEMISTRY OF LIFE', ['J5', 'biochemistry']]];
$('#srs').innerHTML = SR.map(([ic, n, w], i) => `<div class="sr" id="sr${i}" style="top:${80 + i * 96}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><div class="sn2">${n}</div><div class="sw">${w}</div></div>`).join('');
const tSr = SR.map(s => wt(...s[3]));
const avA = PUC.avatar($('#jl'), { x: 36, y: 486, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Ground floor first, then we climb.' });

/* ---------- W: worked example + atom counter ---------- */
$('#wq').innerHTML = `How many atoms are in one molecule of glucose, ${K(GLU)}?`;
const wsol = PUC.solution($('#wl'), [
  [K(`${C_}_6 \\;\\Rightarrow\\; 6 \\text{ carbon atoms}`)],
  [K(`${H_}_{12} \\;\\Rightarrow\\; 12 \\text{ hydrogen atoms}`)],
  [K(`${O_}_6 \\;\\Rightarrow\\; 6 \\text{ oxygen atoms}`)],
  [K(`6 + 12 + 6 = \\textcolor{${OC}}{24 \\text{ atoms}}`)],
  [K(`${G_(2)}${H2O} = 2 \\times 3 = 6 \\text{ atoms}`)]], { label: 'WORKED EXAMPLE', y0: 176, dy: 76 });
$('#wl .lbl').style.top = '30px';
const tWs = [T0('W3'), T0('W4'), T0('W5'), T0('W6'), T0('W7')];
const ws = $('#wS'), gGlu = mk(ws, 'g', {}), gWat = mk(ws, 'g', {});
const GROW = [['C', 6, 110, 24], ['H', 6, 176, 20], ['H', 6, 232, 20], ['O', 6, 298, 24]];
const gb = GROW.map(([s, n, y, r]) => Array.from({ length: n }, (_, k) => { const a = atomG(gGlu, r, COL[s], s, r * 0.85); attr(a, 'transform', `translate(${392 + (k - 2.5) * 70} ${y})`); return a; }));
const wMol = [0, 1].map(i => { const g = mk(gWat, 'g', { transform: `translate(${252 + i * 280} 190)` }); [[-1], [1]].forEach(([s]) => mk(g, 'line', { x1: 0, y1: 0, x2: s * 62, y2: 48, stroke: C.ink2, 'stroke-width': 6, 'stroke-linecap': 'round' }));
  const o = atomG(g, 36, OC, 'O', 30); [[-62, 48], [62, 48]].forEach(([x, y]) => { const h = atomG(g, 24, HC, 'H', 20); attr(h, 'transform', `translate(${x} ${y})`); }); return g; });
const wrL = $('#wr .lbl');

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: `${K(`2${H_}`)} and ${K(H2)} are the same thing`, right: `${K(`2${H_}`)} = two separate atoms · ${K(H2)} = one molecule` });
const tsv = $('#tS');
const hBall = (p, x, y) => { mk(p, 'circle', { cx: x, cy: y, r: 26, fill: HC }); txt(p, x, y + 9, 'H', { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 24, fill: '#fff', 'text-anchor': 'middle' }); };
const gA = mk(tsv, 'g', {}); hBall(gA, 70, 120); hBall(gA, 170, 120); txt(gA, 120, 200, '2H · TWO ATOMS', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, 'font-weight': 600 });
const gB = mk(tsv, 'g', {}); mk(gB, 'line', { x1: 350, y1: 120, x2: 430, y2: 120, stroke: C.ink2, 'stroke-width': 6 }); [-9, 9].forEach(d => mk(gB, 'circle', { cx: 390 + d, cy: 120, r: 7, fill: EC })); hBall(gB, 340, 120); hBall(gB, 440, 120);
txt(gB, 390, 200, 'H₂ · ONE MOLECULE', { 'text-anchor': 'middle', 'font-size': 16, fill: C.ok, 'font-weight': 600 });
const where = PUC.where($('#wa'), { on: [], type: 'Counting atoms in a formula, inside almost every mole concept numerical' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `How many oxygen atoms are present in 2 formula units of aluminium sulphate, ${K(ALS)}?`, qW: 780,
  opts: ['7', '12', '14', '24'], right: 3, optW: 474, optY: 330, optH: 110, optFs: 40 });
const so = PUC.solution($('#so'), [[K(`\\mathrm{S}${O_}_4 : \\; 4 \\; ${O_}`)], [K(`3 \\times 4 = 12 \\; ${O_} \\text{ per unit}`)], [K(`2 \\times 12 = \\textcolor{${C.ok}}{24}`)], [K(`\\text{B forgot the } ${G_(2)}`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'three'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 410, y: 262, w: 1100, h: 470, title: 'Recap · introduction to chemistry', y0: 96, dy: 74, txt: [1, 1, 1, 0, 1],
  lines: ['<b>Chemistry</b>: the study of matter, anything with mass that takes up space', '<b>States</b>: solid (shake in place) · liquid (slide) · gas (fly apart)', '<b>Element</b>: one kind of atom, O₂ · <b>Compound</b>: two or more kinds, H₂O, CO₂',
    K(`${G_(2)}${H2O}: \\; \\text{big number = molecules, small number = atoms}`), '<b>Trap</b>: 2H is two separate atoms · H₂ is one molecule'] });
const YQ = ['How do particles move in a solid, a liquid and a gas?', 'Is carbon dioxide an element or a compound, and why?', 'How many atoms are in three H₂O?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 02', topic: 'How do chemists turn air into plant food? Importance and Scope of Chemistry', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tO2[1] - 0.3, 1.1, 1060, 520], [wt('B3', 'So'), 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  BL.forEach(([cx], i) => { const e = $('#bl' + i); e.style.left = (cx - e.offsetWidth / 2) + 'px'; });
  ST.forEach((_, i) => { const e = $('#sm' + i); e.style.left = (48 + i * 512 + 480 - e.offsetWidth) + 'px'; });
  document.querySelectorAll('.cj .ct2').forEach(q => { if (q.offsetWidth > 580) q.style.fontSize = Math.floor(29 * 580 / q.offsetWidth) + 'px'; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl').forEach(l => { if (l.offsetWidth > 1010) l.style.fontSize = Math.floor(parseFloat(getComputedStyle(l).fontSize) * 1010 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  /* title card: the three puzzles pop in with their words, then leave as the title travels */
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: three puzzles, Diya's kitchen */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#ja' + i), t, tJa[i] - 0.1, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'One') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    const tWel = wt('H5', 'Welcome');
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tJa[i] - 0.1, tWel - 0.2, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H5', 'chemistry') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hW'), t, tWel, 1e9, POP);
  }

  /* P: what is chemistry + is it matter */
  const pOn = t >= tP1 - 0.1 && t < tM1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('M1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    PUC.write($('#pdef'), t, wt('P2', 'Chemistry') - 0.1, 0.8); PUC.write($('#pdef2'), t, wt('P2', 'matter') - 0.2, 0.4);
    M.vis($('#mdef'), t, wt('P2', 'matter', 1) - 0.1, 1e9, POP);
    KQ.forEach((_, i) => { const el = $('#kq' + i); M.vis(el, t, tKq[i] - 0.15, 1e9, { dy: 16 }); const nx2 = i < 3 ? tKq[i + 1] : T1('P4') + 0.3; const on = M.io((t - tKq[i] + 0.1) / 0.25) * (1 - M.io((t - nx2 + 0.1) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pm'), t, tP1 + 0.35, out, { dx: 60, dy: 0, ...o });
    MR.forEach((_, i) => { M.vis($('#mr' + i), t, tMr[i] - 0.1, 1e9, { dy: 16 }); M.vis($('#mkA' + i), t, tMr[i] + 0.25, 1e9, POP); M.vis($('#mkB' + i), t, tMr[i] + 0.45, 1e9, POP); });
    M.vis($('#pmP'), t, tMr[2] + 0.8, 1e9, POP);
  }

  /* M: three states with moving particles */
  const mOn = t >= tM1 - 0.1 && t < tL1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#stc'), t, tM1 + 0.05, OUT('L1'), { dy: 36, ...o });
    ST.forEach((s, i) => {
      M.vis($('#sb' + i), t, wt('M1', 'three') + i * 0.15, 1e9, { dy: 20 });
      M.vis($('#sn' + i), t, wt('M1', 'three') + 0.1 + i * 0.15, 1e9, { dy: 12 });
      M.vis($('#sx' + i), t, tSt[i] + 0.3, 1e9, { dy: 10 });
      M.vis($('#sm' + i), t, wt(s[3], s[4]) - 0.1, 1e9, POP);
      const nx2 = i < 2 ? tSt[i + 1] : 1e9, on = M.io((t - tSt[i] + 0.1) / 0.3) * (1 - M.io((t - nx2 + 0.1) / 0.3));
      setBg($('#sb' + i), mix(C.soft, C.ac2, on));
      const tau = tauOf(t, tSt[i], nx2);
      if (i === 0) pS.forEach((p, k) => { const [x, y] = posS(k, tau, M.clamp((t - tSt[0]) / 0.3)); attr(p, 'cx', f1(x)); attr(p, 'cy', f1(y)); });
      if (i === 1) pL.forEach((p, k) => { const [x, y] = posL(k, tau); attr(p, 'cx', f1(x)); attr(p, 'cy', f1(y)); });
      if (i === 2) pG.forEach((p, k) => { const [x, y] = posG(k, tau); attr(p, 'cx', f1(x)); attr(p, 'cy', f1(y)); });
    });
  }

  /* L + B: ladder, zoom, bench */
  const lOn = t >= tL1 - 0.1 && t < tR2 + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    const out = OUT('R2');
    M.vis($('#ld'), t, tL1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#lz'), t, tL1 + 0.25, out, { dx: 60, dy: 0, ...o });
    // rungs: each appears with its word; the current one is lit
    const tEl = wt('B3', 'element'), tCo = wt('B5', 'compounds');
    rgEls.forEach((el, i) => {
      M.vis(el, t, tRg[i] - 0.1, 1e9, { dx: -16, dy: 0 });
      const nx2 = i < 6 ? tRg[i + 1] : tB1;
      let on = M.io((t - tRg[i] + 0.1) / 0.25) * (1 - M.io((t - nx2 + 0.1) / 0.25));
      if (i === 2) on = Math.max(on, M.io((t - tEl + 0.1) / 0.25) * (1 - M.io((t - wt('B4', 'Now') + 0.1) / 0.25)));
      if (i === 3) on = Math.max(on, M.io((t - tCo + 0.1) / 0.25));
      setBg(el, mix(C.soft, C.ink, on)); el.querySelector('.rt').style.color = mix(C.ink, '#FFFFFF', on); el.querySelector('.rw').style.color = mix(C.mute, C.ac2, on);
      const nn = el.querySelector('.nn'); if (nn) nn.style.color = mix(C.ac, C.ink, on);
    });
    // zoom pane (L lines), then the bench (B lines)
    const zOut = tB1 - 0.1, zIn = fade(z, t, tL1 + 0.3, zOut, 0.3);
    if (zIn > 0) {
      fade(beaker, t, wt('L2', 'pure') - 0.1, 1e9, 0.3); fade(bkL, t, wt('L2', 'pure'), 1e9, 0.3);
      const tMag = wt('L5', 'molecule') - 0.2, tAt = wt('L5', 'atoms'), tIn2 = wt('L6', 'protons') - 0.3;
      fade(mag, t, tMag, 1e9, 0.35);
      // molecule, then atoms spread apart, then swap to one atom
      const spread = 1 + 0.35 * M.io((t - tAt) / 0.5), wob = Math.sin(t * 3) * 2;
      const hp = [[-0.791, 0.612], [0.791, 0.612]].map(([dx, dy]) => [MX + dx * 92 * spread, MY - 20 + dy * 92 * spread + wob]);
      attr(zO, 'transform', `translate(${MX} ${f1(MY - 20 - wob)})`);
      zH.forEach((h, i) => attr(h, 'transform', `translate(${f1(hp[i][0])} ${f1(hp[i][1])})`));
      zB.forEach((l, i) => { attr(l, 'x1', MX); attr(l, 'y1', f1(MY - 20 - wob)); attr(l, 'x2', f1(hp[i][0])); attr(l, 'y2', f1(hp[i][1])); l.style.opacity = (1 - M.io((t - tAt) / 0.4)).toFixed(3); });
      fade(molW, t, tMag + 0.2, tIn2, 0.3); fade(zLab, t, tMag + 0.4, tAt - 0.1, 0.2); fade(zLab2, t, tAt + 0.1, tIn2, 0.2);
      const am = fade(atomM, t, tIn2 + 0.2, 1e9, 0.35);
      if (am > 0) eZ.forEach((e, k) => { const a = e.a + (t - tIn2) * (e.r < 100 ? 1.4 : 0.9); attr(e.el, 'cx', f1(MX + e.r * Math.cos(a))); attr(e.el, 'cy', f1(MY + e.r * Math.sin(a))); });
      M.vis($('#kd0'), t, wt('L3', 'oxygen') - 0.1, Math.min(zOut, tIn2), POP); M.vis($('#kd1'), t, wt('L4', 'water') - 0.1, Math.min(zOut, tIn2), POP);
      [0, 1, 2].forEach(i => M.vis($('#lg' + i), t, wt('L6', ['protons', 'neutrons', 'electrons'][i]) - 0.1, zOut, POP));
      M.setT(lzTag, t < tIn2 ? 'ZOOM 1: A DROP' : 'ZOOM 2: ONE ATOM'); M.vis(lzTag, t, tMag, zOut, POP);
    } else { [0, 1].forEach(i => M.hide($('#kd' + i), true)); [0, 1, 2].forEach(i => M.hide($('#lg' + i), true)); M.hide(lzTag, true); }
    M.setT($('#lzL'), t < zOut ? 'ZOOM · ONE DROP OF WATER' : 'MOLECULE BENCH · BOND BY BOND');
    const bOn = fade(b, t, tB1, 1e9, 0.3); M.hide($('#bLab'), bOn <= 0);
    if (bOn > 0) {
      runMol(mO2, t, ...tO2); runMol(mH2O, t, ...tH2O); runMol(mCO2, t, ...tCO2);
      BL.forEach((_, i) => { M.vis($('#bl' + i), t, tBl[i], 1e9, { dy: 10 }); M.vis($('#bt' + i), t, tBt[i] - 0.1, 1e9, POP); });
      const TAG = [[tO2[0], 'TWO O ATOMS'], [tO2[1], 'ELECTRONS MOVE IN'], [tO2[2], 'O=O · DOUBLE BOND'], [tH2O[1], 'O-H · SINGLE BONDS'], [tCO2[1], 'O=C=O · TWO DOUBLE BONDS']];
      let tg = null; for (const [tt, s] of TAG) if (t >= tt) tg = s; if (tg) M.setT(btag, tg); M.vis(btag, t, tO2[0], 1e9, POP);
    } else M.hide(btag, true);
  }

  /* R: reading a formula */
  const rOn = t >= tR2 - 0.1 && t < tK1 + 0.1; M.hide($('#sR'), !rOn);
  if (rOn) {
    const out = OUT('K1');
    M.vis($('#rl'), t, tR2 + 0.05, out, { dy: 36, ...o });
    { const sh = M.spring(t - T0('R3') + 0.3, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#rl'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#rlIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#rr'), t, T0('R3') + 0.1, out, { dx: 60, dy: 0, ...o });
    RF.forEach((_, i) => { const a = tRf[i], z2 = i < 4 ? tRf[i + 1] - 0.15 : 1e9;
      M.vis($('#rb' + i), t, a, z2, { dy: 16, outDur: 0.2, ody: -12 }); M.vis($('#rn' + i), t, a + 0.35, z2, { dy: 10, outDur: 0.2, ody: -8 });
      const bs = ballSets[i]; bs.g.style.opacity = (1 - M.io((t - z2) / 0.2)).toFixed(3); M.hide(bs.g, t < a || t > z2 + 0.2);
      bs.flat.forEach((e, k) => { const u = M.spring(t - a - 0.5 - k * 0.12, M.POP); e.style.opacity = M.clamp((t - a - 0.5 - k * 0.12) / 0.1).toFixed(3); e.firstChild.setAttribute('r', (30 * (0.4 + 0.6 * u)).toFixed(1)); });
    });
    M.vis($('#symL'), t, tR2 + 0.3, 1e9, { dy: 8 });
    SYM.forEach(([s], i) => { const el = $('#sy' + s); M.vis(el, t, tR2 + 0.4 + i * 0.08, 1e9, { dy: 12 });
      const ts = tSy.find(q => q[0] === s)[1], u = M.io((t - ts) / 0.3); setBg(el, mix('#FFFFFF', COL[s], u)); el.style.borderColor = mix(C.line, COL[s], u); el.querySelector('b').style.color = mix(C.ink, '#FFFFFF', u); el.querySelector('span').style.color = mix(C.mute, '#FFFFFF', u); });
    FR.forEach((_, i) => M.vis($('#fr' + i), t, tFr[i] - 0.1, 1e9, { dx: -16, dy: 0 }));
  }

  /* K: compare, then pause and think */
  const kOn = t >= tK1 - 0.1 && t < tC1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('K2');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#kb'), t, wt('K1', 'H') - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#kaV'), t, wt('K1', 'one') - 0.1, 1e9, POP); M.vis($('#kaD'), t, wt('K1', 'one'), 1e9, POP);
    M.vis($('#kbV'), t, wt('K1', 'two', 2) - 0.1, 1e9, POP); M.vis($('#kbD'), t, wt('K1', 'two', 2), 1e9, POP);
    M.vis($('#th1'), t, tK2 + 0.05, OUT('C1'), { dy: 36, ...o });
    th1(t, { tin: tK2, tOpts: wt('K2', 'element') - 0.1, tCount: T1('K2') + 0.05, dur: 3, tAns: T0('K3') - 0.02, tWhy: wt('K3', 'Two') });
  }

  /* C: physical vs chemical change */
  const cOn = t >= tC1 - 0.1 && t < tT + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('T1');
    M.vis($('#chP'), t, tC1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#chC'), t, tC1 + 0.4, out, { dx: 60, dy: 0, ...o });
    const tMelt = wt('C2', 'melts') - 0.1, u = M.io((t - tMelt) / 2.2), tau = t - tMelt;
    pM.forEach((p, k) => { const a = ICE[k], w = WAT[k], amp = 3.5 * (1 - u); const r = Math.floor(k / 8), lx = w[0] + u * (r % 2 ? -1 : 1) * 18 * Math.sin(tau * 1.5 + r * 1.3);
      attr(p, 'cx', f1(M.lerp(a[0], lx, u) + amp * Math.sin(t * 17 + k * 1.7))); attr(p, 'cy', f1(M.lerp(a[1], w[1], u) + amp * Math.cos(t * 15 + k * 2.3))); });
    melt.style.opacity = u.toFixed(3); M.setT(cpT, u > 0.5 ? 'WATER · STILL H₂O' : 'ICE');
    M.vis($('#cpX'), t, wt('C2', 'still') - 0.1, 1e9, { dy: 10 });
    const tO = wt('C3', 'oxygen'), tWa = wt('C3', 'water'), tRu = wt('C3', 'rust');
    inc.forEach((c, i) => { const ti = c.k === 'O' ? tO - 0.1 + i * 0.1 : tWa - 0.1, v = M.io((t - ti) / 0.8), gone = M.io((t - tRu - 0.2) / 0.4);
      attr(c.g, 'transform', `translate(${c.x} ${f1(M.lerp(70, 180, v))})`); const op = M.clamp((t - ti) / 0.2) * (1 - gone); c.g.style.opacity = op.toFixed(3); M.hide(c.g, op <= 0.002); });
    rsp.forEach((e, k) => { const [, , r, d] = RS[k], g = M.io((t - tRu - d) / 1.4); attr(e, 'r', f1(r * g)); });
    M.setT(barT, t > tRu + 0.6 ? 'RUST' : 'IRON'); attr(barT, 'fill', t > tRu + 0.6 ? RUST : C.ink);
    M.vis($('#ccX'), t, wt('C3', 'joins') - 0.1, 1e9, { dy: 10 });
    avD(t, wt('C3', 'chemical') + 0.4, out);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tJ1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tJ1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Everything') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Chemistry') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'change') + 0.1, 0.8);
  }

  /* J: roadmap + branches */
  const jOn = t >= tJ1 - 0.1 && t < tW1 + 0.1; M.hide($('#sJ'), !jOn);
  if (jOn) {
    const out = OUT('W1');
    M.vis($('#jl'), t, tJ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#jb2'), t, tJ1 + 0.4, out, { dx: 60, dy: 0, ...o });
    CJ.forEach((_, i) => { const el = $('#cj' + i); M.vis(el, t, tCj[i] - 0.15, 1e9, { dy: 16 }); const nx2 = i < 2 ? tCj[i + 1] : T1('J1') + 0.2;
      const on = M.io((t - tCj[i] + 0.1) / 0.25) * (1 - M.io((t - nx2 + 0.1) / 0.25)); setBg(el, mix(C.soft, C.ink, on)); el.querySelector('.ct2').style.color = mix(C.ink, '#FFFFFF', on); el.querySelector('.cw2').style.color = mix(C.mute, C.ac2, on); });
    avA(t, T1('J1') - 0.6, out);
    SR.forEach((s, i) => { const el = $('#sr' + i); M.vis(el, t, tJ1 + 0.7 + i * 0.1, 1e9, { dy: 14 });
      const on = M.io((t - tSr[i] + 0.15) / 0.3) * (i < 4 ? 1 - M.io((t - tSr[i + 1] + 0.15) / 0.3) : 1);
      setBg(el, mix(C.soft, C.ink, on)); el.querySelector('.sn2').style.color = mix(C.ink, '#FFFFFF', on); el.querySelector('.sw').style.color = mix(C.mute, C.ac2, on);
      PUC.setIco(el.querySelector('i'), s[0], on > 0.5 ? C.ink : C.ac, 30, 2.2); });
  }

  /* W: worked example + atom counter */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.3, out, { dx: 60, dy: 0, ...o });
    const tw7 = T0('W7');
    const grpT = [tWs[0], tWs[1], tWs[1] + 0.4, tWs[2]];
    gb.forEach((row, ri) => row.forEach((a, k) => { const tt = grpT[ri] + k * 0.08, u = M.spring(t - tt, M.POP); const op = (0.16 + 0.84 * M.clamp((t - tt) / 0.1)) * M.clamp((t - T0('W2') - 0.5) / 0.3) * (1 - M.io((t - tw7) / 0.3));
      a.style.opacity = op.toFixed(3); M.hide(a, op <= 0.002); a.firstChild.setAttribute('r', ((ri === 1 || ri === 2 ? 20 : 24) * (t < tt ? 1 : 0.4 + 0.6 * u)).toFixed(1)); }));
    wMol.forEach((g, i) => fade(g, t, tw7 + 0.2 + i * 0.25, 1e9, 0.3));
    M.setT(wrL, t < tw7 ? 'ATOM COUNTER · ONE GLUCOSE' : 'ATOM COUNTER · 2 H₂O');
    const cC = t >= tWs[0] ? 6 : 0, cH = t >= tWs[1] + 0.4 ? 12 : t >= tWs[1] ? 6 : 0, cO = t >= tWs[2] ? 6 : 0;
    const cnt = t < tw7 + 0.2 ? `<span style="color:${CC}">C ${cC}</span> <span style="color:var(--dim)">·</span> <span style="color:${HC}">H ${cH}</span> <span style="color:var(--dim)">·</span> <span style="color:${OC}">O ${cO}</span>`
      : `<span style="color:${GC}">2 molecules</span> <span style="color:var(--dim)">·</span> <span style="color:${HC}">H 4</span> <span style="color:var(--dim)">·</span> <span style="color:${OC}">O 2</span>`;
    const wc = $('#wCnt'); if (wc._s !== cnt) { wc._s = cnt; wc.innerHTML = cnt; } M.vis(wc, t, tWs[0] - 0.1, 1e9, { dy: 10 });
    const tot = t < tw7 + 0.2 ? (t >= tWs[3] + 0.3 ? 'TOTAL 24 ATOMS' : 'TOTAL ?') : 'TOTAL 6 ATOMS';
    M.setT($('#wTot'), tot); M.vis($('#wTot'), t, tWs[0] + 0.3, 1e9, { dy: 10 });
    $('#wTot').style.color = (t >= tWs[3] + 0.3 && t < tw7 + 0.2) || t >= tw7 + 0.6 ? C.ok : C.mute;
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'think') - 0.1, tStrike: wt('X3', 'not') - 0.1, tRight: wt('X3', 'Two') - 0.1 });
    fade(gA, t, wt('X3', 'separate') - 0.2); fade(gB, t, wt('X3', 'molecule') - 0.2);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'aluminium'), tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F: recap card, three questions, NEXT */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.8, tF + 1.2, tF + 1.6, tF + 2.0], tShot: wt('F1', 'Screenshot') });
    M.vis($('#yq'), t, tY - 0.05, 1e9, { dy: 36 });
    tYq.forEach((tt, i) => M.vis($('#yr' + i), t, tt - 0.1, 1e9, { dx: -24, dy: 0 }));
    nx(t, tN - 0.05);
  }
  caps(t);
});

/* ---------- sound: whoosh on the three page turns, MCQ ticks + correct ---------- */
SW.forEach(([a]) => M.sfx(a - 0.38, 'whoosh', 0.22));
PUC.mcqSfx(tCount, tAns);
M.outro({});
})();
