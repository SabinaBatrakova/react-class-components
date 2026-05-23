import usePokemonStore from '../../store/store';

export function Flyout() {
  const pokemons = usePokemonStore((state) => state.pokemons);
  const clearPokemons = usePokemonStore((state) => state.clearPokemons);

  function handleDownload() {
    const csv = `name, url\n${pokemons.map((p) => `${p.name}, ${p.url}`).join('\n')}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pokemons.length}_items.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (pokemons.length === 0) {
    return null;
  } else {
    return (
      <div className="sticky bottom-0 bg-white p-4 flex gap-4 items-center shadow-lg">
        <p>{pokemons.length} items selected</p>
        <button
          className="bottom-4 right-4 px-4 py-2 bg-amber-600 text-white rounded-3xl cursor-pointer hover:bg-amber-700"
          onClick={clearPokemons}
        >
          Unselect all
        </button>
        <button
          className="bottom-4 right-4 px-4 py-2 bg-amber-600 text-white rounded-3xl cursor-pointer hover:bg-amber-700"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    );
  }
}
export default Flyout;
