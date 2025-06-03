import Page from '../components/Page';
import LogoText from '../assets/logo_name.svg?react';
import { useNavigate } from 'react-router';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <div className='h-full'>
        <div className='flex flex-col items-center justify-center h-full gap-12'>
          <LogoText />
          <button
            className='cursor-pointer px-8 py-4 rounded-full bg-violet-500 text-white hover:bg-violet-400 active:bg-violet-500 transition-colors duration-200'
            onClick={() => navigate('/exercises')}
          >
            Start you journey
          </button>
        </div>
      </div>
    </Page>
  );
};

export default Landing;
