// BSc Biology world sample - Parts of a cell (Living cell)
(() => {
const { $ } = M;
const C = { ink: '#173A2C', ink2: '#46614F', muted: '#7F9585', dim: '#B4C3B8', leaf: '#4FA36A', leafD: '#3E8A57', vein: '#8CC79C', leaf2: '#D6E8D2', cyto: '#FBE6D4', cytoD: '#F1CDB0', plum: '#7B4B94', plumD: '#5E3574', sage: '#EEF3EA', card: '#FBFDF9', line: '#DCE5D7' };
const wt = M.wt, NS = 'http://www.w3.org/2000/svg';

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = M.t0('H2') + 0.02;
const tLeaf = tMorph + 0.2, tLens = wt('H2', 'zoom'), tZ = wt('H2', 'into') + 0.02, ZD = 1.5;
const PARTS = [
  { id: 'mem', nm: 'Cell membrane', ds: 'The outer wall. Controls what goes in and out.', col: C.leaf, tn: wt('B1', 'membrane'), td: wt('B1', 'controls') },
  { id: 'nuc', nm: 'Nucleus', ds: 'The control centre. Holds the instructions.', col: C.plum, tn: wt('B2', 'nucleus'), td: wt('B2', 'holds') },
  { id: 'mit', nm: 'Mitochondria', ds: 'The power stations. They make energy.', col: C.leafD, tn: M.t0('B3') + 0.05, td: wt('B3', 'make') },
];
const tAct = [M.t0('B1'), M.t0('B2'), M.t0('B3')], tAllOn = M.t1('B3') + 0.05;
const tSweep = M.t1('B3') + 0.1, tShut = tSweep + 0.5, tOpen = tShut + 0.1, tQ = tOpen + 0.12;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'The');

/* ---------- organic shapes ---------- */
// smooth closed blob through n jittered polar points (Catmull-Rom -> cubic)
function blobPts(cx, cy, rx, ry, seed, jit = 0.05, n = 12) {
  const r = M.rng(seed), ph = r() * 6.28, a1 = 0.5 + r(), out = [];
  for (let k = 0; k < n; k++) {
    const a = k / n * Math.PI * 2, j = 1 + jit * (Math.sin(a * 2 + ph) * 0.6 + Math.sin(a * 3 + ph * a1) * 0.4) + jit * 0.5 * (r() - 0.5);
    out.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]);
  }
  return out;
}
function smooth(pts) {
  const n = pts.length; let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d + 'Z';
}
const breathe = (pts, cx, cy, amp, ph) => pts.map(([x, y], k) => { const f = 1 + amp * Math.sin(ph + k * 0.9); return [cx + (x - cx) * f, cy + (y - cy) * f]; });
const mitoPath = (w, h) => { const r = h / 2; return `M${-w / 2 + r} ${-r} H${w / 2 - r} A${r} ${r} 0 0 1 ${w / 2 - r} ${r} H${-w / 2 + r} A${r} ${r} 0 0 1 ${-w / 2 + r} ${-r}Z`; };
const cristae = (w, h) => { const n = 5, x0 = -w / 2 + h * 0.45, x1 = w / 2 - h * 0.45, dx = (x1 - x0) / n; let d = `M${x0} 0`; for (let i = 0; i < n; i++) d += ` L${(x0 + dx * (i + 0.5)).toFixed(1)} ${(i % 2 ? h : -h) * 0.28} L${(x0 + dx * (i + 1)).toFixed(1)} 0`; return d; };

/* ---------- geometry (final framing) ---------- */
const F = [624, 560], RX = 300, RY = 270, K = 5;
const NUC = [560, 514, 92];
const MITO = [[760, 706, -8, 120, 56], [430, 682, 24, 104, 50], [430, 400, -30, 104, 50], [712, 378, 18, 96, 46]];
const VES = [[700, 600, 9], [520, 760, 7], [360, 560, 8], [640, 410, 7], [820, 520, 7], [480, 330, 6]];
const cellPts = blobPts(F[0], F[1], RX, RY, 7, 0.045);
// label blocks
const LB_TOP = [292, 488, 684];
const memA = (() => { const a = -50 * Math.PI / 180; return [F[0] + Math.cos(a) * RX * 1.0, F[1] + Math.sin(a) * RY * 1.0]; })();
const LEAD = [
  `M${memA[0].toFixed(1)} ${memA[1].toFixed(1)} L${(memA[0] + 36).toFixed(1)} ${LB_TOP[0] + 28} H1094`,
  `M${NUC[0] + NUC[2] + 4} ${NUC[1]} H1094`,
  `M${MITO[0][0] + 62} ${MITO[0][1]} H1094`,
];
const ANCH = [memA, [NUC[0] + NUC[2] + 4, NUC[1]], [MITO[0][0] + 62, MITO[0][1]]];

/* ---------- build: leaf ---------- */
const LC = [960, 556], LROT = -18;
const leafD0 = 'M-390 0 C-250 -170 140 -190 390 0 C140 190 -250 170 -390 0Z';
let veins = 'M-380 0 L370 0';
[-250, -150, -50, 50, 150, 250].forEach(x => { const l = 120 * (1 - Math.abs(x) / 420); veins += ` M${x} 0 Q${x + 50} ${-l * 0.6} ${x + 90} ${-l}  M${x} 0 Q${x + 50} ${l * 0.6} ${x + 90} ${l}`; });
$('#leafG').innerHTML = `<g transform="translate(${LC[0]} ${LC[1]}) rotate(${LROT})">
  <path d="M-390 0 L-460 30" stroke="${C.leafD}" stroke-width="10" stroke-linecap="round" fill="none"/>
  <path d="${leafD0}" fill="${C.leaf}"/>
  <path d="${veins}" stroke="${C.vein}" stroke-width="6" stroke-linecap="round" fill="none"/>
</g>`;
const PL = (() => { const a = LROT * Math.PI / 180, x = 100, y = -64; return [LC[0] + x * Math.cos(a) - y * Math.sin(a), LC[1] + x * Math.sin(a) + y * Math.cos(a)]; })();
$('#lens').setAttribute('cx', PL[0].toFixed(1)); $('#lens').setAttribute('cy', PL[1].toFixed(1));

/* ---------- build: tissue (honeycomb of blobs, target cell at F) ---------- */
let tn = `<rect x="-9000" y="-6000" width="26000" height="13000" fill="${C.leaf}"/>`, tnN = '';
for (let row = -8; row <= 8; row++) for (let col = -11; col <= 21; col++) {
  if (row === 0 && col === 0) continue;
  const cx = F[0] + col * 640 + (row % 2 ? 320 : 0), cy = F[1] + row * 560;
  tn += `<path d="${smooth(blobPts(cx, cy, RX, RY, 100 + row * 40 + col, 0.06, 10))}" fill="${C.cyto}"/>`;
  const r = M.rng(900 + row * 50 + col); tnN += `<circle cx="${(cx - 60 + r() * 60).toFixed(0)}" cy="${(cy - 40 + r() * 50).toFixed(0)}" r="88" fill="${C.plum}"/>`;
}
$('#tisN').innerHTML = tn + tnN;
const ce = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); return e; };
const tm = $('#tisM');
const cellFill = ce('path', { fill: C.cyto }), cellMem = ce('path', { fill: 'none', stroke: C.leaf, 'stroke-width': 14 }), cellIn = ce('path', { fill: 'none', stroke: C.leafD, 'stroke-width': 3 });
tm.append(cellFill);
VES.forEach(([x, y, r]) => tm.append(ce('circle', { cx: x, cy: y, r, fill: C.cytoD, class: 'ves' })));
const mitos = MITO.map(([x, y, a, w, h]) => {
  const g = ce('g', { transform: `translate(${x} ${y}) rotate(${a})` });
  g.append(ce('path', { d: mitoPath(w, h), fill: C.leaf, stroke: C.leafD, 'stroke-width': 4 }), ce('path', { d: cristae(w, h), fill: 'none', stroke: '#BFE3C8', 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
  tm.append(g); return g;
});
const nuc = ce('circle', { cx: NUC[0], cy: NUC[1], r: NUC[2], fill: C.plum, stroke: C.plumD, 'stroke-width': 5 });
const nucl = ce('circle', { cx: NUC[0] - 22, cy: NUC[1] + 14, r: 30, fill: C.plumD });
tm.append(nuc, nucl, cellMem, cellIn);

/* ---------- build: leaders + labels ---------- */
$('#cell').innerHTML = LEAD.map((d, i) => `<path id="ld${i}" d="${d}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle id="la${i}" cx="${ANCH[i][0].toFixed(1)}" cy="${ANCH[i][1].toFixed(1)}" r="8" fill="${C.card}" stroke="${C.ink}" stroke-width="3"/>`).join('');
PARTS.forEach((p, i) => $('#labels').insertAdjacentHTML('beforeend',
  `<div class="lb" id="lb${i}" style="top:${LB_TOP[i]}px"><div class="nm" id="ln${i}"><s style="background:${p.col}"></s><span>${p.nm}</span></div><div class="ds" id="lds${i}">${p.ds}</div></div>`));

/* ---------- quiz options with drawn parts ---------- */
const QO = ['Membrane', 'Nucleus', 'Mitochondria'];
const qArt = [
  `<path d="${smooth(blobPts(100, 100, 84, 74, 7, 0.05))}" fill="${C.cyto}" stroke="${C.leaf}" stroke-width="10"/>`,
  `<circle cx="100" cy="100" r="70" fill="${C.plum}" stroke="${C.plumD}" stroke-width="5"/><circle cx="84" cy="112" r="24" fill="${C.plumD}"/>`,
  `<g transform="translate(100 100) rotate(-18)"><path d="${mitoPath(170, 80)}" fill="${C.leaf}" stroke="${C.leafD}" stroke-width="5"/><path d="${cristae(170, 80)}" fill="none" stroke="#BFE3C8" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></g>`,
];
QO.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend',
  `<div class="opt" id="o${i}" style="left:${M.col(i * 4)}px"><div class="bg"></div><div class="lt">${'ABC'[i]}</div><div class="ok">${M.icon('check', 30, C.leaf, 3)}</div>
   <svg class="art" width="200" height="200" viewBox="0 0 200 200">${qArt[i]}</svg><div class="ot h">${o}</div></div>`));
$('#takeI').innerHTML = `<g transform="translate(32 20) rotate(-12)"><path d="${mitoPath(60, 30)}" fill="${C.leaf}"/><path d="${cristae(60, 30)}" fill="none" stroke="#BFE3C8" stroke-width="3" stroke-linejoin="round"/></g>`;

/* ---------- helpers ---------- */
const caps = M.captions($('#cap'), M.CUES.order);
const zf = t => 2 * M.io((t - tZ) / ZD);
let geo = null;
function measure() { const w = $('#title').offsetWidth; geo = { sx: 960 - w / 2, sy: 448, ex: 160, ey: 150, es: 0.46, cw: $('#eyebrow').offsetWidth }; }
const zoomEl = $('#zoom');
zoomEl.style.clipPath = 'inset(250px 160px 210px 160px round 40px)';

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const scene = t < tShut;

  // --- title -> header ---
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es})` : `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY, out: tShut - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(368, 96, m).toFixed(2) + 'px';
  M.vis(ey, t, 0.1, tShut - 0.05, { dy: 18, outDur: 0.01 });
  M.rise($('#sub'), t, 1.2, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });

  // --- powers-of-ten zoom: leaf -> tissue -> one cell ---
  M.hide(zoomEl, !scene);
  const z = zf(t);
  // leaf layer
  const lv = M.vis($('#leafS'), t, tLeaf, 1e9, { dy: 0, sc: 0.94, sp: M.SOFT });
  const ls = Math.pow(K, z), mv = M.io(Math.min(z, 1)), Pz = [M.lerp(PL[0], F[0], mv), M.lerp(PL[1], F[1], mv)];
  const ltr = z <= 0 ? '' : `translate(${Pz[0].toFixed(2)} ${Pz[1].toFixed(2)}) scale(${ls.toFixed(5)}) translate(${(-PL[0]).toFixed(2)} ${(-PL[1]).toFixed(2)})`;
  $('#leafG').setAttribute('transform', ltr);
  // tissue is revealed only inside the leaf outline until the leaf fills the frame
  // the lens grows with the zoom; tissue shows only inside it until it fills the frame
  const lr = 54 * ls * (1 + 3 * M.clamp(z)) , lens = $('#lens');
  lens.setAttribute('cx', Pz[0].toFixed(2)); lens.setAttribute('cy', Pz[1].toFixed(2)); lens.setAttribute('r', lr.toFixed(2));
  lens.setAttribute('stroke-width', (5 + 4 * M.clamp(z)).toFixed(2));
  if (lr < 1100) { const c = $('#lcp'); c.setAttribute('cx', Pz[0].toFixed(2)); c.setAttribute('cy', Pz[1].toFixed(2)); c.setAttribute('r', lr.toFixed(2)); $('#tisC').setAttribute('clip-path', 'url(#lclip)'); }
  else $('#tisC').removeAttribute('clip-path');
  if (z <= 0) M.draw($('#lens'), t, tLens, 0.4, M.o3); else { $('#lens').style.strokeDasharray = ''; $('#lens').style.strokeDashoffset = ''; $('#lens')._L = null; M.hide($('#lens'), false); }
  M.hide($('#leafS'), lr >= 1100 || t < tLeaf); M.hide($('#lensS'), lr >= 1100 || t < tLens);
  // tissue layer (fades in above the opaque leaf, then neighbours fade away)
  const tsv = z > 0.02 ? 1 : 0, nb = 1 - M.clamp((z - 1.45) / 0.3);
  const tis = $('#tissue'); M.hide(tis, tsv <= 0); tis.style.opacity = tsv >= 1 ? '' : tsv.toFixed(3);
  const ts = Math.pow(K, z - 2);
  $('#tisG').setAttribute('transform', z >= 2 ? '' : `translate(${F[0]} ${F[1]}) scale(${ts.toFixed(5)}) translate(${-F[0]} ${-F[1]})`);
  const tnEl = $('#tisN'); M.hide(tnEl, nb <= 0); tnEl.style.opacity = nb >= 1 ? '' : nb.toFixed(3);
  // breathing membrane (slow, tiny, deterministic)
  const bp = t > tZ + ZD ? 0.006 * M.clamp((t - tZ - ZD) / 1.2) : 0;
  const pts = bp ? breathe(cellPts, F[0], F[1], bp, t * 1.3) : cellPts, d = smooth(pts);
  cellFill.setAttribute('d', d); cellMem.setAttribute('d', d);
  cellIn.setAttribute('d', smooth(breathe(pts, F[0], F[1], 0, 0).map(([x, y]) => [F[0] + (x - F[0]) * 0.965, F[1] + (y - F[1]) * 0.965])));

  // --- part emphasis (by colour, never transparency) ---
  const act = i => M.io((t - tAct[i]) / 0.3) * (1 - M.io((t - (tAct[i + 1] ?? tAllOn)) / 0.3));
  const dimOf = i => { let any = 0; for (let k = 0; k < 3; k++) any = Math.max(any, act(k)); return M.clamp(any - act(i)) * 0.6; };
  const dm = dimOf(0), dn = dimOf(1), dmi = dimOf(2);
  cellMem.setAttribute('stroke', M.mix(C.leaf, '#B9D9C1', dm)); cellMem.setAttribute('stroke-width', (14 + 4 * act(0)).toFixed(2));
  nuc.setAttribute('fill', M.mix(C.plum, '#D9C3D2', dn)); nuc.setAttribute('stroke', M.mix(C.plumD, '#CDB2C6', dn)); nucl.setAttribute('fill', M.mix(C.plumD, '#CDB2C6', dn));
  mitos.forEach((g, k) => { g.children[0].setAttribute('fill', M.mix(C.leaf, '#C6DFC5', dmi)); g.children[0].setAttribute('stroke', M.mix(C.leafD, '#B5D3B6', dmi)); g.children[1].setAttribute('stroke', M.mix('#BFE3C8', '#E3EFDF', dmi)); });

  // --- leaders + labels ---
  PARTS.forEach((p, i) => {
    M.draw($('#ld' + i), t, p.tn, 0.5, M.o3);
    const an = $('#la' + i), ap = M.spring(t - p.tn, M.POP);
    M.hide(an, t < p.tn || !scene); an.setAttribute('r', (8 * ap).toFixed(2));
    if (!scene) M.hide($('#ld' + i), true);
    const lb = $('#lb' + i); M.hide(lb, !scene);
    M.rise($('#ln' + i), t, p.tn + 0.25, { st: 0.06 });
    M.rise($('#lds' + i), t, p.td, { st: 0.03 });
    const a = act(i), on = t >= p.tn;
    const nc = M.mix(C.ink2, C.ink, a), dc = M.mix(C.muted, C.ink2, a);
    $('#ln' + i).style.color = nc; $('#lds' + i).style.color = dc;
    $('#ld' + i).setAttribute('stroke', M.mix(C.dim, C.ink, Math.max(a, t < tAct[0] ? 1 : 0)));
    an.setAttribute('stroke', M.mix(C.dim, C.ink, a));
  });

  // --- microscope iris ---
  const cl = M.io((t - tSweep) / 0.5), op = M.io((t - tOpen) / 0.6);
  const Rmax = 1180, r = cl < 1 ? Rmax * (1 - cl) : Rmax * op;
  const ic = cl < 1 ? [M.lerp(960, MITO[0][0], cl), M.lerp(540, MITO[0][1], cl)] : [960, 540];
  M.hide($('#iris'), cl <= 0 || op >= 1);
  if (cl > 0 && op < 1) {
    $('#irisP').setAttribute('d', `M-20 -20 H1940 V1100 H-20Z M${(ic[0] + r).toFixed(2)} ${ic[1].toFixed(2)} A${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(ic[0] - r).toFixed(2)} ${ic[1].toFixed(2)} A${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(ic[0] + r).toFixed(2)} ${ic[1].toFixed(2)}Z`);
    const ring = $('#irisR'); ring.setAttribute('cx', ic[0].toFixed(2)); ring.setAttribute('cy', ic[1].toFixed(2)); ring.setAttribute('r', Math.max(0, r + 8).toFixed(2)); M.hide(ring, r < 2);
  }

  // --- quick check ---
  const qon = t >= tShut; M.hide($('#quiz'), !qon);
  if (qon) {
    M.vis($('#qchip'), t, tQ, 1e9, { dy: 16 });
    M.rise($('#qq'), t, tQ + 0.08, { st: 0.06, sp: M.HEAVY });
    const rr = M.io((t - tAns) / 0.3);
    QO.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 0.4 + i * 0.1, 1e9, { dy: 40 });
      const right = i === 2, bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.card, C.ink, rr) : M.mix(C.card, '#E6EDE2', rr);
      bg.style.borderColor = right ? M.mix(C.line, C.ink, rr) : M.mix(C.line, '#E0E8DC', rr);
      el.querySelector('.ot').style.color = right ? M.mix(C.ink, '#FFFFFF', rr) : M.mix(C.ink, C.dim, rr);
      const lt = el.querySelector('.lt'); lt.style.background = right ? M.mix(C.sage, C.leaf, rr) : M.mix(C.sage, '#DCE5D7', rr); lt.style.color = right ? M.mix(C.ink, '#FFFFFF', rr) : M.mix(C.ink, C.dim, rr);
      el.querySelector('.art').style.filter = !right && rr > 0 ? `grayscale(${rr.toFixed(2)}) contrast(${(1 - 0.55 * rr).toFixed(3)}) brightness(${(1 + 0.3 * rr).toFixed(3)})` : '';
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) el.style.transform = `scale(${(1 + 0.03 * Math.sin(Math.PI * (t - tAns) / 0.45)).toFixed(4)})`;
    });
    const u = M.clamp((t - tCount) / (tAns - tCount));
    M.vis($('#ring'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.vis($('#ringN'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    M.drawU($('#ringA'), 1 - u); M.hide($('#ringA'), t < tCount - 0.15 || t > tAns + 0.3);
    M.setT($('#ringN'), String(Math.max(1, 3 - Math.floor(u * 3))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 40 });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.045 });
  }
  caps(t);
});

/* ---------- sound: bubble, swish, soft pop, chime, correct ---------- */
M.sfx(0.12, 'swish', 0.35); M.sfx(0.3, 'bubble:1', 0.3);
M.sfx(tMorph, 'swish', 0.45); M.sfx(tLeaf, 'pop', 0.22); M.sfx(tLens, 'bubble:2', 0.35);
M.sfx(tZ + 0.2, 'whoosh', 0.35); M.sfx(tZ + ZD - 0.2, 'bubble:4', 0.3);
PARTS.forEach((p, i) => { M.sfx(p.tn, 'pop', 0.25, 0.3); M.sfx(p.tn + 0.25, 'bubble:' + (5 + i), 0.25, 0.3); M.sfx(p.td, 'swish', 0.2, 0.3); });
M.sfx(tSweep + 0.1, 'swish', 0.45); M.sfx(tShut, 'bubble:8', 0.35); M.sfx(tOpen + 0.1, 'swish', 0.35);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'pop', 0.3));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tTake, 'chime', 0.3);
M.outro({ bg: '#173A2C', ink: '#EEF3EA', accent: '#4FA36A', sub: 'rgba(238,243,234,.65)', font: 'Lexend' });
})();
