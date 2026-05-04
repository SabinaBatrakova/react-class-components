import { Component } from 'react';
import Search from '../Search/Search';
import type { HeaderProps } from '../../types';

class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className="bg-gray-800 text-white p-4 w-full">
        <Search
          onSearch={this.props.onSearch}
          initValue={localStorage.getItem('searchValue') || ''}
        />
      </div>
    );
  }
}
export default Header;
