import Pagination from '@/components/Pagination';
import SearchForm from '@/components/SearchForm';
import Link from 'next/link';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search: string }>;
}) {
  const page = (await searchParams).page || '1';
  const offset = (Number(page) - 1) * 10;

  const search = (await searchParams).search || '';

  let response;

  if (search) {
    response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
  } else {
    response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    );
  }

  const data = await response.json();

  const pokemons: { name: string; url: string }[] = data
    ? 'results' in data
      ? data.results
      : [
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
          },
        ]
    : [];

  return (
    <div>
      <h1>Pokemon list </h1>
      <SearchForm/>
      {pokemons.map((pokemon: { name: string; url: string }) => {
        const id = pokemon.url.split('/')[6];
        return (
          <div key={pokemon.name}>
            <Link href={`/pokemon/${id}`}>{pokemon.name}</Link>
          </div>
        );
      })}
      <Pagination page={Number(page)} />
    </div>
  );
}
