import * as React from 'react';

import { BsGithub } from 'react-icons/bs';
import { TbBrandNextjs } from 'react-icons/tb';

const repoUrl = 'https://github.com/scottjason/nextjs-edge-runtime';

export const NavBar = () => {
  return (
    <nav className='z-10'>
      <TbBrandNextjs className='absolute top-7.5 nav:mt-[2.1rem] left-8 text-white w-12 h-12 opacity-50' />
      <p className='text-white ml-[5.5rem] mt-[2.1rem] nav:hidden opacity-80'>
        NextJS Authentication Boilerplate
      </p>
      <p className='text-white ml-[5.5rem] nav:hidden opacity-80'>
        Serverless Middleware using Edge Runtime
      </p>
      <div onClick={() => window.open(repoUrl, '_blank')}>
        <BsGithub className='absolute z-10 cursor-pointer top-8 right-8 mt-[5px] mr-[5px] text-white w-9 h-9' />
      </div>
    </nav>
  );
};
