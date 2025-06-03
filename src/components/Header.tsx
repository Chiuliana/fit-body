import { Link, useMatch } from 'react-router';
import Logo from '../assets/logo.svg?react';
import ThemeButton from './ThemeButton';

const Header: React.FC = () => {
  const isLandingPage = useMatch('/');

  return (
    <header className='flex items-center gap-8'>
      {!isLandingPage && (
        <Link to='/'>
          <Logo />
        </Link>
      )}
      <ThemeButton className='ml-auto' />
    </header>
  );
};

export default Header;
