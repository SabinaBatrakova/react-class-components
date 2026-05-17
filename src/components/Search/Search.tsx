import type { SearchProps } from '../../types';
import { useState } from 'react';

function Search({ onSearch, initValue }: SearchProps) {
  const [searchState, setSearchState] = useState(initValue);

  function handleClick(): void {
    onSearch(searchState);
  }

  return (
    <div>
      <input
        className="px-4 py-2 rounded-3xl text-amber-100 border border-amber-100 mr-2"
        value={searchState}
        onChange={(e) => setSearchState(e.target.value)}
      ></input>
      <button
        className="px-8 py-2 rounded-3xl bg-blue-400 hover:bg-amber-200 cursor-pointer hover:text-blue-950"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
