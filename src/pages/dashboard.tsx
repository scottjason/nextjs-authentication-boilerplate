import * as React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

export default function Dashboard() {
  const signOut = () => {
    const bc = new BroadcastChannel(process.env.NEXT_PUBLIC_BC_CHANNEL as string);
    bc.postMessage('sign-out');
  };
  return (
    <div>
      <nav className='flex justify-end w-screen pl-20 pt-6 '>
        <AiOutlineLogout
          onClick={signOut}
          className='text-white text-4xl opacity-70 mr-5 cursor-pointer'
        />
      </nav>
    </div>
  );
}
