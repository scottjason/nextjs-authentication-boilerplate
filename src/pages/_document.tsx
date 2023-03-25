import { TbBrandNextjs } from 'react-icons/tb';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='w-screen h-screen bg-black-900 overflow-x-hidden'>
        <Main />
        <TbBrandNextjs className='absolute top-4 left-4 text-white w-12 h-12 opacity-50' />
        <NextScript />
      </body>
    </Html>
  );
}
