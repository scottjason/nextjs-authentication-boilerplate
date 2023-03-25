import * as React from 'react';
import { Button } from '../components/common/button';
import { SubHeader } from '../components/common/subheader';
import { CreateAccount } from '../components/create-account';
import { Login } from '../components/login';
import { isValidEmail } from '../lib/client/validation';

type Payload = {
  email: string;
};

type View = 'enter-email' | 'login' | 'create-account';

export default function Home() {
  const [email, setEmail] = React.useState<string>('');
  const [view, setView] = React.useState<View>('enter-email');
  const [isEmailError, setIsEmailError] = React.useState<boolean>(false);

  const makeReq = async (): Promise<void> => {
    const payload: Payload = {
      email,
    };
    try {
      const response = await fetch('/api/account-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setView(data.view);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setIsEmailError(true);
    } else {
      makeReq();
    }
  };

  if (view === 'enter-email') {
    return (
      <div className='absolute left-0 right-0 top-0 bottom-0 m-auto flex items-center justify-center flex-col'>
        {isEmailError ? (
          <SubHeader copy={'ENTER A VALID EMAIL'} color={'text-orange-200'} />
        ) : (
          <SubHeader copy={'ENTER EMAIL'} color={'text-slate-50'} />
        )}
        <form
          noValidate
          onSubmit={handleSubmit}
          className='flex items-center justify-center flex-col bg-slate-800'
        >
          <input
            onChange={e => setEmail(e.target.value)}
            type='email'
            placeholder='Enter Email'
            className='bg-white outline-none text-gray-500 h-[40px] w-[275px] mb-1 p-2 box-border '
          />
          <Button copy={'CONTINUE'} callback={handleSubmit} />
        </form>
        <div className='h-8' />
      </div>
    );
  } else if (view === 'login') {
    return <Login email={email} />;
  } else {
    return <CreateAccount email={email} />;
  }
}
