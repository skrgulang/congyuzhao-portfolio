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
    kind: 'aspire'
  },
  {
    number: '02',
    title: 'Tempus Lineus',
    eyebrow: 'GAME WORLD · VISUAL STORYTELLING',
    body: 'A narrative game world shaped through environment modeling, interface direction, and a time-fractured visual identity.',
    tags: ['3D', 'Environment', 'UI', 'Narrative'],
    kind: 'tempus'
  },
  {
    number: '03',
    title: 'Gameplay Systems',
    eyebrow: 'UNITY · INTERACTION · PROTOTYPING',
    body: 'Quest logic, tutorial states, NPC dialogue, task tracking, and level progression documented through working prototype screens.',
    tags: ['Unity', 'C#', 'Systems', 'UX'],
    kind: 'unity'
  }
];

function ProjectMedia({ kind }) {
  if (kind === 'aspire') {
    return (
      <div className="media mediaAspire">
        <img src="/images/aspire-wide.webp" alt="Aspire 101 campaign concept featuring students on a campus" />
        <div className="mediaCaption">
          <span>CAMPAIGN VISUAL</span>
          <b>Connecting students through real campus needs.</b>
        </div>
      </div>
    );
  }

  if (kind === 'tempus') {
    return (
      <div className="mediaSplit">
        <figure className="media">
          <img src="/images/tempus-title.webp" alt="Tempus Lineus game title screen" />
          <figcaption>Title screen / visual identity</figcaption>
        </figure>
        <figure className="media">
          <img src="/images/tempus-building.webp" alt="Tempus Lineus 3D bakery environment model" />
          <figcaption>Environment modeling / world building</figcaption>
        </figure>
      </div>
    );
  }

  return (
    <div className="media mediaUnity">
      <img src="/images/unity-tutorial.webp" alt="Unity gameplay tutorial level interface" />
      <div className="mediaCaption dark">
        <span>WORKING PROTOTYPE</span>
        <b>Tutorial flow, objectives, interaction, and player feedback.</b>
      </div>
    </div>
  );
}

export default function Home() {
  const [gameMode, setGameMode] = useState(false);

  return (
    <main className={gameMode ? 'site gameMode' : 'site'}>
      <div className="grain" aria-hidden="true" />
      <nav className="nav shell">
        <a className="brand" href="#top">
          <span>CZ</span>
          <b>Congyu Zhao</b>
        </a>

        <div className="navLinks">
          <a href="#work">Work</a>
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
          <p className="eyebrow">FOUNDER · DEVELOPER · GAME SYSTEMS</p>
          <h1>Congyu<br />Zhao.</h1>
          <p className="heroStatement">
            I build products, interactive systems, and visual worlds.
          </p>
          <p className="heroBody">
            From marketplace infrastructure to gameplay logic, I like turning messy ideas into things people can actually use, play, and remember.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#work">View selected work <span>↓</span></a>
            <button className="secondaryButton" onClick={() => setGameMode(true)}>Enter game mode</button>
          </div>
          <div className="heroMeta">
            <span>PRODUCT</span>
            <span>SOFTWARE</span>
            <span>GAME DEVELOPMENT</span>
            <span>VISUAL SYSTEMS</span>
          </div>
        </div>

        <figure className="heroPhoto">
          <img src="/images/hero.webp" alt="Congyu Zhao standing near the coast" />
          <figcaption>
            <span>PLAYER / BUILDER</span>
            <b>Always making the next thing.</b>
          </figcaption>
        </figure>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>BUILD</span><i>✦</i><span>ITERATE</span><i>✦</i><span>PLAY</span><i>✦</i><span>SHIP</span><i>✦</i>
          <span>BUILD</span><i>✦</i><span>ITERATE</span><i>✦</i><span>PLAY</span><i>✦</i><span>SHIP</span><i>✦</i>
        </div>
      </div>

      <section id="work" className="work shell">
        <header className="sectionHeader">
          <div>
            <p className="eyebrow">SELECTED WORK / 2026</p>
            <h2>Real work.<br /><em>Real systems.</em></h2>
          </div>
          <p>
            Startup product work, narrative game worlds, and gameplay prototypes — shown through the actual things I built and shipped.
          </p>
        </header>

        <div className="projectList">
          {work.map((project) => (
            <article
              className={'project project-' + project.kind}
              id={project.kind === 'aspire' ? 'aspire' : project.kind === 'tempus' ? 'tempus' : 'gameplay'}
              key={project.number}
            >
              <div className="projectText">
                <div className="projectLabel">
                  <span>{project.number}</span>
                  <p>{project.eyebrow}</p>
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

                {project.href
                  ? <a className="projectLink" href={project.href} target="_blank" rel="noreferrer">Visit live product <span>↗</span></a>
                  : <span className="projectLink muted">Project study / visual archive</span>
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
          I don&apos;t want a portfolio that only says I can build.
          <em> It should prove it.</em>
        </h2>
        <div className="principles">
          <div><span>01</span><b>Product thinking</b><p>Map the real user problem before adding features.</p></div>
          <div><span>02</span><b>Technical execution</b><p>Make the idea work end-to-end, not just in a mockup.</p></div>
          <div><span>03</span><b>Interactive thinking</b><p>Use feedback, state, motion, and play to make systems understandable.</p></div>
        </div>
      </section>

      <section id="about" className="about shell">
        <figure className="aboutPhoto">
          <img src="/images/gym.webp" alt="Congyu Zhao at the gym" />
          <figcaption>OFF-SCREEN / STILL BUILDING</figcaption>
        </figure>

        <div className="aboutCopy">
          <p className="eyebrow">ABOUT / NOT A SINGLE LANE</p>
          <h2>I like the point where <em>code, product, and play</em> collide.</h2>
          <p>
            I move between software, game systems, product decisions, and visual presentation. The goal is not to collect tools — it is to understand enough of the whole system to move an idea forward.
          </p>
          <p>
            That can mean designing a marketplace flow, wiring up payments, programming an interaction, building a 3D world, or turning a messy concept into something another person can actually use.
          </p>
          <div className="aboutLinks">
            <a href="https://www.linkedin.com/in/congyu-zhao-5226b52b1/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://www.instagram.com/congyu_zhao/" target="_blank" rel="noreferrer">Instagram ↗</a>
          </div>
        </div>
      </section>

      <section className="gameTeaser shell">
        <div className="gameTeaserCopy">
          <p className="eyebrow">OPTIONAL PATH / GAME MODE</p>
          <h2>Want the less normal version?</h2>
          <p>The portfolio stays recruiter-friendly by default. Game Mode adds a playful layer without hiding the actual work.</p>
        </div>
        <button onClick={() => {
          setGameMode(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>START SIDE QUEST <span>→</span></button>
      </section>

      <section id="contact" className="contact shell">
        <p className="eyebrow">CONTACT / NEXT BUILD</p>
        <div className="contactGrid">
          <h2>Have something<br />worth building?</h2>
          <div className="contactLinks">
            <a href="mailto:24zhaocongyu@gmail.com"><span>Email</span><b>24zhaocongyu@gmail.com ↗</b></a>
            <a href="https://www.linkedin.com/in/congyu-zhao-5226b52b1/" target="_blank" rel="noreferrer"><span>LinkedIn</span><b>Connect ↗</b></a>
            <a href="https://www.aspires101.com/" target="_blank" rel="noreferrer"><span>Latest product</span><b>Aspire 101 ↗</b></a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div><span>CZ</span><b>Congyu Zhao</b></div>
        <p>Designed around the work, not the template.</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
