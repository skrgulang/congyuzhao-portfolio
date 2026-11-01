import './globals.css';

export const metadata = {
  metadataBase: new URL('https://congyuzhao.com'),
  title: 'Congyu Zhao | Founder & Developer',
  description: 'Congyu Zhao is a Purdue University student, founder of Aspire 101, and developer building software products and Unity games including Fish and Ships.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Congyu Zhao | Portfolio',
    description: 'Explore Aspire 101, Fish and Ships, and selected software and game development projects.',
    url: 'https://congyuzhao.com',
    siteName: 'Congyu Zhao Portfolio',
    type: 'website'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
