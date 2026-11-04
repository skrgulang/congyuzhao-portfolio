// Run from GitHub Actions or locally after installing Playwright and Chromium.
// Browser-level checks complement smoke.mjs; they are not a manual visual audit.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = (process.argv[2] || 'https://congyuzhao.com').replace(/\/$/, '');
const cases = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects' },
  { name: 'aspire', path: '/projects/aspire-101' },
  { name: 'fish', path: '/projects/fish-and-ships' },
  { name: 'wildfire', path: '/projects/wildfire-evacuation-simulator' },
  { name: 'studio', path: '/projects/3am-game-studio' },
  { name: 'tempus', path: '/projects/tempus-lineus' },
  { name: 'gameplay', path: '/projects/gameplay-systems' }
];
const devices = [
  {name:'small-mobile',viewport:{width:320,height:700},isMobile:true,deviceScaleFactor:1},
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
        await page.evaluate(async () => { await document.fonts.ready; });
        await page.waitForTimeout(350);
        const dimensions=await page.evaluate(()=>({
          viewport:document.documentElement.clientWidth,
          content:document.documentElement.scrollWidth,
        }));
        if(dimensions.content > dimensions.viewport + 2)
          throw new Error('Horizontal overflow: '+dimensions.content+'px > '+dimensions.viewport+'px');
        // Wait for above-the-fold local images before evaluating their load state.
        const broken=await page.evaluate(async ()=>{
          const visible=Array.from(document.images).filter(img=>{
            const r=img.getBoundingClientRect();
            return r.top < window.innerHeight && r.bottom > 0 && new URL(img.src,location.href).origin===location.origin;
          });
          await Promise.all(visible.map(img=>img.complete ? Promise.resolve() :
            Promise.race([
              new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});}),
              new Promise(resolve=>setTimeout(resolve,5000))
            ])
          ));
          return visible.filter(img=>!img.complete || img.naturalWidth===0).map(img=>img.currentSrc||img.src);
        });
        if(broken.length) throw new Error('Broken above-the-fold images: '+broken.join(', '));
        if(device.isMobile && test.name==='home'){
          const menu=page.getByRole('button',{name:'Open navigation menu'});
          await menu.click();
          await page.getByRole('button',{name:'Close navigation menu'}).waitFor({state:'visible',timeout:5000});
          await page.keyboard.press('Escape');
          await page.getByRole('button',{name:'Open navigation menu'}).waitFor({state:'visible',timeout:5000});
          await menu.click();
          await page.getByRole('button',{name:'Close navigation menu'}).waitFor({state:'visible',timeout:5000});
          await page.locator('.newHero').click({position:{x:20,y:20}});
          await page.getByRole('button',{name:'Open navigation menu'}).waitFor({state:'visible',timeout:5000});
        }
        if(test.name==='fish'){
          const gallery=page.getByRole('region',{name:'Fish and Ships game images'});
          await gallery.scrollIntoViewIfNeeded();
          await gallery.getByRole('button',{name:/View .* enlarged/}).click();
          const dialog=page.getByRole('dialog',{name:'Expanded Fish and Ships screenshot'});
          await dialog.waitFor({state:'visible',timeout:5000});
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('Tab');
          if(!(await dialog.evaluate(el=>el.contains(document.activeElement)))) throw new Error('Lightbox focus left dialog');
          await page.keyboard.press('Escape');
          await dialog.waitFor({state:'hidden',timeout:5000});
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
