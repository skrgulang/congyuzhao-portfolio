// Offline portfolio media audit: no network, browser, or credentials required.
import {readFile,stat} from 'node:fs/promises';
import {join} from 'node:path';
const root=process.cwd();
const read=name=>readFile(join(root,name),'utf8');
const assert=(value,message)=>{if(!value)throw new Error(message)};
const count=(value,needle)=>value.split(needle).length-1;
const [home,index,project,aspire]=await Promise.all([
 read('app/page.js'),read('app/projects/page.js'),
 read('app/projects/[slug]/page.js'),read('app/components/AspireCaseStudy.jsx')
]);
const screens=['home','campus-pulse','browse','create-post','inbox','profile','settings'];
const clips=['game-pov','building-lineart','geometry-test'];
const assets=[
 'public/Congyu_Zhao_Resume.pdf',
 'public/Congyu_Zhao_Resume_Uploaded.pdf',
 'public/showcase/aspire-ios-real-gallery.webp',
 ...screens.map(name=>'public/showcase/aspire-ios-'+name+'.webp'),
 ...clips.flatMap(name=>['public/showcase/tempus-'+name+'.mp4','public/showcase/tempus-'+name+'-poster.webp']),
 'public/showcase/fish-gameplay-hq.jpg'
];
const resumePdf=await readFile(join(root,'public/Congyu_Zhao_Resume.pdf'));
assert(resumePdf.subarray(0,5).toString()==='%PDF-','The public resume must begin with a PDF signature');
const pdfTail=resumePdf.subarray(Math.max(0,resumePdf.length-2048)).toString('latin1');
assert(pdfTail.includes('%%EOF'),'Resume PDF is missing its end-of-file marker');
const startXref=pdfTail.match(/startxref\s+(\d+)\s+%%EOF/);
assert(startXref,'Resume PDF is missing its final cross-reference offset');
const xrefOffset=Number(startXref[1]);
assert(Number.isSafeInteger(xrefOffset)&&xrefOffset>0&&xrefOffset<resumePdf.length,
 'Resume PDF cross-reference offset is outside the file');
const xrefLead=resumePdf.subarray(xrefOffset,xrefOffset+8).toString('latin1');
assert(xrefLead.startsWith('xref')||/\d+ \d+ obj/.test(xrefLead),
 'Resume PDF cross-reference offset does not reference a valid structure');
console.log('PASS downloadable resume PDF header, EOF and cross-reference structure');
const legacyResumePdf=await readFile(join(root,'public/Congyu_Zhao_Resume_Uploaded.pdf'));
assert(resumePdf.equals(legacyResumePdf),'Resume PDF aliases must contain the same exact bytes');
for(const path of assets){
 const file=await stat(join(root,path));
 assert(file.isFile()&&file.size>0,'Missing or empty media: '+path);
 console.log('PASS media',path);
}
for(const slug of screens)assert(aspire.includes("slug:'"+slug+"'"),'Missing iOS gallery entry: '+slug);
assert(aspire.includes('aspire-ios-real-gallery.webp')&&aspire.includes("'/showcase/aspire-ios-'"),'Missing real iOS gallery markup');
assert(home.includes('aspire-ios-home.webp')&&index.includes('aspire-ios-home.webp'),'Real iOS Home screenshot missing from portfolio entry points');
assert(count(home,'<section className="tempusHome frame')===1,'Duplicate Tempus homepage section');
assert(count(project,'<section className="tempusShowcase frame')===1,'Expected exactly one Tempus case study media section');
assert(count(project,'<section className="tempusCaseStudy frame')===0,'Legacy duplicate Tempus case study section reintroduced');
for(const id of ['_tbFyFfGuR0','nZFQaNzNiXE'])assert(project.includes('embed/'+id),'Missing original YouTube embed '+id);
for(const name of clips){
 assert(project.includes('tempus-'+name+'.mp4')&&project.includes('tempus-'+name+'-poster.webp'),'Missing local Tempus video or poster: '+name);
}
// iOS Safari may render an undecorated north-east arrow as a blue emoji glyph.
// The text-variation selector U+FE0E keeps portfolio link arrows monochrome.
for(const [name,source] of [
 ['app/page.js',home],['app/projects/page.js',index],
 ['app/projects/[slug]/page.js',project],['app/components/AspireCaseStudy.jsx',aspire],
 ['app/components/ProjectMediaGallery.jsx',await read('app/components/ProjectMediaGallery.jsx')],
 ['app/not-found.js',await read('app/not-found.js')]
]){
 assert(!/[↗↘](?!\uFE0E)/u.test(source),'Emoji-prone diagonal arrow in '+name);
}
for(const [name,source] of [
 ['app/page.js',home],['app/projects/page.js',index],
 ['app/projects/[slug]/page.js',project],['app/resume/page.js',await read('app/resume/page.js')]
]){
 assert(!source.includes('href="/Congyu_Zhao_Resume_Uploaded.pdf"'),
   'Old Resume URL remains in rendered navigation: '+name);
}
const notFound=await read('app/not-found.js');
assert(notFound.includes('src="/cz-mark.svg"'),'404 page must use the current CZ logo');
assert(notFound.includes('href="/Congyu_Zhao_Resume.pdf"'),'404 page must link to canonical PDF');
console.log('PASS canonical resume links and identical PDF alias');
console.log('PASS text-only link arrows (no blue emoji glyphs).');
console.log('PASS offline media audit: '+assets.length+' assets and page references.');
