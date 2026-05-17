import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import type { HeaderProps } from '../../types';

function Header({ onSearch }: HeaderProps) {
  return (
    <div className="bg-gray-800 text-white p-4 w-full">
      <Link to="/about">About</Link>
      <Search
        onSearch={onSearch}
        initValue={localStorage.getItem('searchValue') || ''}
      />
    </div>
  );
}

export default Header;
