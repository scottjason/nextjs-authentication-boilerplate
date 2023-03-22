import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Head>
        <title>NextJS</title>
        <meta
          name='description'
          content='NextJS with authentication middleware running in Edge Runtime'
          key='desc'
        />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
