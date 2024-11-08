import localFont from 'next/font/local';
import './globals.css';

const inter = localFont({
  src: './fonts/Inter.ttf',
  variable: '--font-inter',
  weight: '100 900',
});
const comfortaa = localFont({
  src: './fonts/Comfortaa.ttf',
  variable: '--font-comfortaa',
  weight: '300 700',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${comfortaa.variable} font-inter antialiased flex flex-col overflow-hidden`}>{children}</body>
    </html>
  );
}
