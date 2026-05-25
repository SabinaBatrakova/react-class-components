import usePokemonStore from '../../store/store';
import type { CardProps } from '../../types';

function Card({ pokemon, onSelect }: CardProps) {
  const id = pokemon.url.split('/').at(-2);
  const addPokemon = usePokemonStore((state) => state.addPokemon);
  const removePokemon = usePokemonStore((state) => state.removePokemon);
  const pokemons = usePokemonStore((state) => state.pokemons);

  const isSelected = pokemons.some((p) => p.url === pokemon.url);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id!);
      }}
      className="bg-white p-4 mb-2 rounded shadow"
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() =>
          isSelected ? removePokemon(pokemon) : addPokemon(pokemon)
        }
        onClick={(e) => e.stopPropagation()}
      />
      <p className="font-bold">{pokemon.name}</p>
      <p className="text-gray-500">{id}</p>
    </div>
  );
}
export default Card;
