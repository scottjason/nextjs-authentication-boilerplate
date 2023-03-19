import Image from 'next/image';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='w-screen h-screen flex items-center justify-center flex-col bg-black-900'>
        <Image
          alt='next logo img'
          width={80}
          height={80}
          className='absolute top-5 left-5'
          src={'/nextjs-white.webp'}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
