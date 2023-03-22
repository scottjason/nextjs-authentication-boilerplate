import * as React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/common/Button';

export default function Dashboard() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await (await fetch('/api/sign-out')).json();
      router.push('/');
    } catch (_err) {
      router.push('/dashboard');
    }
  };

  return (
    <div className='text-slate-100  flex flex-col'>
      <p className='text-3xl text-center'>AUTHENTICATED</p>
      <Button copy={'SIGN OUT'} callback={handleSubmit} />
    </div>
  );
}
