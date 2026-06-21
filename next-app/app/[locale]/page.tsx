import Pagination from '@/components/Pagination';
import SearchForm from '@/components/SearchForm';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search: string }>;
}) {
  const page = (await searchParams).page || '1';
  const offset = (Number(page) - 1) * 10;

  const search = (await searchParams).search || '';
  const t = await getTranslations('main');

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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        {t('pokemonList')}
      </h1>
      <SearchForm />
      <div className="flex flex-col gap-2 mt-4">
        {pokemons.map((pokemon: { name: string; url: string }) => {
          const id = pokemon.url.split('/')[6];
          return (
            <div
              key={pokemon.name}
              className="p-2 border rounded hover:bg-gray-100"
            >
              <Link
                href={`/pokemon/${id}`}
                className="text-blue-600 capitalize"
              >
                {pokemon.name}
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination page={Number(page)} />
    </div>
  );
}
