import { Component } from 'react';
import type { CardProps } from '../../types';

class Card extends Component<CardProps> {
  render() {
    const { pokemon } = this.props;
    return (
      <div className="bg-white p-4 mb-2 rounded shadow">
        <p className="font-bold">{pokemon.name}</p>
        <p className="text-gray-500">{pokemon.url.split('/').at(-2)}</p>
      </div>
    );
  }
}
export default Card;
