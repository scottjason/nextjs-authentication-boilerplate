import '@/styles/globals.css';
import * as React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { NavBar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Head>
        <title>NextJS</title>
        <meta
          name='description'
          content='NextJS authentication with middleware using Edge Runtime'
          key='desc'
        />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </main>
  );
}
