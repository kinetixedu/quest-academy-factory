// Engineering Chemical world sample - Distillation (Process plant P&ID)
(() => {
const { $ } = M;
const C = { slate: '#2C3A47', slate2: '#56677A', muted: '#7F8FA0', dim: '#B4C0CB', line: '#D3DCE4', bg: '#EEF2F5', card: '#FFFFFF', chan: '#F4F7F9', cyan: '#19B5C9', cyanD: '#0E97A9', cyan2: '#D2F0F4', sea: '#5FB3C1', salt: '#A3AFBA', steam: '#DCE4EA', heat: '#FF7A1A', heat2: '#FFB271' };
const wt = M.wt;

/* ---------- beats ---------- */
const tTitle = 0.25, tMorph = M.t0('H2') + 0.02;
const tBuild = wt('H2', 'use') - 0.25, tFill = wt('H2', 'distillation');
const tS1 = M.t0('S1'), tHeat = wt('S1', 'heat'), tBoil = wt('S1', 'boils');
const tS2 = M.t0('S2'), tSteam = wt('S2', 'steam'), tSalt = wt('S2', 'salt');
const tS3 = M.t0('S3'), tCool = wt('S3', 'cools'), tCond = wt('S3', 'condenser'), tTurns = wt('S3', 'turns'), tPure = wt('S3', 'pure');
const tSweep = M.t1('S3') + 0.08, tCover = tSweep + 0.92, tOpen = tCover + 0.08, tQ = tCover + 0.1;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'It');

/* ---------- plant geometry ---------- */
const B = { x: 200, y: 360, w: 280, h: 280, r: 56 };          // T-101 boiler
const E = { x: 800, y: 270, w: 440, h: 96 };                  // E-201 condenser shell
const R = { x: 1400, y: 450, w: 360, h: 240, r: 48 };         // T-301 collector
const GY = 720, PY = 318;
const LV0 = 470, LV1 = 548;                                    // boiler level: start / after boiling
const pA = `M420 ${B.y + 4} V${PY} H${E.x}`;                   // vapour main
let coil = `M${E.x} ${PY}`; for (let k = 1; k <= 64; k++) { const x = E.x + E.w * k / 64; coil += ` L${x.toFixed(1)} ${(PY + 26 * Math.sin(k / 64 * Math.PI * 8)).toFixed(1)}`; }
const pC = `M${E.x + E.w} ${PY} H1700 V${R.y + 4}`;            // condensate line
const cwIn = `M880 440 V${E.y + E.h}`, cwOut = `M1170 ${E.y} V214`;
const vessel = (v) => `<rect x="${v.x}" y="${v.y}" width="${v.w}" height="${v.h}" rx="${v.r}" ry="${v.r}"`;
const puff = (s) => `<g class="pf"><circle cx="${-9 * s}" cy="${3 * s}" r="${9 * s}"/><circle cx="${8 * s}" cy="${4 * s}" r="${8 * s}"/><circle cx="0" cy="${-5 * s}" r="${10 * s}"/></g>`;
const flame = (x, k) => `<g id="fl${k}" transform="translate(${x} 704)"><path d="M0 0 C-16 0 -18 -18 -10 -30 C-6 -36 -2 -42 0 -50 C4 -40 16 -30 16 -16 C16 -6 10 0 0 0Z" fill="${C.heat}"/><path d="M0 0 C-7 0 -8 -9 -4 -15 C-2 -19 0 -22 0 -26 C3 -20 8 -14 8 -8 C8 -3 5 0 0 0Z" fill="${C.heat2}"/></g>`;
const r = M.rng(11), GR = Array.from({ length: 12 }, (_, i) => ({ x: B.x + 40 + (i % 6) * 38 + r() * 14, y: LV0 + 62 + Math.floor(i / 6) * 34 + r() * 14, fx: B.x + 30 + i * 18.3 + r() * 4, fy: 622 - (i % 2) * 9 }));
const BUB = [[272, 0], [338, 0.37], [404, 0.71], [318, 0.55]];
const PUFF = [[276, 0, 1.1], [350, 0.33, 1.3], [418, 0.66, 1.0], [316, 0.85, 1.2]];

const pipe = (id, d, ow = 26, iw = 14) => `<path id="${id}O" d="${d}" fill="none" stroke="${C.slate}" stroke-width="${ow}" stroke-linecap="round" stroke-linejoin="round"/><path id="${id}I" d="${d}" fill="none" stroke="${C.chan}" stroke-width="${iw}" stroke-linecap="round" stroke-linejoin="round"/>`;
// a medium in a pipe: filled channel + moving dashes, both revealed by a travelling front (mask)
const medium = (id, d, fill, dash, iw = 14) => `<mask id="${id}M" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080"><path id="${id}F" d="${d}" fill="none" stroke="#fff" stroke-width="${iw + 2}" stroke-linecap="round" stroke-linejoin="round"/></mask>
  <g mask="url(#${id}M)"><path d="${d}" fill="none" stroke="${fill}" stroke-width="${iw}" stroke-linecap="round" stroke-linejoin="round"/><path id="${id}D" d="${d}" fill="none" stroke="${dash}" stroke-width="${iw - 6}" stroke-linecap="round" stroke-dasharray="10 24"/></g>`;

$('#plant').innerHTML = `<defs>
  <clipPath id="bClip"><rect x="${B.x + 3}" y="${B.y + 3}" width="${B.w - 6}" height="${B.h - 6}" rx="${B.r - 3}"/></clipPath>
  <clipPath id="rClip"><rect x="${R.x + 3}" y="${R.y + 3}" width="${R.w - 6}" height="${R.h - 6}" rx="${R.r - 3}"/></clipPath>
  <clipPath id="eClip"><rect x="${E.x + 3}" y="${E.y + 3}" width="${E.w - 6}" height="${E.h - 6}" rx="${E.h / 2 - 3}"/></clipPath></defs>
  <line id="gnd" x1="160" y1="${GY}" x2="1760" y2="${GY}" stroke="#C3CDD6" stroke-width="3" stroke-linecap="round"/>
  <g id="legs" stroke="${C.slate}" stroke-width="8" stroke-linecap="round"><path id="lg0" d="M${B.x + 22} 600 V${GY}"/><path id="lg1" d="M${B.x + B.w - 22} 600 V${GY}"/><path id="lg2" d="M${R.x + 40} 680 V${GY}"/><path id="lg3" d="M${R.x + R.w - 40} 680 V${GY}"/></g>
  <rect id="burner" x="${B.x + 40}" y="${GY - 14}" width="${B.w - 80}" height="12" rx="4" fill="${C.slate}"/>
  <g id="flames">${[280, 340, 400].map(flame).join('')}</g>
  ${pipe('cwi', cwIn, 16, 8)}${pipe('cwo', cwOut, 16, 8)}
  ${medium('cwiM', cwIn, C.cyan2, C.cyan, 8)}${medium('cwoM', cwOut, C.cyan2, C.cyan, 8)}
  ${pipe('pa', pA)}${pipe('pc', pC)}
  ${medium('stA', pA, C.steam, '#FFFFFF')}${medium('lqC', pC, C.cyan2, C.cyan)}
  <g id="bkV">${vessel(B)} fill="#FFFFFF"/></g>
  <g clip-path="url(#bClip)"><path id="sea" fill="${C.sea}"/><rect id="saltL" x="${B.x}" y="600" width="${B.w}" height="40" fill="${C.salt}"/>
    <g id="grains">${GR.map((g, i) => `<rect id="gr${i}" width="9" height="9" rx="2" fill="#7D8C99"/>`).join('')}</g>
    <g id="bubs">${BUB.map((b, i) => `<circle id="bu${i}" r="6" fill="none" stroke="#FFFFFF" stroke-width="3"/>`).join('')}</g>
    <g id="puffs" fill="#FFFFFF" stroke="${C.slate2}" stroke-width="3">${PUFF.map((p, i) => `<g id="pu${i}">${puff(p[2])}</g>`).join('')}</g></g>
  ${vessel(B)} id="bO" fill="none" stroke="${C.slate}" stroke-width="6"/>
  <rect id="eS" x="${E.x}" y="${E.y}" width="${E.w}" height="${E.h}" rx="${E.h / 2}" fill="#FFFFFF"/>
  <rect id="eW" x="${E.x}" y="${E.y}" width="${E.w}" height="${E.h}" rx="${E.h / 2}" fill="${C.cyan2}" clip-path="url(#eClip)"/>
  ${pipe('co', coil, 16, 8)}${medium('stB', coil, C.steam, '#FFFFFF', 8)}
  <rect id="eO" x="${E.x}" y="${E.y}" width="${E.w}" height="${E.h}" rx="${E.h / 2}" fill="none" stroke="${C.slate}" stroke-width="6"/>
  ${vessel(R)} fill="#FFFFFF"/>
  <g clip-path="url(#rClip)"><path id="pure" fill="${C.cyan}"/></g>
  ${vessel(R)} id="rO" fill="none" stroke="${C.slate}" stroke-width="6"/>`;

// tags + small labels
const TAGS = [{ id: 't0', x: B.x, y: 304, tg: 'T-101', nm: 'Boiler' }, { id: 't1', x: E.x, y: 214, tg: 'E-201', nm: 'Condenser' }, { id: 't2', x: R.x, y: 394, tg: 'T-301', nm: 'Collector' }];
TAGS.forEach(g => $('#tags').insertAdjacentHTML('beforeend', `<div class="tag" id="${g.id}" style="left:${g.x}px;top:${g.y}px"><b>${g.tg}</b><span>${g.nm}</span></div>`));
const LBL = [
  { id: 'lSea', x: B.x, w: B.w, y: 0, tx: 'SEA WATER', c: '#FFFFFF', center: true },
  { id: 'lSalt', x: B.x, w: B.w, y: 608, tx: 'SALT', c: '#FFFFFF', center: true },
  { id: 'lSteam', x: 560, y: 268, tx: 'STEAM', c: C.slate2 },
  { id: 'lCwi', x: 904, y: 424, tx: 'CW IN', c: C.cyanD },
  { id: 'lCwo', x: 1194, y: 204, tx: 'CW OUT', c: C.cyanD },
  { id: 'lPure', x: R.x, w: R.w, y: 636, tx: 'PURE WATER', c: '#FFFFFF', center: true },
];
LBL.forEach(l => $('#tags').insertAdjacentHTML('beforeend', `<div class="lbl" id="${l.id}" style="left:${l.x}px;top:${l.y}px;color:${l.c};${l.center ? `width:${l.w}px;text-align:center` : ''}">${l.tx}</div>`));
const STEPS = [{ n: '01', t: 'Heat', d: 'Water boils into steam' }, { n: '02', t: 'Rise', d: 'Salt stays behind' }, { n: '03', t: 'Cool', d: 'Steam turns to water' }];
STEPS.forEach((s, i) => $('#steps').insertAdjacentHTML('beforeend', `<div class="step" id="s${i}" style="left:${M.col(i * 4)}px;width:${M.span(4)}px"><div class="bg"></div><span class="n">${s.n}</span><span class="t">${s.t}</span><span class="d">${s.d}</span></div>`));
const tStep = [tS1, tS2, tS3], tStepEnd = 1e9;

// quiz: equipment cards
const art = [
  `<rect x="60" y="14" width="80" height="112" rx="22" fill="#fff" stroke="${C.slate}" stroke-width="5"/><path d="M63 70 H137 V104 Q137 123 118 123 H82 Q63 123 63 104Z" fill="${C.sea}"/><g transform="translate(100 160) scale(.62)"><path d="M0 0 C-16 0 -18 -18 -10 -30 C-6 -36 -2 -42 0 -50 C4 -40 16 -30 16 -16 C16 -6 10 0 0 0Z" fill="${C.heat}"/></g><rect x="70" y="160" width="60" height="6" rx="3" fill="${C.slate}"/>`,
  `<rect x="10" y="62" width="180" height="56" rx="28" fill="${C.cyan2}" stroke="${C.slate}" stroke-width="5"/><path d="${(() => { let d = 'M10 90'; for (let k = 1; k <= 40; k++) d += ` L${(10 + 180 * k / 40).toFixed(1)} ${(90 + 14 * Math.sin(k / 40 * Math.PI * 6)).toFixed(1)}`; return d; })()}" fill="none" stroke="${C.slate}" stroke-width="7" stroke-linejoin="round"/>`,
  `<rect x="60" y="30" width="80" height="112" rx="20" fill="#fff" stroke="${C.slate}" stroke-width="5"/><path d="M63 80 H137 V120 Q137 139 118 139 H82 Q63 139 63 120Z" fill="${C.cyan}"/><path d="M76 142 V166 M124 142 V166" stroke="${C.slate}" stroke-width="5" stroke-linecap="round"/>`,
];
const QO = [{ tg: 'T-101', nm: 'Boiler' }, { tg: 'E-201', nm: 'Condenser' }, { tg: 'T-301', nm: 'Collector' }];
QO.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="left:${M.col(i * 4)}px"><div class="bg"></div><div class="lt">${'ABC'[i]}</div><div class="ok">${M.icon('check', 28, C.cyanD, 3)}</div>
  <svg class="art" width="200" height="180" viewBox="0 0 200 180">${art[i]}</svg><div class="tg"><b>${o.tg}</b></div><div class="ot h">${o.nm}</div></div>`));
// pressure-gauge countdown
let gz = `<circle cx="72" cy="72" r="66" fill="#fff" stroke="${C.slate}" stroke-width="6"/>`;
for (let k = 0; k <= 12; k++) { const a = (-210 + k * 20) * Math.PI / 180, r0 = k % 4 ? 50 : 44; gz += `<line x1="${(72 + Math.cos(a) * r0).toFixed(2)}" y1="${(72 + Math.sin(a) * r0).toFixed(2)}" x2="${(72 + Math.cos(a) * 56).toFixed(2)}" y2="${(72 + Math.sin(a) * 56).toFixed(2)}" stroke="${k > 8 ? C.heat : C.slate2}" stroke-width="${k % 4 ? 3 : 4}" stroke-linecap="round"/>`; }
gz += `<g id="needle"><path d="M-4 0 L0 -46 L4 0Z" fill="${C.slate}"/></g><circle cx="72" cy="72" r="8" fill="${C.slate}"/><text id="gN" x="72" y="122" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="${C.slate}"></text>`;
$('#gauge').innerHTML = gz;
$('#takeI').innerHTML = `<line x1="14" y1="14" x2="58" y2="14" stroke="#4A5B6B" stroke-width="22" stroke-linecap="round"/><line x1="14" y1="14" x2="58" y2="14" stroke="${C.cyan}" stroke-width="9" stroke-linecap="round"/>`;
// transition pipe
$('#wipe').innerHTML = `<rect id="wpO" fill="${C.slate}"/><rect id="wpI" fill="${C.chan}"/><rect id="wpL" fill="${C.cyan}"/><rect id="wpT" fill="${C.cyan}"/><rect id="wpB" fill="${C.cyan}"/>`;

/* ---------- helpers ---------- */
const caps = M.captions($('#cap'), M.CUES.order);
let geo = null;
function measure() { const w = $('#title').offsetWidth; geo = { sx: 960 - w / 2, sy: 440, ex: 160, ey: 150, es: 0.46, cw: $('#eyebrow').offsetWidth }; }
const set = (el, k, v) => { if (el['_' + k] !== v) { el['_' + k] = v; el.setAttribute(k, v); } };
const surf = (x0, x1, lvl, bot, amp, ph) => { let d = ''; const n = 12; for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n; d += (k ? ' L' : 'M') + x.toFixed(1) + ' ' + (lvl + amp * Math.sin(ph + k * 0.9)).toFixed(2); } return d + ` L${x1} ${bot} L${x0} ${bot}Z`; };
const flow = (id, t, t0, speed = 90) => { const el = $('#' + id + 'D'); if (t < t0) return; el.style.strokeDashoffset = (-(t - t0) * speed % 34).toFixed(2); };
const front = (id, t, t0, dur) => M.drawU($('#' + id + 'F'), M.io((t - t0) / dur));
const DRAWN = ['paO', 'paI', 'pcO', 'pcI', 'coO', 'coI', 'cwiO', 'cwiI', 'cwoO', 'cwoI'];

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const scene = t < tCover;

  // --- title -> header ---
  const m = M.spring(t - tMorph, M.HEAVY), ti = $('#title');
  ti.style.transform = m >= 1 ? `translate(${geo.ex}px,${geo.ey}px) scale(${geo.es})` : `translate(${M.lerp(geo.sx, geo.ex, m).toFixed(2)}px,${M.lerp(geo.sy, geo.ey, m).toFixed(2)}px) scale(${M.lerp(1, geo.es, m).toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY, out: tCover - 0.05, outDur: 0.01 });
  const ey = $('#eyebrow');
  ey.style.left = M.lerp(960 - geo.cw / 2, 160, m).toFixed(2) + 'px'; ey.style.top = M.lerp(360, 96, m).toFixed(2) + 'px';
  ey.style.background = M.mix(C.slate, C.slate, 0);
  M.vis(ey, t, 0.1, tCover - 0.05, { dy: 18, outDur: 0.01 });
  M.draw($('#ornO'), t, 0.85, 0.6, M.o3); M.draw($('#ornI'), t, 1.25, 0.6, M.o3);
  M.vis($('#orn'), t, null, tMorph - 0.1, { dy: 0, outDur: 0.25, ody: 0 });
  M.rise($('#sub'), t, 1.2, { st: 0.04, out: tMorph - 0.1, outDur: 0.3 });

  // --- plant build (equipment then pipes draw on) ---
  M.hide($('#plant'), !scene || t < tBuild); M.hide($('#tags'), !scene || t < tBuild); M.hide($('#steps'), !scene);
  if (scene && t >= tBuild) {
    M.draw($('#gnd'), t, tBuild, 0.6, M.o3);
    [['#bO', 0], ['#eO', 0.12], ['#rO', 0.24]].forEach(([s, d]) => M.draw($(s), t, tBuild + d, 0.55, M.o3));
    ['#lg0', '#lg1', '#lg2', '#lg3'].forEach((s, k) => M.draw($(s), t, tBuild + 0.3 + k * 0.05, 0.3, M.o3));
    M.vis($('#burner'), t, tBuild + 0.4, 1e9, { dy: 8 });
    const pd = [0.5, 0.5, 0.95, 0.95, 0.75, 0.75, 1.05, 1.05, 1.05, 1.05];
    DRAWN.forEach((id, k) => M.draw($('#' + id), t, tBuild + pd[k] + (k % 2) * 0.08, 0.5, M.o3));
    // vessels fill white with the outline (solid placeholders)
    ['#bkV', '#eS'].forEach(s => M.vis($(s), t, tBuild + 0.2, 1e9, { dy: 0, fade: 0.3 }));
    M.vis($('#plant').querySelector('rect[x="1400"]'), t, tBuild + 0.44, 1e9, { dy: 0, fade: 0.3 });

    // boiler: sea water fills, boils down; salt grains sink and form a layer
    const fp = M.spring(t - tFill, M.HEAVY), boilU = M.io((t - tBoil) / (tCool - tBoil));
    const lvl = M.lerp(B.y + B.h, LV0, fp) + (LV1 - LV0) * boilU;
    const bt = t - tBoil, amp = t >= tBoil ? 3 * M.clamp(bt / 0.4) : 4 * Math.exp(-(t - tFill) * 2.5) * M.clamp((t - tFill) / 0.15);
    M.hide($('#sea'), t < tFill);
    $('#sea').setAttribute('d', surf(B.x, B.x + B.w, fp >= 1 && amp < 0.05 ? Math.round(lvl * 100) / 100 : lvl, B.y + B.h, amp, t * 6));
    const sl = M.spring(t - tSalt - 0.35, M.HEAVY), sL = $('#saltL');
    M.hide(sL, t < tSalt + 0.35); sL.setAttribute('y', (B.y + B.h - 40 * sl).toFixed(2)); sL.setAttribute('height', (40 * sl + 1).toFixed(2));
    GR.forEach((g, i) => {
      const el = $('#gr' + i), gs = M.spring(t - tSalt - i * 0.025, M.SOFT);
      const gy0 = Math.max(g.y, lvl + 16);
      const gx = M.lerp(g.x, g.fx, gs), gy = M.lerp(gy0, g.fy, gs);
      M.hide(el, t < tFill + 0.3 || sl >= 0.98);
      el.setAttribute('x', gx.toFixed(2)); el.setAttribute('y', gy.toFixed(2));
    });
    M.vis($('#lSea'), t, tFill + 0.35, tSalt, { dy: 10, outDur: 0.25, ody: 0 }); $('#lSea').style.top = (lvl + 16).toFixed(1) + 'px';
    M.vis($('#lSalt'), t, tSalt + 0.6, 1e9, { dy: 8 });
    // heat
    M.hide($('#flames'), t < tHeat);
    [0, 1, 2].forEach(k => { const p = M.spring(t - tHeat - k * 0.08, M.SOFT), f = 1 + 0.07 * Math.sin(t * 13 + k * 2.1) * p; set($('#fl' + k), 'transform', `translate(${280 + k * 60} 704) scale(${(0.9 + 0.1 * p).toFixed(3)} ${(p * f).toFixed(4)})`); });
    $('#bO').setAttribute('stroke', M.mix(C.slate, '#4A3A30', 0));
    // boiling bubbles + steam puffs (fixed sets that rise and loop)
    BUB.forEach(([x, ph], i) => { const el = $('#bu' + i), on = t >= tBoil + ph * 0.3; M.hide(el, !on); if (!on) return; const u = ((t - tBoil) * 0.9 + ph) % 1, y = M.lerp(B.y + B.h - 30, lvl + 8, u); el.setAttribute('cx', x); el.setAttribute('cy', y.toFixed(2)); el.setAttribute('r', (4 + 4 * u).toFixed(2)); el.style.opacity = Math.min(1, (1 - u) * 4).toFixed(3); });
    PUFF.forEach(([x, ph, s], i) => {
      const el = $('#pu' + i), on = t >= tBoil + 0.2 + ph * 0.4; M.hide(el, !on); if (!on) return;
      const u = ((t - tBoil) * 0.55 + ph) % 1, y = M.lerp(lvl - 6, B.y + 22, u), xx = x + 8 * Math.sin(u * 6.28 + i);
      el.setAttribute('transform', `translate(${xx.toFixed(2)} ${y.toFixed(2)}) scale(${(0.7 + 0.4 * u).toFixed(3)})`);
      el.style.opacity = Math.min(1, u * 5, (1 - u) * 4).toFixed(3);
    });
    // steam travels to the condenser coil
    front('stA', t, tSteam, 0.7); front('stB', t, tSteam + 0.6, 0.9); flow('stA', t, tSteam, 110); flow('stB', t, tSteam + 0.6, 90);
    M.vis($('#lSteam'), t, tSteam + 0.25, 1e9, { dx: -16, dy: 0 });
    // cooling water flows, shell fills
    front('cwiM', t, tCool, 0.45); front('cwoM', t, tCool + 0.35, 0.45); flow('cwiM', t, tCool, 70); flow('cwoM', t, tCool, 70);
    const ew = M.io((t - tCool - 0.2) / 0.6), eW = $('#eW'); M.hide(eW, ew <= 0); eW.setAttribute('width', (E.w * ew).toFixed(2)); eW.setAttribute('x', (E.x + E.w * (1 - ew)).toFixed(2));
    M.vis($('#lCwi'), t, tCool + 0.1, 1e9, { dx: -12, dy: 0 }); M.vis($('#lCwo'), t, tCool + 0.45, 1e9, { dx: -12, dy: 0 });
    // condensate to the collector, level rises
    front('lqC', t, tTurns, 0.75); flow('lqC', t, tTurns, 100);
    const pf = M.io((t - tTurns - 0.65) / (M.t1('S3') - tTurns - 0.4), M.io);
    const plv = M.lerp(R.y + R.h, 576, pf), pa2 = t > tTurns + 0.65 ? 3 * Math.exp(-(t - M.t1('S3')) * 2.5 * (t > M.t1('S3') ? 1 : 0)) : 0;
    M.hide($('#pure'), pf <= 0); $('#pure').setAttribute('d', surf(R.x, R.x + R.w, plv, R.y + R.h, Math.min(3, pa2) < 0.05 ? 0 : Math.min(3, pa2), t * 6));
    M.vis($('#lPure'), t, tPure, 1e9, { dy: 10 });
  }
  // tags (condenser tag turns cyan when named)
  TAGS.forEach((g, i) => {
    const el = $('#' + g.id); M.vis(el, t, tBuild + 0.35 + i * 0.12, tCover - 0.05, { dy: 12, outDur: 0.01, ody: 0 });
    const hot = i === 1 ? M.io((t - tCond) / 0.3) : 0, b = el.querySelector('b');
    b.style.background = M.mix(C.slate, C.cyanD, hot);
    if (i === 1 && t > tCond && t < tCond + 0.4) el.style.transform = `scale(${(1 + 0.06 * Math.sin(Math.PI * (t - tCond) / 0.4)).toFixed(4)})`;
  });
  // steps
  STEPS.forEach((s, i) => {
    const el = $('#s' + i); M.vis(el, t, tBuild + 0.6 + i * 0.1, tCover - 0.05, { dy: 24, outDur: 0.01, ody: 0 });
    const on = M.io((t - tStep[i]) / 0.3), off = M.io((t - (tStep[i + 1] ?? tStepEnd)) / 0.3), a = on * (1 - off);
    const bg = el.querySelector('.bg'); bg.style.background = M.mix(C.card, C.slate, a); bg.style.borderColor = M.mix(C.line, C.slate, a);
    el.querySelector('.n').style.color = M.mix(t >= tStep[i] ? C.cyanD : C.muted, '#6FD7E4', a);
    el.querySelector('.t').style.color = M.mix(t >= tStep[i] ? C.slate : C.dim, '#FFFFFF', a);
    el.querySelector('.d').style.color = M.mix(t >= tStep[i] ? C.slate2 : C.dim, '#C9D3DC', a);
  });

  // --- pipe wipe: a pipe draws across, floods with liquid, bursts open into the quiz ---
  const w1 = M.io((t - tSweep) / 0.36), w2 = M.io((t - tSweep - 0.3) / 0.36), w3 = M.io((t - tSweep - 0.64) / 0.28), w4 = M.io((t - tOpen) / 0.5);
  const wv = t >= tSweep && w4 < 1; M.hide($('#wipe'), !wv);
  if (wv) {
    const H = 220, ih = 140, cy = 540, x1 = -120 + 2160 * w1;
    const oh = M.lerp(H, 1300, w3), iH = M.lerp(ih, 1300, w3);
    const O = $('#wpO'), I = $('#wpI'), Lq = $('#wpL');
    O.setAttribute('x', -120); O.setAttribute('width', Math.max(0, x1 + 120).toFixed(1)); O.setAttribute('y', (cy - oh / 2).toFixed(1)); O.setAttribute('height', oh.toFixed(1)); O.setAttribute('rx', (H / 2 * (1 - w3)).toFixed(1));
    I.setAttribute('x', -120); I.setAttribute('width', Math.max(0, x1 + 120 - 40).toFixed(1)); I.setAttribute('y', (cy - iH / 2).toFixed(1)); I.setAttribute('height', iH.toFixed(1)); I.setAttribute('rx', (ih / 2 * (1 - w3)).toFixed(1));
    const lx = -120 + 2160 * w2; Lq.setAttribute('x', -120); Lq.setAttribute('width', Math.max(0, lx + 120 - 40).toFixed(1)); Lq.setAttribute('y', (cy - iH / 2).toFixed(1)); Lq.setAttribute('height', iH.toFixed(1)); Lq.setAttribute('rx', (ih / 2 * (1 - w3)).toFixed(1));
    const open = w4 > 0; M.hide(O, open); M.hide(I, open); M.hide(Lq, open);
    const T = $('#wpT'), Bt = $('#wpB'); M.hide(T, !open); M.hide(Bt, !open);
    if (open) { T.setAttribute('x', 0); T.setAttribute('width', 1920); T.setAttribute('y', -10); T.setAttribute('height', (550 * (1 - w4)).toFixed(1)); Bt.setAttribute('x', 0); Bt.setAttribute('width', 1920); Bt.setAttribute('y', (540 + 540 * w4).toFixed(1)); Bt.setAttribute('height', 560); }
  }

  // --- quick check ---
  const qon = t >= tCover; M.hide($('#quiz'), !qon);
  if (qon) {
    M.vis($('#qchip'), t, tQ + 0.2, 1e9, { dy: 16 });
    M.rise($('#qq'), t, tQ + 0.3, { st: 0.05, sp: M.HEAVY });
    const rr = M.io((t - tAns) / 0.3);
    QO.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 0.55 + i * 0.1, 1e9, { dy: 40 });
      const right = i === 1, bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.card, C.slate, rr) : M.mix(C.card, '#E6EBEF', rr);
      bg.style.borderColor = right ? M.mix(C.line, C.slate, rr) : M.mix(C.line, '#E2E8ED', rr);
      el.querySelector('.ot').style.color = right ? M.mix(C.slate, '#FFFFFF', rr) : M.mix(C.slate, C.dim, rr);
      const tg = el.querySelector('.tg b'); tg.style.background = right ? M.mix(C.bg, C.cyan, rr) : M.mix(C.bg, '#DCE3E9', rr); tg.style.color = right ? M.mix(C.slate, '#FFFFFF', rr) : M.mix(C.slate, C.dim, rr);
      const lt = el.querySelector('.lt'); lt.style.background = right ? M.mix(C.bg, '#FFFFFF', rr) : M.mix(C.bg, '#DCE3E9', rr); lt.style.color = right ? C.slate : M.mix(C.slate, C.dim, rr);
      const ar = el.querySelector('.art'); ar.style.filter = !right && rr > 0 ? `grayscale(${rr.toFixed(2)}) contrast(${(1 - 0.55 * rr).toFixed(3)}) brightness(${(1 + 0.35 * rr).toFixed(3)})` : '';
      if (right) { ar.style.background = ''; }
      const ok = el.querySelector('.ok'); if (right) M.vis(ok, t, tAns + 0.1, 1e9, { dy: 0, sc: 0.3, sp: M.POP, fade: 0.08 }); else M.hide(ok, true);
      if (right && t > tAns && t < tAns + 0.45) el.style.transform = `scale(${(1 + 0.03 * Math.sin(Math.PI * (t - tAns) / 0.45)).toFixed(4)})`;
    });
    // right card art sits on slate: give it a white plate
    // gauge countdown: needle sweeps from low to the red zone across the pause
    const u = M.clamp((t - tCount) / (tAns - tCount));
    M.vis($('#gauge'), t, tCount - 0.15, tAns, { dy: 0, sc: 0.7, sp: M.POP, outDur: 0.25, osc: 0.8, ody: 0 });
    const step = Math.min(2, Math.floor(u * 3)), ang = M.track(-120, [[tCount, -40, M.SNAP], [tCount + (tAns - tCount) / 3, 40, M.SNAP], [tCount + 2 * (tAns - tCount) / 3, 120, M.SNAP]])(t);
    set($('#needle'), 'transform', `translate(72 72) rotate(${ang.toFixed(2)})`);
    $('#gN').textContent = String(3 - step);
    M.vis($('#take'), t, tTake, 1e9, { dy: 40 });
    M.rise($('#takeT'), t, tTake + 0.1, { st: 0.045 });
  }
  caps(t);
});

/* ---------- sound: bubble, low hum, drip, swish, correct ---------- */
M.sfx(0.12, 'swish', 0.35); M.sfx(0.9, 'drip', 0.3);
M.sfx(tMorph, 'swish', 0.45); M.sfx(tBuild + 0.5, 'hum', 0.12);
M.sfx(tFill, 'bubble:2', 0.4, -0.5); M.sfx(tFill + 0.15, 'bubble:3', 0.3, -0.5);
M.sfx(tHeat, 'hum', 0.18, -0.5);
[0, 1, 2, 3, 4].forEach(k => M.sfx(tBoil + k * 0.32, 'bubble:' + (k + 4), 0.28, -0.5));
M.sfx(tSteam, 'swish', 0.3, -0.2); M.sfx(tSalt + 0.3, 'drip', 0.3, -0.5);
M.sfx(tCool, 'hum', 0.15, 0.2); M.sfx(tCond, 'drip', 0.25, 0.1);
[0, 1, 2].forEach(k => M.sfx(tTurns + 0.7 + k * 0.4, 'drip', 0.35, 0.5));
M.sfx(tSweep + 0.05, 'swish', 0.45); M.sfx(tSweep + 0.35, 'bubble:9', 0.35); M.sfx(tSweep + 0.5, 'bubble:10', 0.3); M.sfx(tOpen, 'swish', 0.4);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'drip', 0.45));
M.sfx(tAns + 0.05, 'correct', 0.6); M.sfx(tTake, 'drip', 0.3);
M.outro({ bg: '#2C3A47', ink: '#EEF2F5', accent: '#19B5C9', sub: 'rgba(238,242,245,.62)', font: 'Sora' });
})();
