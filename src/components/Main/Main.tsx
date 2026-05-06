import { Component } from 'react';
import CardList from '../CardList/CardList';
import type { MainProps } from '../../types';

class Main extends Component<MainProps> {
  render() {
    const { pokemons, isLoading, error } = this.props;
    return (
      <div className="flex-1 p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-orange-400 text-center">{error}</div>
        ) : (
          <CardList pokemons={pokemons} isLoading={isLoading} />
        )}
      </div>
    );
  }
}
export default Main;
