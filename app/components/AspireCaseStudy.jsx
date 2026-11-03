import Link from 'next/link';

const productSteps=[
 {n:'01',title:'Discover',body:'Browse opportunities around your university: a study group, a ride, a teammate, or someone to play a game with.'},
 {n:'02',title:'Post',body:'Share what you need or what you can offer, with context specific to your campus.'},
 {n:'03',title:'Respond',body:'Reply to a student request, then continue the conversation in messaging.'},
 {n:'04',title:'Connect',body:'Move from a post to an actual meetup, service, or shared activity.'}
];
const buildNotes=[
 {number:'01',title:'Identity and trust',body:'University email verification helps keep discovery campus-focused. Reporting, moderation and cross-campus context are important parts of the product.'},
 {number:'02',title:'The full interaction',body:'I worked across the post → response → connection → chat journey, including the awkward states: empty feeds, pending requests, cancellations and errors.'},
 {number:'03',title:'Two clients, one product',body:'A live Next.js web platform and an Expo React Native iOS build in TestFlight share backend services powered by Supabase.'},
 {number:'04',title:'Payments and reliability',body:'Stripe integration and payment-related workflows are part of the platform. Security, event handling and operational monitoring require ongoing testing.'}
];
export default function AspireCaseStudy(){
 return <>
  <section className="aspireCaseLead frame" aria-label="Aspire 101 project overview">
   <div className="aspireCaseLeadTop"><span>01 — THE PRODUCT</span><span>WEB LIVE · iOS TESTFLIGHT</span></div>
   <div className="aspireCaseLeadGrid"><div><h2>Making campus feel a little smaller.</h2><p>There are thousands of students nearby, but finding the right person can still mean searching through a dozen group chats. Aspire 101 started with that frustration.</p><p>I wanted somewhere students could look for each other by what they actually want to do — not by which group chat they happen to be in.</p><div className="aspirePrimaryLinks"><a href="https://www.aspires101.com/" rel="noopener noreferrer" target="_blank">Explore the live product <span>↗</span></a><Link href="/projects">Other projects <span>↗</span></Link></div></div><div className="aspireProductVisual"><div className="aspirePhoneChrome"><img src="/showcase/aspire-onboarding-hq.jpg" width="849" height="1852" alt="Aspire 101 interest-selection design preview" loading="lazy"/></div><span className="aspireVisualTag">INTEREST-BASED ONBOARDING / DESIGN CONCEPT</span></div></div>
  </section>
  <section className="aspireJourney frame" aria-label="Core Aspire 101 product journey">
   <div className="aspireChapterHead"><span>02 — HOW IT WORKS</span><h2>From a post to a real connection.</h2><p>The core experience is short on purpose. Find an opportunity, reach out and take the conversation somewhere useful.</p></div>
   <div className="aspireJourneyGrid">{productSteps.map((step)=><article key={step.n}><div className="aspireJourneyNumber">{step.n}</div><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
   <p className="aspireJourneyNote">Flow illustration based on the product features, not a claim of measured conversion or user activity.</p>
  </section>
  <section className="aspireBuild frame" aria-label="Aspire 101 engineering">
   <div className="aspireChapterHead"><span>03 — WHAT I BUILT</span><h2>Not just the happy path.</h2><p>Building the product meant working on what users see and the less visible systems that make it reliable enough to use.</p></div>
   <div className="aspireBuildGrid">{buildNotes.map(item=><article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
   <div className="aspireStackLine"><span>ENGINEERING STACK</span><div>{['Next.js','Expo / React Native','Supabase','Stripe','Vercel'].map(item=><span key={item}>{item}</span>)}</div></div>
  </section>
  <section className="aspireLessons frame" aria-label="Lessons and next steps">
   <div><span>04 — WHAT I LEARNED</span><h2>Shipping is the beginning.</h2></div>
   <div><p>An early wave of abusive registrations made it clear that the backend needed stronger safeguards. That changed how I think about verification, moderation, security and testing.</p><p>The web product is live and the iOS build is in TestFlight. The next challenge is to learn whether students return, post again, and actually meet through the product — not just whether they sign up.</p><a href="https://www.aspires101.com/" target="_blank" rel="noopener noreferrer">See what we're building ↗</a></div>
  </section>
 </>;
}
