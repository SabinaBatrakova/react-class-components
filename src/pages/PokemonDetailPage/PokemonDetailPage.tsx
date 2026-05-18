import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { PokemonDetail } from '../../types';

export function PokemonDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('details');
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };
  useEffect(() => {
    if (!id) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [id]);

  if (!id) return null;
  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <p>{pokemon.name}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
      <p>{pokemon.height}</p>
      {pokemon.abilities.map((a) => (
        <p key={a.ability.name}>{a.ability.name}</p>
      ))}
      <button
        onClick={handleClose}
        className="px-4 py-2 bg-blue-950 text-white rounded-3xl cursor-pointer hover:bg-blue-400"
      >
        Close
      </button>
    </div>
  );
}

export default PokemonDetailPage;
