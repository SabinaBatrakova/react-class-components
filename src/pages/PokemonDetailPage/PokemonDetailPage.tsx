import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { PokemonDetail } from '../../types';

export function PokemonDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('details');

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  const { data, isLoading, isError } = useQuery<PokemonDetail>({
    queryKey: ['pokemon', id],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
    enabled: !!id,
  });
  if (!id) return null;

  if (isError) return null;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <div
          data-testid="spinner"
          className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p className="mt-2 text-blue-950">Loading...</p>
      </div>
    );

  if (!data) {
    return;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <p className="text-4xl text-orange-600">{data.name}</p>
      <img src={data.sprites.front_default} alt={data.name}></img>
      <p className="p-4 text-2xl text-blue-950">{data.height}</p>
      {data.abilities.map((a) => (
        <p className="p-2 text-2xl text-blue-950" key={a.ability.name}>
          {a.ability.name}
        </p>
      ))}
      <button
        onClick={handleClose}
        className="px-6 py-2 bg-blue-950 text-white rounded-3xl cursor-pointer hover:bg-blue-400"
      >
        Close
      </button>
    </div>
  );
}

export default PokemonDetailPage;
