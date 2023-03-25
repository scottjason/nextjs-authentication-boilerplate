import * as React from 'react';
import { useRouter } from 'next/router';

export const SignOut = () => {
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
  return null;
};
