import { Component } from 'react';
import type { CardProps } from '../../types';

class Card extends Component<CardProps> {
  render() {
    const { pokemon } = this.props;
    return (
      <div>
        {pokemon.name},{pokemon.url.split('/').at(-2)}
      </div>
    );
  }
}
export default Card;
