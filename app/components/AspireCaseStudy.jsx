import Link from 'next/link';

const productSteps=[
 {n:'01',title:'Discover',body:'Browse opportunities around your university: a study group, a ride, a teammate, or someone to play a game with.'},
 {n:'02',title:'Post',body:'Share what you need or what you can offer, with context specific to your campus.'},
 {n:'03',title:'Respond',body:'Reply to a student request, then continue the conversation in messaging.'},
 {n:'04',title:'Connect',body:'Move from a post to an actual meetup, service, or shared activity.'}
];
const realScreens=[
 {slug:'home',title:'Home',detail:'Campus-specific discovery and highlights'},
 {slug:'campus-pulse',title:'Campus Pulse',detail:'Real posts and category discovery'},
 {slug:'browse',title:'Browse',detail:'Rides, Games, Study, Cofounders and more'},
 {slug:'create-post',title:'Create Post',detail:'Guided posting categories'},
 {slug:'inbox',title:'Inbox',detail:'Messages, Orders and Updates'},
 {slug:'profile',title:'Profile',detail:'Verified campus identity and activity'},
 {slug:'settings',title:'Settings',detail:'Privacy and notification controls'}
];
const buildNotes=[
 {number:'01',title:'Identity and trust',body:'University email verification helps keep discovery campus-focused. Reporting, moderation and cross-campus context are important parts of the product.'},
 {number:'02',title:'The full interaction',body:'I worked across the post → response → connection → chat journey, including the awkward states: empty feeds, pending requests, cancellations and errors.'},
 {number:'03',title:'Two clients, one product',body:'A live Next.js web platform and an Expo React Native iOS build in TestFlight share backend services powered by Supabase.'},
 {number:'04',title:'Payments and reliability',body:'Stripe integration and payment-related workflows are part of the platform. Security, event handling and operational monitoring require ongoing testing.'}
];
export default function AspireCaseStudy(){
 return <>
  <nav className="aspireCaseNav frame" aria-label="Aspire 101 case study chapters"><span>IN THIS CASE STUDY</span><div><a href="#aspire-availability">Product status</a><a href="#aspire-ios">iOS app walkthrough</a><a href="#aspire-community">Early connection</a><a href="#aspire-designs">Design work</a><a href="#aspire-flow">User journey</a><a href="#aspire-engineering">Engineering</a><a href="#aspire-decisions">Decisions</a><a href="#aspire-timeline">Timeline</a></div></nav>
  <section className="aspireCaseLead frame" aria-label="Aspire 101 project overview">
   <div className="aspireCaseLeadTop"><span>01 — THE PRODUCT</span><span>WEB LIVE · iOS TESTFLIGHT</span></div>
   <div className="aspireCaseLeadGrid"><div><h2>Making campus feel a little smaller.</h2><p>There are thousands of students nearby, but finding the right person can still mean searching through a dozen group chats. Aspire 101 started with that frustration.</p><p>I wanted somewhere students could look for each other by what they actually want to do — not by which group chat they happen to be in.</p><div className="aspirePrimaryLinks"><a href="https://www.aspires101.com/" rel="noopener noreferrer" target="_blank">Explore the live product <span>↗</span></a><Link href="/projects">Other projects <span>↗</span></Link></div></div><div className="aspireProductVisual"><div className="aspirePhoneChrome"><img src="/showcase/aspire-ios-home.webp" width="912" height="1870" alt="Actual Aspire 101 iOS TestFlight Home screen with Purdue campus discovery" loading="lazy"/></div><span className="aspireVisualTag">REAL iOS TESTFLIGHT UI / PRIVACY-REVIEWED</span></div></div>
  </section>
  <section className="aspireProductProof frame" id="aspire-availability" aria-label="Aspire 101 product availability and evidence">
   <div className="aspireChapterHead"><span>PRODUCT STATUS / NOVEMBER 2026</span><h2>What you can explore today.</h2><p>Design exploration and a shipped product tell different stories. Here is the clearest way to see what exists, what is being tested, and what remains a concept.</p></div>
   <div className="aspireProofGrid">
    <article className="aspireProofCard"><div className="aspireProofTop"><span>01 / WEB PLATFORM</span><span className="aspireProofStatus live">LIVE</span></div><h3>A working campus product.</h3><p>Browse the current website to see Aspire 101 as students encounter it, not as an idealized design board. Available flows and content can change.</p><a href="https://www.aspires101.com/" target="_blank" rel="noopener noreferrer">Open live Aspire 101 <span aria-hidden="true">↗</span></a></article>
    <article className="aspireProofCard"><div className="aspireProofTop"><span>02 / iOS APPLICATION</span><span className="aspireProofStatus beta">TESTFLIGHT</span></div><h3>The mobile experience, in testing.</h3><p>The Expo / React Native iOS app has reached TestFlight. It is not presented here as publicly released on the App Store, and no public install link is claimed.</p><span className="aspireProofQuiet">Testing build · not an App Store listing</span></article>
    <article className="aspireProofCard"><div className="aspireProofTop"><span>03 / INTERFACE EXPLORATIONS</span><span className="aspireProofStatus concept">CONCEPTS</span></div><h3>The thinking behind the screens.</h3><p>The mobile and desktop boards in the following section show interface directions and example content. They are design references, not screenshots of current usage.</p><a href="/showcase/aspire-mobile-board.png" target="_blank" rel="noopener noreferrer">View mobile design board <span aria-hidden="true">↗</span></a></article>
   </div>
  </section>
  <section className="aspireActualFlow frame" id="aspire-ios" aria-label="Aspire 101 actual iOS interface walkthrough">
   <div className="aspireChapterHead"><span>ACTUAL iOS BUILD / NOVEMBER 2026</span><h2>From campus discovery to conversation.</h2><p>Actual, privacy-reviewed iOS screenshots from the TestFlight build: Home, Browse, Post, Inbox, Profile, Settings and Campus Pulse. These are real captures, not recreated concepts or evidence of usage volume.</p></div>
   <figure className="aspireRealGalleryLead"><img src="/showcase/aspire-ios-real-gallery.webp" width="900" height="455" loading="lazy" alt="Five real Aspire 101 TestFlight screens: Home, Browse, Create Post, Inbox, Profile"/><figcaption>REAL TESTFLIGHT CAPTURES · PERSONAL DATA REDACTED · NOV 2026</figcaption></figure>
   <p className="aspireRealSwipeHint">Explore all seven real iOS screens. Swipe horizontally on mobile, or select a screen to view it full size.</p><div className="aspireRealScreens" role="group" aria-label="Seven real Aspire 101 iOS screens; scroll horizontally on mobile">{realScreens.map((screen,i)=><figure key={screen.slug} className="aspireRealScreen"><a href={'/showcase/aspire-ios-'+screen.slug+'.webp'} target="_blank" rel="noopener noreferrer" aria-label={'Open full original Aspire 101 iOS '+screen.title+' screenshot in a new tab'}><img src={'/showcase/aspire-ios-'+screen.slug+'.webp'} width="912" height="1870" loading="lazy" alt={'Real Aspire 101 iOS '+screen.title+' screen: '+screen.detail}/></a><figcaption><span>{String(i+1).padStart(2,'0')} / {screen.title.toUpperCase()}</span><small>{screen.detail}</small></figcaption></figure>)}</div>
   <div className="aspireActualFlowGrid">
    <article><span>01 / HOME</span><h3>Campus first.</h3><p>Purdue-specific discovery, post categories and campus highlights give students a starting point.</p></article>
    <article><span>02 / BROWSE</span><h3>Find your thing.</h3><p>Rides, Market, Study, Games, Cofounders, Projects, Help and Pickup organize campus needs.</p></article>
    <article><span>03 / POST</span><h3>Make the first move.</h3><p>A guided posting flow starts with the kind of request: a ride, people, something to sell or help.</p></article>
    <article><span>04 / INBOX</span><h3>Keep the conversation going.</h3><p>Messages, Orders and Updates are grouped together. Sample and test conversations are not presented as traction metrics.</p></article>
    <article><span>05 / PROFILE</span><h3>A verified campus identity.</h3><p>A university badge, personal activity and account controls help explain who students are connecting with.</p></article>
    <article><span>06 / SETTINGS</span><h3>Privacy is a product choice.</h3><p>Profile audience, individual field visibility and notification controls are available in the shown build; screenshots do not constitute a security audit.</p></article>
   </div>
   <p className="aspireActualFlowNote">Screens reviewed from the founder's iOS app capture. The screenshots include developer/test activity; descriptions reflect visible UI, not independently verified usage or operating metrics.</p>
  </section>
  <section className="aspireFieldNote frame" id="aspire-community" aria-label="Aspire 101 early community story">
    <div className="aspireFieldNoteLead"><span className="newEyebrow">EARLY COMMUNITY MOMENT / 2026</span><h2>A connection beyond the screen.</h2><p>One early example came from two UC Davis students who connected through Aspire 101 to play VALORANT together. It is a small anecdote, not a retention metric — but it gets at the reason I built the product.</p></div>
    <div className="aspireFieldNoteAside"><span>THE REAL QUESTION</span><strong>Did finding someone turn into doing something together?</strong><p>That is the outcome I want to understand as the campus rollout continues.</p></div>
  </section>
  <section className="aspireVisualArchive frame" id="aspire-designs" aria-label="Aspire 101 interface design gallery">
    <div className="aspireVisualArchiveHead"><div><span>DESIGN EXPLORATIONS</span><h2>Designed around the moments that matter.</h2></div><p>Home, discovery, posting, inbox and profiles — explored across mobile and desktop. These are archived UI/UX concept boards, not verified current production screens. Any numbers or sample posts shown in the mockups are illustrative.</p></div>
    <div className="aspireVisualBoard"><div className="aspireVisualBoardTop"><div><span>01 / MOBILE</span><h3>Five everyday flows.</h3><p>Home · Browse · Post · Inbox · Profile</p></div><span>DESIGN REFERENCE</span></div><a href="/showcase/aspire-mobile-board.png" target="_blank" rel="noopener noreferrer" aria-label="Open full-resolution Aspire 101 mobile concept board"><img src="/showcase/aspire-mobile-board.png" width="1223" height="1287" alt="Aspire 101 mobile design concepts showing Home, Browse, Post, Inbox and Profile screens" loading="lazy"/><span className="aspireBoardAction">View full-size design ↗</span></a></div>
    <div className="aspireVisualBoard"><div className="aspireVisualBoardTop"><div><span>02 / WEB + MOBILE</span><h3>One product, different screens.</h3><p>Desktop Home · Browse · Create Post · Listing detail · Mobile concepts</p></div><span>DESIGN REFERENCE</span></div><a href="/showcase/aspire-web-board.png" target="_blank" rel="noopener noreferrer" aria-label="Open full-resolution Aspire 101 web and mobile concept board"><img src="/showcase/aspire-web-board.png" width="1536" height="1024" alt="Aspire 101 concept designs comparing desktop Home, Browse, Post, Listing Detail and mobile screens" loading="lazy"/><span className="aspireBoardAction">View full-size design ↗</span></a></div>
    <p className="aspireBoardFootnote">These boards document design directions and example content; they are not evidence of current user counts, revenue, or production features. For the live product, visit <a href="https://www.aspires101.com/" target="_blank" rel="noopener noreferrer">Aspire 101 ↗</a>.</p>
  </section>
  <section className="aspireJourney frame" id="aspire-flow" aria-label="Core Aspire 101 product journey">
   <div className="aspireChapterHead"><span>HOW IT WORKS</span><h2>From a post to a real connection.</h2><p>The core experience is short on purpose. Find an opportunity, reach out and take the conversation somewhere useful.</p></div>
   <div className="aspireJourneyGrid">{productSteps.map((step)=><article key={step.n}><div className="aspireJourneyNumber">{step.n}</div><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
   <p className="aspireJourneyNote">Flow illustration based on the product features, not a claim of measured conversion or user activity.</p>
  </section>
  <section className="aspireBuild frame" id="aspire-engineering" aria-label="Aspire 101 engineering">
   <div className="aspireChapterHead"><span>WHAT I BUILT</span><h2>Not just the happy path.</h2><p>Building the product meant working on what users see and the less visible systems that make it reliable enough to use.</p></div>
   <div className="aspireBuildGrid">{buildNotes.map(item=><article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
   <div className="aspireStackLine"><span>ENGINEERING STACK</span><div>{['Next.js','Expo / React Native','Supabase','Stripe','Vercel'].map(item=><span key={item}>{item}</span>)}</div></div>
  </section>
  <section className="aspireDecisions frame" id="aspire-decisions" aria-label="Aspire 101 founder engineering decisions">
   <div className="aspireChapterHead"><span>ENGINEERING DECISIONS</span><h2>What changed after real people showed up.</h2><p>The parts of building Aspire 101 that taught me the most were not the polished screens. They were the decisions I had to make when a campus product became a real service.</p></div>
   <div className="aspireDecisionList">
    <article><span>01 / TRUST</span><div><h3>A campus account needs context.</h3><p>University email verification gives students a starting point, but it does not replace moderation. Cross-campus posts need clear origin labels and a reason for reaching another campus, so readers understand who is asking and why.</p></div><strong>VERIFY → LABEL → REVIEW</strong></article>
    <article><span>02 / SAFETY</span><div><h3>Abuse changed the roadmap.</h3><p>After an early wave of abusive registrations, I started treating rate limits, reporting and backend authorization as product features—not cleanup tasks to leave until later. The work is ongoing.</p></div><strong>DETECT → LIMIT → RESPOND</strong></article>
    <article><span>03 / RELIABILITY</span><div><h3>A connection is more than a tap.</h3><p>The post-to-message journey needs sensible pending, empty, error and cancellation states. I focus on those edges because they determine whether students can finish what they came to do.</p></div><strong>POST → RESPOND → CHAT</strong></article>
   </div>
   <p className="aspireDecisionDisclaimer">Product and engineering retrospective. This describes design and development priorities, not an audited security certification or an assertion that every planned safeguard is live.</p>
  </section>
  <section className="aspireMilestones frame" id="aspire-timeline" aria-label="Aspire 101 founder development timeline">
   <div className="aspireChapterHead"><span>FOUNDER JOURNEY</span><h2>Built, tested, rebuilt.</h2><p>The progress behind Aspire 101 was less a straight launch plan and more a sequence of lessons from shipping and listening.</p></div>
   <ol className="aspireMilestoneList">
    <li><time dateTime="2025-09">SEP 2025</time><div><h3>Started with a campus problem.</h3><p>I began working on a way for students to find people and practical help without relying on the right group chat or student organization.</p></div></li>
    <li><time dateTime="2026">2026</time><div><h3>Built the product across web and mobile.</h3><p>What began as learning to ship became work across product design, Next.js, React Native, backend infrastructure, testing and deployment.</p></div></li>
    <li><time dateTime="2026-09">FALL 2026</time><div><h3>Started the Purdue rollout.</h3><p>Direct outreach, student feedback and an early abuse incident pushed me to think harder about onboarding, trust and operational reliability.</p></div></li>
    <li><time dateTime="2026-11">NOV 2026</time><div><h3>Web live. iOS in TestFlight.</h3><p>Now the most important question is whether students keep returning and form useful connections—not simply whether we can ship another feature.</p></div></li>
   </ol>
  </section>
  <section className="aspireLessons frame" aria-label="Lessons and next steps">
   <div><span>WHAT I LEARNED</span><h2>Shipping is the beginning.</h2></div>
   <div><p>An early wave of abusive registrations made it clear that the backend needed stronger safeguards. That changed how I think about verification, moderation, security and testing.</p><p>The web product is live and the iOS build is in TestFlight. The next challenge is to learn whether students return, post again, and actually meet through the product — not just whether they sign up.</p><a href="https://www.aspires101.com/" target="_blank" rel="noopener noreferrer">See what we're building ↗</a></div>
  </section>
 </>;
}
