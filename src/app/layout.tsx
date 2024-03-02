import './globals.css';
import type { Metadata } from 'next';
import styles from '@/styles/style.module.css';
import ReduxProvider from '@/components/ReduxProvider';
// import Favicon from '/public/images/favicon.ico';
// import AuthProvider from "@/components/AuthProvider";
import './globals.css';
import { Gaegu } from 'next/font/google';

const gaegu = Gaegu({
  weight: ['300', '400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  openGraph: {
    title: 'Chatterbox',
    description: 'A chat app',
    // url: "https://reelhub.vercel.app/",
    siteName: 'Chatterbox',
    images: [
      {
        url: 'https://reelhub.s3.eu-west-2.amazonaws.com/Reelhub.png',
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_GB',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
      <ReduxProvider>
        {/* <AuthProvider> */}
        <body className={`${styles.parent} ${gaegu.className}`}>
          {children}
        </body>
        {/* </AuthProvider> */}
      </ReduxProvider>
    </html>
  );
}
