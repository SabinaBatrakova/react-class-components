import type { CardProps } from '../../types';

function Card({ pokemon, onSelect }: CardProps) {
  const id = pokemon.url.split('/').at(-2);

  return (
    <div
      onClick={() => onSelect(id!)}
      className="bg-white p-4 mb-2 rounded shadow"
    >
      <p className="font-bold">{pokemon.name}</p>
      <p className="text-gray-500">{pokemon.url.split('/').at(-2)}</p>
    </div>
  );
}
export default Card;
