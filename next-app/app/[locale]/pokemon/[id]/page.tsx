import Image from 'next/image';
export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  return (
    <div>
      <Image
        src={data.sprites.front_default}
        alt={data.name}
        width={96}
        height={96}
      />

      {data.abilities.map((a: { ability: { name: string } }) => (
        <p key={a.ability.name}>{a.ability.name}</p>
      ))}
    </div>
  );
}
