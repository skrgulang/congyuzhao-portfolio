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
  <section className="aspireVisualArchive frame" aria-label="Aspire 101 interface design gallery">
    <div className="aspireVisualArchiveHead"><div><span>02 — DESIGN EXPLORATIONS</span><h2>Designed around the moments that matter.</h2></div><p>Home, discovery, posting, inbox and profiles — explored across mobile and desktop. These are archived UI/UX concept boards, not verified current production screens. Any numbers or sample posts shown in the mockups are illustrative.</p></div>
    <div className="aspireVisualBoard"><div className="aspireVisualBoardTop"><div><span>01 / MOBILE</span><h3>Five everyday flows.</h3><p>Home · Browse · Post · Inbox · Profile</p></div><span>DESIGN REFERENCE</span></div><a href="/showcase/aspire-mobile-board.png" target="_blank" rel="noopener noreferrer" aria-label="Open full-resolution Aspire 101 mobile concept board"><img src="/showcase/aspire-mobile-board.png" width="1223" height="1287" alt="Aspire 101 mobile design concepts showing Home, Browse, Post, Inbox and Profile screens" loading="lazy"/><span className="aspireBoardAction">View full-size design ↗</span></a></div>
    <div className="aspireVisualBoard"><div className="aspireVisualBoardTop"><div><span>02 / WEB + MOBILE</span><h3>One product, different screens.</h3><p>Desktop Home · Browse · Create Post · Listing detail · Mobile concepts</p></div><span>DESIGN REFERENCE</span></div><a href="/showcase/aspire-web-board.png" target="_blank" rel="noopener noreferrer" aria-label="Open full-resolution Aspire 101 web and mobile concept board"><img src="/showcase/aspire-web-board.png" width="1536" height="1024" alt="Aspire 101 concept designs comparing desktop Home, Browse, Post, Listing Detail and mobile screens" loading="lazy"/><span className="aspireBoardAction">View full-size design ↗</span></a></div>
    <p className="aspireBoardFootnote">These boards document design directions and example content; they are not evidence of current user counts, revenue, or production features. For the live product, visit <a href="https://www.aspires101.com/" target="_blank" rel="noopener noreferrer">Aspire 101 ↗</a>.</p>
  </section>
  <section className="aspireJourney frame" aria-label="Core Aspire 101 product journey">
   <div className="aspireChapterHead"><span>03 — HOW IT WORKS</span><h2>From a post to a real connection.</h2><p>The core experience is short on purpose. Find an opportunity, reach out and take the conversation somewhere useful.</p></div>
   <div className="aspireJourneyGrid">{productSteps.map((step)=><article key={step.n}><div className="aspireJourneyNumber">{step.n}</div><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
   <p className="aspireJourneyNote">Flow illustration based on the product features, not a claim of measured conversion or user activity.</p>
  </section>
  <section className="aspireBuild frame" aria-label="Aspire 101 engineering">
   <div className="aspireChapterHead"><span>04 — WHAT I BUILT</span><h2>Not just the happy path.</h2><p>Building the product meant working on what users see and the less visible systems that make it reliable enough to use.</p></div>
   <div className="aspireBuildGrid">{buildNotes.map(item=><article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
   <div className="aspireStackLine"><span>ENGINEERING STACK</span><div>{['Next.js','Expo / React Native','Supabase','Stripe','Vercel'].map(item=><span key={item}>{item}</span>)}</div></div>
  </section>
  <section className="aspireDecisions frame" aria-label="Aspire 101 founder engineering decisions">
   <div className="aspireChapterHead"><span>05 — ENGINEERING DECISIONS</span><h2>What changed after real people showed up.</h2><p>The parts of building Aspire 101 that taught me the most were not the polished screens. They were the decisions I had to make when a campus product became a real service.</p></div>
   <div className="aspireDecisionList">
    <article><span>01 / TRUST</span><div><h3>A campus account needs context.</h3><p>University email verification gives students a starting point, but it does not replace moderation. Cross-campus posts need clear origin labels and a reason for reaching another campus, so readers understand who is asking and why.</p></div><strong>VERIFY → LABEL → REVIEW</strong></article>
    <article><span>02 / SAFETY</span><div><h3>Abuse changed the roadmap.</h3><p>After an early wave of abusive registrations, I started treating rate limits, reporting and backend authorization as product features—not cleanup tasks to leave until later. The work is ongoing.</p></div><strong>DETECT → LIMIT → RESPOND</strong></article>
    <article><span>03 / RELIABILITY</span><div><h3>A connection is more than a tap.</h3><p>The post-to-message journey needs sensible pending, empty, error and cancellation states. I focus on those edges because they determine whether students can finish what they came to do.</p></div><strong>POST → RESPOND → CHAT</strong></article>
   </div>
   <p className="aspireDecisionDisclaimer">Product and engineering retrospective. This describes design and development priorities, not an audited security certification or an assertion that every planned safeguard is live.</p>
  </section>
  <section className="aspireLessons frame" aria-label="Lessons and next steps">
   <div><span>06 — WHAT I LEARNED</span><h2>Shipping is the beginning.</h2></div>
   <div><p>An early wave of abusive registrations made it clear that the backend needed stronger safeguards. That changed how I think about verification, moderation, security and testing.</p><p>The web product is live and the iOS build is in TestFlight. The next challenge is to learn whether students return, post again, and actually meet through the product — not just whether they sign up.</p><a href="https://www.aspires101.com/" target="_blank" rel="noopener noreferrer">See what we're building ↗</a></div>
  </section>
 </>;
}
