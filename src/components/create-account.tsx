import { useRouter } from 'next/router';
import * as React from 'react';
import { Button } from './common/button';
import { SubHeader } from './common/subheader';

import { PASSWORD_ERROR } from '../constants';
import { isValidEmail, isValidPassword } from '../lib/client/validation';

type Props = {
  email: string;
};

type Payload = Props & {
  password: string;
};

export const CreateAccount = (props: Props): JSX.Element => {
  const router = useRouter();
  const { email } = props;
  const [isPasswordError, setIsPasswordError] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>('');

  const makeReq = async (payload: Payload): Promise<void> => {
    try {
      await fetch('/api/auth/create-account', {
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
    } else if (!isValidPassword(password)) {
      setIsPasswordError(true);
    }
  };

  return (
    <div className='absolute left-0 right-0 top-0 bottom-0 m-auto flex items-center justify-center flex-col'>
      {isPasswordError ? (
        <div className='mt-[27px]'>
          <SubHeader copy={'ENTER A VALID PASSWORD'} color={'text-orange-200'} />
        </div>
      ) : (
        <SubHeader copy={'ENTER PASSWORD'} color={'text-slate-50'} />
      )}
      <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col'>
        <input
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Enter Password'
          className='bg-white outline-none text-black h-[40px] w-[275px] mb-1 p-2 box-border '
        />
        <Button copy={'CREATE ACCOUNT'} callback={handleSubmit} />
      </form>
      {!isPasswordError && (
        <p className='text-white opacity-80 mt-1.5 w-[320px] text-center'>
          enter a password to create an account
        </p>
      )}
      {isPasswordError && (
        <p className='text-white text-xs opacity-80 mt-1.5 w-[320px] text-center'>
          {PASSWORD_ERROR}
        </p>
      )}
    </div>
  );
};
