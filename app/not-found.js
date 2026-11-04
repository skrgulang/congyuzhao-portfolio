import Link from 'next/link';

export const metadata = {
  title: 'Page not found | Congyu Zhao',
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <main className="notFoundPage">
      <header className="caseNav frame">
        <Link href="/" className="newLogo" aria-label="Congyu Zhao home">CZ<span className="logoDot">.</span></Link>
        <Link href="/projects">All projects ↗</Link>
      </header>
      <section className="notFoundMain frame" aria-labelledby="missing-title">
        <p className="newEyebrow">ERROR 404 / PAGE NOT FOUND</p>
        <h1 id="missing-title">Wrong turn<span>.</span></h1>
        <p>That page isn't here. The work is still around — head back to the portfolio or browse the project archive.</p>
        <div className="notFoundActions">
          <Link href="/" className="btnSolid">Back to homepage ↗</Link>
          <Link href="/projects" className="notFoundSecondary">Explore projects ↗</Link>
        </div>
      </section>
      <footer className="caseFooter frame"><span>CONGYU ZHAO / PORTFOLIO</span><a href="mailto:24zhaocongyu@gmail.com">Get in touch ↗</a></footer>
    </main>
  );
}
