// Engg Electronics world sample - What does a diode do? (Circuit board)
(() => {
const { $ } = M;
const C = { pcb: '#0B2A20', pcb2: '#0F3328', bd: '#0D2F24', tr: '#1F4A3A', trOn: '#2E5E4A', cu: '#D9A35B', cud: '#4A3A22', silk: '#E9F2EC', mut: '#7FA595', dim: '#3F6B5A', red: '#FF4D4D', grn: '#3DDC84', ledOff: '#1C3A2F', ledRim: '#2E5A49' };
const wt = M.wt;

/* ---------- beats (all from the voice) ---------- */
const tTitle = 0.2, tMorph = M.t0('H2') + 0.02;
const tTiny = wt('H2', 'tiny'), tParts = wt('H2', 'parts'), tDiodes = wt('H2', 'diodes');
const tOneWay = wt('D1', 'one'), tGate = wt('D1', 'gate'), tCur1 = wt('D1', 'current');
const tFwd = M.t0('D2') - 0.04, tFlows = wt('D2', 'flows'), tLight = wt('D2', 'light'), tOn = wt('D2', 'on');
const tBack = M.t0('D3') - 0.04, tBlocks = wt('D3', 'blocks'), tStays = wt('D3', 'stays'), tOff = wt('D3', 'off');
const tDive = M.t1('D3') + 0.12, tArrive = tDive + 0.5, tQ = tArrive;
const tCount = M.t1('Q1') + 0.05, tAns = M.t0('A1') - 0.02, tTake = wt('A1', 'one');

/* ---------- board geometry (stage px) ---------- */
const L = 300, R = 1076, T = 400, B = 740, BY = 570;          // loop
const FWD = `M${L} 490 V${T} H${R} V${B} H${L} V650`;          // battery + -> diode -> LED -> back
const REV = `M${L} 650 V${B} H${R} V${T} H782`;                // reversed: stops at the diode's cathode
const VIA = [688, B];
let s = '';
s += `<rect x="160" y="290" width="1056" height="540" rx="6" fill="${C.bd}" stroke="${C.tr}" stroke-width="2"/>`;
s += `<rect x="184" y="314" width="1008" height="492" rx="2" fill="none" stroke="${C.dim}" stroke-width="2" stroke-dasharray="2 10" id="silkB"/>`;
s += `<path id="tBase" d="M${L} 490 V${T} H${R} V${B} H${L} V650" fill="none" stroke="${C.tr}" stroke-width="16" stroke-linejoin="round"/>`;
s += `<path id="fF" d="${FWD}" fill="none" stroke="${C.cu}" stroke-width="6" stroke-dasharray="16 24"/>`;
s += `<path id="fR" d="${REV}" fill="none" stroke="${C.cu}" stroke-width="6" stroke-dasharray="16 24"/>`;
// via (camera dives into this)
s += `<g id="via"><circle cx="${VIA[0]}" cy="${VIA[1]}" r="16" fill="${C.cu}"/><circle cx="${VIA[0]}" cy="${VIA[1]}" r="7" fill="#04110C"/></g>`;
// diode: body + cathode band, silkscreen symbol
s += `<g id="dio"><rect x="608" y="372" width="160" height="56" rx="8" fill="#141A17" stroke="#2A332F" stroke-width="2"/><rect x="738" y="372" width="14" height="56" fill="#C9CED6"/></g>`;
s += `<g id="dsym" fill="none" stroke="${C.silk}" stroke-width="3" stroke-linejoin="round"><path id="dsT" d="M664 316 L704 336 L664 356 Z"/><path id="dsB" d="M704 314 V358"/><path id="dsL" d="M636 336 H664 M704 336 H732"/></g>`;
s += `<text id="dLab" x="608" y="474" font-family="IBM Plex Mono" font-weight="600" font-size="20" letter-spacing="2" fill="${C.mut}">D1</text>`;
s += `<g id="gate"><path d="M790 476 H900" stroke="${C.cu}" stroke-width="4"/><path d="M886 464 L902 476 L886 488" fill="none" stroke="${C.cu}" stroke-width="4" stroke-linejoin="round"/><text x="650" y="474" font-family="IBM Plex Mono" font-weight="600" font-size="20" letter-spacing="2" fill="${C.cu}">ONE WAY</text></g>`;
// barrier on the cathode side (silkscreen white, hatched)
s += `<g id="bar"><rect x="782" y="364" width="14" height="72" fill="${C.silk}"/></g>`;
s += `<text id="blk" x="806" y="474" font-family="IBM Plex Mono" font-weight="600" font-size="20" letter-spacing="2" fill="${C.silk}">BLOCKED</text>`;
// LED
s += `<circle id="halo" cx="${R}" cy="${BY}" r="74" fill="#3A1F22"/>`;
s += `<circle id="ledB" cx="${R}" cy="${BY}" r="46" fill="${C.ledOff}" stroke="${C.ledRim}" stroke-width="4"/>`;
s += `<circle id="ledI" cx="${R - 14}" cy="${BY - 14}" r="10" fill="#2B4D40"/>`;
s += `<text x="${R - 94}" y="${BY + 7}" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="20" letter-spacing="2" fill="${C.mut}" id="ledLab">LED1</text>`;
// battery (flips 180 deg)
s += `<g id="bat" transform="translate(${L} ${BY})"><rect x="-26" y="-92" width="52" height="14" fill="${C.cu}"/><rect x="-56" y="-80" width="112" height="160" rx="8" fill="#13201B" stroke="#33473F" stroke-width="3"/><rect x="-56" y="-80" width="112" height="40" rx="8" fill="${C.cud}"/><path d="M-12 -2 H12 M0 -14 V10" stroke="${C.silk}" stroke-width="4"/><path d="M-12 50 H12" stroke="${C.silk}" stroke-width="4"/></g>`;
s += `<text x="${L + 80}" y="${BY + 7}" font-family="IBM Plex Mono" font-weight="600" font-size="20" letter-spacing="2" fill="${C.mut}" id="batLab">BT1</text>`;
s += `<text x="196" y="796" font-family="IBM Plex Mono" font-weight="600" font-size="18" letter-spacing="2" fill="${C.dim}" id="rev">QB-01 REV A</text>`;
$('#board').innerHTML = s;
// fiducials on the stage background
let hs = ''; [[64, 64], [1856, 64], [64, 1016], [1856, 1016]].forEach(([x, y]) => { hs += `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="#174536" stroke-width="3"/><circle cx="${x}" cy="${y}" r="5" fill="#174536"/>`; });
$('#holes').innerHTML = hs;
$('#i0').innerHTML = '<span id="i0s"></span>';
$('#i1').innerHTML = '<div class="led" id="l1"></div>';
const OPTS = ['Makes current stronger', 'Lets current flow one way only', 'Stores electric charge'], RIGHT = 1;
OPTS.forEach((o, i) => $('#opts').insertAdjacentHTML('beforeend', `<div class="opt" id="o${i}" style="top:${290 + i * 144}px"><div class="bg"></div><div class="lt">${'ABC'[i]}</div><div class="ot">${o}</div><div class="led" id="ol${i}"></div></div>`));
[0, 1, 2].forEach(k => $('#cdl').insertAdjacentHTML('beforeend', `<div class="led" id="cl${k}" style="left:${k * 60}px"></div>`));
$('#takeI').innerHTML = M.icon('zap', 40, C.pcb, 2.6);

/* ---------- helpers ---------- */
const caps = M.captions($('#cap'), M.CUES.order);
const px = v => Math.round(v * 100) / 100;
const led = (el, state) => { // 0 off, 'g' green, 'r' red
  const bg = state === 'g' ? C.grn : state === 'r' ? C.red : C.ledOff, bc = state === 'g' ? '#9BF0C0' : state === 'r' ? '#FF9A9A' : C.ledRim;
  if (el._s !== state) { el._s = state; el.style.background = bg; el.style.borderColor = bc; }
};
const row = (i, t, tin, txt, col) => {
  const v = $('#v' + i); M.setT(v, txt); v.style.color = col;
};
const SPEED = 200;   // copper dash speed px/s (constant, physically continuous)
const camDive = t => {
  const u = M.clamp((t - tDive) / 0.5); if (u <= 0) return null;
  return { z: Math.exp(Math.log(18) * M.io(u)), b: 10 * Math.sin(Math.PI * u) };
};

/* ---------- frame ---------- */
M.on(t => {
  $('#prog i').style.width = (1920 * M.clamp(t / window.DUR)).toFixed(1) + 'px';

  // --- title card -> header ---
  const m = M.spring(t - tMorph, M.HEAVY);
  const ti = $('#title');
  const y = M.lerp(400, 146, m), sc = M.lerp(1, 64 / 150, m);
  ti.style.transform = m >= 1 ? 'translate(160px,146px) scale(0.4267)' : `translate(160px,${px(y)}px) scale(${sc.toFixed(4)})`;
  M.rise(ti, t, tTitle, { st: 0.08, sp: M.HEAVY, rot: 0 });
  const ey = $('#eyebrow'); ey.style.left = '160px'; ey.style.top = px(M.lerp(324, 96, m)) + 'px';
  M.vis(ey, t, 0.1, 1e9, { dy: 16 });
  M.rise($('#sub'), t, 0.85, { st: 0.04, rot: 0, out: tMorph - 0.1, outDur: 0.3 });
  // title trace routes in, copper dashes run along it
  M.draw($('#trP'), t, 0.6, 0.9, M.o3);
  const tf = $('#trF'); M.hide(tf, t < 1.4); tf.style.strokeDashoffset = (-(t - 1.4) * SPEED).toFixed(1);
  M.hide($('#trPad'), t < 1.4);
  M.vis($('#troute'), t, null, tMorph - 0.1, { dy: 0, outDur: 0.3, ody: 0 });

  // --- concept board ---
  const old = $('#old'), dv = camDive(t);
  M.hide(old, t >= tArrive);
  if (dv) { old.style.transform = `translate(${VIA[0]}px,${VIA[1]}px) scale(${dv.z.toFixed(4)}) translate(${-VIA[0]}px,${-VIA[1]}px)`; old.style.filter = dv.b > 0.05 ? `blur(${dv.b.toFixed(2)}px)` : ''; }
  else { if (old.style.transform !== 'none') old.style.transform = 'none'; old.style.filter = ''; }
  if (t < tArrive) {
    M.vis($('#board'), t, tMorph + 0.2, 1e9, { dy: 30 });
    M.draw($('#tBase'), t, tMorph + 0.35, 0.8, M.o3);
    M.draw($('#silkB'), t, tMorph + 0.3, 0.8, M.o3);
    // components placed on the words "tiny parts" (pick and place drops)
    const place = (el, a) => { const p = M.spring(t - a, M.SNAP); M.hide(el, t < a); el.style.opacity = M.clamp((t - a) / 0.08); el.style.transform = p >= 1 ? '' : `translateY(${px(-24 * (1 - p))}px)`; };
    place($('#bat'), tTiny); place($('#dio'), tParts); place($('#ledB'), tParts + 0.12); place($('#ledI'), tParts + 0.12); place($('#via'), tParts + 0.2);
    // battery uses a transform attribute, so handle its drop + flip together
    const pb = M.spring(t - tTiny, M.SNAP), fl = M.spring(t - tBack, M.SOFT);
    const rot = 180 * fl, by = BY - 24 * (1 - pb);
    $('#bat').style.transform = '';
    $('#bat').setAttribute('transform', `translate(${L} ${px(by)}) rotate(${fl >= 1 ? 180 : rot.toFixed(2)})`);
    ['#batLab', '#ledLab', '#dLab', '#rev'].forEach((id, i) => M.vis($(id), t, tParts + 0.25 + i * 0.05, 1e9, { dy: 8 }));
    // "diodes": silkscreen symbol draws on, body outlines copper
    M.draw($('#dsT'), t, tDiodes, 0.45, M.o3); M.draw($('#dsB'), t, tDiodes + 0.25, 0.25, M.o3); M.draw($('#dsL'), t, tDiodes + 0.1, 0.35, M.o3);
    const dHi = M.io((t - tDiodes) / 0.3) * (1 - M.io((t - tFwd) / 0.4));
    $('#dio').firstChild.setAttribute('stroke', M.mix('#2A332F', C.cu, dHi));
    // "one way gate": copper arrow + label under the diode
    M.vis($('#gate'), t, tOneWay, tBack - 0.05, { dy: 0, dx: -16, outDur: 0.2, odx: 0, ody: 0 });
    // forward flow
    const fF = $('#fF'), fOn = t >= tFlows && t < tBack + 0.25;
    M.hide(fF, !fOn);
    if (fOn) {
      const tStop = Math.min(t, tBack);                           // dashes freeze when the battery flips
      fF.style.strokeDashoffset = (-(tStop - tFlows) * SPEED).toFixed(1);
      fF.style.opacity = (M.clamp((t - tFlows) / 0.2) * (1 - M.clamp((t - tBack) / 0.25))).toFixed(3);
    }
    $('#tBase').setAttribute('stroke', M.mix(C.tr, C.trOn, M.io((t - tFlows) / 0.3) * (1 - M.io((t - tBack) / 0.3))));
    // reverse: dashes run in from the other side and pile up at the cathode
    const fR = $('#fR'), rOn = t >= tBlocks - 0.35;
    M.hide(fR, !rOn);
    if (rOn) {
      const d = t - (tBlocks - 0.35), D = 0.45;
      const sOff = SPEED * D * (1 - Math.exp(-d / D));
      fR.style.strokeDashoffset = (Math.exp(-d / D) < 0.003 ? -SPEED * D : -sOff).toFixed(1);
      fR.style.opacity = M.clamp(d / 0.2).toFixed(3);
    }
    M.vis($('#bar'), t, tBlocks, 1e9, { dy: 0, sc: 0.4, sp: M.SNAP, fade: 0.06 });
    M.vis($('#blk'), t, tBlocks + 0.15, 1e9, { dy: 10, sp: M.SNAP });
    // LED: lights on "light ... on", goes dark when the battery flips
    const lit = t >= tLight && t < tBack + 0.15;
    const lu = lit ? M.clamp((t - tLight) / 0.12) : 0;
    $('#ledB').setAttribute('fill', M.mix(C.ledOff, C.red, lu)); $('#ledB').setAttribute('stroke', M.mix(C.ledRim, '#FF9A9A', lu));
    $('#ledI').setAttribute('fill', M.mix('#2B4D40', '#FFC2C2', lu));
    M.hide($('#halo'), !lit); $('#halo').setAttribute('r', (46 + 28 * M.spring(t - tLight, M.SNAP)).toFixed(2));

    // --- status rows ---
    [0, 1, 2].forEach(i => M.vis($('#row' + i), t, tMorph + 0.35 + i * 0.08, 1e9, { dx: 30, dy: 0 }));
    const st0 = t < tFwd ? ['--', C.dim, null] : t < tBack ? ['Forward', C.silk, 'arrowR'] : ['Backward', C.silk, ['M19 12H5', 'm12 19-7-7 7-7']];
    row(0, t, 0, st0[0], st0[1]);
    const ic = st0[2] ? JSON.stringify(st0[2]) : 'none'; const i0s = $('#i0s');
    if (i0s._k !== ic) { i0s._k = ic; i0s.innerHTML = st0[2] ? M.icon(st0[2], 32, C.cu, 2.6) : ''; }
    const st1 = t < tFlows ? ['--', C.dim, 0] : t < tBack ? ['Flowing', C.silk, 'g'] : t < tBlocks ? ['--', C.dim, 0] : ['Blocked', C.silk, 'r'];
    row(1, t, 0, st1[0], st1[1]); led($('#l1'), st1[2]);
    const st2 = t < tOn ? ['--', C.dim, 0] : t < tBack ? ['On', C.silk, 'r'] : t < tBlocks ? ['--', C.dim, 0] : ['Off', C.silk, 0];
    row(2, t, 0, st2[0], st2[1]); led($('#i2'), st2[2]);
    // value changes snap up from below
    [[0, [tFwd, tBack]], [1, [tFlows, tBack, tBlocks]], [2, [tOn, tBack, tBlocks]]].forEach(([i, ts]) => {
      const a = ts.filter(x => t >= x).pop(); const v = $('#v' + i);
      if (a == null) { v.style.transform = 'none'; return; }
      const p = M.spring(t - a, M.SNAP); v.style.transform = p >= 1 ? 'none' : `translateY(${px(18 * (1 - p))}px)`; v.style.opacity = M.clamp((t - a) / 0.08);
    });
  }

  // --- quiz board: arrives from the dive (scales down into place, blur clears) ---
  const qon = t >= tArrive - 0.12; M.hide($('#quiz'), !qon);
  if (qon) {
    const q = $('#quiz'), pa = M.spring(t - tArrive + 0.12, M.SOFT);
    const op = M.clamp((t - tArrive + 0.12) / 0.15);
    q.style.opacity = op >= 1 ? '' : op.toFixed(3);
    const z = 1 + 0.35 * (1 - pa), bl = 8 * (1 - pa);
    q.style.transform = pa >= 1 ? 'none' : `scale(${z.toFixed(4)})`; q.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : '';
    M.vis($('#qchip'), t, tQ + 0.1, 1e9, { dy: 14 });
    M.rise($('#qq'), t, tQ + 0.15, { st: 0.05, sp: M.HEAVY, rot: 0 });
    OPTS.forEach((o, i) => {
      const el = $('#o' + i); M.vis(el, t, tQ + 0.35 + i * 0.08, 1e9, { dx: -30, dy: 0 });
      const r = M.io((t - tAns) / 0.28), right = i === RIGHT;
      const bg = el.querySelector('.bg');
      bg.style.background = right ? M.mix(C.pcb2, '#3A3020', r) : C.pcb2;
      bg.style.borderColor = right ? M.mix(C.tr, C.cu, r) : C.tr;
      el.querySelector('.ot').style.color = right ? C.silk : M.mix(C.silk, C.dim, r);
      const lt = el.querySelector('.lt'); lt.style.background = right ? M.mix(C.cud, C.cu, r) : M.mix(C.cud, '#173C30', r); lt.style.color = right ? M.mix(C.cu, C.pcb, r) : M.mix(C.cu, C.dim, r);
      led($('#ol' + i), right && t >= tAns + 0.05 ? 'g' : 0);
    });
    // countdown: three red LEDs go out one per second
    M.vis($('#cd'), t, tQ + 0.6, 1e9, { dx: 30, dy: 0 });
    const u = M.clamp((t - tCount) / (tAns - tCount)), step = Math.min(2, Math.floor(u * 3));
    M.setT($('#cdlab'), t < tAns ? 'TIMER' : 'ANSWER');
    M.setT($('#cdn'), t < tCount ? '3' : t < tAns ? String(3 - step) : 'B');
    $('#cdn').style.color = t >= tAns ? C.cu : C.silk;
    [0, 1, 2].forEach(k => led($('#cl' + k), t >= tAns ? 'g' : (t < tCount ? 'r' : (k < 3 - step ? 'r' : 0))));
    M.vis($('#take'), t, tTake, 1e9, { dy: 24, sp: M.SOFT });
    M.rise($('#takeT'), t, tTake + 0.08, { st: 0.035, rot: 0 });
  }
  caps(t);
});

/* ---------- sound ---------- */
M.sfx(0.2, 'blip', 0.35); M.sfx(1.4, 'hum', 0.1); M.sfx(tMorph, 'swish', 0.35);
M.sfx(tTiny, 'click', 0.45, -0.4); M.sfx(tParts, 'click', 0.45); M.sfx(tParts + 0.12, 'click', 0.4, 0.3);
M.sfx(tDiodes, 'tick', 0.35); M.sfx(tOneWay, 'blip', 0.3);
M.sfx(tFwd, 'click', 0.35, -0.3); M.sfx(tFlows, 'hum', 0.12); M.sfx(tLight, 'zap', 0.2, 0.3);
M.sfx(tBack, 'click', 0.5, -0.4); M.sfx(tBlocks, 'wrong', 0.22); M.sfx(tOff, 'tick', 0.3, 0.3);
M.sfx(tDive, 'zap', 0.22); M.sfx(tArrive, 'click', 0.35);
[0, 1, 2].forEach(k => M.sfx(tCount + k * (tAns - tCount) / 3, 'tick', 0.5));
M.sfx(tAns + 0.04, 'correct', 0.55); M.sfx(tTake, 'blip', 0.3);
M.outro({ bg: '#0B2A20', ink: '#E9F2EC', accent: '#D9A35B', sub: 'rgba(233,242,236,.62)', font: 'Chakra Petch' });
})();
