import { Component } from 'react';
import Search from '../Search/Search';

class Header extends Component {
  render() {
    return (
      <div className="bg-gray-800 text-white p-4 w-full">
        <Search />
      </div>
    );
  }
}
export default Header;
