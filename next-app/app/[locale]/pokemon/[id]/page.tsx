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
    <div className="max-w-2xl mx-auto p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold capitalize mb-4">{data.name}</h1>
      <Image
        src={data.sprites.front_default}
        alt={data.name}
        width={200}
        height={200}
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Abilities:</h2>
        {data.abilities.map((a: { ability: { name: string } }) => (
          <p key={a.ability.name} className="text-blue-600 capitalize">
            {a.ability.name}
          </p>
        ))}
      </div>
    </div>
  );
}
