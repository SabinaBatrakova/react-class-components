import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import type { HeaderProps } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function Header({ onSearch }: HeaderProps) {
  const storage = useLocalStorage('searchValue');
  return (
    <div className="bg-gray-800 text-white p-4 w-full">
      <Link to="/about">About</Link>
      <Search onSearch={onSearch} initValue={storage.get() || ''} />
    </div>
  );
}

export default Header;
