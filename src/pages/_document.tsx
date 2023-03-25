import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='w-screen h-full bg-black-900 overflow-x-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
