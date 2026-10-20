// PUC Chemistry Ep 18: Photoelectric effect and dual nature (Molecule bench)
(() => {
const { $ } = M, C = PUC.init({ subject: 'chemistry' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
// colour-coding (bench, dial, equation, readouts, recap): metal (potassium) teal, electron e- orange (and its KE),
// photon / h nu violet, threshold h nu0 (the gate) ink, red light red, ultraviolet deep violet
const NC = C.ac, EC = '#C8461B', VC = '#7A4FE0', UC = '#4B2A9E', RC = '#D64545', GC = C.ink;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr, snap = PUC.snap;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fade = (el, t, tin, tout = 1e9, d = 0.25, max = 1) => { const u = M.io((t - tin) / d) * (1 - M.io((t - tout) / d)) * max; el.style.opacity = u.toFixed(3); M.hide(el, u <= 0.002); return u; };
const hash = n => { const s = Math.sin(n * 12.9898 + 4.1414) * 43758.5453; return s - Math.floor(s); };
// LaTeX helpers with colour-coding
const V_ = s => `\\textcolor{${VC}}{${s}}`, G_ = s => `\\textcolor{${GC}}{${s}}`, E_ = s => `\\textcolor{${EC}}{${s}}`;
const HNU = V_('h\\nu'), HNU0 = G_('h\\nu_0'), KE = E_('\\tfrac{1}{2}m_\\mathrm{e}v^2');
const EQ = `${HNU} = ${HNU0} + ${KE}`;

Object.assign(M.IC, {
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'],
  camera: ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', 'M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  bike: ['M5.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M18.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M12 17.5V14l-3-3 4-3 2 3h2'],
  waves: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
  atom: ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z', 'M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z'],
});

/* ---------- beats (all from the voice) ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH5 = T0('H5');
const tP1 = T0('P1'), tS1 = T0('S1'), tB1 = T0('B1'), tB3 = T0('B3'), tB4 = T0('B4'), tD1 = T0('D1'), tT = T0('T1'), tW1 = T0('W1');
const tC1 = T0('C1'), tC4 = T0('C4'), tC5 = T0('C5'), tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- photon / electron sim (pure function of t) ---------- */
// kinds: 0 red, 1 violet, 2 ultraviolet. Red never frees an electron (below the threshold).
const KCOL = [RC, VC, UC], KLAM = [15, 8, 5.2], KSP = [0, 190, 360];
const squig = lam => { let d = ''; for (let i = 0; i <= 24; i++) { const x = -40 + i * 40 / 24, y = Math.sin((x / lam) * Math.PI * 2) * 6; d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d + ' M0,-7 L7,0 L0,7'; };
const SQ = KLAM.map(squig);
const sim = (svg, o) => {
  const TT = o.tt ?? 0.75, ph = [];
  o.phases.forEach(([ta, k, rate], i) => { const tb = i < o.phases.length - 1 ? o.phases[i + 1][0] : o.tEnd; let n = ph.length; for (let t = ta; t < tb; t += 1 / rate) { ph.push({ te: t, k, a: hash(n * 1.7 + (o.seed || 0)), b: hash(n * 3.1 + 7 + (o.seed || 0)) }); n++; } });
  const g = mk(svg, 'g', {});
  const pp = Array.from({ length: 18 }, () => mk(g, 'path', { fill: 'none', 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
  const ep = Array.from({ length: 22 }, () => { const e = mk(g, 'g', {}); [0.18, 0.32, 0.5].forEach((op, j) => mk(e, 'circle', { r: 5 + j, fill: EC, opacity: op, cx: 0, cy: 0 })); mk(e, 'circle', { r: o.er ?? 9, fill: EC }); return e; });
  const rings = Array.from({ length: 10 }, () => mk(g, 'circle', { r: 10, fill: 'none', stroke: RC, 'stroke-width': 2 }));
  const [Lx, Ly] = o.L, [P1, P2, Py] = o.P, sc = o.sc ?? 1;
  const hit = p => [P1 + 24 + (P2 - P1 - 48) * p.a, Py];
  const run = (t, on = 1) => {
    let ip = 0, ie = 0, ir = 0;
    for (const p of ph) {
      const u = (t - p.te) / TT; if (u < 0) break;
      const [hx, hy] = hit(p);
      if (u <= 1 && ip < pp.length) {
        const sx = Lx + (p.b - 0.5) * 30 * sc, sy = Ly + (p.b - 0.5) * 16 * sc, x = M.lerp(sx, hx, u), y = M.lerp(sy, hy - 8, u), an = Math.atan2(hy - sy, hx - sx) * 180 / Math.PI;
        const el = pp[ip++]; attr(el, 'd', SQ[p.k]); attr(el, 'stroke', KCOL[p.k]); attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${an.toFixed(1)}) scale(${sc})`); el.style.opacity = on.toFixed(3); M.hide(el, on <= 0.01);
      }
      if (p.k === 0 && u > 1 && u < 1 + 0.5 / TT && ir < rings.length) { const a = (u - 1) * TT / 0.5, r = rings[ir++]; attr(r, 'cx', hx.toFixed(1)); attr(r, 'cy', (hy - 4).toFixed(1)); attr(r, 'r', (8 + 22 * a * sc).toFixed(1)); r.style.opacity = ((1 - a) * 0.8 * on).toFixed(3); M.hide(r, false); }
      if (p.k > 0 && u > 1 && ie < ep.length) {
        const age = t - p.te - TT; if (age < (o.life ?? 1.5)) {
          const an = (-90 + (p.b - 0.5) * 70) * Math.PI / 180, sp = KSP[p.k] * sc, el = ep[ie++];
          const x = hx + Math.cos(an) * sp * age, y = hy - 4 + Math.sin(an) * sp * age;
          attr(el, 'transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
          [...el.children].forEach((c, j) => { if (j < 3) { const lag = (3 - j) * 0.035; attr(c, 'cx', (-Math.cos(an) * sp * Math.min(lag, age)).toFixed(1)); attr(c, 'cy', (-Math.sin(an) * sp * Math.min(lag, age)).toFixed(1)); } });
          el.style.opacity = (on * (1 - M.io((age - (o.life ?? 1.5) + 0.3) / 0.3))).toFixed(3); M.hide(el, on <= 0.01);
        }
      }
    }
    for (; ip < pp.length; ip++) M.hide(pp[ip], true);
    for (; ie < ep.length; ie++) M.hide(ep[ie], true);
    for (; ir < rings.length; ir++) M.hide(rings[ir], true);
  };
  run.count = (t, ta = -1) => ph.filter(p => p.k > 0 && p.te + TT <= t && p.te + TT >= ta).length;
  return run;
};
const plate = (svg, x1, x2, y, h, lab, fs = 30) => { const g = mk(svg, 'g', {}); mk(g, 'rect', { x: x1, y, width: x2 - x1, height: h, rx: 8, fill: NC });
  for (let x = x1 + 50; x < x2 - 10; x += 34) mk(g, 'circle', { cx: x, cy: y + h / 2, r: 6, fill: EC });
  txt(g, x1 + 22, y + h / 2 + fs * 0.36, lab, { 'font-family': 'Poppins', 'font-weight': 700, 'font-size': fs, fill: '#fff' }); return g; };
const lamp = (svg, x, y, r) => { const g = mk(svg, 'g', { transform: `translate(${x} ${y})` }); mk(g, 'rect', { x: -r - 22, y: -r * 0.55, width: 30, height: r * 1.1, rx: 6, fill: C.ink }); const bulb = mk(g, 'circle', { r, fill: '#fff', stroke: C.ink, 'stroke-width': 4 }); return { g, bulb }; };

/* ---------- title card: three puzzles ---------- */
const JOBS = [['flame', 'Red heater', 'HOURS · NO SUNBURN', 'heater'], ['sun', 'Noon sun', 'MINUTES · SUNBURN', 'sunlight'], ['camera', 'Darkroom', 'RED LIGHT IS SAFE', 'darkroom']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt(j[3] === 'darkroom' ? 'H2' : 'H1', j[3]));
/* ---------- H ---------- */
const JV = [['RED · TOO WEAK', '#FBE6E6', RC], ['UV · STRONG', '#EEE8FC', VC], ['RED · HARMLESS', '#FBE6E6', RC]];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 128}px"><i>${M.icon(ic, 34, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jv" id="jv${i}" style="background:${JV[i][1]};color:${JV[i][2]}">${JV[i][0]}</div></div>`).join('');
const KIT = [['sun', 'Noon ride', 'noon'], ['flame', 'Burnt arms', 'Burnt'], ['flame', 'Red heater: no burn', 'heater']];
$('#wqs').innerHTML = KIT.map(([ic, w], i) => `<div class="wq" id="wq${i}">${M.icon(ic, 24, C.ac, 2.2)}<span>${w}</span></div>`).join('');
const tKit = KIT.map(k => wt('H3', k[2]));

/* ---------- P: light on a metal ---------- */
const QR = [['Light falls on a metal', 'CAUSE', 'P2', 'light'], ['Electrons jump out', 'EFFECT', 'P2', 'jump'], ['The photoelectric effect', 'PHOTO = LIGHT', 'P3', 'photoelectric'], ['Freed electrons: photoelectrons', 'THE NAME', 'P4', 'photoelectrons']];
$('#qrs').innerHTML = QR.map(([q, k], i) => `<div class="qr" id="qr${i}" style="top:${208 + i * 88}px;height:76px"><div class="nn" style="top:15px">${i + 1}</div><div class="qt" style="top:18px">${q}</div><div class="qk" style="top:24px">${k}</div></div>`).join('');
const tQr = QR.map(q => wt(q[2], q[3]));
const GS = [['K', 'Potassium', 'potassium'], ['Rb', 'Rubidium', 'rubidium'], ['Cs', 'Caesium', 'caesium']];
$('#gS').innerHTML = GS.map(([s, n], i) => `<span id="gs${i}"><b>${s}</b>${n}<em>GROUP 1</em></span>`).join('');
$('#gS').style.gap = '16px'; document.querySelectorAll('#gS span').forEach(s => { s.style.height = '96px'; });
$('#pWord').innerHTML = `<div class="pillp" id="pw0" style="position:static">photo <span class="mono" style="font-size:16px;color:var(--mute);letter-spacing:.08em">LIGHT</span></div><b style="font:700 32px Poppins">+</b><div class="pillp" id="pw1" style="position:static;color:${EC}">electron</div><b style="font:700 32px Poppins">=</b><div class="pillp ac" id="pw2" style="position:static">photoelectron</div>`;
const tGs = GS.map(g => wt('P3', g[2]));

/* ---------- S: the bench ---------- */
const b = $('#bS');
mk(b, 'defs', {}).innerHTML = '<clipPath id="bclip"><rect x="0" y="66" width="784" height="514"/></clipPath>';
const bW = mk(b, 'g', { 'clip-path': 'url(#bclip)' });
const LMP = lamp(bW, 150, 170, 40);
const beam = mk(bW, 'path', { d: 'M178 150 L690 418 L380 418 L178 192 Z', fill: C.soft, opacity: 0.0 });
const bPl = plate(bW, 330, 720, 420, 46, 'K');
const plL = txt(bW, 525, 500, 'POTASSIUM PLATE', { 'text-anchor': 'middle', 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const tRed = wt('S2', 'bright') - 0.15, tBr = wt('S3', 'brighter'), tVi = wt('S4', 'violet'), tVb = wt('S5', 'brighter'), tUV = wt('S6', 'frequency');
const PH = [[tRed, 0, 6], [tBr, 0, 11], [tVi, 1, 1.7], [tVb, 1, 5.5], [tUV, 2, 5.5]];
const bSim = sim(bW, { L: [190, 190], P: [330, 720, 420], phases: PH, tEnd: tB3 + 0.5, seed: 1 });
const btag = document.createElement('div'); btag.className = 'btag'; btag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; $('#bn').appendChild(btag);
{ const card = $('#bn'), d = document.createElement('div'); d.id = 'bnIn'; d.className = 'abs'; d.style.cssText = 'position:absolute;left:0;top:0;width:784px;height:580px'; while (card.firstChild) d.appendChild(card.firstChild); card.appendChild(d); }
const lampCol = t => t < tVi ? RC : t < tUV ? VC : UC;
const rate = t => { let r = 0; for (const [ta, , rr] of PH) if (t >= ta) r = rr; return r; };
// dial: spectrum bar with the threshold gate
const g2 = $('#gS2'), DX0 = 60, DX1 = 724, DY = 150, GX = DX0 + (DX1 - DX0) * 0.6;
mk(g2, 'defs', {}).innerHTML = `<linearGradient id="spec" x1="0" x2="1"><stop offset="0" stop-color="${RC}"/><stop offset="0.25" stop-color="#E8A317"/><stop offset="0.45" stop-color="#3E9B5F"/><stop offset="0.62" stop-color="#2F6FEB"/><stop offset="0.8" stop-color="${VC}"/><stop offset="1" stop-color="${UC}"/></linearGradient>`;
const shL = mk(g2, 'rect', { x: DX0, y: 80, width: GX - DX0, height: 120, fill: C.redBg, opacity: 0 }), shR = mk(g2, 'rect', { x: GX, y: 80, width: DX1 - GX, height: 120, fill: C.okBg, opacity: 0 });
mk(g2, 'rect', { x: DX0, y: DY, width: DX1 - DX0, height: 26, rx: 13, fill: 'url(#spec)' });
[['RED', DX0 + 20], ['VIOLET', DX0 + (DX1 - DX0) * 0.8], ['UV', DX1 - 10]].forEach(([s, x]) => txt(g2, x, 210, s, { 'text-anchor': 'middle', 'font-size': 16, fill: C.mute, 'font-weight': 600 }));
txt(g2, DX0, 244, 'FREQUENCY ν  →', { 'font-size': 16, fill: VC, 'font-weight': 600 });
const zoneL = txt(g2, (DX0 + GX) / 2, 104, 'NO ELECTRONS', { 'text-anchor': 'middle', 'font-size': 18, fill: C.red, 'font-weight': 600 });
const zoneR = txt(g2, (GX + DX1) / 2, 104, 'ELECTRONS OUT', { 'text-anchor': 'middle', 'font-size': 18, fill: C.ok, 'font-weight': 600 });
const gPost = mk(g2, 'rect', { x: GX - 5, y: 84, width: 10, height: 102, rx: 4, fill: GC });
const gArm = mk(g2, 'line', { x1: GX, y1: 90, x2: GX - 70, y2: 90, stroke: GC, 'stroke-width': 8, 'stroke-linecap': 'round' });
const gLab = txt(g2, GX, 244, 'ν₀ THRESHOLD', { 'text-anchor': 'middle', 'font-size': 16, fill: GC, 'font-weight': 700 });
const ptr = mk(g2, 'g', {}); mk(ptr, 'path', { d: 'M-12 -18 L12 -18 L0 0 Z', fill: C.ink }); const ptrC = mk(ptr, 'circle', { cy: -28, r: 9, fill: RC });
const gTag = document.createElement('div'); gTag.className = 'btag'; gTag.style.cssText = 'right:36px;top:18px;background:var(--ink);color:#fff'; gTag.textContent = 'EACH METAL: OWN ν₀'; $('#dl2').appendChild(gTag);
const PV = M.keys([[0, 0.1], [tRed, 0.1], [tBr, 0.1], [tVi, 0.78], [tUV, 0.94]], 0.8);
// counter card
const CR = [['Brightness', VC], ['Electrons out', EC], ['Speed of each electron', EC]];
$('#crs').innerHTML = CR.map(([n], i) => `<div class="cr" id="cr${i}" style="top:${70 + i * 62}px;height:52px"><div class="cn" style="top:12px">${n}</div><div class="cb" id="cb${i}" style="top:18px;left:330px"></div><div class="cv" id="cv${i}" style="top:6px;font-size:28px">0</div></div>`).join('');
const RL = [['Electrons leave the instant light strikes', 'One'], ['Brighter light: more electrons', 'Two'], ['Below a threshold frequency: none at all', 'Three']];
$('#rls').innerHTML = RL.map(([s], i) => `<div class="rl" id="rl${i}" style="top:${70 + i * 60}px;height:52px"><div class="nn">${i + 1}</div><div class="rt2">${s}</div></div>`).join('');
const tRl = RL.map(r => wt('B1', r[1]));
// side by side
$('#cmps').innerHTML = [['Very bright red lamp', 'MANY WEAK PACKETS', RC], ['Dim violet lamp', 'FEW STRONG PACKETS', VC]].map(([n, w, c], i) => `<div class="cmp" id="cm${i}" style="left:${36 + i * 792}px"><div class="ct">${n}</div><div class="cw2" style="color:${c}">${w}</div><svg id="cmS${i}" width="736" height="460" style="position:absolute;left:0;top:0"></svg></div>`).join('');
const CMP = [0, 1].map(i => { const s = $('#cmS' + i); const lp = lamp(s, 120, 150, 36); attr(lp.bulb, 'fill', i ? VC : RC); const pl = plate(s, 260, 680, 360, 40, 'K', 26);
  const sm = sim(s, { L: [150, 168], P: [260, 680, 360], phases: [[tB3 - 0.6, i, i ? 1.6 : 12]], tEnd: tD1, seed: 9 + i * 5, life: 1.3 });
  const res = txt(s, 470, 440, i ? 'ELECTRONS OUT' : '0 ELECTRONS', { 'text-anchor': 'middle', 'font-size': 20, fill: i ? C.ok : C.red, 'font-weight': 700 });
  return { sm, res }; });
const th1 = PUC.think($('#th1'), { q: 'Which lamp can free an electron from the potassium plate?', opts: ['Bright red lamp', 'Dim violet lamp'], right: 1, why: 'Brightness only adds packets. Each red packet is too weak, and packets cannot team up.' });

/* ---------- D: Einstein's equation ---------- */
const dsol = PUC.solution($('#dl'), [
  [K(`E_\\text{photon} = ${HNU}`), 'h = 6.626 × 10⁻³⁴ J s'],
  [K(`1\\ ${V_('\\text{photon}')} \\rightarrow 1\\ ${E_('\\mathrm{e^-}')}`), 'all its energy, at once'],
  [K(`\\text{pull free: } ${HNU0}`), 'work function W₀'],
  [K(`\\text{left over: } ${KE}`), 'kinetic energy'],
  [K(EQ), 'every term in J']], { label: 'EINSTEIN\'S IDEA · STEP BY STEP', y0: 160, dy: 80 });
const tDs = [wt('D2', 'Each'), wt('D3', 'One'), wt('D4', 'work'), wt('D5', 'Whatever'), wt('D6', 'So')];
const dS = $('#dS'), BX = 96, BW = 96, BY0 = 420, BH = 300, B0H = 180;
const barV = mk(dS, 'rect', { x: BX, y: BY0 - BH, width: BW, height: BH, rx: 10, fill: VC });
const bar0 = mk(dS, 'rect', { x: BX, y: BY0 - B0H, width: BW, height: B0H, rx: 10, fill: GC });
const barK = mk(dS, 'rect', { x: BX, y: BY0 - BH, width: BW, height: BH - B0H, rx: 10, fill: EC });
const lbV = txt(dS, BX + BW / 2, BY0 - BH - 16, 'hν', { 'text-anchor': 'middle', 'font-size': 26, fill: VC, 'font-weight': 700, 'font-family': 'Poppins' });
const lb0 = txt(dS, BX + BW + 16, BY0 - B0H / 2 + 8, 'hν₀', { 'font-size': 24, fill: GC, 'font-weight': 700, 'font-family': 'Poppins' });
const lbK = txt(dS, BX + BW + 16, BY0 - BH + (BH - B0H) / 2 + 8, 'KE', { 'font-size': 24, fill: EC, 'font-weight': 700, 'font-family': 'Poppins' });
const dPl = plate(dS, 340, 720, BY0, 34, 'K', 24);
const freeL = mk(dS, 'line', { x1: 300, y1: BY0 - B0H, x2: 740, y2: BY0 - B0H, stroke: GC, 'stroke-width': 2.5, 'stroke-dasharray': '8 8' });
const freeT = txt(dS, 740, BY0 - B0H - 12, 'FREE OF THE METAL', { 'text-anchor': 'end', 'font-size': 16, fill: GC, 'font-weight': 600 });
const dPh = mk(dS, 'path', { d: SQ[1], fill: 'none', stroke: VC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const dE = mk(dS, 'circle', { r: 13, fill: EC });
const dEa = PUC.arrow(dS, EC, 5, 16);
const dEl = txt(dS, 0, 0, '½mv²', { 'font-size': 22, fill: EC, 'font-weight': 700, 'font-family': 'Poppins' });
$('#dEq').innerHTML = K(EQ);

/* ---------- statement ---------- */
$('#stF').innerHTML = K(EQ);

/* ---------- W: worked example ---------- */
const NU = V_('\\nu'), NU0 = G_('\\nu_0'), KEs = E_('KE');
const wsol = PUC.solution($('#wl'), [
  [K(`${NU} = \\frac{c}{\\lambda} = \\frac{3.0 \\times 10^{8}\\,\\text{m/s}}{400 \\times 10^{-9}\\,\\text{m}}`)],
  [K(`${NU} = 7.5 \\times 10^{14}\\,\\text{Hz}`)],
  [K(`${NU} - ${NU0} = 2.5 \\times 10^{14}\\,\\text{Hz}`)],
  [K(`${KEs} = 6.626 \\times 10^{-34} \\times 2.5 \\times 10^{14}`)],
  [K(`${KEs} = ${E_('1.66 \\times 10^{-19}\\,\\text{J}')}`)]], { label: 'WORKED EXAMPLE', y0: 214, dy: 70 });
$('#wl .lbl').style.top = '30px';
const tWs = [wt('W4', 'Nu'), wt('W4', 'gives'), wt('W5', 'Seven'), wt('W6', 'Multiply'), wt('W6', 'kinetic')];
const s2 = $('#wS2'), WX0 = 60, WX1 = 724, WY = 170, WSPLIT = WX0 + (WX1 - WX0) * (3.313 / 4.9695);
const wBarV = mk(s2, 'rect', { x: WX0, y: WY, width: WX1 - WX0, height: 56, rx: 12, fill: VC });
const wBar0 = mk(s2, 'rect', { x: WX0, y: WY, width: WSPLIT - WX0, height: 56, rx: 12, fill: GC });
const wBarK = mk(s2, 'rect', { x: WSPLIT, y: WY, width: WX1 - WSPLIT, height: 56, rx: 12, fill: EC });
const wlV = txt(s2, WX0, WY - 22, 'hν = 6.626 × 10⁻³⁴ × 7.5 × 10¹⁴ = 4.97 × 10⁻¹⁹ J', { 'font-size': 21, fill: VC, 'font-weight': 600 });
const wl0 = txt(s2, WX0, WY + 92, 'hν₀ = 3.31 × 10⁻¹⁹ J', { 'font-size': 21, fill: GC, 'font-weight': 600 });
const wlK = txt(s2, WX1, WY + 92, 'KE = 1.66 × 10⁻¹⁹ J', { 'text-anchor': 'end', 'font-size': 21, fill: EC, 'font-weight': 600 });
const wPl = plate(s2, 60, 400, 420, 36, 'M', 24);
const wE = [0, 1, 2].map(() => mk(s2, 'circle', { r: 11, fill: EC }));
const wV = txt(s2, 724, 360, 'v ≈ 6.0 × 10⁵ m/s', { 'text-anchor': 'end', 'font-size': 24, fill: EC, 'font-weight': 600 });
const wVs = txt(s2, 724, 392, '√(2 KE / mₑ)', { 'text-anchor': 'end', 'font-size': 18, fill: C.mute, 'font-weight': 600 });

/* ---------- C: dual behaviour ---------- */
const cw = $('#cwS');
mk(cw, 'defs', {}).innerHTML = '<clipPath id="cwc"><rect x="36" y="150" width="712" height="270"/></clipPath>';
const cwG = mk(cw, 'g', { 'clip-path': 'url(#cwc)' });
const SLX = 300, SLY = 285;
const plane = Array.from({ length: 6 }, () => mk(cwG, 'line', { y1: 170, y2: 400, stroke: VC, 'stroke-width': 3, opacity: 0.8 }));
const arcs = Array.from({ length: 7 }, () => mk(cwG, 'path', { fill: 'none', stroke: VC, 'stroke-width': 3, opacity: 0.8 }));
mk(cwG, 'rect', { x: SLX - 6, y: 150, width: 12, height: SLY - 150 - 16, fill: C.ink }); mk(cwG, 'rect', { x: SLX - 6, y: SLY + 16, width: 12, height: 420 - SLY - 16, fill: C.ink });
const bands = Array.from({ length: 15 }, (_, i) => { const y = 168 + i * 16, d = (y + 8 - SLY) / 70, I = Math.pow(Math.cos(d * Math.PI * 1.6), 2) * Math.exp(-d * d * 0.6); return mk(cwG, 'rect', { x: 690, y, width: 34, height: 16, fill: mix('#FFFFFF', VC, 0.15 + 0.85 * I) }); });
const scrL = txt(cw, 707, 146, 'SCREEN', { 'text-anchor': 'middle', 'font-size': 15, fill: C.mute, 'font-weight': 600 });
const cpS = $('#cpS'); const cpL = lamp(cpS, 110, 210, 34); attr(cpL.bulb, 'fill', VC); plate(cpS, 250, 720, 380, 40, 'K', 26);
const cpSim = sim(cpS, { L: [140, 222], P: [250, 720, 380], phases: [[tC1, 1, 3.2]], tEnd: tX1, seed: 21, life: 1.0 });
// de Broglie card
$('#dbN').innerHTML = `<div class="lbl" style="position:static">IN 1924 · LOUIS DE BROGLIE · PHYSICIST</div>`;
const dbS = $('#dbS');
const dbW = mk(dbS, 'path', { fill: 'none', stroke: EC, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.7 });
const dbE = mk(dbS, 'circle', { r: 16, fill: EC, cy: 380 });
const dbT = txt(dbS, 64, 300, 'A MOVING ELECTRON · ITS MATTER WAVE', { 'font-size': 18, fill: C.mute, 'font-weight': 600 });
const dbP = document.createElement('div'); dbP.className = 'pillp ac'; dbP.style.cssText = 'left:64px;top:484px'; dbP.textContent = 'Matter also has a dual behaviour'; $('#db').appendChild(dbP);
// light: dual (C4) shown as a pill row on the de Broglie card before the question
const dl4 = document.createElement('div'); dl4.className = 'abs'; dl4.style.cssText = 'position:absolute;left:64px;top:96px;font:700 50px Poppins;white-space:nowrap';
dl4.innerHTML = `Light: a <span class="acc">wave</span> while travelling, a <span class="v">particle</span> when it hits`; $('#db').appendChild(dl4);
const avA = PUC.avatar($('#sC'), { x: 160 + 1600 - 560, y: 270 + 480, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'So an electron can be a wave too?' });

/* ---------- X / Q / F: exam segment ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Brighter light gives faster electrons', right: `Brighter: more electrons. Only ${K(NU)} raises ${K(KEs)}` });
const tsv = $('#tS');
const tg = (x, n, lab, col) => { const g = mk(tsv, 'g', {}); mk(g, 'rect', { x: x - 100, y: 170, width: 200, height: 26, rx: 6, fill: NC }); for (let i = 0; i < n; i++) { const ex = x - (n - 1) * 22 + i * 44; const a = PUC.arrow(g, EC, 4, 12); a.set(ex, 164, ex, 104); mk(g, 'circle', { cx: ex, cy: 164, r: 9, fill: EC }); } txt(g, x, 236, lab, { 'text-anchor': 'middle', 'font-size': 16, fill: col, 'font-weight': 600 }); return g; };
const tg1 = tg(130, 2, 'DIM VIOLET', C.mute), tg2 = tg(380, 4, 'BRIGHT VIOLET · SAME SPEED', C.ok);
const where = PUC.where($('#wa'), { on: [], type: `Numericals on ${K(EQ)}, and statement questions on intensity vs frequency` });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', q: `Light of frequency ${K('1.5\\,' + NU0)} (${K(NU0)} = threshold frequency) ejects electrons with kinetic energy ${K('K')}. If the frequency is doubled, the new kinetic energy is`, qW: 800,
  opts: [K('2K'), K('3K'), K('4K'), K('6K')], right: 2, optW: 474, optY: 350, optH: 100, optFs: 36 });
const so = PUC.solution($('#so'), [[K(`${KEs} = h(${NU} - ${NU0})`)], [K(`K = h(1.5${NU0} - ${NU0}) = 0.5\\,h${NU0}`)], [K(`${KEs}' = h(3${NU0} - ${NU0}) = 2\\,h${NU0}`)], [K(`\\frac{2}{0.5} = \\textcolor{${C.ok}}{4}\\ \\Rightarrow\\ 4K`)]], { y0: 100, dy: 112 });
const tSo = [T0('A2'), wt('A2', 'So'), T0('A3'), T0('A4')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · photoelectric effect and dual nature', y0: 96, dy: 74, txt: [0, 1, 1, 1, 1],
  lines: [K(EQ), '<b>Threshold ν₀</b>: below it, no electrons, however bright the light', '<b>Brightness</b> sets how many electrons · <b>frequency</b> sets how fast', '<b>Light</b>: wave in diffraction, interference · particle in the photoelectric effect', '<b>Einstein, 1905</b>: photons · <b>de Broglie, 1924</b>: matter has waves too'] });
const YQ = ['Why can dim violet light free electrons, when bright red light cannot?', 'What is the threshold frequency of a metal?', 'Name one wave effect of light, and one particle effect.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="nn">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 19', topic: 'If an electron is a wave, how long is it? de Broglie Relation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tPush = wt('S4', 'once') - 0.3;
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tPush, 1.12, 700, 600], [T0('S5'), 1, 960, 540]]);
let geo = null;
function measure() {
  geo = {};
  let x = 36; KIT.forEach((_, i) => { const e = $('#wq' + i); e.style.left = x + 'px'; x += e.offsetWidth + 14; });
  const ft = $('#sF .fcard'); if (ft) ft.querySelectorAll('.fl.txt').forEach(l => { if (l.offsetWidth > 1110) l.style.fontSize = Math.floor(30 * 1110 / l.offsetWidth) + 'px'; });
  document.querySelectorAll('.yr .q').forEach(q => { if (q.offsetWidth > 1380) q.style.fontSize = Math.floor(34 * 1380 / q.offsetWidth) + 'px'; });
  const w4 = $('#wa .wat'); if (w4 && w4.offsetWidth > 1528) w4.style.fontSize = Math.floor(28 * 1528 / w4.offsetWidth) + 'px';
  if (dl4.offsetWidth > 1472) dl4.style.fontSize = Math.floor(50 * 1472 / dl4.offsetWidth) + 'px';
  const q = $('#dbq'); if (q.offsetWidth > 1472) q.style.fontSize = Math.floor(50 * 1472 / q.offsetWidth) + 'px';
}
const setBg = (el, c) => { if (el._bg !== c) { el._bg = c; el.style.background = c; } };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };

  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H: three puzzles + Aarav's ride */
  const hOn = t >= tMorph && t < tP1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('P1');
    M.vis($('#hj'), t, tMorph + 0.1, out, { dy: 36, ...o });
    { const sh = M.spring(t - tH3 + 0.2, M.HEAVY); snap($('#hj'), 'width', (sh >= 1 ? 784 : M.lerp(1600, 784, sh)).toFixed(1) + 'px'); }
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.3 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jv' + i), t, wt('H4', 'energy') - 0.1 + i * 0.15, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H4', 'bright') - 0.1, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis($('#hkImg'), t, tH3 + 0.1, 1e9, { dy: 20 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    KIT.forEach((_, i) => { const el = $('#wq' + i); M.vis(el, t, tKit[i] - 0.1, tH5 - 0.1, { ...POP, outDur: 0.25, ody: 0 }); const on = M.io((t - wt('H4', 'packet') + 0.1) / 0.3); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#hTz'), t, wt('H5', 'wave') - 0.15, 1e9, POP);
  }

  /* P: light on a metal */
  const pOn = t >= tP1 - 0.1 && t < tS1 + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('S1');
    M.vis($('#pq'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.vis($('#pSci'), t, wt('P2', 'Heinrich') - 0.15, 1e9, { dy: 14 });
    QR.forEach((_, i) => { const el = $('#qr' + i); M.vis(el, t, tQr[i] - 0.1, 1e9, { dy: 16 }); const nx2 = i < 3 ? tQr[i + 1] : 1e9; const on = M.io((t - tQr[i]) / 0.25) * (1 - M.io((t - nx2) / 0.25)); setBg(el, mix(C.soft, C.ac2, on)); });
    M.vis($('#pw'), t, wt('P2', 'metals') - 0.2, out, { dx: 60, dy: 0, ...o });
    GS.forEach((_, i) => { const el = $('#gs' + i), u = M.io((t - tGs[i] + 0.1) / 0.3); M.vis(el, t, wt('P2', 'metals') + i * 0.1, 1e9, { dy: 12 });
      el.style.background = mix('#FFFFFF', C.ac2, u); el.style.borderColor = mix(C.line, NC, u); el.style.color = mix(C.dim, C.ink, u); el.querySelector('b').style.color = mix(C.dim, NC, u); el.querySelector('em').style.color = mix(C.dim, NC, u); });
    M.vis($('#pWord'), t, wt('P3', 'Photo', 1) - 0.1, 1e9, { dy: 12 });
    ['pw0', 'pw1', 'pw2'].forEach((id, i) => M.vis($('#' + id), t, (i < 2 ? wt('P3', 'Photo', 1) : wt('P4', 'photoelectrons')) - 0.1 + i * 0.2, 1e9, POP));
  }

  /* S + B: the bench, dial, counter, rules, compare, think */
  const sOn = t >= tS1 - 0.1 && t < tD1 + 0.1; M.hide($('#sS'), !sOn);
  if (sOn) {
    const z = OUT('B3');
    M.vis($('#bn'), t, tS1 + 0.05, z, { dy: 36, ...o });
    { const sh = M.spring(t - tRed + 0.3, M.HEAVY), wv = M.lerp(1600, 784, sh); snap($('#bn'), 'width', (sh >= 1 ? 784 : wv.toFixed(1)) + 'px'); snap($('#bnIn'), 'left', (sh >= 1 ? 0 : ((wv - 784) / 2).toFixed(1)) + 'px'); }
    M.vis($('#dl2'), t, tRed - 0.1, z, { dx: 60, dy: 0, ...o });
    M.vis($('#ct'), t, tRed + 0.25, z, { dy: 36, ...o });
    fade(bPl, t, tS1 + 0.3); fade(plL, t, tS1 + 0.5); fade(LMP.g, t, wt('S2', 'First') - 0.1);
    attr(LMP.bulb, 'fill', t < tRed ? '#FFFFFF' : lampCol(t)); attr(beam, 'opacity', t < tRed ? 0 : 0.9);
    bSim(t, 1);
    const TAG = [[tS1 + 0.4, 'K · FULL OF ELECTRONS'], [tRed, 'BRIGHT RED'], [wt('S3', 'Nothing'), '0 ELECTRONS'], [tBr, 'EVEN BRIGHTER · STILL 0'], [tVi, 'DIM VIOLET'], [wt('S4', 'once'), 'OUT AT ONCE'], [tVb, 'BRIGHTER VIOLET · MORE'], [tUV, 'ULTRAVIOLET · FASTER']];
    let tg0 = null; for (const [tt, s] of TAG) if (t >= tt) tg0 = s;
    if (tg0) M.setT(btag, tg0); M.vis(btag, t, tS1 + 0.3, 1e9, POP);
    // dial
    const pv = PV(t), px = DX0 + (DX1 - DX0) * pv; attr(ptr, 'transform', `translate(${px.toFixed(1)} ${DY - 4})`); attr(ptrC, 'fill', lampCol(t));
    const open = M.io((px - GX + 10) / 40), an = Math.PI * (1 + 0.5 * open);
    attr(gArm, 'x2', (GX + 70 * Math.cos(an)).toFixed(1)); attr(gArm, 'y2', (90 + 50 * Math.sin(an)).toFixed(1));
    const b2 = M.io((t - wt('B2', 'threshold') + 0.1) / 0.3);
    attr(shL, 'opacity', (0.35 + 0.65 * b2).toFixed(3)); attr(shR, 'opacity', (0.35 + 0.65 * b2).toFixed(3));
    zoneL.style.opacity = M.clamp((t - tRed - 0.6) / 0.3); zoneR.style.opacity = M.clamp((t - tVi - 0.4) / 0.3);
    const pulse = M.io((t - wt('B2', 'threshold')) / 0.25) * (1 - M.io((t - wt('B2', 'threshold') - 1.2) / 0.4));
    attr(gPost, 'fill', mix(GC, NC, pulse)); attr(gLab, 'fill', mix(GC, NC, pulse));
    M.vis(gTag, t, wt('B2', 'Every') - 0.1, 1e9, POP);
    // counter -> rules
    const rOn = t >= tB1 - 0.2;
    M.setT($('#ctL'), rOn ? 'WHAT WE SAW · THREE RULES' : 'ON THE BENCH NOW');
    M.vis($('#crs'), t, tRed + 0.4, tB1 - 0.2, { dy: 0, outDur: 0.25, ody: -10 });
    const r = rate(t), sp = t < tVi ? 0 : t < tUV ? 0.45 : 0.95;
    CR.forEach((_, i) => {
      const cb = $('#cb' + i), w = i === 0 ? r / 11 : i === 1 ? 0 : sp; snap(cb, 'width', (160 * w).toFixed(1) + 'px'); setBg(cb, i === 0 ? lampCol(t) : EC); M.hide(cb, i === 1 || w <= 0.01);
      M.vis($('#cr' + i), t, tRed + 0.5 + i * 0.12, 1e9, { dx: -16, dy: 0 });
    });
    M.setT($('#cv0'), t < tBr ? 'HIGH' : t < tVi ? 'VERY HIGH' : t < tVb ? 'LOW' : 'HIGH');
    M.setT($('#cv1'), String(bSim.count(t)));
    M.setT($('#cv2'), t < tVi ? 'NONE' : t < tUV ? 'SLOW' : 'FAST');
    $('#cv1').style.color = bSim.count(t) > 0 ? EC : C.ink;
    tRl.forEach((tt, i) => M.vis($('#rl' + i), t, tt - 0.1, 1e9, { dx: -16, dy: 0 }));
    // side by side
    M.vis($('#cmpC'), t, tB3 + 0.05, OUT('B4'), { dy: 36, ...o });
    if (t > tB3 - 0.6 && t < tB4 + 0.2) { CMP.forEach((c, i) => { c.sm(t, 1); fade(c.res, t, 1e9); }); M.vis($('#cm0'), t, tB3 + 0.2, 1e9, { dy: 16 }); M.vis($('#cm1'), t, wt('B3', 'other') - 0.1, 1e9, { dy: 16 }); }
    M.vis($('#th1'), t, tB4 + 0.05, OUT('D1'), { dy: 36, ...o });
    th1(t, { tin: tB4, tOpts: wt('B4', 'Which') - 0.1, tCount: T1('B4') + 0.05, dur: 3, tAns: T0('B5') - 0.02, tWhy: wt('B5', 'Brightness') });
  }

  /* D: Einstein's equation */
  const dOn = t >= tD1 - 0.1 && t < tT + 0.1; M.hide($('#sD'), !dOn);
  if (dOn) {
    const out = OUT('T1');
    M.vis($('#dl'), t, tD1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#dSci'), t, wt('D1', 'Einstein') - 0.1, 1e9, { dy: 12 });
    dsol(t, tD1, tDs);
    M.vis($('#dr'), t, tD1 + 0.3, out, { dx: 60, dy: 0, ...o });
    const u1 = M.io((t - tDs[0]) / 0.6), u3 = M.io((t - tDs[2]) / 0.5), u4 = M.io((t - tDs[3]) / 0.5);
    // bars: full photon energy grows, then the gate part and the left over
    attr(barV, 'height', (BH * u1).toFixed(1)); attr(barV, 'y', (BY0 - BH * u1).toFixed(1)); barV.style.opacity = u1 > 0.01 ? 1 : 0;
    attr(bar0, 'height', (B0H * u3).toFixed(1)); attr(bar0, 'y', (BY0 - B0H * u3).toFixed(1)); bar0.style.opacity = u3 > 0.01 ? 1 : 0;
    barK.style.opacity = u4.toFixed(3);
    lbV.style.opacity = u1; lb0.style.opacity = u3; lbK.style.opacity = u4;
    fade(dPl, t, tD1 + 0.5); fade(freeL, t, tDs[2] - 0.1); fade(freeT, t, tDs[2] + 0.1);
    // photon comes in on step 2, hits the electron; electron rises to the surface on step 3, flies off on step 4
    const ph = M.io((t - tDs[1] + 0.1) / 0.8), ex0 = 520, ey0 = BY0 + 17;
    const hx = M.lerp(260, ex0 - 18, ph), hy = M.lerp(150, ey0 - 18, ph), an = Math.atan2(ey0 - 150, ex0 - 260) * 180 / Math.PI;
    attr(dPh, 'transform', `translate(${hx.toFixed(1)} ${hy.toFixed(1)}) rotate(${an.toFixed(1)})`); dPh.style.opacity = (M.clamp((t - tDs[1] + 0.2) / 0.2) * (1 - M.clamp((ph - 0.95) / 0.05))).toFixed(3);
    const ey = M.lerp(ey0, BY0 - B0H, u3), fx = M.lerp(ex0, 690, u4), fy = M.lerp(ey, 130, u4);
    attr(dE, 'cx', fx.toFixed(1)); attr(dE, 'cy', fy.toFixed(1)); dE.style.opacity = M.clamp((t - tD1 - 0.5) / 0.3);
    if (u4 > 0.05) { dEa.set(fx, fy, fx + 70 * u4, fy - 46 * u4); attr(dEl, 'x', (fx + 26).toFixed(1)); attr(dEl, 'y', (fy + 42).toFixed(1)); } else dEa.set(0, 0, 0, 0);
    dEl.style.opacity = u4; attr(dE, 'r', (13 + 3 * (ph >= 1 && u3 < 1 ? M.io((t - tDs[1] - 0.7) / 0.2) * (1 - M.io((t - tDs[1] - 1) / 0.3)) : 0)).toFixed(1));
    PUC.write($('#dEq'), t, tDs[4] + 0.3, 0.8);
  }

  /* statement on a fresh page */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, wt('T1', 'Brightness') - 0.1, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Frequency') - 0.1, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'fast') + 0.2, 0.8);
  }

  /* W: worked example */
  const wOn = t >= tW1 - 0.1 && t < tC1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('C1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    M.vis($('#wq'), t, T0('W2') - 0.1, 1e9, { dy: 14 });
    wsol(t, tW1, tWs);
    M.vis($('#wr'), t, T0('W2') + 0.2, out, { dx: 60, dy: 0, ...o });
    M.vis($('#wEx'), t, T0('W2') + 0.5, 1e9, POP);
    const uV = M.io((t - wt('W4', 'gives') - 0.2) / 0.6), u0 = M.io((t - wt('W5', 'Next') + 0.1) / 0.5), uK = M.io((t - wt('W6', 'kinetic') + 0.1) / 0.5);
    attr(wBarV, 'width', ((WX1 - WX0) * uV).toFixed(1)); wBarV.style.opacity = uV > 0.01 ? 1 : 0; wlV.style.opacity = uV;
    attr(wBar0, 'width', ((WSPLIT - WX0) * u0).toFixed(1)); wBar0.style.opacity = u0 > 0.01 ? 1 : 0; wl0.style.opacity = u0;
    wBarK.style.opacity = uK; wlK.style.opacity = uK;
    fade(wPl, t, T0('W2') + 0.6);
    const t7 = wt('W7', 'electrons') - 0.2;
    wE.forEach((e, i) => { const age = t - t7 - i * 0.55; const cyc = age < 0 ? -1 : age % 1.65; const u = cyc < 0 ? 0 : cyc / 1.2;
      attr(e, 'cx', (120 + i * 100 + 330 * Math.min(u, 1)).toFixed(1)); attr(e, 'cy', (420 - 6 - 110 * Math.min(u, 1)).toFixed(1)); e.style.opacity = cyc < 0 || u > 1 ? 0 : (1 - M.io((u - 0.8) / 0.2)).toFixed(3); });
    fade(wV, t, wt('W7', 'six') - 0.1); fade(wVs, t, wt('W7', 'six') + 0.2);
    M.vis($('#wGp'), t, wt('W7', 'metres') - 0.1, 1e9, POP);
  }

  /* C: dual behaviour */
  const cOn = t >= tC1 - 0.1 && t < tX1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    const out = OUT('C4');
    M.vis($('#cw'), t, wt('C2', 'wave') - 0.2, out, { dx: -60, dy: 0, ...o });
    M.vis($('#cp'), t, T0('C3') - 0.1, out, { dx: 60, dy: 0, ...o });
    // waves: plane fronts move right to the slit, circles spread beyond it, bands build on the screen
    const ph = (t * 90) % 44;
    plane.forEach((l, i) => { const x = 56 + ph + i * 44; attr(l, 'x1', x.toFixed(1)); attr(l, 'x2', x.toFixed(1)); l.style.opacity = x < SLX - 4 ? 0.8 : 0; });
    const ta = wt('C2', 'spreads') - 0.2;
    arcs.forEach((a, i) => { const r = ph + i * 44; const on = M.clamp((t - ta) / 0.4) * (r < 400 ? 1 : 0); const ang = 1.25; attr(a, 'd', `M${(SLX + r * Math.cos(-ang)).toFixed(1)},${(SLY + r * Math.sin(-ang)).toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0 1 ${(SLX + r * Math.cos(ang)).toFixed(1)},${(SLY + r * Math.sin(ang)).toFixed(1)}`); a.style.opacity = (0.8 * on).toFixed(3); M.hide(a, on <= 0 || r < 4); });
    const tb = wt('C2', 'bands') - 0.1;
    bands.forEach((bd, i) => { bd.style.opacity = M.io((t - tb - Math.abs(i - 7) * 0.06) / 0.3).toFixed(3); }); scrL.style.opacity = M.clamp((t - tb) / 0.3);
    M.vis($('#cw0'), t, wt('C2', 'diffraction') - 0.1, 1e9, POP); M.vis($('#cw1'), t, wt('C2', 'interference') - 0.1, 1e9, POP);
    cpSim(t, M.clamp((t - T0('C3')) / 0.3));
    M.vis($('#cp0'), t, wt('C3', 'photoelectric') - 0.1, 1e9, POP); M.vis($('#cp1'), t, wt('C3', 'black') - 0.1, 1e9, POP);
    // C4: light is both; C5: de Broglie asks about matter
    M.vis($('#db'), t, tC4 + 0.05, 1e9, { dy: 36 });
    M.vis(dl4, t, tC4 + 0.25, tC5 + 0.1, { dy: 14, outDur: 0.25, ody: -10 });
    M.vis($('#dbN'), t, wt('C5', 'Louis') - 0.1, 1e9, { dy: 10 });
    PUC.write($('#dbq'), t, wt('C5', 'if') - 0.1, 1.4);
    M.vis($('#dbHr'), t, tC5 + 0.3, 1e9, { dy: 0 });
    // the moving electron and its wave
    const te = wt('C5', 'electron') - 0.4, u = M.clamp((t - te) / 2.6), ex = M.lerp(120, 1480, u), we = M.clamp((t - wt('C5', 'wave') + 0.2) / 0.4);
    let d = ''; for (let x = Math.max(80, ex - 620); x <= ex; x += 6) d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + (380 + Math.sin((x - ex) / 40 * Math.PI * 2 / 2.2) * 26 * Math.min(1, (x - ex + 620) / 200)).toFixed(1);
    attr(dbW, 'd', d); dbW.style.opacity = (0.75 * we).toFixed(3); M.hide(dbW, we <= 0 || t < te);
    attr(dbE, 'cx', ex.toFixed(1)); dbE.style.opacity = M.clamp((t - te) / 0.2); M.hide(dbE, t < te);
    dbT.style.opacity = M.clamp((t - te) / 0.3);
    M.vis(dbP, t, wt('C5', 'yes') - 0.1, 1e9, POP);
    avA(t, wt('C5', 'wave') + 0.6, OUT('X1'));
  }

  /* X: exam trap + where */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'brighter') - 0.1, tStrike: T0('X3') + 0.2, tRight: wt('X3', 'Intensity') - 0.1 });
    fade(tg1, t, wt('X3', 'Intensity')); fade(tg2, t, wt('X3', 'number') - 0.1);
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'Where') + 0.6 });
  }

  /* Q: practice question */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Double'), tCount, tAns });
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
