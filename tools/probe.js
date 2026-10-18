// node tools/probe.js samples/<id> out.png t1 t2 ...  -> contact sheet (each still 640x360, 3 per row)
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs'); const { execSync } = require('child_process');
(async () => {
  const [dir, out, ...ts] = process.argv.slice(2); const D = path.resolve(dir);
  const br = await chromium.launch({ args: ['--font-render-hinting=none', '--force-color-profile=srgb', '--disable-lcd-text'] });
  const pg = await br.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'warning' || m.type() === 'error') errs.push(m.text()); });
  await pg.goto('file://' + D + '/index.html?render'); await pg.waitForFunction(() => window.ready === true, null, { timeout: 30000 });
  const tmp = fs.mkdtempSync('/tmp/pr');
  for (let i = 0; i < ts.length; i++) {
    await pg.evaluate(t => { window.seek(t); return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }, +ts[i]);
    await pg.screenshot({ path: `${tmp}/${String(i).padStart(3, '0')}.png` });
  }
  await br.close();
  const big = process.env.BIG === '1';
  const cols = big ? 1 : Math.min(3, ts.length), rows = Math.ceil(ts.length / cols);
  const lab = ts.map((t, i) => i).join('');
  execSync(`ffmpeg -loglevel error -y -i ${tmp}/%03d.png -vf "scale=${big ? 1920 : 640}:-1,tile=${cols}x${rows}:padding=6:color=white" -frames:v 1 ${out}`);
  console.log('sheet', out, 'times', ts.join(' '));
  if (errs.length) console.log('PAGE ERRORS', errs.slice(0, 8));
})();
