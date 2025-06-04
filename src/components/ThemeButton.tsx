import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export interface ThemeButtonProps {
  className?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ className }) => {
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
    <button
      className={`cursor-pointer p-3 rounded-xl border border-black/15 dark:border-white/15 ${className}`}
      onClick={onClick}
    >
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeButton;
