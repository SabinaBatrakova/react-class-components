import type { CardListProps } from '../../types';
import Card from '../Card/Card';

function CardList({ pokemons, onSelect }: CardListProps) {
  return (
    <div>
      {(pokemons ?? []).map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} onSelect={onSelect} />
      ))}
    </div>
  );
}
export default CardList;
