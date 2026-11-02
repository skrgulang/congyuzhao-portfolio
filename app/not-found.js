import Link from 'next/link';
export default function NotFound(){return <main className="notFoundPage"><Link className="newLogo" href="/">CZ<span className="logoDot">.</span></Link><div><p className="newEyebrow">404 / PAGE NOT FOUND</p><h1>Nothing here.</h1><p>That page may have moved. You can head back to the work.</p><Link href="/" className="btnSolid">Back to portfolio ↗</Link></div></main>;}
