import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const signOut = async () => {
    try {
      await (await fetch('/api/dashboard/sign-out')).json();
      console.log(8);
      router.push('/');
    } catch (_err) {
      console.log(11);
      router.push('/dashboard');
    }
  };
  return (
    <div>
      <div className='flex items-center flex-col h-auto top-[40%] absolute left-0 right-0'>
        <p className='m-auto text-white'>AUTHENTICATED</p>
        <button
          onClick={signOut}
          className='m-auto bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow h-[50px] w-[250px]'
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
}
