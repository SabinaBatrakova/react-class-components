import type { MainProps } from '../../types';
import CardList from '../CardList/CardList';

function Main({ isLoading, error, pokemons }: MainProps) {
  return (
    <div className="flex-1 p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div
            data-testid="spinner"
            className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
      ) : error ? (
        <div className="text-orange-400 text-center">{error}</div>
      ) : (
        <CardList pokemons={pokemons} isLoading={isLoading} />
      )}
    </div>
  );
}

export default Main;
