import type { CardListProps } from '../../types';
import Card from '../Card/Card';

function CardList({ pokemons }: CardListProps) {
  return (
    <div>
      {(pokemons ?? []).map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
export default CardList;
