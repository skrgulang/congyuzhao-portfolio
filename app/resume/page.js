import Link from 'next/link';

export const metadata={
  title:'Resume',
  description:'Congyu Zhao — Purdue University Computer Graphics Technology, Class of 2028. Experience in product engineering, game development, data research and design.',
  alternates:{canonical:'https://congyuzhao.com/resume'},
  openGraph:{title:'Resume | Congyu Zhao',description:'Education, selected technical projects and work experience.',url:'https://congyuzhao.com/resume',type:'profile'},
};

const projects=[
 {name:'Aspire 101',period:'Sep 2026 – Present',role:'Founder & Technical / Product Lead',description:[
  'Lead development of a student-focused marketplace for web and React Native / Expo using JavaScript and Supabase.',
  'Build and debug email verification, listings, search, messaging, notifications and reporting workflows.',
  'Integrate and test Stripe sandbox payments and webhooks; investigate authentication, navigation and database permission issues.'
 ],url:'/projects/aspire-101'},
 {name:'Fish and Ships',period:'Aug 2026 – Present',role:'Unity Game Development',description:[
  'Program C# character and boat movement, interactive objects, and a procedural mesh ocean with animated sectional waves.',
  'Prototype terrain and environmental interactions, tune collisions and iterate on gameplay from feedback.'
 ],url:'/projects/fish-and-ships'},
 {name:'Tempus Lineus',period:'Jan 2025 – May 2025',role:'Game Programmer · Purdue University',description:[
  'Program gameplay, narrative interactions and player mechanics using Unreal Engine Blueprints.',
  'Playtest, debug and integrate features with teammates across programming, design, art and audio.'
 ],url:'/projects/tempus-lineus'}
];
const experience=[
 {role:'ERP Systems and Web Design Intern',company:'Belong Automotive Technology, LLC',period:'Mar 2026 – Sep 2026',description:'Researched ERP platforms for U.S.–China operations; assisted with module configuration, migration and cross-system troubleshooting.'},
 {role:'Undergraduate Data Researcher',company:'Purdue Data Mine',period:'Aug 2024 – Dec 2025',description:'Analyzed 100K+ agricultural data rows using R, data.table and Jupyter; contributed research findings for Corteva Agriscience.'},
 {role:'Graphic Designer Intern',company:'Narb',period:'Jul 2025 – Oct 2025',description:'Created 15+ digital assets with Figma and Adobe tools; tracked social media content and campaign performance.'},
 {role:'Marketing Research Intern',company:'AXENTRA OS',period:'Jun 2025 – Aug 2025',description:'Analyzed market trends, Shopify comparisons and competitor activity in Excel; prepared reports and recommendations.'}
];
export default function ResumePage(){
 return <main className="resumePage">
  <a className="skipLink" href="#resume-content">Skip to resume</a>
  <nav className="caseNav frame" aria-label="Resume navigation"><Link className="newLogo" href="/" aria-label="Congyu Zhao — home"><img src="/cz-mark.svg" alt="CZ monogram" width="84" height="41"/></Link><Link href="/">← Home</Link><Link href="/projects">Projects ↗︎</Link></nav>
  <div className="resumeContent frame" id="resume-content">
   <header className="resumeLead"><p className="newEyebrow">PURDUE UNIVERSITY · CLASS OF 2028</p><h1>Resume<span>.</span></h1><p>Congyu Zhao · Product engineering, game development and technical design.</p><div className="resumeDownloadActions"><a className="btnSolid resumePdfDownload" href="/Congyu_Zhao_Resume.pdf" download="Congyu_Zhao_Resume.pdf">Download PDF <span aria-hidden="true">↓</span></a><a className="resumePdfPreview" href="/Congyu_Zhao_Resume.pdf" target="_blank" rel="noopener noreferrer">Preview PDF ↗︎</a></div><div className="resumeLeadLinks"><a href="mailto:zhao1378@purdue.edu">zhao1378@purdue.edu ↗︎</a><a href="https://www.linkedin.com/in/congyu-zhao-5226b52b1/" target="_blank" rel="noopener noreferrer">LinkedIn ↗︎</a><Link href="/projects">Selected projects ↗︎</Link></div></header>
   <section className="resumeSection" aria-label="Education"><div className="resumeSectionLabel">01 / EDUCATION</div><div><h2>Purdue University</h2><p className="resumeSubhead">B.S. Computer Graphics Technology · Minor in Management</p><p>West Lafayette, Indiana · Expected May 2028 · Major GPA 3.6 / 4.0</p><p className="resumeQuiet">Relevant coursework: Game Development, Computer Graphics, Computer Science, Management, Accounting and Economics.</p></div></section>
   <section className="resumeSection" aria-label="Technical projects"><div className="resumeSectionLabel">02 / TECHNICAL PROJECTS</div><div>{projects.map(item=><article className="resumeEntry" key={item.name}><div className="resumeEntryHead"><div><h2><Link href={item.url}>{item.name} <span aria-hidden="true">↗︎</span></Link></h2><p className="resumeSubhead">{item.role}</p></div><small>{item.period}</small></div><ul>{item.description.map(line=><li key={line}>{line}</li>)}</ul></article>)}</div></section>
   <section className="resumeSection" aria-label="Work experience"><div className="resumeSectionLabel">03 / WORK EXPERIENCE</div><div>{experience.map(item=><article className="resumeEntry" key={item.company}><div className="resumeEntryHead"><div><h2>{item.role}</h2><p className="resumeSubhead">{item.company}</p></div><small>{item.period}</small></div><p>{item.description}</p></article>)}</div></section>
   <section className="resumeSection" aria-label="Technical skills"><div className="resumeSectionLabel">04 / SKILLS</div><div><h2>Tools I work with.</h2><p><strong>Programming:</strong> Python, Java, JavaScript, C#, R, HTML, CSS; SQL exposure.</p><p><strong>Product & engineering:</strong> React Native, Expo, Supabase, Stripe sandbox integration, GitHub, functional and regression testing.</p><p><strong>Creative & data:</strong> Unity, Unreal Engine Blueprints, Jupyter, R data.table, Tableau, Figma, Adobe Creative Cloud.</p><p><strong>Languages:</strong> English and Chinese.</p></div></section>
   <footer className="resumeEnd"><p>Summary adapted from my current one-page resume. Dates and metrics reflect the provided document.</p><Link href="/projects">Explore the work behind the resume ↗︎</Link></footer>
  </div>
 </main>;
}