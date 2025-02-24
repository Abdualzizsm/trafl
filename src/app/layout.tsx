import { Noto_Sans_Arabic } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import MobileNavBar from '@/components/MobileNavBar';
import './globals.css';

const arabic = Noto_Sans_Arabic({ subsets: ['arabic'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no, apple-mobile-web-app-capable=yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${arabic.className} min-h-screen bg-white dark:bg-gray-900 dark:text-white`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <MobileNavBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 