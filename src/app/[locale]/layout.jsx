import { Inter } from 'next/font/google';
import '../globals.css';
import Head from '../head';
import Providers from '../providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Имущественный комплекс МГРИ',
  description: '',
};

export default function RootLayout({ children, params: {locale} }) {
  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <Head />
      </head>
      <body className={`${inter.className} select-none overflow-x-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
