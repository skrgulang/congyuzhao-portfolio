import './globals.css';

export const metadata = {
  title: 'Congyu Zhao — Portfolio',
  description: 'Portfolio of Congyu Zhao — founder, developer, and builder.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
