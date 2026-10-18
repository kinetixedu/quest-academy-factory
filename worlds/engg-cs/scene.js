// Engg CS world sample - The fetch-decode-execute cycle (Under the hood)
(() => {
const { $ } = M;
const C = { bg: '#0A1022', pan: '#101A33', pan2: '#0D1630', ln: '#22305A', cy: '#38D9F5', cyd: '#123A52', trA: '#1D5B78', tx: '#FFFFFF', mut: '#6F7FA6', dim: '#3A4A75', ink: '#C9D3EC' };
const wt = M.wt;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.2, tMorph = M.t0('H2') + 0.02;
const tCPU = wt('H2', 'CPU'), tRep = wt('H2', 'repeats'), tThree = wt('H2', 'three');
const tF = M.t0('X1') - 0.05, tGrab = wt('X1', 'grabs'), tNext = wt('X1', 'next'), tIns = wt('X1', 'instruction'), tFrom = wt('X1', 'from'), tMem = wt('X1', 'memory');
const tD = M.t0('X2') - 0.05, tWorks = wt('X2', 'works'), tWhat = wt('X2', 'what'), tThe = wt('X2', 'the'), tIns2 = wt('X2', 'instruction'), tMeans = wt('X2', 'means');
const tE = M.t0('X3') - 0.05, tDoes = wt('X3', 'does'), tWork = wt('X3', 'work'), tThen = wt('X3', 'then'), tStarts = wt('X3', 'starts'), tAgain = wt('X3', 'again');
const tSweep = M.t1('X3') + 0.1, tScanEnd = tSweep + 0.6, tQ = tSweep + 0.12;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'Then');

/* ---------- build ---------- */
const ROWS = [['0x00', 'LOAD R1, 7'], ['0x01', 'ADD R1, 5'], ['0x02', 'STORE R1'], ['0x03', 'JUMP 0x00'], ['0x04', '0000'], ['0x05', '0000']];
ROWS.forEach((r, k) => $('#rows').insertAdjacentHTML('beforeend', `<div class="row" id="r${k}" style="top:${80 + k * 72}px"><div class="bar"></div><div class="ad">${r[0]}</div><div class="in">${r[1]}</div></div>`));
// traces in stage coordinates (blocks: mem x160-536, PC 736-1012 y362-462, IR 1044-1320, CU y494-650, ALU 736-1012 y682-798, R1 1044-1320)
const TR = {
  addr: 'M736 412 H536',              // PC -> memory
  data: 'M536 478 H1182 V462',        // memory -> IR (runs in the gutter under PC)
  dec: 'M1280 462 V494',              // IR -> control unit
  alu: 'M874 650 V682',               // control unit -> ALU
  res: 'M1012 740 H1044',             // ALU -> R1
};
let sv = '';
Object.entries(TR).forEach(([k, d]) => { sv += `<path class="tr" id="tr_${k}" d="${d}"/><path class="lit" id="pk_${k}" d="${d}"/>`; });
// pads at every trace end
const PADS = [[736, 412], [536, 412], [536, 478], [1182, 462], [1280, 462], [1280, 494], [874, 650], [874, 682], [1012, 740], [1044, 740]];
PADS.forEach(([x, y], i) => { sv += `<rect id="pad${i}" x="${x - 5}" y="${y - 5}" width="10" height="10" fill="${C.ln}"/>`; });
$('#outl').innerHTML = sv;
// cycle ring: 3 arcs around (188, 222) r=120, 12 deg gaps, arrow tip on each
const RC = [188, 222], RR = 122;
const pt = a => [RC[0] + RR * Math.cos(a * Math.PI / 180), RC[1] + RR * Math.sin(a * Math.PI / 180)];
let rg = `<circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}" fill="none" stroke="#16224A" stroke-width="2"/>`;
[0, 1, 2].forEach(k => {
  const a0 = -90 + k * 120 + 7, a1 = -90 + (k + 1) * 120 - 7, [x0, y0] = pt(a0), [x1, y1] = pt(a1);
  rg += `<path id="arc${k}" d="M${x0.toFixed(2)} ${y0.toFixed(2)} A${RR} ${RR} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}" fill="none" stroke="${C.ln}" stroke-width="12" stroke-linecap="butt"/>`;
});
rg += `<g id="tok"><rect x="-9" y="${-RR - 9}" width="18" height="18" fill="${C.cy}"/></g>`;
$('#ring').innerHTML = rg;
const STEP = ['FETCH', 'DECODE', 'EXECUTE'];
STEP.forEach((s, k) => $('#steps').insertAdjacentHTML('beforeend', `<div class="st" id="st${k}" style="top:${k * 36}px"><i></i>0${k + 1} ${s}</div>`));
const OPTS = [['Fetch', 'arrowD'], ['Decode', 'code'], ['Execute', 'zap']];
OPTS.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${M.col(i * 3)}px"><div class="bg"></div><div class="ix">0${i + 1}</div><div class="ic"><span class="ico"></span></div><div class="ot h">${o[0]}</div><div class="ok">${M.icon('check', 28, C.bg, 3)}</div></div>`));
$('#takeI').innerHTML = M.icon(['M21 12a9 9 0 1 1-3-6.7', 'M21 4v5h-5'], 44, C.cy, 2.4);

/* ---------- helpers ---------- */
const caps = M.captions($('#cap'), M.CUES.order);
let geo = null;
const measure = () => { geo = {}; };
const px = v => Math.round(v * 100) / 100;
// a packet: bright 44px segment travelling the whole path in dur seconds
const packet = (k, t, a, dur = 0.5) => {
  const el = $('#pk_' + k); if (el._L == null) el._L = el.getTotalLength();
  const L = el._L, u = M.io((t - a) / dur);
  if (t < a || u >= 1) { M.hide(el, true); return; }
  M.hide(el, false);
  el.style.strokeDasharray = `44 ${L + 88}`; el.style.strokeDashoffset = (44 - u * (L + 44)).toFixed(2);
};
// lit state of a box: border + label colour
const lightBox = (id, v) => {
  const b = $(id); b.style.borderColor = M.mix(C.ln, C.cy, v); b.querySelector('.lab').style.color = M.mix(C.mut, C.cy, v);
};
const on = (t, a, b) => M.io((t - a) / 0.25) * (1 - M.io((t - b) / 0.35));
const stepNow = t => (t < tD ? 0 : t < tE ? 1 : t < tStarts ? 2 : 3);
// typed text, one character per 34 ms (deterministic)
const type = (el, t, a, s, cps = 30) => { const n = M.clamp(Math.floor((t - a) * cps) + 1, 0, s.length); M.setT(el, t < a ? '' : s.slice(0, n)); return n; };

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- title card -> header ---
  const m = M.spring(t - tMorph, M.HEAVY);
  const ti = $('#title');
  const y = M.lerp(396, 146, m), s = M.lerp(1, 64 / 140, m);
  ti.style.transform = m >= 1 ? 'translate(160px,146px) scale(0.4571)' : `translate(160px,${px(y)}px) scale(${s.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY, rot: 0 });
  const ey = $('#eyebrow'); ey.style.left = '160px'; ey.style.top = px(M.lerp(316, 96, m)) + 'px';
  M.vis(ey, t, 0.1, 1e9, { dy: 16 });
  M.rise($('#sub'), t, 0.85, { st: 0.035, rot: 0, out: tMorph - 0.1, outDur: 0.3 });
  const tr = $('#tread'); M.vis(tr, t, 1.2, tMorph - 0.1, { dy: 0, fade: 0.25, outDur: 0.3 });
  tr.style.clipPath = t < tMorph ? `inset(0 ${px(1600 * (1 - M.o5((t - 1.2) / 0.8)))}px 0 0)` : '';

  // --- concept scene (old) : clipped from the top by the scan line ---
  const scanY = 1080 * M.io((t - tSweep) / 0.6);
  const old = $('#old');
  M.hide(old, t >= tScanEnd);
  old.style.clipPath = t > tSweep ? `inset(${px(scanY)}px 0 0 0)` : '';
  if (t < tScanEnd) {
    M.vis($('#mem'), t, tMorph + 0.25, 1e9, { dy: 30 });
    M.vis($('#cpu'), t, tCPU - 0.05, 1e9, { dy: 30 });
    M.vis($('#cyc'), t, tRep, 1e9, { dy: 30 });
    ROWS.forEach((r, k) => M.vis($('#r' + k), t, tMorph + 0.4 + k * 0.05, 1e9, { dy: 14, sp: M.SNAP }));
    ['#bPC', '#bIR', '#bCU', '#bALU', '#bR1'].forEach((id, i) => M.vis($(id), t, tCPU + 0.1 + i * 0.06, 1e9, { dy: 14, sp: M.SNAP }));
    // traces + pads draw on with the CPU
    Object.keys(TR).forEach((k, i) => M.draw($('#tr_' + k), t, tCPU + 0.35 + i * 0.06, 0.4, M.o3));
    PADS.forEach((p, i) => M.hide($('#pad' + i), t < tCPU + 0.4 + Math.floor(i / 2) * 0.06));
    M.vis($('#lA'), t, tCPU + 0.6, 1e9, { dy: 8 }); M.vis($('#lD'), t, tCPU + 0.66, 1e9, { dy: 8 });

    // ----- states -----
    const st = stepNow(t);
    // PC
    const pcA = on(t, tGrab, tFrom) + on(t, tThen, tStarts + 0.6);
    lightBox('#bPC', pcA);
    M.setT($('#pcV'), t < tThen + 0.12 ? '0x01' : '0x02');
    $('#pcV').style.color = M.mix(C.ink, C.tx, pcA);
    // address packet PC -> memory, then data packet memory -> IR
    packet('addr', t, tNext - 0.15, 0.45);
    packet('data', t, tFrom - 0.05, 0.55);
    // trace tint while its step is active
    const tint = (k, a, b) => { const v = on(t, a, b); $('#tr_' + k).style.stroke = M.mix(C.ln, C.trA, v); };
    tint('addr', tNext - 0.15, tD); tint('data', tFrom - 0.05, tD); tint('dec', tWorks - 0.2, tE); tint('alu', tDoes - 0.2, tStarts); tint('res', tWork - 0.2, tStarts);
    // memory rows: the addressed row lights on "instruction", the next row after "starts"
    ROWS.forEach((r, k) => {
      const el = $('#r' + k);
      const v = k === 1 ? on(t, tIns, tStarts) : k === 2 ? on(t, tStarts, 1e9) : 0;
      el.style.background = M.mix(C.pan2, C.cyd, v);
      el.querySelector('.bar').style.background = M.mix(C.ln, C.cy, v);
      el.querySelector('.in').style.color = M.mix(C.ink, C.cy, v);
      el.querySelector('.ad').style.color = M.mix(C.mut, C.cy, v);
    });
    // IR fills when the data packet lands
    const irA = on(t, tMem - 0.05, tE);
    lightBox('#bIR', irA);
    const irT = tMem - 0.05;
    if (t < irT) M.setT($('#irV'), '----'); else type($('#irV'), t, irT, 'ADD R1, 5');
    $('#irV').style.color = t < irT ? C.dim : M.mix(C.ink, C.tx, irA);
    packet('dec', t, tWorks - 0.2, 0.3);
    // control unit decodes into three chips with plain meanings
    lightBox('#bCU', on(t, tWorks, tE));
    [[tWhat, '#d0', '#p0'], [tThe, '#d1', '#p1'], [tIns2, '#d2', '#p2']].forEach(([a, d, p], i) => {
      M.vis($(d), t, a, 1e9, { dy: 12, sp: M.SNAP, fade: 0.08 });
      M.vis($(p), t, tMeans - 0.1 + i * 0.12, 1e9, { dy: 8 });
      const act = on(t, a, tE);
      $(d).style.background = M.mix(C.pan, C.cyd, act); $(d).style.color = M.mix(C.ink, C.cy, act);
    });
    // execute: ALU computes, result written to R1
    packet('alu', t, tDoes - 0.2, 0.3);
    const aluA = on(t, tDoes, tStarts);
    lightBox('#bALU', aluA);
    const aV = $('#aluV');
    if (t < tDoes) { M.setT(aV, 'idle'); aV.style.color = C.dim; }
    else { M.setT(aV, t < tWork ? '7 + 5' : '7 + 5 = 12'); aV.style.color = M.mix(C.ink, C.tx, aluA); }
    packet('res', t, tWork - 0.1, 0.25);
    const r1A = on(t, tWork + 0.1, tStarts + 0.4);
    lightBox('#bR1', r1A);
    const r1 = $('#r1V');
    if (t < tWork + 0.1) M.setT(r1, '7'); else M.count(r1, t, tWork + 0.1, 0.35, 7, 12);
    r1.style.color = M.mix(C.ink, C.cy, r1A);
    // pads glow with their trace while packets pass
    const padOn = [[0, 1, tNext - 0.15, tD], [2, 3, tFrom - 0.05, tD], [4, 5, tWorks - 0.2, tE], [6, 7, tDoes - 0.2, tStarts], [8, 9, tWork - 0.1, tStarts]];
    padOn.forEach(([a, b, s0, s1]) => { const c = M.mix(C.ln, C.cy, on(t, s0, s1)); $('#pad' + a).setAttribute('fill', c); $('#pad' + b).setAttribute('fill', c); });

    // ----- cycle ring -----
    [0, 1, 2].forEach(k => {
      const lit = (st === k) ? 1 : 0;
      const a = [tF, tD, tE][k], v = st === 3 ? (k === 0 ? M.io((t - tStarts) / 0.3) : 0) : M.io((t - a) / 0.3) * lit;
      M.draw($('#arc' + k), t, tThree + k * 0.12, 0.35, M.o3);
      $('#arc' + k).setAttribute('stroke', M.mix(C.ln, C.cy, v));
      const se = $('#st' + k); M.vis(se, t, tThree + k * 0.12, 1e9, { dy: 10, sp: M.SNAP });
      se.style.color = M.mix(C.dim, C.cy, v); se.querySelector('i').style.background = M.mix(C.ln, C.cy, v);
    });
    // token travels around the ring (always clockwise), lands at each arc start
    const rot = M.track(-60, [[tF, 7, M.SOFT], [tD, 127, M.SOFT], [tE, 247, M.SOFT], [tStarts, 367, M.SOFT]])(t);
    const tok = $('#tok'); M.hide(tok, t < tF - 0.2);
    tok.setAttribute('transform', `translate(${RC[0]} ${RC[1]}) rotate(${(Math.abs(rot - Math.round(rot)) < 0.01 ? Math.round(rot) : rot).toFixed(2)})`);
    const nm = ['Fetch', 'Decode', 'Execute', 'Fetch'][st];
    const tSt = [tF, tD, tE, tStarts][st];
    M.setT($('#ringN'), st === 3 ? 'AGAIN' : `STEP ${st + 1} OF 3`);
    M.setT($('#ringT'), t < tF ? 'Ready' : nm);
    M.vis($('#ringN'), t, tThree, 1e9, { dy: 8 });
    const rT = $('#ringT');
    if (t >= tF) M.vis(rT, t, tSt, 1e9, { dy: 14, sp: M.SNAP, fade: 0.08 }); else M.vis(rT, t, tThree + 0.2, 1e9, { dy: 10 });
    rT.style.color = t < tF ? C.mut : C.tx;
    M.vis($('#cycN'), t, tThree + 0.4, 1e9, { dy: 8 });
    M.setT($('#cycC'), t < tStarts ? '0001' : '0002');
  }

  // --- scan line transition: sweeps down, wipes the old scene, quiz boots below ---
  const sc = $('#scan'), sb = $('#scanB');
  const vis = t > tSweep && t < tScanEnd + 0.15;
  M.hide(sc, !vis); M.hide(sb, !vis);
  if (vis) {
    const yy = Math.round(scanY);
    sc.style.transform = `translateY(${yy - 2}px)`; sb.style.transform = `translateY(${yy}px)`;
    const f = 1 - M.clamp((t - tScanEnd) / 0.15); sc.style.opacity = f.toFixed(3); sb.style.opacity = f.toFixed(3);
  }

  // --- quick check ---
  const qon = t >= tQ; M.hide($('#quiz'), !qon);
  $('#quiz').style.clipPath = t > tSweep && t < tScanEnd ? `inset(0 0 ${px(1080 - scanY)}px 0)` : '';
  if (qon) {
    M.vis($('#qchip'), t, tQ, 1e9, { dy: 0, fade: 0.06 });
    // boot: question types in like a terminal line
    const qq = $('#qq'), full = 'Which step reads the instruction from memory?';
    type(qq, t, tQ + 0.12, full, 70);
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 0.35 + i * 0.08, 1e9, { dy: 24, sp: M.SNAP });
      const r = M.io((t - tAns) / 0.28), right = i === 0;
      const bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.pan, C.cyd, r) : C.pan;
      bg.style.borderColor = right ? M.mix(C.ln, C.cy, r) : C.ln;
      el.querySelector('.ot').style.color = right ? C.tx : M.mix(C.tx, C.dim, r);
      el.querySelector('.ix').style.color = right ? M.mix(C.mut, C.cy, r) : M.mix(C.mut, C.dim, r);
      const col = right ? (t >= tAns ? C.cy : C.ink) : (t >= tAns ? C.dim : C.ink);
      const ico = el.querySelector('.ico'); if (ico._c !== col) { ico._c = col; ico.innerHTML = M.icon(o[1], 44, col, 2); }
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.08, 1e9, { dy: 0, sc: 0.4, sp: M.SNAP, fade: 0.06 }); else M.hide(ok, true);
    });
    // countdown panel: 3 2 1 with three segments draining
    const cdP = $('#cd'); M.vis(cdP, t, tQ + 0.59, 1e9, { dy: 24, sp: M.SNAP });
    const u = M.clamp((t - tCount) / (tAns - tCount)), step = Math.min(2, Math.floor(u * 3));
    const counting = t >= tCount && t < tAns;
    M.setT($('#cdl'), t < tCount ? 'THINK' : t < tAns ? 'ANSWER IN' : 'ANSWER');
    M.setT($('#cdn'), t < tCount ? '?' : t < tAns ? String(3 - step) : '01');
    $('#cdn').style.color = t >= tAns ? C.cy : C.tx;
    [...$('#cdseg').children].forEach((b, k) => {
      const c = !counting ? (t >= tAns ? C.cy : C.ln) : (k < 3 - step ? C.cy : C.ln);
      if (b._c !== c) { b._c = c; b.style.background = c; }
    });
    cdP.querySelector('.lab').style.color = t >= tAns ? C.cy : C.mut;
    M.vis($('#take'), t, tTake, 1e9, { dy: 24, sp: M.SOFT });
    M.rise($('#takeT'), t, tTake + 0.08, { st: 0.04, rot: 0 });
  }
  caps(t);
});

/* ---------- sound ---------- */
M.sfx(0.2, 'blip', 0.35); M.sfx(tMorph, 'swish', 0.35);
M.sfx(tCPU, 'hum', 0.12); M.sfx(tCPU + 0.35, 'tick', 0.3);
[0, 1, 2].forEach(k => M.sfx(tThree + k * 0.12, 'tick', 0.3, -0.1 + k * 0.1));
M.sfx(tF, 'blip', 0.35, 0.4); M.sfx(tNext - 0.15, 'zap', 0.18, -0.3); M.sfx(tFrom - 0.05, 'zap', 0.18, -0.1); M.sfx(tMem, 'tick', 0.35);
M.sfx(tD, 'blip', 0.35, 0.4); M.sfx(tWorks - 0.2, 'zap', 0.15); [tWhat, tThe, tIns2].forEach((a, i) => M.sfx(a, 'tick', 0.3, -0.1 + i * 0.1));
M.sfx(tE, 'blip', 0.35, 0.4); M.sfx(tDoes - 0.2, 'zap', 0.15); M.sfx(tWork + 0.1, 'tick', 0.4); M.sfx(tStarts, 'blip', 0.4, 0.4);
M.sfx(tSweep, 'zap', 0.2); M.sfx(tSweep + 0.05, 'hum', 0.1); M.sfx(tQ + 0.12, 'tick', 0.25);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.5));
M.sfx(tAns + 0.04, 'correct', 0.55); M.sfx(tTake, 'blip', 0.3);
M.outro({ bg: '#0A1022', ink: '#FFFFFF', accent: '#38D9F5', sub: 'rgba(255,255,255,.6)', font: 'IBM Plex Sans' });
})();
