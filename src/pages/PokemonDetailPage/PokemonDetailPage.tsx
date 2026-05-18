import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { PokemonDetail } from '../../types';

export function PokemonDetailPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <p>{pokemon.name}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
      <p>{pokemon.height}</p>
      {pokemon.abilities.map((a) => (
        <p key={a.ability.name}>{a.ability.name}</p>
      ))}
      <button>Close</button>
    </div>
  );
}

export default PokemonDetailPage;
