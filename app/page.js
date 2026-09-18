'use client';

import { useState } from 'react';

const work = [
  {
    number: '01',
    title: 'Aspire 101',
    eyebrow: 'FOUNDER · PRODUCT · SOFTWARE',
    body: 'A student-focused marketplace and connection platform built around campus trust, flexible fulfillment, and real-world community needs.',
    tags: ['Founder', 'Next.js', 'Supabase', 'Stripe'],
    href: 'https://www.aspires101.com/',
    kind: 'aspire',
    note: 'LIVE PRODUCT'
  },
  {
    number: '02',
    title: 'Tempus Lineus',
    eyebrow: 'GAME WORLD · VISUAL STORYTELLING',
    body: 'A narrative game world shaped through environment modeling, interface direction, and a time-fractured visual identity.',
    tags: ['3D', 'Environment', 'UI', 'Narrative'],
    kind: 'tempus',
    note: 'GAME WORLD'
  },
  {
    number: '03',
    title: 'Gameplay Systems',
    eyebrow: 'UNITY · INTERACTION · PROTOTYPING',
    body: 'Quest logic, tutorial states, NPC dialogue, task tracking, and level progression documented through working prototype screens.',
    tags: ['Unity', 'C#', 'Systems', 'UX'],
    kind: 'unity',
    note: 'SYSTEMS'
  }
];

const archive = [
  { src: '/images/hero.webp', label: 'Personal / Coast' },
  { src: '/images/aspire-wide.webp', label: 'Aspire 101 / Campaign' },
  { src: '/images/tempus-title.webp', label: 'Tempus Lineus / UI' },
  { src: '/images/tempus-building.webp', label: 'Tempus Lineus / 3D' },
  { src: '/images/unity-tutorial.webp', label: 'Gameplay / Prototype' },
  { src: '/images/gym.webp', label: 'Off-screen / Process' }
];

function ProjectMedia({ kind }) {
  if (kind === 'aspire') {
    return (
      <div className="media mediaAspire">
        <img src="/images/aspire-wide.webp" alt="Aspire 101 campaign concept featuring students on a campus" />
        <div className="mediaOverlay">
          <span>PRODUCT SYSTEM</span>
          <strong>Post. Match. Connect.</strong>
          <small>Student marketplace + campus services</small>
        </div>
      </div>
    );
  }

  if (kind === 'tempus') {
    return (
      <div className="mediaSplit">
        <figure className="media">
          <img src="/images/tempus-title.webp" alt="Tempus Lineus game title screen" />
          <figcaption><span>01</span> Title screen / visual identity</figcaption>
        </figure>
        <figure className="media">
          <img src="/images/tempus-building.webp" alt="Tempus Lineus 3D bakery environment model" />
          <figcaption><span>02</span> Environment modeling / world building</figcaption>
        </figure>
      </div>
    );
  }

  return (
    <div className="media mediaUnity">
      <img src="/images/unity-tutorial.webp" alt="Unity gameplay tutorial level interface" />
      <div className="mediaOverlay">
        <span>WORKING PROTOTYPE</span>
        <strong>Teach the system through play.</strong>
        <small>Tutorial flow · objectives · interaction · feedback</small>
      </div>
    </div>
  );
}

export default function Home() {
  const [gameMode, setGameMode] = useState(false);

  const moveGlow = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', event.clientX - rect.left + 'px');
    event.currentTarget.style.setProperty('--my', event.clientY - rect.top + 'px');
  };

  return (
    <main className={gameMode ? 'site gameMode' : 'site'} onPointerMove={moveGlow}>
      <div className="grain" aria-hidden="true" />
      <div className="cursorGlow" aria-hidden="true" />

      <nav className="nav shell">
        <a className="brand" href="#top">
          <span>CZ</span>
          <b>Congyu Zhao</b>
        </a>

        <div className="navLinks">
          <a href="#work">Work</a>
          <a href="#archive">Archive</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="gameButton" onClick={() => setGameMode(!gameMode)}>
          {gameMode ? 'Exit Game Mode' : 'Enter Game Mode'} <span>↗</span>
        </button>
      </nav>

      {gameMode && (
        <section className="questBar shell" aria-live="polite">
          <span className="questStatus"><i /> GAME MODE ACTIVE</span>
          <p>Side quest unlocked: explore the three project worlds below.</p>
          <div className="questSteps">
            <a href="#aspire"><span>01</span> Aspire</a>
            <a href="#tempus"><span>02</span> Tempus</a>
            <a href="#gameplay"><span>03</span> Gameplay</a>
          </div>
        </section>
      )}

      <section id="top" className="hero shell">
        <div className="heroCopy">
          <div className="heroTopline">
            <p className="eyebrow">FOUNDER · DEVELOPER · GAME SYSTEMS</p>
            <span className="nowBadge"><i /> BUILDING NOW</span>
          </div>

          <h1>Congyu<br />Zhao.</h1>

          <p className="heroStatement">
            I build <em>products, systems,</em> and <em>worlds</em> that people can actually use.
          </p>

          <p className="heroBody">
            Product thinking, software, gameplay logic, and visual storytelling — brought together in one portfolio instead of split into separate identities.
          </p>

          <div className="heroActions">
            <a className="primaryButton" href="#work">Explore selected work <span>↓</span></a>
            <a className="secondaryLink" href="https://www.aspires101.com/" target="_blank" rel="noreferrer">Latest build: Aspire 101 ↗</a>
          </div>

          <div className="heroMeta">
            <div><span>01</span><b>PRODUCT</b><small>Flows, trust, marketplaces</small></div>
            <div><span>02</span><b>SOFTWARE</b><small>Full-stack implementation</small></div>
            <div><span>03</span><b>GAME DEV</b><small>Systems, interaction, worlds</small></div>
          </div>
        </div>

        <figure className="heroPhoto">
          <img src="/images/hero.webp" alt="Congyu Zhao standing near the coast" />
          <div className="heroPhotoChrome">
            <span>PROFILE_01</span>
            <span>PLAYER / BUILDER</span>
          </div>
          <figcaption>
            <div>
              <span>CONGYU ZHAO</span>
              <b>Make it real. Then make it better.</b>
            </div>
            <span className="photoArrow">↗</span>
          </figcaption>
        </figure>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>BUILD</span><i>✦</i><span>ITERATE</span><i>✦</i><span>PLAY</span><i>✦</i><span>SHIP</span><i>✦</i>
          <span>BUILD</span><i>✦</i><span>ITERATE</span><i>✦</i><span>PLAY</span><i>✦</i><span>SHIP</span><i>✦</i>
        </div>
      </div>

      <section className="proof shell">
        <div className="proofLead">
          <span>NOT A TEMPLATE PORTFOLIO</span>
          <b>One person.<br />Multiple systems.</b>
        </div>
        <div className="proofGrid">
          <div><span>PRODUCT</span><p>Marketplace architecture, trust, fulfillment, payments.</p></div>
          <div><span>GAME SYSTEMS</span><p>Interaction logic, quest state, dialogue, progression.</p></div>
          <div><span>VISUAL WORK</span><p>3D environments, interface direction, presentation.</p></div>
          <div><span>EXECUTION</span><p>From rough concept to a working thing people can test.</p></div>
        </div>
      </section>

      <section id="work" className="work shell">
        <header className="sectionHeader">
          <div>
            <p className="eyebrow">SELECTED WORK / 2026</p>
            <h2>Proof over<br /><em>promises.</em></h2>
          </div>
          <p>
            Three different kinds of work, shown through actual product visuals, game assets, and prototypes rather than generic mockups.
          </p>
        </header>

        <div className="projectList">
          {work.map((project, index) => (
            <article
              className={'project project-' + project.kind + (index % 2 ? ' projectReverse' : '')}
              id={project.kind === 'aspire' ? 'aspire' : project.kind === 'tempus' ? 'tempus' : 'gameplay'}
              key={project.number}
            >
              <div className="projectText">
                <div className="projectHead">
                  <div className="projectLabel">
                    <span>{project.number}</span>
                    <p>{project.eyebrow}</p>
                  </div>
                  <span className="projectNote">{project.note}</span>
                </div>

                <h3>{project.title}</h3>
                <p className="projectBody">{project.body}</p>

                <div className="tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>

                {project.kind === 'aspire' && (
                  <dl className="projectFacts">
                    <div><dt>ROLE</dt><dd>Founder / Product / Development</dd></div>
                    <div><dt>FOCUS</dt><dd>Trust, campus commerce, flexible fulfillment</dd></div>
                    <div><dt>STATUS</dt><dd><i /> Building now</dd></div>
                  </dl>
                )}

                {project.kind === 'tempus' && (
                  <div className="miniFacts">
                    <div><span>WORLD</span><b>Environment</b></div>
                    <div><span>LOOK</span><b>Visual identity</b></div>
                    <div><span>TOOLS</span><b>3D + game pipeline</b></div>
                  </div>
                )}

                {project.kind === 'unity' && (
                  <div className="miniFacts">
                    <div><span>STATE</span><b>Objectives</b></div>
                    <div><span>INPUT</span><b>Interaction</b></div>
                    <div><span>FEEDBACK</span><b>UI + progression</b></div>
                  </div>
                )}

                {project.href
                  ? <a className="projectLink" href={project.href} target="_blank" rel="noreferrer">Visit live product <span>↗</span></a>
                  : <span className="projectLink muted">Project study / visual archive <span>→</span></span>
                }
              </div>

              <ProjectMedia kind={project.kind} />
            </article>
          ))}
        </div>
      </section>

      <section className="statement shell">
        <p className="eyebrow">HOW I WORK</p>
        <h2>
          I care about the space between <em>idea</em> and <em>actually working.</em>
        </h2>
        <div className="principles">
          <div><span>01</span><b>Understand the problem</b><p>Start with the user, constraint, and system — not the feature list.</p></div>
          <div><span>02</span><b>Build the real flow</b><p>Connect the pieces end-to-end so the concept can survive contact with reality.</p></div>
          <div><span>03</span><b>Make it feel intentional</b><p>Use interaction, feedback, visual hierarchy, and polish to make the system clear.</p></div>
        </div>
      </section>

      <section id="archive" className="archive shell">
        <header className="archiveHead">
          <div>
            <p className="eyebrow">VISUAL ARCHIVE</p>
            <h2>Work should<br />feel <em>alive.</em></h2>
          </div>
          <p>A quick visual index across product, game, 3D, and personal work.</p>
        </header>

        <div className="archiveGrid">
          {archive.map((item, index) => (
            <figure className={'archiveItem archiveItem-' + (index + 1)} key={item.src}>
              <img src={item.src} alt={item.label} />
              <figcaption><span>{String(index + 1).padStart(2, '0')}</span><b>{item.label}</b></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="about" className="about shell">
        <figure className="aboutPhoto">
          <img src="/images/gym.webp" alt="Congyu Zhao at the gym" />
          <div className="aboutPhotoTag"><i /> OFF-SCREEN / STILL BUILDING</div>
        </figure>

        <div className="aboutCopy">
          <p className="eyebrow">ABOUT / NOT A SINGLE LANE</p>
          <h2>I like where <em>code, product, and play</em> collide.</h2>
          <p>
            I move between software, game systems, product decisions, and visual presentation. The goal is not to collect tools — it is to understand enough of the whole system to move an idea forward.
          </p>
          <p>
            That can mean designing a marketplace flow, wiring up payments, programming an interaction, building a 3D world, or turning a messy concept into something another person can actually use.
          </p>

          <div className="aboutStack">
            <div><span>BUILD WITH</span><b>Next.js · Supabase · Unity · Unreal · C#</b></div>
            <div><span>THINK ABOUT</span><b>Product systems · UX · Gameplay · Visual storytelling</b></div>
          </div>

          <div className="aboutLinks">
            <a href="https://www.linkedin.com/in/congyu-zhao-5226b52b1/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://www.instagram.com/congyu_zhao/" target="_blank" rel="noreferrer">Instagram ↗</a>
          </div>
        </div>
      </section>

      <section className="gameTeaser shell">
        <div className="gameTeaserCopy">
          <p className="eyebrow">OPTIONAL PATH / GAME MODE</p>
          <h2>The portfolio has a second layer.</h2>
          <p>Normal mode is clean and recruiter-friendly. Game Mode turns the same work into a small side quest without hiding the serious part.</p>
        </div>
        <button onClick={() => {
          setGameMode(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>START SIDE QUEST <span>→</span></button>
      </section>

      <section id="contact" className="contact shell">
        <p className="eyebrow">CONTACT / NEXT BUILD</p>
        <div className="contactGrid">
          <h2>Have something<br />worth <em>building?</em></h2>
          <div className="contactLinks">
            <a href="mailto:24zhaocongyu@gmail.com"><span>Email</span><b>24zhaocongyu@gmail.com ↗</b></a>
            <a href="https://www.linkedin.com/in/congyu-zhao-5226b52b1/" target="_blank" rel="noreferrer"><span>LinkedIn</span><b>Connect ↗</b></a>
            <a href="https://www.aspires101.com/" target="_blank" rel="noreferrer"><span>Latest product</span><b>Aspire 101 ↗</b></a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div><span>CZ</span><b>Congyu Zhao</b></div>
        <p>Founder · Developer · Game Systems</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
