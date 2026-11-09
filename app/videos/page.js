import Link from 'next/link';
import WorkVideos from '../components/WorkVideos';

export const metadata={
 title:'Video Work Archive',
 description:'Six original project and prototype video links shared by Congyu Zhao, including prototype iteration, Unreal Engine recording and a final project video.',
 alternates:{canonical:'https://congyuzhao.com/videos'},
 openGraph:{title:'More Work — Video Archive | Congyu Zhao',description:'Project prototypes, recordings and other original work samples.',url:'https://congyuzhao.com/videos',type:'website'},
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
   <p className="newEyebrow">MORE WORK / VIDEO ARCHIVE</p>
   <h1>Work in <em>motion.</em></h1>
   <p>Six recordings and prototypes from my work archive. Watch directly here or open the original uploads on YouTube. Some titles are incomplete, so I have kept their descriptions conservative until I can label each project precisely.</p>
   <div className="videoArchiveIntroActions"><Link href="/projects">Selected projects ↗︎</Link><a href="/Congyu_Zhao_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗︎</a></div>
  </section>
  <section className="frame videoArchiveSection" aria-label="Six work videos"><WorkVideos/></section>
  <footer className="caseFooter frame"><Link href="/">← Portfolio home</Link><span>CONGYU ZHAO · WORK ARCHIVE</span></footer>
 </main>;
}
