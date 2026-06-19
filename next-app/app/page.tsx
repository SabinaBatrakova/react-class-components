export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = (await searchParams).page || '1';
  const offset = (Number(page) - 1) * 10;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  );
  const data = await response.json();

  return (
    <div>
      <h1>Pokemon list </h1>
      {data.results.map((pokemon: { name: string; url: string }) => (
        <div key={pokemon.name}>
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}
