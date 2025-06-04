import Header from './Header';

const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-full max-w-[1410px] h-screen flex flex-col gap-12 px-4 p-9 mx-auto'>
      <Header />
      <main className='h-full'>{children}</main>
    </div>
  );
};

export default Page;
