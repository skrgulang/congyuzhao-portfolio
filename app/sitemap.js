export default function sitemap() {
  const base = 'https://congyuzhao.com';
  const slugs = ['aspire-101','fish-and-ships','wildfire-evacuation-simulator','3am-game-studio','tempus-lineus','gameplay-systems'];
  return [{url:base,changeFrequency:'monthly',priority:1},{url:base+'/projects',changeFrequency:'monthly',priority:.8},{url:base+'/resume',changeFrequency:'monthly',priority:.75},{url:base+'/videos',changeFrequency:'monthly',priority:.75},...slugs.map(slug=>({url:base+'/projects/'+slug,changeFrequency:'monthly',priority:.7}))];
}
