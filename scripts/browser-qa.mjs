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
async function menuOpenForAnchor(page){
  await page.getByRole('button',{name:'Open navigation menu'}).click();
  await page.getByRole('button',{name:'Close navigation menu'}).waitFor({state:'visible'});
}
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
          const firstNavFocused=await page.locator('#main-navigation a').first().evaluate(el=>document.activeElement===el);
          if(!firstNavFocused) throw new Error('Opening mobile navigation did not move focus into menu');
          await page.keyboard.press('Escape');
          await page.getByRole('button',{name:'Open navigation menu'}).waitFor({state:'visible',timeout:5000});
          await menu.click();
          await page.getByRole('button',{name:'Close navigation menu'}).waitFor({state:'visible',timeout:5000});
          await page.locator('.newHero').click({position:{x:20,y:20}});
          await page.getByRole('button',{name:'Open navigation menu'}).waitFor({state:'visible',timeout:5000});
        }
        if(test.name==='home'){
          if(device.isMobile) await menuOpenForAnchor(page);
          await page.locator('#main-navigation').getByRole('link',{name:'About'}).click();
          await page.waitForTimeout(250);
          const focusedSection=await page.locator('#about').evaluate(el=>document.activeElement===el);
          if(!focusedSection) throw new Error('Navigation did not move keyboard focus to About content');
          if(device.isMobile) await page.getByRole('button',{name:'Open navigation menu'}).waitFor({state:'visible'});
          const offset=await page.locator('#about').evaluate(el=>el.getBoundingClientRect().top);
          const navHeight=await page.locator('.newNav').evaluate(el=>el.getBoundingClientRect().height);
          if(offset < navHeight-3) throw new Error('About anchor hidden beneath sticky header: '+offset+'px');
          await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
          await page.evaluate(()=>window.scrollTo({top:600,behavior:'instant'}));
          await page.waitForTimeout(200);
          const navTop=await page.locator('.newNav').evaluate(el=>el.getBoundingClientRect().top);
          if(Math.abs(navTop)>3) throw new Error('Sticky navigation lost while scrolling: top='+navTop);
          await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
          // Category filters must be linkable and restore correctly when navigating back.
          await page.getByRole('button',{name:/^Games/}).click();
          await page.waitForURL(/category=Games/);
          await page.getByText('Showing 3 of 6 projects').waitFor({state:'visible'});
          await page.getByRole('button',{name:/^Research/}).click();
          await page.waitForURL(/category=Research/);
          await page.goBack();
          await page.getByRole('button',{name:/^Games/}).waitFor({state:'visible'});
          if((await page.getByRole('button',{name:/^Games/}).getAttribute('aria-pressed'))!=='true')
            throw new Error('Back navigation did not restore Games project filter');
          await page.getByRole('button',{name:/^All/}).click();
          await page.getByText('Showing 6 of 6 projects').waitFor({state:'visible'});
          // Verify links opened in a fresh tab hydrate into the intended category.
          await page.goto(base+'/?category=Research',{waitUntil:'networkidle'});
          await page.getByText('Showing 1 of 6 projects').waitFor({state:'visible'});
          if((await page.getByRole('button',{name:/^Research/}).getAttribute('aria-pressed'))!=='true')
            throw new Error('Direct category URL did not initialize the Research filter');
        }
        if(test.name==='fish'){
          const gallery=page.getByRole('region',{name:'Fish and Ships game images'});
          await gallery.scrollIntoViewIfNeeded();
          await gallery.getByRole('button',{name:/View .* enlarged/}).click();
          const dialog=page.getByRole('dialog',{name:/Inventory and item management|Characters and gameplay|Island and terrain/});
          await dialog.waitFor({state:'visible',timeout:5000});
          await page.keyboard.press('ArrowRight');
          await page.getByRole('dialog',{name:/Characters and gameplay/}).waitFor({state:'visible'});
          if(device.isMobile){
            // Left swipe to the final frame, then right swipe back to gameplay.
            const swipe = async (from,to) => dialog.evaluate((element,{from,to})=>{
              const touch=x=>new Touch({identifier:1,target:element,clientX:x,clientY:150,pageX:x,pageY:150});
              element.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,changedTouches:[touch(from)],touches:[touch(from)],targetTouches:[touch(from)]}));
              element.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[touch(to)],touches:[],targetTouches:[]}));
            },{from,to});
            await swipe(240,100);
            await page.getByRole('dialog',{name:/Island and terrain/}).waitFor({state:'visible',timeout:5000});
            await swipe(100,240);
            await page.getByRole('dialog',{name:/Characters and gameplay/}).waitFor({state:'visible',timeout:5000});
          }
          await page.keyboard.press('Tab');
          if(!(await dialog.evaluate(el=>el.contains(document.activeElement)))) throw new Error('Lightbox focus left dialog');
          await page.keyboard.press('Escape');
          await dialog.waitFor({state:'hidden',timeout:5000});
          await page.waitForFunction(()=>{
            const trigger=document.querySelector('.galleryExpand');
            return Boolean(trigger && document.activeElement===trigger);
          },null,{timeout:5000});
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
