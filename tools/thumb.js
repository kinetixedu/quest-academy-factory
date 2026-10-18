// node tools/thumb.js videos/<slug>  -> videos/<slug>/thumbnail.jpg (1280x720)
// uses meta.json: { world, thumb: { title, accent_word, frame_t } } and config/categories.json for colours
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const D = path.resolve(process.argv[2]); const R = path.resolve(__dirname, '..');
  const meta = JSON.parse(fs.readFileSync(D + '/meta.json')); const cats = JSON.parse(fs.readFileSync(R + '/config/categories.json'));
  const cat = cats[meta.world]; const o = cat.outro;
  const br = await chromium.launch({ args: ['--font-render-hinting=none', '--force-color-profile=srgb'] });
  const pg = await br.newPage({ viewport: { width: 1920, height: 1080 } });
  await pg.goto('file://' + D + '/index.html?render'); await pg.waitForFunction(() => window.ready === true, null, { timeout: 60000 });
  const ft = meta.thumb.frame_t ?? 12;
  await pg.evaluate(t => { window.seek(t); const c = document.getElementById('cap'); if (c) c.style.display = 'none'; return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }, ft);
  await pg.screenshot({ path: D + '/thumb_frame.jpg', type: 'jpeg', quality: 92 });
  const tp = await br.newPage({ viewport: { width: 1280, height: 720 } });
  const data = { bg: o.bg, ink: o.ink, accent: o.accent, font: o.font, kicker: cat.category, title: meta.thumb.title, accent_word: meta.thumb.accent_word || '', frame: 'file://' + D + '/thumb_frame.jpg' };
  await tp.addInitScript(d => { window.THUMB = d; }, data);
  await tp.goto('file://' + R + '/tools/thumb.html'); await tp.waitForFunction(() => window.ready === true, null, { timeout: 30000 });
  await tp.screenshot({ path: D + '/thumbnail.jpg', type: 'jpeg', quality: 90 });
  await br.close(); console.log('thumbnail', D + '/thumbnail.jpg');
})();
