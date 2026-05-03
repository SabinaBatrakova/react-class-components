import { Component } from 'react';
import CardList from '../CardList/CardList';
import type { MainProps } from '../../types';

class Main extends Component<MainProps> {
  render() {
    return (
      <div>
        <CardList pokemons={ this.props.pokemons } />
      </div>
    );
  }
}
export default Main;
