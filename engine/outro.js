/* Quest Academy branding - shared by every world.
   1. Corner logo: a small, faint Quest Academy mark in the top-right corner for the whole lesson.
   2. M.outro({ credits?, sub? }) - call once at the end of scene.js. It no longer draws a card:
      the official brand outro (assets/outro.mp4, with "VIDEO BY") is appended by tools/append_outro.sh,
      crossfading from this page's last frame. Here we only hold the last scene for a breath
      and, for case studies, show the photo credits during that hold. */
(function () {
window.OUTRO_LEN = 0;
if (window.TAIL == null) window.TAIL = 1.6;
let bug = null;
M.on(t => {
  if (!bug) {
    bug = document.createElement('img');
    bug.id = 'qaBug'; bug.src = '../../assets/qa-mark.svg'; bug.alt = '';
    bug.style.cssText = 'position:absolute;right:40px;top:30px;width:50px;height:50px;z-index:95;pointer-events:none';
    const st = document.getElementById('stage'); st.appendChild(bug);
    // brighter on dark worlds so the navy mark stays readable, fainter on light ones
    const m = getComputedStyle(st).backgroundColor.match(/\d+(\.\d+)?/g) || [255, 255, 255];
    const lum = (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
    bug.dataset.op = lum < 0.35 ? 0.9 : 0.55;
  }
  const k = Math.max(0, Math.min(1, (t - 0.6) / 0.6));
  bug.style.opacity = (+bug.dataset.op * k * k * (3 - 2 * k)).toFixed(3);
});
M.outro = (o = {}) => {
  const credits = o.credits || '';
  window.TAIL = credits ? 3.4 : 1.6;
  if (!credits) return;
  const el = document.createElement('div');
  el.id = 'qaCred';
  el.style.cssText = `position:absolute;left:160px;width:1600px;top:1028px;text-align:center;font:500 15px/1.4 Poppins;color:${o.sub || 'rgba(255,255,255,.7)'};z-index:91`;
  el.textContent = credits;
  document.getElementById('stage').appendChild(el);
  M.on(t => { const u = t - M.CUES.dur - 0.3; el.style.opacity = Math.max(0, Math.min(1, u / 0.5)).toFixed(3); });
};
})();
