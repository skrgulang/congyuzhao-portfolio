// Run from GitHub Actions or locally after installing Playwright and Chromium.
// Browser-level checks complement smoke.mjs; they are not a manual visual audit.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = (process.argv[2] || 'https://congyuzhao.com').replace(/\/$/, '');
const cases = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects' },
  { name: 'aspire', path: '/projects/aspire-101' },
  { name: 'fish', path: '/projects/fish-and-ships' }
];
const devices = [
  {name:'mobile',viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1},
  {name:'desktop',viewport:{width:1440,height:900},isMobile:false,deviceScaleFactor:1}
];
let failures = 0;
await mkdir('qa-screenshots', {recursive:true});
const browser = await chromium.launch({headless:true});
try {
  for (const device of devices) {
    const context = await browser.newContext({...device, reducedMotion:'reduce'});
    const page = await context.newPage();
    for (const test of cases) {
      const label = device.name + '/' + test.name;
      try {
        const response = await page.goto(base + test.path, {waitUntil:'domcontentloaded',timeout:30000});
        if (!response?.ok()) throw new Error('HTTP ' + (response?.status() ?? 'no response'));
        await page.locator('body').waitFor({state:'visible'});
        await page.evaluate(() => document.fonts.ready);
        const dimensions=await page.evaluate(()=>({
          viewport:document.documentElement.clientWidth,
          content:document.documentElement.scrollWidth,
        }));
        if(dimensions.content > dimensions.viewport + 2)
          throw new Error('Horizontal overflow: '+dimensions.content+'px > '+dimensions.viewport+'px');
        // Check existing local images which have finished loading; lazy images can be outside viewport.
        const broken=await page.locator('img').evaluateAll(images=>images.filter(img=>{
          const r=img.getBoundingClientRect();
          const visible=r.top < window.innerHeight && r.bottom > 0;
          return visible && img.complete && img.naturalWidth===0;
        }).map(img=>img.currentSrc||img.src));
        if(broken.length) throw new Error('Broken above-the-fold images: '+broken.join(', '));
        if(device.name==='mobile' && test.name==='home'){
          const menu=page.getByRole('button',{name:'Open navigation menu'});
          await menu.click();
          if(await page.getByRole('button',{name:'Close navigation menu'}).count()!==1) throw new Error('Menu failed to open');
          await page.keyboard.press('Escape');
          if(await page.getByRole('button',{name:'Open navigation menu'}).count()!==1) throw new Error('Menu failed to close via Escape');
        }
        await page.screenshot({path:'qa-screenshots/'+device.name+'-'+test.name+'.png',fullPage:true,animations:'disabled'});
        console.log('PASS',label);
      } catch(e) {
        failures++;
        console.error('FAIL',label,e.message);
        await page.screenshot({path:'qa-screenshots/'+device.name+'-'+test.name+'-failure.png',fullPage:false}).catch(()=>{});
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}
if(failures){console.error(failures+' browser checks failed');process.exitCode=1}
else console.log('All '+(devices.length*cases.length)+' browser checks passed');
