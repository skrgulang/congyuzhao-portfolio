const projects = [
  {
    title: 'Aspire 101',
    category: 'Startup / Product',
    description: 'A student-focused marketplace and connection platform built around flexible fulfillment, trust, and campus communities.',
    href: 'https://aspires101.com/'
  },
  {
    title: 'Game Development',
    category: 'Unity / Unreal',
    description: 'Gameplay systems, first-person interaction, character logic, prototypes, and interactive experiences.'
  },
  {
    title: 'Creative Technology',
    category: 'Design / Development',
    description: 'Experiments that combine technical systems, interfaces, storytelling, and product thinking.'
  }
];

export default function Home() {
  return (
    <main>
      <nav className="nav wrap">
        <a className="brand" href="#top">CZ</a>
        <div className="links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero wrap">
        <p className="eyebrow">FOUNDER · DEVELOPER · BUILDER</p>
        <h1>Congyu Zhao</h1>
        <p className="heroCopy">
          I build products, software, and interactive experiences — combining technical execution with product and business thinking.
        </p>
        <div className="heroActions">
          <a className="primary" href="#work">View selected work</a>
          <a className="secondary" href="#contact">Get in touch</a>
        </div>
      </section>

      <section id="work" className="section wrap">
        <div className="sectionHead">
          <p className="eyebrow">SELECTED WORK</p>
          <h2>Things I’m building.</h2>
        </div>
        <div className="grid">
          {projects.map((project) => (
            <article className="card" key={project.title}>
              <p className="category">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.href ? <a href={project.href} target="_blank" rel="noreferrer">Visit project ↗</a> : <span>Case study coming soon</span>}
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section wrap twoCol">
        <div>
          <p className="eyebrow">ABOUT</p>
          <h2>Technical work with product perspective.</h2>
        </div>
        <div className="bodyCopy">
          <p>
            My work spans software, game development, product design, and entrepreneurship. I care about building things that are usable, understandable, and worth shipping.
          </p>
          <p>
            This site is being rebuilt as a home for my projects, experiments, experience, and future work.
          </p>
        </div>
      </section>

      <section id="contact" className="contact wrap">
        <p className="eyebrow">CONTACT</p>
        <h2>Let’s build something useful.</h2>
        <p>Links and contact details will be added before launch.</p>
      </section>

      <footer className="footer wrap">
        <span>© 2026 Congyu Zhao</span>
        <span>congyuzhao.com</span>
      </footer>
    </main>
  );
}
