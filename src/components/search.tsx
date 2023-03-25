import * as React from 'react';

interface Props {
  searchImages: (term: string) => Promise<void>;
}

export const Search = (props: Props): JSX.Element => {
  const [term, setTerm] = React.useState<string>('');

  return (
    <div className='flex justify-center'>
      <div className='mb-3 xl:w-96'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <input
            type='search'
            onChange={e => setTerm(e.currentTarget.value)}
            className='relative m-0 -mr-px block flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-white w-[280px] font-normal text-white-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-white-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200'
            placeholder='SEARCH'
            aria-label='Search'
            aria-describedby='button-addon3'
          />
          <button
            className='relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0'
            onClick={() => props.searchImages(term)}
            type='button'
            id='button-addon3'
            data-te-ripple-init
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
