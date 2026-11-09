import Link from 'next/link';
import WorkVideos from '../components/WorkVideos';

export const metadata={
 title:'Mini Games — Solo Projects',
 description:'Six mini-games independently created by Congyu Zhao, with original gameplay and prototype videos.',
 alternates:{canonical:'https://congyuzhao.com/videos'},
 openGraph:{title:'Mini Games — Solo Projects | Congyu Zhao',description:'Six independent mini-game projects by Congyu Zhao, shown through original recordings.',url:'https://congyuzhao.com/videos',type:'website'},
};
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
