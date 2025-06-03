import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeButton: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      return localTheme as 'light' | 'dark';
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
  });

  const onClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button className='cursor-pointer' onClick={onClick}>
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeButton;
