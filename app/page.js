'use client';

import { useEffect, useMemo, useState } from 'react';

const projects = [
  {
    id: '01',
    title: 'Aspire 101',
    eyebrow: 'FOUNDER / PRODUCT / SOFTWARE',
    description:
      'A student-focused marketplace and connection platform designed around campus trust, flexible fulfillment, and real-world community needs.',
    tags: ['Next.js', 'Supabase', 'Stripe', 'Product'],
    href: 'https://aspires101.com/',
    visual: 'aspire'
  },
  {
    id: '02',
    title: 'Interactive Game Systems',
    eyebrow: 'UNITY / UNREAL / GAMEPLAY',
    description:
      'Playable systems, first-person interactions, character logic, UI flows, triggers, and game prototypes built around clear player feedback.',
    tags: ['Unity', 'C#', 'Unreal', 'Blueprints'],
    visual: 'game'
  },
  {
    id: '03',
    title: 'Unity Fire Simulator',
    eyebrow: 'SIMULATION / TRAINING',
    description:
      'An emergency-survival training experience with objective UI, tutorial flow, dialogue interactions, and environment-based progression.',
    tags: ['Unity', 'Systems', '3D', 'UX'],
    href: 'https://2131790781.itch.io/escaping-from-emergencey',
    visual: 'fire'
  },
  {
    id: '04',
    title: 'Tempus Lineus',
    eyebrow: 'WORLD / VISUAL STORYTELLING',
    description:
      'A narrative game world combining environment art, interface design, presentation systems, and visual storytelling.',
    tags: ['Narrative', 'UI', '3D', 'Art Direction'],
    visual: 'tempus'
  }
];

const capabilities = [
  ['01', 'Product Systems', 'Turn ambiguous ideas into flows, interfaces, and shippable product logic.'],
  ['02', 'Game Development', 'Build interactive mechanics, state, movement, feedback loops, and player-facing systems.'],
  ['03', 'Software', 'Develop modern web experiences with frontend, backend services, payments, and integrations.'],
  ['04', 'Visual Direction', 'Shape the way a product feels through layout, motion, hierarchy, and presentation.']
];

function ProjectVisual({ type }) {
  if (type === 'aspire') {
    return (
      <div className="visual visualAspire">
        <div className="orbit orbitOne" />
        <div className="orbit orbitTwo" />
        <div className="aspireMark">A</div>
        <div className="miniWindow aspireWindow">
          <span>MARKETPLACE</span>
          <strong>Campus commerce, rebuilt.</strong>
          <div className="miniRows">
            <i /><i /><i />
          </div>
        </div>
        <div className="signalBars"><i /><i /><i /><i /></div>
      </div>
    );
  }

  if (type === 'game') {
    return (
      <div className="visual visualGame">
        <div className="crosshair"><i /><i /></div>
        <div className="hud hudA">PLAYER_01</div>
        <div className="hud hudB">SYSTEM READY</div>
        <div className="worldGrid" />
        <div className="playerDot" />
        <div className="questCard">
          <span>ACTIVE QUEST</span>
          <strong>Build the interaction.</strong>
          <div className="progress"><i /></div>
        </div>
      </div>
    );
  }

  if (type === 'fire') {
    return (
      <div className="visual visualFire">
        <div className="fireGlow" />
        <div className="simPanel">
          <div className="simTop"><span>TRAINING SIM</span><b>LIVE</b></div>
          <div className="simScene">
            <i className="door" />
            <i className="npc" />
            <i className="hazard" />
          </div>
          <div className="objective"><span>OBJECTIVE</span><strong>Find a safe route →</strong></div>
        </div>
      </div>
    );
  }

  return (
    <div className="visual visualTempus">
      <div className="moon" />
      <div className="mountain mountainOne" />
      <div className="mountain mountainTwo" />
      <div className="temple"><i /><i /><i /></div>
      <div className="tempusTitle"><span>WORLD_04</span><strong>TEMPUS<br />LINEUS</strong></div>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState('build');
  const [time, setTime] = useState('');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty('--mx', event.clientX + 'px');
      document.documentElement.style.setProperty('--my', event.clientY + 'px');
    };
    window.addEventListener('mousemove', onMove);

    const updateTime = () => {
      setTime(new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('mousemove', onMove);
      clearInterval(timer);
    };
  }, []);

  const copy = useMemo(() => mode === 'game'
    ? {
        kicker: 'PLAYER PROFILE // CREATIVE TECH',
        titleTop: 'BUILD.',
        titleBottom: 'PLAY. SHIP.',
        intro: 'I design the systems behind interactive experiences — from gameplay logic to startup products. Pick a quest and explore the work.'
      }
    : {
        kicker: 'FOUNDER · DEVELOPER · GAME SYSTEMS',
        titleTop: 'I BUILD',
        titleBottom: 'THINGS THAT MOVE.',
        intro: 'Products, software, and interactive experiences — combining technical execution, game thinking, and a bias toward shipping.'
      }, [mode]);

  return (
    <main className={mode === 'game' ? 'site gameMode' : 'site'}>
      <div className="noise" />
      <div className="cursorGlow" />
      <div className="ambient ambientA" />
      <div className="ambient ambientB" />

      <nav className="topbar shell">
        <a className="brandLockup" href="#top">
          <span className="brandOrb">CZ</span>
          <span>
            <b>Congyu Zhao</b>
            <small>Portfolio / 2026</small>
          </span>
        </a>

        <div className="navLinks">
          <a href="#work">Work</a>
          <a href="#lab">Lab</a>
          <a href="#about">About</a>
        </div>

        <div className="navRight">
          <span className="liveStatus"><i /> BUILDING NOW</span>
          <button className="modeToggle" onClick={() => setMode(mode === 'build' ? 'game' : 'build')}>
            <span>{mode === 'build' ? 'GAME MODE' : 'BUILD MODE'}</span>
            <i className={mode === 'game' ? 'toggleDot active' : 'toggleDot'} />
          </button>
        </div>
      </nav>

      <section id="top" className="hero shell">
        <div className="heroMeta">
          <span>WEST LAFAYETTE / US</span>
          <span>LOCAL TIME {time || '—:—:—'}</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="kicker">{copy.kicker}</p>
            <h1>
              <span>{copy.titleTop}</span>
              <em>{copy.titleBottom}</em>
            </h1>
            <p className="intro">{copy.intro}</p>

            <div className="heroButtons">
              <a className="button buttonPrimary" href="#work">Enter selected work <b>↘</b></a>
              <a className="button buttonGhost" href="https://aspires101.com/" target="_blank" rel="noreferrer">Latest build: Aspire 101 ↗</a>
            </div>

            <div className="proofStrip">
              <div><strong>04</strong><span>Featured worlds</span></div>
              <div><strong>∞</strong><span>Iterations</span></div>
              <div><strong>01</strong><span>Founder mindset</span></div>
            </div>
          </div>

          <div className="heroConsole">
            <div className="consoleHeader">
              <span>CONGYU_OS</span>
              <div><i /><i /><i /></div>
            </div>

            <div className="identityCore">
              <div className="coreRing ringOne" />
              <div className="coreRing ringTwo" />
              <div className="coreRing ringThree" />
              <div className="coreCenter">CZ</div>
              <span className="satellite satOne">01</span>
              <span className="satellite satTwo">02</span>
              <span className="satellite satThree">03</span>
            </div>

            <div className="consoleReadout">
              <div><span>ROLE</span><b>FOUNDER + BUILDER</b></div>
              <div><span>FOCUS</span><b>PRODUCT / GAMES / SOFTWARE</b></div>
              <div><span>MODE</span><b>{mode === 'game' ? 'PLAYFUL EXPERIMENT' : 'SHIP THE SYSTEM'}</b></div>
              <div><span>STATUS</span><b className="online">● ONLINE</b></div>
            </div>

            <div className="consoleFooter">
              <span>SYS // CREATIVE COMPUTING</span>
              <span>v2.0</span>
            </div>
          </div>
        </div>

        <div className="marquee">
          <div>
            <span>UNITY</span><b>✦</b><span>UNREAL</span><b>✦</b><span>NEXT.JS</span><b>✦</b>
            <span>SUPABASE</span><b>✦</b><span>STRIPE</span><b>✦</b><span>PRODUCT SYSTEMS</span><b>✦</b>
            <span>UNITY</span><b>✦</b><span>UNREAL</span><b>✦</b><span>NEXT.JS</span><b>✦</b>
            <span>SUPABASE</span><b>✦</b><span>STRIPE</span><b>✦</b><span>PRODUCT SYSTEMS</span><b>✦</b>
          </div>
        </div>
      </section>

      <section id="work" className="section shell">
        <div className="sectionIntro">
          <div>
            <p className="kicker">SELECTED WORLDS / 01—04</p>
            <h2>Built to be<br /><em>used, not admired.</em></h2>
          </div>
          <p>
            A mix of startup product work, gameplay systems, simulations, and visual worlds.
            Each project starts with a different problem; the common thread is making the system feel clear.
          </p>
        </div>

        <div className="projectStack">
          {projects.map((project) => (
            <article
              className={'projectCard ' + (hovered === project.id ? 'isHovered' : '')}
              key={project.id}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="projectInfo">
                <div className="projectTopline">
                  <span>{project.id}</span>
                  <p>{project.eyebrow}</p>
                </div>
                <h3>{project.title}</h3>
                <p className="projectDescription">{project.description}</p>
                <div className="tagRow">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                {project.href
                  ? <a className="projectLink" href={project.href} target="_blank" rel="noreferrer">Open project <b>↗</b></a>
                  : <span className="projectLink muted">Case study / in progress</span>
                }
              </div>
              <ProjectVisual type={project.visual} />
            </article>
          ))}
        </div>
      </section>

      <section id="lab" className="section shell">
        <div className="labPanel">
          <div className="labHeader">
            <div>
              <p className="kicker">SYSTEM MAP / HOW I BUILD</p>
              <h2>From idea to<br /><em>working loop.</em></h2>
            </div>
            <span className="labIndex">LAB_04</span>
          </div>

          <div className="capabilityGrid">
            {capabilities.map(([n, title, description]) => (
              <div className="capability" key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <i>↗</i>
              </div>
            ))}
          </div>

          <div className="processLine">
            <span>OBSERVE</span><i />
            <span>MAP</span><i />
            <span>BUILD</span><i />
            <span>BREAK</span><i />
            <span>ITERATE</span><i />
            <span>SHIP</span>
          </div>
        </div>
      </section>

      <section id="about" className="section about shell">
        <div className="aboutStatement">
          <p className="kicker">ABOUT / NOT A SINGLE LANE</p>
          <h2>
            I like the point where
            <em> code, product, and play </em>
            collide.
          </h2>
        </div>

        <div className="aboutGrid">
          <div className="aboutText">
            <p>
              I work across product development, software, game systems, and visual storytelling.
              The goal is not to collect tools — it is to understand enough of the whole system to move an idea forward.
            </p>
            <p>
              That can mean designing a marketplace flow, wiring up a payment system, programming character behavior,
              prototyping an interaction, or turning a messy concept into something another person can actually use.
            </p>
          </div>

          <div className="statBoard">
            <div><span>PRIMARY MODE</span><b>BUILD + LEARN</b></div>
            <div><span>COMFORT ZONE</span><b>CROSS-DISCIPLINARY</b></div>
            <div><span>FAVORITE QUESTION</span><b>“CAN WE SHIP IT?”</b></div>
            <div><span>CURRENT ENERGY</span><b>FOUNDER / DEV</b></div>
          </div>
        </div>
      </section>

      <section className="contact shell">
        <div className="contactGrid">
          <div>
            <p className="kicker">CONTACT / NEXT QUEST</p>
            <h2>Have an idea<br />worth <em>building?</em></h2>
          </div>
          <div className="contactActions">
            <a href="https://www.linkedin.com/in/congyu-zhao-5226b52b1/" target="_blank" rel="noreferrer">
              <span>LINKEDIN</span><b>↗</b>
            </a>
            <a href="https://www.instagram.com/congyu_zhao/" target="_blank" rel="noreferrer">
              <span>INSTAGRAM</span><b>↗</b>
            </a>
            <a href="https://aspires101.com/" target="_blank" rel="noreferrer">
              <span>ASPIRE 101</span><b>↗</b>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="footerBrand"><span>CZ</span><b>CONGYU ZHAO</b></div>
        <p>DESIGNED AS A SYSTEM, NOT A TEMPLATE.</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
