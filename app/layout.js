import './globals.css';

export const metadata = {
  metadataBase: new URL('https://congyuzhao.com'),
  title: { default: 'Congyu Zhao — Software, Games & Aspire 101', template: '%s | Congyu Zhao' },
  description: 'Portfolio of Congyu Zhao, a Purdue University student and founder of Aspire 101. Explore product engineering, Unity game projects, and wildfire evacuation simulation.',
  applicationName: 'Congyu Zhao Portfolio',
  authors: [{ name: 'Congyu Zhao', url: 'https://congyuzhao.com' }],
  keywords: ['Congyu Zhao', 'Aspire 101', 'Purdue University', 'Unity', 'Fish and Ships', 'Wildfire Evacuation Simulator', 'portfolio'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Congyu Zhao — Software, Games & Aspire 101',
    description: 'Selected work spanning a campus startup, Unity games, and interactive simulation.',
    url: 'https://congyuzhao.com',
    siteName: 'Congyu Zhao Portfolio',
    locale: 'en_US',
    images: [{ url: '/images/hero-recovered.jpg', width: 960, height: 1200, alt: 'Congyu Zhao, portfolio founder and developer' }],
    type: 'website'
  },
  twitter: {
    card: 'summary',
    images: ['/images/hero-recovered.jpg'],
    title: 'Congyu Zhao — Software, Games & Aspire 101',
    description: 'Projects in software, product development, and Unity games.'
  },
  robots: { index: true, follow: true }
};

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Congyu Zhao',
  url: 'https://congyuzhao.com',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Purdue University' },
  knowsAbout: ['Software development', 'Game development', 'Product engineering', 'Unity'],
  sameAs: ['https://github.com/skrgulang', 'https://www.aspires101.com/']
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, '\\u003c') }} />{children}</body></html>;
}
