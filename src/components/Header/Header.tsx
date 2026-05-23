import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import type { HeaderProps } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/ThemeContext';

function Header({ onSearch }: HeaderProps) {
  const storage = useLocalStorage('searchValue');
  const { theme, setTheme } = useTheme();

  function handleThemeSwitch() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="bg-gray-800 text-white p-4 w-full">
      <Link to="/about">About</Link>
      <Search onSearch={onSearch} initValue={storage.get() || ''} />
      <button onClick={handleThemeSwitch}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
}

export default Header;
