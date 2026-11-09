// Smoke-test the publicly deployed portfolio without any private credentials.
// Usage: npm run check:live -- https://congyuzhao.com
const base = (process.argv[2] || 'https://congyuzhao.com').replace(/\/$/, '');
const pages = [
  ['/', 'Congyu Zhao'],
  ['/projects', 'Projects'],
  ['/videos', 'Work in'],
  ['/resume', 'Resume'],
  ['/projects/aspire-101', 'Aspire 101'],
  ['/projects/fish-and-ships', 'Fish and Ships'],
  ['/projects/wildfire-evacuation-simulator', 'Wildfire Evacuation Simulator'],
  ['/projects/3am-game-studio', '3AM Game Studio'],
  ['/projects/tempus-lineus', 'Tempus Lineus'],
  ['/projects/gameplay-systems', 'Gameplay Systems'],
];
const images = [
  '/images/hero-recovered.jpg',
  '/cz-mark.svg',
  '/showcase/aspire-onboarding-hq.jpg',
  '/showcase/aspire-mobile-board.png',
  '/showcase/aspire-web-board.png',
  '/showcase/fish-gameplay-hq.jpg',
  '/showcase/fish-inventory-hq.jpg',
  '/showcase/fish-island-hq.jpg',
  '/showcase/aspire-ios-real-gallery.webp',
  ...['home','campus-pulse','browse','create-post','inbox','profile','settings'].map(name=>'/showcase/aspire-ios-'+name+'.webp'),
  ...['game-pov','building-lineart','geometry-test'].map(name=>'/showcase/tempus-'+name+'-poster.webp'),
];
const videos = ['game-pov','building-lineart','geometry-test'].map(name=>'/showcase/tempus-'+name+'.mp4');

async function check(path, expectedText) {
  const url = new URL(path, base);
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'user-agent': 'portfolio-smoke-check/1.0' }
    });
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok) throw new Error('HTTP ' + response.status);
    if (expectedText) {
      if (!contentType.includes('text/html')) throw new Error('Expected HTML, got ' + contentType);
      const html = await response.text();
      if (!html.includes(expectedText)) throw new Error('Missing expected content: ' + expectedText);
      const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)].map(match => match[0]);
      // A local preview still publishes production canonicals; compare to the public origin.
      const canonicalOrigin = process.env.CANONICAL_ORIGIN ||
        (['localhost','127.0.0.1'].includes(new URL(base).hostname) ? 'https://congyuzhao.com' : base);
      const expectedCanonical = new URL(path, canonicalOrigin);
      const actualHref = canonical[0]?.match(/\bhref="([^"]+)"/)?.[1];
      const normalize = value => {
        const url = new URL(value);
        return url.origin + (url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '')) + url.search;
      };
      if (canonical.length !== 1 || !actualHref || normalize(actualHref) !== normalize(expectedCanonical.href))
        throw new Error('Expected one matching canonical link: ' + expectedCanonical.href);
      if (!html.includes('property="og:image"'))
        throw new Error('Missing social sharing image metadata');
      if (html.includes(' | Congyu Zhao | Congyu Zhao'))
        throw new Error('Duplicate site name in page title');
    } else if (!contentType.startsWith('image/')) {
      throw new Error('Expected image, got ' + contentType);
    }
    console.log('PASS', path);
    return true;
  } catch (error) {
    console.error('FAIL', path, '-', error.message);
    return false;
  }
}

async function checkCrawlerFile(path, expectedText) {
  try {
    const response = await fetch(new URL(path, base), {signal: AbortSignal.timeout(15000)});
    if(!response.ok) throw new Error('HTTP ' + response.status);
    const body = await response.text();
    if(!body.includes(expectedText)) throw new Error('Missing expected crawler content');
    console.log('PASS', path);
    return true;
  } catch(error) {
    console.error('FAIL',path,'-',error.message);
    return false;
  }
}

async function checkNotFound() {
  const path='/projects/this-project-does-not-exist';
  try {
    const response=await fetch(new URL(path,base),{redirect:'follow',signal:AbortSignal.timeout(15000)});
    const html=await response.text();
    if(response.status!==404) throw new Error('Expected HTTP 404, received '+response.status);
    if(!html.includes('Wrong turn') || !html.includes('/projects'))
      throw new Error('Custom 404 recovery navigation not found');
    console.log('PASS',path,'(404 recovery)');
    return true;
  } catch(error) {
    console.error('FAIL',path,'-',error.message);
    return false;
  }
}

async function checkVideo(path) {
  try {
    const response=await fetch(new URL(path,base),{
      method:'HEAD',redirect:'follow',signal:AbortSignal.timeout(15000),
      headers:{'user-agent':'portfolio-smoke-check/1.0'}
    });
    if(!response.ok)throw new Error('HTTP '+response.status);
    if(!(response.headers.get('content-type')||'').startsWith('video/mp4'))
      throw new Error('Expected video/mp4, got '+response.headers.get('content-type'));
    console.log('PASS',path);
    return true;
  }catch(error){
    console.error('FAIL',path,'-',error.message);
    return false;
  }
}
async function checkShowcaseMarkup(path, expectedAssets) {
  try {
    const response = await fetch(new URL(path, base), {
      signal: AbortSignal.timeout(15000),
      headers: {'user-agent': 'portfolio-showcase-audit/1.0'}
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const html = await response.text();
    const missing = expectedAssets.filter(asset => !html.includes(asset));
    if (missing.length) throw new Error('Media not referenced in rendered HTML: ' + missing.join(', '));
    console.log('PASS', path, '(showcase links)');
    return true;
  } catch(error) {
    console.error('FAIL', path, '-', error.message);
    return false;
  }
}
const showcasePages = [
  ['/', ['aspire-ios-home.webp','tempus-building-lineart-poster.webp','https://www.youtube.com/watch?v=_tbFyFfGuR0']],
  ['/projects', ['aspire-ios-home.webp','tempus-building-lineart-poster.webp']],
  ['/projects/aspire-101', ['aspire-ios-real-gallery.webp',...['home','campus-pulse','browse','create-post','inbox','profile','settings'].map(name=>'aspire-ios-'+name+'.webp')]],
  ['/projects/tempus-lineus', ['youtube-nocookie.com/embed/_tbFyFfGuR0','youtube-nocookie.com/embed/nZFQaNzNiXE',...['game-pov','building-lineart','geometry-test'].map(name=>'tempus-'+name+'.mp4')]],
];
async function checkResumePdf(){
 const path='/Congyu_Zhao_Resume.pdf';
 try{
  const response=await fetch(new URL(path,base),{signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('HTTP '+response.status);
  if(!(response.headers.get('content-type')||'').includes('application/pdf'))
   throw new Error('Expected application/pdf response');
  const bytes=new Uint8Array(await response.arrayBuffer());
  if(bytes.length<1000||String.fromCharCode(...bytes.slice(0,5))!=='%PDF-')
   throw new Error('PDF file missing or invalid');
  console.log('PASS downloadable PDF resume',bytes.length+' bytes');
  return true;
 }catch(error){
  console.error('FAIL downloadable PDF resume',error.message);
  return false;
 }
}
async function checkVideoArchive(){
 const ids=['EZ3jDLwVn3w','J74rR5jbsDQ','3z4tX81RsAE','TUWHsARcuf8','90YX1FazPbs','irsFHlyWK48'];
 try{
  const response=await fetch(new URL('/videos',base),{signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const html=await response.text();
  const missing=ids.filter(id=>!html.includes(id));
  if(missing.length)throw new Error('Missing user-provided video IDs: '+missing.join(', '));
  if(!html.includes('More Work')&&!html.includes('VIDEO ARCHIVE'))throw new Error('Archive title missing');
  console.log('PASS six portfolio video links in /videos');
  return true;
 }catch(error){console.error('FAIL video archive',error.message);return false;}
}
const results = [];
results.push(await checkResumePdf());
results.push(await checkVideoArchive());
for (const [path, assets] of showcasePages) results.push(await checkShowcaseMarkup(path, assets));
for (const [path, text] of pages) results.push(await check(path, text));
results.push(await checkNotFound());
results.push(await checkCrawlerFile('/sitemap.xml', '/projects/aspire-101'));
results.push(await checkCrawlerFile('/sitemap.xml', '/resume'));
results.push(await checkCrawlerFile('/sitemap.xml', '/videos'));
results.push(await checkCrawlerFile('/robots.txt', '/sitemap.xml'));
for (const path of images) results.push(await check(path));
for (const path of videos) results.push(await checkVideo(path));
const failures = results.filter(ok => !ok).length;
console.log('\n' + (results.length - failures) + '/' + results.length + ' checks passed at ' + base);
if (failures) process.exitCode = 1;
