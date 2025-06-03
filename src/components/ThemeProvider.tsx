import { useEffect } from 'react';

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = (event: MediaQueryListEvent) => {
      const localTheme = localStorage.getItem('theme');

      if (!localTheme) {
        const browserTheme = event.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle(
          'dark',
          browserTheme === 'dark',
        );
      }
    };

    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      document.documentElement.classList.toggle('dark', localTheme === 'dark');
    } else {
      const browserTheme = isBrowserDarkMode.matches ? 'dark' : 'light';
      document.documentElement.classList.toggle(
        'dark',
        browserTheme === 'dark',
      );
    }

    isBrowserDarkMode.addEventListener('change', handleThemeChange);

    return () => {
      isBrowserDarkMode.removeEventListener('change', handleThemeChange);
    };
  });

  return children;
};

export default ThemeProvider;
