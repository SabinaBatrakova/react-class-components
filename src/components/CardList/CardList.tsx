import { Component } from 'react';
import Card from '../Card/Card';
import type { CardListProps } from '../../types';

class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props;
    return (
      <div>
        {pokemons.map(pokemon => (<Card key = {pokemon.name} pokemon= {pokemon}/>))}
      </div>
    );
  }
}
export default CardList;
