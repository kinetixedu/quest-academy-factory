// PUC Biology Ep 33: Body Symmetry and Germ Layers (Living diagram, leaf green)
(() => {
const { $ } = M, C = PUC.init({ subject: 'biology' }), wt = M.wt, T0 = M.t0, T1 = M.t1, mix = M.mix;
const IMG = '../../assets/illustrations/puc/';
const nsv = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const e = document.createElementNS(nsv, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
const txt = (p, x, y, s, a = {}) => { const e = mk(p, 'text', Object.assign({ x, y, 'font-family': 'IBM Plex Mono', 'font-size': 18, fill: C.mute }, a)); e.textContent = s; return e; };
const attr = PUC.attr;
const POP = { dy: 0, sc: 0.7, sp: M.POP, fade: 0.1 };
const BR = AN.BR, GRN = C.ac, ECTO = AN.ECTO, MESO = AN.MESO, ENDO = AN.ENDO, RED = '#C0392B', JEL = '#EEEDE6', ECf = '#DCE6F5', MEf = '#F1D2CA', ENf = '#F6E5B5', ENt = '#B8891C';
Object.assign(M.IC, AN.IC);
const lab = (g, px, py, lx, ly, s, an = 'start', cls = 'zl') => { const ln = mk(g, 'path', { d: `M${px},${py} L${lx},${ly}`, stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }), dot = mk(g, 'circle', { cx: px, cy: py, r: 6, fill: C.ink });
  const tx = mk(g, 'text', { x: lx + (an === 'start' ? 12 : -12), y: ly + 9, 'text-anchor': an, class: cls }); tx.textContent = s; return { ln, dot, tx }; };
const labT = (l, t, t0) => { M.draw(l.ln, t, t0, 0.4); M.vis(l.dot, t, t0 - 0.1, 1e9, { ...POP, sc: 0.2 }); l.tx.style.opacity = M.clamp((t - t0 - 0.3) / 0.25).toFixed(3); };
const lite = (el, on, cur) => { el.style.background = cur ? C.ac : '#FFFFFF'; el.style.color = cur ? '#FFFFFF' : on ? C.ac : '#9AA0AC'; el.style.borderColor = cur || on ? C.ac : '#CBD0DA'; };
const cutL = (g, x, y, r, w = 4) => mk(g, 'line', { x1: x, y1: y - r, x2: x, y2: y + r, stroke: RED, 'stroke-width': w, 'stroke-dasharray': '12 8', 'stroke-linecap': 'round' });
const xMark = (g, x, y) => { const e = mk(g, 'g', {}); mk(e, 'circle', { cx: x, cy: y, r: 22, fill: '#FBE9E9', stroke: RED, 'stroke-width': 3 }); mk(e, 'path', { d: `M${x - 8},${y - 8} l16,16 m0,-16 l-16,16`, stroke: RED, 'stroke-width': 3.5, 'stroke-linecap': 'round' }); return e; };
const disc = (g, x, y, L) => L.map(([f, s, r, dash]) => mk(g, 'circle', { cx: x, cy: y, r, fill: f, stroke: s, 'stroke-width': 2.5, 'stroke-dasharray': dash || 'none' }));

/* ---------- beats ---------- */
const tMorph = T0('H2') + 0.02, tH3 = T0('H3'), tH4 = T0('H4');
const tB1 = T0('B1'), tZ1 = T0('Z1'), tL1 = T0('L1'), tT = T0('T1'), tC1 = T0('C1'), tU1 = T0('U1'), tU4 = T0('U4'), tM1 = T0('M1'), tW1 = T0('W1');
const tX1 = T0('X1'), tQ = T0('Q1'), tF = T0('F1'), tY = T0('Y1'), tN = T0('N1');
const tCount = T1('Q1') + 0.05, tAns = T0('A1') - 0.02;
const SW = [[tT, tC1], [tQ, tQ + 0.06], [tF, tF + 0.06]];
const OUT = id => T0(id) - 0.32;

/* ---------- title card ---------- */
const JOBS = [['star', 'A starfish', 'FIVE ARMS', 'starfish'], ['roach', 'A cockroach', 'HEAD TO TAIL', 'cockroach'], ['sponge', 'A sponge', 'NO FIXED SHAPE', 'sponge']];
$('#jobs').innerHTML = JOBS.map(([ic, n, w], i) => `<div class="job" id="jb${i}" style="left:${390 + i * 390}px"><i>${M.icon(ic, 34, C.ac, 2)}</i><div class="jn">${n}</div><div class="jw">${w}</div></div>`).join('');
const tJob = JOBS.map(j => wt('H1', j[3]));

/* ---------- H: the ruler test ---------- */
const hj = $('#hjS'), HX = [150, 392, 634], HY = 280;
const hA = [AN.draw('star', hj, HX[0], HY, 0.92), AN.draw('roach', hj, HX[1], HY, 0.82), AN.draw('sponge', hj, HX[2], HY, 0.88, { cut: false })];
const hStar = [90, 162, 54, 126, 18].map(a => { const l = cutL(hj, HX[0], HY, 120, 3.5); attr(l, 'transform', `rotate(${a - 90} ${HX[0]} ${HY})`); return l; });
const hRoach = cutL(hj, HX[1], HY, 150, 3.5), hSp = cutL(hj, HX[2], HY, 130, 3.5), hSpX = xMark(hj, HX[2] + 70, HY - 120);
const tRz = [wt('H3', 'several'), wt('H3', 'only'), wt('H3', 'none')];
const hi = $('#hiS'); const hiA = AN.draw('jellyTop', hi, 210, 230, 0.95); const hiL = cutL(hi, 210, 230, 120);
const hiD = disc(hi, 570, 230, [[ECf, ECTO, 118], [MEf, MESO, 94], [ENf, ENDO, 70], ['#fff', ENDO, 46]]);

/* ---------- B: matching halves + three groups ---------- */
const bl = $('#blS'); const blR = AN.draw('roach', bl, 392, 270, 1.15);
const defs = mk(bl, 'defs', {}); const cp = mk(defs, 'clipPath', { id: 'halfL' }); mk(cp, 'rect', { x: 200, y: 60, width: 192, height: 420 });
const flipG = mk(bl, 'g', {}); const flipIn = mk(flipG, 'g', { 'clip-path': 'url(#halfL)', opacity: 0.55 }); AN.draw('roach', flipIn, 392, 270, 1.15);
const blPl = mk(bl, 'line', { x1: 392, y1: 70, x2: 392, y2: 470, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '12 8', 'stroke-linecap': 'round' });
const blT = [txt(bl, 250, 470, 'LEFT', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, 'font-weight': 600 }), txt(bl, 534, 470, 'RIGHT', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, 'font-weight': 600 })];
const CATS = [['Asymmetrical', 'no plane gives matching halves', wt('B3', 'asymmetrical')], ['Radial', 'many planes through the centre', wt('B3', 'radial')], ['Bilateral', 'one plane: a left and a right', wt('B3', 'bilateral')]];
$('#cats').innerHTML = CATS.map(([n, d], i) => `<div class="cat" id="ct${i}" style="top:${84 + i * 148}px"><div class="cn">${n}</div><div class="cd">${d}</div></div>`).join('');
const br = $('#brS'); const brG = [AN.draw('sponge', br, 116, 150, 0.5, { cut: false }), AN.draw('jellyTop', br, 116, 298, 0.5), AN.draw('roach', br, 116, 450, 0.4)];

/* ---------- Z: test them one at a time ---------- */
const ZN = ['ASYMMETRICAL', 'RADIAL', 'BILATERAL'];
$('#zch').innerHTML = ZN.map((n, i) => `<span class="zc" id="zc${i}">${n}</span>${i < 2 ? `<span class="za">${M.icon('arrowR', 22, C.dim, 2.4)}</span>` : ''}`).join('');
const tZ = [tZ1 + 0.2, T0('Z3'), T0('Z5')];
const LVI = [['TEST 1 OF 3', 'Sponge', 'Every cut gives two different pieces.', 'Sponges are mostly asymmetrical.'],
  ['TEST 2 OF 3', 'Jellyfish', 'Any plane through the central axis gives identical halves.', 'Radial: coelenterates, ctenophores, echinoderms.'],
  ['TEST 3 OF 3', 'Cockroach', 'Only one plane, head to tail, gives a left and a right half.', 'Bilateral: annelids, arthropods.']];
$('#lvs').innerHTML = LVI.map(([r, n, d, h], i) => `<div class="lvI" id="lvi${i}"><div class="lbl" style="left:36px;top:30px">${r}</div><div class="ln">${n}</div><div class="ld">${d}</div><div class="lh">${h}</div></div>`).join('');
const avZ = PUC.avatar($('#sZ'), { x: 1248 + 28, y: 324 + 526 - 112, who: 'Aarav', face: IMG + 'aarav-face.jpg', text: 'Like cutting a cake!' });
const zs = $('#zS'), ZG = [0, 1, 2].map(() => mk(zs, 'g', {}));
AN.draw('sponge', ZG[0], 400, 285, 1.6, { cut: false }); const z0c = cutL(ZG[0], 400, 285, 210); const z0x = [xMark(ZG[0], 640, 140), xMark(ZG[0], 700, 140), xMark(ZG[0], 760, 140)];
const z0t = txt(ZG[0], 700, 196, 'NO PLANE WORKS', { 'text-anchor': 'middle', 'font-size': 18, 'letter-spacing': 1.4, 'font-weight': 600, fill: RED });
AN.draw('jellyTop', ZG[1], 330, 268, 1.62); const z1c = cutL(ZG[1], 330, 268, 205); const z1ax = mk(ZG[1], 'circle', { cx: 330, cy: 268, r: 8, fill: C.ink });
const Lz1 = [lab(ZG[1], 330, 268, 560, 92, 'Central axis')];
const cake = mk(ZG[1], 'g', {}); mk(cake, 'circle', { cx: 790, cy: 320, r: 96, fill: '#F2DDB4', stroke: BR, 'stroke-width': 4 }); mk(cake, 'circle', { cx: 790, cy: 320, r: 70, fill: '#F7E9CC', stroke: '#C9A15E', 'stroke-width': 2.5 });
const cakeL = [0, 36, 72, 108, 144].map(a => { const l = mk(cake, 'line', { x1: 790, y1: 224, x2: 790, y2: 416, stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '10 7' }); attr(l, 'transform', `rotate(${a} 790 320)`); return l; });
txt(cake, 790, 448, 'A ROUND CAKE', { 'text-anchor': 'middle', 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600 });
const z2R = AN.draw('roach', ZG[2], 330, 290, 1.32); const z2c = cutL(ZG[2], 330, 290, 230);
const z2t = [txt(ZG[2], 200, 300, 'LEFT', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.6, 'font-weight': 600, fill: GRN }), txt(ZG[2], 460, 300, 'RIGHT', { 'text-anchor': 'middle', 'font-size': 20, 'letter-spacing': 1.6, 'font-weight': 600, fill: GRN })];
const Lz2 = [lab(ZG[2], ...z2R.p('head'), 620, 160, 'Front end (head)'), lab(ZG[2], 330, 290 + 108 * 1.32, 620, 430, 'Back end')];
const z2w = mk(ZG[2], 'line', { x1: 330, y1: 60, x2: 330, y2: 520, stroke: C.dim, 'stroke-width': 3, 'stroke-dasharray': '8 8' });

/* ---------- L: germ layers ---------- */
const STEPS = [['Ball of cells', 'the embryo starts as a ball of cells'], ['Ectoderm', 'the outer layer · ecto = outside'], ['Endoderm', 'the inner layer, lines the gut · endo = inside'],
  ['Mesoglea', 'undifferentiated jelly · two layers = diploblastic'], ['Mesoderm', 'a third, middle layer · three = triploblastic']];
$('#st5s').innerHTML = STEPS.map(([s, w], i) => `<div class="st5" id="s5${i}" style="top:${80 + i * 92}px"><div class="n">${i + 1}</div><div class="sx">${s}</div><div class="why">${w}</div></div>`).join('');
const tSt = ['L2', 'L3', 'L4', 'L5', 'L6'].map(id => T0(id) + 0.45);
const STP = ['1 BALL', '2 ECTO', '3 ENDO', '4 MESOGLEA', '5 MESODERM'];
$('#stp').innerHTML = STP.map((s, i) => `<span id="sp${i}">${s}</span>`).join('');
const lr = $('#lrS'), EX = 250, EY = 288;
const eBall = []; for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; eBall.push(mk(lr, 'circle', { cx: EX + 108 * Math.cos(a), cy: EY + 108 * Math.sin(a), r: 20, fill: '#F7F1DE', stroke: BR, 'stroke-width': 2.5 })); }
const eEc = mk(lr, 'circle', { cx: EX, cy: EY, r: 125, fill: 'none', stroke: ECTO, 'stroke-width': 20 });
const eJel = mk(lr, 'circle', { cx: EX, cy: EY, r: 94, fill: 'none', stroke: '#D8D5C8', 'stroke-width': 42, 'stroke-dasharray': '3 7' });
const eMe = mk(lr, 'circle', { cx: EX, cy: EY, r: 94, fill: 'none', stroke: MESO, 'stroke-width': 30 });
const eEn = mk(lr, 'circle', { cx: EX, cy: EY, r: 64, fill: 'none', stroke: ENDO, 'stroke-width': 18 });
const eGut = mk(lr, 'circle', { cx: EX, cy: EY, r: 54, fill: '#FFFFFF' }); txt(lr, EX, EY + 6, 'GUT', { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.3, 'font-weight': 600 });
const Le = [lab(lr, EX + 125 * Math.cos(-0.7), EY + 125 * Math.sin(-0.7), 470, 128, 'Ectoderm'), lab(lr, EX + 64 * Math.cos(0.15), EY + 64 * Math.sin(0.15), 470, 330, 'Endoderm'),
  lab(lr, EX + 94 * Math.cos(-0.2), EY + 94 * Math.sin(-0.2), 470, 196, 'Mesoglea'), lab(lr, EX + 94 * Math.cos(0.65), EY + 94 * Math.sin(0.65), 470, 262, 'Mesoderm')];
{ const e = document.createElement('div'); e.className = 'rs2'; e.id = 'lr1'; e.style.cssText = 'left:36px;top:500px;background:#F1D2CA'; e.textContent = 'Triploblastic: Platyhelminthes to chordates'; $('#lr').appendChild(e); $('#lr0').style.top = '444px'; }

/* ---------- statement ---------- */
$('#stF').innerHTML = '<span class="lad"><b style="color:#4A78C2">ectoderm</b> · <b style="color:#C8553D">mesoderm</b> · <b style="color:#B8891C">endoderm</b></span>';

/* ---------- C: the body wall gets a middle ---------- */
const cw = $('#cwS'), X0 = 80, X1 = 1060;
const cEc = mk(cw, 'rect', { x: X0, y: 110, width: X1 - X0, height: 40, fill: ECf, stroke: ECTO, 'stroke-width': 3 });
const cMid = mk(cw, 'rect', { x: X0, width: X1 - X0, fill: JEL, stroke: '#B8BCC6', 'stroke-width': 2 });
const cEn = mk(cw, 'rect', { x: X0, width: X1 - X0, height: 40, fill: ENf, stroke: ENDO, 'stroke-width': 3 });
const cGut = mk(cw, 'rect', { x: X0, width: X1 - X0, height: 70, fill: '#FFFFFF', stroke: '#E6E2D6', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
for (let k = 0; k < 24; k++) { mk(cw, 'line', { x1: X0 + 20 + k * 40, y1: 112, x2: X0 + 20 + k * 40, y2: 148, stroke: ECTO, 'stroke-width': 1.5 }); }
const cMus = [0, 1, 2, 3].map(k => mk(cw, 'path', { stroke: MESO, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }));
const cOrg = mk(cw, 'ellipse', { cx: 760, rx: 90, ry: 46, fill: '#F2B57E', stroke: BR, 'stroke-width': 3.5 });
const cFood = [0, 1, 2, 3, 4].map(() => mk(cw, 'circle', { r: 8, fill: ENt }));
const cTxt = txt(cw, 0, 0, 'GUT', { 'font-size': 16, 'letter-spacing': 1.3, 'font-weight': 600 });
const CL = [['Ectoderm', ECTO], ['Mesoglea', '#8A8F9C'], ['Endoderm', ENt]].map(([s, c], i) => { const e = mk(cw, 'text', { x: 1130, y: 0, class: 'zl', fill: c }); e.textContent = s; return e; });
const cMeT = mk(cw, 'text', { x: 1130, y: 0, class: 'zl', fill: MESO }); cMeT.textContent = 'Mesoderm: muscles, organs';
const cLn = [0, 1, 2].map(() => mk(cw, 'path', { stroke: C.ink, 'stroke-width': 2.5, fill: 'none' }));

/* ---------- U: Hydra vs flatworm ---------- */
const hyU = AN.draw('hydra', $('#uaS'), 392, 150, 0.85); AN.draw('flat', $('#ubS'), 392, 150, 1.05);
const LYA = [['Ectoderm', ECTO, 'outside', wt('U2', 'ectoderm')], ['Mesoglea', '#B8BCC6', 'jelly, not a germ layer', wt('U2', 'mesoglea')], ['Endoderm', ENDO, 'lines the gut', wt('U2', 'endoderm')]];
const LYB = [['Ectoderm', ECTO, 'outside', wt('U3', 'ectoderm')], ['Mesoderm', MESO, 'a true middle layer', wt('U3', 'mesoderm')], ['Endoderm', ENDO, 'lines the gut', wt('U3', 'endoderm')]];
const lyr = (L, p) => L.map(([n, c, d], i) => `<div class="lyr" id="${p}${i}" style="top:${356 + i * 60}px;background:${mix('#FFFFFF', c, 0.16)}"><b style="background:${c}"></b>${n}<span style="font:500 20px Poppins;color:var(--mute)">· ${d}</span></div>`).join('');
$('#lyA').innerHTML = lyr(LYA, 'ya'); $('#lyB').innerHTML = lyr(LYB, 'yb');
const th1 = PUC.think($('#th1'), { q: 'A comb jelly, a ctenophore, is radial and lives in the sea. Two germ layers, or three?', opts: ['Two layers', 'Three layers'], right: 0, why: 'Two. Ctenophores are diploblastic, just like the coelenterates.' });

/* ---------- M: the pattern ---------- */
const RAD = ['Radial', '#E9E1F3', '#5B3F86'], BIL = ['Bilateral', '#E3F1E7', '#1F6B3F'], DIP = ['Two · diploblastic', '#F1F0EA', C.ink2], TRI = ['Three · triploblastic', '#F7DCD5', '#8E3524'];
const TR = [['Coelenterata', 'jelly', RAD, DIP, wt('M2', 'Coelenterates')], ['Ctenophora', 'jelly', RAD, DIP, wt('M2', 'ctenophores')],
  ['Platyhelminthes', 'worm', BIL, TRI, wt('M3', 'Flatworms')], ['Aschelminthes', 'worm', BIL, TRI, wt('M3', 'roundworms')], ['Annelida', 'worm', BIL, TRI, wt('M3', 'annelids')], ['Arthropoda', 'roach', BIL, TRI, wt('M3', 'arthropods')],
  ['Echinodermata', 'star', ['Radial adult · bilateral larva', '#E9E1F3', '#5B3F86'], TRI, wt('M4', 'echinoderms')]];
$('#trs').innerHTML = TR.map(([n, ic, s, g], i) => `<div class="tr" id="tr${i}" style="top:${114 + i * 60}px"><div class="tn" style="display:flex;gap:12px;align-items:center;top:6px;height:40px">${M.icon(ic, 26, C.ac, 2)}${n}</div>
  <div class="tc" id="ts${i}" style="left:580px;background:${s[1]};color:${s[2]}">${s[0]}</div><div class="tc" id="tg${i}" style="left:950px;background:${g[1]};color:${g[2]}">${g[0]}</div></div>`).join('');
const tLarva = wt('M4', 'larva');

/* ---------- W: two sections ---------- */
const wl = $('#wlS'), wr = $('#wrS');
const wA = disc(wl, 200, 250, [[ECf, ECTO, 150], [JEL, '#B8BCC6', 122, '4 6'], [ENf, ENDO, 92], ['#fff', ENDO, 66]]);
const wB = [mk(wr, 'ellipse', { cx: 200, cy: 250, rx: 160, ry: 92, fill: ECf, stroke: ECTO, 'stroke-width': 2.5 }), mk(wr, 'ellipse', { cx: 200, cy: 250, rx: 140, ry: 74, fill: MEf, stroke: MESO, 'stroke-width': 2.5 }),
  mk(wr, 'ellipse', { cx: 200, cy: 250, rx: 62, ry: 32, fill: ENf, stroke: ENDO, 'stroke-width': 2.5 }), mk(wr, 'ellipse', { cx: 200, cy: 250, rx: 44, ry: 18, fill: '#fff', stroke: ENDO, 'stroke-width': 2 })];
const WKA = [['Two cell layers', ECTO, wt('W2', 'Two')], ['Jelly between: mesoglea', '#8A8F9C', wt('W2', 'mesoglea')], ['= Diploblastic', GRN, wt('W2', 'diploblastic')], ['+ radial symmetry', '#5B3F86', wt('W3', 'radial')]];
const WKB = [['Three cell layers', ECTO, wt('W4', 'Three')], ['Middle one: mesoderm', MESO, wt('W4', 'mesoderm')], ['= Triploblastic', GRN, wt('W4', 'triploblastic')], ['+ flat, bilateral, no cavity', '#1F6B3F', wt('W5', 'flat')]];
const wk = (L, p) => L.map(([s, c], i) => `<div class="wk" id="${p}${i}" style="top:${96 + i * 70}px"><b style="width:12px;height:12px;border-radius:3px;background:${c};margin-right:12px;flex:none"></b>${s}</div>`).join('');
$('#wkA').innerHTML = wk(WKA, 'ka') + `<div class="pillp ac" id="kaP" style="left:36px;top:470px;height:52px;font-size:23px">Fits a coelenterate, like Hydra</div>`;
$('#wkB').innerHTML = wk(WKB, 'kb') + `<div class="pillp ac" id="kbP" style="left:36px;top:470px;height:52px;font-size:23px">Fits a flatworm, like Planaria</div>`;
$('#wkB').querySelectorAll('.wk').forEach(e => e.style.left = '410px'); $('#wkA').querySelectorAll('.wk').forEach(e => e.style.left = '400px');

/* ---------- X / Q / F ---------- */
const trap = PUC.trap($('#trap'), { wrong: 'Mesoglea is a third germ layer', right: 'Mesoglea is just jelly: coelenterates are diploblastic' });
const tS = $('#tS'); const TB = [[ECf, ECTO, 'GERM LAYER', '#E3ECF8', '#2D5596'], [JEL, '#B8BCC6', 'NOT A GERM LAYER', '#FBE9E9', '#8A1C1C'], [ENf, ENDO, 'GERM LAYER', '#FBF1D6', '#7A5A12']].map(([f, s, tg, tb, tc], i) => {
  const g = mk(tS, 'g', {}); mk(g, 'rect', { x: 30, y: 62 + i * 52, width: 170, height: 46, rx: 6, fill: f, stroke: s, 'stroke-width': 2.5, 'stroke-dasharray': i === 1 ? '4 5' : 'none' });
  txt(g, 115, 92 + i * 52, ['ECTODERM', 'MESOGLEA', 'ENDODERM'][i], { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: C.ink });
  const c = mk(tS, 'g', {}); mk(c, 'rect', { x: 216, y: 64 + i * 52, width: 210, height: 42, rx: 9, fill: tb }); txt(c, 321, 91 + i * 52, tg, { 'text-anchor': 'middle', 'font-size': 15, 'letter-spacing': 1.2, 'font-weight': 600, fill: tc }); return [g, c]; });
const where = PUC.where($('#wa'), { on: [], type: 'Statement or assertion-reason: the symmetry or germ layers of a group' });
const mcq = PUC.mcq($('#mq'), { pat: 'NEET PATTERN · ORIGINAL QUESTION', qW: 800,
  q: 'Read the assertion (A) and the reason (R).<div class="sl"><b>A</b>An adult starfish shows radial symmetry.</div><div class="sl"><b>R</b>The larvae of echinoderms are radially symmetrical.</div>',
  opts: ['Both A and R are true, and R explains A', 'Both A and R are true, but R does not explain A', 'A is true, but R is false', 'A is false, but R is true'], right: 2, cols: 1, optW: 820, optH: 60, optY: 292, optFs: 26 });
const so = PUC.solution($('#so'), [['Answer: <b style="color:var(--ok)">C</b>'], ['<b style="color:var(--ok)">A</b> is true'], ['Adult starfish: radial'], ['<b style="color:var(--red)">R</b> is false'], ['Echinoderm larvae: bilateral']], { y0: 100, dy: 100 });
const tSo = [wt('A1', 3) + 0.1, wt('A2', 'assertion'), wt('A2', 'adult'), wt('A3', 'reason'), wt('A3', 'larvae')];
const fc = PUC.fcard($('#sF'), { x: 360, y: 262, w: 1200, h: 470, title: 'Recap · body symmetry and germ layers', y0: 100, dy: 70, txt: [1, 1, 1, 1, 1],
  lines: ['<b>Asymmetrical</b>: no plane works (most sponges)', '<b>Radial</b>: coelenterates, ctenophores, adult echinoderms', '<b>Bilateral</b>: one plane only (annelids, arthropods)',
    '<b>Diploblastic</b>: ectoderm + endoderm, mesoglea between', '<b>Triploblastic</b>: + mesoderm (Platyhelminthes to chordates)'] });
const YQ = ['Which groups show radial symmetry?', 'What is mesoglea, and in which animals is it found?', 'What does triploblastic mean?'];
$('#yrs').innerHTML = YQ.map((q, i) => `<div class="yr" id="yr${i}" style="top:${96 + i * 120}px"><div class="n">${i + 1}</div><div class="q">${q}</div></div>`).join('');
const tYq = [T0('Y2'), T0('Y3'), T0('Y4')];
const nx = PUC.next($('#sF'), { label: 'NEXT · EP 34', topic: 'Rings on an earthworm: what hides inside? Coelom and Segmentation', y: 764 });

/* ---------- helpers ---------- */
const head = PUC.header({ tMorph, tOut: tQ - 0.05 });
const sweep = PUC.sweepRun(SW);
const caps = M.captions($('#cap'), M.CUES.order);
const tMeso = wt('C3', 'mesoderm');
const camF = M.camera($('#cam'), [[0, 1.05, 960, 520], [0.15, 1, 960, 540, [4.5, 1]], [tMeso - 0.3, 1.06, 760, 520], [T1('C4') + 0.2, 1, 960, 540]]);
let geo = null; function measure() { geo = 1; }

/* ---------- frame ---------- */
M.on(t => {
  if (!geo) measure();
  camF(t); head(t); sweep(t);
  $('#prog i').style.width = (1906 * M.clamp(t / window.DUR)).toFixed(1) + 'px';
  const o = { outDur: 0.3, ody: -16 };
  JOBS.forEach((_, i) => M.vis($('#jb' + i), t, tJob[i] - 0.1, tMorph - 0.15, { dy: 24, sp: M.SOFT, outDur: 0.25, ody: 10 }));

  /* H */
  const hOn = t >= tMorph && t < tB1 + 0.1; M.hide($('#sH'), !hOn);
  if (hOn) {
    const out = OUT('B1');
    M.vis($('#hj'), t, tMorph + 0.3, out, { dx: -60, dy: 0, ...o });
    hA.forEach((a, i) => M.vis(a.g, t, tMorph + 0.45 + i * 0.15, 1e9, { ...POP, sc: 0.6 }));
    const tl = wt('H2', 'line');
    hStar.forEach((l, i) => { l.style.opacity = M.clamp((t - (i ? tRz[0] + i * 0.25 : tl)) / 0.25); });
    hRoach.style.opacity = M.clamp((t - tl - 0.2) / 0.25); hSp.style.opacity = M.clamp((t - tl - 0.4) / 0.25);
    attr(hSp, 'transform', `rotate(${(25 * Math.sin((t - tl) * 1.6)).toFixed(1)} ${HX[2]} ${HY})`);
    M.vis(hSpX, t, tRz[2] - 0.05, 1e9, { ...POP, sc: 0.3 });
    tRz.forEach((tt, i) => { const el = $('#rz' + i); M.vis(el, t, tt - 0.1, 1e9, POP); el.style.background = mix(C.soft, i === 2 ? '#FBE9E9' : C.ac2, M.io((t - tt) / 0.3)); el.style.color = i === 2 ? '#8A1C1C' : '#1F6B3F'; });
    M.vis($('#hk'), t, tH3 - 0.1, out, { dx: 60, dy: 0, ...o });
    const kOut = tH4 - 0.1;
    M.vis($('#hkImg'), t, tH3 + 0.1, kOut, { dy: 20, outDur: 0.25 }); M.vis($('#hdF'), t, tH3 + 0.2, 1e9, { ...POP, sc: 0.5 });
    M.vis($('#hkP'), t, tH3 + 0.6, kOut, { ...POP, outDur: 0.25 }); M.vis($('#hkL'), t, tH3, kOut, { dy: 8, outDur: 0.2 });
    if (M.vis($('#spc'), t, tH4 + 0.15, 1e9, { dy: 0, fade: 0.25 })) {
      const ts = wt('H4', 'symmetry'), tly = wt('H4', 'layers');
      M.vis(hiA.g, t, ts - 0.1, 1e9, { ...POP, sc: 0.6 }); hiL.style.opacity = M.clamp((t - ts) / 0.3); attr(hiL, 'transform', `rotate(${(((t - ts) * 50) % 180).toFixed(1)} 210 230)`);
      hiD.forEach((c, i) => c.style.opacity = M.clamp((t - tly - i * 0.2) / 0.25));
      M.vis($('#hi0'), t, ts - 0.05, 1e9, POP); M.vis($('#hi1'), t, tly - 0.05, 1e9, POP);
    }
  }

  /* B */
  const bOn = t >= tB1 - 0.1 && t < tZ1 + 0.1; M.hide($('#sB'), !bOn);
  if (bOn) {
    const out = OUT('Z1');
    M.vis($('#bl'), t, tB1 + 0.1, out, { dx: -60, dy: 0, ...o });
    M.draw(blPl, t, wt('B2', 'plane') - 0.1, 0.5);
    const tm = wt('B2', 'mirror'), f = M.io(((t - tm) % 3.4) / 1.4) * (t > tm ? 1 : 0);
    flipG.style.opacity = t > tm ? 1 : 0; attr(flipG, 'transform', `translate(392 0) scale(${Math.cos(Math.PI * f).toFixed(4)} 1) translate(-392 0)`);
    blT.forEach((e, i) => e.style.opacity = M.clamp((t - tm - 0.4 - i * 0.2) / 0.3));
    M.vis($('#blP'), t, wt('B2', 'plane') + 0.3, 1e9, POP);
    M.vis($('#br'), t, T0('B3') - 0.15, out, { dx: 60, dy: 0, ...o });
    CATS.forEach(([, , tt], i) => { M.vis($('#ct' + i), t, tt - 0.15, 1e9, { dx: -16, dy: 0 }); M.vis(brG[i].g, t, tt - 0.05, 1e9, { ...POP, sc: 0.5 }); });
  }

  /* Z */
  const zOn = t >= tZ1 - 0.1 && t < tL1 + 0.1; M.hide($('#sZ'), !zOn);
  if (zOn) {
    const out = OUT('L1');
    M.vis($('#zch'), t, tZ1, out, { dy: 12, ...o });
    M.vis($('#zd'), t, tZ1 + 0.05, out, { dx: -60, dy: 0, ...o }); M.vis($('#zi'), t, tZ1 + 0.2, out, { dx: 60, dy: 0, ...o });
    let cur = 0; for (let k = 1; k < 3; k++) if (t >= tZ[k] + 0.3) cur = k;
    ZN.forEach((_, i) => lite($('#zc' + i), i < cur, i === cur));
    M.vis($('#zgh'), t, tZ1 + 0.8, 1e9, { dy: 8 });
    ZG.forEach((g, k) => { const e = M.io((t - tZ[k] - (k ? 0.1 : 0)) / 0.6), x = k < 2 ? M.io((t - tZ[k + 1]) / 0.6) : 0;
      if (e <= 0 || x >= 1) { M.hide(g, true); return; } M.hide(g, false);
      attr(g, 'transform', `translate(${(k ? 260 * (1 - e) : 0) - 260 * x} 0)`); g.style.opacity = Math.min(e, 1 - x).toFixed(3); });
    const t2 = wt('Z2', 'Every');
    z0c.style.opacity = M.clamp((t - t2) / 0.3); attr(z0c, 'transform', `rotate(${(((t - t2) * 40) % 180).toFixed(1)} 400 285)`);
    z0x.forEach((x, i) => M.vis(x, t, t2 + 0.6 + i * 0.5, 1e9, { ...POP, sc: 0.3 })); z0t.style.opacity = M.clamp((t - wt('Z2', 'No')) / 0.3);
    const t3 = wt('Z3', 'plane');
    z1c.style.opacity = M.clamp((t - t3) / 0.3); attr(z1c, 'transform', `rotate(${(((t - t3) * 45) % 180).toFixed(1)} 330 268)`);
    labT(Lz1[0], t, wt('Z3', 'axis'));
    M.vis(cake, t, wt('Z4', 'cake') - 0.2, 1e9, { ...POP, sc: 0.6 }); cakeL.forEach((l, i) => l.style.opacity = M.clamp((t - wt('Z4', 'Every') - i * 0.3) / 0.25));
    M.draw(z2c, t, wt('Z5', 'plane') - 0.1, 0.6); z2t.forEach((e, i) => e.style.opacity = M.clamp((t - wt('Z5', 'left') - i * 0.3) / 0.3));
    labT(Lz2[0], t, wt('Z6', 'front')); labT(Lz2[1], t, wt('Z6', 'back'));
    z2w.style.opacity = 0;
    LVI.forEach((_, i) => { const tin = i ? tZ[i] + 0.3 : tZ1 + 0.4, tout = i < 2 ? tZ[i + 1] + 0.1 : 1e9; M.vis($('#lvi' + i), t, tin, tout, { dy: 20, outDur: 0.25, ody: -12 }); });
    avZ(t, wt('Z4', 'cake') + 0.4, T0('Z5') - 0.1);
  }

  /* L: germ layers */
  const lOn = t >= tL1 - 0.1 && t < tT + 0.1; M.hide($('#sL'), !lOn);
  if (lOn) {
    M.vis($('#lf'), t, tL1 + 0.05, 1e9, { dx: -60, dy: 0 }); M.vis($('#lr'), t, tL1 + 0.2, 1e9, { dx: 60, dy: 0 });
    STEPS.forEach((_, i) => { const el = $('#s5' + i); M.vis(el.querySelector('.n'), t, tSt[i] - 0.2, 1e9, { ...POP, sc: 0.4 }); PUC.write(el.querySelector('.sx'), t, tSt[i], 0.7); M.vis(el.querySelector('.why'), t, tSt[i] + 0.6, 1e9, { dx: -12, dy: 0 }); });
    const hiY = M.track(80, tSt.slice(1).map((tt, i) => [tt - 0.1, 80 + (i + 1) * 92]), M.SOFT)(t);
    const hb = $('#hiB'); M.vis(hb, t, tSt[0] - 0.1, T0('L7'), { dy: 0, fade: 0.2, outDur: 0.3, ody: 0 }); hb.style.top = (hiY - 8).toFixed(1) + 'px';
    let st = -1; tSt.forEach((tt, i) => { if (t >= tt - 0.2) st = i; });
    STP.forEach((_, i) => { M.vis($('#sp' + i), t, tL1 + 0.5 + i * 0.06, 1e9, { dy: 8 }); lite($('#sp' + i), i < st, i === st); });
    const lt = t - tL1, s = i => M.io((t - tSt[i] + 0.1) / 0.6);
    eBall.forEach((c, k) => { c.style.opacity = (M.clamp((t - tSt[0] + 0.3) / 0.4) * (1 - s(1))).toFixed(3); attr(c, 'r', (20 + 2 * Math.sin(lt * 3 + k)).toFixed(2)); });
    M.drawU(eEc, s(1)); eEc.style.opacity = s(1) > 0 ? 1 : 0;
    M.drawU(eEn, s(2)); eEn.style.opacity = s(2) > 0 ? 1 : 0; eGut.style.opacity = s(2);
    eJel.style.opacity = (s(3) * (1 - 0.85 * s(4))).toFixed(3);
    eMe.style.opacity = s(4); attr(eMe, 'stroke-width', (30 * s(4) * (1 + 0.08 * Math.sin(lt * 3))).toFixed(1));
    Le.forEach((l, i) => labT(l, t, [tSt[1] + 0.3, tSt[2] + 0.3, tSt[3] + 0.3, tSt[4] + 0.3][i]));
    M.vis($('#lr0'), t, wt('L7', 'diploblastic') - 0.1, 1e9, POP); M.vis($('#lr1'), t, wt('L7', 'triploblastic') - 0.1, 1e9, POP);
  }

  /* statement */
  const stOn = t >= tT && t < tC1 + 0.5; const stmt = $('#stmt'); M.hide(stmt, !stOn);
  if (stOn) {
    const sx = PUC.sweep(SW)(t); stmt.style.transform = t > tC1 ? `translateX(${(sx ?? -1980).toFixed(1)}px)` : 'none';
    M.rise($('#st1'), t, tT + 0.08, { st: 0.05 }); M.rise($('#st2'), t, wt('T1', 'Ecto') - 0.2, { st: 0.07, sp: M.HEAVY });
    PUC.write($('#stF'), t, wt('T1', 'middle') - 0.1, 0.9);
  }

  /* C: third layer */
  const cOn = t >= tC1 - 0.1 && t < tU1 + 0.1; M.hide($('#sC'), !cOn);
  if (cOn) {
    M.vis($('#cw'), t, tC1 + 0.2, OUT('U1'), { dy: 36, ...o });
    const m = M.io((t - tMeso) / 1.2), h = 40 + 150 * m, yM = 150, yE = yM + h, yG = yE + 40;
    attr(cMid, 'y', yM); attr(cMid, 'height', h.toFixed(1)); cMid.setAttribute('fill', mix(JEL, MEf, m)); cMid.setAttribute('stroke', mix('#B8BCC6', MESO, m));
    attr(cEn, 'y', yE.toFixed(1)); attr(cGut, 'y', yG.toFixed(1));
    attr(cTxt, 'x', X0 + 20); attr(cTxt, 'y', (yG + 42).toFixed(1));
    const lt = t - tC1;
    cFood.forEach((d, k) => { const v = (lt * 0.08 + k / 5) % 1; attr(d, 'cx', (X0 + 120 + 860 * v).toFixed(1)); attr(d, 'cy', (yG + 35).toFixed(1)); });
    const tMu = wt('C3', 'muscles'), tOr = wt('C3', 'organs');
    cMus.forEach((e, k) => { const y = yM + 30 + k * 32, sq = 1 + 0.12 * Math.sin(lt * 4 + k); let d = `M${X0 + 60},${y}`; for (let s = 1; s <= 10; s++) d += ` L${(X0 + 60 + s * 42 * sq).toFixed(1)},${(y + 6 * Math.sin(s * 1.6 + lt * 3)).toFixed(1)}`;
      attr(e, 'd', d); e.style.opacity = (m * M.clamp((t - tMu) / 0.4)).toFixed(3); });
    attr(cOrg, 'cy', (yM + h / 2).toFixed(1)); cOrg.style.opacity = (m * M.clamp((t - tOr) / 0.4)).toFixed(3);
    const yy = [130, yM + h / 2, yE + 20]; CL.forEach((e, i) => { attr(e, 'y', (yy[i] + 9).toFixed(1)); e.style.opacity = M.clamp((t - tC1 - 0.8 - i * 0.3) / 0.3) * (i === 1 ? 1 - m : 1); });
    attr(cMeT, 'y', (yy[1] + 9).toFixed(1)); cMeT.style.opacity = m;
    cLn.forEach((l, i) => { attr(l, 'd', `M${X1 - 40},${yy[i].toFixed(1)} L1118,${yy[i].toFixed(1)}`); l.style.opacity = M.clamp((t - tC1 - 0.8 - i * 0.3) / 0.3); });
    M.vis($('#cP0'), t, wt('C2', 'thin') - 0.1, 1e9, POP); M.vis($('#cP1'), t, tMu - 0.1, 1e9, POP);
  }

  /* U */
  const uOn = t >= tU1 - 0.1 && t < tM1 + 0.1; M.hide($('#sU'), !uOn);
  if (uOn) {
    const out = OUT('U4');
    M.vis($('#ua'), t, tU1 + 0.1, out, { dx: -60, dy: 0, ...o }); hyU.wig(t);
    LYA.forEach((l, i) => M.vis($('#ya' + i), t, l[3] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#ub'), t, T0('U3') - 0.15, out, { dx: 60, dy: 0, ...o });
    LYB.forEach((l, i) => M.vis($('#yb' + i), t, l[3] - 0.1, 1e9, { dx: -16, dy: 0 }));
    M.vis($('#th1'), t, tU4 + 0.05, OUT('M1'), { dy: 36, ...o });
    th1(t, { tin: tU4, tOpts: wt('U4', 'Two') - 0.1, tCount: T1('U4') + 0.05, dur: 3, tAns: T0('U5') - 0.02, tWhy: wt('U5', 'Ctenophores') });
  }

  /* M */
  const mOn = t >= tM1 - 0.1 && t < tW1 + 0.1; M.hide($('#sM'), !mOn);
  if (mOn) {
    M.vis($('#mt'), t, tM1 + 0.05, OUT('W1'), { dy: 36, ...o });
    TR.forEach((r, i) => { M.vis($('#tr' + i), t, r[4] - 0.15, 1e9, { dx: -16, dy: 0 }); M.vis($('#ts' + i), t, r[4] + 0.1, 1e9, POP); M.vis($('#tg' + i), t, r[4] + 0.25, 1e9, POP); });
    $('#tr6').style.background = mix(C.soft, '#FCEBD9', M.io((t - tLarva) / 0.3));
  }

  /* W */
  const wOn = t >= tW1 - 0.1 && t < tX1 + 0.1; M.hide($('#sW'), !wOn);
  if (wOn) {
    const out = OUT('X1');
    M.vis($('#wl'), t, tW1 + 0.05, out, { dx: -60, dy: 0, ...o });
    wA.forEach((c, i) => M.vis(c, t, T0('W2') + i * 0.12, 1e9, { ...POP, sc: 0.5 }));
    WKA.forEach(([, , tt], i) => M.vis($('#ka' + i), t, tt - 0.1, 1e9, { dx: -14, dy: 0 })); M.vis($('#kaP'), t, wt('W3', 'Hydra') - 0.1, 1e9, POP);
    M.vis($('#wr'), t, T0('W4') - 0.15, out, { dx: 60, dy: 0, ...o });
    wB.forEach((c, i) => M.vis(c, t, T0('W4') + i * 0.12, 1e9, { ...POP, sc: 0.5 }));
    WKB.forEach(([, , tt], i) => M.vis($('#kb' + i), t, tt - 0.1, 1e9, { dx: -14, dy: 0 })); M.vis($('#kbP'), t, wt('W5', 'Planaria') - 0.1, 1e9, POP);
  }

  /* X */
  const xOn = t >= tX1 - 0.1 && t < tQ + 0.05; M.hide($('#sX'), !xOn);
  if (xOn) {
    M.vis($('#trap'), t, tX1 + 0.05, 1e9, { dy: 36 }); M.vis($('#wa'), t, T0('E1') - 0.1, 1e9, { dy: 36 });
    trap(t, { tin: tX1, tWrong: wt('X2', 'count') - 0.2, tStrike: wt('X3', 'But') - 0.05, tRight: wt('X3', 'only') - 0.3 });
    TB.forEach(([g, c], i) => { M.vis(g, t, wt('X2', 'mesoglea') - 0.2 + i * 0.12, 1e9, { dx: -12, dy: 0 }); M.vis(c, t, (i === 1 ? wt('X3', 'jelly') : wt('X3', 'two')) - 0.1, 1e9, POP); });
    where(t, { tin: T0('E1'), tLight: [], tType: wt('E1', 'statement') });
  }

  /* Q */
  const qOn = t >= tQ && t < tF; M.hide($('#sQ'), !qOn);
  if (qOn) {
    M.vis($('#mq'), t, tQ + 0.05, 1e9, { dy: 36 });
    mcq(t, { tin: tQ, tOpts: wt('Q1', 'Read') + 0.3, tCount, tAns });
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
