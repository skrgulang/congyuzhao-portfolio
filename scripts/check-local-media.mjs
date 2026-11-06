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
 'public/showcase/aspire-ios-real-gallery.webp',
 ...screens.map(name=>'public/showcase/aspire-ios-'+name+'.webp'),
 ...clips.flatMap(name=>['public/showcase/tempus-'+name+'.mp4','public/showcase/tempus-'+name+'-poster.webp']),
 'public/showcase/fish-gameplay-hq.jpg'
];
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
console.log('PASS offline media audit: '+assets.length+' assets and page references.');
