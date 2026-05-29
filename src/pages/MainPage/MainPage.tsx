import type { ApiAnswer, Pokemon, PokemonDetail } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import { Outlet } from 'react-router-dom';
import Flyout from '../../components/Flyout/Flyout';
import Pagination from '../../components/Pagination/Pagination';

function MainPage() {
  const storage = useLocalStorage('searchValue');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const savedSearch = storage.get();
  const [throwError, setThrowError] = useState(false);
  const onNext = () => setSearchParams({ page: String(page + 1) });
  const onPrev = () => setSearchParams({ page: String(page - 1) });
  const onSelect = (id: string) => {
    setSearchParams({ page: String(page), details: id });
  };

  function handleSearch(value: string) {
    const trimmedValue = value.trim();

    storage.set(trimmedValue);
    setSearchParams({ page: '1' });
  }

  const { data, isLoading, error } = useQuery<ApiAnswer | PokemonDetail>({
    queryKey: ['pokemons', page, savedSearch],
    queryFn: () => {
      if (savedSearch) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${savedSearch}`).then(
          (res) => {
            if (!res.ok) {
              throw new Error(`Error: ${res.status}`);
            }
            return res.json();
          }
        );
      } else {
        const offset = (page - 1) * 10;
        return fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
        ).then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          return res.json();
        });
      }
    },
  });

  const pokemons: Pokemon[] = data
    ? 'results' in data
      ? data.results
      : [
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
          },
        ]
    : [];

  if (throwError) {
    throw new Error('Test error');
  }

  const handleClick = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header onSearch={handleSearch} />
        <div className="flex flex-1">
          <div className="w-1/2" onClick={handleClick}>
            <Main
              pokemons={pokemons}
              isLoading={isLoading}
              onSelect={onSelect}
              error={error?.message ?? null}
            />
            {!isLoading && (
              <Pagination page={page} onNext={onNext} onPrev={onPrev} />
            )}
          </div>

          <div className="w-1/2 bg-white min-h-screen">
            <Outlet />
          </div>
        </div>

        <button
          className="fixed bottom-4 right-4 px-4 py-2 bg-amber-600 text-white rounded-3xl cursor-pointer hover:bg-amber-700"
          onClick={() => setThrowError(true)}
        >
          Test Error
        </button>
        <Flyout />
      </div>
    </div>
  );
}

export default MainPage;
