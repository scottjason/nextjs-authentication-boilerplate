import * as React from 'react';
import { useRouter } from 'next/router';
import { Button } from './common/Button';
import { SubHeader } from './common/SubHeader';

import { PASSWORD_ERROR } from '@/constants';
import { isValidEmail, isValidPassword } from '@/utils/client/validation';

type Props = {
  email: string;
};

type Payload = Props & {
  password: string;
};

export const Login = (props: Props): JSX.Element => {
  const router = useRouter();
  const { email } = props;
  const [password, setPassword] = React.useState<string>('');
  const [isInvalidCredens, setIsInvalidCredens] = React.useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = React.useState<boolean>(false);

  const makeReq = async (payload: Payload): Promise<void> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 401) {
        setIsInvalidCredens(true);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setIsPasswordError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (isValidEmail(email) && isValidPassword(password)) {
      if (isPasswordError) {
        setIsPasswordError(false);
      }
      if (isInvalidCredens) {
        setIsInvalidCredens(false);
      }
      const payload = {
        email,
        password,
      };
      makeReq(payload);
    } else if (!isValidPassword(password)) {
      setIsInvalidCredens(false);
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
        <Button copy={'LOGIN'} callback={handleSubmit} />
      </form>
      {!isPasswordError && !isInvalidCredens && (
        <p className='text-white opacity-80 mt-1.5 w-[320px] text-center'>
          enter your password to sign in
        </p>
      )}
      {isPasswordError && (
        <p className='text-white text-xs opacity-80 mt-1.5 w-[320px] text-center'>
          {PASSWORD_ERROR}
        </p>
      )}
      {isInvalidCredens && (
        <p className='text-white text-s opacity-80 mt-1.5 w-[320px] text-center'>
          credentials not recognized, try again
        </p>
      )}
    </div>
  );
};
