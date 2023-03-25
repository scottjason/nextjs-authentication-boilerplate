import '@/styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  /**
   * Register Broadcast Channel
   */
  const router = useRouter();
  const bc = new BroadcastChannel(process.env.NEXT_PUBLIC_BC_CHANNEL as string);
  bc.onmessage = async (event: MessageEvent<string>) => {
    if (event.data === 'sign-out') {
      try {
        await (await fetch('/api/sign-out')).json();
        router.push('/');
      } catch (_err) {
        router.push('/');
      }
    }
  };
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
