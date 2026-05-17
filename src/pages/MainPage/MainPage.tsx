import { useState, useEffect } from 'react';
import type { Pokemon } from '../../types';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function MainPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [throwError, setThrowError] = useState(false);
  const [prevSearch, setPrevSearch] = useState('');
  const storage = useLocalStorage('searchValue');
  const savedSearch = storage.get();

  function handleSearch(value: string) {
    const trimmedValue = value.trim();
    if (prevSearch === trimmedValue) {
      return;
    } else {
      setPrevSearch(trimmedValue);
      storage.set(trimmedValue);
    }

    setIsLoading(true);
    setError(null);

    if (!trimmedValue) {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setPokemons(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${trimmedValue}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setPokemons([
            {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            },
          ]);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    const url = savedSearch
      ? `https://pokeapi.co/api/v2/pokemon/${savedSearch}`
      : `https://pokeapi.co/api/v2/pokemon?limit=10`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (savedSearch) {
          setPokemons([
            {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            },
          ]);
        } else {
          setPokemons(data.results);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (throwError) {
    throw new Error('Test error');
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header onSearch={handleSearch} />
        <Main pokemons={pokemons} isLoading={isLoading} error={error} />
        <button
          className="fixed bottom-4 right-4 px-4 py-2 bg-amber-600 text-white rounded-3xl cursor-pointer hover:bg-amber-700"
          onClick={() => setThrowError(true)}
        >
          Test Error
        </button>
      </div>
    </div>
  );
}

export default MainPage;
