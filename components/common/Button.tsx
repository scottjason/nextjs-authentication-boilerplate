import * as React from 'react';

interface Props {
  copy: string;
  callback: (e: React.FormEvent) => void;
}

export const Button = ({ copy, callback }: Props): JSX.Element => {
  return (
    <button
      type='button'
      onClick={callback}
      className='w-[275px] bg-white hover:bg-gray-100 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
    >
      {copy}
    </button>
  );
};
