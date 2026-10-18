// node tools/render.js samples/<id> [t0 t1]  -> samples/<id>/video.mp4 (no audio) + sfx.json
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs'); const { spawn } = require('child_process');
(async () => {
  const [dir, a, b] = process.argv.slice(2); const D = path.resolve(dir);
  const br = await chromium.launch({ args: ['--font-render-hinting=none', '--force-color-profile=srgb', '--disable-lcd-text', '--disable-threaded-animation'] });
  const pg = await br.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'warning' || m.type() === 'error') errs.push(m.text()); });
  await pg.goto('file://' + D + '/index.html?render'); await pg.waitForFunction(() => window.ready === true, null, { timeout: 30000 });
  const info = await pg.evaluate(() => ({ dur: window.DUR, sfx: window.SFX }));
  fs.writeFileSync(D + '/sfx.json', JSON.stringify(info));
  const FPS = 30, f0 = Math.round((+a || 0) * FPS), f1 = Math.round((b ? +b : info.dur) * FPS);
  const out = b ? `${D}/part_${a}_${b}.mp4` : `${D}/video.mp4`;
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '15', '-pix_fmt', 'yuv420p', '-color_range', 'tv', '-colorspace', 'bt709', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = f0; f < f1; f++) {
    await pg.evaluate(t => { window.seek(t); return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }, f / FPS);
    const buf = await pg.screenshot({ type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 90 === 0) process.stdout.write(`${path.basename(D)} ${(f / FPS).toFixed(1)}s\n`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await br.close();
  if (errs.length) console.log('PAGE ERRORS', errs.slice(0, 8));
  console.log('wrote', out, (f1 - f0), 'frames');
})();
