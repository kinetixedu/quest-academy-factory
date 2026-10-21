// PUC Biology Ep 14: Kingdom Protista - Major Groups and Examples (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), K = PUC.K, wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const fb = el => { el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; return el; };
const BR = '#2E2A24', GRN = C.ac, NUC = '#7B4B94', WAT = '#5AA0C8', GOLD = '#C9962B', RED = '#C8463A', CYT = '#F3F7EA';
const ci = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
Object.assign(M.IC, {
  drop: ['M12 2.7 6.3 9.6a7 7 0 1 0 11.4 0Z'],
  wave: ['M2 8c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0', 'M2 13c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0', 'M2 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0'],
  bug: ['M12 20v-8', 'M8 14a4 4 0 1 1 8 0v2a4 4 0 0 1-8 0Z', 'M9 8l-2-3', 'M15 8l2-3', 'M8 14H4', 'M16 14h4', 'M8 18l-3 2', 'M16 18l3 2'],
  cellI: ['M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z', ci(12, 12, 3)],
  nuc: [ci(12, 12, 9), ci(12, 12, 4)],
  eug: ['M3 13.5c3.2-4.2 9.6-4.8 13.6-1.6-4 3.4-10.4 3.6-13.6 1.6Z', 'M16.6 11.9c2-1.4 3-3.6 5-3.6', ci(8.5, 12.8, 1.4)],
  shell: ['M3 12c0-4 4-6 9-6s9 2 9 6', 'M4 12c0 3 3.5 5 8 5s8-2 8-5Z', 'M7 9v6', 'M12 7v10', 'M17 9v6'],
  tide: ['M2 15c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0', 'M5 10c2-3 6-3 8 0-2 3-6 3-8 0Z', 'M13 10l3-2v4Z'],
  slime: ['M3 19h18', 'M7 19v-6', 'M12 19v-9', 'M17 19v-5', ci(7, 11, 2), ci(12, 8, 2), ci(17, 12, 2)],
  amoeba: ['M6 8c2-4 7-3 8-1s5-1 6 2-2 4 0 6-3 5-6 3-5 3-7 0-4-1-3-4-1-4 2-6Z', ci(11, 12, 2)],
});

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tZ1 = T0('Z1'), tK1 = T0('K1'), tG1 = T0('G1'), tP1 = T0('P1'), tP4 = T0('P4'), tT = T0('T1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tW1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;
const labels = (g, L) => L.map(([px, py, lx, ly, s, an, el]) => {
  const d = el ? `M${px},${py} L${el[0]},${el[1]} L${lx},${ly}` : `M${px},${py} L${lx},${ly}`;
  const ln = mk(g, 'path', { d, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = fb(mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink }));
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: 'zl' }); tx.textContent = s;
  return { ln, dot, tx };
});
const runLabs = (LB, t, ts) => LB.forEach((l, i) => { const t0 = ts[i]; M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); });
const wavy = (x0, y0, dx, dy, n, amp, ph) => { const L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L; let d = `M${x0.toFixed(1)},${y0.toFixed(1)}`;
  for (let k = 1; k <= n; k++) { const s = k / n, w = amp * Math.sin(s * 9 - ph) * s; d += ` L${(x0 + dx * s - uy * w).toFixed(1)},${(y0 + dy * s + ux * w).toFixed(1)}`; } return d; };
// Euglena: body length 600 at s = 1, front (flagella) to the left; returns the animated parts
const euglena = (p, cx, cy, s, o = {}) => { const g = mk(p, 'g', { transform: `translate(${cx} ${cy}) scale(${s})` });
  const fl = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 4 / s * s, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'path', { d: 'M-300,0 C-300,-70 -150,-100 -40,-95 C120,-88 240,-40 300,0 C240,40 120,88 -40,95 C-150,100 -300,70 -300,0 Z', fill: o.fill || '#E4F1DE', stroke: BR, 'stroke-width': 5 });
  for (let k = 0; k < 6; k++) mk(g, 'path', { d: `M${-200 + k * 80},-86 q30,86 0,172`, stroke: '#B9D3AE', 'stroke-width': 2.5, fill: 'none' });
  const chl = [];
  [[-150, -40, 20], [-90, 50, -15], [-20, -55, 10], [130, -30, 25], [170, 30, -20], [60, 55, 5], [-200, 30, -30]].forEach(([x, y, a]) => chl.push(mk(g, 'ellipse', { cx: x, cy: y, rx: 30, ry: 14, fill: o.dim ? '#C9CDBF' : '#6DB27A', stroke: o.dim ? '#9AA0AC' : '#1F5E37', 'stroke-width': 2.5, transform: `rotate(${a} ${x} ${y})` })));
  mk(g, 'circle', { cx: 40, cy: 0, r: 36, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 4 }); mk(g, 'circle', { cx: 42, cy: 2, r: 12, fill: NUC });
  mk(g, 'ellipse', { cx: -262, cy: -4, rx: 22, ry: 14, fill: '#fff', stroke: BR, 'stroke-width': 2.5 });
  const sf = mk(g, 'path', { d: 'M-262,-4 q-18,-6 -30,4', stroke: BR, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' });
  return { g, fl, chl, sf };
};
const flagE = (E, t) => attr(E.fl, 'd', wavy(-275, -8, -300, -40, 30, 26, t * 9));

/* ---------- title card ---------- */
const JOBS = [['drop', 'Pond water', 'ONE DROP, ALIVE', 'pond'], ['tide', 'A red tide', 'THE SEA TURNS RED', 'red'], ['bug', 'Malaria', 'FROM A MOSQUITO BITE', 'mosquito']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 32, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));
const JT = ['EUGLENA, PARAMOECIUM', 'GONYAULAX', 'PLASMODIUM'];
$('#jrs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="jr" id="jr${i}" style="top:${84 + i * 134}px"><i>${M.icon(ic, 36, C.ac, 2.2)}</i><div class="jn">${n}</div><div class="jw">${w}</div><div class="jt" id="jt${i}" style="font-style:italic">${JT[i]}</div></div>`).join('');
// microscope view: a bright circle with protists moving
const hs = $('#hkS'), mvG = mk(hs, 'g', {}), mv = [];
{ mk(mvG, 'rect', { x: 36, y: 84, width: 712, height: 396, rx: 12, fill: '#1E2638' });
  mk(mvG, 'circle', { cx: 392, cy: 282, r: 186, fill: '#F4F8EC', stroke: '#0E1422', 'stroke-width': 8 });
  const clip = mk(hs, 'clipPath', { id: 'mvc' }); mk(clip, 'circle', { cx: 392, cy: 282, r: 182 });
  const inner = mk(mvG, 'g', { 'clip-path': 'url(#mvc)' });
  const e1 = euglena(inner, 0, 0, 0.22); mv.push(['e', e1]);
  const pa = mk(inner, 'g', {}); mk(pa, 'path', { d: 'M-60,0 C-60,-30 -10,-34 30,-26 C60,-20 64,20 30,26 C-10,34 -60,30 -60,0 Z', fill: '#EEDFC8', stroke: BR, 'stroke-width': 3 }); mk(pa, 'circle', { cx: 0, cy: 0, r: 9, fill: NUC });
  for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2; mk(pa, 'line', { x1: 62 * Math.cos(a) * 0.95, y1: 30 * Math.sin(a), x2: 72 * Math.cos(a), y2: 38 * Math.sin(a), stroke: BR, 'stroke-width': 2 }); }
  mv.push(['p', pa]);
  const am = mk(inner, 'path', { fill: '#E9DDF0', stroke: BR, 'stroke-width': 3 }); mv.push(['a', am]);
  for (let k = 0; k < 6; k++) { const d = mk(inner, 'circle', { r: 7, fill: '#9FD09A', stroke: '#1F5E37', 'stroke-width': 2 }); mv.push(['d', d, k]); } }
const amoebaD = (cx, cy, R, tt) => { const n = 30, pts = [];
  for (let k = 0; k < n; k++) { const a = k * 2 * Math.PI / n, r = R * (1 + 0.16 * Math.sin(3 * a + 0.9 * tt) + 0.08 * Math.sin(5 * a - 1.3 * tt + 1) + 0.22 * Math.max(0, Math.cos(a - 0.4 * Math.sin(tt * 0.5))) ** 6); pts.push([cx + r * Math.cos(a) * 1.1, cy + r * Math.sin(a) * 0.9]); }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let k = 0; k < n; k++) { const p0 = pts[(k - 1 + n) % n], p1 = pts[k], p2 = pts[(k + 1) % n], p3 = pts[(k + 2) % n];
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; }
  return d + 'Z'; };

/* ---------- Z: zoom ladder (pond -> drop -> Euglena) ---------- */
const ZN = ['POND', 'ONE DROP', 'ONE CELL'], ZS = ['x1', 'x100', 'x1,000'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z4')];
const LVI = [['RUNG 1 OF 3', 'Pond', 'Still water, green at the edges.', 'Every drop holds living cells.'],
  ['RUNG 2 OF 3', 'One drop', 'Dozens of single cells, moving about.', 'Each one is a whole organism.'],
  ['RUNG 3 OF 3', 'Euglena', 'One cell with a true nucleus.', 'A protist: green, and it swims.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Diya', face: IMG + 'diya-face.jpg', text: 'A green cell that swims!' });
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
const FOC = [[640, 300, 44], [560, 250, 40], null], LAB = [];
{ const g = ZG[0];
  mk(g, 'ellipse', { cx: 528, cy: 300, rx: 420, ry: 150, fill: '#8CC48F', stroke: BR, 'stroke-width': 4.5 });
  mk(g, 'ellipse', { cx: 528, cy: 300, rx: 380, ry: 124, fill: '#BFDCEB', stroke: WAT, 'stroke-width': 3 });
  for (let k = 0; k < 4; k++) mk(g, 'path', { d: `M${360 + k * 110},${290 + (k % 2) * 30} q20,-8 40,0 t40,0`, stroke: '#fff', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
  [[140, 260], [170, 250], [890, 250], [920, 270]].forEach(([x, y]) => mk(g, 'path', { d: `M${x},${y + 40} q-4,-60 6,-110`, stroke: '#4E7A34', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }));
  LAB[0] = [[460, 300, 380, 110, 'Still water', 'end'], [170, 340, 240, 470, 'Green at the edges', 'start']];
}
const drops = [];
{ const g = ZG[1]; mk(g, 'circle', { cx: 528, cy: 263, r: 230, fill: '#F4F8EC', stroke: BR, 'stroke-width': 5 });
  const r = M.rng(4); for (let k = 0; k < 14; k++) { const a = r() * 6.28, d = 30 + r() * 170; const x = 528 + d * Math.cos(a), y = 263 + d * Math.sin(a);
    const c = mk(g, 'ellipse', { cx: x, cy: y, rx: 16 + r() * 10, ry: 7 + r() * 4, fill: k % 3 ? '#B9DCA8' : '#EEDFC8', stroke: BR, 'stroke-width': 2, transform: `rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})` }); drops.push([c, x, y, r() * 6]); }
  euglena(g, 560, 250, 0.12);
  LAB[1] = [[400, 180, 250, 80, 'Single cells', 'end'], [520, 250, 760, 440, 'Euglena', 'start']];
}
const EZ = euglena(ZG[2], 600, 280, 0.95);
LAB[2] = [[-275 * 0.95 + 600 - 120, 280 - 30, 160, 110, 'Long flagellum', 'start'], [600 - 265, 276, 300, 440, 'Short flagellum', 'end', [300, 440]], [600 + 100, 280 - 88, 700, 90, 'Pellicle', 'start'], [640, 280, 780, 420, 'Nucleus', 'start'], [600 + 130 * 0.95, 280 - 30, 900, 200, 'Chloroplast', 'end']];
LAB[2][1] = [600 - 265 * 0.95 - 10, 276, 330, 450, 'Short flagellum', 'start'];
LAB[2][4] = [600 + 165 * 0.95, 280 + 28, 920, 360, 'Chloroplast', 'end'];
const LB = LAB.map((L, lv) => labels(ZG[lv], L));
const FR = FOC.map((f, lv) => f && mk(ZG[lv], 'circle', { cx: f[0], cy: f[1], r: f[2], fill: 'none', stroke: C.ac, 'stroke-width': 4, 'stroke-dasharray': '10 8' }));
const tLab = [[wt('Z2', 'Still'), wt('Z2', 'green')], [wt('Z3', 'Dozens'), wt('Z3', 'move')], [wt('Z4', 'long'), wt('Z4', 'short'), wt('Z5', 'pellicle'), wt('Z5', 'nucleus'), wt('Z5', 'chloroplasts')]];

/* ---------- K: what makes a protist ---------- */
const KR = [['cellI', 'All single celled eukaryotes', ['K1', 'single']], ['nuc', 'A true nucleus, parts wrapped in membranes', ['K2', 'nucleus']], ['eug', 'Some swim with flagella or cilia', ['K2', 'flagella']], ['wave', 'Most of them live in water', ['K3', 'water']]];
$('#krs').innerHTML = KR.map(([ic, n], i) => `<div class="kr" id="kr${i}" style="top:${80 + i * 100}px"><i>${M.icon(ic, 30, C.ac, 2.2)}</i><span>${n}</span></div>`).join('');
const tKr = KR.map(k => wt(k[2][0], k[2][1]));
const rpA = [0, 1].map(() => { const g = mk($('#rpS0'), 'g', {}); mk(g, 'ellipse', { cx: 0, cy: 0, rx: 52, ry: 40, fill: '#EEDFC8', stroke: BR, 'stroke-width': 3 }); mk(g, 'circle', { cx: 0, cy: 0, r: 12, fill: NUC }); return g; });
const rpB = [0, 1].map(() => { const g = mk($('#rpS1'), 'g', {}); mk(g, 'ellipse', { cx: 0, cy: 0, rx: 40, ry: 32, fill: '#EEDFC8', stroke: BR, 'stroke-width': 3 }); mk(g, 'circle', { cx: 0, cy: 0, r: 9, fill: NUC }); return g; });
const zygO = fb(mk($('#rpS1'), 'g', {})), zyg = mk(zygO, 'g', { transform: 'translate(380 120)' }); mk(zyg, 'ellipse', { cx: 0, cy: 0, rx: 56, ry: 46, fill: '#E4D3EE', stroke: NUC, 'stroke-width': 4 }); mk(zyg, 'circle', { cx: 0, cy: 0, r: 15, fill: NUC });
const zygT = txt($('#rpS1'), 560, 190, 'ZYGOTE', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1.5, fill: NUC });

/* ---------- G: five groups ---------- */
const GN = ['CHRYSOPHYTES', 'DINOFLAGELLATES', 'EUGLENOIDS', 'SLIME MOULDS', 'PROTOZOANS'];
$('#gch').innerHTML = GN.map((n, i) => `<span class="zc" id="gc${i}"><b><i>${i + 1}</i></b>${n}</span>${i < 4 ? `<span class="za" style="display:inline-flex">${M.icon('arrowR', 20, C.dim, 2.4)}</span>` : ''}`).join('');
const tGs = [T0('G2'), T0('G4'), T0('G6'), T0('G7'), T0('G9')];
const GI = [['Chrysophytes', [['Diatoms and golden algae (desmids)', 'G2', 'Diatoms'], ['Float as plankton: fresh water, sea', 'G2', 'plankton'], ['Silica walls fit like a soap box', 'G3', 'soap'], ['Diatomaceous earth: polishing, filtering oils and syrups', 'G3', 'diatomaceous']], 'Diatoms'],
  ['Dinoflagellates', [['Mostly marine', 'G4', 'marine'], ['Stiff cellulose plates outside', 'G4', 'cellulose'], ['Two flagella: one along, one across in a groove', 'G4', 'flagellum'], ['Red tides: toxins can kill fish', 'G5', 'red']], 'Gonyaulax'],
  ['Euglenoids', [['Still fresh water', 'G6', 'still'], ['Pellicle instead of a cell wall', 'G6', 'Euglenoids'], ['Two flagella: short and long', 'G6', 'Euglena']], 'Euglena'],
  ['Slime moulds', [['Saprophytic: feed on decaying twigs and leaves', 'G7', 'decaying'], ['Good times: a plasmodium, spreads over feet', 'G7', 'plasmodium'], ['Bad times: fruiting bodies with spores', 'G8', 'fruiting'], ['Spores: true walls, survive years, fly on air', 'G8', 'walls']], null],
  ['Protozoans', [['All heterotrophs: predators or parasites', 'G9', 'heterotrophs'], ['Thought to be early relatives of animals', 'G9', 'relatives'], ['Four kinds, shown here', 'G10', 'Amoeba']], null]];
$('#gis').innerHTML = GI.map(([n, ls, ex], i) => { let y = 140; const rows = ls.map(([l], k) => { const h = l.length > 30 ? 66 : 36, s = `<div class="gl" id="gl${i}${k}" style="left:54px;width:422px;top:${y}px">${l}</div>`; y += h + 18; return s; }).join('');
  return `<div class="gI" id="gI${i}"><div class="lbl" style="left:36px;top:30px">GROUP ${i + 1} OF 5</div><div class="gn">${n}</div>${rows}${ex ? `<div class="gx" id="gx${i}">${ex}</div>` : ''}</div>`; }).join('');
const tGl = GI.map(([, ls]) => ls.map(([, id, w]) => wt(id, w)));
const tGx = [wt('G2', 'Diatoms'), wt('G5', 'Gonyaulax'), wt('G6', 'Euglena')];
const gS = $('#gS'), GA = [0, 1, 2, 3].map(() => mk(gS, 'g', {}));
const ovG = document.createElement('div'); ovG.style.cssText = 'position:absolute;left:36px;top:110px;width:984px;height:330px';
ovG.innerHTML = [['shell', 'Chrysophytes'], ['tide', 'Dinoflagellates'], ['eug', 'Euglenoids'], ['slime', 'Slime moulds'], ['amoeba', 'Protozoans']].map(([ic, n], i) => `<div id="ov${i}" style="position:absolute;left:${i * 198}px;top:0;width:180px;height:300px;border-radius:14px;background:var(--soft)"><div style="position:absolute;left:0;width:180px;top:40px;display:flex;justify-content:center">${M.icon(ic, 72, C.ac, 2)}</div><div style="position:absolute;left:0;width:180px;top:150px;text-align:center;font:600 34px 'IBM Plex Mono';color:var(--ac)">${i + 1}</div><div style="position:absolute;left:0;width:180px;top:210px;text-align:center;font:700 21px Poppins;white-space:nowrap">${n}</div></div>`).join('');
$('#gd').appendChild(ovG);
const ovI = document.createElement('div'); ovI.style.cssText = 'position:absolute;left:0;top:0;width:512px;height:526px';
ovI.innerHTML = `<div class="lbl" style="left:36px;top:30px">KINGDOM PROTISTA</div><div style="position:absolute;left:36px;top:70px;font:600 120px/1 'IBM Plex Mono';color:var(--ac)">5</div><div style="position:absolute;left:36px;top:206px;font:700 40px Poppins">main groups</div><div style="position:absolute;left:36px;top:268px;width:440px;font:500 24px/1.35 Poppins;color:var(--ink2)">Every one: a single cell with a true nucleus.</div>`;
$('#gi').appendChild(ovI);
// 1 diatom (soap box) + diatomaceous earth
const dia = {};
{ const g = GA[0];
  dia.lo = mk(g, 'g', {}); mk(dia.lo, 'path', { d: 'M180,250 L580,250 L560,330 Q380,352 200,330 Z', fill: '#E9E3C6', stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 9; k++) mk(dia.lo, 'line', { x1: 220 + k * 42, y1: 258, x2: 224 + k * 40, y2: 330, stroke: '#B8AE7C', 'stroke-width': 2.5 });
  dia.up = mk(g, 'g', {}); mk(dia.up, 'path', { d: 'M164,250 L596,250 L578,170 Q380,146 182,170 Z', fill: '#F3EED6', stroke: BR, 'stroke-width': 4 });
  for (let k = 0; k < 9; k++) mk(dia.up, 'line', { x1: 206 + k * 44, y1: 244, x2: 210 + k * 42, y2: 172, stroke: '#C9BF8A', 'stroke-width': 2.5 });
  mk(dia.lo, 'ellipse', { cx: 380, cy: 290, rx: 60, ry: 22, fill: '#C9962B', opacity: 0.55 });
  dia.lab = labels(g, [[560, 190, 640, 110, 'Upper shell (lid)', 'start'], [540, 320, 640, 390, 'Lower shell', 'start'], [300, 300, 220, 440, 'Silica in the walls', 'start', [220, 440]]]);
  dia.pile = fb(mk(g, 'g', {})); mk(dia.pile, 'path', { d: 'M700,470 Q820,370 960,470 Z', fill: '#F1ECE0', stroke: BR, 'stroke-width': 3 });
  const r = M.rng(9); for (let k = 0; k < 26; k++) mk(dia.pile, 'ellipse', { cx: 740 + r() * 190, cy: 450 - r() * 50 * (1 - Math.abs((740 + r() * 190) - 830) / 140), rx: 7, ry: 4, fill: '#C9BF8A' });
  txt(dia.pile, 830, 500, 'DIATOMACEOUS EARTH', { 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 600, 'letter-spacing': 1.5, fill: C.mute }); }
// 2 dinoflagellate + red tide
const dino = {};
{ const g = GA[1], cx = 380, cy = 240;
  mk(g, 'path', { d: `M${cx - 120},${cy} C${cx - 120},${cy - 120} ${cx + 120},${cy - 130} ${cx + 120},${cy} C${cx + 120},${cy + 90} ${cx + 40},${cy + 130} ${cx},${cy + 150} C${cx - 40},${cy + 130} ${cx - 120},${cy + 90} ${cx - 120},${cy} Z`, fill: '#F2D3B8', stroke: BR, 'stroke-width': 4.5 });
  [[cx - 60, cy - 80, cx - 40, cy - 2], [cx + 30, cy - 98, cx + 40, cy - 4], [cx - 100, cy + 60, cx - 20, cy + 30], [cx + 90, cy + 60, cx + 20, cy + 40], [cx, cy + 30, cx, cy + 140]].forEach(([a, b, c, d]) => mk(g, 'line', { x1: a, y1: b, x2: c, y2: d, stroke: '#B07B57', 'stroke-width': 3 }));
  mk(g, 'path', { d: `M${cx - 122},${cy + 4} Q${cx},${cy + 30} ${cx + 122},${cy + 4}`, stroke: BR, 'stroke-width': 9, fill: 'none' });
  mk(g, 'path', { d: `M${cx - 122},${cy + 4} Q${cx},${cy + 30} ${cx + 122},${cy + 4}`, stroke: '#F7E6D6', 'stroke-width': 4, fill: 'none' });
  dino.tf = mk(g, 'path', { d: '', stroke: RED, 'stroke-width': 3.5, fill: 'none' });
  dino.lf = mk(g, 'path', { d: '', stroke: BR, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
  mk(g, 'circle', { cx: cx + 10, cy: cy - 50, r: 22, fill: '#D7C3E6', stroke: NUC, 'stroke-width': 3 });
  dino.lab = labels(g, [[cx + 60, cy - 70, 620, 110, 'Cellulose plates', 'start'], [cx + 100, cy + 18, 640, 250, 'Flagellum across', 'start'], [cx + 26, cy + 200, 620, 400, 'Flagellum along', 'start']]);
  dino.sea = mk(g, 'rect', { x: 36, y: 474, width: 984, height: 40, rx: 10, fill: '#BFDCEB' });
  dino.fishO = mk(g, 'g', {}); dino.fish = mk(dino.fishO, 'g', {}); mk(dino.fish, 'path', { d: 'M820,494 c20,-14 50,-14 66,0 c-16,14 -46,14 -66,0 Z M886,494 l18,-12 v24 Z', fill: '#fff', stroke: BR, 'stroke-width': 2.5 });
  dino.tag = txt(g, 60, 501, 'RED TIDE', { 'font-size': 18, 'font-weight': 600, 'letter-spacing': 1.5, fill: '#fff' }); }
// 3 Euglena swimming
const EG = euglena(GA[2], 560, 260, 0.62);
// 4 slime mould: twig, plasmodium, fruiting bodies, spores
const sm = {};
{ const g = GA[3];
  mk(g, 'path', { d: 'M60,400 C300,380 700,420 1000,392 L1000,440 C700,466 300,430 60,450 Z', fill: '#9A7454', stroke: BR, 'stroke-width': 4 });
  mk(g, 'path', { d: 'M260,430 l-30,40 M640,430 l26,40', stroke: '#9A7454', 'stroke-width': 10, 'stroke-linecap': 'round' });
  for (let k = 0; k < 5; k++) mk(g, 'path', { d: `M${120 + k * 190},${400} c20,-26 60,-26 80,-6 c-24,6 -60,10 -80,6Z`, fill: '#C6A15B', stroke: BR, 'stroke-width': 2.5 });
  sm.pl = mk(g, 'path', { d: '', fill: '#F2D46B', stroke: '#B58B1E', 'stroke-width': 3.5, opacity: 0.95 });
  sm.fb = [0, 1, 2, 3, 4].map(k => { const x = 300 + k * 110, f = mk(g, 'g', {}); mk(f, 'path', { d: `M${x},396 L${x},${300 - (k % 2) * 30}`, stroke: '#8A6A2E', 'stroke-width': 5 }); mk(f, 'circle', { cx: x, cy: 290 - (k % 2) * 30, r: 22, fill: '#6E5A8A', stroke: BR, 'stroke-width': 3 }); return f; });
  sm.sp = []; for (let k = 0; k < 18; k++) sm.sp.push(mk(g, 'circle', { r: 5, fill: '#6E5A8A' }));
  sm.lab = labels(g, [[240, 392, 150, 250, 'Plasmodium', 'start'], [520, 286, 650, 140, 'Fruiting body', 'start'], [760, 200, 860, 120, 'Spores', 'start']]); }
// 5 protozoans: four tiles
const PZ = [['Amoeba', 'AMOEBOID · PSEUDOPODIA'], ['Trypanosoma', 'FLAGELLATED · SLEEPING SICKNESS'], ['Paramoecium', 'CILIATED · GULLET'], ['Plasmodium', 'SPOROZOAN · MALARIA']];
$('#pzs').innerHTML = PZ.map(([n, w], i) => `<div class="pz" id="pz${i}" style="left:${36 + (i % 2) * 504}px;top:${70 + Math.floor(i / 2) * 226}px;height:210px"><div class="pn">${n}</div><div class="pw">${w}</div><svg id="pzS${i}" width="480" height="210" style="position:absolute;left:0;top:0"></svg></div>`).join('');
const tPz = [wt('G10', 'Amoeba'), wt('G10', 'Trypanosoma'), wt('G10', 'Paramoecium'), wt('G10', 'Plasmodium')];
const pz = {};
{ pz.am = mk($('#pzS0'), 'path', { fill: '#E9DDF0', stroke: BR, 'stroke-width': 3 }); pz.amN = mk($('#pzS0'), 'circle', { r: 10, fill: NUC });
  pz.tr = mk($('#pzS1'), 'path', { d: '', stroke: BR, 'stroke-width': 16, fill: 'none', 'stroke-linecap': 'round' }); pz.tr2 = mk($('#pzS1'), 'path', { d: '', stroke: '#EEDFC8', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' });
  pz.trF = mk($('#pzS1'), 'path', { d: '', stroke: BR, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' });
  for (let k = 0; k < 7; k++) mk($('#pzS1'), 'circle', { cx: 40 + k * 22, cy: 160 + (k % 2) * 12, r: 9, fill: '#D1495B', opacity: 0.85 });
  const pp = mk($('#pzS2'), 'g', { transform: 'translate(340 120)' }); mk(pp, 'path', { d: 'M-100,0 C-100,-44 -20,-52 40,-40 C96,-30 104,30 46,40 C-20,52 -100,44 -100,0 Z', fill: '#EEDFC8', stroke: BR, 'stroke-width': 3 });
  mk(pp, 'path', { d: 'M-20,-36 Q0,-6 -30,10', stroke: BR, 'stroke-width': 3, fill: 'none' }); mk(pp, 'circle', { cx: 20, cy: 6, r: 12, fill: NUC });
  pz.cil = []; for (let k = 0; k < 30; k++) { const a = k / 30 * Math.PI * 2; pz.cil.push([mk(pp, 'line', { stroke: BR, 'stroke-width': 2, 'stroke-linecap': 'round' }), a]); }
  pz.food = [0, 1, 2].map(() => mk(pp, 'circle', { r: 5, fill: '#5FA86F' }));
  for (let k = 0; k < 5; k++) { const x = 250 + k * 44, y = 120 + (k % 2 ? -24 : 24); mk($('#pzS3'), 'path', { d: `M${x - 14},${y + 8} Q${x},${y - 18} ${x + 14},${y + 8}`, stroke: '#7A5A9A', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' }); }
  mk($('#pzS3'), 'circle', { cx: 120, cy: 150, r: 34, fill: '#D1495B', stroke: '#8E2A38', 'stroke-width': 3 }); mk($('#pzS3'), 'circle', { cx: 120, cy: 150, r: 14, fill: '#E27B88' });
  txt($('#pzS3'), 120, 200, 'RED BLOOD CELL', { 'text-anchor': 'middle', 'font-size': 12, fill: C.mute, 'letter-spacing': 1 }); }

/* ---------- P: Euglena in light vs dark ---------- */
const EL = euglena($('#paS'), 410, 300, 0.58), ED = euglena($('#pbS'), 410, 300, 0.58, { dim: 1 });
const sun = mk($('#paS'), 'g', {}); mk(sun, 'circle', { cx: 110, cy: 130, r: 34, fill: '#F2C96B', stroke: GOLD, 'stroke-width': 3 });
const rays = [0, 1, 2].map(k => mk($('#paS'), 'path', { d: `M${150 + k * 10},${150 + k * 26} L${300 + k * 30},${230 + k * 18}`, stroke: GOLD, 'stroke-width': 4, 'stroke-dasharray': '12 8', fill: 'none' }));
const sug = [[-120, -10], [-40, 20], [100, 0], [180, 0]].map(([x, y]) => mk(EL.g, 'circle', { cx: x, cy: y, r: 12, fill: GOLD }));
const prey = [0, 1, 2, 3, 4].map(() => mk($('#pbS'), 'circle', { r: 9, fill: '#9FD09A', stroke: '#1F5E37', 'stroke-width': 2 }));
const th1 = PUC.think($('#th1'), { q: 'Euglena is kept in a dark cupboard for a week. Will it starve?', opts: ['Yes, it starves', 'No, it eats'], right: 1, why: 'No. In the dark, it switches to eating smaller organisms. One cell, two ways to feed.' });

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span style="font:600 30px \'IBM Plex Mono\';color:var(--mute);letter-spacing:.02em">Monera: no nucleus · <b style="color:var(--ac)">Protista: true nucleus</b></span>';

/* ---------- W ---------- */
const WC = [['CLUE 1', 'Soap box silica walls', 'shell', 'CHRYSOPHYTES', 'diatoms', wt('W2', 'Chrysophytes')], ['CLUE 2', 'Red tides', 'tide', 'DINOFLAGELLATES', 'Gonyaulax', wt('W3', 'Dinoflagellates')],
  ['CLUE 3', 'A pellicle, no wall', 'eug', 'EUGLENOIDS', 'Euglena', wt('W4', 'Euglenoids')], ['CLUE 4', 'Plasmodium, fruiting bodies', 'slime', 'SLIME MOULDS', 'saprophytic protists', wt('W5', 'Slime')],
  ['CLUE 5', 'False feet', 'amoeba', 'AMOEBOID', 'Amoeba', wt('W6', 'Amoeboid')], ['CLUE 6', 'Malaria', 'bug', 'SPOROZOANS', 'Plasmodium', wt('W6', 'sporozoans')]];
const tWi = [wt('W2', 'Silica'), wt('W3', 'Red'), wt('W4', 'pellicle'), wt('W5', 'plasmodium'), wt('W6', 'False'), wt('W6', 'malaria')];
$('#cols').innerHTML = WC.map(([h, n, ic, k, r], i) => `<div class="colW" id="cw${i}" style="left:${36 + i * 259}px"><div class="ch2">${h}</div><div class="it" id="it${i}"><div class="ic">${M.icon(ic, 68, C.ink, 2)}</div><div class="inm">${n}</div></div>
  <div class="dz"></div><div class="kg" id="kg${i}" style="font-size:${k.length > 13 ? 15 : 17}px">${k}</div><div class="rs" id="rs${i}" style="${i === 3 ? '' : 'font-style:italic'}">${r}</div></div>`).join('');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Slime moulds are fungi, because of the word mould', right: 'NCERT places slime moulds in Protista' });
const tSv = $('#tS'), tG = fb(mk(tSv, 'g', {}));
{ mk(tG, 'path', { d: 'M40,200 C160,190 360,206 480,196 L480,220 C360,232 160,214 40,224 Z', fill: '#9A7454', stroke: BR, 'stroke-width': 3 });
  [140, 230, 320, 410].forEach((x, k) => { mk(tG, 'line', { x1: x, y1: 198, x2: x, y2: 120 - (k % 2) * 20, stroke: '#8A6A2E', 'stroke-width': 4 }); mk(tG, 'circle', { cx: x, cy: 112 - (k % 2) * 20, r: 16, fill: '#6E5A8A', stroke: BR, 'stroke-width': 2.5 }); });
  txt(tG, 260, 256, 'SLIME MOULD · A SAPROPHYTIC PROTIST', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, 'letter-spacing': 1, fill: C.ok }); }
const where = PUC.where($('#wa'), { on: [], type: 'Statements on the protist groups, or matching organism to group or disease' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800, optY: 404, optW: 474,
  q: 'Which of these statements are correct?<div class="sl"><b>I</b>Diatoms have cell walls embedded with silica.</div><div class="sl"><b>II</b>Euglenoids have a cellulose cell wall.</div><div class="sl"><b>III</b>Slime mould spores have true walls.</div><div class="sl"><b>IV</b>Trypanosoma is a ciliated protozoan.</div>',
  opts: ['I and II only', 'II and IV only', 'I and III only', 'I, III and IV only'], right: 2 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b> (I, III)'], ['<b style="color:var(--red)">II</b> is false'], ['Euglenoids: a pellicle'], ['<b style="color:var(--red)">IV</b> is false'], ['Trypanosoma: flagellated']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'Two'), wt('A2', 'pellicle'), wt('A3', 'Four'), wt('A3', 'flagellated')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · kingdom Protista', y0: 96, dy: 60, txt: [1, 1, 1, 1, 1, 1],
  lines: ['<b>Protista</b>: single celled eukaryotes, mostly in water', '<b>Chrysophytes</b>: diatoms, desmids · silica soap box walls', '<b>Dinoflagellates</b>: cellulose plates · red tides (<i>Gonyaulax</i>)',
    '<b>Euglenoids</b>: pellicle · two flagella · feeds in light or dark', '<b>Slime moulds</b>: plasmodium · fruiting bodies · spores', '<b>Protozoans</b>: <i>Amoeba, Trypanosoma, Paramoecium, Plasmodium</i>'] });
const YQ = ['What is a pellicle?', 'What causes a red tide?', 'Name the four kinds of protozoans, one example each.'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 15', topic: 'Spots on old bread: plant, animal or neither? Kingdom Fungi', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [wt('G5', 'red') - 0.3, 1.04, 960, 580], [T0('G6') - 0.2, 1, 960, 540]]);

/* ---------- frame ---------- */
M.on(t => {
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tZ1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('Z1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    JOBS.forEach((_, i) => { M.vis($('#jr' + i), t, tMorph + 0.45 + i * 0.12, 1e9, { dy: 16 }); M.vis($('#jt' + i), t, wt('H2', 'single') - 0.1 + i * 0.12, 1e9, POP); });
    M.vis($('#hjP'), t, wt('H2', 'nucleus') - 0.2, 1e9, POP);
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    M.vis(mvG, t, tH3 + 0.1, 1e9, { dy: 16 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 }); M.vis($('#hkL'), t, tH3, 1e9, { dy: 8 });
    const tt = t - tH3;
    mv.forEach(([k, e, i]) => {
      if (k === 'e') { attr(e.g, 'transform', `translate(${(500 - 9 * tt).toFixed(1)} ${(232 + 10 * Math.sin(tt)).toFixed(1)}) rotate(-8) scale(0.22)`); flagE(e, t); }
      if (k === 'p') attr(e, 'transform', `translate(${(300 + 7 * tt).toFixed(1)} ${(330 - 3 * tt).toFixed(1)}) rotate(${(tt * 30).toFixed(1)})`);
      if (k === 'a') attr(e, 'd', amoebaD(420, 380, 34, tt));
      if (k === 'd') { attr(e, 'cx', (300 + i * 40 + 12 * Math.sin(tt + i)).toFixed(1)); attr(e, 'cy', (190 + (i % 3) * 50 + 10 * Math.cos(tt * 1.3 + i)).toFixed(1)); }
    });
    M.vis($('#hkP'), t, wt('H3', 'swam') - 0.2, tH4 - 0.1, { ...POP, outDur: 0.2 }); M.vis($('#hkN'), t, tH4, 1e9, POP);
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tK1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('K1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 3; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => { const el = $('#zc' + i), on = i === cur ? 1 : 0, done = i < cur ? 1 : 0;
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA'; });
    M.setT($('#zscN'), ZS[cur]); M.vis($('#zsc'), t, tZ1 + 0.6, 1e9, POP); M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => {
      const e = k === 0 ? M.io((t - tZ[0]) / 0.6) : M.io((t - tZ[k] - 0.25) / 0.85), x = k < 2 ? M.io((t - tZ[k + 1]) / 0.75) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      const f = FOC[k] || [528, 263], sc = (k === 0 ? 1 : 0.35 + 0.65 * e) * (1 + 2.4 * x), cx = x > 0 ? f[0] : 528, cy = x > 0 ? f[1] : 263;
      attr(g, 'transform', Math.abs(sc - 1) < 1e-4 ? '' : `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
      g.style.opacity = (Math.min(e, 1 - x)).toFixed(3);
      runLabs(LB[k], t, tLab[k]); if (FR[k]) M.draw(FR[k], t, tZ[k + 1] - 0.7, 0.5);
    });
    drops.forEach(([c, x, y, ph]) => { attr(c, 'cx', (x + 8 * Math.sin(t * 1.2 + ph)).toFixed(1)); attr(c, 'cy', (y + 6 * Math.cos(t + ph)).toFixed(1)); });
    flagE(EZ, t);
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 2 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z5', 'chloroplasts') + 0.4, out);
  }

  /* K */
  const kOn = t >= tK1 - 0.1 && t < tG1 + 0.1; M.hide($('#sK'), !kOn);
  if (kOn) {
    const out = OUT('G1');
    M.vis($('#ka'), t, tK1 + 0.05, out, { dx: -60, dy: 0, ...o });
    KR.forEach((_, i) => { const el = $('#kr' + i); M.vis(el, t, tKr[i] - 0.15, 1e9, { dx: -16, dy: 0 }); el.style.background = mix(C.soft, C.ac2, M.io((t - tKr[i]) / 0.25) * (1 - M.io((t - (tKr[i + 1] ?? T1('K3') + 0.3)) / 0.25))); });
    M.vis($('#kb'), t, T0('K3') - 0.2, out, { dx: 60, dy: 0, ...o });
    const tA = wt('K3', 'asexually'), tS = wt('K3', 'sexually', 1);
    M.vis($('#rp0'), t, tA - 0.2, 1e9, { dy: 14 }); M.vis($('#rp1'), t, tS - 0.3, 1e9, { dy: 14 });
    { const u = M.io(((t - tA) % 2.6) / 1.4); rpA.forEach((g, i) => attr(g, 'transform', `translate(${(356 + (i ? 1 : -1) * 90 * u).toFixed(1)} 120) scale(${(1 - 0.25 * u).toFixed(3)})`)); }
    { const u = M.io((t - wt('K3', 'fuse')) / 0.9); rpB.forEach((g, i) => { attr(g, 'transform', `translate(${(i ? 640 - 80 * u : 120 + 80 * u).toFixed(1)} 120)`); g.style.opacity = (1 - M.io((t - wt('K3', 'fuse') - 0.9) / 0.3)).toFixed(2); });
      M.vis(zygO, t, wt('K3', 'zygote') - 0.1, 1e9, { ...POP, sc: 0.4 }); M.vis(zygT, t, wt('K3', 'zygote'), 1e9, { dy: 6 }); attr(zygT, 'x', 380); }
  }

  /* G: five groups */
  const gOn = t >= tG1 - 0.1 && t < tP1 + 0.1; M.hide($('#sG'), !gOn);
  if (gOn) {
    const out = OUT('P1');
    M.vis($('#gch'), t, tG1, out, { dy: 12, ...o });
    M.vis($('#gd'), t, tG1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#gi'), t, tG1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = -1; tGs.forEach((tt, i) => { if (t >= tt - 0.2) cur = i; });
    GN.forEach((_, i) => { const el = $('#gc' + i), on = i === cur ? 1 : 0, done = i < cur;
      M.vis(el, t, tG1 + 0.2 + i * 0.1, 1e9, POP);
      el.style.background = on ? C.ac : '#FFFFFF'; el.style.color = on ? '#FFFFFF' : done ? C.ac : '#9AA0AC'; el.style.borderColor = on || done ? C.ac : '#CBD0DA';
      el.querySelector('b').style.background = on ? '#FFFFFF' : done ? C.ac : '#CBD0DA'; el.querySelector('b i').style.color = on ? C.ac : '#FFFFFF'; });
    GI.forEach((gI, i) => { const tin = tGs[i] - 0.1, tout = i < 4 ? tGs[i + 1] - 0.25 : 1e9;
      M.vis($('#gI' + i), t, tin, tout, { dy: 18, outDur: 0.22, ody: -12 });
      gI[1].forEach((_, k) => M.vis($('#gl' + i + k), t, tGl[i][k] - 0.15, 1e9, { dx: -12, dy: 0 }));
      if (gI[2]) M.vis($('#gx' + i), t, tGx[i] - 0.1, 1e9, POP); });
    GA.forEach((g, i) => M.vis(g, t, tGs[i] - 0.05, tGs[i + 1] - 0.25, { dy: 18, outDur: 0.22, ody: -12 }));
    M.vis(ovG, t, tG1 + 0.3, tGs[0] - 0.3, { dy: 16, outDur: 0.25 }); [0, 1, 2, 3, 4].forEach(i => M.vis($('#ov' + i), t, tG1 + 0.4 + i * 0.12, 1e9, POP)); M.vis(ovI, t, tG1 + 0.4, tGs[0] - 0.3, { dy: 16, outDur: 0.25 });
    // diatom: the lid lifts and closes over the box
    { const u = (Math.sin((t - tGs[0]) * 1.8) + 1) / 2; attr(dia.up, 'transform', `translate(0 ${(-40 * u).toFixed(1)})`);
      runLabs(dia.lab, t, [wt('G3', 'shells'), wt('G3', 'together'), wt('G3', 'silica')]); M.vis(dia.pile, t, wt('G3', 'diatomaceous') - 0.1, 1e9, { dy: 14 }); }
    // dinoflagellate: flagella beat; red tide spreads
    { attr(dino.tf, 'd', (() => { let d = ''; for (let k = 0; k <= 40; k++) { const s = k / 40, x = 258 + 244 * s, y = 244 + 26 * 4 * s * (1 - s) + 6 * Math.sin(s * 30 - t * 14); d += (k ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; })());
      attr(dino.lf, 'd', wavy(400, 384, 20, 76, 22, 12, t * 9)); runLabs(dino.lab, t, [wt('G4', 'cellulose'), wt('G4', 'across'), wt('G4', 'along')]);
      const red = M.io((t - wt('G5', 'red')) / 1.6); dino.sea.setAttribute('fill', mix('#BFDCEB', RED, red)); dino.tag.style.opacity = red.toFixed(2);
      M.vis(dino.fishO, t, wt('G5', 'fish') - 0.2, 1e9, { dy: 0, fade: 0.2 }); attr(dino.fish, 'transform', t > wt('G5', 'kill') ? `rotate(180 860 494)` : ''); }
    attr(EG.g, 'transform', `translate(${(620 - 40 * Math.max(0, t - tGs[2])).toFixed(1)} 260) scale(0.62)`); flagE(EG, t);
    // slime mould: plasmodium spreads, fruiting bodies rise, spores drift
    { const sp = M.io((t - wt('G7', 'plasmodium') + 0.6) / 2.4), L = 120 + 760 * sp; let d = `M100,404`; for (let k = 0; k <= 30; k++) { const x = 100 + L * k / 30; d += ` L${x.toFixed(1)},${(400 - 18 - 10 * Math.sin(k * 1.3 + t * 2)).toFixed(1)}`; } d += ` L${100 + L},408 L100,410 Z`; attr(sm.pl, 'd', d);
      const tf = wt('G8', 'fruiting'); sm.fb.forEach((f, k) => { const u = M.io((t - tf - k * 0.15) / 0.6); attr(f, 'transform', `translate(0 ${(100 * (1 - u)).toFixed(1)})`); f.style.opacity = u.toFixed(2); });
      const ta = wt('G8', 'spores'); sm.sp.forEach((s, k) => { const ph = ((t - ta) * 0.35 + k / 18) % 1, on = t > ta; attr(s, 'cx', (300 + (k % 5) * 110 + 260 * ph).toFixed(1)); attr(s, 'cy', (280 - (k % 2) * 30 - 200 * ph + 10 * Math.sin(k + t)).toFixed(1)); s.style.opacity = on ? (Math.min(1, ph * 5) * (1 - ph)).toFixed(2) : 0; });
      runLabs(sm.lab, t, [wt('G7', 'plasmodium'), tf, ta]); }
    // protozoans
    PZ.forEach((_, i) => { const el = $('#pz' + i); M.vis(el, t, T0('G9') + 0.3 + i * 0.15, 1e9, POP); el.style.background = mix(C.soft, C.ac2, M.io((t - tPz[i]) / 0.25) * (1 - M.io((t - (tPz[i + 1] ?? T1('G10') + 0.3)) / 0.25))); });
    attr(pz.am, 'd', amoebaD(330, 130, 54, t)); attr(pz.amN, 'cx', 318); attr(pz.amN, 'cy', 128);
    { let d = ''; for (let k = 0; k <= 30; k++) { const s = k / 30, x = 230 + 200 * s, y = 120 + 22 * Math.sin(s * 9 - t * 7); d += (k ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } attr(pz.tr, 'd', d); attr(pz.tr2, 'd', d); attr(pz.trF, 'd', wavy(432, 120 + 22 * Math.sin(9 - t * 7), 40, -10, 12, 8, t * 12)); }
    pz.cil.forEach(([l, a], k) => { const w = 0.28 * Math.sin(t * 10 - k * 0.6), x0 = 98 * Math.cos(a) * 1.04, y0 = 42 * Math.sin(a) * 1.04; attr(l, 'x1', x0.toFixed(1)); attr(l, 'y1', y0.toFixed(1)); attr(l, 'x2', (x0 + 14 * Math.cos(a + w)).toFixed(1)); attr(l, 'y2', (y0 + 14 * Math.sin(a + w)).toFixed(1)); });
    pz.food.forEach((f, k) => { const ph = ((t * 0.5 + k / 3) % 1); attr(f, 'cx', (-130 + 110 * ph).toFixed(1)); attr(f, 'cy', (-60 + 60 * ph).toFixed(1)); f.style.opacity = (1 - ph).toFixed(2); });
  }

  /* P */
  const pOn = t >= tP1 - 0.1 && t < tT + 0.1; M.hide($('#sP'), !pOn);
  if (pOn) {
    const out = OUT('P4');
    M.vis($('#pa'), t, tP1 + 0.1, out, { dx: -60, dy: 0, ...o }); M.vis($('#pb'), t, T0('P3') - 0.15, out, { dx: 60, dy: 0, ...o });
    flagE(EL, t); flagE(ED, t);
    rays.forEach((r, k) => { r.style.strokeDashoffset = (-(t * 40) % 20).toFixed(1); r.style.opacity = M.clamp((t - wt('P2', 'sunlight')) / 0.4).toFixed(2); });
    sug.forEach((s, k) => { s.style.opacity = M.clamp((t - wt('P2', 'food') - k * 0.25) / 0.3) * (0.6 + 0.4 * Math.sin(t * 3 + k)); });
    EL.chl.forEach(c => c.setAttribute('fill', mix('#6DB27A', '#8FD39A', (Math.sin(t * 3) + 1) / 4)));
    M.vis($('#paP'), t, wt('P2', 'plant') - 0.2, 1e9, POP); M.vis($('#pbP'), t, wt('P3', 'animal') - 0.2, 1e9, POP);
    prey.forEach((p, k) => { const ph = ((t - T0('P3')) * 0.4 + k / 5) % 1; attr(p, 'cx', (150 + 120 * ph + 30 * k).toFixed(1)); attr(p, 'cy', (140 + k * 60 + (300 - 140 - k * 60) * ph).toFixed(1)); p.style.opacity = t > T0('P3') ? (1 - M.clamp((ph - 0.75) / 0.25)).toFixed(2) : 0; });
    M.vis($('#th1'), t, tP4 + 0.05, OUT('T1'), { dy: 36, ...o });
    th1(t, { tin: tP4, tOpts: wt('P4', 'starve') - 0.1, tCount: T1('P4') + 0.05, dur: 3, tAns: T0('P5') - 0.02, tWhy: wt('P5', 'In') });
  }

  /* statement */
  const stOn = t >= tT && t < tW1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tW1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'one') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'nucleus') + 0.2, 1.0);
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    M.vis($('#wb'), t, tW1 + 0.05, OUT('X1'), { dy: 36, ...o });
    WC.forEach((w, i) => { M.vis($('#cw' + i), t, tW1 + 0.3 + i * 0.06, 1e9, { dy: 12 }); const it = $('#it' + i);
      M.vis(it, t, tWi[i] - 0.15, 1e9, POP); it.style.background = mix(C.soft, C.ac2, M.io((t - tWi[i]) / 0.25) * (1 - M.io((t - w[5] - 0.4) / 0.3)));
      M.vis($('#kg' + i), t, w[5] - 0.1, 1e9, { dy: -30, sp: M.SOFT, fade: 0.1 }); M.vis($('#rs' + i), t, w[5] + 0.4, 1e9, { dy: 8 }); });
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'slime') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'NCERT') - 0.1 });
    M.vis(tG, t, wt('X3', 'saprophytic') - 0.3, 1e9, { ...POP, sc: 0.6 });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statements') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Which') - 0.2, tCount, tAns });
    M.vis($('#so'), t, tAns + 0.1, 1e9, { dx: 60, dy: 0 });
    so(t, tAns + 0.1, tSo);
  }

  /* F */
  const fOn = t >= tF; M.hide($('#sF'), !fOn);
  if (fOn) {
    fc(t, { tin: tF + 0.1, tout: tY - 0.3, tLines: [tF + 0.4, tF + 0.75, tF + 1.1, tF + 1.45, tF + 1.8, tF + 2.15], tShot: wt('F1', 'Screenshot') });
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
