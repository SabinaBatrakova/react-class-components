import { Component } from 'react';
import Search from '../Search/Search';
import type { HeaderProps } from '../../types';
import { Link } from 'react-router-dom';

class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className="bg-gray-800 text-white p-4 w-full">
        <Link to="/about">About</Link>
        <Search
          onSearch={this.props.onSearch}
          initValue={localStorage.getItem('searchValue') || ''}
        />
      </div>
    );
  }
}
export default Header;
