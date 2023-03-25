import Head from 'next/head';

import { NavBar } from '../navbar';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props): JSX.Element => (
  <div>
    <Head>
      <title>NextJS</title>
      <meta
        name='description'
        content='NextJS authentication with middleware using Edge Runtime'
        key='desc'
      />
    </Head>
    <NavBar />
    {children}
  </div>
);

export default Layout;
