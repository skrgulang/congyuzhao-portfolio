// WebKit targeted navigation QA. Runs against a locally built Next.js server.
// WebKit approximates Safari's rendering engine; this is not an iOS device test.
import {webkit} from 'playwright';
import {mkdir} from 'node:fs/promises';

const origin=(process.argv[2]||'http://127.0.0.1:3000').replace(/\/$/,'');
const sizes=[320,390,768,1024];
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
   const nav=page.locator('.newNav'),resume=page.locator('.newNav .navResume'),menu=page.getByRole('button',{name:'Open navigation menu'});
   const measurements=await page.evaluate(()=>{
    const rect=selector=>{const el=document.querySelector(selector);if(!el)return null;const r=el.getBoundingClientRect();return {x:r.x,right:r.right,width:r.width,top:r.top,bottom:r.bottom};};
    return {viewport:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,
      logo:rect('.newNav .newLogo'),resume:rect('.newNav .navResume'),
      hamburger:rect('.newNav .menuToggle'),nav:rect('.newNav')};
   });
   if(measurements.scrollWidth>measurements.viewport+2)throw Error('Horizontal overflow '+JSON.stringify(measurements));
   if(width<=900){
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
   }else if(await resume.isVisible())throw Error('Duplicate desktop Resume shortcut');
   if((await resume.getAttribute('href'))!=='/Congyu_Zhao_Resume.pdf')
    throw Error('Header Resume points to wrong PDF');
   const pdf=await page.request.get(origin+'/Congyu_Zhao_Resume.pdf',{timeout:15000});
   if(!pdf.ok()||!(pdf.headers()['content-type']||'').includes('application/pdf'))
    throw Error('Resume PDF inaccessible in WebKit QA');
   const bytes=await pdf.body();
   if(bytes.subarray(0,5).toString()!=='%PDF-')throw Error('Invalid PDF response header');
   await nav.screenshot({path:'qa-screenshots/webkit-header-'+width+'.png',animations:'disabled'});
   console.log('PASS WebKit header / Resume '+width+'px');
  }catch(err){failures++;console.error('FAIL WebKit '+width+'px:',err.stack||err.message);}
  finally{await context.close();}
 }
}finally{await browser.close();}
if(failures)process.exitCode=1;
