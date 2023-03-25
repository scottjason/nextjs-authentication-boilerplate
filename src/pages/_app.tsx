import '@/styles/globals.css';
import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { NavBar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  /**
   * Register Broadcast Channel
   */
  const router = useRouter();
  React.useEffect(() => {
    let bc: BroadcastChannel;
    bc = new BroadcastChannel(process.env.NEXT_PUBLIC_BC_CHANNEL as string);
    bc.onmessage = async (event: MessageEvent<string>) => {
      if (event.data === 'sign-out') {
        bc.close();
        try {
          await (await fetch('/api/sign-out')).json();
          router.push('/');
        } catch (_err) {
          router.push('/');
        }
      }
    };
    return () => {
      bc.close();
    };
  }, []);

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
