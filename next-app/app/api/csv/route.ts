export async function GET() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
  const data = await response.json();

  const rows = data.results.map(
    (pokemon: { name: string; url: string }) => `${pokemon.name}, ${pokemon.url} `
  );
  const csv = `name,url\n${rows.join('\n')}`;

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="pokemons.csv"',
    },
  });
}
