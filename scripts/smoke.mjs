// Smoke-test the publicly deployed portfolio without any private credentials.
// Usage: npm run check:live -- https://congyuzhao.com
const base = (process.argv[2] || 'https://congyuzhao.com').replace(/\/$/, '');
const pages = [
  ['/', 'Congyu Zhao'],
  ['/projects', 'Projects'],
  ['/projects/aspire-101', 'Aspire 101'],
  ['/projects/fish-and-ships', 'Fish and Ships'],
  ['/projects/wildfire-evacuation-simulator', 'Wildfire Evacuation Simulator'],
  ['/projects/3am-game-studio', '3AM Game Studio'],
  ['/projects/tempus-lineus', 'Tempus Lineus'],
  ['/projects/gameplay-systems', 'Gameplay Systems'],
];
const images = [
  '/images/hero-recovered.jpg',
  '/showcase/aspire-onboarding-hq.jpg',
  '/showcase/aspire-mobile-board.png',
  '/showcase/aspire-web-board.png',
  '/showcase/fish-gameplay-hq.jpg',
  '/showcase/fish-inventory-hq.jpg',
  '/showcase/fish-island-hq.jpg',
];

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

const results = [];
for (const [path, text] of pages) results.push(await check(path, text));
for (const path of images) results.push(await check(path));
const failures = results.filter(ok => !ok).length;
console.log('\n' + (results.length - failures) + '/' + results.length + ' checks passed at ' + base);
if (failures) process.exitCode = 1;
