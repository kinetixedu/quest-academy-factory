/* Quest Academy outro - shared by every world.
   M.outro({ bg, ink, accent, sub, font, start? }) adds a full-screen card for the last OUTRO_LEN seconds.
   The page must set window.TAIL >= OUTRO_LEN + 0.6 so the outro sits after the last line. */
(function () {
const OUTRO_LEN = 4.2;
if (window.TAIL == null || window.TAIL < OUTRO_LEN + 1.2) window.TAIL = OUTRO_LEN + 1.4;
window.OUTRO_LEN = OUTRO_LEN;
M.outro = (o = {}) => {
  const bg = o.bg || '#0F1115', ink = o.ink || '#FFFFFF', acc = o.accent || '#F2B705', sub = o.sub || 'rgba(255,255,255,.62)';
  const font = o.font || 'Inter', credits = o.credits || '';
  const el = document.createElement('div');
  el.id = 'qaOutro';
  el.style.cssText = `position:absolute;left:0;top:0;width:1920px;height:1080px;z-index:90;background:${bg};overflow:hidden`;
  el.innerHTML = `
    <svg width="1920" height="1080" style="position:absolute;left:0;top:0">
      <circle id="qaRing" cx="960" cy="430" r="92" fill="none" stroke="${acc}" stroke-width="6" transform="rotate(-90 960 430)"/>
    </svg>
    <div id="qaMark" style="position:absolute;left:868px;top:338px;width:184px;height:184px;display:flex;align-items:center;justify-content:center;font:800 104px/1 '${font}';color:${ink}">Q</div>
    <div id="qaBy" style="position:absolute;left:0;width:1920px;top:568px;text-align:center;font:600 30px '${font}';letter-spacing:.32em;color:${sub};text-transform:uppercase">Video by</div>
    <div id="qaName" style="position:absolute;left:0;width:1920px;top:612px;text-align:center;font:800 112px/1.05 '${font}';letter-spacing:-.01em;color:${ink};white-space:nowrap">Quest Academy</div>
    <svg width="1920" height="20" style="position:absolute;left:0;top:756px"><line id="qaLine" x1="860" y1="10" x2="1060" y2="10" stroke="${acc}" stroke-width="6" stroke-linecap="round"/></svg>
    <div id="qaCred" style="position:absolute;left:200px;width:1520px;top:990px;text-align:center;font:500 14px/1.4 Inter;color:${sub}">${credits}</div>`;
  document.getElementById('stage').appendChild(el);
  const $ = s => el.querySelector(s);
  let t0 = null;
  M.on(t => {
    if (t0 === null) { t0 = (o.start != null ? o.start : M.T() - OUTRO_LEN); window.SFX.push([+(t0 + 0.02).toFixed(3), 'whoosh', 0.2, 0]); window.SFX.push([+(t0 + 0.85).toFixed(3), 'chime', 0.22, 0]); }
    const u = t - t0;
    if (u < 0) { M.hide(el, true); return; }
    M.hide(el, false);
    // card wipes in from bottom with a soft spring (clip), then content builds
    const p = M.spring(u, M.SOFT);
    el.style.clipPath = p >= 1 ? 'none' : `inset(${((1 - p) * 100).toFixed(2)}% 0 0 0)`;
    M.draw($('#qaRing'), u + t0, t0 + 0.25, 0.8, M.io);
    M.vis($('#qaMark'), u + t0, t0 + 0.45, 1e9, { dy: 0, sc: 0.6, sp: M.POP, fade: 0.12 });
    M.vis($('#qaBy'), u + t0, t0 + 0.7, 1e9, { dy: 14 });
    M.rise($('#qaName'), u + t0, t0 + 0.85, { st: 0.08, sp: M.HEAVY });
    M.draw($('#qaLine'), u + t0, t0 + 1.3, 0.5, M.o3);
    M.vis($('#qaCred'), u + t0, t0 + 1.4, 1e9, { dy: 0, fade: 0.5 });
  });
};
})();
