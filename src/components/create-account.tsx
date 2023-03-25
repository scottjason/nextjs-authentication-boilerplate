import * as React from 'react';
import { useRouter } from 'next/router';
import { Button } from './common/Button';
import { SubHeader } from './common/SubHeader';

import { isValidEmail, isValidPassword } from '@/utils/client/validation';

type Props = {
  email: string;
};

type Payload = Props & {
  password: string;
};

export const CreateAccount = (props: Props): JSX.Element => {
  const router = useRouter();
  const { email } = props;
  const [password, setPassword] = React.useState<string>('');

  const makeReq = async (payload: Payload): Promise<void> => {
    try {
      await fetch('/api/create-account', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (isValidEmail(email) && isValidPassword(password)) {
      const payload = {
        email,
        password,
      };
      makeReq(payload);
    }
  };

  return (
    <div className='flex items-center justify-center flex-col h-screen'>
      <SubHeader copy={'ENTER PASSWORD'} color={'text-slate-50'} />
      <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col'>
        <input
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Enter Password'
          className='bg-white outline-none text-black h-[40px] w-[275px] mb-1 p-2 box-border '
        />
        <Button copy={'CREATE ACCOUNT'} callback={handleSubmit} />
      </form>
      <p className='text-white opacity-80 mt-1.5'>
        enter a password to create an account
      </p>
    </div>
  );
};
