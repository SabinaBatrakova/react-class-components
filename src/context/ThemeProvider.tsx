import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;
