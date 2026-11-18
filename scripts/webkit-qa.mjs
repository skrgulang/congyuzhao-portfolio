// WebKit targeted navigation QA. Runs against a locally built Next.js server.
// WebKit approximates Safari's rendering engine; this is not an iOS device test.
import {webkit} from 'playwright';
import {mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const origin=(process.argv[2]||'http://127.0.0.1:3000').replace(/\/$/,'');
const sizes=[320,375,390,650,651,768,900,901,1024,1100,1101,1280];
await mkdir('qa-screenshots',{recursive:true});
const browser=await webkit.launch({headless:true});
let failures=0;
try{
 for(const width of sizes){
  const context=await browser.newContext({viewport:{width,height:820},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();
  try{
   const response=await page.goto(origin+'/',{waitUntil:'domcontentloaded',timeout:30000});
   if(!response?.ok())throw Error('Home response HTTP '+response?.status());
   await page.locator('.newNav').waitFor({state:'visible'});
   const viewportDeclaration=await page.locator('meta[name="viewport"]').getAttribute('content');
   if(!viewportDeclaration||!viewportDeclaration.includes('width=device-width'))
     throw Error('Missing width=device-width mobile viewport declaration');
   const nav=page.locator('.newNav'),resume=page.locator('.newNav .navResume'),menu=page.getByRole('button',{name:'Open navigation menu'});
   const measurements=await page.evaluate(()=>{
    const rect=selector=>{const el=document.querySelector(selector);if(!el)return null;const r=el.getBoundingClientRect();return {x:r.x,right:r.right,width:r.width,top:r.top,bottom:r.bottom};};
    return {viewport:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,
      logo:rect('.newNav .newLogo'),resume:rect('.newNav .navResume'),
      hamburger:rect('.newNav .menuToggle'),nav:rect('.newNav')};
   });
   if(measurements.scrollWidth>measurements.viewport+2)throw Error('Horizontal overflow '+JSON.stringify(measurements));
   if(width<=650){
    const clipped=await page.evaluate(()=>{
     const selectors=['.heroButtons a','.filters button','.newProjectGrid article'];
     const viewport=document.documentElement.clientWidth;
     return selectors.flatMap(selector=>[...document.querySelectorAll(selector)].filter(element=>{
      const rect=element.getBoundingClientRect();
      return rect.width>0&&(rect.left< -2||rect.right>viewport+2);
     }).map(element=>({selector,label:element.textContent?.slice(0,40),left:element.getBoundingClientRect().left,right:element.getBoundingClientRect().right})));
    });
    if(clipped.length)throw Error('Clipped home CTA/filter/project cards at '+width+'px: '+JSON.stringify(clipped));
   }
   if(width<=1100){
    if(!(await resume.isVisible())||!(await menu.isVisible()))throw Error('Resume/menu shortcuts missing at '+width+'px');
    const {logo,resume:r,hamburger}=measurements;
    if(logo.right>r.x+1||r.right>hamburger.x+1||hamburger.right>measurements.viewport+2)
      throw Error('Overlapping mobile/tablet nav controls '+JSON.stringify(measurements));
    await menu.click();
    const navLinks=page.locator('#main-navigation');
    if(!(await navLinks.isVisible()))throw Error('Mobile/tablet navigation failed to open');
    const menuResume=navLinks.getByRole('link',{name:'Resume'});
    if((await menuResume.getAttribute('href'))!=='/Congyu_Zhao_Resume.pdf')
      throw Error('Resume menu item points to stale PDF');
    await page.keyboard.press('Escape');
    if(await navLinks.isVisible())throw Error('Escape did not close mobile/tablet navigation');
    // Shift+Tab from the first disclosed link moves focus outside navigation.
    // The menu must close without trapping keyboard users.
    await menu.click();
    await navLinks.waitFor({state:'visible'});
    await page.keyboard.press('Shift+Tab');
    await navLinks.waitFor({state:'hidden',timeout:3000});
    if(await navLinks.isVisible())throw Error('Menu remained open when keyboard focus left navigation');
   }else{
    if(await resume.isVisible())throw Error('Duplicate desktop Resume shortcut');
    const desktopNav=page.locator('#main-navigation');
    if(!(await desktopNav.isVisible()))throw Error('Desktop navigation unexpectedly collapsed at '+width+'px');
    const desktopResume=desktopNav.getByRole('link',{name:'Resume'});
    if(!(await desktopResume.isVisible()))throw Error('Desktop Resume navigation item hidden');
    if((await desktopResume.getAttribute('href'))!=='/Congyu_Zhao_Resume.pdf')
      throw Error('Desktop Resume item points to wrong PDF');
    const navBounds=await desktopNav.boundingBox();
    const logoBounds=await page.locator('.newNav .newLogo').boundingBox();
    const contactBounds=await page.locator('.newNav .navContact').boundingBox();
    if(!navBounds||!logoBounds||!contactBounds||
      navBounds.x<logoBounds.x+logoBounds.width-1 ||
      navBounds.x+navBounds.width>contactBounds.x+1)
      throw Error('Desktop nav overlaps logo or contact at '+width+'px');
   }
   if((await resume.getAttribute('href'))!=='/Congyu_Zhao_Resume.pdf')
    throw Error('Header Resume points to wrong PDF');
   // Test both real public PDF aliases, not just the PDF signature. The
   // uploaded original is exactly 80,611 bytes with this SHA-256 digest.
   // One pass per build is enough; the response bytes do not depend on width.
   if(width===320){
    const expected='375deed86cca7d8bf23bc23f92151e11a8cf40a30245107039157a95c5d5cced';
    for(const path of ['/Congyu_Zhao_Resume.pdf','/Congyu_Zhao_Resume_Uploaded.pdf']){
     const pdf=await page.request.get(origin+path,{timeout:15000});
     if(!pdf.ok()||!(pdf.headers()['content-type']||'').includes('application/pdf'))
      throw Error('Resume PDF inaccessible in WebKit QA: '+path);
     const bytes=await pdf.body();
     if(bytes.length!==80611||bytes.subarray(0,5).toString()!=='%PDF-')
      throw Error('Resume PDF size/signature mismatch: '+path+' ('+bytes.length+' bytes)');
     const actual=createHash('sha256').update(bytes).digest('hex');
     if(actual!==expected)throw Error('Resume PDF SHA-256 mismatch: '+path+' ('+actual+')');
    }
   }
   await nav.screenshot({path:'qa-screenshots/webkit-header-'+width+'.png',animations:'disabled'});
   if(width===320||width===768||width===1101)
     await page.screenshot({path:'qa-screenshots/webkit-home-'+width+'.png',fullPage:true,animations:'disabled'});
   // Inspect actual secondary pages too: mobile portfolio isn't just the homepage.
   for(const route of ['/projects','/videos','/resume','/projects/aspire-101','/projects/fish-and-ships']){
    const secondary=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:30000});
    if(!secondary?.ok())throw Error('HTTP '+secondary?.status()+' on '+route);
    const geometry=await page.evaluate(()=>({
      viewport:document.documentElement.clientWidth,
      content:document.documentElement.scrollWidth
    }));
    if(geometry.content>geometry.viewport+2)
      throw Error('Horizontal overflow at '+width+'px on '+route+': '+JSON.stringify(geometry));
    if(width<=390){
      const allLinks=page.locator('.caseNav a');
      if(await allLinks.count()<2)throw Error('Secondary page navigation missing on '+route);
    }
    if(route==='/videos'){
      const cards=page.locator('.videoArchiveCard');
      if(await cards.count()!==6)throw Error('Expected six mini-game cards on '+route);
      if(width<=650){
       const first=await cards.nth(0).boundingBox();
       const second=await cards.nth(1).boundingBox();
       if(!first||!second||second.y<first.y+first.height-1)
         throw Error('Mobile mini-game cards do not stack vertically at '+width+'px');
      }
      if(width===320||width===390){
       const firstButton=cards.first().getByRole('button',{name:/Play .* on this page/});
       await firstButton.click();
       const player=page.locator('.videoArchiveViewer');
       await player.waitFor({state:'visible'});
       await page.locator('#selected-video').waitFor({state:'visible'});
       const playerSource=page.locator('#selected-video iframe');
       if(!(await playerSource.getAttribute('src')).includes('EZ3jDLwVn3w'))
         throw Error('Wrong first mini-game embedded');
       await player.getByRole('button',{name:'Play next mini game'}).click();
       if(!(await playerSource.getAttribute('src')).includes('J74rR5jbsDQ'))
         throw Error('Next mini-game failed on WebKit '+width+'px');
       await player.getByRole('button',{name:'Play previous mini game'}).click();
       if(!(await playerSource.getAttribute('src')).includes('EZ3jDLwVn3w'))
         throw Error('Previous mini-game failed on WebKit '+width+'px');
       const playerRect=await player.boundingBox();
       const gridRect=await page.locator('.videoArchiveGrid').boundingBox();
       if(!playerRect||!gridRect||playerRect.y>=gridRect.y)
         throw Error('Mobile video player must be visible above the card grid');
       await player.getByRole('button',{name:'Close player ×'}).click();
       if(await page.locator('.videoArchiveViewer iframe').count())
         throw Error('Mini-game iframe remains mounted after closing player');
       // Open the user-shareable third video directly, not only from the
       // gallery. Check mobile controls against the real viewport width.
       await page.goto(origin+'/videos?game=03',{waitUntil:'domcontentloaded',timeout:30000});
       const thirdPlayer=page.locator('#selected-video');
       await thirdPlayer.waitFor({state:'visible',timeout:5000});
       const thirdIframe=thirdPlayer.locator('iframe');
       if(!(await thirdIframe.getAttribute('src')).includes('3z4tX81RsAE'))
         throw Error('Wrong video loaded from deep link at '+width+'px');
       const thirdControls=[
        thirdPlayer.getByRole('button',{name:'Play previous mini game'}),
        thirdPlayer.getByRole('link',{name:/Watch original on YouTube/}),
        thirdPlayer.getByRole('button',{name:'Play next mini game'}),
        thirdPlayer.getByRole('button',{name:'Close player ×'}),
        thirdPlayer.getByRole('link',{name:/Shareable link to Mini Game 03/})
       ];
       const mobileGeometry=await page.evaluate(()=>({
        width:document.documentElement.clientWidth,
        scrollWidth:document.documentElement.scrollWidth
       }));
       if(mobileGeometry.scrollWidth>mobileGeometry.width+2)
        throw Error('Mini Game 03 mobile page overflows at '+width+'px: '+JSON.stringify(mobileGeometry));
       for(const control of thirdControls){
        if(!(await control.isVisible()))throw Error('Third video mobile control not visible at '+width+'px');
        const bounds=await control.boundingBox();
        if(!bounds||bounds.width<30||bounds.height<20||
           bounds.x< -2||bounds.x+bounds.width>mobileGeometry.width+2)
         throw Error('Third video control clipped at '+width+'px: '+JSON.stringify(bounds));
       }
       if((await thirdPlayer.getByRole('link',{name:/Watch original on YouTube/}).getAttribute('href'))!==
          'https://www.youtube.com/watch?v=3z4tX81RsAE')
        throw Error('Mini Game 03 fallback points to wrong YouTube recording');
       await page.screenshot({path:'qa-screenshots/webkit-video-03-'+width+'.png',fullPage:true,animations:'disabled'});
      }
    }
    if(width===320||width===390||width===768){
      const name=route.replaceAll('/','-').replace(/^-/, '');
      await page.screenshot({path:'qa-screenshots/webkit-'+name+'-'+width+'.png',fullPage:route==='/videos',animations:'disabled'});
    }
   }
   console.log('PASS WebKit header / Resume and inner pages '+width+'px');
  }catch(err){failures++;console.error('FAIL WebKit '+width+'px:',err.stack||err.message);}
  finally{await context.close();}
 }
}finally{await browser.close();}
if(failures)process.exitCode=1;
