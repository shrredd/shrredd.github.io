// Renders the homepage link-preview video and still from /og/home/ (og/home.html).
//
// From the repo root, with the Jekyll preview running:
//   npm i --prefix /tmp/og-tools playwright-core ffmpeg-static
//   NODE_PATH=/tmp/og-tools/node_modules node _og/render.js [page-url]
//
// Writes static/og/home.mp4 (an 8-second loop, H.264, 1200x630, no sound) and
// static/og/home.jpg (the still for apps that show no video). It needs Chrome.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { chromium } = require('playwright-core');
const ffmpeg = require('ffmpeg-static');

const PAGE = process.argv[2] || 'http://127.0.0.1:4124/og/home/';
const OUT = path.join(__dirname, '..', 'static', 'og');
const FPS = 30;
const SECONDS = 8;
// The still: the top books turned to their logos, one mid-turn, the rest
// still cloth, so one frame shows both the press shelf and the portfolio.
const STILL_TURNED = 3;

(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  await page.goto(PAGE, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Hold every animation still and step it by hand, so each frame is exact.
  const seek = (ms) => page.evaluate((t) => {
    document.getAnimations().forEach((animation) => {
      animation.pause();
      animation.currentTime = t;
    });
  }, ms);

  for (let frame = 0; frame < FPS * SECONDS; frame++) {
    await seek((frame * 1000) / FPS);
    await page.screenshot({ path: path.join(tmp, `f${String(frame).padStart(4, '0')}.png`) });
  }
  await page.evaluate((turned) => {
    document.getAnimations().forEach((animation) => {
      const row = animation.effect.target.closest('.og-row');
      const i = Number(getComputedStyle(row).getPropertyValue('--i'));
      const delay = i * 110;
      let t = 0; // cloth side up
      if (animation.animationName === 'og-glint') t = 0;
      else if (i < turned) t = delay + 3000; // logos up
      else if (i === turned) t = delay + 880 + 560; // most of the way over
      animation.currentTime = t;
    });
  }, STILL_TURNED);
  await page.screenshot({ path: path.join(tmp, 'still.png') });
  await browser.close();

  fs.mkdirSync(OUT, { recursive: true });
  const run = (args) => {
    const result = spawnSync(ffmpeg, ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
    if (result.status) process.exit(result.status);
  };
  run(['-framerate', String(FPS), '-i', path.join(tmp, 'f%04d.png'),
    '-vf', 'scale=1200:630:flags=lanczos,format=yuv420p',
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '23',
    '-movflags', '+faststart', '-an', path.join(OUT, 'home.mp4')]);
  run(['-i', path.join(tmp, 'still.png'), '-vf', 'scale=1200:630:flags=lanczos', '-q:v', '3', path.join(OUT, 'home.jpg')]);
  fs.rmSync(tmp, { recursive: true, force: true });

  for (const file of ['home.mp4', 'home.jpg']) {
    console.log(`${file}: ${Math.round(fs.statSync(path.join(OUT, file)).size / 1024)} KB`);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
