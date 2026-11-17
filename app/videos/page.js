import Link from 'next/link';
import WorkVideos from '../components/WorkVideos';

import {workVideos} from './data';

const archiveDescription='Six mini-games independently created by Congyu Zhao, with original gameplay and prototype videos.';
export async function generateMetadata({searchParams}){
 const query=await searchParams;
 const requested=typeof query?.game==='string'?query.game:'';
 const index=/^0?[1-6]$/.test(requested)?Number(requested)-1:-1;
 const selected=index>=0?workVideos[index]:null;
 const number=selected?String(index+1).padStart(2,'0'):null;
 const url='https://congyuzhao.com/videos'+(number?'?game='+number:'');
 const title=selected?selected.title+' — Solo Project':'Mini Games — Solo Projects';
 const description=selected?
  selected.title+' is one of six independently created mini-games by Congyu Zhao. Watch the original prototype recording.':
  archiveDescription;
 // Share images are hosted by the portfolio, including the currently private YouTube recording.
 const image=number?'https://congyuzhao.com/videos/og/'+number:'https://congyuzhao.com/videos/og/01';
 return {
  title,description,
  alternates:{canonical:url},
  openGraph:{
   title:title+' | Congyu Zhao',description,url,type:'website',
   images:[{url:image,width:1200,height:630,alt:selected?title:'Six solo mini-game projects by Congyu Zhao'}]
  },
  twitter:{card:'summary_large_image',title:title+' | Congyu Zhao',description,images:[image]},
 };
}
export default function VideosPage(){
 return <main className="videoArchivePage">
  <a className="skipLink" href="#video-work">Skip to work videos</a>
  <header className="caseNav frame">
   <Link href="/" className="newLogo" aria-label="Congyu Zhao home"><img src="/cz-mark.svg" width="84" height="41" alt="CZ monogram"/></Link>
   <Link href="/projects">← Projects</Link>
   <a className="caseResumeLink" href="/Congyu_Zhao_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗︎</a>
  </header>
  <section className="videoArchiveIntro frame" id="video-work">
   <p className="newEyebrow">SOLO PROJECTS / SIX MINI GAMES</p>
   <h1>Small games. <em>My own work.</em></h1>
   <p>These are six mini-games I made independently. They don't have formal project names, so I've numbered them Mini Game 01–06. You can watch the original recordings here or open them directly on YouTube.</p>
   <div className="videoArchiveIntroActions"><Link href="/projects">Selected projects ↗︎</Link><a href="/Congyu_Zhao_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗︎</a></div>
  </section>
  <section className="frame videoArchiveSection" aria-label="Six independently made mini-game videos"><WorkVideos/></section>
  <footer className="caseFooter frame"><Link href="/">← Portfolio home</Link><span>CONGYU ZHAO · SOLO MINI GAMES</span></footer>
 </main>;
}
