import { Component } from 'react';
import type { SearchProps, SearchState } from '../../types';

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    searchValue: this.props.initValue,
  };

  handleClick = (): void => {
    this.props.onSearch(this.state.searchValue);
  };

  render() {
    return (
      <div>
        <input
          className="px-4 py-2 rounded-3xl text-amber-100 border border-amber-100 mr-2"
          value={this.state.searchValue}
          onChange={(e) => this.setState({ searchValue: e.target.value })}
        ></input>
        <button
          className="px-8 py-2 rounded-3xl bg-blue-400 hover:bg-amber-200 cursor-pointer hover:text-blue-950"
          onClick={this.handleClick}
        >
          Search
        </button>
      </div>
    );
  }
}
export default Search;
